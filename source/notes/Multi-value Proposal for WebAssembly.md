---
title: Finished Proposal - Multi-value Extension
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/multi-value
date: 2021-05
---

\- ***提案内容***：

允许函数或指令在调用后向栈上返回多个值。

```wast
;; An example as below.
(func $swap (param i32 i32) (result i32 i32)
	(get_local 1) (get_local 0)
)
```

\- ***提案动机***：

* **函数多返回值**：
  * 允许直接返回 unboxed 的 *tuple* 或 *struct*；
  * 允许对多返回值进行高效地编译。
* **指令多返回值**：
  * 允许指令调用产生多个结果（如 *divmod*，返回“商”和“余数”）。
* **块结构接受输入参数**：
  * `loop` 标签可以接受参数；
  * 可接受输入的宏指令。

\- ***提案细节***：

> A structured instruction can consume input and produce output on the operand stack according to its annotated block type. It is given either as a type index that refers to a suitable function type, or as an optional value type inline, which is a shorthand for the function type []→[valtype?].
