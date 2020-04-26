---
title: LeetCode 每日一题 - 283. Move Zeroes
intro: LeetCode 每日一题系列，今天第二题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。这道题是今天早上做的，整理成本篇文章。因笔者水平有限，如果有更好的想法欢迎留言。【Array】【TwoPointers】
comments: true
date: 2016-04-12 10:16:00
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第二题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。这道题是今天早上做的，整理成本篇文章。因笔者水平有限，如果有更好的想法欢迎留言。【Array】【TwoPointers】

#### 283. [Move Zeroes](https://leetcode.com/problems/move-zeroes/)：

> Given an array nums, write a function to move all 0''s to the end of it while maintaining the relative order of the non-zero elements.

> For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].
1. You must do this in-place without making a copy of the array.
2. Minimize the total number of operations.


**Example：**

```text
Given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].
```

**1. 最基本的方法，依次查找值为0的元素：**

无论如何，对于一道题我们要先有一个基础的解题思路，然后在这个基础的思路上再进行优化。那么对于这道题来说，最暴力和直接方法就是依次寻找数组中值为“0”的元素，每当寻找到一个值为0的元素时，便将该元素从数组删除，将此元素所在位置后边的所有元素均向前移动一个位置，然后再将数组的最后一个元素设置为0。由于题目要求 “in-place”，因此我们不能创建另外的数组或者 ArrayList 等数据类型，只能在原有的数组上进行操作。此方法的实现代码如下。时间复杂度为 “O(n2)”。

```java
public static void moveZeroes(int[] nums) {
  int arrLen = nums.length;
  int zeroCount = 0, flag = 0;  // 声明两个变量，一个用来保存数组中0的个数，一个用来标志移动的0的个数，用于控制循环；
  
  for (int i = 0; i < arrLen; i++) {  // 获取数组中0的个数；
    if (nums[i] == 0) {
      zeroCount++;
    }
  }
  
  for (int i = 0; i < arrLen; i++) {  // 循环遍历数组；
    while (nums[i] == 0) {  // 防止连续的0，只有当移动之后当前位置不为0，才向下移动；
      for (int k = i; k < arrLen - 1; k++) {  // 注意此处的k是代表索引位置，并不是循环次数；
        nums[k] = nums[k + 1];  // 移除找到的0，并依次将元素向前移动（填补移除的0的位置）；
      }
    	
      nums[arrLen - 1] = 0;  // 数组末尾值置0；
      flag++;  
      if (zeroCount == flag) {  // 当移除0的次数与0的个数相等时结束循环；
        return;
      }
    }
  }
}
```


**2. 更好的方法：**

网友“**咸鱼**”给出的另一种思路，我们采用双指针（Two Pointers）的方法来实现。顾名思义，双指针就是指采用两个指针指向数组不同的位置来进行运算。针对本题的算法中定义两个指针，一个名为 currentPointer 指针，即指向数组中当前遍历到的元素；另一个指针为 zeroPointer 一直指向数组中第一值为0的元素。算法的思路是：依次遍历数组元素，首先将 zeroPointer 指针指向数组中第一个值为0的元素，然后 currentPointer 指针随着遍历位置逐渐后移，若发现 currentPointer 指针指向的元素值不为0则将该位置的值与 zeroPointer 指针指向的元素进行交换。直到全部遍历完成。时间复杂度 “O(n)”。相比上一种算法，效率要提高不少。

该方法的重点在于如何保持 zeroPointer 指针能够一直指向数组中的第一个值为0的元素，这里一般分为两种情况：

1. 若 currentPointer 指针指向的元素的前一个元素不为0，则替换后 zeroPointer 指针指向 currentPointer 指针指向的元素；
2. 若 currentPointer 指针指向的元素的前一个元素为0，则替换后 zeroPointer 指针位置加一；

```java
public static void moveZeroesOptimize(int[] nums) {
  int arrLen = nums.length;
  int zeroPointer = -1;
  
  for (int i = 0; i < arrLen; i++) {
    // 处理两种情况：
    // 1、数组中第一个元素值即为0；
    // 2、若该元素的前一个元素不为0，而该元素为0，则将 zeroPointer 指针指向该元素；
    if((i == 0 && nums[i] == 0) || (i != 0 && nums[i] == 0 && nums[i - 1] != 0)) {
        zeroPointer = i;
    }
    
      // 找到 zeroPointer 指针后面位置中不为0的元素；
    if(zeroPointer != -1 && nums[i] != 0) {
      // 交换两个指针对应元素的值；
      nums[zeroPointer] = nums[i];
      nums[i] = 0;
      // 重点：若当前元素前一个元素不为0，则将 zeroPointer 指针指向该元素，否则 zeroPointer 指针后移一个位置；
      if(i - 1 >= 0 && nums[i - 1] != 0)
        zeroPointer = i;
      else
        zeroPointer ++;
    }
  }
}
```


