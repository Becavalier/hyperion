---
title: Promise A+ 调用详谈
intro: Promise A+ 规范是对 Promise A 规范的增强和补充，本文不会对 Promise A+ 规范进行详细的讲解，而会从应用的角度来对 Promise A+ 规范的实现流程进行梳理。我们会以 ES6 的 Promise A+ 实现的常用应用方式入手，最后从几段代码的剖析中结束文章内容。
comments: false
date: 2017-02-28 10:52:03
tags:
- JavaScript
---


Promise A+ 规范是对 Promise A 规范的增强和补充，本文不会对 Promise A+ 规范进行详细的讲解，而会从应用的角度来对 Promise A+ 规范的实现流程进行梳理。我们会以 ES6 的 Promise A+ 实现的常用应用方式入手，最后从几段代码的剖析中结束文章内容。

我们最常见的实现了 Promise A+ 规范的 `Promise` 对象用法如下代码所示。将需要耗时的异步操作放在 Promise 的“构造函数”里，当异步操作执行完后，根据 Promise A+ 规范，Promise 对象会返回一个 thenable 的对象。即一个含有 `then` 方法的对象或函数。`then` 方法中两个参数分别对应 Promise 对象的 `resolve` 状态和 `reject` 状态的结果（即一个成功结果，一个失败结果）回调函数，相应的结果会作为参数传递到对应的回调函数中。示例代码如下所示：


```javascript
new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve("SUCCESS");
    // return reject("FAIL");
  }, 2000);
}).then((resolveResult) => {
  console.log(resolveResult);
}, (rejectMessage) => {
  console.error(rejectMessage);
});
```


一个 Promise 对象应该含有三个状态：Pending 状态（可以迁移至另外两个状态）、Resolve 状态以及 Reject 状态。处于 Resolve 或 Reject 状态的 Promise 必须含有一个不可变的终止结果，即恒等（===）的结果，该结果不能在传递时中途被改变。

官方的 Promise A+ 规范中并没有提供对 `Promise.all` 和 `Promise.race` 方法的规范定义。对于处理 Reject 状态的回调，我们也可以用以下方式的 `Promise.prototype.catch` 方式来处理：


```javascript
new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve("SUCCESS");
    // return reject("FAIL");
  }, 2000);
}).then((resolveResult) => {
  console.log(resolveResult);
}).catch((rejectMessage) => {
  console.error(rejectMessage);
});
```


这里要讨论下 `then` 方法中两个参数方法的回调时机，可以看如下代码：


```javascript
console.log("script start");

setTimeout(function() {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(function() {
  console.log("promise1");
}).then(function() {
  console.log("promise2");
});
console.log("script end");
```


首先，要区分浏览器在解释执行 JS 脚本时存在的两个任务队列，分别是 “TaskQueue” 和 “Microtasks” 这两个任务队列。这两个队列分别对应处理以下相关事情。TaskQueue 主要负责存放和处理 script（脚本代码）, `setTimeout`, `setInterval`, `setImmediate`, I/O, UI rendering 相关的任务；Microtasks 主要负责存放处理 `process.nextTick`, `Promises`, `Object.observe`, `MutationObserver` 相关的任务。浏览器在解析 JS 代码时会优先执行 TaskQueue 中的排队任务，然后再执行 Microtasks 中的任务，接下来就是循环上述处理流程，直到所有任务均已完成。

运行脚本时，解释器会把当前 script 的运行作为第一个 task 放入 TaskQueue 中，首先输出 “script start”，接下来绑定 `setTimeout`。而 `setTimeout` 的回调函数则是作为 TaskQueue 中的第二个 task 来执行的，因此它会被放到 TaskQueue 中位于 script 任务之后。接下来 Promise 的 then 回调函数会被作为 Microtasks 中的第一个任务来执行。当最后一条日志 “script end” 被输出后，TaskQueue 中的第一个 script 任务执行完毕，此时解释器会开始处理 Microtasks 中的任务。这里需要注意的是，**只有在 Microtasks 中的任务被全部处理完毕后，解释器才会开始新一轮的 TaskQueue 处理，即处理 TaskQueue 中的下一个任务**。在处理 Microtasks 队列的任务时会连续输出 Promise 对象回调函数中的结果。

下面的代码可以加深你对 TaskQueue 和 Microtasks 的印象和理解。


```html
<div class="outer">
  <div class="inner"></div>
</div>
```


```javascript
var outer = document.querySelector(".outer");
var inner = document.querySelector(".inner");

// DOM 监听器；
new MutationObserver(function() {
  console.log("mutate");
}).observe(outer, {
  attributes: true
});

// 事件监听器；
function onClick() {
  console.log("click");

  setTimeout(function() {
    console.log("timeout");
  }, 0);

  Promise.resolve().then(function() {
    console.log("promise");
  });

  outer.setAttribute("data-random", Math.random());
}

inner.addEventListener("click", onClick);
outer.addEventListener("click", onClick);
```


首先，仍然是 script 作为 TaskQueue 的第一个任务来执行，绑定事件，设置 DOM 观察器。接下来点击 inner 区域，click 事件分发作为第一个 TaskQueue 的任务开始执行，接下来 `setTimeout` 的回调函数被作为 TaskQueue 的第二个任务进行排队。Promise 的状态回调函数作为任务被放入 Microtasks 队列，同理 `setAttribute` 触发了 `MutationObserver` 的绑定事件，这个事件也被作为任务放入了 Microtasks 队列中。当 Microtasks 中的任务执行完成后，由于事件冒泡机制，当前的 click 分发继续执行（**事件分发包括处理冒泡的过程，不会在 TaskQueue 中新增任务**），直到最后。

根据规范，Microtasks 存在的意义是：在当前 task 执行完，准备进行 I/O，repaint，redraw 等原生操作之前，需要执行一些低延迟的异步操作，使得浏览器渲染和原生运算变得更加流畅。这里的低延迟异步操作就是 Microtasks。原生的 `setTimeout` 就算是将延迟设置为 0 也仍然会有 4 ms 的延迟，它会将一个完整的 task 放进队列延迟执行，而且每个 task 之间会进行渲染等原生操作。假如每执行一个异步操作都要重新生成一个 task，将提高宿主平台的负担和响应时间。所以，需要有一个概念，在进行下一个 task 之前，将当前 task 生成的低延迟的，与下一个 task 无关的异步操作执行完，这就是 Microtasks。

说些其他的问题。如果是在 Node 环境下，`setTimeout(fn, 0)` 和 `setImmediate` 两个函数谁先被触发？可以看到之前我们提到的，`setTimeout` 和`setImmediate` 的回调函数均会被放到 TaskQueue 中来执行，为了解决这个问题，我们来看下 Node 中 timer 的实现过程：



```javascript
// https://github.com/nodejs/node-v0.x-archive/blob/master/lib/timers.js
exports.setTimeout = function(callback, after) {
  var timer;

  after *= 1; // coalesce to number or NaN

  if (!(after >= 1 && after <= TIMEOUT_MAX)) {
    after = 1; // schedule on next tick, follows browser behaviour
  }

  timer = new Timeout(after);
  ...
```


我们可以看到，`setTimeout(fn, 0)` 最终会被转换成 `setTimeout(fn, 1)` 来执行。因此从某种程度上来说，`setImmediate` 会先于 `setTimeout(fn, 0)`执行。但是无论如何，在 Node 中请直接使用 `setImmediate` 来执行异步方法。因为 `setTimeout` 在创建过程中可能涉及到红黑树的创建，性能较低。
