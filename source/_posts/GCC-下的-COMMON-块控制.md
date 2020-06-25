---
title: GCC 下的 COMMON 块控制
intro: 在 GCC 下，我们可以通过 `__attribute__((common))` 扩展参数来控制编译器对 C 源码中的未初始化全局变量的处理方式。默认情况下，GCC 将采用 COMMON 块来存放未初始化全局变量，这里注意是 C 源代码。
comments: true
date: 2020-06-19 11:18:27
tags:
- 计算机
---

在 GCC 下，我们可以通过 `__attribute__((common))` 扩展参数来控制编译器对 C 源码中的未初始化全局变量的处理方式；也可以使用 -fno-common 参数来让编译器关闭 COMMON 块特性的支持。**默认情况下，GCC 将采用 COMMON 块来存放未初始化全局变量**，这里注意是 C 源代码。

GCC 版本：

> Using built-in specs.
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-linux-gnu/9/lto-wrapper
OFFLOAD_TARGET_NAMES=nvptx-none:hsa
OFFLOAD_TARGET_DEFAULT=1
Target: x86_64-linux-gnu
Configured with: ../src/configure -v --with-pkgversion='Ubuntu 9.3.0-10ubuntu2' --with-bugurl=file:///usr/share/doc/gcc-9/README.Bugs --enable-languages=c,ada,c++,go,brig,d,fortran,objc,obj-c++,gm2 --prefix=/usr --with-gcc-major-version-only --program-suffix=-9 --program-prefix=x86_64-linux-gnu- --enable-shared --enable-linker-build-id --libexecdir=/usr/lib --without-included-gettext --enable-threads=posix --libdir=/usr/lib --enable-nls --enable-clocale=gnu --enable-libstdcxx-debug --enable-libstdcxx-time=yes --with-default-libstdcxx-abi=new --enable-gnu-unique-object --disable-vtable-verify --enable-plugin --enable-default-pie --with-system-zlib --with-target-system-zlib=auto --enable-objc-gc=auto --enable-multiarch --disable-werror --with-arch-32=i686 --with-abi=m64 --with-multilib-list=m32,m64,mx32 --enable-multilib --with-tune=generic --enable-offload-targets=nvptx-none,hsa --without-cuda-driver --enable-checking=release --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu
Thread model: posix
gcc version 9.3.0 (Ubuntu 9.3.0-10ubuntu2) 


首先给出这样一段 C 代码（COMMON 块在 C++ 中没有定义一致性的行为，因此不推荐在 C++ 代码中使用。未初始化的全局变量在 C++ 会被直接放入 .bss 段）：

```cpp
// main.c
#include <stdio.h>
int gUinitIntVal;
extern int externIntVar;
__attribute__((weak)) int weakUintIntVar;
int main(int argc, char** argv) {
  printf("%d %d %d", gUinitIntVal, externIntVar, weakUintIntVar);
  return 0;
}
```

使用 GCC 编译并查看输出目标文件的符号表：


```bash
gcc -c main.c -o main.o
readelf -s main.o
```

部分结果如下：

```text
Symbol table '.symtab' contains 26 entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND 
...
    10: 0000000000000004     4 OBJECT  GLOBAL DEFAULT  COM gUinitIntVal
    11: 0000000000000000     4 OBJECT  WEAK   DEFAULT    4 weakUintIntVar
    12: 0000000000000000    63 FUNC    GLOBAL DEFAULT    1 main
    13: 0000000000000000     0 NOTYPE  GLOBAL DEFAULT  UND externIntVar
...
```

可以看到，在默认情况下编译器会**将未初始化的全局变量放置到 COM（COMMON）段中**（Clang / GCC 效果一致）。而弱符号（无定义的）则被放置到 .bss(4) 段中，并且为其分配相应的空间。使用 “extern” 标记的外部引用符号则不分配空间。相应的，此时若我们为弱符号 weakUintIntVar 给予一个初值，则该符号对应的内存将会被分配在 .data(3) 段中。

按照链接器在处理 COMMON 块中符号的规则：**同名的 COMMON 段符号会选取符号表中 Size（st_size 字段）较大的那一个**。因此当我们有如下另外一个目标文件源代码，并将其与上述目标文件进行链接后，生成的可执行文件中的符号 gUinitIntVal 其大小便为 4。

```cpp
// module.cc
char gUinitIntVal;
int externIntVar = 100;
```
* **-fno-common**：

当然，我们也可以通过为 GCC 传递参数 “**-fno-common**” 参数来让编译器将 C 源代码中的未初始化的全局变量直接放置到 .bss 段。这对于需要保持较高运行性能的程序可能会有一定的帮助（以下引用来自 GCC 帮助文档）：

> Compiling with -fno-common is useful on targets for which it provides better performance, ...

* **\_\_attribute\_\_((common))**：

关于编译器扩展 `__attribute__((common))` 的用法一般而言很少用到，可以想到的是这样一种应用场景：使用 C++ 编写的主程序文件想要与已有的 C 静态库进行链接，并且该 C 静态库中有被放置于 COMMON 块中的未初始化的全局变量，而为了能够让链接器完成符号的决议过程，而不是被主程序中的强符号覆盖，这里我们可以在 C++ 主程序中，将同名的未初始化的全局变量用上述扩展进行标记，以强制（默认在 C++ 下，未初始化的全局变量会被放入 .bss 段中）将该符号放置于 COMMON 块中参与决议，即 COMMON 块中的符号决议流程。

注：只有在 C 源代码中的未初始化的全局变量才可以被定义成 COMMON 段中的符号。
