---
title: JavaScript 核心特性揭秘（一）
intro: 我们在日常使用 JavaScript（后面简称 “JS”） 的过程中可能只关注到了 JS 本身带来的，在页面动态交互方面的功能与其对应实现，而 JS 的背后到底是怎么运行代码和处理数据的呢？本文及接下来的几篇文章将会介绍一些 JavaScript 的内部核心特性。
comments: true
date: 2016-03-26 22:43:16
tags:
- JavaScript
---

我们在日常使用 JavaScript（后面简称 “JS”） 的过程中可能只关注到了 JS 本身带来的，在页面动态交互方面的功能与其对应实现，而 JS 的背后到底是怎么运行代码和处理数据的呢？本文及接下来的几篇文章将会介绍一些 JavaScript 的内部核心特性。

1. 在 JavaScript 定义函数的过程中，只为必须进行传递的 (Required) 参数“显式”的指定参数，其他可选参数请通过 `arguments` 数组进行传递；

```javascript
function myFunction(arg1, arg2) {
  var arg3 = arguments[2];
  var arg4 = arguments[3];
  console.log(arg1 + arg2 + arg3 + arg4);
}
// 调用函数，并传递参数；
myFunction(1, 2, 3, 4); // 输出10；
```

2. JavaScript 的五种基本数据类型（Undefined、Null、Number、String、Boolean）对应变量同 Java 一样均存在于**栈**上，只有用 `new` 操作符生成的**对象类型**不同，其对象的数据本身存在堆上，而该对象对应的引用则存在于栈上。

3. JavaScript 中函数的参数传递均为**值传递**（包括对象类型 Object），当传入的参数为基本类型变量时，变量本身不会受到影响。当传入的参数为一个对象的引用时，引用本身不会受到影响，即该引用所指向的对象地址不会改变，代码如下所示。

```javascript
function setName(obj) {
  obj.name = "ObjectA";
  obj = new Object();  // 使参数指向一个新的对象；
  obj.name = "ObjectB";
}
var person = new Object();
setName(person);
console.log(person.name); // 此处仍然打印 "ObjectA"，即引用本身不会被改变；
```


4. JavaScript 中的基本类型（Undefined, Null, Number, String, Boolean）变量在赋值给其他变量时会在栈上重新生成一个该变量对应值副本，而在将对象类型变量复制给其他变量时则仅仅复制该对象所对应的引用（指针），而不会复制存在于堆上的对象本身。

5. JavaScript 中有些语句不会产生块级作用域，比如在 `if` 语句内声明的变量可以在 `if` 语句之外使用，即 `if` 语句并不会产生新的块级作用域。同样的， `for` 语句和 `if` 语句均不会产生新的块级作用域。

6. JavaScript 垃圾收集机制有**标记清除**和**引用计数**两种方式：

* **标记清除：**即当变量进入环境时就为该变量标记为“进入环境”。而当变量离开环境时，同理会被标记为“离开环境”。“进入环境”的变量永远不会被释放。被标记为“离开环境”的变量将被视为准备被释放的变量，因为环境中所有的变量都已经无法访问到这些变量了。最后，垃圾收集器将会完成垃圾清理工作。

* **引用计数：**该方法的基本思路是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型的值赋给该变量时，则这个值的引用次数便加一。相反，如果包含对这个值引用的变量又取得另外一个值，则这个值的引用次数便减一。如果引用次数变为0，则垃圾收集器将回收该值所占用的内存空间。

通常大部分浏览器均会采用标记清除的方式来作为基本的垃圾回收方式，而早期的 “Netscape Navigator3.0” 浏览器则使用了引用计数的方式。但这个方式很快便暴露出了一个严重的问题，即“**循环引用**”。

```javascript
function myFunction() {
  var objectA = new Object();
  var objectB = new Object();
 
  objectA.instanceB = objectB;
  objectB.instanceA = objectA;
}
```

**循环引用**：是指对象 A 中包含一个指向对象 B 的引用（指针），而对象 B 中也包含一个指向对象 A 的引用（指针）。如上所示代码中，对象 A 和对象 B 通过各自的属性互相引用，在引用计数的方式中，对象 A 和对象 B 由于其引用次数永远不会变成0，因此对象 A 和对象 B 占用的内存永远不会被释放，而如果这些对象被大量生产和使用，则会有大量的内存被占用而得不到释放。因此后期 Netscape 放弃了引用计数的方式。这个问题在早期 IE9 之前的浏览器中的 DOM 对象和 BOM 对象中也曾存在，其根本原因是由于当时 IE 对 “COM” 对象的垃圾收集机制采用了引用计数方式。

7. 函数声明与函数表达式：

在 JavaScript 代码被解释运行时，代码解释器会率先读取函数声明，并使其在执行任何代码之前可用；至于函数表达式，则必须等到解释器执行到它所在的代码行，才会真正被解释执行。

```javascript
// sum 为函数声明，此段代码可以执行；
alert(sum(10, 20));
function sum(arg1, arg2) {
  return arg1 + arg2;
}
```

下面给出的代码中声明的函数 sum 为函数表达式，因此如果想要调用 sum 函数，只能够将调用过程放在 sum 函数的函数表达式之后再进行。

```javascript
// sum 为函数表达式，此段代码无法执行；
alert(sum(10, 20));
var sum = function(arg1, arg2) {
  return arg1 + arg2;
}
```