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
    "revision": "f21f12e5f5a244f1afb2d971da1534b5"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "70b66ce4760270880c8baebd9b63efb0"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "214d5d63c04ab9dfa7912aa60ed1253e"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "eccfacfc323245642c2ad9e7358e5278"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "82e636fd80edb634ace19ff6a151d024"
  },
  {
    "url": "2015/01/02/IT-行业的入门与精通/index.html",
    "revision": "f5dff27aa520a92e4418553be00d09fe"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "53e66bea9daa487103ac0fa715829a2b"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "ee1306a33e5a6e350b7bf1fd6f8e1bb5"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "940b652f345a51b824a3426381c127fc"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "9f6b52291e73a8deeaa65590272b9011"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "74ad6fdc1eae007cf5abdcd3d5d076e9"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "c08369e2ec4c0475b246e9ae08a88f76"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "df165dbb66d7039567365bb504675ae5"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "92769e812a2d6630b97e424aa5530a02"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "bb71f1b322a1e296441af5c3593e9a26"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "183c57b6d2af1c60e03991d6c2d4d2ff"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "b5139636dc5c4b697180d6e9f5813fe4"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "8236be80811d72e3f321e3d0e83465f9"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "cdf64efc83e761227b1b435f8a97fa9d"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "a3188a4fee56827f295b1a997b6d646c"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "43b5d59753f03ddfe27b5930a2225db7"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "818d873aede914206b0a74481b3e6eaa"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "7d725d713c2c15c85d9e1f1a5ed7c847"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "31ce24d50e6ce566a8cf6237db284315"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "c61a628b73952bbdd9036bcaafd2a172"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "93512893d5804300bf592ae1762be2a8"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "4a5ca963fbf48b1ccf0d5c53dc064951"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "9ca176e6c46369aeaa68b4600a3f9a58"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "f6791d343f274eace0e5ef735210e4de"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "205fddedd422ba3bc2137ddb2dc5f2dd"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "30b683098c8fb74971842b5162d8c217"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "cef9951ad783452dcf5152d105c0c157"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "a3d9375b5483035743a07f2aa73562dc"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "b8c0905424af06b987dfdf5083cf8aa8"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "c961ba7b5ab237ea2ecf5013a37906d0"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "67e1e06bc77a4a7907f2b380b5aa1808"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "e299438a8766f9743119073e63d0ce39"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "a5b6bdd8e1dd9d36898dde7d7a45e053"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "71f09ea9c7308505a02a2c9af5129021"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "0d2a3ec8f1934c4252b0b1ce20fe8460"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "1fd7df76c390635bbcba8e5d0f9dbd5b"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "c39ff4d7fe2fe2912689c1b046c612c7"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "e9a085c8ba08d944a8b99597ffad7066"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "b89f409d2b3cffa8874dfa5836eaab9f"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "e583736eaf1dc165c9785d68ec4f3bba"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "10270c9e7218cfa10cff86aebfac8d91"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "f7b905b415a047b1c0dedd2a096caab4"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "5dd0033b6e9ed3707eda216eaeb2ca95"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "d5c299cc62278acb36691797774c246c"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "415fa46278f51957685376b843a2524c"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "808b5c31c4ff8091a32cd30f33b930b2"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "664895c7891275fca87a7188f883fa87"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "64625ae8673d8a2c5e7c9c0225d7f4cb"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "cc9a3ee2d14a2acdc5fc0572c10da178"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "e212bb28aaed25579343e11c3e950642"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "55cac32d5884e4dacb48cdff5de76cd6"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "c346614ac756d98f0268a2b8b755e08e"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "2b7681ee0b13b88ab01eb8952fcccb06"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "ba9bdce9b3ee413267f310f262ff704a"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "5601070cb1241ddfd68e8b64485b8e68"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "2bafc37e9d1c948c7804e0e6cf46f799"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "30d31e464ede1167e666e18a7928beef"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "4906db54a0fe8ecd3550519cd039672c"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "027e762dd1d46e154ed25e1ed364e2a9"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "2adb7bc2b50373c67a1ab6ed2980bdf0"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "82d78618a46d0dc84bfe7535a7a97d91"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "3cf276331cc637cb4f69753a3d57a02b"
  },
  {
    "url": "2016/09/18/算法基础-常用排序算法（上）/index.html",
    "revision": "695207396670c0a95d635e52ef3b7c6f"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "6acdc0a1e410d08c03d1466f49b549e8"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "e4df794dbd1f9bfa35d29c37ea466d2b"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "8ea8f765aa272b84db0201705776b482"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "f97b39e32ddc2b506a29a4c137d54f4a"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "6fd5ff9c1083c5cbbe28d241e5d78342"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "5882f7ad94be623f09aa9f269a98b63d"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "76f0d10514b353ee14c44e57db8ee443"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "ebc4c75454d8e910bd75db0cb6137fbc"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "a539171df04e34f93897d7e93e03c13e"
  },
  {
    "url": "2017/01/16/2017-开篇/index.html",
    "revision": "453adf23204da4cec8ad83e7fa2042cb"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "6a8198e731c66862cdbc448c82338584"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "bb9fdebaf069c778beab108b19f45e02"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "74696b106048dcd9ebd141f387cbdc38"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "8f5a7131b05b86954a2a1ac6d93db23f"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "f8ce3f20a5a334893aa1de4fd0101922"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "f52505ba0f9813bd92df8224da613529"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "85a620290e5169d92d2c29074a6d92bb"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "e5c69348984d7593bc7bf9302ef078b1"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "a4a63be62c51258758b69a525ce3a0c9"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "af7a82c76bc7835d434b225cd0d54c16"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "d75b7345952efc5617fbf520cdff7765"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "20398c83e063b900899c874091d63522"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "04739f472b1eda3ffc7e316e56e82388"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "f19851d31748b1b07fb998aab477b1f0"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "b647a1da3f64083b3a21231f99d53355"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "bcbfcab0647281e4fa55a6331f994a52"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "d598bbb1e332c516b2c266fe4e3bed4a"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "f43e9eaaf0614b1dcb35f1aa96d13741"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "7220fdcd45aa26825a3fad8ea0efe25d"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "2797eeb5d66fd76d8e0dd7fe7071a303"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "2b077473fa333df1020accab3a2eb47f"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "4fe4c96978388ea7ab304cb44064ee2f"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "30fe7da64570c52574244c95c1b0f287"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "385dce22e0471dc0eb853fea8dac1bd8"
  },
  {
    "url": "2017/06/29/Common-Lisp-全记录（一）/index.html",
    "revision": "9d5967a28df570d5cbda232154af3dbe"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "2013999e53fc35b37e92dcebdfd4eca7"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "26b0f21344837cac6510e6549c0d4fd5"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "c52522a1de3b305ee4631f27553fd7e3"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "bd8571e6c30185b5ef16887be487c77c"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "9dc77bd365ed4b2b0658329129d803ec"
  },
  {
    "url": "2017/07/20/Python-高级用法/index.html",
    "revision": "57b24df42de44aa534c88ca6672443d4"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "c706de9ce145ca1650a837493a5c7b42"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "e75685408b4da8aff066ecc35c6e8b67"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "640b7b9e5165218a79132ccb4ac07bd2"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "11a9f31b8a59815874b9f5e8f8350dac"
  },
  {
    "url": "2017/09/30/一种新的共享计算力模式/index.html",
    "revision": "8a9bcbdedc3f398bb839cd39f0443230"
  },
  {
    "url": "2017/11/04/Docker-最佳实践（一）/index.html",
    "revision": "126892b21c23ee59ebe33fcee778359d"
  },
  {
    "url": "2017/11/07/Docker-最佳实践（二）/index.html",
    "revision": "e661ea0d079a142b3e7be6fd43772152"
  },
  {
    "url": "2017/11/09/Docker-最佳实践（三）/index.html",
    "revision": "06d14af442d085fe58dd91b501e836d4"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "3d8213afd1745e611f6bc7162b9fc462"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "1b7c537593f30061042aa4f85133f127"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "e468cf7c05b840a3491c939d69c3e4c8"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "5a6bf17f946f46e30396175e8281b21e"
  },
  {
    "url": "2018/11/29/Git-最佳实践/index.html",
    "revision": "863d7b53730d214cd441e7791f3f9ecc"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "56122e8d3a3b598fecc296133d07c01f"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "c0aa206734f20d843d0d2b6181f5dfe9"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "14163bb05c33daa5fa5087304e8413fd"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "cef2a1822cf39fd49eeae4006db9e5e8"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "afaa0fc774e01756fef8a6882f7662d4"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "75973514dd9f6823608238f072af915e"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "34d758dee291d9d315bdc03f828d8477"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "f70f17a3c918f2a432b3602bedc6a913"
  },
  {
    "url": "2019/03/17/女装之路-完全大揭秘/index.html",
    "revision": "1a74345ca1ce59d348bcfe91ddcac756"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "202c1da760b424226859a024e20a824c"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "545014e0dae39b462e81150ba2cb3961"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "0ca572f6dcf38545031203a07d49f33f"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "ccd66923d7cc6660ae7af07b625fa19f"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "e19677e76db0e7ff9669e38b1e175bbd"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "039c237b0f4ebcb62b7e2b517a11e808"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "a0fe232d23f3af0458a98a2aa931618d"
  },
  {
    "url": "2019/08/23/54th-day-at-PayPal/index.html",
    "revision": "ad68adf5b722ddea698b8fa3f15ca693"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "6c38ab861bd7c498a0fd5eaa6dbb1246"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "038ef6d2731ff86b53b313f0fb95bc63"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "e0f344afd46a8255d799fe2e18da211a"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "f2c222df493066adf366ebd7931f0084"
  },
  {
    "url": "2019/09/13/Privacy-Policy-for-TOVD/index.html",
    "revision": "1c6c3af29f0e109431b90347f5399391"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "ab06bc3119531e49c0ab11aaddef1b93"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "f37fd049d563a776b95617a0f97ec0c0"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "92ffd2982eb1137810014c0c275f6529"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "b1d9ffbec92a18cbc818a39b2248f8a7"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "0268de52ee91fe7078dbcb1ecde862ae"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "aaa74bb66b1fbcf305ce9883d66da294"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "ab463fc10fdb37c5e8b65dda40e62a9a"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "abe913b329e501e556155717e12bbde4"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "ee6d6f77d3e26fab0ef6dad260f3df93"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "336e2afec67e6611a5325965f0a39b44"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "83d8b630e68263f4ab7c8cdd01165fe3"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "b7ca18b3aab0e7a6264fcad88554a262"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "475bcf9f2762b8487a525fdf4dae7065"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "8eb1816bc6c380530fb72b8fd19429c5"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "d33d4160fd6ed3656d9aea1f808e6096"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "4bbe26562daff513aca009f3bba93280"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "e4ad07c266ab58c991cfc9be29574feb"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "8a2f0e5009781aadb271c6d6acc2b13a"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "14706b2d18acbfb8c423a08a00e577ab"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "318df4d489923686227e3e1b11f48f91"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "7866fdc870496c4fc54022904a2afae7"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "4455900eaa2d01b714465db83c9a62c5"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "18dc8a2ff03131cbf9dc9815d834f0e8"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "8dbf03c2888fbaa02d6ed6ac59d2cebb"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "0f41a00d02c2b6e2dd6547acf18d2238"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "1aa55841b505ff227c70f0f0de22a091"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "0d0524b61480b96eef6362a8133d15fc"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "262c4f7bba7f8f46b625eecd09d8e595"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "835ba213fc899919cce32427f8c35d42"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "ae41031cd31a4bc2bdd4772c30e7263e"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "5d2bb48660169bfe5b63997a55145b38"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "c075afef288a777ad0538006ec292a45"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "389015bedf1387229820bc60ba654be4"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "a4442a4ddb08823e9e5f7fa55b4198b3"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "11a59485c3482e1ae43310ba85c6ebc5"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "88b98fae19ec9cb1cebf395ee2615e20"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "1ef16eeb871e5aa58655fd903c20ff49"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "31d48d768d664f504dda1ef852b7559a"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "8d0381d2d038b2b32ebda8d4e218ca4c"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "0c3522e3a9edb89c55baa8d24668b3ec"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "b1240cbf0cf8a7109e68637f0062f842"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "a8b30f1581dda2ecf4785bb149c286ca"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "57d88523936778642020288be5001ae7"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "1eaea11519f82850fbd1fbad3448e34c"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "bd8871874ccab9e3d90fe04b6f768517"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "e82681e76bed5e3daa22ccbafb0c61a8"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "e04249242401f9294e664dbe02203e5f"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "f782dce1947ebef0b6f71391f9a2f903"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "2f7653f2d280cc686b9d709de37531a2"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "0c565f041b00f458a58ef299cc7a6d61"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "d4c3e48696487cc7a8999b46361cad42"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "e64246273b162024fe03d1d2a6bd42c7"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "11735906fcb4facba20ea41cf154708e"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "62b91d492fa85e15c269b4d3f7a30a23"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "7afdbf5569aee5080013cc9d35ba36f8"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "8db8608fbd258c78edb47e6813f35e09"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "d02b993e38f3e9612e5bb184ccc524b2"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "b26812b36f4ae5a1eb1b8d51a50612eb"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "02696ccda958650aef3689f7124c77d2"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "33f1710057d9899dcbdbb689f4170797"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "b55d7ba88436adf3c4f0b9973b9649b4"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "03d878a6f636e775d454316784bd251d"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "df2373a3ad202eeea8eb833566dda135"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "886aeac4e56cd2bec7847cf0426297a7"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "6f333e5d7aa796cea8df03546c614ee4"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "caa7fe1676a0cd0d1c8e63ecf73dcb43"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "cfa82f98915217fd14564ed5f5897592"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "ea6a13dc8a7b89460297d2f3cba521a8"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "d7176b99025c3f51ed6c1d465cdacbef"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "fe92eb4d4fb7efd43752b6bf4f31c496"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "df3997b35febb3effffce171f375448a"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "1a38cd241bf98c5d12fe963fa0e58233"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "f765ad0101f38f4bc21fd0f41cfd0d11"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "a920a271f9bb7341b5326f39cf992f73"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "7f6dba57f866328b24222e0616daba7f"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "143e8d42df7de44e7e4523eb26b07e42"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "6a5bdf0e2944d17aae864cc638d17e01"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "9559653fbdf414cd997ff7b32f8c9267"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "dbabf018a421a31acb413c02adcbb056"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "3663109ca8c2bb25338d95a2104e28de"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "736b261623abd4a4bcb8ea0381d726e9"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "0fa8d01b930596dcd9c74d6b4647e6cd"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "a5a8b492888ded1f871437f78d6bb103"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "b634914fac9674e3cbcff7aa7be3429f"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "32f34f6599db1c1dbf1d5604a43992cd"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "6b03b531657e2f66da6ee25092aee869"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "add556a96788b3b7fa68155dd0c4d391"
  },
  {
    "url": "2021/02/22/《HTTP 权威指南》读书笔记（第 7-15、20 章）/index.html",
    "revision": "39cd3901c13822e0876ff7caea42ed3b"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "713315210090f34be395921684a46307"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "d55e89cf0e4105c76fd32a4e5233aaf7"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "33631fc3862d6795345c4a5fe07f1449"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "bd1ffdf4f9af05be9d98e31e59f8ad3f"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "f88aca79affd696232f35f04e7b459fe"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "a44c8b801e58dabe5b079d88300a793a"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "72067a8477926f7cfe269b3d18f890cc"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "e4cdff809ccb5014f6f346097c9aaaef"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "cd44832ab2810ed51d285ffb05d25573"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "2cfbbb0baa7fd249a41dc93838a7639a"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "59467d1afe5de894fa3443b070f503ea"
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
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2021/05/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "archives/index.html",
    "revision": "b296921a049f71ac065ed42f506f85b4"
  },
  {
    "url": "articles/index.html",
    "revision": "24e3fe0c4105b00e2738f33e6b939579"
  },
  {
    "url": "author/index.html",
    "revision": "a44c7e8f98a1042117e1d2ad62ecb86f"
  },
  {
    "url": "books/index.html",
    "revision": "39491088b3a0e92645f89dbcab4e11fb"
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
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "notes/Branch hinting Proposal for WebAssembly.html",
    "revision": "f1cc80200ae5f175ef6d51db1fce4089"
  },
  {
    "url": "notes/Bulk Memory Operations Proposal.html",
    "revision": "f2569747071cb0bde5a5e162ddb4fa00"
  },
  {
    "url": "notes/GCC 下默认的对齐指针访问（Aligned Memory Access）.html",
    "revision": "249659c77f5928a2c36e36017fd4eda1"
  },
  {
    "url": "notes/index.html",
    "revision": "f75a8555bfd1c37d61350ec9e0b53ab2"
  },
  {
    "url": "notes/Memory64 Proposal for WebAssembly.html",
    "revision": "366840b01a67f39c465c977b48185139"
  },
  {
    "url": "notes/Multi-value Proposal for WebAssembly.html",
    "revision": "df5119dbfce5e67c90ac1bbd5b8b7bb2"
  },
  {
    "url": "notes/Mutable Global Proposal for WebAssembly.html",
    "revision": "0df01b015c1444cd412bb54bce249bfa"
  },
  {
    "url": "notes/Non-trapping float-to-int Conversion Proposal for WebAssembly.html",
    "revision": "b4338afc198e1daaffbafcff8ce7c209"
  },
  {
    "url": "notes/Reference Types for WebAssembly.html",
    "revision": "09e62ed790d7d15bfb18863a4a4b207e"
  },
  {
    "url": "notes/Sign-extension Operators for WebAssembly.html",
    "revision": "c577e5a0563bf5126cc9d886300a32e2"
  },
  {
    "url": "notes/Tail Call Proposal for WebAssembly.html",
    "revision": "485aa6b6a000f9b407034584f3881e3a"
  },
  {
    "url": "notes/Type Reflection Proposal for WebAssembly JS API.html",
    "revision": "2bff58a4829cbf0b5cbbf520a3111416"
  },
  {
    "url": "notes/Wat Numeric Values proposal for WebAssembly.html",
    "revision": "ff510b4ca04b7a79099e6136b0153714"
  },
  {
    "url": "notes/WebAssembly 128-bit packed SIMD Extension.html",
    "revision": "ddaa064ab6197d54908b50da379f1e93"
  },
  {
    "url": "page/10/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/11/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/12/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/13/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/14/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/15/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/16/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/17/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/18/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/19/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/2/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/20/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/21/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/22/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/23/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/24/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/25/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/3/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/4/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/5/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/6/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/7/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/8/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "page/9/index.html",
    "revision": "4016273ebeb306e000294018cc6265f0"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "103ca3bfbe15c6c521d90c7c68ce8ddd"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "3e25fe520bcf2afbbb3b91fd3038a3de"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "97ca9eb41d581546360634999585c074"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "da714f7bc9c4e8331137c8d6a3090868"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "d0a2ea17c161473937d2b01023806c5d"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "cfb79804abeaebed3cfeb46b38760bc7"
  },
  {
    "url": "readings/index.html",
    "revision": "b0012cf3d1ed54028df191d22d647966"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "8f8bf1c481de076079194bb04d1033ac"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "96808114e66f8b5dfec0384c13f18dbc"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "097b7afb314e99ea1444de813f537749"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "3b727a4cdb22ece033221f472a48924a"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "f7f0c3881aaf73e59df564b3574c0378"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "0ec41409f7909018013bfb440693495e"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "da91a30b0030aa543195a71687d79155"
  },
  {
    "url": "readings/Rust and WebAssembly.html",
    "revision": "1e67ed7af9f0eaed4d4586f3e43350f6"
  },
  {
    "url": "readings/Rust By Example.html",
    "revision": "2f9bb8e7ec0dedc5ee24de7f27785f48"
  },
  {
    "url": "readings/The Linux Programming Interface.html",
    "revision": "fca535149aa15c9fc819c459e0c6b9ad"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "c802da14129e47e203495c1e9cd4567a"
  },
  {
    "url": "readings/The Rustonomicon.html",
    "revision": "8761e9d648b7876b65042c785aa2044e"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "53db600f33f6216085b95a0a3eafa9ed"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "20a0e03955a56af0d411b0779de4e56f"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "18497ae3bd6288536e415138f2e4faeb"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "01db84f4db6c58d1a80e3d5f8dc87327"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "fa7a65bf4a5f29717f7f5c32be6368a6"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "6ff085ecd0c7228d13d3b1f5bbc7ce96"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "1d2a4a5c3e80782984e1e7624a3dee62"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "38f1622f06a8bb30c71781977be37d63"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "358e334a48be19fa3473dee13f88b531"
  },
  {
    "url": "readings/微积分的力量.html",
    "revision": "6ebfb91cab9c5c4a4a6a410e8e35aa6b"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "d16c8f910755861c1ef293528c881691"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "ec7f334d1dc4178f5c2610dd04186edb"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "d8847290fb8e4b4d19783de8ee2299e8"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "687d11b19982f98f86e118eda020ce06"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "ca0b707c08692eae177cf3719c613b89"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "e6a2bf2529e7e1968a3430329f974e05"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "f7f70e1f5559315fd6bdc50e51d80429"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "b99202e85d5c34ab9dd83e66c9cb1d4e"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "0d366edba3cff31737b318cfa5d7ec29"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "90ee4c1ec4b89b1de72dafe4d64ade70"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "215f4c18a59a06083e1b5fa5806332b7"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "8a786276376d872c7bdd22a234f8f164"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "c1988920b256937c41ec25c9b5f1205a"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "32da313258f6f25358b88a40a6f7529c"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "f7a476645440c44ddfe2c3819449eab7"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "abbb8a19aedf6652a57725d8a29d5a34"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "4f3525055b015880d22a439c92994358"
  },
  {
    "url": "resume/css/style.min.css",
    "revision": "2a582b380019e292c1810f19db28d1bc"
  },
  {
    "url": "resume/me-en/index.html",
    "revision": "4c8f1e2a9ca9cc0c421da39462bfaa87"
  },
  {
    "url": "resume/me/index.html",
    "revision": "be192fc48e1a94354691a7e45350c084"
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
    "url": "scripts/notes.js",
    "revision": "0c8b3d5609c44a21dbab8a1f2c793e9c"
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
    "revision": "c8b3554d8cda571112f87df84a4d64b9"
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
    "revision": "a5ee28dc6e9f7ffe9bbe9937f02ed51a"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "9eeb7474f1690f466024d457dc2578c7"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "d0c41f4ea308130f6c874e2d33227fd0"
  },
  {
    "url": "tags/ASM-js/index.html",
    "revision": "65ac457c88fd3e0475281931d290aa6a"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "63d2b3c1e6dcc1844ff0eea4c87c56ac"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "0c262a41321d34d88a160e96c3bbcdcf"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "ca71be4e609e50c6c729fe7d7db8851d"
  },
  {
    "url": "tags/C/index.html",
    "revision": "12fe30bb3f49ef1ef1cb1380866e0227"
  },
  {
    "url": "tags/Compiler/index.html",
    "revision": "8603472171dde5e58dd1bd711d3e7608"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "a0b738a3d17e0b3367360b224093316e"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "62e2a4696277ecb4913c1812039b7659"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "ef7d3e80b7f89f7ac9f96a05d3a33203"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "1e23636af9ca572a5888dad005f847ea"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "fbb3b5fa0259a255d4b70667989cdc9b"
  },
  {
    "url": "tags/English/index.html",
    "revision": "141dfa6409f1d1abdb527c5e60f2f80d"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "e9d503d9d71e13f6d978009b68764c9e"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "e7551171ff71f58132172130120be28e"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "9cbb667db8cebf07a5e898be90ed99f2"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "94ec640bfd35e60876b330184117ef9f"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "a8fd8de05697812645d8c2b8b72de476"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "c5f835c3b8f97088649ced49f4e7b9ec"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "b3f05a38682736419d4eb9e1c74f5837"
  },
  {
    "url": "tags/index.html",
    "revision": "6bd0f3666179626f8082df2a3bc16464"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "01a6894ba43b1a3a5ab809e351f8e06c"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "28a447131d1173dffaf05b5ba3a92e9b"
  },
  {
    "url": "tags/JIT/index.html",
    "revision": "8d1d6f16125a3ff5eebcce2d36ac9abe"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "bd73af4d15a75a8475d07bae4fe40270"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "b16d7ea09688b0cc081f85e1deb81eab"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "a74c86cada1d284d3b6f01c4b24a5fe7"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "b6d4042e8015fdf65f299be66a283652"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "70013de1abc2e6e8992b162737164202"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "e46c25a8b546403610a2681b0d7c9e40"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "a25b473fe6a6d67ece860f94a499bd61"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "68c002e67341e65a359a77b39949fad1"
  },
  {
    "url": "tags/Others/index.html",
    "revision": "f768ddd27cc7319c41939c2c6a037348"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "9b25149c5f74fc973c5c68e6b0f0a204"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "31863380c0f2048c5cf08eed85b842aa"
  },
  {
    "url": "tags/React/index.html",
    "revision": "c61eed9e457f1c9238229fdf6df24260"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "04dcd7e04a6f2c9a30b887caba519447"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "993f0ed09f1380e47236b8a03616049b"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "28b04240fe6b6e879967a0ffe0a4b8d9"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "da6143bedd98d16c5ed54096573aea89"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "d0912b06565cf6f45e074bd7fcb0bcf3"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "d3759c12580556c7193197551668d8a1"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "cf6d9f30698eedb3b53a6540127fb2b3"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "07d1d610b44f132013f5cc746bacd1fb"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "c14800ca49e9a55ed8b6408b4e10e780"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "a5386f09c00363e5d1304d242ddfb019"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "b47f4a54b1166538df0658657d97530e"
  },
  {
    "url": "tags/X64/index.html",
    "revision": "cf735f13ed4892fa4eb75887ea2fc147"
  },
  {
    "url": "tags/X86/index.html",
    "revision": "d5fef6fd8754e9ad6110bdeea254b794"
  },
  {
    "url": "tags/互联网思考/index.html",
    "revision": "c97e9056174731b65005a64117f9ee76"
  },
  {
    "url": "tags/代码保护/index.html",
    "revision": "cce721fb3fc6bc1b81a013f79b7c6d6a"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "e2259debfef1b48a4a703932f94f68dd"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "2c1cdb31bfc3e31d4a970b4e53557e27"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "7bebed38b63ddf6cf6147dd6e9749d0a"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "a98fcd75e41afd2e0f64e2c8fe8f741b"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "9dff3308bc56af81a508c377b0a536a3"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "cb5f59cf68fa4d26e63e1834f94da37d"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "65b0c92531fa6c83a2b353f30542d618"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "528f76d493e7d45f4175ed53be0ea53c"
  },
  {
    "url": "tags/女装/index.html",
    "revision": "bc9e38aaddb1443fd7d200336c43f321"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "b3c8ce65c625f063ab5f3e6b51fe34aa"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "b81c56f0b29d8093c01fa489b80c85cb"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "341f4e50caf0c07a35663e8198364e33"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "ee67a313b9682e016e8a4b663219a2f7"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "9aa8042a1abc900e7ded90213422f765"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "ca553b0b66c67db12e994cbe12951334"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "23f19594c1cffc8e0c73106c7fb0334b"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "ebda94072178fec75d3f38f450cf30e9"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "2b372278d4a7bae6e0e4e1c32f4eadc1"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "a0df7351c4cc070dc2d9090c399c7fdb"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "7ada2e2c678ea1c60cbec59e0510ff30"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "6f73a4e474723632324580da7e73e936"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "4ecf41e605997c0fe1228ab762e06d4e"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "7eaf7a46a07f280bde4493541ee615c6"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "f28c6a6ba1fe69b139d2132ed980ff10"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "ed4ee949a215a3282505e5ed404cce3d"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "865c180a84705a87ae51ac2639c37e03"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "5f3dc8e90e61bc311a31165a612335b3"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "ff7a96d11bd724405e70f8f247f93851"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "26bd358b36e1eb835df5ee4ecac3b5d7"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "82fe18d388af41a279888de887fab77a"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "8d56106174521a07a59329a15d3c67ba"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "a8596b15cb1301b8512fc4616440e028"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "c579f1482b89ef132c5b605268a25c81"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
