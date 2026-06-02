-- Next.js basics: RSC, Hydration, Server Actions, Image, Script, conventions.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'Next.js 基础 · RSC / Hydration / Image / Script / 路由约定',
$content$
## Server Components vs Client Components

- **Server Component（SC）**：在服务器渲染，能**直接访问数据库、文件系统**，不能用 hooks / 事件 / 浏览器 API。**默认就是 SC**。
- **Client Component（CC）**：需要文件顶部 `'use client'`。有**交互、状态、副作用**时使用。
- **原则**：能用 SC 用 SC，`'use client'` 边界**尽量往叶子节点推**，减少客户端 JS 体积。

### Server Component 工作流

```
Server Component 执行
       ↓
生成 RSC Payload（类似 JSON 的描述结构）
       ↓
客户端直接渲染这个描述，不需要组件的 JS 代码
```

**RSC Payload** 大致长这样（简化）：

```
M1: { id: '/components/button.js', name: 'Button' }    ← Client Component 占位
J: ['$', 'div', null, {
     children: ['Hello', ['$', '@1', null, { children: 'Click' }]]
   }]                                                   ← VDOM 描述
```

含义：
- Server Component 的 UI 是**纯描述**（不是 JS 代码 + 不是 HTML）
- Client Component 在 payload 里是个"占位 + 引用"，浏览器再去拉 JS 实例化
- **Server Component 的代码永远不会进客户端 bundle**

### SC 不能 import CC 反过来才行

```jsx
// ❌ Server Component 里直接 import CC 是可以的
import Button from './Button';   // 'use client' → 它会被打包到 client bundle

// ❌ Client Component 里 import SC 是 不行 的
'use client';
import SC from './ServerComp';   // SC 会被强制变成 client，失去 server 能力

// ✅ 但 CC 可以把 SC 作为 children 接收
'use client';
function Wrapper({ children }) {
  return <div>{children}</div>;
}
// 在 SC 里：<Wrapper><ServerOnlyChild /></Wrapper>   ✅
```

→ 这就是为啥 Provider 模式（ThemeProvider / SessionProvider）大多是 CC 但仍然能包 SC 子树。

---

## Hydration（用于 CC）

```
服务端返回静态 HTML（用户能看到）
        ↓
客户端下载 JS
        ↓
React 接管（水合）HTML，绑定事件监听器
        ↓
变成可交互的应用
```

### Hydration 是有成本的

- **解析 HTML** + **下载 JS** + **执行 JS** + **逐节点匹配 + 绑事件**
- 大型应用 hydration 可能耗数百毫秒，**期间页面看上去能用但点不动**（INP 黑暗时间）

**优化方向**：

- **减少 client JS** —— 把更多组件留作 Server Component
- **`<Suspense>` 边界切片** —— hydration 分批次而不是 stop-the-world
- **Selective Hydration**（React 18 自带） —— 高优先级交互的部分先 hydrate
- **Qwik / Astro Islands** —— 极致方案，下文跨框架卡里讲过

### Hydration mismatch（最常见 bug）

服务端渲染的 HTML 和客户端 first render 输出**不一致**，React 警告。常见原因：

- 用了 `Date.now()` / `Math.random()` / `new Date()` 直接渲染 → 两端不同
- 读 `window` / `localStorage` / `navigator` 这种 browser-only API
- 时区差异
- 第三方脚本（adblock / 浏览器扩展）改了 DOM

对策：
- 这些值用 `useEffect` 设进 state，**首屏先用占位**
- 或用 `suppressHydrationWarning` 显式标注允许差异（如时间戳）
- `dynamic(() => ..., { ssr: false })` 整段跳过 SSR

---

## Server Action

在客户端触发**服务端逻辑**，**不需要手写 API Route**：

```jsx
// app/actions.ts
'use server';

export async function createPost(formData) {
  await db.posts.insert({ title: formData.get('title') });
  revalidatePath('/posts');
}

// 客户端用
<form action={createPost}>
  <input name="title" />
  <button type="submit">Create</button>
</form>
```

配套 hooks（React 19）：

- **`useActionState`** —— 拿 action 的返回值 + pending 状态 + 错误
- **`useFormStatus`** —— 子组件读父 form 的 submitting 状态（无需 prop drilling）
- **`useOptimistic`** —— 乐观更新 UI，server 响应回来再 reconcile

> **Progressive Enhancement**：用 `<form action={fn}>` 写法，**JS 没下载完表单也能提交**（走原生 form post）。这是 Server Action 相对 fetch 调用 API 的核心优势之一。

---

## `<Image>` 组件

`next/image` 自动做以下优化：

- **懒加载** —— 进入视口才加载（默认开启）
- **尺寸优化** —— 根据设备返回合适尺寸，不传 4K 图给手机
- **格式转换** —— 自动转 **WebP / AVIF**（比 PNG / JPG 小 30-50%）
- **防止 CLS** —— **必须**指定 `width` / `height`，提前占位

### 关键属性

```jsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority                              // 首屏 LCP 图，跳过懒加载、preload
  placeholder="blur"                    // 加载时显示模糊占位
  blurDataURL="data:image/jpeg;base64,..." // 占位的 base64
  sizes="(max-width: 600px) 100vw, 1200px"  // 响应式尺寸
  quality={85}                          // 1-100，默认 75
/>

// 不知道尺寸时用 fill + 父元素 position:relative
<div style={{ position: 'relative', width: '100%', height: 400 }}>
  <Image src="/x.jpg" alt="" fill style={{ objectFit: 'cover' }} />
</div>
```

### 注意

- **首屏 LCP 图必加 `priority`** —— 否则懒加载会延迟 LCP
- **`placeholder="blur"` 只对静态 import 的图自动生效**；远程图要手动给 `blurDataURL`
- **远程图域名要在 `next.config.js` 的 `images.remotePatterns` 里 allowlist**，否则 405

---

## `<Script>` 组件

精确控制脚本的加载时机：

```jsx
import Script from 'next/script';

<Script src="https://gtm.js" strategy="afterInteractive" />
```

| Strategy | 时机 | 适用 |
|---|---|---|
| **`beforeInteractive`** | 最早，阻塞页面 | 必须**最先**执行的脚本（极少；如 polyfill） |
| **`afterInteractive`** | 页面可交互后（默认） | 分析、广告 |
| **`lazyOnload`** | 浏览器空闲 | 聊天插件、低优先级工具 |
| **`worker`** | 在 **Web Worker** 里跑（实验性） | 完全不阻塞主线程的第三方脚本 |

`onLoad` / `onError` / `onReady` 可以挂回调（仅在 Client Component 内）。

---

## 路由约定（App Router 特殊文件）

`app/` 目录下文件名有特殊含义：

| 文件 | 作用 |
|---|---|
| `page.tsx` | 路由的 UI |
| `layout.tsx` | 嵌套布局，**跨页面持久**（不重新挂载） |
| `template.tsx` | 类似 layout，但**每次导航重新挂载** |
| `loading.tsx` | 路由加载中显示（用 `<Suspense>` 包裹 page） |
| `error.tsx` | 客户端错误兜底（必须 `'use client'`） |
| `global-error.tsx` | 根错误兜底 |
| `not-found.tsx` | 404 |
| `route.ts` | API 端点（GET / POST / ...） |

### 路由模式

- **动态段**：`app/blog/[slug]/page.tsx` → `/blog/anything`
- **捕获所有**：`app/[...rest]/page.tsx` → `/a/b/c`
- **可选**：`app/[[...rest]]/page.tsx` → `/` 或 `/a/b/c`
- **Route Groups**：`app/(marketing)/about/page.tsx` → 路径里**不出现 `(marketing)`**，纯用于组织
- **Parallel Routes**：`app/@modal/page.tsx` + `app/@main/page.tsx` → layout 同时接收多个 slot
- **Intercepting Routes**：`app/feed/(.)photo/[id]/page.tsx` → 拦截导航在 modal 里显示

---

## `<Link>` 组件

```jsx
import Link from 'next/link';
<Link href="/about" prefetch>About</Link>
```

特点：
- **客户端导航**（不刷整页）
- **自动 prefetch**：视口内的 `<Link>` Next.js 会在空闲时**预取目标页的代码 + 数据**
- prod 默认开，dev 关
- `prefetch={false}` 显式关闭（如内容很多的长列表）

---

## `next/font` 字体优化

```jsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default function Layout({ children }) {
  return (
    <html className={`${inter.className} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

自动做：
- **构建时下载字体文件**到自己服务器（**零运行时请求 Google Fonts**，避免第三方 connect + 隐私问题）
- **字体子集化**
- **`size-adjust` 自动注入** → 减少 CLS

---

## Metadata API（SEO）

```jsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await db.getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [{ url: post.cover }] },
    twitter: { card: 'summary_large_image' },
  };
}
```

替代手写 `<head>` 标签。还有：
- **`generateViewport`** — viewport / theme-color
- **`sitemap.ts` / `robots.ts`** — 路由级生成
- **`opengraph-image.tsx`** — 动态 OG 图（用 React 渲染成 PNG）

---

## Middleware

`middleware.ts` 在 **请求到达 page 之前**运行（边缘节点）：

```js
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. 鉴权
  if (!request.cookies.get('session') && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // 2. 地理路由 / A/B 实验 / 重写
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
```

适合：鉴权、地理重定向、A/B 实验、特性开关、设置 cookies。**不适合**：业务逻辑、DB 查询（边缘节点冷启动 + 资源受限）。

---

## 一句话总结

> Next.js App Router 三个心智锚点：
>
> 1. **默认 Server Component，按需 Client Component** —— bundle 越小越快
> 2. **`<Suspense>` 划定流式边界** —— 慢的不拖累快的
> 3. **`'use cache'` / `revalidateTag` 控制颗粒度** —— 缓存粒度细到任意函数
>
> 配套组件（`<Image>` / `<Link>` / `<Script>` / `next/font`）是**性能默认值**的实现 —— 用了不止省事，是真省 Web Vitals。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','nextjs','react','rsc','hydration','routing'],
  NULL
);
