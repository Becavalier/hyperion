---
title: LeetCode 每日一题 - 189. Rotate Array
intro: LeetCode 每日一题系列，今天第七题。今天的题型还是基于数组的变换，观察题目不仅仅是要理解题目的意思，更要去发现题目中的规律，擅于归纳。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Array】
comments: true
date: 2016-04-19 09:25:56
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第七题。今天的题型还是基于数组的变换，观察题目不仅仅是要理解题目的意思，更要去发现题目中的规律，擅于归纳。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Array】

#### 189. [Rotate Array](https://leetcode.com/problems/rotate-array/)：


> Rotate an array of n elements to the right by k steps.

> For example, with **n = 7** and **k = 3**, the array **[1, 2, 3, 4, 5, 6, 7]** is rotated to **[5, 6, 7, 1, 2, 3, 4]**.

**0. 题目大意：**循环地将一个含有 **n** 个元素数组的右边 **k** 个元素搬移到数组左边。举例，给定 **n** 等于7，**k** 等于3，数组 [1, 2, 3, 4, 5, 6, 7] 经过旋转后便得到 [5, 6, 7, 1, 2, 3, 4]。



**1. 最基本的方法，循环移动**：题目的大意即每一次循环将数组最右的一个元素搬移到数组的最左边，然后将该循环执行 **k** 次，即可得到最后的结果。这里利用两层循环，每一次将最后一个元素搬移到最左边时，要先将最后一个元素存储到临时变量，然后依次将数组所有元素向后移动一个位置，再将临时变量的元素放到第一个位置，这里没有使用新的数组，所以该解法为 “In-Place” 的基础解法。时间复杂度 “O(n2)”。代码如下所示：

```java
public static void rotate(int[] nums, int k) {
  if (nums.length == 0)
    return;
    
  int arrLen = nums.length;
  for (int i = 0; i < k; i++){
    int lastVal = nums[nums.length - 1];  // 最后一个值存储到临时变量；
    for (int j = nums.length - 2; j >= 0 ; j--){  // 所有元素依次后移一位；
      nums[j + 1] = nums[j]; 
    }
    nums[0] = lastVal;  // 将临时变量的值赋给第一个元素；
  }
}
```


**2. 优化的方法，寻找规律，一步求解：**

如果擅于归纳和寻找题目细节，你会发现该题在计算过程中含有的一些规律。当k的值等于数组长度时，数组不会发生任何改变，即此时循环搬移 **k** 次之后，数组又回到了初始时的顺序。利用此规律，无论 **k** 取何值，我们只需要搬移 “k % 数组长度” 次即可。这里同时利用了一个新的临时数组，整个过程只需先将数组的后 “k % 数组长度” 个元素搬移到新数组的“头部”，原数组剩下的部分搬移到新数组的“尾部”，最后再将新数组的内容拷贝给旧数组即可。算法时间复杂度 “O(n)”。代码如下所示：

```java
public static void rotateOptimize(int[] nums, int k) {
  if (nums.length == 0)
    return;
    
  int arrLen = nums.length;
  int temp[] = new int[arrLen];
  k = k % arrLen;
  
  for (int i = 0; i < k; i++) {
     temp[i] = nums[arrLen - k + i];
  }
  for (int j = k; j < arrLen; j++){ 
    temp[j] = nums[j - k];
  }
  
  System.arraycopy(temp, 0, nums, 0, nums.length);
}
```


**3. 效率更高的方法，继续寻找规律，发现本质：**

我们继续来寻找该题的规律，你会发现对于每次需要执行的 “k % 数组长度” 次搬移，我们只要按照下面的步骤都可以顺利完成。

* ① 将数组按照从后往前数第（k % 数组长度）个元素分成前后两部分。如数组 [1, 2, 3, 4, 5, 6]，k 取值2，则分为 [1, 2, 3, 4] 和 [5, 6] 两部分；
* ② 将前一部分元素全部翻转，得到 [4, 3, 2, 1]；
* ③ 将后一部分元素全部翻转，得到 [6, 5]；
* ④ 最后将两部分拼接到一起再进行一次翻转即可得到 [5, 6, 1, 2, 3, 4]；

该算法时间复杂度为 “O(n)”。代码如下所示：

```java
public static void rotateOptimizeFuther(int[] nums, int k) {
  k = k % nums.length;
 
  if (nums == null || k < 0) {
    return;
  }
 
  int a = nums.length - k; 
 
  reverse(nums, 0, a-1);  // 翻转前一部分元素；
  reverse(nums, a, nums.length-1);  // 翻转后一部分元素；
  reverse(nums, 0, nums.length-1);  // 翻转整体元素；
}
 
public static void reverse(int[] nums, int left, int right) {
  if(nums == null || nums.length == 1) 
    return;
 
  while(left < right) {
    // 翻转的整体思路是利用双指针前后调换对应元素的值；
    int temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
    left++;
    right--;
  }   
}
```
