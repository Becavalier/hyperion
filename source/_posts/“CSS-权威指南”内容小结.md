---
title: “CSS 权威指南”内容小结
intro: “CSS 权威指南”之前看过一遍，第二遍把整书的知识点稍微总结一下，便于后面准备面试或查找问题之用。
comments: true
date: 2019-04-28 20:53:11
tags:
- CSS
---

#### CSS 和文档

* **替换元素 / 非替换元素**：img 为替换元素，即元素内容并非由文档内容直接表示；非替换元素如 p、span 等；
* **行内元素不能继承自块元素**：如 div 不能放在 a 标签里；
* **link 标签的 media 属性**：选择当前导入外部样式的应用媒体（all、print、screen 常用）；
* **永久样式表**：`<link rel="stylesheet" type="text/css" href="style-default.css" />`；
* **首选样式表**：`<link rel="stylesheet" type="text/css" href="style-default.css" title="Default" />`；
* **候选样式表**：`<link rel="alternate stylesheet" type="text/css" href="style-candidate.css" title="Big text" />`；
* **@import**：必须被放在样式表中的所有规则之前，否则会被代理忽略；

#### 选择器

* **部分属性值选择器**：p[class~="bar"] / p[class$="bar"] / p[class^="bar"] / p[class*="bar"]（包含单词、匹配结尾、匹配开头、包含子串）；
* **特定属性值选择器**：p[lang|="en"]（匹配以 “en” 或 “en-” 开头的元素）；
* **直接子元素选择器**：h1 > strong（匹配紧挨着 h1 的所有 strong 子元素）；
* **相邻兄弟选择器**：li + li（匹配紧挨着 li 的所有相邻 li 元素）；
* **选择器的特殊性值**：

1. 重要声明（!important）；
2. 内联样式：1 0 0 0；
3. ID 选择器：0 1 0 0；
4. 类、属性或伪类选择器：0 0 1 0；
5. 元素、伪元素选择器：0 0 0 1；
6. 通配符没有特殊性；

特殊性从左往右比较，相同特殊性的话**越后出现**其权重越大；

* **LVHA 顺序**：:link / :visited / :hover / :active；
* **单位 pt**：1in = 72pt；
* **ppi**：“Pixels Per Inch”，即每英寸的实际像素数（常用显示器一般高于96）；
* **单位 em**：相对当前元素的 “font-size” 属性值的偏移；
* **单位 ex**：所用字体中，小写字母 “x” 的高度，一般假设为相应 em 单位的一般；
* **像素理论**：使用 96ppi 作为参考像素；
* **关键字 inherit**：使该样式的值继承自其父元素；
≠
#### 字体

* **五种通用字体系列**：

1. serif 字体：衬线字体，成比例且有上下短线；
2. sans-serif 字体：无衬线字体，成比例但无上下短线；
3. monospace 字体：等宽；
4. cursive 字体：草书，模仿人的手写体；
5. fantasy 字体：其他类别；

用户代理会自动从当前计算机已装载字体中找到属于对应字体系列的字体来使用（可用作 font-family 的后备降级），注意区分字体与字体系列，如 `"serif"` 与 `serif`。

* **font-weight**：100-900 几个等级可以直接与对应加粗级别的字体匹配，每个数字至少与前一个数指定的加粗度相同。其中，400 通常对应 normal，700 对应 bold，其他数值可能对应于一些常用变形名。比如，Normal、Regular、Roman 以及 Book 通常被指定为 400， 而 Medium 被指定为 500（仅有的话会被指定为 400）。

* **font-size**：实际表示的是字体 em 框的大小；xx-small 到 xx-large 有七个绝对值大小，依次递增的缩放因子通常为 1.5。而相对大小 larger 与 smaller 的缩放因子通常为 1.2。字体大小的继承值是计算值，用户代理若每次计算时都取整，最终继承值可能会出现较大偏差。

