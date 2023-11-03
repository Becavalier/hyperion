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
    "revision": "9a83d89719ea2140fe64eb0dc95a8f84"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "228383f5d0f59008b7ef329c68fc70c9"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "de3d08a5ea83bac79b3a7dec4c2d7a65"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "73a1931d4e14650f972cc0e9d327bbc8"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "dc65e532aeb7da765d2c51e345584d3e"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "2453fbd7a379d7f6cbe4a44974575a82"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "898ecea645affdb1fe5c9603c057a983"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "4eff3a9a4a21c0a42480ac0ecd54cd2d"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "3cd8f4f74376e154034d9d0fb31965dc"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "1d9e2f9a2a80dd54136166c331a2296e"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "719fe09942ef8c95b5f130be55f82473"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "745f9568532e74dd931fbd045f22c148"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "8796337f8b77e83e8a2b464fdf86886d"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "fb348ced6013ca1d70c1154f43de13ea"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "4e3241f2360f9ca6e8c463e5cc74e2d1"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "e9b4c6fb812c2ad6e17d7b4fcc01c100"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "ac0aeeefc6091cc6530f92e2a87f8a50"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "306b72063e026e350898b1840e0ac64a"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "d03b32a71b934f9a0e73d162a69e346d"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "d0a87eac52359d7fe0764b4380fe0c0a"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "6c7d100c5bd70197a047e98faf54a9ab"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "c894a290570250760748c56a4226aa82"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "06be7d1acd13bd240f6f1ddeb045bbe0"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "b0993e712ab0554bf2ee2dba89152f0c"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "3f032280eb17d590bb5249f7e2d3ad89"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "65b9caa7d3b3e0337fda55b25f248e7f"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "2c48ba511b962fe0f17f34e20e39abc4"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "03ec9f1b0a9d4b020e6dbff40eb36da6"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "e157bc9a5519c8233d0dfefffe9bc0a2"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "5b0599d5a044fe2968bd742c9ea7a691"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "0216b4b8cdd2824a45c976295ff48729"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "fb0cf81668e1fa9c15ebb8043d9c3045"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "587a69adcab3277197d4bdf0a00c5690"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "f345729a6ba3cb2841a51d2307f87e04"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "35b9c2654bc34fb9947bdedf7fc2ecb9"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "669dc91be69a2324abc90959ab6b6b25"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "eb5dcd0346b7e5315b70a541e4b32d1d"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "b87bfb36c0223cbfb9677a49c9ff4221"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "af651e8db54bf4d7e0931a7164065438"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "5efd28e1b1c08453ff067098bd84813a"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "b33b3237fb7237146a0882414c293adc"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "ab4d3b4a6d3bb8a645155e3191c45172"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "19eb4d8e31319e7eb11bda6ff291ad6a"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "880b14655105e0c42bfb6113b27ad82f"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "9ac08f30807cc7ce3fbec5302ebea742"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "380c5b6bad84a809bcb3375ce775c00e"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "4c8903dad3aa9af1a20c9583f04b67cf"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "9377ac84baae86ca548f22057e075e80"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "da4353dead5c4d2107c84be481898711"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "cbdbde56a3bee2f42160f9e9e5dd3acd"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "9ecac016e46334e8cb4aec584c40285d"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "37fcf41d1b034d2b5f01c4e14160d8b3"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "7ae149a70c6c731328dd5620e7c13e68"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "c998ee619ff9887dadac80eb7dd8c163"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "6af622585db30a8f42ca1f049a35f982"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "ba309f33ad120062fdc6dc279f0089c2"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "3622700c5ecb10497e2ece633afbbb83"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "8da041488b6657c90ba878e189199094"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "8f53e662d26aec9d94ed12104edbb354"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "da5f2610eaf29620e446bb3659d25a2c"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "602cbbaf4236acc6eb5386b03e4ba8a8"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "c1624ec6bf2ee941468205b81a657c97"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "795a645cd5b61c0ec6c01111bb769932"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "53ceab8a2a521160037500b2b08443d4"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "fc13ec44337e12de700e6a5e1f5f464a"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "f04b76ddcdaa8976bdc23ce1b426ec04"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "7ce1c5ac1ca5e1b08efcf61c366b9f48"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "e7988cce299a038b71f2e5edbad7011f"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "f3a6908f91c8548773c6730173c29ffc"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "6a4d475fbd7c419755e0836e8c3b5640"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "bd43d2c254ba16fd9bbdcb79c51f56e4"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "49eb8a2bb3967591cdddc29b7f1127d2"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "257489e8fbd9e6ee61dbbc168aee2f94"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "bb81d78f597edb165c5f58e3afa032e5"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "85e643768a334414b3621d9b34f78a50"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "be499fb81fe311c1a03f4fd78bfa6ea4"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "9e10bdbd3e9aae0a31235a0179626660"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "03bf00357362a0c87906ea8ddd2c232a"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "766932b9052b289b9ba19875f5eaf578"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "64037a7153d3b301e62f4d8064e27c8f"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "6cfb2f35e22f8b5baf755698196a22d2"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "9629730dd8d5efbf1aac697de2400c02"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "11adfca27573442e4983cf3d6e51ce9a"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "5490742c791a1d863ab6ea7b5ae672be"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "3fae4ebb2193ab30086c9a8afd74f093"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "8645b392633f79559dbac212ea1f5a6f"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "1e5865378edabee26184ebded346d01c"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "c533c8749f3f32619a6a81e7e9f3e385"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "97147d23353ac86e82a10d8bc41cb0f1"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "546e44432a31ad9b1c49e70b8d314a23"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "049813e083493f480b257475598e31c6"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "8580cc6da441af7d83b0259c0f4365b2"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "0203daee79b460de6bdbf7168ec973c4"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "3e8592786346196c17daf2d50a35c8d7"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "3cf047830d0ea41725108aaf5d1da55e"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "e8cae37c53fb270c3b21c6d24bbf5544"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "38a3099d27e0a1a53ff21046e1660684"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "c3e815a170ca3e421ae9273e3a10c458"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "4e09e71723075165560583a2b5f52953"
  },
  {
    "url": "2017/06/29/Common-Lisp-小记/index.html",
    "revision": "2c4730079ac94edfdd7ff49ea3018341"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "0f898c0f506af3c21d24bbb926ca01fb"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "7d2cf8c3c4ba92571cd5085b33deec05"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "3b208ad18424f79d43a461f10447cfa4"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "171132c6eb04fb154634f1d07df3b58f"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "22b2ac930a60c119beaec32b724597c1"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "2c86c496417d902e57082868e7e53084"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "10d6c5d4e13e9b6209f984de3a15feeb"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "78b9f2881b0fa205764751275761be77"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "c1548928dd7c823634d7bfc0ae40eed9"
  },
  {
    "url": "2017/11/04/Docker-基础记录（一）/index.html",
    "revision": "bf3874ae77a236084b22c27423c2ee20"
  },
  {
    "url": "2017/11/07/Docker-基础记录（二）/index.html",
    "revision": "0fcd12a3d9cbbde83c0d14dc818fbda7"
  },
  {
    "url": "2017/11/09/Docker-基础记录（三）/index.html",
    "revision": "1c4968b2049019fd725dadaebf9f9345"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "43e960cb505423918db3c62b2cebcd2a"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "f948a2bf6d63fc080170d9128fc1a096"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "c9845726908efeb913fb2479f7078cd3"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "85f6ab3656dcbade08f240215cd909c9"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "7397f6ae2690195c011f955848f35b47"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "57f8db6e2adbe2512e309ef074b2c4f4"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "d3c251300034bb8d5c91971a33347ddd"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "0658f250170a8a983eae4f0998da37fe"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "7393f292910b9ca8374a470a8834e6d0"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "667346eb7251a1d0ee84ef7fb030f21e"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "2d16203637a74ea20dac163567d06af0"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "7176451455da2d9d6fcfb48ae715af7f"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "f1a90afac2b8a0c552c048612ad2ce1f"
  },
  {
    "url": "2019/04/10/浅谈前端 JavaScript 代码保护/index.html",
    "revision": "24114aa35e6a1c499c3798416690169e"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "142a54818a8f2efc8010bea3bb0cee24"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "fbd44d707a5ae03a4497aeda0e11686e"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "ef873525bfae572b9dce0d53f552d2aa"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "7e0305cd23ec8ffd59936a51812df957"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "ec4aa7c77b317b1d127cb20ea3893a34"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "252825134830b9b66cdeafe4a44d79a8"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "d7d67f2864d33d56f9c97eee7b4d923c"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "cfce3ce9212a09aa3e333a321342d81c"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "6caede96a9c080b83d4f4e8eab12d4b4"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "e9f122f7b6c654cf7513c1a544b8b998"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "bb3a3e6666bef1eda4f7e2120971ac0f"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "66ed0aa8a3e3b34c697ee4e55c15b103"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "1887aca2ace5f205084f91f31608963a"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "b4567455d40295329f374daa5099c527"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "c511ba2cb8c9d0fc987aa8c3b4e9f1a2"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "b22efd8118fd5771a8e69be387ccff9f"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "d1423018129ea46eec66bffa2509bf3e"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "eb168244906f6ec7077ba8530a5e3054"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "fae14989896df369722db2915319ed48"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "79cebc8976fe45a5a51e0844ae208acd"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "8cf805774b84017652003bb9d9ae4f0c"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "cc86aa2303897cc8877b5c612ce7b477"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "d0d373fa11588e4c07aaac2a06272d46"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "49a6bc26e3c3dc0b7a53d5133b9e9e97"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "0a8df81a11f5b0502aa611f340905cb0"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "6036a57473931db120afd6b0446d3edb"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "f706c593e22b2d05bbca7c1fb99ca2a2"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "c01e838da2333a754043a9edb73c4475"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "ea980dad9e5ad74d9c33000113295115"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "01d8df3dbeb19556610d281ff5ad04db"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "8c5b8763a93cebbd7eb12a237678b911"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "779fd881ba662e91ff372007be137498"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "ef5771d4ce8d21c47fa3dc4f7b911c71"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "8fff7d8271b2cc67401c4e5a5abc8337"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "cfd076916e0b40503009638e176d9817"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "3f83ceb3cdb0088279bdd8f6277abbf9"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "61da07adad2da9bac00235cd5aa20174"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "d23742ba5781df9db2e7aedcb88b84ef"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "97939d18346cadd17fb1320fe7de7dc8"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "c921cef63b474e0df1035624a1a0adac"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "7a81e499495fb676e3af9d69088e0e41"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "b80ef746f19ec34dc53339c47f096a75"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "45da20ab99e191f9466176ad36bf5305"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "eb6c756572dcda6871f6ac2671cf4a57"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "f8c5dc7a98488d8be1471240332071c1"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "96abb049b0ce042ddec470d9de21be3c"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "a09ab522da3ceda89a12356fdb4d7624"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "5aed8681da0e94ac177bb2b6ffb5703d"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "5be42a16e7d0b2eda01bc4892988a113"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "83144e40c7445666baa784006213a6cc"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "95a9bde93186e9af86a5b47ccb7c8a7b"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "b8a4e6ca451d7f10d76422a84b48f7ef"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "bfbd4c323f17ef073e57f74754fa5606"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "496a64e09520453fcbfd9e89f005a678"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "2e5a28ca25817571f644571557feccb6"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "b1453c63a4e9f3fbc4ce151715f84f98"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "de3b048fe0744c289dbb876638be064f"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "f113adbbc854107646594186b68b0f68"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "0179323ac89e40e66913a853162bd0e6"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "4994b60b5911f67532f6f60df4ca8aa1"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "eb573a2f40f8ee6cd53c6eb9ebc3078d"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "0923ef1ffcefcf8522a25c2fe818f0de"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "bea5aa413f98dfc8cf0f94f0a419e16c"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "eb3f2548d360f6319dedd897ebc84704"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "da354903ba585d4370fce542d0ec7324"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "4e656d8a8bbedaee869a31885238d316"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "9b31ac9d3cc1b598b196f4553c08603c"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "d91bc19689716c50232ef96c0e2c4fdb"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "10cda4db848502d583c65386888b71b4"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "be394a39d95421cf271ffb6c7e6665aa"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "7fdccc1d4c87cc01b1930a04ffe448f0"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（第 1-5 章）/index.html",
    "revision": "ace9704076f266fa273fda611fdeed40"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "2117cb243f250b7d7d133b395aff40e3"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "48cfd3084ecbca13087818ab49735966"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "a4f44aa33bbedfdb8d1f3cc887d45c69"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "873adcd934e99e0c8849cd1050829f38"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "0129b0cacaedf6e6b119c4619d4107c0"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "87e5819f5c208efb8dbb6f05e13991b2"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "0489dec5580f892c0eb82940fd13eb03"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "2a49011b671b0724a8eb948ba725319c"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "400ee8b8c57d5d7442d3c62741e68995"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "50134cd8f5ced8edd15e2f9c07a4cd4d"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "883cf93016efad3d1f54777ccb8a10af"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "91dac4966056ecf5892dd3b0c3814213"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "a0a11f5099258b9a1942852cbd99ce1f"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "4ba512fefee240d311795630c0d71d84"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "47c3bfbef9a3831ca2d13785caf563be"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "c4cd749b0b0353e6cba57268dca0ff10"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "9aadaf7acad1a581dbc6889e13700b58"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "308be50202be5aeb3a24f3babce0f44f"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "1d33bc0ba8240fffa876c5cc3cd239fe"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "6a09789fe64616aad49ef4dce1a67150"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "f2d3eb9df0fcde2ef2bdc3e8b0dbc64c"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "97a12da5b5944cb43e1a29b29df295e4"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "cccf90cb4cc2b420f8064e67a5f81b4b"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "1d99ef328b19a3b1fd94e669026b1924"
  },
  {
    "url": "2021/02/22/《HTTP-权威指南》读书笔记（第-7-15、20-章）/index.html",
    "revision": "21350310cb21be6a4416a9ab4135a4ff"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "161bee2a0e7d37f213ea513a4eaa0073"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-6-章）/index.html",
    "revision": "11ad01d1f2cd8d0ebfbed504e8f15bdf"
  },
  {
    "url": "2021/03/27/《The-Rust-Programming-Language》读书笔记（第-7-11-章）/index.html",
    "revision": "95554043713dc20696b722ca5df59f38"
  },
  {
    "url": "2021/04/01/《The-Rust-Programming-Language》读书笔记（第-12-16-章）/index.html",
    "revision": "5a150b76d0d187246ffb902f338968ad"
  },
  {
    "url": "2021/04/08/《The-Rust-Programming-Language》读书笔记（第-17-21-章）/index.html",
    "revision": "36c9b8ed0773f8dbedc7f1a3e09299df"
  },
  {
    "url": "2021/04/13/《The-Rustonomicon》读书笔记/index.html",
    "revision": "d332b3692c407e2dd616af6553ee92cf"
  },
  {
    "url": "2021/04/22/Rust-and-WebAssembly/index.html",
    "revision": "6c833f6be9f56e852d24c6677c610035"
  },
  {
    "url": "2021/05/06/Rust-Runtime-与-ABI/index.html",
    "revision": "25d57b31a4eff3faefc1eec26b01419a"
  },
  {
    "url": "2021/05/10/JIT Compilation：理解与实现/index.html",
    "revision": "30fb632fe937a1a7857436074aa666b4"
  },
  {
    "url": "2021/05/11/GCC-下默认的对齐指针访问（Aligned-Memory-Access）/index.html",
    "revision": "a66b3f7d4d7461d5b88b2827254e4b10"
  },
  {
    "url": "2021/05/19/TLPI-读书笔记（第-1-2-章）/index.html",
    "revision": "920d59ba5b14aaaded8504a101942e09"
  },
  {
    "url": "2021/05/23/《垃圾回收算法与实现》读书笔记（第-6-9-章）/index.html",
    "revision": "7a8cd648c2bced7139fd6bbb7cd64e33"
  },
  {
    "url": "2021/09/25/《C-Primer-Plus-第六版》读书笔记/index.html",
    "revision": "dc4c95e85f028561f63e1138a2302cfb"
  },
  {
    "url": "2022/05/04/《CSS-权威指南（第四版）》读书笔记（第 1-6 章）/index.html",
    "revision": "60578e97768104d1ca68588fa37466ed"
  },
  {
    "url": "2022/05/28/《无伤跑法》读书笔记/index.html",
    "revision": "80e3f4cd5a4b779d76eee424910a8972"
  },
  {
    "url": "2022/06/11/《瞬间之美》内容要点小记/index.html",
    "revision": "fea7d289be26c3f4648786a8e4615b7c"
  },
  {
    "url": "2022/06/15/《CSS-权威指南（第四版）》读书笔记（第-7-13-章）/index.html",
    "revision": "ad051c2d2488f83cc2fc61153a50ac9c"
  },
  {
    "url": "2022/07/11/《CSS-权威指南（第四版）》读书笔记（第-14-20-章）/index.html",
    "revision": "c1d899e245e19aa6b41c50d494eb5a98"
  },
  {
    "url": "2022/09/21/张家界-长沙-海南环岛-10-日游攻略/index.html",
    "revision": "87c8c711891fd2155596c20a020d3075"
  },
  {
    "url": "2022/10/16/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-1-13-章）/index.html",
    "revision": "e754fee1ff81856c2e0daf4e730bcb53"
  },
  {
    "url": "2022/11/01/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-14-20-章）/index.html",
    "revision": "22800ead6ba7c4e66c6445b77bb6e4aa"
  },
  {
    "url": "2022/12/11/《Operating-Systems-Three-Easy-Pieces》读书笔记（第-21-28-章）/index.html",
    "revision": "494e5fe7b1213e02ea2a77e6f68c8b08"
  },
  {
    "url": "2023/02/15/Engineering-Manager-Cheat-Sheet/index.html",
    "revision": "c1553ea33f6ca64825e4493217e4f345"
  },
  {
    "url": "2023/03/06/《算法4》读书笔记（第-1-3-章）/index.html",
    "revision": "74bbab77914e970ee49de69327ddd6a7"
  },
  {
    "url": "2023/03/17/《创始人：新管理者如何度过第一个90天》读书笔记（第 1-4 章）/index.html",
    "revision": "4d3db92db9ac3c1c06c3552e88c7b400"
  },
  {
    "url": "2023/03/19/《创始人：新管理者如何度过第一个90天》读书笔记（第-5-10-章）/index.html",
    "revision": "af6cb459a5c85ca63f82f9b71ba01662"
  },
  {
    "url": "2023/03/23/x86-64-Instruction-Cheat-Sheet/index.html",
    "revision": "5af662d524c3d99a71cf711cb84f2bcb"
  },
  {
    "url": "2023/04/07/《乌合之众：群体心理学》摘录/index.html",
    "revision": "59fed1c1ec913e84942f1fa79864cf6b"
  },
  {
    "url": "2023/04/09/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-1-11-章）/index.html",
    "revision": "9e592327cfd10ce6c7a9cb2b9d678fe1"
  },
  {
    "url": "2023/05/11/与-AI-对话/index.html",
    "revision": "6d0577064f067f2dda34aae6a262f09d"
  },
  {
    "url": "2023/06/03/《x86-汇编语言：从实模式到保护模式（第2版）》读书笔记（第-12-20-章）/index.html",
    "revision": "0b2b621d996deb555e0ff5fc2bcb1119"
  },
  {
    "url": "2023/06/05/Nodejs-Internal/index.html",
    "revision": "4f0ad7238d0532766ea4403ce3ff980f"
  },
  {
    "url": "2023/06/18/《穿越计算机的迷雾（第2版）》读书笔记/index.html",
    "revision": "fc13a32d1e1650b6924ae41440d259e6"
  },
  {
    "url": "2023/07/04/《Unix-环境高级编程（第3版）》读书笔记（第-1-5-章）/index.html",
    "revision": "85c1803a5e35ecf58e5dc74d1262b465"
  },
  {
    "url": "2023/07/13/关于-C++-Stack-Unwinding-的一点记录/index.html",
    "revision": "b84e2e7efa75ff9017133c0705d5d477"
  },
  {
    "url": "2023/07/18/《Crafting-Interpreters》读书笔记（第 1-10 章）/index.html",
    "revision": "154bcb8d61f3f50dca678aae221a93bd"
  },
  {
    "url": "2023/09/04/《Crafting-Interpreters》读书笔记（第 11-30 章）/index.html",
    "revision": "b23db59904e8b620afe7ed818fa7ad92"
  },
  {
    "url": "2023/09/05/《人月神话》读书笔记/index.html",
    "revision": "cf576cdeaf89219ab537416be49e8790"
  },
  {
    "url": "2023/10/31/WebAssembly-Import-Export-Mutable-Globals-Proposal/index.html",
    "revision": "ce349534408dd8c3259b532c1a58e8e2"
  },
  {
    "url": "2023/11/01/WebAssembly-Multi-value-Extension/index.html",
    "revision": "42bf3b2ba6ca49d2683675ff5dd51645"
  },
  {
    "url": "2023/11/01/WebAssembly-Non-trapping-Float-to-int-Conversions/index.html",
    "revision": "83822a8775e9a91773ef6a1319f4c857"
  },
  {
    "url": "2023/11/01/WebAssembly-Sign-extension-operators/index.html",
    "revision": "1f64ee3c6d91381c64b4c1f11b6075ae"
  },
  {
    "url": "2023/11/02/WebAssembly-JavaScript-BigInt-to-WebAssembly-i64-integration/index.html",
    "revision": "ff23bbaceaa8dd749703b26528aafe15"
  },
  {
    "url": "2023/11/02/WebAssembly-Reference-Types/index.html",
    "revision": "3bac5d73d3535c39739939c886f770b6"
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
    "revision": "9c27ed994c3dbf959d7afa25044e9c0b"
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
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/10/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/11/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/12/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/13/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/14/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/15/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/16/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/17/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/18/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/19/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/2/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/20/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/21/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/22/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/23/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/24/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/25/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/26/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/27/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/3/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/4/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/5/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/6/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/7/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/8/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
  },
  {
    "url": "page/9/index.html",
    "revision": "e759a5929e4b0ca827df7d01850cab0f"
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
    "revision": "9d92a82d337b22849d849b284d9f1aac"
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
    "revision": "1843be325c1a98c4c97cd401f12703d2"
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
    "revision": "3431dd67e147bc919eaf6d9ec17f4239"
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
    "revision": "7541ae6fb00d38914914aa3fd5d32088"
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
    "revision": "e8ec4af78fc3fab2ea009858140dac4f"
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
