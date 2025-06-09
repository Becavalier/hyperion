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
    "revision": "9131e8655c1f0fd315f51661860b1e5e"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "b75c9c2b99021360e981e91991ee31f4"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "3a4d987a5023636147fd310dd6348753"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "17463a9661f384e1bdf6b2eba5c8b8bf"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "1f31b0900ca79a13c7cabdaaaef20db4"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "462c09f1f74546b599dbc7ef4609d295"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "e687523d23a82677795d88a60acf45dd"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "6c5c7277caff1945a77466a9f272cb96"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "ebe99bb046dd000e4b197bb453c10f9e"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "38117abd574327681049e7b950d5d9bd"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "46b077ba13d6e4ea9f0df82464f6a984"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "9375771cd4ff98c995366957d256e59b"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "6a713f1bbc943ebf87046c7db3a29645"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "344a603187681a322d0d548967ec230a"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "71d6c5b3cec44cf7b168b229161bd64d"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "2a024a4c39053c26c32da2ba5d2a761b"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "d09a46f447894f6d2368e64c91bfdf96"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "ea427a6ff7a8e41de12c822fde3f6b40"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "5cb89f54200c76d95d12eed72310684d"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "24890be5ea7e2f307419ac852b434aa0"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "c3690bfbcf18f06ed4ad3c381379284f"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "acedbd4f96fd9895a1bce0e13cc67525"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "24142cad0ad4f314fb891c863ac6c66d"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "57a16071969ed897a17c2d080b4c45bf"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "5f9532fed9d1263654f282033a4166d7"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "1283203e0951e5d850cc52736d759371"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "e1c12e1a11fa39ab1f6a7510670c8a13"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "be32ebed6b31099b7bdedcef4b02678d"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "76b839bb22fb99a72d3aecd909786955"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "f3d9145c89f9a3486a7d5d1ef1a15b73"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "2eb1f2ac60cfc047bd9fe0ca6b9278df"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "107343ac495beda55924c97d9fa8ce55"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "f5c74ef2a4a0191c570627e39eaa8899"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "20dab58d56c4cea7f027cc195d2e99cc"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "a302ca1208871377960227625b264510"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "0f89438705a002e0cfe5a1e93baa8fe8"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "54273976d093a517cc24e8ca5136b8b1"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "d7b99611f8b05fe57d06d6722bbed7a1"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "2c5de573e962ca472c8efb7f1a5bbdb3"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "757c8810b6face5c43bcfa8dd50bc722"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "28d568c65119b7368ad12e53ebe19539"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "78ebc7c8bd0ae6176fa72d8e2b7addaa"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "406bea01ea582faede4200ee6a6261a9"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "a5b570da851123850cd17ade924b3ef9"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "26352000086ea43caa376555de6f926a"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "33bc097bf5fe484cfc16f8d76a2459d5"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "6571ebfa9565571e3e3acad69802266e"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "fc66099156ebaa6a6434ab53512f0a48"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "a58e637e6b28f14a6c4811c0369f52fe"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "64839513d11445294ed7ece3e8ad638e"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "2a883eeab5b41b16ed5b3b7f41245eeb"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "3b169d58898866e17cb0a9f2ea5c9251"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "a2e45def17057ab3fa716caef50e8940"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "815bf40c831deb01346e1f8d3fe23e89"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "363f70feb71a90a2c59c3eda730b7e6b"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "988eeb502fd52ecc13f6c135df9f8989"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "ba64bd4019780ac81a8693350387a676"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "846386074466c9d6d0d5c29d8e6a62eb"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "8cf10360c8640d05a6f34ecb63428a5d"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "593fcbbf3fd4d15e4c4aca504346ad48"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "f90d1413550e2ba6f9fd21d26d5762a3"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "bb1efba9ae2f516a5d09861bcf93baf1"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "141f41debd409ea039e118b37a835225"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "ab3d7ad9c30cd5831bbfb790e25d16b3"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "85e187c0fdcda608f8c6d342423b23ea"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "b6155e8965a037a24a644bd9d1686151"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "6f00abc3192da72c06f4c06c5ee6b846"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "ec8b53434f9543218108220127b32b63"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "e2fccc99ad46b838b451cc8778a9908a"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "498ebd81f2ee240340d4e45fe9ced3a3"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "fc190be399a4e497318749fbaf9f0031"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "6570a2c9972ef12b08359ada92c01413"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "25aab2392e67d13a7ba65674565c6cac"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "4668e31f5c2329b83f4f81ea690ed833"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "0e83062d1a234d72031372b8b51bf67e"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "7d521c41d1e5f5262c8ef52b76cc64b1"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "38d35f6076cbdfda92ba9b7135f46904"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "9a73cd4cf2f59ca2a07cd1a32c5c1ea7"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "edf8709f8ba2ac575d53e75caeac7726"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "caff0cd462bb93fed316d9f2b92c5c70"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "fdbf649959a0febd9944322c4328021c"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "56a0f6d6d29792b40c568abff806fd14"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "0338d6e100b4b4657b8c7222c806e5f8"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "4d440f0745ed7299cab10026952e6751"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "b1828aa0e3a5bba93d1ca056fc949fcf"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "a2a39c3127e3b8b5ad6d957cc564c5d1"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "89eff0f16a5b51a2c8e625e717bf1f97"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "770f85bd0093ad2ecb8731b699e606fb"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "fbbcf13fc06195c09b1db735fb49a3b3"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "6d56c1caa7c9255a1495ee248fddb40b"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "0888954f3a3b9bab12eca94b98b3e717"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "c3ffabe4086fff6115e05e28da65d85b"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "135ff8d58ed6627d0ae7a50f4c565b58"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "9db3051bf8005c76e39a64b60074b6b2"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "87d54f282f2e3c4686a5525f44929438"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "247e859ea650e48a3e4ee4e11284cdf9"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "191e76badd75dc43fa17c2480beb3da9"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "cd1d39b90d0eb58b947d4b18ff188693"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "805c555d7517f9c840924aa054882395"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "c750a0ae2d816ee70fcc06aa3898c6c4"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "60b97471beadad7020ea7fd398084d64"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "dec37657b45bbc3ca1a99c045752c4aa"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "590c7283328ce65b9621da593e04fda6"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "2f7eb661227cc150b5be769938a3afed"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "8ef1bad0ad20822f7343f5882dd87271"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "12b0ecbd4e43055856580594fdceb635"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "19ddc8ed1557a3e15a4a244dccbad279"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "0eefc9c162aa404e3e45ca160224a81d"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "80f69dfd497d0b7b3259c27a23be464a"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "953c5ce3025956a2547dc44b0e1ee107"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "217b8cef14b1b8cf13a985c524cd7220"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "d47a51cb3c191e64b166f986962c70b5"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "f4f102e849cda1aff873d5d72909a99a"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "7ad88d4487cbfab3eb1b4b54bd8f898f"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "65051754bf384726a2206f4c774edecd"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "74354630af194d731c4f1da1de132c1a"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "b62c9a57895b017b4ee6ea1eafd5ab24"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "c5a9ebf322d481bd3dbcb55c667d5b9f"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "a87a119dce26f0b56a6e0d261e898b5e"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "bcc17f035a78ff2bd871f7319ac7b63d"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "d7eae8a2b6a6b9b716f770152691adf5"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "5c8861601f093a7a06c7727d63fad229"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "564fc1d65360f7216e84bbd6c72f5e83"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "6edef6f696f9fb9d2b6efb118c2a580f"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "810446e35a5f2a4e4947f69570a72247"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "c3c4186190e2c2e12a8b5eba59440318"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "5f91fdad49e397e6968c4aad4f1f0347"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "ba485cd3ff6408be3c747e1f62a8f72f"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "5c88d2a149c86d49d5ef4bf6cd9d31ca"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "3b7c46c5a423827e69ca099c01d9ebb9"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "265f383910c9bfc05304bb1b6377bf3d"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "316caf515b909c8ba8d4f989ac0b9d0b"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "f9da90ef15cb90c7115fe9eb9c2438e1"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "3d170a83f5ada5cd51540dc823a20df8"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "49792990ceb11b3f36f44d56ff7b600d"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "d192877e04b2b76494da096906b6577d"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "6fc67a6823fd61213fccb28ee874b79a"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "23bd0f646b2e0985610a6e732cb042ce"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "ca3e7184d68cc64a24b3290ac3c9ab98"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "50d9c69472914e315261fc9678a803a0"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "76b956e9a99f3738c35a9563b821ad61"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "60da2a4a07e719f74f76bc855fc2a5cc"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "76018365861ac7883ff39f5ae43f28ef"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "4d42ed8cb2fe3cdf9b62f5d422c53674"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "d957cca6e37c92a6c0fa697ad3429b9b"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "4992fb11e70a1f5476edd8e0d8cb76d9"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "c0c73e75d411f10ef37be2137daea2cc"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "58b516b22b3915322fb30a3de5f484a3"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "24f9f91b3538d6cf57493ba3918856ef"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "0050d316b279cea5667e9e77aa6bdbdc"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "df7efb0abba38ca71692f8ae9f57a545"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "3390c097002cf0f12fd98bcbb68ff184"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "a437ed3201881bb5687beb8ac18e4288"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "72d49c16db21603c45edc4410e047045"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "dfd7ac095ed2c369ee5b60aeea175393"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "8b60280a2dee9746b7ba47f1e7f0addb"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "5f98ef9f77e3ff417e13f518d75cb561"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "261eda81734918b03d4857e35ddbc3a3"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "1d8125a9c45b728acd320b4908329133"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "d2e304ccd11df2f8b2f25d782d3aeb8a"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "62db907d0b539968fba37168c4e5924a"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "d1e563e0da39b5970cbef46ac81e8b95"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "8262e7e842a58a296ea8038dd6e0a990"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "b8df3c0ce39568f7c0b40e0ffd9356d7"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "c8b5de62ab9e66d3170b5dc6c6e5ff55"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "74af9f55a1774331bf55dc2dce865dfc"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "84d627261b18de5dafc84a20f7ae98cb"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "43871603db49a8aff27d4da10f8b96b0"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "5461d65f01274e7b84c3e9a299028ae9"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "7f91742b52375f8acf273482099aa042"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "646daff9bcf084e794c90f59a1f12c80"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "0d2e465554d0ccb7a6c024b8bcc7b3e9"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "4ab356166bcb34bcff30a4149cefa7e3"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "08d42b060b9562acd0a95764247af321"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "2611b50c3c7f090a9cb6b21675e5b26e"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "3d77691d2d59893000f09064f3291e84"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "d6706e62372e1e262aaeb7df0033103e"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "78a2dee6d188f280035535758e4fdcfa"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "6077102c11e20cbf534dc46e519be045"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "611ce4757953e265f70168a2b50b9de8"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "bea9de421de4fbeb5ee156a738776dac"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "5a8d0f422417a6ab653bd3d65f77e330"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "2d1bd2508abeed31ad0c221a54c7f735"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "7cc5df4da6c44724b800733bc884ac97"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "f00d18ffda3969b11581ea3560cb5b0a"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "7b8f300e2dafbaa56bfa600377f6d14e"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "5da86336f71b3ae63023a1935b16bbd0"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "496a9f95b8052520dba94aa206c1c8a4"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "cced13dd1ad80598dae0bf98d7d91fc0"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "0184100c346e9c6515aa075dd1617db7"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "bd99ea696d75f14b70e8c7bb9585f05d"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "0e8fb2e6efa0f679b572af2c905b3f27"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "6217a73b754e6577795bbc01af6d4100"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "6238c74b0ab13d14e649222d6d779844"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "852f7e2cc54fa01919cdfb39b34a506d"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "531b572e3d3dba84fa1c12dc45f4f42a"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "cdf282b931b722323104bd08d9568794"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "e890c7989f26fac5284921418e7d4f8f"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "25e3bb284146626b80b539c422142963"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "82c567034236b094bcfc79512aa17c61"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "8b52e0eee516d936e7658d5a45cd7e8f"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "32f11c180811f7c09a139dcedac80a03"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "10f5b871f001d0c7167074f03102c73d"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "08965bd6aeddd29a9d2a048a6116662a"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "e9634c98bf632288ca54eefa4351b955"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "4c7bd755e331201019803c76001511e5"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "b0f57139224f7c8645b2cffd51ccf7d6"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "2352f755f894ee2345f8d945c8212d5d"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "36c9924a26f39c19746cdd718acdce54"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "d84b9f73b9a53b2f98b7924a415067c7"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "5b6b22c8e572130c07c8fe6d8ac8efaf"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "03b382c9a6ca4887c56420ee8af61f05"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "65514248706b04103680cb8c31e6b1ca"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "0f0da4173437fda8cba6a988acfcf875"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "83b7b73cb4d57f67531fba9276c5087d"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "bb5e677366ee38b2df9c50a6d301834d"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "bb9c7820e78ef6964407e2d9126478df"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "9cc29127aec3f793c5dcd5ed5dab53f4"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "f70e60ea00e8c13aee78fa168489e8e7"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "e53d4574836931d62bc7df34fc4f00c1"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "1c05126fbe46fafe19d010aec8f5a2cb"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "c0e685d82a2d0f1ce37e769e27b578c6"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "467426da8e05fa25110951c72ccefbbe"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "cdc3a2f4489955505ed488495b1e6c15"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "a0b60df932b1149617f7314cc70db0ef"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "436c5e9652cfe6b329f1390bdde37dd4"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "9adb9ed7219ff754f2dbc80c6f74efd0"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "6d61e2bbe997a3df704d78fb0686622f"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "2aafb16580d023e63a1d825a162e304b"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "892c06f94f1cfe6272a45baa9ab58dd1"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "6e6c31cb5829fd539333ec26cdea8c42"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "2556bf998e4e2b62af04a6522e00254d"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "4050583d26dbed571b5e7af7e05bc6e8"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "d85bf61371f7f5367128b94ab62ace1c"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "398ac5eee740a2548f5236907d69a984"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "2958f6c502c1d88e4e04885118af9acd"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "8df0235adf89885b1cf6dada2b4f6ebb"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "af5a3cf8819a1f3160302fbe797a0698"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "cf4ebd77a40f32cea3c163e21ea70de0"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "a1e1b5428053836cbd7622f1b74ed1f6"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "eaff2d1847888a716c81ca4ea7b3f73b"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "e10d41869956ac77ede914c5b19bc556"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "7b94c917bf9408bab5f049f9bcbbb5b2"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "4b96cd1b962eef8ce20beecfa984f2be"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-29-章）/index.html",
    "revision": "055ef6a37c3acb6b540f4b1c913d382c"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "b780f414b47d47955d380cc03e061099"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "44b16f8eb2b876d5180e66ab96ba8d41"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "438ee8e48b6a0373dfecd2276d1b8ee1"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "76e7e572d427c4424346f51dcad568e0"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "0beba468fb71c6e07b49a17f9d8d8238"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "761b877d70e18e6402ae82ebfa171e1b"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "e025a611cb1a10f46b0bd6c8d91c95ec"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "81c44f99de745244a18b736a69b4aed3"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "41a8bc3f382da70aa65ff7e6598c256f"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "4138c5d9afea5b71e22321962340cda7"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "ec60ad435b603469578bba8f9fc7dc04"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "476b889e9736a39142f398ef3ccb29ab"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "29fbff76ea8a740bebce3634c69c0f16"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "abfb6367b94fa829f919718b4f1522b6"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "6e61e07892d664510f8cc08f7a298b1e"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "7c0d4df9992b658844c8f7898133f840"
  },
  {
    "url": "2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/index.html",
    "revision": "bdc4924a27b25335007a09efd023e63e"
  },
  {
    "url": "2023/11/01/WebAssembly-Multi-value-Extension/index.html",
    "revision": "2bcd306d75f2be1b3333d5b9940f434a"
  },
  {
    "url": "2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/index.html",
    "revision": "3bf43f87744e33602771c292abe6599b"
  },
  {
    "url": "2023/11/01/WebAssembly-Sign-extension-operators/index.html",
    "revision": "f98c02e8991408866d4cc6f83c79efea"
  },
  {
    "url": "2023/11/02/WebAssembly-JavaScript-BigInt-to-WebAssembly-i64-integration/index.html",
    "revision": "1b992036b709bbff389a63d843396440"
  },
  {
    "url": "2023/11/02/WebAssembly-Reference-Types/index.html",
    "revision": "fbc49d6b353f0753d1c479d04eee3d9d"
  },
  {
    "url": "2023/11/03/WebAssembly-Bulk-Memory-Operations-and-Conditional-Segment-Initialization/index.html",
    "revision": "b4a7d5cedd5d981ae04906c10f1cfbc2"
  },
  {
    "url": "2023/11/04/WebAssembly-128-bit-packed-SIMD-Extension/index.html",
    "revision": "95f3531113275538979a6e70f6ecdf77"
  },
  {
    "url": "2023/11/05/WebAssembly-Relaxed-SIMD/index.html",
    "revision": "1f000c539a19478c27bb5c8f02810831"
  },
  {
    "url": "2023/11/06/WebAssembly-Tail-Call-Extension/index.html",
    "revision": "1433d6924d08e868befa95be0559c9dd"
  },
  {
    "url": "2023/11/07/WebAssembly-Extended-Constant-Expressions/index.html",
    "revision": "6d378b75284b8e148b92964186e99aea"
  },
  {
    "url": "2023/11/07/WebAssembly-Multiple-Memories/index.html",
    "revision": "e41f294499b36ce90b891ad4d13032f9"
  },
  {
    "url": "2023/11/08/WebAssembly-Typed-Function-References/index.html",
    "revision": "5d9338857cdf4ff80049c4696b459829"
  },
  {
    "url": "2023/11/09/WebAssembly-Threading/index.html",
    "revision": "92459610c4ddf155a2688172b5d76dd5"
  },
  {
    "url": "2023/11/10/WebAssembly-GC-V1-Extension/index.html",
    "revision": "cfe277607dcf063da78431697809205a"
  },
  {
    "url": "2023/12/23/TypeScript-Cheat-Sheet/index.html",
    "revision": "f54f0685e9510450a80abda1e7799f3e"
  },
  {
    "url": "2024/01/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-30-38-章）/index.html",
    "revision": "1ac4f7ff03369f99f5ecf96e6e3e535b"
  },
  {
    "url": "2024/01/17/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-39-43-章）/index.html",
    "revision": "bf0ed2bc4be1604c8ff74d77bcfd08d4"
  },
  {
    "url": "2024/01/24/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-44-51-章）/index.html",
    "revision": "3fd03d1a9dc5a512b7edc8268f96bfe5"
  },
  {
    "url": "2024/02/11/《Unix-环境高级编程（第3版）》读书笔记（第-6-10-章）/index.html",
    "revision": "1aaeaca3f1498e9926cf9e01cf837153"
  },
  {
    "url": "2025/04/01/TypeScript-类型体操练习册/index.html",
    "revision": "c461e666aa0a7df0eff760d3a7154d4a"
  },
  {
    "url": "2025/04/08/自用算法模版/index.html",
    "revision": "f3388e1699402715097fa0e41206f337"
  },
  {
    "url": "2025/05/23/前端面试模版/index.html",
    "revision": "6c87b9381783f679e73d90ffe97fdce3"
  },
  {
    "url": "about/index.html",
    "revision": "10e596d4c1423f3c52a3b3c8d80f63b3"
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
    "url": "archives/2025/04/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2025/05/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/2025/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "articles/index.html",
    "revision": "f2da496849d0ea9a6c6c213b8fb59926"
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
    "revision": "984fdb8f2548a0e13d5a3719972e4f06"
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
    "revision": "24493b3528725665647efa5fd29436db"
  },
  {
    "url": "resume/me-en/index.html",
    "revision": "e0e513a5974e550a9e1311baebf2245a"
  },
  {
    "url": "resume/me/index.html",
    "revision": "8c55cb0cc21ceb4ae78bf58d2606ca96"
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
    "revision": "7755364c9622564b0e731de75a16f9a1"
  },
  {
    "url": "tags/AI/index.html",
    "revision": "7b4f65f4639f830557ba6b3da103f8e0"
  },
  {
    "url": "tags/Algorithm/index.html",
    "revision": "7d3a07d5abda237abd697f998e521fc4"
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
    "revision": "4406f6ca23658ccaa03a471678d3db36"
  },
  {
    "url": "tags/index.html",
    "revision": "945e6163c361c50fb23ff6dfa9f30eff"
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
    "revision": "7bf636f37d8dbcc28b56a7c81723f4ed"
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
    "revision": "76831345642c864727bf7ccb855d2d1a"
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
    "revision": "3f1f4cfb0d9655ec2e149c71142cc079"
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
    "url": "tags/面试/index.html",
    "revision": "d750dad36397ad6459a8824b45da785f"
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
