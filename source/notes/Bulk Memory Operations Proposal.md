---
title: Finished Proposal - Bulk Memory Operations and Conditional Segment Initialization
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/bulk-memory-operations
date: 2021-05
---

#### Bulk Memory Operations

\- ***提案内容***：

新增指令 `memory.copy`，其签名类型与 *std::memcpy* 类似。

\- ***提案动机***：

现有的 Wasm 项目中，*memcpy* 与 *memset* 这两个操作被频繁调用。而 Emscripten 默认情况下对上述两个接口的实现方式为通过 `i32.load` 与 `i32.store` 的重复调用来小步“搬移”内存，其效率较为低下。

#### Conditional Segment Initialization

```wast
;; An example as below.
(import "a" "global" (global i32))  ;; global 0.
(memory 1)
(data (i32.const 0) "hello")   ;; data segment 0, is active so always copied.
(data "goodbye")               ;; data segment 1, is passive.
(func $start
  (if (global.get 0)
    ;; copy data segment 1 into memory 0 (the 0 is implicit)
    (memory.init 1
      (i32.const 16)    ;; target offset.
      (i32.const 0)     ;; source offset.
      (i32.const 7))    ;; length.
    ;; The memory used by this segment is no longer needed, so this segment can be dropped.
    (data.drop 1)
  )
)
```

\- ***提案内容***：

* 新增指令：
  * `memory.fill`：使用给定字节填充线性内存的一段区域；
  * `memory.init`：拷贝 *passive data segment* 的内容到线性内存中；
  * `data.drop`：丢弃 *passive data segment* 中的内容，阻止其被进一步使用；
  * `table.copy`：拷贝一个 *table* 中的元素到其他位置；
  * `table.init`：拷贝 *passive element segment* 的内容到一个表中；；
  * `elem.drop`：丢弃 *passive element segment* 中的内容，阻止其被进一步使用。
* 新增 Section：
  * ***DataCount***：`memory.{init,drop}` 指令使用了 *data segment* 的索引作为立即数，因此为了保持 Wasm 模块原有的 “*singe-pass validation*” 属性，该 section 用于存放模块中 Data Segement 的数量。**其 ID 为 12**，必须出现在 Code Section 与 Data Section 之前。而对于 Element Segments 来说，由于其位于 Code Section 之前，因此不需要额外的 Section 辅助。

\- ***提案动机***：

当前的 Wasm <u>[多线程提案](https://github.com/WebAssembly/threads)</u>在多个代理间共享一个 Wasm 模块时，模块需要在多个代理间分别初始化，而这可能会导致线性内存中的内容被覆盖。*table* 与之类似。

\- ***提案细节***：

* 二进制格式下，*data section* 中的每一个 *segment* 都有其对应的内存索引（memidx::=u32），以及初始化表达式来分别指定它的内存段与偏移。该提案将**利用现有的“内存索引”字段**，并重新定义该字段组成。比如对于 *data segment* 来说（*element segment 与之类似*）：

|  Bit   | Meaning  |
|  ----  | ----  |
| 0  | 0 - is active; 1 - is passive |
| 1  | If bit 0 clear, 0 - memory 0; 1 - has memory index |

* 对于 *passive* 类型的 *data segment* 或 *element segment*，需要被手动初始化；
* 上述所有指令对应的 OpCode 均以 “**0xfc**” 作为前缀；
* **Segement 初始化**：MVP 中，如果段（segments）的初始化发生了 out-of-bounds，则原有 memory 与 table 实例的内容不会被更改。而在该提案下中，每一个活动的（active）段都按照其在模块中的定义顺序初始化。对于每一个段，若初始化过程中发生了 out-of-bounds，则已写入的 in-bounds 内容保持不变。
