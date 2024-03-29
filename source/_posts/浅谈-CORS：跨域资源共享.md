---
title: 浅谈 CORS：跨域资源共享
intro: 今天在公司做项目时遇到了这样一个问题：公司所有后端的数据接口都位于相同一二级域名不同三级域名的域名服务器上，例如业务处理位于域名“a.abc.com”的服务器上，而数据接口位于域名“b.abc.com”的服务器上，两者的域名有着相同的一二级域名和不同的三级域名，即两者不同源。而这时在业务处理层有一个需要用 AJAX 请求来调用数据接口的方法，那么现在问题来了。
comments: true
date: 2015-08-11 23:06:19
tags:
- HTTP
---

今天在公司做项目时遇到了这样一个问题：公司所有后端的数据接口都位于相同一二级域名不同三级域名的域名服务器上，例如业务处理位于域名 “a.abc.com” 的服务器上，而数据接口位于域名 “b.abc.com” 的服务器上，两者的域名有着相同的一二级域名和不同的三级域名，即两者不同源。而这时在业务处理层有一个需要用 AJAX 请求来调用数据接口的方法，那么现在问题来了。

由于业务处理和数据接口分别位于两个有着不同二级域名的服务器上，所以这时由 “a.abc.com” 发起的对 “b.abc.com” 的 AJAX 请求便会被 “b.abc.com” 拒绝，并且浏览器的 Console 控制台也会抛出相应的错误提示 “No 'Access-Control-Allow-Origin' header is present on the requested resource.”。众所周知，这是由于浏览器的“同源策略”导致的。同源策略是指两个位于不同源的站点之间无法互相访问各自的 JS 脚本或者 Cookie 信息。而同源是指：域名，协议，以及端口相同。

同源策略的出现是为了保障 Web 的安全考虑，也是浏览器最核心的基本特性。虽然其带来了 Web 安全性上的提升，但同时也导致了 AJAX 无法同时向不同源的服务器请求数据，因此开发人员也想出了一些技术来解决它所带来的问题，比如 JSONP、XHR2 等技术。但毕竟不是专为“跨域”提供的解决方案，所以从各个方面来讲这些技术并不能作为解决该问题的最好标准。

无独有偶，W3C 在最近的草案中发布了专门为解决“同源问题”的技术 — “**CORS**”，CORS(Cross Origin Resource Sharing) 全名为“跨域资源共享”。CORS 使用起来非常简单，只需要服务器端向来自非同源的 AJAX 请求返回一个特定的响应标头即可通过跨域进行正常的访问。比如在含有数据接口的 PHP 页面中包含以下语句即可实现 AJAX 的跨域资源请求。

```php
header("Access-Control-Allow-Origin：*");
```

这里代码中的“\*”号表示接受来自所有域名的请求，但这样做会存在安全性问题，所以并不推荐。只需将“*”改为需要发送请求的它特定域名，例如上文中提到的“a.abc.com”即可实现较为安全的跨域资源请求。现在的大部分浏览器已经支持 CORS，所以可以放心大胆的使用了。
