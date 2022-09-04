---
title: LeetCode 每日一题 - 104. Maximum Depth of Binary Tree
intro: LeetCode 每日一题系列。本文算法题目：给出一个二叉树和其根节点，给出该二叉树的最大深度（指树中最长路径所经过的所有节点数量）。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Tree】 【Depth-first Search】
comments: false
date: 2016-09-17 22:32:01
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列。本文算法题目：给出一个二叉树和其根节点，给出该二叉树的最大深度（指树中最长路径所经过的所有节点数量）。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Tree】 【Depth-first Search】

#### 104. [Maximum Depth of Binary Tree ](https://leetcode.com/problems/maximum-depth-of-binary-tree/)：

> Given a binary tree, find its maximum depth.

> The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**0. 题目大意：**

给出一个二叉树和其根节点，给出该二叉树的最大深度（指树中最长路径所经过的所有节点数量）。

**1. 基础解法：**

直接使用 DFS 来计算树的最大深度。代码如下所示：


```java
public class Solution {
  public int maxDepth(TreeNode root) {  
    if (root == null) {  
      return 0;  
    }  
    int res = 1;  
    int left = maxDepth(root.left);  
    int right = maxDepth(root.right);  
    return left > right ? left + 1 : right + 1;  
  }  
}
```

```text
38 / 38 test cases passed.
Status: Accepted
Runtime: 0 ms
```
