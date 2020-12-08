---
title: Linux 下的 ELF 完整结构分析
intro: 本文我们将以如下这段代码为例，来分析其对应 ELF Object / Executable 文件在 Linux 下的完整数据结构，以及各结构在操作系统源码中的实际类型定义。
comments: true
date: 2020-06-17 14:23:58
tags:
- 计算机
---

本文我们将以如下这段代码为例，来分析其对应 ELF Object / Executable 文件在 Linux 下的完整数据结构，以及各结构在操作系统源码中的实际类型定义。

操作系统版本：

```bash
lsb_release -a
```

> Distributor ID:	Ubuntu
Description:	Ubuntu 20.04 LTS
Release:	20.04
Codename:	focal

测试代码：

```cpp
// main.cc
extern int print(const char* format, ...);  // 外部函数引用；
int gInitVar = 84;  // 初始化的全局变量；
int gUnintVar;  // 未初始化的全局变量；

void foo(int i) { print("%d\n", i); }
int main(void) {
  static int staticVar = 85; // 初始化的静态变量；
  static int staticUninitVar;  // 未初始化的静态变量；

  int x = 1;  // 普通的初始化的自动变量；
  int y;  // 普通的未初始化的自动变量；
  foo(staticVar + staticUninitVar + x + y);  // 函数调用；
  return 0;
}
```

#### ELF Header

将上述代码编译为目标文件，然后使用 readelf 命令来查看其 ELF 头信息，执行的命令和对应输出如下所示：

```bash
clang -c main.cc -o main.o
readelf -h main.o
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
  Start of section headers:          1000 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         13
  Section header string table index: 1
```

ELF Header 中定义了 **ELF Magic Code**、**文件机器字节长度**、**数据存储方式**、**版本**、**运行平台**、**ABI 版本**、**ELF 重定位类型**、**硬件平台**、**硬件平台版本**、**入口地址**、**程序头入口与长度**、**Section Header 的偏移位置和长度**以及 **Section 数量**等。在 Ubuntu 上，我们可在 “***/usr/include/elf.h***” 文件中看到有关 ELF 文件结构的大多数 C 语言的数据结构，比如用于表示文件头结构的 Elf64_Ehdr 结构体如下所示。

```c
typedef struct
{
  unsigned char e_ident[EI_NIDENT]; /* Magic number and other info */
  Elf64_Half  e_type;     /* Object file type */
  Elf64_Half  e_machine;    /* Architecture */
  Elf64_Word  e_version;    /* Object file version */
  Elf64_Addr  e_entry;    /* Entry point virtual address */
  Elf64_Off e_phoff;    /* Program header table file offset */
  Elf64_Off e_shoff;    /* Section header table file offset */
  Elf64_Word  e_flags;    /* Processor-specific flags */
  Elf64_Half  e_ehsize;   /* ELF header size in bytes */
  Elf64_Half  e_phentsize;    /* Program header table entry size */
  Elf64_Half  e_phnum;    /* Program header table entry count */
  Elf64_Half  e_shentsize;    /* Section header table entry size */
  Elf64_Half  e_shnum;    /* Section header table entry count */
  Elf64_Half  e_shstrndx;   /* Section header string table index */
} Elf64_Ehdr;
```

其中第一项 e_ident，是一个大小为 EI_NIDENT（16）的字符数组。其中前 4 位表示 ELF 的魔数，即 “0x7f 0x45 0x4c 0x46”，主要用来提供给操作系统以确认文件类型。第一个字对应 ASCII 表中的 DEL 控制符，后面三个为 “ELF”。接下来第 5 位标识文件的位数（32/64）；第 6 位标识 ELF 的文件字节序，即端还是小端；第 7 位为 ELF 的主版本号，一般为 1；第 8 位标识系统的 ABI 类型；第 9 位为 ABI 版本；从第 10 位往后为填充字符。具体每一个字符的可选枚举值可以参考源文件中的常量定义。

接下来 e_type 字段标识该 ELF 的文件类型，其常用可取值如下：

```c
#define ET_NONE   0   /* No file type */
#define ET_REL    1   /* Relocatable file .o */
#define ET_EXEC   2   /* Executable file */
#define ET_DYN    3   /* Shared object file .so */
#define ET_CORE   4   /* Core file */
```

对于 “e_machine” 字段，可选值取决于当前操作系统所支持的平台类型。

#### Section Header Table

段表中保存了整个 ELF 文件中各个 Section 结构的基本信息（段名、长度、在文件中的偏移、读写权限以及其他属性）。我们可以通过以下命令来查看一个 ELF 文件的段表信息（注：objdump 只能查看关键段信息，可以用 readelf 作为其替换）：

```bash
readelf -S main.o
```

```bash
There are 13 section headers, starting at offset 0x3e8:

Section Headers:
  [Nr] Name              Type             Address           Offset
       Size              EntSize          Flags  Link  Info  Align
  [ 0]                   NULL             0000000000000000  00000000
       0000000000000000  0000000000000000           0     0     0
  [ 1] .strtab           STRTAB           0000000000000000  00000314
       00000000000000d0  0000000000000000           0     0     1
  [ 2] .text             PROGBITS         0000000000000000  00000040
       0000000000000069  0000000000000000  AX       0     0     16
  [ 3] .rela.text        RELA             0000000000000000  00000268
       0000000000000078  0000000000000018          12     2     8
  [ 4] .data             PROGBITS         0000000000000000  000000ac
       0000000000000008  0000000000000000  WA       0     0     4
  [ 5] .bss              NOBITS           0000000000000000  000000b4
       0000000000000008  0000000000000000  WA       0     0     4
  [ 6] .rodata.str1.1    PROGBITS         0000000000000000  000000b4
       0000000000000004  0000000000000001 AMS       0     0     1
  [ 7] .comment          PROGBITS         0000000000000000  000000b8
       0000000000000020  0000000000000001  MS       0     0     1
  [ 8] .note.GNU-stack   PROGBITS         0000000000000000  000000d8
       0000000000000000  0000000000000000           0     0     1
  [ 9] .eh_frame         X86-64_UNWIND    0000000000000000  000000d8
       0000000000000058  0000000000000000   A       0     0     8
  [10] .rela.eh_frame    RELA             0000000000000000  000002e0
       0000000000000030  0000000000000018          12     9     8
  [11] .llvm_addrsig     LOOS+0xfff4c03   0000000000000000  00000310
       0000000000000004  0000000000000000   E      12     0     1
  [12] .symtab           SYMTAB           0000000000000000  00000130
       0000000000000138  0000000000000018           1     8     8
Key to Flags:
  W (write), A (alloc), X (execute), M (merge), S (strings), I (info),
  L (link order), O (extra OS processing required), G (group), T (TLS),
  C (compressed), x (unknown), o (OS specific), E (exclude),
  l (large), p (processor specific)
```

Section Header 描述了整个 ELF 文件中各个 Section（段）的信息。其中的 “.rodata” 为**只读数据段**；“.comment” 为**注释信息段**，一般存放编译器的版本信息；“.note.GNU-stack” 为**堆栈提示段**。横向来看，Size 列指定了该段的大小，“File off” 表明了该段从 0x00000000 即文件开始位置处的相对偏移。每个段第二行的段属性信息中，“CONTENTS” 表示该段在 ELF 中是否存在内容；“CODE” 表示该段中存在可执行代码；“DATA” 表示该段可以被写入；“READONLY” 表示该段只读；“ALLOC” 表示该段在内存中是否会占用空间；“RELOC” 表示该段中有符号需要被链接器重定向。

通过以下命令可以查看所有段的内容，同时将被标记为 “CODE” 的段内容反编译：

```bash
objdump -s -d main.o
```

* .data 段中保存的的是已经初始化了的全局变量、全局静态变量（**由于该类型变量的有效范围为一个 Compilation Unit，因此若没有被实际引用，会被编译器 DCE 处理掉**）和局部静态变量。在上述代码中我们定义了两个对应的整型变量 “gInitVar” 和 “staticVar”，对应该段大小为 8 字节。.rodata 中存放了程序中用到的只读常量，比如字符串 “%d\n”。该段从语义上支持了 C++ 的 const 关键字，这样做也方便了操作系统对只读数据的处理。
* .bss 段存放的是**未初始化**的全局变量和局部静态变量，比如上述代码中定义的整型变量 “gUnintVar” 与 “staticUninitVar”。该段没有实际内容，仅有一个大小属性用来标记在装载映像时需要为这些变量分配的内存大小，这些变量会被统一初始化为值 0。**对于某些显式初值为 0 的静态变量，编译器可能会通过优化将其放入 .bss 段而非 .data 段以降低生成 ELF 的尺寸**。
* .strtab 段存放了符号表中各符号对应的字符串名称。
* .shstrtab 段存放了 Section Header Table 里使用到的各个段的名称（**该段有时会被编译器合并到 .strtab 段中**，可根据 Elf64_Ehdr 中的 e_shstrndx 字段来判断）。
* .symtab 为符号表，存放了 ELF 文件内的所有符号信息。

整个段表的项目被存放在以名为 Elf64_Shdr 结构体组成的数组中。数组元素个数等于段表中段的个数。 

```c
typedef struct
{
  Elf64_Word  sh_name;    /* Section name (string tbl index) */
  Elf64_Word  sh_type;    /* Section type */
  Elf64_Xword sh_flags;   /* Section flags */
  Elf64_Addr  sh_addr;    /* Section virtual addr at execution */
  Elf64_Off sh_offset;    /* Section file offset */
  Elf64_Xword sh_size;    /* Section size in bytes */
  Elf64_Word  sh_link;    /* Link to another section */
  Elf64_Word  sh_info;    /* Additional section information */
  Elf64_Xword sh_addralign;   /* Section alignment */
  Elf64_Xword sh_entsize;   /* Entry size if section holds table */
} Elf64_Shdr;
```

这里要注意的是：**ELF 文件中的字符串表仅对编译器和链接器有意义，操作系统仅根据对应的段的权限来决定如何对它进行处理，即由段的 sh_type 和 sh_flags 两个字段来决定**。

* sh_type 的常见可选枚举值：

```c
#define SHT_NULL    0   /* Section header table entry unused */
#define SHT_PROGBITS    1   /* Program data */
#define SHT_SYMTAB    2   /* Symbol table */
#define SHT_STRTAB    3   /* String table */
#define SHT_RELA    4   /* Relocation entries with addends */
#define SHT_HASH    5   /* Symbol hash table */
#define SHT_DYNAMIC   6   /* Dynamic linking information */
#define SHT_NOTE    7   /* Notes */
#define SHT_NOBITS    8   /* Program space with no data (bss) */
#define SHT_REL     9   /* Relocation entries, no addends */
#define SHT_SHLIB   10    /* Reserved */
#define SHT_DYNSYM    11    /* Dynamic linker symbol table */
#define SHT_INIT_ARRAY    14    /* Array of constructors */
#define SHT_FINI_ARRAY    15    /* Array of destructors */
#define SHT_PREINIT_ARRAY 16    /* Array of pre-constructors */
#define SHT_GROUP   17    /* Section group */
#define SHT_SYMTAB_SHNDX  18    /* Extended section indeces */
#define SHT_NUM     19    /* Number of defined types.  */
```
* sh_flags 的常见可选枚举值：

```c
#define SHF_WRITE      (1 << 0) /* Writable */
#define SHF_ALLOC      (1 << 1) /* Occupies memory during execution */
#define SHF_EXECINSTR      (1 << 2) /* Executable */
#define SHF_MERGE      (1 << 4) /* Might be merged */
#define SHF_STRINGS      (1 << 5) /* Contains nul-terminated strings */
#define SHF_INFO_LINK      (1 << 6) /* `sh_info' contains SHT index */
#define SHF_LINK_ORDER       (1 << 7) /* Preserve order after combining */
#define SHF_OS_NONCONFORMING (1 << 8) /* Non-standard OS specific handling required */
#define SHF_GROUP      (1 << 9) /* Section is member of a group.  */
#define SHF_TLS        (1 << 10)  /* Section hold thread-local data.  */
#define SHF_COMPRESSED       (1 << 11)  /* Section with compressed data. */
```

其中的 sh_link 与 sh_info 字段用于标记**与链接（动态 + 静态）相关**的段的属性。

其他常见段结构：
* **.debug**：存放调试信息；
* **.dynamic**：用于动态链接的信息；
* **.hash**：符号哈希表；
* **.line**：调试时的行号表，即源代码行号与编译后指令的对应表；
* **.note**：额外的编译器信息；
* **.strtab**：字符串表，用于存储 ELF 文件中用到的各种字符串；
* **.shstrtab**：段名表；
* **.plt / .got**：动态链接的跳转表和全局入口表；
* **.init / .fini**：程序初始化与终结代码段；

#### Relocation Table

使用以下命令来查看该 ELF 文件的重定位表。

```bash
readelf -r main.o
```

```text
Relocation section '.rela.text' at offset 0x268 contains 5 entries:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
000000000010  000700000001 R_X86-64_64       0000000000000000 .rodata.str1.1 + 0
00000000001b  000900000004 R_X86-64_PLT32    0000000000000000 _Z5printPKcz - 4
000000000049  00050000000b R_X86-64_32S      0000000000000000 .data + 4
000000000050  00060000000b R_X86-64_32S      0000000000000000 .bss + 4
00000000005d  000800000004 R_X86-64_PLT32    0000000000000000 _Z3fooi - 4

Relocation section '.rela.eh_frame' at offset 0x2e0 contains 2 entries:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
000000000020  000400000002 R_X86-64_PC32     0000000000000000 .text + 0
000000000040  000400000002 R_X86-64_PC32     0000000000000000 .text + 30
```

重定位表主要记录了目标文件中所有需要重定位的符号所在的段以及相对（相对于该段开始）偏移位置。每一个 sh_flags 为 SHT_RELA / SHT_REL 的重定位段都对应一个需要被符号重定位的段（一般为代码段和数据段）。在这些重定位段中，记录着对应段需要被重定位的所有符号信息。重定位表项是由名为 Elf32_Rel 结构体所组成的数组，该结构体的定义如下：

```c
/* Relocation table entry without addend (in section of type SHT_REL).  */

typedef struct
{
  Elf32_Addr  r_offset;   /* Address */
  Elf32_Word  r_info;     /* Relocation type and symbol index */
} Elf32_Rel;
```

* r_offset 表示重定位入口的偏移。对于可重定位文件来说，该值是该重定位入口所要修正位置第一个字节**相对于该段起始位置的偏移**；对于可执行文件来说，该值是该重定位入口所要修正位置的第一个字节的**虚拟地址**。
* r_info 表示重定位入口的类型和符号。其低 8 位表示重定位入口的类型（即重定位的修正方式，绝对寻址/相对寻址等），高 24 位表示重定位入口的符号在符号表的下标。


#### Symbol Table


使用以下命令来查看该 ELF 文件的符号表。

```bash
readelf -s main.o
```

```text
Symbol table '.symtab' contains 13 entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND 
     1: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS main.cc
     2: 0000000000000004     4 OBJECT  LOCAL  DEFAULT    5 _ZZ4mainE15staticUninitVar
     3: 0000000000000004     4 OBJECT  LOCAL  DEFAULT    4 _ZZ4mainE9staticVar
     4: 0000000000000000     0 SECTION LOCAL  DEFAULT    2 
     5: 0000000000000000     0 SECTION LOCAL  DEFAULT    4 
     6: 0000000000000000     0 SECTION LOCAL  DEFAULT    5 
     7: 0000000000000000     0 SECTION LOCAL  DEFAULT    6 
     8: 0000000000000000    37 FUNC    GLOBAL DEFAULT    2 _Z3fooi
     9: 0000000000000000     0 NOTYPE  GLOBAL DEFAULT  UND _Z5printPKcz
    10: 0000000000000000     4 OBJECT  GLOBAL DEFAULT    4 gInitVar
    11: 0000000000000000     4 OBJECT  GLOBAL DEFAULT    5 gUnintVar
    12: 0000000000000030    57 FUNC    GLOBAL DEFAULT    2 main
```

首先提一点：**非 static / const 的全局变量不会受到 Name Mangling 的影响**。而函数由于重载的存在，因此无论是否有定义，都会被 C++ Name Mangling 处理。文章开头代码中的局部变量 x 和 y 由于**常量传播**的原因导致编译器将其符号从 ELF 中被移除。综上可以看到，符号表中的 gInitVar 以及 gUnintVar 两个全局变量符号并没有被编译器做命名上的特殊装饰处理。

符号表一般可以用来存放程序中用到的：全局符号、局部符号、段名以及行号等信息。符号表数据结构为一个 Elf64_Sym 的数组，其中第一个元素为无效的“未定义”符号。Elf64_Sym 的结构如下所示：

```c
typedef struct
{
  Elf64_Word  st_name;    /* Symbol name (string tbl index) */
  unsigned char st_info;    /* Symbol type and binding */
  unsigned char st_other;   /* Symbol visibility */
  Elf64_Section st_shndx;   /* Section index */
  Elf64_Addr  st_value;   /* Symbol value */
  Elf64_Xword st_size;    /* Symbol size */
} Elf64_Sym;
```

* st_info 字段的内容被分为高 28 位的 ST_BIND **符号绑定信息**，以及低 4 位的 ST_TYPE **符号类型信息**。两者**部分**常见可选枚举值如下：

```c
/* Legal values for ST_BIND subfield of st_info (symbol binding).  */

#define STB_LOCAL 0   /* Local symbol */
#define STB_GLOBAL  1   /* Global symbol */
#define STB_WEAK  2   /* Weak symbol */

/* Legal values for ST_TYPE subfield of st_info (symbol type).  */

#define STT_NOTYPE  0   /* Symbol type is unspecified */
#define STT_OBJECT  1   /* Symbol is a data object */
#define STT_FUNC  2   /* Symbol is a code object */
#define STT_SECTION 3   /* Symbol associated with a section */
#define STT_FILE  4   /* Symbol's name is file name */
#define STT_COMMON  5   /* Symbol is a common data object */
#define STT_TLS   6   /* Symbol is thread-local data object*/
```


* st_name 字段为符号名。对于 ST_TYPE 值为 STT_SECTION 的符号来说，由于它们代表着段，因此其符号名便为段名。可以反向通过 Section Header Table 进行查看。


* st_shndx 字段表示符号所在的段的下标（NDX），对于某些特殊符号，该字段值可能为以下特殊值。其中 SHN_ABS 表示该符号包含了一个绝对的值，比如表示文件名的符号；SHN_COMMON 表示该符号是一个 “COMMON 块” 符号；SHN_UNDEF 表示该符号未定义，即是一个在本目标文件中被引用，但定义在其他目标文件中的符号。


```c
#define SHN_UNDEF 0   /* Undefined section - UND */
#define SHN_COMMON  0xfff2    /* Associated symbol is common */
#define SHN_ABS   0xfff1    /* Associated symbol is absolute - ABS */
```

* st_value 表示符号值，如果该符号是一个函数或变量定义且非 COMMON 块类型，则符号值为其对应**某个段开始的地址偏移**（st_shndx + st_value）。在装载视图（可执行文件）中，该值通常为符号的**虚拟地址**。


#### Program Header Table

程序头表保存了 **ELF 可执行文件和共享库文件内的 Segment 信息**（ELF 目标文件内没有该表结构）。程序投表也是一个结构体的数组，其结构体定义如下：

```c
typedef struct
{
  Elf64_Word  p_type;     /* Segment type */
  Elf64_Word  p_flags;    /* Segment flags */
  Elf64_Off p_offset;   /* Segment file offset */
  Elf64_Addr  p_vaddr;    /* Segment virtual address */
  Elf64_Addr  p_paddr;    /* Segment physical address */
  Elf64_Xword p_filesz;   /* Segment size in file */
  Elf64_Xword p_memsz;    /* Segment size in memory */
  Elf64_Xword p_align;    /* Segment alignment */
} Elf64_Phdr;
```

* p_type 表示该 Segment 的类型，可取的枚举值如下所示。其中 PT_LOAD 表示这些 Segment 将被作为程序段加载到 VMA 中。而 PT_DYNAMIC 和 PT_INTERP 则主要用于 ELF 的动态链接。

```c
/* Legal values for p_type (segment type).  */

#define PT_NULL   0   /* Program header table entry unused */
#define PT_LOAD   1   /* Loadable program segment */
#define PT_DYNAMIC  2   /* Dynamic linking information */
#define PT_INTERP 3   /* Program interpreter */
#define PT_NOTE   4   /* Auxiliary information */
#define PT_SHLIB  5   /* Reserved */
#define PT_PHDR   6   /* Entry for header table itself */
#define PT_TLS    7   /* Thread-local storage segment */
#define PT_NUM    8   /* Number of defined types */
```

* p_memsz 字段的值一定是大于等于 p_filesz 字段的大小的（比如：.bss 段由于没有内容只有大小，因此不占用目标文件的空间，但是在程序运行装载时需要在 VMA 上分配相应大小的内存，因此对应 Segment 的 p_memsz 字段中预留出这部分内存大小）。


#### Dynamic Section

该段主要用于支持 ELF 文件的动态链接过程，其中保存了动态链接器所需要的基本信息，比如依赖于哪些共享对象、动态链接符号表的位置、动态链接重定位表的位置、共享对象初始化代码的地址等。其结构如下所示：

```c
typedef struct
{
  Elf64_Sxword  d_tag;      /* Dynamic entry type */
  union
    {    
      Elf64_Xword d_val;    /* Integer value */
      Elf64_Addr d_ptr;     /* Address value */
    } d_un;
} Elf64_Dyn;
```
Elf64_Dyn 结构由一个类型值加上一个附加的数值或指针组成。可以将 .dynamic 段看作动态链接下 ELF 文件的“文件头”。

* d_tag 字段表示当前表项的具体类型，部分可选的枚举值如下：

```c
/* Legal values for d_tag (dynamic entry type).  */

#define DT_NULL   0   /* Marks end of dynamic section */
#define DT_NEEDED 1   /* Name of needed library */
#define DT_PLTRELSZ 2   /* Size in bytes of PLT relocs */
#define DT_PLTGOT 3   /* Processor defined value */
#define DT_HASH   4   /* Address of symbol hash table */
#define DT_STRTAB 5   /* Address of string table */
#define DT_SYMTAB 6   /* Address of symbol table */
#define DT_RELA   7   /* Address of Rela relocs */
#define DT_RELASZ 8   /* Total size of Rela relocs */
#define DT_RELAENT  9   /* Size of one Rela reloc */
#define DT_STRSZ  10    /* Size of string table */
#define DT_SYMENT 11    /* Size of one symbol table entry */
#define DT_INIT   12    /* Address of init function */
#define DT_FINI   13    /* Address of termination function */
#define DT_SONAME 14    /* Name of shared object */
#define DT_RPATH  15    /* Library search path (deprecated) */
#define DT_SYMBOLIC 16    /* Start symbol search here */
#define DT_REL    17    /* Address of Rel relocs */
#define DT_RELSZ  18    /* Total size of Rel relocs */
#define DT_RELENT 19    /* Size of one Rel reloc */
#define DT_PLTREL 20    /* Type of reloc in PLT */
```

#### Dynamic Symbol Section

该表主要用于保存于动态链接相关的符号，结构与符号表（.symtab）类似。为了辅助 “.dynsym” 动态符号表，一般还会设置 “.dynstr” 动态符号字符串表以保存符号名对应的字符串。而为了加快符号在程序运行时的查找过程，一般还会设有符号哈希表（.hash）。


#### Auxiliary Vector

该结构一般存在于应用程序进程的堆栈里，保存了动态链接器所需要的一些辅助信息数组。包括：

* 可执行文件的文件句柄，用于读取文件（采用文件方式）；
* 可执行文件中程序头表（Program Header）在进程中的地址（采用映像方式）；
* 可执行文件头中程序头表中每一个入口的大小；
* 可执行文件头中程序头表中入口的数量；
* 动态链接器本身的装载地址；
* 可执行文件入口地址，即启动地址；

其具体结构如下所示：

```c
/* Auxiliary vector.  */

/* This vector is normally only used by the program interpreter. The
   usual definition in an ABI supplement uses the name auxv_t. The
   vector is not usually defined in a standard <elf.h> file, but it
   can't hurt. We rename it to avoid conflicts. The sizes of these
   types are an arrangement between the exec server and the program
   interpreter, so we don't fully specify them here.  */
typedef struct
{
  uint64_t a_type;    /* Entry type */
  union
    {    
      uint64_t a_val;   /* Integer value */
      /* We use to have pointer elements added here.  We cannot do that,
   though, since it does not work when using 32-bit definitions
   on 64-bit platforms and vice versa.  */
    } a_un;
} Elf64_auxv_t;
```
