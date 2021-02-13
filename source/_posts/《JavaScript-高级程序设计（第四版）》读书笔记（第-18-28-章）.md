---
title: 《JavaScript 高级程序设计（第四版）》读书笔记（第 18-28 章）
intro: 书接上回，本文为第 18-28 章的笔记。
comments: true
date: 2020-12-24 20:45:46
tags:
- JavaScript
---

书接上回，本文为第 18-28 章的笔记。

### 第 18 章 - 动画与 Canvas 图形

72. （Page：1317）`window.requestAnimationFrame()`：

* 需要以 17ms（每秒 60 帧）为时间间隔来绘制动画，而浏览器计时器的**精度不足毫秒**；
* `setInterval()` 的问题：无法保证时间精度，**作为第二个参数的延时只能保证何时会把代码加入到浏览器的任务队列，而不能保证添加到队列就会立即执行**（如果队列前面还有其他任务，则需要等待这些任务执行完毕。并且队列的执行需要等待主线程的释放）；
* `window.cancelAnimationFrame()` 用于取消重绘任务；
* 用于节流：该函数可以**保证每次重绘（60Hz）最多只执行一次回调函数**；

```javascript
window.addEventListener('scroll', () => {
  window.requestAnimationFrame(() => {
    console.log('dadadada...');
  });
});
```

73. （Page：1323）Canvas 与 WebGL：（略）；

### 第 19 章 - 表单脚本

（略）

### 第 20 章 - JavaScript API

74. （Page：1452）**Atomics** 与 **SharedArrayBuffer**：

* SharedArrayBuffer **可以被任意多个执行上下文（Worker）同时使用**，Atomics API 可以保证其上的 JavaScript 操作是**线程安全**的；
* Atomics API：
  * **所有原子指令相互之间的顺序永远不会重排**；
  * 使用**原子读（Atomics.load）或原子写（Atomics.store）**可以保证所有指令（包括原子和非原子指令）都**不会相对原子读/写重新排序**（非原子指令只能进行“本地重排”，不会侵犯原子读/写的边界）。

```javascript
const view = new Uint32Array(new SharedArrayBuffer(4));
const workers = [];
const workerScript = `
  const DEFAULT_INDEX = 0;
  self.onmessage = ({ data }) => {
    data[DEFAULT_INDEX]++;
    Atomics.store(data, DEFAULT_INDEX, 
      Atomics.load(data, DEFAULT_INDEX));
    console.log(data[DEFAULT_INDEX]);
  }
`;
for (let i = 0; i < 4; ++i) {
  workers.push(
    new Worker(
      URL.createObjectURL(
        new Blob([workerScript]))));
}
for (worker of workers) {
  worker.postMessage(view);
}
```

* **Atomics 静态方法**：
  * *add(typedArray, index, value)*：加；
  * *sub(typedArray, index, value)*：减；
  * *and(typedArray, index, value)*：与；
  * *or(typedArray, index, value)*：或；
  * *xor(typedArray, index, value)*：异或。
  * *compareExchange(typedArray, index, expectedValue, replacementValue)*：相等时替换，返回旧值；
  * *exchange(typedArray, index, value)*：替换，返回旧值；
  * *isLockFree(size)*：是一个“优化原语”，用来验证是否是能够使用原子操作的 TypedArray 标准字节长度之一；
  * ***load(typedArray, index)***：读；
  * ***store(typedArray, index, value)***：写；
  * （Int32Array）*notify(typedArray, index, count)*：提醒在**等待队列**中休眠的代理；
  * （Int32Array）*wait(typedArray, index, value[, timeout])*：若给定位置的值没有发生变化、仍然是给定的值时，线程将会睡眠，直到被唤醒或超时。
* Atomics API **模仿 Linux Futex**（快速用户控件排斥量）：

```javascript
const view = new Int32Array(new SharedArrayBuffer(4));
const workers = [];
const workerScript = `
  self.onmessage = ({ data }) => {
    console.log('Wait to obtain lock...');
    Atomics.wait(data, 0, 0, 1e6);
    console.log('Obtained lock...');
    Atomics.add(data, 0, 1);
    console.log('Releasing lock...');
    Atomics.notify(data, 0, 1);
    console.log(Atomics.load(data, 0, 1));
  }
`;
for (let i = 0; i < 4; ++i) {
  workers.push(
    new Worker(
      URL.createObjectURL(
        new Blob([workerScript]))));
}
for (worker of workers) {
  worker.postMessage(view);
}
setTimeout(() => {
  Atomics.notify(view, 0, 1);
}, 1000);
```

75. （Page：1466）**跨上下文消息**：是一种**在不同执行上下文（如不同工作线程或不同源的页面）间传递信息的能力**。

```html
<!-- parent.html -->
<html>
<body>
  <iframe src="http://localhost:3000/child.html"></iframe>
  <script type="text/javascript">
    window.addEventListener('load', () => {
      let iframeWin = document.querySelector('iframe').contentWindow;
      iframeWin.postMessage('A secret', 'http://localhost:3000');
    });
    window.addEventListener('message', event => {
      if (event.data) {
        console.log(`Received from iframe... ${event.data}`);
      }
    });
  </script>
</body>
</html>
```

```html
<!-- child.html -->
<html>
<body>
  <script type="text/javascript">
    window.addEventListener('message', event => {
      if (event.origin === 'http://localhost:3000' && event.data) {
        console.log(`Iframe received... ${event.data}`);
        event.source.postMessage('Confirmed!', 'http://localhost:3000');
      }
    });
  </script>
</body>
</html>
```

76. （Page：1469）**Encoding API**：用于实现**字符串与 TypedArray 之间的转换**（*Firefox 与 Safari 不支持*）。

* ***TextEncoder***；
* ***TextEncoderStream***；
* ***TextDecoder***；
* ***TextDecoderStream***。

77. （Page：1480）**File API** 与 **Blob API**：

* ***FileReader***：表示一种**异步**文件读取机制；
  * *readAsText(file, encoding)*：读取纯文本内容；
  * *readAsDataURL(file)*：读取文件内容，转换为 “data:URL” 格式；
  * *readAsBinaryString(file)*：读取原始二进制格式内容；
  * *readAsText(file)*：读取文件内容，并存放到 ArrayBuffer 中。
* ***FileReaderSync***：表示一种同步文件读取机制（只可在 Worker 中使用）；
* **Blob**（binary large object）表示“二进制大对象”，是 JavaScript **对不可修改二进制数据的封装类型**；
* **对象 URL**：有时也称为 “Blob URL”，是指**引用存储在 File 或 Blob 中数据的 URL**（这个 URL 可以直接当成普通 URL 来使用，两者均引用了某一种资源）。`window.URL.createObjectURL(object)` 可用于**创建**对象 URL 引用；`window.URL.revokeObjectURL(objectURL)` 用于**释放**对象 URL 引用。

78. （Page：1491）媒体元素 & HTML5 拖放：（略）；
79. （Page：1513）**Notifications API**：

```javascript
Notification.requestPermission().then(p => {
  if (p === 'granted') console.log('Notification enabled.')
});
const noti = new Notification('Congrats!', {
  body: 'You won $1000!',
  vibrate: true,
});
// lifecycles.
noti.onshow = () => console.log('Notification was shown!');
noti.onclick = () => console.log('Notification was clicked!');
noti.onclose = () => console.log('Notification was closed!');
noti.onerror = () => console.log('Notification experienced an error!');
```

80. （Page：1517）Page Visibility API：（略）；
81. （Page：1518）**Streams API**：

* **可读流**：是**对底层数据源的封装**。底层数据源可以将数据填充到流中，允许消费者通过流的公共接口读取数据；

```javascript
async function* ints() {
  for (let i = 0; i < 5; ++i) {
    yield await new Promise(resolve => setTimeout(resolve, 1000, i));
  }
}
const readableStream = new ReadableStream({
  async start(controller) {
    for await (let chunk of ints()) {
      // enqueue the data of this stream.
      controller.enqueue(chunk);
    }
    controller.close();
  }
});
const readableStreamDefaultReader = readableStream.getReader();  // locked.
(async function() {
  while(true) {
    // read data from the queue of this stream.
    const { done, value } = await readableStreamDefaultReader.read();
    if (done) {
      break;
    } else {
      console.log(value);
    }
  }
})();
```

* **可写流**：是**底层数据槽的封装**。底层数据槽处理通过流的公共接口写入的数据；

```javascript
const writableStream = new WritableStream({
  write(value) {
    console.log(value);
  }
});
const writableStreamDefaultWriter = writableStream.getWriter();
(async function() {
  for await (let chunk of ints()) {
    await writableStreamDefaultWriter.ready;
    writableStreamDefaultWriter.write(chunk);    
  }
  writableStreamDefaultWriter.close();
})();
```

* **转换流**：用于**组合“可读流”与“可写流”**。数据在两个流之间的转换是通过 transform 方法完成的；

```javascript
// return two kinds of stream.
const { writable, readable } = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk * 2);
  }
});
```

* **管道**：可用于**连接流**。
  * *ReadableStream.pipeThrough(transformStream)*：可用于将 ReadableStream 接入 TransformStream；
  * *ReadableStream.pipeTo(writableStream)*：（同上）但无法进行“链式调用”。仅适用于链式调用最后是一个 WritableStream 的情况。

82. （Page：1535）**计时 API**；

* *High Resolution Time API*；
  * ***window.performance.now()***：返回一个**微秒**精度的浮点值。计时器在执行上下文创建时从 0 开始单调递增；
* *Performance Timeline API*；
* *Navigation Timing API*；
* *User Timing API*；
* *Resource Timing API*；
* *Paint Timing API*。

83. （Page：1545）Web Component：（略）；
84. （Page：1578）Web Cryptography API：（略）；

### 第 21 章 - 错误处理与调试

85. （Page：1610）错误处理：

* `return` 语句**无法阻止 try-catch 语句中 finally 块的执行**；
* **自定义错误类型**：

```javascript
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
    this.message = message;
  }
}
throw new CustomError('My error message.');
```

* 全局的错误处理程序（表现依浏览器不同而有差异）：

```javascript
window.onerror = (message, url, line) => {
  console.log(message);
  return false;
};
```

* 考虑兼容性的**错误上报函数**（也可用来跨域）：
  * 所有浏览器都支持 Image 对象；
  * 不受跨域规则限制；
  * 记录错误过程很少出错（省去调用库的过程）。

```javascript
const logError = (sev, msg) => {
  let img = new Image();
  let encodedSev = encodeURIComponent(sev);
  let encodedMsg = encodeURIComponent(msg);
  img.src = `log.php?sev=${encodedSev}&msg=${encodedMsg}`;
}
```

86. （Page：1637）代码调试：

* 使用关键字 `debugger` 设置调试断点；

### 第 22 章 - 处理 XML

（略）

### 第 23 章 - JSON

87. （Page：1672）**JSON**：*JavaScript Object Notation*；

* JSON 是 JavaScript 语法的子集；
* 第一代 Web 服务很大程度上是以 **XML** 为基础的，以服务器间通信为主要特征；
* 最简单的 JSON 可以是一个数值，或一个**双引号**的字符串；
* 两个方法：
  * ***JSON.parse(text[, reviver])***；
  * ***JSON.stringify(value[, replacer [, space]])***。

### 第 24 章 - 网络请求与远程资源

88. （Page：1692）XMLHttpRequest：（略）；
89. （Page：1710）CORS：（略）；
90. （Page：1718）**Fetch API**：

```javascript
fetch('/json', {
  method: 'POST',
  body: JSON.stringify({ foo: 'bar', }),
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
});
```

91. （Page：1771）**Beacon API**:

* 会发送一个 POST 请求，可以在任何时间调用。主要**用于满足统计和诊断代码的需要**，这些代码通常尝试在**卸载（unload）文档**之前向 Web 服务器发送数据；
* 状态码、超时和其他网络原因造成的失败是不透明的，无法通过编程方式处理。

```javascript
window.addEventListener('unload', () => {
  navigator.sendBeacon("/log", JSON.stringify({
    date: new Date().getTime(),
  }));
}, false);
```

92. （Page：1774）Web Socket：（略）；

### 第 25 章 - 客户端存储

93. （Page：1798）JavaScript Document.cookie API 无法访问带有 **HttpOnly** 属性的 Cookie；此类 Cookie 仅作用于服务器。例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 HttpOnly 属性。此预防措施有助于缓解跨站点脚本（XSS）攻击；

### 第 26 章 - 模块

94. （Page：1830）**模块系统**：

* 本质上是“**键/值实体**”，其中每个模块都有个可用于**引用它的标识符**（如：字符串、模块文件路径）；
* 模块的依赖搜索可以通过 DFS 进行（被依赖的模块会最先执行）；
* 早期 **IIFE 模式的模块**：

```javascript
let Foo = (function() {
  return {
    bar: 'baz',
    baz: function() {
      console.log(this.bar);
    }
  };
})();
console.log(Foo.bar);
Foo.baz();
```

* 中期的模块规范：Commonjs、AMD、CMD；
* **ES6 模块规范**：
  * 默认情况下模块文件的**下载会在遇到 \<script\> 标签时立即执行，而执行会延迟到文档解析完毕**。嵌入模块通常仅适合作为入口模块；
  * 模块代码只能在加载后执行；
  * 模块只能加载一次；
  * 模块时单例；
  * 模块可以定义公共接口，其他模块可以基于这个公共接口观察和交换；
  * 支持循环依赖；
  * 默认在**严格模式**下执行；
  * 不共享全局命名空间；
  * 模块顶级 this 值为 undefined；
  * 模块是异步加载和执行的。

```html
<!-- 通过标签引入/构建模块 -->
<script type="module">
  // module implementation.
</script>
<script type="module" src="module.js"></script>
```

* **ES6 模块导出**：
  * `export` 关键字必须在模块**顶级作用域**；
  * 命名导出和默认导出可以同时存在。
* **ES6 模块导入**：
  * `import` 关键字必须在模块**顶级作用域**；
  * 对于默认导出，可以使用 `default` 关键字并提供别名来导入。

### 第 27 章 - 工作者线程

95. （Page：1873）三种 Worker 类型：

* （**Worker**）***专用 Worker***：普通 Web Worker；
  * **隐式使用了 MessagePorts 在两个上下文之间的通信**；
  * 对应全局对象 DedicatedWorkerGlobalScope（继承自 WokerGlobalScope）；
    * *name*：可选的字符串标识符；
    * ***postMessage()***：向父上下文发送消息；
    * *close()*：终止当前工作线程，**非同步停止**，仅会**通知工作者线程取消事件循环中的所有任务**；
    * ***importScripts()***：用于向工作线程导入任意数量的脚本（将按引用顺序同步执行）。
  * 必须使用**同源脚本**创建 Worker，而可以使用 `importScripts()` 在工作线程内部再**加载其他源的脚本**，并且该过程可以跨域；
  * `Worker` 对象支持的事件处理程序属性和方法：
    * *onerror*：工作线程发生 ErrorEvent 类型错误事件时调用；
    * ***onmessage***：工作线程向父上下文发送消息时调用；
    * *onmessageerror*：工作线程接收到无法反序列化的消息时发生；
    * ***postMessage()***：异步地向工作线程发送消息；
    * *terminate()*：**立即**终止工作线程。一旦调用，工作线程的消息队列就会被清理并锁住；
* （**SharedWorker**）***共享 Worker***：可以**被多个不同的上下文使用**，包括不同的页面（比如用一个共享线程管理多个同源页面 WebSocket 消息的发送与接收）；
  * 对应全局对象 SharedWorkerGlobalScope（继承自 WokerGlobalScope）；
    * *name*：可选的字符串标识符；
    * ***importScripts()***：用于向共享线程导入任意数量的脚本；
    * *close()*：**立即**终止共享线程（前提是没有已连接端口）；
    * ***onconnect***：与共享线程**建立连接时触发，包含连接页面的端口号**。
  * 每一个共享线程的**标识**源自解析后的**脚本 URL**、**工作者线程名称**和**文档源**（同源页面下相同标识的共享线程将仅会创建一次）；
* （**ServiceWorker**）***服务 Worker***：主要用于**拦截、重定向和修改页面发出的请求**（详情略）。
  * 对应全局对象 ServiceWorkerGlobalScope（继承自 WokerGlobalScope）；

96. （Page：1902）三种**在上下文间转移信息的方式**：

* ***结构化克隆算法***：在目标上下文中生成传递对象的一个**副本**；
  * 可以识别对象中包含的循环引用；
  * 原型链不会被克隆。
* ***可转移对象***：可以把所有权从一个上下文**转移**到另一个上下文；
  * 可转移类型：
    * *ArrayBuffer*；
    * *MessagePort*；
    * *ImageBitmap*；
    * *OffscreenCanvas*；
* ***共享数组缓冲区***：SharedArrayBuffer。

### 第 28 章 - 最佳实践

97. （Page：2013）性能：

* **访问全局变量始终比访问局部变量慢**，因为前者需要遍历作用域链（全局变量在最外层）。优化办法是：尽量**在局部作用域保存高层作用域的引用**，比如 document 对象；
* 不使用 with 语句（会增长代码的作用域链）；
* （循环展开）**达夫设备**：**以 8 的倍数作为迭代次数**而将循环展开为一系列语句；

```javascript
const process = (val) => {
  // do some work here.
};
let iterations = Math.floor(values.length / 8);
let leftover = values.length % 8;
let i = 0;
if (leftover > 0) {
  do {
    process(values[i++]);
  } while(--leftover > 0);
}
do {
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
  process(values[i++]);
} while (--iterations > 0);
```

* 一次声明多个变量（减少关键字识别过程）；
* 插入迭代性值（自增/自减与其他语句组合使用）；
* 使用数组和对象字面量；
* （DOM）尽量减少访问 HTMLCollection 对象；
* （DOM）使用 innerHTML（尽量保证一次性更新）；
* （DOM）使用“**事件委托**”；

### 附录 A - ES2018 和 ES2019

98. （Page：2049）同步/异步迭代器：

```javascript
class Emitter {
  constructor(max) {
    this.max = max;
    this.syncIdx = 0;
    this.asyncIdx = 0;
  }
  *[Symbol.iterator]() {
    while(this.syncIdx < this.max) {
      yield this.syncIdx++;
    }
  }
  async *[Symbol.asyncIterator]() {
    while(this.asyncIdx < this.max) {
      yield new Promise((resolve) => resolve(this.syncIdx++));
    }
  }
}
const emitter = new Emitter(5);
for (const x of emitter) {
  console.log(x);
}
for await (const x of emitter) {
  console.log(x);
}
```

* for-await-of 循环可以**同时处理同步与异步可迭代对象**；
* 异步迭代器会**保证每次迭代时，代码的按顺序执行**（即使后面的值先于前面的值解决）；
* 被拒绝的 Promise 会导致异步迭代器提前退出；

### ECMAScript 不一致性记录（部分出于“兼容性”原因）

1. `typeof null` 结果为 object；
2. `typeof NaN` 结果为 number（虽然为了保持 IEEE-754 定义上的一致性，但作为动态语言，可以在 Runtime 实现层进行语义优化）；
3. `parseInt("0o10")` 八进制无法得到正确的结果，与十六进制形式 `parseInt("0x10")` 不统一；
4. `String.prototype.substr` 与 `String.prototype.substring` 从函数名上无法区分差异性；
5. `Array` 与 `new Array` 的结果一致，但对于其他结构化类型，则必须使用 new 关键字进行初始化，否则会抛出 TypeError；
6. ES5（empty）和 ES6（undefined）方法对待数组空位的不同。
