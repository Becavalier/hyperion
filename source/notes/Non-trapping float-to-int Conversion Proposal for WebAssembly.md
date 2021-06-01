---
title: Finished Proposal - Non-trapping float-to-int Conversion
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/nontrapping-float-to-int-conversions
date: 2021-05
---

\- ***提案内容***：

增加了如下几个用于浮点数到整数转换的指令：

* `i32.trunc_sat_f32_s`：f32 -> Signed i32 的转换（Saturating）；
* `i32.trunc_sat_f32_u`：f32 -> Unsigned i32 的转换（Saturating）；
* `i32.trunc_sat_f64_s`：f64 -> Signed i32 的转换（Saturating）；
* `i32.trunc_sat_f64_u`：f64 -> Unsigned i32 的转换（Saturating）；
* `i64.trunc_sat_f32_s`：f32 -> Signed i64 的转换（Saturating）；
* `i64.trunc_sat_f32_u`：f32 -> Unsigned i64 的转换（Saturating）；
* `i64.trunc_sat_f64_s`：f64 -> Signed i64 的转换（Saturating）；
* `i64.trunc_sat_f64_u`：f64 -> Unsigned i64 的转换（Saturating）。

\- ***提案动机***：

* LLVM 的浮点数到整数转换会有一个未定义的结果，而非 UB；
* 为 SIMD 提案提供可使用的 non-trapping 类型的浮点到整数转换指令。

\- ***提案细节***：

* 上述指令的 OpCode 以 “**0xfc**”（misc）作为前缀；
* 相较于非 “\_sat\_” 类型的指令，**上述指令在上下溢出时不会发生 trapping，相反会返回对应边界的最大值和最小值**（Saturating）；
* 当计算结果为 NaN 时，返回 0。
