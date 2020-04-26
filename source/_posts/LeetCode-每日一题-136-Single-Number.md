---
title: LeetCode 每日一题 - 136. Single Number
intro: LeetCode 每日一题系列，今天第十八题。今天的题目其解法有非常多种，在本篇文章中我们给出了其中三种，但这些答案并非是最优解，期待你心里的最优答案。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Hash Table】
comments: true
date: 2016-06-16 15:07:05
tags:
- 算法
- LeetCode
---


LeetCode 每日一题系列，今天第十八题。今天的题目其解法有非常多种，在本篇文章中我们给出了其中三种，但这些答案并非是最优解，期待你心里的最优答案。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Hash Table】

#### 136. [Single Number](https://leetcode.com/problems/single-number/)：

> Given an array of integers, every element appears twice except for one. Find that single one.

> Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

**0. 题目大意：**

给定一个只含有整数的数组，该数组中除了其中某一个元素以外的所有其他元素均出现过两次，但该元素只出现过一次，请找出这个在数组中只出现了一次的元素。

**1. 第一种方法，HashMap 计算各个元素出现的次数：**

用一个 HashMap 来遍历给定的数组，并统计其中每个元素出现的次数。最后再遍历 Map，找出次数为“1”的元素并返回。代码如下所示：

```java
public static int singleNumber(int[] nums) {
  int arrLen = nums.length;
  HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
    
  for (int i = 0; i < arrLen; i++) {
    if (map.containsKey(nums[i])) {
      int currentTime = map.get(nums[i]);
      map.put(nums[i], ++currentTime);
    } else {
      map.put(nums[i], 1);
    }
  }
  // 遍历 Map；
  for (Map.Entry<Integer, Integer> entry : map.entrySet()) {  
    if (entry.getValue() == 1)
      return entry.getKey();
  }  
     
  return 0;
}
```

```text
15 / 15 test cases passed.
Status: Accepted
Runtime: 27 ms
```

**2. 第二种方法，Set 排除法：**

用一个 Set 来遍历给定数组，第一次遍历时如果元素不存在与 Set 中，则将该元素加入到 Set 中。当第二次遍历到该元素时如果该元素已经存在 Set 中，则从 Set 移除该元素。直到遍历结束后，Set 中只存在一个元素，即为所求元素值。代码如下所示：

```java
public static int singleNumberOptimize(int[] nums) {
  int arrLen = nums.length;
  HashSet<Integer> set = new HashSet<Integer>();
    
  for (int i = 0; i < arrLen; i++) {
    if (set.contains(nums[i])) {
      set.remove(nums[i]);
    } else {
      set.add(nums[i]);
    }
  }
     
  return set.iterator().next();
}
```

```text
15 / 15 test cases passed.
Status: Accepted
Runtime: 21 ms
```



**3. 第三种方法，数组双指针法：**

先将给定数组排序，然后利用双指针遍历数组，步长为2。遍历时如果两个指针对应的元素值相等则跳过该次循环（进行下一次），如果不相等则返回第一个指针指向的元素（索引较小的指针）。使用这种方法时需要注意处理**目标元素在最后一个位置**和**数组只有一个元素**两种特殊情况。代码如下所示：

```java
public static int singleNumberOptimizeFuther(int[] nums) {
  int arrLen = nums.length;
  if(arrLen == 1)
    return nums[0];
  // 排序数组；
  Arrays.sort(nums);
    
  for (int i = 0; i < arrLen; i += 2) {
    int j = i + 1;
      
    if (j == arrLen)
      return nums[i];
            
    if (nums[i] == nums[j])
      continue;
    else 
      return nums[i];
  }
    
  return 0;     
}  
```

```text
15 / 15 test cases passed.
Status: Accepted
Runtime: 9 ms
```

**4. 第四种方法，最优解法：**

将数组内的元素依次异或最后得到的结果即为所求。所有出现过两次的元素之间进行异或的结果为0，而0与我们要寻找的元素异或之后结果不变。代码如下所示：

```java
public class Solution {
  public int singleNumber(int[] nums) {
    int arrLen = nums.length;
    int result = 0;
    for (int i = 0; i < arrLen; i++) {
      result = result ^ nums[i];
    }
    
    return result;
  }
}
```

```text
15 / 15 test cases passed.
Status: Accepted
Runtime: 1 ms
```
