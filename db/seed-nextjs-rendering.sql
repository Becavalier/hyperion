-- Next.js rendering strategies quiz card.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'Next.js 渲染策略 · SSG / SSR / ISR / CSR / PPR / Streaming',
$content$
## 全局心智图

```
默认是 SSG
  ↓ 用了 cookies() / headers() / searchParams           → 变成 SSR
  ↓ 加了 revalidate                                      → 变成 ISR
  ↓ 加了 'use client' + useEffect 里 fetch              → 变成 CSR
  ↓ 加了 Suspense                                        → 变成 Streaming SSR
  ↓ 加了 'use cache' + Suspense                          → 变成 PPR (Next 16)
```

同一个页面可以**混用** —— 静态的 layout 走 SSG，动态的内容块用 Suspense 包裹走 SSR 流式渲染，这就是 **PPR（Partial Pre-rendering）** 的核心思路。

---

## SSG（Static Site Generation）

**构建时跑一次**，生成静态 HTML 文件，部署后**直接从 CDN 响应**。

```jsx
// App Router - async Server Component 默认就是 SSG（如果没有动态数据）
export default async function Page() {
  const data = await fetch('https://api.example.com/data');  // 默认缓存
  return <div>{data}</div>;
}

// 有动态路由时需要告诉 Next.js 有哪些页面要预生成
// app/blog/[slug]/page.jsx
export async function generateStaticParams() {
  const posts = await db.getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
  // 返回 [{ slug: 'hello-world' }, { slug: 'nextjs-guide' }, ...]
}

export default async function BlogPost({ params }) {
  const post = await db.getPost(params.slug);
  return <article>{post.content}</article>;
}
```

**特点**：
- TTFB 极低（CDN 直出）
- SEO 极好
- 服务器零压力

**代价**：数据是**构建时的快照**，内容变了必须重新构建。

---

## SSR（Server-Side Rendering）

**每次请求**都在服务器动态渲染，用户拿到的是最新数据。

```jsx
import { cookies, headers } from 'next/headers';

export default async function Dashboard() {
  const session = (await cookies()).get('session');  // 访问 cookies → 强制 SSR
  const user = await getUserFromSession(session);
  return <div>Welcome, {user.name}</div>;
}

// 或者显式声明
export const dynamic = 'force-dynamic';
```

触发 SSR 的动态信号：
- `cookies()` / `headers()` / `draftMode()`
- 读取 `searchParams`
- `fetch(..., { cache: 'no-store' })`
- `export const dynamic = 'force-dynamic'`

**特点**：数据实时、支持个性化。**代价**：每次请求都要等服务器处理，TTFB 比 SSG 高，服务器有计算压力。

---

## ISR（Incremental Static Regeneration）

SSG 的升级版 —— **先返回缓存的静态页面**，**后台异步重新生成**，兼顾性能和数据新鲜度。

```jsx
// revalidate: 60 的执行逻辑（stale-while-revalidate）
//   0~60 秒内：直接返回缓存，不重新生成
//   60 秒后第一个请求：返回旧缓存（用户不等待），同时触发后台重新生成
//   下一个请求：拿到新生成的页面

export const revalidate = 60;  // 文件顶层导出
```

### 按需刷新（On-demand Revalidation）

文章发布时主动让缓存失效，不用等 60 秒：

```jsx
// route handler 里调用
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req) {
  revalidatePath('/blog');        // 刷新某个路径
  revalidateTag('posts');         // 刷新带这个 tag 的所有缓存
  return Response.json({ ok: true });
}

// fetch 时打 tag
fetch('...', { next: { tags: ['posts'] } });
```

**特点**：首屏和 SSG 一样快，数据有轻微延迟。**适合**：电商商品页、新闻列表这类更新频率中等的内容。

---

## CSR（Client-Side Rendering）

服务器只返回**空 HTML 壳**，数据完全在客户端 fetch。

```jsx
'use client';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setData);
  }, []);

  if (!data) return <Skeleton />;
  return <Charts data={data} />;
}
```

**特点**：服务器压力小，**后续交互无刷新**。**缺点**：白屏时间长、SEO 差、**数据瀑布问题**（子组件先 fetch 一个，再 fetch 下一个）。

---

## Streaming SSR（流式服务端渲染 + Suspense）

不再"等所有数据 ready 才发响应"，而是**先把骨架发出去，慢的部分用 Suspense 占位，数据 ready 一段就 flush 一段**。

```jsx
// app/dashboard/page.jsx
export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>           {/* 立即发出 */}
      <Profile />                  {/* 立即发出 */}

      <Suspense fallback={<Skel />}>
        <SlowChart />              {/* fallback 先发，数据好了再 flush */}
      </Suspense>

      <Suspense fallback={<Skel />}>
        <SlowTable />              {/* 独立加载，不阻塞其他 */}
      </Suspense>
    </main>
  );
}

async function SlowChart() {
  const data = await fetch('https://slow-api.com', { next: { revalidate: 60 } });
  return <Chart data={await data.json()} />;
}
```

底层机制：HTTP **chunked transfer encoding** + React 18 的 **`renderToReadableStream`**。每个 Suspense 边界单独 flush 一个 HTML chunk。

**好处**：
- 用户**看到东西的时间** ≈ 最快那段的时间，而不是最慢那段
- 数据并行（不同 `<Suspense>` 内部的 fetch 并行）

---

## PPR (Partial Pre-rendering) · Next 14+

**SSG + Streaming SSR 的融合**：

- 整个页面的**静态部分**在构建时就渲染好（SSG）
- 标记为 dynamic 的部分（在 `<Suspense>` 内）在**运行时流式渲染**
- 用户拿到的响应：**已经预渲染的静态壳 + dynamic 占位** → 极快 TTFB；几十/几百毫秒后再流过来 dynamic 内容

```jsx
import { Suspense } from 'react';
import { cookies } from 'next/headers';

export const experimental_ppr = true;  // 启用 PPR

export default function Page() {
  return (
    <>
      <Header />                          {/* 静态：构建时渲染 */}
      <ProductInfo />                     {/* 静态 */}

      <Suspense fallback={<CartSkel />}>
        <Cart />                          {/* 动态：运行时流式 */}
      </Suspense>
    </>
  );
}

async function Cart() {
  const userId = (await cookies()).get('uid');  // 动态信号
  const items = await getCart(userId);
  return <CartItems items={items} />;
}
```

→ "**用 SSG 的速度交付 SSR 的能力**"。Vercel 在大力推 PPR。

---

## Cache Components (Next 16+)

Next 16 进一步统一了缓存抽象。新的 **`'use cache'`** 指令把 SSG / ISR / PPR 都收敛到一种心智：

```jsx
async function getPosts() {
  'use cache';                        // 这个函数的输出被缓存
  cacheLife('hours');                 // TTL
  cacheTag('posts');                  // 用于 invalidation
  return db.getPosts();
}

export default async function BlogIndex() {
  const posts = await getPosts();     // 缓存命中：立即返回；miss：跑一次然后缓存
  return <List posts={posts} />;
}
```

- 替代了旧 API（`unstable_cache`、`fetch.next.revalidate`、`export const revalidate`）
- 颗粒度从"页面级"细化到"任意函数 / 任意组件"
- 配合 `<Suspense>` 自动适配 PPR

---

## Server Components vs Client Components

App Router 的核心心智：

| | **Server Component**（默认） | **Client Component**（加 `'use client'`） |
|---|---|---|
| 在哪运行 | 服务端构建/请求时 | 浏览器 |
| 能 `await` 异步数据 | ✅ async function | ❌ 用 useEffect / Server Action |
| 能用 hooks | ❌ | ✅ |
| 能访问 DB / 文件系统 | ✅ | ❌ |
| 进 JS bundle | ❌（HTML 直出，0 JS） | ✅ |
| 能 `onClick` 等事件 | ❌ | ✅ |

**关键**：Client Component 能 **render** Server Component（**作为 children 传入**），但**不能在 Client 里 import Server**。这就是为啥经常看到这种写法：

```jsx
// Layout.tsx (Server)
import ThemeProvider from './theme-provider';   // Client
import Sidebar from './sidebar';                // Server

<ThemeProvider><Sidebar /></ThemeProvider>      // ✅ Sidebar 是 children，不是 import
```

---

## Server Actions

App Router 里**写在服务端但能直接被前端按钮调用的函数**：

```jsx
// app/actions.ts
'use server';

export async function createPost(formData) {
  await db.posts.insert({ title: formData.get('title') });
  revalidatePath('/posts');
}

// 客户端用
import { createPost } from './actions';

<form action={createPost}>
  <input name="title" />
  <button type="submit">Create</button>
</form>
```

替代了大部分"写一个 API route + 前端 fetch + 处理 loading/error" 的样板代码。配合 `useFormState` / `useFormStatus` / `useActionState` 做 progressive enhancement（**JS 没下载完表单也能提交**）。

---

## 运行时：Node.js vs Edge

```jsx
// 默认 Node.js runtime
// 或显式声明
export const runtime = 'edge';
```

| | Node.js Runtime | Edge Runtime |
|---|---|---|
| 部署位置 | 区域中心（fewer locations） | **全球边缘**（200+ POPs） |
| 冷启动 | 100-1000ms | **~10ms** |
| 能力 | 完整 Node API、原生模块、fs | Web Standard APIs 子集 |
| Bundle 限制 | 没硬上限 | 1-4MB 视厂商 |
| 适合 | 后台、重计算、依赖原生模块 | 中间件、A/B 实验、地理路由 |

**Vercel 现在推 Fluid Compute** —— 比传统 Edge 更灵活：边缘冷启动快 + 完整 Node API + 实例复用降本。新项目大多默认这个。

---

## 对比总结

| **场景** | **推荐方案** |
|---|---|
| 博客 / 文档 / 营销页 | **SSG** |
| 商品详情 / 新闻列表 | **ISR** 或 **PPR** |
| 用户个人页 / 购物车 | **SSR** 或 **PPR**（静态壳 + 动态卡片 Suspense） |
| 后台管理 / 实时数据面板 | **CSR** + Server Actions |
| 首页（90% 静态 + 10% 个性化） | **PPR** |
| 极速边缘响应 / 地理路由 | **Edge Runtime + SSR** |

---

## 跨框架对照

| 框架 | 默认范式 | 杀手锏 |
|---|---|---|
| **Next.js** App Router | RSC + SSG/SSR/ISR/PPR | 生态最大、PPR/Server Actions |
| **Remix** | SSR + loaders/actions | Web 标准对齐、嵌套路由 |
| **Astro** | **Island Architecture** | 默认零 JS，只在需要交互的 island 装 JS |
| **SvelteKit** | SSR + SPA + adapter 多端 | bundle 小、心智轻 |
| **Nuxt 3** | SSR + Hybrid Rendering | Vue 生态首选 |
| **Qwik** | **Resumability**（无 hydration） | 首屏 0 JS，按需 deserialize |

Astro 和 Qwik 代表两种激进的新方向：

- **Astro Islands** —— 大部分页面是静态 HTML，**只在需要交互的小岛**装 JS。适合"内容为主、交互为辅"（博客、文档、电商展示页）。
- **Qwik Resumability** —— 应用状态序列化进 HTML，**浏览器拿到 HTML 就能交互，不需要 hydration**。原理是只在用户触发事件时按需"恢复"对应代码。

---

## 一句话总结

> Next.js 现代渲染的核心趋势是 **"按颗粒度选择"** —— 同一个页面里可以**静态部分 SSG、个性化部分 SSR、缓存部分 ISR、交互部分 CSR**，由 **PPR + Suspense + 'use cache'** 把它们粘起来。
>
> 选择标准只有一个：**这块内容的"新鲜度要求"和"个性化要求"** —— 越静越快，越动越贵。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','nextjs','ssr','ssg','rendering','react','vercel'],
  NULL
);
