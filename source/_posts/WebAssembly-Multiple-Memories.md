---
title: WebAssembly - Extended Constant Expressions
intro: 本篇来看的提案是 - “Extended Constant Expressions”。该提案增加了更多可以应用在 Wasm 常量表达式中的常量指令。
comments: true
date: 2023-11-07 16:04:00
tags:
- WebAssembly
---

本篇来看的提案是 - “Extended Constant Expressions”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/extended-const/blob/main/proposals/extended-const/Overview.md#extended-constant-expressions)</b>。该提案增加了更多可以应用在 Wasm 常量表达式中的常量指令。


### 常量表达式（Constant Expression）

常量表达式，即表达式本身可以在编译期被求值。Wasm 标准中定义，一个常量表达式是由一系列常量指令（即返回值为一个常量）外加对应操作数组成的。在字节码中，整个表达式以 “0b” 结尾，比如 `(i32.const 10)` 便是最常见的一类常量表达式，它定义了一个 i32 类型的常量值 10。根据现有标准规定，我们可以在下列这些语法结构中使用常量表达式：

* global 的初始值（*init*）；
* active 类型 element 段中的偏移位置（*offset*）；
* active 类型 data 段中的偏移位置（*offset*）。

它们各自的使用方式可以参考以下代码：

```wat
(module
  (memory 1)
  (table 1 funcref)
  (data (offset (i32.const 0)) "\10")
  (elem (table 0) (i32.const 0) funcref (ref.null func))
  (global i32 (i32.const 10))
) 
```

### 动态链接（Dynamic Linking）

MVP 标准中定义的常量指令形式很少，该提案增加了若干可用于常量表达式的指令：`i32.add`、`i32.sub`、`i32.mul`，以及对应的 i64 指令。这些指令的使用方式和语义保持不变，只是它们所在的常量表达式可以在编译时被直接求值。

实际上，“Extended Constant Expressions” 提案的出现背景是为了更好地支持 Wasm 模块的动态链接（dynamic-linking）过程，目前这是一个实验性功能，ABI 并不稳定。这里我们不深入细节，举个简单的例子，假设被动态链接的模块内有多个地方引用了名为 foo 的变量，该变量被定义在这个模块内部。

由于需要动态链接，导致模块在真正被加载和实例化前，其并不知道模块内部的数据会被加载到整个程序内存段中的哪个位置。因此，在本提案出现之前，被动态链接的模块通常会使用如下代码，来进行本地变量的间接调用。即对本地变量 foo 的访问均间接通过访问名为 $foo_addr 的 global 变量完成，该 global 中存放有变量 foo 在内存中的实际地址。不仅如此，这种方式还保证了模块代码的 PIC 性质（不用对代码段进行重定位）。

```wat
(global $foo_addr (mut i32) (i32.const 0))
```

当模块被加载后，动态加载器（后简称 DL）会产生类似如下所示的启动代码，来完成对上述 $foo_addr 的重定位过程（可以简单理解为是对值进行修正）。

```wat
(func $relocate 
  (global.set $foo_addr 
    (i32.add (global.get $__memory_base) (i32.const C))
  )
)
```

其中，$__memory_base 是 DL 提供的 global，它描述了当前加载模块可以使用的线性内存起始偏移位置，也即模块数据段的实际加载位置。通过 `i32.add` 指令，DL 可以根据模块的实际内存加载位置来修正 $foo_addr 的值，其中常量值 C 为变量 foo 的值在模块数据段内的相对偏移位置。

启动代码的执行是在运行时完成的，因此会占用一定的计算资源。而一旦借助本提案提出的新常量指令，DL 便不再需要生成函数 $relocate，符号重定位过程可以直接内联到 $foo_addr 的代码中。如下所示：

```wat
(global $foo_addr (i32.add (global.get $__memory_base) (i32.const C)))
```

这样便可以简化动态链接过程，无需相关启动代码。且 $foo_addr 被声明为“不可变”也能够一定程度上保证代码健壮性。
