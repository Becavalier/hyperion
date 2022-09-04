---
title: LeetCode 每日一题 - 70. Climbing Stairs
intro: LeetCode 每日一题系列，今天第八题。这是一道读题不用费力、理解十分简单的题目。问题很清晰，但是解决的过程就需要一些思考了。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Dynamic Programming】
comments: false
date: 2016-04-20 09:30:51
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第八题。这是一道读题不用费力、理解十分简单的题目。问题很清晰，但是解决的过程就需要一些思考了。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Dynamic Programming】

#### 70. [Rotate Array](https://leetcode.com/problems/climbing-stairs/)：

> You are climbing a stair case. It takes n steps to reach to the top.

> Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**0. 题目大意：**

假设你正在爬一个楼梯，该楼梯有 **n** 阶，而你有两种爬法，每次爬**一阶**或者**两阶**。那么请问你有多少种爬法能够到达楼梯顶部？


**1. 通用方法，递归：**

抛出性能问题不考虑，对于基本上来说所有的“爬楼梯”问题都可以用递归来解决。递归的模式很清晰，每一次爬楼梯都会有两种选择，两种选择之后又是各有两种选择，以此类推。当剩余台阶数量为**2**时有两种选择：一次爬一阶爬两次，或者一次爬两阶爬一次；而对于剩余台阶数量为**1**时只有一种爬法：爬一阶一次。算法时间复杂度 “O(nk)”。代码如下所示：

```java
public static int climbStairs(int n) {
  if (n == 1) {  // 只剩一阶时只有一种走法；
    return 1;
  }
  
  if (n == 2) {  // 剩两阶时有两种走法；
    return 2;
  }
  
  return climbStairs(n - 1) + climbStairs(n - 2);  // 递归；
}
```


**2. 优化的方法 — Fibonacci：**

如果擅于发现规律，你会发现爬楼梯的方法数量随着楼梯阶数 **n** 的增长正对应着 Fibonacci 数列的第 **n+2** 项的值，Fibonacci（斐波那契）数列如下：0 1 1 2 3 5 8 13 ...，即从第三项开始，该项为前两项的和。这里使用三个变量来实现 Fibonacci 数列。算法时间复杂度 “O(n)”。代码如下所示：

```java
public static int climbStairsOptimize(int n) {
  int a = 0;
  int b = 1;
  int sum = 0;
  
  for (int i = 0; i < n; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }
  
  return sum;
}
```


**3. 使用数组的实现：**

这里使用数组来实现 Fibonacci 数列，为了节省内存，我们并没有把所有的 Fibonacci 数列全部放入数组，对应的我们只是获取需要的部分数列，这也是在使用“动态规划”算法时优化内存的技巧。

```java
public static int climbStairsOptimizeArray(int n) {
  int[] arr = new int[3];
  
  arr[0] = 1;  
  arr[1] = 1;  

  for (int i = 2; i <= n; i++) {  
    arr[i%3] = arr[(i-1)%3] + arr[(i-2)%3];  
  }  

  return arr[n%3]; 
}
```
