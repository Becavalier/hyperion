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
    "revision": "a282424f3247be5fe0083a6d9a06c67d"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "e5f1d7bd2031d641a01d16f00bd29fec"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "cb6d20a63ad7080afd58b7b1a32605ac"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "00c74cb51383ffd91c42d366de55c18c"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "3d62fad88e2f6a4e2f182b2c36811f12"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "283866545d99ee72cff427ea2bd1024c"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "7f418908cf2cbd339bef3ce9b3e000fb"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "b884d65aa69121efbe726dce8ee338fa"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "6f6858cdf9898543ef1404f7c9b4762c"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "be53440e433eff31b1973e6c4a000716"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "1afd1ae59b733c6bbdbfbfbb58b0dc65"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "a1b87754c4c0fa32bad6f48b31111410"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "0060a3905d481724ceb1d4c44731e13c"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "480fef4db7a7fef7b545209a61336b1b"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "58007b96563f1084b66f04da5acdcea3"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "d4ec92c826a54720ae98c2b1a67e0fe8"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "e2b0f956c42856ad03492766fe1be113"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "21c5266f70c5b85d653acf29e5bb1f1e"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "e21e31fba5e95b8ce1c117e0180ed7c7"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "08f9856506123967c41e1f77461bbb21"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "a2dc6b707c48a819065186ea629afae7"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "562f951f1b58fb032739a032ec956949"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "2166720c6cb5b56193ff80e65dfdb0b0"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "4414658b0418863f182fd973a7449eaa"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "add985b6c23727c217d8e7410c316515"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "d9cf95abe0feb0807bbffca44d2293c0"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "5fe60eddf5dbd3c092b9db14b7900159"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "9bb2d80721c272c310aea8ab002d566e"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "26a65add887147dab3a6871098752938"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "3eb2a2433803af4e2bb5712bf9b748e7"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "b40fda1feba38c155e9aed8d7716f8a9"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "03031bd6abb5a7a8e96f3a69d9503dc9"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "b1076ebd4a4f9cb13611a6032bd33e0f"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "24aa39da5e278b93ad6525974554bbc5"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "534f1a5bfe13822eaced8824b2e8fef0"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "05ff9c53959f3371b70f2a118cc9806c"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "5d9e45f6782599bff9b070220227e3bb"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "17b1947c7afe9a32259369aa30919bad"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "856aedd683609ef25e7ae2667ed72af8"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "9353f0bf60d4496a47ac88886951c9b8"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "82c7a8addbaacbc66a440f1d9067b7c5"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "0dccd4884c3ae9066e1485b898181c7f"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "fb81bbedd5b1404f255967315ec5b74b"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "fa889346a383d54d034d3ebd6e9228cf"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "c41db862ca8d1f3e0c335a37ba4d7e0a"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "a176619e72247b86432a5f7a1aed306a"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "78dde44110e598ef907027b32cff01e4"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "edbd85c513496caa3f035310d7bf4853"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "651763bedaadb6b13d7d124ed3bcfd46"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "b7e5b23eb1c8b9aad7ce5f3eed18c781"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "15b2d67ec289dfe53a972d243de74ed4"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "e4fcda9292bf5d71adf77484399c90f6"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "57e5ba2334045e9171bf70e7554a52bb"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "f85d56be7f7db981f43b0ea0ca5f1605"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "95ecb74704b1260b558d78cf5606b0a7"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "b429d7c04ca8e21143a9c63ab39b9f38"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "05fddeba9a0a89201f210a9cd0525b82"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "73500354405239f96ebb5a0fd456d8ee"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "eb8f51433e9c29881af6e3f8f3189051"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "b784509231928fd7f6bc7daa520a3711"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "31b49d3ce9796956db9f89d162d815ea"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "df0130a0dcccd806b7a64177c3297cee"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "f6c3a97160fb32d9dfab4643f5dc47c1"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "e35e079f4b99fe026384175b014c3405"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "3e306e9bf21227ee6761f0e12f4afc0f"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "c61ffd823ba653615ac1f0f0d620a706"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "7470b5d16296ceab5950fde8088a24c3"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "37fc7094ec5081c461915e5171519304"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "145c36419db1b160df6bbdc00f947941"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "f2cd73caf23a93d597d493881517f458"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "0336ee54b023305cdc569875a2e7c50e"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "3e3a24a3b91ac25c49f97afd8cfa50ad"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "6e559b4628719fbe7149bccc66ed8d49"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "022082c475874646f7b1a46bf0bce60c"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "17cdd07054aa4d4ed6b9df7f67bd5731"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "c609891c4b71fa450593814df6edc006"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "5261bf5945e0fceb5d8a832a2425888c"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "7fadd23a255af6298da57b4283735639"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "a1359c5cfaee5c7c2a76ecf45ff702b3"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "accca8f49be47b7876ff9d622a4edf8e"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "b1b8fef813d214ff1eb7ecd628ff95fe"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "44d7f4a67f6ab89ae9162b7045e4776f"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "adb82a36333f713e9baad77010f5171f"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "e46e34b8d3df7508872104fb3ca7dd90"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "0d72edfcb7bd7e60ae1064fd04e6f3ee"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "063cf5a0d25785fea22bb3c004077c03"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "ec899902e67a0c656cefbf27334c7948"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "8fa702033046cdb16471d67e3e58758c"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "9ee76e258aa6291ce0b2c5d2604bde73"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "939cc90e292c2f04c3c53ee75a16cc0e"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "bd2e029cdf330cae37a5859b8e5c6a21"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "41695025cb013c970a6e966a94659d8b"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "2cef5043ed72296e3dfe209ac6af0ec5"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "e59b0d8ea50a5f9ccea6e98bfbcc375f"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "867ead41bf9f2c7b1ab3c665c0600776"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "715de677a7df185f495760ce782fb1cb"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "cc2acb9ae0da2db4db8babfc936a673c"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "fcb264ddf94a582b40fadc93352eeaee"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "07ca6ae3bb1bd70ba44f7c4da43ab129"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "32380274bf6f0eacab3b9762a273d305"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "c9722dd33256224aac5c9991e03ad682"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "faa611d254e6ac42d62e080aaff01f07"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "ea6f0d0ac11b2b0d112aed04b0288988"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "d8fa4030ba26199b632f68aad2ea0f82"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "bb6aa2025d66979f5fe7af87b82dd54b"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "1174a46179914f1c9638e6880fdd03e9"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "fe9faedc6428471fb0b583efc51832c2"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "21eb85f94591865ad935222a7e76f27a"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "b4ea8e7d0029589aa0a84f3624cd6629"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "283f8600eb1fdfdd6b353fbb1975ea1f"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "99d52bfe96bca38182ce1d41eb69f5cd"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "e8efb3698e8be6a07cb1db9362b6768e"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "109df56810c22ce68a726b46b0bfccc3"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "147c42d7b2bc8d13fb0f1c3176cd124e"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "992eca980ddfeb4a12eb6228b6f13220"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "0d0e82d6fa4e613d19ae9c550ad211f1"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "c43b28ca2a0bab6765ee3d5ad97f22a6"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "d687486e86d9b6cc3b7241ef879a373e"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "f5d2699ac56d3525b5146ac5ee17070f"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "e458449470b22a74e0c5466d70062e61"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "a4c4fe477cdcad87b06a2226f1a0b72b"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "f4bbe523173f0bc8f4cc58c259e09634"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "e0231b25918ac636b9567b069f2639ef"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "9fe03af53e0e1a937e59c32e0d455a33"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "1519018dbd8eb53c68a2f5db42bfaf75"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "15db80b627bd2a1bc32d75c1371eb38b"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "6305f431cb2ca3b595f9eb563790ee5e"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "11c62c0c5e163c508ea099356d9be9d7"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "fd82050ac5f425811bcbf836e9dcbaf6"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "ba88cf6e4b667fa5c26c9747edf6e91d"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "d14e01d439fdf13c78dd7c24865bc2dd"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "4499c6d526bcd9ac3344c3619b3379c2"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "5d0d10aa15806fad7957b43715383ea0"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "fbf566c887aae32f2379b12f8ee0e931"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "9fdc62874ecabe7b8f735d4ca37d167c"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "94cddd306b6b272ebc2026481eafcef4"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "37a46cb57c9a50ada5785e1c11e6bd4b"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "1fb7ea893b9f3e447033a17f15124d1e"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "3fba34999cbd44b0bd794323c828f319"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "6fe80f23575599000dfac84a0caf46d0"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "4dabe3211e12b3e7b8ff4d58fca6e46c"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "eee35f951230c836790a09672b7da450"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "2b13468b3109d4c161c7e55ef73a48b7"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "e73d353038f43af86bc18208669f7e08"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "6bbeccad62b60fbadafbe9ecf22dfb7e"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "1e8db40ede53e81e9c117b1035e05e97"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "49a9232f9d1e937a380bfc7178701c08"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "497978fee1df248ef6c9be3fab9d08a7"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "b8d8bcf323f09efee6608af854340616"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "935c936eccf9d3dc7011d4ac321d5f42"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "c401089c38c6f3cd70a68558cc6907a0"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "57a49bbfda5d052036234bd29b3b8726"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "a55ce89e84bfd94553d9701626420189"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "9d3854ec8c0cfa0e669730aa4d6cca94"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "d9644ce578550b0976fbd1e6d5f4e2a8"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "258c80e1361b4808b041c81d670008dc"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "5d535a086267a90f66d135acaf2562cf"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "930be509ed9de50e08966aa158831579"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "06164656c515e498ab1f3843f3d5558d"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "312398dc1479321b716868b27d562370"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "6267ba12a40a59b09105e985a25741e6"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "7e40d004293606396ce47c01acc4a709"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "b0ef21f413a677f72bad444bc64844a8"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "d336d5afc9ac9329127f7bff8ca4b813"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "9282f0f956484e715bfac58131a4c5b7"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "afc9d0ae4df0326335816d6a296ce6cc"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "8c82d544e97cbd02a862ee23d2dad945"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "f3d31e629e0ab1fe6c27ad0375c345c3"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "aa290c832ac59d1362fa33b905a1969c"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "07485d9a12a829e83d0119af212ab8c2"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "8a998a895e74335184aebf8d66a00a26"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "a2b4e67629bd7a7a24d1bf81f30d52c1"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "8159ecca9054f39563f10a05c8a5a4ec"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "5f8490df1618f67d0a1b4857a192b325"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "5e867ae398ba731c39263e8d74cdebed"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "0b3216c762a38446420a7e26031ae519"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "35238cffc3e574ed3cde7349ed2a9d34"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "fdba39979374834f29d0826f8db6156a"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "6d277659001f2b29048f1a6331f085e4"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "2a1a5b945297cf4f518b182674f3c296"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "066f072f3f9153a5084171109ee5124f"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "eed6170c4c4c22b593a1fa9bd7d8994c"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "a4e57282a064e3f5140886843bc911d5"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "d3985fef2d43f04c4a1f5a5a499e89e7"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "190018342159adcf56f224fb5b3db111"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "1ebbda111c9928898f8245a617d36787"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "96582e4870c3ce2e3d133d94f3d0af91"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "1aaa9c0cc9061c5ce73a032205f3f9a1"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "16698d5c42d62f1a3d45593e5f30f11b"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "fa32d243b099e43ed39a16f46a472c45"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "ca1c91adb42247b07d8bdcfe236dfe0d"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "c58a4b977439f4339a803628050e0228"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "7c5577b0eb1cf135ccf34ec163e8ad21"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "78706a464a4fe4195e9b8e258136b71d"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "9f896437b8fb0f4f126d93a87629eb02"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "649479c1ab39d300e1e2cf241a96bcb8"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "25ff3142ec39fac715d77ae42ca80747"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "fdd09af94dcbff90b9896983af46a8b2"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "b2477273bec5e09060cca2c291e06e35"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "2d139cff70435e6006c81d9f8ea43a58"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "24432aacfd6181d8af86d0f53158a7c6"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "c6e5ab8ff2fb17ce2072ffad003534f0"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "e10f800a0f77ea3bde3bc2728517b5fa"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "7772feecf598489a5106f93697e689ab"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "d64a0d31dd18f781fd59fd182c3f5804"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "bf8fbb38513b930278685eabea54b4e4"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "c159d87d529d379ff34adb196ac649e1"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "d822b82ceebe1625703c4b503286c6b9"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "6f4c8d7a9b3401d3cb614740a2e021e2"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "f971e9ba93c878e9b3744805595b6915"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "c48f52d35045a124dfc1745f45bc67c1"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "18c90db034185b70eee88989fb12ba27"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "2daa4dacdedf87d8e780dc7ccbe382e4"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "d9392362c69a54e1fb6d18b989fd6710"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "3f59db946b6cf9b469e65e74e017cd0d"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "09f84e5b90df72fd75c70f0a005c8b5a"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "5c74cdaebee5f7fc55e17ecf482ba24b"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "faead632f0dff8a3231a1785fec0da5c"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "6592fadcae9428b1aac3f5a6f87c1468"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "ff78b9d89e72c40acb734e858d2b00d3"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "aa4f04eed130bcb935966b19ed47d0d5"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "09ce326cf578025337bb3ceea3d2c538"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "19ad1c3855ab3088fa7ed4a6878c5888"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "d044dcb86b59e6a725b6aa81dffeb3ae"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "8ac5eafb09137963823553a9fc744640"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "77e79c0b8620576ebbacc7ad008ecf3d"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "a2088c2e5714e9c9445bcc4df40146e1"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "3c51236f20fabca2b079d90dc7ddd6e4"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "b3a6e6957f16df14d6bb12cb84e17205"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "1c0b89632dbdd5ed6dbf97deb700ee9d"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "829195cf13cad15109d1141c77380502"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "dc4a92ba36c0c0dcc56cdbd5c25d1e15"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "d7ff470941d951a8a75b346307618614"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "cf729fcf936d1c0cf3a6533d061226e2"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "3f5b66416fb91c3be0ddd6365d1d0c10"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "79c67318f14c365dc6bad29ed17ccd6d"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "41b482ac67aa1104a5c220d1fc1a4e8b"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "434336e8b85f85a747e6b6c8b80da358"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "9176901a06cfc711189eb6660943f35d"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "e4c731aa20a39046ec8c51ae6fbc0ca9"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "5dfbd7211df37b19a8a3830cf7f23862"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "ef1ae8332e11fb1eb401f56d0b7f9f0d"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "47ca1edb36ce23d9d7776b0c698a1def"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "40deb6f07a577c854d2f7c6deeb5096b"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "3f0546d14bd0e2b451a9cb4072fb231e"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "c95b26c8e83ed05bc8f95339b17657a5"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "49115f5a9e88dff1fccee2fbfc3c263e"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "a16beb9616a32d501ac7b17292bccabd"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "9d741a7b907260eabcb4a71cbe6d1a24"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "34c31eeaf35f04e6990ff2ec556babda"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "92479b7112f39ff6cc9ae56c4925c7d0"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "8f648318efd3cb9ee1dfcdfe6a0beb8f"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "37c8da2c6abf1b6e718be72a47f10fbb"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "88d5f8bf570461430f148a5099fdcec8"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "8d1dab83159fb97699645fd2642db503"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "fa9533ce293317db217522756e16d666"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "6385d01b5eca99cd3a1128b2621ff757"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "3bb84e0e17b652c7365c944d630e061b"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "a761140d584c74268cfcd58f9afd2838"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "6dba61d8acca46552e23e927e3ee43d7"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "c253d38f5b03bcd767830c13f326fba7"
  },
  {
    "url": "2023/10/14/Pratt's-Parser/index.html",
    "revision": "fdbffa6a780cab31d457d84301f7e5e5"
  },
  {
    "url": "about/index.html",
    "revision": "c63221437170075f2f32ff2a77dd7fcc"
  },
  {
    "url": "archives/2014/12/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2021/05/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2021/09/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2022/05/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2022/06/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2022/07/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2022/09/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2022/10/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2022/11/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2022/12/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2022/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/02/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/03/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/04/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/05/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/06/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/07/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/09/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/10/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/2023/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "archives/index.html",
    "revision": "ea26a7054f6bada69b17d85c25eba8c9"
  },
  {
    "url": "articles/index.html",
    "revision": "d5f86f46ce9897c45cf530c9477092c4"
  },
  {
    "url": "cards/index.html",
    "revision": "4a2ee76397b93899aa82e79660803355"
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
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/10/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/11/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/12/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/13/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/14/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/15/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/16/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/17/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/18/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/19/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/2/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/20/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/21/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/22/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/23/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/24/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/25/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/26/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/27/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/3/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/4/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/5/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/6/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/7/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/8/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "page/9/index.html",
    "revision": "100e003fe51e7de347b64f57bcdde5e1"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "6e3d2ae01e8d630277132ecb662a9ea9"
  },
  {
    "url": "readings/C Primer Plus（第六版）.html",
    "revision": "ab679ee1b0af92cc66f24090643260df"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "bf38247d3e73fa0620ee130e784ee27c"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "a52c7087165b8ffb75e5c4d45e037ac8"
  },
  {
    "url": "readings/Crafting Interpreter.html",
    "revision": "f11e256287e42387d68dceaabeaeebae"
  },
  {
    "url": "readings/CSS 权威指南（第四版）.html",
    "revision": "85bc895616d5da8887ac8de3c0c372f5"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "d1aa81b61a21fbf55ce9c60b745e3041"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "83ee37f5b731c38b1e21fc3e363d58c3"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "a0b0d380c1a914cb69de9d3bb66e7f35"
  },
  {
    "url": "readings/index.html",
    "revision": "e2278e1a64bbbe9c33d9fb75631fe336"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "941d231ad26fb4e5ebb90cc0cc299fa2"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "fd4dab6553f1549ef54c5cb4d73080de"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "3bc2d92f7c5425a3b47ca31211fff0c5"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "de454f1a3364c91977a424ee80541855"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "e6c5ac1c97abd0451164d714cf2f7c60"
  },
  {
    "url": "readings/Operating Systems - Three Easy Pieces.html",
    "revision": "94cb168250d529822db9f66db5175a5a"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "f17d3c9bd61e39f24be46d6a9a312b4a"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "488fe3befc21547b000129a5722d6c06"
  },
  {
    "url": "readings/Rust and WebAssembly.html",
    "revision": "20eccbd5e196f5fa09b8541ae7ca5a2c"
  },
  {
    "url": "readings/Rust By Example.html",
    "revision": "054e4c3f36c72757f2642949486d0cf8"
  },
  {
    "url": "readings/The Linux Programming Interface.html",
    "revision": "5d0061dc9b347d95fc9e2a8d2782f416"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "9f460e07883a31da11a6ea84acf2e7fa"
  },
  {
    "url": "readings/The Rustonomicon.html",
    "revision": "a05ed3023a424a32bec564da3dce80dc"
  },
  {
    "url": "readings/x86 汇编语言：从实模式到保护模式（第二版）.html",
    "revision": "aaac3c1f8c72218bf76600144fd13e9e"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "071c7683dfa8c303ab9470c31ae3c920"
  },
  {
    "url": "readings/人月神话.html",
    "revision": "3a14156b54a279f2bed93f1b570c0079"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "0473f2eb81f21c53a7ff468baa1ac318"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "99cf8c07ed79478ed2aa10812221c16a"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "c8c2cac425927a81e0680cb19cd8d8b7"
  },
  {
    "url": "readings/可能与不可能的边界 - PNP 问题趣史.html",
    "revision": "28d61ebc0021cfe607dfb54abd6f6f70"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "04e560c16d4a7a06bc3ca9f849b041f6"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "d67bdab59f502f02c64c302b06e96278"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "8c1fdc377d01675939aae5d17435cc05"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "b252f04c097ab61e68bcb6e1785dcf1b"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "8bc289bea46068af8ab40b20afa1ae3c"
  },
  {
    "url": "readings/微积分的力量.html",
    "revision": "13bd315fe191f13087a820b24bd4f4a8"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "1a0e3902be2fcbe3ea9b012134c311d7"
  },
  {
    "url": "readings/无伤跑法.html",
    "revision": "fd18553ba07d62f840649bdc051a362a"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "ba939df8ebc28d713cd94cad2150702e"
  },
  {
    "url": "readings/浪潮之巅.html",
    "revision": "1c3bdf287b55b55a91cacdba56f7aa95"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "9ef2c2117f2bc65e9eac8150452ad7b2"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "afd244be7f51474772f2c9e71b819150"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "fb4578cb291490ae053de2bcbfe29f23"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "8b7dbe5f9903c18191b11c0288df380a"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "ebbf82f0e6291f3dd736f21f861baf61"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "00e9f48402d6160395bc62f64a446041"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "5d9ec5b7868b4d341a4f704bd4bbfd42"
  },
  {
    "url": "readings/瞬间之美 - Web 界面设计如何让用户心动.html",
    "revision": "54c0d5d49cd9407114d0bd6961384d45"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "316ea2a540470a36b65fff6ca6351293"
  },
  {
    "url": "readings/穿越计算机的迷雾（第二版）.html",
    "revision": "46ca12940d51af385244eda709909fb7"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "4ce7d6851c1af7eae0a4e18f9a385808"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "81e652309113e94289b6d5aacf4a8789"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "48e8c20d1f7b74a706d3db53013e164a"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "29ef8f9f6a1a891204b07cb98d1672f5"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "1b70b1a8301f7cc2bbd1955f65f8a09a"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "283359bacbd6a95213dda73eb36e8635"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "a5d56d44ae036acf181e86a5e938729b"
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
    "revision": "f85d5b089b5d4fa58423fcd1484cca60"
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
    "revision": "807c2bdbf82ca6a07abca6d0c80914ac"
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
    "revision": "d0f344d1a8fbf51e05bd1ba5007e34b7"
  },
  {
    "url": "tags/AI/index.html",
    "revision": "80a28f3d2e4eeca5fed3e0c61e104ada"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "76915ccff7f6017df7d9e3ae65725690"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "4ab90a8b4763f8022737d6bcd56063f4"
  },
  {
    "url": "tags/asmjs/index.html",
    "revision": "68b99184293b4da8a38741b236c2515a"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "e5d90800e95c957361fd1bdd5c3d404f"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "d794ccdc67cc498c2f80269057a66cb9"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "1e43d820469cf1c4ce551132aa43f71a"
  },
  {
    "url": "tags/C/index.html",
    "revision": "98c8f287d21f5d08fec18ebd4a19fb34"
  },
  {
    "url": "tags/Compiler/index.html",
    "revision": "7e25751ab99718770c78f98e8a749a84"
  },
  {
    "url": "tags/Cpp/index.html",
    "revision": "95eb757a7765bf7781ee2b25d024d39f"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "faa3710f1485d48d4c59980b65f70d1a"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "3fd8ca4e00298ddb9d8090f282b98aaa"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "8317d0a61026db75d2d1fb35d770b0fe"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "6027021ef077efd8d1ddb468162af3f3"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "92e1f4cc9cbddb0bab3ab32d14924c9a"
  },
  {
    "url": "tags/English/index.html",
    "revision": "de873a3d65f46832c4671b2c5d8eaea6"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "a2b699b383a48aa17c3cf95722eec16a"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "57889135cc87804243ea4d78199b9938"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "300720aee56acb8645e9d55fa875f441"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "9a88bed067c70c127d01b0e8cd5ac6f1"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "3a1b6510e6578d111a71a9e5e8311c2c"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "33d0462d38d49167ab9a1181c1b3176b"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "266fe1383900bb9d5a4484e7e58a3427"
  },
  {
    "url": "tags/index.html",
    "revision": "aad9d591b251ae70a7c3a480c249f11c"
  },
  {
    "url": "tags/Interpreter/index.html",
    "revision": "99d519b23ac6a7f7f32698cfa890b07c"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "a63be5c38ed23b666d26be9684f6fbc0"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "5c99ceb703c0fc233fd6cc7bcf85ccfa"
  },
  {
    "url": "tags/JIT/index.html",
    "revision": "e4bb5b33fb6f85e2e20e1a56f565d2a1"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "fc081ce5f7a60276f7ca783de151dd1e"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "4ec9c5ab41b28668fa2d1871a1806021"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "75e9e117e2394ca9aa2d9e99e7ce92d6"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "1a6d9cc682f48612b3a1184fe34b9e2a"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "a52d22ea561e91f1adba17bbd9e02782"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "c7a799b41828e79a632cdde5c883bae5"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "274003cb2f00267d095d449f4a979f8f"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "f69a368c530c880306fa9a894a34b6ca"
  },
  {
    "url": "tags/Node-js/index.html",
    "revision": "115f3d3a7de31504e2134cf45bd4f355"
  },
  {
    "url": "tags/NRVO/index.html",
    "revision": "a73e8652d0c99beb345fe12c4b12ba46"
  },
  {
    "url": "tags/OS/index.html",
    "revision": "99e0c5a66f7dedb2d070043f064c5fef"
  },
  {
    "url": "tags/Parser/index.html",
    "revision": "518ad00536023768571fcaa5ef1249f5"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "f3e15c5c4ea125338d2125bffb0c3c3f"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "5ae09b558eb4908df65247f03d583613"
  },
  {
    "url": "tags/React/index.html",
    "revision": "86e9957b07effe89e66da874384fecb9"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "a577083e68de79e61c658b117fe687a9"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "1f739e704a76174f771264e7e0db8545"
  },
  {
    "url": "tags/RVO/index.html",
    "revision": "29dbcd28b9c2244fbcc5262fc1623a84"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "3c00c8f6a5b0be4dd0a65574c3979656"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "82cebc2d43a8ec51a2451950e21f0c75"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "6dae368fc69822c34238ca3a8d6eb99f"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "196247e05782512b5dd8fddd38de025d"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "11acf94de9eea0900e9785bc26158f8f"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "2708ab8f069a9582f4c067d6502f0c95"
  },
  {
    "url": "tags/Unix/index.html",
    "revision": "522b9572ba9e1596ef02c8ee9174d03c"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "7d890ed560c2fe3a04d0dc577aa8988d"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "2452bdc8a4482ea4ae6522791d169a4c"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "c20dcd03d3b0013f70d74c9f52ea95ea"
  },
  {
    "url": "tags/x64/index.html",
    "revision": "930a209720a7435109434faffbf87389"
  },
  {
    "url": "tags/x86/index.html",
    "revision": "a4837ad073912361c872d4691cb01e4c"
  },
  {
    "url": "tags/代码保护/index.html",
    "revision": "b615da676c683713f99990c4f2b7a427"
  },
  {
    "url": "tags/健身/index.html",
    "revision": "c7034ccd6b0731d83e7ae70581da944a"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "6e7d355f4a3a63a7f26a634e27399c1a"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "cf01c9e3d90d7627b980b22d6a9e013f"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "0e4948bda8fa0958ad263536fc0811e4"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "f37bfa11d65e2b1dccc8732c761671db"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "83a0eb781623f8fac2b32dc8e068af5f"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "bd4f9cdf30c1529134edbbd1a43cd877"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "6a246a30c2d6f5cf708ce39717b7a5d9"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "c9c128bbec23f7386aa60284f144c63b"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "f50df98352031e3a9bd66ea3e812db75"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "473748805a739af9536c37ea06d8d58f"
  },
  {
    "url": "tags/心理学/index.html",
    "revision": "cc886e90ff9f3b07c00393289c0a7499"
  },
  {
    "url": "tags/操作系统/index.html",
    "revision": "0c4aab76351b2b3548d2bab72e40c643"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "386643980b4de686a114f25b8e2dd6ac"
  },
  {
    "url": "tags/旅游攻略/index.html",
    "revision": "dd13f72b7445f080c832e12886fbf7bf"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "7ab67cea5effdc24c2ed1c4f626185f1"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "38fa6852f2b4779af39150b1f68a1997"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "8f68ee9f793f42d67fc80c382d8191e6"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "8aa92dc6defb421e1d8cd9d60f416f78"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "4edcf4984cde858582843f0318f5ff2e"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "d6bf862e582ab5d1bdc46510724f492f"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "f1100949a34289be29ab5ae0eca0eb26"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "369d79c55c31666db859da502d98dd51"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "b4f90248e8419ebb1d6870278bc0a3e0"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "b04994f65933ea5d3c2dbff88a0812fe"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "bef64384ce0aa5d34fecef5f3d0c8e1b"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "f79f39962c857431305ce19174702bba"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "2c223b37168eae49de9c24fb3708f088"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "0cb423e361a6d494ec77ddb9f6e4cc62"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "0880e751334d8541368d375b0de434c0"
  },
  {
    "url": "tags/设计/index.html",
    "revision": "db30f13ea5f43448e39ea05c3db75c6f"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "1fe91dfa116ee26360aa0ed5a6eafa7f"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "847dbb8a714b858a760ec6b2b36361da"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "704840ffabdc4b048cc1d2a8e860269d"
  },
  {
    "url": "tags/软件工程/index.html",
    "revision": "f9fc69100577b3feb43bf9f3c52d9770"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "97d45b5298daa50b7be641e7245865ea"
  },
  {
    "url": "tags/项目管理/index.html",
    "revision": "90202bf1ed2ff2ea7f49429413b5dc4e"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "a2eef11113f93666b6fe1b7d1fd84444"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "ca60a941664478895b29d8a452560f7f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
