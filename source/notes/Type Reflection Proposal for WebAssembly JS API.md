---
title: Phase2 Proposal - Type Reflection
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/js-types
date: 2021-06
---

\- ***提案内容***：

* 定义了 Wasm 类型在 JavaScript 中的对象类型；
* 扩展的 API 可用于通过 JavaScript 获取底层 Wasm 对象的类型信息；
* 引入了 `WebAssembly.Function` 对象（继承自 Function），用于表示 Wasm 模块的导出函数。

\- ***提案动机***：

支持通过 JavaScript 查询 Wasm 对象的类型信息。
