---
title: UCS-2 编码的妙用
intro: 我们在日常的开发当中经常会碰到诸如 UTF-8、UTF-16 等字符编码方式，其实这些字符编码方式都是 Unicode 编码的一种实现方式。而今天我们的主角就是Unicode 编码的另一种实现方式 - “UCS-2” 编码。借助于 “UCS-2” 编码，我们可以实现一些相对“特殊”的需求。
comments: true
date: 2016-02-19 23:42:57
tags:
- 编码
---

我们在日常的开发当中经常会碰到诸如 UTF-8、UTF-16 等字符编码方式，其实这些字符编码方式都是 Unicode 编码的一种实现方式。而今天我们的主角就是Unicode 编码的另一种实现方式 - “UCS-2” 编码。借助于 “UCS-2” 编码，我们可以实现一些相对“特殊”的需求。

在介绍 “UCS-2” 之前，我们先来复习一下 Unicode 编码的相关知识。Unicode 编码是一种可以容纳全世界所有语言文字的编码方案。Unicode 使用一个确定的名字和一个叫做“码位”的**十六进制数**来定义一个字符。例如字符 “A” 对应的 Unicode 码位为 0x0041（十进制整数为65）的码位。而实际上 Unicode 编码的码位从 u0000（0x0000）到 u007F（0x007F）与 ASCII 完全一致。

Unicode 的码空间范围从 u0000（0x0000）到 u10FFFF（0x10FFFF），共有“1,112,064”个码位可用来映射字符. 而其中码位从 u0000 至 uFFFF 的范围内包含了最常用的字符，这一部分被称为基本多语言平面（Basic Multilingual Plane），缩写为 BMP。处于其他范围的码位则称为辅助平面(Supplementary Planes)。

**UCS-2** 英文全称为 “2-byte Universal Character Set”，而相对 UTF-8（变长编码）不同，它是一种**定长**的编码方式，UCS-2 仅仅简单的使用一个16位码元来表示码位，也就是说它可以表示 Unicode 编码从 u0000 到 uFFFF 码位范围内的所有字符。但请记住，UCS-2 只是一种 Unicode 编码的具体实现方式。

那么，我们可以拿 “UCS-2” 编码来做些什么呢？因为 “UCS-2” 在码位范围 u0000 到 uFFFF 范围内的编码与 Unicode 的码位完全一致，因此我们用这一特性来进行对字符的“语言识别”。通过判断某一字符的 UCS-2 编码的码位值（16进制值）其大小，可以判断该字符是属于那一语言或语系。比如汉语的 USC-2 编码码位范围为 u4E00（0x4E00）到 u9FFF（0x9FFF），其他语系也以此类推拥有其对应的码位范围。

下面给出基于 PHP的实现代码：（此段代码会自动分析用户输入字符串内的所有字符的所属语言体系）

```php
class Util {
  public static function charAnaylze($str) {   
    // 转换成 UCS-2 定长编码；
    $str = iconv('UTF-8', 'UCS-2', $str);

    // 获取字符串总长度；
    $strLen = strlen($str);

    $tempStr = '';
    $resultArr = array();

    // 每次处理一个字符；
    for ($i = 0; $i < $strLen - 1; $i = $i + 2) {
      $lowByte = $str[$i];
      $highByte = $str[$i + 1];

      // 按位转换并填充；
      $lowByteEncoded = str_pad(base_convert(ord($lowByte), 10, 16), 2, 0, STR_PAD_LEFT);
      $highByteEncoded = str_pad(base_convert(ord($highByte), 10, 16), 2, 0, STR_PAD_LEFT);
      $hexStr = $lowByteEncoded . $highByteEncoded;
      $value = hexdec($hexStr);

      // 创建临时字符；
      $tempStr = iconv('UTF-8', 'UCS-2', "A");
      $tempStr[0] = $lowByte;
      $tempStr[1] = $highByte;

      // 编码；
      $char = iconv('UCS-2', 'UTF-8', $tempStr);
      
      if($value >= 65 && $value <= 122) {
        // Latin 字母；
        $resultArr['Latin字母'][] = $char;
      }

      if($value >= 48 && $value <= 57) {
        // Latin 数字；
        $resultArr['Latin数字'][] = $char;
      }

      if(($value >= 33 && $value <= 47) || ($value >= 58 && $value <= 64)) {
        // Latin 符号；
        $resultArr['Latin符号'][] = $char;
      }

      if(($value >= 1536 && $value <= 1791)) {
        // 阿拉伯语；
        $resultArr['阿拉伯语'][] = $char;
      }

      if(($value >= 19968 && $value <= 40959)) {
        // 汉字；
        $resultArr['汉字字符'][] = $char;
      }
    }

    return $resultArr;
  }
}
```
