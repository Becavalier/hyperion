---
title: LeetCode 每日一题 - 1. Two Sum
intro: LeetCode 每日一题系列，今天第一题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。提高算法能力，势在必行。【Array】【HashMap】
comments: true
date: 2016-04-11 22:40:19
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第一题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。提高算法能力，势在必行。【Array】【HashMap】

#### 1. [Two Sum](https://leetcode.com/problems/two-sum/)：

> Given an array of integers, return **indices** of the two numbers such that they add up to a specific target. You may assume that each input would have **exactly** one solution.

**Example：**

```text
Given nums = [2, 7, 11, 15], target = 9,

Because nums[<strong>0</strong>] + nums[<strong>1</strong>] = 2 + 7 = 9,
return [<strong>0</strong>, <strong>1</strong>].
```

**1. 最基本的方法，遍历寻找所有可能：**

大部分人解答本题时的第一想法都会是采用遍历所有可能性的方法，遍历出所有可能得到的值，然后再在这些值中查找与 target 目标相等的值。将 start 和 end 作为任意两个数的指针，依次移动两个指针，遍历所有值。如果 start 和 end 指针指向的两个值与 target 相等则返回 start 和 end 两者组成的位置索引数组。该算法的时间复杂度为 “O(n2)”。实现代码如下：

```java
public static int[] twoSum(int[] nums, int target) {
    int numsLength = nums.length;
    int start = 0, end = 0;
    
    int[] resultArr = new int[] {};
    while (start < numsLength - 1) {  // 最外层循环移动 start 指针；
    	end = start + 1;  // end 永远位于 start 后面；
    	
    	int stepLength = numsLength - end;  // 每一次循环 end 指针需要走的步长；
    	
    	for (int i = 0; i< stepLength; i ++) {  // 最内层循环移动 end 指针；
    		if ((nums[start] + nums[end]) == target) {  // 判断每一次遇到的值是否与 target 相等；
    			return new int[] {start, end};
    		} else {
    			end++;
    		}
    	}
    	start++;
    }   
    return resultArr;
}
```

**2. 优化的算法，利用 HashMap：**

利用 HashMap，将给定数组的值作为 HashMap 的 Key，每个值对应的索引位置作为 Value。接下来通过一次循环查询 target 值减去当前 HashMap 指向的值所得到的值是否在 HashMap 中即可，如果存在则直接返回该元素和当前 HashMap 指向元素的位置。该算法的时间复杂度为 “O(n)”，实现代码如下：

```java
public static int[] twoSumOptimize(int[] nums, int target) {
    int numsLength = nums.length;
    Map<Integer, Integer> map = new HashMap<>();
	
    for (int i = 0; i < numsLength; i++) {  // 为 HashMap 赋值，重复值只会取最后一次出现的，重复值无用；
        map.put(nums[i], i);
    }
    
    for (int i = 0; i < numsLength; i++) {  // 开始遍历查询；
        int search = target - nums[i];  // 得到与当前值的匹配值；
        if (map.containsKey(search) && map.get(search) != i) {  // 查询匹配值是否存在于 HashMap 中，并且匹配值不能是自己； 
            return new int[] {i, map.get(search)};
        }
    }
    return new int[] {};
}
```

**3. 更加优化的算法，优化 HushMap 的执行流程：**

此处的大致思路与第二种方法相同，即也是通过利用 HashMap 来实现快速查询的。优化的地方在于不再单独创建循环为 HashSet 赋值，而是利用每次在 HashSet 中查找时同时在 HashSet 中加入新的值，这种方法可以减少一次赋值循环，但对于所查找的两个值的位置，只有在搜索靠后的值时，整个过程才会返回结果。（因为搜索到第一个匹配值时，第二个匹配值还没有被放到 HashSet 中）。该算法的时间复杂度同样为 “O(n)”，实现代码如下：

```java
public static int[] twoSumFurtherOptimize(int[] nums, int target) {
    int numsLength = nums.length;
    int[] resultArr = new int[] {};
    Map<Integer, Integer> map = new HashMap<>();
	
    for (int i = 0; i < numsLength; i++) {
        int search = target - nums[i];
        if (map.containsKey(search) && map.get(search) != i) {
            return new int[] {map.get(search), i};
        }
        map.put(nums[i], i);  // 向 HashSet 中插入值；
    }
    return resultArr;
}
```
