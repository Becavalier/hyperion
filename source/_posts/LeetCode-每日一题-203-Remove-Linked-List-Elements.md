---
title: LeetCode 每日一题 - 203. Remove Linked List Elements
intro: LeetCode 每日一题系列，今天第十七题。好久不见，不管事情有多忙，算法还是要继续学习和研究下去，今天的是一道十分简单的链表题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Linked List】
comments: false
date: 2016-06-15 16:47:28
tags:
- 算法
- LeetCode
---


LeetCode 每日一题系列，今天第十七题。好久不见，不管事情有多忙，算法还是要继续学习和研究下去，今天的是一道十分简单的链表题。建议先看原题的链接自己做一下，然后再参考本文给出的分析与解答进行总结。【Linked List】

#### 203. [Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/)：

> Remove all elements from a linked list of integers that have value val.

**Example：**

```text
Given: 1 --> 2 --> 6 --> 3 --> 4 --> 5 --> 6, val = 6

Return: 1 --> 2 --> 3 --> 4 --> 5
```

**0. 题目大意：**

给定一个链表的头（Head）节点，和一个数值 **val**，去除链表中所有数值等于 **val** 的节点。

**1. 常规方法，链表删除特定节点：**

最基本的思路无非是遍历整个链表的所有节点，只要该节点的 **val** 属性值等于给定的值，便在链表中去掉该节点。在去掉链表节点的过程中，应该遵循以下原则：

* 先将该节点的上一个节点的 **next** 指针指向该节点的下一个节点；
* 然后再删除该节点即可；

这里的代码中还用到了另一个小的思路：在该链表的头节点前加入一个“伪节点”，这个“伪节点”的作用是为了保持删除头节点和删除其他节点的方式保持一致，即均遵循我们上述的步骤。代码如下所示：

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *   int val;
 *   ListNode next;
 *   ListNode(int x) { val = x; }
 * }
 */

public class Solution {
  public ListNode removeElements(ListNode head, int val) {  
    // 在头节点前加入“伪节点”；
    ListNode fakeNode = new ListNode(0);  
    fakeNode.next = head;  
    // 两个节点指针分别指向“伪节点”和“首节点”；
    ListNode p = fakeNode;  
    ListNode q = head;  
    // 当下一个节点存在时继续遍历；
    while (q! = null) {  
      if (q.val == val) {  
        // 删除该节点；
        p.next = q.next;  
      } else {  
        // p 指针后移；
        p = p.next;  
      }  
      // q 指针后移；
      q = q.next;  
    }  
    
    // 返回“首节点”
    return fakeNode.next;  
  }  
}
```

```text
63 / 63 test cases passed.
Status: Accepted
Runtime: 2 ms
```
