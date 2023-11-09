---
title: WebAssembly - Typed Function References
intro: 本篇来看的提案是 - “Typed Function References”，该提案在 “Reference Types” 提案的基础上为 funcref 增加了类型信息，使得基于引用的函数调用变得更加方便，同时也支持 GC 提案的正确实现。
comments: true
date: 2023-11-08 17:52:00
tags:
- WebAssembly
---

本篇来看的提案是 - “Typed Function References”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/function-references/blob/main/proposals/function-references/Overview.md)</b>。该提案在 “Reference Types” 提案的基础上为 funcref 增加了类型信息，使得基于引用的函数调用变得更加方便，同时也支持 GC 提案的正确实现。

本提案对 “Reference Types” 提案中原有一些指令的语义进行了修改，比如指令 `ref.func` 不再返回“上层”类型 funcref，而是返回带有详细类型信息的引用 “ref $t”（子类型），其中 “$t” 为类型索引。来看一个例子：

```wat
(module
  (type $i32-i32 (func (param i32) (result i32)))
  (func (export "foo") (param (ref $i32-i32)) (result i32) 
    (call_ref $i32-i32 (i32.const 10) (local.get 0))
  )
)
```

这里函数 foo 接收一个函数指针，对应类型为 “<i>(func (param i32) (result i32))</i>”。接着，通过 `call_ref` 指令，我们直接调用该指针对应的函数，并传递了一个 i32 类型参数值 10 作为实参。

默认情况下，“ref $t” 不能为空引用（non-nullable），即不接受指令 “*ref.null*” 产生的值作为参数；相反，“ref null $t” 则表示一个值可以为空（nullable）的引用（对于空引用可以简单理解为 nullptr）。围绕引用，提案又增加了若干指令用于引用的转换。比如指令 `ref.as_non_null` 将一个 nullable 引用转换为 non-nullable 引用，若失败则 trap；指令 `br_on_null` 也会进行该转换，但转换失败时则执行给定分支内的代码。

提案除了简化函数指针的实现方式外，也提供了更高效的函数调用过程。在此之前，通过 table 进行函数指针间接调用时，引擎需要在运行时检查 `call_indirect` 指令中携带的类型参数是否与所调用 table slot 中存放的 funcref 所引用的函数类型一致，若不一致则 trap，这在一定程度上带来了性能损耗。而本提案中，non-nullable 类型函数引用在被调用时，由于其已携带类型信息，便可以省去类型检查的过程。
