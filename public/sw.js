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
    "revision": "7902936dd901cee7b7c33745a60a6b78"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "a0560c303a0926ce19d6ff40ff7609a7"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "8e2bcba73c960301207fbf555171de62"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "e6b91d721f934bb150d39aa6945f35f2"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "0ca229d5a41193ed50c1f7c7b21eb76a"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "352ad7c5cf049ac94908e9da77ee00f9"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "77e2e359ab7c97309396e66fc8248a7d"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "0050ae82dcd3c37944c3c43db0b50ce5"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "1774f09bec9f6460d90b9e7350e3a540"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "9bef79ec5b69f5da7ac978764fbef545"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "6db59c2473bd267e099596500ec95713"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "40dfa0f5e2c81de108ffa8ef75eb06c3"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "38fda2f6dcf68373c40fc56274279068"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "f82cfebfc96708379c76518931613340"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "857cb68526dda18d64d21a1a0bc9fe90"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "1dab290501e21503008d9153f4fa1812"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "7d48cf960019fd9929849f59a4d609f8"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "5db0393ac73c23a513cc382feb8dec67"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "e2b1deb4f3748656eaa4fb8b7d558805"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "387502f0b7a0dbe92698081ef50e111b"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "544ed7f5cf9996bfcc3e96b9a908f80f"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "66a42f25d8e864a385f030503cdcb986"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "cf8f71b8b393b60c5c53da06cb4a76b2"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "0f100216e250d02a170f05dfc11ba2c6"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "f5f946344802ce8ef46164b575cb5374"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "835f75e596ebd236076dd890e58f7030"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "dd6e75b0c2b1d69197808d97479cb3d8"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "fc866415227baa3871cededdeda728d2"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "b05c419e8387af7c9a5e9143379833aa"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "9bfcedc4af5114899b687eea1fb32427"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "87a3ee38eb7506554e23218b6129cd78"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "728272e16a72c2b1fcfbe926782c3614"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "b31bbaeac5a16d2a429d8a6ec9b8dce6"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "67da5a53cb2c0d9f1f74c2c15fe9482b"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "a697c8372ec68d5bed72a0a009efd3ea"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "d03b40ccbd57bf73a987d93f5d79652c"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "bec700bd4ee09ca0f54db9f71464b17a"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "edbb7ae6a4c4d1c239043b4380124ecc"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "f376e4336eb9e47d97f8a4523e4cf676"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "2367725773fc58eb86dd53c1602d5f97"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "6253bda3f16b8c27b3b419d1020a35f3"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "da2610b4c617acc8143170f2a11f815c"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "9a04d040f9a0153cafec29582737c210"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "16f12b7496d233e128d66d3e47f54a01"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "931fb0cdaf3cea3064972bd591b54228"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "802397cb6df83c5f464d07556f11b250"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "1d09464d3f22afcf9fa8eea9358958ab"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "0efe9a564f7d38b964af1a6baba8adfb"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "f4f57bbc34346f37be8185f676447ea6"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "202f58f88f54a9c0609ce948fa85b704"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "1bd6bbff166d09c4723206fad0baff53"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "93a91ed9f5de0828aab5e2634cb2f2a9"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "d6058f8bee5f22891b00043fa11d7f03"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "3815b0f6e67ffffb161706662686407a"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "99ca92ea6fa2f5d6cc49d27d0dd27559"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "5f0ce733e68b14b7e852e3a1fd9de488"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "b15ff3b5e067ca1697f3ae523f866149"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "bf4cb6b2d1e2f775962ab2f2b6ada20a"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "01a3124017ca7506789e84a9d39c9bd2"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "e9f6bab3c543efea77fe02dfb8fbd856"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "416b5b2c517c0e17da7469e8e17b7e61"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "50ddde7b8422555d239b9175c62ef8c8"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "6c7aac1eb7934e8ff791fc9902a51498"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "be69d31161ca0c6a666a2f166dee5dc7"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "79c121505d6554149196b444e850da93"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "d8c7877c07bf2e43f4b0b1a41477f624"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "3b8fad6d899f33607f85f84a37a85d1d"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "1666b83e3b5cdebfaf5b9b75f6a9d5e0"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "210aa6700ffb6b2e614ae845fc38eea5"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "102191cb7cf9b03ccc1940f57262bb9b"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "e01903ff9345cfef31f5ce3aff9d3bf8"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "3e39bb0d5b57fcc35ca3573fe9303b7d"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "db561dd5532501540f4405b6c5238774"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "b3c99b14ee9efb3798996ff8f408f5e8"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "670530f15ef01732f3634a226308a1da"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "e9c3b35572976fdc323565541b30effa"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "4810c33696496dae0947a474b0351837"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "8e2442ed3c29b58460fa6e6611f14c5d"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "1a2a9f8a95f959ff55bad98695165bce"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "30a46b715d585f1bb00a47539cd25b2f"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "62823058e104bc1aaeee2322d7f4f80d"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "69fc93415569362bf486d212c428dfb1"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "3f5b69c5fea64244d3f777d7547cab83"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "0fc42f7a91ac8f398053763655e8f286"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "31112577146d1680c420cc55fbb7aa4c"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "5b8e93a32935a7777a045d52b2f1ad1c"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "109db4b0a45fc64f5a84f9050059a0f5"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "2d301648b221045ed664153f81c5d10e"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "a08e333579c92583bd6bd0813ace78c9"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "915a97caf93c16378a6a25dfed804c4d"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "1ff94aba6bd4ca998df3b915878b8dc8"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "1bf30ae410d5ea8c6fcece9e18d5de61"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "4cc59f9059a5a17d91a304f4cdad639e"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "fde8b8d116a962ea5ebc0a1e12899f58"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "c33fbb0f03b69e50ff3680109499ceaa"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "2d6ed2b391eaa989a5650d56ba67dd9c"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "c6ca67b3c14dcb36130500e0687d8cf5"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "066e2bd109dec2a11684c70954511aa7"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "6f26a1849609c62e9cca9d4c6d174c82"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "e2448e297a0527aa8f37fe9e6244eb81"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "8e6b4e1f4c519416741cc0a88239fe16"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "8320fe3e1092537075aab5e9c6dfe76f"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "f46a587eba19a613bec97c5e7d286b85"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "cb75a35430fface2f8bac700cfb87bbc"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "868d1467b51b466d2eea734e605539dd"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "ba92fbf79ca237e5826a33eb13cb119a"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "b58abdef5090486192ac830359a9c8d9"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "5b984ec9db7a257e3d1fbd5493b4d0be"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "12c2809877d05a4143095a39943370e1"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "f656a4db640d38a457b111f1e08ed0ba"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "f8772197606734b39047119151024c6e"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "d468a99cf4a7dd8cb1b7b423fdaefd09"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "ae46f9e958c57c06e15b177d2b036da2"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "97a7f0fcd68b98fa3f0148e41f551357"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "239175b2a9db967d1658586e1c19de26"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "d0e8ab07440082a0f34dea83831106cd"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "26f68d10e087d4d975d5843c086ea350"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "d54cf5b7530dde756dd9369ddf6f10d3"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "35caa3b9f3b1116c8faf0b39eb1df4d1"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "b5a836d57406ef097d0d6b055461f31b"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "2af842f5408c9794f404197ab31b30de"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "58c4baeb43e2a54be2e9cf2048b8b5df"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "85efce1e3b02152da41198bac4f63265"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "10d87caff74e40a440131a080ba6b1ae"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "e61cb1017b2caea248d90969c9954110"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "31cdf9da110d21c74b04b6abf9a7b925"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "4d7d5872bc3afa1021f90158445291be"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "7589676cac429bf3187452220c0b3e8b"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "28ab8f552c5f015c8f4b9e458b386fb5"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "05fba3fab50440b6747b09145b6e8110"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "0532301b7a083de8e18e5b96bd5d5892"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "2a2debf5d7331b714ed74ee4284f6ee2"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "82f4ac6e256485f7b7ae63a236497396"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "015df06dd655526279dd91fef1e0d0b5"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "7eb41c54cc5190e350da96e0f0eff247"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "14f72926bc9fb7a25d7ce27161ecd505"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "fd3f96e4ebb1f406f767b906bffa16f6"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "9b92cf3e1d1118eed18e9f347ad9d114"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "32e8e11658d2ea7265ed8c6b27a652c9"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "905fd4e5848e55551fcb0de3e60ffebf"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "0153135e43189097074a0ef5d0ec0bd4"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "381ad995225b9fd9610396050c4e0087"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "5c908ea2325711e958f258ceac2c760a"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "e4fa097392db7ca848053858187b3006"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "8f2e516b9059384247e238333f935f27"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "a3c4289279e12fc7e272f996c1552d9c"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "06d46cf000fff9ede8842ba254d58caa"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "3db0240a1615c0c5fd3d84ff5e93ccdf"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "f8dfded35fadbdce4e27c26fce4fc2e9"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "3b47f9e3793fa40939af18fa7fb78a1b"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "6f1a63b9a182632f6dcd16056bd0ee32"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "c098d1f0c9285bd4f838d3628491683d"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "13fb014f33390d260f8f2f84ae9dc2f6"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "c9c7e5c037528523c6514e5b1ba33d20"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "d3ed2f2390c045e95ed8cca20130e4f8"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "f67e6acfdccd2284f63593032745ee54"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "d390657b5c3c7263463b05f967ca94a5"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "25025b4091c045b6bbe653c7c6fce458"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "12d86a7593e9527284546e09d2060524"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "678d0061030bec04c2dee2405b24741e"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "c9290c0dd11e570e3c9b67616e12ac19"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "959a1d74cc59251588fe55e5116479dd"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "ceeec329d6dc678b679863b8e415ea1d"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "3cc2ad735f9db6a8894b6dab5ed4d285"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "1ac908a3c3e0006e79d3f02f35a349a1"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "df16a4d5f758bd8c92d369f76ac30696"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "4108652f46ff545dafb25a0cd075fd0c"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "1d88f95c76c14e02ab85bc5a3a511cfa"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "a9a3d59638c7513c73dc714004085b41"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "0ccc2c0a05b2e0b3280a0ca559c00fff"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "3a622017c36184eddbc0a31728c9b917"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "771f716944ed7254e1d69f4a47c304f7"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "458736fae5e1bf00331119e682bbde18"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "d322a96e6226dcdd607d73270139ed1d"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "7cb61a92797c35bb436f46e0a53153a4"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "a3a8c107eb3851312a49bd8be8e92bfe"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "c430505ea9bcdefe2ef428978c08a2a2"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "455a44ffde4021351c7af96b35b004fb"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "92374b0080501dc522dddf3703acb3ea"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "b17add12be2e3a203ae3a1c823063b00"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "9f2eab89e3f6ed179ea1ec0412f05308"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "65c0e25b7479c9ae979c64d171d92a89"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "5585f41bb52793ea57073bdb9e3bb8d6"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "9577b71754c55ef8729666e9478e0c80"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "8a8222de10ff9f07bef63127e34fb939"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "aa80ec3962e22cf0664a9eeafcaf95fd"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "9c0940785ad3002b036bdc86f0a73a52"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "9b9e642061787c1bea7068ce99c9350c"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "7465f2a6ac0e9b73d1b573980f19fbe8"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "26167c15f5e20637240de230412d5b33"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "31423ca78ab7e3021e9abc72ca7bb054"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "32cacce40639f07ef01652cfec2cae7a"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "6dae834499038220302a2ba4b4b78be2"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "4703b6aa9013daef82317d1ba53df43d"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "e78b3c6cbc30f9a7361b3b2c187f0d17"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "4d777a9bf50c289fbe2edb1320485317"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "b1d589d4e27d87dcd12b246738e4746f"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "3549e497cd43b834c825af53d3756e43"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "8d4945a7373b9860b0c8c7dd8eba67c7"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "1eaa9602b761e13c2a4b163aa2573a41"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "ef97b9ed90b30c9a032ccab8233f7440"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "117f52a6b744bb074d55957e7436402b"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "4eff2210ebea7bd315a7ae5a832b3087"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "e1f954ac77c21dd52df234fd92120295"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "506c230e40be2b01994a8f9b3025b9aa"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "a27a79a9c2eb12682f80a04d4b2941a8"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "e4c85e61435ac6e07a18340ece144346"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "aac4c9c7cb5ba26b8a60a195f21b7e81"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "64208bdec66d05b45ec22fdef7f0eee5"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "c6e710d3cf536e0dcf0de146e1448d1b"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "1122b2611ae6042b47254adab0aaabc8"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "708cabfc6485cdee5c6e313a82c0a87c"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "40554488ceb8e6edbd47ec234a9de61e"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "b7794d2450743c9f9cce24825536eef2"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "51eb5aa0ad25a627975ce863cdcfe911"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "c1df0c5ba29861af6ae36859e89a0d02"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "72a3b87935885605dbafd92f4f7e789c"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "243275bb16ac0f53ae1810599b09fbbb"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "e83df7a58c1117ecfeb3ac481d5779b3"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "1abaa4ac757a0f584a7b86ad826e427e"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "056a88827d1ca9c1c8ebb3e9939fcf27"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "cecb3aae8de86c12107d7f2ebf7b2f8c"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "c123dba728206daa4ac83062fa2fd0e6"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "21fdc4f3043b1423545edfa42c78b145"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "9ababcb595707813665eb1379ee6649e"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "95bcd9fc3c1600e01587499395cfdd06"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "3c770a6cc738034baaeb247f3fe11a54"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "50f286e726ef606f74f76836e97b10c6"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "40461335c424e26c4a7bac1a4a1693f3"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "afae8209daad0e7c0f5336560bcdf7e8"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "546097d43c83f847b6ce86e0e85ee30b"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "d2a13c8e60bd72d1fadea99f4e37d9db"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "42350689e274877277a26646e8200706"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "b3772af7bc3d970ce7cf7c15283ad0ec"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "12dd0b69f0f5401a42b9c584ac158739"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "5e18ee98afad89b3f463c07dd5eea275"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "06d0449d6c128d7c187a83f071fa8686"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "32c6df15378992c78a784f944a51731e"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "467d1659c83261ba72166cc7ba2a54d5"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "40f8d6c10aefd01fa0650696cfab9b4a"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "0862343b6804a00276ade279f9c30a71"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "04b0d1e940177fe85facf73be25ac36b"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "a87fc8dc714f673a3107c7be0c0aa2f9"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "019a342682e4adf26de45e1918f00bc7"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "0d030b24ccf1243a5b6657fa0cc3949b"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "15b055578b66089d2166ab7d00813bbb"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "d5cb26b6bfeeff71623ae71c39fb5eda"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "ce3f7c988e473d97a9ec7b86da5733de"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "7fb07f952ca0a3ce832b21b474cae84a"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "db4ecb833b78f52cefdbae8950efe5cd"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "3a78b1b556f7f5daf12a86d76af858dc"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "fcb3d4d48640c4cf74fef4a1c8bb77ca"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "8125126d92b5915bf13bbbe674654063"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "cd875d4bf8b34a94baf7a44e234fcc9e"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "f0cc0ba880f58340f203924cdc0a91d1"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "38dc889f644b7b63574e90f0ef3bc7c5"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "09c098206db90fe1737394b86ed2f914"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "3a8f6024a55a36efed57142fd5503036"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "ca77260ace61c6d2407ebef015ee23a7"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "5297fdbb95a9969bec724aaa36fd3c01"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "fef98a10de868468aaa5924e4d337c6d"
  },
  {
    "url": "2023/10/14/Pratt's-Parser/index.html",
    "revision": "51e56a89a9d150f9d2d7664b24b2e615"
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
    "revision": "1365142289e88c6efcbe517ce7e7e246"
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
    "revision": "5865005cb81e51b11b85e6a551948ac8"
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
    "revision": "29e2f13f413f4043286f9622730d936b"
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
