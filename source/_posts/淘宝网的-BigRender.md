---
title: 淘宝网的 BigRender
intro: 在上一篇博客里我们讲到了来自 Facebook 的 BigPipe 技术是怎样通过减少请求数量，同时使浏览器和服务器可以并行处理来达到最大程度提升首屏加载效率的目的的。而相对的，淘宝网的 BigRender 技术则是一次性从服务器将资源全部输出，那么他是如何效仿 BigPipe 技术的呢？
comments: true
date: 2017-04-26 09:24:55
tags:
- JavaScript
- BigRender
---

在上一篇博客里我们讲到了来自 Facebook 的 BigPipe 技术是怎样通过减少请求数量，同时使浏览器和服务器可以并行处理来达到最大程度提升首屏加载效率的目的的。而相对的，淘宝网的 BigRender 技术则是一次性从服务器将资源全部输出，那么他是如何效仿 BigPipe 技术的呢？

BigPipe 技术的整体思路是先输出页面整体布局，然后逐步输出脚本块，一边输出一边执行，将内容渲染回页面布局中。这样可以让服务端的运算、网络传输和浏览器端的渲染变成并行。BigPipe 最主要解决的问题是服务端的运算时间，当服务端的运算时间大于 300~500ms 时才能体现出优势。当服务端响应非常快（小于100ms），BigPipe 则退化为下面要讲的 BigRender。

BigRender 的思路是将首屏需要渲染的 DOM 数量降为最少，把那些区块的细节内容放到首屏加载之后再逐步渲染出来。而这些需要延迟渲染的内容会全部以 HTML 的形式放到页面中的一个隐藏的 **textarea** 中作为值保存起来。

那么为什么要使用 textarea 作为非首屏加载的 HTML 代码的存放容器呢？因为 textarea 是一种 RCDATA 类型的 HTML 元素。RCDATA 的解析规则可以使我们避免遇到在处理字符转义上的问题。并且获取一个 textarea 元素里的内容也十分简单方便。


```html
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <style type="text/css">
    [lazy-render] {
      display: none;
    }
  </style>
</head>
<body>
<div id="sidebar"></div>
<div id="main"></div>
<textarea id="render-main" lazy-render>
  <p>Main Content</p>
  <ul>
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
  </ul>
</textarea>
<textarea id="render-sidebar" lazy-render>
  <p>Sidebar Content</p>
  <ul>
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
</textarea>

<script>
  // DOM 加载完毕后开始渲染；
  document.addEventListener("DOMContentLoaded", function() {
    // 控制渲染的间隔，防止重绘与回流引起页面的卡顿；
    var renderList = ["main", "sidebar"];

    renderList.forEach(function(i, index) {
    setTimeout(function() {
      document.getElementById(i).innerHTML = document.getElementById("render-" + i).value;
    }, 1000 + index * 1000);
    });
  });
</script>
</body>
</html>
```

