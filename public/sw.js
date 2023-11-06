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
    "revision": "ff7baa4ee4afcc16dce1b9dd72205fc8"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "bc44de3b018df9716cf6d02d447ce7ab"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "c19bbcba24637b72a995915b3d476d30"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "37a46da9339d1e2c7b9721161ce5f4ac"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "bba67884379906cb79ce972c1a6aaabc"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "ffd5d4c7d526f99328cf50484001011c"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "461bc473eb9509db6b4a5f45d9ff4ca9"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "7fef8daf6591bb7a3e7b6552f71aa217"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "3a8a73e59547693e9486f3afe40ceec2"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "4fb24b191fe25968995a2b07ef5bf762"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "ef297f5683213ab8144667fb75a5fff8"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "07599fea07534a72018179684bdb76e3"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "0438ca98f328c8c2b98c65cc44e0f4c4"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "738a67cd52efb765aeec6e08d19dc138"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "252d2c1e3cf998621bb5fc2d937b8c15"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "6bf5a7267b5da62c2fb62413ea25c38a"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "8a95b459abd2efc6ef23dbc930ea9ebf"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "87d8a394181b95458f18cd56cceaac78"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "2a30faae6febc979020906570448478f"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "ec79e203e821ce01384afe86f654bc66"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "59a02473ff05345fcab335da8b985fc3"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "f67a84245ae247b3f66d38018cb7c52a"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "7e0d2935ef2557631cfd395820a01a4c"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "2abf4b4228cf9fc1965b973ca9a413f4"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "04c876e7b97b6f75524e81c04766621b"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "82db3927cec45f7ede5cb6662fe0e521"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "7e562463f3aa547f2f8fdfc991928ee7"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "ac583fe91596e9ee2cfa2c55ed54829b"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "d872d844aa96cfa016fd4ff16e1365bf"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "0612ae07c8e35061bec3bcb4c159a67e"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "be29f58087e850edcfc662cc9a2f7a8f"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "ec7d6c8b8daa8fc59e683bf4ee17faed"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "d5dcdacbf564611ffc4514fed6485346"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "a3f84f6107347408ca6e3785174c0256"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "b580fdb2728b2299f801d7c4a1745dc1"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "c9d5f478ca5f0903e9d2574d5c407fd8"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "3725a8054c1e402dd4b9003f07d54044"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "0344435ad0ac0331149042eac8d0cd55"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "334bb58de0b4b88e5f3dc667cb5d31ab"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "65db6b0271f0b8ddb2f2bc7294261f36"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "0a399687339abed8c9a43b19cbc2eec9"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "4fbbf3d333be5c37354f2644d724bc82"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "4e53da7923d736c9e3c5407cdef54fa5"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "ac48086f5919eea7ef4e376d6d34607c"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "6b86f030e573e2e9a47807a643215b16"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "a723350ce6bc461de0db40c6e874b3c9"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "3d36f51de79f2921b3cf5ddd095d084c"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "edee0a0847ec6819ceda3cf39e9b17b7"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "491bf95027161a1674c29c9afc3b7d3e"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "61ca29bbc1731d6742d6cae522877529"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "260d1888e82871cf6bb77a45b83a76d9"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "7e66f25306bb5f1fa44c14936e328e56"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "47cc602f7bf5cd7fec6281b854532c4e"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "00aaf382ba332188663daca464a8e4e3"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "0693322edfd60e442091596ea3cf5e86"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "7370f2b656cc974090610e1da87caea2"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "aaca2038cd70583c77081da701d5b51f"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "3fb10de9745602505674067e84d2b713"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "e86b3883bf1ffb6c607d808219381055"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "8a8df47617f220e36f6cd54ccb0a6c4c"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "adf3262bc5390b576c8e51ecb256df82"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "caf8bb2b6466d66b6f2f8bb7914f679c"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "727207ba6911dcadb18a230533dd3787"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "9df2a19dabe145c147321cda91f83da1"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "b633d4148f4d5467647f7c31892c2f42"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "cd9d339a5bad2633d7955d0a74039ffc"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "d6a8cbc5c9a245f9bff4aca36dd6f1f9"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "8cceaf60c297f655b7edfc7a8eb1c4d9"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "d3ee578d349349b428865b90a0a1f08a"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "e7179ce08ca8ea6a8c8722354ec51c0e"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "1b81869ef25ccf45a5ab626b86c11254"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "e468be31f3637373213213e9ccb3cb09"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "ae47b7905d2c08d111467ce4d890a0f1"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "3548d3d637da415079750fa96240dd53"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "5b2a360f70f2cfef6fbc535ce0b5216e"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "607d629f9d757e8f06a90d04f6a1e52c"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "e5baabd35f958bdd3d76552250493fdd"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "25af6251e0f2f26a0b111a3beb2b2c30"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "a781e26d1b3f19fcfb469099fb18a35b"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "56b693edfd3366d2a1946228918f0f64"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "0619a7aa1c0174670a0eed1ce48d3fd6"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "68b8c1f826ca24d0c05b0d1bfd900e69"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "568f79f56da8e1746f6f64cf2cd7fb42"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "467980605526289b2f50102d1b3a6a60"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "b10c8ce51fc49bb936f2fc448e719d3b"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "ce96ee50e8c90f16fad198b85dffa0ce"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "a9c35644c119e71ecd8277d3ca51088e"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "2067c16ad67f4d0768c34427438673e1"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "f4bdba7995c669a19bf247b1f716c512"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "11cb281401b2ddf73d83772e5fc8f552"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "769e9295c32ac01f2aa5f26f22a0fabe"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "629f0549719c714c5be9bf3096c78bf7"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "edb977997bf8bbb30fb426fab9ba5b0e"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "a34a6c1c921df127442e4789edd00b0d"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "8e4872245062f1ea2a24fcbb60415fe9"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "9697fc7116db2cef9b66b59cd48dc493"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "263ca2c126128ba481a5cc8f42e8a71c"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "7574ae3cf15b6a6f4beb1088a7a7dc22"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "f41189d367d9381f9bd6a086d86af0ed"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "45c7ec350fa4c4c4c4d3abdce490bef4"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "0ca5938f435eb6553bf5d4c4fe4db101"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "6165f2ec3a371224e898d795d0433fbc"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "694f67cf2c5bb873d227f543c776ec71"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "8710ea1e1f8545f8daf2c3386ef7a27e"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "fbfc28e36b11b13c06edcadd609ace67"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "7da03ef029891db09d4e4005120765a9"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "804753881145dd617b42cd1d54e877e4"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "6ba0fb3cd2975b8720bd71f88e1244ac"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "1a60548daa48dbeb6052cf9ebb0b6f1b"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "028db2edc4011f6e5146f8f8eb03e8f4"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "643d5365d9d69854af8e6c2b543a9532"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "22f8e57c989e6ff619de9d48f9f6fb2d"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "8a7f85e62dbae822247d9e1eb5471903"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "7fd8c64b823a5ddf2ffa959e38c79d9c"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "56cd5fb737dd8128a5ed642e43c68b90"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "610ad60c51d55c26985b4f929a931603"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "4839f2617f4cdd094e5d9d7b8c015263"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "d6e595adfe0b9446d2176bc9b195c369"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "bc70bce7053be63a95da8e8b0b461953"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "3b3e51e3aa15c943b9f0fddf544f7b60"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "a21849015fa622cf2ec85b1114863a85"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "afa53959552debda77b923de33fd93a5"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "1af8fbadb41d5367053fb5a513e115de"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "225b99f36119e8f799e32a0ecee6294f"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "1a8783e939993a5f4dd0d096899be2b0"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "fedb1a46aa575c9ac1a5946ddb937f79"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "eb17cfb997f6929d35b5b7cb7a4c135f"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "b3a6fb0e8d42148fb3eba48ca5850e7a"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "6a3e707efedcdf042a8d6db5116e8aab"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "f17a491149561af066e3bbff1f7de34e"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "ccace7f6b10885e8d11a042423efde95"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "ea902fdd402f0f48ad9be4c3fcc46d5b"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "d86aab9491761294ff5b89c3bf8e4365"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "bb9a719049423233e6d84d0033fc4bd6"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "153a9c08cb5eca5963a28b768dbdd1a1"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "b6fe924edb2a020b48bcac87b8fe80b2"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "0ce14303879b24a1d0c5e86f11b4628d"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "545144e970ab7a32fe5c219c1fb7996d"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "f079ab9f0359550f13c44605ce6e1af1"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "cf94435eea9b59a1ef7c9273d2073d89"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "535200440e5d242956509172a6877950"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "8e8fb843dd0fb8f3d59b985470dce220"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "e01f20a5a60ccc03a3e8c1b71d99f248"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "eb20554825cdb2dce546318d8598cfd6"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "50a53b8afb5ca8edb7d7ffdfb2fc13bf"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "5cc98228bf9f41b329b0939712adc352"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "2735c59f0a1f7692383d103b39aa0a27"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "d1f3af48720782389256eeaa489ab6d0"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "094a5824148bfb522b9760ab50f62ef7"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "293e460d487810a8a007407ad50e8b6b"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "9a2e140f08c69ee87f0b35ce7eee46ec"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "53bf5f583b1c5da0173b0abeb8b866e1"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "337c6e887c7689f8d7272132f4576dd5"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "c7152db17e85ae310dbe91e3e890fa31"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "f80b932b3885745c4a6ac53f5419ccc8"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "ed899d2e48035f7fc4dabc73b01b901c"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "408162597161f80573715389538f3b10"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "b602ef701c14e1aa3f495b46fe2d3604"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "957d4d30cb839683899eab12cf3ee505"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "4dd998967329783fa1ac27f1cd114a11"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "60a7096bdc00ae8628279493c29768e1"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "6be5bddb97224d785caed943c276df49"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "af647a7e5b896ffd11b90340321b4172"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "dda217aee61a9d8e1d1cd8b4e113ff14"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "b5b5ef5f145444412d3ad7120c177010"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "fd21d85011d535496c2c82f207692a3b"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "96839ab0e8ab0e6cf8661c51ee5f0fca"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "831812f700ea1c35aec30dd5857fcb91"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "df306f15a6ec2af5081c668a3530a389"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "d8110a06d6d23cf4b9eac759343e3cbd"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "c63891f41acc2114fdcf151c67c4393d"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "5a70a450dd3f0ccc545becb6a72309fe"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "298b32347d6bb83e23dfd44aedb98cc3"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "c09984e212d6dc31ed9556a428eb0ff4"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "4e6fed027e0cf2fa9f8d361e5fd84f27"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "381d38086fa1eb4c03205fc236bb16f3"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "0c0524ac3df7638df9fdc0577c8ca4fb"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "fad6c20984628d661a612e59ca1b404e"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "23933ae7d9c8006acd33f46427f82afa"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "8aa2043e40445d64edfe4ca77652790a"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "26991944fb33758650f1a10dc6a2b8b5"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "3abe9ec7309a49485d0fb5fb20627b3f"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "d3f1ec381f0bc073f07c0d907d5833ad"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "9902dda9d5cd92612283d1f065d58e7c"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "f9030f39b1bc3788a82b0ef55a23ca84"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "f8182d6b1df25e99d3f294ab648dd01f"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "b9e6ba0bd2460a390872ad5ceb4eeff0"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "9dd4917de93472f5230c86f49a283bbc"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "f0541442b8fa11c66bc04c770dba9883"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "8143b529065684283fd94ee1c3d1a7e5"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "a3bb27f202f28a2d0a2eeee2354cfea4"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "3e9f7063e5b758127b7849b18894ec1a"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "2458edf513235c82a3d6a010d7cf4e61"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "19edcf4bff10ed8aa26da14aa93adb0d"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "132b5da627465dd6339ad812bee4b89e"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "abe291e19c294f942e870db6aa81a828"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "73dd0c23f8b01ef1e39f12b272098ba9"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "b5588095b4d5b0005209eb5ae7f498b4"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "7e2a66e4e7d321245dc4cbf796de81a9"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "177777e2d8c520b196352aab66d3a2b9"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "1d30b82ee424ced91636315269c8da1b"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "a65e83cdcf40d210580df31773bdf1e6"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "8d5a3ea846b60af75a5ca20d5e94ea00"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "57f912fee8c64103cadaa70305642e99"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "b572de036a0a65132221bcd9d8014e0c"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "39967313dccd7e721a224a45df31f6fd"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "5c50b7a61f1db6ad934d1891f8e9b420"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "0cbdf7b45fc1a121364a1a4eb0b02204"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "8e34ecfa5d689e6af67cd26429950ba4"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "d04982c3f1efe65606ded60c3c54f272"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "5dc75a85a76dbea1aaea85ab59476446"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "c83b75118f7e5667e539269bcef76f93"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "d472ec380838d696f4a85372e6ab6167"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "6f9dc0231b8139eae6da6baef7db2882"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "c75e3b59dbd2492fd545473d4fc86690"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "e80c4ba1a40605581a79523d42d9c538"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "c02749cd5a92ab6f7ef0f6916af7e4a5"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "07020300388407fd8d2ff71179982f8e"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "8a3964338120ef256d4ded1d90ad0570"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "7493cd26200822c4c4c71e71c01f7462"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "e032b5ed59431dd31d22159121f9a495"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "6bcbaf6f8156fab3e2497360003e0fbc"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "1ee6580bd4730ceea0098ad328c97d48"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "7777ee3c979b3cfc0e78072c233cf3d0"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "3efc46b5e5ac8b1aa6973015e0d7221e"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "8edf470c3c87476cad9cef8fba1c7dc0"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "80a652bf61a28b824f6e3e3f9b06c703"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "1417ff4ecccf6f5687d02e947b22f6f6"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "620e10b10ba694ba0d737396c95991b6"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "2e1761538156f69320e0c593bb72e00a"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "11328ab0c025de92ca95e422e837647b"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "6ae9c507e1422d22dc1a82f1e7d56cdd"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "4934585a40e39605b342c146ac3aafae"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "3fd71bbc0843ddde70e8e79e4eea9d9a"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "4d7df298b6522d30c70fd3545f959d22"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "9acdf30a24b04d976b936419663b7ab1"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "63b6e68b075b4200fdea7fa7450e40e5"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "49b57d055f4510248b12988103abe273"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "31a4c28f4adc16bdf2f45d88e838b17c"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "c7af4e74f92119998e209cd6c4752dc5"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "72f3e64bd0fbae15ed8aba4e6fce2182"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "d52cf522da22fb8e8f0ab32f96711432"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "9ba54d58972e6df88d69b0e038d7d9ad"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "59c1a51f4cd4adf83c5b48b5b753a88b"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "2d9bffda92152bde0d701a663724d045"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "59ebbb26a42e5541ec03350cde025c00"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "77ba3746a9f0c6c915bfee6ef295d883"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "6c46f2202cda8e3a96396e4876cf315f"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "83d2096c3dfa2efc02795b0ac6e8eec4"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "0a337ab9dd3015590c39e86ff29477e8"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "39345bb08b26d60277cff91fa3d0e7ea"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "1648eb953a02403bac8a262dffc071fb"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "b673f9a8b15fd9465dad353e27811ca9"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "ba04de56e273386498b6c9f588ec152a"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "210f8275183c7fbb4a2d9158e2f78b93"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "f9d1891ba35075bffa56a33eb3107719"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "a2b8a1094b4ae4738fba0652ed205ed4"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "62fbef485c76f38cdffcc82a72957aa3"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "0f42a46dbb72c1ccd782b40a0cceef14"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "683925e09113d345e9f6132a73de780e"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "bf2ee3f2e5214ee4e07fa53ad6c1272b"
  },
  {
    "url": "2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/index.html",
    "revision": "c0086f47cf4484c79636e9bf4f6e4116"
  },
  {
    "url": "2023/11/01/WebAssembly-Multi-value-Extension/index.html",
    "revision": "da72131b6837591d8a55cdc8e83fd1fe"
  },
  {
    "url": "2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/index.html",
    "revision": "2e3ba81df866b603c5b5e964887b8721"
  },
  {
    "url": "2023/11/01/WebAssembly-Sign-extension-operators/index.html",
    "revision": "6998e326b786985b1565552d52fb1254"
  },
  {
    "url": "2023/11/02/WebAssembly-JavaScript-BigInt-to-WebAssembly-i64-integration/index.html",
    "revision": "5d75e27da68d21c9d375909a31287e85"
  },
  {
    "url": "2023/11/02/WebAssembly-Reference-Types/index.html",
    "revision": "035af612cb6783d53a510e698d243973"
  },
  {
    "url": "2023/11/03/WebAssembly-Bulk-Memory-Operations-and-Conditional-Segment-Initialization/index.html",
    "revision": "d020ac77f91c32cf392b7b90bcc6e26c"
  },
  {
    "url": "2023/11/04/WebAssembly-128-bit-packed-SIMD-Extension/index.html",
    "revision": "467edc07a5911d5c1d651657c27be330"
  },
  {
    "url": "2023/11/05/WebAssembly-Relaxed-SIMD/index.html",
    "revision": "a1148af159b4c212b53d73e2fb041a56"
  },
  {
    "url": "about/index.html",
    "revision": "56897fe0138ad3a2fd78dfab2e88abe1"
  },
  {
    "url": "archives/2014/12/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2021/05/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2021/09/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2022/05/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2022/06/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2022/07/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2022/09/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2022/10/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2022/11/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2022/12/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2022/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/02/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/03/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/04/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/05/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/06/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/07/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/09/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/10/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/11/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/2023/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "archives/index.html",
    "revision": "0b3798481e7cd08484aa3c082f2993de"
  },
  {
    "url": "articles/index.html",
    "revision": "76b2f11a6d7ead9f3ea504c647674d35"
  },
  {
    "url": "cards/index.html",
    "revision": "1a1e6128700f5437e9264efb86140b72"
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
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/10/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/11/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/12/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/13/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/14/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/15/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/16/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/17/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/18/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/19/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/2/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/20/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/21/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/22/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/23/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/24/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/25/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/26/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/27/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/3/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/4/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/5/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/6/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/7/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/8/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "page/9/index.html",
    "revision": "9cac3b8a3ed53fe0600fde1d4cddbbab"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "6987f5fd79356e0ad74c220c53850316"
  },
  {
    "url": "readings/C Primer Plus（第六版）.html",
    "revision": "33e3451a1135ef6f645e2d165b2c6aeb"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "85c434b1ebfa01947a6c892c41f30307"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "1a8e7769750a6b1b219a2f9e737a1cd7"
  },
  {
    "url": "readings/Crafting Interpreter.html",
    "revision": "b62160265c1fe90ab9a6693ea03e0f4a"
  },
  {
    "url": "readings/CSS 权威指南（第四版）.html",
    "revision": "923d1369f9517a0282edd2bbf7c3be93"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "64cb494a3ed44eeb42d6b5d5e3ac93db"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "1898fda1d0dd730a5c83297eae28582b"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "5f1902c7c21f68d6f70b8c06d59cebd8"
  },
  {
    "url": "readings/index.html",
    "revision": "589c975ed7ec9066fd516b36829cca5e"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "c65daffd6f9a797a27099f80c74cab90"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "469dc7cd2e8d1eaead90f919712ee091"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "07abc616a61817aa4fc1aaa08d176938"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "ff215c5e6555a86175029802d0b89e31"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "bccf122faf3c5de4ad749fdbf8e68d1a"
  },
  {
    "url": "readings/Operating Systems - Three Easy Pieces.html",
    "revision": "11b8d8bac2924b2bd54f978d436ca71a"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "b637b2d779f3a4c7b9b6adee899db7f2"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "d5010f2e16e6c45306a6719214e724aa"
  },
  {
    "url": "readings/Rust and WebAssembly.html",
    "revision": "e988b0e724674463e9d75333cc17cf7d"
  },
  {
    "url": "readings/Rust By Example.html",
    "revision": "eb63ad624273e22c68a439b2604c3e5e"
  },
  {
    "url": "readings/The Linux Programming Interface.html",
    "revision": "edc84170c2cf8110311baa0220ad63aa"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "f47815e0fc3b9c355c0a88d1cd4a8acb"
  },
  {
    "url": "readings/The Rustonomicon.html",
    "revision": "9ae8b0b85cbba2ddadc3d8b1df7ee50a"
  },
  {
    "url": "readings/x86 汇编语言：从实模式到保护模式（第二版）.html",
    "revision": "326db66a730514feb7341292cbea40c5"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "d2908128c8910ca0b7a2fbec96e3b449"
  },
  {
    "url": "readings/人月神话.html",
    "revision": "3076f77fa523efbedf7c48d9804d212b"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "99871c82cb3db101573f48d7498f7ce7"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "08f0c0ab904502e95e05886e4d217af4"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "b92289f565a525c0702abd61487f840d"
  },
  {
    "url": "readings/可能与不可能的边界 - PNP 问题趣史.html",
    "revision": "d597131923caf3584751b366a6f32515"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "390c3f47e915894d32264c4bb2af398e"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "72499e3e4242c6b850b561465068be09"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "b618cc4a213945c8d1bbe58616d906fb"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "1b2316ceb224dab1873455f822417c6b"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "2f19b5c033fb9941ff3ad6f0f07796c1"
  },
  {
    "url": "readings/微积分的力量.html",
    "revision": "efaf12df1e578a7d0781a7ec305ca332"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "5c646bc87e0d589b783fc87f71627255"
  },
  {
    "url": "readings/无伤跑法.html",
    "revision": "8db6b1b5e0506a3c8cf09eddcfcb484a"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "d1de14acd1093d6bbc361ad83a47058e"
  },
  {
    "url": "readings/浪潮之巅.html",
    "revision": "5f4c493973cae5a7fbbbf959ce944493"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "323912b12a482ce1a1fb9bb280122130"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "9064e46a2e14d1eecb1eced1c26c57d5"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "3189ab4699d0bb6340d4bbb0b992ba5e"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "62995ae7e37cae97cb69b1368f85eb76"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "7e35881d3fd83c93af0bdd38fb3a8730"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "f9cb1ba9b5a56b762ec6fbdb84b6106e"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "f0a0f3d3152c9badd1062498aee16e8d"
  },
  {
    "url": "readings/瞬间之美 - Web 界面设计如何让用户心动.html",
    "revision": "0c51440e56e1c32ea3cbf1f135b49b16"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "0a774bf2f868feb0970d06c4132ecd02"
  },
  {
    "url": "readings/穿越计算机的迷雾（第二版）.html",
    "revision": "cd13cad2f904f3788a76b7f434ca5384"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "12e7e4299228b5c84f4703ec718e4981"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "bd1fb78c5200629370b0f7e108171796"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "ca310f03fe9b38c06c0ba3b2d5ee5490"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "e267440e2a06be9f0193b09c7c78b432"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "3bcec1d5dc83420a7bdea935f198c696"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "5a7a0124d49f4136e76dbd4cb1645a94"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "0b8ae7e74743155ebe36166815b1e87e"
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
    "revision": "8f91cc118f678f7aff50394a1aed9750"
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
    "revision": "a5113cdc74ced1a23c6c3c253a44eb1a"
  },
  {
    "url": "tags/AI/index.html",
    "revision": "b6ad05ed390b12bb1c941bb54fa799ee"
  },
  {
    "url": "tags/Android/index.html",
    "revision": "f3f252a258daac5c82e953df0b4f0e6d"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "11f4d639a791ea83fc5fe7c3bfdc1dcb"
  },
  {
    "url": "tags/asmjs/index.html",
    "revision": "b0c105f757f6762e04cf1bf81951fcb0"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "cefdb3ddbb7699884da1afe3f536387d"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "d33d5acdda3a46d050611daf530aa9c5"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "067eabbbf39fdee1cee016d3074c9b39"
  },
  {
    "url": "tags/C/index.html",
    "revision": "3f623cdcd813411171e25a306bccb582"
  },
  {
    "url": "tags/Compiler/index.html",
    "revision": "9dd2cf76908dc256fc862559f9ce1271"
  },
  {
    "url": "tags/Cpp/index.html",
    "revision": "ecf95e3f71192b6117306c8c4234a3ad"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "1f7ca92e06f9ab210142d555e8eb9a45"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "dae544a44893d8804ee7ecf24aecf66b"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "bc50da54b3079bbabffcf384b70b436c"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "1decb719dd1df4bb7a3261dcddc8df24"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "3c46226bda0704f8abe9a5e9add003bb"
  },
  {
    "url": "tags/English/index.html",
    "revision": "1351c3255fdce77fbf2f5cb9b2cdf698"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "b774efc0ba64f4866c4b031fa5190222"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "c5164b236a8bb9de9e5724e40aad211d"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "a17b8009681758ace57f4fc73156ba9f"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "7c04a9fe9a075db9ccc9666388947816"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "2dd6d235730953f8dd056b4661a7ef7d"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "581f0b105bc7b11e27e58f118a57055c"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "131d0166dc9f214e4390b373b61c2bd2"
  },
  {
    "url": "tags/index.html",
    "revision": "dfc7a41156e0f36d3b38caafe276143d"
  },
  {
    "url": "tags/Interpreter/index.html",
    "revision": "b6119023a7de5c7fd06f606f761da886"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "d728362e1ad2766ad57f7e7cf73d6953"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "1fd6a98edc34b7b68b00a249cf66e51e"
  },
  {
    "url": "tags/JIT/index.html",
    "revision": "fe6a6da9e1983bd53f197dc4af159933"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "8a030ef7732323b2bc0faa3e2e935bd0"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "9c85a4e3f948dbc4de0f829d99c47184"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "1fc990bcc95982d69a4163ef28d08fd2"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "dd83a53f3bfbf6e60c1effda630a6eec"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "7d2019e9a40022b4e30a271f3bc1ff60"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "30c07b9751d15a7833f1c22e824cfcbc"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "843fc7a2f8656ab231d48e99e284bfac"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "f021ed9e309f52bf6fb1a21ed6992cdb"
  },
  {
    "url": "tags/Node-js/index.html",
    "revision": "f52876a0dcdd63e8756caffad621032f"
  },
  {
    "url": "tags/NRVO/index.html",
    "revision": "ab820733fe76f14149b8341d44d0cc75"
  },
  {
    "url": "tags/OS/index.html",
    "revision": "631e813f8421b57b9dae856e1174a1dc"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "04283a85f6e5ef61ed7c32032a70d6bf"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "151a6d175f03f2a72bc3a84657050ce0"
  },
  {
    "url": "tags/React/index.html",
    "revision": "b50c82de2033aafb8637ee02cc39627b"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "d4b220762e39657166d7016bfe7a3586"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "50571628dd966412ad3ef20bc361e2b0"
  },
  {
    "url": "tags/RVO/index.html",
    "revision": "bad08f508e58512ce0590b79ef607a60"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "d463a20682ecc8c414e59c10c9042ba8"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "7272b8dab2a232e04f0f46d8cd0fbb79"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "17be5e023f7590a5394a213a93f27837"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "4ad8b0313b8bea610ca0077512caf193"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "f67b43cecbc9b39fead4aabe4b4e6426"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "2c538f64603139956c2a8a4ed96b8144"
  },
  {
    "url": "tags/Unix/index.html",
    "revision": "3eeea771179779806d010f3c947028fe"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "9a6c2de66c676858524997d021f8fb69"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "978495f2789a02d3a13ad31f9342fd4f"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "8fb0f191c0a478af34cafb3342c189c6"
  },
  {
    "url": "tags/x64/index.html",
    "revision": "7cb31a07e636e263715303682ec13c92"
  },
  {
    "url": "tags/x86/index.html",
    "revision": "df63d32f6795868a3d5afbcf37ba7662"
  },
  {
    "url": "tags/代码保护/index.html",
    "revision": "f795c327f5b9d074339230e6963f7c2e"
  },
  {
    "url": "tags/健身/index.html",
    "revision": "dafff39113603f95244354996043e5b7"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "6d5de023e2ad52340fcf8f819a967686"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "dd1e13bfea4c4b62a094eab1b0aaf695"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "cbc91c4e4e072dc711c4b7135e3980dc"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "fc6cd7468e7dcc9cb40d1d64906e4de3"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "cc1654e994dce21672ec91588fed7003"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "c877127a309a3e905eb63778e7a03bc5"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "4f88a0049ab81cb94d80bf923a0de969"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "3ffc8ca8bd4b285d074e9e861fb0123b"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "1edae726d40e9a31a3dab80f3dfe8920"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "d01dcea5b72b82fb010a65322a606f89"
  },
  {
    "url": "tags/心理学/index.html",
    "revision": "4d59a0f66102ad65154784982dfa6348"
  },
  {
    "url": "tags/操作系统/index.html",
    "revision": "9ad433666f9c59c65f3c813f9c12bbdf"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "80c919b85e7bec7738618a975ea0aaf4"
  },
  {
    "url": "tags/旅游攻略/index.html",
    "revision": "b994e4b0d5b218e9c1a7c76b2f3907c2"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "861df6c068cfeffaf9ee3e654a1360e5"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "c010988e40fb0160cbd5fd51be8b9e17"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "e5f529a8298edc07a895b3ad67e4b611"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "124a12b1c7c409692756dbf90e30f993"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "6c31069f6b5727a7c30c4edaa7061fa0"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "027eb7dfb2c18238bc6ca4b840d43c95"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "31bb1fe175d868e536035c5d6e9e7ff3"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "2487a08f38f53b9dd3ca5c6c18ff87be"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "9ed769fbc6607280ac1c1bd05fb88c55"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "f94f12acb87ba1300e43bce0058b6fde"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "b374b71a9df21cc879b39261987bc4b4"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "89c027556aa3d8e7f3ccbf716e89848e"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "69f97bfc6a3ff3f79234f220dbd5c2e3"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "c64147b9516afaacd0f9c3e6b81c2792"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "cfadbbd62186b19ec4a555341b6fbd08"
  },
  {
    "url": "tags/设计/index.html",
    "revision": "b86de767093b8e614ffafbd931c788ac"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "f7a21369408e133e2986a6279d85d35f"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "b231b773c1aba6a13ff81595a7ea8efa"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "f3e7b38ecdd574ef5a742d382dcb8082"
  },
  {
    "url": "tags/软件工程/index.html",
    "revision": "6ed0112c4e485aca1ffb7a684f786c06"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "fc664e62e362c20d95928c2840ab6fac"
  },
  {
    "url": "tags/项目管理/index.html",
    "revision": "84ed67b0663d41563fa856f60065b705"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "0d4ebac6096b9a308a388234d31125ff"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "73fa55e0bce4e8a1e954666dbf71f88c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
