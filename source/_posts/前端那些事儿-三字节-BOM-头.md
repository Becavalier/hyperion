---
title: 前端那些事儿 - 三字节 BOM 头
intro: 今天在修复一个后台 BUG 的时候遇到了很奇怪的问题，从服务器端返回来的数据是 JSON 格式的，并且打印以及 Base64 编码解码之后均为正确的 JSON 字符串格式，但偏偏 PHP 内置的 JSON_decode 函数却无法正常解码，一直返回空的解析结果。遂借此机会研究了一番，发现这其中的一些不为人知的秘密。
comments: true
date: 2016-01-06 16:10:17
tags:
- Web
---

今天在修复一个后台 BUG 的时候遇到了很奇怪的问题，从服务器端返回来的数据是 JSON 格式的，并且打印以及 Base64 编码解码之后均为正确的 JSON 字符串格式，但偏偏 PHP 内置的 `JSON_decode` 函数却无法正常解码，一直返回空的解析结果。遂借此机会研究了一番，发现这其中的一些不为人知的秘密。

于是，查询了 PHP 官网文档，发现 `JSON_decode` 函数对解析的 JSON 字符串有着严格的要求：

1. JSON 字符串必须是以 UTF8 格式编码的；
2. 字符串格式必须完整准确，最后的元素不能有逗号存在；
3. 所有元素必须使用双引号；
4. 元素中不能含有控制或转义字符；

接下来对应着文档的标准 JSON 字符串格式要求，我们可以逐条进行测试：

```php
<?php
    // 使用 utf8_encode 方法编码 JSON 字符串；
    $result = JSON_decode(utf8_encode($response), true);
```

使用 UTF8 编码 JSON 字符串并没有解决问题，发现输出的 UTF8 编码过的 JSON 字符串最前端部分存在乱码。对于 JSON 字符串的格式是否正确和是否使用双引号可以通过 `print_r` 函数把响应数据打印到页面直接观察来得到。接下来去掉 JSON 字符串中的控制和转义字符。

```php
<?php
    // 去掉 JSON 字符串中的换行符("\\"换成"\")；
    $order = array("\\r\\n", "\\r", "\\n");
    str_replace($order, '', $response);
```

至此，问题依然没有解决，接下来还是从之前发现的 UTF8 编码后 JSON 字符串存在乱码入手。乱码位于 JSON 字符串的最前端，并且是在经过 UTF8 编码之后产生的。`utf8_encode` 方法也会将不可见的标识或控制字符进行编码。因此怀疑是存在隐藏的标识字符或者控制字符。

大家都知道，PHP 对 BOM头 并不能很好的识别，所以很多时候 PHP 在解析含有 BOM 头的页面时，常常会将 BOM 的三个字符输出到页面中，导致解析出现问题。那么 BOM 到底是什么呢？

**以下内容来自百度百科**：

Unicode 规范中有一个 BOM 的概念。BOM(Byte Order Mark)，翻译过来就是“字节序标记“。在这里找到一段关于 BOM 的说明：

在 UCS 编码中有一个叫做 "ZERO WIDTH NO-BREAK SPACE" 的字符，它的编码是 FEFF。而 FFFE 在 UCS 中是不存在的字符，所以不应该出现在实际的数据传输过程中。UCS 规范建议我们在传输字节流前，先传输字符 "ZERO WIDTH NO-BREAK SPACE"。这样如果接收者收到 FEFF，就表明这个字节流是 “Big-Endian“ 的；如果收到 FFFE，就表明这个字节流是 “Little-Endian” 的。因此字符 "ZERO WIDTH NO-BREAK SPACE" 又被称作 BOM。

UTF-8 不需要 BOM 来表明字节顺序，但可以用 BOM 来表明编码方式。字符 "ZERO WIDTH NO-BREAK SPACE" 的 UTF-8 编码是 “EF BB BF”。所以如果接收者收到以 “EF BB BF” 开头的字节流，就知道这是 UTF-8 编码了。

Windows 记事本就是使用 BOM 来标记文本文件的编码方式的。

UTF-8 编码的文件中，BOM 占三个字节。如果用记事本把一个文本文件另存为 UTF-8 编码方式的话，再用 UE 打开这个文件，切换到十六进制编辑状态就可以看到开头的 FFFE 了。这是个标识 UTF-8 编码文件的好办法，软件通过 BOM 来识别这个文件是否是 UTF-8 编码，很多软件还要求读入的文件必须带 BOM。可是，还是有很多软件不能识别 BOM。我在研究 Firefox 的时候就知道，在 Firefox 早期的版本里，扩展是不能有 BOM 的，不过 Firefox 自从 1.5 以后的版本已经开始支持 BOM 了。如今又发现，PHP 也不支持 BOM。

PHP 在设计时就没有考虑 BOM 的问题，也就是说他不会忽略 UTF-8 编码的文件开头 BOM 的那三个字符。由于必须在 “<?” 或者 “<?php” 标记后面的代码才会被作为 PHP 代码执行，所以这三个字符将会直接输出。如果插件的文件有这个问题，将会导致在后台页面里激活或者不激活插件后显示白屏，如果是模版文件有这个问题，将会导致这三个字符直接输出，造成页面上方有一个小空行。国外的英文插件和模版一般都是用的 ASCⅡ 码的编码方式，不会有 BOM，只有国内的插件和模版会由于作者的不知情造成问题。还有，大家修改模版的时候，由于输出页面使用 UTF-8 编码，那么修改模版的时候如果有加入中文字符的话，必须把文件转成 UTF-8 编码才能正常显示，这个时候如果所使用的编辑器自动加上了 BOM 的话，将会造成在页面上输出这三个字符，显示效果就要看浏览器了，一般是一个空行或是一个乱码。

简单的说，BOM 头就是用来表示文件编码方式几个字符，而在 UTF8 编码的文件中，BOM 头有三个字符，分别是：`0xEF 0xBB 0xBF`。

```php
<?php
    // 去掉 BOM 头字符；
    $result = JSON_decode(trim($response, chr(239).chr(187).chr(191)),true);
```

至此，终于找到了问题所在。其实我们在调试过程中并不需要这么麻烦，直接通过 `JSON_last_error` 函数即可获得最后一次 `JSON_decode` 函数执行失败的原因。

最后，封装一个完备的 `JSON_decode` 函数：

```php
<?php
    public function JSONDecode($content) {
        // 去空格和占位符("\\"换成"\")；
        $order = array("\\r\\n", "\\r", "\\n");
        str_replace($order, '', $content);
        // 去掉 BOM 头；
        $content = trim($response, chr(239).chr(187).chr(191));
        // 使用 UTF-8 编码；
        $content = utf8_encode($response);
        // 解析并返回生成的数组；
        return JSON_decode($content, true);
    }
```

