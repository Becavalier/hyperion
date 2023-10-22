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
    "revision": "96c0fc7017186d56aa4beaf6bae71cbc"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "d549e975aeb9961b2f3b603efaf0fb1c"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "41ac5e0e9180c8a523487d41b592fbc5"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "1e60bb690d536ae360838e3541923cf0"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "966872e735e3f3fef7873ef6ce0dfff1"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "ae731cded96f2cf9612135195690771d"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "06a0f0963490b12ddc238d52ab79859f"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "1412200e74d293c1db3e19cd2c59daf1"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "d7b9bbdeea981420337aad56414ac5d5"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "562e0d788f4d93215f194d61f2a85c1d"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "8773f0a6b61f902b8aae1ce4d30de274"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "be4f43b61a5739e61661a8e4e3b79d54"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "9561b0ae1395e3046e8f1e87e3b4471f"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "7ba55fa646042e6b696a4fe96c1c13f0"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "e6abd90a6910dcdb51cb55822a5e7447"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "61673d74471d82ca1ccfc22e5d686e66"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "faa5f2fc1d42c5953b4743665f468b46"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "9955ee708d59bb8d87406a1236ab1e38"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "6faea966629db8f7047e32334e57e414"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "7cdcf61b3c6b5d668ae32bd52f54d80a"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "ed1f8261dc360e8eb4c30fe0c8587207"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "1c40176a75223c9a543bee31cb62c5b2"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "38252ebfe03437fbd4b0e1be19d4469e"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "0787a155103b083ae67e4c5afd4b253f"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "d0a9514d6f6734b00f5eaaf12080a83c"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "5952df71003abfcc215f6f0cf1f01394"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "6b4de588faac91b0a31abae3c347e396"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "5f466194698cf3ee2875787464ec4533"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "7cea8a121b78cd4b128592a3860d6c69"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "2f2e322d6225d4f1ac3f7fef209d0386"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "d2a4182eecaea1627520448cd1cde13c"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "607b9f32bb7affa6fac9452b1d692b1a"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "b6b79697d22419e391d67ad62b787710"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "68de3142e19ffc97b845e61f45bbda27"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "f83d20c616f104d43e483380f6e7717a"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "65f5083e03872479010a1004783164ec"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "908345b2db7792aa985bea4ce775e584"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "93fb4e9be778530bc097ab176404b7bd"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "4e829bd20d54d8dd4b4b1b8e0920f1b6"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "6b2016280b52116e569d9aeeadb333fc"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "04b5dcbbc9f3a7b31e03cb171d6d3b08"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "e354ec3e97763f9e89c9c3baca5fd72b"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "d2907d412bf5b49d24096a3a225e950e"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "820852e0296068af8a691ec1ffd7473c"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "6148388f0f2a54799ccd17cc728bcdea"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "8cd10f165057e76b2a7ddc39af9d1934"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "c7ebddd0baea4411abba180af0cfa676"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "80bf9798982f524c7212bbc05e5d5a50"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "45968bf23150faa11e990eb61c892e1c"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "f6e0503142ac74b8de957b0309fc6d1b"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "54c11128ece97aab66e77c0d707befc9"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "30cbe7fdbc74ffd21015ccb47e9a4761"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "dd507cefde8b8a1fac1b80d238689a72"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "345aa6fa5d1393d3669aeed80631be33"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "ed73e3f518b49a7d0bc128ef093af3d6"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "16d89351b1647afa49cd43895e65e369"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "f0defa745f5f7dc710d0a81c7c8cb330"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "50b69078911add7d4c7a55551887113b"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "b40f6ff897ad8999490408fec47c0856"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "93b4df62d2638521b97ac32dff91c26f"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "db8477b3798b9eb68a5034f85217ab29"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "42719bba4a30bc45dcafbffd691c2ec2"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "f0eea740585116839859fcb1dfe2c2a7"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "cf0c6c40bb887adce183d06f8c0821ae"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "9e274381ab5164846f2df950a8c60387"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "dc5601b6881253b774399f6d5590c827"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "a57b6a1bf6a4c6c56086fd55165b3014"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "58d3934f1842df766e7c95b8592eb3a3"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "eaa43a449d33b51c89e12e7e671ab3c0"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "4dfae38f270bbad1498c8c153424c6e2"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "5074c8bca67df19ee1c2fa5589462a2e"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "80ee10b3ee82737c962709ed156a0f17"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "1d9e7cc7fc500b2966c967a15b1f95b5"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "41caed59163c8b21b57f9c06f7b9da5f"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "638d2cea0de6394a49d607e67086b54c"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "1eabd00cbec5ca23b9be994a7d2f7677"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "ce885ca1dd98f7fe4eb15cf9a379756c"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "a485887a773c0b80ef92a38bf3ff6a12"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "c6df3a2b05e4c80015160c5e306ae771"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "6e1d52f4ea3ca9c5ad67619dd6beefed"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "2c66b0b6fb74ea871a0413c892704a89"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "c4743a83ae9af0fcaacdcdf57a6f2f84"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "0cd2494bf9e38b806338f28b61181a91"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "99fda766b351b2ab3fc3205605d241ff"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "1900c5865ebd60f82a8c4397891de1a8"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "f1efa52f2e4adb2c7d80578d12693fac"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "61f0d5c605cfbbe7e5e639c03bc9c354"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "cbcda37bbf5dec1b28ed364784bfb8de"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "fd1687aee3716ea235fcd748465da3b9"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "4b392ddfbe24b4ff946593f185f36895"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "2a7310869d1a7eb30ac97c14cefce169"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "f94e43a74a0c431f928d450479415108"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "46733ade848045a597a0e96f3bb583e0"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "c2d1f0c5a417d3e3e232b450b961dac2"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "d24e8fb4932d1218b9cf58e77d4dd92d"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "adb3a3b961d8b1ebe8b07693e334a245"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "8a4fcd46aa938248ffc6e5a418677efa"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "710acfbfd7bc7addbba6e7ebab696b4a"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "e72dadc8df6072116908af43b44209a4"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "1e5a7874971750e095dd6ccf50e9d5ec"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "a10bcfcda8cce49f2f2a04363f68666f"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "5814986bad4651098e0bc83820e97138"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "9e4a7227cb7a099fcb7251b2820d06ae"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "03aebdf53dd06bd9dd094d2df2be3b94"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "f69b09ed0b4a8f7650292cd726474994"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "0ba00c9d03a6be010937265376f8a856"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "6c35c0ec4e72d633b3a6393776ca4d49"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "2eab4bde1fb0ae7e127f7de075946576"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "da1e058e7fc3fa0cac2f274623edcf1c"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "dc78eb7c79435ca6187f104946bb311b"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "6a00286e245a5559efcccc54c677aa8d"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "3fba9da937dd63fac7752ed4c7ec9e77"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "8679b310682964a1a3d39ae68b4fe98e"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "e6d3cd837d1f0ac1cc0221cf8c2725f1"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "07718c9fec4ae5a28d96ea8632cb7bd5"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "95afc237ca31c5169b304ec9ae4f445a"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "2a28ea00fa68ea16a1d3d8ef81ed331a"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "6b588b6b631d0085d0f8fc5b96f8df00"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "7b8dd181b92eddcd40594e91c373cb6a"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "d16b657744f75b99dba3f992f5ade18a"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "19376f5ae64969678b19dcc152a3757c"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "91e9317812f50e27cccec392b7d14872"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "6716a278085c09a3821589ae81440570"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "4c4fee72ca72d5b412044133a6cd58a7"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "b0c73a933c6660eddad26c642cdf0125"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "d330165493a489871aa99e733ae68e09"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "7d9b591c380a7bbf035f66b55635e536"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "1a39cf4562dd84174ae5ca2ac9cde1c2"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "1b471f448bc6d5fd7c029bd3266e5c69"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "46b823c3e5bc67ba6d3220554f79c335"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "47c6419d3e9f5b201d5239154a7e7a8f"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "d398316c3ba1c6aa8340333d4e9287bb"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "6f28e33d3a6918c56c1fc6e859436ad7"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "528ce4e264cc8e5fc17ff04e7457e0a7"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "ab540fc05288166170c470b29fc87bab"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "10e55b151343b58039c2a8077559bb5a"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "396762696eb35d9d562a4aea3aaecee5"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "80551cc4433cbfcd100b7ce13617aa82"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "5521bd7d3b1586637f3e2a3dfc49ad27"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "ce0c0e9a7db913939cb2faf95981a991"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "23b4633c4949019395ab2b1187cb9578"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "81a0cd1ada151ca6bf0e51e4a53be2be"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "ae9a923e5150d4d6ffa19734ff114414"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "0084a8f0adc3af0a9a52c3297d17d687"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "b65ae2c1391304857997d72983b8588b"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "96f049a3b7297281134baff276d27d4d"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "84d985cafd4a32664ff5fc78a96c9218"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "49d6d58d119a52a125cc46cd57fe5c1b"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "30af8a941b41e17205136861ebe14a39"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "21285d560af6ff3fd79c089979bc54e4"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "f7b7d4a2689057c890a287a64fbab643"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "21e512b0df6c5565d38e24f7bb54a2b6"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "c4dbf5a933c33f5823add95b67b61146"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "b89fd7470b73a39512e4126fb27b3bf6"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "848d8d8b7d0c91f20ad5527bdbcd4434"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "e7f2502526a342431d7257bd6aefd47f"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "bd2128218d6413b2d242c33fb536c357"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "aa11c6b0ef3230c03fc7106ac6715e76"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "fd46d7b21ee09e3ce59760db6960ef6a"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "1261ad1992c5cc7b3cc1ec35770070db"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "2d5b4152fdda888a728503723bc409e3"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "a4fadb8f105ed164c9e91bcdb0b75f15"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "3abf68aa9f36bc1190a23d9698d54a3d"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "d65f26824dc92f88e041b6b6cb82ad15"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "e893b57c1fb53fa9143ab1869e9b86c3"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "e7590dfcb9e4ecb61c5c78ab32aa1d2f"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "abd48f20bb17e24d9a99c2b9af424ad2"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "a94fd1f6148eb27ea3397bc6891b2981"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "c547c84d349772afda0b7509ba720ba2"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "b443ac36283fe58655b8abec85d7a721"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "e4bbda80c41e6889a7bad1819a06909e"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "ac8eb3b6eefc0faef3fc0dff3d033dfa"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "88f24ca7ab162c8ddcebc2473b0eb228"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "e73ee5ac4c1aa0252f19f012c0d36985"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "5e86aa6bacc49ef4de85f6415f2f4b69"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "0a4a9f6bd630f53ad805858504d04298"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "0534e74851b7ca6b2c74a7c0044d8252"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "5adb58a0b3a7427e892fe9e850c30e9d"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "cd4b0b358298f91e6dc04b6a6e40d9e7"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "694b80ffe5f71d8a4125dea0ae0388c0"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "bc4a814e5c98fdda09fe959dd187bdd8"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "b90c3126087316b69bb5b0695b69cfc3"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "f6ada12dc1d362aa60b6fd8cb0734420"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "b9dd5e6b632f401bc67b32cbe29956f8"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "7ef32a3d4e73cb9f7374cd9368487d01"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "e39bdba6205ae38fcf69e13ea3a746e1"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "a0cd50a6d07f82bb049dce12d7e0a4a1"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "ec098052c709d5ddca85534cb1f67a78"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "d53210dfbdad412255fa887a3b17e69a"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "b052104be2b7615616807ebf3ff7dbf3"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "7fe0efb6a8ea44b7ddf313492c347c10"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "1a950de5f7d5ca3ebd97dba395f8f9fa"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "92cd2c45f2e89293ac2ad1f0a81d89c7"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "f73d1b6a879288cedd23212e89c886d1"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "4866b50f20435fa26c4c79bed52c03a0"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "f51286e11764b35772bb6855848f75f7"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "c1d809d5098917d8aad37e6d30760883"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "078fcace8061896ad9f21b9ac01e4c57"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "26adf45c5af96c8d4556ed14880a2a08"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "de3f815dad27c648ac4468f50806da5e"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "edebfd581e793420f51f26d1dd3caa4f"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "482beef92da6d83dc712531636d74b04"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "8b335506bfe6c2c5e60b2e4796c334ef"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "259969def65dfdcd6e66e8654b0f77e1"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "67414b228065b40dfb28e7bd17802189"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "eda9f2c92f8625978b90a8f16268d4a5"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "f068c559ced37f9568d7eaad7a59b92c"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "538abbfacc952439460ee5c2e6c50827"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "8b8f52cd5baa3966eda16c78db01cdc5"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "829a9e37f9bbfe5bd20c9e7ab8834791"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "23139f67fbbe87324ee7a094da75dfe4"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "4d937d8de565399977b4b22c879c691f"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "2618272f512955916df734656a1990d7"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "7545a5070882c691199e276c99a234e0"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "907b758d21527fe05f0f483698076f79"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "e6430db6d75e9cbea3a414008d06999c"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "9b2a5ae2e06b0172e9e6f90e26c9e72b"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "9dea24c4d19a7876d4e38091839b0906"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "8f2c8d63483ed9073716cbc6079be3e2"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "c6b43c2dde56e2240cb5b1ea48ca7463"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "7582adbc95949706902fed0792fb9ac1"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "ea124e121ec4f3c512e9af33cd0223a9"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "af7aa2a0c09ea45a547a5eaafc972b4c"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "368dca58e5416251226caba422a037e8"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "a72e04ab91c904e7b9b279f3590c8aed"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "c812226ac4209a784202b8b4ff3ab5fa"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "4f4e915cd2c4457d3fa522d38f83b588"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "bba882dfafb53d05fd22caab91240dfb"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "104d4b9780d8e9c6ee9648ab3475b724"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "9c971c607af2d50804ac031b5d5af72c"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "fae7585048110bc389e5fd6f4b04dfc4"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "7080819c895f89b5958f45052e99fb36"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "2381da5eb31f10a548d14c401321872b"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "d0966eb79f98d39fccb8cd4bd518ed86"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "0e2a2b951c31ce7e16809cefc5e31669"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "6af905a94b69a049185da47cfa32ce6b"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "a241ad69f58f7058a5dfeda903b2ce75"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "7c98ccd6b6e2d414f44be0f6dcf760c8"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "53940f766104b5558c2b137d9d6a7a46"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "16e903e3257e72a3f3f8fbd3efb285e4"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "5d17bd099de0f027044fd344bd2947cc"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "32d57841cf883d29e3199994fc5f530d"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "bc5a9b4b8f580d99743a904cd5c448c4"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "1460e67145c790a331e988ebedbab791"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "4e9fa3403db3e731e25bf51464995b53"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "8a5cf2d3d03a7f14511c7064c6fb6a91"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "48a717c467475f62aab9a83e3040a87c"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "1e3952035444615f48d8d9dae52f0b64"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "37532f7a220b1034ebc0116209c97054"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "1f89129917f9b894dd2af1a507e11dbb"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "4ba3fe45bd6590f02ceabd03b41d61c2"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "18ef62b0e8f8d9707b505a548429a5e9"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "89133afd40534ce0a90430cf54c7bb97"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "111edfc03a1137671c56ff8ea1432c07"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "37cddb32ba386f4562fa60e59d0eef43"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "641cdbae12c03048304cb9662ada3158"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "e86bde6c9d4a53b53fa10e983e6eeba0"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "778989fcdaffa07e3c620da37f11778e"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "b954d7e7e46882a90049d127846e3e28"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "0ec6be5777bf373dde4f5efc2434f944"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "5e68ec94706ea9a78810055582592e08"
  },
  {
    "url": "2023/10/14/Pratt's-Parser/index.html",
    "revision": "ccfade79a3bf7d43937c78e62ea5e703"
  },
  {
    "url": "about/index.html",
    "revision": "ac1688a486e2d795288c61c178e3326b"
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
    "revision": "6e981b3633dfe12eb51fbb12747cc240"
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
    "revision": "c8ffbf710f7def36c091376d6996cf32"
  },
  {
    "url": "resume/me/index.html",
    "revision": "f492bd5533a730de09040f1ba9a0a477"
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
    "revision": "5b46eb48c1fe2d334ff6b1a7eb4552ab"
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
