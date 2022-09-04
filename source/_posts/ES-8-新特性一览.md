---
title: ES 8 新特性一览
intro: 已经脱离“前端组织”很久了，最近在看前端圈子的进展，发现 ES8 (ECMAScript2018) 已经于上个月发布了。快来看看有哪些新特性吧。2017 年前端迎来了很多东西，而从 Wasm 到 ES8，语言和技术开始走向融合，最终还是会迎来大团圆的结局。
comments: false
date: 2017-07-06 14:06:03
tags:
- JavaScript
---

已经脱离“前端组织”很久了，最近在看前端圈子的进展，发现 ES8 (ECMAScript2018) 已经于上个月发布了。快来看看有哪些新特性吧。2017 年前端迎来了很多东西，而从 Wasm 到 ES8，语言和技术开始走向融合，最终还是会迎来大团圆的结局。

#### 1、Object.entries()：

```javascript
// 返回一个该对象对应的键值对数组，使其可以用 for-of 迭代；
var obj = { foo: "bar", baz: 42};
console.log(Object.entries(obj));

// 只会生成非原型链上的对象数组；
var obj = Object.create({}, {
  getFoo: {
    value: function() {
      return this.foo;
    }
  }
});
obj.foo = "bar";
console.log(Object.entries(obj));

// 非对象参数会被强行视为对象;
console.log(Object.entries("foo")); 

// 将 Object 转化为 Map 对象；
var obj = { foo: "bar", baz: 42 }; 
var map = new Map(Object.entries(obj));
console.log(map); 
```

一个对象通常都有自己的原型,所以一个对象总有一个 “prototype” 键。不过，从 ES5 开始可以使用 `var map = Object.create(null)` 来创建一个没有原型的对象。一个对象的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。你可以通过 `size` 属性很容易地得到一个 `Map` 的键值对个数，而对象的键值对个数只能手动确认。

#### 2、Object.values()：


```javascript
// 枚举一个对象的值列表；
var obj = { foo: "bar", baz: 42 };
console.log(Object.values(obj));
```

#### 3、String.prototype.padStart() / String.prototype.padEnd()：


```javascript
// 从开头填充字符串（另一个从结尾）；
'abc'.padStart(10);         // "       abc"；
'abc'.padStart(10, "foo");  // "foofoofabc"；
'abc'.padStart(6,"123465"); // "123abc"；
```

#### 4、Object.getOwnPropertyDescriptors()：


```javascript
// 可用于浅拷贝对象，作用同 Objecet.assign；
Object.create(
  Object.getPrototypeOf(obj), 
  Object.getOwnPropertyDescriptors(obj) 
);
```

#### 5、SharedMemory 和 Atomics：

SharedArrayBuffer 用于开辟一块共享内存，该块共享内存可以在主线程和工作线程之间进行共享。可以通过 Atomics 对指定位置对共享内存进行操作。

```javascript
var sab = new SharedArrayBuffer(1024);
worker.postMessage(sab);
```

但由于安全问题，最新版本的 Chrome 暂未实现该特性。
