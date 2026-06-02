-- Frontend performance optimization comprehensive quiz card.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  '前端性能优化 · 资源 / 加载 / 网络 / 渲染 / 运行时 / 监控',
$content$
## Core Web Vitals 标准（先建立目标感）

| 指标 | 全称 | "好" 阈值 | 测什么 | 主要优化方向 |
|---|---|---|---|---|
| **LCP** | Largest Contentful Paint | ≤ **2.5s** | 最大可视元素绘制时间 | 减小关键资源、CDN、preload |
| **INP** | Interaction to Next Paint | ≤ **200ms** | 交互响应延迟（取会话 P75）| 长任务拆分、yield to main thread |
| **CLS** | Cumulative Layout Shift | ≤ **0.1** | 累计布局偏移 | 给图/字体留位、避免插入式广告 |
| **FCP** | First Contentful Paint | ≤ **1.8s** | 首次内容绘制 | 关键 CSS 内联、减阻塞 |
| **TTFB** | Time to First Byte | ≤ **0.8s** | 服务器首字节 | 服务器优化、边缘网络 |

> **FID（First Input Delay）**已在 2024 年 3 月被 **INP** 取代。新项目直接看 INP。

---

## 资源优化

### 字体优化

- **字体子集化（font subsetting）**：只打包用到的字符
    - **构建时提取** —— 用 `fonttools` / `pyftsubset` 只提取需要的字符
    - **`unicode-range` 分片** —— 把字体按 unicode 范围拆成多个小文件，浏览器**按需加载**
    - **API 动态子集化** —— 请求 `/font?text=内容`，返回包含"内容"的 woff2
- **`font-display: swap`** 避免 **FOIT**（Flash of Invisible Text，字体加载期间文字不可见）
    - 后备字体由 CSS `font-family` 回退链决定
    - 进阶：**`size-adjust` / `ascent-override`** 让 fallback 字体度量匹配真实字体，**避免 FOUT 时的 CLS**
- **可变字体（Variable Fonts）** —— 一个文件包含多种 weight / style，**比加载多个静态字体省 60-80%**

### 图片优化

- **现代图片格式**：**WebP / AVIF**，比 PNG/JPEG 体积小 30–50%
- **响应式图片**：`srcset` + `sizes` 按屏幕分辨率下发不同尺寸，配合 `<picture>` 做格式降级

```html
<picture>
  <!-- 候选组，最上优先：现代格式，体积最小 -->
  <source type="image/avif"
    media="(max-width: 1200px)"
    srcset="img-400.avif 400w, img-800.avif 800w, img-1200.avif 1200w"
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" />
  <!-- 其他候选格式 ... -->
  <!-- 兜底 -->
  <img src="img-400.jpg"
    srcset="img-400.jpg 400w, img-800.jpg 800w, img-1200.jpg 1200w"
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
    loading="lazy" decoding="async"
    width="400" height="300" />
</picture>
```

浏览器选择逻辑：

1. 先根据 `media` 确定生效的图组
2. 再根据 `sizes` 选择当前视口显示宽度
3. 乘以设备像素比 **DPR** 得到需要的实际像素
4. 从 `srcset` 中选择最接近的

补充关键属性：

- **`loading="lazy"`** —— 视口外图片延迟加载（首屏图不要加，会延迟 LCP）
- **`decoding="async"`** —— 解码不阻塞主线程
- **`width` / `height`** —— 必填，**预留位置防 CLS**

### 图标方案：Sprite vs SVG symbol

合并小图标，减少请求数（现在更多用 SVG symbol 替代，把多个 SVG 图标定义在一个文件中，通过 `<use>` 引用）：

| | **CSS Sprite** | **SVG Symbol** |
|---|---|---|
| 格式 | 位图（PNG/JPG） | 矢量 |
| 缩放 | 模糊 | 无损 |
| 改颜色 | 不能 | `fill` / `stroke` / `currentColor` |
| 维护 | 重新生成整张图 | 增删 symbol 即可 |
| 动画 | 不支持 | 支持 CSS、JS 动画 |
| 请求数 | 1 张图 | 1 个 SVG 文件 |
| 适用场景 | 复杂图片图标 | 单色/简单图标 |

> **HTTP/2 时代 sprite 的合并价值大幅下降** —— multiplexing 已经解决了请求数瓶颈。现在主要为了**减小总字节数**（sprite 压缩比单图好）和**简化原子部署**。

---

## 加载优化

### 模块联邦（Module Federation）

微前端场景下跨应用共享模块，避免重复打包公共依赖：

- **运行时加载**，Remote 更新后 Host 无需重新构建
- 原生构建工具支持（webpack / Rspack / Vite plugin），无需额外框架
- **共享依赖**，不重复加载
- **组件级别共享**，不限于路由级
- 双向共享，任何应用都可以是 Host 或 Remote

代价：跨 app 的版本一致性 / TS 类型同步 / 调试都需要额外架构。

### Resource Hints

| | **做了什么** | **优先级** | **使用场景** |
|---|---|---|---|
| `dns-prefetch` | DNS 解析 | 最低 | 第三方域名，不确定是否会用 |
| `preconnect` | DNS + TCP + TLS | 低 | 确定会请求的第三方域名（字体、API） |
| `prefetch` | 下载资源 | 低（空闲时） | 下一页可能需要的资源 |
| `preload` | 下载资源 | 高（立即） | 当前页面需要但**发现晚**的资源（字体、首屏图、关键 JS） |
| `modulepreload` | 下载 + 解析 + 编译 ESM | 高 | ES module 入口 |

陷阱：**`preload` 用错比不用还糟**（提升优先级抢占真正关键的资源）。优先用于 CSS 里发现的字体、动态 import 的首屏 chunk。

### 代码分割（Code Splitting）

- **路由级**：按路由 lazy import（最常见）
- **组件级**：模态框、富文本编辑器、图表库这种不在首屏的组件
- **`React.lazy` + `Suspense`** / **Vue defineAsyncComponent** / **Vite `import()`**
- **Tree Shaking** —— 配合 ESM 静态分析剔除未使用代码

### HTTP 缓存策略

- **强缓存**（`Cache-Control: max-age`）配合**内容哈希文件名**（`app.a3f9.js`）
- **协商缓存**（`ETag` / `Last-Modified`）做兜底
- **CDN 共享缓存**：`Cache-Control: public, max-age=...` + `s-maxage` 区分浏览器和 CDN
- **`Cache-Control: immutable`** —— 哈希文件名永不失效，浏览器跳过 304 校验

### Import Maps / externals

将稳定的第三方库（React、Lodash）从 bundle 中**剥离**，走 CDN + 长缓存。多个应用共享同一个 React **走同一个浏览器缓存**。

---

## 网络优化

### 103 Early Hints

服务器在最终 200 响应前先发 **103 状态码**（信息性响应，浏览器不会关闭连接），让浏览器**提前 preload**：

```http
HTTP/1.1 103 Early Hints
Link: </style.css>; rel=preload; as=style
Link: </app.js>; rel=preload; as=script

HTTP/1.1 200 OK
Content-Type: text/html
...
```

- HTTP/1.1 能用，但 **HTTP/2 / HTTP/3 最好** —— 帧协议让中间层不会丢掉后续的 200 响应
- 比 HTTP/2 Server Push（已经被各家废弃）更可控

### QUIC / HTTP/3

基于 **UDP**，彻底解决 TCP 层队头阻塞：

- **0-RTT** 恢复 —— 之前握过手的服务器再连不用 1.5 RTT
- 弱网环境收益最明显（移动网络、海外）
- 连接迁移：从 WiFi 切到 4G 不掉连接

### 压缩

- **Brotli** —— 同等质量下体积比 Gzip 小约 **15–20%**，现代浏览器均支持
- **Zstd** —— Chromium 116+ 支持，比 Brotli 解压更快、压缩更高
- 静态资源**预压缩到磁盘**（`.br` / `.zst`），服务器直接发，省 CPU

---

## 渲染优化

### 关键渲染路径（CRP）优化

减少阻塞渲染的 CSS / JS，控制首屏 DOM 深度：

| **优化手段** | **影响指标** |
|---|---|
| 减少阻塞资源 | FCP |
| 内联关键 CSS | FCP |
| `defer` / `async` JS | TTI / INP |
| 减小资源体积 | LCP |
| 预加载字体 + `size-adjust` | CLS |
| 给图片预留 `width`/`height` | CLS |

### `content-visibility: auto`

跳过屏幕外元素的布局和绘制，长页面收益显著：

```css
.card {
  content-visibility: auto;
  contain-intrinsic-size: 0 300px;   /* 占位高度，不让滚动条跳 */
}
```

- **虚拟列表的简易版** —— DOM 仍然全在，只是跳过不可见区域的 Layout + Paint
- `contain-intrinsic-size` 给浏览器一个尺寸估计，避免滚动条乱跳

### CSS `contain` 属性

声明元素的渲染影响范围，让浏览器**局部化重绘**：

- `contain: layout` —— 内部布局不影响外部
- `contain: paint` —— 内部绘制裁剪在元素内
- `contain: strict` = `layout` + `paint` + `size`
- `contain: content` —— `layout` + `paint`（最常用）

### 避免强制同步布局（Forced Sync Layout / Layout Thrashing）

读取 `offsetHeight` / `getBoundingClientRect` 等几何属性后**立即写 DOM**，会触发强制 reflow。应**批量读、再批量写**：

```js
// ❌ 慢：N 次 layout
for (const el of elements) {
  el.style.width = el.offsetWidth + 10 + 'px';
}

// ✅ 快：1 次 layout
const widths = elements.map(el => el.offsetWidth);   // 批量读
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px';            // 批量写
});
```

### GPU 加速 / Compositor-only properties

只用 `transform` / `opacity` 做动画，**不触发 layout 和 paint**，直接在 compositor 线程合成：

```css
.card { transition: transform 0.3s; }   /* ✅ GPU */
.card:hover { transform: translateY(-4px); }

.card { transition: top 0.3s; }         /* ❌ 触发 layout 每一帧 */
```

- **`will-change: transform`** —— 提前提升到独立合成层（别滥用，每层都吃显存）
- `transform: translateZ(0)` 是老技巧，效果同 will-change

---

## 运行时优化

### IntersectionObserver / ResizeObserver

- **`IntersectionObserver`** 替代 `scroll` 事件 —— 监听元素进出视口，**不在主线程轮询**
- **`ResizeObserver`** 替代 `window resize` —— 精准监听单个元素尺寸变化

### 长任务拆分（Task Chunking）

将超过 **50ms** 的长任务用 `scheduler.yield()`（或 `setTimeout(0)` 降级）切片，让出主线程，**改善 INP**：

> **INP** = Interaction to Next Paint，交互到下次绘制的延迟，**取整个会话里所有交互延迟的 P75**，不是单次。

```js
async function renderList(items) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < items.length; ++i) {
    frag.appendChild(createCard(items[i]));
    if (i % 50 === 0) {
      container.appendChild(frag);
      await scheduler.yield();   // 让出主线程
    }
  }
  container.appendChild(frag);
}
```

### 真正的并行：Web Worker

CPU 密集任务（大 JSON 解析、加密、图像处理）应该挪到 Web Worker，**主线程完全不受影响**。`postMessage` 用 `Transferable` 可以零拷贝转移大 ArrayBuffer。

### 内存泄漏防御

- 组件卸载时清理：**定时器**、**事件监听**、**`IntersectionObserver`** / **`ResizeObserver`**
- **`WeakMap` / `WeakRef`** 保存对 DOM 的弱引用，节点移除后能被 GC
- **`FinalizationRegistry`** 追踪对象回收（**仅调试用**）—— 定位循环引用导致的内存泄漏

```js
const registry = new FinalizationRegistry((id) => {
  console.log(`Object ${id} was garbage collected`);
});
registry.register(myObject, 'my-id');
```

---

## 缓存与持久化

### Service Worker + Cache API

实现离线缓存和资产版本控制，配合 **Workbox** 管理缓存策略：

| 策略 | 适用场景 |
|---|---|
| **cache-first** | 静态资源（字体、图、JS chunk） |
| **network-first** | API 数据，离线时回退缓存 |
| **stale-while-revalidate** | 数据可以稍旧，立即返回缓存 + 后台更新 |
| **network-only** | 关键操作（支付、登录） |
| **cache-only** | 完全离线场景 |

### 状态持久化分层

| 层 | 容量 | 同步 | 适用 |
|---|---|---|---|
| **内存（Zustand / Redux store）** | 无限 | 同步 | 高频变更状态 |
| **`localStorage`** | ~5–10 MB | 同步（阻塞主线程） | 简单偏好设置 |
| **`sessionStorage`** | ~5–10 MB | 同步 | 单 tab 会话状态 |
| **`IndexedDB`** | GB 级 | **异步** | 大量结构化数据、离线数据库 |
| **`Cache Storage`**（SW 用） | GB 级 | 异步 | HTTP 响应缓存 |

> **`localStorage` 是同步阻塞的**，不要存大量数据 —— 读取卡主线程。优先 IndexedDB（用 `idb` / `dexie` 封装库）。

### bfcache（Back/Forward Cache）

浏览器把整个页面（含 JS 堆）冻存，**后退/前进时直接恢复，0 加载**。常见破坏点：

- `unload` 事件监听 → 改用 `pagehide`
- 未关闭的 IndexedDB 连接
- `Cache-Control: no-store`

要拿 bfcache 红利，避开这些。

---

## 监控与度量

### Web Vitals 采集

用 Google 官方 [`web-vitals`](https://github.com/GoogleChrome/web-vitals) 库一把梭：

```js
import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(({ value, id }) => sendToAnalytics({ name: 'LCP', value, id }));
onINP(({ value, id }) => sendToAnalytics({ name: 'INP', value, id }));
onCLS(({ value, id }) => sendToAnalytics({ name: 'CLS', value, id }));
```

底层用 `PerformanceObserver`：

```js
new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === 'largest-contentful-paint') { /* ... */ }
  });
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

### 导航时序

用 `performance.getEntriesByType('navigation')` 分析 TTFB、DOM 解析耗时、资源加载：

```js
const nav = performance.getEntriesByType('navigation')[0];
console.log({
  ttfb: nav.responseStart - nav.requestStart,
  domParse: nav.domInteractive - nav.responseEnd,
  domReady: nav.domContentLoadedEventEnd - nav.startTime,
  loaded: nav.loadEventEnd - nav.startTime,
});
```

### 自定义打点

用 `performance.mark()` / `performance.measure()` 标注关键业务时点：

```js
performance.mark('search-start');
await search(query);
performance.mark('search-end');
performance.measure('search-duration', 'search-start', 'search-end');
```

`PerformanceObserver` 监听 `measure` entry 自动上报。

### Long Task Observer

监控 > 50ms 的主线程长任务（**INP 杀手**）：

```js
new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.warn(`Long task: ${entry.duration}ms`, entry.attribution);
  });
}).observe({ entryTypes: ['longtask'] });
```

### RUM vs Synthetic

| | **RUM**（Real User Monitoring） | **Synthetic** |
|---|---|---|
| 谁触发 | 真实用户 | 定时机器人 / Lighthouse CI |
| 反映 | 真实分布、长尾、设备差异 | 受控环境基线 |
| 适合 | 上线后持续监控、看 INP P75 | PR 阶段回归检测 |
| 代表 | Vercel Speed Insights、Sentry、自建 | Lighthouse CI、WebPageTest |

→ **两者要同时做**。Synthetic 防回归，RUM 看真实用户。

---

## 一句话总结

> 前端性能不是"用了多少黑科技"，而是**把每个指标背后的根因消灭掉**：
> - LCP 大 → 找首屏关键资源做 preload + CDN + 减体积
> - INP 高 → 找长任务，拆 / 让出 / Worker
> - CLS 大 → 给所有动态内容**预留尺寸**
$content$,
  'quiz', 'medium',
  ARRAY['frontend','performance','web-vitals','optimization','rendering','networking'],
  NULL
);
