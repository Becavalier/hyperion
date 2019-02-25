---
title: LeetCode 每日一题 - 121. Best Time to Buy and Sell Stock
intro: LeetCode 每日一题系列，今天第六题，今天的题目是一道算法描述问题，需要先读懂题目，然后“翻译”成算法需求，再按照算法需求来解决问题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Array】
comments: true
date: 2016-04-17 19:28:26
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第六题，今天的题目是一道算法描述问题，需要先读懂题目，然后“翻译”成算法需求，再按照算法需求来解决问题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Array】

#### 121. [Best Time to Buy and Sell Stock](https://leetcode.com/problems/majority-element/)：


> Say you have an array for which the ith element is the price of a given stock on day i.

> If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.

**Example：**

```text
Given prices = [2, 7, 11, 15],

Because you can get the maximum profit if you buy at the first day and sell at the forth day. 
Return the maximum profit by one transaction is 13.
```

**0. 题目大意：**

假设有一个数组，其中第 n 个元素的值为第 n 天股票的价格。如果你只有一次买入和卖出的机会，请设计一个算法来寻找你卖出一股的最大收益。例如给出数组 [1, 3, 9, 4, 5, 1, 4]，即第一天的股票价格为1（买入和卖出相同），第二天的股票价格为3，其他以此类推。若只有一次买入和卖出的机会，则在第一天买入，第3天卖出时会获利最大为8。

**1. 最基本的方法，列出所有可能的收益值：**

这里我们能想到的第一种最基本的解决方案就是采用遍历所有可能性的方法来找到最大收益值。请注意题目中的**卖出过程只能在买入之后进行**，因此选取的卖出价格对应的元素一定位于买入元素的后边，即“卖出”价格对应元素的索引一定大于“买入”价格元素的索引，这一点要十分注意。我们这里选择用 HashSet 来存储所有可能出现的收益值。该算法时间复杂度 “O(n2)”。代码如下所示：

```java
public static int maxProfit(int[] prices) {
    int arrLen = prices.length;
    Set<Integer> set = new HashSet<>();
    
    if (arrLen == 0)
        return 0;
        
    for (int i = 0; i < arrLen - 1; i++) {  // i 指针对应元素值为买入价；
        for (int j = i + 1; j < arrLen; j++) {  // j 指针对应元素值为卖出价；
            int maxVal = prices[j] - prices[i];  // 获得所有可能的收益值；
            if (maxVal >= 0)
                set.add(maxVal);  // 将正收益值存入 Set；
        }
    }
    
    if (set.isEmpty())
        return 0;
    
    Integer[] array = (Integer[]) set.toArray(new Integer[set.size()]);  // 将 Set 转换为 Array；
    Arrays.sort(array);  // 对 Array 进行排序；
    return array[array.length - 1];  // 返回最大值，即最大收益值；
}
```


**2. 优化的方法，动态规划：**

此处采用动态规划的方法，两个变量分别保存着当前出现过的最低价格和最大收益，每一次出现比当前最低价格低的元素时便更新当前最低价格变量所存储的值，同时并按照当前最低价格来计算后续出现的最大利益。算法时间复杂度 “O(n)”。代码如下所示：

```java
public static int maxProfitOptimize(int[] prices) {
    int arrLen = prices.length;
    
    if (arrLen == 0)
        return 0;
    
    int maxProfit = 0;
    int curMin = prices[0];
    
    for (int i = 1; i < arrLen; i++) {
        curMin = Math.min(curMin, prices[i]);  // 更新最低价格；
        maxProfit = Math.max(maxProfit, prices[i] - curMin);  // 更新最大收益；
    }
    
    return maxProfit;   
}
```


**3. 效率更高的方法：**你的想法。
