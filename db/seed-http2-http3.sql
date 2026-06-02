-- HTTP/2 + HTTP/3 comprehensive quiz card.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'HTTP/2 vs HTTP/3 · 多路复用 / HPACK / QUIC / 0-RTT',
$content$
## HTTP/1.x 的问题

- **应用层队头阻塞** —— 多个请求可以共享同一个 TCP 连接，但请求和响应必须严格"**顺序进行**"：前面的请求发出后，必须等它的响应返回完毕，才能继续发送后续请求（pipelining 名义上支持但代理不友好，事实上失败）
- 每次请求都带**全量 Header**（如 `User-Agent`、`Cookie`），无法压缩
- **客户端必须先请求**，服务器才能响应
- 所有数据（请求行、Header）是**纯文本**格式，体积大、解析慢、容易出错
- 所有请求**同等对待**，无法调度
- 粒度粗，不易控制大数据流

### 业界变通方案（HTTP/2 之前）

| 变通 | 原理 | 代价 |
|---|---|---|
| **6 连接 per host** | 浏览器每域名最多 6 个并发 TCP | 多 TCP 握手开销 |
| **域名分片** | a.cdn.com / b.cdn.com / c.cdn.com 拆开 → 突破 6 连接限制 | DNS 多 + TCP 多 + HTTPS 多 |
| **CSS Sprite / 资源合并** | 减少请求数 | 缓存粒度变粗 |
| **内联 CSS / Base64 图** | 内联减少额外请求 | bundle 变大、缓存失效 |

→ 这些 hack 在 HTTP/2 之后**基本都过时了**（甚至变成反优化）。

---

## HTTP/2 的优化

所有数据（请求和响应）都被封装成多个 **"帧"（Frame）**，通过统一的**二进制格式**在**一个 TCP 连接**中传输。

### 帧（Frame）

帧拆分规则按照"**帧最大负载大小**"进行，默认 **16KB**（可通过 SETTINGS 调到 16MB-1）。

#### 帧头基本结构（9 字节）

```
+-----------------------------------------------+
|                 Length (24)                   |
+---------------+---------------+---------------+
|   Type (8)    |   Flags (8)   |
+-+-------------+---------------+-------------------------------+
|R|                 Stream Identifier (31)                      |
+=+=============================================================+
|                   Frame Payload (0...)                      ...
+---------------------------------------------------------------+
```

- **Length** —— 帧体（Payload）长度
- **Type** —— 帧类型：DATA / HEADERS / SETTINGS / PRIORITY / RST_STREAM / PING / GOAWAY / WINDOW_UPDATE / CONTINUATION / PUSH_PROMISE
- **Flags** —— 标志位（如 END_STREAM / END_HEADERS）
- **Stream Identifier** —— 这个帧属于哪个流。最高位保留位（R），固定为 0
  - **客户端发起的 stream ID 是奇数**，服务器发起的是偶数
  - ID 严格递增，不复用

### 优化 1: 多路复用（Multiplexing）

一个 Origin 仅对应**一个 TCP 连接**。在这个连接中，**多个请求的多个帧可以相互交错传输**：

```
stream 1: HEADERS, DATA, DATA, ...      ─┐
stream 3: HEADERS, DATA, DATA, ...      ─┼─ 同一个 TCP 连接里交错发送
stream 5: HEADERS, DATA, DATA, ...      ─┘
```

→ 彻底消除**应用层**队头阻塞。一个请求慢不会卡其他请求（在 HTTP 协议层面）。

### 优化 2: 二进制帧格式

替代 HTTP/1.1 的文本格式 —— 传输和解析效率更高，**无歧义**（HTTP/1.1 的奇葩边界 case 全消失）。

### 优化 3: 流优先级

同级别的帧会按权重比例分配资源，**位于父级的帧会被优先处理**。服务器**不保证**完全按照优先级分配资源（防饿死）。

通过 HEADERS 帧或 PRIORITY 帧可以调整流之间的**权重和依赖关系**：

```
stream 1 (priority 200) ── 父流
       └── stream 3 (priority 100)
       └── stream 5 (priority 100)
```

→ 浏览器可以告诉服务器："优先 CSS，再图片"，服务器尽量按此分配带宽。

> **实战**：流优先级在很多 server 实现里**不够好**，HTTP/3 用更简洁的 [RFC 9218 Priority](https://www.rfc-editor.org/rfc/rfc9218) 重新设计了优先级模型。

### 优化 4: 服务器推送（Server Push）

- 客户端请求 `/index.html`，对应 stream X
- 在 stream X 上，服务器发起一或多个 **`PUSH_PROMISE`** 帧，告诉客户端："我打算在新开的 stream Y 上给你推 `/foo.css`"
- 服务器在 stream Y 上推送资源的 HEADERS + DATA 帧
- 客户端可以通过 **`RST_STREAM`** 拒绝推送，或在 SETTINGS 协商阶段关闭 PUSH 功能

> ⚠️ **Server Push 已经被废弃** —— Chrome 在 2022 年 [移除了支持](https://chromestatus.com/feature/6302414934114304)：
> - 客户端不知道资源**已在缓存**里 → 推送变重复加载
> - 复杂度高，应用难精确控制
> - **`103 Early Hints`** 是更好的替代（让浏览器自己 preload）

### 优化 5: HPACK 头压缩

HTTP/2 使用 **HPACK** 算法压缩请求和响应头：

- **静态表（Static Table）** —— 预定义 61 个常见 header（`:method`, `:status`, `content-type` 等），用一个索引就替代
- **动态表（Dynamic Table）** —— 客户端和服务器共同维护的"最近见过的 header"表，相同 header 第二次只发索引
- **Huffman 编码** —— 对未在表里的字符串做无损压缩

效果：典型场景能压到原大小的 **10-20%**。

### 优化 6: 流量控制

每个 stream 和整个 connection 都有**接收窗口**（receive window）。接收方通过 `WINDOW_UPDATE` 帧告诉发送方"我还能收多少"，**按流粒度防止快发送方淹没慢接收方**。

---

## HTTP/2 的问题

### 1. TCP 级别的队头阻塞

TCP 保证**字节流顺序严格一致**。当一个 TCP 包丢失时，**所有后续的包都被阻塞在内核**，应用层拿不到数据。

→ HTTP/2 在单 TCP 连接上跑多个 stream，**一个包丢 = 所有 stream 都卡** —— 比 HTTP/1.1 + 6 连接还惨（丢包只影响 1/6 的流）。

**弱网下，HTTP/2 比 HTTP/1.1 可能更差**。

### 2. 连接迁移成本高

TCP 连接基于 **IP + 端口号**，因此网络切换（WiFi → 4G、移动场景）必须重新建立连接：

- 普通 TCP 需要**三次握手**
- HTTPS 还涉及 **TLS 握手、密钥协商交换**

每次切换 = ~200-500ms 中断。

### 3. TLS over TCP 建连慢

TCP 三次握手（1 RTT）+ TLS 1.2 握手（2 RTT） = 3 RTT 才能发第一字节数据。TLS 1.3 减到 2 RTT，但还是慢。

---

## HTTP/3 的优化

HTTP/3 的**核心改动是把传输层从 TCP 换成了 QUIC**，**应用层语义和 HTTP/2 几乎一样**。

### QUIC 是什么

**Quick UDP Internet Connections** —— Google 2012 年开始做，2021 年 [RFC 9000](https://www.rfc-editor.org/rfc/rfc9000) 标准化。**基于 UDP 在用户态实现**了：

- 可靠传输（重传、顺序校验）
- 拥塞控制
- **多路复用**（独立 stream，互不阻塞）
- **TLS 1.3 内建**（不是 over TLS，是合并到协议里）
- **连接迁移**（Connection ID）

### 为什么基于 UDP

- **TCP 在内核**里，改不动（要改全网设备）
- **UDP 是"裸传输"**，QUIC 可以在用户态实现自己的传输逻辑，**快速迭代**
- 中间盒（路由器、防火墙）对 UDP 行为更"傻"，少干预

### 优化 1: 真·多路复用（消除 TCP HoL）

每个 stream 在 QUIC 层**独立传输、独立重传**。一个 stream 丢包不影响其他 stream。

```
TCP: 一个包丢 → 整条 TCP 流卡
QUIC: 一个 stream 丢包 → 只这个 stream 暂停，其他 stream 继续
```

### 优化 2: 连接迁移（Connection Migration）

QUIC 用 **Connection ID** 标识连接，**不依赖 IP + 端口**：

- 手机从 WiFi 切到 4G → IP 变了 → **TCP 必须重连**
- QUIC 客户端继续用同一个 Connection ID 发包 → 服务器认得 → **连接不掉，0 中断**

→ 移动场景体验巨大提升。

### 优化 3: 0-RTT 建连

- **首次连接**：1-RTT（比 TLS over TCP 的 2-3 RTT 已经快很多）
- **已建过连接的服务器再连**：**0-RTT** —— 客户端在第一个握手包里就能带应用数据

⚠️ **0-RTT 有重放攻击风险** —— 攻击者抓 0-RTT 包，重新发给服务器；服务器没法区分。所以 **0-RTT 只应该用于"幂等"请求**（GET），不能用来转账。

### 优化 4: TLS 1.3 内建

TLS 1.3 不再是 over TCP 的独立层，而是**和 QUIC 协议合并**：

- 加密握手和数据传输紧密交织
- 握手包含**所有 TLS 协商** —— 无需再握 1 次手

### 优化 5: QPACK 头压缩

HTTP/3 的头压缩用 **QPACK**（HPACK 改造版）。

**为什么不直接用 HPACK**：HPACK 依赖**严格有序**的动态表更新 —— 但 QUIC 的 stream 是**乱序到达**的，HPACK 会失同步。QPACK 通过**单独的编码器流 / 解码器流**避免乱序问题。

效果和 HPACK 接近，但多消耗一个 stream。

### 帧类型变化

HTTP/3 的帧定义在 QUIC stream 之上：

- HEADERS / DATA 帧仍在
- **PRIORITY 帧移到 HTTP 层**（用 RFC 9218）
- **PUSH_PROMISE** 保留但更少用（同样的 server push 问题）
- **去掉了** WINDOW_UPDATE / PING / SETTINGS 中的一部分 —— 由 QUIC 层处理

---

## 实战 / 部署

### 浏览器 / 服务端支持

- **HTTP/2** —— 全面支持（含老 Edge / IE 11 in Win10+）
- **HTTP/3** —— Chrome / Firefox / Safari 全支持；服务端：nginx / Caddy / Cloudflare / Vercel / Akamai 全部支持

### Alt-Svc 协议升级

服务器响应 HTTP/1 或 HTTP/2 请求时附带：

```
Alt-Svc: h3=":443"; ma=86400
```

告诉客户端"下次试试 HTTP/3 走 UDP/443"。客户端缓存这个信息，**下次直接上 HTTP/3**。

### UDP 阻断的兜底

部分网络（企业防火墙、老 NAT）**屏蔽 UDP/443** → HTTP/3 起不来。客户端**回退到 HTTP/2**。

### Adoption（2026）

- HTTP/2：**~96%** TLS 流量
- HTTP/3：**~30%** TLS 流量（持续上涨；Cloudflare / Google 大力推）

### 实际收益

- **桌面 + 良好网络**：HTTP/3 收益微小（HTTP/2 已经够快）
- **移动 / 弱网 / 高丢包**：HTTP/3 显著优于 HTTP/2（连接迁移 + 无 TCP HoL）
- **首屏延迟敏感**：0-RTT 让重复访问起步更快

---

## 对比总表

| | **HTTP/1.1** | **HTTP/2** | **HTTP/3** |
|---|---|---|---|
| 传输层 | TCP | TCP | **QUIC over UDP** |
| 多路复用 | ❌（顺序串行） | ✅（应用层） | ✅（**真正**，传输层独立 stream） |
| TCP 队头阻塞 | 有 | **有** | **无** |
| 头压缩 | ❌ | HPACK | QPACK |
| 二进制 | ❌ 文本 | ✅ | ✅ |
| Server Push | ❌ | ✅（但已废弃） | ✅（同样不推荐） |
| TLS | over TCP | over TCP | **内建** |
| 建连 RTT | 2-3 | 2-3 | **1（首次）/ 0（恢复）** |
| 连接迁移 | ❌ | ❌ | ✅ Connection ID |
| 优先级模型 | ❌ | 树状（实现差） | RFC 9218（重新设计） |

---

## 一句话总结

> **HTTP/2 把应用层队头阻塞拆了**（多路复用 + 二进制帧 + HPACK），但留下了 TCP 队头阻塞。
>
> **HTTP/3 用 QUIC 把传输层也换了**（独立 stream + Connection ID + 0-RTT），彻底解决。
>
> 实战影响：
> - 桌面好网络 → 升 HTTP/2 已经够；升 3 收益边际
> - 移动 / 弱网 / 全球用户 → HTTP/3 显著省事，**Cloudflare/Akamai/Vercel 开个开关**就行
> - 旧 hack（域名分片 / CSS sprite / inline base64）→ HTTP/2+ 已经反优化
$content$,
  'quiz', 'medium',
  ARRAY['backend','http','http2','http3','quic','network','performance','tls'],
  NULL
);
