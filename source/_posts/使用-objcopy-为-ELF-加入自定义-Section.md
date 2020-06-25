---
title: 使用 objcopy 为 ELF 加入自定义 Section
intro: 我们可以使用 objcopy 工具为一个 ELF 文件加入自定义的 Section 信息，并在主程序中访问该目标文件中这些自定义的 Section 内的数据。
comments: true
date: 2020-06-17 15:42:53
tags:
- 计算机
---

我们可以使用 objcopy 工具为一个 ELF 文件加入自定义的 Section 信息，并在主程序中访问该目标文件中这些自定义的 Section 内的数据。

操作系统版本：

> Distributor ID:	Ubuntu
Description:	Ubuntu 20.04 LTS
Release:	20.04
Codename:	focal

首先准备一个可以作为段内容的文件，比如含有下列内容的文本文件（text）：

```text
Hello, YHSPY!
```

然后通过以下命令将其转换为一个目标文件：

```bash
objcopy -I i386:binary -O elf64-x86-64 -B i386:x86-64 text text.o
```

其中 “-I” 参数用来指定输入文件的 bfdname；“-O” 用来指定输出文件的 bfdname；“-B” 用来指定输出文件的架构类型。关于具体可用的 bfdname 类型，可以通过 `objcopy --info` 来查看。

接下来查看下目标文件的 Section Header：

```bash
objdump -d -x text.o
```

```text
text.o:     file format elf64-x86-64
text.o
architecture: i386:x86-64, flags 0x00000010:
HAS_SYMS
start address 0x0000000000000000

Sections:
Idx Name          Size      VMA               LMA               File off  Algn
  0 .data         0000000e  0000000000000000  0000000000000000  00000040  2**0
                  CONTENTS, ALLOC, LOAD, DATA
SYMBOL TABLE:
0000000000000000 l    d  .data	0000000000000000 .data
0000000000000000 g       .data	0000000000000000 _binary_text_start
000000000000000e g       .data	0000000000000000 _binary_text_end
000000000000000e g       *ABS*	0000000000000000 _binary_text_size
```

可以看到，整个目标文件只有一个 .data 段，用来存放先前文本文件中的内容。并且同时，objcopy 还为我们增加了一些辅助的导出符号，比如 “**_binary_text_start**” 和 “**_binary_text_end**” 这两个指针分别指向了作为 Section 内容的文本文件的头和尾。另外的 “_binary_text_size” 作为一个 ABS 类型的符号主要用于作为编译器或链接器的元信息。接下来，这里我们使用 readelf 来看一下整个目标文件的全貌：

```bash
readelf -a text.o
```

```text
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          0 (bytes into file)
  Start of section headers:          288 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         5
  Section header string table index: 4

Section Headers:
  [Nr] Name              Type             Address           Offset
       Size              EntSize          Flags  Link  Info  Align
  [ 0]                   NULL             0000000000000000  00000000
       0000000000000000  0000000000000000           0     0     0
  [ 1] .data             PROGBITS         0000000000000000  00000040
       000000000000000e  0000000000000000  WA       0     0     1
  [ 2] .symtab           SYMTAB           0000000000000000  00000050
       0000000000000078  0000000000000018           3     2     8
  [ 3] .strtab           STRTAB           0000000000000000  000000c8
       0000000000000037  0000000000000000           0     0     1
  [ 4] .shstrtab         STRTAB           0000000000000000  000000ff
       0000000000000021  0000000000000000           0     0     1
Key to Flags:
  W (write), A (alloc), X (execute), M (merge), S (strings), I (info),
  L (link order), O (extra OS processing required), G (group), T (TLS),
  C (compressed), x (unknown), o (OS specific), E (exclude),
  l (large), p (processor specific)

There are no section groups in this file.

There are no program headers in this file.

There is no dynamic section in this file.

There are no relocations in this file.

The decoding of unwind sections for machine type Advanced Micro Devices X86-64 is not currently supported.

Symbol table '.symtab' contains 5 entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND 
     1: 0000000000000000     0 SECTION LOCAL  DEFAULT    1 
     2: 0000000000000000     0 NOTYPE  GLOBAL DEFAULT    1 _binary_text_start
     3: 000000000000000e     0 NOTYPE  GLOBAL DEFAULT    1 _binary_text_end
     4: 000000000000000e     0 NOTYPE  GLOBAL DEFAULT  ABS _binary_text_size

No version information found in this file.
```

抛开 ELF Header 的部分，我们可以对照 `hexdump -C text.o` 输出的信息来分别对应 .strtab 以及 .shstrtab 两个段内容在该 ELF 文件中的所在位置，这里就不展开分析了。接下来给出一段 C++ 代码来使用上述目标文件中的内容：

```cpp
// main.cc
#include <iostream>

extern "C" {  // 防止 C++ 的 Name Mangling；
  extern char _binary_text_start;
  extern char _binary_text_end;
}
int main(int argc, char** argv) {
  for (auto s = &_binary_text_start; s != &_binary_text_end; ++s)
    std::cout << *s;  // "Hello, YHSPY!"
  return 0;
}
```

编译和链接：

```bash
clang++ main.cc text.o -o main
```

要注意一点的是：在现代 Linux 下的 GCC 编译器中，默认情况下已经去掉了在 C 语言符号前加 “_” 的方式。因此这里在源代码中，对于引用的外部符号，我们需要携带前面的下划线以跟目标文件中的符号名保持一致。
