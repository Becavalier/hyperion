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
    "revision": "498cbf3226447e712d78e99d608dd7b6"
  },
  {
    "url": "2014/12/24/Android-以-Post-方式发送-Http-请求/index.html",
    "revision": "de71996407bc7bbff582bbbf403e435e"
  },
  {
    "url": "2014/12/25/简单理解-HTTP-协议/index.html",
    "revision": "6d04409620f94f06171bc49378ba7bea"
  },
  {
    "url": "2014/12/26/浅谈-SEO/index.html",
    "revision": "e1b7e5a1f0cea04225a108f2de043762"
  },
  {
    "url": "2014/12/27/简谈-JavaScript-中的数据类型/index.html",
    "revision": "b9a6d422cf13a9c0cbcd70e5275bb24f"
  },
  {
    "url": "2015/01/02/IT-行业的入门与精通/index.html",
    "revision": "e0f609b4b7cfed1e9e384079d5932cf3"
  },
  {
    "url": "2015/01/04/RSS-概述/index.html",
    "revision": "f9b12bdb3f9ccff2b2440072a6d19428"
  },
  {
    "url": "2015/01/06/深夜吐槽-笔试与企业文化/index.html",
    "revision": "9b99fde7e7040794c2e92f219f498ae7"
  },
  {
    "url": "2015/01/11/博客正式使用“知识共享-CC”国际协议/index.html",
    "revision": "f95f4170a6c337422ae0de88ee3d8c20"
  },
  {
    "url": "2015/01/12/Prism-js-在-AJAX-下的应用问题/index.html",
    "revision": "6a01b462feba28d7be935f004705ffd2"
  },
  {
    "url": "2015/01/26/编码与“锟斤拷”的故事/index.html",
    "revision": "f0287445f861063824a3feaf2e568a77"
  },
  {
    "url": "2015/02/13/event-target-与-event-srcElement/index.html",
    "revision": "7ca684004c35464af2f67edc5613e1b1"
  },
  {
    "url": "2015/02/18/JavaScript-浏览器自动化/index.html",
    "revision": "6df24033166b49f0623819a6859f274b"
  },
  {
    "url": "2015/03/12/利用-ab-命令进行简单压测/index.html",
    "revision": "c8b66c1cb79021476b8ec917b395b82f"
  },
  {
    "url": "2015/03/20/基于-PHP-实现的优化盐值加密算法/index.html",
    "revision": "aec87d892ace8118b2f0fc09025641c5"
  },
  {
    "url": "2015/03/22/为-Swing-控件-JList-动态添加元素/index.html",
    "revision": "460150534a7aa6e2fe0d4f77948aae6d"
  },
  {
    "url": "2015/03/22/图像扫描及-OCR-技术开发-SDK-Asprise/index.html",
    "revision": "bd87583d9ab6cb9478e8c9c865a36574"
  },
  {
    "url": "2015/03/24/Git-你需要具备的基础知识/index.html",
    "revision": "8c7f29d963f54264fe3632cdf7005af7"
  },
  {
    "url": "2015/07/21/GeekBank-C-线下班学习心得（一）/index.html",
    "revision": "c85de091937daab35ebd63c70b1df5fc"
  },
  {
    "url": "2015/07/25/GeekBank-C-线下班学习心得（二）/index.html",
    "revision": "22b29e179ad676208b392cf818096a84"
  },
  {
    "url": "2015/08/01/GeekBank-C-线下班学习心得（三）/index.html",
    "revision": "f396644164390f40591da1544bef0939"
  },
  {
    "url": "2015/08/11/浅谈-CORS：跨域资源共享/index.html",
    "revision": "4accf18bc28ba259fffb340c0f8a4f48"
  },
  {
    "url": "2015/08/12/不得不防范的-iframe-非法嵌入/index.html",
    "revision": "07d612362c2f7087c62a9f2e0442c1bf"
  },
  {
    "url": "2015/11/08/SVG-技术之-路径/index.html",
    "revision": "861b533d358d0f8800ca4263364a5a77"
  },
  {
    "url": "2015/11/24/前端那些事儿-表单域的-MIME-编码/index.html",
    "revision": "cdc0afbc5f8d5a35e40058572abd254d"
  },
  {
    "url": "2015/11/30/前端那些事儿-JavaScript-函数之-IIFE/index.html",
    "revision": "f1a07dbb42875f3b113ca4ce6798e4c5"
  },
  {
    "url": "2016/01/06/前端那些事儿-三字节-BOM-头/index.html",
    "revision": "ba6bfda509e7d3dc852caa8b99ba8e17"
  },
  {
    "url": "2016/01/08/ECMAScript6-新特性-迭代器和-for-of-循环/index.html",
    "revision": "585653c1f75851cffb441aa83ab7dd24"
  },
  {
    "url": "2016/02/09/前端那些事儿-Console-对象/index.html",
    "revision": "8fb20b3d77d135795dcc13c720dfeba8"
  },
  {
    "url": "2016/02/12/技术是成功的“绊脚石”/index.html",
    "revision": "59327ba61c8400549b08eeaf2b17ab96"
  },
  {
    "url": "2016/02/19/UCS-2-编码的妙用/index.html",
    "revision": "f0d5119b09d8f1e41106774b13695db7"
  },
  {
    "url": "2016/03/16/LAMP-架构之升级-PHP-版本/index.html",
    "revision": "bcb0066380545f4735f5c77e3437a3d6"
  },
  {
    "url": "2016/03/20/Java-基础语法特性记录/index.html",
    "revision": "c47d353ab790166517a10ead97edab01"
  },
  {
    "url": "2016/03/26/JavaScript-核心特性揭秘（一）/index.html",
    "revision": "4fcdbc029a4d97665e737459eb36612c"
  },
  {
    "url": "2016/03/29/JavaScript-核心特性揭秘（二）/index.html",
    "revision": "04a3cbc3adf3ee66cbcacbb4fca66512"
  },
  {
    "url": "2016/04/03/JavaScript-核心特性揭秘（三）/index.html",
    "revision": "c95345ce4b9ba1df4c28bc3fbf040cbb"
  },
  {
    "url": "2016/04/09/五分钟算法-二分法查找（Binary-Search）/index.html",
    "revision": "aa0f7e263c01c6eff5a7741a956b1390"
  },
  {
    "url": "2016/04/11/LeetCode-每日一题-1-Two-Sum/index.html",
    "revision": "c329510302ed1bf05425e54b95fd8c6f"
  },
  {
    "url": "2016/04/12/LeetCode-每日一题-283-Move-Zeroes/index.html",
    "revision": "0e22d9644ac9f26135637b5dc05c36c7"
  },
  {
    "url": "2016/04/13/LeetCode-每日一题-217-Contains-Duplicate/index.html",
    "revision": "177cce19a0be5f3270867e743ff7eeaa"
  },
  {
    "url": "2016/04/14/LeetCode-每日一题-219-Contains-Duplicate-II/index.html",
    "revision": "cf3f2cdbfd956fab1940f5dfc08bf560"
  },
  {
    "url": "2016/04/16/LeetCode-每日一题-169-Majority-Element/index.html",
    "revision": "9154331ee37bdb9f3c7a1f2ae560e9f6"
  },
  {
    "url": "2016/04/17/LeetCode-每日一题-121-Best-Time-to-Buy-and-Sell-Stock/index.html",
    "revision": "3efc0b5e2f4d516ee2cf16f35a336ab6"
  },
  {
    "url": "2016/04/19/LeetCode-每日一题-189-Rotate-Array/index.html",
    "revision": "d62463a8e28c8e98d9e6164c46bda59a"
  },
  {
    "url": "2016/04/20/LeetCode-每日一题-70-Climbing-Stairs/index.html",
    "revision": "45c2e54c2548fb34326e645be7e565ee"
  },
  {
    "url": "2016/04/21/LeetCode-每日一题-168-Excel-Sheet-Column-Title/index.html",
    "revision": "ae3dbe77a8d3395095a88a87b301dfb9"
  },
  {
    "url": "2016/04/25/LeetCode-每日一题-342-Power-of-Four/index.html",
    "revision": "56cb639127dc49a248c0176c0c11ee5c"
  },
  {
    "url": "2016/05/05/LeetCode-每日一题-344-Reverse-String/index.html",
    "revision": "9a7c2c2f3c9c898d1957ded34887754c"
  },
  {
    "url": "2016/05/06/LeetCode-每日一题-258-Add-Digits/index.html",
    "revision": "21d3bd2b44d01c0d5bf0c4d04ebffc4c"
  },
  {
    "url": "2016/05/08/LeetCode-每日一题-6-ZigZag-Conversion/index.html",
    "revision": "1ae41ec8d860959506fc9771ee46a95c"
  },
  {
    "url": "2016/05/10/LeetCode-每日一题-7-Reverse-Integer/index.html",
    "revision": "da1e540eeb7c436d46db8df5644b7597"
  },
  {
    "url": "2016/05/12/LeetCode-每日一题-9-Palindrome-Number/index.html",
    "revision": "8905b630e42b9a8d99801c6183ce832f"
  },
  {
    "url": "2016/05/12/前端那些事儿-URL-对象/index.html",
    "revision": "8550e5ba9841b185d608a075708dab3c"
  },
  {
    "url": "2016/05/24/LeetCode-每日一题-27-Remove-Element/index.html",
    "revision": "b015cc92858c4d3a271f959ccc462a67"
  },
  {
    "url": "2016/06/15/LeetCode-每日一题-203-Remove-Linked-List-Elements/index.html",
    "revision": "9c5231a8b2f32407f32a88f5554a3976"
  },
  {
    "url": "2016/06/16/LeetCode-每日一题-136-Single-Number/index.html",
    "revision": "9b5aa5747c6431f120dff5a0a26246ee"
  },
  {
    "url": "2016/07/07/LeetCode-每日一题-100-Same-Tree/index.html",
    "revision": "1c5309987625ef4703695dc15670024c"
  },
  {
    "url": "2016/07/14/Linux-后台运行任务/index.html",
    "revision": "c18d3195c5fd8f8c9125d8a58f529ff7"
  },
  {
    "url": "2016/07/16/设计模式速谈：一、序论/index.html",
    "revision": "9a74742402276b765ed89ea3414195d2"
  },
  {
    "url": "2016/07/17/设计模式速谈：二、简单工厂模式/index.html",
    "revision": "80a35793262fbe18a0a72699c0bc0c3a"
  },
  {
    "url": "2016/07/19/设计模式速谈：三、工厂模式/index.html",
    "revision": "457567d03da3ffa763a86f185a1e07db"
  },
  {
    "url": "2016/07/21/设计模式速谈：四、抽象工厂模式/index.html",
    "revision": "c6061c7583976573e83c839a549b424b"
  },
  {
    "url": "2016/07/23/设计模式速谈：五、建造者模式/index.html",
    "revision": "71d46674e39a288d76787df241da9725"
  },
  {
    "url": "2016/07/25/设计模式速谈：六、单例模式/index.html",
    "revision": "16bec0d3cca52ca8604eab9ea42d5118"
  },
  {
    "url": "2016/07/27/HTML5-随记录/index.html",
    "revision": "198a04bb8e2e5d52f070cd1709876c16"
  },
  {
    "url": "2016/08/16/基于-AWS-探索-Shadowsocks/index.html",
    "revision": "92b02e424d187c19d466a59b41b61557"
  },
  {
    "url": "2016/09/16/Zoomage-js-正式版-V1-0-0-核心原理介绍/index.html",
    "revision": "0e3e70f98b575d28201ea8baff968e71"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-104-Maximum-Depth-of-Binary-Tree/index.html",
    "revision": "b307005b000701f493dafc9550276fa9"
  },
  {
    "url": "2016/09/17/LeetCode-每日一题-58-Length-of-Last-Word/index.html",
    "revision": "6ceecfbe86c59046b8da6331e04485ec"
  },
  {
    "url": "2016/09/18/算法基础-常用排序算法（上）/index.html",
    "revision": "76df325a625dad5d5bb4a1db3cb3da43"
  },
  {
    "url": "2016/12/09/前端关键技术点杂烩/index.html",
    "revision": "fdf47c1fd0673fb19e3fcad460c4e8ef"
  },
  {
    "url": "2016/12/13/前端常见技术点-CSS-DOM-布局/index.html",
    "revision": "a9aef411bffa54fa7847bfde9eabeb9e"
  },
  {
    "url": "2016/12/13/前端常见技术点-HTML/index.html",
    "revision": "b3fc58bb1a4bbafc3356c113e6820b86"
  },
  {
    "url": "2016/12/13/前端常见技术点-JavaScript/index.html",
    "revision": "00722b676f80ca028b6c66ac656d3973"
  },
  {
    "url": "2016/12/14/前端项目规划与团队管理/index.html",
    "revision": "5a0f02395ab31d7de9b52164fd4cae96"
  },
  {
    "url": "2016/12/15/CSS-常用布局解决方案/index.html",
    "revision": "1ca4bbb33076c992048da0053689767f"
  },
  {
    "url": "2016/12/18/ES-6-ES-2015-常用知识点归纳/index.html",
    "revision": "b548685938dbf34ccd0ce730c1d9cc4f"
  },
  {
    "url": "2016/12/22/Promise-浅谈/index.html",
    "revision": "51737f4d2916b61ad5215ad62412a1fa"
  },
  {
    "url": "2016/12/29/jQuery-源码江湖-初入江湖/index.html",
    "revision": "f2a26e883b1672a31be133302ca553f7"
  },
  {
    "url": "2017/01/16/2017-开篇/index.html",
    "revision": "80f86e3f016df011578ad787607cec6c"
  },
  {
    "url": "2017/01/29/CentOS-7-2-之-MySQL-到-MariaDB-的迁移/index.html",
    "revision": "7a03f5a1323e389a9454e2ec8f67e16b"
  },
  {
    "url": "2017/02/28/Promise-A-调用详谈/index.html",
    "revision": "0e513823167ce69ae41d51067529135f"
  },
  {
    "url": "2017/03/09/HTTP-基础整理/index.html",
    "revision": "be84f08be9318e39eed99de333759db3"
  },
  {
    "url": "2017/03/21/一道面试题的思考/index.html",
    "revision": "66b534b34ff9154c1010fa8f55910b03"
  },
  {
    "url": "2017/03/23/URL-编码的那些事儿/index.html",
    "revision": "9ba1cdebb8006f3e23ad2bcd86553ca5"
  },
  {
    "url": "2017/04/22/机器学习记录-简介/index.html",
    "revision": "65400c5c59eca55d774c28924a7d15ba"
  },
  {
    "url": "2017/04/24/BigPipe-原理实现与使用场景分析/index.html",
    "revision": "5957f508f517694c5ba9c88f9cfe7a56"
  },
  {
    "url": "2017/04/26/淘宝网的-BigRender/index.html",
    "revision": "62766d1f3a0a3f586d971ec24706b0ea"
  },
  {
    "url": "2017/04/29/《大型网站技术架构 - 核心原理与案例分析》读书笔记/index.html",
    "revision": "87e853ed75865a69766a1c217fa0f2af"
  },
  {
    "url": "2017/05/06/STC-与-PTC/index.html",
    "revision": "e34e9a23b1ce726c41c442024c39dad7"
  },
  {
    "url": "2017/05/08/“函数柯里化”常见使用场景记录/index.html",
    "revision": "6ea178607565cefb9f016e477678b885"
  },
  {
    "url": "2017/05/08/前端-DCE-策略之-—-Tree-Shaking/index.html",
    "revision": "13f86f9584ff6be90f8d80c696f26db6"
  },
  {
    "url": "2017/05/16/常用-Shell-知识点和技巧/index.html",
    "revision": "2554babec40d96790958595d53455e0e"
  },
  {
    "url": "2017/05/18/PureRenderMixin-immutable-js-提高-VDOM-渲染效率/index.html",
    "revision": "dcc5d7ff79401b818123a8e5636c85da"
  },
  {
    "url": "2017/05/26/基于-NumPy-和-TensorFlow-的简单-KNN-实现/index.html",
    "revision": "88bbc081b8b30a2522c3cf0ece3aa6e1"
  },
  {
    "url": "2017/06/09/WebAssembly-尝试研究报告（一）/index.html",
    "revision": "7addb515cd23b9aca7be2766a220d850"
  },
  {
    "url": "2017/06/10/WebAssembly-尝试研究报告（二）/index.html",
    "revision": "447c483981ce078d3a2af0cb103181a6"
  },
  {
    "url": "2017/06/11/WebAssembly-尝试研究报告（三）/index.html",
    "revision": "f805941c52e3f46037c9fa0ddcb35076"
  },
  {
    "url": "2017/06/13/WebAssembly-尝试研究报告-错误处理/index.html",
    "revision": "a9820ac5481cd71b6197f8e73c83af15"
  },
  {
    "url": "2017/06/14/WebAssembly-尝试研究报告-API-之初始化、内存和表的分配/index.html",
    "revision": "705da14d0bdc47a4e555ab6e384fee8f"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-DIP-实践/index.html",
    "revision": "99e3fdbcd774154776df97e40dfb0d03"
  },
  {
    "url": "2017/06/16/WebAssembly-尝试研究报告-本地存储与转移/index.html",
    "revision": "b026654883e190386f2c760e8628ef3e"
  },
  {
    "url": "2017/06/20/WebAssembly-深入研究报告-二进制编码/index.html",
    "revision": "38cbd8f5dfc14f65859e435cdec67e85"
  },
  {
    "url": "2017/06/28/WebAssembly-深入研究报告-安全性/index.html",
    "revision": "3b7100c7f6d54487b34ef00db97caf2c"
  },
  {
    "url": "2017/06/29/Common-Lisp-全记录（一）/index.html",
    "revision": "c3e9d14ddd29c111bd8bfd9bc8c728e2"
  },
  {
    "url": "2017/06/29/Mac-配置-Commom-Lisp-开发环境/index.html",
    "revision": "c6a1fe2d8b6cd6dccbeac8c55d04b03f"
  },
  {
    "url": "2017/07/06/ES-8-新特性一览/index.html",
    "revision": "5b98995053c80208bb6c2362655fdf8a"
  },
  {
    "url": "2017/07/06/使用-Noteflight-来快速作曲和-MusicXML-导出/index.html",
    "revision": "4276c4b0886b39c8728f3ced8abdf226"
  },
  {
    "url": "2017/07/13/Python-小记/index.html",
    "revision": "e0ea3815357e7ba239b86046d8910774"
  },
  {
    "url": "2017/07/19/WebAssembly-深入研究报告-碎片知识/index.html",
    "revision": "74cc9765d8cb2959f10b23e5a6750d19"
  },
  {
    "url": "2017/07/20/Python-高级用法/index.html",
    "revision": "01ca7f3b89a5e80c72bd3dfff9df727b"
  },
  {
    "url": "2017/08/22/Redis-源码之内存管理-zmalloc-zfree/index.html",
    "revision": "baac6a556546f60035d18cb76c960834"
  },
  {
    "url": "2017/09/02/C-小记录/index.html",
    "revision": "776577c590df2247615a8180fc662b70"
  },
  {
    "url": "2017/09/04/大数据基础架构概述/index.html",
    "revision": "48e760900bec8d111ca7915c3aaa4a64"
  },
  {
    "url": "2017/09/07/V8-内存优化之-Ignition-解释器/index.html",
    "revision": "936da815fa21eafd7d624ffb954d06bd"
  },
  {
    "url": "2017/09/30/一种新的共享计算力模式/index.html",
    "revision": "528678a04f6e8173ce443c802934d11e"
  },
  {
    "url": "2017/11/04/Docker-最佳实践（一）/index.html",
    "revision": "6a5c48cde44cfc7541c7c302eff33920"
  },
  {
    "url": "2017/11/07/Docker-最佳实践（二）/index.html",
    "revision": "640a6943c1963f198fdf5b0224715c8f"
  },
  {
    "url": "2017/11/09/Docker-最佳实践（三）/index.html",
    "revision": "357bfe60aa86b430401b450105501ce8"
  },
  {
    "url": "2017/11/12/The-Twelve-Factor-App/index.html",
    "revision": "b80a52d4aaedf4da1084cdcfdeeeb9e3"
  },
  {
    "url": "2017/12/17/Web-新时代与挑战/index.html",
    "revision": "7f7d23f32286f386d176fed33a386528"
  },
  {
    "url": "2018/01/08/Flush-Reload-Attack-与-Meltdown/index.html",
    "revision": "3ac44e8f97d8072b2e247359e1c05478"
  },
  {
    "url": "2018/11/01/我的新书《深入浅出-WebAssembly》出版啦-｡･ω･｡-ﾉ/index.html",
    "revision": "7f390f6a9e12a85ff59eda00b520edc4"
  },
  {
    "url": "2018/11/29/Git-最佳实践/index.html",
    "revision": "98be940b271d159cda8259bd9defa4d9"
  },
  {
    "url": "2019/01/05/“增长黑客：创业公司的用户与收入增长秘籍” 读书笔记/index.html",
    "revision": "2931450f95812ef09780f1bbb99f7223"
  },
  {
    "url": "2019/01/07/“零售的哲学”-读书笔记/index.html",
    "revision": "84f645bb67725aea0f6c1afaf38606e7"
  },
  {
    "url": "2019/01/08/“阿米巴经营”-读书笔记/index.html",
    "revision": "168add3d6df4a97138fbfbf38e065004"
  },
  {
    "url": "2019/01/14/“重新定义团队：谷歌如何工作”-读书笔记/index.html",
    "revision": "a72b6108e203736abcd64e1ed8879de0"
  },
  {
    "url": "2019/02/14/日本樱花季游攻略/index.html",
    "revision": "45e3e9ec80c103a48d8f7a6a5a65ac38"
  },
  {
    "url": "2019/02/28/今日商业评论—瑞幸咖啡VS星巴克，如何互补？/index.html",
    "revision": "1fafbb1a8b34a2cdce57b26560251b2b"
  },
  {
    "url": "2019/03/03/GraphQL-设计艺术/index.html",
    "revision": "1c38734eabce1b1766a151cac8112306"
  },
  {
    "url": "2019/03/10/记：阿里-2019-本地生活黑客松决赛/index.html",
    "revision": "db7a8066f0a0885f85a56bdec56187bf"
  },
  {
    "url": "2019/03/17/女装之路-完全大揭秘/index.html",
    "revision": "ab0b12b24624a237f18f87a3e5e86205"
  },
  {
    "url": "2019/03/30/初聊风险投资（VC）/index.html",
    "revision": "0ca9b9de4f7f244a8d5063c4c27393c8"
  },
  {
    "url": "2019/04/10/浅谈前端代码加密/index.html",
    "revision": "f39b9d817a09d9d73df648b1705ace75"
  },
  {
    "url": "2019/04/21/FCC-China-DevTalk-访谈实录/index.html",
    "revision": "16d14b95e824e8913b8f83bb69dd64ed"
  },
  {
    "url": "2019/04/26/React-知识点整理/index.html",
    "revision": "94170fe71f97d186cc7f8151a8c654af"
  },
  {
    "url": "2019/04/30/基本算法概括/index.html",
    "revision": "df450d4a428504abdf01396f9897ab45"
  },
  {
    "url": "2019/07/11/Frequently-used-TOEFL-oral-short-sentences/index.html",
    "revision": "9ff0b61c838b16911ad1a6c63ee221ec"
  },
  {
    "url": "2019/07/13/浅谈技术人员资产增值/index.html",
    "revision": "deb1b1b83816108f649f7f29ee6bded2"
  },
  {
    "url": "2019/08/23/54th-day-at-PayPal/index.html",
    "revision": "8fbcedad73f47d3bce89ca68e3eafb6d"
  },
  {
    "url": "2019/08/31/C-11-好用的新语法特性/index.html",
    "revision": "b3558954979c5c755aa07aefeb1778f8"
  },
  {
    "url": "2019/08/31/C-左值、右值与右值引用/index.html",
    "revision": "c96a4751ef9b5c876791b1e5955f9e7a"
  },
  {
    "url": "2019/09/01/C-编译器优化之-RVO-与-NRVO/index.html",
    "revision": "20b1b377735f4f15e001b1c6cd765cf2"
  },
  {
    "url": "2019/09/09/JavaScript-杂记：全等、indexOf-语义与-Membrane/index.html",
    "revision": "23c1b0027bae12fbc05dba52d03543bc"
  },
  {
    "url": "2019/09/13/Privacy-Policy-for-TOVD/index.html",
    "revision": "a9b1e63c2e79ee1a3aa4511de63e7838"
  },
  {
    "url": "2019/09/16/English-key-Points-Conclusion-1/index.html",
    "revision": "ca68ca00f8de5ba7d2b135836336c78c"
  },
  {
    "url": "2019/10/11/SICP-计算机程序的构造和解释（一）/index.html",
    "revision": "eac4b210fda171fe8dd1899fd8f330e7"
  },
  {
    "url": "2019/10/14/浅谈企业股权设计/index.html",
    "revision": "550eb450b5b66b5457fb58694bbf6bea"
  },
  {
    "url": "2019/11/22/C-中的移动构造与-noexcept/index.html",
    "revision": "e57e26c30b5999b0ac536cad134c6a55"
  },
  {
    "url": "2019/11/22/C-编码准则之-“The-Rule-of-Three”/index.html",
    "revision": "1ee2adaa2f9173629c34c7a345e44aa5"
  },
  {
    "url": "2020/03/11/WebAssembly-Summit-2020-—-议题深度解析（上）/index.html",
    "revision": "ea0bf4f7b18da671af705eafd63d7bef"
  },
  {
    "url": "2020/03/12/WebAssembly-Summit-2020-—-议题深度解析（下）/index.html",
    "revision": "5989db2499acc250aa764bf76d6457c3"
  },
  {
    "url": "2020/04/10/Primer-C-完全笔记（第 1-8 章）/index.html",
    "revision": "c2809a1819d070633eb825188f14d009"
  },
  {
    "url": "2020/04/12/Primer-C-完全笔记（第 9-13 章）/index.html",
    "revision": "2d13994098868304d401fedb2ba54900"
  },
  {
    "url": "2020/04/14/Primer-C-完全笔记（第 14-16 章）/index.html",
    "revision": "74da905b06187f7ea99401b9bbd7b51d"
  },
  {
    "url": "2020/04/16/Primer-C-完全笔记（第 17-19 章）/index.html",
    "revision": "6bc8b5f67653d434fe68ec178468c22b"
  },
  {
    "url": "2020/04/24/常用-C-高效开发范式（一）/index.html",
    "revision": "65b0011b4612729dcc38385cb42f9a3a"
  },
  {
    "url": "2020/04/26/C-未限定名字查找与-ADL/index.html",
    "revision": "0c7e6479e61e5ff921246aa091c97b44"
  },
  {
    "url": "2020/04/26/常用-C-高效开发范式（二）/index.html",
    "revision": "cafbf25705f1b351e28e81168f3807c4"
  },
  {
    "url": "2020/04/27/C-空基类优化（EBO）与私有继承/index.html",
    "revision": "4ac37b1fe291342beb440f94f7379002"
  },
  {
    "url": "2020/05/06/C-聚合类与-POD/index.html",
    "revision": "02b1e54d22c03a1dc39e1e2758746e26"
  },
  {
    "url": "2020/05/09/“深入理解-C-11：C-11-新特性解析与应用” 读书笔记（一）/index.html",
    "revision": "7dd3e60b6f498d2d73c3f212cb9168f7"
  },
  {
    "url": "2020/05/12/“深入理解-C-11：C-11-新特性解析与应用”-读书笔记（二）/index.html",
    "revision": "16fc1620861f8d122e8e33bbb86c13a7"
  },
  {
    "url": "2020/05/14/Effective-Modern-C-读书笔记（一）/index.html",
    "revision": "cba82660c67095f937ba62bbf7b46542"
  },
  {
    "url": "2020/05/23/Effective-Modern-C-读书笔记（二）/index.html",
    "revision": "5c556f267dc1003e8471a538dd56c98f"
  },
  {
    "url": "2020/05/24/C-字符串拷贝优化策略：Eager-Copy、SSO-与-COW/index.html",
    "revision": "df94336a4d10a0905e51f0b96c6076d9"
  },
  {
    "url": "2020/05/25/C-17-部分新特性一览/index.html",
    "revision": "833098e1ab6fe0c0ee9a1da3569d03ec"
  },
  {
    "url": "2020/05/28/“组件协作类”设计模式（C-）/index.html",
    "revision": "79c6cc92a7cf850ccce2dd3d36f78cff"
  },
  {
    "url": "2020/05/29/“单一职责类”设计模式（C-）/index.html",
    "revision": "43af5472a52b90b89e1829f0568d4724"
  },
  {
    "url": "2020/06/01/“对象创建类”设计模式（C-）/index.html",
    "revision": "bde73db623141e46494c27d800252c3e"
  },
  {
    "url": "2020/06/02/“对象性能类”设计模式（C-）/index.html",
    "revision": "a55fd810bbfd0f9db7bb73994f46fa49"
  },
  {
    "url": "2020/06/03/“接口隔离类”设计模式（C-）/index.html",
    "revision": "9c5609a59b9eb5d89ba880000670c43e"
  },
  {
    "url": "2020/06/04/“状态变化类”设计模式（C-）/index.html",
    "revision": "fc800dc2b69cadfd620fd9b78ffb00b6"
  },
  {
    "url": "2020/06/07/“数据结构类”设计模式（C-）/index.html",
    "revision": "8d25d3b744effacae8a140fd334317c6"
  },
  {
    "url": "2020/06/08/“行为变化类”设计模式（C-）/index.html",
    "revision": "d347b723fcaf0b919c0c36dbb41050a8"
  },
  {
    "url": "2020/06/08/“领域规则类”设计模式（C-）/index.html",
    "revision": "1b083139aff9cff7e5e1477c340abb5b"
  },
  {
    "url": "2020/06/16/链接、装载与库相关记录（第 1-6 章）/index.html",
    "revision": "5b27fecf52907bbf373adf9b39d6e54c"
  },
  {
    "url": "2020/06/17/Linux 下的 ELF 完整结构分析/index.html",
    "revision": "04662c15d10a6916212b9799a396b24b"
  },
  {
    "url": "2020/06/17/使用-objcopy-为-ELF-加入自定义-Section/index.html",
    "revision": "679ee86c6edf8ad8fc2fcaf729c67db5"
  },
  {
    "url": "2020/06/18/Clang-下的-weak-与-weakref/index.html",
    "revision": "8008d012fe4d6b24bf0fe0b890a7df4d"
  },
  {
    "url": "2020/06/18/ELF-静态-动态链接流程解析/index.html",
    "revision": "7af99895ee8ea115714d06405ba9eb73"
  },
  {
    "url": "2020/06/19/GCC-下的-COMMON-块控制/index.html",
    "revision": "e558015f1b00ab53debc4eb513dc2a54"
  },
  {
    "url": "2020/06/19/ld-链接控制脚本与默认脚本/index.html",
    "revision": "014e4423e7ddc983439abc8b31f369e5"
  },
  {
    "url": "2020/06/19/尝试构建体积最小的-ELF-可执行程序/index.html",
    "revision": "2075db31459f6e7505e0dbb977ce47e4"
  },
  {
    "url": "2020/06/21/链接、装载与库相关记录（第 7-12 章）/index.html",
    "revision": "3900e6df038cafce085448e1af2dd742"
  },
  {
    "url": "2020/06/23/Linux-共享库应用-version-script/index.html",
    "revision": "2423fec79e8570e73f4aae7d3f14ec1f"
  },
  {
    "url": "2020/06/25/“Low-Level-Programming”-读书笔记（第 1-4 章）/index.html",
    "revision": "4ab35034245294baac35d3131da74e3a"
  },
  {
    "url": "2020/06/25/NASM-小记录/index.html",
    "revision": "4ee7c5a7b9bb1ca04981c09067c769ed"
  },
  {
    "url": "2020/06/26/“Advanced-Design-and-Implementation-of-Virtual-Machines”-读书笔记（一）/index.html",
    "revision": "ecb34effd343e325afb7d9e8d22834bb"
  },
  {
    "url": "2020/06/29/“Low-Level-Programming”-读书笔记（第 5-13 章）/index.html",
    "revision": "1840f4dcfb842f3347b7f92e332f9b9b"
  },
  {
    "url": "2020/07/06/“Low-Level-Programming”-读书笔记（第 14-17 章）/index.html",
    "revision": "823f36c29fe28ef12bc7ad9bfc282235"
  },
  {
    "url": "2020/07/11/std-optional-与-Optional-References/index.html",
    "revision": "74f930776b7702d7bc22fc8a27928a3e"
  },
  {
    "url": "2020/07/15/《虚拟机系统与进程的通用平台》基础概述/index.html",
    "revision": "cb3db17bcd56aa44d6b76f869ca5181d"
  },
  {
    "url": "2020/07/18/老生常谈之：switch-case-VS-if-else/index.html",
    "revision": "8de064386810d43fcfe5cb714f97aca9"
  },
  {
    "url": "2020/07/22/《C-17-STL-Cookbook》读书笔记（第 1-2 章）/index.html",
    "revision": "6289facb00c600d0f4a1766d97b72d9d"
  },
  {
    "url": "2020/07/28/《C-17-STL-Cookbook》读书笔记（第 3-4 章）/index.html",
    "revision": "5af6dfaaadd5c1ada4b411ff17b01f40"
  },
  {
    "url": "2020/07/31/《C-17-STL-Cookbook》读书笔记（第 5-7 章）/index.html",
    "revision": "b818cbc2e58250737183a145f25cb22f"
  },
  {
    "url": "2020/08/06/《C-17-STL-Cookbook》读书笔记（第 8-10 章）/index.html",
    "revision": "ce9d84d3271803b8dd5b417453582878"
  },
  {
    "url": "2020/08/06/CRTP-与常见用例/index.html",
    "revision": "9f81a14e653af2fede1f7d2e1109c70d"
  },
  {
    "url": "2020/08/07/vtable-与-vptr/index.html",
    "revision": "8587ba2a4f1214e6c84b3df1ac41b065"
  },
  {
    "url": "2020/08/09/ASM-js-标准草案分析（18-August-2014）/index.html",
    "revision": "ef4516dfbb129e980badbd97a069306d"
  },
  {
    "url": "2020/08/17/C-20-The-Big-Four/index.html",
    "revision": "08c5e1a86c79cdd1c0229e8d2fa54688"
  },
  {
    "url": "2020/08/18/C-Dependent-Names、non-ADL-以及-ADL-查找/index.html",
    "revision": "95076cdd6b5054bda87b81369856f4dc"
  },
  {
    "url": "2020/08/18/Wasm3-架构剖析/index.html",
    "revision": "bb1e3bbf650da80c9a8ea6e04b940fc2"
  },
  {
    "url": "2020/08/21/Threaded-Code/index.html",
    "revision": "21a35f33a8c78b00f68dbb62cce28880"
  },
  {
    "url": "2020/08/24/常用-Threading-Models-的伪代码示例/index.html",
    "revision": "d8478feb3a2db27c6a7783fded02ecdd"
  },
  {
    "url": "2020/08/25/WebAssembly-Weekly-集合整理（2020-08）/index.html",
    "revision": "a6a603325944250d26f00d4875051b6d"
  },
  {
    "url": "2020/10/05/《垃圾回收算法与实现》读书笔记（一）/index.html",
    "revision": "34a200a5d7979bddd3fedcd92954fdcc"
  },
  {
    "url": "2020/10/19/《Pro-Git-2nd-Edition》读书笔记（第 1-6 章）/index.html",
    "revision": "13ba7678a8b26753c3f77c320fd1ddf4"
  },
  {
    "url": "2020/11/02/《Pro-Git-2nd-Edition》读书笔记（第 7-10 章）/index.html",
    "revision": "4513fb6e2647d17916e48d9a8ccb8b63"
  },
  {
    "url": "2020/11/05/《现代-C-教程：高速上手-C-11-14-17-20》读书笔记/index.html",
    "revision": "e510c593b0d8197e7c641af54251b70f"
  },
  {
    "url": "2020/11/11/《X86-X64-体系探索及编程》读书笔记/index.html",
    "revision": "698fa267c9b4de9d09929de64310c4d4"
  },
  {
    "url": "2020/11/13/《CSAPP-第三版》读书笔记（第 1-3 章）/index.html",
    "revision": "902c51313cbfe42cff9abc3b72de4058"
  },
  {
    "url": "2020/11/23/《CSAPP-第三版》读书笔记（第-4-5-章）/index.html",
    "revision": "2773834fff0663d3907488cd4729b2ef"
  },
  {
    "url": "2020/11/30/《CSAPP-第三版》读书笔记（第-6-8-章）/index.html",
    "revision": "83e6e16002c5ff0d21d0ddfe336ebde1"
  },
  {
    "url": "2020/12/04/《CSAPP-第三版》读书笔记（第-9-12-章）/index.html",
    "revision": "71bff47ecb747e697244a8639b11d9ee"
  },
  {
    "url": "2020/12/08/《JavaScript-语言精髓与编程实践（第三版）》读书笔记（第-1-3-章）/index.html",
    "revision": "bf54759b5ee08965a21632e19432cec4"
  },
  {
    "url": "2020/12/08/《JavaScript-高级程序设计（第四版）》读书笔记（第-1-7-章）/index.html",
    "revision": "2c9d3c95e569e6e84359346be305c1a9"
  },
  {
    "url": "2020/12/14/《JavaScript-高级程序设计（第四版）》读书笔记（第-8-11-章）/index.html",
    "revision": "abbadefd9fb9fecd97bcbabda20a1331"
  },
  {
    "url": "2020/12/18/《JavaScript-高级程序设计（第四版）》读书笔记（第-12-17-章）/index.html",
    "revision": "5ffc3a251cee4ff982a757ed2be7ec17"
  },
  {
    "url": "2020/12/24/《JavaScript-高级程序设计（第四版）》读书笔记（第-18-28-章）/index.html",
    "revision": "e7d1fd9b142e21abcabf37c13959259d"
  },
  {
    "url": "2020/12/25/《计算的本质：深入剖析程序和计算机》读书笔记（第-1-2-章）/index.html",
    "revision": "0b86b05d2b5f9c4819d2daae714db063"
  },
  {
    "url": "2020/12/30/《计算的本质：深入剖析程序和计算机》读书笔记（第-3-4-章）/index.html",
    "revision": "4de9497512d374d876fbe3f01c22537f"
  },
  {
    "url": "2021/01/03/《计算的本质：深入剖析程序和计算机》读书笔记（第-5-9-章）/index.html",
    "revision": "8f7d193d9e9a17ea580de1519307fbc9"
  },
  {
    "url": "2021/01/10/《正则指引（第二版）》读书笔记/index.html",
    "revision": "3a5085513e44d97d77bde63f7355d80e"
  },
  {
    "url": "2021/01/19/《计算机网络（第七版）》读书笔记（第-1-2-章）/index.html",
    "revision": "754f318fdae8995b54155c352e75aaa1"
  },
  {
    "url": "2021/01/21/《现代操作系统（第四版）》读书笔记（第-1-3-章）/index.html",
    "revision": "5b0afd7d0df1e07be9dd01c7e76ec117"
  },
  {
    "url": "2021/01/27/《现代操作系统（第四版）》读书笔记（第-4-6-章）/index.html",
    "revision": "b421f3415b570a75add0426cd77e4871"
  },
  {
    "url": "2021/02/05/《你不知道的 JavaScript》读书笔记（上）/index.html",
    "revision": "3805f43fc25bc75ebf32ac8e77842ea5"
  },
  {
    "url": "2021/02/10/2020-年度总结（Jason-Yu）/index.html",
    "revision": "982d574e72113e6419d991c9b4e3ee66"
  },
  {
    "url": "2021/02/17/React-特性小结（v17-0-1）/index.html",
    "revision": "2cf722ef859f6b92b220c11e0a10a7b5"
  },
  {
    "url": "2021/02/19/《HTTP-权威指南》读书笔记（第-1-6-章）/index.html",
    "revision": "9b8742f19539b102113e079ae648db6f"
  },
  {
    "url": "2021/02/22/《HTTP 权威指南》读书笔记（第 7-15、20 章）/index.html",
    "revision": "c11270d6a40dc1fd45ae809ecab0aaae"
  },
  {
    "url": "2021/03/13/《前端函数式演进》读书笔记/index.html",
    "revision": "d15a3652243f35646aea2c66ef1421f7"
  },
  {
    "url": "2021/03/23/《The-Rust-Programming-Language》读书笔记（第-1-1-章）/index.html",
    "revision": "67b21fa4b1ed20d0e2365f8062ef51c5"
  },
  {
    "url": "2021/04/15/TLPI-File-I-O/index.html",
    "revision": "05e7a4f9d47bdadda5df2323b719a29c"
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
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2014/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/01/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/02/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/03/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/07/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/08/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/11/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2015/page/3/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/01/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/02/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/03/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/04/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/04/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/05/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/06/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/07/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/08/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/09/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/12/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/page/3/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/page/4/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/page/5/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2016/page/6/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/01/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/02/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/03/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/04/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/05/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/06/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/06/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/07/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/08/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/09/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/11/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/12/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/page/3/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/page/4/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2017/page/5/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2018/01/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2018/11/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2018/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/01/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/02/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/03/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/04/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/07/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/08/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/09/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/10/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/11/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2019/page/3/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/03/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/04/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/05/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/06/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/06/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/06/page/3/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/07/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/08/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/10/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/11/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/12/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/page/3/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/page/4/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/page/5/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/page/6/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/page/7/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2020/page/8/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2021/01/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2021/02/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2021/03/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2021/04/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2021/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/2021/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/10/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/11/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/12/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/13/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/14/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/15/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/16/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/17/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/18/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/19/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/2/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/20/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/21/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/22/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/23/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/24/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/3/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/4/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/5/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/6/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/7/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/8/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "archives/page/9/index.html",
    "revision": "1e78220df7412ff5ba2ac750eca422a0"
  },
  {
    "url": "articles/index.html",
    "revision": "61e62dc71173e86b50b25cbf4a10a31a"
  },
  {
    "url": "author/index.html",
    "revision": "837a37dc00920b671a1e46f366d4a525"
  },
  {
    "url": "books/index.html",
    "revision": "3f6c4698166756f87bedbb73e777cada"
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
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/10/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/11/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/12/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/13/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/14/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/15/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/16/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/17/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/18/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/19/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/2/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/20/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/21/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/22/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/23/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/24/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/3/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/4/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/5/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/6/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/7/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/8/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "page/9/index.html",
    "revision": "550d9de5ff9e6e61e1a2371c6ff19e5d"
  },
  {
    "url": "readings/Advanced Design and Implementation of VMs.html",
    "revision": "958d5e10c3806510df8fb25221554213"
  },
  {
    "url": "readings/C++ Primer 中文版（第5版）.html",
    "revision": "556959c62d19e3166b273b9d58fb88d9"
  },
  {
    "url": "readings/C++17 STL Cookbook.html",
    "revision": "9b241befecfe1042e4ebf6b3bc970c8c"
  },
  {
    "url": "readings/Effective C++ 第3版.html",
    "revision": "5bb637aba18b9e443d9b84fd0f640648"
  },
  {
    "url": "readings/Effective Modern C++.html",
    "revision": "f23db6ed9b379067d5f5541240693d11"
  },
  {
    "url": "readings/HTTP 权威指南.html",
    "revision": "599abd8f7efd737531140b191459a63b"
  },
  {
    "url": "readings/index.html",
    "revision": "a3cdbf7e1df7d9a74c0a8098cfa0d84e"
  },
  {
    "url": "readings/JavaScript 二十年.html",
    "revision": "94fad306d82c7dde5e0a62b5c7d5c989"
  },
  {
    "url": "readings/JavaScript 语言精髓与编程实战（第三版）.html",
    "revision": "b1cc19da64c4ce36281a108e547b7403"
  },
  {
    "url": "readings/JavaScript 高级程序设计（第四版）.html",
    "revision": "03601cbbf9de47ea940e52685fcd2ec4"
  },
  {
    "url": "readings/Low-Level Programming.html",
    "revision": "60689ad0888a06711943d9073c16f0cc"
  },
  {
    "url": "readings/OKR 工作法：谷歌、领英等顶级公司的高绩效秘籍.html",
    "revision": "cd5474e52d4a3fb718662cac254a20db"
  },
  {
    "url": "readings/Pro Git (Second Edition).html",
    "revision": "a6bd1d6d1ef78321720abbf9ab1e8a30"
  },
  {
    "url": "readings/React 状态管理与同构实战.html",
    "revision": "c7d17643fee739f599b521ec8dd3e667"
  },
  {
    "url": "readings/The Rust Programming Language.html",
    "revision": "e3823cf66b1504e3dd29ba65c473a9ed"
  },
  {
    "url": "readings/X86-X64-体系探索及编程.html",
    "revision": "c48872460bd859dba38d83025d088499"
  },
  {
    "url": "readings/你不知道的 JavaScript.html",
    "revision": "972e1e1faabeadd31a81e2ffcbeb0ce5"
  },
  {
    "url": "readings/前端函数式演进.html",
    "revision": "2c39a0c169596261c8157b5a4d8b8733"
  },
  {
    "url": "readings/前端架构：从入门到微前端.html",
    "revision": "5c01eaafe5673cb2b44bf4106b2f6e52"
  },
  {
    "url": "readings/图解 HTTP.html",
    "revision": "ff76fb49763ff641e88ab9dfce0b8b27"
  },
  {
    "url": "readings/垃圾回收算法与实现.html",
    "revision": "184570642d01441dac0fe50e16aa2894"
  },
  {
    "url": "readings/增长黑客：创业公司的用户与收入增长秘籍.html",
    "revision": "558d69107b122e78f4892981d2610ea8"
  },
  {
    "url": "readings/大型网站技术架构 - 核心原理与案例分析.html",
    "revision": "787a4916916c92d33e49194b05824a77"
  },
  {
    "url": "readings/奈非文化手册.html",
    "revision": "6f62ed25e279e599474907e1e257cffa"
  },
  {
    "url": "readings/支付战争 - 互联网金融创世纪.html",
    "revision": "5c8298b2ca74e485fd3bb033a8d8378d"
  },
  {
    "url": "readings/正则指引（第二版）.html",
    "revision": "ea5a84a0a040705b7c6b42d4ddffc320"
  },
  {
    "url": "readings/淘宝技术这十年 - 淘宝技术大学校长解密淘宝十年.html",
    "revision": "2202e41e9e456994ba667679136689e6"
  },
  {
    "url": "readings/深入浅出 Serverless：技术原理与应用实践.html",
    "revision": "b1bfd491545d805aa474900909b514f2"
  },
  {
    "url": "readings/深入理解 C++11：C++11 新特性解析与应用.html",
    "revision": "b9b11cd0f2ab02d667be6137a1e6a79a"
  },
  {
    "url": "readings/深入理解计算机系统.html",
    "revision": "9250992ef77f72859377a4826d6d198f"
  },
  {
    "url": "readings/现代 C++ 教程：高速上手 C++.html",
    "revision": "ae8262a149019a51ee1b2c92a3e2672d"
  },
  {
    "url": "readings/现代操作系统（第四版）.html",
    "revision": "efbd9bbdabe7b3f0f4966fa6894364de"
  },
  {
    "url": "readings/病毒来袭 - 如何应对下一场流行病的暴发.html",
    "revision": "fcdca819cd30a5f57a5d3fd97752d073"
  },
  {
    "url": "readings/程序员的自我修养 — 链接、装载与库.html",
    "revision": "4b7dfa3b0ae842237d4279bf81478ce9"
  },
  {
    "url": "readings/虚拟机系统与进程的通用平台.html",
    "revision": "8614b55c5ebbca5cf6e85e0b43535e26"
  },
  {
    "url": "readings/计算机是怎样跑起来的.html",
    "revision": "f771203d6c7b82b9b717c6e87bb76e90"
  },
  {
    "url": "readings/计算机网络（第7版）.html",
    "revision": "369a98a79f066ea5b5e2e8f662e3c40d"
  },
  {
    "url": "readings/计算的本质：深入剖析程序和计算机.html",
    "revision": "3b43dc6a99bb5677200dd9de2775cafd"
  },
  {
    "url": "readings/重新定义团队：谷歌如何工作.html",
    "revision": "5f4b08998853b66963d2a63478f76f66"
  },
  {
    "url": "readings/阿米巴经营.html",
    "revision": "f147e1a3f66201ab2949d449a9d53209"
  },
  {
    "url": "readings/零售的哲学.html",
    "revision": "88895dc95f78964538d115070a0a9045"
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
    "revision": "46d2e458b5f1640530d13fc12db32696"
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
    "revision": "340772868bbe7bba41461663d735d0c4"
  },
  {
    "url": "tags/Apache/index.html",
    "revision": "72555c3e5318d57fb35a4ef35668876c"
  },
  {
    "url": "tags/ASM-js/index.html",
    "revision": "4ba1d075bce6da7a3dbb3c4b5c3573f8"
  },
  {
    "url": "tags/AWS/index.html",
    "revision": "bfcc80d2cee9beb39cca4aceceec9ddc"
  },
  {
    "url": "tags/BigPipe/index.html",
    "revision": "a4da9479010006f9333efc5daadb02ca"
  },
  {
    "url": "tags/BigRender/index.html",
    "revision": "21eba6cd92b9b20e26efe73eebb41e31"
  },
  {
    "url": "tags/C/index.html",
    "revision": "2075e5d37ece86ca565170222a0ffe8a"
  },
  {
    "url": "tags/C/page/2/index.html",
    "revision": "2075e5d37ece86ca565170222a0ffe8a"
  },
  {
    "url": "tags/C/page/3/index.html",
    "revision": "2075e5d37ece86ca565170222a0ffe8a"
  },
  {
    "url": "tags/C/page/4/index.html",
    "revision": "2075e5d37ece86ca565170222a0ffe8a"
  },
  {
    "url": "tags/C/page/5/index.html",
    "revision": "2075e5d37ece86ca565170222a0ffe8a"
  },
  {
    "url": "tags/CSS/index.html",
    "revision": "fbea0e0140dd5dc8a6634d8a1ff2bc4c"
  },
  {
    "url": "tags/DCE/index.html",
    "revision": "dd698dada364398928ace64b3823100f"
  },
  {
    "url": "tags/Docker/index.html",
    "revision": "0acf3ca7a466ecce064f3917ac7ff3c8"
  },
  {
    "url": "tags/DOM/index.html",
    "revision": "3a74eef121df409f64f88d55fa861982"
  },
  {
    "url": "tags/ECMAScript/index.html",
    "revision": "d8daf03ed71daa952511f49a1ca27c7c"
  },
  {
    "url": "tags/English/index.html",
    "revision": "1887fd5f64562f06e42e199e23f668e8"
  },
  {
    "url": "tags/ES6/index.html",
    "revision": "ca60438a6c96a9d6d24c061c2a471577"
  },
  {
    "url": "tags/FCC/index.html",
    "revision": "fdee815e168d4e7e7c5aa7473e8bfbd5"
  },
  {
    "url": "tags/GC/index.html",
    "revision": "a2e4a90d393a2babcf2a62f4a3d79bf4"
  },
  {
    "url": "tags/Git/index.html",
    "revision": "62fc3d8e98472b5103c372b7fe0b2872"
  },
  {
    "url": "tags/GraphQL/index.html",
    "revision": "326804909c4b23a7d371378aee837653"
  },
  {
    "url": "tags/HTML/index.html",
    "revision": "41e06dcc9bbc9b2caf95dbd895367036"
  },
  {
    "url": "tags/HTTP/index.html",
    "revision": "40ace3090d2b195c5858e81585eb9e69"
  },
  {
    "url": "tags/index.html",
    "revision": "dfb4d53c46cbeb6cf3416187fbcb6138"
  },
  {
    "url": "tags/Java/index.html",
    "revision": "a93d499d136c5d80c1cde77a9f58139c"
  },
  {
    "url": "tags/JavaScript/index.html",
    "revision": "c810b3c8b1fcc4532e4ed4365a9f965a"
  },
  {
    "url": "tags/JavaScript/page/2/index.html",
    "revision": "c810b3c8b1fcc4532e4ed4365a9f965a"
  },
  {
    "url": "tags/JavaScript/page/3/index.html",
    "revision": "c810b3c8b1fcc4532e4ed4365a9f965a"
  },
  {
    "url": "tags/JavaScript/page/4/index.html",
    "revision": "c810b3c8b1fcc4532e4ed4365a9f965a"
  },
  {
    "url": "tags/jQuery/index.html",
    "revision": "0dfde4576fa8e8de42bf31874c2a2f3a"
  },
  {
    "url": "tags/KNN/index.html",
    "revision": "b98ef95fda6a3163ff024343a7ed9f84"
  },
  {
    "url": "tags/LeetCode/index.html",
    "revision": "62406364543a581dd106da3390097083"
  },
  {
    "url": "tags/LeetCode/page/2/index.html",
    "revision": "62406364543a581dd106da3390097083"
  },
  {
    "url": "tags/LeetCode/page/3/index.html",
    "revision": "62406364543a581dd106da3390097083"
  },
  {
    "url": "tags/Library/index.html",
    "revision": "85fcc62029264d49a93b80b02f166ec9"
  },
  {
    "url": "tags/Linux/index.html",
    "revision": "16e7300a1f7b1b06e1ac90d48ef1e768"
  },
  {
    "url": "tags/Lisp/index.html",
    "revision": "223a5855e864535199ce3f156d0088aa"
  },
  {
    "url": "tags/MySQL/index.html",
    "revision": "77eac0b7b192f2d42652340ef3214ba5"
  },
  {
    "url": "tags/NASM/index.html",
    "revision": "30e735e25ac0736d83f224d999d8d1a2"
  },
  {
    "url": "tags/Others/index.html",
    "revision": "4f4cf72777ca0eafd7490ad6bf07c1a0"
  },
  {
    "url": "tags/PHP/index.html",
    "revision": "3a0473a7932636acb731cc266a7a0492"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "521da01a5013a2d5ca400dc97220b8b4"
  },
  {
    "url": "tags/React/index.html",
    "revision": "1e6fd4956ee1606488c6b301ba0138f1"
  },
  {
    "url": "tags/Redis/index.html",
    "revision": "b26c305153006fe236d37e7f95a55b2c"
  },
  {
    "url": "tags/Rust/index.html",
    "revision": "0a91efdb954a4d3e913fc5b6a1a256f7"
  },
  {
    "url": "tags/Shadowsocks/index.html",
    "revision": "25cecaae110cd32d7b5b3cfe8a7caa3f"
  },
  {
    "url": "tags/Shell/index.html",
    "revision": "263f7098d9b46b809d3470194993f394"
  },
  {
    "url": "tags/SICP/index.html",
    "revision": "805e0315ffc991530f67caff714ad69e"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "fdeb5ee9bf222008f61d7b3182ed47e8"
  },
  {
    "url": "tags/TOEFL/index.html",
    "revision": "a8798fce596439b6a3551e85ed2e757a"
  },
  {
    "url": "tags/Twelve-Factor/index.html",
    "revision": "11295891d597bb8d318852a58d1ccae4"
  },
  {
    "url": "tags/V8/index.html",
    "revision": "4ffe695da45d1786fb137e42863bd8f6"
  },
  {
    "url": "tags/Web/index.html",
    "revision": "c989b14fcc8d95cc401cf324c8daede8"
  },
  {
    "url": "tags/WebAssembly/index.html",
    "revision": "d9d4c218c70373ddf503cae8f20a5c7a"
  },
  {
    "url": "tags/WebAssembly/page/2/index.html",
    "revision": "d9d4c218c70373ddf503cae8f20a5c7a"
  },
  {
    "url": "tags/X64/index.html",
    "revision": "318ece91c04488c6d7565fc5c05b8ce4"
  },
  {
    "url": "tags/X86/index.html",
    "revision": "b3a36189b759043e5de28ea7b115121c"
  },
  {
    "url": "tags/互联网/index.html",
    "revision": "353c58e0771381d6049987d073484423"
  },
  {
    "url": "tags/互联网思考/index.html",
    "revision": "b57dadc893d0b9d6e5da36960227147f"
  },
  {
    "url": "tags/出版/index.html",
    "revision": "83087245724036c8e88d66e5e5d61f0d"
  },
  {
    "url": "tags/函数式/index.html",
    "revision": "3f1cfa0ecad6453f6b92ae23003d80c1"
  },
  {
    "url": "tags/创业/index.html",
    "revision": "4a87fc1ffa4b9327a3f2611dc467653f"
  },
  {
    "url": "tags/前端/index.html",
    "revision": "8cc8a87d53db1a9d4a135bec36990a9a"
  },
  {
    "url": "tags/加密/index.html",
    "revision": "4b6235b0454dfa3406621361eafcc441"
  },
  {
    "url": "tags/后端/index.html",
    "revision": "0bb747242baf888df4c009c0053624c9"
  },
  {
    "url": "tags/商业评论/index.html",
    "revision": "122c7b5b6c0689b29a13fcc58dc74bb2"
  },
  {
    "url": "tags/团队管理/index.html",
    "revision": "38d96c59afdaaa60e23111307b515b28"
  },
  {
    "url": "tags/大数据/index.html",
    "revision": "dad52ca88d174cc130db3b5b40516ae3"
  },
  {
    "url": "tags/女装/index.html",
    "revision": "cae0cb1ca84812143756c0adfc797cdc"
  },
  {
    "url": "tags/尾递归/index.html",
    "revision": "47752ee7c968296843f52088635860f4"
  },
  {
    "url": "tags/年度总结/index.html",
    "revision": "32f760b495b4427faf26c2c7a1bc25da"
  },
  {
    "url": "tags/旅游/index.html",
    "revision": "6f9ea04c4b86e05f5e2ed9e41ad7f60e"
  },
  {
    "url": "tags/日记/index.html",
    "revision": "9caba7f082ddb3ad663f544b1af8ce00"
  },
  {
    "url": "tags/机器学习/index.html",
    "revision": "f308844c18add796419e6f9def416cfa"
  },
  {
    "url": "tags/架构/index.html",
    "revision": "3d6b5c0f5c08d653a8d62e63346a9498"
  },
  {
    "url": "tags/柯里化/index.html",
    "revision": "60b411ee78ba26dd5e1f878159877c83"
  },
  {
    "url": "tags/汇编/index.html",
    "revision": "9666511e59e16d7d81c1cf8635644ce9"
  },
  {
    "url": "tags/漏洞/index.html",
    "revision": "889035ac3ffd7599faf5c34ff3b51368"
  },
  {
    "url": "tags/算法/index.html",
    "revision": "a5b89aba65dfb7f71e72f0dc7e487dcb"
  },
  {
    "url": "tags/算法/page/2/index.html",
    "revision": "a5b89aba65dfb7f71e72f0dc7e487dcb"
  },
  {
    "url": "tags/算法/page/3/index.html",
    "revision": "a5b89aba65dfb7f71e72f0dc7e487dcb"
  },
  {
    "url": "tags/经营/index.html",
    "revision": "271b5459aeaae96cdc0b0f506aa90bfe"
  },
  {
    "url": "tags/编码/index.html",
    "revision": "b0b2cd79261bd7b8f370ee83247dae97"
  },
  {
    "url": "tags/编程语言/index.html",
    "revision": "65fad8973ed17e65920cfc6ad9c9373a"
  },
  {
    "url": "tags/网站事务/index.html",
    "revision": "cb0f69470b9c1880fc06a6370c3ebf8d"
  },
  {
    "url": "tags/职业发展/index.html",
    "revision": "18712b3bbac189bdc0643a208619909f"
  },
  {
    "url": "tags/股权设计/index.html",
    "revision": "cdf8a4f625b9ef1c10534decd46b9582"
  },
  {
    "url": "tags/虚拟机/index.html",
    "revision": "236be1061e1c703003775b209472f0dc"
  },
  {
    "url": "tags/计算机/index.html",
    "revision": "80279b1ca7a745d788ceff7839d9e298"
  },
  {
    "url": "tags/计算机/page/2/index.html",
    "revision": "80279b1ca7a745d788ceff7839d9e298"
  },
  {
    "url": "tags/设计模式/index.html",
    "revision": "d3b1785c636eb9749a2972006ffd6fdd"
  },
  {
    "url": "tags/设计模式/page/2/index.html",
    "revision": "d3b1785c636eb9749a2972006ffd6fdd"
  },
  {
    "url": "tags/访谈/index.html",
    "revision": "c7d28d3cefb97fea97355d7dcd5d8d15"
  },
  {
    "url": "tags/读书/index.html",
    "revision": "c6072fde69fc48305d8aa86723effe2f"
  },
  {
    "url": "tags/钢琴/index.html",
    "revision": "a3da579a95c33343ab0a42740541757d"
  },
  {
    "url": "tags/风投/index.html",
    "revision": "406c594dfc3fe311367231d086fd6204"
  },
  {
    "url": "tags/黑客松/index.html",
    "revision": "83dd3c3bf5dc2c67dd5ebd3828c692dc"
  },
  {
    "url": "works/index.html",
    "revision": "ed1617342e2fe5b60dd57d6bd2f5324b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|woff2)$/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/\.(?:html|js|css|json)$/, new workbox.strategies.NetworkFirst(), 'GET');
