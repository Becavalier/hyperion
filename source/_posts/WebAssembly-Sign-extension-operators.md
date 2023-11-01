---
title: WebAssembly - Sign-extension Operators
intro: 今天来看的提案是 - “Sign-extension Operators”。该提案设计了一组新的指令，用于支持整数类型的符号扩展。
comments: true
date: 2023-11-01 18:13:00
tags:
- WebAssembly
---


今天来看的提案是 - “Sign-extension Operators”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/sign-extension-ops/blob/master/proposals/sign-extension-ops/Overview.md)</b>。该提案设计了一组新的指令，用于支持整数类型的符号扩展。

提案内容比较简单，新增加的指令如下所示：

| Name    | Opcode | Desc |
| -------- | ------- | ------- |
| *i32.extend8_s*  | 0xc0   | 扩展一个有符号 8 位整数到 32 位整数 |
| *i32.extend16_s*  |	0xc1	 | 扩展一个有符号 16 位整数到 32 位整数  |
| *i64.extend8_s*  |	0xc2 | 扩展一个有符号 8 位整数到 64 位整数  |
| *i64.extend16_s*  |	0xc3  | 扩展一个有符号 16 位整数到 64 位整数 |
| *i64.extend32_s*  |	0xc4 	 | 扩展一个有符号 32 位整数到 64 位整数 |


这里需要注意指令 `i64.extend32_s` 和 `i64.extend_i32_s` 的区别：**前者的操作数是 i64 类型，而后者则为 i32 类型**。两个指令均对操作数进行符号扩展，但一个会改变操作数类型，另一个则不会。

<hr>

系列文章：

* <b>[WebAssembly - Import / Export Mutable Globals Proposal](/2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/)</b>.
* <b>[WebAssembly - Non-trapping Float-to-int Conversions](/2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/)</b>.
* <b>[WebAssembly - Sign-extension Operators](/2023/11/01/WebAssembly-Sign-extension-operators/)</b>.
* <b>[WebAssembly - Multi-value Extension](/2023/11/01/WebAssembly-Multi-value-Extension/)</b>.
