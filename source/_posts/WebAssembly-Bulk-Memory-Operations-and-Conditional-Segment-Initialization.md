---
title: WebAssembly - Bulk Memory Operations and Conditional Segment Initialization
intro: 今天来看的提案是 - “Bulk Memory Operations and Conditional Segment Initialization”。该提案提供了更高效的线性内存和 Table 操作指令（类似于某种 “super instruction”），以及针对两者的条件初始化能力。
comments: true
date: 2023-11-03 11:32:00
tags:
- WebAssembly
---

今天来看的提案是 - “Bulk Memory Operations and Conditional Segment Initialization”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/bulk-memory-operations/blob/master/proposals/bulk-memory-operations/Overview.md)</b>。该提案提供了更高效的线性内存和 Table 操作指令（类似于某种 “super instruction”），以及针对两者的条件初始化能力。

### Bulk Memory Operations

提案的背景源于 MVP 标准下，Wasm 在编译使用了 memcpy 与 memmove 等批量内存操作函数时会采用 `i32.load` 与 `i32.store` 等线性内存指令来模拟实现，而这些指令在每次执行时仅能够操作固定字节宽度的数据，因此，对于内存操作密集型应用来说，这些指令的执行便占用了大量的时钟时间（指令 dispatch 耗费了大量时间）。比如下面这条评论：

> In a number of game engines I've been optimizing and benchmarking, interestingly the performance of memcpy() does show up relatively high in profiles. (~2%-5% of total execution time).


为此，提案新增了指令可用于批量操作线性内存，当然也包括 table。来看下面这个例子：

```wat
(module
  (memory (export "memory") 1 1)  ;; Initial -> 1 page, maximum -> 1 page.
  (data (i32.const 0) "\01\02\03\04")
  (func $start
    (memory.copy (i32.const 2) (i32.const 0) (i32.const 2))  ;; Copy memory data.
  )  
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0)))
  (start $start)
) 
```

在这段 WAT 中我们定义了两个函数，其中 “$start” 会在模块实例化时被执行，“$load8_u” 会被导出到宿主环境中使用。代码第二行定义了 Wasm 模块使用的线性内存段；第三行定义的 data 段初始化了线性内存中的数据。在代码第五行的函数 “$start” 内部，我们使用了提案新增加的指令 `memory.copy`，该指令将以默认内存段偏移 “(i32.const 2)” 个字节的地方作为数据拷贝的源地址，以偏移 “(i32.const 0)” 个字节的地方作为目的地址，拷贝长度为 “(i32.const 2)” 字节的数据。

```javascript
WebAssembly.instantiate(wasmModule).then(
  (instance) => { 
    const { load8_u } = instance.exports;
    for (let i = 0; i < 4; ++i) {
      console.log(load8_u(i));  // “1 2 1 2”.
    }    
  });           
```

导出的函数 “$load8_u” 可用于查看默认线性内存指定字节偏移位置处的数据值。通过上述 JavaScript 代码，我们可以使用该 Wasm 模块，并验证指令的执行结果符合我们的预期。


### Conditional Segment Initialization

除了对已有线性内存或 table 进行数据拷贝和填充外，对两者的“条件初始化”能力也被考虑了进来。增加这个能力的起因源于“在多个 agent 之间共享 Wasm 模块”的场景。正常情况下，Wasm 模块的线性内存段会在模块实例化时由执行引擎自动完成加载，而当一个 Wasm 模块被多个 agent 同时使用，且它们共享同一块线性内存时，该内存区域便会在不同模块实例化时被多次加载，以至某些来自于前一个模块的计算结果值被覆盖。

“条件初始化”，意味着原有的线性内存和 table 初始化过程都变得可控，而不再局限于仅由 Wasm 执行环境自动完成。看下面这个例子：

```wat
(module
  (memory (export "memory") 1 1)
  (data (i32.const 0) "\01\02\03\04")
  (data "\05\06\07\08")  ;; Define a "passive" data segment.
  (func
    (memory.init 1 (i32.const 2) (i32.const 2) (i32.const 2))  ;; Initialize memory with given segment.
    (data.drop 1)
  )  
  (func (export "load8_u") (param i32) (result i32)
    (i32.load8_u (local.get 0)))
  (start 0)
) 
```

WAT 的大部分内容与上一小节中的例子类似，这里我们在代码第四行又定义了一个 data 段结构，这个段结构由于没有指定初始化偏移位置，因为它被默认定义为 “passive segment”，而对于这种段结构，它不会被自动填充到对应的 memory 或 table 结构中，相反则需要通过显式指令完成这个过程。这个指令就是代码第六行出现的 `memory.init`，该指令可以将给定的 data 段结构数据填充到指定线性内存段的某个位置。需要注意的是，active 类型的 data 或 element 段会在执行引擎完成数据填充后被自动“丢弃”，正如我们在代码第七行通过指令 `data.drop` 所做的事一样。被丢弃后的段可用数据长度为 0。

```javascript
WebAssembly.instantiate(wasmModule).then((instance) => { 
  const { load8_u } = instance.exports;
  for (let i = 0; i < 4; ++i) {
    console.log(load8_u(i));  // “1 2 7 8”.
  }    
});           
```

### Instruction Encoding

提案新增加的所有指令可以参考下表：

| Name    | Opcode | Immediate | Desc |
| -------- | ------- | ------- | ------- |
| *memory.init*  | 0xfc 0x08  | segment:varuint32, memory:0x00 | 从一个 “passive data” 段拷贝数据到线性内存 |
| *data.drop*  |	0xfc 0x09	 | segment:varuint32 | 丢弃一个 “passive data” 段 |
| *memory.copy*  |	0xfc 0x0a | memory_dst:0x00 memory_src:0x00 | 拷贝内存 |
| *memory.fill*  |	0xfc 0x0b | memory:0x00 | 用指定字节填充内存 | 
| *table.init*  |	0xfc 0x0c	 |  segment:varuint32, table:0x00 |  从一个 “passive element” 段拷贝数据到 table |
| *elem.drop*  |	0xfc 0x0d	|  segment:varuint32 | 丢弃一个 “passive element” 段 |
| *table.copy*  |	0xfc 0x0e | table_dst:0x00 table_src:0x00	| 拷贝 table |

### 其他信息

提案新增加的 “memory.{init,drop}” 指令使得我们可以直接在 Code Section 内访问 Data Section 中的段结构，这打破了 Wasm 设计上的 “single-pass validation”（即编译模块当前位置需要的信息都可以在前面几步中获得）结构。为此，提案新增加了名为 “DataCount” 的可选 Section (code = 12)，该结构位于 Code Section 之前，其中存放有当前 Wasm 模块中定义的 data 段数量。当验证时出现以下情况则表示模块结构的异常：

* DataCount Section 中存放的 count 值不等于 Data Section 中定义的 data 段数量；
* DataCount Section 未定义，但模块内使用了 `memory.init` 和 `memory.drop` 指令。



