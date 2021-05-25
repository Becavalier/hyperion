---
title: 浅谈前端 JavaScript 代码保护
intro: 本文主要介绍了可用于前端 JavaScript 代码保护的相关方案。这里所谓的“代码保护”其实可以被进一步理解为「如何在外部环境中尽量降低明文 JavaScript 代码的可读性，以让代码的执行细节成为黑盒？」这样一来，我们所提到的“代码保护”便可在某一程度上实现。
comments: true
date: 2019-04-10 16:58:34
tags:
- 代码保护
- JavaScript
---

本文主要介绍了可用于前端 JavaScript 代码保护的相关方案。这里所谓的“代码保护”其实可以被进一步理解为「**如何在外部环境中尽量降低明文 JavaScript 代码的可读性，以让代码的执行细节成为黑盒？**」这样一来，我们所提到的“代码保护”便可在某一程度上实现。

总的来看，这些方法不外乎以下几种：

## 代码混淆（Code Obfuscation）

第一种可以直接想到的方式便是使用“**代码混淆**”（由于两者一般同时进行，因此这里不特意区分“压缩”与“混淆”）。大多数最基本的代码混淆工具都可以压缩原始 ASCII 明文代码的体积，并将其中的诸如：变量名、函数名等，使用简短且毫无意义的标识符进行替换。以我们最常用的 “*Uglify*” 和 “*GCC* (Google Closure Compiler)” 为例，比如有下面这样一段未经处理的原始 ES5 源代码：

```javascript
var times = 0.1 * 8 + 1;
function getExtra(n) {
	return [1, 4, 6].map(function(i) {
  	return i * n;
  });
}
var arr = [8, 94, 15, 88, 55, 76, 21, 39];
arr = getExtra(times).concat(arr.map(function(item) {
  return item * 2;
}));
function sortarr(arr) {
  for(i = 0; i < arr.length - 1; i++) {
    for(j = 0; j < arr.length - 1 - i; j++) {
      if(arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(sortarr(arr));
```

在经过 UglifyJS 的代码压缩和混淆处理后：

```javascript
var times=1.8;function getExtra(r){return[1,4,6].map(function(t){return t*r})}var arr=[8,94,15,88,55,76,21,39];function sortarr(r){for(i=0;i<r.length-1;i++)for(j=0;j<r.length-1-i;j++)if(r[j]>r[j+1]){var t=r[j];r[j]=r[j+1],r[j+1]=t}return r}arr=getExtra(times).concat(arr.map(function(r){return 2*r})),console.log(sortarr(arr));
```

在经过 GCC 的代码压缩和混淆处理后：

```javascript
var b=[8,94,15,88,55,76,21,39];b=function(a){return[1,4,6].map(function(c){return c*a})}(1.8).concat(b.map(function(a){return 2*a}));console.log(function(a){for(i=0;i<a.length-1;i++)for(j=0;j<a.length-1-i;j++)if(a[j]>a[j+1]){var c=a[j];a[j]=a[j+1];a[j+1]=c}return a}(b));
```

对比上述两种工具的代码混淆压缩产物可以看到，UglifyJS 不会对原始代码进行“重写”，所有的混淆压缩工作都是在“**保证原有代码结构不变**”这个基础上进行的。而 GCC 对代码的混淆压缩处理则更接近于“编译器”，除了对常见的变量名和函数名进行混淆替换外，还使用了诸多 DCE 优化手段，比如对常量表达式进行提前求值（0.1 * 8 + 1）、通过 “*inlining*” 减少中间变量的使用等等。

借助 UglifyJS，我们也可以编写自己的源代码处理程序。比如我们可以首先使用 `UglifyJS.parse` 将一段 JavaScript 代码转换成其对应的 AST 形式，然后再通过 `UglifyJS.Compressor` 等方法对这些 AST 进行转换。最后再通过 `print_to_string` 方法，可以将处理后的 AST 结构转换成相应的 ASCII 明文代码形式。*UglifyJS.Compressor* 的本质是一个 “TreeTransformer” 类型，其内部已经封装好了众多常用的代码优化方法，而通过对 `UglifyJS.TreeTransformer` 进行适当的封装，我们也可以编写自己的代码优化器。如下所示的简单代码便实现了一个支持“常量传播”与“常量折叠”的 UglifyJS 转换器。

```javascript
const UglifyJS = require('uglify-js');

var symbolTable = {};
var binaryOperations = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y
}
var constexpr = new UglifyJS.TreeTransformer(null, function(node) {
  if (node instanceof UglifyJS.AST_Binary) {
    if (Number.isInteger(node.left.value) && Number.isInteger(node.right.value)) {
      return new UglifyJS.AST_Number({
        value: binaryOperations[node.operator].call(this, 
          Number(node.left.value), 
          Number(node.right.value))
      });
    } else {
      return new UglifyJS.AST_Number({
        value: binaryOperations[node.operator].call(this, 
          Number(symbolTable[node.left.name].value), 
          Number(symbolTable[node.right.name].value))
      })
    }
  }

  if (node instanceof UglifyJS.AST_VarDef) {
    symbolTable[node.name.name] = node.value;
  }
});

var ast = UglifyJS.parse(`
  var x = 10 * 2 + 6;
  var y = 4 - 1 * 100;
  console.log(x + y);
`);

// transform and print.
ast.transform(constexpr);
console.log(ast.print_to_string());

// output: "var x=26;var y=-96;console.log(-70);".
```

这里我们通过识别特定的 Uglify AST 节点类型（*UglifyJS.AST_Binary* / *UglifyJS.AST_VarDef*）来达到对代码进行精准处理的目的。可以看到，变量 `x` 和 `y` 的值在代码处理过程中被提前计算。不仅如此，其作为变量的值还被“传递”到了表达式 `x + y` 中，此时如果能够再结合简单的 DCE 策略便可完成最初级的代码优化效果。类似的，通过 Babel 的 [`@babel/traverse`](https://www.npmjs.com/package/@babel/traverse) 插件，我们也可以实现同样的效果，其基本原理也大同小异。

对于经由 UglifyJS 和 GCC 处理后的 JavaScript 明文代码，我们尚能清楚地了解其大致的执行逻辑，相对只是缺少了有意义的变量名称。而对于某些更加激进（aggressive）的 JavaScript 混淆工具来说，经由它们处理后的明文代码已基本丧失了可读性。比如本文开头的 JavaScript 代码在经由 “**[javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)**” 的代码混淆功能处理后，我们可以得到以下结果。可以看到，这部分代码已基本丧失可读性。

```javascript
var _0x4714=['39DeNKvr','173449MpzOjv','1FUezYv','length','77240kHoOnt','324641yufFzw','map','745249sbRRYu','533373WaZCzc','1CYDDFZ','6jccpjJ','5927MoQMzj','739909CIgkUB'];var _0x57f9bd=_0x1abc;(function(_0x31c03b,_0x2c74b3){var _0x535fd3=_0x1abc;while(!![]){try{var _0x323f9f=parseInt(_0x535fd3(0x10b))*parseInt(_0x535fd3(0x109))+parseInt(_0x535fd3(0x110))+-parseInt(_0x535fd3(0x10f))*parseInt(_0x535fd3(0x108))+parseInt(_0x535fd3(0x113))+parseInt(_0x535fd3(0x112))*-parseInt(_0x535fd3(0x114))+-parseInt(_0x535fd3(0x10c))+parseInt(_0x535fd3(0x10d))*parseInt(_0x535fd3(0x10a));if(_0x323f9f===_0x2c74b3)break;else _0x31c03b['push'](_0x31c03b['shift']());}catch(_0x375cd8){_0x31c03b['push'](_0x31c03b['shift']());}}}(_0x4714,0x6d1da));var times=0.1*0x8+0x1;function getExtra(_0x5cf174){var _0x259155=_0x1abc;return[0x1,0x4,0x6][_0x259155(0x111)](function(_0x40abb6){return _0x40abb6*_0x5cf174;});}var arr=[0x8,0x5e,0xf,0x58,0x37,0x4c,0x15,0x27];arr=getExtra(times)['concat'](arr[_0x57f9bd(0x111)](function(_0x143e60){return _0x143e60*0x2;}));function _0x1abc(_0x1ea59c,_0x39de2e){_0x1ea59c=_0x1ea59c-0x108;var _0x471491=_0x4714[_0x1ea59c];return _0x471491;}function sortarr(_0x113e5e){var _0x1d8273=_0x57f9bd;for(i=0x0;i<_0x113e5e[_0x1d8273(0x10e)]-0x1;i++){for(j=0x0;j<_0x113e5e['length']-0x1-i;j++){if(_0x113e5e[j]>_0x113e5e[j+0x1]){var _0x594d3b=_0x113e5e[j];_0x113e5e[j]=_0x113e5e[j+0x1],_0x113e5e[j+0x1]=_0x594d3b;}}}return _0x113e5e;}console['log'](sortarr(arr));
```

对这些工具来说，它们不仅会对源代码进行“压缩”和“变量名替换”等基本处理，还会通过诸如“增加无效对象（使调用栈增加）”、“Control Flow Flattening（使控制流扁平化）” 等方式来使用户无法通过常规的浏览器调试工具查看程序的原始执行流程。相对的，由于增加了这些更加激进的代码处理逻辑，经过它们混淆处理后的代码，其执行效率会相对地下降 15% 至 80%，具体依使用的混淆策略不同而有所差异。

## 沙盒（Sandboxing）

所谓“沙盒”可以简单将其理解为运行在浏览器中的一个独立环境。我们的 JavaScript 代码将会以某种方式（可能并非以 ASCII 明文代码的方式）在沙盒环境中执行，而沙盒自身则承担了与浏览器（诸如 Web API）进行交互的任务。一个简单的基于沙盒的 JavaScript 代码保护服务的基本结构如下所示：

![](1.png)

这里整个处理分为两个阶段：

* **第一阶段**：先将 ASCII 明文的 JavaScript 代码转换为基于特定 JavaScript 引擎（VM）的 OpCode 代码，这些二进制的 OpCode 代码会再通过诸如 Base64 等算法的处理进而转换为经过编码的明文 ASCII 字符串格式。相较于二进制的 OpCode 代码，这些经过 Based64 处理后的代码会有斤四分之一的体积增长；
* **第二阶段**：将上述经过编码的 ASCII 字符串连同对应的 JavaScript 引擎代码统一编译为对应的 ASM / WebAssembly 代码。当这些代码在网页中加载执行时，内嵌的 JavaScript 引擎便会直接解释执行硬编码在模块中的、经过编码处理的字符串 OpCode 代码。

比如我们以下面这段 JavaScript 代码为例：

```javascript
[1, 2, 3, 5, 6, 7, 8, 9].map(function(i) {
  return i * 2;
}).reduce(function(p, i) {
  return p + i;
}, 0);
```

按照正常的 VM 执行流程，上述代码在执行后会返回计算结果 `82`。这里我们以 [JerryScript](https://github.com/pando-project/jerryscript) 这个开源的轻量级 JavaScript 引擎作为例子，第一步首先将上述 ASCII 形式的代码输入到该引擎中，然后便可获得对应该引擎中间状态的 ByteCode 字节码。

![](2.png)

然后再将这些二进制的字节码通过 Base64 算法编码成对应的 ASCII 字符串形式。结果如下：

```text
WVJSSgAAABYAAAAAAAAAgAAAAAEAAAAYAAEACAAJAAEEAgAAAAAABwAAAGcAAABAAAAAWDIAMhwyAjIBMgUyBDIHMgY6CCAIwAIoAB0AAToARscDAAAAAAABAAMBAQAhAgIBAQAAACBFAQCPAAAAAAABAAICAQAhAgICAkUBAIlhbQADAAYAcHVkZXIAAGVjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
```

按照我们的思路，这部分被编码后的 ASCII 字符串会作为“加密”后的源代码被硬编码到包含有 VM 引擎核心的 Wasm 模块中。当模块被加载时，VM 会通过相反的顺序解码这段字符串，并得到二进制格式的 ByteCode。然后再通过一起打包进来的 VM 核心执行这些中间状态的 ByteCode。这里我们上述提到的 ByteCode 实际上是以 JerryScript SnapShot 快照结构的形式存在于内存中的。最后这里给出上述 Demo 的主要部分源码，详细代码可以参考 [Github](https://github.com/Becavalier/Zero)：

```cpp
#include "jerryscript.h"
#include "cppcodec/base64_rfc4648.hpp"
#include <iostream>
#include <vector>

#define BUFFER_SIZE 256

#ifdef WASM
#include "emscripten.h"
#endif


std::string encode_code(const jerry_char_t*, size_t);

const unsigned char* transferToUC(const uint32_t* arr, size_t length) {
  auto container = std::vector<unsigned char>();
  for (size_t x = 0; x < length; x++) {
    auto _t = arr[x];
    container.push_back(_t >> 24);
    container.push_back(_t >> 16);
    container.push_back(_t >> 8);
    container.push_back(_t);
  }

  return &container[0];
}

std::vector<uint32_t> transferToU32(const uint8_t* arr, size_t length) {
  auto container = std::vector<uint32_t>();
  for (size_t x = 0; x < length; x++) {
    size_t index = x * 4;
    uint32_t y = (arr[index + 0] << 24) | (arr[index + 1] << 16) | (arr[index + 2] << 8) | arr[index + 3];
    container.push_back(y);
  }

  return container;
}

int main (int argc, char** argv) {
  const jerry_char_t script_to_snapshot[] = u8R"(
    [1, 2, 3, 5, 6, 7, 8, 9].map(function(i) {
      return i * 2;
    }).reduce(function(p, i) {
      return p + i;
    }, 0);
  )";

  std::cout << encode_code(script_to_snapshot, sizeof(script_to_snapshot)) << std::endl;
  
  return 0;
}

std::string encode_code(const jerry_char_t script_to_snapshot[], size_t length) {
  using base64 = cppcodec::base64_rfc4648;

  // initialize engine;
  jerry_init(JERRY_INIT_SHOW_OPCODES);

  jerry_feature_t feature = JERRY_FEATURE_SNAPSHOT_SAVE;

  if (jerry_is_feature_enabled(feature)) {
    static uint32_t global_mode_snapshot_buffer[BUFFER_SIZE];

    // generate snapshot;
    jerry_value_t generate_result = jerry_generate_snapshot(
      NULL, 
      0,
      script_to_snapshot,
      length - 1,
      0,
      global_mode_snapshot_buffer,
      sizeof(global_mode_snapshot_buffer) / sizeof(uint32_t));

    if (!(jerry_value_is_abort(generate_result) || jerry_value_is_error(generate_result))) {
      size_t snapshot_size = (size_t) jerry_get_number_value(generate_result);

      std::string encoded_snapshot = base64::encode(
        transferToUC(global_mode_snapshot_buffer, BUFFER_SIZE), BUFFER_SIZE * 4);

      jerry_release_value(generate_result);
      jerry_cleanup();

      // encoded bytecode of the snapshot;
      return encoded_snapshot;
    }
  }
  return "[EOF]";
}

void run_encoded_snapshot(std::string code, size_t snapshot_size) {
  using base64 = cppcodec::base64_rfc4648;
  
  auto result = transferToU32(
    &(base64::decode(code)[0]), 
    BUFFER_SIZE);

  uint32_t snapshot_decoded_buffer[BUFFER_SIZE];
  for (auto x = 0; x < BUFFER_SIZE; x++) {
    snapshot_decoded_buffer[x] = result.at(x);
  }

  jerry_init(JERRY_INIT_EMPTY);

  jerry_value_t res = jerry_exec_snapshot(
    snapshot_decoded_buffer,
    snapshot_size, 0, 0);

  // default as number result;
  std::cout << "[Zero] code running result: " << jerry_get_number_value(res) << std::endl;
  
  jerry_release_value(res);
}

#ifdef WASM
extern "C" {
  void EMSCRIPTEN_KEEPALIVE run_core() {
    // encoded snapshot (will be hardcoded in wasm binary file);
    std::string base64_snapshot = "WVJSSgAAABYAAAAAAAAAgAAAAAEAAAAYAAEACAAJAAEEAgAAAAAABwAAAGcAAABAAAAAWDIAMhwyAjIBMgUyBDIHMgY6CCAIwAIoAB0AAToARscDAAAAAAABAAMBAQAhAgIBAQAAACBFAQCPAAAAAAABAAICAQAhAgICAkUBAIlhbQADAAYAcHVkZXIAAGVjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
    run_encoded_snapshot(base64_snapshot, 142);
  }
}
#endif
```

当然这里我们只是基于 JerryScript 做了一个基于 Wasm 的简单 POC，代码并没有处理边界 Case。如果需要进一步优化，我们可以思考如何利用 “jerry-libm” 来处理 JavaScript 中诸如 `Math.abs` 等常见标准库；对于平台依赖的符号（比如 `window.document` 等平台相关函数），怎样通过 Wasm 的导出段与导入段进行处理等等。最后，给朋友的产品打个广告，**[SecurityWorker](https://www.securitify.io/)** 一个基于 Wasm 进行前端代码保护的工具软件，其大体思路与我们上述介绍的基本一致，但功能和 API 更加完善，并且其利用了 Worker Thread 将前端代码的核心计算逻辑与主线程分离，性能更高、加壳后的代码体积更小。


## 参考资料

1. *http://lisperator.net/uglifyjs/transform.*
2. *https://blog.jscrambler.com/jscrambler-101-control-flow-flattening/.*
