---
title: jQuery 源码江湖 - 初入江湖
intro: 马上要元旦了，2016年有很多计划都没有完成。那么新的一年到了，有些计划是时候提到日程上来了。这第一件事就是要写一个《jQuery 源码江湖》系列。为什么要写 jQuery 呢？因为之前经常用到并且也看过很多书籍和文章，但他们对 jQuery 源码的整体分析都并不够清晰和深入。废话少说，今天开篇 - 初入江湖。
comments: true
date: 2016-12-29 13:55:16
tags:
- JavaScript
- jQuery
---


马上要元旦了，2016年有很多计划都没有完成。那么新的一年到了，有些计划是时候提到日程上来了。这第一件事就是要写一个《jQuery 源码江湖》系列。为什么要写 jQuery 呢？因为之前经常用到并且也看过很多书籍和文章，但他们对 jQuery 源码的整体分析都并不够清晰和深入。废话少说，今天开篇 - 初入江湖。

本系列文章不会完整的阐述 jQuery 的基本用法，希望读者对 JavaScript 基础知识要有一定的了解。对原型链、词法作用域等有比较深刻的理解。本系列文章分析的 jQuery 源码版本为 “2.0.3” 版本，读者可以从 Github 上进行下载。由于我们在源代码上加入了一些注释信息，所以本文所展示代码的第一行行数为准确对应的源代码行数，第一行后的代码所对应的源代码行数可能由于加入了注释而并不与原代码的所在行一一对应。

从整体上来看，jQuery 源码的整体被包裹在一个 IIFE 结构中，如下代码所示。这个 IIFE 结构保证了 jQuery 内部不会对全局的 window 环境造成污染，同时也对 jQuery 内部的属性、方法和结构进行了封装。源码开头的注释部分详细标识了该 jQuery 源码的版本、发布时间，以及内部使用 Sizzle 库（主要提供复杂选择器的功能）的相关信息。包裹 jQuery 的 IIFE 结构有两个形参：第一个是 `window`，另一个是 `undefined`。而传入的实参却只有一个 window 对象。**直接将 window 对象作为参数传入 IIFE 结构有两个目的：**

**1. 可以缩短作用域链；**

我们知道，在一个对象内部查找方法时会沿着作用域链逐层向上查找，直到查找到最顶端的 window 对象才会结束。而将 window 对象作为参数传入 IIFE 结构，可以使我们在使用 window 对象上的方法时只在 jQuery 内部的作用域进行查找即可，不用再回溯到最上层的 window 对象，使得查找 window 对象上属性和方法的效率得到提升；

**2. 将 window 对象作为参数可以使 IIFE 内部使用的 window 对象标识符进行压缩，减少 jQuery 的代码量；**

但为什么只传入一个实参，而另一个形参 undefined 没有其对应的实参被传入？这样就导致该形参所代表的值即为 JavaScript 的基本类型 undefined（未被赋值形参的值为 JS 原始值 undefined），这个 undefined 值会在 jQuery 内部做一些类型判断的用处。**为什么要这样做？**因为在一些低版本浏览器中，undefined 可以被更改为其他值。当然除此之外，我们也可以用 `var x = void 0;` 来获得一个原始的 undefined 值。


```javascript
/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */

// 以 IIFE 的方式将 window 对象传进匿名函数，可以缩短查找 window 对象方法属性的时间，同时也利于源代码的压缩；
// JS 原始值 undefined 在低版本浏览器可以被修改赋值，所以这里以未赋值参数的形式来获取 JS 的原始 undefined 值；
(function( window, undefined ) {

  // 内部代码；

})( window );
```

让我们来看看 IIFE 结构内部代码的第一段（一共可能会分成几百段来讲）如下所示。这里定义了一些在 jQuery 内部使用的变量，包括一些防止库冲突的检测变量. 一些 JS 原生对象的方法. 库版本号，还有对于 jQuery 跟文档对象的索引。我们可以深入来看下被注释掉的 `use strict;` 语句。通过在 jQuery 的 BUG 跟踪器里查询第 “#13335” 号 BUG，我们可以看到之所以这句话被注释掉，是因为 `use strict;` 语句在 Firefox 某些版本中会导致微软的一些 JS 库中的 AJAX 请求失败。


```javascript
// Can&#39;t do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
// 严格模式在老版本 Firefox 上会出现微软类库的 AJAX 请求失败的问题；
//"use strict";
var
  // A central reference to the root jQuery(document)
  // 该变量等于 jQuery(document); 利于代码压缩，提高代码可读性；
  rootjQuery,

  // The deferred used on DOM ready 
  readyList,

  // Support: IE9
  // For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
  // 存储 undefined 的字符串模式，由于低版本 IE 上的 xmlNode 类型需要通过 typeof 来检测；
  core_strundefined = typeof undefined,

  // Use the correct document accordingly with window argument (sandbox)
  // 存储常用对象，利于代码压缩；
  location = window.location,
  document = window.document,
  docElem = document.documentElement,

  // 防止冲突，通过判断 _jQuery 和 _$ 是否为 undefined 来判断是否发生冲突；
  // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,

  // Map over the $ in case of overwrite
  _$ = window.$,

  // [[Class]] -> type pairs
  // 主要用于 $.type() 方法，使用 Object.prototype.toString.call() 来检测变量类型；
  class2type = {},

  // List of deleted data cache ids, so we can reuse them
  // 老版本与数据缓存有关 （该版本已无实际用途）；
  core_deletedIds = [],

  // 指定版本号
  core_version = "2.0.3",

  // Save a reference to some core methods
  // 存储一些常用的数组方法；
  core_concat = core_deletedIds.concat,
  core_push = core_deletedIds.push,
  core_slice = core_deletedIds.slice,
  core_indexOf = core_deletedIds.indexOf,
  // 存储 Object 对象的 toString 和 hasOwnProperty 方法；
  core_toString = class2type.toString,
  core_hasOwn = class2type.hasOwnProperty,
  core_trim = core_version.trim,

```

我们暂时不需要将上述变量的用处全部弄懂，在后面的文章里当我们用到对应的变量时，会进行详细的讲解。接下来源代码的第 61 到 64 行，这里是 jQuery 的构造方法。也就是我们平时使用 jQuery 时所调用的构造方法，比如 `$()` 和 `jQuery()` 这两种常用的调用方式，这两者其实是等价的。在该构造方法里，jQuery 直接返回一个对象，使得我们可以直接进行接下来的链式操作，进而省去了实例化的过程。实际上，jQuery 内部真正的构造方法是其原型链上的 `jQuery.fn.init()` 方法，而 jQuery.fn 实际上就是 jQuery 的显式原型 jQuery.prototype。


 ```javascript
// Define a local copy of jQuery
jQuery = function( selector, context ) {
  // The jQuery object is actually just the init constructor &#39;enhanced&#39;
		
  // 返回一个 jQuery 对象；
  // jQuery.fn = jQuery.prototype;
  // jQuery.fn.init.prototype = jQuery.fn (jQuery.prototype);
  return new jQuery.fn.init( selector, context, rootjQuery );
},
```

我们可以分别从如下所示源码的第 96 行和 283 行发现 jQuery 构造函数的整个结构，jQuery 为其内部的显式原型创建了一个别名 jQuery.fn，**别名的好处有两点：**

1. 可以使查找原型链上方法和属性的时间减少；
2. 利于代码的压缩。由于 jQuery 的初始化方法（构造方法）被放到在了原型上，因此为了使该对象可以继承 jQuery 原型上的方法，在第 283 行将 jQuery 的原型赋值给了 jQuery.fn.init 的原型；


 ```javascript
jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
```


 ```javascript
// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;
```

在对 jQuery 构造函数结构有了大体印象之后我们接着该构造函数往下看。源码的第 66 行到 82 行为 jQuery 的核心正则表达式，这些正则用来匹配不同的标签和特定的结构，我们在后面的选择器匹配的部分可以看到。core_pnum 主用用来匹配各类数字，包括带有正负号. 科学记数法. 小数的各类数字，由于 core_pnum 一般并不单独使用，所以这里返回了正则的字符串表示；core_rnotwhite 很明显匹配了所有非空白字符；rquickExpr 匹配了严格闭合的 HTML 标签；rsingleTag 匹配了单独的空标签，比如 `<p>`；rmsPrefix 匹配了 IE 浏览器的 CSS 前缀“-ms-”；rdashAlpha 匹配了横线连接的字符串，这两者会联合起来使用，用来进行带有浏览器内核前缀的样式名的驼峰格式转换。


 ```javascript
// Used for matching numbers
// 匹配数字
core_pnum = /[+-]?(?:d*.|)d+(?:[eE][+-]?d+|)/.source,

// Used for splitting on whitespace
// 匹配非空白字符
core_rnotwhite = /S+/g,

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
// Strict HTML recognition (#11290: must start with <)
// 检测 selector 是否是复杂的 HTML 代码；
rquickExpr = /^(?:s*(<[wW]+>)[^>]*|#([w-]*))$/,

// Match a standalone tag
// 匹配独立的空标签
rsingleTag = /^<(w+)s*/?>(?:<!--1-->|)$/,

// Matches dashed string for camelizing
// 匹配浏览器前缀，-ms-marign-left -> MsMarginLeft
rmsPrefix = /^-ms-/,
rdashAlpha = /-([da-z])/gi,
```

接下来是两个内部函数 fcamelCase 和 completed。

fcamelCase 主要用做 replace 函数的回调函数，结合第 552 行的 camelCase 函数我们可以看到，通过匹配 rmsPrefix 正则，首先会将一个类似于 “-ms-transform” 的带有 IE 内核前缀的样式属性标识符转换成 “ms-transform”，接下来通过匹配 rdashAlpha 正则和 fcamelCase 回调函数的替换规则，会把 “ms-transform” 最终转换成 msTransform，也就是转换成了一个 properity 属性的类型，比如这样调用时使用：`ele.style.msTransform`。

completed 函数主要用于 jQuery 的 ready 事件，这个我们会在接下来的文章进行讲解。

**深入：**通过查看 jQuery 的第 #9572 号 BUG 得知，这里之所以会为 IE 的样式标签进行单独处理，是由于微软在 IE 浏览器的带有浏览器内核前缀的样式进行 properity 转换时没有与其他浏览器达成统一。除 IE 外的所有主流浏览器都会将对应自己内核前缀的属性比如 “-moz-transform” 转换成大驼峰的写法即 “MozTransform” 应用在其 DOM 对象的 properity 里，而只有 IE 家族选择了小驼峰的写法，造成了这种尴尬的局面。


 ```javascript
// Used by jQuery.camelCase as callback to replace()
fcamelCase = function( all, letter ) {
  return letter.toUpperCase();
},

// The ready event handler and self cleanup method
completed = function() {
  document.removeEventListener( "DOMContentLoaded", completed, false );
  window.removeEventListener( "load", completed, false );
  jQuery.ready();
};
```

 ```javascript
// Convert dashed to camelCase; used by the css and data modules
// Microsoft forgot to hump their vendor prefix (#9572)
camelCase: function( string ) {
  return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
},
```
