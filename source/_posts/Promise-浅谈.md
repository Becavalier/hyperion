---
title: Promise 浅谈
intro: Promise A+ 规范表面上解决了在 JavaScript 中异步调用过多会产生“回调地狱”的问题。但实际上，Promise 的核心思想，是回调函数控制机制的改变。以往的回调函数是被动的放在被调用的异步请求中，但基于 Promise 的规范，我们可以先获得一个“通知”，然后再根据情况进行处理。
comments: true
date: 2016-12-22 11:55:41
tags:
- JavaScript
---

Promise A+ 规范表面上解决了在 JavaScript 中异步调用过多会产生“回调地狱”的问题。但实际上，Promise 的核心思想，是回调函数控制机制的改变。以往的回调函数是被动的放在被调用的异步请求中，但基于 Promise 的规范，我们可以先获得一个“通知”，然后再根据情况进行处理。

传统的基于 Promise 的异步函数可以用如下方式来编写，构造出的对象为 thenable 对象，该对象可以直接被 Promise 调用，并返回一个 Promise 对象。批判性地看，Promises 所做的只是改变了你传递回调的地方。但由于 Promise 是一个有限状态机，因此我们可预见的结果只有 resolve 和 reject 两种情况，相比较之前回调函数的各种不确定性（回调被调用了几次？是否返回了正确的参数？返回参数是否可以认为本次回调已经完成？），我们在 Promise 中进行处理会保证回调的可靠性。


```javascript
// 构建异步方法，使用基于 PromiseA+ 的思想构建；
function myAsyncFunc() {
  this.i = 0;
}

// 该方法对象为一个 thenable 对象，可以被 Promise.resolve 转换成一个 Promise 对象；
myAsyncFunc.prototype.then = function(resolve, reject) {
  this.main(resolve, reject);
}

// 该异步方法的主要逻辑；
myAsyncFunc.prototype.main = function(resolve, reject) {
  var self = this;
  setTimeout(function() {
    // 处理业务逻辑；
    self.i = self.i + 100;
    resolve(self.i);
  }, 2000);
}

// 使用 Promise 处理异步事务；
Promise.resolve(new myAsyncFunc()).then(function(data) {
// 获得通知，调用其他异步方法继续处理数据；
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      // 处理接下来的异步业务逻辑；
      resolve(++data);
    }, 2000);
  });
}).then(function(data) {
  console.log(data);
}).catch(function(err) {
  // 通知被拒，或发生异常时在此处理；
  console.error(err);
});
```

Promise 可靠性的另一个保障的机制是 Promise A+本身规范的准则：

1. 如果 Promise 被 resolve，它要不是 success 就是 failure，不可能同时存在；
2. 一旦 Promise 被 resolve，它就再也不会被再次 resolve (不会出现重复调用)；
3. 如果 Promise 返回了成功的信息，那么你绑定在成功事件上的回调会得到这个消息；
4. 如果发生了错误，Promise 会收到一个带有错误信息的错误通知；
5. 无论 Promise 最后的结果是什么（success / failure），他都不会改变了。而你总是可以获得这个消息只要你不销毁该 Promise；

使用 Promises 是基于可靠性的。可靠性是：**基于 Promise 的状态是与外部影响隔离的，只有创建者能够改变**。在 ES6 的规范中，Promise 被规定为一个类，因此它可以被继承并实例化。但同样的规范放在 ES5 以前的环境下是无法做到的（保证一个 Promise 对象的 state 为私有属性）。

怎样解决？在 ES5 以下的环境中我们可以使用一个类似 ES6 的 WeakMap 结构来实现对所有 Promise 状态的全局引用，示例代码如下。但由于 WeakMap 的强引用机制，这种用法非常容易导致内存泄漏。


```javascript
var MyPromise = function() {
  // 初始化每个实例的状态（resolve, reject）；
  this.statsMap.set(this, 0);	
}
// 绑定一个全局的状态列表；
MyPromise.prototype.statsMap = new WeakMap();

// 构建方法；
MyPromise.prototype.then = function(cb_resolve, cb_reject) {
  if (this.statsMap.get(this) === 1) {
    cb_resolve && cb_resolve.call(this, "This is a resolved callback.");
  } else if(this.statsMap.get(this) === 0) {
    cb_reject && cb_reject.call(this, "This is a rejected callback.");
  }
}

MyPromise.prototype.showStatsMap = function() {
  console.log(this.statsMap);
}
```
