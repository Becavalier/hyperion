---
title: LeetCode 每日一题 - 168. Excel Sheet Column Title
intro: LeetCode 每日一题系列，今天第九题。这是一道与数学“进制”相关的题目，从零开始的进位和从一开始的进位处理起来并不相同。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Math】
comments: false
date: 2016-04-21 22:45:22
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第九题。这是一道与数学“进制”相关的题目，从零开始的进位和从一开始的进位处理起来并不相同。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Math】

#### 168. [Excel Sheet Column Title](https://leetcode.com/problems/excel-sheet-column-title/)：


> Given a positive integer, return its corresponding column title as appear in an Excel sheet.

**Example：**

```text
1 -> A
2 -> B
3 -> C
...
26 -> Z
27 -> AA
28 -> AB
...
52 -> AZ 
```

**0. 题目大意：**

根据题目给出的示例，通过观察可以发现这是一道与数学“进制”相关的题目。从 A 到 Z 一共26个字母分别对应着数字从1到26，而字母组合 AA 则对应着数字27，可见组合中的第一个字母 A 为进位，表示26乘以（A 所代表的数字1）即 “26 x 1"，再加上最后一位字母（A 代表的数字1）结果即为 “26 x 1 + 1 = 27”。

**1. 最基本的方法，找寻进制的规律：**

进制的规律大家应该都很熟悉，该题可以看作是26进制来进行处理，但需要要注意的是题目中并没有出现数字0，一切进位都是从数字1开始计数，一直到数字26。整个字母串的每一位都是一直到出现数字27才会开始进位的，所以在处理需要进位的地方时要多加小心。遇到进位的地方时可以手动强制使其少进一位，而该位的0用 Z 来替换，以下简称“去0换 Z”。代码如下所示：

```java
public static String convertToTitle(int n) {
  String[] alphabet = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
  String result = "";
  
  if (n <= 26) { 
  	return alphabet[n - 1];  // n 小于26直接返回对应数组的字母；
  }
  
  int i = n, j = 0;
  while (i > 26){
    i = n / 26;
    j = n % 26;
    
    if (j != 0) {  // 获得余数；
    	result = alphabet[j - 1] + result;
    } else {  // 没有余数则将i减一，防止出现数字26而进位；
    	i = i - 1;
    	result = &#39;Z&#39; + result;  // 去0换 Z；
    }
    
    if (i > 26) {
    	n = i;
    } else {
    	result = alphabet[i - 1] + result;
    }
  }
  
  return result;
}
```


**2. 优化的方法，优化运算流程：**

第二种方法优化了代码的运算流程，但主体思路并没有变。代码如下所示：

```java
public static String convertToTitleOptimize(int n) {
  String[] alphabet = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
  String result = "", j = "";
  
  while (n > 0) { 
    int i = n % 26;  
    if (i == 0) i = 26;  // 没有余数则表明进位了，手动去0换 Z；
    j = alphabet[i - 1];  
    result = j + result;  
    n = (n - 1) / 26;  // 两种情况：1、有余数时并没有影响；2、没有余数时强制少进一位，去0换 Z； 
  }  
  
  return result;
}
```
