---
title: Finished Proposal - Reference Types
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/reference-types
date: 2021-06
---

\- ***提案内容***：

* 新的 `externref` 类型，可以被同时用作值类型，或者 *table* 元素类型；
* 允许 `funcref` 作为值类型（之前仅能作为 *table* 元素类型）；
* 新的有关 *table* 的指令：
  * `ref.null`：向栈中插入一个 *null* 值；
  * `ref.is_null`：检测给定操作数是否为 *null*；
  * `ref.func`：创建一个对给定函数的引用；
  * `table.get`：取出 *table* 某个单元的元素到栈上；
  * `table.set`：设置 *table* 某个单元中的元素；
  * `table.size`：获得当前 *table* 的大小并放到栈上；
  * `table.grow`：增长 *table* 大小；
  * `table.fill`：用给定值填充 *table* 的一段单元；
  * `table.init`：用给定 *element segment* 初始化某个 *table*；
  * `table.copy`：从某个 *table* 中拷贝内容到另一个 *table*。
* 其他更改：
  * `select` 指令增加了可选的“类型”操作数；
  * `call_indirect` 指令接受一个立即数作为 *table* 索引。
* 允许多 *table*。

\- ***提案动机***：

* 提供与宿主环境更简单和有效的互操作；
* 提供可在 Wasm 模块内部进行的与 *table* 的基本交互；
* 为后续提案（Exception Handling、GC）做铺垫。

\- ***提案细节***：

* 迄今为止，两种引用类型：`funcref`、`externref`，均可被作为值类型；
* 在所有的指令中，***table* 的索引可以被省略，且默认为 0**；
* 一个模块可以定义、导入，及导出多个 *table*；
* 浏览器宿主侧：
  * 所有的 JavaScript 值都可以借由 *externref* 类型传递给 Wasm 函数，或存储在 *global* 或 *table*；
  * 所有 Wasm 导出的函数对象或 *null* 都可以借由 *funcref* 传递给 Wasm 函数，或存储在 *global* 或 *table*。
