---
title: LeetCode 每日一题 - 27. Remove Element
intro: LeetCode 每日一题系列，今天第十六题。今天还是一道关于数组的简单题目，闲暇时间可以用来练练手。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Array】【Two-Pointer】
comments: true
date: 2016-05-24 20:49:26
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第十六题。今天还是一道关于数组的简单题目，闲暇时间可以用来练练手。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Array】【Two-Pointer】

#### 27. [Remove Element](https://leetcode.com/problems/remove-element/)：

> Given an array and a value, remove all instances of that value in place and return the new length.

> Do not allocate extra space for another array, you must do this in place with constant memory.

> The order of elements can be changed. It doesn''t matter what you leave beyond the new length.

**Example：**

```text
Given input array nums = [3,2,2,3], val = 3.

Your function should return length = 2, with the first two elements of nums being 2.
```

**0. 题目大意：**

给定一个数组和一个数字，将数组内和所给定数字不相等的值排列到数组的头部，相等的值排列到尾部（头部的值顺序可以被打乱）。

**1. 第一种方法，双指针：**

思路很简单也很容易想到，还是我们惯用的双指针，一个指针负责遍历，另一个指针负责锁定待更新值的位置。代码如下所示：

```java
public static int removeElement(int[] nums, int val) {
  int arrLen = nums.length;
  int j = 0;
  
  for (int i = 0; i < arrLen; i ++) {
    if (nums[i] != val) {
      int temp = nums[j];
      nums[j] = nums[i];
      nums[i] = temp;
      j ++;
    }
  }

  return j;
}
```

```text
113 / 113 test cases passed.
Status: Accepted
Runtime: 0 ms
```