---
title: LeetCode 每日一题 - 9. Palindrome Number
intro: LeetCode 每日一题系列，今天第十五题。“回文”的意思是指将给定的一段文字左右颠倒后原意保持不变的一段文字，但今天的主角不是一段文字，而是一段数字。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Math】
comments: true
date: 2016-05-12 14:21:03
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第十五题。“回文”的意思是指将给定的一段文字左右颠倒后原意保持不变的一段文字，但今天的主角不是一段文字，而是一段数字。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Math】

#### 9. [Palindrome Number](https://leetcode.com/problems/palindrome-number/)：

> Determine whether an integer is a palindrome. Do this without extra space.

**Example：**

```text
Example1: x = 123321, return true

Example2: x = 123123, return false
```

**0. 题目大意：**

给定一个数字，判断该数字是不是回文（这里指将给定的数字左右颠倒重新排列后值与原值保持不变，可以理解为从左往右读与从右往左读保持一致）。

**1. 基础解法：**

如果“LeetCode 每日一题系列”之前的题目你都认真做过了，那么这道题简直是信手拈来，五分钟搞定。将给定的数字转换成字符串，并拆分成字符数组，接着利用“双指针”法依次判断第一个与最后一个，第二个与倒数第二个（以此类推）的元素是否相等，如果有一个不相等则返回 `false`；如果直到最后都保持相等则返回 `true`。循环的退出条件与之前我们用的时候保持一致。代码如下所示：

```java
public static boolean isPalindrome(int x) {
  String s = String.valueOf(x);
  char[] cArr = s.toCharArray();
  
  for (int i = 0; i < cArr.length; i ++) {
    int j = cArr.length - i - 1;
    if (cArr[i] != cArr[j])
      return false;  
    if (i > j)
      break;
  }
  return true;
}
```

```text
11506 / 11506 test cases passed.
Status: Accepted
Runtime: 16 ms
```
