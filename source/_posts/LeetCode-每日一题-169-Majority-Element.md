---
title: LeetCode 每日一题 - 169. Majority Element
intro: LeetCode 每日一题系列，今天第五题。昨天由于事情比较多所以没有抽出时间更新文章，今天来一道简单的题，在星期六的日子里轻松一下。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Divide and Conquer】【Array】【Bit Manipulation】
comments: false
date: 2016-04-16 20:09:00
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第五题。昨天由于事情比较多所以没有抽出时间更新文章，今天来一道简单的题，在星期六的日子里轻松一下。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Divide and Conquer】【Array】【Bit Manipulation】

#### 169. [Majority Element](https://leetcode.com/problems/majority-element/)：


> Given an array of size n, find the majority element. The majority element is the element that appears **more than ⌊ n/2 ⌋** times.

> You may assume that the array is non-empty and the majority element always exist in the array.

<strong>Example:</strong>

```text
Given nums = [2, 7, 2, 15, 2, 7, 2],

Because integer 2 appears more than 3.5 times, so after your function it should return integer 2.
```

**1. 利用HashMap：**

相信经过前面几道题目的经验加成，这里大家第一个想到的就是利用 HashMap 来存储每个元素出现的次数。并且使用优化过的 HashMap 流程，即不需要将所有元素的个数全部统计出来后再判断，而是每次循环时先检查 HashMap 里是否含有当前元素，如果有则判断当前元素出现的次数（即 HashMap 中该元素所对应的 Value）是否超过数组长度的一半，如果超过则返回，否则 HashMap 里该元素的 Value 值加一。代码时间复杂度 “O(n)”。代码如下所示：

```java
public static int majorityElement(int[] nums) {
  if (nums.length == 0)  // 如果数组长度为0则返回-1；
  	return -1;
  
  int arrLen = nums.length;
  Map<Integer, Integer> map = new HashMap<>();
  for (int i = 0;i < arrLen; i++) {
  	int currentVal = 0;
  	if (map.containsKey(nums[i]))  // 如果 HashMap 中存在该值对应的元素则使用该值；
  		currentVal = map.get(nums[i]);

  	if (currentVal > arrLen / 2) {  // 如果满足条件则返回该元素；
  		return nums[i];
  	} else {
  		map.put(nums[i], currentVal + 1);  // 否则对应元素值加一；
  	}
  }
  
  return -1;
}
```



**2. 优化的方法，堆排序：**

如果仔细阅读题目可以发现题目中已经假定数组一定为非空数组，并且一定含有一系列元素的值满足所给条件，即该值对应元素在数组中出现的次数大于数组长度的一半。这里我们便可以采用先排序后取值的方法，如果一个元素满足上述所给条件，则排序后的数组的**中间（Middle）元素**一定为所求元素。这里我们直接使用 Java 自带的堆排序方法进行排序。代码如下所示：

```java
public static boolean majorityElementOptimize(int[] nums) {
  if (nums.length == 0)
    return -1;
  
  int arrLen = nums.length;
  Arrays.sort(nums);  // 对数组进行堆排序；
  return nums[arrLen / 2];  // 返回中间元素；
}
```


3、**另一种思路**：

网友 “**JD**” 给出的另一种思路，Majority 的元素总量会占到数组一半以上，所以不同数字两两相抵之后 Majority 元素的剩余数量一定大于0。代码如下所示：

```java
public static int majorityElementOptimize(int[] nums) {
  if (nums.length == 0)
    return -1;
  
  int arrLen = nums.length;
  int mark = nums[0], count = 1;
  for (int i = 1; i < arrLen; i++) {
    if (count == 0) {
      mark = nums[i];
      count = 1;
      continue;
    }

    if (nums[i] != mark) {
      count--;
    }
    
    if (nums[i] == mark) {
      count++;
    }
  }
  
  return mark;
}
```
