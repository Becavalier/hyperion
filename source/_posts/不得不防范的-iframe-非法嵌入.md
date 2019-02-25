---
title: 不得不防范的 iframe 非法嵌入
intro: Web 工程师在 iframe 标签上的讨论一直不少，包括其可以用来进行跨域，以及便于开发的特性。但从另一方面来看它的存在又不利于对页面进行 SEO 优化，并且同时会降低网站整体的安全性。说到 iframe 的安全性问题，利用 iframe 来非法嵌入正规官方网站的页面，同时在自己页面两边打着自己产品的标语，宣称自己与正规网站合作来推销自己产品的例子，并不少见。
comments: true
date: 2015-08-12 22:08:46
tags:
- JavaScript
---

Web 工程师在 `iframe` 标签上的讨论一直不少，包括其可以用来进行跨域，以及便于开发的特性。但从另一方面来看它的存在又不利于对页面进行 SEO 优化，并且同时会降低网站整体的安全性。说到 `iframe` 的安全性问题，利用 `iframe` 来非法嵌入正规官方网站的页面，同时在自己页面两边打着自己产品的标语，宣称自己与正规网站合作来推销自己产品的例子，并不少见。

那么应该如何保护自己的网站不被非法分子利用呢？其实很简单，一小段 JavaScript 代码即可：

```javascript
    if (window != top)
        top.location.href = window.location.href; 
```

即通过 JS 来判断当前页面所处的 DOM 对象是否是最顶层页面。因为在最顶层页面中，`window` 对象即等于 `top` 对象，如果不相等便将当前最顶层的页面（即非法分子的主页面）跳转到 `iframe` 中的页面。但是这段代码有一个问题，即自己的网站也无法使用 `iframe` 来嵌入自己的页面。解决方法很简单，我们稍微改进一下：
```javascript
    var myDomain = "abc";
    var webHost = top.location.href;
    var tempArr = webHost.split(".");
    if (tempArr.indexOf(myDomain) == -1) {
        if (window != top)
            top.location.href = window.location.href;
    }
```

通过 `top` 对象的 `href` 属性来判断当前顶层页面的域名是否为自己网站的域名即可。只需要把这里的 “myDomain” 替换成自己网站域名的二/三级域名部分。然后再把这段代码放入页面的 `onload` 事件中即可完成对网站的保护。
