---
title: 前端常见技术点 - HTML
intro: 这里总结一下 WEB 前端面试 HTML 部分的常见问题，同时这些问题也是对一些基础的技术概念和思想的理解。对这些基本知识的掌握程度和深度决定了你的技术层级。高级工程师是必须掌握本文列出的这些知识的，资深工程师则要对这些基本概念的纵向深度进行挖掘，【问题解答全部原创，转载请注明来源】。
comments: true
date: 2016-12-13 00:16:24
tags:
- HTML
---

这里总结一下 WEB 前端面试 HTML 部分的常见问题，同时这些问题也是对一些基础的技术概念和思想的理解。对这些基本知识的掌握程度和深度决定了你的技术层级。高级工程师是必须掌握本文列出的这些知识的，资深工程师则要对这些基本概念的纵向深度进行挖掘，【问题解答全部原创，转载请注明来源】。

### HTML 技术部分：

#### 1. !DOCTYPE 的作用？严格模式与混杂模式如何区分？有何意义?

根据 “<!DOCTYPE>” 是否存在选择呈现模式，被称为 **<!DOCTYPE> 切换或 <!DOCTYPE> 侦测**。

一个文档类型标记的目的是要：**告诉浏览器解析器，它应该使用什么样的文档或规范（DTD）来解析文档格式**。

* **严格模式：**正确的 <!DOCTYPE> 标记，浏览器将按照标准渲染页面。
* **混杂模式：**若 <!DOCTYPE> 标记不存在或格式不正确会导致文档以混杂模式呈现，该模式下页面将会以一种比较宽松的向后兼容的方式来显示。

**意义：**当浏览器厂商开始创建与标准兼容的浏览器时，他们希望能够确保向后兼容性。这里我们可以用如下所示代码来判断当前文档的解析模式：

```javascript
document.compatMode === "CSS1Compat" ? "标准模式" : "混杂模式";
```

#### 2. HTML5 为什么只需要写 <!DOCTYPE HTML>？

HTML5 不基于 SGML，因此不需要 <!DOCTYPE> 对 DTD 进行引用，但是需要其来规范浏览器行为。而 HMTL4.01 是基于 SGML 的。

#### 3. 行内元素有哪些？块级元素有哪些？空元素有那些？

* **行内：**span、strong、em、img 等；
* **块元素：**div、p、h1-h6 等；
* **空元素：**hr、br 等；
* **行内块元素：**input、textarea、keygen、select、button 等；

#### 4. 常见的浏览器内核

* **Trident内核：**IE；
* **Gecko内核：**Mozilla Firefox；
* **WebKit内核：**Safari、Chrome、Edge；

#### 5. title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？

title 在 SEO 的权重中比 h1 要高，strong 着重内容，b 无强调或着重意味的粗体；em 强调内容，i 无强调或着重意味的斜体。

#### 6. 简述一下你对 HTML 语义化的理解？

* 为了在没有 CSS 的情况下，页面也能呈现出很好地内容结构、代码结构；
* 增强用户体验；
* 利于页面的 SEO；
* 方便其他设备解析；
* 便于团队开发和维护，语义化更具有可读性；

#### 7. HTML5 离线储存的工作原理？

```html
<!-- 为 <html> 标签添加如下属性 -->
manifest="index.manifest"
```

```html
<!-- index.manifest -->
CACHE MANIFEST
#version 1.3
CACHE:
	/images/logo.png
NETWORK:
    *
```

```javascript
// applicationCache 对象存储着很多与 Application Cache 有关的方法和属性；
window.applicationCache
```

#### 8. 如何在页面上实现一个圆形的可点击区域？


```html
<img alt="Planets" height="126" src="planets.gif" usemap="#planetmap" width="145" /><map name="planetmap">
  <area alt="Sun" coords="0,0,82,126" href="sun.htm" shape="rect" />
  <area alt="Mercury" coords="90,58,3" href="mercur.htm" shape="circle" />
  <area alt="Venus" coords="124,58,8" href="venus.htm" shape="circle" /></map>
```

#### 9. 如何实现浏览器内多个标签页之间的通信？

利用本地的 Cookie，SessionStorage，LocalStorage，WebSql，Application Cache，IndexedDB 等。

#### 10. HTML5 的 form 表单如何关闭自动完成功能？

设置属性 `autocomplete` 为 "off" 以关闭自动补全功能。

#### 11. label 标签的 for 属性有什么作用？

`for` 属性规定 label 与哪个表单元素绑定。当用户点击 label 时，焦点会自动跳转都对应的 input 输入框上。

#### 12. iframe 有哪些缺点？

* 不利于页面的 SEO；
* 网页结构化差；
* 增加 HTTP 请求；

#### 13. WebSocket 如何兼容低浏览器？

使用 AS3 编写的 Flash 版本；或者使用轮询来代替 WebSocket。

#### 14. 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的？

访问离线资源，同时检测 manifest 文件是否更新，如果更新了则从服务器拉取新的资源并缓存在本地 Cache。

#### 15. 页面可见性（Page Visibility）API 有哪些用途？

```javascript
// 监听 visibilitychange 事件；
// document.hidden 返回当前页可见还是不可见；
// document.visibilityState 返回页面的可见状态；

// 主要应用场景为页面不可见时自动暂停网页播放的视频，当可见时继续播放；
var audioElement = document.getElementById("audio_id");
function onVisibilityChanged(event) {
  var hidden = event.target.webkitHidden;
  if (hidden) {
    // 伪代码；
    audioElement.pause();
  } else {
    audioElement.play();
  } 
}
function load() {
  audioElement.play();
  audioElement.loop = true;
  document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
}
```

#### 16. Cookies、Session,、SessionStorage 和 LocalStorage 的区别？

Cookies 可以简单的理解为客户端浏览器的一种本地存储（4K）方式，对应于每一个不同的客户端都有一个不同的 “Session ID”，这个 ID 一般会存储在本地的 Cookie 中（也可以通过 URL 携带，但不安全）。并且在每次发送请求时携带上这个 Session ID 用来在服务器端区分用户身份；SessionStorage 是一种大容量（5M）的会话级别的本地存储方式；LocalStorage 是一种持久化的本地数据存储方式。所有的存储方式都需要同源（页面属于相同域名和端口）才能共享。

#### 17. HTML5 Web Workers：

可以把耗时操作放在独立的 Web Worker 中运行，这样不会阻塞整个页面的脚本执行。Workers 与主线程之间可以通过 `postMessage` 方法进行双向的通信。


```javascript
if(typeof Worker !== undefined) {
  var worker = new Worker("./worker.js");
}

worker.addEventListener("message", function(msg) {
  // deal with message from worker thread;
  msg = eval("({}&&" + msg.data + ")");
  if (!msg.result) {
    worker.terminate();
    console.log("Worker thread terminated!")
  }
});

// worker.js
;(function() {
  setTimeout(function() {
    postMessage(JSON.stringify({result:false}));
  }, 5000);

  onmessage = function(evt) {
    var d = evt.data;
    postMessage(d);
  }
})();
```
