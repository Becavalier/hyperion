---
title: Clang 下的 weak 与 weakref
intro: 符号表结构中 st_info 字段的高 28 位决定了 ST_BIND 的值，而它的一种枚举值 STB_WEAK 表示了一种特殊类型的符号，即“弱符号”。而对应的一种抽象关系便称为“弱引用”。同时相对的，也有着“强符号”和“强引用”的定义。
comments: true
date: 2020-06-18 13:24:56
tags:
- 计算机
---

符号表结构中 *st_info* 字段的高 28 位决定了 ST_BIND 的值，而它的一种枚举值 STB_WEAK 表示了一种特殊类型的符号，即“**弱符号**”，对应的一种抽象关系便称为“**弱引用**”。同时相对的，也有着“**强符号**”和“**强引用**”的定义。

操作系统版本：

> Distributor ID:	Ubuntu
Description:	Ubuntu 20.04 LTS
Release:	20.04
Codename:	focal

Clang 版本：

> clang version 10.0.0-4ubuntu1 
Target: x86_64-pc-linux-gnu
Thread model: posix
InstalledDir: /usr/bin
Found candidate GCC installation: /usr/bin/../lib/gcc/x86_64-linux-gnu/9
Found candidate GCC installation: /usr/lib/gcc/x86_64-linux-gnu/9
Selected GCC installation: /usr/bin/../lib/gcc/x86_64-linux-gnu/9
Candidate multilib: .;@m64
Selected multilib: .;@m64

#### 强/弱符号

对于 C/C++ 语言来说，编译器默认**函数和初始化了的全局变量为强符号**，**未初始化的全局变量为弱符号**（Clang 下无效，需要配合扩展显式指定符号的强弱类型）。针对强符号和弱符号，链接器会有以下的处理规则：

* 不允许强符号被多次定义（即**不同目标文件中不能有同名的强符号**）；
* 如果一个符号在某个目标文件中是强符号，在其他文件中都是弱符号，则链接时链接器会选择使用强符号；
* 如果一个符号在所有目标文件中都是弱符号，则链接器通常会**选择其中类型占用空间最大**（**Clang 下直接使用当前编译单元的符号值**）的一个。

比如下述代码中，在 Clang 下我们可以使用 `__attribute__((weak))` 扩展来标记需要导出为弱符号的变量/函数。

```cpp
// main.cc
#include <iostream>
__attribute__((weak)) int foo() {  // 弱符号，优先使用当前编译单元内的定义。可以被链接时的外部强符号覆盖；
  return 1;
};
__attribute__((weak)) int v;  // 默认值为 0；
int main(int argc, char** argv) {
  if (foo) { std::cout << (foo()); }
  std::cout << v;
  return 0;    
}

// module.cc
int foo() { return 10; };  // 强符号；
int v = 10;
```
 
编译运行：

```bash
clang++ main.cc module.cc -o main
./main # 1010;
```

如果我们直接将 main.cc 编译为目标文件，然后通过命令：

```bash
readelf -s a.o | grep WEAK
```

来查看其内部符号表中的弱符号（即 ST_BIND 字段等于 STB_WEAK）。结果如下所示：

```text
...
     8: 0000000000000000    11 FUNC    WEAK   DEFAULT    2 _Z3foov
    18: 0000000000000004     4 OBJECT  WEAK   DEFAULT    6 v
...
```

可以看到，变量 v 与函数 foo 均被导出为了弱符号类型。而它们均在链接的过程中，被 module.cc 中定义的同名强符号所覆盖。但在 Clang 下，其对于重名弱符号的处理规则却与 GCC 有所不同。对于链接过程中重名的弱符号，Clang 会选择使用当前**编译单元内**的符号的值，而非根据符号的占用大小来进行选择。


#### 强/弱引用

强/弱引用的概念主要是针对在 C/C++ 代码中引用的“**外部符号**”而言的。所谓“强引用”是指如果链接器在链接过程中无法正确决议该外部符号的具体定义，则链接器会报出符号未定义的错误。反之对于“弱引用”，则不会报错。在 Clang 中，可以通过如下方式来使用弱引用。

```cpp
// main.cc
#include <iostream>
static int bar() __attribute__((weakref, alias("foo")));  // foo 不会被 Name Mangling；
static int x __attribute__((weakref, alias("v")));
int main(int argc, char** argv) {
  if (bar) std::cout << bar();
  if (x) std::cout << x;
  return 0;
}

// module.cc
extern "C" {
  int foo() { return 10; }
  int v = 10;
}
```

编译运行：

```bash
clang++ main.cc module.cc -o main
./main # 1010;
```

我们还是同样将 main.cc 编译为目标文件，然后查看其符号表，部分结果如下：

```text
...
    14: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND foo
    15: 0000000000000000   107 FUNC    GLOBAL DEFAULT    2 main
    16: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND v
```

会发现，Clang 在对待弱引用 bar 时，不会在符号表中为其生成对应的符号。取而代之的是会将该弱引用实际引用的符号 foo 直接放入符号表，而省去了 Name Mangling 的处理过程。另外需要注意的是，**Clang 不支持在基于 Darwin 的操作系统（MacOS）上使用 weakref 这个扩展特性**，具体原因待研究。而且对于 weakref 扩展的具体写法，Clang 也有着严格的定义，比如必须具有 “**Internal Linkage**” 的性质，也就是保证符号具有仅在编译单元内（static）的有效性，并且还必须是在 Global 作用域内。总而言之，**尽量使用弱符号**来完成符合相应场景（*比如通过强弱符号的决议，来决定是否使用某一部分的功能，将程序对某些扩展功能模块的引用设置为弱引用*）的功能。

PS. Clang 和 GCC 在对于弱符号与弱引用的处理规则和语法书写规则上有着较大的不同，更何况采用编译器扩展的方式本身基本上不具有可移植性。因此，请谨慎使用。
