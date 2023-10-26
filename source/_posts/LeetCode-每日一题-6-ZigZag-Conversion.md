---
title: LeetCode 每日一题 - 6. ZigZag Conversion
intro: LeetCode 每日一题系列，今天第十三题。“ZigZag” 一词的意思是 “Z 字形，锯齿形”，如果把数字按照 “ZigZag” 的方式进行排列，这会是一道怎样的题目呢？我们一起来看看。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【String】
comments: true
date: 2016-05-08 23:06:08
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第十三题。“ZigZag” 一词的意思是 “Z 字形，锯齿形”，如果把数字按照 “ZigZag” 的方式进行排列，这会是一道怎样的题目呢？我们一起来看看。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【String】

#### 258. [ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion/)：


> The string **"PAYPALISHIRING"** is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility).

**Example：**

```text
P   A   H   N
A P L S I I G
Y   I   R
```

> And then read line by line: "**PAHNAPLSIIGYIR**".

> Write the code that will take a string and make this conversion given a number of rows:

```text
string convert(string text, int nRows);
```

> Here **convert("PAYPALISHIRING", 3)** should return "**PAHNAPLSIIGYIR**".

**0. 题目大意：**

给定一组字符串，将该字符串的所有字符按照 “ZigZag” 的方式（Z形的方式，如上图，先从上至下排列然后继续向斜上方排列再继续向下排列依次循环）排列成 numRows 行，然后逐行水平方向从左到右读取这些字符并返回由这些字符组成的新字符串。

**1. 基本方法，分析基本规律：**

使用二维数组来模拟 “ZigZag” 的存储方式，行 (x) 和列 (y) 的规律分开进行处理。行 (x) 标一直在**0**和 **numRows** 之间循环变换，列 (y) 标在行 (x) 标增加的过程中值不变，在 (x) 标减少的时候值每次加一。总体来说有两个变化的地方，即**行 (x) 标为0的时候**和**行 (x) 标为 numRows - 1**的时候。同时不要忘记还要处理一种特殊情况，即 **numRows 为1**的情况，当然也可以整理到上述情况中，但思路不变，即行列的规律要分开处理。代码如下所示：

```java
public static String convert(String s, int numRows) {
  char[] tempCharArr = s.toCharArray();
  int tempCharArrLen = tempCharArr.length;
  // 计算列数；
  int columeNum = tempCharArrLen * numRows / (2 * numRows - 1) + 
    (tempCharArrLen % (2 * numRows - 1) <= numRows ? 1 : tempCharArrLen % (2 * numRows - 1) - numRows + 1);
  char[][] charMap = new char[numRows][columeNum];
  
  int x = 0, y = 0, k = 1, h = 1;
  for (int i = 0; i < tempCharArrLen; i++){
    char thisChar = tempCharArr[i];
    charMap[x][y] = thisChar;
    
    if (x == 0) {
      k = 1;
      h = 0;
    } else if (x == numRows - 1) {
      k = -1;
      h = 1;
    }
    
    // 特殊情况；
    if (numRows == 1) {
      k = 0;
      h = 1;
    }
      
    x = x + k;
    y = y + h;
  }    
  
  StringBuffer sb = new StringBuffer();
  
  // Output string；
  for (int i = 0; i < charMap.length; i++){
    for (int j = 0; j < charMap[i].length; j++){
      char c = charMap[i][j];
      if (c == ''\0'')
        continue;
      else
        sb.append(c);
    }
  }
  
  return sb.toString();
}
```

```text
1158 / 1158 test cases passed.
Status: Accepted
Runtime: 51 ms
```

**2. 优化方法，进一步规律：**

更加友好和规律化的方法就是直接按照一定规律去读取字符串某一位置的字符，然后组合在一起，而不是先按照Z字来排列之后再读取。这个规律就是：所有“直线列”水平读取时的重复周期都是 “2 x numRows - 2”；对于首行和末行之间的行，还会额外多读取一个位置的字符，而这一位置距离本周期起始字符的距离是 “2 x numRows - 2 - 2 x i”。代码如下所示：

```java
public static String convertOptimize(String s, int numRows) {
  int len = s.length();  
  if (len == 0 || numRows < 2) return s;  
    
  String ret = "";   
  int period = 2 * numRows - 2; // “直线列”水平读取时的循环周期；
  for (int i = 0; i < numRows; i++) {  
    for (int j = i; j < len; j += period) {  
      ret += s.charAt(j);  
        
      // 非首行和末行时还要多读取一个字符；
      if (i > 0 && i < numRows - 1) {  
        int t = j + period - 2 * i;  
        if (t < len) {  
          ret += s.charAt(t);  
        }  
      }  
    }  
  }  
  return ret;  
}
```
```text
1158 / 1158 test cases passed.
Status: Accepted
Runtime: 65 ms
```
