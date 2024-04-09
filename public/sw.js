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
    "revision": "d0513602ea152c4e4f3632fc678c5fe1"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "e03e43807c453c46f1830efb559f30c1"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "e18f3860fbd043c9c70c77ed0d944564"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "6396f49af60f38f440f499a5738a76c8"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "19ea66d3c1d54b9b069cf1a5bfbcd122"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "1ae6e7ac4d9c227682de5349dd9503b8"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "1e2a43c72fc3211dac3a6b1169f1f549"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "a29a52b34e2ce4d6ea224bcdcd43d896"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "c935f6100a54c1719cd9e4c0aef06fed"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "1b0c7915dcb597765995b2a396a05f8e"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "968ec98b3b4dc27fe107133d7f45baae"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "6be14eb34520de4b6bd4ee3572191144"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "2c6bb7aa288b3db895af52b2dbfa6546"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "13963d1e4acd5e841124b49b23660342"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "51294899e3765f90d2efa533ad0b8953"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "4611ed214bdea3a0add10a924ceb6d00"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "956e27fabe9b6672882ef3cb2cb33037"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "3ef277ebdba26529d66f16376d9ae905"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "13aa4bdce17b56bf251e8ff567560c0e"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "4ba0c9fa755257bcd6388a661951f900"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "8840ef6e7645ec895ac38a155ada3754"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "e40ee22f1d43bb28b69fea94faf81b12"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "2a31918341992835efdd379917bb2666"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "91d932248f67495028c4f910e1b4c638"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "77d0c50d07a06daf8af3c35faaafaaa6"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "5e25fae99d58d2c3dcd2f9586f1f5b54"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "ce4f8b6dcdb84494c10bb21e80f2aad1"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "614e2c7e7b0dbc03657456c872ffff66"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "6cf3f534979f333e19de2470fd46edcd"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "4e7773eac38fe3cf1be0c789a836dda8"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "8f949ac4f3b6910f981c1800e4858de6"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "412c9b8096a4dd3a1bd2c30260a9f118"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "aea02bfae92c67ce0d415092c2b3131b"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "f0d6415f24d69ff2e78b07aaa38d0d56"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "98d2ab1084e3fef8956ec031cf347adb"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "339533ebb1c2de7b0be92ff3443e028d"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "d88429e3180e29f0af4648c8d9a4b7db"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "e43c33874a2d5425ffa02aa07ba3a6e4"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "5e212cc30333d9347ec3c07b19e95d50"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "4a9b22fc1a79fc00088f265324f12c05"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "d4b5acd6f70ac57431d85fe3533dd251"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "e7ab023464c7dafafec1f62c7c656fef"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "a213612a9383011de1a88fe1917c8bd6"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "755a5687bf521f43e1b544cde8f582ce"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "05075ff6ab730ab4cf4412778dc17d1a"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "84c1c93071b6219ddd50f2a5e27c4daa"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "5e27e075a4da7125f5018f6baf6e0c0a"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "a6a1da346cfbaa6bc7c5da50cfc7dbc4"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "334ac7f69655fc190c2f0caf31c80ede"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "3a2bf175c45ca39193fe11a7eec8a26c"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "4d885ad686981e88ca0819db0b5ebfd4"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "717c79adcf38c6db0c11198d22aa0f73"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "a833e543940c774b18f713c2a8f316f0"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "9f2b50988f362c4e597b9b98807e6549"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "633e195cf6a0472997001683de79d264"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "bf727637a575d250f39c500f60f268f2"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "96d82fe71c557bb4f1579303205ccb92"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "28beeb4cf4f42f616bb2657f2423fde9"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "361514d303dd1957df58c70975cde94b"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "861f6d25eb9f3b2952e4bb954e32484e"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "7533ea77f7ada81a5a9a3ed07ead6711"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "505e5cccefba4e130868bf8a2415ddb0"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "86c723f840a33454dd6b13e17df922a5"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "6f35d901cde46ed75aafa19e4389c478"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "21d3809fb1b6dc9adf1f53b71d96d131"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "3c692e369eca368768d88e6823c2f215"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "8d5494fae4a50588d0c3288d5dd5e57c"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "3226048e61afd55d1b65af90d1ea644c"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "56c6fbf2b0e7a72f3019d91cb40fc5ca"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "1debd2b4b8b3f673da4bb378f8bb9f92"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "88c23118c91a99d7750b03cbbf379890"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "b4dbcb363f269a3b0e66fec71eaf8117"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "814cd52ab82aa19ba4693b3b3ea37edd"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "0e4a6f47c910f5513bc1f0e6c85e3d02"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "bd86834913836e73df390dc7b513a5d3"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "712fdd4661b7f868c531495b66e1a5bc"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "65ceafa8e2efcd95cffc3899c85e4111"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "6c6562d04f530ced17d304622a70e803"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "c6cf8e3673229e90235d9696672cca40"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "c2ea73b88b81b0a247a16e8a22d233be"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "88675799b36978e5bc0c7967e2f684c1"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "bc8b826ab18571e8eb3de30b614d6f96"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "6cfddfcc6f975360e38635dcd8c92ccb"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "e10df6049faa276c41c5d7383cf29c8e"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "4b70d988699758e306ef5f852e5dc5ae"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "1a25181635565e6a14982569baac2aff"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "c311d87cef7ee3c3fdeb53f2f28c9d96"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "454020dc09d9402f665c02594346e989"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "2f30a06c8980d4f9ee7af100a71b6fff"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "20de206740947bc2d4e64600b3d2dce9"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "b3a3bce79b6eb2c101ad1ed82ae2400a"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "5585db88ca2c0deec0a664a9684b1704"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "4218ad898178c36ffef56a6d47f9106b"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "048ca3765c0d17421a1b1f523996fe99"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "59d00d20994a4fec179c6ebfffb70cc4"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "550b3cb500d828ecc7234a99d94c1129"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "7ee94be803c8f8f8eb2401a4720a9b02"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "5599e583e574200dc62c5c6d5ba1dca0"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "554805026f2708ed7fd75e8629038277"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "9400117a10426f3dce82fea6f36f5804"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "713a1734f99c7b489d290a76e548b014"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "a347b2b18a193d66eb8699138ab3a4e3"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "4cb6dd7ed7e8128cb963232faf5c4ac4"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "6b2daa69fbf967160c13b4b5f1327333"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "57ebdd392087832a2211a12dd9dbc8f5"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "b90fd6d6a7cb8a34e9f1a0f2984448cd"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "a6f9bf59517150d62232a1f4b891dcb2"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "281c7d72907cbec22167686bdb33e927"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "b3cba5f08ccb9f33fb8e74d13ed57a92"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "082556af009c76f10582e4060b1f1c18"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "29981c3b2ab5f9519d3943d13616d6e0"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "9edfa6ff16a8125b8f70fcb32bc5f683"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "aa95fdf03a3b5530eb7c7b773f3d9de4"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "8f44edbbfc1ae751fe022a2af09fa013"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "d135afff397a91ceb84827ce768f9095"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "66b4e9e4d46930630b8d94b45d726fe3"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "0896a09f2cba8e6601cc6bd9814670d9"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "a77d9d1d3cdceb4b0872febf7460fd29"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "40ad612d73bd8ad9a6c6a86c95431122"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "218ae9239590afaf9b9648c0bf7156b8"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "48bf1e673cd4414495748d8abbe48e59"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "af46962d1645dbd4b17f136fd6ba6f32"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "a6c616dd8cf662310a12aaf8b6b322e7"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "452c4de8b74142409355a1cc882c1bfc"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "b71870c51d5a646b3aba678cc4fbbddd"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "fa96d28b78f5d826132885f9d4d74534"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "b61e9630323f36af18c528062e2bf33d"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "d75e3b0539fb84fb539be33085bc776e"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "78c06aec5135a7b115b15e6ff17208d7"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "a3abb8dea83769426af4e64599244e8a"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "ff650088a5557839f16b06f83c76ce60"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "edb3cfe8be2d876f925d5946698c37c1"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "7a32dc2c91cb99e80746c88015c9e78b"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "8e3fd9b63537378319d6c7a4974c95cb"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "de0a55377123505f0bd44520b26700fe"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "b540412634ce16945845bf4acda07670"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "1cbc51be895c8e1463c6bcb01dfd9013"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "7f6d3f97d08f6763ba5a1739193ef6b7"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "4abfc418174fa2179dbe3afd7205132b"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "13513f7512cde752ca123034148af550"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "f9d02b04542baf6058720d3664334220"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "c2d0eaf94136f40f44b662b6e21194df"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "38e58b816ead54baa046eed41496b51e"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "81637a1c988bcce96aeb4191484282a3"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "deedc802191b0f35cd4f3fc430767afb"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "5ce83fcba86aa9ff86771cc7cddb43da"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "5bfe73d42e908aba4ac3fcb07c158ba7"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "71913f5a767249fbb640494442c6fb01"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "7cdc01b282a7d8d6f3d76b0ac263cb20"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "fc8909630dfbdf66fef16ec08a9aefcf"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "52467dee0bd40e83956197f3cd85b875"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "157b22224196c27dafab0bbc2890443a"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "7e9ecb5bcb7d2c767154ae89f8d2fdae"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "9da28a56a882df8dd43c7f995b84b942"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "e17ddd8a95a6414ec2623abdd342fb54"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "adf1c88717bdd42cc141869c327ad2d0"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "118b2ee2866cc32674e6f9de7b4cdcdd"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "8ebcec84f193bd383d8f74172afae236"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "6b63628ff71864ddb8886545139b00dc"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "44b3e459d23e6e7afde36ae2d35dda03"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "dc64cd2c773159b83c46be65f6dceead"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "87aeb07e379cb30522a89d0b1561ec7f"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "7ca5d83078f9762eb84b51982be8cfb2"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "dbb2581eac465551fdf595666207d146"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "cd33e08a331d57e8890ca8fa9e17ffbd"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "add0b1429b0332b92c30b337ab9dd978"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "68bb57de09aafc2909a8ce3e259a0365"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "536ab0bdfe09e9994a6174c37d7aef3e"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "f5dce7c277c08ff378d742494b426723"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "d4db5aacf0b1ed9bfe1859e35d33d974"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "8b556ccc38f88f1679ef6d461b399eae"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "9a021c9e32cca5679033c08d762cad6c"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "58733e52d61725fe30ccc99061e24a9b"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "182f2e2f1100d0dda0df0acb09a8afa1"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "a7f24aee60ffaa54789acf93f9ce843d"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "96c47ed816998712c62136100e167b0d"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "0efa1afaa22aa2c32e3cb5dd8a50922d"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "a6129f7e0644e9c45b7168622f6a5ea8"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "1ecad544effd47a95abc76262daec2d8"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "a955e90ab39512f4d4daa523911485ae"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "e33e4ab29f91f5d63ede3584a68a175f"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "ff9595470879a16b87d4c2c79f862ee9"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "9b4d0e957da2cf22209bd549f8496587"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "5589b62aa3e3772c987e42c65184f7f1"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "7474a190c6be3f201fe222d148cff389"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "160172c9ef78310ac53cf2f6e2de3263"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "8481cfa579fe3d74e962d7b8c08da73f"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "292cd61237f5b47faa4117fcbbe3abef"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "d3a0095cbd765391715838328e811b22"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "a79943f5fffe3248324694f360cb57e5"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "d622545923af5a502d1b8904992cbeb7"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "47fd9711b21309bb6941bb5616bbf76c"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "a9f58ff10e56eba2c1625d22bf19468e"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "cb05ec390a71bee9e8fbf8d2e363f525"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "c0ea1febd10f67a82440f46134baeffc"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "76a633d2e3bb65f6491ee5ccfe14e0e4"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "cf7a4fd8d52f5bd35959cd404937fda0"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "dd47eb5fab1d33a1feb242d6715ceb3d"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "417f7b308ce113e14d108fbcf8297316"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "60a1d2bcd76974315279229e29df6ba6"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "8443825b511fe56a72b77c8133e38d73"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "d48ccc30d2b8090c3890e76c0de823a4"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "085bd8e46f2e7bd8534874b989aaaf58"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "61066c2862cd5a8bbb71b760e3256ec3"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "5d8a0ca4ba31fe4b0a7e796b7d05215d"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "f10cff5599226a9cc01a83dc866a5db2"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "830603076bcd8e795837cae92529da01"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "ce6871dbcb5bd66c9068935f1374bcab"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "590df0cbc7d608d5f2e3d38209d29ffe"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "08a94e9abe4623f77b2e0961540b2cbd"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "0e39e222b129db82c6d69699cb905865"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "2f2ec15cbb77d02a97599c008aeaad8c"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "072885702def93e393934a358eade0d8"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "3a68c72c754a55cc35f4fed24deab747"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "ec74544374333e68b0b0dfb6b7a6ea60"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "29de2158aed802b133f1b1f8d8bf5572"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "b6a86dd98ad2034bac60477fad774185"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "bdcedc4f791d5af647c3d1249be6d8f5"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "c29f8b21939e9b4d52bda823f43b0c90"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "7166ebfd6041d27f902cf19222d5a3ee"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "6f1f2932c5a69d5b00da1c3e47e28aed"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "d68089921a4318a2666ac2f8a1ebc61f"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "539ce8d70cd5de17f04e27f2a8fcdbb7"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "18f31b8ff227078f0d316edbe5c1614b"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "62dc5d49556ee668d181927ac074508d"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "6669d0d25750238f0c4cf5f0867d0b9a"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "03c945d6bb171341c0c154f7fde1ca78"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "9e1ac4ca3709f3541388bc361d701990"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "0dafe7ba8aea10544063c8d5137073d8"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "96711e8f9179abb234f356eb5157753b"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "d043d4d412e39a8cfb77d4512c187b5c"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "d99a36ccf7a182ed2facae4eac2d2e59"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "92e9f0c6f6d2408d0ecca1e641553a51"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "c208e91d27061ce1fc3048b81a0106ca"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "dff1c2a93b0d583c868c7a6150ea3de7"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "b259b04b4c2c4d864ef5ceff145bd163"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "0672eadd8ec13e1504ba93ade9e4822f"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "acbb2d7ea96ed6aeb9094fd5fe8041f9"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "4cb6bac4b17b521a86815c816760b74e"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "1ee08aa1b5b969c433104aee4c1f5698"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "68cba60f0e8adcfef8ceadf361f99b5f"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "9c9429bd56385d866ea0098289ae1493"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "9c8fc2328bd796dc7cdabe6bf67ed606"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "5df2108d2dde2a95ef25208133face63"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-29-章）/index.html",
    "revision": "73834dc41f906c18f33b7f07e798c5ad"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "ec83426474bfeb6478f4bfa60fedb853"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "11919ff6f6b0689f0ef1d28f1efb68aa"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "384ccd3073153985814649e39a909a56"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "d11bdd0303af54bd53088a5911cc6d13"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "0918224bccca00b9b1bbfbac9f114afa"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "8986957918efe6b830243f75f206cb7f"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "31224da0bd64e4abba988e078c386796"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "3387cee37cf3fc82fdc0a6a753cd2f33"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "56dfa557aa8d2194626416e0a5d955d0"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "1b77370c543eef46ecdb953ef2b36242"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "b2d6dcd6c28c17a05910184c74b54d04"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "e47c85153461d9c7ade94fa3b46f6ca7"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "307b8ecc07947060126a0342aebdd2ff"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "14f6dc0dd37fbb10a384a861651788f2"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "55a4f69f27e65127b56dc693a197467b"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "b40ab9a21c33829a505ceb39c31b83c2"
  },
  {
    "url": "2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/index.html",
    "revision": "5f9c124cc47423ed66178d17fa5233aa"
  },
  {
    "url": "2023/11/01/WebAssembly-Multi-value-Extension/index.html",
    "revision": "6f52d311e0fb1c6fefa73ac4f0ce6bd7"
  },
  {
    "url": "2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/index.html",
    "revision": "135b9740010bf5c2458b64f2ad1ab39d"
  },
  {
    "url": "2023/11/01/WebAssembly-Sign-extension-operators/index.html",
    "revision": "c4a6665361614fceec94d361995176e4"
  },
  {
    "url": "2023/11/02/WebAssembly-JavaScript-BigInt-to-WebAssembly-i64-integration/index.html",
    "revision": "c89aecf99bf49143dd4b0c8af565d05e"
  },
  {
    "url": "2023/11/02/WebAssembly-Reference-Types/index.html",
    "revision": "6a254a5d3da79a9a30808297dc57b73d"
  },
  {
    "url": "2023/11/03/WebAssembly-Bulk-Memory-Operations-and-Conditional-Segment-Initialization/index.html",
    "revision": "24f482cbf6924f3e6291dbb73be35fea"
  },
  {
    "url": "2023/11/04/WebAssembly-128-bit-packed-SIMD-Extension/index.html",
    "revision": "f409cf317278234c2464bc6080850bc5"
  },
  {
    "url": "2023/11/05/WebAssembly-Relaxed-SIMD/index.html",
    "revision": "0750b56df93c481bad4ade06a0a89af3"
  },
  {
    "url": "2023/11/06/WebAssembly-Tail-Call-Extension/index.html",
    "revision": "8bc7ad59d4a9914ce36b5315404c6267"
  },
  {
    "url": "2023/11/07/WebAssembly-Extended-Constant-Expressions/index.html",
    "revision": "ba04abe27f808f899c07c01e9f40f9df"
  },
  {
    "url": "2023/11/07/WebAssembly-Multiple-Memories/index.html",
    "revision": "33d7b5c2ab6a25a3101a6332dc4915b6"
  },
  {
    "url": "2023/11/08/WebAssembly-Typed-Function-References/index.html",
    "revision": "46a64a720e181bcc593c1d99634806c1"
  },
  {
    "url": "2023/11/09/WebAssembly-Threading/index.html",
    "revision": "0348ea04e4c50fa5d72ae0a0b023ad64"
  },
  {
    "url": "2023/11/10/WebAssembly-GC-V1-Extension/index.html",
    "revision": "991185c8020a4883748a9a279ef589e7"
  },
  {
    "url": "2023/12/23/TypeScript-Cheat-Sheet/index.html",
    "revision": "8a082dba4ae112ea1e8c95ef2d058862"
  },
  {
    "url": "2024/01/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-30-38-章）/index.html",
    "revision": "a0b351b8c131b0122f551b3b1cf04a9e"
  },
  {
    "url": "2024/01/17/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-39-43-章）/index.html",
    "revision": "78bfa2eb1dd1720ff9c8a9305ec992a2"
  },
  {
    "url": "2024/01/24/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-44-51-章）/index.html",
    "revision": "6ca3372cecced2923f8be23e31f3264a"
  },
  {
    "url": "2024/02/11/《Unix-环境高级编程（第3版）》读书笔记（第-6-10-章）/index.html",
    "revision": "ec55ec3ec6879bfe38b31e26f8c996f7"
  },
  {
    "url": "about/index.html",
    "revision": "3406e05b6c86dd6c8a15733095e10bee"
  },
  {
    "url": "archives/2014/12/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2021/05/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2021/09/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2022/05/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2022/06/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2022/07/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2022/09/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2022/10/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2022/11/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2022/12/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2022/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/02/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/03/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/04/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/05/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/06/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/07/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/09/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/10/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/11/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/12/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2023/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2024/01/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2024/02/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2024/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "articles/index.html",
    "revision": "f06258cd21f4a3d21aa6effa9d0416da"
  },
  {
    "url": "cards/index.html",
    "revision": "a8750c0fb43e9572f3a566eb6cf48b83"
  },
  {
    "url": "css/prism-line-numbers.css",
    "revision": "0810c0e4aa6528786cf1253de32ea115"
  },
  {
    "url": "css/prism-okaidia.css",
    "revision": "aa66583a70a798af500be4538725848d"
  },
  {
    "url": "index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/10/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/11/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/12/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/13/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/14/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/15/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/16/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/17/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/18/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/19/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/2/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/20/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/21/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/22/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/23/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/24/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/25/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/26/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/27/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/28/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/29/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/3/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/4/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/5/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/6/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/7/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/8/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "page/9/index.html",
    "revision": "dadff42e2ce85dc37508b1ed2244b0d8"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "ff98260d37492bb72c149f4f1031c97f"
  },
  {
    "url": "readings/C Primer Plus（第六版）.html",
    "revision": "0a1ffaa7e20ab48cd1cef3b82e3bb1e5"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "a09437963257b9df6df58ebaea43c98f"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "369a21247d6e68d4f25e6fbd44de904e"
  },
  {
    "url": "readings/Crafting Interpreter.html",
    "revision": "2ea57392dc7c7018504584227110a77e"
  },
  {
    "url": "readings/CSS 权威指南（第四版）.html",
    "revision": "cf596b5fb05c67b6ef9db3fc76e02f60"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "ddaa5e919fac453a575dc7c3148be7fe"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "e9d1c5eb72a272dca532ab3c50210324"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "b6a9a155354c142980a7401fa41a47ca"
  },
  {
    "url": "readings/index.html",
    "revision": "ccf5b77ca2aacec2232811a4af1d40a8"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "a178cc1652762f39ba21c9df1566a24f"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "6c6e16e27a804917aed3ad15f2375652"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "905bbe3a266f59b28adc78d59cd61bfa"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "57d5394969c90dac2ae2cc835748328c"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "7aab5062c77e3c51316646c14442fff1"
  },
  {
    "url": "readings/Operating Systems - Three Easy Pieces.html",
    "revision": "4f9e0ab5f253f6969820b7c86aa390c5"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "bd8bfdb8d34d0125e5f42d5ee228e081"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "e340d71f79d42f9a773e3c5f8c3cb414"
  },
  {
    "url": "readings/Rust and WebAssembly.html",
    "revision": "aff7db29bf81e56633a6c038da1807bf"
  },
  {
    "url": "readings/Rust By Example.html",
    "revision": "fcbd245faaddbd9b131a9bee7a67eb6a"
  },
  {
    "url": "readings/The Linux Programming Interface.html",
    "revision": "b486593cdc1fc1d27f6c4b7b6c645fb8"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "289d7770468e14aad59857b9bd1a4c11"
  },
  {
    "url": "readings/The Rustonomicon.html",
    "revision": "040c6c71e945e7ecd5e6afd42b50d079"
  },
  {
    "url": "readings/x86 汇编语言：从实模式到保护模式（第二版）.html",
    "revision": "25ebdaf1f7a1231bb708fe04e539e560"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "05a6455304bf735874a3eacc1285f0ba"
  },
  {
    "url": "readings/人月神话.html",
    "revision": "899752ff21a26e43e6b890edf428472f"
  },
  {
    "url": "readings/代码整洁之道：程序员的职业素养.html",
    "revision": "584272168e4561b4f6aa931696bb2f63"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "08a1996e01e43051858b5f8619fa3fcd"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "15fd6ced503a973daf4319a2f9d89306"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "27034a6bba1152bf1c820ac1e9c9516e"
  },
  {
    "url": "readings/可能与不可能的边界 - PNP 问题趣史.html",
    "revision": "7e4eb6264fa56d1fd0ee87da1519a437"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "27536a71914e175ad6b78f2b0bce8311"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "45fddfaf33c1d2be05ce9ceb30737132"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "0e15135bb299c538bd3d63349d9b3c75"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "72954ff9d3567cd70e9c44dcc8a2f028"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "6e5bbfdae08ed865cf3ee2e42da99b15"
  },
  {
    "url": "readings/微积分的力量.html",
    "revision": "01d0a72d2e8408148da97b91ddf928fa"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "f92049b487d5b88f898f8a762d2899b3"
  },
  {
    "url": "readings/无伤跑法.html",
    "revision": "e0e5239feb3548cfbb537077067ad111"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "851fd8d2389fdf33a364c5f32f27e65a"
  },
  {
    "url": "readings/浪潮之巅.html",
    "revision": "4ea27ee7b349b5e303bd6814798fc63e"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "0e3d57e0f448c9ba696f65de8a4dd640"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "48bf5034492818089e54e1cb264b4df4"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "94e8cfdd5dab8c05c8969c3a0398ba71"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "42b552efe837f764ae80147260807e74"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "c303eba5b490419babb6f0f35439fdb2"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "3d0d0595701b135ae4cbd4fe7cf05c57"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "fa51886a17d48fe8fceb3322c35f3bf8"
  },
  {
    "url": "readings/瞬间之美 - Web 界面设计如何让用户心动.html",
    "revision": "9c0e8b07bbb318fd895047406d2f0a92"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "3c0b986a459423ec65239b8e400f2bf0"
  },
  {
    "url": "readings/穿越计算机的迷雾（第二版）.html",
    "revision": "397f900d4e0580a69f2c9397612bc973"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "81b3a1df1a95a5f62fb508868eaac4df"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "98653a9c9a802cde989ee02ab3d6bcb1"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "af18e4c1488354b442ba248c6e92b378"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "42946be0afbe435f37020506615de200"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "1ad953c218bb46e5c63f04036bf49607"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "2f4fe80002b42d68f35b525eb53afc97"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "dc9fab513ece7838a493c0e3149936c7"
  },
  {
    "url": "resume/css/style.min.css",
    "revision": "afd115fd99938382c8a1b3ddf304691d"
  },
  {
    "url": "resume/me-en/index.html",
    "revision": "8ea8fb223c4ac3cffee968a985c6e674"
  },
  {
    "url": "resume/me/index.html",
    "revision": "2657343c5dbfeace5bae02353df3f62a"
  },
  {
    "url": "scripts/index.js",
    "revision": "d4364161c25dffcbddff4d3794aa13f5"
  },
  {
    "url": "scripts/post.js",
    "revision": "3eb3ecb56a3a354292f692ed31d153b5"
  },
  {
    "url": "scripts/search.js",
    "revision": "1bb44062196222b00c73a7c01965ffa6"
  },
  {
    "url": "search/index.html",
    "revision": "d39604438bf8872e93f68b8509041624"
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
    "revision": "bacedd840f13f7fe22f81411f0eb01a0"
  },
  {
    "url": "tags/AI/index.html",
    "revision": "7b4f65f4639f830557ba6b3da103f8e0"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "16434f8fcfa3770fd59909bc0b65cf2f"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "192967404fe90a1692ea0858ad5bee4d"
  },
  {
    "url": "tags/asmjs/index.html",
    "revision": "859659e86d5fd08740b488fe5c788a17"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "b55bf6796b97df144cc2caea99ce96de"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "7cd690676498ad0245bce28cbb6485ae"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "b74b3a5a0538c5c8b843d7152b30f01c"
  },
  {
    "url": "tags/C/index.html",
    "revision": "e5293fb28d3a6853da4c97df1dd107a6"
  },
  {
    "url": "tags/Compiler/index.html",
    "revision": "839d28b79a02747f76fdfbae4166e75f"
  },
  {
    "url": "tags/Cpp/index.html",
    "revision": "87b5389bbf537f4c7871c01549baee2a"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "b6269d0fba9e3be7d83f6da68c0a3b05"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "0d38246356ec14dfde665b8db5fc1ca4"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "ae62a3a3a0e67b419bf0b18c429e5d2a"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "4f5b5c6f28bc66c6b4765f96fc5c4e1b"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "fab9034115d6759a4261b62b73d295db"
  },
  {
    "url": "tags/English/index.html",
    "revision": "25df49019d0aa70f129b1eecd1ec22ae"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "57e815cfc600c26560d058b1ce48d57d"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "6382c50541f6e862bc25e2018a2bb259"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "d2c535c2b1df5ab39e8b927113f33457"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "a3ea1e90b5f5e13003c0133bc328fce5"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "02a3d076e53871b4a1a7fe0fe1a7c05e"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "4a5a5058c5fc9d65ed57ae96f447646a"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "ca3e624b62aaf61886c4222c6ba9d4f5"
  },
  {
    "url": "tags/index.html",
    "revision": "93f2d162361dbc9de1feb9dd8e4f74db"
  },
  {
    "url": "tags/Interpreter/index.html",
    "revision": "475450604353151091b653a333aeb716"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "b10a72d2773f53c15a372777d8f32664"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "8075c78df92e87b92b18b89fc2634ba6"
  },
  {
    "url": "tags/JIT/index.html",
    "revision": "8a24595b9d3dc4d64ba0bb993adec509"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "fff7597fbf700ba185dffe4433b9f035"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "031f13d4ca4e935468e560abb8516f8d"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "f968524f847bbeee00f9153bef4f854a"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "2072993b2043bc94566a4d4ba242de87"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "058b867ed3b17f16fbd38643f4eb11fd"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "64683341e8a202d431278a32de9eb13a"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "2325baa07ae1499b4ce1f0ee5554672c"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "13bd8970a135035768833542079b3f5b"
  },
  {
    "url": "tags/Node-js/index.html",
    "revision": "dceed3da7290fd6395d70c9b6fd903e2"
  },
  {
    "url": "tags/NRVO/index.html",
    "revision": "fecdfad0214a2750b98bbbe1c84264a2"
  },
  {
    "url": "tags/OS/index.html",
    "revision": "c2c8faab3149741e148442088ff2376b"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "b3da6befa58db75dec30a674cf300900"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "b8e7860ec2297dc5c522c74d51c4be03"
  },
  {
    "url": "tags/React/index.html",
    "revision": "78ef17bd9f263e47f9792f1d08ae2b0e"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "f3fe0a00ef318c75d2290acf4b3275b6"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "d7f821c2e94504f2befc370176ce9993"
  },
  {
    "url": "tags/RVO/index.html",
    "revision": "cb505c9ff579d89d743f70762abc9ea7"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "e51f03f85bc3ea1f8052c343ccd54ce2"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "977d327ff37edf3d0155353b7fea85c9"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "e26d31a8cf79e7fd15ea913321e7b509"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "3dddc91895f6eaaf185837e84cba92b2"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "7c50add548211c028c70eb0217c48a35"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "eedae3e0ea1f0bb9949a04dfdcbc227e"
  },
  {
    "url": "tags/TypeScript/index.html",
    "revision": "776ce59f8ebc1d2b185d1d2524fe571c"
  },
  {
    "url": "tags/Unix/index.html",
    "revision": "ba07a77389353af1cf8522cf648970bb"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "c624962f08abbac68c0d1fff44846607"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "1b88b550735de538aea8c781a9d4e9c6"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "410d1d276005d5c29eccd018c8494743"
  },
  {
    "url": "tags/x64/index.html",
    "revision": "8ed6a1e865f8bf29b4f91159ceb00068"
  },
  {
    "url": "tags/x86/index.html",
    "revision": "ad6e64e737cf3a644aff59fccd0ba9d4"
  },
  {
    "url": "tags/代码保护/index.html",
    "revision": "648d61307691713bb422b202e4546c5d"
  },
  {
    "url": "tags/健身/index.html",
    "revision": "906b07b4cc2d3896409622eb644b0fc0"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "09e9f51603eb83f05ffaf45b36ae7ac9"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "a55357847bd66e8f67381835df6a5ff2"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "88e8ecbec412d935b03098a24f322168"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "3dec451a521d0e807fe3e440dcfe6870"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "63b54c34226f51aa62879fc21b482ee2"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "19347bd9f88c62ee0ea6fb7d8dc12995"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "e2d4f3af1e13b54240fb6133c39740c8"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "bf2ea3b0c6ff5df8de023d2bf5dbf2c3"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "d6916795d8002453f9234e82e89e1249"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "95b515a0022e8453c7cf25d79ff690df"
  },
  {
    "url": "tags/心理学/index.html",
    "revision": "077aa18f598d89373cd9dfcd27c39a1d"
  },
  {
    "url": "tags/操作系统/index.html",
    "revision": "4e4659f5508ce59d6cff9fb529093bca"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "921a4374397b312bfca44b4e6f42704a"
  },
  {
    "url": "tags/旅游攻略/index.html",
    "revision": "ab5515f785af268cb6d02a5091004106"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "237d877e12f7c06e234da6a05e2579ba"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "c25b43a00485d035e73ba96c7e2cc593"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "9af6314183efe09fe66eaffa47affd2b"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "ad3a1e6619c94d4a512a34ed89460013"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "067ef199a90e51dbb5d04f7fdedbbb1d"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "60c0b05e94c5a4e1b5a9d0ce467a16c4"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "419b5017ba5bfe1db21dd59f2b52f8e0"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "eaeb4e1b6c21381d8510e2e951c59537"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "61303c4f63e437368ed43cfe190ab018"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "e9a08684c3d00b9a7f80a103d343cb2c"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "67ef69ac8ed77b046054baf9cfdf3f35"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "f38e6e52a8d8f1d014e1b0d4ebcc9c6d"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "0dd06827a037ff95a5b4feb3ede4bd77"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "3c476f68863fa66807f9bb954895e8b4"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "750a4c18911de0126c7faa0cd21de8dd"
  },
  {
    "url": "tags/设计/index.html",
    "revision": "85d79e6ed11c5fb3cb3551e3419fc8f1"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "0d63e56a5b443a15b08db350e04d0502"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "26db530a0f647d7f1307e84555b7ae3a"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "43c5f6498866ce8691bdf50608c2af65"
  },
  {
    "url": "tags/软件工程/index.html",
    "revision": "e7be5ffdcc5585d31c4bad58bdda9d22"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "a772d88a5aa1bf4be4d24d2165f267b7"
  },
  {
    "url": "tags/项目管理/index.html",
    "revision": "44b764838e57a79e9f7e981f304d57d1"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "5c38cd43608284ce0cdef445c202a6e8"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "2f97f633a491671f31a1f1c8f489c289"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
