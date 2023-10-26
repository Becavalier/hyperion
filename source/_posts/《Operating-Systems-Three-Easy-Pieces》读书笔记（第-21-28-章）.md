---
title: '《Operating Systems: Three Easy Pieces》读书笔记（第 21-28 章）'
intro: 书接上回，本文是第 21-28 章的笔记。内容基于自身情况记录，仅供参考，Dialogue 的相关章节已略过。
comments: true
date: 2022-12-11 20:56:10
tags:
- OS
- 操作系统
---


书接上回，本文是第 21-28 章的笔记。内容基于自身情况记录，仅供参考，Dialogue 的相关章节已略过。

### Chapter 21: Beyond Physical Memory - Mechanisms

1. ***Swap Space***: some space on the disk for moving pages back and forth (memory <-> disk).

![](1.png)

* Add the "**present bit**" in each PTE (page-table entry), to indicate whether the page is present in the physical memory. If it's set to 0, the page is not in memory but rather on disk somewhere, and it should be retrieved by "**page fault**" (not only for swapping, but also for on-demand binary loading).
* Basic steps: (@ start, - step)
  * (**@**) VA -> 
  * (-) VPN -> 
  * (-) TLB -> 
  * (-) PTE (Page Table) -> 
  * (-) Combine PFNs with Offset to generate PA -> 
  * (-) Cause a "Page Fault" (if present bit is 0) -> 
  * (-) Check if enough space to "swap in" the pages -> 
  * (-) If not, inform the background **paging thread** that free pages are needed, process hangs -> 
  * (**@**) *Interrupt* (freeing completed) -> 
  * (-) Use the information in PTE to trigger a I/O, process hangs.
  * (**@**) *Interrupt* (I/O completed) -> 
  * (-) Change the process state to "Ready".
  * (**@**) Scheduler picks up this process ->
  * (-) Re-run from the memory instructions ->
  * (-) Update TLB with the PA.
* **Page Replacement Policy**: the process of picking a page to kick out, or replace.
* Further Improvements:

![](2.png)


### Chapter 22: Beyond Physical Memory - Policies

（待更新）




