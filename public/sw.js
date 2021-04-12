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
    "revision": "e151f3a36a44dadd58c423cfbce8ded3"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "8003b9a9e6a211b5252c3e9ce4eb6dbd"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "df51ec12a384c42803668c683a66bd4b"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "af95f6eea9181dc31e8e822a4e1a151e"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "b4514001a7321b7f7ef4ba6319dcb5b9"
  },
  {
    "url": "2015/01/02/IT-行业的入门与精通/index.html",
    "revision": "9156d1d679ba0e5e45da4dbcbb98faac"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "a562d0bc08d8f5dd94f6d0a483337787"
  },
  {
    "url": "2015/01/06/深夜吐槽-笔试与企业文化/index.html",
    "revision": "24ffe3982cf0abcffc222f7c4ee5d2c2"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "e1c332d9711b74fd0a362487ba2f6df3"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "17e5cb38e8ca5e46a1075dda2bf26d93"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "18afff54458a9632d00bafcae25109c5"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "83e032b1b9b49733aaac09bf508be2ff"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "a9185a722a34ec34ce5b39d1d6fcc43a"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "76d1540733b72f03798dd74e2380cf3f"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "98b3f8592546805c70da6fb9da23cf13"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "be6b5050bd7a099e428de80b884ebcc9"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "cef7a71327a00cbaa99e32822708d474"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "78975674a519e9ec38af22486176e06a"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "279d3598ed1183e013053d04c55159bc"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "db65a6863d8015fec50a9f26ff6d4edf"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "a4046c95e82967c2d0746ec72de82f28"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "dd242f5600d93573a40d3651764ffc4a"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "730d0661c8db536856bf91a17530cb5e"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "b33e64a0f73944bba08646348e528204"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "c0aeea6bf49c2446eade77f0d993de80"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "7241ce207746eaad94eb90dec571ea16"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "913423dc4e0ccbcf8641eecf6e248d2a"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "cac33a4fe03615d39f974e04e8e2b4bd"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "d9ede415164a4c1d545944e3c10484b5"
  },
  {
    "url": "2016/02/12/技术是成功的“绊脚石”/index.html",
    "revision": "a5148d72ac8785a0af7a3904396fa2cf"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "e859edca1ba8cd32505c108f2a8e160f"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "3186ad7c12aa50382903bdad473d0bf0"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "524210a3d2f66e0e4cbb3fc96bc3f5be"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "67e8ba2516243704c7c7eaf1abb568fb"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "dccb73a0ba37d57f30c16c2f2dd206c8"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "846c6affb2a8d14ee91efcedbba0cc63"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "c0573ae5a03a8143660b8a002d3f2980"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "0aa469a5bb7a6961e538a589d380204c"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "8bd2faf0cbfb0c232be14d6cd15de624"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "2ddfbe801e06ba485f68811d0513ef16"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "587cb9099c39fceec20f0b0cf8e056a8"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "32a2b7e69e11e8c7cc3568bd54c50dc5"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "a87b91e533704b3e8ca77b55e192c5fc"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "4f3040da8b5658d3dea216a7a11a8c04"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "e083e8f689f22ea99e193cf0db4648a6"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "895d1b4cc15ea9faaecb41032d51ae98"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "2cd5a34aa5e8469b7aa6277ef3fe75e1"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "e6185b91805570fd8567be34d0ad4396"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "711c2f7b252f4cdb6446fbe47b598365"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "5745ddeed6fb6afc9e6d36c34d8d87fd"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "dd21a7c09dc2d31182f7ffd0b9146ab9"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "642e3970c5dd142d8fc53e46f816cb6e"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "072db386162d017cb764dcaf7ae3c719"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "410e686aa05937d644f1085547537cca"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "ab9a30125931c8ca9871feba7024d817"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "f26ea69180df045ef8ae882412646b3d"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "8c52b345d4d9817ec3f56961cde6c7b6"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "8c0e0d5bdd57d5991595fa8f2e3eafdb"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "852dabdf2759edf598f8d156b36722e6"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "c693292f310a4c0d62928d8646071887"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "d65b52483222790f498a98a8f3e35858"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "96a8e3aef20c9ef27e00cbe3eceeb482"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "82209f51c64a7deb529bfed17a4d9232"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "8d1f788e68e08d4cf2819499459afd55"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "eebe92003da8c2323a1de91921deb283"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "949063aa96b974b16e0e1e9a82e50d16"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "62a42d0a2b716d303a5521440692477c"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "428e983226fbd6ef0eb3a49ec649456d"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "b866d0e3a93f7f1dc83e842af69bbb96"
  },
  {
    "url": "2016/09/18/算法基础-常用排序算法（上）/index.html",
    "revision": "d0f715b24e30ee28aa4eab57e09232dc"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "38c1808fd0360ddfaf76767066a5aa08"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "ce8740b8d98a199ad54568c7716f4ed3"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "7cf907d043ae754747732dfc3d3ac6e6"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "ad83206ac109e28d26004f5d7e7c744f"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "df8e1f729deadd2f26e9763340a71a79"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "96dab93df952001a56237a14e8b0f441"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "ad3cae29c07f2bd9ca267dc02d89084e"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "8dedcae4270206ab690cf2331cb24e69"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "41f0d70b01b05bf8d10e1343615927dd"
  },
  {
    "url": "2017/01/16/2017-开篇/index.html",
    "revision": "0dbb2ff607caa06a3ec11d4744d7d4e6"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "6a8b74ac57ccdeacf3f19dcebcc02b29"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "132c669d011eb98e112dd3e49fe420a2"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "dda0c72d3e14c22e1d852c3d6b4d5c5b"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "1cf325b0ccef06ee24edb5443ee02309"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "db4c6fea3d5ea33222f2e3610e536824"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "23f68a7da2798c10a839ec31711558c5"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "bd083432bdade2bb1f1b468cd6a3027d"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "1a3d6d776eeebb01f9f26e3e0d8ab7b5"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "9092a1295a6416d6bda2bcfd2a376a44"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "bf3147e4af4090b5ffa6d38e4c4bc8cb"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "502ff1ef77ff1377bfd4c7fc134aa89c"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "44020999bacfa09ffda6d1497e3f4c2c"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "6e580538837f980c3985dffd26597e8a"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "f858a9683c969119671569223ec65dd1"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "cb019b79b89b57a2052aa76397eecb4f"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "70dfa0bdfc689e251eaa20e3e7d23216"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "11c541763d896845f5a1dc0301c196d6"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "b900f07b740d926f1b699c7919f870b5"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "174dc9197476016f722ad7fe34a3b6d0"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "2dc5c17d455fabeb30eb1f13e4ec6f76"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "39f8af366f6d08f0f89901577b2b147f"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "24cbfefece36f103fb3e8e0cc08d1193"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "1bb6417cce513d20191f0c9757baeeda"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "cb53f1add156aa2435651a729056454b"
  },
  {
    "url": "2017/06/29/Common-Lisp-全记录（一）/index.html",
    "revision": "e0484bc77c59de9b8a8676cc05f11266"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "6780402225b9f609d61f3d6b26875962"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "08868b504d6e734cf8cd3b482ea76d53"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "ce47a7f26b4feed697dc6b85d4400580"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "247730f24542e97d662b26a4664677a0"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "76cf5309be72b4f91e7efaf802e41540"
  },
  {
    "url": "2017/07/20/Python-高级用法/index.html",
    "revision": "caf6b4a46193a0544ee02b49162938cb"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "82febb3334c33aa701152d1b0232553f"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "5e50edd174aee44bf5139766bdfeaace"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "96f6b7fceec9e57cf61b006581929314"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "309787800c9b4c1045c71cd30fb83be1"
  },
  {
    "url": "2017/09/30/一种新的共享计算力模式/index.html",
    "revision": "ee0b5eed0859401fc51d598d07a597d6"
  },
  {
    "url": "2017/11/04/Docker-最佳实践（一）/index.html",
    "revision": "abbb89877d64014cd783cbf09ea1a9e6"
  },
  {
    "url": "2017/11/07/Docker-最佳实践（二）/index.html",
    "revision": "6df4b815e12109f02c22a1eb91bc9f5c"
  },
  {
    "url": "2017/11/09/Docker-最佳实践（三）/index.html",
    "revision": "6f4f29e722bbbb1969548d64e6ad1dcd"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "c82f65a3c0adfd487e45c7a094d14ed3"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "0df3be7dc5525cd539ac9a621fc89c08"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "085fa7a98e7246d6bece8003a8dfe7fe"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "9b38b55591514ed853e23eccf77d4826"
  },
  {
    "url": "2018/11/29/Git-最佳实践/index.html",
    "revision": "97cb43b373ddaa4f2f8742acd2ea688b"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "b817df629621e3f670d42985b6d28792"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "2f924cc723470e107df1d79fbc17dfa4"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "a5c870a1e63164d3fa51dd414960fa75"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "d3891ff4629fc4264c96072ec1c5364a"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "ce4f822a812f62f67be5eb18fc635ec4"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "0ba7341586d56db187318e3d47ab9768"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "554f7a294953ee5085d40a6c4bff6ca6"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "db18aeed170651e368aaa03cb7a511d9"
  },
  {
    "url": "2019/03/17/女装之路-完全大揭秘/index.html",
    "revision": "ea30d46e1211992e366afa69fa209cb9"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "b8f2a24332962743b3338d28f53a45e0"
  },
  {
    "url": "2019/04/10/浅谈前端代码加密/index.html",
    "revision": "1436c687d424b8ad5fa122614fc15fb9"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "49cd7e588962f9d6a180b65300a27af7"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "6fbea09ec3b1b85b06a03013ab34c17c"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "b691e2935ddcd928c35af9aad987d72a"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "4f63ec175ef481bf8500ec36fff11c85"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "ab2266b8c474900a1abc02b66f4a4e17"
  },
  {
    "url": "2019/08/23/54th-day-at-PayPal/index.html",
    "revision": "59e115df522b05c1e05102cdd56cab65"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "5ed44483ae3a2166bb810db9ce17885c"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "1148a28d586328deeba956a898cfc8c1"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "ca70f37fa46de97b2551cb94ea8d2ef6"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "ba3168efeb9d6fa03c60ca6c30b4ea8f"
  },
  {
    "url": "2019/09/13/Privacy-Policy-for-TOVD/index.html",
    "revision": "a1fe645ce9501db13e47f2c05082c0cc"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "91a29d009c7a8b48e0913e336294d52c"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "4e97c8fe6c388c57bf49faf442d341f4"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "9ee80c2de4b4f327071bc3c80d3ccd7a"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "ff886e3ab7c1a843756d81a966582eff"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "a26051b28a04995e923bc561fb978f5c"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "59204ebb2fea4fc5bfd4ed05950e9cda"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "0fd542fe068a6e7c6b4765df545b36e1"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "d2c70d196d436db14c07d3b98bdc15f8"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "52eb5dbeab603d26027b414e095e23f3"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "1764238ae30e36849f32126c61be80e7"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "cd312145236df5614db9cd23d529aeb3"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "b3b92baf5136c497ebd1ef423844f231"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "0d6d0028f7f21124dc2ad2079d422801"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "b60c4cbe45883ebb4e4d2002f373ec23"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "05014fe6006b194613eeaf49359245fb"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "6d90448c13f1401409545a6ea9da6c85"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "1187a5979cdaeecd23c8fd4087345919"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "2f41bc236c57ab6f467a96f67b967ff8"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "a3b92b7c894ad3c2a666945caa0083f2"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "e6e487823a015b80946fb6fd846259c6"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "0d7d32536d98474e2711c4496bc4782a"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "16a6802c593bb7c3b8712a628ef18f68"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "438c648cab800d5abf8ce9e83c1635cd"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "7673a505464140318daa6703a1847cfe"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "74044ceee08d7002977c6238138cb6a3"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "9ab90f69f0b160e3e4fbfd5ccbc9b8df"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "9eed3dedcbcb96a837ac9d13c02120ec"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "3f8cf49fc900c0f87fa68f3a755f67e4"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "60809c072af82286d9bc3a731612287a"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "2fd62715976a9250b3e68741600c2157"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "20271f30d044d10cba4c5557dc143413"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "29a447876ed38a03a36a74d65ada0077"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "cad438f67b152994dfced107f511b91f"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "74385084ac0362f555096d5b5b610f32"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "2bc2793f49048e08f3f6193f91d9e1f6"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "cddc254b525c5d5dbec6ccf072199b1c"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "ea0295dbd58534230b155bd807d2e902"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "4a8b71cded154e5378dfeb62ae561f83"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "bd740179492d6c933dba4e292790524d"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "1894bb2680611f5cfc65aab12fc1bf01"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "5f7743639dacbcac132257af5628a2b2"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "2ea2cdb9bdac23e69ea6aaedb9a9a31c"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "e413b45faace08c49781a9feebd0c107"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "426cb30cba4d622b67b196d4cf28e27e"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "b881db094501e03e1f51fb1febf29d97"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "9e2d7611687ec764b4de0f810dd21eb1"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "b2e29ad7eca60a9deabc045316e73f9c"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "f99a0c3d7537b530d217528b79f0c724"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "7048ae886fdcb98b86f49a7eab6c87ab"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "67265fa6cc62fd160f8baa7491bf2b83"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "63e3e4b756474af7a95f596b86680995"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "003596aca1f4488688dca6773872b096"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "66187d41ef3d983f1630fcee0e19ca60"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "c0dae105b8acb40dbe4fc5d77d467f93"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "e885983d837936c4eb0fbefa6900f278"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "3c4216a4856afdbb9ed809709c3e0426"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "a4d48fea2fb26463e9004538388c0a9b"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "16e07b04548b94b2dc02846795c5b38e"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "0e78f14aa0ee84aa4cb86e99d219b96c"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "a6596fc989b9516a87b029e3eb30f238"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "d56110a6384b7c441d206899f90cecdc"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "fb95e8d208fb60f200c4224f49535444"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（一）/index.html",
    "revision": "c6df50dd5d86302a912566367e835501"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "c73c1577b3a727fae96269e52439a308"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "3b94bc729032c2ead92ce99c2d3d0d27"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "0eff050bec8a9e190a2591d08f17644a"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "5c7777ea4aaa4218cb70952298111403"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "605afc9a2d092430fe8b28e340d395bc"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "2d5d2dc2fa077731bacaaa611e7f729d"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "23239b876e44d0c7f7d84b8b8e979802"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "59da2745e47a0fadaeb34b5f7abc4c67"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "b0fbe6e972b24e0d5b4a692cb3861872"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "1b6072c6c36dac18ec8809fbd4dc1330"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "fe3b4b9d5603cbc14f157a1698e82288"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "55207b574402e2a90145a312a8c2fbe6"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "212893c15d64e5f8da4a56c97db25d92"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "40ab202fc5d121e628f5602672b0cedc"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "431aa47fe6d22f67c100ffb72796d823"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "89c918f6e91162abb04010a39a75c6dc"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "306a75db0e6807664d2116373407cb80"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "7cf07e14eef07119514085b855071aef"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "b4e66602dbd635b7ac3c79060a76618e"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "ad3bb5805bdffc53b8fa27c406ed5086"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "5ff34132de74d7036b0be6fff0001206"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "9eff5ed2afdf2ea39cad8a322bffac66"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "cb24d62570aebfef3fcd9eb7d011b65d"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "764d35462eb1907bdcb57934bb2bf3db"
  },
  {
    "url": "2021/02/22/《HTTP 权威指南》读书笔记（第 7-15、20 章）/index.html",
    "revision": "dc2240cd96e791dec630e86229dad940"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "0fa8152aae7fed8098012abb4bfe9c68"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "9ed09e410ef3a6028f81f15627b52ee4"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "ce470bab6ea90c707d3d5c6d30342cf8"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "581bb1203edea5e7445e556b60342c46"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "5b7dafca07fa68bee916ff41c9f02b82"
  },
  {
    "url": "2021/04/15/TLPI-File-I-O/index.html",
    "revision": "12bea0a6be3d97b06b8b182b7f192a9c"
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
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2015/page/3/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/04/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/page/3/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/page/4/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/page/5/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2016/page/6/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/06/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/page/3/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/page/4/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2017/page/5/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2019/page/3/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/06/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/06/page/3/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/page/3/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/page/4/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/page/5/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/page/6/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/page/7/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2020/page/8/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/2021/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/10/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/11/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/12/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/13/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/14/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/15/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/16/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/17/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/18/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/19/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/2/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/20/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/21/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/22/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/23/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/24/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/3/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/4/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/5/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/6/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/7/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/8/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "archives/page/9/index.html",
    "revision": "a32ab343be2ddee385dcc08e996cae33"
  },
  {
    "url": "articles/index.html",
    "revision": "da23756ec3b7f2d372bb1263636243fe"
  },
  {
    "url": "author/index.html",
    "revision": "4ddfb5e11610229bb070eab5d9bdd164"
  },
  {
    "url": "books/index.html",
    "revision": "527a98721067b420e84f20b119499302"
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
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/10/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/11/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/12/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/13/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/14/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/15/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/16/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/17/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/18/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/19/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/2/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/20/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/21/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/22/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/23/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/24/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/3/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/4/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/5/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/6/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/7/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/8/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "page/9/index.html",
    "revision": "681ce4a279c8d4ca1e17f0f2ab9e84d0"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "86db42116b25267c1163d4386af2db98"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "b1829abd6bced5852802b1789ff4d5aa"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "8979f8ecdda258abcbe7943b5185dc16"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "e3adffebf8e61567f376b3e3e99d90d6"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "dc178458623c22a6c17de88f432b75b2"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "7570c6f8f4bdb5bd083b72fc8d978db7"
  },
  {
    "url": "readings/index.html",
    "revision": "a495e7b71e9612034e9fd55095dbf762"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "d408cbfc021574ad73d795d18908571c"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "cbda97dc6cfe7670c89de7a47b60b7f1"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "82b596eed6ea00b7eed399b52fe7c98a"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "d072112b963c748b4a403f46d9f93352"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "c49bc53bcc7c4e3d15ce3a18cad311db"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "50d2c6cd4b08ee65e2b89a9f71559644"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "dc2ffa939cf892ae0e3bcbe90ab1a909"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "9d234b1dda0a65332388d00286a1d3f3"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "b68f39b036d8de68bae580e0ef4e5c74"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "b21525b3db08e8e0aaf5f75731423023"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "3e0960f54f5b48fe40d0773b469e59b0"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "00f2b6719c4c823aeb1aade053e19197"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "eaf47d06a16c5a7191324f1f23a75a2f"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "a4e5747a16db4c4fcbdc036a2abdd9a3"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "ee1ffb596446dee0979d92d2ea28e8a7"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "cb34390925364174461671a40dfdd42d"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "68ee45ba563a38eb3589df0ff5876196"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "ee668908b2c3eea706d08fb65a464283"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "86e66e86f627d5915cefe28d0652538b"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "a0bef68b2da9fd32edaf8fe4f6f31245"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "a52733dd8d47105531d90a7f6700645d"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "3436938d11411e8e5391448006d8b851"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "ad7ae1b9cd5dafd534707324adb78691"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "bd37a00ae7832e5ddb66262d3716fc5b"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "5a4eda9215081df121fc0312c408a816"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "d617cb03646a2d12e42171513db121aa"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "14325c3b396ec7aa0997afa272a8f93b"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "77c0a0c3586763b0c4d9daf360fd2e0f"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "cac993be2d3f1e9987e8e1954fbbeb34"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "97d54e927ef2f590185674c2fc6c0440"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "c780a00bc5e3d623938b119b4a6e37fc"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "25f2fc15dc203a053406b720b79db162"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "9103e2f8afb91c860db2d042770e10ab"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "a6ae92b998b6b439cf89efb3cc16197a"
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
    "revision": "85b0b66b44ebd82bc9a5e025b66e0f93"
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
    "revision": "2cbb84bd76525413cb7170e5a191d72b"
  },
  {
    "url": "search/index.html",
    "revision": "0541e39fe50bafbee7ca557734ec4c44"
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
    "revision": "f7b233ae0b2602e606f37f19d5816892"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "a0bfeb0883978b62b9e54e6eec935872"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "15abfc40f539859cfadb18e0b7c97867"
  },
  {
    "url": "tags/ASM-js/index.html",
    "revision": "2256465d65510887ee35d012fed97096"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "16c25cdd9f86d7b949b0908e337dc0de"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "b639bcb637fd7758dfd9f5371fee925b"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "3b5aadf7b612a5b5a3b958776a64ddd3"
  },
  {
    "url": "tags/C/index.html",
    "revision": "5d00847ea6f45e61ef7c3be7678c9f9c"
  },
  {
    "url": "tags/C/page/2/index.html",
    "revision": "5d00847ea6f45e61ef7c3be7678c9f9c"
  },
  {
    "url": "tags/C/page/3/index.html",
    "revision": "5d00847ea6f45e61ef7c3be7678c9f9c"
  },
  {
    "url": "tags/C/page/4/index.html",
    "revision": "5d00847ea6f45e61ef7c3be7678c9f9c"
  },
  {
    "url": "tags/C/page/5/index.html",
    "revision": "5d00847ea6f45e61ef7c3be7678c9f9c"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "5cba2ef05d5ed87b24df9b45a4df6782"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "ad28d0ce2fe56b0ddb48d51225d55e94"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "f4ef2d39ba910ede28443275c121e5c5"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "f6beabd604fb0cbe5ef2eb2662107537"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "734293f5de7346e737a9b4b9674929f3"
  },
  {
    "url": "tags/English/index.html",
    "revision": "bec092baa7882eed97adef62222ff7f1"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "8a66973abe71a76e9398613eb0abf784"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "821b3e6741e08bd2b25cf04bfa4079e8"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "bdb6b303e83978b7622abcc6b8a52fbe"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "ca750504c4f0ca211c4286b4db7ebbf7"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "36197666e787641b8aebda7d025a81a4"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "1fbc44b6f4a090af1f45bb47fea5a32f"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "fe68438bea24754bd38727c4d08decb3"
  },
  {
    "url": "tags/index.html",
    "revision": "d2370f57ce04225b8e1c86314113fe17"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "5a6d47fade06ffe60c599e7ef53c4c8a"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "09310b4b1e8e4602468ae1c6f6c8afe3"
  },
  {
    "url": "tags/JavaScript/page/2/index.html",
    "revision": "09310b4b1e8e4602468ae1c6f6c8afe3"
  },
  {
    "url": "tags/JavaScript/page/3/index.html",
    "revision": "09310b4b1e8e4602468ae1c6f6c8afe3"
  },
  {
    "url": "tags/JavaScript/page/4/index.html",
    "revision": "09310b4b1e8e4602468ae1c6f6c8afe3"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "e6d959c8465755fb0279fdf596f916d8"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "e33b7eece97f6855310f59dda2a5bf07"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "beb12177aaed29bacd9f83d594d60e58"
  },
  {
    "url": "tags/LeetCode/page/2/index.html",
    "revision": "beb12177aaed29bacd9f83d594d60e58"
  },
  {
    "url": "tags/LeetCode/page/3/index.html",
    "revision": "beb12177aaed29bacd9f83d594d60e58"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "7ec7da7a08968910503d2c1968e2bf61"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "5a1b7b77a3dbf0c3ba1558d82fda0eba"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "e947b44c1a547cef986974a4b0088d63"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "83241bb0509d2de1276f90de6f5502b3"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "1e47b4d2b839466d72bc10655f87c5b3"
  },
  {
    "url": "tags/Others/index.html",
    "revision": "fca993623e9428c2638a2a67d57d8d4f"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "0e20e610e6c6131f53a759228bc208d0"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "f80d32bd31b58a5ae013b70b14ea4edc"
  },
  {
    "url": "tags/React/index.html",
    "revision": "f280ed3851a5038a04323cbfc36f052e"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "407aec4cc1a462f1a78cfcf5afba37a1"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "95e200bdafc071f9e1e4c843d8b21005"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "fd732dc1a6d9be0a650589b26af314f2"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "ea03f76a02bdac1f3e344dd4b32d8c6c"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "59a387db7440208ad317b33b56aa1271"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "e60380f8f6fb631bdb82a9fcfac6fc5f"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "09c976310c581e01921e3cec7518a9af"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "31fedf4e13e160a814b9ecb25c149f35"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "350e8329652221b7acfd63b5f14b1147"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "ef8ae5f98d20c757fda26d7fcd6e5086"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "c2c97d7fcca839810848b2bf6c4a4222"
  },
  {
    "url": "tags/WebAssembly/page/2/index.html",
    "revision": "c2c97d7fcca839810848b2bf6c4a4222"
  },
  {
    "url": "tags/X64/index.html",
    "revision": "953fcb468bf172171980e34434430f01"
  },
  {
    "url": "tags/X86/index.html",
    "revision": "bca04b7d98bd272db6e938f641fb551a"
  },
  {
    "url": "tags/互联网/index.html",
    "revision": "44cc92e5ec908850c7c2ec9219d75498"
  },
  {
    "url": "tags/互联网思考/index.html",
    "revision": "0ceabd2b49c1f2417b35f1c7ac15a801"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "a5bcc84a1aa66cb13acc18d330e42e4a"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "428caf54453f295c29dd536211378119"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "2d3cbab35fb3cde95b45425c04951641"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "20f132dbf29151cc0a56bd9395081dc2"
  },
  {
    "url": "tags/加密/index.html",
    "revision": "0df7286acb80e2999c4e0946aa1ea934"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "b7c1c7e776637baefab0ba2cc93f9637"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "337bf63065312d72e77cf051fbcb96e8"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "3d2581ed4612ac0b66be743d95ec6e43"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "1a4c3fa163a81af8d1c4edc0fa58344e"
  },
  {
    "url": "tags/女装/index.html",
    "revision": "a0eade721538d73184ad2a08280a59cc"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "954bb2350b7e95391ec028657d0ae48c"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "2f7f0e39b410aff0af02bb43752815d3"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "6c3b8813fad60dac7bb68895a459df3b"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "16af125508278b1a7da9cbea2824da91"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "88bc46a66ebaed810097cb02dc65ccd3"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "9f098d1db996dedf707af09a0a650154"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "ea875f97d180066b376ee434ae013ae1"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "12fab71467d8f8df9db82fa0efa29dbb"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "7a8a576a8f74ff7581dfd4ded0e77dc0"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "b89e6e602691fcbac424b5f443f12992"
  },
  {
    "url": "tags/算法/page/2/index.html",
    "revision": "b89e6e602691fcbac424b5f443f12992"
  },
  {
    "url": "tags/算法/page/3/index.html",
    "revision": "b89e6e602691fcbac424b5f443f12992"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "42d2aaad4ec1105a5224ad7d6972b6e5"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "c5145ebcaed194f3ceac80b07175350a"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "56adef16c7be3577e39f92d2e68a6d76"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "7021b48786716c7a31848e990673c690"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "147a2f764cae32f978027852047dc10e"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "b9dccc48683ac648433d425e2007d48e"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "771c52155f5a162f06ce61f13ddab0e4"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "6db918214fa7ab8557ce472785b18376"
  },
  {
    "url": "tags/计算机/page/2/index.html",
    "revision": "6db918214fa7ab8557ce472785b18376"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "4d824a830bc6de196d70a4760890d9c6"
  },
  {
    "url": "tags/设计模式/page/2/index.html",
    "revision": "4d824a830bc6de196d70a4760890d9c6"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "ff4632dc52d965450723a28bb5117a37"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "e9b9036118aa59009ddbd236971ff9df"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "b99de85ee02853e9dc192a025dbff41c"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "a90d3bf258d5a320fcfb0d7b1983c631"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "67c57f1368022710bbb42beb0cadf228"
  },
  {
    "url": "works/index.html",
    "revision": "2e4d0fd48b44587a14236d6d436fdf85"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
