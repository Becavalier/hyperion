---
title: WebAssembly - JavaScript BigInt to WebAssembly i64 Integration
intro: 今天来看的提案是 - “JavaScript BigInt to WebAssembly i64 Integration”。该提案支持了 JavaScript 中 BigInt 类型与 Wasm i64 类型的双向转换。
comments: true
date: 2023-11-02 11:32:00
tags:
- WebAssembly
---

今天来看的提案是 - “JavaScript BigInt to WebAssembly i64 Integration”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/JS-BigInt-integration)</b>。该提案支持了 JavaScript 中 BigInt 类型与 Wasm 环境的双向自动转换（bidirectionally-converting）。


提案内容比较简单，写个例子看一下：

```wat
(module
  (func (export "inc") (param $param i64) (result i64)
    (i64.add (local.get $param) (i64.const 1))
  )
)
```

没啥好讲的，JavaScript 宿主环境下的 BigInt 类型可以直接传递到形参为 i64 类型的 Wasm 函数中。相反，Wasm 代码返回的 i64 也自动转换为 JavaScript 的 BigInt 类型。

```javascript
WebAssembly.instantiate(wasmModule).then(
  (instance) => { 
    const { inc } = instance.exports;
    const result = inc(BigInt(9007199254740991))
    console.log(result);  // 9007199254740992n.
    console.log(typeof result);  // "bigint".
  });     
```
