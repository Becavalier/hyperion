---
title: LeetCode 每日一题 - 58. Length of Last Word
intro: LeetCode 每日一题系列。本文算法题目：给出一个字符串，该字符串包含大写字母，小写字母和空格，请编写程序给出最后一个单词（不包含空格，只包含字母）的长度。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【String】
comments: true
date: 2016-09-17 17:57:53
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列。本文算法题目：给出一个字符串，该字符串包含大写字母，小写字母以及空格，请编写程序给出最后一个单词（不包含空格，只包含字母）的长度。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【String】

#### 27. [Length of Last Word](https://leetcode.com/problems/length-of-last-word/)：


> Given a string s consists of upper/lower-case alphabets and empty space characters " ", return the length of last word in the string.

> If the last word does not exist, return 0.

**Note：**

> A word is defined as a character sequence consists of non-space characters only.

**Example：**

```text
Given s = "Hello World", return 5.
```

**0. 题目大意：**

给出一个字符串，该字符串包含大写字母，小写字母以及空格，请编写程序给出该字符串最后一个单词（不包含空格，只包含字母）的长度。

**1. 基础解法：**

基本的思路就是从后往前处理字符串。首先初始化一个长度变量值为0，接下来从后往前寻找整个字符串中第一个不为零的位置，那么这个位置应该就是整个字符串中最后一个 Word 的最后一个字符的位置。接下来继续从后向前寻找，只要当前所处的字符不是 “Space” 符即可将长度变量的值加一，否则直接退出循环，返回现在的长度。代码如下所示：


```java
public static int lengthOfLastWord(String s) {
  if (s.length() == 0) {
    return 0;
  }
		
  int strLen = s.length();
  int lastWordIndex = 0;
  int lastWordLen = 0;
		
  for (int i = strLen - 1; i > 0; i--) {
    if (s.charAt(i) != " ") {
      lastWordIndex = i;
      break;
    }
  }

  for (int i = lastWordIndex; i >= 0; i--) {
    if (s.charAt(i) != " ") {
      lastWordLen ++;
    } else {
      break;
    }
  }
  return lastWordLen;
}
```

```text
59 / 59 test cases passed.
Status: Accepted
Runtime: 5 ms
```
