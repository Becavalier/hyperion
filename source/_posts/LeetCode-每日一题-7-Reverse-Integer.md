---
title: LeetCode 每日一题 - 7. Reverse Integer
intro: LeetCode 每日一题系列，今天第十四题。今天这道题既可以看成是一道字符串的题目，也可以看成是一道数学相关的题目。两种解题方法对应着两种不同的思路，要学会从不同的角度去思考问题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Math】
comments: true
date: 2016-05-10 18:22:08
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第十四题。今天这道题既可以看成是一道字符串的题目，也可以看成是一道数学相关的题目。两种解题方法对应着两种不同的思路，要学会从不同的角度去思考问题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Math】

#### 7. [Reverse Integer](https://leetcode.com/problems/reverse-integer/)：

> Reverse digits of an integer.

> For the purpose of this problem, assume that your function **returns 0** when the reversed integer **overflows**.

**Example：**

```text
Example1: x = 123, return 321

Example2: x = -123, return -321
```

**0. 题目大意：**

给定一个数字，求将该数所有位上的数倒序排列后新生成的数，新数和原数的正负性保持不变。

**注意**：如果新数的大小不在 Int 类型的范围内（过大或过小）则返回数字0。

**1. 第一种方法，当做字符串：**

思路很简单，首先将给定的数字转换成字符串，然后再将该字符串分割转换成字符数组。此时使用我们常用的“双指针”法将数组内的所有元素倒序排列，再转换成整数类型即可。不要忘记检测转换之后的整数是否有溢出的问题，这里直接使用 `try...catch` 语句来检查是否有 **NumberFormatException** 异常出现。代码如下所示：

```java
public static int reverse(int x) {
    // 保存原数字的正负符号；
    int flag = (x > 0) ? 1 : -1;
    int result = 0;

    // 取绝对值；
    x = Math.abs(x);

    // 开始拆分；
    String temp = String.valueOf(x);
    char [] tempChar = temp.toCharArray();
    
    // 用双指针方法“倒序”排列原数字；
    for (int i = 0; i < tempChar.length; i++) {
    	int j = tempChar.length - i - 1;
    	
    	if(i >= j)
    		break;
    	
    	char tempInt = tempChar[i];
    	tempChar[i] = tempChar[j];
    	tempChar[j] = tempInt;
    }
    
    try {
    	result = Integer.parseInt(String.valueOf(tempChar)) * flag;
    } catch (NumberFormatException e) {  // 如果遇到溢出，则返回0；
    	return 0;
    }
    
    return result;
}
```

```text
1032 / 1032 test cases passed.
Status: Accepted
Runtime: 6 ms
```

**2. 第二种方法，当做数字：**

第二种方法的思路同样也十分简单，既然传进来的是一个数字那么我们就直接把它当做数字来处理。将数字**循环除10**来获得各个分位上的数字，最后再将各个分位的数字乘以对应的10的幂次（注意低分位应该乘以高分位对应阶数的10的幂）重新相加即可。代码如下所示：

```java
public static int reverseOptimize(int x) {
    // 保留正负性；
    int flag = (x > 0) ? 1 : -1;

    // 取绝对值；
    x = Math.abs(x);
    String temp = String.valueOf(x);

    // 获得数字位数；
    char [] tempChar = temp.toCharArray();
    int bitLen = tempChar.length;
    int i = 1;
    long container = 0;

    // 循环次数为位数；
    while (i <= bitLen) {
        int bit = x % 10;  // 取出该位；
        container = (long)(container + bit * Math.pow(10, bitLen - i++)); // 用一个 Long 型变量来存储最后的值（防止溢出）；
            
        // 溢出则返回0；
        if (container > Integer.MAX_VALUE || container < Integer.MIN_VALUE)
            return 0;

        x = x / 10;
    }
    
    return (int) container * flag;
}
```

```text
1032 / 1032 test cases passed.
Status: Accepted
Runtime: 4 ms
```