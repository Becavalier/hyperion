---
title: Prism.js 在 AJAX 下的应用问题
intro: Prism.js 是一款用于 Web 端的代码及语法高亮显示插件。整个 Prism 库的应用方法很简单，只需要在页面中加入 “Prism.js” 和 “Prism.css” 两个文件，并将要高亮显示的代码文本放置在特定的标签内即可。但是当 Prism.js 遇到了通过 AJAX 异步加载的内容，问题便出现了。
comments: true
date: 2015-01-12 18:24:24
tags:
- Web
---

Prism.js 是一款用于 Web 端的代码及语法高亮显示插件。整个 Prism 库的应用方法很简单，只需要在页面中加入 “Prism.js” 和 “Prism.css” 两个文件，并将要高亮显示的代码文本放置在特定的标签内即可。但是当 Prism.js 遇到了通过 AJAX 异步加载的内容，问题便出现了。

整个 Prism.js 库的运行机制都是在 Prism.js 的代码控制下进行的，因为 Prism.js 的代码高亮标签是非 W3C 认证的特殊名称标签，因此浏览器无法自动按照 Prism.css 里的样式来渲染代码段，所以每一次 Prism.js 的渲染过程都是在页面载入的时候进行的，即在 DOM 树加载完毕后运行 Prism.js 中的代码并根据 Prism.css 里的样式和高亮标签的属性控制进行渲染。

而在使用 AJAX 加载内容时，页面只是进行局部刷新，不会重新运行页面首尾部分的 JavaScript 代码，所以如果 AJAX 返回的结果中包含有用高亮标签标记的代码时，渲染会失去效果。

解决方案如下，仅供参考：

```javascript
if(typeof Rainbow != "undefined") {
  Rainbow.color();
}
```