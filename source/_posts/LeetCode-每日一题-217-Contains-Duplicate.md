---
title: LeetCode 每日一题 - 217. Contains Duplicate
intro: LeetCode 每日一题系列，今天第三题。早上写了三种解题方法，前两种 “Time Limit Exceeded” 了，第三种通过了 Judge，不过三种方法都可以实现，只是效率不同。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Array】【HashTable】
comments: true
date: 2016-04-13 09:45:09
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第三题。早上写了三种解题方法，前两种 “Time Limit Exceeded” 了，第三种通过了 Judge，不过三种方法都可以实现，只是效率不同。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Array】【HashTable】

#### 217. [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)：

> Given an array of integers, find if the array contains any duplicates. Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

**Example：**

```text
Given nums = [2, 7, 11, 15],

Because nums contains not any duplicates, so after your function it should return false.
Else return true.
```

**1. 最基本的方法，两个指针，依次比较对应元素值是否相同：**

遍历所有可能性是解决算法问题最基本也是最暴力的方式。理论上来讲在实际工作遇到的“大部分”业务中，不用过多考虑算法的成本问题，因为对于现在的大多数 PC 或服务器来说，其性能已经足够强悍可以承担任何低效率算法所带来的负载了。两个指针，**指针 i** 指向当前元素，**指针 j** 指向 **i** 其后的任意元素。最内层循环依次比较**指针 i** 与**指针 j** 对应元素大小，外层循环将i指针向后移动，直到找到相等值或完成所有遍历。时间复杂度 “O(n2)”。代码如下所示：

```java
public static boolean containsDuplicate(int[] nums) {
  int arrLen = nums.length;
  
  for (int i = 0; i < arrLen - 1; i++) {
    for (int j = i + 1; j < arrLen; j++) {
      if (nums[i] == nums[j])
      return true;
    }
  }
  return false;
}
```


**2. 优化的方法，利用 HashMap：**

们可以使用 HashMap 的 - **在 HashMap 中不能含有重复的 key** 这个特性，来实现数组查重。首先将数组元素作为 key，数组索引作为值依次放入 HashMap 中，此时如果数组中有重复元素，则会被 HashMap 最后一个相同元素覆盖掉。接下来比较 HashMap 的大小和数组的长度是否相等，如果相等则没有重复元素，否则数组含有重复元素。代码如下所示：

```java
public static boolean containsDuplicateOptimize(int[] nums) {
  Map<Integer,Integer< map = new HashMap<>();
  int arrLen = nums.length;
  
  for (int i = 0; i < arrLen; i++) {
    map.put(nums[i], i);  // 为HashMap赋值
  }
  
  int result = map.size();
  if (arrLen != result) {
    return true;
  }
  return false;
}
```



**3. 更加优化的方法，同样使用 HashMap：**

这一次我们并不需要把所有元素都放入 HashMap，即不通过比较数组和 HashMap 的大小来判断是否含有重复元素。而是在每次从数组中取一个元素放入 HashMap时，先检查 HashMap 中是否含有此元素，如果没有则放入 HashMap，并继续从数组中取下一个元素，否则返回 `false` 。时间复杂度 “O(n)”。代码如下所示：

```java
public static boolean containsDuplicateOptimizeFurther(int[] nums) {
  Map<Integer,Integer< map = new HashMap<>();
  int arrLen = nums.length;
  
  for (int i = 0; i < arrLen; i++) {
    if (map.containsKey(nums[i])) {
      return true;
    } else {
      map.put(nums[i], i);
    }
  }
  return false;     
}
```


**4. 效率更高的方法：**

这里基于 “**Big-O notation**” 理论告诉我们：只有当 n 是一个比较大的数时，“O(n)” 的算法才会体现出其优势。那么这里我们可以采用先排序，再判断相邻元素是否相等来解决此题目。常用的排序算法比如**堆排序**，在最坏情况下会有 “O(nlogn)” 的时间复杂度。

```java
public boolean containsDuplicateSort(int[] nums) {
  Arrays.sort(nums);
  for (int i = 0; i < nums.length - 1;++i) {
    if (nums[i] == nums[i + 1]) return true;
  }
  return false;
}
```



* **更正**：对于上述的第二种和第三种方法，我们完全可以只使用 Set 即可，并不需要使用 HashMap。示例更正代码如下：

```java
public static boolean containsDuplicateSet(int[] nums) {
  Set<Integer< set = new HashSet<>();

  int arrLen = nums.length;
  
  for (int i = 0; i < arrLen; i++) {
    set.add(nums[i]);
  }
  
  int result = set.size();
  if (arrLen != result) {
    return true;
  }
  return false;
}
```
