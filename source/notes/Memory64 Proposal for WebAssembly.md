---
title: Phase3 Proposal - Memory64
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/memory64
date: 2021-06
---

\- ***提案内容***：

扩展当前已有指令以支持 64-bit 线性内存。

* 新增了名为 `idxtype` 的类型，取值可为 `i32` 或 `i64`；
* 修改了 Limits 的定义；
* *memarg* 类型的参数允许接受一个 *i64* 的偏移量值。 

\- ***提案动机***：

* 对于某些应用，现有的 4Gib 地址空间不够用；
* 一些宿主希望使用 Wasm 作为其他物理 ISA 的 V-ISA 可移植的格式，而大部分物理 ISA 均支持 64 位地址空间。
