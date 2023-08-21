---
title: 前端那些事儿 - URL 对象
intro: 在 W3C 最新的 “File API Editor's Draft, 19 April 2016” 草案中已经明确定义了“URL 对象”的相关属性和方法。“URL 对象”提供了一些专用的属性和方法以用来创建和处理 URL 相关的信息。本文列出了一些基本用法和介绍，在投入生产环境中使用时一定要先关注其**浏览器兼容性列表**，以防止出现兼容性问题。
comments: false
date: 2016-05-12 09:28:58
tags:
- JavaScript
---

在 W3C 最新的 “File API Editor's Draft, 19 April 2016” 草案中已经明确定义了“URL 对象”的相关属性和方法。“URL 对象”提供了一些专用的属性和方法以用来创建和处理 URL 相关的信息。本文列出了一些基本用法和介绍，在投入生产环境中使用时一定要先关注其**浏览器兼容性列表**，以防止出现兼容性问题。

**1. URL 构造方法：**

```javascript
url = new URL(urlString, [baseURLstring]);

url = new URL(urlString, baseURLobject);
```

其中第一个参数 `urlString` 为字符串类型，表示所构造的 URL 对象中的相对路径或绝对路径（若传入绝对路径，则 URL 构造函数会忽略第二个参数表示的基路径），第二个参数 `baseURLstring` 同样为字符串类型，代表所构造 URL 对象的基路径，即第一级目录的路径。若第二个参数选择传入一个 **baseURLobject** 对象，则其结果同传入 **baseURLstring** 实际上是一致的。因为对于 **baseURLobject** 来说，其本质是一个 URL 对象，当调用 `baseURLobject.toString()` 或者 `baseURLobject.toLlocalString()` 方法时会返回一个当前 URL 对象的字符串表示，这同直接传入一个字符串类型的 **baseURLstring** 参数来说是一样的。以下为一些例子：

```javascript
var urlA = new URL("/", "https://www.hangyu.site/");
console.log(urlA.toString());  // 输出 “https://www.hangyu.site/”；

var urlB = new URL("https://www.hangyu.site/", "https://developers.mozilla.com");
console.log(urlB.toString());  // 输出 “https://www.hangyu.site/”；

var urlC = new URL("/about/", urlB);
console.log(urlC.toString());  // 输出 “https://www.hangyu.site/about/”；
```

**2. 静态方法：** URL.createObjectURL(*blob*)：

该方法用来从一个 File 对象或一个 Blob 对象中创建对应该资源的 URL 对象。你可以理解为 `URL.createObjectURL(blob)` 方法会自动帮你从一个 File 对象或者一个 Blob 对象中创建一个对应该资源的引用，而通过该引用你可以直接在诸如 `<img>` 标签中的 `src` 属性里使用该引用对应的资源实体。

**3. 静态方法：** URL.revokeObjectURL(*blob*)：

对于每一个使用 `URL.createObjectURL(blob)` 方法创建的资源引用来说，当 File 或 Blob 资源不再使用时一定要通过 `URL.revokeObjectURL(blob)` 及时地进行释放，该方法会通知浏览器哪些 URL 引用资源不再使用，以便及时的清理和释放内存。

**4. 例子：**

```javascript
// 获取 URL 对象；
window.URL = window.URL || window.webkitURL;
// 初始化 XHR 对象，使用 AJAX；
var xhr = new XMLHttpRequest();    

xhr.open("get", "/img/image.jpg", true);
// 以 Blob 格式返回数据；
xhr.responseType = "blob";

xhr.onload = function() {
  if (this.status == 200) {
    var blob = this.response;
    var img = document.createElement("img");
    img.onload = function(e) {
        window.URL.revokeObjectURL(img.src); // 释放 URL 对象的引用；
    };

    // 创建对应于 Blob 资源的 URL 引用；
    img.src = window.URL.createObjectURL(blob);
    console.log(img.src); // 输出 “blob:https://www.hangyu.site/a94989f8-677b-4819-86ad-efee0fc377a4”；
    // ...  
  }
}
xhr.send();
```

**5. 浏览器兼容性列表：**

* Chrome 8.0；
* Firefox(Gecko) 4.0；
* IE 10.0；
* Opera 15.0；
* bSafari(WebKit) 6.0/7.0；


