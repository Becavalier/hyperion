---
title: Linux 共享库应用 --version-script
intro: 传统 Linux 共享库的 SO-NAME 机制无法解决当依赖共享库的次版本号不同时可能带来的符号不兼容问题。为此，可以为共享库添加 Version Script 以标记其中各符号所对应的次版本号，当所依赖版本符号不存在时便可以给出相对友好的提示信息。不仅如此，借助 Version Script 我们还可以向应用程序屏蔽共享库的一些内部工具符号。
comments: false
date: 2020-06-23 18:18:37
tags:
- 计算机
---

传统 Linux 共享库的 SO-NAME 机制无法解决当依赖共享库的次版本号不同时可能带来的符号不兼容问题。为此，可以为共享库添加 Version Script 以标记其中各符号所对应的次版本号，当所依赖版本符号不存在时便可以给出相对友好的提示信息。不仅如此，借助 Version Script 我们还可以向应用程序屏蔽共享库的一些内部工具符号。

使用的 Clang 版本：

> clang version 10.0.0-4ubuntu1 
Target: x86_64-pc-linux-gnu
Thread model: posix
InstalledDir: /usr/bin

首先是共享库的 C 代码：

```c
// lib.c
int add(int x, int y) {
  return x + y;
}
int minus(int x, int y) {
  return x - y;
}
void foo() {}
```

这里我们将导出函数 add 和 minus，而函数 foo 为内部使用函数，该函数将会在 Version Script 进行屏蔽。接下来给出符号版本脚本文件 “**lib.ver**” 的内容：

```text
VERS_1.0 {
  global:
    add;
  local:
    *;
};

VERS_1.1 {
  global:
    minus;
} VERS_1.0;
```

这里我们定义了两个版本（VERS_1.0 / VERS_1.1）的符号集合，每个符号集合都通过 **global** 字段标记了需要被导出的符号名称；其中 VERS_1.1 版本继承了版本 VERS_1.0 的导出规则。我们继续编译共享库：

```bash
clang lib.c -o lib.so -shared -fPIC -Xlinker --version-script lib.ver
```

接下来，我们查看一下该共享库的内容：

```bash
readelf -a lib.so | grep "VERS_1*"
```

```text
     5: 0000000000001120    18 FUNC    GLOBAL DEFAULT   12 minus@@VERS_1.1
     6: 0000000000001100    18 FUNC    GLOBAL DEFAULT   12 add@@VERS_1.0
     7: 0000000000000000     0 OBJECT  GLOBAL DEFAULT  ABS VERS_1.0
     8: 0000000000000000     0 OBJECT  GLOBAL DEFAULT  ABS VERS_1.1
    46: 0000000000000000     0 OBJECT  GLOBAL DEFAULT  ABS VERS_1.1
    49: 0000000000000000     0 OBJECT  GLOBAL DEFAULT  ABS VERS_1.0
  004:   4 (GLIBC_2.2.5)   3 (VERS_1.1)      2 (VERS_1.0)      2 (VERS_1.0)   
  008:   3 (VERS_1.1)   
  0x001c: Rev: 1  Flags: none  Index: 2  Cnt: 1  Name: VERS_1.0
  0x0038: Rev: 1  Flags: none  Index: 3  Cnt: 2  Name: VERS_1.1
  0x0054: Parent 1: VERS_1.0
```

可以看到，函数 minus 与 add 被分别标记上了 VERS_1.1 与 VERS_1.0 两个次版本标记。接下来，我们编写一个 main 函数来使用该共享库中的符号：

```c
// main.c
#include <stdio.h>
extern int minus(int, int);
int main(int argc, char** argv) {
  printf("%d\n", minus(10, 20));
  return 0;
}
```

编译并运行：

```bash
clang main.c ./lib.so -o main
./main  # -10;  
```

然后重新编译 lib.so，并让其只保留 VERS_1.0 版本的符号，并重新运行该程序的 ELF 二进制文件，可以看到动态链接器输出的如下错误信息：

```text
./main: ./lib.so: version `VERS_1.1' not found (required by ./main)
```

最后需要注意，**Linux 下的 Version Script 只能应用在 C 代码上**，Glibc 便使用了该方式来管理符号版本的演化。
