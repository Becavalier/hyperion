---
title: ECMAScript6 新特性 - 迭代器和 for-of 循环
intro: ECMAScript6 已经正式发布了一段时间了，作为一个前端开发者，是时候体验一下最新的 JavaScript 特性与改进了。相比 ECMA5 天花乱坠的改动，ECMA6 显得更加实用与稳重。今天让我来看一下其中第一个重要的新特性 - 迭代器与 “for-of” 循环。
comments: false
date: 2016-01-08 16:32:54
tags:
- JavaScript
---

ECMAScript6 已经正式发布了一段时间了，作为一个前端开发者，是时候体验一下最新的 JavaScript 特性与改进了。相比 ECMA5 天花乱坠的改动，ECMA6 显得更加实用与稳重。今天让我来看一下其中第一个重要的新特性 - 迭代器与 “for-of” 循环。

在 ECMAScript5 中，TC39 标准委员会便加入一个内建的新方法 forEach 以用来遍历数组，其用法如下所示：

```javascript
var myArry = new Array("Saab", "Volvo", "BMW");
myArray.forEach(function(value) {
  console.log(value);
});
```

但该方法的缺点也很明显，即：

1. 你不能使用 `break` 语句中断循环；
2. 你不能使用 `return` 语句返回到外层函数；

所以，在 ECMAScript6 标准中，标准委员会引入了一个新语句 “for-of” 来解决目前的尴尬问题。该语句的用法如下所示：

```javascript
for (var value of myArray) {
  console.log(value);
}
```

不但如此，for-of 还可以遍历其他类型的集合，比如：字符串、Set 对象集合、Map 对象集合；

```javascript
// 遍历字符串；
for (var chr of "ECMA6") {
  console.log(chr);
}

// 遍历 Set 对象集合；
var uniqueWords = new Set(words);
for (var word of uniqueWords) {
  console.log(word);
}

// 遍历 Map 对象集合；
for (var [key, value] of phoneBookMap) {
  console.log(key + " phone number is: " + value);
}
```

但需要注意的是，for-of 不支持遍历对象的属性，如果想要遍历对象的属性请使用 for-in 方法，或者使用 ECMA6 内建的 `Object.keys()` 方法来获得属性名对象：

```javascript
// 向控制台输出对象的可枚举属性；
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
```

**内部技术细节**：

在 ECMA5 中，所有的数组、Set 集合、Map 集合都有一个迭代器方法用来为 for-of 提供遍历帮助，for-of 循环首先调用集合的 `[Symbol.iterator]()` 方法，紧接着返回一个新的迭代器对象。迭代器对象可以是任意具有 `next()` 方法的对象；for-of 循环将重复调用这个方法，每次循环调用一次。你可以为所有的对象添加 `[Symbol.iterator]` 方法来使其支持 for-of 语句的遍历。所有可迭代对象都有类似如下的结构：

```javascript
var zeroesForeverIterator = {
  [Symbol.iterator]: function() {
    return this;
  },
  next: function() {
    return {done: false, value: 0};
  }
};
```

直接使用 for-of 语句进行遍历：
```javascript
for(var chr of myArray) {
  console.log(chr);
}
```

通过调用其内部的迭代器进行遍历：
```javascript
var $iterator = myArray[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
  var chr = $result.value;
  $result = $iterator.next();
  console.log(chr);
}
```