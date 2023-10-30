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
    "revision": "b7f71eb04ac1d6f9f7df283d6a1303f9"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "b742db459224105842898267f2031cba"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "70f13d358049b17c8b1a9fba2b606e14"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "a14161dbc4d8adedf4bfc845b2d48a71"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "4096757e35bd42e6a69f198b719c7563"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "ec032c01c130049bd0dd103513527915"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "1248cd66c72ed98ffc91f538f3ec1cc8"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "e4ee855880c34100549c423cfb6d0c24"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "ca572bd8c1bcc8c5e81dc330b6158a87"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "c6bbede86b834ac3b82f16a2cdd7d10f"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "4473321c16ffc7e05d808339d8f0f1d1"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "8a56167c2fdbb10fd56b296cc83af632"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "d7878816330567a273b22b0744faaeff"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "dfa1873ebba352ef0d1ce06369004ce7"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "8cfff8d9ba31fb3feea1ea25c4eaffac"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "c261dba302978b836cc4e43c68931f47"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "7b5e9536965893ae291501ce4c41c547"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "110b16fe9c9286c23e0487904f2cec0d"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "b8afd14a88f0a495a0c707693f385919"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "b00a6ffe68d70dc5a24ad2b6ba5a8988"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "9253fe8fe05ad8d036858d66e63fbc1a"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "922b12dcd22623b7a5e144f815945547"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "2f4de3922133062e2d0c097a102faa2a"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "7b8ffd29baf13c9123d70946a5374506"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "b6bd86fb1f307cf41de1771ffa3f0963"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "a2c79a062fb157feb8ff9d17ee5903b2"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "06f63fe5925e29c0726a445fa3f67f99"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "dbee123f140af0eeb49e72bb6aa12e42"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "a809c6d796820d766ac0bcb2373f4e7b"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "85cfd4cf21caa1da016524d267839cfb"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "8110de145564ff704dd01578c793ea90"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "88b678fdde17a102c8a037e19b8cfb93"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "72be63036ced788ebbbd8bab7066911e"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "11c71ee49ff5328bc10310df175baf3c"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "de767bb9b4cb176eae540c779da3d07f"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "477f12909d004a41b7b0d46c682157f5"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "8a5a531e18e6b2f9a2d85db5283b6850"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "4ba81bcf59ad169d2ead116e6d3ff728"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "ece0bb3332c4ccbcc1bf5a7a7c6fcec6"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "08711a9b1ee23d95a42ea2a76fceaee1"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "705440a1ecab7f2ac671143ab5da9670"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "fc2a91bbad503292d5424f14353600cf"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "ab97530727f25de2b0fe28d160d39dad"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "60c83e012bb3a95d81900864e63fc6ce"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "14fb8ba1291a618ff1a61ecd3c06212b"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "aa5fe5b5d0c864e275749482419bafbb"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "4224c33305931d15734a75553f609885"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "027a4ca28e15ec74ace3cfbfba24d6ea"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "630cc9984bacb8de236eedbc29890617"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "6b73ca59392ce542f8d32aac9eeebf01"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "5da79dd1eba7c0cbe9f8155ffccd6be6"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "2c8a45f8ecafbf9c3d71e42259112c81"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "2cbb6673ee104561cade6039c6996c53"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "86a2da38cefc2ece3460c2f693d9b47e"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "b5c8d64f91dab659d82024368cea5df0"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "34fba2e8d4886493e75eee8bb3a416b5"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "43e1b69299470b065c374ee0cbe01a95"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "2ebbeea8eacb86c8d74045944f8b96dd"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "ee8806df2d5bac553004030ffc559610"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "d85bb32496fac3bd4c3b34c488d829f0"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "34e53f5cba4931c5a551b6168074fdb3"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "29a241325317f1e94c79b722e5218fd6"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "050049b8f4f81fd9b390062174d4e186"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "9bb83c38f98e5e9c7a00ef5efe786ff4"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "9bff4083a9428085d68038d289e8df4a"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "2772996c4491c1ff2b7c65af18bb5eba"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "b0a0af24b23204827feac817c8d5fb81"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "0583ff60c7ef5f2cf2bf16c45ae4d2b5"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "3ac11c6cd51859e4918e423b28fc07ad"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "9bc4c278500162cd8a1be8474cf2065b"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "7e95968c15a3cd5953226064b9a87fc9"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "d4d0316c918324d83887d22fbbfdb41c"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "217beef9bcb26df801fd234a45e2bbf1"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "25726f388e77684883739191b9158295"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "219486bf8fbd4d117bce0c1f1c7964ff"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "9c8eb989e78334c74b863f3c5aeb62a3"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "56f6638e535d52589130b6bb52a7b57f"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "b415a8d698204aff43e6d863939adc09"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "078ed2d4fedb64271e5757abafce3a85"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "3092b6942a552f226a6d70f19a9e614e"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "e1c4811e0b3084d46c692abc879c67fe"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "70344507875d46d22a5f8e7f35e5ea63"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "bf4d5e6f4ebd6f2a5ec7cfc48eeec0e9"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "724e8b06917a6553d4a9e60c60febc3e"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "89cc176220ee2a29a6db2e5ed6a50136"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "25192823954db99f15d1771715415e31"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "018e0b32bb66993142de538d0fb8eb8c"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "3aa1204ab3cf13fb5a32f3b3534169a3"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "67e5dc36a6c91c4d64500e09af591509"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "831ce0de1138cd36d9f4ffdbdb5d4fd6"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "b1513095982d73b0601eaa1fedf01a27"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "b26e8e64887c04440b39ca9cc36cd05e"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "0deeff2fcd1c3d7ba814830c21a54210"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "98f0f5a705ba9ab21267dce05a30ac24"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "88390ecf9b071e35b12bd0de5830a39e"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "4d0e4f2280829f330df6078f5960dc8f"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "c5f6b6dfaac0f10d2f5eda59d763f9b7"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "2c5847ad38d6096a23fa2a3fdbd858e9"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "cc95b1894ff33f85f9127cca133d2bb1"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "37978219905fc73be4f39b8be49b2a38"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "34a954272b1865b9fdfb3e96b22294bc"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "1e43f418395a8bb143611370be4a013e"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "47faaf059e340205f204f03cb9c75e36"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "35f909a45809a2db6dcd066c139f2269"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "de7099c256f3ce06aa0e4d499243fd86"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "46dd569ec1d536e1487d1e47c06450b8"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "bee1fe3b6be4527680865c6f872a142b"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "a56ce6bb6a692290decc5032a5257a5b"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "4475444aa274bb76bf936f8871599394"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "618accc1ccd7af7ab60800ad5e19733b"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "c13b307e89063f6e5604909715620ebd"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "6c41427f7be5a8d2cf09c7d507aa552d"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "2323ee9ca73dad4223cfb82cd7a6aa5f"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "dc28527e19beb7f83626fbbee99733f7"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "103544001f1dcd563a07bff7d37ce4c9"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "039e3b9a85d245a6d1bd6b64f0517440"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "aa85137bf14277892dff3fc7cbe90787"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "2d0019087a0fe08d2142d13e35d6c5dc"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "c40ff674f5bb68194895cfb44ef76bce"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "5c4af2fde96514efe59f9fba78db6cc0"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "64fb52dc4c50ea8b9b37b9ddc52a49a2"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "8a19d7c047eba09000fc19ca48ce69eb"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "52eb62622e5353a79aeecb9c234b35fc"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "df0dc5e02a2e23e40884951ee8e3c33e"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "fb5286519fa7e13988912f0d71f56501"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "f70d213a4cb6bf1ba0a858c93f5fda57"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "917d72aa7eabe1f9e91f23f4848dc404"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "ecb823ea0625a871529409ca9ee26784"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "4d4997ed9267f0fd92b89320ceea9a3b"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "ef156ddb73de307fca1964361e5ab1a6"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "cdfe21e610749e0acecda7e388b9dff4"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "fc5966162f1d4a5414a1a924108c95a5"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "d3f04b9f7fee81cc788650ddb1aa4083"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "46056bc7e57cec7123c8d4ef4bb122f7"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "c032d8610616da72bb659ffc2bc88796"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "b4a34b5c178766d3f6417426aadccb17"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "ce533cdb3f0b5dbb9d0c85543e50345f"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "9353865424ac8a0c975be4f5579ac72c"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "5677320a7504a105f851d469126029bc"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "3f2ff9fc0f34e6f768e9433ed543e200"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "6f03426496413a7d84b3a056cbabe17f"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "12444843590f68856e298cd4dd97e464"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "81341ef25746e78b384247c7330abbdd"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "ec32070eec774db563c1565a48211c51"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "ddd4b98813e8d52b9f9e27094c402d1c"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "521e1af8cf92098e7674ab6bace79c91"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "0d8087288cda6cbf3ab402e2607245f8"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "d42ff93bd9608f2c5f8a59b3c10f6944"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "2c4c40a8ba2c80dc2eb2d1be52f0de67"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "2c16bb9abfbbfa1d3da47dd76ff22aaa"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "4f15ef672288c63e17ecb8e61d4024a0"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "de345eb77b3f06737840f2b575969e47"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "592ba48692fa169f6d9838fd9a784577"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "74712fa607f3f05fc43c8526ffedcdfd"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "1e068a0fc3ea06e232f5c83745d257a9"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "f158fceab72ce8c76273f9f0a24bbce3"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "297cdd63338632e055604e10ec2efda3"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "af1bedd5d7e17775d4a4d1458544fb20"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "326069db006d5a09fe205f86755c1ada"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "b35895aa22918f5071801dd0116f5eb6"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "bfb390e8c78392a408d054383665867a"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "6ce772f6a24f2a5220803291239233c9"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "3696bd7a004dad18f961e1c89023205e"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "998fb5d08664c66aa9f49f210d4c3582"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "b5f5ce5f858323ea92c96bc1189e9120"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "620ff5c5a2f0dc6147d47f030837b3e2"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "2e28ca98ad9f9e0d8dc566f68fa1c234"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "934a5d655621c215fbf0c63fb29addf9"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "86673acca82e9be5782bb27930e13744"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "05f0e1dc847392ead04731034690ea84"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "cc5ad7329c18a4e0dbb0db86fe80c7e7"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "a0cb41c4943b9d2b509e6501aebae8f8"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "ac9a98be6b936755c0ca90ac569bc0ef"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "ba5704fc3187f8d8390fefe8382ae9bb"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "09d96f921cfad0d25274a219b7c865f1"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "6edc2c2a64c632b12e5d1894b893e07b"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "632e6b1a0a98efbb32ac6ed0f7ffff91"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "8c5792ed1a131214e650028abc96a5bd"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "992dd22b195d8478e4962f09996a571d"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "fac35ead5a115131018a3ead8a018cdd"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "cce2e79f6a87db6ab66d0a669b2975a6"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "66fcffaf2ddf1891e885059a7007c294"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "2fe6d2f66a7616f1b836f329b0ac4738"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "bfae00ca8c7d5b16ce34033f8a338762"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "8e2d692d671ca0dc9ae4deca24371e03"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "7c95750cd597fb3e9064f7361dbc9c3b"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "47e3e8ff3b280f1a88a449943d7dbc1d"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "7e6121f34f3af314aa21a45bf96df189"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "9d65b1bdf40b72f9926577b9fb8ecc24"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "e8f73f5520cb883a36ea45823cb21f37"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "6bc5345900dcd6821ad2898cf5de85c8"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "85a23a725bd34d3e7420c9dd647133cb"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "6b0b779a4622ba1b075601ede6b34072"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "462bcf4aa82851a212eefd960a5fc967"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "be2c1ea1c3ec2ab1c7d1b81ec4671fc2"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "e39efc5c58498d1c4edaf05fd6b3c80a"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "ad5d3970e710bd80b4643721af01864c"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "9e2a471bfebe05972fcfc9b3d07bc0c2"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "09a7d8adce6b953c16b707ddf07be3fd"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "a6ebe4d4c96f3609d3229f9e2b52f162"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "9ffcddf48f336852a2b844d6b5ce04f0"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "77e01cb3a32aeccb6241be9cc9477bdd"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "cd54f4f8c34b782c2d8d92d16488d455"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "f73832ad960aaa199ed4c8230b8c7147"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "0c1da599d955c81ede94b3a550528e2f"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "d8523f78eea1cf815bcf4ec90c7ac1b6"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "b5484bfbf2456e869c047358485e006d"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "3dba01b39232df2963453abd22283cd5"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "93090e730846cc35b0246fdc3b5f66f4"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "5e646bc8dbaab42045f8e678b3316883"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "94eef1b305dc3ccfb5243ec3c9d07c64"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "cd732a7e4cff258bf3c115453ecc9104"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "c8518cb725da9ae2b23688e7963b3a04"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "a1aaafc7a3a212901eba72a68443ae56"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "bb9dfc4db1cf692f61337c8e39abd4af"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "73d732fac3a1a00a3721e7ad76319b2c"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "e7305399269c0d66dbe7d8a4ff0fd0d8"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "8d2594d781d01ddbeb50f52ac1e5405a"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "43158d054cd64ebe605bc06278d4c23d"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "9f51f7c0ec3c0e22a0cac0ec7e5c6589"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "0b5d583341144e4e66d4b7f3eeabee66"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "e439efe7583c4b08e7cc791608f8a70e"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "c57af5f1f062bbf3d979e3d10c4cd703"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "70e304ce22c93fa5d4b99e67a19ebfa4"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "635f849cb7f5a4be8f39812881d682a7"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "0fa545d4f6ede85172754cdc939fe5e1"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "c689032f3efde61ac38b9f84bef3000b"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "a26f4214b015b926d338ed5110c2b48a"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "0ed80d375ec922aa2111ecca20369d1d"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "544a7b82947c7fb597dbd8e2a4f9a5fb"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "685f21584c4c2e45a00d0a694f1142a8"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "dd6fd98ea37f47dd1f02bdff21a807c2"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "e72eb985c4620adb270647bb4567fed4"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "7cf6aa15b53c7b7ef3a8e43df3e5751f"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "db28aed446eef4aa9efb64cd1900aaaf"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "e3fd932adb4eb4b0a8238c75c1f690b5"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "2f86b7afe7e92c089d1b6ab450eeab4e"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "ced63fa6555b7b527ac70992e6eef350"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "954aacff5ea929558f2c7d02653e2842"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "5ab0ac4d72fa0410fc2be0e800636dc5"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "462182d3e1b2551d3fcf232ace3e1890"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "d4c3a9c8d15c59d7cac3f0f7410ac6f9"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "c351b19628a0183cb8841c13c5b3b7ce"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "2d23719f4bea49fc7e9cfffc23960e91"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "bc14f2f9165ab6601d60f28de845eeb9"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "9d3be8e2256f1e9ada80cb109824cc2a"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "d6e0d64982c33e5cca5142fe56d41374"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "2ced3139867e4f3bd24e257538e9ea9b"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "35958e72cf7f144d968d6632b4446147"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "d0b209f84dd1e008ac8c2c6020c97d58"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "475600da4ff19e2fa067f11d843304b6"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "176d1d65108dd2de9eb9b63c939ca6cf"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "725650d90952bb4df70be80e3057442a"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "12263b6429ed8b947e4fa9f375616a3b"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "12baab0e6f125553ee734ebfc29cb1dd"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "9150c2912ac4faf8c02ca363446b40f9"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "bd91280f948dc031822ec3405a59c3b2"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "392ef1498c7334b64cac703b23df75aa"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "15d64a1470949636a59b2d4e66c049b5"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "b3c0b3ade64d0bd554916d17a45ec618"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "2f927316081cd7d61818235191a43170"
  },
  {
    "url": "2023/10/14/Pratt's-Parser/index.html",
    "revision": "fbd2b2bf49e17505aab93fa3d9f46e01"
  },
  {
    "url": "about/index.html",
    "revision": "6bf78ce1d2a297dac903bb89d62ee42d"
  },
  {
    "url": "archives/2014/12/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2021/05/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2021/09/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2022/05/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2022/06/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2022/07/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2022/09/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2022/10/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2022/11/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2022/12/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2022/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/02/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/03/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/04/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/05/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/06/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/07/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/09/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/10/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/2023/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "archives/index.html",
    "revision": "3d03b648f2a06556e8adb7fbf6749749"
  },
  {
    "url": "articles/index.html",
    "revision": "d00d1b4c0883eccf43a828a2aea0f0c5"
  },
  {
    "url": "cards/index.html",
    "revision": "c639cb29d022f5b96ddb4ca247c5444d"
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
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/10/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/11/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/12/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/13/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/14/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/15/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/16/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/17/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/18/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/19/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/2/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/20/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/21/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/22/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/23/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/24/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/25/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/26/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/27/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/3/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/4/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/5/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/6/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/7/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/8/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "page/9/index.html",
    "revision": "f6c05f32f2fc1569788c92672af0c3f7"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "5e431195f39b6c432cac757df32e6eec"
  },
  {
    "url": "readings/C Primer Plus（第六版）.html",
    "revision": "dd4f4791ba5c387b8b67af6a995d6b5e"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "5934f8d080ce08870c53fa39025299b2"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "9aa17c5b52a15aa5d573f65ac5bc8905"
  },
  {
    "url": "readings/Crafting Interpreter.html",
    "revision": "10ef137ef1596d9b141e040fb4e150b1"
  },
  {
    "url": "readings/CSS 权威指南（第四版）.html",
    "revision": "c74dfb94ed5fb0667c7c806e1f2c6702"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "ba80f35bb72e3cb5a109be1fcc878952"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "e0fbe4a0f389581314c1f779017e4936"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "7ae87ea3cb5a40277d4f97289dbf0485"
  },
  {
    "url": "readings/index.html",
    "revision": "9a0d106cc8c78cf47501c794f0c4f5e7"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "5fcda3f501ec2a472b66b022350b0011"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "883c13f57bf893a4f2144bffaf3d095e"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "adce90dbe38319c81aa1025632471083"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "ee72f66f30a193ec7058478abe95f62d"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "1613e0bab75a2e68641f998f206a7ed7"
  },
  {
    "url": "readings/Operating Systems - Three Easy Pieces.html",
    "revision": "37121ff111d0503afcb58775f7bbdd09"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "dd5575327d46709ec9fd9f804f1e01b3"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "7a512e4332ab1373c3731740ea72b566"
  },
  {
    "url": "readings/Rust and WebAssembly.html",
    "revision": "69d3e2b0b6612423ca17ac0463fb2f2d"
  },
  {
    "url": "readings/Rust By Example.html",
    "revision": "d255d5f7c7dac7d22b1ada74b8d70a2d"
  },
  {
    "url": "readings/The Linux Programming Interface.html",
    "revision": "827909ea72cee6e0c4f155bd3453c9ab"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "18d57760078dbf98de54e4779cf9961f"
  },
  {
    "url": "readings/The Rustonomicon.html",
    "revision": "014071e06b781c458c1d4cc8f31a924b"
  },
  {
    "url": "readings/x86 汇编语言：从实模式到保护模式（第二版）.html",
    "revision": "1aacb3e048ea7d851a3af797c93d84bc"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "a71b42d6ddc41a8b3a8acc88edf7e8d9"
  },
  {
    "url": "readings/人月神话.html",
    "revision": "4d667c89e1ac796ccc0d2fe27de680a6"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "f706f40b6916be6f73e392f56b009db2"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "a3794ab00acc9582aa8bf630eb6b23f1"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "02bfde85bfdf9c0f556b18186f950d12"
  },
  {
    "url": "readings/可能与不可能的边界 - PNP 问题趣史.html",
    "revision": "2d4e48a3bbe88495d9cbcda77a918aa0"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "06354f9d2d949a2cd623f57b3c442bc4"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "a67cf44f4bc6ed0c0f45bcf9965013d8"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "994d4fd57c90c6bcb989ad75f077e630"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "905d09aa54f1e0978548d7a7c2eec01d"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "510ba5e2b54ad404e0d925499ad47943"
  },
  {
    "url": "readings/微积分的力量.html",
    "revision": "3451d2f1d2b8b080143e3c91f4ae15c3"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "2a12d7423660380e2ccd3732c568a945"
  },
  {
    "url": "readings/无伤跑法.html",
    "revision": "2a1a94c5ba0c8f2049276e8b32f95c12"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "caf850f01548a99de5ce22ca2a9d320e"
  },
  {
    "url": "readings/浪潮之巅.html",
    "revision": "69225204ed719179e8abf0b01eba5f64"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "21121d7913f59418ac8d622908ae6e6f"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "51f90b3452d10750a7ce91f5bb1445e5"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "cb29f4ff3ec3b95b2ae96aee752428ad"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "68265e5541e5becfbc53637c7f641edd"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "4cc861dcb758d84d054bb75d90744528"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "45af8715e7cffe0986fbc528f0e6af2d"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "b327bca72608bb71c05224bef59bb828"
  },
  {
    "url": "readings/瞬间之美 - Web 界面设计如何让用户心动.html",
    "revision": "869b2c2e7d3b174f7ca17f593821d40b"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "456a024d2fdb61c8ca998aeedeb1905d"
  },
  {
    "url": "readings/穿越计算机的迷雾（第二版）.html",
    "revision": "b7e60132ffae9a1b75ec3dcdfcd2201a"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "f3edcb90172613f07b7d237cce9f4b9b"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "b16d1b24edc13d582ac41e0bca97cd03"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "d327285df5c395a28333d3029d96594a"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "3b13fcb880117291985ca3da0d03f3f4"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "0261f30c30d7e43c89ded3f0f6f58643"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "40df102ca56acd86b602b444248de1a2"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "d0792a2908256bd9240159781210f415"
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
    "revision": "26825c6acec9e5034fa6d0642aac2772"
  },
  {
    "url": "search/index.html",
    "revision": "02158d77d3c4eac06f7f41e091bdee82"
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
    "revision": "e65b2a0f239d2b68e68ea8da7d8b7189"
  },
  {
    "url": "tags/AI/index.html",
    "revision": "23fe4510cbb375392d1af61775c5f262"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "1214782c32189d806d2fb14b0e224569"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "c36fe7bee603a6de4ec6eb17a019865a"
  },
  {
    "url": "tags/asmjs/index.html",
    "revision": "b253b97223650bc37e3d802122e640c5"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "74cd00f47621886fbd33b7ee66337b98"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "bd3334cc38d8c10657bfdcc48219b989"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "7020c575006579b6fcca9b5e364f92a8"
  },
  {
    "url": "tags/C/index.html",
    "revision": "fa39603909948b0850361933b5595bcc"
  },
  {
    "url": "tags/Compiler/index.html",
    "revision": "575c45b6642ae1aba173164aa7d60d8b"
  },
  {
    "url": "tags/Cpp/index.html",
    "revision": "fbbfb15d2f4187bb0e796b8bae2f3396"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "36ad941df4320d984c3de97164c4d4b4"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "bbee1422d52f4f920fb19506c3df60e6"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "5eb9a6873009aa264cf35dd64510f13c"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "d7dcda057388f0cad39e650825824503"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "df147c501b2f9a9a62bf5b9315730c80"
  },
  {
    "url": "tags/English/index.html",
    "revision": "fb54b373f190f9c37f9e8894ee4d6677"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "b2e3498bdac16fde06b66a577f6943e4"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "aeb254e3795e4fd39a2e620d1c872ecf"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "a8e44c1e89e6517311f89eaa7d9c7490"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "2466390789428c5beb8fc785604a48a1"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "c64a4ba8fdbbf410fc334c0ec6e5e00e"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "fe6de7e90c751f7b8e8a429772fedfa8"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "5b09c46e1ece2440382d90ca4927f60f"
  },
  {
    "url": "tags/index.html",
    "revision": "8e5023a2ed8a3b00113280ccc0bcad17"
  },
  {
    "url": "tags/Interpreter/index.html",
    "revision": "53bb740a7761e2cfcbd5a82ef9d5998f"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "d6b6ef363b934b5c5fe688df34af4fa0"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "4840d90ebe0d1ffc0513a0fb21b0686c"
  },
  {
    "url": "tags/JIT/index.html",
    "revision": "b222606d5aac92276ce8154aa407d4aa"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "671bd2d02478c1428e1470ffba509622"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "448b18426908bc5227d68c3d9f313046"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "8e1c5cfe814441077ee2e5122a64a231"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "b59d7023c2eed610fe1fcb6d27d6c5f2"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "73bc715f1d01c157b42383d6d7616395"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "b4d6034d298416565ec6e5bf196263a2"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "31533855e08126dc53e6f87dd8f19400"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "ebaa2e48093542f4acdbb48e4726f2f6"
  },
  {
    "url": "tags/Node-js/index.html",
    "revision": "ae0cff08a7859cde880dfff2848f2b3e"
  },
  {
    "url": "tags/NRVO/index.html",
    "revision": "f57a384c445d268ebb8309e6e70b3d43"
  },
  {
    "url": "tags/OS/index.html",
    "revision": "63b812a5c34fbb21f4157364d88f46ed"
  },
  {
    "url": "tags/Parser/index.html",
    "revision": "75413e1948dcec1858c1576be241f9d6"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "1f1a3718060550fa9bdc3a5adb8619ad"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "a46e45401e02a9defc105581e2dd39e6"
  },
  {
    "url": "tags/React/index.html",
    "revision": "7454f06ad4cce02fbc5b9bb38ecc6416"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "b05807e4c11031b9455510133deb5e78"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "cce4908c2f7759e8358b69d182815aa4"
  },
  {
    "url": "tags/RVO/index.html",
    "revision": "96e3b1c7a746a921120101e5989d282f"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "9b563e569513273bc4aaac31ebceb751"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "d6e557b891324552d19b47ed93190964"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "d8599aeab5a94c998b11852180af2af4"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "99866fd952a82a15e6499216469ce2f8"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "38372df42143609dd3a34718f15dbaf7"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "9cb9c51eaec8d3836a498825c065d422"
  },
  {
    "url": "tags/Unix/index.html",
    "revision": "92f29994d4b27b3b5eef2a00aed099b3"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "cba0996b1beefe4e619655c0bce1124d"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "7b5f9b50fe5158b911d4b286d281d5d1"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "05b8806afd94870bd7ca2448b0face49"
  },
  {
    "url": "tags/x64/index.html",
    "revision": "6870fac54f793071a13151d8288756f9"
  },
  {
    "url": "tags/x86/index.html",
    "revision": "f55145719764ff6b4459197cf2ac4ea9"
  },
  {
    "url": "tags/代码保护/index.html",
    "revision": "eed3293adab2d04d53608a572ed4ec44"
  },
  {
    "url": "tags/健身/index.html",
    "revision": "109993b5eb249726c7b46473ddbf33dc"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "ad0216f990c2aff3343adda361149eec"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "b1c6dae9993df8f973a5575396f1a1db"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "81df9613dadac5f73125faeeb084c064"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "cca43d1bf18afed6397b60d62b379a43"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "5a8a2abe731c7b00dc5f0603915d7074"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "469b63fcbe7d24f8911b4f76e2c32592"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "610471a4350db490ff942624f3f510e9"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "e1fb4ad56d5fa5ce33ba9941e7469ac2"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "8ad38e9fa0f7b063547b8843341291d6"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "ebe3f6dc93c17d3dee4f93b33c48723c"
  },
  {
    "url": "tags/心理学/index.html",
    "revision": "6a995dfb09131e0254ac32ef37fbf81e"
  },
  {
    "url": "tags/操作系统/index.html",
    "revision": "e49ba6882a73dc0c3c3992d271173928"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "9cf9b638edaf75e45a2c58baa6d22de1"
  },
  {
    "url": "tags/旅游攻略/index.html",
    "revision": "f6afe024fc18101d994a1816d83fb665"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "93667d80c739385aa50015012bfe9ed9"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "e2a3c707023ee9dacf7b7fdfa8045a8c"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "f69129ee35a293609a7b747daa798d13"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "8241f88497dbe1a0c6ea6036dc7b2f6e"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "cc54a26f06f92b45592094b386d3e224"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "66ded576866d388856a33b2bfc88dc4f"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "5fc4a0e3ebc1b727d32e76c52cad6ef0"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "25cdfeced964bf7b850969257b5ea1e4"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "209691f867bd59450db51d95004312dd"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "2656418f80e0c9d8a923e9ebf451874f"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "6b14a92e49c842d3004b5e8f414ee0be"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "bf0ba6c4299db89f2b30e49f7e2215cf"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "880dc98f4b3cec5298578ccf83d4a578"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "2fa911540a8d1774ca6b4d9f18850bef"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "47211aedf7e6919b9b98aece52ca34c4"
  },
  {
    "url": "tags/设计/index.html",
    "revision": "1810fcc770e9aa779b91c25b7b3f3901"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "49cfef25bc3544e69487a5373e52761c"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "1154d02f6ec5e0fb63f47d4b682eb15a"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "1eae54bd8ca0736ddb4b93a86f500717"
  },
  {
    "url": "tags/软件工程/index.html",
    "revision": "55fd519aaf054c94cd31470f2fea8b7f"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "74102b8e1d47c79eb6849af0babf1760"
  },
  {
    "url": "tags/项目管理/index.html",
    "revision": "3a997bbb08025df2b75151a08d9baa8f"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "c181f4a5659900fe9177ffb2c82917d5"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "6a93b9ef8de00064eef23a22a8d60537"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
