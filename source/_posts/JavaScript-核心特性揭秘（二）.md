---
title: JavaScript 核心特性揭秘（二）
intro: 本文是《JavaScript 核心特性揭秘》系列的第二篇，这一系列的文章并没有按照由浅入深的顺序来写，旨在记录与分享，将碎片化的 JS 知识集中起来。囊括所有你需要知道的 Javascript 核心特性与技巧。文章内容如有错误，欢迎大家积极指正与交流。
comments: true
date: 2016-03-29 23:41:39
tags:
- JavaScript
---

本文是《JavaScript 核心特性揭秘》系列的第二篇，这一系列的文章并没有按照由浅入深的顺序来写，旨在记录与分享，将碎片化的 JS 知识集中起来。囊括所有你需要知道的 Javascript 核心特性与技巧。文章内容如有错误，欢迎大家积极指正与交流。

1. 从一个函数中返回另一个函数，这是一个常用的技巧。参考《Javascript 高级程序设计》给出的示例代码：

```javascript
function createComparisonFunction(propertyName) {
  return function(obj1, obj2) {
    var val1 = obj1[propertyName];
    var val2 = obj2[propertyName];
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  };
}

// 调用函数，并传递参数；
var data = [{ name: "Zachary", age:28 }, { name: "Nicholas", age: 29 }];

data.sort(createComparisonFunction("name"));
console.log(data);
```

JavaScript 的 `sort` 函数接受一个带有两个参数的函数用来自定义排序顺序。通过该函数返回的不同值来排列给定数组中的元素。上述代码中 `createComparisonFunction` 方法返回一个带有两个参数的函数供 `sort` 函数使用，在 `createComparisonFunction` 方法中按照用户指定的键来返回不同的排列函数。因此，每一个返回的匿名函数都是根据该方法和用户指定的键属性来动态生成的。

2. `arguments` 对象：该对象除了可以获得传入函数的所有参数之外，它还有一个名为 `callee` 的属性，该属性是一个指针类型，指向拥有这个 `arguments` 对象的函数本身。一般我们可以在递归函数中使用此属性，示例代码如下。

```javascript
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    // 此处的 arguments.callee 跟直接调用 factorial 函数效果相同；
    return num * arguments.callee(num - 1);  
  }
}
```

3.  `caller` 属性：在 ECMAScript5 中终于规范化了该属性，`caller` 属性中保存着调用当前函数的函数引用，该引用即指向调用当前函数的函数体。如果当前函数是在 `window` 作用域被调用，则该属性返回 `null`。一般为了实现松耦合，我们采用 `arguments.callee.caller` 的方式来代替 `object.caller` 方式调用该属性（此处 `object` 指代具体的函数对象）。

4. 使用 `call()` 和 `apply()` 来扩大作用域：这两个函数的基本作用都是在特定的作用域环境内调用其它函数，简单的说就是在其他环境下传递不同的参数，但它们的真正作用并非如此。我们可以用这两个函数来扩大函数运行的作用域，并保持对象与函数本身之间没有任何耦合，示例代码如下。

```javascript
window.color = "red";
var o = { color: "blue" };

function sayColor() {
  console.log(this.color);
}

sayColor.call(this);
sayColor.call(window);
sayColor.call(o);  // 在对象 o 的 this 环境内调用方法 sayColor；

// 使用 ECMAScript5 中定义的新函数 bind 来绑定 sayColor 内的 this 环境到对象 o 上；
var objSayColor = sayColor.bind(o);
objSayColor();
```

5. 不要使用 `Boolean` 对象：JavaScript 中提供很多基本类型的包装类，即对应基本类型的引用类型，使用时需要用 `new` 关键字来创建包装类型。而 `Boolean` 类型在 ECMAScript 中的用处不大。如下代码所示，使用 `Boolean` 对象常常会出现奇怪的现象给程序调试和扩展带来困难，所以不推荐使用。

```javascript
var falseObject = new Boolean(false);
var result = falseObject && true;
console.log(result);  // 输出 true；

var falseObject = false;
var result = falseObject && true;
console.log(result);  // 输出 false；
```

6. 不要使用 `Number` 对象：`Number` 对象和普通的整数变量在 `instanceof` 和 `typeof` 函数中会出现不一致的现象（一个为 Number 类型，一个为 Object 类型），所以同样不推荐使用。
