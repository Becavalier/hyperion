---
title: HTML5 随记录
intro: 在此总结记录一些 HTML5 相关的基础知识，主要内容包括一些不经常使用但是却又比较重要的 HTML5 特性。对于需要系统性了解 HTML5 特性的同学可以对照此文查缺补漏。但本文不会记录所有的 HTML5 特性，只挑选一些笔者不常用的特性加以记录与整理。
comments: true
date: 2016-07-27 22:45:25
tags:
- HTML
---

在此总结记录一些 HTML5 相关的基础知识，主要内容包括一些不经常使用但是却又比较重要的 HTML5 特性。对于需要系统性了解 HTML5 特性的同学可以对照此文查缺补漏。但本文不会记录所有的 HTML5 特性，只挑选一些笔者不常用的特性加以记录与整理。

**1、从 HTML4.01 到 XHTML 再到 HTML5：**

XHMTL 是一种更严格、更纯洁的 HTML 代码，W3C 制定了 XHTML 主要用于取代原有的 HTML。W3C 建议使用 XML 规范来加以约束 HTML 文档，将 HTML 和 XML 的长处结合在一起便形成了 XHTML。在 HTML4.01 和 XHTML 中需要指定 DTD（文档类型定义）来定义 HTML 文档的语义约束（支持的元素和属性），而在 HTML5 中则不再需要，这也算是一种“妥协式”的规范。

**2、属性值简写：**


```html
<!-- XHTML Request: xxx.php?x,y （x,y 为用户点击图像的相对位置）-->
<a href="xxx.php">
  <img src="xxx.jpg" ismap="ismap" alt="" />
</a>
<!-- XHTML 外部脚本会在当页面已完成加载后，才会执行 -->
<script src="xxx.js" defer="defer"></script>

<!-- HTML5 Request: xxx.php?x,y （x,y 为用户点击图像的相对位置）-->
<a href="xxx.php">
  <img src="xxx.jpg" ismap alt="" />
</a>
<!-- HTML5 外部脚本会在当页面已完成加载后，才会执行 -->
<script src="xxx.js" defer></script>
```

**3、语义化的文本格式化标签：**


```html
<em>定义强调文本，效果与斜体文本相似</em>
**定义重要文本**
<small>定义小字印刷体，诸如免责声明、注意事项、版权相关文字等</small>
<sup>定义上标文本</sup>
<sub>定义下标文本</sub>
<bdo dir="ltr">定义文本显示方向，左至右</bdo>
<bdo dir="rtl">定义文本显示方向，右至左</bdo>
<abbr>定义缩写文本</abbr>
<address>定义地址文本</address>
<blockquote>定义长引用文本</blockquote>
<q>定义短引用文本</q>
<cite>定义作品标题</cite>
<code>定义计算机代码</code>
<var>定义一个变量</var>
<dfn>定义一个专业用语</dfn>
<del>定义被删除的文本</del>
<ins>定义插入的文本</ins>
<kbd>定义键盘文本（计算机文档常用）</kbd>
<samp>定义示范文本</samp>

<!-- 以下为 HTML5 新增元素 -->
<article></article>
<section></section>
<nav></nav>
<aside></aside>
<header></header>
<footer></footer>
<time></time>
<mark></mark>
```


**4、其他标签元素：**


```html
<!-- 定义有序列表 -->
<ol start="2" type="I">
  <li></li>
</ol>

<!-- 定义图片映射 -->
<img src="xxx.png" usemap="imgmap"/>
<map name="imgmap">
<area shape="poly" coords="188,27,34,89,38,99" href="xxx.html" />
</map>

<!-- 标准表格 -->
<table>
  <caption>表格标题</caption>
  <colgroup>
  <col />
  <col span="2" />
  </colgroup>
  <thead><tr></tr></thead>
  <tfoot><tr></tr></tfoot>
  <tbody><tr></tr></tbody>&nbsp;   
</table>

<!-- <meter> 和 <progress> -->
<meter value="120" min="0" max="220" low="0" high="160">
<progress value="30" max="100"></progress>

<!-- 用 <base> 为页面所有链接指定基准链接 -->
<base target="_blank" href="http://xxx.com/">
```


**5、新增属性：**

```html
<!-- 
  “contentEditable” 属性： 使某一 HTML 的内容（innerHTML）可编辑（向下继承）；
  “isContentEditable” 属性：判断当前元素内容是否可编辑 ；

  *而对于全局的 HTML 页面，可以使用 “document.designMode = true;” 来使整个页面可编辑；
-->
<p contentEditable="true">这是一段可编辑的段落</p>
<!-- 设置 “hidden“ 属性为 “true” 相当于设置 “display: none;” 样式 -->
<div hidden="true">内容文字</div>
<!-- “spellCheck” 属性：若设置该属性，浏览器会对容器内的文本进行语法检查 -->
<textarea spellCheck="true">内容文字</textarea>
```

**6、表单部分：**

三种表单数据编码方式：

* **application/x-www-form-urlencoded**：

默认的编码方式，只处理表单控件里的 value 属性值，并将这些值处理成 URL 编码格式；

* **multipart/form-data**：

以二进制流的方式处理表单数据，上传文件时使用；

* **text/plain**：

一般在邮件链接（mailto: URL）时使用；

<br>

为表单控件添加 **tabIndex** 属性，便可以用 Tab 键来根据 `tabIndex` 的值转换各个控件的焦点。

使用 **label** 定义标签：`<label>` 标签可以自动与对应的表单元素相关联，当用户点击标签时对应的表单域会自动获得焦点。


```html
<!-- 显式关联 -->
<label for="username">Please input your username:</label>
<input id="username" name="username" type="text"/>

<!-- 隐式关联 -->
<label>Username: <input name="username" type="text"/></label>
```

使用 **button** 定义按钮：`<button>` 标签内部可以包含普通文本、文本格式化标签以及图像等等，这是相对于 `<input>` 标签的优势。


```html
<button type="submit"><img src="xxx.png"/></button>
```

使用表单的 **form** 属性：该属性可以使表单控件不用全部放到 `<form>` 标签内部，可以在外部指定表单的控件元素。


```html
<form id="form" action="">
  <input type="text" name="name" />
</form>

<!-- 利用 form 的 “id” 属性来进行关系连接 -->
<input type="submit" value="Submit" form="form"/>
```

使用表单的 **formaction** 属性：该属性可以使表单具备多提交入口的功能，即可以实现不同按钮提交到不同服务器接口的功能。


```html
<form id="form" action="">
  <input type="text" name="name" />
  <input type="submit" value="Submit Entrance One" formaction="interface_one" formmethod="get"/>
  <input type="submit" value="Submit Entrance Two" formaction="interface_two" formmethod="post"/>
</form>
```

使用表单的 **formtarget** 和 **formenctype** 属性：`formtarget` 属性可以动态改变表单提交所使用的 target 方式，`formenctype` 属性可以动态改变标题提交时使用的编码方式。
