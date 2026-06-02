-- Service Worker + PWA comprehensive quiz card.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'Service Worker · 离线 / Cache / 更新机制 · PWA',
$content$
## Service Worker

运行在浏览器后台的**独立线程**，独立于页面，充当**浏览器与网络之间的代理**。

### 基本特征

- **独立线程** —— 不能访问 DOM
- **必须 HTTPS**（`localhost` 除外）
- **有完整生命周期**
- **可拦截网络请求**（通过 `fetch` 事件）
- **支持离线缓存**（配合 Cache API）
- **页面关闭后仍可运行** —— 推送通知、后台同步
- **作用域（scope）** —— 默认控制注册它的 URL 路径**及子路径**。例如 `/sw.js` 注册时 scope = `/`，控制整站；`/app/sw.js` 默认 scope = `/app/`

### 生命周期

```
register  (浏览器解析并下载 sw.js)
   ↓
install   (缓存静态资源 — 失败 → 终止)
   ↓
waiting   (等待所有旧 SW 控制的页面关闭，除非 skipWaiting)
   ↓
activate  (清理旧缓存)
   ↓
fetch     (开始拦截网络请求，进入稳态)
```

### 注册 + 完整 SW 示例

```js
// 注册（主页面）
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js
const CACHE_NAME = 'v1';
const ASSETS = ['/', '/index.html', '/style.css', '/app.js'];

// install：预缓存静态资源
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();   // 跳过 waiting，立即激活
});

// activate：清理旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
  );
  self.clients.claim();   // 立即控制所有页面
});

// fetch：拦截请求
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))  // Cache First
  );
});
```

### `skipWaiting` + `clients.claim` 的代价

二者结合 → 新 SW **立即接管所有页面**，但这意味着：

- 老页面突然被新 SW 接管，可能拿到**和当前 HTML 不匹配的 chunk**（hash 对不上 → 白屏）
- 安全做法：**新 chunk 走新缓存**，老页面继续用老缓存；让用户**主动刷新**才换 SW

```js
// 更好的更新流程：通知用户后由 ta 决定刷新
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

// 页面侧：
navigator.serviceWorker.ready.then(reg => {
  reg.addEventListener('updatefound', () => {
    const newSW = reg.installing;
    newSW.addEventListener('statechange', () => {
      if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
        // 新 SW 装好了，弹个 toast 让用户点击"立即更新"
        showRefreshToast(() => newSW.postMessage('SKIP_WAITING'));
      }
    });
  });
});

navigator.serviceWorker.addEventListener('controllerchange', () => {
  window.location.reload();
});
```

---

## Cache API

浏览器提供的**持久化 Request/Response 存储**，独立于 HTTP 缓存，由开发者完全控制。

### 核心方法

```js
const cache = await caches.open('v1');
await cache.put(request, response);          // 写入
await cache.add(url);                         // 拉取并写入
await cache.addAll(urlList);                  // 批量
const res = await cache.match(request);       // 读取
await cache.delete(request);                  // 删除
const keys = await cache.keys();              // 列出所有
```

### 匹配选项

```js
caches.match(request, {
  ignoreSearch: true,    // 忽略 query string
  ignoreVary: true,      // 忽略 Vary header
  ignoreMethod: true,    // 忽略 method（默认只匹配 GET）
});
```

### 配额（storage quota）

- 默认 origin 配额 ≈ **磁盘 60-80% 的一小部分**（Chrome 给单 origin 通常几百 MB 到 GB 级）
- 用 `navigator.storage.estimate()` 查实际：
  ```js
  const { usage, quota } = await navigator.storage.estimate();
  console.log(`${usage} / ${quota}`);
  ```
- 用 `navigator.storage.persist()` 申请**持久化存储**（用户不会因为清理临时数据而丢）

---

## 缓存策略

| **策略** | **说明** | **适用场景** |
|---|---|---|
| **Cache First** | 有缓存用缓存，没有才请求 | 静态资源（CSS、JS、图片） |
| **Network First** | 先请求，失败用缓存 | API 数据、频繁更新的内容 |
| **Stale While Revalidate** | 立即返回缓存 + 后台更新 | 不要求实时但要较新的内容 |
| **Network Only** | 只走网络 | 不能缓存的请求（POST、支付） |
| **Cache Only** | 只走缓存 | 预缓存的资源 |
| **Network with Timeout** | 网络超时后回退缓存 | 弱网体验保底 |

### Stale-While-Revalidate 代码

```js
self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const cache = await caches.open('runtime');
    const cached = await cache.match(e.request);
    const fetchPromise = fetch(e.request).then(res => {
      cache.put(e.request, res.clone());
      return res;
    });
    return cached || fetchPromise;
  })());
});
```

### Network with Timeout

```js
function networkWithTimeout(request, timeoutMs = 3000) {
  return Promise.race([
    fetch(request),
    new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeoutMs))
  ]);
}
```

---

## 更新机制

浏览器**每次**访问页面（或 24 小时强制）会检查 `sw.js` 是否有**字节变化**：

- 有变化 → 安装新 SW
- 进入 `waiting` 状态
- 直到**旧 SW 控制的所有页面关闭**后才激活（除非 `skipWaiting`）

> **重要**：浏览器对 `sw.js` 本身**几乎不做 HTTP 缓存**（默认 max-age=0 行为）。即使你给 sw.js 设了缓存头，**浏览器会主动 bypass**。所以**改 sw.js 一定会被发现**。

> 反过来：**绝对不要**给 sw.js 加长缓存头 —— 一旦 CDN 缓存了，无法回滚。

### 检测更新

```js
navigator.serviceWorker.register('/sw.js').then(reg => {
  reg.update();                  // 手动检查更新
  // 或：reg.addEventListener('updatefound', ...);
});
```

### controllerchange 事件

新 SW 激活、接管页面时触发。常见用法：自动刷新页面拿新资源。

---

## Workbox（Google 官方 SW 工具集）

手写 SW 很容易出错（缓存命名、版本管理、策略边界）。**Workbox** 把常用模式封装好：

```js
// sw.js (Workbox)
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// 1. 预缓存（构建时由 webpack-workbox-plugin / vite-pwa 注入清单）
precacheAndRoute(self.__WB_MANIFEST);

// 2. 图片：cache-first + 30 天过期
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxAgeSeconds: 30 * 86400 })],
  })
);

// 3. API：network-first + 5s 超时
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({ cacheName: 'api', networkTimeoutSeconds: 5 })
);
```

集成方式：
- **Webpack** —— `workbox-webpack-plugin`
- **Vite** —— `vite-plugin-pwa`（最常用）
- **Next.js** —— `next-pwa`

---

## PWA（Progressive Web App）

利用现代 Web 技术让网页具备**原生 App 体验**的技术方案。

三大基石：

- **Service Worker** —— 离线缓存、推送通知
- **Web App Manifest** —— 安装到桌面、启动画面
- **HTTPS** —— 安全要求

### 能力对照

| **能力** | **技术** | **解决问题** |
|---|---|---|
| 离线使用 | Service Worker + Cache API | App 断网仍可用 |
| 安装到桌面 | Web App Manifest | 图标在主屏幕，直接启动 |
| 推送通知 | Push API + Notification API | 随时推送消息 |
| 后台同步 | Background Sync API | 网络恢复时自动重试失败的请求 |
| 周期同步 | Periodic Background Sync API | 后台定期更新数据（新闻、订阅） |
| 后台下载 | Background Fetch API | 大文件断点续传 |
| 快速加载 | 预缓存 + 缓存策略 | 本地资源，秒开 |
| 应用入口 | Shortcuts in Manifest | App icon 长按显示快捷动作 |
| 文件 / 协议关联 | File Handlers / Protocol Handlers | 双击文件用 PWA 打开 |

---

## Web App Manifest

`manifest.webmanifest` 文件 + HTML 里 `<link rel="manifest" href="...">`：

```json
{
  "name": "Hyperion Prep",
  "short_name": "Prep",
  "start_url": "/?source=pwa",
  "display": "standalone",           // standalone / fullscreen / minimal-ui / browser
  "background_color": "#080c08",     // 启动画面背景
  "theme_color": "#00ff41",          // 状态栏 / titlebar 颜色
  "orientation": "portrait",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "shortcuts": [
    { "name": "Today's session", "url": "/today", "icons": [...] }
  ]
}
```

- **`display: standalone`** —— 像原生 app 一样，无浏览器 UI
- **`purpose: maskable`** —— Android 自适应图标，必须留 safe zone 防止圆形裁掉重要部分
- **`shortcuts`** —— iOS 16+ / Android 都支持，App icon 长按显示

---

## 安装流程（installable）

满足条件后，浏览器会触发 `beforeinstallprompt` 事件（Chrome / Edge）：

```js
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();                       // 阻止默认横幅
  deferredPrompt = e;
  showInstallButton();                      // 自己控制时机
});

installBtn.onclick = async () => {
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(outcome);                     // 'accepted' / 'dismissed'
  deferredPrompt = null;
};
```

可安装条件（Chromium）：
- HTTPS（或 localhost）
- 有 manifest 且 `name` / `short_name` / `start_url` / `icons` 完整
- 注册了 active SW（含 `fetch` handler）
- 用户在站点有"有意义的交互"（停留 / 点击）

---

## Push & Notification

### 流程

```
1. 页面请求权限         Notification.requestPermission()
2. SW 订阅 push 服务    reg.pushManager.subscribe({ applicationServerKey: VAPID_PUBLIC })
3. 上报 subscription 到自己后端
4. 后端用 VAPID 私钥签名后发到 Push Service（FCM/Mozilla）
5. Push Service → 用户浏览器
6. SW 的 push 事件触发 → 显示通知

self.addEventListener('push', (e) => {
  const data = e.data.json();
  self.registration.showNotification(data.title, { body: data.body, icon: '/icon.png' });
});
```

VAPID（Voluntary Application Server Identification）—— 一组 ECDSA 公私钥，让推送服务可识别**是哪个应用**在发送。

### Background Sync

```js
// 页面侧
await reg.sync.register('post-comment');

// SW 侧
self.addEventListener('sync', (e) => {
  if (e.tag === 'post-comment') {
    e.waitUntil(retryPostComment());
  }
});
```

网络恢复时自动重试，**即使页面已经关闭**。

---

## iOS / Safari 的特别注意

Apple 对 PWA 长期支持**最差**。截至 2025-2026：

| 能力 | iOS Safari |
|---|---|
| Service Worker | ✅ 11.3+ |
| Manifest 安装 | ✅ 但功能受限（无 standalone icon shortcut menu） |
| Push API | ✅ 16.4+（必须先"添加到主屏幕"再启用） |
| Background Sync | ❌ |
| Periodic Background Sync | ❌ |
| Background Fetch | ❌ |
| Web Bluetooth / USB / HID | ❌ |
| Storage quota | **比较激进的回收**：未"添加到主屏幕"的站点 7 天不访问就清掉 |

→ iOS 上的 PWA 体验**显著差于 Android**。重度依赖后台同步的应用，iOS 端只能走原生壳子（Capacitor / Tauri）。

---

## 调试技巧

| 场景 | 做法 |
|---|---|
| SW 老不更新 | DevTools → Application → Service Workers → **"Update on reload"** 勾上 |
| 想强制清掉 SW | DevTools → Application → **"Unregister"** + 清 Storage |
| 看 SW 控制了哪些 client | `navigator.serviceWorker.controller` |
| 看 SW 内部日志 | DevTools 顶部下拉切到 SW worker context（独立 console） |
| 模拟离线 | DevTools → Network → Throttling → **Offline** |
| 看 Cache 内容 | DevTools → Application → Cache Storage |
| 看 Manifest 是否可安装 | DevTools → Application → Manifest → 看红色警告 |

---

## 一句话总结

> **Service Worker 是浏览器和网络之间的可编程代理**；**PWA 是用这个代理 + 一组现代 Web API 把网页做成准原生 App** 的产品形态。
>
> 工程上最容易翻车的两件事：
> - 缓存版本管理（更新机制 / skipWaiting 副作用）
> - iOS / Safari 兼容（关键能力缺失）
$content$,
  'quiz', 'medium',
  ARRAY['frontend','service-worker','pwa','offline','caching','workbox'],
  NULL
);
