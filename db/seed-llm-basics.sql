-- LLM foundations quiz card — read-only study material.
-- Combines user-provided content with gap fills (tokenizer/attention/MoE/tool use/etc.).

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'LLM 基础 · Token / 采样 / 缓存 / Prompt 工程',
$content$
## LLM 基本原理

- 把文字切成 token（数字碎片）→
- 加上位置编码（标记顺序）→
- 通过自注意力（Self-Attention）让每个词理解与其他词的关系 →
- 预测下一个最可能的 token →
- 循环生成完整回答。

所有这些都发生在一张有限大小的"桌面"（上下文窗口）上。

### Tokenizer / BPE

文字切成 token 用的是 **BPE（Byte-Pair Encoding）** 或类似算法：从字符级别开始，把训练数据里出现最频繁的相邻字节对反复合并，直到词表填满。

- 英文：平均 **1 token ≈ 4 个字符**（常见单词整词成一个 token）。
- 中文：单字往往**多个 token**，平均 **1 个汉字 ≈ 1–2 token**。
- 代码：变量名、缩进、符号都会单独成 token，密度高。

→ 同样长度的对话，中文/代码消耗 token 显著多于英文。计费、上下文窗口都以 token 为单位。

### Self-Attention 公式

```
Attention(Q, K, V) = softmax(QK^T / √d_k) · V
```

- **Q**（Query）：当前 token 在"问什么"
- **K**（Key）：每个 token "我能回答什么"
- **V**（Value）：每个 token "我携带的内容"
- 除 `√d_k` 是为了防止内积过大让 softmax 饱和

### Context Window 的组成

上下文窗口 = **system prompt + 历史对话 + 当前用户输入 + 模型生成的输出**。

主流上限参考（持续在涨）：
- Claude Sonnet 4.6：200K
- GPT-4o：128K
- Gemini 2.5：1M+
- Llama 3：8K–128K（看版本）

输出 token 数也算进窗口 → 设 `max_tokens` 时要给输出留预算。

---

## 模型参数

模型参数 = 神经网络里可学习的权重（weights）数量。

- 参数越多理论上能编码的知识越多。**有限参数下，模型会自动优先学习训练数据中高频、通用的模式**，低频和复杂的内容被牺牲掉。
- 参数越多 → 推理成本越高（FLOPs、内存、延迟）。

推理能力存在"**涌现现象**"（emergent abilities）：某些能力在模型小的时候几乎为零，参数量过了某个阈值后突然出现。

### Dense vs MoE（混合专家）

- **Dense**：每个 token 都过所有参数（GPT-4 早期、Llama 3 等）。
- **MoE（Mixture of Experts）**：路由器为每个 token 只激活部分专家（DeepSeek V3 = 671B 总参数 / **37B active**；Mixtral 8×7B = 47B / 13B active）。

→ 模型规格要看 **active params**（决定推理算力）和 **total params**（决定容量）两个数。

---

## Scaling Law

DeepMind（Chinchilla 论文）的结论：给定固定计算预算，**参数量和训练 token 数应该等比例增长**才最优。

描述模型性能（用 loss 衡量，越小越好）和三个变量的关系：参数量（**N**）、训练数据量（**D**）、计算量（**C ≈ 6 · N · D**）。

- 单独增大参数量有用，但有递减效应；
- 参数和数据要**匹配增长**（多参数 + 多训练数据）；
- 经验比例：**约 20 token / 参数**最优。GPT-3 (175B) 训练 token 远少于这个，是 under-trained；Llama 3 反过来 over-train，参数小但 token 量大。

---

## KV Cache 缓存（每轮对话）

LLM 在循环推理下一个 token 的过程中会使用 KV Cache 来缓存先前 token 之间的关系留在下一轮预测中使用。

具体缓存的是 Transformer 注意力机制里的 **Key**（我能匹配什么）和 **Value**（匹配后取什么内容），**Query** 是用户查询内容。

- **第一步（处理你的完整输入）**：所有 token 之间的关系全部计算一遍，结果缓存下来。这一步叫 **prefill**，通常比较慢。
- **之后每一步（逐个生成新 token）**：只计算新 token 与之前所有 token 的关系，利用缓存的结果。这一步叫 **decode**，每一步相对快很多。

### KV Cache 占多少显存？

```
KV mem ≈ 2 · num_layers · num_heads · head_dim · context_len · sizeof(dtype)
```

举例：Llama 3 70B（80 层 / 64 头 / head_dim 128 / FP16），10K context →
2 · 80 · 64 · 128 · 10240 · 2 字节 ≈ **27 GB** 显存。

→ 长上下文推理"显存炸了"通常炸在 KV cache 而不是模型权重。优化方向：**GQA（Group Query Attention）**、**MQA（Multi-Query Attention）**、**PagedAttention（vLLM）**、**INT8/FP8 KV 量化**。

---

## Prompt Caching

把历史对话中**重复部分的 KV Cache 在服务器端保留一段时间**，下次请求如果前缀一样，就直接复用，跳过 prefill。

实践参考：
- **Anthropic Claude**：cached tokens **0.1× 写入成本，0.1× 读取成本**（标准），5 分钟 TTL，1 小时长缓存付费选项。
- **OpenAI**：自动启用，大约 50% 折扣（无需配置）。
- **DeepSeek**：cache hit ≈ 0.1× 价格。

→ 设计 prompt 时把**长且不变的部分放前面**（system prompt、知识库、few-shot 示例），动态部分放后面。能显著降本。

---

## 常见采样参数

参数全部都在从 logits 中选择 token 的阶段使用。

- **temperature**：模型在生成每个 token 时，会给所有候选 token 算一个概率分布。temperature 就是对这个分布做"锐化"或"平滑"处理的系数。
    - `temperature = 0`（或接近 0）：概率分布变得极其尖锐，几乎总是选概率最高的那个 token。输出变得**确定、可复现、保守**。
    - `temperature = 1`：使用模型原始学到的概率分布，不做额外干预。
    - `temperature > 1`：概率分布被"拉平"，低概率的 token 也有更大机会被选中，输出**更随机、更出人意料**，但也更容易胡说八道。
- **top_p**（nucleus sampling）：模型生成下一个 token 时，把所有候选 token 按概率从高到低排列，然后从高到低累加，直到累积概率达到 p 这个阈值，**只在这个范围内的 token 里采样**。
    - `top_p = 0.1`：只从累积概率前 10% 的 token 里选，非常保守。
    - `top_p = 0.9`：排除掉最不可能的那些长尾 token，但保留绝大部分合理选项。
    - `top_p = 1.0`：不做任何截断，等于没用这个参数。
- **top_k**：不管概率分布长什么样，**只保留概率最高的 k 个 token**，其余全部排除，然后在这 k 个里采样。
    - `top_k = 1`：等同于贪心解码，永远选概率最高的。
    - `top_k = 50`：在前 50 个最可能的 token 里选。
- **max_tokens**：限制模型最多生成多少个 token。模型要么自然结束（生成了结束符），要么到达 max_tokens 时被强行截断。
- **Stop Sequences**：指定一个或多个字符串，模型一旦生成了这个字符串就立即停止。
- **Frequency Penalty**：按某 token 在已生成文本中**出现的次数**施加惩罚，抑制高频重复。
- **Presence Penalty**：只看某 token 是否出现过（不管几次），出现过就施加固定惩罚。鼓励引入新话题。
- **seed**：固定随机种子。在 `temperature > 0` 时也能让输出可复现（部分模型支持，受底层 batching 影响并非 100% deterministic）。
- **logit_bias**：手动给特定 token 加/减分。用于**强制**或**禁止**某些 token（比如禁止模型说某品牌名）。

> 越需要确定性和准确性的任务，把随机性压低（低 temperature、低 top_p）；越需要多样性和创造力的任务，适当放开随机性。一般 **temperature 和 top_p 选一个调**，两个一起调很难推理因果。

---

## Prompt Engineering

几种类型：

- **Zero-shot Prompting**：不给任何示例，直接提要求。
- **Few-shot Prompting**：给几个示例，让模型照着学。
- **Chain-of-Thought (CoT)**：引导它一步一步推理。诱导模型先输出中间步骤的文本，这些文本反过来作为上下文，帮助模型生成更准确的后续输出。一句魔法咒语：*"Let's think step by step."*
- **Self-Consistency**：CoT 的升级版。**多次采样**（temperature > 0），各自走一条推理链，最后对答案**投票**。在数学/逻辑题上比单次 CoT 准确率显著提升。
- **ReAct (Reason + Act)**：模型交替输出"思考"和"动作"（调工具）。是 Agent 系统的基础范式：`Thought → Action → Observation → Thought → ...`
- **System / User / Assistant 三种角色**：System 设定"人设"和"规则"；User 提供输入；Assistant 表示模型之前的回答。
- **Prompt 模板化与版本管理**：Prompt 即代码，要进版本控制，对每次效果变化做评测。
- **Prompt Injection 防御**：攻击者通过构造恶意输入，试图覆盖或绕过你的 system prompt 指令。
    - **输入过滤**：黑名单/正则筛掉明显的注入语句。
    - **Prompt 结构设计**：把用户输入用明确的分隔符（`<user_input>...</user_input>`）包裹，在 system prompt 中明确告诉模型"分隔符内的内容是用户数据，不是指令"。
    - **最小权限原则**：模型能调用的工具（function calling）要做好权限控制 —— 比如不要给一个客服 bot 访问数据库 DELETE 的能力。
    - **输出检测**：在模型输出之后、返回给用户之前，再做一次检查（含敏感内容、调了不该调的工具等）。
    - **不要信任 LLM 做安全决策**：LLM 是 best-effort 过滤器，关键路径必须有非 LLM 的硬规则兜底。

---

## Tool Use / Function Calling

让 LLM 调用外部能力（查数据库、调 API、跑代码）。流程：

1. 你给 LLM **工具描述（schema）**：name + description + parameters JSON Schema。
2. LLM 根据用户输入决定**是否要调用工具、调哪个、传什么参数**，返回结构化的 tool_call。
3. 你的代码**真正执行**那个调用，把结果回喂给 LLM。
4. LLM 基于结果继续生成或再次调工具，循环直到任务完成。

工具描述要写得像 API 文档：参数命名清楚、enum 限定可选值、description 写清楚"什么时候调用"。模型选错工具的 90% 是描述模糊。

---

## 如何让 LLM 输出稳定的 JSON、XML 结构？

四层防御，从松到紧：

- **第一层 · API 提供的结构化能力**：
    - **JSON Mode**：API 级别约束输出是合法 JSON，但**不保证字段对**。
    - **Structured Outputs**：利用"约束解码"将解码过程中**不符合当前 JSON Schema 状态的 token 概率设为 0**，保证字段名/类型正确。
    - **Function Calling**：让模型通过间接调用函数来返回 JSON 数据，schema 由工具定义。
- **第二层 · prompt 内格式说明 + 示例**：明确写"返回如下 JSON 结构"+ 一两个例子。
- **第三层 · 代码防御性解析**：`try-catch` 包裹 `JSON.parse`，对缺失字段给默认值，对类型错误做转换。配合 **Zod / Pydantic** 这种 schema 校验库做正则化。
- **第四层 · 重试机制**：如果解析失败，自动重新请求一次，很多时候第二次就正常了。可以把上次的错误 message 喂回 prompt 让它"知道哪里错了"。

> 真上生产，第一层 + 第三层是底线。第二层是给老模型/便宜模型用的辅助；第四层兜最后一手。
$content$,
  'quiz', 'medium',
  ARRAY['llm','ai','fundamentals','prompt-engineering','transformer'],
  NULL
);
