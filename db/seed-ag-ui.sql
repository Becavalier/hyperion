-- AG-UI (Agent-User Interaction Protocol) quiz card.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'AG-UI · Agent ↔ UI 通信协议 · 事件流 / 状态同步',
$content$
## AG-UI (Agent-User Interaction Protocol)

**Agent-User Interaction Protocol** —— 一个开放的、**基于事件流**的协议，专门解决 **AI Agent 和前端 UI 之间如何通信**的问题。

由 **CopilotKit** 团队推动，2024-2025 年逐渐获得社区关注，已经被 LangGraph、CrewAI、Mastra、Pydantic AI 等主流 Agent 框架支持。

### 协议家族的位置

AG-UI 不是孤立的，它和 MCP / A2A 一起组成 Agent 生态三件套：

| 协议 | 谁来推 | 解决的关系 | 类比 |
|---|---|---|---|
| **MCP** | Anthropic | Agent ↔ **工具/数据** | USB-C（接外设） |
| **A2A** | Google | Agent ↔ **Agent** | 蓝牙（设备互联） |
| **AG-UI** | CopilotKit | Agent ↔ **UI / 用户** | HDMI（接显示器） |

三者**互补**，不竞争。一个真实的 Agent 应用可能同时用到：
- 后端 Agent 通过 **MCP** 调外部工具
- 后端 Agent 通过 **A2A** 委派给专家 Agent
- 后端 Agent 通过 **AG-UI** 把进度 / 工具调用 / 中间结果**流式推给前端**

### 为什么需要它

在 AG-UI 之前，每个 Agent 框架 / 产品都**自己定义**前端通信格式：
- LangChain 有自己的 streaming JSON
- Vercel AI SDK 有自己的 data stream protocol
- Anthropic / OpenAI SDK 各自有 SSE 格式
- CrewAI 有 callback handlers

→ 前端组件**和后端框架强绑定**，换 Agent 引擎就要重写整个 UI 层。AG-UI 想做的是把这一层抽象出来。

> 类比：浏览器之于 Web —— 没有 HTML 标准前，每家浏览器各干各的；有了标准后，前端工程师写一份代码到处跑。

---

## 标准事件类型

定义了 Agent 执行过程中能发出哪些事件：

### 生命周期

- `RUN_STARTED` / `RUN_FINISHED` / `RUN_ERROR` — 整个 Agent 运行的开始 / 结束 / 错误
- `STEP_STARTED` / `STEP_FINISHED` — 子步骤边界（Agent 内部某个推理/调用步骤）

### 文本消息（流式输出）

- `TEXT_MESSAGE_START` — 开始一条新文本消息
- `TEXT_MESSAGE_CONTENT` — 增量内容（token 流式追加）
- `TEXT_MESSAGE_END` — 这条消息结束

→ 前端拿到 START 渲染一个空气泡，CONTENT 一来追加，END 时收尾。

### 工具调用

- `TOOL_CALL_START` — Agent 决定调用某个工具（name + id）
- `TOOL_CALL_ARGS` — 工具参数流式生成（LLM 一边产 JSON 一边推）
- `TOOL_CALL_END` — 调用完成

→ 前端可以**实时显示"Agent 正在调用 search_db..."** 这种 UI，而不是等整个 turn 结束才告诉用户。

### 状态同步

- `STATE_SNAPSHOT` — 完整状态对象（首次同步 / 大变化时）
- `STATE_DELTA` — 增量更新（JSON Patch 风格，节省带宽）

→ Agent 内部维护的 state（如 todo list、计算结果）可以**实时镜像到 UI**，前端不用单独维护一份。

### 其他

- `MESSAGES_SNAPSHOT` — 全量消息历史快照（断线重连用）
- `CUSTOM` — 自定义事件（业务扩展）
- `RAW` — 透传底层模型的原始事件（debug / fallback）

---

## 标准输入格式

Agent 后端接受的请求长什么样，也是协议的一部分：

```json
{
  "threadId": "thread_abc123",
  "messages": [
    { "role": "user", "content": "帮我查一下 Q3 营收" },
    { "role": "assistant", "content": "..." }
  ],
  "tools": [
    {
      "name": "query_metrics",
      "description": "查询业务指标",
      "parameters": { "type": "object", "..." : "..." }
    }
  ],
  "state": {
    "user_id": "u_42",
    "filters": { "region": "APAC" }
  }
}
```

字段：

- **`threadId`** — 会话 ID，用于跨请求关联（断线重连、长任务跟进）
- **`messages`** — 对话历史（标准 OpenAI 格式）
- **`tools`** — **前端注册的可用工具**（前端把自己能做的事告诉 agent，比如"打开模态框"、"跳转路由"）
- **`state`** — 共享状态（前端的当前 UI 状态、过滤条件等）

→ 关键创新：**`tools` 字段让前端能注入"前端能做的事"** 给 agent，agent 可以 "调用前端" 改 UI / 跳页面 / 弹窗 —— 真双向交互。

---

## 传输层无关性

协议**不绑定具体传输方式**：

- **SSE (Server-Sent Events)** — 最常用，单向流，HTTP 友好
- **WebSocket** — 需要双向流时（如前端中途取消）
- **Webhook** — 长任务异步回调
- **HTTP polling** — 兜底方案

只要能传 JSON 事件就符合协议。

---

## AG-UI 启用的 UI 模式

### 1. 流式生成（streaming）

不用等整个回答生成完，token 一边来一边显示。所有现代 chatbot 都做了，AG-UI 只是把它**标准化**。

### 2. 工具调用可视化

Agent 调用工具时前端**实时显示**进度卡片：

```
┌─────────────────────────────┐
│ 🔧 query_metrics            │
│ args: { region: "APAC" }    │
│ status: running...           │
└─────────────────────────────┘
```

完成后变成结果卡片，用户能看到 agent 在干啥（vs 一个 spinner 转半天）。

### 3. Human-in-the-loop

Agent 跑到关键决策点时**暂停**，弹出 UI 让人确认/选择：

```
RUN_STARTED → ... →
CUSTOM { type: "ask_user", options: ["Approve", "Deny"] } →
(等用户选择) →
RUN_FINISHED
```

适合危险操作（删文件 / 发邮件 / 转账）确认。

### 4. Generative UI

Agent 不只回文本，**返回 UI 组件描述**（JSON Schema），前端动态渲染：

```
CUSTOM { type: "render_chart", data: { ... }, kind: "bar" }
```

→ Agent 决定"用户问的是趋势 → 渲染折线图"，前端就显示一个图表组件。

### 5. 共享 State 双向同步

Agent state 里有一个 `todo_list`，前端实时镜像。用户**直接在 UI 上勾选 todo 项**，前端发 `STATE_DELTA` 给后端，agent 看到自动调整下一步动作。

---

## 主要实现

| 框架 / 工具 | 角色 |
|---|---|
| **CopilotKit** | 协议发起方；提供 React/Next.js 组件 + adapter |
| **LangGraph** | 官方支持 AG-UI emit |
| **CrewAI** | 官方支持 |
| **Mastra** | TypeScript Agent 框架，AG-UI 原生 |
| **Pydantic AI** | Python，AG-UI 适配 |
| **Vercel AI SDK** | 通过 `useChat()` 间接兼容；2026 年开始原生支持 |

---

## 和 Vercel AI SDK 的关系

**Vercel AI SDK** 也定义了自己的 **Data Stream Protocol**（类似 AG-UI 的事件格式）：

| 维度 | Vercel AI SDK | AG-UI |
|---|---|---|
| 推动方 | Vercel | CopilotKit / 社区 |
| 设计目标 | Web 应用流式 chat 一把梭 | 跨框架跨语言 Agent ↔ UI 标准 |
| 跨框架 | TypeScript 中心 | 多语言（Python / TS / Go） |
| 集成深度 | React hooks (`useChat` / `useCompletion`) | 框架无关 |

**两者会逐步收敛** —— Vercel AI SDK v6 已经在引入 AG-UI 兼容层。日常 Web 项目用 Vercel AI SDK 即可，做框架级别集成（暴露给多种前端、多语言 SDK 一起接入）才需要直接落 AG-UI。

---

## 一句话总结

> 没有 AG-UI 之前，**每个 Agent UI 都是定制小工程**；
> 有了 AG-UI 之后，**Agent 后端和 UI 组件可以独立演进、自由组合**。

它的成败决定了未来 Agent 应用的**"UI 层 npm 生态"**是否能出现 —— 类似 React 之于 Web。
$content$,
  'quiz', 'medium',
  ARRAY['ag-ui','agent','ai','protocol','frontend','copilotkit'],
  NULL
);
