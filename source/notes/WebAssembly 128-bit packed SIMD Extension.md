---
title: Phase4 Proposal - 128-bit packed SIMD Extension
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/simd
date: 2021-06
---

\- ***提案内容***：

* 新的值类型：`v128`；
* 新的立即数操作数类型：
  * *ImmByte*：一个单一的无限制字节；
  * *ImmLaneIdx2*：在一个字节中，用 2 位表示一个值；
  * *ImmLaneIdx4*：在一个字节中，用 4 位表示一个值；
  * *ImmLaneIdx8*：在一个字节中，用 8 位表示一个值；
  * *ImmLaneIdx16*：在一个字节中，用 16 位表示一个值；
  * *ImmLaneIdx32*：在一个字节中，用 32 位表示一个值。
* 相关 SIMD 指令。

\- ***提案动机***：

* 引入可映射到硬件中常用 SIMD 指令的 Wasm 操作；
* 该提案包含了可移植的 SIMD 操作子集，在大多数情况下可直接映射到硬件的对应指令。

\- ***提案细节***：

* `v128` 类型对应到常见 ISA 的向量寄存器；
* 浏览器侧：从 JavaScript 访问包含 SIMD 类型的 Wasm 模块导入或导出内容将导致异常（TypeError）；
* Lane 解释：
  * *i8x16*：16 个 i8；
  * *i16x8*：8 个 i16；
  * *i32x4*：4 个 i32；
  * *i64x2*：2 个 i64；
  * *f32x4*：4 个 f32；
  * *i64x2*：2 个 f64。
* 浮点数操作均“向偶数取整”。
