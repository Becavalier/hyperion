---
title: WebAssembly - Tail Call Extension
intro: 本篇来看的提案是 - “Tail Call Extension”。尾递归优化（TCE）相信大家都很熟悉，这是一种常见的“递归转循环”优化，可以消除函数递归调用过程中产生的栈帧，以实现更快的计算过程。
comments: true
date: 2023-11-06 19:14:00
tags:
- WebAssembly
---

本篇来看的提案是 - “Tail Call Extension”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/tail-call/blob/main/proposals/tail-call/Overview.md)</b>。尾调用优化（TCE）相信大家都很熟悉，这是一种常见的“递归转跳转”优化，可以消除函数递归调用过程中产生的栈帧，以实现更快的计算过程。MVP 标准中的函数调用指令 `call` 与 `call_indirect` 显式地禁止了函数的尾递归调用，而本提案则新增了对应的指令 `return_call` 与 `return_call_indirect` 专用于进行函数的尾递归调用。

顾名思义，“尾调用”是指一类特殊的函数调用语句，**这类语句必须作为当前函数返回点前的最后一条语句**（否则栈帧之间会有数据和指令依赖），编译器可以优化符合该特征的函数调用，不生成调用栈帧，并改用跳转指令直接将执行流转移至目标函数内部。尾调用优化可以提升符合条件的递归函数的执行效率，优化掉的栈帧创建过程可以节省大量栈内存与 CPU 周期。

来看下面这个例子，比如有这样一段符合 TCE 要求的 C 代码：

```c
unsigned fib_rec(unsigned n, unsigned a, unsigned b) {
  if (n == 0) return a;
  return fib_rec(n - 1, b, a + b);
}
unsigned fib(unsigned n) {
  return fib_rec(n, 0, 1);
}
```

这段代码中的函数 fib 返回 fibonacci 数列中位于给定无符号整数 n 位置上的值，fib 在实现中调用了递归函数 fib_rec 以完成主要的计算逻辑。借助新的 “Tail Call Extension” 提案，我们可以得到与它完全对应的 Wasm（WAT）代码：

```wat
(module
  (func $fib_rec (param $n i32) (param $a i32) (param $b i32) (result i32)
    (if (i32.eqz (local.get $n))
      (then (return (local.get $a)))
      (else
        (return_call $fib_rec  ;; !!! TCE !!!
          (i32.sub (local.get $n) (i32.const 1))
          (local.get $b)
          (i32.add (local.get $a) (local.get $b))
        )
      )
    )
    (i32.const 0)  ;; Unreachable, suppress the potential uncomplete implicit return check.
  )
  (func (export "fib") (param i32) (result i32)
    (call $fib_rec (local.get 0) (i32.const 0) (i32.const 1))
  )
)   
```

这里我们使用指令 `return_call` 来完成函数的 fib_rec 的尾递归优化调用。需要注意的是，TCE 不仅可以用于 “self-recursion” 的情况，也可以用于 ”mutual-recursion“，即两个不同函数之间的递归调用。
