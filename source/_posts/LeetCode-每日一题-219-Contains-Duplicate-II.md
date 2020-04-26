---
title: LeetCode 每日一题 - 219. Contains Duplicate II
intro: LeetCode 每日一题系列，今天第四题。这道题与之前的 “217.Contains Duplicate” 基础解法思路大体相似，不过在判断是否含有重复元素的同时，还需要保证元素的索引信息不能够丢失。【Array】【HashTable】
comments: true
date: 2016-04-14 09:29:45
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第四题。这道题与之前的 “**217.Contains Duplicate**” 基础解法思路大体相似，不过在判断是否含有重复元素的同时，还需要保证元素的索引信息不能够丢失。【Array】【HashTable】

#### 219. [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/)：

> Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j] and the difference between i and j is at most k.

**Example：**

```text
Given nums = [2, 7, 11, 15, 11],
Given k = 2,

Because nums contains duplicate number 11, and the distance between two duplicates less or equal than k,
So after your function it should return true.
Else return false.
```

**1. 最基本的方法，还是遍历：**

两个指针，**指针 i** 指向当前元素，**指针 j** 指向 **i** 其后的任意元素。最内层循环依次比较**指针 i** 与**指针 j** 对应元素大小，外层循环将指针 i 向后移动，直到找到相等值并判断此时**指针 i** 和**指针 j** 的相对位置是否小于等于 **k**。时间复杂度 “O(n2)”。代码如下所示：

```java
public static boolean containsDuplicate(int[] nums) {
  int arrLen = nums.length;
  for (int i = 0; i< arrLen; i++) {
    for (int j = i + 1; j < arrLen; j++) {
      if (nums[i] == nums[j] && j - i <= k)
      return true;
    }
  }
  return false;
}
```


**2. 优化的方法，同样使用HashMap：**

思路不变，先检查 HashMap 中是否含有此元素，如果有则检查当前元素与该元素的索引距离是否大于 **k**，如果没有则将该元素放入 HashMap，并继续从数组中取下一个元素，否则返回 `false` 。时间复杂度 “O(n)“。代码如下所示：
```java
public static boolean containsDuplicateOptimize(int[] nums) {
  int arrLen = nums.length;
  Map<Integer, Integer> map = new HashMap<>();
  int prevPos = 0;
  
  for (int i = 0; i< arrLen; i++) {
    if (map.containsKey(nums[i])) {
      prevPos = map.get(nums[i]);
      if((i - prevPos) <= k)
        return true;
      else 
        return false;
    } else {
      map.put(nums[i], i);
    }
  }
  return false;    
}
```

**3. 更加优化的方法，使用 Set 集合来保持一个固定大小的检测窗口：**

这里我们使用 Set 来保持一个大小为 **k** 的检测窗口，只要在这个窗口中含有重复的元素，则一定满足两个元素之间的距离小于 **k** 的条件。代码如下所示：

```java
public static boolean containsDuplicateOptimizeFurther(int[] nums) {
  Set<Integer> set = new HashSet<Integer>();  
  // 定义窗口的首尾指针；
  int start = 0, end = 0;
  // 开始遍历；
  for (int i = 0; i < nums.length; i++) {   
    if (!set.contains(nums[i])) {  
      set.add(nums[i]);   
      end++;   // 如果 Set 中没有此元素则加入，尾指针后移；
    } else { 
      return true;   // 有则返回 true；
    }
    
    // 保持首尾指针距离不大于 k；
    if(end - start > k) {  
      set.remove(nums[start]);  //如果大于则移除首指针元素；
      start++;   // 移除后首指针后移；
    }  
  }  
  return false;
}
```
