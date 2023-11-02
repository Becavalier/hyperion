---
title: WebAssembly - Non-trapping Float-to-int Conversions
intro: 今天来看的提案是 - “Non-trapping Float-to-int Conversions”。该提案设计了一组新的指令，用于支持浮点数到整数的 saturating 转换，这些指令不会导致 trap（可以理解为软中断，常用于处理运行时异常）。
comments: true
date: 2023-11-01 17:18:00
tags:
- WebAssembly
---


今天来看的提案是 - “Non-trapping Float-to-int Conversions”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/nontrapping-float-to-int-conversions/blob/main/proposals/nontrapping-float-to-int-conversion/Overview.md)</b>。该提案设计了一组新的指令，用于支持浮点数到整数的 saturating 转换，这些指令不会导致 trap（可以理解为软中断，常用于处理运行时异常）。

早期 MVP 标准中并没有专门用于进行 saturating 转换的指令，浮点数到整数转换指令（如：*i32.trunc_f32_s*）在发生溢出时会产生 trap。这个行为不符合 LLVM 的“浮点数环境”要求，即：“<i>The default LLVM floating-point environment assumes that floating-point instructions do not have side effects</i>”。因此，在某些特殊情况下，LLVM 的 “cfg-simplification” 优化会产生 “unconditionalized” 的 IR 代码。而当分支语句被同时求值，比如 `if` 语句真假两个分支里的语句被同时求值（实际上是一种 “speculative execution”？），若其中某个会产生副作用（比如 trap），便会导致源代码在编译前后的表现不一致。

不仅如此，LLVM 的浮点数到整数转换指令 “fptoui”（描述如下）在某些情况下会产生未定义结果，这也导致了程序运行结果的不确定性。

> The ‘fptoui’ instruction converts its floating-point operand into the nearest (rounding towards zero) unsigned integer value. If the value cannot fit in ty2, the result is a poison value.

另外，该提案也用于支持 SIMD 特性，提供表现一致的 saturating 转换操作。关于新增加的指令，可以参考下表：

| Name    | Opcode |
| -------- | ------- |
| *i32.trunc_sat_f32_s*  | 0xfc 0x00   |
| *i32.trunc_sat_f32_u*  |	0xfc 0x01	 |
| *i32.trunc_sat_f64_s*  |	0xfc 0x02
| *i32.trunc_sat_f64_u*  |	0xfc 0x03 |
| *i64.trunc_sat_f32_s*  |	0xfc 0x04	 |
| *i64.trunc_sat_f32_u*  |	0xfc 0x05	|
| *i64.trunc_sat_f64_s*  |	0xfc 0x06 |
| *i64.trunc_sat_f64_u*  |	0xfc 0x07| 

指令语义同对应的 “trunc_” 指令一致，除了以下几种情况：

* 当转换发生上溢出和下溢出时，返回对应整型的最大值和最小值，而不产生 trap（saturating）；
* 当转换值为 `NaN` 时，返回 0，而不产生 trap。

<hr>

系列文章：

* [WebAssembly - Import / Export Mutable Globals Proposal](/2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/).
* [WebAssembly - Non-trapping Float-to-int Conversions](/2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/).
* [WebAssembly - Sign-extension Operators](/2023/11/01/WebAssembly-Sign-extension-operators/).
* [WebAssembly - Multi-value Extension](/2023/11/01/WebAssembly-Multi-value-Extension/).
