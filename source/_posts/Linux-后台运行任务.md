---
title: Linux 后台运行任务
intro: 我们在日常的开发过程中，可能会经常手动的去执行一些脚本来整理数据或者进行一些统计性的任务。而在执行脚本时，我们通常是通过 SSH 终端来与 Linux/Unix 服务器进行连接的；同时我们也可以通过 SSH 终端来执行命令或启动远程服务器上相应的脚本任务。而这种连接通常来说是不稳定的。
comments: true
date: 2016-07-14 14:50:41
tags:
- Linux
---

我们在日常的开发过程中，可能会经常手动的去执行一些脚本来整理数据或者进行一些统计性的任务。而在执行脚本时，我们通常是通过 SSH 终端来与 Linux/Unix 服务器进行连接的；同时我们也可以通过 SSH 终端来执行命令或启动远程服务器上相应的脚本任务。而这种连接通常来说是不稳定的。

在这种“不稳定”的网络连接情况下，如果我们执行了一些耗时较长的任务或命令，则可能会由于 SSH 终端连接的关闭或者其他网络原因导致当前的任务或命令执行中断。而接下来我们要讨论的，便是如何去解决这个问题，使任务能够在 Linux 服务器的后台“默默”的运行，而不会受到终端的影响。以下我们将具体场景分为几种情况来进行讨论。

#### 一、对于未运行的临时后台脚本任务：

**1. nohub 命令：**

`nohup` 命令的使用是十分简单方便的，只需在要处理的命令前加上 `nohup` 即可，标准输出和标准错误缺省会被重定向到当前目录的 “nohup.out” 文件中，即该文件起到了监视日志的作用。一般我们可在结尾加上 **"&"** 符号来将命令同时放入后台运行，同时也可以使用 `">filename 2>&1"` 来更改缺省的重定向文件名（0、1和2分别表示**标准输入**、**标准输出**和**标准错误信息输出**， `>filename` 即将标准输出重定向到文件 “filename” 中， `2>&1`：即将错误信息重定向到标准输出）。用法示例如下：

```bash
[root@pvcent107 ~]# nohup ping www.ibm.com &
[1] 3059
nohup: appending output to 'nohup.out'
[root@pvcent107 ~]# ps -ef | grep 3059
root      3059   984  0 21:06 pts/3    00:00:00 ping www.ibm.com
root      3067   984  0 21:06 pts/3    00:00:00 grep 3059
[root@pvcent107 ~]#
```

**2. setsid 命令：**

**nohup** 命令无疑能够通过忽略 HUP 信号来使我们的进程避免中途被中断。但我们可以换个角度思考，如果我们的进程**不属于**接受 HUP 信号的终端的子进程，那么自然也就不会受到 HUP 信号的影响了。**setsid** 命令就能帮助我们做到这一点。用法示例如下：

```bash
[root@pvcent107 ~]# setsid ping www.ibm.com
[root@pvcent107 ~]# ps -ef | grep www.ibm.com
root     31094     1  0 07:28 ?        00:00:00 ping www.ibm.com
root     31102 29217  0 07:29 pts/4    00:00:00 grep www.ibm.com
[root@pvcent107 ~]#
```

**3. & 操作符：**

我们知道，将一个或多个命名包含在 “()” 中就能让这些命令在子 shell 中运行，从而扩展出很多有趣的功能，我们现在要讨论的就是其中之一。当我们将 "&" 也放入 “()” 内之后，我们就会发现所提交的作业（jobs）并不在作业列表中，也就是说，该作业是无法通过 `jobs` 命令来查看的。用法示例：

```text
[root@pvcent107 ~]# (ping www.ibm.com &)
[root@pvcent107 ~]# ps -ef | grep www.ibm.com
root     16270     1  0 14:13 pts/4    00:00:00 ping www.ibm.com
root     16278 15362  0 14:13 pts/4    00:00:00 grep www.ibm.com
[root@pvcent107 ~]#
```

从上例中可以看出，新提交的进程的父 ID（PPID）为1（即 **init** 进程的 PID），并不是当前终端的进程 ID。因此并不属于当前终端的子进程，从而也就不会受到当前终端的 HUP 信号的影响了。

#### 二、对于已经提交并正在运行中的任务：

**1. disown 命令：**

这时想利用 `nohup` 命令或者 `setsid` 命令已经为时已晚，只能通过作业调度和 `disown` 命令来解决这个问题了。

**disown** 命令有三种常用的操作方式：

* 用 `disown -h <jobspec>` 来使**某个作业**忽略 HUP 信号；
* 用 `disown -ah` 来使**所有的作业**都忽略 HUP 信号；
* 用 `disown -rh` 来使**正在运行的作业**忽略 HUP 信号；


需要注意的是，当使用过 `disown` 命令后，会把目标作业从作业列表中移除，我们将不再能够使用 `jobs` 命令来查看它，但是依然能够用 `ps -ef` 命令查找到它。

但是还有一个问题，这种方法的操作对象是作业，如果我们在运行命令时在结尾加了 **"&"** 来使它成为一个作业并在后台运行，那么就万事大吉了，我们可以通过 `jobs` 命令来得到所有作业的列表。但是如果并没有把当前命令作为作业来运行，如何才能得到它的作业号呢？答案就是用 CTRL-z（按住 Ctrl 键的同时按住 z 键）！

“CTRL-z” 的用途就是将当前进程挂起（Suspend），然后我们就可以用 `jobs` 命令来查询它的作业号，再用 `bg <jobspec>` 来将它放入后台并继续运行。需要注意的是，如果挂起会影响当前进程的运行结果，请慎用此方法。

* 示例1：（如果提交命令时已经用 “&” 将命令放入后台运行，则可以直接使用 “disown”）

```bash
[root@pvcent107 build]# cp -r testLargeFile largeFile &
[1] 4825
[root@pvcent107 build]# jobs
[1]+  Running                 cp -i -r testLargeFile largeFile &
[root@pvcent107 build]# disown -h %1
[root@pvcent107 build]# ps -ef | grep largeFile
root      4825   968  1 09:46 pts/4    00:00:00 cp -i -r testLargeFile largeFile
root      4853   968  0 09:46 pts/4    00:00:00 grep largeFile
[root@pvcent107 build]# logout
```

* 示例2：（如果提交命令时未使用 “&” 将命令放入后台运行，可使用 CTRL-z 和 “bg” 将其放入后台，再使用 “disown”）

```bash
[root@pvcent107 build]# cp -r testLargeFile largeFile2

[1]+  Stopped                 cp -i -r testLargeFile largeFile2
[root@pvcent107 build]# bg %1
[1]+ cp -i -r testLargeFile largeFile2 &
[root@pvcent107 build]# jobs
[1]+  Running                 cp -i -r testLargeFile largeFile2 &
[root@pvcent107 build]# disown -h %1
[root@pvcent107 build]# ps -ef | grep largeFile2
root      5790  5577  1 10:04 pts/3    00:00:00 cp -i -r testLargeFile largeFile2
root      5824  5577  0 10:05 pts/3    00:00:00 grep largeFile2
[root@pvcent107 build]#
```

#### 三、对于大量需要在后台稳定运行的任务：

**1. screen 命令：**

简单的说，`screen` 命令提供了 ANSI/VT100 的终端模拟器，使它能够在一个真实终端下运行多个全屏的伪终端。`screen` 命令的参数很多，具有很强大的功能，我们在此仅介绍其常用功能以及简要分析一下为什么使用 `screen` 能够避免 HUP 信号的影响。

使用 screen 很方便，有以下几个常用选项：

* 用 `screen -dmS <session name>` 来建立一个处于断开模式下的会话（并指定其会话名）；
* 用 `screen -list` 来列出所有会话；
* 用 `screen -r <session name>` 来重新连接指定会话；
* 用快捷键 `CTRL-a d` 来暂时断开当前会话；


* 示例：

```bash
[root@pvcent107 ~]# screen -dmS Urumchi
[root@pvcent107 ~]# screen -list
There is a screen on:
        12842.Urumchi   (Detached)
1 Socket in /tmp/screens/S-root.

[root@pvcent107 ~]# screen -r Urumchi
```

当我们用 “-r” 连接到 screen 会话后，我们就可以在这个伪终端里面做任何事情，再也不用担心 HUP 信号会对我们的进程造成影响，也不用给每个命令前都加上 “nohup” 或者 “setsid” 了。这是为什么呢？让我们来看一下这两个例子吧。

1. 未使用 `screen` 时新进程的进程树：

```bash
[root@pvcent107 ~]# ping www.google.com &
[1] 9499
[root@pvcent107 ~]# pstree -H 9499
init─┬─Xvnc` 
     ├─acpid` 
     ├─atd` 
     ├─2*[sendmail]	
     **├─sshd─┬**─sshd───bash───pstree
     │      ** └─sshd───bash───ping**
```

我们可以看出，未使用 `screen` 时我们所处的 bash 是 sshd 的子进程，当 ssh 断开连接时，HUP 信号自然会影响到它下面的所有子进程（包括我们新建立的 “ping” 进程）。

2. 使用了 `screen` 后新进程的进程树：

```bash
[root@pvcent107 ~]# screen -r Urumchi
[root@pvcent107 ~]# ping www.ibm.com &
[1] 9488
[root@pvcent107 ~]# pstree -H 9488
init─┬─Xvnc
     ├─acpid
     ├─atd
     **├─screen───bash───ping**
     ├─2*[sendmail]
```

而使用了 `screen` 命令后就不同了，此时 bash 是 screen 的子进程，而 screen 是 init（PID 为1）的子进程。那么当 ssh 断开连接时，HUP 信号自然不会影响到 screen 下面的子进程了。

本文转载整理自“IBM 开发者社区”，同时修正了原文中的几处错误，此处为 <b>[原文链接](http://www.ibm.com/developerworks/cn/linux/l-cn-nohup/#ibm-pcon)</b>。



