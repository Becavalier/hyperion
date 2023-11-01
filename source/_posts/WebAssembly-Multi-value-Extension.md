---
title: WebAssembly - Multi-value Extension
intro: 今天来看的提案是 - “Multi-value Extension”。该提案对 MVP 中原有的函数类型，以及 block、loop、if 三种块结构的能力进行了扩展，使它们可以接收多个输入参数，或产生多个结果值。这增加了指令的灵活性，使其拥有更贴近高级语言特性的指令执行流。
comments: true
date: 2023-11-01 22:50:00
tags:
- WebAssembly
---


今天来看的提案是 - “Multi-value Extension”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/multi-value/blob/master/proposals/multi-value/Overview.md)</b>。该提案对 MVP 中原有的函数类型，以及 `block`、`loop`、`if` 三种块结构的能力进行了扩展，使它们可以接收多个输入参数，或产生多个结果值。这增加了指令的灵活性，使其拥有更贴近高级语言特性的指令执行流。来看下面这个例子：


```wat
(module
  (func (export "accumulate") (param $param i32) (result i32 i32)
    (local $var i32)
    (local.set $var (local.get $param))

    ;; Stack slot for storing accumulation result.
    (i32.const 0)  
    (loop $loop (param i32) (result i32)
      ;; Plus the i32 on the stack with the value of $var.
      (i32.add (local.get $var))  
      (local.tee $var (i32.sub (local.get $var) (i32.const 1)))
      (i32.gt_u (i32.const 0))
      br_if $loop
    )
    (local.get $param)
  )
)
```

这段 Wasm 代码中主要定义了名为 “accumulate” 的函数，该函数接收一个 i32 参数，并返回两个 i32 结果值。其中第一个结果值是由给定输入参数值经过阶加（也有人叫“阶和”）后得到的结果值（如输入参数 3，则计算 “3 + 2 + 1”，结果为 6）；第二个参数值为原方不动的输入参数，这里我们直接返回。

函数的实现逻辑很简单，其中需要注意的不同点是函数的返回值类型 “*(result i32 i32)*”，以及函数体中循环结构 loop 的参数和返回值部分 “*(param i32) (result i32)*”，新的 “Multi-value Extension” 提案可以使我们像这样来使用函数和各类块结构。不同于函数参数，块结构的输入参数不作为 local 使用，而是直接通过栈来传递，因此代码第 9 行 “*(i32.add (local.get $var))*” 我们只为 `i32.add` 指令提供了一个操作数，另一个操作数则直接从栈上获取，该值也即为 loop 结构的输入参数。


```javascript
WebAssembly.instantiate(wasmModule).then((instance) => { 
  const { accumulate } = instance.exports;
  console.log(accumulate(5));  // "[15, 5]".
}); 
```

模块的使用方式很简单，可以参考上述 JavaScript 代码。



<hr>

系列文章：

* <b>[WebAssembly - Import / Export Mutable Globals Proposal](/2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/)</b>.
* <b>[WebAssembly - Non-trapping Float-to-int Conversions](/2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/)</b>.
* <b>[WebAssembly - Sign-extension Operators](/2023/11/01/WebAssembly-Sign-extension-operators/)</b>.
* <b>[WebAssembly - Multi-value Extension](/2023/11/01/WebAssembly-Multi-value-Extension/)</b>.


