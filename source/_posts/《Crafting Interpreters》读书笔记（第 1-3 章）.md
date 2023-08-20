---
title: 《Crafting Interpreters》读书笔记（第 1-3 章）
intro: 这本《Crafting Interpreters》实际上几年前就发现并且收藏了，直到昨天看了作者 Robert Nystrom 的博客后才想起来。Robert 去年刚过而立之年，目前在 Google 从事 Dart 语言的研发工作。我对好书没有抵抗力，立马放下手头的其他书和项目，来感受一下优秀人的文字魅力。
comments: false
date: 2023-07-18 11:25:00
tags:
- 计算机
- Interpreter
---

这本《Crafting Interpreters》实际上几年前就发现并且收藏了，直到昨天看了作者 Robert Nystrom 的博客后才想起来。Robert 去年刚过而立之年，目前在 Google 从事 Dart 语言的研发工作。我对好书没有抵抗力，立马放下手头的其他书和项目，来感受一下优秀人的文字魅力。

### Chapter 1 - Introduction

1. **self-hosting** (自举): implement a compiler in the same language it compiles.

### Chapter 2 - A Map of the Territory

2. 编译器实现路径全景：

![](1.png)

* ***Scanning*** (lexing): takes in the linear stream of characters and chunks them together into tokens (.e.g: "(", "123", "min").
* ***Parsing***: takes the flat sequence of tokens and builds a tree structure (AST) that mirrors the nested nature of the grammar. 
* ***Static Analysis***: identifier resolution, type check, and etc. The extra information could be stored as attributes on the AST, or in a separate symbol table.
* ***Intermediate Representations*** (IR): a few well-established styles of IRs out there, .e.g: “control flow graph”, “static single-assignment”, “continuation-passing style”, and “three-address code”.
* ***Optimization***: “constant propagation”, “common subexpression elimination”, “loop invariant code motion”, “global value numbering”, “strength reduction”, “scalar replacement of aggregates”, “dead code elimination”, and “loop unrolling”, and etc.
* ***Code Generation***: generate code for a real CPU or a virtual one?
* ***Virtual Machine***: a program that emulates a hypothetical chip supporting your virtual architecture at runtime. 
* ***Runtime***: provide services like GC, reflection. **In a fully compiled language, the code implementing the runtime gets inserted directly into the resulting executable**. In, say, Go, each compiled application has its own copy of Go’s runtime directly embedded in it. If the language is run inside an interpreter or VM, then the runtime lives there, .e.g Java, Python, and JS.

### Chapter 3 - The Lox Language

3. An expression’s main job is to **produce a value**, a statement’s job is to **produce an effect**. An expression followed by a semicolon (;) promotes the expression to statement-hood. 
4. ***first class members***: it means they are real values that you can get a reference to, store in variables, pass around, etc.
5. Approaches of achieving object:

* ***Class***: two core concepts of "instances" and "classes". **To call a method on an instance, there is always a level of indirection**. You look up the instance’s class and then you find the method there.
  * Instances store the state for each object and have a reference to the instance’s class. 
  * Classes contain the methods and inheritance chain. 
* ***Prototype***: more fundamental, only objects, and each individual object may contain state and methods. Objects can directly inherit from (delegate to) each other.

### Chapter 4 - Scanning

6. 
7. 
8. 
9. 
10. 
11. 