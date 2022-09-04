---
title: GC：理解与实现（基于 Mark-and-Sweep）
intro: 本文主要介绍了如何使用 C++ 快速构建一个简单的 Garbage Collector。为了简化实现过程，实践中我们将使用相对简单的 “Mark-and-Sweep” 算法，以及一些可选的算法变体（多空闲链表、位图标记）。
comments: false
published: false
date: 2021-05-25 16:02:13
tags:
- GC
---

本文主要介绍了如何使用 C++ 快速构建一个简单的 Garbage Collector。为了简化实现过程，实践中我们将使用相对简单的 “Mark-and-Sweep” 算法，以及一些可选的算法变体（多空闲链表、位图标记）。

（占坑）

### 参考资料

1. *https://maplant.com/gc.html.*
2. *http://dmitrysoshnikov.com/compilers/writing-a-mark-sweep-garbage-collector/.*
3. *http://journal.stuffwithstuff.com/2013/12/08/babys-first-garbage-collector/.*
4. *https://medium.com/@NTulswani/understanding-and-implementing-a-garbage-collector-a19afb1bc418.*
5. *https://www.udemy.com/course/memory-leak-detector/.*
6. *https://en.wikipedia.org/wiki/Garbage_collection_(computer_science).*
