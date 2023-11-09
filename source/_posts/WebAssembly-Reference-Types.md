---
title: WebAssembly - Reference Types
intro: 今天来看的提案是 - “Reference Types”。从标准上看，该提案主要新增了一种类型 externref，可用于在 Wasm 模块内引用宿主环境中的“不透明（opaque）”值类型，该类型既可作为普通的值类型，也可作为 WebAssembly Table（后简称 “table”）的元素类型。除此之外，提案还补充了用于操作 table 的更多指令，同时支持了多重 table。
comments: true
date: 2023-11-02 21:14:00
tags:
- WebAssembly
---


今天来看的提案是 - “Reference Types”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/reference-types/blob/master/proposals/reference-types/Overview.md#reference-types-for-webassembly)</b>。从标准上看，该提案主要新增了一种类型 `externref`，可用于在 Wasm 模块内引用宿主环境中的“不透明（opaque）”值类型，该类型既可作为普通的值类型，也可作为 WebAssembly Table（后简称 “table”）的元素类型。除此之外，提案还补充了用于操作 table 的更多指令，同时支持了多重 table。

### externref

`externref` 可用于在 Wasm 上下文中引用宿主环境内的“不透明”值类型，这里提到的“不透明”，你可以简单理解为该类型的值仅能够由宿主环境来正确解释，Wasm 运行时只保持对该值的引用，但不做实际解释。借助这种方式，我们第一个能够想到的在 MVP 标准下无法实现的场景，便是通过 `externref` 来引用宿主环境中的 DOM 元素。这样我们便能够间接地在 Wasm 中“操作”（实际上只是引用）DOM 元素了。比如下面这个例子：

```wat
(module
  (import "env" "createSpan" (func $createSpan (result externref)))
  (import "env" "setInnerNumber" (func $setInnerNumber (param externref i32) (result externref)))
  (func (export "spanFactory") (param $param i32) (result externref)
    (call $createSpan)
    (local.get $param)
    (call $setInnerNumber)
  )
) 
```

由于 Wasm 环境无法对来自宿主的不透明值直接进行解释，因此对这类值的所有操作都需要宿主环境间接完成。在这个例子中，Wasm 模块的导出函数 “spanFactory” 承担了工厂函数的职责，它接收给定的一个 i32 参数，然后在导入的宿主函数 “createSpan” 和 “setInnerNumber” 的帮助下，它可以创建一个 span 类型的 DOM 元素，并将其内联文本设置为给定的 i32 值，最后再将该元素返回。在上述 WAT 代码中可以看到，所有需要 DOM 元素传入传出的地方，都被标记为了 `externref` 类型。

```javascript
const createSpan = () => {
  return document.createElement('span');
};
const setInnerNumber = (el, val) => {
  el.innerHTML = val;
  return el;
}

WebAssembly.instantiate(wasmModule, {
  env: {
    setInnerNumber, createSpan
  }
}).then((instance) => {  
  const { spanFactory } = instance.exports;
  document.body.appendChild(spanFactory(100)) 
}); 
```

Wasm 模块在实例化时需要由宿主环境提供 JavaScript 版本的函数 “createSpan” 和 “setInnerNumber”。使用方法参考上面给出的 JavaScript 代码，这里不再赘述。根据提案描述，所有 JavaScript 环境下的值都可以使用 `externref` 来引用。

> Any JS value can be passed as externref to a Wasm function, stored in a global, or in a table.

### funcref

除了新增加的 `externref` 类型，提案还放宽了标准中原有的 `funcref` 类型的使用场景。`funcref` 最开始仅用于标记 table 的元素类型，而该提案使得它也可以被作为正常的值类型使用（可用于 local，global，函数参数和返回值）。为了支持这一特性，提案又补全了相关的指令和使用方式。比如：

```wat
(module
  (import "env" "foo" (func $foo (param i32)))
  (table $table 10 funcref)
  (global funcref (ref.func $foo))  ;; Define a global of type "funcref".
  (func $indrectCall
    (table.set $table (i32.const 0) (global.get 0))	
    (table.size $table)  ;; Get table size.
    (call_indirect $table (param i32) (i32.const 0))  ;; Call into table.
  )
  (start $indrectCall)
)
```

在这段 WAT 代码中，你可以看到一些新指令，比如 `table.set`、`table.size`、`ref.func`。这些指令都是为了在 Wasm 代码中更方便地使用 `funcref` 和 `externref` 类型而加入的。table 相关指令可用于获得指定 table 相关的信息，以及操作其内部的元素数据（如填充、拷贝等）。`ref.func` 用于获取某个 Wasm 函数的引用，需要注意的是本提案并不支持直接从宿主环境导入函数引用，比如直接用宿主环境的函数作为 <i>(func (export "foo") (param funcref)))</i> 的参数。而所有函数引用都需要通过 `ref.func` 指令来获取。


```javascript
WebAssembly.instantiate(wasmModule, { 
  env: { 
    foo: e => {
      console.log(e);  // 10.
    }
  }
});                 
```

对应的 JavaScript 代码如上所示。

### Recap: Table

`funcref` 只能通过 table 间接调用这种方式实际上是为了保持与 MVP 标准行为的一致。如果你还记得，Wasm 最初引入 table 是为了支持高级语言中的函数指针。比如下面这段 C 代码：

```c
int foo(int (*fn_ptr)(int, int)) {
  return fn_ptr(1, 2);
}
```

在编译后通常会得到如下所示的 WAT。这里原 C 代码中函数指针的调用过程变成了通过 “table slot” 的间接调用过程。而 `funcref` 的行为则保持了同 `anyfunc` 类型完全一样的特点。在本提案提出之前，这两者实际上是一个东西，而 `anyfunc` 类型目前已被废弃，不再使用。

```wat
(table 3 3 anyfunc)
(elem (i32.const 0) $__wasm_nullptr $add $minus)
;; ...
(func $foo (; 2 ;) (param $0 i32) (result i32)
  (call_indirect (type $FUNCSIG$iii)
   (i32.const 1)
   (i32.const 2)
   (get_local $0)  ;; Dynamic dispatch through table index.
  )
 )
```


### ref.null 与 ref.is_null

最后来看另外两个简单的指令 `ref.null` 与 `ref.is_null`。其中前者用来表示值为 null 的引用，而后者则用来检测给定的引用值是否为 null。看下面这个例子：

```wat
(module
  (func $bar)
  (global externref (ref.null extern))
  (global funcref (ref.func $bar))
  (func (export "foo") (result i32 i32)
    (ref.is_null (global.get 0))
    (ref.is_null (global.get 1))
  )
)
```

JavaScript 代码如下。

```javascript
WebAssembly.instantiate(wasmModule).then((instance) => {  
  const { foo } = instance.exports; 
  console.log(foo());  // "[1, 0]".
});    
```

“Reference Types” 提案为 Wasm GC 打下了很好的基础，基于引用计数的 GC 实现完全依赖于堆对象引用的正确实现。
