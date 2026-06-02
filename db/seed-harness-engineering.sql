-- Harness Engineering / Agentic Coding tooling & knowledge layer.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'Harness Engineering · Agentic Coding · 文档基础设施 / Tooling',
$content$
## Knowledge Layer for Agentic Coding

**喂给模型的上下文质量 > 模型本身的能力。**

### 范式转变

文档从"交付物"变成了"基础设施"。Coding agent 无法脑补未写明的约定，**过时文档比没文档更危险** —— 它会产生"自信但错误"的代码。

| 旧范式 | 新范式 |
|---|---|
| 在代码**之后**写 | 写在代码**之前 / 同时** |
| 为**人类**可读 | 为**机器（LLM）**可解析 |
| 放在 `docs/` 外（Notion / Confluence） | 放在 **repo 里**，跟代码同 git 历史 |

### 四层架构

| 层 | 内容 | 要点 |
|---|---|---|
| **L1 结构化内容** | Markdown + YAML frontmatter 元数据 | Markdown 比 HTML **省 ~80% token** |
| **L2 机器可读索引** | `llms.txt`、`manifest.json`、`codebase-map.json` | 让 agent 知道**有什么、在哪儿** |
| **L3 Agent 指令** | `AGENTS.md` + prompt context | **统一**取代 `.cursorrules` / `CLAUDE.md` / `.windsurfrules` 等碎片化文件 |
| **L4 实时查询** | MCP Server | 仅**外部消费者**需要；内部 agent 直接读文件系统即可 |

### 目录约定

- `docs/general/` — **这个项目是什么**：领域、技术栈、模块、数据流、术语表
- `docs/engineering/` — **系统怎么构建的**：编码规范、数据层设计、复杂子系统设计决策
- `docs/operations/` — **怎么跑和维护**：CI/部署、上下游依赖、`runbooks.md`、值班手册

### 索引文件

- **`llms.txt`** — 给**外部 AI** 的目录：文件名 + 一句话介绍 + 位置（[llmstxt.org](https://llmstxt.org/) 提的标准）
- **`manifest.json`** — 文档注册表，**内部 agent** 用，结构化文档信息查询
- **`codebase-map.json`** — 代码功能 → 文档位置的反向映射

### AGENTS.md 标准

[agents.md](https://agents.md/) 是 OpenAI / Anthropic / Cursor 等公司在 2025 年共同推的**统一标准**，目的是让一份文件被所有 agent 工具复用，避免 `.cursorrules` / `CLAUDE.md` / `.windsurfrules` / `.aider.conf` 重复维护。

典型内容：
- 项目结构和入口
- 编码规范（命名、错误处理、注释）
- 测试 / lint / build 命令
- 危险操作禁忌（不要 force push / 不要改 migration / 不要碰 prod env）
- 项目领域术语

> 写一份 `AGENTS.md`，所有 client（Claude Code / Cursor / opencode / Aider / Continue）都能读到。

### Spec-Driven Development (SDD)

**先写 spec，再生成代码。spec 是 source of truth**。

工作流：
```
人类写 spec.md (功能 + 边界 + 验收) →
agent 读 spec 生成 code + tests →
agent 跑 tests 验证 →
人类 review diff，spec 不一致就改 spec 再生成
```

代表实现：
- **Anthropic Spec Kit / openspec** — 把 spec 文件标准化
- **kiro** — Amazon 的 spec-first IDE
- **Plain text + AGENTS.md 约定** — 不需要特殊工具，prompt 引导即可

### 给 Agent 写文档的 5 条规则

1. **声明式**，非对话式（"the function returns X when Y" 而非 "if you want to do X, you can ..."）。
2. **一页一主题**，开头两句话讲清本页内容（agent 选阅读时只看头几句）。
3. **术语一致**：定义在 `glossary.md`，全局统一。
4. **完整可运行的示例**，指向代码库中的 canonical example，不要写半截 snippet。
5. **显式链接相关文档**，不要指望 agent 自己推断关联性。

### 自动化维护

- **能从代码生成的文档就不要手写**（API 签名、配置项、CLI 帮助文）
- CI 中加入守护：
    - 文档漂移（doc-vs-code 不一致）→ **构建失败**
    - frontmatter 不完整 → 构建失败
    - `last_verified` 超 90 天 → 告警
- 评测：定期跑一组 "agent 读 doc → 解答测试题" 的回归测试，防止文档静默失效

### 潜在问题

- 这套体系的**质量上限取决于写 spec 的人是否真的在传递信息** —— 工具帮不了"解决人不想说真话"的问题。
- 要求所有文档**可证伪**：
    - 要么能写出测试
    - 要么能写出"什么条件下这个结论不再成立"

---

## Harness Engineering

软件工程师的角色正在从"**直接写代码**"转变为"**驾驭 AI 工具完成工程任务**"。

> "Harness" = 马具 / 驾驭装置 —— 把强大但不羁的 LLM 套上能干活的工程具。

### 三个核心能力

1. **如何有效引导 AI agent 完成任务** —— 任务分解、约束注入、上下文裁剪
2. **如何搭建和配置 AI 工作流** —— prompt 设计、工具链、上下文管理、权限控制、hooks
3. **如何审查和验证 AI 的输出** —— 代码 review、测试、安全扫描、性能验证

### 三个相关概念的区分

| 概念 | 侧重点 | 谁负责质量 |
|---|---|---|
| **Prompt Engineering** | 如何写好**一个** prompt | 人 |
| **Harness Engineering** | 如何搭建**整个** AI 辅助开发的工作流和基础设施 | 系统 |
| **Vibe Coding** | 随意让 AI 写，不太关注质量 | 无人（碰运气） |

---

## Agentic Coding 工具生态

### Anthropic / OpenAI / 大厂官方

- **Claude Code** (Anthropic) — 终端 CLI agent，原生支持 MCP / hooks / skills / agents / TaskCreate；目前 agent loop 最成熟的官方工具
- **OpenAI Codex CLI** — OpenAI 类似的开源 CLI
- **Cursor** — 闭源 AI IDE，市占率最高；自己的 Cursor Composer / Cursor Agent
- **Windsurf** (Codeium) — Cursor 的主要竞争者，强调"Cascade" agent flow
- **GitHub Copilot** — 老大哥，从补全演进到 Agent / Workspace

### 开源 / 自托管（"开源的 Claude Code"系列）

- **opencode** ([opencode.ai](https://opencode.ai/)，SST 团队) — **开源版 Claude Code**，TUI + 多 provider（Claude / GPT / Gemini / 本地 Ollama）；支持 MCP、AGENTS.md、可自托管
- **Aider** ([aider.chat](https://aider.chat/)) — 老牌 OSS pair programmer，terminal-based，git-native（每次改动自动 commit）
- **Cline** (formerly Claude Dev) — VSCode 扩展，强 agent loop + auto-approve modes
- **Continue.dev** — 开源 VSCode/JetBrains 助手，强 RAG 整合，AGENTS.md / rules 支持
- **Goose** (Block / Square) — 开源 desktop AI agent，MCP 原生
- **roo-code** / **Roo Cline** — Cline 的 fork，更激进的 auto 行为

### 自动化 / Background Agent

- **Devin** (Cognition) — 自主 agent，能跑数小时
- **Codegen.com** / **Sweep AI** — GitHub issue → PR 全自动
- **Tabby** / **Refact** — 自托管补全 + agent
- **Vercel Agent** — PR review / production investigation 自动化

### CLI / Skill / Hook 抽象

现代 agent CLI 都收敛到类似抽象：

| 抽象 | 作用 | 例子 |
|---|---|---|
| **Skill / Slash command** | 用户可调用的 prompt 模板 | `/test`、`/review`、`/refactor` |
| **Agent / Subagent** | 子任务委派给独立 agent，隔离上下文 | `general-purpose`、`code-reviewer` |
| **Tool / MCP server** | agent 能调用的能力 | 文件读写、shell、DB 查询 |
| **Hook** | 在特定事件触发的脚本（pre-commit / pre-tool-use） | 自动 lint、敏感操作拦截 |
| **Memory / CLAUDE.md / AGENTS.md** | 跨会话持久的上下文 | 项目约定、用户偏好 |
| **Permission / Allowlist** | 哪些工具可自动执行，哪些要人确认 | `Bash(npm test)` 自动；`Bash(rm -rf)` 拒绝 |

---

## 关键工程实践

### Verification Loop

让 agent **自己验证自己**：

```
agent 写代码 → 跑 tests → 失败？读错误 → 改 → 再跑 →
... 通过 → 跑 lint → 通过 → 报告给人
```

- 没 verification 的 agent 跟"vibe coding"没区别
- 关键是**机器可验证的信号**（测试通过、type check 过、性能基准达标）—— 不能只让 LLM 自己说"我做完了"

### Plan Mode / Auto Mode

- **Plan Mode**：agent 先输出**完整计划**（修改哪几个文件、怎么改），人确认后再执行 → 适合改动大、影响面广的任务
- **Auto / Edit Mode**：agent 直接改 → 适合小、低风险任务
- **YOLO Mode**：完全放权 + 沙箱里跑 → 适合实验、不可逆操作需要 worktree 隔离

### Worktree / 沙箱隔离

让 agent 在一个**独立 git worktree** / 容器 / VM 里跑：
- 改坏了不影响主分支
- 多个 agent 可以**并行**做不同任务
- 危险操作（删文件、改 env、装包）有边界

Claude Code 内置 `worktree` 隔离；其他工具用 docker / firecracker。

### Human-in-the-loop Patterns

| 时机 | 谁做 |
|---|---|
| 决定要做什么 | **人**（spec、需求） |
| 拆解任务 | **agent**（plan mode） |
| 写第一版代码 | **agent** |
| 自动化验证（test / lint / build） | **agent** |
| Code review | **人 + 第二个 agent**（cross-check） |
| 合入 main / 部署 | **人**（最后一道闸） |

### 危险信号

- agent **狂改文件**但没跑测试 → 用 hook 强制 pre-edit 跑 type check
- agent **绕过失败的 test**（注释掉、改断言迎合实现）→ pre-commit hook 检查 test 文件被改 vs 实现文件被改的比例
- agent **重写而不是修复**（用大改替代局部 fix）→ 强约束 `MIN_DIFF_FIRST`
- agent **写"防御性代码"** 增加无意义检查 → AGENTS.md 明确"trust 内部代码，只在边界做校验"

---

## 上下文管理（Harness 的灵魂）

LLM context 不是越多越好 —— 越大越容易**"lost in the middle"**。Harness 的核心活就是**给 agent 看刚好够的东西**。

技巧：
- **按需加载**：agent 自己用 `Read` / `Grep` 拉文件，而不是一次性塞整个 repo
- **摘要传递**：跨 agent / 跨任务用摘要，不要 dump 全文
- **隔离子任务**：subagent 启动时给一个干净 context，做完返回摘要
- **prompt caching**：长不变的部分（system prompt / AGENTS.md / 知识库）放前面，享受缓存折扣
- **会话回收**：长会话定期"压缩"历史（自动 summarization），保住关键事实

---

## 给工程师的趋势预判

- **写代码本身**会越来越快变成 commodity；**写规约 / 设计 review / 工程系统**会变成核心价值。
- **Harness Engineer** 是新工种 —— 会变成像 SRE / Platform Engineer 一样的横向角色。
- **可观测性 + 可验证性** 是 agent 时代的硬需求；agent 跑得快但没人知道它干了啥 = 灾难。
- **AGENTS.md + spec-first** 会变成标准，就像现在的 README.md。
- 写文档的能力 ≈ 调教 AI 的能力 ≈ **新一代工程沟通能力**。
$content$,
  'quiz', 'medium',
  ARRAY['harness-engineering','agentic-coding','ai','documentation','spec-driven','workflow','tooling'],
  NULL
);
