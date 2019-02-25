---
title: 前端那些事儿 - JavaScript 函数之 IIFE
intro: 说到 JavaScript（后面简称 “JS”）的函数，大家肯定都很熟悉，平时写 JS 代码的时候经常会用到自定义函数，简直再熟悉不过。那如果我说到 JS 里的 IIFE，你是否还会像对了解 JS 函数那样熟悉 IIFE 呢？
comments: true
date: 2015-11-30 20:57:46
tags:
- JavaScript
---

说到 JavaScript（后面简称 “JS”）的函数，大家肯定都很熟悉，平时写 JS 代码的时候经常会用到自定义函数，简直再熟悉不过。那如果我说到 JS 里的 IIFE，你是否还会像对了解 JS 函数那样熟悉 IIFE 呢？

英文的 IIFE(Immediately-Invoked Function Expression) 直译过来就是 - “立即调用函数表达式”，简单的理解就是当函数定义完之后会立即执行，如果我把 IIFE 翻译成“自执行的匿名函数 (Self-Executing Anonymous Function)” 你可能就会熟悉了。IIFE 这个名字是由 jQuery 的插件大牛 Ben Alman 推荐的一个对 JS 自运行匿名函数的更准确的叫法，相比“JS 自执行的匿名函数”，这种叫法也更加清晰和准确。

那么什么是 IIFE 呢？首先让我们来看看什么是 JS 的匿名函数：

```javascript
function () {
  console.debug("anonymous");
}
```

上边代码给出的就是一个 JS 的匿名函数。顾名思义，匿名函数就是没有名字的函数。但是上述代码却不能够被解释器正确执行，因为对于 JS 的匿名函数在使用之前必须要先进行**赋值**（返回给变量或者当作返回值返回，也就是所谓的闭包）如下所示：

```javascript
var myFunc = function() {
  console.debug("anonymous");
}
//调用
myFunc();

//闭包
function f1() {
  var n = 999;
  function f2() {
    alert(n);
  }
  return f2;
}
//调用
var result = f1();
result();
```

那么，什么是 IIFE，其实很容易理解。IIFE 就是一个能够在声明之后立即被解释运行的 JS 匿名函数。我们一般有三种常用的方式来声明一个 IIFE 函数，给出如下:

```javascript
(function(params) {
  console.log("This is My IIFE.");
}(params));

(function(params) {
  console.log("This is My IIFE.");
})(params);

!function(params) {
  console.log("This is My IIFE.");
}(params);
```

IIFE 就是定义之后可以立即执行的函数，比如通过以上三种方式定义的 IIFE 函数，浏览器都可以在解释到这些函数代码块时自动在**函数所在的空间**内部同时解释运行方法定义内部的代码。为了解释以上的代码为什么可以自动解释执行，我们还需要了解以下概念：函数声明和函数表达式。

函数声明，顾名思义就是声明一个函数。函数声明有一个非常明显的特性：函数声明提升特性（Function Declaration Hoisting）,意思就是在解释执行代码之前会先读取函数声明。这就意味着可以把函数声明放在调用它的语句后面。比如像这样：

```javascript
// 先调用，再定义；
myFunc();
var myFunc = function() {
  console.debug("anonymous");
}
```

而函数表达式，顾名思义就是一个带有函数定义部分的 JS 表达式，比如通常我们所说的表达式都是这个样子的：

```javascript
(a > b ? a : b);
```

表达式不需要定义，可以直接解释执行，而且每一个表达式都会返回一个 JS 的类型对象，这个对象可以是 Integer，可以是 Boolean，甚至是一个内存中的函数对象，而 IIFE 正是利用了表达式的这一个特性做到了自运行。比如下面列出的这种我们上文提到的常用的 IIFE 函数构造方法：
```javascript
(function(params) {
  console.log("This is My IIFE.");
})(params);

// (function(params) { console.log("This is My IIFE."); }) (1)
// (params); (2)
```

整个 IIFE 函数可以分成两部分，第一部分(1)中的小括号作为函数表达式，整个表达式会返回一个函数对象，第二部分(2)中的整个小括号则被解释器解释为调用了此返回的函数对象，并在小括号内传入了参数。而两个部分合起来，对于解释器来说就相当于直接调用了函数本身。所以实际上只要能够满足构成函数表达式加括号（参数）的形式就可以成功调用函数表达式的函数。比如以下列出的代码块都可以成功调用函数体内的代码。

```javascript
(function(a){
  console.log(a);   
})("MY IIFE");
  
(function(a){
  console.log(a);  
}("MY IIFE"));
  
!function(a){
  console.log(a);  
}("MY IIFE");
  
+function(a){
  console.log(a);   
}("MY IIFE");
  
-function(a){
  console.log(a);   
}("MY IIFE");
  
var fn=function(a){
  console.log(a);  
}("MY IIFE");
```

另外值得注意的是，括号的混合使用有双重意义：它可以用来执行一个函数，还可以做为分组运算符来对表达式求值。比如使用圆括号或方括号的话，可以在行首加一个分号，避免表达式被误用：

```javascript
;(function(params) {
  console.log("This is My IIFE.");
})(params);
```

那么使用 IIFE 的好处是什么呢？JS 中没有私有作用域的概念，如果在多人开发的项目上，你在全局或局部作用域中声明了一些变量，可能会被其他人不小心用同名的变量给覆盖掉，根据 JS 函数作用域链的特性，可以使用这种技术来模仿一个私有作用域，用匿名函数作为一个“容器”，“容器”内部可以访问外部的变量，而外部环境则不能访问“容器”内部的变量，所以 `(function(){ … })()` 内部定义的变量不会和外部的变量发生冲突，也被称为“匿名包裹器”或“命名空间”。

比如 JQuery 使用的就是这种方法，将 JQuery 代码包裹在 IIFE 函数中，当在全局作用域中调用 JQuery 代码时，就可以达到保护 JQuery 内部变量的作用了。