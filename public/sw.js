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
    "revision": "80b5f31d7a91da844427fcc68090746f"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "b135e05a794fd5e2858960751a9dbd10"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "b68f227bea5074843c472dced17f806b"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "4b376067aa6c5828fc6d6dc44136de31"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "06e34ed57494e23c562b1734ef8a414a"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "f9abd595c81e628f6b769eaae6d78e40"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "7d05ed05a49728ef9d8c54f46611f718"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "2d03140afa4b86355389586099cbd612"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "438cb5567792ed15f3b63cfaeed58408"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "dcdd2a8897457c7e9d3e0011106c9e2b"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "b0ece8886070a8a7df05f013a41ea7cc"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "135b93072a48c26ab21afa6c1b91640d"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "c4d3cfe8844333db508f5d775a35fe37"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "e32f121a5f80f0349ddbbdbf195340bc"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "6eff75a8d36ee05e56820e0bfbd8ffd1"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "000bb3d2f556cff576031195c4c388ed"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "4171df23ededbeff15b724ad0ff9e700"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "706909fb21b5b61f0b1d161f2a8aaa6c"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "8c9db64d04dd925aeb03b60184b5d036"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "151f14c5f982eeeadba196029950388f"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "9fbd818e84920c2e3e5d353d4e3793dd"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "fbf1f59f544399af20bb081e7d75f1ae"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "45e2900b1556118db8d5b4cfc40ca4a1"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "536d5086a40e7145b24b95b807ffaf38"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "ea547e25df3e346f9c79027458d22c96"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "468cf5b696bb3551278a3ff2361d580e"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "5e85c3fe23f5dc31af0bef2f01531221"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "6314050ee5f489f9231fb1a0a4383f42"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "43d87dc4f046fe5d20b23209bebc9da1"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "a4b4f0e72ca5e8e49a61770979a26267"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "e5ef6f3ed5b506c6ecbe9e773c5743ff"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "f3304718e4b78cb55d7f88defc85c322"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "2460f31498040380e0ee604103d8af8f"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "02df63720a7d908afe01daa539d5778e"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "07d72cde6e84b07d9d33175e8f5c12f9"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "2823deec86fb3e793d90fdb11833869c"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "d840e0d4a5505a198527d9cc0687c5e0"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "578f2ecc91113c455ce025685c27b16b"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "92da561f5a6c41a55291571b5a3f686f"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "a661dbcbc452087f0e1a79c321692f64"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "64d1bbedc0c42124ea544b02d3ad6275"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "490cf2fd2b19bbd3cb15e472048b99e1"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "9b68f4dcdb4f6b212736c4a858c833d4"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "2fc419ad27da855a6eb2694c32a9fc5b"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "74c70f81b6f8120042f571ccf2e18e22"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "c9b1c89e19a6d955a0d838da1359285e"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "1187099e3c9fccbdc887f3f4fa632410"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "3a17de4f53b1b357f50c8136b44b7bf6"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "8664f5f436f213b74c2f8164a7087a50"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "81e1bc62ab8535b9c3e43a4b3bfd582e"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "9ed80ed9c5c452d8bc85a19c3e8e48ab"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "9648f7b26422d855939781cf4007dc11"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "d9609b0aa8746f2c2ed68dfb635e8bd0"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "7ef512db1f37a72b7d0d70ba319d022b"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "0dd0cf5d5ee4ea4a5615996273d5338e"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "22edf40a9313430cd00ffdbbad5b9b80"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "d03db70869f074071f644ece7f591299"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "9f98b84b340524bc26aa69255faf0147"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "7c31b70d8dc744aec05e301bce6315e5"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "b1d5dce2ae058ca380a65955d1dc2034"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "426d1147c381dbf0b1718c5f28225044"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "72ca9ca76ff5e1f77ba20ca32f99f90c"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "65ce49f7abc0a06cf2391c42970becf7"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "67b023ee706539d472c09641dd3d2115"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "5f3f1806fa9482f8d45baac0782f860f"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "996785a9db7fc57cb7109c3fcc718897"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "9abccb9da5c37437a06f6ea4dc06df45"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "a4128f272ef3f2bff310b2b1a6546c4e"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "b2b176fdd3716823be986c37caf44701"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "bb94c9cf576cb3bc7cf9ff1f248f372f"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "ab18ab748b96c47fa6bf4307fbaf12d2"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "945d93fed10124df1a0d145f89d18759"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "8031c535576326805a0ad2d1ab424bdf"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "4f213e378460e26cca9c89834d77ad74"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "eee7eeaacda575a95804787987ef2a57"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "3e43f71752c9014746319a55978394fd"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "8e703ca966b27ef91690b45289a15b7e"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "234daed2d31f5f76a65a913c55b1a734"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "18fdd4464415615bff0d5ce55ac40e8d"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "87b29f4e6c21646ee29e4ad6fd996a1e"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "0f93291e05f86132e875accb68835ca5"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "e83a78fa78fe0e421f55fc3bbf1b2c00"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "b847fc6250f9f0b287be9701025cd1ec"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "bfa02be967680a8346337d1c70bdbefc"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "f3bcce0dac63a248d6a60571258393c4"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "e11b656d13743c61e45905b4dd8b4b59"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "09d932f0216de903a818a9c01bb03820"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "935617f6ea1c7041b304ac83ac14e06f"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "94b08c30d37a5869153ba3a4bcee61ed"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "707484238f4869b78f281ca787c1b379"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "14e444345c427b20cc6057aeeebf633a"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "a3a1752e4966bc843d9a6e36920debc5"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "d743eca6be4c9955f33857dadf83c0d3"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "1efb63d9777384f9b78548b4ee39efce"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "eadfa4b1227b8a008b3b29cdbdcd6878"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "32bab2d148904e5c0fe39d987029004f"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "71227b9a2ad7734d0e0233c74e74a1d4"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "2f8aaf12363b161ecd5bb2d674b286ec"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "6ecb6612089e951bf6192053d2355a52"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "cc85900437c0ab6319ab54ff6f65d62a"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "3252eaeff582b0791e9f86e4c4bd16a8"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "8937837c83b8f3d11e9dd195bce705f7"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "eaf12ffc2fa9f7cf6b229aeb7793e108"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "47129581dcd266ebb0a1ecab052a483c"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "ff61a7dc883d039bf4cafca3312a6600"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "2ee1970c71c06d0b1ba5e143fd7bfc36"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "71fd25f835528785c83c7656498edd02"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "0ebb9c81c5d530f015a12366f3e1d4f9"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "5518d35c7231ab5f02b269dd3376dbaa"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "60ff00e7b82c5ae342c5d17704986f7a"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "cc8d3feeb05c77898ee3fda82e466c4a"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "cf8525959ab5f0ce231700a602b4d477"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "ae2a63e218e95c05d8f72289f1f886a2"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "8d4a2a78c7372c5bdebeb3ddc2dcdfc5"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "e6672a89c6129b63cf797a67e8f9a6af"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "fb97c7288601dab36841eaf2dac8ba4f"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "e064275ad690003785e6b1c599c6730c"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "401690611d2258908666e158959036ab"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "eb8d61ce3ccfd721acab713420d480d2"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "85f9672775ab3f128d7baa9c821cb8ba"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "a259fb537b7b0325abbfda47f19d6a2d"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "7b0f3706db64e72ed21429755c58ead6"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "e711f7c23b68da505fadc3d1017f8773"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "3e47544b9f9515251a726639ccf9b263"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "fa4ebc3314b797e56ccb7c0132bcc07f"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "1fdc3a7d43d96329e81d891f66670d41"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "6f25e3917a630d4268c446f383351166"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "d279dba638afa584ce8f03566808695e"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "edd326143d83b68008f6ccf69b2d081a"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "7e22f482c6f68226db41a99858c28b90"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "cd6c69452fc5f3596e82663bab5de086"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "f61a25321965b3ff77a8ffa5b8ba023b"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "ff17eade700b06ae7222c81d16cc3bde"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "18fcdc38aa617af8fe925514de3504a9"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "7b60a35edab7d8230d9a8e642d88e1d3"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "7c8dab927cbbb29e59f3deee0f907ce6"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "ff0d3fc115f60395b89a31d30c036efd"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "a296d6e1e44842dd98125f39b37ce1fd"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "bc88f261f374cadc0723d6221ba7c865"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "ed447b209e3632e2ba74eb1579df881e"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "e5f1be2c2b00675be0debfefa0db21dd"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "28c29cac5623a1c0ddf11c8de93fa8f0"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "f544ef73e85bdce8959078cb877762a0"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "761c9fc52fcf655801a13fcfb6d8d832"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "9e72e6d5f0e5f165dae7e653ce97bc84"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "eed257ba7efb27cb2a7981acef214c31"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "12718e03f7081a4cbf6a9104c28af105"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "5b3d5dc308a4156ba253a44b3a23ff98"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "60e05628770f0c036c9077eda8de6965"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "64dbb8f88ffca953226d8be07578d583"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "81026c6f8a8bf8549ec01a34f53b86e6"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "97b494354c213e8d2ae08f3396ebaeae"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "1974594b3a74347e0e16a5eb44a0101c"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "f589df08829fe17d6789266344cfca5c"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "737cc03b99118e2a4ed6c2cccd99d44f"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "4eac74fa780f882392773ed7bb473a94"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "7eea515448907ad6a35cc4be04809eb0"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "81b8a102c5a07103ba981960daba4d50"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "dc656b4fe27c7eb5014c3220a77271b7"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "7a8b0d818b2bd2c72451c31004d6f989"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "9a923ec7e4261c2558d1a5c7f7b6fcbe"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "07a965a033f14d79cf4c553e3cb109c8"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "04ed1d9e2180dd1fc121997536d66f00"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "c8f6211a4174f907e428687060a89b42"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "1a3fde1380f726405c61c6df2be81654"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "eb57ca2452851fd9a8b3b37c65980ad9"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "fab88e99ded3a0ce3a25f835aa9677fa"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "af2748b93509f3eb72ca777b3598a780"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "27572ebe1520c56b57d96904dc046575"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "af4c0fd70ca2462e6deb4c2724833295"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "df5bce22212340992a10b321dff757d4"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "2934913747eada484788dba3af3cf03d"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "5073d34e63f778a90ded0d8020568d76"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "e00bba781023c04f202d397e43d231db"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "a7e3fc458a8b1d7ce2d13ea7ae2a9232"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "e57cf2576dbfd9e29e8280821379d007"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "998da73d2bebdc1a1b7efd5f20269883"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "3ec3887166f3a948a1fce0d9e1b52f98"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "e4dd7d4769e13f0f72bc98426049ce52"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "b62f1286bb0b73fd53ecf96c9ea00126"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "1f92dd91b41178774e2848c1fa29ba3f"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "c1da0ac6d7268636c01f826d55e4a42c"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "fc34004964434d6430db86e1b09af5ce"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "cc908cf18fdd0afe72c39c90a8a9bd69"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "9c571ac95ac0dfdbbb1842aae95e5fe2"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "b39c8807a9df95fa3505feeb20a70a52"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "5d4ed7ef4809de96f920967d1e3bf7f8"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "28ad680b84945c98ae4fbfcd92f03f67"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "92eee31f2e55ea39a130d3bd5d09c746"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "a4f90ca4cae0fd21714808dd70218c24"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "25fd3752ab6c0eaecbca922b49b207f6"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "f3f9634224947c13154b501e603a410d"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "38950bc554c93b61c0633fc9523f33c9"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "e9ad2199e684b94e239ed98af20de899"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "ffcbd69d02d3894ae06146b6cb7d3302"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "6a6a7b7f8e2d008bbdcdd66b71d59737"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "3c158befcb1979368165a41a7998655e"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "99e35a5a1614eddbafb174a45e49094c"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "b6a4a8078de1a3ba321307fb1d12ed0b"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "df29173380489dd731639cd8ee5ac1fa"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "fd3416d4da1fdfe1f1c1aa9d0ade4272"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "2a3ebf2f9cf0fbfc9955328b802cddec"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "c06fae8c56b4116b66ba8f5a1ffbe580"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "2c01682249741bbc0ee21531027e1c62"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "7ead42174ff5ce6bd2dfec415204f64a"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "12a2125b1132db94855565a9ec698bbc"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "c7d3d14c9558bb78abfbfcf6aae96431"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "e501a6dfd80535bcced8fd6b5e5af3a9"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "fbd260727974d045f1d69ee13fe69f10"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "2a3e558c2aa9b1528f9496300101a9e3"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "1a26d3041824bfa80551fb3c9465a70a"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "951e2e847b4c0888e426d0f056666dbb"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "7755a9e57ff087067b14bef398da56ce"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "69956599fcdb34fa3aa7bb9a06a0fe29"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "4b3578fa57f8894ddf790b3b47fd2eef"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "66a0f4e100869273930e053884fa9a15"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "a5cbde4ca657c6151392cb02a58f4ccf"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "4094d2e58dae1761b10f2f3f63dfe31a"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "6733cffa06e0de7cf669e608e164e4a6"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "2b83764d89c7cb412543077c15fbdb1e"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "4780958c40724fef177d73d0be2b32e6"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "4a6c747ebe82e4d5cae1d139b8fe8cc9"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "5aa7e316d2fdda4790efe61420c2c753"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "5e41d7567083af068bd2ab0dbdfc48ce"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "38b4d71eede888734a480d76a94821d6"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "2770f45532a028f5afe0e1ce359dd7c7"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "937acdedcad32496888d6c10eed67e62"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "7f9d22d913ef2154c86a6cac6242701c"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "2028596c36e75f484121d722baba1c2a"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "85038c8b6998a7618398737241ad39f1"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "1f00372d1bd429a357a918b215c3bfce"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "042584a5a00a4c1dca02a435b188ae18"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "ba4fca7f8097db7dc0f931d533147e52"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "f95cf7df10c7cf7afb14e7fb2fce3d32"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "edffa071b7869f24857e16eda947a270"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "93a456491f83067582dd59ac8df3f414"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "7cbf6914fe2b2b116617a72d362c0e64"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "12860eb4f2df369374921e8b0669345e"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "203dfd50cd6a1b4b089132ed706da19c"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "e54b78ad20f1ff9a91399582c34358b8"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "7c33b483bb3e5bbd5a36735e153c42fa"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "c2a2afb627f829041776d786ef21d8a9"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "d6c6f509264dcd25a2b3d03de18a2779"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "8003b21ffaa7f7d4853c91ea655f380c"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-29-章）/index.html",
    "revision": "aaa520fcd811fa1e39c051154797036c"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "1ce1f9413df100a072079fafbb377419"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "56a615a0f6837de289a9b7d9659fa14c"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "a7942f08849d6422807d05edf208e168"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "a6a8ae6106d0f2d4c9ddae99692733d8"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "51bc2ca95d7f7a0ac7242af4adb708d5"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "c14d34ca5ae6620bed93233edd2c1e62"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "3a99291a37b2a37d866d107cc64bc54e"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "9de44c06b506bbf972540bf27ba0d470"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "20ab0db909af3a4a3add6c682cb4a066"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "521abf062862075e656a6ef992d04b58"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "4dc9d8aaf0113b09f91fdc675e7137e3"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "a9cc64cdf91165536c9599539aa8a977"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "cd1a2a4b52bef8c82f2451fcde3d7f66"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "ad74316d9ba253407ad91c3d8010cafc"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "1f7c75400010606c39ffdc973e9c62b8"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "d1d4ca0ca432d2a36324a7388f3d921e"
  },
  {
    "url": "2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/index.html",
    "revision": "5c033e95fb78f94fbd06ddeb8d4c33d6"
  },
  {
    "url": "2023/11/01/WebAssembly-Multi-value-Extension/index.html",
    "revision": "205178fff4285bb775794880360d9634"
  },
  {
    "url": "2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/index.html",
    "revision": "ea55d616277f8e54d1f4c16377a24267"
  },
  {
    "url": "2023/11/01/WebAssembly-Sign-extension-operators/index.html",
    "revision": "4880659ea12022146af0cd8a5ad1b879"
  },
  {
    "url": "2023/11/02/WebAssembly-JavaScript-BigInt-to-WebAssembly-i64-integration/index.html",
    "revision": "9c775e8f64957b676ade0ab5e29328e9"
  },
  {
    "url": "2023/11/02/WebAssembly-Reference-Types/index.html",
    "revision": "fc51c47db5a6ae7e6125b77b9af2a1aa"
  },
  {
    "url": "2023/11/03/WebAssembly-Bulk-Memory-Operations-and-Conditional-Segment-Initialization/index.html",
    "revision": "c59a4fd2006ed6c74409aa406ac7ba98"
  },
  {
    "url": "2023/11/04/WebAssembly-128-bit-packed-SIMD-Extension/index.html",
    "revision": "5041c895a4c4f742dc708dd9d170da2f"
  },
  {
    "url": "2023/11/05/WebAssembly-Relaxed-SIMD/index.html",
    "revision": "2588a215b9c88a1683e87390f92e0eb3"
  },
  {
    "url": "2023/11/06/WebAssembly-Tail-Call-Extension/index.html",
    "revision": "2af2c977cf15e3f42a442b2b6060d00c"
  },
  {
    "url": "2023/11/07/WebAssembly-Extended-Constant-Expressions/index.html",
    "revision": "bb3fbb2bd61b20d9933d0ce58bdd1896"
  },
  {
    "url": "2023/11/07/WebAssembly-Multiple-Memories/index.html",
    "revision": "075d56fc31bd2dbb854ddfe731d431ce"
  },
  {
    "url": "2023/11/08/WebAssembly-Typed-Function-References/index.html",
    "revision": "3d0e638916d0b096df0502bbcfc7b580"
  },
  {
    "url": "2023/11/09/WebAssembly-Threading/index.html",
    "revision": "aa44bf7293fccf1ecdf3dddc8c5c86b6"
  },
  {
    "url": "2023/11/10/WebAssembly-GC-V1-Extension/index.html",
    "revision": "8c73100406d69986bb523b87b2b21709"
  },
  {
    "url": "2023/12/23/TypeScript-Cheat-Sheet/index.html",
    "revision": "40a8b1e7e61386069c92ae72133a38b5"
  },
  {
    "url": "2024/01/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-30-38-章）/index.html",
    "revision": "1ff847fab63308514719ae67d41bd051"
  },
  {
    "url": "2024/01/17/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-39-43-章）/index.html",
    "revision": "e16b34373793f71f4020f3e5981a07d4"
  },
  {
    "url": "2024/01/24/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-44-51-章）/index.html",
    "revision": "5d35647f4f403389669f0c7699d7da7f"
  },
  {
    "url": "2024/02/11/《Unix-环境高级编程（第3版）》读书笔记（第-6-10-章）/index.html",
    "revision": "a6d255533b530f8abdb6260f1ed2e805"
  },
  {
    "url": "2025/04/01/TypeScript-类型体操练习册/index.html",
    "revision": "a7d235540404717e0a474d6e65821527"
  },
  {
    "url": "2025/04/08/自用算法模版/index.html",
    "revision": "825f736d6ccbec797c25eb405c126df8"
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
    "url": "archives/2025/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "archives/index.html",
    "revision": "bc3c4aa8cebf4ea0b83656aa4a521148"
  },
  {
    "url": "articles/index.html",
    "revision": "5b47811af66371bcdba74046ab7298a5"
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
    "revision": "56c887398795581ceae32f3130dd7c8a"
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
    "revision": "17851502894d3122189260f897125822"
  },
  {
    "url": "resume/me/index.html",
    "revision": "c1ef12515a40003e507a2bd1c5541307"
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
    "revision": "ca3e624b62aaf61886c4222c6ba9d4f5"
  },
  {
    "url": "tags/index.html",
    "revision": "d1c56035510eabb851b9554513462871"
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
