---
title: WebAssembly - Multiple Memories
intro: 本篇来看的提案是 - “Multiple Memories”。该提案为 Wasm 提供了多内存段（memory section）支持。
comments: true
date: 2023-11-07 17:52:00
tags:
- WebAssembly
---

本篇来看的提案是 - “Multiple Memories”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/multi-memory/blob/main/proposals/multi-memory/Overview.md)</b>。该提案为 Wasm 提供了多内存段（memory section）支持。

在 MVP 标准中，一个 Wasm 模块只能引用唯一的线性内存段，这导致应用程序很难高效地在多个不同内存段之间转移数据（只能以逐个值的方式来拷贝）。除此之外，提案总结了以下五个场景，这些场景都可以通过为 Wasm 支持多内存段得以更好地实现：

* **安全**：Wasm 模块可以通过分离公共和私有内存段的方式来安全地向外部环境交换数据；
* **隔离**：即使在单个 Wasm 模块内部，同时拥有这两种内存并且将多个线程之间共享的内存，与以单线程方式使用的内存分开也是有益的；
* **持久化**：应用程序可能希望在每次运行时，通过诸如将内存数据存储在文件中的方式来保持某些内存状态。但它可能不想对其所有内存都这样做，因此通过使用多个内存段分离生命周期是一种更加自然的方式；
* **链接**：可以更好地支持将多个 Wasm 模块静态链接成单一模块时，对线性内存段的处理；
* **扩展**：提供了一种方式可以支持在 Wasm32 上使用超过 4GB 的内存；
* **Polyfilling**：为模拟 GC、Interface Types 等提案功能提供一定支持。

“多内存段”的支持会影响所有内存相关指令和结构的使用方式，主要改动在于引入了用于指定内存段的索引值。具体可以参考下面这段代码：

```wat
(module
  (memory 1 1)  ;; Memory 0.
  (memory 1 1)  ;; Memory 1.
  (data 0 (i32.const 0) "\10")
  (data 1 (i32.const 1) "\20")
  (func (export "foo") (result i32 i32)
    (i32.store 0 (i32.const 1) (i32.const 10))
    (i32.store 1 (i32.const 1) (i32.const 20))
    (i32.load 0 (i32.const 0))
    (i32.load 1 (i32.const 0))
  )
)  
```
