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
    "revision": "a79be6e6dbf2e48eb8c5a608424c9c24"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "3d8b9c7c8c574a9f3dbc9bbf65c8aae8"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "92722a273d367d7d477531e7b82647f9"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "8553e5674d447765aa3c0fc4a312017a"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "f219cd883f174c5e41ee328c2ca1e024"
  },
  {
    "url": "2015/01/02/IT-行业的入门与精通/index.html",
    "revision": "e1418052729a3e54f2b018391b04c15a"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "b408451398b5e315552cea11d512a79a"
  },
  {
    "url": "2015/01/06/深夜吐槽-笔试与企业文化/index.html",
    "revision": "14fbe17652aa2ceccb4a65a86a773da7"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "c45c51270ec4c1d69458e83a0b3790e6"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "177e6ac5bd80bf50e5c612446de9f12e"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "72b3e2b1e3d288f7501cfed47688d340"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "365bee64e916c85286ae1cb1293d034c"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "a21e6954f5692a60ffa0316bb7154f1e"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "4c7b686a9031f5a46830eeeae220179c"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "d548e261b2dc1af353afdde89398ac1c"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "45a4f114cb59df73724bf58d12f36f14"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "78d2f5fd7cdff554b31077101745f771"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "ebb53efaf13100a0e63b93236c90f475"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "7c09b896d7b0d99f336a69bf850ec9cc"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "44a486d47181a98772a16ab49ff5a730"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "94dc2d394198d6006901bf59da60fadd"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "62d616df91c0f82708223254ad5f2d77"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "b5591240710bcc4f6248ba7c231eaf6b"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "fb1e137f236d4b3c5b2cd6a84be53db5"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "04ef49571aad5661a583f32c24b3aefb"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "cb038d9f45bbd945fdbc3640be2c8ba5"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "78ea8316d8aa57aabc6a086ca7da5368"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "3f7814d95cce4fd0f6ba1015e71a4324"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "0df80105862720fbbb6aed82c9aeb1d2"
  },
  {
    "url": "2016/02/12/技术是成功的“绊脚石”/index.html",
    "revision": "673b00509db82cc34e46cf131995f27e"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "bc04f1d7074df7e8d64dc4ac202dcbb2"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "6fd8811518e62e0dc09c3565bae89683"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "9ba6397d2be53dd1bd5c97ffc78d7410"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "767911c594163406471a584b774f691e"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "8aeaa884a7f686260fe908464d2d5151"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "09e45a8a89abd1683fe51d9ac33c7f5a"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "25b96392ce2ec75166271a4a58d9af30"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "cb23705e2f00fedccb73c1e50dcf95c4"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "2da61cde5a36715e46b4dba69dd93bd7"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "b2295f1b9cf544bc83754cf196ed8369"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "f42c7316ff747cfd32b518c519162264"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "e2a1a956d75ddad2776dcaccc4a33e51"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "5575325bf199fcae861301d2f341d65f"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "dd36c24c0b029ec596cc4195e715aa25"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "cab2e5014ada59ed1b45971f02c16c84"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "72404b78d58fe03fe0ea5e900d28d01b"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "d746c7589518e96765b445fde38f7b50"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "3225df47b6c9b44b657cf75383c8b53f"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "172806cf59de629dac3a2eb9c6cb0047"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "c8a37890da91c2fa3bb325b8319bb454"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "64512ba3590c99c66c4a0c3474b125f9"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "3bc54223f5552a7471f61e7398173caf"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "d5c0f2b4910bbbdfd67598afed5c05a3"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "9f31dcd66541e0ddcb830f5e43baabad"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "9facee80b55f8d76e027a8bb1ae41a96"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "f8c872d1ac2036ff6669408504649e9b"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "a24c382eeb5d29ae64f28c15012631dd"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "57229257400583a78b624392fa7234b3"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "b6ac645bac475b9651097290c38c4649"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "7005c53f33b80aae3955cf3072fcdd5d"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "167336f9c09926410a8bc4ce908f6303"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "4a4f7fcbfc93c3f3626723bed54f6be4"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "a43192b464132f2441b13ca3bc49ae20"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "eec2c69726f99fcd41fe7b74894069df"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "70832ab602eeaf1449b8bebdd0384a87"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "a35668cc0d3c430aee1a41e5f66d67f2"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "83e7684ef0b4f002ab90b865c9db7eb3"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "2ade564d51d4cec11a90585e2a4ef917"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "7e3ef9afceb93b3844be3ec5865dd799"
  },
  {
    "url": "2016/09/18/算法基础-常用排序算法（上）/index.html",
    "revision": "deec392cd79c8b80a72cc214a3ca71ca"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "bbf70be4a5a96d8598d65f78acdacd81"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "0ff059b421e2fa5d89a01ab262401078"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "526288a7e1ae209c77632188031c5e5b"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "6c9caae9974210c7acba852872eaeb52"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "a6b7c2f7097925779339be571ef11a86"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "82393b6e9896fa945226ff773e7ba1a7"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "3f2d07db53b87b4c9967ddbe824b65ff"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "5e85b47dafcee5745ac857ff93eddc19"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "f4d05db23d69a7efb2c931e3b29416e8"
  },
  {
    "url": "2017/01/16/2017-开篇/index.html",
    "revision": "12e65f00f3887882ff9190f8ae0c781f"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "45a1aeecfff7caac3c94675501a57eaa"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "69e3aee1ef962059f25045ede3a5cf70"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "0a704ec18946f1d3d1fbd1ef9671497a"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "79cd861d6611cc6d98733d7338790c51"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "57ec3bbe84fc6a03904b65a5391bdb0e"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "6c7f6b13b5f4c4e69463ae9cf750d992"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "3f9d0558888daffa960741d13b3d4b23"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "73ac14ea7a9e460166959dbe3c8cda4a"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "6821bbc011947a39350ac4bb2bf9d172"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "6bf90a36245c2acc8ded27872b381cd2"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "26b24ea4b0badcd15d0306c8a609de7b"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "63ce9e1b2b307ca3109bf8d8592b9443"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "a77f4ec8733b2adcc7de2f56e92e418a"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "d3db0cb4f50e44a4427d08eaeff3e7cb"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "72a4c703ac039eb6f7f3ad47f5a6cadd"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "26dbb58c18921da137e555f2eca1e831"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "59f3744ad5cc59e3bec9c0cb45c8e5c8"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "d464f47ae58a6bcf0d95b08bc4ac6c17"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "95c9158e684538fa1bab53087098df0b"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "db7ea853b54949465fb01d3728a49817"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "30da4e6939eafa021022da19f388b22e"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "d6c32f240c40e24355199c2876c28acb"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "d69f02e9ef27c5d4303f176db793669b"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "5eadd764e0554cd9874e895fc790cb23"
  },
  {
    "url": "2017/06/29/Common-Lisp-全记录（一）/index.html",
    "revision": "c95ffd027fad156da3f159777edd907e"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "8c36de8e12703240f24f68eb740913c0"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "eac2b2cafcf32e90f128cf584ad09443"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "a1181cbb92e6b9e9f45ccc8d7c61c745"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "38b2382ae4946af70822db1eb046409e"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "f9d9734303e2c080ccce27d84277ff21"
  },
  {
    "url": "2017/07/20/Python-高级用法/index.html",
    "revision": "4b0055a4e295588da1be9a581b74bf67"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "077ca41b42ecba173f57d86d71daba36"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "a6315f8b9cbcfdbd48c9e381d5db2985"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "573af42a04c0b66a61936734ba5a3582"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "75f099675f78c5fed88528752c494cde"
  },
  {
    "url": "2017/09/30/一种新的共享计算力模式/index.html",
    "revision": "5ecd6249a2678c4ee425b8085ad87664"
  },
  {
    "url": "2017/11/04/Docker-最佳实践（一）/index.html",
    "revision": "7733948def6d7c131d1b9916c0a251de"
  },
  {
    "url": "2017/11/07/Docker-最佳实践（二）/index.html",
    "revision": "5a4cd3c19e8b06fde78ecbe6502a68a3"
  },
  {
    "url": "2017/11/09/Docker-最佳实践（三）/index.html",
    "revision": "08d8c86f1108619e7077cc32d4b03776"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "f19d3058b6ab0f9eee12ba11b9fe6ecf"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "6e4c92589e4126d110b36a488958e2e6"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "8631a76eef2c38e0a1be6ef28cc2e9f8"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "224c4525cd5df7ccf9a687f5f1b0c06a"
  },
  {
    "url": "2018/11/29/Git-最佳实践/index.html",
    "revision": "3454df5c322c29de138f482aa1a69b25"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "12eef781055304de8a4d9771b04baa3f"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "1630343a351bcdd406ae80590555d570"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "b9b723cc7a2b384a0a6e7827b9475dbd"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "32c5b469e617ee301af7a3988a15e960"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "4f7a28843f086cdb13b6e4e2e86f1874"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "b65b86a81eb5d0cea71c53fd15145fe7"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "fa1e75ad2e23ad924106566ea60cfed1"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "8189bd8a3857dc2fec5f5e09f5f4a968"
  },
  {
    "url": "2019/03/17/女装之路-完全大揭秘/index.html",
    "revision": "4cff054ebf9bdff525b211c4940589c1"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "0c03ddb76fbc8724c8d85f04269f508b"
  },
  {
    "url": "2019/04/10/浅谈前端代码加密/index.html",
    "revision": "a87174c76d9cb466c6071dbfa147883e"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "de0208449decd620e87bb7a52ad49173"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "caee6cfc1a3d2b58f81f1e723b31344c"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "1db9870a2af87fa68fb889349d231e50"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "0a73d3341ca93adb0ed3d407bac80915"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "da6ecd1e5e8bd6e795812d022f654583"
  },
  {
    "url": "2019/08/23/54th-day-at-PayPal/index.html",
    "revision": "7e724b379aca442f1f13f8490af664d9"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "16d897fd8e3f5a70f53350614c1b7561"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "c40a0ef2e3ee8f180f155b8cd2502aa8"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "47df6170be13767b42449d5e18473d1a"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "403de19ca42ee1f25bf1641e21f99f4d"
  },
  {
    "url": "2019/09/13/Privacy-Policy-for-TOVD/index.html",
    "revision": "d7a09f9397f1425e2d8a448156caca3c"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "78bd65348341b10ddb658b44b7f3c06a"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "e2da3da22892d28903eb92a251acf883"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "a9d0ada9ecdee18d5da9fc7ad957b8d2"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "dd843f13b6f3ff24b81ae472b0ae217d"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "2309a34b1a8ba90c4c70facccc180d08"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "584ea86137e807b7cd007504959c4c8f"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "d29b44d9bd01b79cc6998b4c798891f5"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "77366aca089fed0ebaef804089b0e09b"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "686e44d38de4477ad0aa4385bee6ded8"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "c6ef362d98af0fc047329886a0dcc4eb"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "af2e86c96340010250e176cc21e14f00"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "fc6e35a2ce22691d49e153e6b01ce9d0"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "7473ad4f00dce34ef2e1c99f34a4e64b"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "1a5d3d268e6d81144df488fea8f77739"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "6c10face0b08c47c6b8a634644009879"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "701728d934605e81efafad5735624ebc"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "9daa4750fd4fb965e71385833a7e28f4"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "e698ce5c2ec531e4af6f528b524c3572"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "80ce5e1cd9d0b95f1a2533417d609697"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "594371c5337da2f06feae1c2f046f859"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "f69f9c542bdfaa1c4d0eb39177c47814"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "3cbfbff233ac1f2a7954a3ddeccdffba"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "25ffb39a68e4c22ae32d28c01eed1d89"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "2383cc1433f1fc71a512250a7c0411aa"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "44e063a3cb01141bbab4b585ba192f32"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "c4b076ed67a56f7d1fd43c417dfc5352"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "9600ead64460b95dfe7eea070160c55a"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "e42031a06acd39acbc06d3a10b616427"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "9c5b38531c304d5e5c87f4fa823997d8"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "42fab477cb7c71b5865d1f5f78c29822"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "d4a1599bc840850e8fdeba1c296c790b"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "f869980617882c2ce83ff6338909aaed"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "078d22979e3a46e382bd53fa0a1e1dab"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "639d101be5a777ed46b460b15a2ea23c"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "841200f800e2dde9ae9c917373fb633a"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "d8cec028ea21de5d3cb64c2a03db1d88"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "4f3a249b083feb3cdccac33e080d4c8d"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "a3ebb723e773817b6fb3bee048ff3c68"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "075787904c8c263a453ce066d0733139"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "251d669d5e932a4671c572d86e0b5195"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "013bbf90b64c7968220213afefb27869"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "947a9fba78ad2b3b99f16813664dc4dc"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "74aa421600a69c8106aa086e741b5802"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "aab1d0b970aa4dd074b7be9cf6306771"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "7b9ff77512dd213ab9f712a454f13613"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "15220ddff4dcc0216d30324895891f63"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "76296917f43c533af6d680b9d5e70d10"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "882cb9df9f1bc6871ffa12b9fa11ae2e"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "1be69873d83542f1086bc0fe2d5090b8"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "23680c8fe75163a6a11acfd4bd74ac6a"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "ce3b712aa2e222b5f8b4556287a22c3c"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "919d10576b684d61542c056be455d6ce"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "26ff808f94f42d974f632859ebd3b664"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "913bf88c872440e1683c01d004c29692"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "7fc1ea83d6839659ea18701a5540b59b"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "dc073f7b96683e07cb2d4a23323fc9d3"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "ec3d0583dc11324eab527fa2999b8331"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "1201f6c9341d55b62a4a47540f94d05b"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "3c47320f83f476acb7932a1635247b69"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "00acdea54fe672e3a542e8181ebc537c"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "3a0cc8425f0a224d919af74d7a85a6bf"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "3e1b6cdd81072e45de8e4140d84f5ed1"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（一）/index.html",
    "revision": "07d2e4a8abfee5d0dd95a36201591cb0"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "75fbdfa7bbbbf9ea729e6c00e69025ea"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "c20621277ec62d86e5c9263b4f9199dc"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "b1b13df295088560e6f4495750db0947"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "6a145d5a801ca7e766d5bf6cb9b93cbf"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "95fceb3764a532c60a726fd2ba943e7b"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "504ca494faeb9e4fcf43eca3833ef306"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "495ec608dd634b1dd7ab5a059ad86641"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "b1dee9bb11cc97cd8135c54711cba21c"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "f8c63c0f98193283ea34f9038f6343f2"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "10ef0a725606069fd5418bc2e0b24be1"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "70e6e746d79fdf3a1e5c70b459186afa"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "ec49af369bec9b526e38c3f10f65db10"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "edd03e84ce8fc679e7772dd3ee1cefe3"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "07ebf6b0b3a6fe5caddcd0c86053c67f"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "30b4224107515bc51a085b8995a9072d"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "229cb29159e9027951bb3d62aca56512"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "62b5c23a56b68b4dd1c701d613d5fe79"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "bab33d8e200f34d0ecaceacebb23d99a"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "2eee0ef82c2426310375b8e9df3af132"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "0638c35fdfce0462ecbfb5addf12f585"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "dc41c9f0df353878b9a960ea4c8cdf82"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "1eb163fd43a02cfe3095b7209b2b68a0"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "9923c7b5914dfe049d95c25bc3395094"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "66bb8422bef139f87db984f5d0697456"
  },
  {
    "url": "2021/02/22/《HTTP 权威指南》读书笔记（第 7-15、20 章）/index.html",
    "revision": "0f59c1ea7e20ae94fb800460f81ab376"
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
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2015/page/3/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/04/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/page/3/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/page/4/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/page/5/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2016/page/6/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/06/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/page/3/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/page/4/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2017/page/5/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2019/page/3/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/06/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/06/page/3/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/page/3/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/page/4/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/page/5/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/page/6/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/page/7/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2020/page/8/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/10/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/11/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/12/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/13/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/14/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/15/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/16/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/17/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/18/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/19/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/2/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/20/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/21/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/22/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/23/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/24/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/3/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/4/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/5/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/6/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/7/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/8/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "archives/page/9/index.html",
    "revision": "2064ab88bdc2a267be9236633dd71240"
  },
  {
    "url": "articles/index.html",
    "revision": "9c752515dea068ea7ac2da4129174067"
  },
  {
    "url": "author/index.html",
    "revision": "728293d601211436e922719403483e21"
  },
  {
    "url": "books/index.html",
    "revision": "89c9416bc34c3e994c8c77fe9bb6b46c"
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
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/10/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/11/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/12/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/13/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/14/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/15/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/16/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/17/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/18/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/19/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/2/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/20/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/21/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/22/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/23/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/24/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/3/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/4/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/5/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/6/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/7/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/8/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "page/9/index.html",
    "revision": "53d9b5089b2fa59a801a61845f0c1b01"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "2eea53f466d045892fe45c76972737d1"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "3c8670b2a7ba8b45a56337d8a39f910b"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "c9f265a8c61d9a4e65dbd9af5fb4b58b"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "26165da5c85ea3f40cb31e1bddb0e703"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "bedac5d2192eff7f7b86ed19f2e8969a"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "d6b48ffa8a5a3a68d103979a88f89bd7"
  },
  {
    "url": "readings/index.html",
    "revision": "8e020734242a54c37a7ced3c3970a399"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "864492e78b24375519f51449333a9914"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "fd4fa9af107e85e728230f32805453f0"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "ba8e9d49b8d2bdc29145f227860a96ea"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "03e01808660980f9b7e255a62e1d9b1c"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "9fe7471f25f4875c11ed543184dededf"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "b494587f10ef0b8e965d6dd292cf2aae"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "78cc2ce45cb4a54e4e6ebc5e94ea00e7"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "db5d09263525bedd546116ff5d78a5c1"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "8619494d01cbafb10a574e3f93aa1510"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "33713d405bcd6710ebf3ed3c416e1438"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "5f06eba5407355b5646b2da9753bd25a"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "1cb9613e7715a43ebbc6b5e3af2e3b12"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "d739e2c1c1137c1fddc4cc2039aac747"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "5e38a8f9f1aa65812f2de938802e00e0"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "55b17d6c5a555675f435cfd3591e0845"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "102057b6fd008bc200526339f37c7037"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "3c9ef43e47a3cef3808a09efdb2b4ca8"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "e670293f3ba733737d47153252f45f1d"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "432204bf88a33c090fe0d1022aed2795"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "929793e12a042992e431c12914128588"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "c5ffd9d9c033a1556e8b3c504b6208a4"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "06a44cdfb0bc0539ec9e1e068924bff8"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "fa7e685b4ea94c83fa9cc5738f0a2c8c"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "55643a37a312e8505c27303035a64b4b"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "04d2638e53caf27cd06a3cc4c0d0c017"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "e5decf12345487950d7f606948cbecf8"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "50ed8709207feb0656467dacba5dc851"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "a016d2bdff1b69509ef1b03807fdb2ec"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "520efff8a745187148104955922c644c"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "2b2ba8d85efe9dcf4bf596224a3d786c"
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
    "revision": "e958dd33299efbb59a764c0362047116"
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
    "revision": "ebf25d179b488a660ccb0ab43e1f0bb7"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "68bf8a855f5dae02b95f05411d269287"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "23b6dea92194978a2d71c20475dc26ce"
  },
  {
    "url": "tags/ASM-js/index.html",
    "revision": "cc19a007978dd359d64439a6fbf3c84f"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "86fedc73c5452a40e1b183da4ce89147"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "360b8a50704f9d6fbd27935e5f545487"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "ea6fbe5df16aa22a14c031eaca31df38"
  },
  {
    "url": "tags/C/index.html",
    "revision": "92d13eb4de1fc07e26c1a0a2226328a0"
  },
  {
    "url": "tags/C/page/2/index.html",
    "revision": "92d13eb4de1fc07e26c1a0a2226328a0"
  },
  {
    "url": "tags/C/page/3/index.html",
    "revision": "92d13eb4de1fc07e26c1a0a2226328a0"
  },
  {
    "url": "tags/C/page/4/index.html",
    "revision": "92d13eb4de1fc07e26c1a0a2226328a0"
  },
  {
    "url": "tags/C/page/5/index.html",
    "revision": "92d13eb4de1fc07e26c1a0a2226328a0"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "1e258e6d2e04d224c6e7b4a8f7507b91"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "13a55aeb39da7527cd2a78a92afbb08f"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "1c56457d47034c6b1fb5c737f202094f"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "cc11f26a3feadb6e769e7edb10cdb58b"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "4226ddf09ac38ed65339a8dc17b1928a"
  },
  {
    "url": "tags/English/index.html",
    "revision": "8a31aedbe8c950676fb65bba0c6b5985"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "5e1b543f137af87a86ae11ad7bfe4d71"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "472b05aaad4053e5f06c6eb92e84df76"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "d39ed6f74d85705e9daf3fc0a5b84892"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "aae7237d8ed6ac410a03aeeb03fbd6cf"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "52a12fcc316b413372fa5002c996c4ca"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "72196742252dcb1d70c38f052815dbb9"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "c47288410505630a90f3ba071037c4e7"
  },
  {
    "url": "tags/index.html",
    "revision": "218f60f2d04386f03e5145ff94481668"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "472124f4ba147b4e3db096d5247c95db"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "159a147c177d01285d02406b0673ca6d"
  },
  {
    "url": "tags/JavaScript/page/2/index.html",
    "revision": "159a147c177d01285d02406b0673ca6d"
  },
  {
    "url": "tags/JavaScript/page/3/index.html",
    "revision": "159a147c177d01285d02406b0673ca6d"
  },
  {
    "url": "tags/JavaScript/page/4/index.html",
    "revision": "159a147c177d01285d02406b0673ca6d"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "52df49e8a0bd0db4fcf97c31631d8f17"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "a78b455801f26b9fe5299bf660428884"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "3221c9f9a3e89e001168d85010ac54e1"
  },
  {
    "url": "tags/LeetCode/page/2/index.html",
    "revision": "3221c9f9a3e89e001168d85010ac54e1"
  },
  {
    "url": "tags/LeetCode/page/3/index.html",
    "revision": "3221c9f9a3e89e001168d85010ac54e1"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "e13c93ebbfb1c50029c0719581b447a4"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "59aa32ea5cc1ddde002b487e7b802c2b"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "51e207c6bfe37020c11fe9f8e2725590"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "64b2a6c7e62fb4eb06a5cc89bbbfe23a"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "5739ad2edd129389b5e56a38ed9a8bd9"
  },
  {
    "url": "tags/Others/index.html",
    "revision": "64b9cf9badd3aaca3d9297fbd227da97"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "5ad8134f7597d269ec4958b23790f124"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "c24f0f306e2779672f58d747b8080733"
  },
  {
    "url": "tags/React/index.html",
    "revision": "80570151a6a2a88ffd9147a2bff14f34"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "5b8a2c1fefdf8c783e397549b67df823"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "80f8b4e53aaa421d952b145eda0735ce"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "7430f02ef63d2ebb4d92561d8eea2709"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "5f676071927dd14ebf24882074c48717"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "df26f189d5432ea82f2091d9560d35ee"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "045a3c603e2df045b046afc5fc80a28e"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "9a57d8ea5bdfb6c5735cd67d6b464b9b"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "240c65dfe405288f3605a58fcfc6f16f"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "02e250be834d6e28ac2ee9dd4e39da83"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "4d3855ff8efd661a8e02810a16892434"
  },
  {
    "url": "tags/WebAssembly/page/2/index.html",
    "revision": "4d3855ff8efd661a8e02810a16892434"
  },
  {
    "url": "tags/X64/index.html",
    "revision": "e946b092cf200cbc084194cfb58c8d7f"
  },
  {
    "url": "tags/X86/index.html",
    "revision": "aed8a1a7d20f2fb3ed3975422266a852"
  },
  {
    "url": "tags/互联网/index.html",
    "revision": "1527fa525bc0a76bdba507c226c4d03b"
  },
  {
    "url": "tags/互联网思考/index.html",
    "revision": "b83a597d3c2d771515eabffe48dd5538"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "1040817b5d0a16ae33fec62a18bf1f5c"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "73452c718d79f7d90e21b9546398004a"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "21e32e4c3d24c4902e13ac9ea5b7e725"
  },
  {
    "url": "tags/加密/index.html",
    "revision": "c6585b461101e9deb9ea2c219d2c0d93"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "35fc6f8c61bf9777cebfa64768eea6b8"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "192b8d4dbf8680d2e0ceec4d73e061ab"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "962b03941edea1b64ffd4dc14cf54937"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "15e19f3a6d6a5f3d3e734fe56e327848"
  },
  {
    "url": "tags/女装/index.html",
    "revision": "d6d4a330313f1e97b3a519e44c991eca"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "7e98dad995487a8064f80f6d6a6cc90f"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "587e296dd8d16f39bf9c2de458aec024"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "3d2ae09135ef7c6202e0a27c18c81084"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "ca8c26311dbfc64a563a341aed02e597"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "e42612aa4c02e2c2cdac249344827643"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "d14219106048814dd430d10ff3405754"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "c10e8621f095e4c2d8cabc3d221fdc0f"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "063b849dd5fe041a5ebf3b9a39f3fe45"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "1e3ddab48a5cb27a809678d9f8304095"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "df96d999fda4640278e9e67ae9500c2a"
  },
  {
    "url": "tags/算法/page/2/index.html",
    "revision": "df96d999fda4640278e9e67ae9500c2a"
  },
  {
    "url": "tags/算法/page/3/index.html",
    "revision": "df96d999fda4640278e9e67ae9500c2a"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "263be2a173a9d5c2d05abb7a36407008"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "c6f21d780f3bb7b26fd321de7d246699"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "0a35cfb8eba15cb9919e54f926fce58c"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "b75fd26274805edce4884bc0313aeae0"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "442438fad7bd526eafef15f3d6c41474"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "cad7023c7841c24330c6587f0e845f6f"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "83f17be10fe5b2ec142d89034f9da3af"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "eccab8ba20f42706db65d5915fac4ef1"
  },
  {
    "url": "tags/计算机/page/2/index.html",
    "revision": "eccab8ba20f42706db65d5915fac4ef1"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "59b3b8bd2e3d92996ef3e704cdc7fb31"
  },
  {
    "url": "tags/设计模式/page/2/index.html",
    "revision": "59b3b8bd2e3d92996ef3e704cdc7fb31"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "d64e6abcbfe350de4abc84a306ce4079"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "55864985b74c0419887e528e4a27cbf5"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "4394efba353bfe5d13c4d58243f1d011"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "532ab97c55fa5f25a230f929e065dcae"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "5a62f77f4627ddf3892c19f7965cc58e"
  },
  {
    "url": "works/index.html",
    "revision": "1f2c9cab3bb3aee50006e0eb7578733d"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
