---
title: Finished Proposal - Sign-extension Operators
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/sign-extension-ops
date: 2021-05
---

\- ***提案内容***：

增加了如下几个用于有符号整数符号扩展的指令：

* `i32.extend8_s`：扩展一个有符号的 8 位整数至 32 位；
* `i32.extend16_s`：扩展一个有符号的 16 位整数至 32 位；
* `i64.extend8_s`：扩展一个有符号的 8 位整数至 64 位；
* `i64.extend16_s`：扩展一个有符号的 16 位整数至 64 位；
* `i64.extend32_s`：扩展一个有符号的 32 位整数至 64 位。
