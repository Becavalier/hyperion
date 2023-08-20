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
    "revision": "fe32cd0b7d29b96a50850b40503b6acc"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "adab27902999ca4ab27ce7e49618e98c"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "2a6e35e3fb6817a3f8ca06ad2f654f6a"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "576a807a13b8e4d2ccefe32008962d99"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "90394f890ea5720e442bf7cc8102d85f"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "86135d924ddb4348f4a092524027ebf6"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "918d71291199368ec516177e797e4e2f"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "8d532be03d1315f6c4b3adba56b78919"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "8c26ce85345155c214156f3d4f542241"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "bbcc6769c9c12e687dee2d2abe571762"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "b72ecb07649f06ee5bf1474d2cce7fd0"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "1371e1d51099af7cfdf354fe677b8146"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "632f783144a28c6ef0cd271f7756bb74"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "96ec23851bb98c0129c8f65642ee6407"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "ec38af9f3d20bdef0835a431f2080fa7"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "e53196fcd7e6676840a9cccd919ccd8f"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "60ce109a836d3471b9050da5a1cb1f15"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "e13d2570731f2eddf4e7460c92e39e6a"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "bdf39e8d27de5b4b4fc179420af8251b"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "ebc1e13ef92d0428099a091b9288dc06"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "c9d811a737e213637f8fd17f22e971b0"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "847c8b70e0d7b3aa1b16a7f9c80949c7"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "92ff60d26c9d488b73ee8783ec60dc10"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "6ff7c0cb7cfab5c4a4a1ebca20281180"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "61b38b0564f49f741cbc8c4ed0ced1c9"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "70de516301d1c440a52781ddb8e4f132"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "e3c545fdf3ea618334de7a209f4632b6"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "2c33d3f27bd12d92fa16b60f57beb7c1"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "25fd060122cfdcafee1acc1010eacd95"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "2961b56b6473cc27e8a06c351db34975"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "b18fcb3e89d91a6508cff7238b53789d"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "94b2820d8f0013f1c70ed90d3939a693"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "1045f0ac020d63cea462dbea2c4c18e5"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "1107fbdaf47c18b15b0eb461dea6f9d2"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "491941ad800918735cd091e58f5aa07f"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "6535ba1a30ad1f6f8d26a0832c30ebbc"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "6517d9a1e376b091756bdc4cbf8926ce"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "c6dd5de1d0fb9ac98585a48f3d15b3c1"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "252d6863c8c99dfba48a963455e71827"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "039685d76a0d398348cf8f7057047b11"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "80f98386e2c659adf3946b6fdeabb6cd"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "9c3884cc52dd1fec33e11742185ec246"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "b1f192943967e1aab6885a43cf29c773"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "fb95aedb41e9151d5d8ca1955fc333b6"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "3445ecfc584b1dd8f2a7c4d8b949b02b"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "ac6c25fa5bc4b05fcc5d04338d1a3d3e"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "54a673189bc1e75fa0e31334f050889f"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "d233693f127c182acaf194ed1f20d6fe"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "22c7398dfea921d0a7f3f9c91270cc80"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "645da8f336ef28977d7344b583b0b2f9"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "388814926101274df00e2a088a3c1ca8"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "a19bafc6681d70a31ae4a0c74f452435"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "f9890f5a9a62816ba10078eb83349bf7"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "84b7ad3ef23a23a9eed81aa005d25d54"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "58ea493b7cc54124aa9d9592ed3a5f98"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "ce3a6d2e8fda19b16b4fb867181e280c"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "70e35df5205d1c5f2ac1a4261095f1b6"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "6ea37c9fc0151642287c69e52d0e642a"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "96ec1863928f8d0823610d25abd56176"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "ce95dd667942eee27c00cceb875bfde5"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "95765a3aa96c3aaf56d5fb3d4b95e8f1"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "54b1d7e06cbda4ef52c60cbf9b23b969"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "bd646b824713c205bd9bd4a442596548"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "3d8836e36eb8ac388f05338819d47daf"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "51f326741f412e3c09b6363ecc312027"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "0ae4b7d370c636144374f2a70187c8c0"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "0fbdd5d1afbd0b1c54ea981f8f848ffb"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "f0fa715a2436cfa2ac873b80f85ee08a"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "a7fd1eed4ae83ae2b610ef75c9c508c4"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "16b9bcb91151fac705aecb6f8a58fa8a"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "4bfba878d0419265ba95c228318edf27"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "90e2c52f197795cf78230a99e5d2548b"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "98ff8dcbc259bb6081637f7a7bb7a953"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "fb23b13413375bff35d05642b59457b6"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "9ca2e440e0a27a6752ebb0be1ac99459"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "16b9204597584953a59cc82b4a32dfbe"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "6a51828fb622786eee958983f343e8bf"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "309a88add67dee6ddc2c07235d9edbfc"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "1bdd69da15ff338aca593d7ffafa9c5c"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "e21f69f9684425ea424e1bd99abfee14"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "5da47f9ac46c9c2511b464ae059f97ff"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "8e4ed8d1393c9d6cbf99bc2301f4be22"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "2df486756411831b8a69855f8d2b4255"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "cf424c7be9ca3148a68fe4aafc2e7653"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "35dcf75b768b95979d2c13000abef4c0"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "67ed673ea61e9efbae83b50e5d973cc3"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "ee3566a9d0e120eac6d121895e1280ca"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "a3507b9db305ea742572a699b48575c2"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "d6550bfc3d9f524d00e196fa7afe2c11"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "4ee04a70fdcc2b3ccdec79cd03f54e08"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "0d135c29eb9de538a058b15264c5100e"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "9f8dbf00e4f23ea65c11744f088e5552"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "e06f63629c63ab45af58674bde4e4022"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "b7d571c58cc87b4d8671caa8328e8541"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "e4fd77dcedc947ccad0d2eb69c0dfba2"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "6177246e2e0419956346bf56e6059954"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "24642f1cfabf917b5447f6d8d7459aaa"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "7326522086ffbbceb184eeaf53fc712e"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "986dac6f7b4854dbc06157eb0f73852f"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "1a4b470af23bac3252a1e2ead6dd472c"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "4c409020ae0d3d8171d46739d9f17f77"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "28d461805917892c710027c78a153cb1"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "dea1aec63a8be0dbebc2cb6dda45fe31"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "b69521c57c2fce577805a397f8a6f3f9"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "a15c7942296bd3a9182f927e53ca3e47"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "1616094d774404a2e44f4396128f2e14"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "6f26953985d5a0e87acfa902546886e9"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "7fd4ea5514f5027883e5df6ee5bb67b9"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "87a1f5e386dc6a2e66201a5ce4215d70"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "6562b67f4a95dec76f90e56d3110f9c1"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "64bda4d1018eca2c6780b2a17e219177"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "631fe28641dd73389beab9b6196ed30b"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "d95da97455ff73d6215dbc42eb718b5e"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "f4cc9c934b272b65d06c34112a936eb1"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "26d54358dac0ec70d8b5a5a71c540717"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "c1b06a333e5aceec8f0d12463e98de51"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "37e75903441848eb342b7ccf8102a82c"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "d2f5c9587f884497b93d9893a79f1a2d"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "e6dc6f9aa63371d8c94b61b05d8c3932"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "acb59dfe2da506e3bd0b4e69777749ba"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "b67ec07d717201a90a05f2d3b388f1dc"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "ee2533b64785a395f16be390ec849815"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "f2ced78a96f1d11bd044c601838d4e6c"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "09f070a42e8473a4b2fe5268856a7fea"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "328da8232546b419b9257df634198baa"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "69a3c99c43354043070d2d3620f57c9e"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "11718ec14cccb5d28456fac2b20e6ad9"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "e0de1bcd0c0d1425133a7d63cea5f838"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "9268b914cfd04c49168078ecb77e33a4"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "1ba22e2d4ab57571714117e22bee5412"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "08f1e8817b63e861bb79637c6409c9e6"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "31578e299486e93d007cc141dd77038a"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "f5dc6643f9f8ff334bda937d8603b4bc"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "e7be720ac8acedc67340e567dd8f2be4"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "f0b1c6f828d14caae34c5369bf4e7129"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "63c5c7d4829846be772bd58634361ae7"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "77b290a245e23414b718f2d1be99be09"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "75e72a3a86930e678a23627b675edfd5"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "fa6a6b1ac04936329bd0643a59eafcc7"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "e27170336ddcca52086c99c24684795d"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "bb00ffe5b5f390c9b0571e41d448b782"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "ff996bafa2ac887c7ac76f8d5fdce20c"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "033a6e582bd2d4e04e5a3f65eeb45911"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "ab630328e38f4fd2716a5d5781950d5e"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "ec047ab6c706ed2ff9eb1bcaa424fb88"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "71f9a0e8880ccbf74c3e5de939f26180"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "ba3f0698712bead889dbe19bfb23971c"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "024b479290b9a1d1cc5cd11f34aa2859"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "a062fa9457e96406be5b904ba99ad908"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "57b4eeb9a221eceb8a7323d7381e03df"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "f72140381c5fda80c278b9b4ce0d7fc5"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "2e7cf654aedb1f2b3a179230e3c21f43"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "0f621dbca46e6f2e8ced22adcb66d700"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "26db8f0ba34bf6f6cc7a72345c133102"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "f9a207bef43710c3458a6ad47a3f218b"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "774f1e06042c77ad6f3deaa57c79a627"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "7a865e49aab8f4e6bce20b243bdf5a6e"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "a76c1040b55c70b5235527edde7c5a63"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "4b216c53d2752b8ea72534d2492f61ce"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "b72c21117ae2127196c53064439d564a"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "a4bde281ae80c35da8faf7e3c399b266"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "f4d74096dfd463e1660f8a68c0cfca4d"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "2b3396946fe741f64601a112208e607a"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "5a53ee8ee4e48a0ce11f047ed9cd159c"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "fa7c850ef12b9cdee50e3ada0cfdbcec"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "5c72c74127dadecfadd21906492ecc7f"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "808faab85da7d2662edd8e804fbef46e"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "6052993417957eeae467d7389c8fe32c"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "516c01978376827f9b70b13aa3d07170"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "6fa0866d8590ebff64cf49da559dc3d3"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "f9a4c7e270f6d63328e5d6bc3d85b30e"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "10d9230919bbabb617e69fbb826dbc96"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "b78cf35a982fa84dce7cad611e701df0"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "37c96a20f296563ead593ba86b99aaf4"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "f8394b8c74496d94a3a4f27f18f431e1"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "079bce123c40f0d3eeca907542695297"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "61f79c54ac43f27b2740527df88bcc11"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "2f8aa8b0b7a8e1d6e60f87f82c36228f"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "6e93c2a40e8fa998ef3da8072029315c"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "019d6130f8675a5e42daebd92e51e2e2"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "d018cadf5d525b4742d33518918ef6be"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "d1cc9f22e70588deaf752d381b6d09fe"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "de12f7755092b52699f0c850ad7766aa"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "43b5f37c7efb3f5d5ee369af2b49e421"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "092f9909c855e6170c7dd8e6989130e3"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "922bff8d31eb2d926630e65635350b29"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "06311230164452f2ba96a492ca3da6a6"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "8789d1cb2d5f69fc893526141934e8f1"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "7a2a44be11591a67552aecd914d74de7"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "5b7d77c0b7d84cf60c642637fe294521"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "ea1981f94aff76931dd5a987ab4be954"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "d7741ccd5edc31fb4ae7685bd810c47d"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "97f25c2982258b19e1ab85ee106d87d9"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "1f1cf83e9c76277f6300e0c159282c21"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "f5976be162f7301751d2e0fb2fabe900"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "7871008113509472e59a101efdbb23e2"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "8f247e26898d1a0969723a1813c57cfb"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "ca7fab228ccde48fa1636f22a7614ab5"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "8d4d95c9f9a451abb385bf2c4eb450a3"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "a665d9bfdd79e19a2a2bf3667943cdfc"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "f29fbfbadfa7823898e086ac556ceb1c"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "29016b9b080444250c9f7f5cde76593c"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "4d4094485542b282a7aa5db4f2f05133"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "b78bccb935a3c24809a2f98e6087c965"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "8c10f6d9589485b08f29f4e0632a8ef4"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "5d092d39ece240eb6e06bab9050870bb"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "eceb6abbf3f9d18197d578dab31d7944"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "46d5089daadf1ef2d4de901d65b4f12d"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "5133430b57c66ffa2d9511856ee37b28"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "d8043e27ed9e3b4f9e6721dc6858f93f"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "adc7f45ab3a4e652403b455eaa1d8413"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "914fec606680ce4d9f7074d49a0f025f"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "d7d74018cd38b9acf166ef51b0225228"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "0333bfd5485bd0f53f68be1400fde815"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "06ad2712b4c8dde60f8cde095aae4a45"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "c82d8bfb75fe8d8947b35154fdc7c791"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "0e75a9bffeba8d68df902eeba664fafc"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "e26b4bed1d12d42b25f483aead34b461"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "77957ee0c2a34ecadf9702b781466f58"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "9cc7c944ae0e45a08c6b041388082935"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "583ccfe0bcd24d0d1359cc6eb0f80e6f"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "db5127ede6dac3e9fcf0fd582989e380"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "e1b31f456c452999df28d6a461905d92"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "80d49621218538a4d29291b9e95a17bc"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "1af9beaeaa330c38aa52411e731ded51"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "9ffd8e69ba01d9e67c16b9bc92b73a1b"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "87c933019f1756234b4d8438157d54d4"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "80cdacc3c759f77c033ebb44b9d0bf41"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "7cfab192c2fc2c0c151f94d195037cac"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "3cdb0b98955a5808a1876d4f5f8ae118"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "8466564667968afea6e9aafd30ae2740"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "62bedee738e69aecc8a8e8398482fe90"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "1058a29d874a6cb09fef00bf22f398a7"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "a50cfd565d549b4bb68a9b3d3382cb19"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "9e299d47c29c2ced9e84b924c2ac12c9"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "0191db1ac02c8f57c08bb4835629943a"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "f7b57841444f5a7dadbdfadfb946a2ba"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "72335a4b36e838e5b58eaefc387d2f51"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "2a0842b372805f028363e8cdbf23c545"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "75684e7a959d573044a83650ec9a0d34"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "fa469e5d49d40397b92b7acddd689a1a"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "783d4d6a0301f99a8f12daf3620357a9"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "d5835c5c8ce9321e878597365797f774"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "d5254b42853ae76fa89140f1a8a727bc"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "8696c546ac502d4006eae27f22365a01"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "bb19cd2fb077f083fdc56c2cab5ddb91"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "c4ed62107c67e86e1eb249bd769dc658"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "f93b824454d22e9c7ee7dab64fdd512e"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "d19de8b19ed471ed4a187b24c2ea8de2"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "fb5709a684c2f858c3887d0abc0a1c4d"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "1b21267805300eff6199df2e6a6b5566"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "8c47a7835eb1803c67dd3094ebcf73b9"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "60244bdb9e98bfa61a1941adfba4733d"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "5b020beaddc8b27dd7698c5781d4b758"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "a2945d097cdb7ca9e6adb9a2c64e4e89"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "38f6343025dd7d3a772640726b89cafe"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "97f3eb424c0dc3ffba6bbe76da75f00d"
  },
  {
    "url": "2023/07/13/你需要知道的-C++-Stack-Unwinding/index.html",
    "revision": "82f28d2ef71ef414d3b9928bd45061dd"
  },
  {
    "url": "2023/07/18/《Crafting Interpreters》读书笔记（第 1-3 章）/index.html",
    "revision": "f35435766155a1be2ced0becf076ca1d"
  },
  {
    "url": "about/index.html",
    "revision": "9ea33c374802ca8cc8f2fb7441504a8f"
  },
  {
    "url": "archives/2014/12/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2021/05/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2021/09/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2022/05/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2022/06/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2022/07/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2022/09/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2022/10/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2022/11/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2022/12/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2022/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2023/02/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2023/03/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2023/04/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2023/05/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2023/06/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2023/07/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/2023/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "archives/index.html",
    "revision": "7bcc59861d8db3b9c20ed0dc28ed5aa0"
  },
  {
    "url": "articles/index.html",
    "revision": "89be9088b2695410057ae0b1b7426ed1"
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
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/10/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/11/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/12/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/13/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/14/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/15/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/16/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/17/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/18/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/19/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/2/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/20/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/21/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/22/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/23/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/24/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/25/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/26/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/3/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/4/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/5/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/6/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/7/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/8/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "page/9/index.html",
    "revision": "21729f9bdfd2b9446e5a1ce7964c5280"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "ae662030a6b0c101f2510b03dbf54383"
  },
  {
    "url": "readings/C Primer Plus（第六版）.html",
    "revision": "1e4dbd4394c0db16a03024973a493df9"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "4f01d7271aa82570e93efc9a3840a3c3"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "a13d4cd3f5bdd6b9221abd9824d601d2"
  },
  {
    "url": "readings/CSS 权威指南（第四版）.html",
    "revision": "eee3d09b0a92121f05ad74bd18deb4cf"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "ed0f66cb8f305412f466dd9dd32efb6c"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "2fae1076ffe103bba7062fed677a8dba"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "03cceb3d77df003c824c4968657b6242"
  },
  {
    "url": "readings/index.html",
    "revision": "2530099ff7967378395a012c97f74fd1"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "fbd0464601ca337b8d412f7a68af209a"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "7639527547f32fcd89cdd7c92c4bd246"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "a9c557cd9710cbd385d7242138adf9da"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "4e3307aa88ab155c530f06d0f12b499c"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "8d680b59336fb74a27bf364f9026d7af"
  },
  {
    "url": "readings/Operating Systems - Three Easy Pieces.html",
    "revision": "47befc5695940dbcb746bc2ee1e006c5"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "dee8a3ca5c70e93c2bc6fbd66ca10719"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "fd63c5c2048bb4f9e1b4dbe9a100f143"
  },
  {
    "url": "readings/Rust and WebAssembly.html",
    "revision": "a735aab1b9c1e5c817f41071f3c0a478"
  },
  {
    "url": "readings/Rust By Example.html",
    "revision": "d1d27f3ebe1f5d13e41c4ed3028f66ed"
  },
  {
    "url": "readings/The Linux Programming Interface.html",
    "revision": "0e8d4a90a822b5f75c0c885cd15b00a9"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "b64917fed7348181b96b2a4988e7b20b"
  },
  {
    "url": "readings/The Rustonomicon.html",
    "revision": "117961418d34c34f2bdcfc2051244794"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "adfb66fe35e6d42430cc7c58fc3c2124"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "7611950e89dd45d362cd72cace583734"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "c1e3289187c158900b36b3efda5c3ce0"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "a71c373d7e2890137a09b8afe018b0c7"
  },
  {
    "url": "readings/可能与不可能的边界 - PNP 问题趣史.html",
    "revision": "c2bf97dd7fe4dfb28b51728f6ebe3711"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "70292e1e112a998767101adc27a28b02"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "8d696d196b6ee1a8752b4080a474ac64"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "8abf54233c9b90aba4e9fdfe5870c458"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "6256e00c29bdb1de144006b5d371a441"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "815efab165bb46a6e893f85a5442cb5f"
  },
  {
    "url": "readings/微积分的力量.html",
    "revision": "f32435a11cad72869bce31eea23a5928"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "9b23e1ca50b310964983f6e9430e8cb0"
  },
  {
    "url": "readings/无伤跑法.html",
    "revision": "0b1a4cab47e4265384122b5c3f06147d"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "58539661f05b0dd3fee9757efef658fb"
  },
  {
    "url": "readings/浪潮之巅.html",
    "revision": "0948353f375a3b8bb95fc2301491bc68"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "a7b79d54724275e05d06ff496ac8d302"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "af762a1a23304f2a21c4540399c994c9"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "ca82c0ea114c1a7770652f71fad1e774"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "718dff7a800c3b670f10ccd1382c101f"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "6e460e9879c3fc9cc950a8f4b1040656"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "6b68104d840c5bc3d9402b40a518ee10"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "9fdb169495931c34dbcae9664705afc9"
  },
  {
    "url": "readings/瞬间之美 - Web 界面设计如何让用户心动.html",
    "revision": "b0dccd2148f8e450783755cbf563eb03"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "8b9ecee8c320a060b25d11f94088ccc4"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "1d25fb1e983016d91fd638da59dc086c"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "f02b87611c2e3101fa86591c34900bc1"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "0366a77575c9ec752f2208978127cf5d"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "1c6b4155ee3495124ae21f12a7a728d8"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "f8ea1482f5ac200ef1b65c0d358f774a"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "6f9f87efe29e8b3382d83bd9592a6a80"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "5e9c14be787bf90d90c4b6fb410f3255"
  },
  {
    "url": "resume/css/style.min.css",
    "revision": "afd115fd99938382c8a1b3ddf304691d"
  },
  {
    "url": "resume/me-en/index.html",
    "revision": "8a5b58918ec7bfbb66b9a12fee132ba5"
  },
  {
    "url": "resume/me/index.html",
    "revision": "285aeaa8e0270dd01fd87cec83d68ccb"
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
    "revision": "71b4292e9b447643e94c1b35dae4968e"
  },
  {
    "url": "search/index.html",
    "revision": "6e3bf69470625a8249a7c6db25f5f9cb"
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
    "revision": "794333d59b8c42ebb8930b4ac2a65dfa"
  },
  {
    "url": "tags/AI/index.html",
    "revision": "48a7a6447935d13b5f19e2a476e26880"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "bfc43cdf38b71268f968eab42cbf153c"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "3787b045f1524c29b57b64a1a8ab4669"
  },
  {
    "url": "tags/ASM-js/index.html",
    "revision": "d426913cc696d3cd034fa624c3d5729f"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "9306f2e6220a6f85d6ca8568d9c73fe0"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "c39588558aaf48a5baedff5ffc4c009d"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "cfc3607ffb6419bf1ece6d80b8026383"
  },
  {
    "url": "tags/C/index.html",
    "revision": "f6659803e294ae87a2fd8b7fe1765315"
  },
  {
    "url": "tags/Compiler/index.html",
    "revision": "7c96d0db10ff982aefbac7fe295e830b"
  },
  {
    "url": "tags/Cpp/index.html",
    "revision": "44e507f9d1a287b9effd5cdaad24a8b2"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "a79666e99cc09bac87ab084cb28b4875"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "471d7f4ade119b6cd487b140db504b3a"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "76c8f7fc08a6afd52316066d355e13a2"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "26b2ba7e0eb55369adb51f09ee12965e"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "b2e1979550d36bb459e4e1c74b47dcef"
  },
  {
    "url": "tags/English/index.html",
    "revision": "3c2ffbcc4340845c83c12146ec345889"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "21347ae03e299adb43d4ed1f42e9038c"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "dc82d69ddf6ca2f09cd0f37e27f266b3"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "272a4d8afbdb04377dbd393b01ae1b8d"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "f13cb0529151c5e3f16c02f3cb41a7ec"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "2826402eb2a2f1e6f157c42191f07807"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "5f8c6a67f32ea50abcb98d3b374462c9"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "d7f092ef17e803bcbcfbc08cf227038b"
  },
  {
    "url": "tags/index.html",
    "revision": "aa2846fb8322d324a1d3429604fd5b5d"
  },
  {
    "url": "tags/Interpreter/index.html",
    "revision": "96c4f082cd30860f58cb384b516eabb4"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "7042556eb77189c56ab8c600f6adda69"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "94a72a9a3832141acff0def701975592"
  },
  {
    "url": "tags/JIT/index.html",
    "revision": "bfc493b4f8a2e079dd3bfc929e09c8b6"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "a740362e8c802aedb901ae53b159e133"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "68efbd74ff110144bd388934fce50498"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "2c509804f3c56ffa565dd703182dbf97"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "04a08459edd8314083658122d67b0bac"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "e182cb5ef35340da37757e9b568a90a2"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "8cc46006bd2ec7c336b9b5536de915c3"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "6ccd6080704bedc97d9c6fc78222de06"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "512a9d584eadf6485aa61b5d356f565c"
  },
  {
    "url": "tags/Node-js/index.html",
    "revision": "f8d8077b587f540145fb7e3d89ba47ee"
  },
  {
    "url": "tags/OS/index.html",
    "revision": "efbf129f351bab7ff3871e2147bd78b2"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "375daa52ec46294106549dee2b1b5185"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "79747dd383eb7ecfb6c5ed7849c02254"
  },
  {
    "url": "tags/React/index.html",
    "revision": "9789eea9d7c5762f5965aecac8a74575"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "eb87bc63c9bd05c77460146116736ccc"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "8b2561b81596421105f31c4707d6fca5"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "8ee8741a00fad208f1e25e8e7998eb4f"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "fe48f2cf85539f55f3f71d3c985f7f80"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "a1a55cac98850d3013867175583d078b"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "5c59a864dd0c6bf4cf2d1206b618762b"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "31df1d87f72a089ba8d6e7e64479edea"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "6fd0fe6b82186dc812ae9a9f3c133ae7"
  },
  {
    "url": "tags/Unix/index.html",
    "revision": "babe99857048713e0b504b191d0ca0f5"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "73b4bd079c30f4754e045718b031f76a"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "5dab931f619bfe2d175678e081944a1e"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "493eb41e22ea66db5ac9db7fd050234e"
  },
  {
    "url": "tags/x64/index.html",
    "revision": "5195317d4d54d73928e1a99838a94d6c"
  },
  {
    "url": "tags/x86/index.html",
    "revision": "598b6549b4382bb0e510fbd141c7922a"
  },
  {
    "url": "tags/代码保护/index.html",
    "revision": "6eb4a10725ff9a8e67ea5de5941f1182"
  },
  {
    "url": "tags/健身/index.html",
    "revision": "7b4a038caf3f10531b8986f29ba3a938"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "b730cdd8354587a349ee70d8e900d890"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "e87d2429967b72b90b02c04349c633ef"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "36ecb75542d3218b9f7416cd6fb59de3"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "726ef0a7a486de0a5c1512b861fa25f1"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "7545799de15d4740bdfee3721aa99b8d"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "43e2138f4fb37902fbc9348c12951636"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "a2a3800bf5bc2b587401fa449a929ff5"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "652a9324b1dc645680ac87c7d240e7fe"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "45cf168ec95c7101841be53e71957d5a"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "1835b08776a00690be0c1bd93181695b"
  },
  {
    "url": "tags/心理学/index.html",
    "revision": "f53184c6ffc0c4c3d7f460463a012b6c"
  },
  {
    "url": "tags/操作系统/index.html",
    "revision": "6058cf8e0a32e52e57e68bf5e624fae0"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "d23ca12c0819de95ded3fd04bca1de4b"
  },
  {
    "url": "tags/旅游攻略/index.html",
    "revision": "b0acc484774fe94c792b2222c5f76cd9"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "67c776850310ebcf600c280a79614345"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "107510b9f77c76abb767519f2baa9038"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "506db7e0fe2e761b6c3f42886ae154ef"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "f8ef52e662a35a3fa7ee620eb9fb602f"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "49e541f82ecddc01a775834cc7c28039"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "484d7b1123e410f25abc3cd0de6af5cf"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "275b1bbf4fee5f87b609ffb952381a30"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "0d3cc82f6e8b95c9b0d8af7a09cb2c5c"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "0bbadcf952b2d95abfb0e03e5173373f"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "683b1c41f64ed0a0f3fb07ba3342b152"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "3a0a878d292446e3f3ae3d389e7fa356"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "0c52f839480c1e4d6855e93208a88405"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "1dc5ef416844fa2b91914f364bc3a023"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "a589a2d5928229ce62d37c2f846dace8"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "ff00b7cdb8ba5de44068f175af880f09"
  },
  {
    "url": "tags/设计/index.html",
    "revision": "48daccce4ddf6fb36a3a5f0a26260846"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "c19b63bd402b30ddcee66ebd9e7411e9"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "1f173c4b03bce31d8dd1c0964856034f"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "464ea28d3e699ef594c0c58826fe6d89"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "790d8f9b0601ac3d1edd8d854a917c5c"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "f3e9164fc52cf2ec960dafe4b3b6c60f"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "90fb233233f2e69239f59c7d3f14445b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
