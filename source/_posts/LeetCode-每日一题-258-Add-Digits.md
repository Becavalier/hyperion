---
title: LeetCode 每日一题 - 258. Add Digits
intro: LeetCode 每日一题系列，今天第十二题。“Digital Root” 又名数根 (又称位数根或数字根) 是自然数的一种性质，今天我们就来看一道跟“数根”有关的题目。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Math】
comments: true
date: 2016-05-06 18:35:40
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第十二题。“Digital Root” 又名数根 (又称位数根或数字根) 是自然数的一种性质，今天我们就来看一道跟“数根”有关的题目。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Math】

#### 258. [Add Digits](https://leetcode.com/problems/add-digits/)：

> Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

**Example：**

```text
Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return it.
```


**0. 题目大意：**

给定一个非负整数，将其各个分位的数字相加得到一个整数 N，若 N 为一个个位数则返回 N，否则继续将 N 的各个分位的数字继续相加循环上述过程，直到相加的结果为一个个位数为止。实际上，事实上，该算法即为计算给定整数的数根。


**1. 基本方法，递归：**

如果对 “Digital Root” 没有任何概念的话，第一个想到的方法就是利用递归来解决此问题。将给定数字拆分成字符数组，并将得到的字符数组所有项全部相加再转换成整数类型，若此时的整数不满足仅为一个个位数，则再次重复上述过程。代码如下所示：

```java
public static int addDigits(int num) {
    String temp = String.valueOf(num);
    char [] tempCharArr = temp.toCharArray();
    int amount = 0;
    
    if (tempCharArr.length <= 1){
    	return num;
    }
    
    for (int i = 0; i < tempCharArr.length; i++){
    	amount = amount + Integer.parseInt(String.valueOf(tempCharArr[i]));
    }
    
    return Main.addDigits(amount);
}
```


**2. 优化的方法，公式推导：**

我们可以直接利用推导出的专门用来求给定数字“数根”的公式，下边会给出推导方法。时间复杂度 “O(1)”。代码如下所示：

```java
public static int addDigitsOptimize(int num) {
    // Use formula；
    return num - 9 * ((num - 1) / 9);
}
```


* **附：数根推导**：

我们可以很容易的发现，任何一个正整数的数根都**不会超过数字9**，例如：11 的数根为 2，而 11 为 9 之后的第二个数字；2035 的数根为 1，而 (2035 - 1) 为 9 的倍数；因此我们可以通过 **floor 函数**（向下取整）来得出数根计算公式如下。

```text
dr(n) = 1 + ((n - 1) mod 9);
```

* **附：数根特性**：

数根还有一些常用特性如下，大家可以适当了解一下：

```text
dr(a + b) = dr(dr(a) + dr(b));

dr(n) = 0 => n = 0;

dr(n) > 0 => n > 0;

dr(n) = n => n ∈ {1, 9};
```

[维基百科：数根（Digital Root）。](https://en.wikipedia.org/wiki/Digital_root#Significance_and_formula_of_the_digital_root)




