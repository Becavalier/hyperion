---
title: WebAssembly - 128-bit Packed SIMD Extension
intro: 今天来看的提案是 - “128-bit Packed SIMD Extension”。Wasm 在设计之初的一个重要目标就是提供 “near native” 的指令执行效率，而该提案则通过提供一组通用 Wasm SIMD 指令集，使得 Wasm 可以直接利用现代处理器上的硬件 SIMD 指令来执行更高效的并行算数运算。该能力被广泛应用于多媒体和游戏等领域。
comments: true
date: 2023-11-04 19:42:00
tags:
- WebAssembly
---

今天来看的提案是 - “128-bit Packed SIMD Extension”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/simd/blob/main/proposals/simd/SIMD.md)</b>。Wasm 在设计之初的一个重要目标就是提供 “near native” 的指令执行效率，而该提案则通过提供一组通用 Wasm SIMD 指令集，使得 Wasm 可以直接利用现代处理器上的硬件 SIMD 指令来执行更高效的并行算数运算。该能力被广泛应用于多媒体和游戏等领域。该提案的前身是由 TC39 维护的 SIMD.js 提案，目前其已经从 TC39 提案流程中移除，完全转移至 Wasm WG 维护。

该提案新增了一种值类型 `v128`，该类型表示一个 128 位的值，该值可以被直接存放到硬件 ISA 中的向量寄存器（比如 x86-64 下的 XMM\YMM 寄存器）。配合不同的 SIMD 指令，它可以被解释为多种不同的 “packed” 数据，比如：4 个 32 位的浮点数值；8 个 16 位的有符号整数值，等等。提案一共支持 6 种解释模式：<i>i8x16</i>, <i>i16x8</i>, <i>i32x4</i>, <i>i64x2</i>, <i>f32x4</i>, <i>f64x2</i>。在 Wasm 中声明 `v128` 常量时，我们需要指定某一具体的位解释模式。来看一个简单的例子：

```wat
(module
  (memory 1)
  (func (export "foo") (param i32 i32 i32 i32) (result i32 i32 i32 i32)
    (i32.store (i32.const 0) (local.get 0))  ;; Memory offset (byte).
    (i32.store (i32.const 4) (local.get 1))
    (i32.store (i32.const 8) (local.get 2))
    (i32.store (i32.const 12) (local.get 3))
    (i32.const 0)  
    (i32x4.neg (v128.load (i32.const 0)))  ;; Load and construct a v128 with the values in memory.
    (v128.store)
    (v128.load (i32.const 0))
    (i32x4.extract_lane 0)
    (v128.load (i32.const 0)) 
    (i32x4.extract_lane 1)
    (v128.load (i32.const 0))
    (i32x4.extract_lane 2)
    (v128.load (i32.const 0))
    (i32x4.extract_lane 3)
  )
) 
```

由于提案并不支持直接使用含有 scalar 类型值（i32、i64、f32、f64）的 local 或 global 来构建 `v128`，因此我们需要先将这些数据连续存放到线性内存段中，然后再通过 `v128.load` 指令构建 `v128` 数据，这正如我们在代码第 4~9 行所做的那样。在代码第 9 行我们构建好 `v128` 数据后，指令 `i32x4.neg` 将该向量中的 i32 值全部进行取反。紧接着再将得到的结果向量值更新到内存的原位置。代码的最后 8 行，我们将这个更新后的 `v128` 数据加载到栈上，然后再使用指令 `i32x4.extract_lane` 依次提取其中每个 lane 内部的 i32 值，最后批量返回给宿主环境。

```javascript
WebAssembly.instantiate(wasmModule).then((instance) => { 
  const { foo } = instance.exports;
  console.log(foo(1, 2, 3, 4)); // "-1,-2,-3,-4".
});                  
```

在 JavaScript 环境中调用函数 “foo” 后，我们可以得到输入参数取反后的结果。


### 注意事项

* 提案支持在 JavaScript API 中创建类型为 `v128` 的 global 对象，但在 Chrome 等部分浏览器中，该行为会导致 “TypeError”。

