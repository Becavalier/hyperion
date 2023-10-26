---
title: LeetCode 每日一题 - 344. Reverse String
intro: LeetCode 每日一题系列，今天第十一题。由于最近较忙，一段时间没有更新该系列文章了，今天继续。还是一道简单的题目，但是类似的题目也经常出现在各类互联网企业的面试中。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【String】
comments: true
date: 2016-05-05 21:59:13
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第十一题。由于最近较忙，一段时间没有更新该系列文章了，今天继续。还是一道简单的题目，但是类似的题目也经常出现在各类互联网企业的面试中。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【String】

#### 344. [Reverse String](https://leetcode.com/problems/reverse-string/)：

> Write a function that takes a string as input and returns the string reversed.

**Example：**

```text
Given s = "hello", return "olleh".
```

**0. 题目大意：**

给定一个字符串，给出它的逆序字符串。比如给定字符串 “hello”，经过算法返回其逆序字符串 “olleh”。


**1. 基本方法：**

先将字符串拆分成字符数组，利用另外一个相同长度的字符数组将原数组的各个位置的值从后往前依次赋值给新创建的数组。最后将这个新创建的数组转换成字符串返回即可。时间复杂度 “O(n)”。代码如下所示：

```java
public static String reverseString(String s) {
  int strLength = s.length();
  char [] tempCharArr = s.toCharArray();
  char [] resultArr = new char[strLength];
  
  for (int i = 0; i< strLength; i++) {
  	resultArr[i] = tempCharArr[strLength - i - 1];
  }
  
  return String.valueOf(resultArr);
}
```


**2. 优化的方法，双指针：**

这个方法也很好想到，我们在之前的题目中也有用到过类似的“双指针”方法。该方法不需要另外创建数组。首先将字符串转换成字符数组，声明两个指针分别指向该字符数组的首尾元素，并且依次交换首尾元素的值。每交换一次后首指针加一，尾指针减一，直到首指针的位置大于等于尾指针时，循环结束。此时返回原数组对应转换成的字符串即可。该方法为 “In-Place” 方法，相较上一种方法更加节省内存。时间复杂度 “O(n)”。代码如下所示：

```java
// In-Place；
public static String reverseStringOptimize(String s) {
  int strLength = s.length();
  char [] tempCharArr = s.toCharArray();
  
  for (int i = 0; i< strLength; i++) {
  	int j = strLength - i - 1;  // 尾指针；
  	if (i >= j) {  // 首指针大于等于尾指针时循环结束；
  		break;
  	}
  	
    // 以此交换收尾指针对应元素的值；
  	char tempVal = tempCharArr[i]; 
  	tempCharArr[i] = tempCharArr[j];
  	tempCharArr[j] = tempVal;
  }
  
  return String.valueOf(tempCharArr);
}
```
