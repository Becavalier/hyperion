-- Agent / Tool Use / MCP / A2A / Workflow / MoE quiz card.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'AI Agent · ReAct / Memory / MCP / A2A / MoE',
$content$
## Agent

LLM 不再只是"你问我答"，而是变成一个能**自主思考、规划、调用工具、完成多步任务**的执行者。

你可以把它想象成一个有大脑（LLM）、有手脚（工具调用）、有记忆（上下文管理）的数字员工。

### ReAct 模式（Reasoning + Acting）

Agent 最经典的运行模式，本质是一个循环：

```
思考 → 行动 → 观察 → 再思考 → 再行动 ... 直到任务完成
Thought → Action → Observation → Thought → ...
```

关键点在于：**每一步做什么不是写死的，而是 LLM 根据上一步结果实时决定的**。

### 多步任务规划与执行

规划能力目前仍然是 Agent 的薄弱环节。常见做法：

- 简单任务 → 让 LLM 自由规划（**ReAct**：边做边想）
- 复杂任务 → 提供规划模板或约束条件（**OpenSpec**、**Plan-then-Execute**）

#### Plan-then-Execute vs ReAct

- **ReAct**：每一步都让 LLM 决策。灵活但容易跑偏、token 贵。
- **Plan-then-Execute**：先让 LLM **一次性出一份完整计划**（任务列表），然后按列表执行，执行完后回头检查是否需要 replan。**更省 token、更稳定**，但灵活性差。

#### Reflexion / Self-Reflection

执行失败时让 LLM **写一份"我刚才哪里做错了"的反思**，把这份反思加进下一轮的 prompt。研究表明在编程、数学题等可验证任务上能显著提升成功率。

#### Tree of Thoughts (ToT)

每一步生成多个候选 thought，做 BFS/DFS 搜索，回溯掉走不通的分支。适合需要尝试 + 回溯的问题（24 点、迷宫）。

---

### 记忆机制

- **短期记忆**：当前对话的上下文（context window）。受 token 限制，不能无限塞内容。
    - **滑动窗口**：只保留最近 N 轮。
    - **摘要压缩**：让 LLM 总结之前的对话，把长历史塞进 200 字的总结里。
    - **Hierarchical**：最近 N 轮原文 + 更早内容摘要。
- **长期记忆**：跨会话持久化的信息。
    - **向量数据库**（episodic memory）：把历史对话、用户偏好 embedding 后存入，按相关性检索（RAG-as-memory）。
    - **传统数据库 / KV store**（semantic memory）：存关键事实，"用户偏好中文回复" 这种直接 key-value。
    - **实体图（entity memory）**：用户提到过的人/物/事，构建图谱，按实体名快速召回相关历史。

> 没有"记得所有"的完美方案 —— 工程上是**短期窗口 + 长期检索**的组合，加上**主动遗忘策略**（不重要的对话不存）。

---

### Agent 可靠性 / 生产 Gotchas

Agent 在玩具 demo 里看着很酷，**上生产之后最容易翻车**的几点：

| 问题 | 根因 | 应对 |
|---|---|---|
| **无限循环** | LLM 反复调同一个工具不停 | 设 `max_iterations`；检测同一工具+同一参数连续调用 → break |
| **成本飙升** | 每轮都全文 context + 多个 tool roundtrip | prompt caching；定期摘要历史；用便宜模型做规划，贵模型做关键决策 |
| **工具调错** | 工具描述模糊 / 工具太多让 LLM 选不出 | 描述写成 API doc 风格；> 30 个工具时做 hierarchical / RAG-over-tools |
| **幻觉调用** | LLM 编造不存在的工具或参数 | 在执行前用 JSON Schema 校验；不合法直接 reject 让它重试 |
| **执行不可追溯** | 多步决策黑盒 | 接 LangSmith / Phoenix / Arize 这类 trace 平台，可视化每一步 |
| **关键操作误执行** | LLM 直接 DELETE 了一张表 | 把"破坏性操作"标为 `requires_confirmation`，必须人工确认 |

### 主流框架

- **LangChain** — 最早也最流行。生态丰富、文档多；缺点是**抽象层过多**，代码经常让人迷惑，调试困难。
- **LangGraph** — 把 Agent 的执行过程建模为一个**有向图**，每个节点一个步骤，边是条件判断。适合复杂的分支 / 循环 / 并行。
- **CrewAI** — multi-agent 场景。核心概念：Crew（团队）/ Agent（角色）/ Task（任务）。
- **AutoGen** — Agent 之间以**对话**的方式交互。适合多轮讨论 / 辩论 / 审查。
- **OpenAI Swarm / Agents SDK** — 官方多 agent 编排。
- **Pydantic AI** — 强类型 + Pydantic schema，工程界比较受欢迎。
- **手撸**（最常见）— 一个循环 + 一个 tool dispatcher 就够了，下面就是。

### 示例（Anthropic SDK 手撸 Agent）

```python
"""
最简单的 Agent 示例 —— 几十行代码理解 Agent 核心原理
依赖：pip install anthropic
使用：设置环境变量 ANTHROPIC_API_KEY 后直接运行
"""

import json
import anthropic

# ========== 1. 定义工具（Agent 的"手脚"）==========
# 这里模拟两个工具：查天气、做数学计算
# 真实项目中这些会是 API 调用、数据库查询等

def get_weather(city: str) -> str:
    """模拟天气 API"""
    fake_data = {
        "北京": "晴天，25°C",
        "上海": "多云，22°C",
        "深圳": "小雨，28°C",
    }
    return fake_data.get(city, f"未找到 {city} 的天气数据")

def calculate(expression: str) -> str:
    """简单计算器"""
    try:
        result = eval(expression)  # 生产环境别用 eval，这里仅做演示
        return str(result)
    except Exception as e:
        return f"计算出错: {e}"

# 工具名 -> 实际函数的映射
TOOL_FUNCTIONS = {
    "get_weather": get_weather,
    "calculate": calculate,
}

# ========== 2. 告诉 LLM 有哪些工具可用 ==========
# 这是 Anthropic API 的 tools 格式。描述要写清楚，LLM 靠这个决定何时调用。
TOOLS = [
    {
        "name": "get_weather",
        "description": "查询指定城市的当前天气情况",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名称，如 北京、上海"}
            },
            "required": ["city"],
        },
    },
    {
        "name": "calculate",
        "description": "计算数学表达式，如 2+3、100*0.8、(10+20)/2",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {"type": "string", "description": "数学表达式"}
            },
            "required": ["expression"],
        },
    },
]

# ========== 3. Agent 核心循环 ==========
def run_agent(user_message: str, max_loops: int = 10):
    """
    Agent 的核心就是一个循环：
    发消息给 LLM → 如果 LLM 要调工具 → 执行工具 → 把结果返回给 LLM → 重复
    直到 LLM 不再调用工具，给出最终回答。
    """
    client = anthropic.Anthropic()  # 自动读取 ANTHROPIC_API_KEY
    messages = [{"role": "user", "content": user_message}]

    for i in range(max_loops):
        # 第一步：把对话历史（含工具结果）发给 LLM
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            system="你是一个有用的助手，可以查天气和做计算。请用中文回答。",
            tools=TOOLS,
            messages=messages,
        )

        # 第二步：检查 LLM 的回复 —— 是最终回答还是工具调用？
        # stop_reason == "end_turn" → LLM 认为任务完成了
        # stop_reason == "tool_use" → LLM 想调用工具
        if response.stop_reason == "end_turn":
            final_text = "".join(b.text for b in response.content if hasattr(b, "text"))
            print(f"Agent 最终回答: {final_text}")
            return final_text

        # 第三步：LLM 要调用工具，我们来执行
        # 先把 LLM 的完整回复（包含工具调用指令）加入对话历史
        messages.append({"role": "assistant", "content": response.content})

        # 遍历回复中的所有 content block，找到工具调用并执行
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                func = TOOL_FUNCTIONS[block.name]
                result = func(**block.input)
                print(f"[{i+1}] {block.name}({block.input}) → {result}")
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": result,
                })

        # 第四步：把工具执行结果返回给 LLM，让它继续推理
        messages.append({"role": "user", "content": tool_results})

    print("达到最大循环次数，强制停止")

# ========== 4. 测试 ==========
if __name__ == "__main__":
    run_agent("北京今天天气怎么样？")                          # 单次工具调用
    run_agent("北京和上海今天哪个更热？温差是多少度？")        # 多次工具调用
    run_agent("深圳今天的温度乘以2是多少？")                   # 混合不同工具
```

---

## MCP (Model Context Protocol)

**Anthropic 2024 年底提出**的开放协议，目标是**让 LLM 连接外部工具和数据源的方式标准化**。本质是一个 client-server 协议，基于 **JSON-RPC 2.0**，通过标准化消息让 AI 模型和外部工具/资源互通。

> 类比：MCP 之于 LLM，就像 USB-C 之于设备 —— 一份协议，所有人都接得上。在 MCP 之前，每个 Agent 框架/产品都自己定义工具调用方式。

### 协议分层

1. **传输层** — 消息怎么传（stdio / HTTP+SSE / WebSocket）。
2. **消息格式** — JSON-RPC 2.0 封装请求 / 响应 / 通知。
3. **协议语义** — 定义了三类能力：**Tools、Resources、Prompts**（外加 Sampling 让 server 反过来请求 LLM）。
4. **生命周期** — 初始化握手、能力协商、会话管理。

### 三类核心 Primitive

| Primitive | 含义 | 谁触发调用 | 例子 |
|---|---|---|---|
| **Tools** | 可执行函数 | **Model** 主动 | "查询当前股价"、"创建文件" |
| **Resources** | 只读数据源 | **User / App** 主动挂载 | "本地仓库的 README.md"、"DB schema" |
| **Prompts** | Server 提供的 prompt 模板 | **User** 选择触发 | "总结这段代码的 prompt 模板" |

→ 区别：**Tools 是模型决定的，Resources 是人决定的**（你显式 attach 给会话），**Prompts 是 server 提供的预制工作流**。

### 消息示例

```json
// 客户端请求
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "read_file",
    "arguments": { "path": "/tmp/a.txt" }
  }
}

// 服务器响应
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{
      "type": "text",
      "text": "file contents..."
    }]
  }
}
```

### MCP 的现实生态

- **MCP Client**：Claude Desktop、Cursor、Zed、Continue、Windsurf、Cline 等都已经原生支持。
- **MCP Server**：官方 + 社区开源了大量 server（filesystem、git、postgres、slack、github、puppeteer、playwright、fetch…）。
- 想给自己的工具/产品接入 LLM 生态？写一个 MCP server 就行，所有 client 自动能用。

---

## A2A (Agent-to-Agent)

Google 在 **2025 年 4 月**提出的开放协议，解决 **AI agent 之间如何互相通信和协作**的问题。和 MCP 是互补关系，不是竞争：

- **MCP** ≈ Agent 和**工具/数据**之间的通信协议
- **A2A** ≈ Agent 和 **Agent** 之间的通信协议

### Agent Card

每个 agent 暴露一个 JSON 描述文件，声明自己能做什么：

```json
{
  "name": "DataAnalysisAgent",
  "capabilities": ["csv_analysis", "chart_generation"],
  "endpoint": "https://agent.example.com/a2a",
  "skills": [...]
}
```

### Task

A2A 的基本单元，包含：

- **输入**（message）
- **状态**（pending / running / completed / failed）
- **输出**（artifact）

通信方式：

- HTTP + JSON（同步）
- **SSE**（Server-Sent Events，流式响应）
- 支持长时间运行的任务（polling / push）

### 工作流程

1. **发现** — Orchestrator（多代理调度者）读取 Remote Agent 的 Agent Card
2. **委托** — 发送 Task（自然语言 + 结构化参数）
3. **执行** — Remote Agent 处理，可以 streaming 返回进度
4. **返回** — artifact（文件、数据、文本等）

---

## Workflow vs Agent

- **Workflow** — 开发者**预先定义**好整个流程（每步是什么、什么时候分支）
- **Agent** — **完全由 LLM 驱动**决策每一步

| 维度 | Workflow | Agent |
|---|---|---|
| 可控性 | 高 | 低 |
| 灵活性 | 低 | 高 |
| 调试 | 容易 | 难 |
| 成本 | 可预测 | 不可预测（容易飙升） |
| 失败模式 | 已知边界 | 长尾、惊喜 |

> Anthropic 的建议（"Building effective agents" 一文）：**90% 的场景用 Workflow 就够了**。只在确实需要 LLM 自主决策路径时才上 Agent。

一个常见的模式是：**外层 Workflow 保证流程可控，某些节点内部用 Agent 提供灵活性**。

---

## MoE (Mixture of Experts)

模型可以有**很多参数（总参数量很大）**，但每次推理时**只激活其中一小部分参数**来处理当前的输入。

### 结构

一个标准 Transformer 的每一层由两个主要模块组成：**Attention 层 + FFN 层**（前馈网络层）。

- **MoE 的改动只在 FFN 层**
- Attention 层保持不变，所有 token 共享同一个 attention 计算

但 FFN 层被替换成了**多个并行的"专家" FFN**，每个专家的结构和普通 FFN 完全一样，只是权重不同。

然后加一个 **Router**（路由器，也叫 Gate）—— 一个小型的可学习网络，输入是当前 token 的表示向量，输出是每个专家的权重分数。

### 推理流程

```
token 表示向量 → Router 给每个专家打分 →
选 Top-K 个得分最高的专家（通常 K=1 或 K=2）→
只把 token 送给这 K 个专家的 FFN 计算 →
按 Router 权重加权求和 → 最终输出
```

其他没被选中的专家完全不参与计算。

### Active vs Total Params

| 模型 | Total | Active | 比例 |
|---|---|---|---|
| Mixtral 8×7B | 47B | 13B | 8 个专家，激活 2 |
| Mixtral 8×22B | 141B | 39B | 8 个专家，激活 2 |
| **DeepSeek V3** | 671B | **37B** | 256 个专家，激活 8 + 1 共享 |
| GPT-4（传闻） | ~1.8T | ~280B | 16 个专家 |

→ 推理算力跟 **active params** 走（决定速度/成本），知识容量跟 **total params** 走（决定能力天花板）。MoE 让大模型变得"推理便宜、训练昂贵"。

### 训练难点

- **负载不均衡（Load imbalance）** — 不加约束的话，少数几个专家会被路由器疯狂选中，其他专家几乎没训练机会（"dead experts"）。需要在 loss 里加 **load balancing loss** 强迫均匀分配。
- **路由不稳定** — 训练早期 router 还没学好，token 在专家之间来回切换。常用 **noisy top-k gating** + 渐进退火稳定。
- **通信成本** — 分布式训练时 token 要发到分散在不同 GPU 上的专家，all-to-all 通信是瓶颈。

→ 这就是为啥 MoE 训练框架（DeepSpeed-MoE、Megatron-MoE、Tutel）比 Dense 训练复杂得多。
$content$,
  'quiz', 'hard',
  ARRAY['agent','ai','llm','mcp','a2a','moe','tool-use'],
  NULL
);
