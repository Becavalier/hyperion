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
    "revision": "6af76e5c8ae4b8b7dc4ad1c0e6eb58b6"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "708814fdb2efc66c3a1852871b3760e7"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "5d1cebbf932cd0ecec33f26577ced733"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "a256a8b07283b772db8afcdb8ac0f838"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "5014bae050e56b43301630adae780c1c"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "8aaa7a3bbfb96a03eec9734421eedd99"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "1150d82d3d78adbf34474774057ee93f"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "27db8a7bbbfcb1a324095617e9af3c17"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "e00e690fb1aca27d96a66308b6e77981"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "ac320bc212fb8279b9a7d581d278656a"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "76f0379201506f4d10ae3bf48624b9bd"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "26efa8c3ea12c5f7194b64779b3597f7"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "5909ba2439366754e78d972a66b18778"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "d582f8db26a2990a22c8ed8ff9019d51"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "01b1c3f173016a728ab497f49117ce63"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "9b7ae6d46453d02d34f235488e3207a0"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "968e51df8b91bd16e687d3d2d9d85c82"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "1d3c17c2154fdb26f5f35b285daf10ec"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "45fc278a0b121e238a12872acdec364a"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "e824aa0ae89b2dc2519a61ac47eeb9b8"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "eb25657931dac3f4cfe82bf04110cdd0"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "cec6a9d02b9cb550c212031e4d525f57"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "50bd5723876cc70eb4f7e94c993a1f54"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "1819f0dce6231c859cbe54606becd837"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "82f3f6275025337421ac95503963db3c"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "72b9f7e8a8dd818520cc3b88fb78b42e"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "b8590a93559ce8412110bf8c6d983a34"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "820257864bf191b2bd03d6fc0e165733"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "d3a249bc8d88ec9747ee04fae1dbac10"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "a3e3afb6117d00c1730350f5366a37a7"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "4a967bc8f83ed11c9c6f8862164d7bba"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "a50d375f3b04b268c646487c73cb05e2"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "46b872ae8f4ac9bae8905b4468133f7c"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "c55e3b56ee6ed3cc420df8c2ff9f9b71"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "e75b9645f2189c8fd9a19722298915d7"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "2fb70ebc6fdf666f9366e98b1cab6ee6"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "2d03a4a15c8a2d8bc240ec1c5f9d38fc"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "95aa77b3c9aef4ce3255657c2a48d8f4"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "52942fe7e66190672a3af2544f031316"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "c82d75147812f6a1b6e3df928650470d"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "67ce252b163edef078cdab8e80e86e90"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "d635936c1f432fedad01922fe5e785b0"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "d9444a45dfbe26ee68b3b4b34d82c71a"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "8be68e687987561be9e0cd18783fc33b"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "95032ae9110b9ee61fd8e9fe39d43800"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "63cc01de11cc6da3f6d72bfa2fab8439"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "cf2f07f17120a575b923779a8903bb92"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "6765fbb83f8f5b3f23429b249d0a18b7"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "b6155226e62d6b3e76d723410404e15a"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "a28fc94a619ff1007b6888baae11c3c0"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "93a8d3240f760fa2b8ff43644c48b1ef"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "068fd923d2f2b62db66364e9bcc93b93"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "c4be14fdf675f0165ee5254b96a32cd2"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "f79adcbaaaa0718cf0f0ec595148f5e1"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "108f0255a749acb60d5ca26c704beb01"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "2c37f5453103e8b03c213fab2d9eafe7"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "4429db85a7d5cc2e9bc26d78244d5275"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "1174e964c8aeedde78c344b7634b9a69"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "034d1158bda07a8f329afa60884b2a1b"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "d8d936d499f70647c8391dca015441a3"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "b8ab9a5f1c3e3aafb33898ed5ccf8de5"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "4b733a369f3e1b2097586e93ecc4ff72"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "608bd2fc05ee9ed7ba502bedab10a886"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "be5415dc9dbc965c0ab7ef005c0cb944"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "81db2f91b9306974029fdca6327d3930"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "440c2ea1e465988c732048fee79f4074"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "121a17d32b9553855a4da60339f21223"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "512bd5c2feef2ba63e6781f48b433dd1"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "494a043d1a5ad192ee7577ccacbbc28f"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "b3dea7e17f28359936ceb2112dc64100"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "d7e23dccfe678c4a00bd1241c5c4a781"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "96d305ec818b29ce816724c21915fc54"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "8051f69c1c1dc9a7875281faee32e6aa"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "48643a0ed0c406a0db920a46817942b7"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "f0343bb10fcc58bf0871ff5356d5c713"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "d4120532fb1e6b044cd5325ab6bac4af"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "40040fe7ad67f23301d7800dcd8958d7"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "2c9475152ad3d0bd9a316265c9fc4f81"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "724915f308542d6b3433e250a25b681c"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "e6b435cb2bbf649374e58e432ed76a88"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "b835a62b52157b072bf62114320e0cf1"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "ced2ddacbf89cfd18923a066e7d45978"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "a73f3281a75f1acea09798428ddd534e"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "53630157511fb07813a18bff498ff212"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "230092800d0285e66cf7e16a373eb50b"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "d6d3d26e1bb2215d1c74afeb69602742"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "93689236b3ab0b293fdc0a67dc005e04"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "937edb31f4b1e66114ebd28095ef4752"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "4be1ba61c41fb00de5c6351be634d6a1"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "1a1c2bb051c1b16ffc342b49c5237bf6"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "418063b3ff58205072717da9b874a45e"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "f057c312fd55be0456961d22bf339ee4"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "a995205e726df443ba0729776f0d6206"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "e76ad7043c12b744d2881822be9f424c"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "91c9ca84c5d9a23e0383c509c84bcbfd"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "db29133aabb0735943dea41f4b974f09"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "246ed2dfc2213145f3e8f1e14af92902"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "ff5418dfc60fdddea4810a801b573146"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "89b5a5cfc4b1469c0e5de55777ec9393"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "e2629f01beecac3fbf1e0bc2ed92add0"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "9072f1f02f70b1f8d734e4bc26d05f9a"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "496e6685adc6d38ad7f49fba1865323d"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "8cef6f97d99ab37f538b076e752a7de6"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "fb8d219ef9b2291aa375f470a243faaa"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "7998e7ab334efb5322595951f92bce22"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "25a62b8526896e75a0fb13883628a602"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "ba3db857fa9c758a72fda3cbf2c459dc"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "9c690b337329cd0ddb9210b82d24f3b7"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "7a572d7551dc644187d15411cc9541ab"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "57721812cc915153e2e50ac9bb84684f"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "cc4f11ed4689e53b403aed935a64ec9b"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "4c0ef61f1d11a531764bb271a343d7d5"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "914d0b1ad4aca265eae7137b2d57cd40"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "1cf36babbcc9708a90041702620d1bbd"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "2dce67aede8050fd5260c598fbc67f26"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "93a7d4f5ced469f310bd9d8efcf0708e"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "f01a5ac6371abbe107244e36953caab0"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "a8d560d1c929b57228922dca1651788b"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "137c50c914d802a8d790b0cd53dfb086"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "1060ab5bdd849838d2a697ad5bfa39e5"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "dde898cbdc1c6a49ff1e8e2cff3bde45"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "d4c23034e4c32e41c1639dc3cd6f4caf"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "df06c5c7656160314b7af63cd1d2cd1f"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "a5eb8245f0d9ced81304212ea43ae7bd"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "4c64d9314de5fab4a9836a6eb668d158"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "71aa6f1eb9b5bd1b0de46754d54b36f6"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "bd8ca5bb9a2ff8d48f67666b56b86607"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "81a24dc597ef743a27e41fc0be823f7d"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "edfcff4276d3ec754b0844b00494db20"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "f7164ca6e821142934267a8f0734ed30"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "7f2c207c0e5fe9433846333296ee9b1d"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "a2e19c2752859a3997f388eaae69eef6"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "621c3edfa6a3e32def5e885c4da75989"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "fd5c21303a24f64aa2d1f83008dbe878"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "61ba7370493dcba44781b85f4660f223"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "02e86dfb0fae5aa8a3dc447b35ce7545"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "a18f61add439640c3aeab5c83fc5a375"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "237ee35161ddd18decdc8b8ea7d4e210"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "569b5c0eca1d0383128bbc5afb03f1ed"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "11df1245afa6c8c7fefdeb699e7c590a"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "fea301828e8a5b14e40eafaf5abf543e"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "b9e24fdf928899548aa7ade96e10cd64"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "b5fe9b26180ca8aaa87e7b181243113e"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "c3ef146f08d5ae222e7494a0d27afeb1"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "1bb63048ed6b58aea9793cd8cc281780"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "e53f9bc4a833878e15d83b67aab4df03"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "f73bbb851f6544115bc1002af68bb63d"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "abf11102f0960721d45cb96d3c2d97d1"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "f253aa529afa3487d79272e3726aaf36"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "5dbf211026f70c4715797dff65e45e59"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "22fe27159c205931691ea8fddea0228a"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "600b21b5961dae04f3e15feba84051ad"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "9155214bcd4320fb3dbed90ff43a1ee7"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "70beeeb953988cd17cadab8082d0829e"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "f1cd29c3498719a5b40ba065df937b62"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "a310ab1d38ec3eb67764635e4330f403"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "92ed9f67773428691f572b40097ee1c7"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "160693f00ae9e713e539364a0646dd32"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "fb63a8b8c0590f10caf958e08fd6a7e6"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "d02e2fb1828c8591f337a15c9cc10bac"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "bc53c9c7add3af12a26f4cc96dc65bd0"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "b1e961607c6c84ee2233b178e68214c0"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "5afba89d4df75cf6b6b4662070bea187"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "c9068a16c6478e4b1f5192ec05210702"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "8442862da4b3c4f6fc3f3d3079fbc510"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "3c9c3c3069d2ad4bab95b392c5d2a13a"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "30f3ff852c34ac50388461f4d3d08063"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "81a4730f64ee1e7a8debaccfbb48ea36"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "2012451bbc8b33601606ab39b38a7a6a"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "b405e8c65c90ed79512c54eaa5e9b67f"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "ca09f1fc390d37d594db727ade1f15e9"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "c44c146b72fabe328a49086239ddefbd"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "93fb2364ec094c7a38358e984776c512"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "d0848e7c03ae19855d35da9f99a2f68a"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "84cf14553b87c47454fb258af09a14b7"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "712219e65b5dae89c96203a631b6fcda"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "a463e96cd684bccbde02a963a12d7cff"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "dca03252fd3e21f41ed30963e0390911"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "22f3aaeb9ad5b7f5e40a9ac5a69a5b09"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "20b4bf663ed27d51f2c72ca17bb0d33e"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "11b5eccfbd1f007cd632d0dec9271535"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "e9031d7ae2915e746df9b9a7e8e32542"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "999b71789571be9043d9b372a2c85528"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "2c505357866ce99d6c670395fea1e6ff"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "7b05f56c4b1485a02ef9c7b6bf48a315"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "176917108ea9d65fd251d800610ac85d"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "07240427bcb04bf457e778567a177aff"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "9e1aa391cc0fb392567e2f35dadc3c86"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "3da39c27ca8bd831434dabd2f3a12355"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "b1829eb21ad61b06acb3662c3573ca7f"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "03911b6272d36a99217e0b0f476253ae"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "658876e49b379bfb33bd80401d2cda5f"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "83fcab95cde64f087dee23eabd094874"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "a9c38f999599535a7c562796d0605a78"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "69f3d84978db90d13c1ea7fca21f4d0f"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "3550d0e557f964639d0aab288f2629f9"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "1647084b3cb74af811a25fdee79dc160"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "e80249799218c5bd54d8b27cc6523bfb"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "f8ba3022e3de0efc1dab9cee80a98d5d"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "850b6628ad334515948b82b514b62ff7"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "d097b504ea8b5957e1c190a3d3585da8"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "d73cf36286fa990769c85d2a67ea6df3"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "bbfaf54db9b2b6cd561c5dd57f0d206c"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "fefd85d98c08f0d27fa9e2fb4be426c1"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "b29b187b86cb086db19e73ce0a35d350"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "122b12263784bbfe359d3fcca8de503a"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "f810cdd32aeef332da343e3bb98c8b33"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "e8d1b13a3186d6fa4c30008942d9bf3a"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "9d21f1f22b2e18682e5d87cecce26339"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "786a8b91490f98363158673ffc3c5c2e"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "e78ec63120f32dc5f208fb08563fd5fb"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "aafaa881336fe919f99d35daa3b62053"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "01b85d5481c65fec34df29e3ffd2eb1d"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "f8eeb4958cccc9f8f61699c7c0dbcdce"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "540073d8a2bd25f0b2e2d895e72908cf"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "ff7af4df88549980679cf875948eab18"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "4e42786b6aa27366110c92ea848ae227"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "7644d91853e7abf9ec13feb1b3dca0e7"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "65ba1c94c02a0187c02ece57638899b4"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "22e9f610d63ef08899a4127eae49349f"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "034a0990f6cd964303cc90fb37c48ad2"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "3c27cfc59c1fe3d698df43c047dedbfa"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "b0495b91499d80bf3cad96240d7895c1"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "20ba96bfad9011c45a9a4c5c604e3c11"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "9e0dc70f5d8599cd0d325a9c03d7d406"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "15e2ccb278ab2711937724c16bf4a9d8"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "2f99ba7b8b2a486c1c450e0fa73f9c4a"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "4bae1bf6032a47b0f1b3ae0e4494861d"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "d42855f437dbe57effd2837992998c2e"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "1ce7673f9184282e2d3d0fccb79b04e7"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "0e977c8208a93c39ac66606b051f11d8"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "64c6ed83d749ada43d1cf94ea0b5981a"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "495797c9b1319a1c1c6586c10a604ad8"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "f0475ec6be3f736f0b7a5e60970f8643"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "9b2e296d076a4c0f8c528713ba3849dd"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "905e0044eb2a976496532a34dc6bff37"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "aae5e6be3a6546827b67d7373fd6f0a1"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "76e8ee39597bf4e188fa5881896455b6"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "2aa8097df7c6d1a5c3391ee949822973"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "25bc2a99e129361b0a131748ec4c815a"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "48ab74c8c8bb5fea30f24c749fcab214"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "b959922dc35a3516d29af4b5c675df5e"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "46b75c03645df70322659182749e2e82"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "84780741a38c1d5ae50e37dacc271fcf"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "e47db11346cb745319de393199260348"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "ab1756b99aaa927bdb55cb932f8f4407"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "46d58487e40f444364ac2d287123d6ba"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "6e548fb5e88fb03db19d29284e844c1c"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "9baaca5668ab1d86485d246481f7bdb3"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "9dc71621b5ab2ca10bc6ba29e6a2ad15"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "215c966fd18843697d50a16165387532"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "a05b1c73574298df99ee6cafaae79410"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "ba5e253985aec9462270d93da1a960fe"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "f3ac9a77b43d60f2d9a9700b4fca44b2"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "5c9528db0124d8a1de73d9f9fb48d35b"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "0fa1690c78b2c811a64e02690d994fcc"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "d16f82c92f92f66680e05842eec45c47"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "b51e9bc350051174e301aaca5e295e19"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "4184fc7f500dea280990810ca169bd57"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "394d5732543100b85b914787c7b5ab31"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "506ff481791ead5527b811c8fe04d422"
  },
  {
    "url": "2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/index.html",
    "revision": "6f030d3a79e055de2a04ec7f56c49d94"
  },
  {
    "url": "2023/11/01/WebAssembly-Multi-value-Extension/index.html",
    "revision": "859b3edabc55e6bcb8144324f0a4cb5e"
  },
  {
    "url": "2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/index.html",
    "revision": "72316370fadb2db911bcd073b983c57b"
  },
  {
    "url": "2023/11/01/WebAssembly-Sign-extension-operators/index.html",
    "revision": "ae356f027a9e2e46eeff0b3759899931"
  },
  {
    "url": "2023/11/02/WebAssembly-JavaScript-BigInt-to-WebAssembly-i64-integration/index.html",
    "revision": "3d26cad16e67d39f5928210e9942828b"
  },
  {
    "url": "2023/11/02/WebAssembly-Reference-Types/index.html",
    "revision": "e60695b3530ebf7b9180218c6d3f169a"
  },
  {
    "url": "2023/11/03/WebAssembly-Bulk-Memory-Operations-and-Conditional-Segment-Initialization/index.html",
    "revision": "e5bb598b67f3bbbc19294f7ccc9218ba"
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
    "url": "archives/2023/11/index.html",
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
    "revision": "17e7c2d389538799502b9e2f7887a106"
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
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/10/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/11/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/12/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/13/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/14/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/15/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/16/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/17/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/18/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/19/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/2/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/20/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/21/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/22/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/23/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/24/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/25/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/26/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/27/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/3/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/4/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/5/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/6/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/7/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/8/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
  },
  {
    "url": "page/9/index.html",
    "revision": "44f94d80545c020a07b88c1ea5044c05"
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
    "revision": "9f8fcb712371e23296923a6ff09afa6f"
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
    "revision": "e6724732c5badcbd6a770a601d4f7cb4"
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
    "revision": "e8fcf0edab0cfd456a7ce7d07dc50c41"
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
    "revision": "a1c7b53d3a677ef410a822e5a9961896"
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
