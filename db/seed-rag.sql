-- RAG quiz card — foundations + production gotchas.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'RAG · 检索增强生成 · 分块 / 向量 / 检索 / 重排',
$content$
## RAG (Retrieval Augmented Generation)

本质是**检索私有数据内容 → 塞进 prompt → 让 LLM 回答**。两个阶段：

- **离线阶段 · 建库**
    - 原始文档 →
    - 文档加载 →
    - 文本分块 →
    - 向量化（Embedding）→
    - 存入向量数据库。
- **在线阶段 · 检索**
    - 用户提问 →
    - 问题向量化 →
    - 向量数据库检索 →
    - （可选）Reranking 重排序 →
    - 拼接进 prompt →
    - LLM 生成回答。

> 一句话总结 RAG 的价值：**让 LLM 知道它训练时没见过的、私有的、或最新的信息**，而且不用 fine-tune。

---

### 文档加载（loaders）

不同格式难度差异很大：

- **TXT / Markdown**：直接读，结构清晰最适合 RAG。
- **HTML**：用 readability / BeautifulSoup 抽正文，去除导航/广告。
- **PDF**：PyMuPDF / pdfplumber 抽文本；扫描件需要 **OCR**（Tesseract / Azure Document Intelligence）；表格/多栏排版易丢失结构。
- **DOCX / PPTX / XLSX**：unstructured / python-docx。
- **代码仓库**：按文件 + AST 抽符号（类、函数）粒度切。

> 文档加载阶段的脏数据决定上限 —— "garbage in, garbage out" 在 RAG 里尤其残酷。

---

### 文本分块大小

通常问细节问题用小 chunk，问概念用大 chunk。也取决于 embedding 模型支持的最大长度。

- **chunk 太大**：噪音多，消耗 token 多，检索精度差。
- **chunk 太小**：语义不完整，上下文丢失。

经验值：**256–1024 tokens**，**overlap 10–20%**（保证跨 chunk 的连贯信息不被硬切）。

### 文本分块常见策略

- **固定大小（Fixed size）**：按字符数或 token 数切割，通常搭配 overlap 避免语义被硬切割。
- **Recursive Character Splitting**：LangChain 默认策略，按 `\n\n` → `\n` → ` ` 依次尝试切割，优先保留段落完整性。
- **Semantic Chunking**：根据**句子 embedding 的语义相似度**决定边界，相邻句子语义突变时切割。质量更高但计算成本更大。
- **Document-based**：按文档结构切（标题、章节），适合 Markdown、HTML 等结构化文档。每段携带"祖先标题路径"做 metadata，提升检索质量。
- **Sliding window**：固定大小 + 大 overlap（如 50%），适合对位置敏感的内容。

---

### 向量化（Embedding）

将文本转换为高维向量（通常 **768 ~ 3072 维**），语义相近的文本在向量空间中距离更近。

主流模型：

| 模型 | 维度 | 特点 |
|---|---|---|
| `text-embedding-3-small` (OpenAI) | 1536 | 性价比首选 |
| `text-embedding-3-large` (OpenAI) | 3072 | 精度高，可降维 |
| `BGE-M3` (BAAI 智源) | 1024 | 中文 + 多语言强，开源 |
| `Cohere embed-v3` | 1024 | 多语言强 |
| `voyage-3` (Anthropic 推荐) | 1024 | 长文档场景 |

要点：
- **同一个 RAG 应用必须用同一个 embedding 模型**做索引和查询，换了就要全量重做。
- 多语言数据要选**多语言 embedding**，否则跨语言检索差。

---

### 相似度搜索

- **余弦相似度（Cosine Similarity）**：最常用。计算两个向量夹角的余弦值，范围 `[-1, 1]`，值越大越相似。不受向量长度影响，适合文本语义匹配。
- **点积（Dot Product）**：比余弦快，但对向量大小敏感。**OpenAI 的新 embedding 模型已经归一化过**，点积 ≡ 余弦，且速度更快。
- **L2（欧氏距离）**：对绝对距离敏感，少用于文本。

### ANN（近似最近邻）

精确最近邻在百万级 + 高维下 O(N) 太慢，向量库用 ANN 算法：

- **HNSW（Hierarchical NSW）**：主流，速度和精度平衡最好，大部分向量库默认（pgvector, Qdrant, Weaviate）。
- **IVF（倒排文件索引）**：适合超大规模（百亿级），Milvus / FAISS 常用。
- **DiskANN**：磁盘索引，单机能扛十亿级别。

### 主流向量数据库

| 类型 | 代表 | 适用 |
|---|---|---|
| Postgres 插件 | **pgvector** | 已有 Postgres，数据量 < 1M，不想引入新基础设施 |
| 专用云服务 | **Pinecone**, **Vercel-managed Qdrant** | 不想运维，小到中规模 |
| 开源专用 | **Qdrant**, **Weaviate**, **Chroma** | 自建，灵活控制 |
| 大规模 | **Milvus** | 十亿级以上、需要多种索引算法 |

---

### Metadata 过滤

向量库支持把每个 chunk 附带 metadata（doc_id / 作者 / 日期 / 标签）。检索时**先 filter 后向量搜索**：

```
WHERE doc.team = 'engineering' AND doc.date >= '2025-01-01'
ORDER BY embedding <=> $query
LIMIT 20
```

→ 这是减少噪音、避免泄露其他租户数据的核心手段。

---

### Query 优化技巧

用户的问题往往不适合**直接**拿去做 embedding 检索：

- **Query Rewriting**：让 LLM 先把口语化问题改写成检索友好的查询（"前天那个 bug 是啥来着" → "bug fix 2026-05-29 incident"）。
- **Multi-Query**：让 LLM 把一个问题拆成 3-5 个不同角度的子查询，分别检索后合并。
- **HyDE（Hypothetical Document Embeddings）**：让 LLM 先**假装回答**这个问题（不要求正确），把这段假回答拿去做 embedding 检索。原理：假回答和真正的相关 chunk 在向量空间更接近，比原始 query 更接近。
- **Step-back Prompting**：问题先抽象成上位概念再检索，适合需要背景知识的问题。

---

### Reranking 重排序

向量检索找到的"相关"结果，不一定是最有用的结果，**reranker 负责把真正有用的排到前面**。

```
用户问题
  ↓
[Embedding 模型] → 问题向量
  ↓
[向量数据库] → 语义检索 top-20
[BM25 / 关键词]  → 关键词检索 top-20      // Best Match 25，关键词匹配算法
  ↓
[RRF 融合] → 合并结果 top-20             // Reciprocal Rank Fusion，把两个排名列表合并成一个
  ↓
[Reranker] → 精排 → top-5
  ↓
[Prompt 拼装] = 系统 prompt + 检索到的 5 段文本 + 用户问题
  ↓
[LLM] → 最终回答
```

#### 为什么 Hybrid（向量 + BM25）效果更好？

- **向量检索**强在语义近义（"汽车" ↔ "轿车"），但弱在**罕见专有词**（人名、产品代号、SKU）。
- **BM25 关键词**强在精确匹配，但完全不懂同义。
- 两者结果差异大，**互补性强**。RRF 是低成本的合并方法（不需要分数归一化）。

#### Cross-Encoder vs Bi-Encoder

- **Bi-Encoder**（embedding 检索）：query 和 chunk 各自单独编码成向量，离线建索引，**速度快但精度低**。
- **Cross-Encoder**（reranker）：把 query 和 chunk **拼成一个输入**进 Transformer，输出一个相关性分数。**精度高但慢**（不能预计算）。

→ 通用流程：bi-encoder 召回 top-50/100（快），cross-encoder 精排到 top-5（慢但精准）。

代表 reranker：**Cohere Rerank**、**BGE Reranker**、**Voyage Rerank**、**Jina Rerank**。

---

### Prompt 拼装

```
你是一个 XX 助手，只根据下面的 CONTEXT 回答问题。
如果 CONTEXT 不足以回答，请说"我不知道"，不要编造。

CONTEXT:
[1] {chunk_1.text}  (source: {chunk_1.source})
[2] {chunk_2.text}  (source: {chunk_2.source})
...

USER QUESTION:
{query}

回答时请在引用具体信息后用 [1][2] 标注来源。
```

关键点：
- **明确告诉模型"不知道就说不知道"**（reduce hallucination）。
- 要求**引用编号**，让用户能溯源（citation）。
- chunk 顺序：研究表明 LLM 对"中间被埋没"（lost in the middle）的内容关注弱 → **重要的 chunk 放头部或尾部**。

---

### RAG 评估（最容易被忽视的一环）

RAG 出错可能在任何一环（检索 / 重排 / 生成），需要**分层评估**：

- **检索层**：
    - **Context Precision** — 召回的 chunk 里有多少是真正相关的
    - **Context Recall** — 标准答案需要的信息是否都被召回了
    - **MRR / NDCG@k** — 排序质量
- **生成层**：
    - **Faithfulness** — 回答是否只用了 context 里的信息（无幻觉）
    - **Answer Relevance** — 回答是否真的回应了问题
    - **Citation Accuracy** — 引用的 chunk 编号对不对

主流框架：**RAGAS**、**TruLens**、**Phoenix (Arize)**。每次改 prompt / 模型 / chunk 策略都要跑 eval 防回归。

---

### 常见失败模式

| 现象 | 根因 | 应对 |
|---|---|---|
| 检索回来的全是离题 chunk | embedding 模型选错 / chunk 太小 / 没用 hybrid | 上 BM25 hybrid + reranker |
| LLM 编造 context 里没有的内容 | prompt 没禁止 / 模型太弱 | 强制 citation + faithfulness eval |
| 问题在最近文档里有答案但检索不到 | metadata 没按时间过滤 / index 没增量更新 | 加 date filter，做 freshness 排序 |
| 跨语言查询失败 | 单语言 embedding | 换成 multilingual embedding（BGE-M3 / Cohere） |
| 数字 / 表格被乱拆 | PDF 抽取丢结构 | 用 unstructured / Azure Document Intel；表格单独索引 |
| 长 context 时关键信息被忽略 | lost in the middle | 重要 chunk 重排到首尾；或用更大模型 |

---

### RAG vs Long Context vs Fine-tune

| 方案 | 适合 | 不适合 |
|---|---|---|
| **RAG** | 知识库大、需更新、需溯源、私有数据 | 需要风格/能力定制 |
| **Long Context**（200K+） | 文档体量小（单 PDF / 一份 codebase 的子集） | 数据量超过窗口；高频复用同一份内容（贵） |
| **Fine-tune** | 风格 / 输出格式 / 领域语气 | 注入事实性新知识（fine-tune 不擅长） |

实际项目里**三者经常组合**：RAG 取数 + 长上下文塞下 top chunks + fine-tune 控制输出风格。
$content$,
  'quiz', 'medium',
  ARRAY['rag','ai','llm','retrieval','embeddings'],
  NULL
);
