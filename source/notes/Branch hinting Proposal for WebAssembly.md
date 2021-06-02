---
title: Phase2 Proposal - Branch Hinting
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/branch-hinting
date: 2021-06
---

\- ***提案内容***：

* 新增了自定义 Section：**branchHints**；

\- ***提案动机***：

支持类似 `__builtin_expect` 的行为，可以在 Wasm 字节码中显式标注人工预测的程序行为，以优化编译时生成的机器码。

\- ***提案细节***：

* *branchHints section* 在模块中只能出现一次，且必须在 *code section* 之前；
* *branchHints section* 中包含了一簇 *function hint*，提供了对一簇函数的调用预测信息。
