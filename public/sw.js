/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "2014/12/23/数据结构-线性顺序表/index.html",
    "revision": "3c2526478ba9a0a13ee4da1a61cf81eb"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "e68f9e8dbd042f6aa0a88865e853a2f8"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "585795a03621c209c009450d3063bf86"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "3d3c9d6b7bc24263043d5e2ea1ca1fd6"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "24f042920f783c425519be08264b2d3d"
  },
  {
    "url": "2015/01/02/IT-行业的入门与精通/index.html",
    "revision": "1da8d3c3a54393477c4b5acc9e990d0e"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "715a8b561c7c7037ba7c8785dc2f6ea8"
  },
  {
    "url": "2015/01/06/深夜吐槽-笔试与企业文化/index.html",
    "revision": "63dcf6ece53f7d583f8d0e335008c47d"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "db70696f6665a278faa94a4136459032"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "41f4e996d45dc34c71282cbd05806671"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "59c876f46ec53f9158759e36bc6622ab"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "ada0a11827042d2b427e7f28db88aa80"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "f8c10a8dfec30bcceaddcb4634ee21f1"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "6755f4fd6298194fd43b7aafc6e38eb1"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "29653f614ca3140ed95ef9dfbeaeba10"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "5ac8ed0da9caad7133fc6556a3811218"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "77095ebabe40087983a2642366d6a64f"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "b48f6bebb181118e6c866905e4083974"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "b3d73cad5de12484cd9ad0bdf1e810de"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "1f976daa1208f2f3efc4423f9ebf2cc0"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "f51c4fbd0640c73285fbbfde869504e8"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "66199ed447ca031b3b2d9f8a8ca543ab"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "d4019c737b43c42c2abe69c16ecdb7ca"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "ab8b8afc0e85be203b43e1f2c3415616"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "294570161be3d2d5029b1bc3fa245dd0"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "c70dc0b0fc03c52196c36a529d3fe425"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "5abf959c42e5a004581f5e85292ab932"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "dd671c16c6890591e93ea021a0fc4d89"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "72bdec77106cba6fc7675878810fd757"
  },
  {
    "url": "2016/02/12/技术是成功的“绊脚石”/index.html",
    "revision": "4c3c74db456740029549443a61742b85"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "ce7ee8efbc3990ebd871b1c8ae11dde6"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "2dbc38a6b6039394061e691dd4adf4d0"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "866ee4d68e50deaab1e846b3817c978f"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "27b339a2b1170397a56d5cdffcd3faa4"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "cd32eeae774b8355d473c59c1234b4b8"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "7c64c7d21129adfb9a63bc9414de3a82"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "c66df8a676e93f4ab63af0389e2c3bd5"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "5abc2615e46c7e913053dc78a3b91ec4"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "e9bbf704644cc8071a457f041e6025fb"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "7302505de46cf2fe0e958d7a3edd1784"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "d937db8dff0d62dfa04c53ea90431fad"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "4297f9223054f17883a4c08797c26ea1"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "610c6ae41f9269f53d18b694e5996d18"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "3baeca59db2df1f797d082290e6ed0ca"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "8a0141a554dbb471c78e4113b015dcfa"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "da82e1a6adb6421f3cea1c8048e3a72c"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "0c6b43e9730d1bb8cd8060d564dd8d54"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "099645f2272a51b96dfd48824d3493d3"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "5aea6a9546e256638062c36e313d92fb"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "1f26c05c42deb46e4bce081ad6039510"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "eb546c3b65764debbff44367fa70b713"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "3a67441be58719302d9aab9d70b2cbcd"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "118d574f57b560ad873c1cb39ef8e38e"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "5dc9dd43779ac8745d1099dbc96bd21c"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "5174a54e07cbcc5155672c511a310682"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "b96a505ba167404c15daae0a1d19dd30"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "fcf1b48e154e225f491b690c27711bfd"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "109bb840c9b559a8b314bd232e1d5d52"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "34b5c6057e9a165c4820168d14fb3561"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "a20188dac176f241b3f38b83f63616cc"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "d6ef6d3b6f606c3fdff96f21a7eabdb4"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "ee0e4bb468760738f4153c9e9be8f9fa"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "194d5cd7c0afd57b705841837021afaf"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "61294a3ab4ed6005036d8be91a29ee5d"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "f0a81413945332e328b0e933bee3b118"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "2dc57ea0deab26c81e49d58f9a6f5864"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "ae1cece056eaf894e39153939d35d926"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "e50ccde05e3dcd86e65e95724ba97b6c"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "ca8e9e7535107a9029521516ad329c8f"
  },
  {
    "url": "2016/09/18/算法基础-常用排序算法（上）/index.html",
    "revision": "01d50450ae210197ecc50909cabb0c81"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "a78b469dd7eab22bfff1183d16dbe8a6"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "c4738956052ff7d541387d56938a5ead"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "22370e4ad3d91aa8ae4c4ab4af454026"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "5366474c9a143a70584af78aff80b2e7"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "a77f0e99a7b2eaec453f68ed496a2a11"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "edcff43308957e085495c52b97133d66"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "e03f8d8c96c84779a8dbc00858085eca"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "ab2204903d626729803874e640857383"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "23bc3671745dae1658ee73d70c7ae8dd"
  },
  {
    "url": "2017/01/16/2017-开篇/index.html",
    "revision": "afe29d1f11abec83e8262e231bc7e3f8"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "55be2eb0cdd34e65c9ba31b7f12101af"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "ece76a9a7b4af38f812fd6a2123434a1"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "bbce39480f2a54f4d39c40b0a488ccb4"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "c8700feb260b6fb47dd198c9be09fed4"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "04b010a77b85f954f50d3d3eebc1c2c0"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "b93b8e0e5b191c59847778d287388772"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "f37e4469b05e5a4025aaa468f29b5d9e"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "cbf92c1883885ae8f4c3c5ff2de04f6f"
  },
  {
    "url": "2017/04/29/“大型网站技术架构”总结：一，概述/index.html",
    "revision": "19959d57f3e759537d870e2fe8f05adf"
  },
  {
    "url": "2017/04/30/“大型网站技术架构”总结：二，网站的高性能架构/index.html",
    "revision": "fb5963ae45aee29dfb54f1f79d298a4d"
  },
  {
    "url": "2017/05/02/“大型网站技术架构”总结：三，网站的高可用架构/index.html",
    "revision": "0be3f52a8bfa241f4fa7d09a2774ba73"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "a9536a699a6227aadd971122d2b7a9a3"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "76175f202de6bf85d9520aed7163d3b8"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "4bcb4cde05730ffdaeaaf7acfbb8d6e8"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "7982132cc33d10a8a95225d356545248"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "65b4e6aadc0d375f4f005bd4cf0134b3"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "92d4a8ebf553db073b9aba5958160736"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "5a76ba63415eebdb5987365716e32590"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "99d5161db581a3a8201196dec9e0bb93"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "80a899d7db5fbfc65ec106aff9383040"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "32484d0051f071850e2d1684a1424474"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "53122de6c884281a955550b12cfc5bbe"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "e7ad4cddd1144386b5d3ffffb02fa48f"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "d36510cb96047a8ccf6da37b8e2ba5c0"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "d6718d0cddc29fc5affea50776a07c3e"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "40812c6ada682d76f422378273fdb0be"
  },
  {
    "url": "2017/06/29/Common-Lisp-全记录（一）/index.html",
    "revision": "3710205f576ebc9b2a1b405ecc71019c"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "e3d15e8ea642ea19828d1f5ad1590837"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "0386305a0587b3d7049a85ff0dff0f61"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "133847418b1ffe603bf03d5531c0ed7b"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "06b8e79d8b8ab1f113ea6d3026ed851b"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "8ccca016cae4a259842298b72488b5a2"
  },
  {
    "url": "2017/07/20/Python-高级用法/index.html",
    "revision": "fc7250ff1e7a22d3ef9202822189547e"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "eb0d928b1872ac372f7802f71fb52c32"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "679fe5e37a62b682e5e01438b3f65467"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "83287b43e9971ba9763050f966ad43b8"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "b92dfc45e9a9b5232fe0f346f712d03f"
  },
  {
    "url": "2017/09/30/一种新的共享计算力模式/index.html",
    "revision": "855f9a20efb2014844dcbb2a2853222b"
  },
  {
    "url": "2017/11/04/Docker-最佳实践（一）/index.html",
    "revision": "e7ea4329edf9a0b465b143014b605928"
  },
  {
    "url": "2017/11/07/Docker-最佳实践（二）/index.html",
    "revision": "76f64eeebe0f0599f8deea15ccdf7c51"
  },
  {
    "url": "2017/11/09/Docker-最佳实践（三）/index.html",
    "revision": "1ab8844e17474f5a10999d24b69f2c64"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "a84ce86ef671b59e5aa3f301a4302eca"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "48203d1ff302a275d042a0461b6bf50b"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "6c2684fff63d9b8995ea94ad356004a9"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "6cb0139651df4f0cd4a2c77a3056f6b9"
  },
  {
    "url": "2018/11/29/Git-最佳实践/index.html",
    "revision": "68bdca9629ea944afee4e15644e8c20d"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "40410b8134c15a2d265ad981c5907c12"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "48c60bbed6b494b0a6fcd603da48e9fd"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "b56d60d403745f0da10df34b640c77d0"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "94dbd0ae647a3a205c843cd8e3454603"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "ea0f63ebc1d0ef3053f804d18acb32e3"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "d6ad41063d2fe7ad7af19a80a45e33e8"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "0847bd87bda0e43dc97ef617e30b242f"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "6781990b114eadba5911f7e87b643bca"
  },
  {
    "url": "2019/03/17/女装之路-完全大揭秘/index.html",
    "revision": "27cfdc4d5a3d7b6094babadd9cbcfb10"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "ada0d1a66f94f8e0279405d9456ec832"
  },
  {
    "url": "2019/04/10/浅谈前端代码加密/index.html",
    "revision": "37366145ba2aa454b66bb0cae2d4878f"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "cdb5c4e995372a29e9599ce4004773e2"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "85bfb5f798cd43495fdfffd09d6ec5df"
  },
  {
    "url": "2019/04/28/“CSS-权威指南”内容小结/index.html",
    "revision": "99b8ac23aff2b796052febe39ca20e33"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "4768fa9487ac282be612f7625ce6a706"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "fccfe379c3eeb3160d7f7eafbd5ebbf6"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "9bd8398957dae86b38a057095412c2be"
  },
  {
    "url": "2019/08/23/54th-day-at-PayPal/index.html",
    "revision": "4eef007d046040d9199a284189daa8b1"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "54e2bb00115705d961c7213fb5366d51"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "08166aa027f85abf059e44819c06f6bc"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "522ea350aa23c03d7cf81d61a9109de2"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "45e64b70e70c7d73136a865d48314aab"
  },
  {
    "url": "2019/09/13/Privacy-Policy-for-TOVD/index.html",
    "revision": "fa4744b2451dfe6edcbe9c912ef14f7a"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "9352d417db849f37d8ec8a18a5041151"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "2ee2835e8f70f153d771e329c8726e03"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "7c185b159808569808fe7ccf60b2eb14"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "5c3deb773c58842c30252afc120d9e06"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "d8d9528b88c10d28cb180156cd009cae"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "55c299a67280f1a830d167db76ec5316"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "81762cf097d57994ab56d91af1649543"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第1-8章）/index.html",
    "revision": "dc8b15ebb03ebff42e7bf6d5eb9e5ab5"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第9-13章）/index.html",
    "revision": "aa3392d90cc2dcfc4410a4919d9ca5c0"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第14-16章）/index.html",
    "revision": "d02e3ca713d3f5e96b7c95ed7aae3a56"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第17-19章）/index.html",
    "revision": "0da5266516602f3256c85a26e601793f"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "7c7fb6e5a86dfe198f668317aec2880b"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "3b7be2b6e79852f159ad17318c6b9436"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "2fb1c534e5c987db19ccce68f85f8d91"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "7386ec4e9c23505dcf6561d10785c05d"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "085cb498f1f474a00b318c15b6e43d4b"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "656d4824b3d53734e8904a5ed9bfe19f"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "54ac22cc8c43854e03170fe588c9d1c3"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "82645b3c019a2e2a89f9d75bdb40c159"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "25545423ce73e6e6d1d612afd2b3f059"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "79a361c8c9fb760a03170222b45dee2a"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "eaec379c060bd7a05c37302a32f862e9"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "ed4bb7c90023b12d04b8679b3931a2c7"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "be3f1810be57fb1dfe1c378c4793abd7"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "c5048455297b641ae91111e9ca7a823b"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "48dfbbdc4b0cf6dbd84ffeb126cd96de"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "4ad51482fa7cdc13830d58245b964616"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "783fdf22a4cdfd3a6360c8a84c548692"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "da7f39f639cf7a7591b8f48dc0fe7d23"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "15ff06df01b21ea5b245322d3fa11b87"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "bb644d5f7f1e8083b3fc18dab5a9e56f"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（一）/index.html",
    "revision": "0ae20c3d1d7e6518bc5dbfd12318acfd"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "87803b2d989b24a9374fabd3edb1b66e"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "6ab6bf15afff0224e782072c896b9277"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "52e7012bc070e5ec403a35e63dd503f5"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "3f99c55cd06934bdb48b652ee0bd3966"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "bf4d305391e89975206cd4da7273958f"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "8567e2a3bbb6d042ba26f365767466cc"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "ddff6450237b4267696c38af2104de38"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（二）/index.html",
    "revision": "16f81a56531d379377f3180eff3c419a"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "e8dfcea90c07a08633d8dfac997b0303"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（一）/index.html",
    "revision": "cef7ab9154fc44fd6ef959756086d905"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "29587cf50c96de2ac5f8fc1d2d668e5e"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "da2721f0a823babd8fdce9ed52130817"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（二）/index.html",
    "revision": "8afa787094874ecfee12e3cfa474fe27"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（三）/index.html",
    "revision": "4dd920a0f8b3bbe715ecc1656d47708c"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "b0588fad49890f6abe30b47a3c780e83"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "63546878cf94eb0a738f1c5549c29064"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "00eea8f344a4c0caf09203e6ac76688b"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（一）/index.html",
    "revision": "37788a1b9ddd47a0f69442daee347c73"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（二）/index.html",
    "revision": "757782a349d1a3cdfc9c5e53e619e0d9"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（三）/index.html",
    "revision": "e55be86d316aa8dc90d51ef6b92f69e1"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（四）/index.html",
    "revision": "0cfb9be60a6e15e80f173d9a843bb6ed"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "3b709dff95e56c95cf83648d73c01be6"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "dabef3499cc87c66984664c3688f3e10"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "6ef996369f18f5e46983cf26a00fb9b9"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "011c231a63894460a87445ef14901578"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "5d9016730b335342d6b6eeb41f206229"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "7a0f7e306232f08e814c1e56dff8219f"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "a66891895a0383b7914fd265975cdccb"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "c65207e5a28276a0d1287916ca100eb4"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "19efe21f0a8a3821e86c8e0533533651"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（一）/index.html",
    "revision": "fb3ba00191ba839c5d21e65a619e7491"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（一）/index.html",
    "revision": "cb5ec7c8cac4f46e859aab1d91ffec42"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（二）/index.html",
    "revision": "807355456ca327796db9e365403813c9"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "848da164837731482350554bcc35b6d3"
  },
  {
    "url": "app-pdf-viewer/build/pdf.js",
    "revision": "4685c79b435ca899450c13c759df58ef"
  },
  {
    "url": "app-pdf-viewer/build/pdf.worker.js",
    "revision": "f1ba9892afcf79e861f054fec11db7b5"
  },
  {
    "url": "app-pdf-viewer/web/debugger.js",
    "revision": "f3c574d0c88bb5fed257a0d0c8e269e0"
  },
  {
    "url": "app-pdf-viewer/web/viewer.css",
    "revision": "b368a3db9ed31d839330ac656a4dbafb"
  },
  {
    "url": "app-pdf-viewer/web/viewer.html",
    "revision": "e88a8de0df988630f78d2a50f2a40aa1"
  },
  {
    "url": "app-pdf-viewer/web/viewer.js",
    "revision": "91588e8960ddad4116e0947b585a9523"
  },
  {
    "url": "archives/2014/12/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2015/page/3/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/04/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/page/3/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/page/4/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/page/5/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2016/page/6/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/06/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/page/3/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/page/4/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2017/page/5/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2019/page/3/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/06/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/06/page/3/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/page/3/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/page/4/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/page/5/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/page/6/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/2020/page/7/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/10/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/11/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/12/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/13/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/14/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/15/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/16/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/17/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/18/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/19/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/2/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/20/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/21/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/22/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/3/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/4/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/5/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/6/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/7/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/8/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "archives/page/9/index.html",
    "revision": "cdb8dbbcb2bb6db3553416aa79337ada"
  },
  {
    "url": "articles/index.html",
    "revision": "0a9db578648f9844c1487d882bb236c9"
  },
  {
    "url": "author/index.html",
    "revision": "cab9a0e2137038779b7f150657035061"
  },
  {
    "url": "books/index.html",
    "revision": "1aa27582f1d0e82b34661042eb0f3482"
  },
  {
    "url": "css/prism-line-numbers.css",
    "revision": "33fcb9c936d6640f7e23484e1b476145"
  },
  {
    "url": "css/prism-okaidia.css",
    "revision": "ea0c1dbeec6497812a4f6563058d7005"
  },
  {
    "url": "index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/10/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/11/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/12/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/13/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/14/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/15/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/16/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/17/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/18/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/19/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/2/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/20/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/21/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/22/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/3/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/4/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/5/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/6/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/7/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/8/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "page/9/index.html",
    "revision": "8e17c773c53abd69f2a93c7329769510"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "4aa61a040e19fd231b3f91dc2dfb44d5"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "ff8e573fb9739511a2a3ec8903b1fedd"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "42ae236a3b92614e5a084237c39f9bfa"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "f6b4bef011b751070abb63cbfffb21cf"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "3cac8cdcced8e404f3bf18864a943afb"
  },
  {
    "url": "readings/index.html",
    "revision": "86085f52eb5ea6dc7f76c351479ef1d0"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "1a6471f1bbbb0b4608a4f12641b26c98"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "5c67fee7a30fe60ffb425448180e4dc0"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "5e6f536f0507d4824499aa76a05c503c"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "0be62f2ecfa01dbd2ea6395c42f485a0"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "f611af9683d34129347f739b9ad7bf42"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "8fa860a3f0500c3841e1bf75697adcfe"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "601a65c31443c411642db13b57901f90"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "5fbe24cde61250776f8b16649d2fe56b"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "37e91b0e44a5faef4a9bdf5edd60f020"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "6a7c8157c7b0ec69e3c59c41ea19b3e1"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "db88fdf57187671ad7adeaa68ed1a3b9"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "567eb22a908d2c8b2be1b8262e1bc329"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "4c97ee5907b913cb40ce83ab72fbf93d"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "7aac7cb96e8a0646ea5cfb8d967b0d7b"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "71d42d2666a8fc3609f9f3316c11260d"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "8625340bca41279b61f1d760eee05e84"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "b28a574f8732b95069c2be081b71fe2c"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "06ddf5463673dd455d74126d94383117"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "63774023c2daee3e37e5411f8b735c17"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "fac4ae8a2df754cd621a9e1d45b08f3e"
  },
  {
    "url": "resume/css/font-awesome.min.css",
    "revision": "4e8a32562b8d4c0aad9e81b140ae5d99"
  },
  {
    "url": "resume/css/style.min.css",
    "revision": "e604fdf6f2206918ea2cd304baa80507"
  },
  {
    "url": "resume/me-en/index.html",
    "revision": "3fb83f682f806f0149da2b8a311aabe6"
  },
  {
    "url": "resume/me/index.html",
    "revision": "9f8ab148571c7340606271cddc2e92b9"
  },
  {
    "url": "scripts/book.js",
    "revision": "8d9ce61b7d89ebf8c6f27265b2df399a"
  },
  {
    "url": "scripts/index.js",
    "revision": "be6d0a9c12c553bbcaaadb0e95e0915e"
  },
  {
    "url": "scripts/post.js",
    "revision": "637f733e095ef886ecac97ec19e2e79f"
  },
  {
    "url": "scripts/search.js",
    "revision": "e8d86bf4029992646f5d078c980e39f1"
  },
  {
    "url": "search/index.html",
    "revision": "58aa9d41b5e2fbd38f287c70d4fcf02a"
  },
  {
    "url": "styles/fontawesome.min.css",
    "revision": "518853a35a6a551b2dee1757a370f2aa"
  },
  {
    "url": "styles/normalize.css",
    "revision": "9102c87f81d6c8b28570dda9e0b7b42c"
  },
  {
    "url": "styles/screen.css",
    "revision": "1d5f39ae1cbc0eedfdb1bf7bce9042ac"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "ead5da3368ad13c0e1f5aa9150aed830"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "4f71a6cf21628b1bd3413674c9b20a64"
  },
  {
    "url": "tags/ASM-js/index.html",
    "revision": "e075e1338004b3891a664b1ac3ee0956"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "3829334ede43b399c2ef0cd140699d8c"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "cf3ed335a9130fe3f4f3fc3363db6c1e"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "29e1b410627db1a7af93eae8e32b783e"
  },
  {
    "url": "tags/C/index.html",
    "revision": "d88e500477b3a91ae03f4547d87f446c"
  },
  {
    "url": "tags/C/page/2/index.html",
    "revision": "d88e500477b3a91ae03f4547d87f446c"
  },
  {
    "url": "tags/C/page/3/index.html",
    "revision": "d88e500477b3a91ae03f4547d87f446c"
  },
  {
    "url": "tags/C/page/4/index.html",
    "revision": "d88e500477b3a91ae03f4547d87f446c"
  },
  {
    "url": "tags/C/page/5/index.html",
    "revision": "d88e500477b3a91ae03f4547d87f446c"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "1560c2e198ec66db64bc154a394bda2f"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "9009ca3ad751a5426102c5a072067dbd"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "299f60ba62af1621395d1ca0f74e4157"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "b3680e5ab3966d48eb8cf03c09c409a2"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "e317da88f00cdcb14f70e2ea4e8b8fdd"
  },
  {
    "url": "tags/English/index.html",
    "revision": "532a18ad79e980535aac728107703adc"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "9a3e70d2ce37683ac91bbafe4e912536"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "aeca5e94727abf8fd6c0b8da3aa8ec67"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "0417fc0dfbaacae8d838832a7e426638"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "ce2bc5c99b61af3dd6232464d2c4e313"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "01c4cbc0ecc210d188dd1fc0c667fb6c"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "1b61a734de9c0102c718cb0ae7c5003b"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "d4a3987427b1356fae68c4c061181ed4"
  },
  {
    "url": "tags/index.html",
    "revision": "7967564fadd8308c7d5a5936e5b80944"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "19a35970ffa896627ce6c842e967ad35"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "96050bec37d64bd4191383b81e532b22"
  },
  {
    "url": "tags/JavaScript/page/2/index.html",
    "revision": "96050bec37d64bd4191383b81e532b22"
  },
  {
    "url": "tags/JavaScript/page/3/index.html",
    "revision": "96050bec37d64bd4191383b81e532b22"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "dea2db7a0868f4a6b98be4194c2dc6b3"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "7a28f11042422f1c01e410f83a463d91"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "975dab79283eaa3c476ef4c6b91d9876"
  },
  {
    "url": "tags/LeetCode/page/2/index.html",
    "revision": "975dab79283eaa3c476ef4c6b91d9876"
  },
  {
    "url": "tags/LeetCode/page/3/index.html",
    "revision": "975dab79283eaa3c476ef4c6b91d9876"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "d4c9644ced21ad234719b378591ffe3b"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "d16d333b43e796500fd099a98f50bed5"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "243fda57877578a04a1e99208d1dfb8a"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "abd05c99aebb6f16d7d477d9de0f4c20"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "a29979b1cd740f7dd2c1b69f52095df7"
  },
  {
    "url": "tags/Others/index.html",
    "revision": "531e7894cb45b6e4bc398f8f2abd21de"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "ecc30c5b192be792bb0738e8e67b58e3"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "062c53d9d2061027068e654713cb3802"
  },
  {
    "url": "tags/React/index.html",
    "revision": "a0d9b8affae2460450436bb2aa87ac01"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "bfce66ebb7d1a906500761cee02a23f8"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "a8880cf5cfd764bef4525a964781b245"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "06fdf0228b8076771f871c1e68f0238a"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "4dbe17be0576b6ecd254dbb502405a5e"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "7dd4d548254a9c80472ef9d13ece2da2"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "4e3bc747c1e453e7fea8129e01b3f554"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "af9f8250cc494dda6f522c0a6a47177c"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "d60fdc53d1f238c7d9a0add15fd34dec"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "6e1563de798a28245a77ec251a30c077"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "301495438ebb53bb5308a704c6b749e3"
  },
  {
    "url": "tags/WebAssembly/page/2/index.html",
    "revision": "301495438ebb53bb5308a704c6b749e3"
  },
  {
    "url": "tags/互联网/index.html",
    "revision": "ed6153d999c4be51040599ec9971c4f4"
  },
  {
    "url": "tags/互联网思考/index.html",
    "revision": "96c325c2ef949b0d221de75b69c6360d"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "237e43d0a8283226b9f7bdd1ee83aa36"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "1d6698ccddfbf234858560a2afe0eac9"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "5abb00d75d2ad8fb09734870fdcbbff1"
  },
  {
    "url": "tags/加密/index.html",
    "revision": "4a77ee9408645573d02cb6d5e1dfcdce"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "c5363f64652dd3c76a60bb77a7b2ef46"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "989290579a2ba64059189ad58be276ad"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "56bef73e36f873566712d4550cbe32be"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "8a34b7d04389527d26c5e20d1d2895bc"
  },
  {
    "url": "tags/女装/index.html",
    "revision": "baea7c72ba3b58acc947fb8bcd70b69e"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "b24dc5c21b29182b3993cd4915251350"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "dcf624aba07523168b0dea01f3cc7216"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "7d69abf9b2560085c9a1ef55f6bcdd4f"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "dc5d86eb6a344e5346b347cc89f5c602"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "3caf839958a83baafbf00fe03518a00a"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "9ca038ff505faa2ce83c544f6ff90e8e"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "e0065a4d36c76c95e64158f4b0dabc96"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "5041290e6d328e98362cc2a8ce2bcf10"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "822087c2eeb515a23db34f42178c5bb7"
  },
  {
    "url": "tags/算法/page/2/index.html",
    "revision": "822087c2eeb515a23db34f42178c5bb7"
  },
  {
    "url": "tags/算法/page/3/index.html",
    "revision": "822087c2eeb515a23db34f42178c5bb7"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "da964135da26d77d77ebc87f6339e4ce"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "beab61d4a48f0d2be545a13ede48971d"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "aa6b9ee0a84d2b7ef7e44b5b50172131"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "8370bf5be15aefd994f6fce9a039822a"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "0234533b40f64569cae020eeb1a9854b"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "90a63d4edb357ae8d0153829bd641c29"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "80e7abea9ea637f72b43aef0767f6e72"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "fbde226e348ce4f9ba89f725996cd270"
  },
  {
    "url": "tags/设计模式/page/2/index.html",
    "revision": "fbde226e348ce4f9ba89f725996cd270"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "85d462de955383306515ebd0fdd3d4f7"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "320a3d6dc4b84ebf17809195c1965924"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "a77f1de6b41b5ed0f85f0fdfa911b0bd"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "a2685c4b2c6ba085418191270e956661"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "007b6cf46e6faa0b493278553363224a"
  },
  {
    "url": "works/index.html",
    "revision": "6598307f3fa62c7376fc6c329ffb10a9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
