-- 6 full-stack system design quiz cards.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. URL Shortener
-- ─────────────────────────────────────────────────────────────────────────────
(
  'System Design · 短链接服务 (bit.ly 类) · 全栈',
$content$
## 业务需求

- 用户输入长 URL → 生成短链（如 `https://s.io/aB3xY9`）
- 短链访问 → 302 重定向到原 URL
- **统计**：点击次数 / 来源 / 地理 / 时间
- **管理**：注册用户的短链列表 + 自定义短链 + 过期时间
- 规模：100M 短链 / 天，read:write ≈ 100:1

## 全局架构

```
┌────────────────┐                ┌─────────────────────┐
│   Web 前端      │                │  Mobile / API 调用方  │
│  (Next.js)     │                │                     │
└────────┬───────┘                └─────────┬───────────┘
         │                                  │
         │  HTTPS                           │  HTTPS
         ▼                                  ▼
    ┌────────────────────────────────────────────────┐
    │         CDN (Cloudflare / Vercel Edge)         │
    │   ── 静态资源、地理路由、DDoS 防护              │
    └─────────────┬────────────────────────┬─────────┘
                  │                        │
        ┌─────────▼─────────┐    ┌─────────▼─────────┐
        │  Redirect API     │    │  Mgmt API         │
        │  GET /:code       │    │  POST /shorten    │
        │  (Edge Function)   │    │  GET /me/links    │
        │                    │    │                   │
        └────────┬──────────┘    └────────┬──────────┘
                  │                        │
                  │            ┌────────────┘
                  ▼            ▼
            ┌────────────────────────┐         ┌──────────────────┐
            │   Redis Cache          │ ◄────── │  Postgres        │
            │   code → url 热数据     │         │  users / links    │
            │   90%+ hit rate        │         │  (索引 code)       │
            └─────────┬──────────────┘         └────────┬─────────┘
                      │ miss                            │
                      └─────────────────────────────────┘

                ┌─────────────────────────────────┐
                │  Async Click Pipeline           │
                │                                 │
                │  Edge → Kafka → Workers →       │
                │  ClickHouse (分析)               │
                └─────────────────────────────────┘
```

## 核心设计点

### 短码生成

3 种方案：

| 方案 | 长度 | 冲突 | 实现 |
|---|---|---|---|
| **自增 ID + Base62 编码** | 短 (5-7 字符) | 0 | 简单；但暴露增长率 |
| **随机字符** | 6-8 字符 | 需查重 + 重试 | 中等 |
| **HashID / Snowflake → Base62** | 6-10 | 极低 | 推荐 |

Base62（`[a-zA-Z0-9]`） 62^6 = 568 亿种，6 字符够大多场景。

### Redirect 路径（极致性能）

```
GET /:code  →  Edge Function  →  Redis  →  302 Location
                                  ↓ miss
                                Postgres
```

- **Edge Function** 部署到全球 200+ POPs → P99 < 50ms
- **Redis 热数据** 命中 90%+（短链遵循长尾分布，热门极热）
- **302 vs 301**：用 **302**（每次请求都走服务端，可统计；301 会被浏览器永久缓存）

### Click 统计：异步流水线

**不能**在 redirect 路径同步写入 ClickHouse —— 会拉高 P99。流水线：

```
Edge Function 仅做：① 读 cache  ② 302  ③ 推 1 条 Kafka 消息（fire-forget）

Worker 消费 Kafka → 批量写 ClickHouse（每 10s flush 或 10000 条）
```

### 前端设计

- **管理后台**：Next.js + Server Components（SSR 列表）+ Server Actions（创建短链）
- **二维码**：客户端 `qrcode.js` 即时生成，无需后端
- **复制**：`navigator.clipboard.writeText()`
- **统计图**：服务端拿 ClickHouse 聚合数据，前端 Chart.js / Recharts 渲染
- **首页 redirect**：直接走 Edge Function，**不渲染 React**

### 数据库

- **Postgres** 存元数据（user_id / code / long_url / created_at / expires_at）
  - 主键 `code`（唯一索引）
  - 二级索引 `user_id` + `created_at` （列表查询）
- **Redis** 缓存：`SETEX code 86400 long_url`
- **ClickHouse** 存事件：`(code, ts, ip, referer, country)` —— 按 code 分区 + 按 ts 排序

## 关键 Trade-offs

| 决策 | 选 A | 选 B | 选择理由 |
|---|---|---|---|
| 短码生成 | 自增 ID | 随机 hash | 不想暴露规模 → 随机 |
| Cache 策略 | Cache-first | Network-first | Read-heavy → Cache-first |
| 写 ClickHouse | 同步 | **异步** | 不能拖累 redirect 延迟 |
| Edge runtime | Node | **Edge** | 全球低延迟 / 简单 redirect 逻辑 |

## 失败模式

| 故障 | 影响 | 缓解 |
|---|---|---|
| Redis 挂 | 退到 Postgres，延迟升 | 多 region 主从 + Postgres 读副本兜底 |
| Postgres 慢查询 | 创建短链失败 | 写 buffer + 缓冲队列 |
| Kafka 满 | Click 统计丢 | 边缘可降级到 sample（10% 上报） |
| 热门短链被打爆 | 单 cache key 热点 | 客户端缓存 `Cache-Control: max-age=60` 减压 |

## 一句话

> **极致优化 redirect 路径**（Edge + Cache + 302）+ **异步统计流水线**（不阻塞用户）+ **管理后台**（Next.js + Server Actions）。
$content$,
  'quiz', 'hard',
  ARRAY['system-design','full-stack','architecture','cache','cdn','high-throughput'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Real-time Chat
-- ─────────────────────────────────────────────────────────────────────────────
(
  'System Design · 实时聊天系统 · 全栈 · WebSocket / 消息推送',
$content$
## 业务需求

- 1v1 / 群聊 / 频道
- **实时**消息推送（毫秒级）
- **离线**消息（用户上线时收到错过的）
- 已读 / 未读 / 输入中提示
- 多端同步（移动 + Web + Desktop）
- 规模：100M DAU，单消息 P99 < 200ms

## 全局架构

```
                      ┌──────────────────────────────┐
                      │   Client (Web / iOS / etc.)   │
                      └──────────┬───────────────────┘
                                 │ WebSocket (长连)
                                 │ + REST (历史 / 上传)
                                 │
                                 ▼
        ┌────────────────────────────────────────────────┐
        │           Gateway / Connection Layer            │
        │   ── 每实例几十万长连接，按 user_id 路由         │
        │   ── 维护 user → connection 映射               │
        │   ── 心跳 / 重连 / 鉴权                        │
        └────────────┬────────────────────┬──────────────┘
                     │                    │
              ┌──────▼──────┐      ┌──────▼──────┐
              │  Msg API     │      │  Presence   │
              │  发消息       │      │  在线状态    │
              │  历史拉取     │      │  输入中      │
              └──────┬──────┘      └──────┬──────┘
                     │                    │
                     ▼                    ▼
              ┌──────────────────────────────────┐
              │   Kafka (消息总线)                │
              │   topic: messages / presence     │
              └────────────┬─────────────────────┘
                           │
            ┌──────────────┼───────────────────────┐
            ▼              ▼                       ▼
      ┌──────────┐  ┌──────────────┐        ┌─────────────┐
      │  Push    │  │ Cassandra    │        │ Search      │
      │  Worker  │  │ (消息存储)    │        │ Index (ES)  │
      └─────┬────┘  └──────────────┘        └─────────────┘
            │
            ▼
      ┌──────────────────────────────────┐
      │ APNs / FCM (App 离线推送)         │
      └──────────────────────────────────┘
```

## 核心设计点

### 连接层

- **WebSocket** 优先 / 不通时降级到 **SSE** / **HTTP long-polling**
- 单 gateway 实例承载 **~50k-100k** 长连接（Node + cluster 或 Go）
- **按 user_id hash** 路由 → 同用户多端到同 gateway 实例（同步状态）
- **Redis 维护 user → gateway** 映射，跨实例发消息时查路由

### 发送消息时序

```
A 发消息给 B → 写入 Cassandra (持久化) → 推 Kafka → 各订阅者拿走
            ├─ Push Worker: B 在线？查 user→gateway → 直接 push
            │              不在线？走 APNs/FCM 推送
            └─ Search Worker: 索引到 Elasticsearch
```

### 已读 + 未读 + 已送达

每个消息状态：`sent → delivered → read`

- **delivered**：客户端 ack 收到
- **read**：用户实际打开看到（前端发 `mark_read`）
- **服务端推 delivered/read 回执给发送方**

### 多端同步

- 每端独立 session → 收同样的消息
- 一端 read 后其他端也要更新未读数 → 走 presence channel 广播

### 离线消息

- 用户上线 → 客户端发 `pull_since(last_msg_id)`
- 服务端查 Cassandra `messages where conversation_id=? AND id > last_msg_id`
- 客户端 reconcile 本地 cache + 服务端最新

### 前端核心问题

- **状态管理**：Zustand / Redux 维护 `conversations` + `messages` + `unread`
- **消息列表虚拟化**：长会话 50k 消息 → `react-virtuoso` 滚动只渲染可见部分
- **乐观更新**：发消息时**先在 UI 上显示**（status: sending），ack 后更新 status: sent
- **乱序 + 去重**：消息按 `id` 去重 + 按 `timestamp` 重新排序
- **本地持久化**：IndexedDB 存最近 N 条，断网仍可看历史
- **断线重连**：WebSocket close → 指数退避重连 → 重连成功 pull 增量

## 数据存储

| 数据 | 存储 | 原因 |
|---|---|---|
| **消息** | Cassandra (按 conversation_id 分区，timestamp 排序) | 写密集 + 大数据 + 按时序 |
| **用户 / 群组元数据** | Postgres | 关系性强 |
| **未读数** | Redis (HINCRBY) | 高频读写 |
| **路由映射** | Redis (user → gateway) | 内存级延迟 |
| **搜索** | Elasticsearch | 全文 |
| **媒体** | S3 / 对象存储 | 大文件 |

## Trade-offs

| 决策 | 选择 | 原因 |
|---|---|---|
| 传输协议 | WebSocket | 真·双向、低延迟 |
| 消息顺序 | server-side timestamp + sequence_id | 客户端时钟不可信 |
| 消息存储 | Cassandra 而非 MySQL | 高写吞吐 + 时序友好 |
| Push 是否经过 Kafka | 是 | 解耦 + 失败可重放 + 多消费者 |

## 失败模式

| 故障 | 缓解 |
|---|---|
| Gateway 实例挂 | 客户端自动重连其他实例 + 路由 Redis 移除该实例 |
| Kafka 滞后 | 实时推送降级到"延迟推送"，离线消息不丢 |
| Cassandra 写延迟 | 写入 buffer → 异步落盘；客户端先看到 sending 状态 |
| 单热群（百万人群聊） | fan-out 不写 inbox，改 fan-out-on-read（用户拉取时聚合） |

## 一句话

> **WebSocket 长连接** + **路由层** + **Kafka 总线**（解耦发送和推送）+ **冷热分层存储**（Cassandra 消息 / Redis 路由 / S3 媒体）。难点：百万级长连接的连接层 + 消息顺序一致性 + 多端同步。
$content$,
  'quiz', 'hard',
  ARRAY['system-design','full-stack','websocket','real-time','chat','distributed-systems'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. AI Streaming Chat
-- ─────────────────────────────────────────────────────────────────────────────
(
  'System Design · AI 聊天应用 (ChatGPT 类) · 全栈 · SSE 流式',
$content$
## 业务需求

- 用户和 LLM 多轮对话
- **流式输出**（边生成边显示）
- **会话历史** 持久化 + 跨设备同步
- **rate limiting** + 防滥用
- **多模型切换** (Claude / GPT / DeepSeek)
- **附件** (PDF / 图片) 上下文
- 规模：1M DAU，单次对话 P99 首 token < 1s

## 全局架构

```
┌──────────────────────────────────┐
│   Web 前端 (Next.js)              │
│   • Server Component 渲染列表     │
│   • 'use client' 渲染对话         │
│   • SSE 接收流式 token            │
└────────┬─────────────────────────┘
         │
         │ HTTPS
         ▼
   ┌──────────────────────────────────────┐
   │  Edge Function (Vercel / Cloudflare) │
   │  • 鉴权 (JWT)                         │
   │  • Rate limiting (token bucket)      │
   │  • 路由到对应模型 provider             │
   └────────┬───────────────────────────────┘
            │
   ┌────────┴────────────────────────────────────┐
   │                                              │
   ▼                                              ▼
┌─────────────────────┐                  ┌────────────────────┐
│  AI Gateway          │                  │  Persistence Layer │
│  (LiteLLM /          │                  │  (Postgres + S3)   │
│  Vercel AI Gateway)  │                  │                    │
│  • Provider failover │                  │  conversations     │
│  • Cost tracking     │                  │  messages          │
└────────┬─────────────┘                  │  attachments       │
         │                                 └────────────────────┘
         ▼
┌──────────────────────────────────────────────┐
│  Anthropic / OpenAI / DeepSeek / Self-host   │
└──────────────────────────────────────────────┘
```

## 核心设计点

### 流式输出（SSE）

```
Client ──[POST /chat with prompt]──> Edge Function
                                      ↓
                                 SSE response stream
                                      ↓
Client ◄─── data: {"token": "Hello"} ───
       ◄─── data: {"token": " world"} ───
       ◄─── data: [DONE] ──────────────
```

- **不要用 WebSocket** —— SSE 已经够（单向推 + 自动重连），WebSocket 复杂度高
- **AbortSignal** 让用户能中途取消（取消后调用上游 provider 的 cancel）
- 后端拿到 provider 的 stream → 解析 → 转换成统一 SSE 格式转发给前端

### 上下文管理

每次发送：

```
{
  model: 'claude-sonnet-4-6',
  messages: [
    { role: 'system', content: '...' },
    { role: 'user', content: '...' },        // 历史
    { role: 'assistant', content: '...' },
    ...
    { role: 'user', content: '当前问题' }
  ]
}
```

**长会话压缩**：
- token 数超过模型上下文窗口（如 200K）→ 触发**摘要**：拿前 N 轮让 LLM 总结，用摘要替换前 N 轮
- 或 **RAG** 化：把历史存向量库，每次按相关性检索 top-K 注入

### Prompt Caching

Anthropic / OpenAI / DeepSeek 都支持。**System prompt + 长不变前缀**放前面享受 90% 折扣：

```
[Cached: system prompt + 长知识库 + few-shot 示例]  ← 一次性算，复用
[Dynamic: 当前对话]                                 ← 每次新算
```

### 数据库 Schema

```sql
conversations (id, user_id, title, model, created_at, updated_at)
messages      (id, conversation_id, role, content, tokens, created_at)
attachments   (id, message_id, s3_url, type, processed_text)
usage         (user_id, day, tokens_in, tokens_out, cost)
```

- 写消息**异步** —— 流式响应完成后 server 端落 DB（不阻塞流）
- 标题：拿用户第一条消息让小模型（Haiku）生成短标题

### Rate Limiting

```
Edge: token bucket per user (60 req/hour)
      + per IP (防注册脚本)
      + concurrent connections per user (max 2)
```

→ Edge KV / Upstash Redis 存计数器，全球同步。

### 多模型切换

- 用 **AI Gateway**（LiteLLM / Vercel AI Gateway）统一 API
- 前端只调 `chatCompletion({ model: 'claude-sonnet-4-6', ... })`
- 后端 gateway 知道路由到哪家 provider
- 单 provider 挂 → fallback 到备用

### 附件处理

```
PDF 上传 → S3 → 异步 worker：
  ├─ 用 Anthropic Files API 或 Document Intelligence 提取文本
  ├─ 切 chunk + embedding → 存向量库
  └─ 标记 attachment.ready = true

用户问问题时 → 检索相关 chunk → 注入 prompt
```

## 前端核心

- **乐观渲染**：用户发完即刻显示自己的消息，紧接着出现 "..." loading
- **流式拼接**：SSE 每条 `data:` 拿到一个 token，**追加**到当前 assistant message
- **滚动锚定**：流式过程中**自动滚到底部**（但用户手动滚上去后**不再强制**）
- **Markdown 渲染**：流式过程**实时**渲染 markdown（code block 边写边高亮）
- **复制 / 重新生成 / 编辑** 按钮
- **本地持久化**：IndexedDB 存最近 50 个对话，断网仍能浏览

## Trade-offs

| 决策 | 选择 | 原因 |
|---|---|---|
| 推送协议 | **SSE** > WebSocket | 单向推 + 自动重连 + 浏览器友好 |
| 历史存储 | Postgres + S3 (attachment) | 简单查询 + 大文件分离 |
| Gateway | 用 SaaS（Vercel AI Gateway） | 不自己运维 / 自动 failover / cost tracking |
| 上下文超长 | 摘要 + RAG | 模型 context 不够 / 太贵 |
| Rate Limit | Edge KV (Upstash) | 全球低延迟 |

## 失败模式

| 故障 | 缓解 |
|---|---|
| Provider 挂 | Gateway failover 到备用 provider |
| 流中途断 | SSE 自动重连 + 客户端记录 last_token_id 续传 |
| 用户取消 | AbortController → 服务端调上游 abort，省 token |
| 滥用刷 | Rate limit + 设备指纹 + email verify |
| 流式渲染卡顿 | Markdown 渲染节流（每 50ms 一次） |

## 一句话

> **SSE 流式** + **AI Gateway 抽象 provider** + **Postgres + S3 持久化** + **RAG / 摘要解超长上下文**。难点：流式 UX 细节（取消 / 中断恢复 / 滚动锚定 / markdown 实时渲染）+ 成本控制。
$content$,
  'quiz', 'hard',
  ARRAY['system-design','full-stack','ai','llm','sse','streaming','rag'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. Collaborative Editor
-- ─────────────────────────────────────────────────────────────────────────────
(
  'System Design · 协作编辑器 (Google Docs / Figma) · 全栈 · OT / CRDT',
$content$
## 业务需求

- 多人同时编辑同一文档
- **实时**看到他人光标 / 选区 / 改动
- **冲突自动合并**（无中央锁）
- 离线编辑后上线**自动同步**
- 历史版本回溯
- 规模：单文档同时 50+ 编辑者

## 全局架构

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  Client A        │   │  Client B        │   │  Client C        │
│  本地副本 + ops   │   │  本地副本 + ops   │   │  本地副本 + ops   │
└────────┬────────┘   └────────┬────────┘   └────────┬────────┘
         │                     │                     │
         │ WebSocket          │ WebSocket          │ WebSocket
         │ (op stream)        │                     │
         ▼                     ▼                     ▼
   ┌──────────────────────────────────────────────────────┐
   │              Collaboration Server                     │
   │  ── 维护文档的"权威状态"                              │
   │  ── 接收 op，merge，广播给所有 client                  │
   │  ── 持久化定期 snapshot 到 DB                         │
   └─────────┬──────────────────────────────────┬─────────┘
             │                                  │
             ▼                                  ▼
   ┌───────────────────┐              ┌────────────────────┐
   │  Redis (实时态)    │              │  Postgres / S3     │
   │  • 当前文档状态     │              │  • Snapshot + ops  │
   │  • 在线用户 / 光标  │              │  • 版本历史        │
   └───────────────────┘              └────────────────────┘
```

## 两大冲突解决算法

### OT (Operational Transformation)

每个 op (`insert "x" at pos 5`) 在到达 server 时被**变换**以适配其他并发 op：

```
A insert "x" at 5
B insert "y" at 3   (并发)

Server 收 A 的 op 时，B 的 op 已经先到 → transform A:
  A 的 pos 5 受 B 在 3 处插入影响 → 变为 pos 6
```

**优点**：成熟（Google Docs 用）
**缺点**：实现极难，变换规则 N×N 复杂度，不易扩展新操作

### CRDT (Conflict-Free Replicated Data Type)

每个字符给一个**全局唯一 ID**（例如 `(client_id, sequence)`），所有 op 都是**幂等 + 可交换**的，任何顺序到达都能收敛到同样结果。

代表：
- **Yjs**（最流行）
- **Automerge**
- **Loro**

**优点**：
- 实现相对清晰
- **天然支持离线** —— ops 缓存本地，上线时一并 merge
- **去中心化** —— 服务器只是消息中继，不再是"权威"

**缺点**：
- 数据结构更大（每个字符要存 ID）
- 历史版本和"时间线"概念弱化

### 选 OT 还是 CRDT？

| | OT | CRDT |
|---|---|---|
| 实现难度 | 极难 | 中等 |
| 中心化 | 需要中央服务器 | 可去中心化 / 中央可选 |
| 离线 | 难 | 天然支持 |
| 数据大小 | 小 | 大 |
| 代表 | Google Docs | Figma / Linear / Yjs |

→ **2026 年新项目几乎都用 CRDT**（Yjs / Liveblocks / Automerge）。OT 是历史包袱。

---

## 完整 op 流转

```
1. Client A 输入 "x"
   ↓
2. Local: 立即更新本地视图（乐观渲染）+ 生成 op
   ↓
3. Send: op 通过 WebSocket 发到 Server
   ↓
4. Server: 收 op → 应用到权威状态 → 广播给所有其他 client
   ↓
5. Client B/C: 收 op → CRDT merge → 更新视图
```

## 光标 / 选区同步（Awareness）

和文档 ops 分开的"瞬时状态"：

- 不持久化（用户离线即清掉）
- 单独的 WebSocket channel（避免阻塞文档 op）
- 客户端发 `{userId, cursor: {anchor, head}, color, name}`
- 服务端广播给同文档其他人

Yjs 内置 **awareness protocol**，专门处理这个。

## 历史版本

CRDT 的 ops 是 append-only 的 log：

```
docHistory = [op1, op2, op3, ...]
快照点：每 100 ops 或每天，存一个完整状态到 S3
回溯：找到目标 version 之前最近的快照 + replay 后续 ops
```

## 前端核心

- **编辑器内核**：ProseMirror / Slate / TipTap / Lexical / CodeMirror
- **协作集成**：用 `y-prosemirror` / `y-codemirror` / Liveblocks adapter，把 CRDT 接到编辑器
- **乐观渲染**：用户输入立即可见，不等服务端确认
- **断线重连**：CRDT 离线缓存 ops，重连后批量 merge
- **存储**：IndexedDB 持久本地 CRDT 状态，刷新页不丢草稿

## 数据存储

| 数据 | 存储 |
|---|---|
| 文档当前状态 | Redis（实时） + S3（snapshot） |
| Op log | Postgres（按 doc_id 分区） |
| 文档元数据 | Postgres (`documents` 表) |
| Awareness（光标） | 内存 + WebSocket，不持久化 |
| 历史版本 | S3（按时间点的完整快照） |

## Trade-offs

| 决策 | 选择 | 原因 |
|---|---|---|
| 冲突算法 | **CRDT (Yjs)** | 现代标配，离线友好 |
| 编辑器内核 | ProseMirror / TipTap | 富文本生态 |
| 通信 | WebSocket | 双向 + 低延迟 |
| 中央协调 | 仍需要 server（性能 + 安全） | 纯 P2P CRDT 不实用 |
| 后端语言 | Node + ws / Go | 长连接友好 |

## 失败模式

| 故障 | 缓解 |
|---|---|
| Server 重启 | 客户端 op 队列等连接恢复后 batch 发送 |
| 长时间离线 | 本地 CRDT 缓存，上线后 merge |
| 同时 100+ 编辑者 | server 端 op 处理瓶颈 → sharding by doc_id |
| 历史版本爆炸 | 定期合并旧 op + 删除冗余字符 ID |
| 恶意 client 发垃圾 op | server 端 op 验证 + 速率限制 |

## 一句话

> **CRDT (Yjs)** 解决并发合并 + **WebSocket 双向通信** + **awareness 协议**广播光标。难点：编辑器内核与 CRDT 的集成 + 历史版本管理 + server 端 op 处理性能。
$content$,
  'quiz', 'hard',
  ARRAY['system-design','full-stack','collaboration','crdt','websocket','real-time'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. Image Upload + CDN Pipeline
-- ─────────────────────────────────────────────────────────────────────────────
(
  'System Design · 图片上传与 CDN 流水线 · 全栈',
$content$
## 业务需求

- 用户上传图片（最大 50MB / 张）
- **自动生成**多尺寸（thumbnail / medium / original）
- **自动转格式**（WebP / AVIF for modern browsers）
- 全球 CDN 分发
- 支持断点续传 + 大文件分片
- 规模：1M uploads/day, 10TB/day 流量

## 全局架构

```
┌─────────────────────┐
│   Client (Web/App)   │
└──────────┬──────────┘
           │
           │ [1] POST /upload/sign  →  签名 + S3 直传 URL
           │ [2] PUT (multipart)    →  S3 (直传，跳过自家服务器)
           │
           ▼
   ┌────────────────────────────────────────────┐
   │         API Server (sign / metadata)        │
   └────────┬────────────────────────────────────┘
            │
            ▼
   ┌────────────────────────────────────────────┐
   │       S3 / R2 / OSS  (Origin Storage)       │
   │       bucket: uploads/                       │
   └────────┬────────────────────────────────────┘
            │ S3 Event Notification
            ▼
   ┌────────────────────────────────────────────┐
   │       SQS / Kafka  (Job Queue)              │
   └────────┬────────────────────────────────────┘
            │
            ▼
   ┌────────────────────────────────────────────┐
   │      Image Processing Workers               │
   │      • Sharp / libvips                       │
   │      • Generate thumbnails (w=200, 800, ...) │
   │      • Convert to WebP / AVIF                │
   │      • Strip EXIF                            │
   │      • Generate blurhash placeholder         │
   └────────┬────────────────────────────────────┘
            │
            ▼
   ┌────────────────────────────────────────────┐
   │   S3 (processed/)  →  CDN (Cloudflare)      │
   └─────────────────────────────────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   Browser 拉取    │
              │   按 Accept 头返   │
              │   WebP / AVIF     │
              └──────────────────┘
```

## 核心设计点

### 直传 S3（不经过自家服务器）

```js
// 后端签名
POST /upload/sign  →  { uploadUrl, fields, key }

// 客户端直接 PUT 到 S3
fetch(uploadUrl, { method: 'PUT', body: file });
```

**好处**：
- 自家服务器**不消耗带宽**（大文件场景关键省钱）
- S3 直接处理，更快
- 服务器只做轻量级签名工作

### 分片上传（大文件）

S3 的 **Multipart Upload**：

```
1. POST /createMultipartUpload   →  uploadId
2. PUT /uploadPart * N（并行）    → partETags
3. POST /completeMultipartUpload (uploadId, partETags) → 合并
```

- 分片大小 5MB-100MB（≥ 5MB 是 S3 强制）
- 失败的 part 单独重传，**不重传整个文件**
- 用户暂停 → 客户端保存 `{uploadId, completedParts}` → 下次接着传

### 处理流水线（异步）

S3 event → SQS → Worker：

```js
// Worker (Node + sharp)
import sharp from 'sharp';

async function processImage(s3Key) {
  const input = await s3.getObject(s3Key);
  const sizes = [200, 800, 1600];

  await Promise.all(sizes.flatMap(w => [
    sharp(input).resize(w).webp().toBuffer().then(buf =>
      s3.putObject(`processed/${id}/w${w}.webp`, buf)),
    sharp(input).resize(w).avif().toBuffer().then(buf =>
      s3.putObject(`processed/${id}/w${w}.avif`, buf)),
  ]));

  // Blurhash placeholder
  const blur = await sharp(input).resize(32).raw().toBuffer();
  const hash = encode(blur, 32, 32, 4, 3);

  await db.images.update({ id, status: 'ready', blurhash: hash, sizes });
}
```

### CDN + 按需格式

```
GET /img/abc.jpg
Accept: image/avif, image/webp, image/*

→ Cloudflare Image Resizing / Vercel Image Optimization
  根据 Accept 自动选 AVIF / WebP / JPEG
  根据 ?w=400 动态裁剪
  缓存到 200+ POPs
```

**优势**：不用预生成所有尺寸 × 所有格式（组合爆炸），按需 + 缓存。

### 数据库 Schema

```sql
images (
  id UUID PRIMARY KEY,
  user_id UUID,
  original_key TEXT,         -- s3 key
  status TEXT,               -- pending / processing / ready / failed
  width INT, height INT,
  blurhash TEXT,
  sizes JSONB,               -- { 200: "...", 800: "..." }
  uploaded_at TIMESTAMPTZ
)
```

### 安全考虑

- **签名 URL 有效期**：1 小时
- **大小限制**：sign 时拒绝超大文件
- **MIME 校验**：客户端 + S3 policy + worker 三层
- **EXIF 隐私**：worker 自动 strip GPS 等敏感字段
- **Hotlink 防护**：CDN 校验 Referer

## 前端核心

- **拖拽上传**：HTML5 drag-drop + 多文件
- **进度条**：XHR `onprogress` / Fetch + ReadableStream
- **断点续传**：localStorage 存 uploadId + completedParts
- **预览**：`URL.createObjectURL(file)` 立即显示，不等上传完
- **占位**：blurhash → 渲染模糊缩略 → 真图加载完 fade in
- **Responsive `<img>`**：`srcset` + `sizes` + `<picture>` AVIF/WebP fallback
- **Lazy loading**：`loading="lazy"` + IntersectionObserver

## Trade-offs

| 决策 | 选择 | 原因 |
|---|---|---|
| 上传方式 | **S3 直传** | 省自家服务器带宽 |
| 处理触发 | S3 event + SQS | 解耦 + 可扩 |
| 格式 | AVIF + WebP + JPEG fallback | 体积 vs 兼容 |
| 缩略图策略 | **按需 + CDN 缓存** | 不预生成所有组合 |
| 处理 worker 语言 | Node + sharp | sharp 性能极强（libvips） |

## 失败模式

| 故障 | 缓解 |
|---|---|
| Worker 处理失败 | SQS DLQ + 自动重试 + 告警 |
| 用户上传超大文件 | 客户端 + S3 双层大小限制 |
| 恶意上传非图 | sharp 解析失败即拒 + ClamAV 扫毒 |
| CDN 缓存被打爆（爆款图） | 多层缓存 + edge cache + origin shield |
| 处理 worker pool 满 | SQS visibility timeout + 弹性扩 worker |

## 一句话

> **直传 S3** + **事件驱动处理流水线** (S3 event → SQS → Worker) + **CDN 按需格式 + 尺寸**。难点：流水线可靠性 / 大文件分片续传 / 全格式 / 全尺寸的取舍。
$content$,
  'quiz', 'hard',
  ARRAY['system-design','full-stack','image-processing','cdn','s3','pipeline'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. Real-time Dashboard
-- ─────────────────────────────────────────────────────────────────────────────
(
  'System Design · 实时数据看板 · 全栈 · 流处理 / WebSocket 推送',
$content$
## 业务需求

- 实时业务指标（订单数 / 在线人数 / GMV / 异常 ...）
- 多用户同时看，**秒级更新**
- 支持自定义时间范围（最近 1h / 24h / 7d）
- 支持 drill-down 钻取
- 规模：100k events/s 写入，1000 个 dashboard 用户

## 全局架构

```
┌──────────────┐
│  Business    │  ──events──>
│  Services    │
└──────────────┘
                  ┌──────────────────────────────┐
                  │      Kafka  (raw events)      │
                  └────────┬─────────────────────┘
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
      ┌──────────┐  ┌──────────────┐  ┌──────────────┐
      │  Flink   │  │  Lambda      │  │  Spark Stream│
      │  (流处理) │  │  (实时聚合)   │  │  (批处理回填) │
      └─────┬────┘  └──────┬───────┘  └──────┬───────┘
            │              │                  │
            ▼              ▼                  ▼
      ┌─────────────────────────────────────────────────┐
      │   ClickHouse / TimescaleDB  (时序存储)           │
      └──────────────────┬──────────────────────────────┘
                         │
                  ┌──────▼────────────────┐
                  │  Backend API           │
                  │  (Query + Cache)       │
                  └──────┬─────────────────┘
                         │
        ┌────────────────┼──────────────┐
        ▼                ▼              ▼
  ┌──────────┐   ┌───────────────┐  ┌──────────────┐
  │ REST     │   │ SSE / WS       │  │ Pre-aggregated│
  │ (历史查询)│   │ (实时推送)      │  │ Redis        │
  └──────────┘   └───────────────┘  └──────────────┘
                         │
                         ▼
                ┌───────────────────────┐
                │   Dashboard 前端       │
                │   (React + ECharts)   │
                └───────────────────────┘
```

## 核心设计点

### 数据流（lambda 架构变体）

**速度层（实时）**：
```
events → Kafka → Flink (1s window aggregation) → ClickHouse + Redis
```

**批处理层（准确性兜底）**：
```
events → S3 (raw) → Daily Spark job → 覆盖 ClickHouse 当天分区
```

→ 实时近似可用，批处理修正历史数据（聚合不准 / 乱序 / 失败重算）。

### 时序数据库选型

| | ClickHouse | TimescaleDB | InfluxDB | Druid |
|---|---|---|---|---|
| 写吞吐 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 查询灵活度 | ⭐⭐⭐⭐ SQL | ⭐⭐⭐⭐⭐ SQL | ⭐⭐⭐ | ⭐⭐⭐ |
| 运维 | 中等 | 简单（PG 扩展） | 中等 | 重 |
| 适合 | 通用分析 | 已有 PG 栈 | metrics | 大公司 OLAP |

→ 现代选型 **ClickHouse**（性能 + SQL + 社区）。

### 实时推送策略

**不要让前端 polling**！

```
前端打开 dashboard
  ↓
SSE/WS 建立长连
  ↓
后端订阅 Redis pub/sub 上的指标频道
  ↓
Flink 每聚合一个 1s window → 写 Redis + publish
  ↓
后端拿到 → SSE 推给所有订阅该 dashboard 的客户端
```

### 历史查询 + 缓存

- **预聚合**：常用查询（last 1h / 24h / 7d）每分钟跑一次 → 缓存到 Redis
- **现查**：自定义时间范围才查 ClickHouse
- **多级缓存**：CDN（公共指标）→ Redis（用户级）→ ClickHouse（原始）

### Downsampling（降采样）

不能在前端绘 100k 数据点。后端按时间桶聚合：

```
last 1h:   1 分钟一个点 = 60 点
last 24h:  10 分钟一个点 = 144 点
last 7d:   1 小时一个点 = 168 点
last 90d:  6 小时一个点 = 360 点
```

→ 时间越长，桶越大。固定**每次返回 100-300 点**给前端，渲染流畅。

### 异常检测

- Flink 跑滑动窗口 + 3-sigma 偏离 / Holt-Winters 模型
- 检出异常 → 写入 alerts topic
- 后端订阅 → SSE 推给 dashboard 标红 + 走告警系统（PagerDuty / Slack）

## 前端核心

- **图表库**：ECharts / Recharts / Visx
- **实时更新策略**：
  - 接 SSE 流，每条事件**追加到时间序列末尾**
  - **删掉时间窗外的旧点**（防止数据无限增长）
  - 渲染节流：每 500ms 一次 setState（防卡）
- **大数据点优化**：超过 1000 点用 canvas（不要 SVG）+ downsampling
- **联动**：点击一个 chart 影响其他 chart 的过滤条件（用 URL search params 同步）
- **断线重连**：SSE 内置；重连后通过 `Last-Event-ID` 拉漏掉的点

## 数据 schema (ClickHouse)

```sql
CREATE TABLE events (
  ts DateTime64(3),         -- 毫秒级
  event_type LowCardinality(String),
  user_id UInt64,
  value Float64,
  attributes Map(String, String)
) ENGINE = MergeTree()
PARTITION BY toYYYYMMDD(ts)
ORDER BY (event_type, ts)
TTL ts + INTERVAL 90 DAY;
```

**关键**：`ORDER BY` 决定查询性能 + `PARTITION BY` 利于按天清理。

## Trade-offs

| 决策 | 选择 | 原因 |
|---|---|---|
| 流处理引擎 | Flink > Spark Streaming | 真正流（不是微批） + 低延迟 |
| 时序库 | ClickHouse | 写吞吐 + SQL |
| 推送 | **SSE** | 单向、自动重连、HTTP 友好 |
| 客户端框架 | React + ECharts | 生态成熟 |
| 缓存层级 | CDN + Redis | 公共指标走 CDN |

## 失败模式

| 故障 | 缓解 |
|---|---|
| Flink 重启 | Checkpoint + 重放 Kafka offset |
| ClickHouse 慢查询 | 预聚合 + 限制返回点数 |
| 千用户同时连 SSE | 后端用 pub/sub fan-out，不要每个客户端独立查 |
| 数据 lag（处理跟不上） | 自动 scale Flink task；最坏降级到 5s 窗口 |
| 单 dashboard 查询慢 | timeout + 显示"加载中" + 后台异步算 + cache |

## 一句话

> **Kafka → Flink → ClickHouse** 流水线 + **SSE 推送实时点** + **Downsampling 控制前端渲染量** + **预聚合 + Redis 缓存常见查询**。难点：实时性 vs 准确性的取舍（lambda 架构）+ 数据点数控制 + 大并发推送的 fan-out。
$content$,
  'quiz', 'hard',
  ARRAY['system-design','full-stack','dashboard','real-time','data-pipeline','clickhouse','flink'],
  NULL
);
