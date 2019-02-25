---
title: event.target 与 event.srcElement
intro: window.event 是标准的 window 对象，它包含着事件发生时的状态，所以只在事件的发生过程中才会起作用。而在 window.event 对象中有一个名为 srcElement 的属性，代表着事件发生的源，即代表着事件发生时的 DOM 对象。
comments: true
date: 2015-02-13 21:06:41
tags:
- JavaScript
---

`window.event` 是标准的 `window` 对象，它包含着事件发生时的状态，所以只在事件的发生过程中才会起作用。而在 `window.event` 对象中有一个名为 `srcElement` 的属性，代表着事件发生的源，即代表着事件发生时的 DOM 对象。而 `target` 属性是从哪里来的呢？其实，`srcElement` 是 IE 浏览器中的原生属性，而 `target` 则是 Firefox 浏览器中的原生属性，两者的功能基本上是一样的。但是，在 IE 中却没有 `target` 属性，同样在 Firefox 中却没有 `srcElement` 属性。

在现在这个浏览器种类越来越多的时代，如何对这些对象和属性、方法进行统一，一直是一个让人头疼的问题。`window.evnet` 在前端开发中是一个经常使用的对象，它对于通过事件发生的相对位置来寻找元素有着很重要的作用，但属性名的不统一让前端开发变得越来越棘手。

所以为了使前端开发中的 `window.evnet.target` 属性和 `window.evnet.srcElement` 属性达到统一，我们可以在使用前定义一个可以统一获得此属性的函数，在函数中“和谐”掉多浏览器带来的差异化问题。示例代码如下：

```javascript
function getEventObj() {
  obj = event.srcElement ? event.srcElement : event.target;
  return obj;
}
```

这样便可以在使用 `srcElement` 或 `target` 属性之前通过函数进行自动选择，以便解决多浏览器带来的兼容性问题。
