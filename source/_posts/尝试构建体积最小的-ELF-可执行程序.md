---
title: 尝试构建体积最小的 ELF 可执行程序
intro: 本文将尝试构建一个代码量最少、体积最小的 ELF 可执行程序，程序运行时会向 stdout 输出字符串 “Hello, YHSPY!”。
comments: false
date: 2020-06-19 15:44:56
tags:
- 计算机
---


本文将尝试构建一个代码量最少、体积最小的 ELF 可执行程序，程序运行时会向 stdout 输出字符串 “Hello, YHSPY!”。

#### 15 KB

首先来一个 C 语言下的，最基本的写法：

```c
#include <stdio.h>
int main(void) {
  const char* str = "Hello, YHSPY!";
  printf("%s\n", str);
}
```

代码十分简单，手起刀落一气呵成。此时我们可以发现，这段代码对应的可执行文件有 17 KB 大小。在使用 `strip` 去掉符号表之后，整个文件也还是有 15 KB 的大小。分析下来，我们知道如果想要向 stdout 输出我们给定的字符串，则一定要通过 Linux 下的系统调用 write 来进行。

#### 8.3 KB

正如我们在“**链接、装载与库相关记录（二）**”一文的末尾处所介绍的那样，我们可以通过 NASM 来避开编译器，直接以汇编的形式来书写我们这个最小的 ELF 可执行程序，首先给出一样的汇编代码如下（main.asm）：

```nasm
          global    _start

          section   .text
_start:   mov       rax, 1                  ; system call for write
          mov       rdi, 1                  ; file handle 1 is stdout
          mov       rsi, message            ; address of string to output
          mov       rdx, 14                 ; number of bytes
          syscall                           ; invoke operating system to do the write
          mov       rax, 60                 ; system call for exit
          xor       rdi, rdi                ; exit code 0
          syscall                           ; invoke operating system to exit

          section   .rodata
message:  db        "Hello, YHSPY!", 10      ; note the newline at the end
```

这里对代码的结构我们不再赘述。接下来，我们通过 NASM 将这段代码编译成目标文件，在通过 ld 以静态链接的方式生成 ELF 可执行文件。

```bash
nasm -f elf64 main.asm -o main.o
ld main.o -o main
./main  # "Hello, YHSPY!"
```

经过查看后，发现此时生成的 main 可执行文件仍然有 8.7 KB 大小；经过 strip 处理后仍然有 8.3 KB 大小。实际上，如果你有查看我们在第一步生成的 main.o 文件的大小，你会发现这个目标文件仅有 848 Byte，但最后链接生成的 ELF 可执行文件却有 8.7 KB，这确实不符合常理。

#### 440 Bytes

通过 `hexdump -C main` 查看 ELF 可执行文件的内容发现，在其二进制内容中，各个 Section 并不是紧凑的放在一起中，其中有很多 0x0 的 Padding。如下所示（比如其中的 0xf0 - 0x1000 均为无效值）：

```text
...
000000c0  00 20 40 00 00 00 00 00  00 20 40 00 00 00 00 00  |. @...... @.....|
000000d0  0d 00 00 00 00 00 00 00  0d 00 00 00 00 00 00 00  |................|
000000e0  00 10 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
000000f0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
*
00001000  b8 01 00 00 00 bf 01 00  00 00 48 be 00 20 40 00  |..........H.. @.|
00001010  00 00 00 00 ba 0d 00 00  00 0f 05 b8 3c 00 00 00  |............<...|
00001020  48 31 ff 0f 05 00 00 00  00 00 00 00 00 00 00 00  |H1..............|
00001030  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
*
00002000  48 65 6c 6c 6f 2c 20 57  6f 72 6c 64 0a 00 00 00  |Hello, YHSPY!...|
00002010  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
...
```

因此，接下来我们将通过链接脚本来手动控制链接的过程，让各个 Section 在 ELF 文件中的位置更加紧凑。main.lds 文件的内容如下所示：

```text
ENTRY(_start)
SECTIONS
{
  . = 0x400000 + SIZEOF_HEADERS;  /* 设置当前位置的 VMA */
  main : { *(.text) *(.rodata) }  /* 将所有输入目标文件中的 .text 与 .rodata 段合并到 main 段中 */
  /DISCARD/ : { *(.symtab) *(.strtab) }
}
```

这里我们将 .text 和 .rodata 两个段进行合并，并直接放置于 ELF 头的后面；同时通过在命令行中添加 “-s” 参数去掉 ELF 文件中的符号表、字符串表。我们通过以下命令重新链接生成 ELF 可执行文件：

```bash
ld -s -static -T main.lds -o main main.o
```

此时，我们的 ELF 可执行文件体积达到了 440 Bytes。

#### 229 Bytes

> Most ELF executables are built with both a program header table and a section header table. However, ***only the former is required in order for the OS to load, link and execute a program***. It should be noted that most programs that work with ELF files are dependent on the section header table as an index to the file's contents. Thus, utilities such as gdb and objdump will often have limited functionality when working with an executable with no section header table. Some other utilities may refuse to work with them at all.

由于 GNU 下的 strip 无法移除 ELF 可执行文件中的 .shstrtab 段，并且观察发现在各个 Section 之间仍然有很多空白没有任何实际用处的 Padding 存在，因此最后我们再使用 <b>[sstrip](https://github.com/aunali1/super-strip)</b>（Super Strip）来对 ELF 文件进行处理。处理后的文件大小达到了 229 Byte。

