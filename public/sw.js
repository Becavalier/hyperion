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
    "revision": "d343c35e71f9dcb6b061f633ef241424"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "a786da126389101c0b803211762c6613"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "3b720a0756807b4368404dcc81a3ec21"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "f573afd75c16cd6e8a3e1b3ebc2a1986"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "90d830b956ba0c375e610ceeae0639a3"
  },
  {
    "url": "2015/01/02/IT-行业的入门与精通/index.html",
    "revision": "8fa0a53d7565ca5cdf9d3e768cdffaa0"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "1e812e3cc2dfaca4daa4fbf1f442d670"
  },
  {
    "url": "2015/01/06/深夜吐槽-笔试与企业文化/index.html",
    "revision": "33d9cdcb92e1b6c1accbc30d7bd80205"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "71a1326754efb62a6db49c4b727fe739"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "6a3d0b589ba81ce25c97138ab1d8b4d7"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "cea7859511b21a0d1feb6930ee30b0fe"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "a02bbd34dc8f1d1f621934483cafde5a"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "a1298beb8e9137fbeaded8a5e744a9e4"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "60ab68aa970a0aa95e54b7a3ce21eedc"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "9b05f7ec02af605af7ea9873373143c4"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "c18e9dc6de94e37b5fac474614b26e6e"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "1f665889cef426f0dfb02c4e286fcfe8"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "b490c567e42da6452bf4f186f8d3ce75"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "3b655d52d2b058bc714e3f0f105359d4"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "53a6ca8ea2d5c1d782be245f809fe72a"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "8473448e8a265bcec8a521bce75d6a5c"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "079ca19cdc6003559f26db62df7f00e4"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "dbb67d6520671459cc9d2d8c57f4a346"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "2ac74b8ff86fd66440d3d11b32f4aa5e"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "5cd86b311ec0ff23791d9baafdd08d78"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "3a00b97c4e854af26d1586f68b8e14f1"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "0dd62ecf4071cacb96d4d86809706f88"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "720b0998f32ee5a5ff5c4ee932b2aa6c"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "53597a9e13be9b79eb2601de5bde0d76"
  },
  {
    "url": "2016/02/12/技术是成功的“绊脚石”/index.html",
    "revision": "81cb029ef5007e10770c61ad71c11fc8"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "3ff1096971b5c72611f7d0556c185af5"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "785a1413f86691447aa9b4237422a379"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "85156225659870c4aeee661d5ed56cba"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "4616f4d2bb50e7dbdeb2cec10c953545"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "0221a6e32c9a749291d7d68e804fa46f"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "9751dfa4b5f264cac1986edaa0ffb6e4"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "a14c58b19294e0d1655ba0a924bb2419"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "524af5f17aec5e4f65c83c4936faa227"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "b07b5152b8fedf0f75bc23494d377af0"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "ab8b802b97589c998c91fcd40d36caf2"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "51732201cc7b603f847a5edcd819324a"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "1209ed788a70c226dd8a19f0158a2473"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "176c749e189b1bd57482a31a51e1d8bd"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "451802ea06259f2d06f8d54ad26dea16"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "a4823c13d81b233d2d5399e59976a630"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "e78e9135199b73e7922c64a54a7e4c51"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "fe753bc4808a340a41020da76ce37196"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "0d45bc656fa6f1681fcb8226ebb1eb45"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "100a2d860009912e562ee48ed1563a63"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "3f2f1236442fb4aecdbbdc14555f1ec2"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "aebc717472fe1af15fad1fed7a1c83d5"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "248708ccda696147ad53c55ec3be1e78"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "920f76e3c5cc7b60ee22d694eaa19864"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "524cf51dbf8445d5dd0f6ce1627d8ffa"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "ddc4b26ff49b84201b171bfe46ac9924"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "e4ab85678abed48a20e7ca755201d0f1"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "6189030725f44d4c93442b0178a10e06"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "2e8bfaef8447bc5b3a82b67082fda254"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "99052028574b88467ad9ea4d296a9567"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "47da543b33c56b048510f1136ea86e9c"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "e9dbbfc426589a09f329e7572f686f0c"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "d64a69c81820085ded1a30dbebda5b3c"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "759834a307962c515170e180d0c4e113"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "c40879baff8bd48a85182663a2be3fda"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "9305f6a49777a3ad58fbc4d78a25d96a"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "acf2ded0d67bd4dde4a466df0e1e6439"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "ca21c79d8720bc792ed3c6ce70791a9f"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "25d0ec0cc8a86f85418ab75ec3cc7a2a"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "c5d42088467d9164b593c4052fd294f7"
  },
  {
    "url": "2016/09/18/算法基础-常用排序算法（上）/index.html",
    "revision": "893c14f0cbcc2f6b04b27888453777d5"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "98133ac626f3593ee76a230be325ab4e"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "77a6e6fb14dad3feef1daf9f061306c3"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "32f0a3d54e029dc57f0a73d885690924"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "61d30af3bc63cf3bb7cb1ff036187117"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "b6f8e4caaf32f9f5b8c0c5e2eeed4012"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "50b0b8acb68acdeb7a1fb172c90c44bd"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "246dead473995c6f364e6d3061d9d65b"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "fc1c420d303422ebffe3085bb037a941"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "dd3e4cffa2c771208276ea5df28b948a"
  },
  {
    "url": "2017/01/16/2017-开篇/index.html",
    "revision": "b0d79432eea01396567a1d09aa7c9ecb"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "16c22de8b58e0eb8e787ecb11b36cb1f"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "0bb238cf278e16e25664dc818d4fa089"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "00a1bfb396a957272e48f4ce96e4744e"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "d6c520cf57d481b7ce7bcabd463ca66d"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "0dc9499bd8028c3d7274ac7eab3c6fee"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "8d589b77c39d31a7b03c22b8c291ab87"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "8faec617d3c5ceeeccd8f8d0daa1bf47"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "d1ad6c39937f2721069145c73b9f5cbe"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "b0ecf965bd8d7b427506f36801cf83d8"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "483ed04f304d030d23b4d0a30c820b9e"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "fb814a06abb343c2e01f1172a3b568e3"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "3ad99583c8c18db5d10c99c7967c3fd5"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "83e64128c9bf1830c3aed8a2bc20136d"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "8a1a2418912ff10cee0baab93263f0ff"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "7f000ea42a6877167296b39a8633740e"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "2ce4fb5b9c5cb2ffb3a32b9d31d24816"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "55d0f961cbbce74d03032b0b0d1df23e"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "370668223b11d7d1aea2903b54afa860"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "f65c05b39e4b21b7b9d4f165749cddf7"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "a3ffabc14e1662f590c3aa033c4b8871"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "52bb6f705b96e7b8f5a793ac03fafbc7"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "912f75ee5884b3ddec52b683cdd809c8"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "8279c3044886f144e76ad70efd753dc7"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "df00e00054d4bc17dda754cda2c42bb0"
  },
  {
    "url": "2017/06/29/Common-Lisp-全记录（一）/index.html",
    "revision": "91ec55798feb16e74a5fb643f74e7373"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "2682654f9439db0e8d76690afe885dcc"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "6e0f8964cbdb36a8170bcef49e14962a"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "48e7eba804d7dce47ebc9467aed0b031"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "fe44812afcffd9a88df41120ece5d9c7"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "a8c054ac1b80abde40782a28eca6868a"
  },
  {
    "url": "2017/07/20/Python-高级用法/index.html",
    "revision": "f400611bc599949c346363eabba8e1a2"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "e41149bfa925d6435f9e28857f505ca2"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "0bcadcc873005201791ad72c2fb4a5a1"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "943941510817726145504f06f214ec72"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "1cccd14e025e4e39ec3578263ee5dd5f"
  },
  {
    "url": "2017/09/30/一种新的共享计算力模式/index.html",
    "revision": "94551115bf907e8f1af1204078fb91f1"
  },
  {
    "url": "2017/11/04/Docker-最佳实践（一）/index.html",
    "revision": "1897a89df5e6259d30f3fcda25e645dd"
  },
  {
    "url": "2017/11/07/Docker-最佳实践（二）/index.html",
    "revision": "5451ca6784b354c649a69bc1fd84f03b"
  },
  {
    "url": "2017/11/09/Docker-最佳实践（三）/index.html",
    "revision": "856a5f21db9b936908844c8010003950"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "1a223cdbcbd7baa9255e554f172c7408"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "7aa83030b76aa67fbe1f6b465da1925b"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "1543f51698e48363059b12c6bc57be59"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "6e14cb1d7d492e51a82c3c2d19f181e4"
  },
  {
    "url": "2018/11/29/Git-最佳实践/index.html",
    "revision": "559bc4b89d9f473c3420d40ecc959b25"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "5c494baa7d3c7728f25c169c0ca9b839"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "71d9d489f04bea4ec24901d2b8830fd4"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "0bb60f14b6c48f1ac45ead54e6e80aeb"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "6913f6487b3bfcf7564fba79ad959a00"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "2c752473610c5ab74c784bb9b421f76d"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "b3202fd83339febac4e0078692327377"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "b22eb22914ed4bc35a65649df2f7394b"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "41c12acb37d906c2631c3ff4a4df313e"
  },
  {
    "url": "2019/03/17/女装之路-完全大揭秘/index.html",
    "revision": "df3e44d4a1d5fe75ec08434262de9843"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "0040ee674a2f29689a200ca4394b9874"
  },
  {
    "url": "2019/04/10/浅谈前端代码加密/index.html",
    "revision": "c52a7bf2fbb43cd0ecb64bd9a56e253d"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "615074b9542fcafa7e0dcd88f5b9fe5f"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "613ee3529365e50a947352453d512abf"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "e3d397a0d9d2b7c0522dee19f30b0072"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "6986ad1cee9a9be6eb016ac40572805e"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "8c253d767e603ee46150b76a6a384cff"
  },
  {
    "url": "2019/08/23/54th-day-at-PayPal/index.html",
    "revision": "925b0c4bbf4d85682f3cc97c668a6e7f"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "facfb56cee4fd4402fa641b495fcd006"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "92d46aae62796af99953f878757c1899"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "bf3a8af349a265e42c51509af3031825"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "5cdc0f5b2caf02cabbd2f3f6d70ba060"
  },
  {
    "url": "2019/09/13/Privacy-Policy-for-TOVD/index.html",
    "revision": "55ccabbf85bb9197af0a5a61ca2c22f1"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "7d8417101ec42cf3b44d5c32d2cc041f"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "6eed07f5dd27713fa626b467976346b7"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "cc98471b49a3a2335c489de15165ffa1"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "ebb5bebed5c5ca5a8c6918e1fd860bc5"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "a405e25e801d874c2062b8215d7b355f"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "954760ab5a94bd335b4e564c587e62b2"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "dc56afa52fc56042b0d9ac2c202850fe"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "9d96ae097a982dcd4b5e5af6bef17386"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "f248b2a90a3c3d4a2433fb4b22011024"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "5bc969074ba584f3ed845bdfd0f835fe"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "f5d9626fdb34b79dec91d59fdee93430"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "4fd5a757c43206dab74fe3e9ac286d3f"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "a264280b628afbe61f849a27edd177d1"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "b9fd1a1ede8e9c0f11a65f3577df9b3a"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "ca201745fd2f9648371aad42b64f0fd7"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "cbb2cb49632eee4c37eff57154939d90"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "24002711d232de7ba17d7d79796322dc"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "5f0feec001e40001ccceebb36fb0ab3c"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "8c3fca10d6defeacb2c333600d863642"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "3ca1e599c7a6bdd9d83ffabdbafc50c8"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "9e75f4d0fc547db0238c3869cb2a588a"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "4ab1b1c64aaac8f891af7e965aa105f0"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "2cdfe5223d6dd1c5ce7e8b4f916b01d1"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "4f7e902c62b319badc89a132f28c93f5"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "012b16335bbb11e94df109fa12e55948"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "9cedf1bbfe40eafc080b524ad39e72dc"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "1c63fc97c306ecb6a7de15f52ed63af7"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "91d61e6973d5dedbb1c4676b1f9fe36b"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "ed5e5164fe1c87ecd8d8b1ef8d009ce6"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "0a800099532a552e866de622c21a5354"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "a6ee208ce3e52994cca524e2e69d8a15"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "eef98898f381b8f36df7a6ac7852e5f8"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "d910898ac676bbf83e2dfe0080972d42"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "42436b867798a705bb8f906789dbc17e"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "41510f04df7da51e3641f1619ecd5f0d"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "fec604c5bddf6b76694b0636152a3642"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "8e1844d959c10caafec6b302094916f9"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "18887a31107d3e6b9be31c9ff0db6c23"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "a50ed9814dce37236c3d77e3a0b7789c"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "9b4aeb3d456f4a51aade8a3650ad3cbd"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "8b7dbf72780debe277821d0be03bb613"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "2cbe8344b6eca630a79adb2f9cb1bd3c"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "523b9615a0b8b4ee411e7f002266c186"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "7290a3b4825e8d565e99828067afd305"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "94c54ebbda01c14d0f12dcdd40628bc1"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "767d514ffef9bb376f1eb6ecbf8c96d5"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "3ba09712442847f600ceb00b99b3c0bb"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "4d42f0238e0b694955997db1f488192c"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "07556b044706621f69eb18922fa49f06"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "3d335ab7cfa1a4abae31b904d5843e70"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "79768508e44f23cd515a11397d1b0ff7"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "4241bbb5657915d8033c1d32c0aa6d0d"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "08406ed04bbe19ba2074f6f28f2e5483"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "31a3ef473f55326873cdf1b3c34f3ae8"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "b6beddd54015b554c930d56cb3b7ee79"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "8011437b874628406bc71077be44a034"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "ea0499df279511d59da88c9ef9c3505d"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "759952399ea87323a1b3006292f849d0"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "e45c00ac970ee15619bd0b2754774505"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "d48be4de5c18ec5050636e6707412b92"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "d3da37fca3f742bbc4826a955ef72208"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "0e51ab8b2c3c28a114ee9a4a3d6e601e"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（一）/index.html",
    "revision": "0469c29b2d75f92d66af9d56fff64b17"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "102ed53572084fa60bc2face82bb11a7"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "03d66fbe35d377f19906a1ff049b8cfa"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "8e58a68467db2ec680a35380a5b180dc"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "80134bce34dd379b1c481472fa457758"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "945a109ed6f50dece5f7aaea175e0d92"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "ef1a23f08bfb769e2600c1ead5ebcfde"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "56eefbecd6d952a5ecc55d3f389ba6f6"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "9eb5582ad1f66bf438844dcd327d8262"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "e6e74df1c4c80f5dce924c7a3ad3119e"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "d1de93cafe7c426c969617d4f39e15d3"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "2a87f300eeae3a6061d35d7e8a35a172"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "d553007fee070ccc89f99aca37fc95f1"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "ab5d98963d79f0de42376d82482d0041"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "cf8af649640f68688bbfd5e6a6b5cf93"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "25c21b5785ac61cf60f714c952254c38"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "37516011f58dda2e2ed3354e3d86bdaa"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "a207cdf49e7b94acf0e48ecc3d8df453"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "5863d7936e003f9e077ce846e83b58cd"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "36a9a907570e694d0398565c692b994f"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "8d03fc7e065623bc6c1af86df9ecde50"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "dc80ed113f80d2280742643b076010ab"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "35c11e7812ac5889ef4e14f2bf1e1d93"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "8126b42ccde3ac85ee4656002f9663b5"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "29272ca78c91896a4e4d0b3a17444f4c"
  },
  {
    "url": "2021/02/22/《HTTP 权威指南》读书笔记（第 7-15、20 章）/index.html",
    "revision": "81d68f0bd7634a869b27fdbb8cc76514"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "2142cd6225c151d1d16c6fa4f8b8da6b"
  },
  {
    "url": "2021/03/15/TLPI-File-I-O/index.html",
    "revision": "0d9682cf4ee4dbe8e682f509c532880e"
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
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2015/page/3/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/04/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/page/3/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/page/4/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/page/5/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2016/page/6/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/06/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/page/3/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/page/4/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2017/page/5/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2019/page/3/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/06/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/06/page/3/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/page/3/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/page/4/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/page/5/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/page/6/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/page/7/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2020/page/8/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/2021/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/10/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/11/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/12/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/13/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/14/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/15/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/16/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/17/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/18/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/19/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/2/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/20/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/21/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/22/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/23/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/24/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/3/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/4/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/5/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/6/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/7/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/8/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "archives/page/9/index.html",
    "revision": "3e78a07bd46862c93c99c1202650e785"
  },
  {
    "url": "articles/index.html",
    "revision": "52e2edb225e16076d1a4749a1dab20fa"
  },
  {
    "url": "author/index.html",
    "revision": "6d9badc3d5d114f9d91d0390f83bf5a8"
  },
  {
    "url": "books/index.html",
    "revision": "18f375677bd18765adb3b5830e89859b"
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
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/10/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/11/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/12/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/13/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/14/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/15/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/16/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/17/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/18/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/19/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/2/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/20/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/21/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/22/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/23/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/24/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/3/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/4/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/5/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/6/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/7/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/8/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "page/9/index.html",
    "revision": "4f87302f54905f3bbe7894816dde71cf"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "c01fc923f9a3e8dd9d3b8d4c801b41ef"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "e0a78e59fd86a135a6fb49037486e4df"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "56f8c49cfea800327b08155a38286c0f"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "3797c77e06edee24cf87b2b37b948d9c"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "6c1f15c9e11f03361a57f51941d1383e"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "52fa7f8a428d9f3a4e9d7da0b21d9935"
  },
  {
    "url": "readings/index.html",
    "revision": "57bf6f3933cdefe72c3f7fd100e59d88"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "9efaedec5742ebc63a632a4161be6b22"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "2e2529b2ac93d00394cf9829eb3226b2"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "39df84cd12f088822874d87b0ad691b2"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "4b2ccf645180bbf58154c4f1f6f95e5b"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "9a37228f33bd9b7f616d8dbac503b356"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "51331cc7090bc22e7d0ade44d968d20b"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "d5873762b6e4d68773617dc098ea9ec5"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "914e0da99588ae324e12c9727c83ace1"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "167f7aad386f6d6a6bf2515340e86c9e"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "2ace723263b26f946094f3e24bd4ecf9"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "0917b46aadc63a977e37b8b9060bc62e"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "3f9d2b3814bcddd2043b9fb82dfdee8e"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "fcc45d6b964c3ab297ed59e8273a6623"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "2d8982f4105bd397b30bc67986ce144c"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "486bee264efa3499d88c1493e6940ee7"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "88d2479aad29b4981f0d4cbb63e27568"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "405c0874ee108ed30b1b3a62388f55fe"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "21af4496edda1870b71d6efe7add800f"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "43e26cf72c51d1289af1cb1c30c0ee16"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "fffbf9db6989c89ad47aaabf9505fb08"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "2e9d07edb5827c49f2341206a9c137f9"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "c38b3559d7695cbe23ea7c27bbfa6d22"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "86897507fff25f2de206ff08a18a215d"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "11ae5391a27792b314d07bd9cd0447e6"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "1d2632dd0e3e794f3e1f1007cf1b333e"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "c43fdbe58f04af54f3e85d1b72922def"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "3fa268945f1f8720c0850abfc8b540a2"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "5d1aa4324db894470f3c6d0266750af2"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "110dc471737f46812d4a7e0c349ba708"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "817b56159d90a5efe6d156899f14b907"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "9aa704141a0f6c83edf08d119e4d3334"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "d8e2498d5e8d886573bb5431364d824d"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "9f64628783209923b9d43e2da3f67be7"
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
    "revision": "9821702a196206fe8a2b41787060d552"
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
    "revision": "7e22d449954c83ff5ca44d2e207fcb8a"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "de6cdf43f25edc05b8f15ac5be14c5db"
  },
  {
    "url": "tags/ASM-js/index.html",
    "revision": "6ec189638fb6c2341f2ea3625c7666e6"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "4cc4b49cf1e0821ff97e12924229e28e"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "8ca428e1429ac29d5641ab845cfee689"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "bd9171da723198c8e037a70ba22f85e6"
  },
  {
    "url": "tags/C/index.html",
    "revision": "40ca43f8cf13a5e7657a83b7bb06e73a"
  },
  {
    "url": "tags/C/page/2/index.html",
    "revision": "40ca43f8cf13a5e7657a83b7bb06e73a"
  },
  {
    "url": "tags/C/page/3/index.html",
    "revision": "40ca43f8cf13a5e7657a83b7bb06e73a"
  },
  {
    "url": "tags/C/page/4/index.html",
    "revision": "40ca43f8cf13a5e7657a83b7bb06e73a"
  },
  {
    "url": "tags/C/page/5/index.html",
    "revision": "40ca43f8cf13a5e7657a83b7bb06e73a"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "a10ca03a88f1c7e93b323b628eb14bbc"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "0360beac18379ef150618595016b5468"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "6d707e3f3654035d7a8b117586df0494"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "e3c6fe5d533e4ea45528f2297d0b8b43"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "433f02eb06922a3dd21b97bbad6035b3"
  },
  {
    "url": "tags/English/index.html",
    "revision": "92fffe2893ad3e05f957e13b0f39efbd"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "ee69c004a652efa7cb8ce97d4484cb4a"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "02b9d12856cc11c222ede2b802cfc72d"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "e10e6428f1c5cf1280db296aae39d935"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "2c420d035225ed448e1a870c26eafbc0"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "d63233924f9871692cc9bb17c9570de9"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "806dfb2dac504719bb184037bcfd5c90"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "9f77e3f2474abb3cfe79df1353ca8870"
  },
  {
    "url": "tags/index.html",
    "revision": "db1bddbb99deca0c178fb8fc39015ea7"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "cd29a0eed983c1b02eb39d36e3fd280a"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "b2596a475ae78e6fa311aefbce51519d"
  },
  {
    "url": "tags/JavaScript/page/2/index.html",
    "revision": "b2596a475ae78e6fa311aefbce51519d"
  },
  {
    "url": "tags/JavaScript/page/3/index.html",
    "revision": "b2596a475ae78e6fa311aefbce51519d"
  },
  {
    "url": "tags/JavaScript/page/4/index.html",
    "revision": "b2596a475ae78e6fa311aefbce51519d"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "35f778ebb605119c6c822e206e0b67d2"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "6089967c2b41e8438119f0dd57cf09fa"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "47321922f60e9f2ca1771b620e1c09a2"
  },
  {
    "url": "tags/LeetCode/page/2/index.html",
    "revision": "47321922f60e9f2ca1771b620e1c09a2"
  },
  {
    "url": "tags/LeetCode/page/3/index.html",
    "revision": "47321922f60e9f2ca1771b620e1c09a2"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "bea2ef8e6ee8c565b7830fb7627c7fb0"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "c320d0ca5afe94b5006564e3eda3c106"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "240563308320f9c588ebee5ad448f2b8"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "54a30f4912a42e6e946be13c82a8dab0"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "aadf11ac3e5fbfe8e09d0fc0f13bcead"
  },
  {
    "url": "tags/Others/index.html",
    "revision": "b4afba194733aefcb84ae6ecbd27a36a"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "e65d43ff392fa423f40215efa5f7886b"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "76f7776e13fee46655baa8b83f21a695"
  },
  {
    "url": "tags/React/index.html",
    "revision": "34b303ab3add349aa6bea160c2902eed"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "d7bf47b8d73fc46d2b0b3cb70e885f65"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "319c67e951f8bf59223272efd0b55c48"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "1ba3119ae9d83f499d9049122c4896b0"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "551bfd9c4bfe10cf7e8e667f39058157"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "291b80bd0625ae9ae38d6b8fc9041e8d"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "37eacde703cd17743ca48262615fe6a7"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "0fcc77b621df4ed3c91cb702af703068"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "7fff894fd0be6e81008a73b26fa531bb"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "18a16439b9a88aaf218c9ad842c7d894"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "eb7cb0638bbf741f610e8fb5d400e3d2"
  },
  {
    "url": "tags/WebAssembly/page/2/index.html",
    "revision": "eb7cb0638bbf741f610e8fb5d400e3d2"
  },
  {
    "url": "tags/X64/index.html",
    "revision": "51769fd52c3ec34f800631a222f445c7"
  },
  {
    "url": "tags/X86/index.html",
    "revision": "3d13877989c8c8b49e20461b5e349d1d"
  },
  {
    "url": "tags/互联网/index.html",
    "revision": "a3a9f502b8df1a7eb1646fe4e5cb9470"
  },
  {
    "url": "tags/互联网思考/index.html",
    "revision": "6be8ddbaec082202171fb02aee53d6bb"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "d277e4b506179d0cf8a5aaf7f1d73eb1"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "bd98f5267a5132d17b9f0b67888b0cd5"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "92c5ab6eb75b6d4a9d7cc696593226ac"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "f98d0b69e21d499062072413cd8ed058"
  },
  {
    "url": "tags/加密/index.html",
    "revision": "a4f005f28182e5b1fbecd8f607dc8b05"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "e6feec136aeeba0a26c43f3eb0b2e1ee"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "8fc40707e91676a4dee5e0fea805f00e"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "4ebebb5fd257571b6db2020b766e270a"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "f972e839c404f9de0a01c00567482f9f"
  },
  {
    "url": "tags/女装/index.html",
    "revision": "4be28592a38a300885477308f6def103"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "1163679ec40a83f294614f671465114e"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "02df3a6823031f87b6b16bc20104b07c"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "a840e2de31b5551ca451931c0010587f"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "2206de86f0d5d4e9a5651d388dc0e715"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "fbb5d15ce71fe0706a841ac6f4796897"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "254b40e8467d4f22a493fac27601acb6"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "23ba8323d76866dd6ed95122e2d5cea9"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "a19008cedd502286600f539db1aa5053"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "e8730983c78402f9e13c2b90fe365ab8"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "d8d6011f51799c44414d336df082cf03"
  },
  {
    "url": "tags/算法/page/2/index.html",
    "revision": "d8d6011f51799c44414d336df082cf03"
  },
  {
    "url": "tags/算法/page/3/index.html",
    "revision": "d8d6011f51799c44414d336df082cf03"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "3d4a640405bcc6b211d8abbd82fa0bbf"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "01221da412a144eeeab12f26202ac263"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "5d2750d76a2a1b228e0438e666cdf76e"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "3257c6146a8e4fbb0fcad4f895036e23"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "2802c868ad71dd89ad52d33289ec9b83"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "5ad6b6ff23987e542d909e77b8aa3818"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "e9f56b028e45319d295734815156cd53"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "905d5f8f8cc216e7ba35992d9dfc7c8a"
  },
  {
    "url": "tags/计算机/page/2/index.html",
    "revision": "905d5f8f8cc216e7ba35992d9dfc7c8a"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "02d6fc5bf0c5eac4f3c778c00f55cd72"
  },
  {
    "url": "tags/设计模式/page/2/index.html",
    "revision": "02d6fc5bf0c5eac4f3c778c00f55cd72"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "1dbfe73c25fd813541d1da576945fec9"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "5d4de1afa6b1106a94cde8ac72fb77bf"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "e7ad3e976327a3f93bec563fcb4e6fe3"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "a3b30d4aed72fea2dfd75b5a8ec32b6e"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "73764234f948076eedea129519607ff0"
  },
  {
    "url": "works/index.html",
    "revision": "20dfd41b6b94a6f76d0e48521ad855fe"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
