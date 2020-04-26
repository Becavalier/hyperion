---
title: LeetCode 每日一题 - 342. Power of Four
intro: LeetCode 每日一题系列，今天第十题。双休日因为事情繁多，所以没有来得及更新，感到十分愧疚。今天的题目是一道关于“二进制”的题目，也是 LeetCode 上的新题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Bit Manipulation】
comments: true
date: 2016-04-25 10:00:00
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第十题。双休日因为事情繁多，所以没有来得及更新，感到十分愧疚。今天的题目是一道关于“二进制”的题目，也是 LeetCode 上的新题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Bit Manipulation】

#### 342. [Power of Four](https://leetcode.com/problems/power-of-four/)：


> Given an integer (signed 32 bits), write a function to check whether it is a power of 4.

**Example:**

```text
Given num = 16, return true. 

Given num = 5, return false.
```

**0. 题目大意：**

给出一个长度为32位的整数，判断该整数是否为4的幂指数。

**1. 最基本的方法，循环相除：**

我们知道，一个数 P 的 N 次幂指数即 N 个该数（P）相乘。那么相反的，想要判断一个数是否为该数(P)的幂指数，可以通过将此数与 P 相除，如果通过 N 次相除后得到的值为1（除尽），并且每次相除时的余数均为0，我们即可判断该数为 P 的幂指数。另外还要考虑两种情况，即数字1为任意数的0次幂指数，数字0不是任何数的幂指数。代码如下所示：

```java
public static boolean isPowerOfFour(int num) {
  if (num == 1)  // 单独处理数字1；
    return true;
    
  while (num % 4 == 0 && num != 0) {
    num = num / 4;
    if (num == 1)
      return true;
  }
    
  return false;
}
```


**2. 优化的方法，利用二进制的规律：**

另一种方法，我们可以参考如下规律：

```text
4    ---> ‭0100‬
16   ---> ‭0001 0000‬
64   ---> ‭0100 0000‬
256  ---> ‭0001 0000 0000‬
1024 ---> ‭0100 0000 0000
4096 ---> ‬‭0001 0000 0000 0000‬
...
```

从上述列出的几个连续的4的幂指数可以发现，这些数的二进制形式符合以下规律：除前四位剩余位数均为0，前四位只有两种形式即：“0001”和 “0100”，即数字1后出现的0的个数为0个或2个，利用此规律，我们可以得到如下解题方法。代码如下所示：

```java
public static boolean isPowerOfFourOptimize(int num) {
  if (num == 1)  // 单独处理数字1；
    return true;
    
  if (num == 0)  // 单独处理数字0；
    return false;
    
  String binaryCode = Integer.toBinaryString(num);  // 获取给定数字的二进制形式（没有前置0补全，即以1开头）；
    
  String lastPos = binaryCode.substring(1);  // 获取二进制数除第一位之后的所有位数字；
  int lastPosVal = Integer.valueOf(lastPos, 2);  // 除第一位数之后所有位数组成的二进制数字的值；
    
  if (lastPosVal == 0 && (lastPos.length() % 4 == 0 || lastPos.length() % 4 == 2))  // 满足条件则返回 true；
    return true;
  else
    return false;
}
```