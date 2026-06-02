-- CORS quiz card.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'CORS · 跨域资源共享 · 简单请求 / 预检 / 凭证',
$content$
## CORS 是什么

**Cross-Origin Resource Sharing** —— W3C 标准，用一组 HTTP 头让浏览器和服务器协商"**允许跨源访问哪些资源**"。

CORS 不是一个"安全功能"本身 —— 它是**对同源策略（SOP）的放开机制**。

### Same-Origin Policy（SOP）回顾

浏览器默认禁止 JS 跨"源"访问。**"源" = `protocol + host + port`** 完全一致。

| 当前页 | 目标 URL | 同源？ |
|---|---|---|
| `https://a.com` | `https://a.com/api` | ✅ |
| `https://a.com` | `http://a.com` | ❌（协议不同） |
| `https://a.com` | `https://a.com:8080` | ❌（端口不同） |
| `https://a.com` | `https://b.com` | ❌（host 不同） |
| `https://a.com` | `https://sub.a.com` | ❌（subdomain 也算不同源） |

→ CORS 就是 SOP 的"配套豁免协议"。

---

## 简单请求 (Simple Request)

满足**全部条件**的请求是"简单请求"，**不会触发 preflight**：

### 方法限定

- `GET`
- `HEAD`
- `POST`

### 头部限定（除浏览器自动设置外）

- `Accept`
- `Accept-Language`
- `Content-Language`
- `Content-Type`

### Content-Type 限定

只允许三种：

- `application/x-www-form-urlencoded`
- `multipart/form-data`
- `text/plain`

⚠️ **`application/json` 不在列表里** —— 现代前端 `fetch` 默认发 JSON，**几乎所有 API 都触发 preflight**。

### 其他限定

- 请求中**没有 ReadableStream** 作为 body
- 没有注册 `XMLHttpRequest.upload` 的事件监听器

### 简单请求流程

```
浏览器 ──[GET + Origin: https://a.com]──> 服务器
浏览器 <──[200 + Access-Control-Allow-Origin: https://a.com]── 服务器
   ↓
匹配？  → JS 拿到数据
不匹配？→ 浏览器拦截，控制台报 CORS 错误（注意：服务器请求实际已发出，副作用已发生）
```

> **重要**：CORS 是**浏览器**层面的限制 —— 服务器请求**真的发出去了**，副作用真的产生了（数据库写了、邮件发了）。浏览器只是**不让 JS 读响应**。

---

## 复杂请求 (Preflighted Request)

不满足简单请求条件的 —— 比如 `Content-Type: application/json`、`PUT` / `DELETE`、带 `Authorization` 头 —— 都是复杂请求。

相较简单请求多一个**预检过程（Preflight）**：

```
[1] OPTIONS Preflight
浏览器 ──[OPTIONS
            Origin: https://a.com
            Access-Control-Request-Method: PUT
            Access-Control-Request-Headers: content-type, authorization]──> 服务器

浏览器 <──[204 No Content
            Access-Control-Allow-Origin: https://a.com
            Access-Control-Allow-Methods: PUT, POST, GET, DELETE
            Access-Control-Allow-Headers: content-type, authorization
            Access-Control-Max-Age: 86400]── 服务器
   ↓
不通过 → 直接报错，到此结束（实际请求根本不发）
通过   ↓

[2] 实际请求
浏览器 ──[PUT + Origin + Content-Type: application/json + body]──> 服务器
浏览器 <──[200 + Access-Control-Allow-Origin + 数据]── 服务器
   ↓
匹配？→ JS 拿到数据
```

→ 复杂请求**先问一句"我能不能这样做"**，server 同意才真发。

### Preflight 缓存：`Access-Control-Max-Age`

```
Access-Control-Max-Age: 86400   // 缓存 24 小时
```

浏览器在这段时间内**不再发 OPTIONS**，直接发实际请求。**生产环境一定要设**，否则每个请求都多一轮 OPTIONS。

- Chrome 上限：**2 小时**（7200）
- Firefox 上限：**24 小时**（86400）

---

## 携带凭证（Cookie / Authorization / TLS 客户端证书）

跨域请求**默认不带凭证**。要带需要双向声明：

### 前端

```js
fetch('https://api.example.com/data', {
  credentials: 'include',   // 跨域带 Cookie
});
```

`credentials` 三个值：
- `omit` —— 不带（默认对**跨域**请求是这个）
- `same-origin` —— 同源才带（默认对**同源**请求是这个）
- **`include`** —— 总是带

### 服务端

必须返回：

- **`Access-Control-Allow-Credentials: true`**
- **`Access-Control-Allow-Origin` 不能是 `*`**，必须是**具体的源**（如 `https://a.com`）
- **`Access-Control-Allow-Headers` 不能是 `*`** —— 同样限制
- **`Access-Control-Allow-Methods` 不能是 `*`** —— 同样限制

→ 这是 CORS 安全设计的核心：**带凭证 = 必须显式声明信任来源**，不允许通配。

### Cookie 还需要 `SameSite`

```
Set-Cookie: session=xyz; SameSite=None; Secure
```

- **`SameSite=None`** —— 才能在跨站请求里发送（注意：现代浏览器默认是 `Lax`）
- **`Secure`** —— `SameSite=None` 时**必须**配 `Secure`（HTTPS only）

---

## 完整 CORS 响应头清单

| 头 | 用途 |
|---|---|
| `Access-Control-Allow-Origin` | 允许的源（具体 origin / `*` / 不返回 = 拒绝） |
| `Access-Control-Allow-Methods` | 允许的方法（preflight） |
| `Access-Control-Allow-Headers` | 允许的自定义请求头（preflight） |
| `Access-Control-Allow-Credentials` | 是否允许带凭证 |
| `Access-Control-Max-Age` | preflight 缓存秒数 |
| **`Access-Control-Expose-Headers`** | **让 JS 能读到的自定义响应头**（默认 JS 只能读"安全"头：Cache-Control / Content-Language / Content-Type / Expires / Last-Modified / Pragma） |

### `Expose-Headers` 实战

```
Access-Control-Expose-Headers: X-Total-Count, X-Pagination
```

```js
const res = await fetch(url);
const total = res.headers.get('X-Total-Count');   // 拿到了
```

→ 自定义响应头（分页 / 限流剩余次数 / 自定义错误码等）不暴露的话，JS 拿到 `null`。

---

## 服务端实现示例

### Express

```js
import cors from 'cors';

app.use(cors({
  origin: ['https://a.com', 'https://b.com'],   // allowlist
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400,
}));
```

### 手写 / Edge function

```js
function handleCORS(req, res) {
  const origin = req.headers.origin;
  const allowed = ['https://a.com', 'https://b.com'];
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');               // ⚠️ 关键：CDN 按 Origin 分缓存
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }
  // ... 实际处理
}
```

> **`Vary: Origin`** —— 反向代理 / CDN 缓存响应时按 Origin 分桶，避免把 A 的 CORS 响应误返给 B。**经常被遗漏**。

---

## 常见错误与排查

| 错误信息 | 原因 |
|---|---|
| `No 'Access-Control-Allow-Origin' header is present` | 服务器没回 ACAO 头 |
| `The 'Access-Control-Allow-Origin' header has a value '*' that is not equal to the supplied origin` | 带凭证场景用了 `*` |
| `Method PUT is not allowed by Access-Control-Allow-Methods` | preflight 没放行该方法 |
| `Request header 'X-Foo' is not allowed by Access-Control-Allow-Headers` | preflight 没放行该 header |
| `Credentials flag is true, but ACAO is not set to the request's origin` | 带凭证时 ACAO 必须 echo 具体 origin |

### 排查思路

1. **DevTools Network → 看 OPTIONS 请求**（不是后面的 PUT）—— preflight 失败时只能看到 OPTIONS
2. 看响应**有没有 ACAO** —— 没有 = server 完全没处理 CORS
3. 看 OPTIONS 的 **status code** —— 必须 2xx；很多框架默认 OPTIONS 路由没注册 → 404
4. **`Vary: Origin`** 漏了导致 CDN 缓存污染（A 缓存了 B 的响应）

---

## CORS 误配 = 安全漏洞

**Echo Origin 反射**漏洞：

```js
// ❌ 危险：把客户端送来的任意 Origin 反射回去
res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
res.setHeader('Access-Control-Allow-Credentials', 'true');
```

→ 任何站点都能用用户 Cookie 调你的 API → CSRF + 数据泄漏。

**正确做法**：
- 严格 allowlist 比对 origin
- 不接受未列入 allowlist 的 origin
- **不带凭证的接口**可以用 `*`，但带凭证的**必须显式允许**

---

## CORS 不能解决的问题（容易混淆）

| 问题 | 解决方案 |
|---|---|
| 跨域 JS 抛错（`window.onerror`） | **`crossorigin` attribute** + CORS 配合（让你能拿到错误细节） |
| 跨域 iframe 通信 | **`postMessage`** API |
| 跨域 Worker | 同样需要 CORS，但 Worker URL 必须同源（或用 blob URL） |
| Service Worker fetch 拦截 | SW 内的 fetch 同样受 CORS 限制 |
| Image canvas getImageData "tainted" | 图片标签加 `crossorigin="anonymous"` + 服务器返 CORS |
| `<video>` capture 跨域帧 | 同上 |

---

## 绕过 CORS 的常见方案（开发期）

| 方案 | 原理 | 适用 |
|---|---|---|
| **同域反向代理** | 前端走 `/api/...`，nginx / Vite proxy 转给真实后端 | dev / 不能改后端时 |
| **JSONP** | 通过 `<script>` 标签加载 JSON | 历史方案，**只支持 GET，有 XSS 风险**，新项目别用 |
| **服务端转发** | 自己写一个 `/proxy?url=...` 端点 | 绕开浏览器 CORS，但**警惕 SSRF** |
| **浏览器关 CORS**（如 `--disable-web-security`） | 仅本机 debug | **永远不要让用户这么干** |

---

## 一句话总结

> **CORS = "服务器告诉浏览器：允许这个 origin 来读我的响应"** 的协议。
>
> 工作原理：
> - **简单请求**：直接发 + 浏览器看 ACAO 头决定 JS 能不能读
> - **复杂请求**：先 `OPTIONS` 问一遍 → 通过才真发
> - **带凭证**：origin 不能用通配 + Cookie 要 `SameSite=None; Secure`
>
> 三个最常见生产事故：
> - 忘了 `Access-Control-Max-Age` → 每个 API 调用多一轮 OPTIONS
> - 忘了 `Vary: Origin` → CDN 把 A 的响应给了 B
> - **Echo Origin 反射** → 安全漏洞，CSRF + 数据泄漏入口
$content$,
  'quiz', 'medium',
  ARRAY['frontend','backend','http','cors','security','network'],
  NULL
);
