---
title: WebAssembly 尝试研究报告（一）
intro: 自 WebAssembly 技术从 2016 年出现开始，便一直受到各方的关注。从宏观上来看，使用该技术我们可以通过把 Web 端的复杂运算逻辑放在 C/C++ 代码实现，并且通过 WebAssembly 提供的 JavaScript 接口来与 C/C++ 代码进行交互，进而达到提升 Web 应用运行性能的目的。该技术的 MVP 标准版本刚发布不久，与 DOM 操作相关功能特性的实现还有待后续标准的进一步完善。
comments: true
date: 2017-06-09 11:55:00
tags:
- WebAssembly
---

自 WebAssembly 技术从 2016 年出现开始，便一直受到各方的关注。从宏观上来看，使用该技术我们可以通过把 Web 端的复杂运算逻辑放在 C/C++ 代码实现，并且通过 WebAssembly 提供的 JavaScript 接口来与 C/C++ 代码进行交互，进而达到提升 Web 应用运行性能的目的。该技术的 MVP 标准版本刚发布不久，与 DOM 操作相关功能特性的实现还有待后续标准的进一步完善。

为了迎接 WebAssembly 的怀抱，Chrome 也决定不再支持 PNaCI，并开始全面支持 WebAssembly。毕竟 PNaCI 曾经受到了 Mozilla 的批评，公开指责其违背了“坚持开放和接受 Web 标准”的原则。现在 WebAssembly 已经成为了新的 Web 标准，旨在为了改进 JavaScript 的性能作出贡献。

#### 一、开发环境搭建：

1. 可以通过 WebAssembly 官方提供的[开发者文档](http://webassembly.org/getting-started/developers-guide/)来选择基于 **Emscripten** 工具链进行开发：
2. 可以通过 **[WasmFiddle](https://wasdk.github.io/WasmFiddle/)** 进行在线的实时开发、调试和运行；
3. 安装独立的 cmake、gcc、clang、llvm、s2wasm、wast2wasm 等编译器和相关环境；

#### 二、开发工具：

对于非线上的开发模式，Windows 平台需要安装 Visual Studio；Mac 平台需要安装 XCode。线上模式只需要一个文本编辑器即可。

#### 三、发展历史：

JavaScript 引擎的运行经历了遍历 AST、字节码解释器等“原始”阶段，由于需要将每条源代码“翻译”成相应的机器码再执行，同时引擎不会保存“翻译”后的机器码，使得解释执行的速度很慢。接下来 Google 发布了 V8 引擎，由于采用了 JIT 技术，在执行时可以将 JavaScript 代码编译成更高效的机器代码并将热代码保存，下次再次执行同一代码段时便无需再次编译，这使得 JavaScript 语言获得了几十倍的性能提升。但是由于 JS 本身的弱类型，导致引擎在解析同一段代码时会有不同的结果，因此大量的 CPU 资源被浪费在数据类型的判断上。微软开发的 TypeScript 采用了强类型的方式扩展了 JS 的语法特性，从语言层面解决了引擎在判断变量类型上的资源浪费问题。

我们不想去创造一门新的强类型语言来代替 JS，那么有没有办法把现有的静态强类型语言“翻译”到 JS 呢？最早的尝试可以追溯到 95 年的 NPAPI 项目，但更为人所知的应该当属 13 年发布的 ASM.js。ASM.js 是一种 JS 的中间语言，其本质也是基于 JS 的语法，只不过是被特别优化过的。我们可以通过 Emscripten 将 C/C++ 代码传入 LLVM，再将 LLVM 产生的字节码编译成 ASM.js 代码，由于 ASM.js 本身的优化机制限制，导致 ASM.js 本质上只能够处理和优化数值类型。所有的 ASM.js 代码都已经被高度优化，所有的变量类型明确，所有的外部数据都在堆中进行存储和优化，甚至可以直接将 ASM.js 编译成底层的汇编代码而不需要特殊的处理。

但这就可以了吗？看上去不错，通过 ASM.js 我们可以直接用 C/C++ 来编写高性能的 Web 应用，但其缺点也是明显的：编译后的 JS 文件过大，跨浏览器支持不佳等。WebAssembly 为了解决这个问题而诞生了。Wasm 不是一种新的编程语言，而是一种新的字节码格式，这个格式适合将 C/C++ 程序编译到 Web 上来运行，同时又满足了平台无关、高效、轻量等特性。Wasm 可以直接被 JS 引擎加载和执行，省去了从 JS 到 Bytecode，从 Bytecode 再到机器码的转换时间，因此十分高效。Wasm 的文本格式 Wast 包含了一个基于 “S 表达式”的 AST 描述文本，在这个文件中我们可以清楚的看到该 Wasm 模块的导出函数内存分配情况。WebAssembly 的二进制模块格式 Wasm 可以直接通过 JS 引擎提供的 WebAssembly 接口进行调用。

#### 四、编译流程：

从 C/C++ 编译到 JS 的流程都大致相同，如果开发流程基于 Em​scripten 工具链，整个编译环境的大致流程如下图所示（转载）：

![](1.png)

**emcc** 是 Emscripten 的编译器前端，其本身和 GCC 十分相似。emcc 使用 Clang 将 C/C++ 代码转换为 LLVM（源自于底层虚拟机 Low Level Virtual Machine）字节码，使用 Fastcomp（Emscripten 的编译器核心，一个 LLVM 后端）把字节码再编译成 JavaScript 并直接在浏览器中运行。无论是从 ASM.js 到 WebAssembly 二进制代码还是从 Wast 到 Wasm，都可以很方便的通过现有的工具链进行编译和转换。

#### 五、本地实验：

我们分别通过使用原生 JS 的排序方法和基于 C/C++ 实现的 Wasm 版本排序方法来对比两种实现的性能差别。

* **实验流程**：实验数据采用随机生成的含有 100 个随机数的数组，通过比较对该数组进行 1e6 次排序所花费的时间来比较两种方式的性能差异。
* **实验细节**：JS 采用 `Array.prototype.sort` 方法进行排序，Wasm 采用 C/C++ 实现的快排方法进行排序。

**1. JavaScript 端排序测试：**

 
 ```javascript
console.time("JS-Native");
for (let j = 0; j < 1000000; j++) {
  let arr = [];
  for (let i = 0; i < 100; i++) { 
    arr.push(Math.round(Math.random() * 100));
  }
  arr.sort((a, b) => {
    return a - b;
  });
}
console.timeEnd("JS-Native");
```

上述代码为 JS 侧的数组排序代码。下面给出的 C/C++ 数组排序代码我们采用快排的思路来编写。基于 WebAssembly 的开发主要分为两个部分：第一部分为 C/C++ 部分的主要业务处理逻辑，同时设置一些需要在 JS 层面调用的“预置接口”；第二部分是在 JS 层面进行 Wasm 模块的加载与实例化，同时需要进行填充内存数据、导入预置函数等操作。

**2. Wasm 端排序测试：**

 
```c
// 定义数组大小；
#define N 100

// 预置函数，暴露给 JS 进行处理；
void print(int* offset, int length);

int array[N];
// 返回数组在内存中的偏移地址；
int* getArrayOffset() {
  return array;
}

void swap (int *a, int *b) {  
  int temp;  

  temp = *a;  
  *a = *b;  
  *b = temp;  

  return;  
}  
// 快排实现；
void quicksort(int array[], int maxlen, int begin, int end) {  
  int i, j;  

  if (begin < end) {  
    i = begin + 1;
    j = end;      
        
    while (i < j) {  
      if(array[i] > array[begin]) {  
        swap(&array[i], &array[j]); 
        j--;  
      } else {  
        i++;   
      } 
    }  

    if (array[i] >= array[begin]) {  
      i--;  
    }  

    swap(&array[begin], &array[i]);  
      
    quicksort(array, maxlen, begin, i);  
    quicksort(array, maxlen, j, end);  
  }  
}  

void test () {
  quicksort(array, N, 0, N - 1);
  // print(array, N);
}
```

上面给出的 C/C++ 端的处理函数主要做了几件事情：

1. 暴露了一个方法外壳给 JS 来处理；
2. 提供一个函数用于获得数组在内存中的偏移地址；
3. 核心业务处理逻辑的函数；
4. 一个主函数用于在 JS 中调用；

接下来处理 JS 端的 Wasm 接口和数据的填充过程。

 
```javascript
// 将 JS 生成的数组数据填充到指定的内存中；
function importArrayToBuffer (memory, array, offset) {
  const importBuffer = new Uint32Array(memory.buffer, offset, array.lenth);
  for (let i = 0; i < array.length; i++) {
    importBuffer[i] = array[i];
  }
}

let memory;
// 通过浏览器提供的 WebAssembly 接口来加载一个 Wasm 模块；
WebAssembly.compile(wasmCode).then(module => WebAssembly.instantiate(module, {
  env: {
    // 填充预置函数的主体；
    print (offset, len) {
      let strBuffer = new Uint32Array(memory.buffer, offset, len);
      console.log(strBuffer);
    }
  }
})).then(instance => {
  let exports = instance.exports;
  memory = exports.memory;
  console.time("WASM");
  // 开始测试；
  for (let j = 0; j < 1000000; j++) {
    let arr = [];
    for (let i = 0; i < 100; i++) { 
      arr.push(Math.round(Math.random() * 100));
    }
    // console.log("[Generated Array] ", arr);
    // 填充数据到指定内存段；
    importArrayToBuffer(memory, arr, exports.getArrayOffset());
    // 调用 C/C++ 暴露的逻辑处理函数；
    exports.test();
  }
  console.timeEnd("WASM");
});
```


**3. JS 端快排测试：**

为了增强对照实验的准确性，我们又追加了纯 JS 实现的快排来作为第三种对照组实验。实验代码如下：

 
```javascript
// 快排实现； 
function quicksort(array, maxlen, begin, end) {  
  let i, j;  
  
  if (begin < end) {  
    i = begin + 1;
    j = end;      
        
    while (i < j){  
      if (array[i] > array[begin]) {  
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    
        j--;  
      } else {  
        i++;   
      } 
    }  

    if (array[i] >= array[begin]) {  
      i--;  
    }  
  
    let temp = array[begin];
    array[begin] = array[i];
    array[i] = temp;
      
    quicksort(array, maxlen, begin, i);  
    quicksort(array, maxlen, j, end);  
  }  
}  

function main () {
  console.time("JS-Quick");
  for (let j = 0; j < 1000000; j++) {
    let array = [];
    for (let i = 0; i < 100; i++) { 
      array.push(Math.round(Math.random() * 100));
    }
    quicksort(array, array.length, 0, array.length - 1);
  }
  console.timeEnd("JS-Quick");
}
```


在**一百万次**对随机生成的含有**100个数字**的数组进行排序所花费的时间：

* **JS-Native：** 11308.10498046875ms
* **WASM：** 7366.18310546875ms
* **JS-QUICK：** 38611.242919921875ms

WebAssembly 以十分明显的优势胜出。总的来看，从 JS 向固定的内存地址段进行数据填充的过程其实可以有很大的优化空间，比如将业务需要进行处理的数据一次性全部写入内存来代替分次的写入。C/C++ 方面可以对数据结构进行更加灵活的处理，比如在某些情况下使用“链表”等数据结构来大幅度改善程序的运行效率等。

为了更加精准的对 WASM 进行性能评估，我们又追加了不同数组大小的实验样本来作为参照，具体评估结果如下图所示（Mac OS, Chrome Version 58.0.3029.110 (64-bit)）：

![](2.png)
