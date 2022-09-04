---
title: WebAssembly 尝试研究报告 - 错误处理
intro: 前三篇报告分别从代码实践、底层基本原理等方面浅显地讨论了 WebAssembly 的相关特性。从本篇报告开始，我们将正式从 W3C 的标准 Web API 开始入手，深入细节来了解关于 WebAssembly 的更多特性。（由于当前标准变化较快，本文所叙述的内容不一定在未来仍然适用）。
comments: false
date: 2017-06-13 23:41:10
tags:
- WebAssembly
---

前三篇报告分别从代码实践、底层基本原理等方面浅显地讨论了 WebAssembly 的相关特性。从本篇报告开始，我们将正式从 W3C 的标准 Web API 开始入手，深入细节来了解关于 WebAssembly 的更多特性。（由于当前标准变化较快，本文所叙述的内容不一定在未来仍然适用）。

WebAssembly 在其浏览器的 JavaScript API 中规定了三种错误类型：

 
```javascript
WebAssembly.CompileError // 表示 WebAssembly 在解码或验证期间发生的错误；
WebAssembly.LinkError    // 表示 WebAssembly 在模块实例化时发生的错误；
WebAssembly.RuntimeError // 表示 WebAssembly 模块本身抛出的一个错误；
```

上述三种类型的错误可以发生在 WebAssembly 模块的加载，实例化和代码执行过程中。接下来我们将手动的在 C/C++ 代码中创建一个 Runtime Trap，并在 WebAssembly 运行时触发该异常，最后在 JS 层面将该异常捕获。为了实验的方便性，我们直接采用 WasmFiddle 来编译执行我们的代码。

 
```c
int division(int a, int b) { 
  return a / b;
}
```

C/C++ 部分的代码很简单，我们用最常见的“用 0 作除数”这个运行时异常来进行测试。在 C 代码中我们声明了一个 `division` 函数，预留的两个参数用来在 JS 层去填充除数和被除数。

 
```javascript
try {
  var wasmModule = new WebAssembly.Module(wasmCode);
  var wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);
  wasmInstance.exports.division(0, 0);
} catch(e) {
  console.log(e instanceof WebAssembly.RuntimeError);  // true；
  console.log(e.message);                              // "divide by zero"；
  console.log(e.name);                                 // "RuntimeError"；
  console.log(e.fileName);                             // undefined；
  console.log(e.lineNumber);                           // undefined；
  console.log(e.columnNumber);                         // undefined；
  console.log(e.stack);                                // undefined；
  console.dir(e);
}
```

在 JS 层面，我们进行 WebAssembly 模块的加载和初始化，通过实例化导出 `division` 方法，并传入参数进行方法调用。整个 WebAssembly 模块的加载和实例化以及函数执行的过程我们用一个 `try...catch` 将其进行包裹。在异常处理部分我们打印出捕捉到异常对象的一些信息。

最后经过实验发现，在最新的 Chrome(Version 59.0.3071.86 (Official Build) (64-bit)) 中并没有完全实现 WebAssembly Error 对象的全部属性。在这些属性中，**fileName**、**lineNumber**、**columnNumber** 以及 **stack** 都还没有完全的实现标准化。这三种类型的 WebAssembly 错误对应的 JS 错误对象都包含相同的构造函数和属性。比如，`WebAssembly.RuntimeError` 的构造函数如下所示，其中的第二和第三个参数同样还没有被标准化。

 
```javascript
new WebAssembly.RuntimeError(message, fileName, lineNumber);
```

每当 WebAssembly 模块抛出一个异常时，由于当前的 WebAssembly 模块暂时还无法自己处理该异常，因此该异常会被传播到最近的非 WebAssembly 模块调用者（这里指浏览器或 JS）身上，最后在 JS 层面被处理。如果 WebAssembly 模块通过 `import` 虚拟指令在其内部调用了一个 JS 函数，而该函数出现了异常，则该异常同样会通过 WebAssembly 激活并被传递到最近的非 WebAssembly 模块调用者身上。
