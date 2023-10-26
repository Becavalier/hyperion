---
title: 浅谈前端 JavaScript 代码保护
intro: 本文主要介绍了可用于前端 JavaScript 代码保护的相关方案，这些方案仅用于参考，这里并不讨论它们的实用价值。而所谓“代码保护”可以被进一步理解为「如何在外部环境中尽量降低明文 JavaScript 代码的可读性，以让代码的执行细节成为黑盒？」这样一来，我们提到的“代码保护”便可在一定程度上实现。
comments: true
date: 2019-04-10 16:58:34
tags:
- 代码保护
- JavaScript
---

本文主要介绍了可用于前端 JavaScript 代码保护的相关方案，这些方案仅用于参考，这里并不讨论它们的实用价值。而所谓“代码保护”可以被进一步理解为「**如何在外部环境中尽量降低明文 JavaScript 代码的可读性，以让代码的执行细节成为黑盒？**」这样一来，我们提到的“代码保护”便可在一定程度上实现。

总的来看，想到的方法可分为以下几种：

### 代码混淆（Code Obfuscation）

第一种可以直接想到的方式便是使用“**代码混淆**”（由于两者一般同时进行，因此这里不特意区分“压缩”与“混淆”）。

#### 基本功能

大多数基本的代码混淆工具都可以压缩原始的 ASCII 明文代码，并将其中的诸如：变量名、函数名等，使用简短且无意义的标识符进行替换，这是作为一款代码混淆工具的最基础功能。比如，以我们最常用的 “*Uglify*” 与 “*GCC* (Google Closure Compiler)” 两个工具为例，对下面这样一段未经处理的 ES6 源代码进行默认的代码混淆处理：

```javascript
let times = 0.1 * 8 + 1;
const getExtra = n => [1, 4, 6].map(i => i * n);
const arr = [8, 94, 15, 88, 55, 76, 21, 39];
const newArr = getExtra(times).concat(arr.map(item => item * 2));
const sortarr = arr => {
  for(let i = 0; i < arr.length - 1; i++) {
    for(let j = 0; j < arr.length - 1 - i; j++) {
      if(arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(sortarr(newArr));
```

在经过 UglifyJS 的代码处理后，我们可以得到如下结果（这里为了直观比对，保留了空格和换行）：

```javascript
let times = 1.8;
const getExtra = r => [1, 4, 6].map(t => t * r),
  arr = [8, 94, 15, 88, 55, 76, 21, 39],
  newArr = getExtra(times).concat(arr.map(r => 2 * r)),
  sortarr = r => {
    for (let t = 0; t < r.length - 1; t++)
      for (let e = 0; e < r.length - 1 - t; e++)
        if (r[e] > r[e + 1]) {
          let t = r[e];
          r[e] = r[e + 1], r[e + 1] = t
        } return r
  };
console.log(sortarr(newArr));
```

而在经过 GCC 的代码处理后我们可以得到：

```javascript
'use strict';
const b = (c => [1, 4, 6].map(a => a * c))(1.8).concat([8, 94, 15, 88, 55, 76, 21, 39].map(c => 2 * c));
var d = console,
  e = d.log;
for (let c = 0; c < b.length - 1; c++)
  for (let a = 0; a < b.length - 1 - c; a++)
    if (b[a] > b[a + 1]) {
      let f = b[a];
      b[a] = b[a + 1];
      b[a + 1] = f
    } e.call(d, b);
```

对比上述两种工具的代码处理结果可以看到，默认情况下 UglifyJS 不会对原始代码进行“重写”，所有的混淆压缩工作都是在“**保证原有代码基本结构不变**”这个条件的基础之上进行的。而 GCC 对代码的处理过程则更接近于“编译器”。其除了会对常见的变量名、函数名等标识符进行混淆替换外，还应用了诸多 DCE 优化手段。比如对常量表达式进行提前求值（0.1 * 8 + 1）、通过 “*inlining*” 减少中间变量的使用等等。当然，UglifyJS 在经过一定的配置后也可以使用一些相对“激进”的优化手段，这里只需知道传统代码混淆工具所具备的能力即可。

借助 UglifyJS，我们也可以编写自己的源码处理程序。比如可以首先使用 `UglifyJS.parse` 将一段 JavaScript 代码转换成其对应的 AST 形式；然后再通过 `UglifyJS.Compressor` 等方法对这些 AST 进行转换；最后再使用 `print_to_string` 方法将处理后的 AST 结构转换成相应的 ASCII 明文代码形式。*UglifyJS.Compressor* 的本质是一个 “TreeTransformer” 类型，其内部已经封装好了众多常用的代码优化方法，而通过对 `UglifyJS.TreeTransformer` 进行适当的封装，我们也可以编写自己的代码优化器。如下所示这段简短的代码便实现了一个支持“**常量传播**”与“**常量折叠**”的 JavaScript 代码转换器（非完备，仅供参考）。

```javascript
const UglifyJS = require('uglify-js');

const symbolTable = {};
const binaryOperations = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y
}
const constexpr = new UglifyJS.TreeTransformer(null, node => {
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
    symbolTable[node.name.name] = node;
  }
});

var ast = UglifyJS.parse(`
  const x = 10 * 2 + 6;
  const y = 4 - 1 * 100;
  console.log(x + y);
`);

// transform and print.
ast.transform(constexpr);
console.log(ast.print_to_string());  // "var x=26;var y=-96;console.log(-70);".
```

这里我们通过识别特定的 Uglify AST 节点类型（*UglifyJS.AST_Binary* / *UglifyJS.AST_VarDef*）来达到对代码进行精准处理的目的。可以看到，变量 `x` 和 `y` 的值在代码转换过程中被提前计算。不仅如此，其作为变量的值还被“传递”到了表达式 `x + y` 中，且整个表达式的值也被提前计算，进而省去了运行时计算的成本。类似的，通过诸如 Babel 的 [`@babel/traverse`](https://www.npmjs.com/package/@babel/traverse) 等插件，我们也可实现同样的效果，其基本原理大同小异。

#### “入侵式”混淆

对于经由 UglifyJS 和 GCC 等传统 JavaScript 代码混淆工具处理后的代码，我们尚能清楚地了解代码的大致执行逻辑。而对于某些更加激进（*aggressive*）的 JavaScript 代码混淆工具来说，经由它们处理后生成的明文代码已基本丧失了可读性。比如本文开头的那段 JavaScript 代码在经由 “<b>[javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator)</b>” 默认配置下的代码混淆功能处理后，可以得到以下结果。能够看到，这部分代码已基本丧失可读性。

```javascript
const _0x1dc7 = ['12nNpunz', 'log', '3dzOihv', 'length', '140940hmJpHd', '570593RvJQQj', '30406WiuNiv', '154511VRvByU', '1HvqfmW', '522351ALcOFX', 'map', '1318841sxtxER', '36YiKqrR', '16126qXbaLY'];
const _0x84e884 = _0x3580;
(function(_0x5cef26, _0x52c0dc) {
  const _0x1d18c7 = _0x3580;
  while (!![]) {
    try {
      const _0x1540ed = -parseInt(_0x1d18c7(0x1d4)) * parseInt(_0x1d18c7(0x1d5)) + -parseInt(_0x1d18c7(0x1da)) + -parseInt(_0x1d18c7(0x1db)) + -parseInt(_0x1d18c7(0x1df)) + parseInt(_0x1d18c7(0x1d8)) * parseInt(_0x1d18c7(0x1dd)) + parseInt(_0x1d18c7(0x1d6)) * parseInt(_0x1d18c7(0x1dc)) + parseInt(_0x1d18c7(0x1de)) * parseInt(_0x1d18c7(0x1d3));
      if (_0x1540ed === _0x52c0dc) break;
      else _0x5cef26['push'](_0x5cef26['shift']());
    } catch (_0x51e61c) {
      _0x5cef26['push'](_0x5cef26['shift']());
    }
  }
}(_0x1dc7, 0x5141a));

function _0x3580(_0x3769d1, _0x4940d9) {
  _0x3769d1 = _0x3769d1 - 0x1d3;
  let _0x1dc7dc = _0x1dc7[_0x3769d1];
  return _0x1dc7dc;
}
let times = 0.1 * 0x8 + 0x1;
const getExtra = _0x4cd659 => [0x1, 0x4, 0x6]['map'](_0x25d119 => _0x25d119 * _0x4cd659),
  arr = [0x8, 0x5e, 0xf, 0x58, 0x37, 0x4c, 0x15, 0x27],
  newArr = getExtra(times)['concat'](arr[_0x84e884(0x1e0)](_0x42b6c9 => _0x42b6c9 * 0x2)),
  sortarr = _0x3d0937 => {
    const _0x3e9648 = _0x84e884;
    for (let _0x584873 = 0x0; _0x584873 < _0x3d0937[_0x3e9648(0x1d9)] - 0x1; _0x584873++) {
      for (let _0x1bd1d5 = 0x0; _0x1bd1d5 < _0x3d0937[_0x3e9648(0x1d9)] - 0x1 - _0x584873; _0x1bd1d5++) {
        if (_0x3d0937[_0x1bd1d5] > _0x3d0937[_0x1bd1d5 + 0x1]) {
          let _0x2dace4 = _0x3d0937[_0x1bd1d5];
          _0x3d0937[_0x1bd1d5] = _0x3d0937[_0x1bd1d5 + 0x1], _0x3d0937[_0x1bd1d5 + 0x1] = _0x2dace4;
        }
      }
    }
    return _0x3d0937;
  };
console[_0x84e884(0x1d7)](sortarr(newArr));
```

为了尽可能降低原始代码的可读性，较为“专业“的 Obfuscator 会使用很多特殊的手段来“打散”原始 JavaScript 代码的执行逻辑。比如就上述生成的这段代码而言，*javascript-obfuscator* 在处理时会默认采用以下这些代码混淆策略（部分）：

* *stringArray*：移除源代码中出现的字符串字面量值，并将它们放置在特殊的数组中，以间接方式引用；
* *rotateStringArray*：将用于存放字符串字面量值的 stringArray 数组中的有效元素随机移动固定偏移量，并使该数组中含有随机垃圾；
* *shuffleStringArray*：随机打乱 stringArray 数组中的元素：
* *Identifier Names Generator*：将源代码中出现的标识符替换为随机的“类十六进制字符串”或其他无意义的标识符形式。

除上述这些默认情况下会采用的基本代码混淆策略外，Obfuscator 通常还会使用诸如 “**Control Flow Flattening**” 等更为激进的、代码执行流层面的混淆策略。“*Control Flow Flattening*” 翻译过来即“控制流扁平化”，该策略会将源代码中的基本块（函数体、循环，以及条件分支语句等）进行拆分，并将它们全部放入一个死循环结构中。而在这个循环结构中，Obfuscator 将通过 *switch* 语句来控制程序的实际执行流程。通过这种方式，程序的真实执行流程将变得难以跟踪，从而增加了代码逆向工程的难度。

另一方面，由于增加了这些激进的代码处理逻辑，Obfuscator 生成代码的实际执行效率相较于原始代码会相应下降 15% 至 80% 左右，具体依使用的混淆策略不同而有所差异。

### 沙盒（Sandboxing）

这种方式的思路也很好理解。其基本形式是将明文的 JavaScript 源代码预先编译为某种 JavaScript VM 实现的内部格式代码，然后将这些内部代码作为对外分发的“源代码”。当在浏览器中执行这些代码时，则需要将完整的 VM 实现托管在浏览器环境中，然后再让 VM 来间接执行这些分发的“内部源代码”。通过这种“间接执行”的方式，实际对外分发的源代码将不再包含任何 JavaScript 代码的语法和语义。而当 VM 的实现变成私有时，这些代码的内部执行细节将无人可知，在某种意义上便可实现真正的“黑盒”。当然，在此期间 VM 将承担一切需要与浏览器交互的任务（DOM 操作、Web API 调用等），因此代码的执行效率会有所降低。上述我们提到的 VM，其内部私有的执行环境便可被理解为“沙盒”。

一个简单的基于沙盒实现的 JavaScript 代码保护机制如下所示：

![](1.png)

整个流程可以分为两个阶段：

* **第一阶段**：将明文的 JavaScript 源代码通过静态编译转换为基于特定 JavaScript 引擎（VM）的内部中间代码。这些代码可能以二进制或可读文本的形式存在，在某些情况下，可将二进制代码经过 Base64 编码后分发。在这种情况下，编码后的代码体积会增长 25% 左右；
* **第二阶段**：将上述经过编码的二进制或可读文本代码连同其适用的 VM 实现一同放到浏览器中运行。这时，浏览器将通过运行 VM 来间接执行第一阶段产生的二进制或可读文本代码。通常考虑到性能，浏览器中的 VM 其实现可基于 WebAssembly 字节码或 ASM.js。

比如以 [JerryScript](https://github.com/pando-project/jerryscript) 这个开源的轻量级 JavaScript 引擎为例，从其文档中我们可以得知，输入的 JavaScript 代码在被真正执行前会被首先转译成中间状态的 Bytecode 字节码格式，而这些编译好的字节码可以连同附加的元数据一起被组织成 JerryScript 内部的 Snapshot 快照格式，这些 Snapshot 可以被 JerryScript 引擎重新加载而继续执行。因此，这里的 Snapshot 便可作为对外分发的一种内部格式。当然，为了进一步保证中间代码格式的私有性，可以选择自行构建相应的 JavaScript VM，以将中间代码的格式和执行模型私有化。基于 JerryScript 构建的 JavaScript 代码保护 POC 可以参考<b>[这里](https://github.com/Becavalier/Zero)</b>。

![](2.png)

如果你有其他可用于前端 JavaScript 代码保护的方案，欢迎补充！

## 参考资料

1. *http://lisperator.net/uglifyjs/transform.*
2. *https://blog.jscrambler.com/jscrambler-101-control-flow-flattening/.*
