---
title: LeetCode 每日一题 - 100. Same Tree
intro: LeetCode 每日一题系列，今天第十九题。又是一段时间没有更新了，今天换换思路，不再是 Array 和 String，来玩转一下简单的二叉树吧。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Tree】 【Depth-first-search】
comments: false
date: 2016-07-07 18:45:22
tags:
- 算法
- LeetCode
---

LeetCode 每日一题系列，今天第十九题。又是一段时间没有更新了，今天换换思路，不再是 Array 和 String，来玩转一下简单的二叉树吧。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Tree】 【Depth-first-search】

#### 100. [Same Tree](https://leetcode.com/problems/same-tree/)：

> Given two binary trees, write a function to check if they are equal or not.

> Two binary trees are considered equal if they are structurally identical and the nodes have the same value.

**0. 题目大意：**

给定两个二叉树的头节点，判断这两个二叉树的结构以及各个节点的值是否相同。即判断这两个二叉树是否完全相等（结构和每个节点的值）。

**1. 基本方法，DFS：**

基本的思路就是基于二叉树的 DFS 算法，即“深度优先搜索”算法。通过对二叉树进行 “DFS” 运算，我们可以得到一个遍历序列，这个序列中包括了该二叉树所有节点的值，通过判断这两个二叉树分别得到的遍历序列是否完全相同即可以判断两个二叉树是否完全相等。

实现 “DFS” 的基本思路即使用“栈”来模拟对二叉树的“先序遍历”，代码如下所示：

```java
public class Solution {
  public boolean isSameTree(TreeNode p, TreeNode q) {
    ArrayList a1 = Solution.depthOrderTraversal(p);
    ArrayList a2 = Solution.depthOrderTraversal(q);
			
    return a1.equals(a2);
  }

  public static ArrayList depthOrderTraversal(TreeNode t) {
    if (t == null) 
      return new ArrayList();
		
    Stack <TreeNode> nodeStack = new Stack <TreeNode>();
    TreeNode node;
    ArrayList result = new ArrayList();
		
    nodeStack.push(t);
		
    while (!nodeStack.isEmpty()) {
      node = nodeStack.pop();
			
      if (node == null) {
        result.add(null);
      } else {
        result.add(node.val);
				
        nodeStack.push(node.right);
        nodeStack.push(node.left);
      }
    }
    // 返回遍历后的序列；
    return result;	
  }
}
```

```text
54 / 54 test cases passed.
Status: Accepted
Runtime: 3 ms
```
