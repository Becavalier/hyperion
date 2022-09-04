---
title: Mac 配置 Commom Lisp 开发环境
intro: 由于最近在工作中遇到了一些使用 Lisp 语言编写的项目，因此在这里记录一下在 Mac 上配置 Common Lisp 编译和运行环境的步骤。这里以配置 Open-VRP 项目为主要目标。Open-VRP 是一个使用 Lisp 编写的基于启发式 Tabu Search 算法用于解决类 VRPTW 问题的工具库。
comments: false
date: 2017-06-29 13:32:42
tags:
- Lisp
---

由于最近在工作中遇到了一些使用 Lisp 语言编写的项目，因此在这里记录一下在 Mac 上配置 Common Lisp 编译和运行环境的步骤。这里以配置 Open-VRP 项目为主要目标。Open-VRP 是一个使用 Lisp 编写的基于启发式 Tabu Search 算法用于解决类 VRPTW 问题的工具库。

#### 1、安装 SBCL：

Steel Bank Common Lisp（SBCL）是一个高性能的 Common Lisp 编译器。除了 ANSI Common Lisp 的编译器和运行时系统之外，它还提供了一个交互式环境，包括调试器，统计分析器，代码覆盖工具以及许多其他扩展。它将 Lisp 直接编译为机器语言，并可生成接近或有时比类似 C 或 Java 代码速度更快的机器语言。

在 Mac 上，我们可以直接通过 `brew` 来安装 SBCL 的环境。

 
```bash
brew install sbcl
```

#### 2、安装 QuickLisp：

由于 Open-VRP 项目使用了多种 Lisp 上的第三方包，我们接下来安装 QuickLisp 来方便地对 Lisp 的第三方包进行安装和管理。这里直接使用官方给出的安装脚本进行安装。

 
```bash
curl -O https://beta.quicklisp.org/quicklisp.lisp

# 使用已安装的 SBCL 快速加载安装脚本；
sbcl --load quicklisp.lisp
```

执行上述两条命令后会进入 SBCL 的命令行交互界面，同时自动加载 QuickLisp 到当前的环境中。我们可以通过下面给出的命令来查看、安装和卸载第三方库。

```bash
# 手动加载 QuickLisp 到当前环境；
(load "~/quicklisp/setup.lisp")

# 安装 QuickLisp；
(quicklisp-quickstart:install)

# 加载一个第三方库；
(ql:quickload "system-name")

# 查找一个第三方库；
(ql:system-apropos "term")

# 卸载一个第三方库；
(ql:uninstall "system-name")

# 进入 SBCL 时自动加载 QuickLisp；
(ql:add-to-init-file)
```

#### 3、开始使用：

接下来我们将 Open-VRP 的代码克隆到本地，直接在 SBCL 中执行下列命令即可开始使用该框架的功能。

 
```bash
(push "/Users/jason/Desktop/Repo/Open-VRP/" asdf:*central-registry*)
(require 'open-vrp)
(in-package :open-vrp)
```

比如我们尝试使用 Open-VRP 来解决一个预设的 Solomon's VRPTW 问题：

 
```bash
(solve-prob solomon100 (make-instance 'tabu-search :iterations 100))
```
