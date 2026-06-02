-- KV Cache + memory hierarchy (HBM / DRAM / SSD / HBF) deep dive.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'LLM 推理 · KV Cache 与存储层级 (HBM / DRAM / SSD / HBF)',
$content$
## KV Cache

Transformer 架构中，每次计算 attention 时，输入序列中的每个 token 都会被变换成三个向量：**Query（查询）**、**Key（键）**、**Value（值）**。

**注意力的本质**就是用 Query 去和所有 Key 做匹配得到权重，然后按匹配权重对 Value 加权求和 —— **最终结果由所有 Value 共同参与得来**。

LLM 生成文本是**自回归**的，一次只生成一个 token。生成第 N+1 个 token 时，需要把前面 N 个 token 的 Key 和 Value 全部参与 attention 计算。

**KV Cache 就是**：把每一步已经计算过的 Key 和 Value 向量缓存下来，后续生成新 token 时直接复用，不再重复计算。

> 推理时是用**已经训练好的固定投影矩阵 W_Q / W_K / W_V**，为每个新 token 生成对应的 Q/K/V 向量。矩阵是固定的，向量是每次新算的。

### 为什么不缓存 Q？

- **K 和 V**：服务于"我能被谁查到、我提供什么内容"。**老 token 的 K/V 在生成新 token 时仍要被读取做 attention** —— 所以值得缓存。
- **Q**：服务于"我当前要查什么"。每生成一个新 token 都是**全新的一个 Q**，老 token 的 Q 在它自己那一步之后就再也用不到 —— 所以缓存它毫无意义。

### Prefill 阶段 vs Decode 阶段

- **Prefill**：处理完整 prompt，一次性算出所有输入 token 的 K/V 并存入 cache。**算力密集（compute-bound）**，因为可以大并行。
- **Decode**：逐个生成新 token，每步只算 1 个新 token 的 Q/K/V，但要**读取已 cache 的全部 K/V**。**带宽密集（memory-bound）**，因为算的少读的多。

→ 这就是为啥**第一个 token 慢、后续 token 快**（前者是 prefill，后者是 decode）；也是为啥**长上下文显存爆炸**（KV cache 随 token 数线性增长）。

### KV Cache 占多少显存？

```
KV mem ≈ 2 · num_layers · num_heads · head_dim · context_len · sizeof(dtype)
```

举例：Llama 3 70B（80 层 / 64 头 / head_dim 128 / FP16），10K context →
**~27 GB 显存仅 KV Cache**（不算模型权重的 140 GB）。

### KV Cache 优化手段

| 技术 | 原理 | 节省 |
|---|---|---|
| **MQA** (Multi-Query Attention) | 所有 head 共享同一份 K/V | 减少 cache 大小 N 倍（N = head 数） |
| **GQA** (Grouped Query Attention) | 每组 head 共享 K/V（Llama 3 / Mistral 用） | 折中：质量比 MQA 好，cache 比 MHA 小 |
| **Sliding Window Attention** | 只 cache 最近 W 个 token（Mistral 7B） | cache 固定不增长，但失去远距离信息 |
| **PagedAttention** (vLLM) | KV cache 按 block 分页（类似 OS 虚拟内存） | 减少碎片，多请求间共享 prefix |
| **KV 量化** | FP16 → FP8 / INT8 / INT4 | 减半到 1/4 显存，质量损失小 |
| **Prefix Caching** | 跨请求复用相同前缀的 KV | 不同用户的 system prompt 只算一次 |
| **Offload** | 不活跃的 KV 卸到 CPU / 磁盘 | 见下文 HBM → DRAM → SSD 层级 |

---

## 存储层级：HBM → DRAM → SSD → HBF

LLM 推理的存储层级和容量/带宽/价格的折中：

| 层级 | 带宽（典型） | 容量（单卡/单机） | 单 GB 成本 | 用途 |
|---|---|---|---|---|
| **HBM** (GPU 显存) | 3000–8000 GB/s | 80–192 GB | $$$$ | 模型权重 + 活跃 KV Cache |
| **DRAM** (CPU 主存) | 50–100 GB/s | 512 GB – 2 TB | $$ | KV Cache offload，prefix cache pool |
| **HBF** (NAND-on-HBM 封装) | 1000–2000 GB/s* | 1–4 TB（规划中） | $ | 介于 HBM 和 DRAM 的"温层"，模型/cache 大块只读数据 |
| **SSD** (NVMe) | 7–14 GB/s | 4–32 TB | ¢ | 极冷数据，模型权重磁盘加载 |

\* HBF 数据为厂商规划/原型，2026 年开始小规模商用。

---

### HBM（High Bandwidth Memory）

HBM 就是 **GPU 上的显存**，带宽极高，延迟极低。**KV Cache 最理想的存放位置就是 HBM**，因为推理时每生成一个 token 都要读取整个 KV Cache 做 attention 计算，需要极高的带宽。

LLM 推理的瓶颈往往**不是算力而是显存带宽**（memory-bound），KV Cache 的读取就是主要的带宽消费者。

但 HBM 本身**容量较小**：H100 80 GB、H200 141 GB、B200 192 GB。模型参数本身就占大头，再加上多用户并发的 KV Cache，直接限制了一张 GPU 能**同时服务多少用户**（throughput）和**支持多长的上下文**。

> 这就是为啥 NVIDIA 卡卖那么贵 —— HBM 不只是存储，是**性能瓶颈**本身。三星/SK Hynix/Micron 三家几乎垄断 HBM 供应。

---

### DRAM（CPU 内存）

当 HBM 不够时，一个思路是把部分 KV Cache **卸载（offload）** 到 CPU 的 DRAM。DRAM 容量大得多，价格也便宜得多。

但 DRAM 带宽远低于 HBM（**约 50–100 GB/s vs 3000+ GB/s**），而且 GPU 读取 CPU 内存还要经过 **PCIe 总线**（Gen5 也只有 64 GB/s 单向），增加延迟。

代价是**推理变慢**。但对于一些延迟要求不那么严格的场景（如长文档分析，用户可以等几秒），这是一个可行的折中。

**典型应用**：
- **Prefix Cache Pool** — 长 system prompt / 知识库前缀放 DRAM，用到的时候 swap-in HBM
- **HuggingFace `accelerate`** / **DeepSpeed-Inference** 的 CPU offload
- **llama.cpp** 的部分卸载策略（GPU 跑前 N 层，CPU 跑后几层）

---

### SSD / NAND

当 DRAM 也不够或者成本太高，可以考虑把不常用的 KV Cache 放到 **SSD**（固态硬盘）上。SSD 的底层存储介质就是 **NAND Flash**。

- 容量：单盘 4–32 TB，集群级 PB 级
- 价格：**远低于 DRAM**（~10×）
- 带宽：**7–14 GB/s**（高端 NVMe）— 又低一个数量级
- 延迟：~100 μs（vs HBM ~100 ns —— 慢 1000 倍）

**典型应用**：
- **历史会话 KV** — 用户停止对话后 KV cache 不立刻丢，落盘等回来时再加载
- **超长文档 Q&A** — 一份 10 MB 的法律文档 prefill 一次就把 KV 落盘，复用很多次
- **模型权重磁盘加载** — 大模型分块从 SSD 流式读到 HBM（mmap 技巧）

→ "**Prefix Caching across SSDs**" 是 2025–2026 长上下文低成本服务的关键架构。

---

### HBF（High Bandwidth Flash）

一种**基于 NAND Flash 的新型存储**技术，被封装成类似 HBM 的形态：用 NAND 的高密度替代部分 DRAM，从而在**保持接近 HBM 带宽**的同时，**提供远超 HBM 的容量**。

特点：
- 容量：**1–4 TB / package**（HBM 是 24–36 GB / package）
- 带宽：**约 1–2 TB/s**（接近 HBM4 的下限）
- 价格：远低于 HBM
- 限制：**NAND 寿命有限**（写次数受限），适合**读多写少**的场景

**主要参与者**：
- **SanDisk / Kioxia** 联合推 HBF 标准
- **SK Hynix** 跟进
- 2025 年 8 月 OpenAI 和 SanDisk 签了合作探索 HBF 推理用途

**LLM 推理上的设想用途**：
- **模型权重**（read-mostly）— 一份权重多次推理，写很少
- **大规模 prefix cache pool**（read-mostly）— 海量长 prompt 缓存
- **KV cache 的"温层"** — 比 HBM 容量大、比 DRAM 带宽高

→ HBF 还在早期，2026 年开始小规模商用，2027–2028 才可能成为推理基础设施的标配。

---

## 一句话总结存储层级在 LLM 推理中的分工

- **HBM** 放**活跃工作集**：模型权重 + 当前并发 batch 的 KV Cache。带宽决定 token/s。
- **DRAM** 放**温数据**：prefix cache pool、批量 offload 的 KV。容量大、带宽够看场景。
- **SSD** 放**冷数据**：历史会话、长文档持久化 KV、模型权重持久存储。容量大、带宽低。
- **HBF**（未来）填 HBM 和 DRAM 之间的**带宽 × 容量空白**，让大上下文 / 大模型推理成本结构性下降。

**LLM 推理优化的工程师**今天的核心问题之一就是：**给定 SLO（延迟）和 throughput 目标，把哪些数据放到哪一层最划算**。
$content$,
  'quiz', 'hard',
  ARRAY['kv-cache','llm','ai','inference','memory-hierarchy','hardware'],
  NULL
);
