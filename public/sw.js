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
    "revision": "137a3cc3536992da4205bab53eaf45b0"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "969754558d2f4312406e26837c9a7412"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "60d0fa42a76ea60bee5802546c8dd928"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "c51991ddf4c5bce5a2c20f1bd1f2b9b8"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "a6e01c0bb265643c7d2150184645b9ee"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "e23dc25589c123e13acff6044c04da5f"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "7e8bad15f47849376463b9f0a4b9f71f"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "7759e12bece60f70be496d999681fa94"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "ed52c41190d4d22f16000f74f1dc390f"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "57381dc86798dc8507b272da4811a96c"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "63fac78c9b1568c18ba697294594b84e"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "79bca17616c3709d795aa0f10dc2009c"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "7baca590418144d7281e17984d446951"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "4f38364af9d4a0edc6ee281450d77748"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "70971933877a40359522b81637d24b55"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "50b26142e16d8021bad3dfdf827e7e9f"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "4a5add204a74f68c61eb42a7937937c2"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "a79fbc51b378cd045c3dab383377c259"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "2843bb4cc9d75bb49e7810533b1b1131"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "61d390e872b8d9fbd8174c1d22432c50"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "cc57e12cb18ea73a1e5a8a802f929c1e"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "ea1a605ace4a85b645d2e579d146352d"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "aeae4d77cabbbb1641c8acac19c58101"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "43a009f9c1ac89cae377f3c2fe50f5e6"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "710dee0b8a60270c6c3e793ed358f02b"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "21d4e19909c42b4fd8e4820735403eb7"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "19161839b0d3819eea6f52b15fee8c68"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "f51eca681ff692c754d32e94f57481f7"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "9c682fcf4afc8fa8156223437b4740d8"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "0d3ae814b5cdd1985d6f2c4d777273a5"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "32ef1653b39c18c0e9d2bfcf921ea676"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "42c18f6ccdc70fb9ec3f916c6b02947e"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "5085631d84a0584f9a2399973d275e70"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "f0991cd79f5f316d40bad14871c599ae"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "f17b2aa990ed4a95d56952f92d9e6eba"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "592571c750e8ca0fc3e205ad7b409dbb"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "e14538b986606b32b3004ddf3ab12006"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "07bec367bc05a03b7f13eb1e090443d3"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "f349da108ffba4105f383b83315c0666"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "1febafe2b0b02c10b2b91bc071415414"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "6da52eb92f5e8ee012cbe99a3a4e974e"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "4e34f28a72ba6ca01987235c9b1745bb"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "5a803c449b69dee1a764a216b35ae186"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "52dc630797602c9fe2b63ea9805e19a7"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "5df4199df202bb241c50bf03533ca1a5"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "1357343246f1a385c542ced0f0fe90f1"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "a21a2128901513d22fd718b7998ea5ba"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "99215a885bd40193774db7d9457baf77"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "73b6e0156c6674b463e85f24eae8bb48"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "f26a8e461a8f5b6c364cffd519356c4f"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "4f45da22da5bb993a38bbc4eca304906"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "d7ad351643ea27855d9cb6e9bcf305d5"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "754f04e9cbefeca6f582027889913c15"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "bd401101f9a5f8b006fab7e5bd9b404c"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "f9448e73945e69f0250cdfaabe21f267"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "4e9092267a58e666b119db285c283946"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "d84ee17b6069ca571bc3883b037bc33c"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "2ca51fb2ca3e04cc7c0b57a4c3f29d1d"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "a3712c216a57b8371774c6e5642862c7"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "888cb292c665f00fd575bf4621dcd5f0"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "703ded90fd6f81252304b2c18f42aae7"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "40a370e4b91ba3627ceb81d931d4699f"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "3d1c73715cddbe2956e17d5312c8bde0"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "ef7e7438c5aa58e25ebdc54fcdd448dc"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "fa376d8f1877359157c6a3204317db3a"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "7bfa556d1678553819b370a808bdf9f9"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "78459c1c5bf789402ce3387f1bd9aa90"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "e520b0ef6eedba60258b90d07b61e9cb"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "fe6fe1c7905d889962dbebf948279424"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "3358a8ce52ad4485cd36050ce1f17ecb"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "32cff943c5c6a6bdfe3aba1d0e139903"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "5152051d11d57bebc3cbb02ef3ece795"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "4efd206c7855df89dd08c877cdd66f0f"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "0a5c0c99266e23b7b31a38043f99271b"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "bcf913dbc8a1f40373c2f695f70643ee"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "bc37bb9e7190f1221b594d5f392287e1"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "290d766605d1433181c9b2ddd6a45cf8"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "3239676b4d63c92f08ff4372fc46b116"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "9ea0c84b6e37ac3ca60db8e83f85f420"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "992901c34153ffab1f48321b52f0bbc0"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "9ad0d982b39a17022a6aca96b01abb7c"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "da9b4a5006623f29147cf1d0a53d3231"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "52a4872e4fbbd2e3528e1871ba420c65"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "eef682903c3fd9ea8daf2c01702c867b"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "993bae484a571656fa6dc97a0f1c2616"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "c4fef30026b3aadb947ef54e0604baa6"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "eacdc676b713345e360ef993f2274b35"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "52887a88c9d3b369c0a8ab9805f31dab"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "a9f7e5b808660f95816856b48e836f51"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "8742272724a4e693c15d9e7fad067d71"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "72a85ca452f06e161a15384b268837ba"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "759afecbb51c39a5cbce6e633aa7c22e"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "f83b5b0320aaef8f6d15ee9c449c5f5e"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "3d1c633a95e05c4b1a3c464c16695eb6"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "8192597eceffe9464f0a883aa0b79df2"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "45e36fb4c0152de4625889c2dc1ad7fd"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "0e49cebb9b86f5d5584da1d8a3549afa"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "1b094e4ccfc68922646848e652f03775"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "bc1073e063a23d5e2aab566f4ef33679"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "d93468bf4548d9f444d36651a514b594"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "edafbcf198392374b6ff3c808cf1839c"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "8102d769369232c1be6a46f51528b4fd"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "8d36054589aa64e19ccdeff13661507e"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "16ad2136cb5669cd5a3d62c27b72a79c"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "9cf46fdbb445ec1013c514e95b17e81e"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "0abab8b0730de8d7e1d4acbff3f2eab5"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "5d78a8871c1b36e5dee1657265bdda00"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "e5748bc079cccc5561dd7551bc99569c"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "87dc9a04a3ec0fd40bb331dd1cd11d61"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "c0114e70acd1fe50237e865f307730fe"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "6348675329637322a15f8e8f1da20a6f"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "bb187aa5cadf080a519c4748f14ed407"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "f34cb18b9b0ed0ca4ba5abaee4037f4e"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "3062f270b6b0d7738aefa8b16bdab14a"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "fedde60c5b31bb3821132deaf3c87c97"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "262ecc73734d6abba592b80a23b280c4"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "c4f9e60db10e8bdd50acd7c992b5e4e0"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "ce07f0ac7971233d4fc396712bd37c44"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "ad734b2eb2440ef02b141f31f299f160"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "55ce80f5570c1614ee41263cb802936f"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "400aa0bae051113afc5ad7655e8f7a5d"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "3fac70c572fdd77494c9731769f52d42"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "70c8f2e2bc48a63ae0290f33c5903195"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "96148be8046d8f84ba545e3381b303bb"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "95a9e027658594773b453c2c48b62c42"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "5083b4f7b3c123f0293f61084b1a62c8"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "7a4335230936c58cb6b4c1eb02604d6d"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "9099fcbb8a04679bad9e910dcea53a9a"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "2ec1242d154a7e318aad9fe8a1b464f7"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "e13afc60c7a45137f47f4eb0efe5ed87"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "ea3ffd7c2034803cf36223d0c8fe35db"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "a9984fbd1b44bc2c3febd66fbf7ac1b9"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "89516672019fff85c2968b4f3c6b9b44"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "af26b72b6f38c26fa41c471da3e6892c"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "b552ec0bb9ee5aeff9bc6891aba2fbce"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "a88757e25515aaeaf71df763bb811cb0"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "8ea50dc3fe965450755e8f1b06caf126"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "762172674973306d93b018d7e08d88dc"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "f5fef3b02bb33fa385e0bfe91326539f"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "80613e1e851ce536b325ecec9a3a5b8d"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "54f86b498f5380ba11b3ab1200b2152e"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "0e3c344af3ae27c1ba41a6574b27239d"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "3493b80e377746ec6f66e95cc4278ebb"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "b0129fc074d05f2565cebc5953c7de5f"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "b60714d2a869597e67e2137601f616a3"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "d079c79ff595eb580f2edf7209a83d0c"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "94098082f2ddb0dbc9ead6eac11b1f72"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "1fee646732ebd85773d63591189509af"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "6982630ed97b38f46626e51fa0275cc0"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "9baa958e1684e5606d774ad652e892c6"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "2ffc3e15548e0f2bab14b4e0ea2fa653"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "9af28c258513476485d5f388ceced066"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "a5076fb903c15bbfe417383153deb7b2"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "3fc49ab9cfa85a58f16567b3d4befeae"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "d793624b20d5d1a84fe8506cfc93c8b4"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "d09d34f1d576889931f43cece06011ae"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "fc00dd3ae2fc4ba1d21f9e5ae3d4d31a"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "4d13adec2e92adc30c43450d0c847846"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "15a8b3529d6b1c91314b34eeb09dfb64"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "58b47f5e56e73366279b87b3e5870417"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "16094c8841e54685eb08c03ec73897ac"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "3c662c9acd56326d7b1e64fd2b73eeca"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "e28656aee314f276c7d3ba45e386dc72"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "15a6cd5a73b627ac25c14c8d5c49e262"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "9a2df8616def0b852d704406c642858a"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "0bb7d6cee146e0a44cd9dbe5bf694bea"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "9b4694bad427092cc2c745a8551b5cb9"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "bdca6ee627898b6a0901a5ea7326ed27"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "add0f08d062e6dc92950ecd75df601c5"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "254fb99253a018a1b9300492fd8b8558"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "03801662b1f60fd26251d854437fbcb5"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "0b6bf6ad91f26e3fe28e5ab147a40865"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "67e62a4b6bdcddb21b502ee544cde07f"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "c5ecb514c0e46174d2508ea52595123b"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "1ce1913f480d8cb683c7dc0991ba7ed2"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "c73f79150371a4d832a9e58c69426e71"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "54b8d42744f3dab35720c26eeebd458a"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "e544604cfa25bceec3b34fd230227d48"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "5480df371cfe5149f4ab1e22e9863d19"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "c9a2ab2690a825e390959cfa90dfb38c"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "5afe2fd5913eb1f750fd83c76085efa9"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "2c10377d4ab5900c0601834768f09315"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "aebed71093980b0a31d21accecedfb80"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "fb069bfe4be9a908017c538fd145cb40"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "dde549cdee84e0ea5e94ada37639e9f3"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "c77be96ca98308894ef057ea84ce338c"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "7fb03220a6529fc49f6b74b37aea0653"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "e9d5eec08e4b7a42a475b463df0042b3"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "db8183a3a39f6619588477841901cd96"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "a9f461cac6645101f0a18855d9a250e2"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "c2317433fceb1d0afd41a16326665a8f"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "e4a75fe183f6f978a3eb5510162a9eba"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "662793f047de3e6c3b6f0a84efa1cda4"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "cb288323515cdd8c4a799a67f0741fa3"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "09771ec8a7e570861da0235277f6becf"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "41dc683ff03e8921159efa574442e84c"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "d801a4eec96940289b15a25bf9faa769"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "8c17d3f487c971adf99e3d54176034aa"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "811856f1241982123c4fbac015ff6ec1"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "7bc5b4c94c0832029a3f4af611f14b84"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "0640b35ad830a755c26d0b6938f99d31"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "b92d919e565e9ef1d7439723efdb3304"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "a94a6b92a1530511991f4c8c2ee5da88"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "9af6037fa9d903b15e43a0ae1098131b"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "5692d765767fbfd01d1535ccdfba314b"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "f92b2fb3e26bb77c03fbc4e362077854"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "7f0d5f29d86361ea058d9336c409d969"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "8b0eedb609e3de3e8770d6e903f2bf49"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "7ba010e85dbf199ce3039a677de24925"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "9fd2013dc853f2a671a29b4cb1257a32"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "8ed2bdbdaeea1fa2af178109f66f5104"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "043ac09bd57ddf1c3c88428ab9f7eb93"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "e375e6ec1260b514c6de77c0eccd8095"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "1954b06c54402e98157eee87f3fbe418"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "51de84a1552cb4bacefb62b48b8987f9"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "a7aea047c849bd040ae9e6bab4b88934"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "e98f1198825bfaf1040d8378e4331085"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "5089d25a48bbb059008599f8d53324dd"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "b20d96ac285098d89d549410cbee4d5a"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "fa44cecbdc32f1e33059b43d9ed0831e"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "c25604614bd2d97997ed7c6f2000162c"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "a63c1cef57156d4e003b55b60b099270"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "f1b647b2647a42f1b12feb89080c0679"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "a501bb81efcc0bc0094d74cb2f3379ef"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "ae4898086092425aab17e15b14d71043"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "86e8e86cbdc694c2208676ef50a7d3de"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "8cdcd1390f9da7b9d2e72091ecdfcd55"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "a7e9f97742b9fb8f97c6451533b01491"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "416850864517a4f2647041fd0c962886"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "f34ab02816a99391679fe3438c68a091"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "cf5f75971fb28bbca401a618c43fd61f"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "46c5e5f10f97552809c2573f197c5d18"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "a33af115fc3cf3cd957d26740bb3ec3f"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "215d6bd725b32bf2f9500e49c9c19a0a"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "09ba247729031a7c93cff15db6da68ea"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "0a934dd3565d5be386fe3a8b1794f3f0"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "84e5ab8da06b05e20b7b5e1f83f0013d"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "0f85597e80f1fd293eecac1848615d4c"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "f8d88f0fc8214c2c98d9e130e2bdad73"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "26c3ba68ff35ff9c34e7ae584ccbe78e"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "0971af867db54c864c1b8317411ed476"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "f3164cd89d8aac72ac5eb9c32c6fce72"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "27d1e2544fa9caced9442806bf3a3acb"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "8872bb93d286e698ce4a80d2bd31426d"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "e84348c79ecaad6514fe4d4d56434444"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "28e27fe923446a084c7883f220699127"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "8a4d4367c3dc54d76959d264346ec09d"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "8e9eb79280eab1410259214896238f2a"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "2427cce50e042942603710b571949e1a"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "e0564c3297389f6abb5384b5bc7b5491"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "b091e73e3ebf89e5a761e22148ee165c"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "a6c1abe3f781f3fae266ab22108d3165"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "e533eed8350b06a1a190428aeaee686b"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "acc37d01c47d2fe179984c9baf1e35df"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "b908e01d4fa50c092d4b9adc951d73b0"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "cd9df2ca16fd432bd670e401f0fa368a"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "cad0818aba60196398d9ee8029e739f2"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "4b11b0a400ef402c02fd26971120dbd4"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "567ccb2169a72b8b5bdcd06acef0b422"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "ee3f495df28dd94bf79306f2bdfb1611"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "79b2ccd3f50f5943c3794f8304be8f10"
  },
  {
    "url": "2023/10/14/Pratt's-Parser/index.html",
    "revision": "195184b80ca43f828d82d8d3e1b05dcc"
  },
  {
    "url": "about/index.html",
    "revision": "6d37d9775f21c7bc868199b1a8c77d25"
  },
  {
    "url": "archives/2014/12/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2021/05/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2021/09/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2022/05/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2022/06/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2022/07/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2022/09/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2022/10/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2022/11/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2022/12/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2022/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/02/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/03/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/04/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/05/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/06/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/07/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/09/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/10/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/2023/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "archives/index.html",
    "revision": "1efb242f23e7533370cf507dbe23902d"
  },
  {
    "url": "articles/index.html",
    "revision": "6b2a157477828263413796f65bc8a43a"
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
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/10/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/11/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/12/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/13/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/14/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/15/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/16/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/17/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/18/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/19/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/2/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/20/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/21/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/22/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/23/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/24/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/25/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/26/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/27/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/3/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/4/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/5/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/6/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/7/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/8/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "page/9/index.html",
    "revision": "fb9dcfb0d44fb6ff25812a67c358f848"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "5d2dc7c0c37c3830feca5f66723b0ff6"
  },
  {
    "url": "readings/C Primer Plus（第六版）.html",
    "revision": "9c527cc9d634de6077fa2b2603e16bad"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "dcc10acc2677a855f8efe6d468d10dfd"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "1fc480c32ed2e8b2dc7f6595e138803d"
  },
  {
    "url": "readings/CSS 权威指南（第四版）.html",
    "revision": "9c833b6cf3b03263e68c8c8823629567"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "3ae4375e7f5d3f96c8986e9e606a72b8"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "b819e7c333097b318ba4a0313cf5a895"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "76ed2a1e4408621e4005a1382dc7c8d3"
  },
  {
    "url": "readings/index.html",
    "revision": "0e87388fe0d698d4bb6f76677c95e107"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "5648d2ed7a2f64c44ab00a62c84595b1"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "a7c1a9464a15db357e1a4f1553c86e4b"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "035d4c2bba435db72af1e945628f73ef"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "d4b38b0f2d0e6ff7ab4b8790c51e976d"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "717c196ca08cca8e6c3dc13a131327d5"
  },
  {
    "url": "readings/Operating Systems - Three Easy Pieces.html",
    "revision": "41240af058366ba82de9130072de47db"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "3505529aee43c3df8ff7a13b9249f266"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "39f9de03aea8a9ec89016ff782b49bff"
  },
  {
    "url": "readings/Rust and WebAssembly.html",
    "revision": "b95b8e5c523a48f12d60cb41f8d142a5"
  },
  {
    "url": "readings/Rust By Example.html",
    "revision": "acc618b5cc560ef6ad5b1ecb1b7b54f1"
  },
  {
    "url": "readings/The Linux Programming Interface.html",
    "revision": "f1719d5c925e52d916b2653af45e4e03"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "b1bad362a9691bc1022a9f8fa8f49f08"
  },
  {
    "url": "readings/The Rustonomicon.html",
    "revision": "bd04463ecebae6daafb32385842579fd"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "a9af66410383b3aa08e2b86fe2bbc569"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "5c3d76efb27909c702925be1cfe5208e"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "bfa9672ed3e61aed70a349bd9430bef8"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "cd81e062e47a1317d3faf43caae2ff2b"
  },
  {
    "url": "readings/可能与不可能的边界 - PNP 问题趣史.html",
    "revision": "ed7bfba47d019232b1cddaa8cd80f9e3"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "7dd1da4707ad9684a20c0a4b2dfc98aa"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "f99c6c3c0ba193f7a91ab414dd9edd92"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "07d945fa4230be5dc9fa72b9750b0243"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "0bbc6aebee43f96890182902a5cc64ce"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "732c454e301e9b9f58e3e49af9b5e39d"
  },
  {
    "url": "readings/微积分的力量.html",
    "revision": "13c9b75fe5e21f5feb85e3c2350d019d"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "a2dfadf9f62edf61b74df6673c54a303"
  },
  {
    "url": "readings/无伤跑法.html",
    "revision": "d2f73ef3fe541c66044577f1b8f84375"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "56218d2b0bbc276a9f54697071f03934"
  },
  {
    "url": "readings/浪潮之巅.html",
    "revision": "653a7ea077bc92ab7f458d5fa9e7d4f3"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "dbbac05850907b388ad8d3920836cbe3"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "2d01b32fab138028220a0394546bca39"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "77dc14c087f647f9474fa966e2638248"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "27cc4d33e420d2d68c8e6ccfa25474e5"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "2dd536df2d99bcfa14fe68bb5d4a6498"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "cf85dd66ff45b0c7255191c7ffd23117"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "c899fb8d8543c56dcd3e0eb739d6aa43"
  },
  {
    "url": "readings/瞬间之美 - Web 界面设计如何让用户心动.html",
    "revision": "5a84577ec2a8a48a4c8d3b667920086f"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "8a1a0a76eff3f555ee9dbc76e392d8bb"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "84d47406ef88a1e902bd9d0ac7c3c0c0"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "bbf9b69038af25d67a9047c421994ee8"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "82568f8334d4ee37984d989ea84a4beb"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "ef0f4c914616b95356b114d14bcaf491"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "2c8ca455048b1a9195261badb333f7d8"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "4227bf1fde83173be0a105d042984508"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "5912f50cfe4095f89bcd874293074d17"
  },
  {
    "url": "resume/css/style.min.css",
    "revision": "afd115fd99938382c8a1b3ddf304691d"
  },
  {
    "url": "resume/me-en/index.html",
    "revision": "6917a913832f3db54dae74f1e77263d9"
  },
  {
    "url": "resume/me/index.html",
    "revision": "f7678eb1ab18704a4da5d6c2afce827a"
  },
  {
    "url": "scripts/index.js",
    "revision": "be6d0a9c12c553bbcaaadb0e95e0915e"
  },
  {
    "url": "scripts/post.js",
    "revision": "3eb3ecb56a3a354292f692ed31d153b5"
  },
  {
    "url": "scripts/search.js",
    "revision": "26825c6acec9e5034fa6d0642aac2772"
  },
  {
    "url": "search/index.html",
    "revision": "f859b9e8539bfba010f4bdbf4e40509d"
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
    "revision": "d8dcdb7f9778d57896c929640c028808"
  },
  {
    "url": "tags/AI/index.html",
    "revision": "f3c4a8298b5af7c2d7224eb680e78ea6"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "c2009456d896a8cf3c76f5bc3e657e27"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "cab8861d17d0d8c582d2e84e3e7cb0c3"
  },
  {
    "url": "tags/asmjs/index.html",
    "revision": "6e54c68d3c8873251598e29b7ac6cd3c"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "750327aa062b5db7b78f10e7458eb918"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "e1ed0b1fbe3408ad82c0081ad35ccf7a"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "035aa34c371bdec42a5a50b03b5fd087"
  },
  {
    "url": "tags/C/index.html",
    "revision": "21eb2ee9de96439ea83e68c581fbc683"
  },
  {
    "url": "tags/Compiler/index.html",
    "revision": "5d4c7740e6c17f03609f7febb3fa6015"
  },
  {
    "url": "tags/Cpp/index.html",
    "revision": "04b3851634e7cba1b58de7c0e07a7acd"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "c53b65fcf9380b0ce954d55e89fdfcd3"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "8653bd9b362d9aa402546254426e2971"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "3614e4f91dd327912c02ef2a440f94ac"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "dabf4e9d651003388fd065c032d73914"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "7ff6ee16e8b5cfa072769d9f0d67e62b"
  },
  {
    "url": "tags/English/index.html",
    "revision": "7700873b08a4f6c0aa1bcdc00fea7c86"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "c014d241de90779c6b3393931881f7ee"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "b197da7efd0caad473afa6afdcbcd716"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "ddd86da88d62a7fbdd72aadaf5645465"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "4c58fb1f3443b2d6bd3b7fd0a283c875"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "b7ee395219d911c14bc47e12cc1db38b"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "e1eed0e0f911a61c1df426a27b71887a"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "9b7e784c16187f3b5132deceeab910c8"
  },
  {
    "url": "tags/index.html",
    "revision": "fc69ca406d13e81f0e9ae794017e0f90"
  },
  {
    "url": "tags/Interpreter/index.html",
    "revision": "2f1e6341d5fbbd8939f2003623113866"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "fc4c20ac9aef8974522874a49bdd9e34"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "cfb3665a952092d9c05b90d5ea7e9f80"
  },
  {
    "url": "tags/JIT/index.html",
    "revision": "7bf9df94f5292606349b3305f1a4fe3d"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "8870f72d59a40d9fe6e8ddaaafcd7125"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "797cc041992d40eb886a9da96ea7e8ff"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "f17a202542e8fe52298c6d2195f22a42"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "b0203ba74ea883cb67bc47db9b674711"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "e1a0461cbfabd3714213a208ce9a4c81"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "4e1b19341fe82cca03612d0cd6c32abb"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "60ee1c5eda021c6d40d7fcac29a81b55"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "4f0dea86e607a8d6c9853d8f68603378"
  },
  {
    "url": "tags/Node-js/index.html",
    "revision": "ebf1f8d6c810f8ca6032a8d5711a9108"
  },
  {
    "url": "tags/NRVO/index.html",
    "revision": "b1b9855a238444dc45d81017cd55b90a"
  },
  {
    "url": "tags/OS/index.html",
    "revision": "6a8e192bc9862ac7427f903410284dbe"
  },
  {
    "url": "tags/Parser/index.html",
    "revision": "79ec44cbf0fadb07d65efefb00c75607"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "208e99b1aabf8fd24deeeb3b0152d708"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "416799b42ea38877580809b97d12fb0d"
  },
  {
    "url": "tags/React/index.html",
    "revision": "d2273c0a5890b561c90c5e9bff0ab192"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "621aed5ceba7ba38cfbaa6dd836c0690"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "9d17eeb55ee01752d032da6f87378520"
  },
  {
    "url": "tags/RVO/index.html",
    "revision": "635929b6714f34df2ddc49f263f6da71"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "88cec260dd48d2431291bcad4755eeb1"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "7ddb1bedc98cba936604d37c08df5ace"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "2b12f6ba74ea36f3b5398d566a015409"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "0d195c30598b26517b578d867ae5c984"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "8980b36fa9f5102fcecf84c381814017"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "b600f53470c56c12dc23e7b240aced3e"
  },
  {
    "url": "tags/Unix/index.html",
    "revision": "81867c4142736da37b9423c72448abc7"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "3e2de336cf9a810b473fa21b46848a0c"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "6c63525facae4f274ead2757b794083d"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "09eec582d01a8c5b89a28be6395c9449"
  },
  {
    "url": "tags/x64/index.html",
    "revision": "9be37dd4930e58c1fb79b312e3f77688"
  },
  {
    "url": "tags/x86/index.html",
    "revision": "ecce9a539b8fee61e5a0e9a88464e6e3"
  },
  {
    "url": "tags/代码保护/index.html",
    "revision": "c7b4e5c2e9ce93550e379710255fcc4d"
  },
  {
    "url": "tags/健身/index.html",
    "revision": "bcec5b29e1fd37b2e4136d6a33aa0884"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "2f23df6a149e7f907b83798c856e8ece"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "ed889934b5b5e930ad2d5abaf0806da8"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "7017c9ddd25ed6884a1d2e71afb2cbbb"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "6f3773c5b7b4d33d9c49c7baa6866ba4"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "f96392e293da6c8d0d06864cf1be5d58"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "237aa09fa3270a5d689425c5074de0f2"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "fd60f4807a0c2b8c617466117a071c92"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "3c8e0d916ea3ec7b76d131e3d56f5973"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "0248cf33003ca611d87f5f6bab866fae"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "538745afc4b28801874264b3918d0882"
  },
  {
    "url": "tags/心理学/index.html",
    "revision": "2f0ff7979586fe0e4d933023a74d1f27"
  },
  {
    "url": "tags/操作系统/index.html",
    "revision": "59ec5e8557046e614679bbfa31c13296"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "952046f04ef67ab2f8b62cc7e0fb0402"
  },
  {
    "url": "tags/旅游攻略/index.html",
    "revision": "0e4dea58c45e7a86608a219339fd2f66"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "b51738d34b2a219542c28f6bbb92140e"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "7d2c62fa3adbb1f6d0152310af5fa7c8"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "00bd4ecb4065668f2b0b830d8b922037"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "647088a4a39a28591ff71cadd22bc8c6"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "4e887b6a38d01922cec88880f8e77367"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "43698ceca2dd2e41f424346735699d10"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "893f5e913d27366b27bab676ba1d6e2b"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "4cd4a8531b67e9ac513cc1558ae39659"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "e0cff2d6156bcc9abb8b00948ca864d7"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "5baad3cac9efa0b33e49a8e440e0221c"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "dc7fc3f0712dc03fea56a99c6d449c2c"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "0174aaaf887c2b8ab7fc9ff87b2336a5"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "1031de8e591de438c4280dbe00104842"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "7da8b7091c63f15db151faf3d6855154"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "e3b36b75f9492a3f9189b7d11cd27a99"
  },
  {
    "url": "tags/设计/index.html",
    "revision": "4bfdcdd9cb077433d3f3fb6f9c5a9fa6"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "35fb8e2b081197dff65b43bdf0a9f51b"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "8b15fae93627d89ab831342c0a428173"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "133f06ff3c0e6abe550a98e05d1e3a59"
  },
  {
    "url": "tags/软件工程/index.html",
    "revision": "0ee2e7d99f1778a29a49facf0a8587be"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "cc8e2f8504b3b3419660455535183553"
  },
  {
    "url": "tags/项目管理/index.html",
    "revision": "e4507014f877d076cbe67f443d340231"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "b1b23fe0b9e9b98a480ed7b938f6b40e"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "cabc48bdc9542db4dc7696d8aca3b108"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
