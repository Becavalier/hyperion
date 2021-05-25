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
    "revision": "3a5dcd4ee9ed30ab8cfbd17a2726d90f"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "830582670e806fa14e5d5530417e3af7"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "3f46aa64a901c491837b6a48bfedea89"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "eccfacfc323245642c2ad9e7358e5278"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "ef123010ea2cf1de28335b114da2b8c1"
  },
  {
    "url": "2015/01/02/IT-行业的入门与精通/index.html",
    "revision": "f5dff27aa520a92e4418553be00d09fe"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "9ee9ef636c5b706525e2acb02d6e77c1"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "ee1306a33e5a6e350b7bf1fd6f8e1bb5"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "73670322cc2d320037553f4665b0c68f"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "9f6b52291e73a8deeaa65590272b9011"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "d1805b45f0129da248225a153a4931a9"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "53845f977523c852019e07bf29e68187"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "0df5f7b3f846e2c43e4c62b49b44c492"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "896f885a35bb8d96a8d96016a7b35dec"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "ccba484b1dbc9d0b97ab2d421535a5c0"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "2778a5e7a3b246fb08906e2eb5f20e0f"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "717297b4d2ca9ca5f1f2eda53ff77dc0"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "8236be80811d72e3f321e3d0e83465f9"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "aeceffa59e5563ccc5cddbc061b5192f"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "a3188a4fee56827f295b1a997b6d646c"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "ae91bf663006d66aebdb33a5f766d020"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "16cce070dba47406195a809c11f95dc8"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "35ea8a859d8c1cadfcb5d284c743f2ad"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "5fe49f0cec0f836d4a8f162566519892"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "acd420cc35f5e4dd732bcce3beb4d9db"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "c9c18cabeb3910d4acfb16a543cf0ae3"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "b59d916e725d6ce8cfb62313147408c1"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "f2e895bd9df644f41872b8dd524836f8"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "0fb3e5f58d20c46e2f6e148654fbb1fc"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "f08953883b95a748f62aae5700db699b"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "0f49b95b2cf66df910e4632562e8a19d"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "39ae44c4fc76230f9f0a11bde39454c4"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "337f4cdee59118da7406e4830ed00c35"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "96745c00a9ae05a16db8e090c5209418"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "f074e3b5a780bb86ec24a870dde5f745"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "4acebedf846f78a84117239243a4987f"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "9c6bfe01c11dbeaf379a8add12c9a8f0"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "660f7163b43f3ea6778e9313ae2e4b0e"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "0fbd8159234263799fd43ce5645442a2"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "7e3c66fdb645c41ea3a81c1bc9528a9e"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "350020967120a423ab440bbbe38afde5"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "88b9fc2f2d72fa84544f1f579d8514d1"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "8f97285dcd1132d5deb97f090f75d16d"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "9ade9a9d8decfc85da93aa760ea08702"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "d34aa49a99e92a32e458a06c38b2894b"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "48022103519384ce9cb57c85f89a1012"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "ae050b228adbdb86ff59e837ce437341"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "f63993f446f731ce2d87bdab571d9edb"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "e7910583a70a52cd0388b184b7e4f34f"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "f13e93e245dc69fa39b774968ebef5ce"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "8aab963282b23bf86326f99744b18c02"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "4620238ce3c581a8e60ec6da60d8e13e"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "d3215ed8d93b6d608108e7f92b292847"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "a1644ca03e9b1daf7196991faa430280"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "d5a9892653086b91e2cbcb4ae2ef0024"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "b8c5787706b8a655aeb738d259a27edf"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "01bd2630df0ac2542b3b83a03523cfa0"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "5100651e13e4db0531a5dfcb5b60e0ce"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "9dea6f2de803d07d3813df6ac58a9fb1"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "fe1e338f22341542a520f2037cb13382"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "dee86d25e51b30af5d8a68d264fae565"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "e6bef129740295ac8b2378f72eb22d38"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "9ca2ff25102e10d26554327ded51b4f5"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "de4ec10bc767e9bcd7679d45ac12f4db"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "a9d728da7955b0131163796aa56b3362"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "c8288b2bfa97868fb990752a84a6193c"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "f50cc9e6790e667ef401bde4a9ebe6e9"
  },
  {
    "url": "2016/09/18/算法基础-常用排序算法（上）/index.html",
    "revision": "f3868d606cf4e63edadaf5bd04b040ca"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "ac90b0067dbfa936759cfb6fe7ffd305"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "8d39ee519121c8d81ca82c05818f760d"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "5a3c60e2618bab4d577f12b2b5e681a0"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "4a6e33ad456cc09f1e8eed48ee8ab3fc"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "35632abdf1a2e5451670c765f2f78361"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "a1aeddb4f2d82139ade0cbda4377e410"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "885d7e3ec1871a5fe746d189c7770e8d"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "65322d346fd9a3c743866393b8e5dc56"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "2715cdf553639d9fe7b56dd3769fe374"
  },
  {
    "url": "2017/01/16/2017-开篇/index.html",
    "revision": "453adf23204da4cec8ad83e7fa2042cb"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "07d92f4136cf743876fd7986d4bd9300"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "d44ac64ce5fd41561acf1df6ed747cc5"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "e11080802faf62a7379563866a9961d6"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "33255601e9e1d811ef5d097cb1c440eb"
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
    "revision": "5f0506792d2444829c459f9dae4f7922"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "c89d00a16dd93266949ae78caee905c9"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "867d1bef9d0dc1a87d33a1afebeab8a1"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "cee93c90daa89d9cbb93f1d1fb8a4d60"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "a97fe64378d5edef3fafdaab0ec0f639"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "8a9ae713eb0dd4d8440204579a9ddef3"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "54bf411c0255aa2beffde443f6810f5b"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "43fe48287061880a7dd08f833f23d2fe"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "eea60574dfd11861ce9360e39d8160ee"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "01eab702b07eaeaa66c2830ad617674c"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "c2ebd42dc7751725bd73d6db6c12d17b"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "191d101476d71766c6fc09d568a69aa4"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "97cf484044b8ee6b4bae1a7b22d6922e"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "10e8e55a546e5e3422a4114923504ab4"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "7429ab7b6936f2d816ef2da484dfc2b7"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "8e3946e8aa2db3af9e38b89aae7d23ae"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "ae6f34fff9c4d6479f716ad7a166264e"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "385dce22e0471dc0eb853fea8dac1bd8"
  },
  {
    "url": "2017/06/29/Common-Lisp-全记录（一）/index.html",
    "revision": "eb0cd2b02615a275fcca0400005e45d8"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "b0bc7c3168194f3b3da85b4a5f06580b"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "9f553ccdd7ab9f80bcbf651941e6cf29"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "100c4a4c2af53fef126f270fb64d0a28"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "9e4db359315f341c87ff359bebf2db7c"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "bff64637d5fb8a0c631c1d23308326af"
  },
  {
    "url": "2017/07/20/Python-高级用法/index.html",
    "revision": "8f3c35113d230263f56843771df540f4"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "b0accebff0c1c3bd68bb700d31205a94"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "9323e93fa4fe0e5a4e1448b9b67f045d"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "640b7b9e5165218a79132ccb4ac07bd2"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "1cdafb64c3432d5ad3b12b13ccda3676"
  },
  {
    "url": "2017/09/30/一种新的共享计算力模式/index.html",
    "revision": "097b0b6bd0ae457744003863dd2e981a"
  },
  {
    "url": "2017/11/04/Docker-最佳实践（一）/index.html",
    "revision": "53779d86c7e029cfc3229f5e6bce1833"
  },
  {
    "url": "2017/11/07/Docker-最佳实践（二）/index.html",
    "revision": "d35b25f8ecae2ff95180ab165ea1d07e"
  },
  {
    "url": "2017/11/09/Docker-最佳实践（三）/index.html",
    "revision": "1ed6ab749c5e6a0470ed0207872b2857"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "90f3b9fba4f4ccedf490ecc9d9e41ead"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "12e71cefc8e56a140eea856fec7088fd"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "ed1089a20f6c29558f1ed063a81614ea"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "bcf9d60cbc6e17a39c5fb6693c9fef76"
  },
  {
    "url": "2018/11/29/Git-最佳实践/index.html",
    "revision": "f57f9dbf80b4d605d74ac22c9a540b39"
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
    "revision": "89ca566110b992413de2f92f3c158b73"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "75973514dd9f6823608238f072af915e"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "391f983ede6677f4863e799a80269f64"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "cac35750675087d11bb5fc1f96b38918"
  },
  {
    "url": "2019/03/17/女装之路-完全大揭秘/index.html",
    "revision": "540c57972fd92807ec8a506f4ad28057"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "e2209423d1f77f13b33036dd38cde02c"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "51c9112e389b5203e3ac80d536942101"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "1feac393edcf7e48ee11ce9e7645408c"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "e714ef69df0bb8812203f9666521f323"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "ef3a2d9df7dee92715adbac01bde36b6"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "039c237b0f4ebcb62b7e2b517a11e808"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "bd59ff36c8b34b8f014e433ccce63ad7"
  },
  {
    "url": "2019/08/23/54th-day-at-PayPal/index.html",
    "revision": "ad68adf5b722ddea698b8fa3f15ca693"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "4b2d93358d4f502fcb783d401b77b9e9"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "e811f6891347d84a4202529d599daefe"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "8094f10392f1c40a4e937cff28b7b4c9"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "d896c89acd829bac08b37aaa5ab52cc0"
  },
  {
    "url": "2019/09/13/Privacy-Policy-for-TOVD/index.html",
    "revision": "845d7d467a179b939efd67fb5d6d4509"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "dc50a38e48dc80371f917dc7b9a78241"
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
    "revision": "f1913008e6a029d9eeaff7b2c8f3f4c7"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "2531fcadab1ca252149233e71af7fa1a"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "6bc5bf4449e643343de374ad7cec2176"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "ab463fc10fdb37c5e8b65dda40e62a9a"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "d7289ccfdee02ec000ee5ec0cd4d70f4"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "bb0cde3c25e46bee9dcc8ca564a52f30"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "418df222a3ff12ff819dceffc0b4f596"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "0f8becf927f58f2433dccd292eb7e363"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "12ffea532a7e91c6c56d613e6cf51391"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "10e6685255e4440a1d7227a70788e1cd"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "839e37949d365efce26d847be1cf586b"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "d52efb7cde75297ae05ff4e94579ca3a"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "af153ce1502df772261bbb86788ebfba"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "5d7f362064debd35e07835d0212e1673"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "c29256e7990ab8d33b8d77f9f3570f20"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "b802beb5a04e0790a926bafd39007832"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "b4bba95a733f7bf8a191ce24a68b9526"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "77c6390a9994489615da857783245d5a"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "766fa4ea53486d6c4dbdd28f42652e61"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "2d7a0b17c0b493daff18b624fe151fb0"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "fbadf155adbfc3b352885d50149435a4"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "3831c823b471f02b59e4b2acb9552609"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "47ec2d92ca1566854a2b1d7030f877df"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "0dad527d43e16874e51dd396272e5e14"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "65d1259cf3d49ccbe7a880f8b53c356f"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "e4f4c079a61e1cf347df4b72c0423596"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "626f711a084ccb329fae070ea56ca2c2"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "f123a8a0d3111e739366d6c6fcb63bcf"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "5da77b80ab4cbd8e93befff9b793be04"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "412e0c789b767034865bd4014d30c8b4"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "52efc596c122ab8abe158c8a7069ab62"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "935cd4a219fe0f80b58972daa4a767ad"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "43e65f3c39c36c246691fdb1112a161b"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "65be16c2140c410802f3c92f3bfe6be1"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "20fbd9051764b4dac1b4b2f3d3e49f8c"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "ef7bcdde48b1435bf323e2ff3590ae72"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "6bc8a9d5ee615c7ddc76a2f0ba9dd494"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "47178d5ce9b7bb5ac6b33f2195094f1e"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "1586b9a832f2b7ff2cc5f9ea4d9a0312"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "fa39859b7eace242dad36f7ee4e3813f"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "bdc6147c3d7d83aae51fb913ec839dd7"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "30cddc2def2e02e882b4a618e25a0c8e"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "2d5cc38bd3979bf79f459a1cd36c0725"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "c761b6e97ba43f614f422fae2c1480a5"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "bd00049a1d440226abffcde2c57f9df1"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "ac7636696069802cb4e3a3844fb0407d"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "87bc36a796901fa5160cb7c36e1d3b25"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "c0fd0aa6a47707a028a1e1642e8c2b6a"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "f6a5dbd7690bffcfbc2fc3e1de70666f"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "6f0b91ae228455ed431e5c431c4e7091"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "7e9a376915496ce362d774143f78bd32"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "4a0a4e3a2573b6f0f77e35ff0fefd65c"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "4fe823cacba46eff9ed56b1fe4885f6b"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "0930efdc274dc99d1871e2fdba101fa8"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "d89e38fd714d0eb2035164f747618ab2"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "9607d9da795313a04daa6b1f04146ffd"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "dd7ba4f7c999973e58e797f06008af1f"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "d95acf4c884db7740fb0f10a108b2295"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "bf6ba44a5658f9f40c10f17a532ade2f"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "9d18c252c9bfa4804d4a13c8e8c467bd"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "3031794b25c19377a7e5b6e9f8f4eda7"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "47540cd931e5b6fe999e4591045d6a73"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "8cf39db79d064097d42fb560ac3c10d7"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "c01da59e2ff2f296c6073a4d306b1973"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "47dec53e48edd961f0af14f57251b5a1"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "82c505ecc6f62237b50b584c7b202c6b"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "f484fd15507e9c4330df338e37597f8d"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "d6e0486febb77464489ff95c7438c2a0"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "1a38cd241bf98c5d12fe963fa0e58233"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "371a4d6daf9a1baa54efa6e94ec70dc3"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "28f8970a87516a5a68f8335be4f87d52"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "1a410e20f0b8817043e885af01e324a5"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "7e5d9c8f723d9d23e93fa5cca310fea2"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "76cd4d2f625382b107be39e4c585a267"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "869e670836518c31c93f5adc3ac25682"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "ca9b1956a7306508de85933b19ff0d87"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "9bfeefccae5483d4bc168a12bee8d442"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "e526f0df23fcf98c8638212348fc48b1"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "5557a986957a00f7564ebb4a00579bb7"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "41025817b1358819c776032bd8618a0e"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "619cc9fdebfd3745e4b3d3cf8956d3e6"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "699d85a9baa6b5fabfbe09fc8d9c70e3"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "b7ee15c125fd18f7b84f63f684678ab4"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "805a612a39a7a296ac47049b6ef4c67b"
  },
  {
    "url": "2021/02/22/《HTTP 权威指南》读书笔记（第 7-15、20 章）/index.html",
    "revision": "956b920a2b00cbf1e366ed706a9ae74d"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "835d07a3e55594cb6d2085c3101b9bb1"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "b0ab50c29b602c81797c9fdef12f1a20"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "7887bcf48356f6bc017e78bced29d8a2"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "64e76821540d911a375cdc3a3541e026"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "dc8cc420b5f82439f70fc061299d12b4"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "e253d8c1fc3212a6a8657b7740ff9818"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "e5979363d986dd642e0d4cadcd21db41"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "0586db2200c293034a89148fdee0ff4c"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "aafc6be2e5662c07a9e68055ad5ab708"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "754080a802ac9cbc48be978dd2cbee38"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "d2bc2a6b6cbf7c1d24ca774b86e64e85"
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
    "url": "notes/GCC 下默认的对齐指针访问（Aligned Memory Access）.html",
    "revision": "dd2b996fb5aef2e15d9bb3b3469ed6bf"
  },
  {
    "url": "notes/index.html",
    "revision": "c3bddd895f885f94cdf8b32b289a2a0d"
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
    "revision": "e2b726b41bd0f005d7e7737e4b8e24c0"
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
    "url": "resume/css/font-awesome.min.css",
    "revision": "4e8a32562b8d4c0aad9e81b140ae5d99"
  },
  {
    "url": "resume/css/style.min.css",
    "revision": "a6e6f15c989818bc85735b58ea0af0a3"
  },
  {
    "url": "resume/me-en/index.html",
    "revision": "350575330e2ede1ec98bd44847f6563b"
  },
  {
    "url": "resume/me/index.html",
    "revision": "b3f376f21bbc5d14adb0b96256d0e41e"
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
    "revision": "25d32cc1a4477903e8eff6a7105ab3a3"
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
    "revision": "89d251acfbd232636ff0b09bda73dba8"
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
    "revision": "2c4c6853565ddfb1e71ddbe37715af84"
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
