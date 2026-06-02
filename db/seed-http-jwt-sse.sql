-- 3 cards: HTTP/1 basics (consolidated), JWT, SSE.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. HTTP/1 综合
-- ─────────────────────────────────────────────────────────────────────────────
(
  'HTTP/1 基础 · URI / 方法 / TCP / 缓存 / Cookie / HTTPS',
$content$
## URL vs URI

**URL 是 URI 的子集。**

- **URI** (Uniform Resource Identifier) —— 用来**标识**一个资源。只要能唯一标识，就是 URI，不管能不能访问。
- **URL** (Uniform Resource Locator) —— 用来**定位**一个资源。必须包含**如何访问**（协议 + 地址）。

举例：
- `https://example.com/x` —— **URL**（也是 URI）
- `urn:isbn:0451450523` —— **URN**（URI 但不是 URL，只是标识，不告诉你怎么访问）
- `mailto:a@b.com` —— **URI**

---

## MIME

Web 服务器为所有 HTTP 对象数据附加一个 **MIME 类型**，浏览器据此决定如何处理该内容。对应响应头的 **`Content-Type`** 字段。

常见：

- `text/html` / `text/plain` / `text/css`
- `application/json` / `application/javascript` / `application/octet-stream`
- `image/png` / `image/webp` / `image/avif`
- `multipart/form-data` （文件上传）

> **`Content-Type` sniffing** —— 老浏览器为了"友好"会在内容看着是 HTML 时**忽略 MIME** 显示成 HTML，造成 XSS。现代浏览器默认开启 `X-Content-Type-Options: nosniff`，**禁止猜测**。

---

## HTTP 报文

- **纯文本**
- **起始行 + 首部 + 主体**
- 起始行和首部的每一行都以 **CRLF（`\r\n`）** 结尾
- 首部和主体之间一个**空行（仅 CRLF）**作为分隔

```
GET /index.html HTTP/1.1\r\n
Host: example.com\r\n
Accept: text/html\r\n
\r\n
```

---

## 常用 HTTP 方法

| 方法 | 语义 | 幂等 | 缓存 |
|---|---|---|---|
| **GET** | 获取资源 | ✅ | ✅（无 body 时）|
| **HEAD** | 只获取首部 | ✅ | ✅ |
| **POST** | 创建资源 | ❌ | 一般不缓存 |
| **PUT** | 整体替换 | ✅ | ❌ |
| **PATCH** | 局部更新 | ⚠️ 不保证 | ❌ |
| **DELETE** | 删除 | ✅ | ❌ |
| **TRACE** | 诊断（原样回显） | ✅ | ❌ |
| **OPTIONS** | 主要用于 CORS preflight | ✅ | — |

> **GET 携带 body 缓存失效** —— 规范允许但语义混乱，工具不一定支持。GET 不应有 body。

---

## HTTP 状态码

| 区间 | 含义 | 代表 |
|---|---|---|
| **1xx** | 信息性 | `100 Continue` / **`103 Early Hints`** |
| **2xx** | 成功 | `200` / `201 Created` / `204 No Content` / `206 Partial Content`（断点续传） |
| **3xx** | 重定向 | `301`（永久）/ `302`（临时）/ `304 Not Modified`（协商缓存）/ `307`/`308`（保持方法的重定向） |
| **4xx** | 客户端错误 | `400` / `401 Unauthorized` / `403 Forbidden` / `404` / `409 Conflict` / `429 Too Many Requests` |
| **5xx** | 服务端错误 | `500` / `502 Bad Gateway` / `503 Service Unavailable` / `504 Gateway Timeout` |

> `401` ≠ `403`：401 = "**没认证**"（让你登录）；403 = "**认证了但没权限**"。

---

## 代理 / 网关 / 隧道

- **代理（Proxy）** —— 完全理解内容，且主动参与。一般只做**同协议转发**，具有缓存、访问控制、日志、改请求头等功能。
    - 示例：科学上网用的 SOCKS 代理
- **网关（Gateway）** —— 职责是**协议转换**，让使用不同协议的两端互相通信。它**理解并参与**通信内容。
    - 示例：浏览器用 HTTP 请求一个 FTP 文件，中间网关把 HTTP 转成 FTP
- **隧道（Tunnel）** —— 职责是**透明转发**，把数据原封不动搬过去，**自己完全不理解内容**。
    - 示例：HTTPS 穿越 HTTP 代理 —— 客户端发 **`CONNECT`** 请求建立隧道，之后的 TLS 加密数据直接穿过去，代理看不懂也不管

---

## URL 编码

```js
encodeURIComponent('Hello world&a=1');  // 'Hello%20world%26a%3D1'  全部编码
encodeURI('https://x.com/path?q=中文');  // 保留 URL 结构，只编码中文/空格
```

- **`encodeURIComponent`** —— 把每个**保留字符**（`& = ? / ;` 等）也编码。**给 query 字符串的值用这个**。
- **`encodeURI`** —— 保留 URL 的基本结构。**整段 URL 用这个**。
- **decodeURIComponent / decodeURI** —— 反向

---

## TCP 三次握手

- **第一次**：客户端发 `SYN`，携带随机初始序列号 `seq=x`，进入 `SYN_SENT`。"我想建立连接，我的起始序号是 x"
- **第二次**：服务器回 `SYN+ACK`，携带自己的 `seq=y`，确认 `ack=x+1`，进入 `SYN_RCVD`。"我同意，我收到了 x，我起始序号 y"
- **第三次**：客户端回 `ACK`，`seq=x+1, ack=y+1`，进入 `ESTABLISHED`。服务器收到后也 `ESTABLISHED`

```
客户端                          服务器
  |---- SYN, seq=x ------------>|
  |                         SYN_RCVD
  |<-- SYN+ACK, seq=y, ack=x+1 -|
  |                             |
  |--- ACK, seq=x+1, ack=y+1 -->|
ESTABLISHED               ESTABLISHED
```

**为什么三次而不是两次**：第三次握手让**服务器确认客户端能正常接收**，防止历史报文意外建连接（已失效的连接请求被服务器接收）。

---

## TCP 四次挥手

TCP 是**全双工**的，两个方向独立。关闭需要每个方向各关一次。

- **第一次**：主动关闭方（客户端）发 `FIN`，`seq=u`，进入 `FIN_WAIT_1`。"我数据发完了"
- **第二次**：服务器回 `ACK`，`ack=u+1`，进入 `CLOSE_WAIT`。客户端进入 `FIN_WAIT_2`。**服务器还能继续发数据**
- **第三次**：服务器数据也发完，发 `FIN`，`seq=w`，进入 `LAST_ACK`
- **第四次**：客户端回 `ACK`，`ack=w+1`，进入 **`TIME_WAIT`**。服务器收到 ACK 进入 `CLOSED`。客户端**等待 `2MSL`** 后才 `CLOSED`

**TIME_WAIT 等 2MSL 的原因**：
1. 确保最后那个 ACK 能到达服务器（如果丢了服务器会重发 FIN）
2. 让本次连接残留的报文段在网络中过期，避免影响下次"端口重用"的新连接

实战：服务端如果有大量 `TIME_WAIT`，是因为**服务端主动关闭**了连接（典型短连接 HTTP）。Linux 可以 `net.ipv4.tcp_tw_reuse=1` 让 TIME_WAIT 端口可复用。

---

## 缓存：协商缓存 vs 强缓存

决策链：

```
1. 浏览器发起请求，先检查强缓存（Cache-Control [优先] / Expires）
2. 强缓存有效 → 直接用缓存，返回 200 (from cache)，不发请求
3. 强缓存过期 → 发请求走协商缓存
   带上 If-None-Match / If-Modified-Since
   服务器对比 ETag [优先] / Last-Modified
4. 资源没变 → 返回 304，浏览器用缓存
5. 资源变了 → 返回 200 + 新资源
```

### Cache-Control 关键 directive

| Directive | 含义 |
|---|---|
| `max-age=N` | 缓存 N 秒 |
| `s-maxage=N` | 只对 CDN / 共享缓存有效 |
| `no-cache` | 每次都走协商缓存（不是"不缓存"） |
| `no-store` | 真·不缓存 |
| `public` / `private` | CDN 可缓存 / 仅浏览器可缓存 |
| `immutable` | 哈希文件名 + 永不失效 → 跳过 304 校验 |
| `stale-while-revalidate=N` | 过期后 N 秒内仍可用 + 后台更新 |

---

## Cookie 与 Session

**Cookie** —— 服务器通过 `Set-Cookie` 响应头写入浏览器的一小段文本数据，之后浏览器每次向同域发请求时会自动通过 `Cookie` 请求头带上。本质上是为了解决 HTTP 无状态的问题。

**Session** —— 服务端的会话机制。用户首次访问时，服务器创建 Session 对象（存内存 / Redis / DB），生成唯一 **Session ID**，通过 `Set-Cookie` 写到浏览器。之后浏览器带上这个 ID，服务器找到对应 Session。

### Cookie 关键属性

| 属性 | 作用 |
|---|---|
| **`HttpOnly`** | JS 读不到（防 XSS 偷 cookie） |
| **`Secure`** | 仅 HTTPS 传输 |
| **`SameSite=Strict\|Lax\|None`** | 跨站请求是否带 cookie（防 CSRF） |
| **`Domain` / `Path`** | 作用域 |
| **`Max-Age` / `Expires`** | 过期时间 |
| **`Partitioned`** | 第三方 cookie 分区存储（隐私沙箱） |

### XSS 跨站脚本攻击

攻击者在页面注入恶意脚本，通过 `document.cookie` 读取 Cookie（含 Session ID），发到自己服务器冒充用户。

**防御**：
- Cookie 设 **`HttpOnly`** → JS 读不到
- **输入/输出转义**防止 XSS 本身（React 默认 escape；危险 API：`dangerouslySetInnerHTML` / `v-html`）
- **CSP（Content-Security-Policy）** 头限制可执行脚本来源

### CSRF 跨站请求伪造

用户登录了 A，访问恶意网站 B。B 藏了一个向 A 发请求的表单/图片，浏览器**自动带上 A 的 Cookie**，服务器以为是用户操作。

**防御**：
- **`SameSite=Lax` / `Strict`** —— 阻止跨站请求带 cookie（现代浏览器默认 Lax）
- **CSRF Token** —— 每个表单带随机 token，提交时校验
- **检查 `Referer` / `Origin` 头**
- **双重 cookie 模式**（cookie + header 都带同一个值）

---

## HTTPS = HTTP + TLS

HTTP 明文传输的 3 个核心问题：
- **窃听** —— 中间人能看到内容
- **篡改** —— 内容可以被改
- **冒充** —— 不知道对方是不是真服务器

HTTPS 用 **加密 / 校验 / 证书** 三个手段分别解决。

### 加密手段

- **对称加密（AES 等）** —— 加解密用同一把密钥，**速度快**，但密钥怎么安全传给对方？
- **非对称加密（RSA / ECDHE）** —— 公钥加密、私钥解密，**安全但慢**，不适合加密大量数据

→ **HTTPS 混用**：用非对称交换出一把**会话密钥**，之后用对称加密通信。

### TLS 1.3 握手（简化）

```
Client                                      Server
  |---- ClientHello (支持的算法 + key share) -->|
  |<--- ServerHello + Cert + 加密参数 ---------|
  |                                           |
  |     [双方算出 session key]                 |
  |                                           |
  |---- Finished (加密) ---------------------->|
  |<--- Finished + Application Data ----------|
  | ... 后续用对称加密传输 ...                  |
```

**TLS 1.3 vs 1.2**：1.3 只要 **1-RTT**（1.2 要 2-RTT）；恢复连接还能做到 **0-RTT**；移除了不安全的加密套件。

### 证书链 + CA

服务器证书由 **CA** 用自己的私钥签名，浏览器内置 CA 的公钥能验签 → 防冒充。证书会写明这把公钥属于哪个域名，不一致就告警。

---

## 分块传输编码（Chunked Transfer Encoding）

服务器**无法提前知道**响应体总大小（动态生成、实时日志、大文件流）时使用。

服务器把响应体切成一个个 **chunk**，每个 chunk 前标明长度，发完一个再发下一个，最后用 **长度为 0** 的块表示结束。

```
HTTP/1.1 200 OK
Transfer-Encoding: chunked
Content-Type: text/plain

7\r\n
Hello, \r\n
6\r\n
World!\r\n
0\r\n
\r\n
```

- 通过 **`Transfer-Encoding: chunked`** 声明
- **不能同时出现 `Content-Length`**，两者互斥
- **HTTP/2 之后不再需要** —— HTTP/2 自身的帧协议天然支持流式

→ **SSE 底层就靠 chunked**（HTTP/1.1）或 HTTP/2 streams 实现。

---

## HTTP/1.0 vs HTTP/1.1

| | HTTP/1.0 | HTTP/1.1 |
|---|---|---|
| 默认连接 | 短连接（一请求一连接） | **持久连接**（keep-alive） |
| Host 头 | 可选 | **必需**（一个 IP 多域名所需） |
| 范围请求 | ❌ | ✅ (`Range` / `206 Partial Content`) |
| Chunked encoding | ❌ | ✅ |
| Pipelining | ❌ | 协议有，但**队头阻塞**导致几乎不用 |
| Cache | 简单 | `ETag` / `If-None-Match` 等完整体系 |

> HTTP/1.1 的 pipelining 因为**队头阻塞**和中间盒兼容问题事实上失败了 —— HTTP/2 的 multiplexing 才真正解决。
$content$,
  'quiz', 'medium',
  ARRAY['backend','http','network','security','tcp','cookie','tls'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. JWT
-- ─────────────────────────────────────────────────────────────────────────────
(
  'JWT (JSON Web Token) · 结构 / 验签 / 无状态认证',
$content$
## JWT 是什么

**无状态的身份认证方案**。和传统 Session 不同 —— **服务端不存任何会话状态**，所有信息编码在 token 里，由客户端持有，每次请求带上，服务端只做**验签**。

JWT 由三部分组成，用 `.` 连接：

```
Header.Payload.Signature
```

### Header

声明类型和签名算法：

```json
{ "alg": "HS256", "typ": "JWT" }
```

然后 `Base64Url` 编码。

### Payload

存放实际数据（称为 **Claims**）。

```json
{
  "iss": "myapp",         // 标准 claims
  "sub": "user_42",
  "iat": 1700000000,
  "exp": 1700003600,
  "userId": 42,           // 自定义 claims
  "role": "admin"
}
```

**⚠️ Payload 只是 Base64 编码，不是加密**，任何人能解码看到内容。**不要放密码 / 敏感信息**。

标准 claims：
- **`iss`** (issuer) 签发者
- **`sub`** (subject) 主题
- **`aud`** (audience) 接收者
- **`exp`** (expiration time) 过期时间
- **`nbf`** (not before) 生效时间
- **`iat`** (issued at) 签发时间
- **`jti`** (JWT ID) 唯一 ID（用于黑名单）

### Signature

```
HMAC-SHA256(
  base64UrlEncode(Header) + "." + base64UrlEncode(Payload),
  secret
)
```

保证 token 没被篡改 —— 改了任何内容签名就对不上。

---

## 工作流程

```
1. 用户登录，服务端验证账号密码
2. 验证通过，服务端用密钥生成 JWT 返回
3. 客户端存储 JWT（localStorage / 内存 / httpOnly cookie）
4. 之后每次请求带：Authorization: Bearer <token>
5. 服务端验证签名 + 检查 exp，通过则信任 Payload 中的用户信息
```

**全程服务端不查 DB / Redis，只做签名验证 → 无状态。**

---

## HS256 vs RS256 vs ES256

| 算法 | 类型 | 优点 | 缺点 |
|---|---|---|---|
| **HS256** | HMAC + SHA256（对称） | 简单、快 | 签发和验证用**同一个 secret**，验证方拿到 secret 也能签发 |
| **RS256** | RSA + SHA256（非对称） | 验证方只需公钥，**不能伪造** | 慢、key 大 |
| **ES256** | ECDSA + SHA256（非对称） | 快、签名小、安全 | 实现要小心（随机数泄露毁所有签名） |
| **EdDSA / Ed25519** | 现代非对称 | 最快、最安全 | 较新，部分老库不支持 |

**选型**：
- 单服务 / 微服务都信任同一个 secret → **HS256**
- 多服务，签发方可信，验证方不可信（如 OAuth 2.0 资源服务器只验签）→ **RS256 / ES256 / EdDSA**

---

## 优势

- **服务端无状态** —— 天然适合分布式 / 微服务架构，不需要 Session 共享
- **跨域友好** —— 放在请求头里不受 Cookie 同源限制
- **自包含** —— Payload 里就有用户信息，减少数据库查询

## 劣势

- **无法主动失效** —— 最大痛点。JWT 一旦签发，**在过期之前服务端无法单方面让它失效**。用户改了密码、被封号了，旧 token 还能用。要解决就得引入黑名单（Redis 存已注销 jti），但这又违背了"无状态"的初衷
- **体积大** —— 比 Session ID 大得多，每次请求都带上增加带宽消耗
- **Payload 不是加密的** —— 只是编码，不能放敏感数据

---

## 解决"无法失效"：Refresh Token 模式

```
登录 → 同时返回：
  - access_token（JWT，短期，15 分钟）
  - refresh_token（长期，7 天，存 DB / Redis）

每次 API：用 access_token（验签即可，无状态）
access_token 过期：用 refresh_token 换新的（查 DB，确认未注销）
用户退出登录：删 refresh_token （access_token 等它自然过期，最多 15 分钟）
```

→ **access_token 保持无状态**（短期 ≈ 不需要主动失效）；
**refresh_token 有状态**（可吊销），但只在刷新时查 DB，频率低。

---

## 存哪里：localStorage vs httpOnly Cookie

| | **localStorage** | **httpOnly Cookie** |
|---|---|---|
| XSS 偷 | **可以**（JS 能读） | **不能**（JS 读不到） |
| CSRF | **不会**（要手动加 header） | **会**（自动带）→ 需要 SameSite + CSRF token |
| 跨域 | 手动加 header，灵活 | 受 Cookie 同源限制 |
| 移动端 / Native | 容易（直接读 storage） | Cookie 处理麻烦 |
| 默认推荐 | SPA + 不同域 API | 同域 Web 应用 |

> **没有完美方案**。XSS 严重的系统 → 用 httpOnly Cookie；CSRF 严重的系统 → 用 localStorage + Bearer。**XSS 是更难防的攻击**，所以 httpOnly Cookie 在多数场景里更稳。

---

## 常见安全坑

### 1. "none" 算法攻击

老 JWT 库支持 `alg: "none"` —— 即"不签名"。攻击者改 header 为 `none` + 改 payload + 不带签名 → 老库验过。

**对策**：库严格白名单算法；现代库默认不接受 `none`。

### 2. 弱 secret

HS256 用 "123456" / "secret" 这种弱密钥 → 暴力破解几秒搞定。**Secret ≥ 32 字节随机字符串**。

### 3. RS256 → HS256 算法混淆

攻击者拿到公钥（公开的），把 algorithm 改成 HS256，用**公钥**当 secret 签 → 服务端用公钥验 HMAC，通过。

**对策**：库默认锁定 algorithm，或显式校验 `header.alg === 'RS256'`。

### 4. Payload 注入

JWT 解码后**任何字段都可能是攻击者控制的**。`userId: 1` 可能被伪造。**只能信任签名验证通过后的 payload**，而且不能在不验签的情况下读。

### 5. 时钟漂移

`exp` 校验需要服务器时钟正确。集群里不同机器时钟不同步可能导致**间歇性 401**。容忍 `± clockTolerance` 几秒。

---

## JWT 兄弟：JWE / PASETO

- **JWE (JSON Web Encryption)** —— 真正**加密**的 JWT（payload 内容也加密）。规范复杂、实现 bug 多，业界用得少
- **PASETO (Platform-Agnostic SEcurity TOkens)** —— 类似 JWT 但**避免了 JWT 的诸多设计缺陷**（如算法混淆），更安全的"现代替代"。但生态远小于 JWT

→ 新项目大多数还是 JWT。要更高安全的特定场景才考虑 PASETO。

---

## 一句话总结

> **JWT = Base64(Header).Base64(Payload).Signature** —— 客户端持有，服务端只验签，**无状态**。
>
> 用 JWT 的两个核心权衡：
> - **无状态的好处**（横向扩容、跨域、低延迟）vs **无法吊销的坏处**
> - 解决方案：**Refresh Token 模式** —— access 短期无状态 + refresh 长期可吊销
$content$,
  'quiz', 'medium',
  ARRAY['backend','auth','jwt','security','session'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. SSE
-- ─────────────────────────────────────────────────────────────────────────────
(
  'SSE (Server-Sent Events) · 服务端推送 · vs WebSocket / Long-polling',
$content$
## SSE 是什么

**Server-Sent Events** —— 一种基于 HTTP 的**服务端向客户端单向推送**技术。

客户端通过 **`EventSource`** API 建立**长连接**，服务端可以持续不断地向客户端发送事件流。

本质上就是一个普通的 HTTP 响应，只不过：
- **`Content-Type: text/event-stream`**
- **响应体不会结束**，服务端持续往里写数据
- 底层基于**分块传输编码**（HTTP/1.1）或 **HTTP/2 的流**

---

## 数据格式

每条消息由若干"字段行"组成，**两个 `\n\n`** 表示一条消息结束：

```
data: 这是第一条消息

data: 这是第二条消息
data: 可以多行（自动拼接，中间用 \n）

event: custom-event
data: {"msg": "带自定义事件名的消息"}

id: 123
data: 带 ID 的消息（用于断线重连）

retry: 5000

```

字段说明：

| 字段 | 含义 |
|---|---|
| `data:` | 消息内容（多行会被拼接） |
| `event:` | 自定义事件名（默认 `'message'`） |
| `id:` | 事件 ID —— 客户端会记住，重连时通过 `Last-Event-ID` 头传回 |
| `retry:` | 客户端断线后多少毫秒重连（默认 ~3s） |
| `:` 开头 | 注释，常用作 keep-alive ping |

---

## 客户端 API（`EventSource`）

```js
const es = new EventSource('/api/events');

es.onmessage = (e) => console.log(e.data);           // 默认 'message' 事件
es.onerror = (e) => console.error('SSE error', e);   // 自动重连

es.addEventListener('custom-event', (e) => {         // 自定义事件
  const payload = JSON.parse(e.data);
});

// 关闭
es.close();
```

### 自动重连机制

`EventSource` **内置自动重连**：

- 连接断开 → 等 `retry` 毫秒（默认 ~3s）→ 自动重连
- 重连请求带 **`Last-Event-ID: <最后收到的 id>`** 头
- 服务端可以根据这个 ID 接着上次的位置继续推

这是 SSE 相比 WebSocket 的一个**核心优势** —— **断线重连无需写一行代码**。

---

## 服务端实现（Node.js）

```js
import { createServer } from 'node:http';

createServer((req, res) => {
  if (req.url === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      // 'X-Accel-Buffering': 'no',     // Nginx 不缓冲 → 立刻 flush
    });

    let id = 0;
    const ticker = setInterval(() => {
      res.write(`id: ${++id}\n`);
      res.write(`event: tick\n`);
      res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`);
    }, 1000);

    // 客户端断开
    req.on('close', () => {
      clearInterval(ticker);
      res.end();
    });
  }
}).listen(3000);
```

关键点：
- 必须 **`Content-Type: text/event-stream`**
- **`Cache-Control: no-cache`** —— 不让中间盒缓存
- 监听 `req.on('close')` —— 客户端关掉 tab 时清理资源
- 每条消息后**两个 `\n`** —— 浏览器才会触发事件

---

## SSE vs WebSocket vs Long-polling

| 维度 | **SSE** | **WebSocket** | **Long-polling** |
|---|---|---|---|
| 传输方向 | **服务端 → 客户端** 单向 | 全双工 | 模拟双向（每次都新请求） |
| 协议 | HTTP | 独立协议（ws/wss） | HTTP |
| 自动重连 | **内置** | 需自己写 | 每次都新建 |
| 文本/二进制 | 仅文本 | 都支持 | 文本（base64 编二进制） |
| 防火墙 / 代理 | 友好（普通 HTTP） | 部分代理拦截 | 最友好 |
| 浏览器支持 | 现代全支持（**IE 不支持**） | 现代全支持 | 全支持 |
| 实现复杂度 | **极简** | 中等 | 复杂（手动管理状态） |
| HTTP/2 多路复用 | ✅ | ❌（独立 TCP） | ✅ |
| 适合 | **通知、日志、AI streaming** | 双向实时（聊天、协作、游戏） | 老浏览器兜底 |

### 何时选 SSE

- **服务端推送为主**，客户端发请求是另一个普通 HTTP 调用（**ChatGPT 的回答流就是 SSE**）
- 需要**自动重连**且无需自己实现
- 已经在用 HTTP 生态（Cookie / Auth header / CDN / load balancer）
- 不需要二进制 / 高频双向

### 何时选 WebSocket

- 真·**双向高频**（白板协作、实时游戏、多人编辑）
- 需要**二进制**（音视频、压缩数据）
- 客户端主动推数据很频繁

### Long-polling 是历史方案

新项目除非要兼容极老的浏览器（IE9-），否则用 SSE / WebSocket。

---

## 浏览器连接数限制（坑）

**HTTP/1.1 下，每个域名最多 6 个并发 TCP 连接**。SSE 占一个连接 → 同个 tab 多打几个 SSE 就**卡死后续 HTTP 请求**。

对策：
- **用 HTTP/2 / HTTP/3** —— 多路复用，单 TCP 上承载几乎无限并发流
- **合并 SSE 连接** —— 一个连接复用多种事件类型，用 `event:` 字段区分
- **`navigator.locks`** 协调多 tab 共享 SSE

---

## 实战 Gotchas

1. **代理 / Nginx 缓冲** —— 默认 Nginx 会缓冲响应。要加 `proxy_buffering off;` 或响应头 `X-Accel-Buffering: no`，否则消息卡到很大才下发
2. **Cloudflare 等 CDN 有超时上限**（默认 100s），长连接会被切。需要服务端**定期发 keep-alive 注释** `:\n\n` 防止超时
3. **CORS** —— `EventSource` 支持 CORS，但**不支持自定义 headers**。如果需要自定义 auth header → 用 [`fetch-event-source`](https://github.com/Azure/fetch-event-source) 库（基于 fetch 模拟 EventSource）
4. **凭据** —— `new EventSource(url, { withCredentials: true })` 才会带 Cookie
5. **客户端文本编码** —— 浏览器固定 UTF-8 decode；服务端要保证发 UTF-8

---

## AI 时代的 SSE 大复兴

OpenAI / Anthropic / DeepSeek 等 LLM API 的 **streaming 响应全部基于 SSE**（或类 SSE 的 chunked encoding）：

```
data: {"choices":[{"delta":{"content":"Hello"}}]}

data: {"choices":[{"delta":{"content":" world"}}]}

data: [DONE]

```

→ 学好 SSE = 学好怎么对接所有 LLM 流式 API。

---

## 一句话总结

> **SSE = HTTP 长连接 + `text/event-stream` + 自动重连**。
>
> 优势：
> - **轻量** —— 一个 `EventSource` API 就够
> - **HTTP 生态全套适用**（auth / CDN / proxy）
> - **断线重连 + Last-Event-ID 续传**内置
>
> 选 SSE 还是 WebSocket 的判断：
> **服务端推为主 → SSE**，**双向高频 → WebSocket**。
$content$,
  'quiz', 'medium',
  ARRAY['backend','sse','real-time','http','streaming','websocket'],
  NULL
);
