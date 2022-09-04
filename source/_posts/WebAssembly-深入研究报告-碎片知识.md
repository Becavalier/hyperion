---
title: WebAssembly 深入研究报告 - 碎片知识
intro: 本文主要内容是对 WebAssembly 的一些碎片化的概念进行整合。同时还包括一些 Q&A 的问题与答案。WebAssembly 接下来主要会在多线程和垃圾回收两个方面进行更多的讨论和提案修改，而 GC 标准的确定又会为 Post-MVP 中的诸如 DOM 引用与操作等前端相关功能特性打下基础。
comments: false
date: 2017-07-19 16:31:39
tags:
- WebAssembly
---

本文主要内容是对 WebAssembly 的一些碎片化的概念进行整合。同时还包括一些 Q&A 的问题与答案。WebAssembly 接下来主要会在多线程和垃圾回收两个方面进行更多的讨论和提案修改，而 GC 标准的确定又会为 Post-MVP 中的诸如 DOM 引用与操作等前端相关功能特性打下基础。

#### 1、.wast 和 .wat 的区别？

`.wast` 格式是 `.wat` 格式的一个“超集”。`.wast` 文本不仅可以包含模块定义的语法，同时还会包含一些用于代码测试的[语法扩展](https://github.com/WebAssembly/spec/tree/master/interpreter/#scripts)，比如“断言”等。但这些语法并不是官方定义的模块语法标准。因此在编写一个 WebAssembly 模块时尽量使用 `.wat` 作为模块的后缀名。而 `.wast` 一般用来作为测试脚本的格式。

#### 2、f32/f64 的编码方式？

给出如下语句：

```c
double x = 1;
```

对应的 Wat 可读文本代码：

```wat
(module
  (table 0 anyfunc)
  (memory $0 1)
  (data (i32.const 16) "/00/00/00/00/00/00/f0?")
  (export "memory" (memory $0))
)
```

WebAssembly 使用 IEEE-754 编码来编码 f32/f64 数值。由于普通的 .wat 源码使用 ASCII 编码，因此对应的数据段 "/00/00/00/00/00/00/f0?" 转换为十六进制后其值为：“3FF0000000000000”，该值再经过 IEEE-754 编码的[解码](http://babbage.cs.qc.cuny.edu/IEEE-754/)后便可得到原始值“1”。
