---
title: WebAssembly 尝试研究报告（二）
intro: 在上一篇报告中，我们尝试通过对比 JS 侧的原生排序方法和 Wasm 端使用 C/C++ 编写的排序方法两者对同一大小数组的排序结果，让我们对 Wasm 应用的运行效率有了一个初步的认识。为了进一步优化 Wasm 的排序方法，接下来我们将优化递归版本的快排，并且尝试通过 Emscripten 在本地编译我们的代码。
comments: true
date: 2017-06-10 12:30:35
tags:
- WebAssembly
---

在上一篇报告中，我们尝试通过对比 JS 侧的原生排序方法和 Wasm 端使用 C/C++ 编写的排序方法两者对同一大小数组的排序结果，让我们对 Wasm 应用的运行效率有了一个初步的认识。为了进一步优化 Wasm 的排序方法，接下来我们将优化递归版本的快排，并且尝试通过 Emscripten 在本地编译我们的代码。

非递归版快排的具体原理这里我们不细讲。为了实现非递归版快排，我们需要使用一个“栈”来作为数据的中转容器。这里先上 C/C++ 部分的代码实现：

 
```c
#include <emscripten/emscripten.h>
#include <stack>

// 定义数组大小；
#define N 100

// 防止 C++ 函数名被 Mangling；
#ifdef __cplusplus
extern "C" {
#endif
    // 预置函数，暴露给 JS 进行处理；
    extern void printStr(char* offset, int length);
    extern void printInt(int number);
    extern void printArr(int* offset, int length);

    int array[N];
    // 返回数组在内存中的偏移地址；
    int* EMSCRIPTEN_KEEPALIVE getArrayOffset() {
        return array;
    }

    void push2(std::stack<int> &stack, int left, int right) {
        stack.push(right);
        stack.push(left);
    }

    void quicksort(int sortArray[], int leftPart, int rightPart) {
        std::stack<int> stack;
        push2(stack, leftPart, rightPart);
        int lwalker, rwalker, mid;

        while (!stack.empty()) {
            int left = stack.top(); stack.pop();
            int right = stack.top(); stack.pop();
            lwalker = left;
            rwalker = right;
            mid = sortArray[(lwalker + rwalker) / 2];

            while (lwalker < rwalker) {
                while(sortArray[lwalker] < mid) lwalker++;
                while(sortArray[rwalker] > mid) rwalker--;

                if (lwalker <= rwalker) {
                    int tmp = sortArray[lwalker];
                    sortArray[lwalker] = sortArray[rwalker];
                    sortArray[rwalker] = tmp;
                    lwalker++;
                    rwalker--;
                }
            }

            if (lwalker < right) push2(stack, lwalker, right);
            if (rwalker > left) push2(stack, left, rwalker);
        }
    }

    void EMSCRIPTEN_KEEPALIVE sort() {
        quicksort(array, 0, N - 1);
        // printArr(array, N);
    }

    void EMSCRIPTEN_KEEPALIVE test_printInt() {
        printInt(N);
    }

    void EMSCRIPTEN_KEEPALIVE test_printStr() {
        char str[] = "test_printStr";
        printStr(str, 13);
    }
#ifdef __cplusplus
}
#endif
```

跟直接使用 WasmFiddle 不同，使用 Emscripten 来编译 C++ 到 Wasm 需要配合 Emscripten 对编译器的特殊优化和对应的宏来使用。为了实现非递归版本的快排算法，我们在这里使用了 C++ STL 库中提供的 `<stack>` 来作为栈容器。代码中的 `EMSCRIPTEN_KEEPALIVE` 宏用来强制编译器前端不对该方法使用 DCE，以防止代码在编译期间被清除。由于我们采用了 C++ 来编写此次实验的源码，因此在主体函数部分加上了 `extern "C" ` 防止 Mangling 带来的生成函数名不一致问题。

由于现在的 Emscripten 还不支持 Standalone 版本的 WebAssembly，因此我们无法像之前一样使用浏览器提供的原生 Wasm API。前端部分的 JS 代码主要包含两个文件分别对应两个主要功能：

1. 加载 Wasm 模块，并解析成字节码用于 Emscripten 前端全局的 Module 对象进行模块加载与实例化；
2. 初始化一个 JS-Library，用于为 C++ 内的预置函数提供外部的函数实现；

其中页面部分的代码如下所示：

 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>

<script>
  // 初始化全局 Module，Emscripten 会自动为我们初始化；
  var Module = {};

  fetch("program.wasm").then(response => response.arrayBuffer()).then((bytes) => {
    // 填充主要数据；
    Module.wasmBinary = bytes;
    // 异步载入初始化脚本（该脚本文件是编译后自动生成的）；
    var script = document.createElement("script");
    script.src = "program.js";
    document.body.appendChild(script);
  });

  window.onload = function() {
    // Module.ccall("test_printInt");
    // Module.ccall("test_printStr");
    // 获取数组偏移地址；
    var arrayOffset = Module.ccall("getArrayOffset", "number");

    console.time("WASM-NO-RECURSION");
    var arr = [];
    for (var j = 0; j < 1000000; j++) {
      for (var i = 0; i < 100; i++) {
        var number = Math.round(Math.random() * 100);
        // arr.push(number); 
        // 在对应内存地址填充数据；
        Module.setValue(arrayOffset + 4 * i, number, "i32");
      }
      /*
      console.log(arr);
      for (var i = 0; i < 100; i++) {
        console.log(Module.getValue(arrayOffset + 4 * i, "i32"));
      }
      */
      // 调用排序函数；
      Module.ccall("sort");
    }
    console.timeEnd("WASM-NO-RECURSION");
  }
</script>
</body>
</html>
```

相对于之前使用浏览器提供的原生 Wasm API，这里我们需要使用 Emscripten 提供的 Module 全局对象上的方法来实现 C++ 函数的调用过程。同样的，对于指针的传递和内存数据的填充也是如此。下面给出 JS-Library 的代码，JS-Library 的代码需要单独放在一个 JS 文件里，文件名会在编译阶段以参数的形式传递给编译器。

 
```javascript
mergeInto(LibraryManager.library, {
  printStr: function(offset, length) {
    var str = "";
    var arr = [];
    for (var i = 0; i < length; i++) {
      arr.push(Module.getValue(offset + i, "i8"));
    }
    console.log(new TextDecoder().decode(new Uint8Array(arr)));
  },
  printArr: function(offset, length) {
    var str = "";
    var arr = [];
    for (var i = 0; i < length; i++) {
      arr.push(Module.getValue(offset + 4 * i, "i32"));
    }
    console.log(arr);
  },
  printInt: function (int) {
    console.log(int);
  }
});
```

这里需要注意在 `Module.getValue` 方法中需要指定的偏移为当前填充内存指针的偏移，需要根据填充的数据类型来决定偏移的单位大小（比如 int 类型一般为 4bytes，double 一般为 8bytes 等）。同时需要在最后一个参数中指定读取或者存储数据的长度，指针的偏移需要与数据长度匹配。

在所有代码编写完毕之后，使用以下命令来编译代码：

 
```bash
emcc -s WASM=1 -O3 -o program.js program.cpp --js-library library.js
```

这里需要注意加入 `WASM=1` 参数来确保最后生成的代码是基于 Wasm 而不是 ASM.js 的。-03 代表编译器的优化程度，如果不使用该参数会导致 Wasm 在浏览器中运行时出现内存溢出的问题，原因暂时未知。

在编译完成后 Emscripten 会自动生成一个 JS 文件和一个 Wasm 文件，JS 文件会自动初始化全局 Module，我们需要做的只是在初始化前获得 Wasm 的字节码并填充给 Module 对象，然后 Emscripten 会帮我们完成后续的加载工作。

最后的测试结果，相比之前文章给出的实验数据并没有提高，反而效率更低、速度更慢了，具体原因还有待研究。Emscripten 工具链提供的功能远不止这么多，各种灵活的编译器参数和方法还需要进一步的实践和探索。

BTW：这里主要使用了 BrowserSync 来作为本地服务器进行测试。可以直接通过 NPM 进行安装，开箱即用。
