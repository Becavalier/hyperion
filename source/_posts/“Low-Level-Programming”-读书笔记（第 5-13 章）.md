---
title: 《Low-Level Programming》读书笔记（第 5-13 章）
intro: 内容太多，所以分成多篇来记录了，书接上文。
comments: true
date: 2020-06-29 00:28:35
tags:
- 汇编
---

内容太多，所以分成多篇来记录了，书接上文。

### Chapter 5：编译管线

44. （Page：64）NASM 基本宏编译（属于“预处理阶段”，仅做简单的“宏展开”和“宏符号替换”而不考虑编程语言的语法规则）：

**常量宏替换**（%define）：

```nasm
%define COUNT 42
mov rax, COUNT  ; macro -> macro expansion;
; mov rax, 42
```

**带参数的宏替换**（%macro / %endmacro）：

```nasm
%macro print 2  ; macro, taking 2 parameters;
mov rsi, %1  ; use the 1st parameter;
mov rax, 1
mov rdi, 1
mov rdx, %2  ; use the 2nd parameter;
syscall
%endmacro

section .rodata
v:
    db 'YHSPY', 0

global _start
section .text
_start:
    print v, 6  ; macro -> macro expansion;
    mov rax, 60
    xor rdi, rdi
    syscall
```

45. （Page：66）NASM 条件宏编译：

* **简单条件编译**（%if / %elif / %else / %endif）：

```nasm
%define FLAG 1
global _start
section .text
_start:
%if FLAG == 1  ; macro -> macro expansion;
    mov rdi, 1
%elif FLAG == 2
    mov rdi, 2
%else 
    xor rdi, rax
%endif
    mov rax, 60
    syscall
```

* **基于定义的条件编译**（%ifdef / %ifndef）：

```nasm
%define FLAG
global _start
section .text
_start:
%ifdef FLAG  ; macro -> macro expansion;
    mov rdi, 1
%else 
    xor rdi, rax
%endif
    mov rax, 60
    syscall
```

* **基于文本识别的条件编译**（%ifidn / %ifidni）：

```nasm
%macro pushr 1
%ifidn %1, rflags  ; test if texts are identical;
    pushf
%else
    push %1
%endif
%endmacro
global _start
section .text
_start:
    pushr rax
    pushr rflags  ; push lower 16 bits of EFLAGS;
    xor rdi, rdi
    mov rax, 60
    syscall
```

* **基于参数类型的条件编译**（%ifid / %ifstr / %ifnum）：

```nasm
%macro print 1
%ifid %1  ; test whether it's an identifier?
    %error "String literals are not supported yet!"  ; throw an error;
%endif
%ifnum %1  ; test whether it's a number?
    mov rdi, 2
%endif
%ifstr  ; test whether it's a string?
    mov rdi, 3
%endif
%endmacro
global _start
section .text
_start:
    print 10  ; mov rdi, 2;
    mov rax, 60
    syscall
```

46. （Page：69）NASM 下的**宏定义求值规则**：
* **％define 表示延迟替换**。如果当前宏所引用的其他宏被重新定义，则该宏可能会在实例化之间动态地更改其展开值；
* **％xdefine 表示定义时执行替换**。当前宏所引用的其他宏在定义后便直接与其绑定，即：无法动态地在实例之间更改宏展开值；
* **％assign 类似于 ％xdefine，强制求值并进行替换**。若宏计算结果不是数字值，则抛出错误；

47. （Page：71）NASM 宏重复结构：times 伪指令仅会在所有宏定义全部展开后才开始执行，因此无法用于重复使用宏定义，仅可用于重复指令执行。而我们可以使用 **%rep** / **%endrep** 宏结构来重复定义宏：

```nasm
%define v 0
%define c 1
%rep 10
%assign v v + c  ; v += c;
%assign c c + 1  ; increase v by 1;
%endrep
global _start
section .text
_start:
    mov rdi, v  ; v <- 55;
    mov rax, 60
    syscall
```

* 在循环中我们可以使用 **%exitrep** 直接退出整个循环结构（类似 break）。

48. （Page：73）在宏定义中使用标签（%%\<label\>）：

```nasm
%macro foo 1
    xor rax, rax
%%start:
    cmp rax, %1
    je %%end  ; label name can be used with directives;
    inc rax
    jmp %%start
%%end:
%endmacro
global _start
section .text
_start:
    foo 10
    mov rdi, rax
    mov rax, 60
    syscall
```

49. （Page：77）相较于 readelf 命令，**objdump 还支持对除 ELF 外的其他格式的分析**，比如：ELF、COFF、MachO 甚至 Wasm（llvm-objdump）。
50. （Page：79）以 **Intel 指令集**（而非 AT&T）的语法形式展示反编译的代码结果：

```bash
objdump -D -M intel-mnemonic <file>
```

51. （Page：80）NASM 下的**静态链接**：

主文件：

```nasm
extern count  ; declare this as an external symbol;

global _start
section .text
_start:
    mov rdi, [count]
    mov rax, 60
    syscall
```

模块文件：

```nasm
global count  ; declare this as a global symbol;
section .data
count:
    db 10
```
* **只有 Global 的符号才能够跨模块共享使用**。通常在 C/C++ 定义的非静态函数默认均为 Global 类型，而全局静态函数由于作用域仅限于当前的编译单元，因此为 Local 类型符号；

52. （Page：83）NASM 下的**动态链接**：

主文件（main.asm）：

```nasm
global _start

extern foo

section .text
_start:
    mov rdi, 10
    call foo
    mov rdi, rax
    mov rax, 60
    syscall
```

共享库文件（mod.asm）：

```nasm
extern _GLOBAL_OFFSET_TABLE_  ; PIC code;
global foo:function

section .rodata
message:
    db 'Shared object wrote this', 10, 0

section .text
foo:
    mov rax, 1
    mov rdi, 1
    mov rsi, message
    mov rdx, 14
    syscall
    ret
```

* 在最后一步链接生成 ELF 可执行文件时一定要**指定使用的动态链接器**：

```bash
ld -o main main.o ./mod.so --dynamic-linker=/lib64/ld-linux-x86-64.so.2
```

53. （Page：87）NASM 汇编实现的一个简易 **Dictionary**（基于 Linked List）：基本原理是使用宏自动生成的标签（%%lw）来分割每一个 Node；每个 Node 包含两部分：一部分为指向下一个节点的“指针”，另一部分为 Key-Value 结构，保存了当前节点的键值对。

```nasm
%define lw 0

%macro colon 2
%%lw: dq lw 
db %1, 0
xt_ %+ %2:  ; use '%+' to combine macros;

%define lw %%lw  ; use address of the label;
%endmacro

global _start
section .rodata
colon "tail", tail
db "tail", 0

colon "head", head
db "head", 0

section .text
_start:
    mov rax, lw
    ; save next node addr (first 8 bytes) to rbx;
    mov rbx, [rax]  
    add rax, 8

    ; print the key of the first node;
    mov rsi, rax
    mov rax, 1
    mov rdi, 1
    mov rdx, 4
    syscall
    
    ; start from that addr (bypass the first 8 bytes);
    add rbx, 8  
    mov rsi, rbx
    mov rax, 1
    mov rdi, 1
    mov rdx, 4
    syscall

    xor rdi, rdi
    mov rax, 60
    syscall
```

* 用于串联两条宏指令：“<b>％+</b>”；

### Chapter 6：中断和系统调用

54. （Page：91）应用程序有两种可以访问 IO 端口的方式：
* 通过指令 **in** 和 **out** 来访问分离的 IO 专用地址空间（**0x0 - 0xffffh**）。这两个指令可用来在 eax 与 IO 端口之间交换数据；
* 通过映射到进程虚拟地址空间的 IO 专用地址来访问 IO 设备；

55. （Page：94）每一个中断请求都带有一个 ID，以用于在内存中的“中断描述表（IDT）”查询对应的中断类型和处理程序地址。中断描述表的位置及大小信息被记录在 **idtr** 寄存器（64 位）中。其中**低 16 位记录了大小信息**；**高 48 位记录了 IDT 的地址信息**。
56. （Page：94）IDT 中的每一个表项占据 16 个字节，大体结构如下：

![](1.png)

* 其中当前的特权等级需要小于等于 DPL 字段的值，以使用 int 来调用该中断处理程序；
* **前 30 个中断号被保留**，CPU 会将它们用于处理其内部事件，例如无效的指令编码。

57. （Page：96）当第 n 号中断发生时，从程序员的角度将执行以下操作：
* 从 **idtr** 寄存器中获得 IDT 的地址；
* 对应的中断描述符位于 IDT 起始偏移 16 x n 字节处；
* 段选择器和中断处理程序地址从 IDT 对应条目加载到 cs 和 rip 寄存器中，可能会同时更改特权级别。旧的 ss \ rsp \ rflags \ cs 和 rip 被存储到栈中；
* 对于某些中断，一个错误代码会被推入处理程序栈的顶部，以提供有关中断原因的其他信息；
* 如果中断描述符的类型字段将其定义为 Interrupt Gate，则清除中断标志 IF。但对于 Trap Gate 来说，该标志不会被自动清除，以允许嵌套的中断处理过程；

58. （Page：97）Intel64 使用新的 **syscall** / **sysret** 指令来进行系统调用，相比于之前的 int 指令，其优势在于：
* 权限转移只能发生在 ring0 和 ring3 之间；
* 所有的系统调用都只有一个代码入口点，而非传统 `int 0x80` 的方式；
*  通用寄存器在系统调用期间被隐式使用（如 rcx 用于存储 rip 寄存器的内容；r11 用于存储 rflags 的内容）；

### Chapter 7：计算模型

（“有限自动机”的部分略。这部分内容可以直接参考斯坦福的 **CS143**。） 

59. （Page：110）Forth 抽象机：**处理器** + **两个分别用于存储数据和返回地址的栈** + **线性内存**；

![](2.png)

Forth 程序按“**字**”为单位以空格或换行符进行分割，数字值表示将该数据推入栈中。有三种类型的“字”：Integer（数据）、Native（操作）、Colon（定义其他字）。**符号 “:” 用于定义新的字**。一个基本的用于求一元二次方程判别式的 Forth 程序的栈变化图（Stack Diagram）如下：

![](3.png)

60. （Page：113）基于 **ITC**（Indirect Threaded Code，二级指针）方式实现的 Forth Machine 基本字调用结构：

![](4.png)

* pc 指向了每一个 Native 对应的 **ET**（Execution Token，汇编实现部分）；而每一个 Native 在实现的结尾处都通过调用 next 子过程来调整 pc 的位置，并将执行过程移动到下一个 ET 处；
* Colon 其实相当于**子函数调用**的过程，在调用之前需要先保存当前 pc 的值，然后在调用结束后把 pc 值重置；

一个简单实现：<u>**[Becavalier/Forthress](https://github.com/Becavalier/Forthress)**</u>。

### Chapter 8：C 语言

61. （Page：130）<b>-Wall</b>，可用于让编译器显示所有警告信息。
62. （Page：131）在 C 中，**全局变量只能使用编译时常量来赋值**；
63. （Page：131）在大多数去情况下尽量使用 **puts** 来代替 **printf** 输出字符串。相较于 printf，puts 速度更快且没有安全漏洞。
64. （Page：133）**静态类型**意味着可以在编译时知道所有变量的具体类型；**弱类型**意味着有时一些数据值会被隐式地转换为其他类型。
65. （Page：136）C 中的 `goto` 语句可用于实现“有限状态机”。

### Chapter 9：C 类型系统

66. （Page：148）int 的大小原本被设计为等同于机器字（word）的大小。直到 32bit 到 64bit 的过渡时期，为了不破坏原有应用的可用性，int 仍被保持为默认的 4 字节大小。
67. （Page：149）**long double 类型的值至少与 double 类型要保持一致**，但不同编译器对待该类型的实际尺寸可能不一样。在某些 X86-32 芯片中，该尺寸可能为 80bit。
68. （Page：154）C 中没有“数组引用”做函数参数的概念，因此在为以普通数组做参数的函数传递实参时，编译器会**将数组退化（decay）为指针，从而丢失长度信息**。而“数组引用”做参数时会保留参数的长度信息和数组类型。C99 引入了新的语法（**静态数组参数**），可以向编译器保证被传入的实参数组至少有一定数量的元素，以便以进行某些优化。

```c
#define ARR_SIZE 10
void foo(int arr[static ARR_SIZE]) {}  // a promise to compiler;

int main(int argc, char** argv) {
  int arr[ARR_SIZE + 1] = {};
  foo(arr);
  return 0;
}
```

69. （Page：154）指派初始化（C++20 里也开始支持）：

```c
#define ARR_SIZE 10
int main(int argc, char** argv) {
  int arr[ARR_SIZE] = { [5] = 29, [1] = 10};
  return 0;
}
```

70. （Page：156）一般情况下，**请使用 size_t 类型来作为数组的索引下标**。标准规定，数组类型的可索引大小由 size_t 的大小决定。
71. （Page：156）C 标准中**没有规定对负数进行位移操作时的具体实现规则**。
72. （Page：157）**sizeof 不是函数，而是运算符**。对应的表达式会在编译时被求值。一个最多的应用场景是将其用于对数组大小的求值。
73. （Page：161）在使用 typedef 定义新类型时，尽量**不要把多个类型混合在一起**，比如不要定义新类型为一个函数指针（函数类型 + 指针类型）。指针类型可以在表达式中单独提出来，这样易于代码的理解，提高了可读性。
74. （Page：166）一个重构前后的代码示例（很适合作为面试题）：

重构前：

```c
#include <stdio.h>
int array[] = {1, 2, 3, 4};
int main(int argc, char** argv) {
  int i;
  int sum;
  for (i = 0; i < 5; i++)
    sum = sum + array[i];
  printf("The sum is: %d\n", sum);
  return 0;
}
```

重构后：

```c
#include <stdio.h>
const int g_array[] = {1, 2, 3, 4};  // 变量带有语义；
// 提取通用部分；
int array_sum(const int* array, size_t count) {  // 声明不可变变量；
  if (array == NULL) {  // 判断异常值；
    return -1;
  }
  int sum = 0;
  for (size_t i = 0; i < count; ++i) {  // 限制局部变量的使用范围；
    sum += array[i];  // 符合运算符的性能提升（一步好于多步，类似 super-instruction）；
  }  // 括号增强可维护性；
  return sum;
}
int main(int argc, char** argv) {
  printf("The sum is: %d\n", array_sum(g_array, sizeof(g_array) / sizeof(int)));
  return 0;
}
```

75. （Page：168）C 中的结构体在使用时需要配合 “struct” 关键字。如下，即 “struct pair” 整体才是一个类型。编译器会通过判断是否带有 “struct” 关键字来推断引用变量的类型是结构体还是其他符号。

```c
#include <stdio.h>
struct pair { int x; int y; };
int main(int argc, char** argv) {
  struct pair p = { .x = 10 };  // should be used by "struct pair".
  int pair = 10;
  return 0;
}
```

76. （Page：170）C 下，Union 的一种常见的使用方式：

```c
#include <stdio.h>
union pixel {
  struct { char a, b, c; };
  char at[3];
};
int main(int argc, char** argv) {
  union pixel p = {'a', 'b', 'c' };
  printf("%c\n", p.at[1]);  // 'c'.
  return 0;
}
```

77. （Page：173）类似 OCaml 的静态强类型语言中，**针对两整数运算（+）和两浮点数运算（+.）分别有着不同的运算符**。
78. （Page：178）C11 中新增的宏 **_Generic** 可以在编译时动态选择符合条件的子句（**可用于模拟 C++ 中的函数重载**）：

```c
#include <stdio.h>

#define print_fmt(x) (_Generic((x), \
          int: "%d", \
          double: "%f", \
          default: "%x"))
#define print(x) printf(print_fmt(x), x); puts("");
int main(int argc, char** argv) {
  int x = 101;
  double y = 10.1;
  print(x);
  print(y);
  return 0;
}
```

### Chapter 10：代码结构

79. （Page：183）可以在**函数声明中使用 incomplete 不完全类型**。
80. （Page：191）在宏函数体内的所有变量在使用其值时均需要**以括号“()”的形式包裹起来**。
81. （Page：200）静态局部变量被存放在 .data 段（同全局变量，不受栈增长和收缩的影响）中。

### Chapter 11：内存

82. （Page：203）**ptrdiff_t** / std::ptrdiff_t 类型为**两个指针相减的结果值类型**。两个指针相减的结果值并不是字节数，而**是指针所指类型数据的个数**。ptrdiff_t（**signed**）的长度是平台相关的，因此使用时要注意隐式类型转换可能带来的一些问题。
83. （Page：203）**两个指针类型变量之间不能进行加法、乘法和除法操作**。
84. （Page：208）**第一类对象**（First-class Object）：指某个实体的值其可以被作为函数参数、函数返回值，或者赋值给某个变量；**二等对象**（Second-class Object）：某个实体的值仅能够作为函数参数（比如 C 中的函数）。
85. （Page：209）可变长度数组（VLA）：数组长度可以在运行时决定（C99）。

```c
#include <stdio.h>
#define DEFAULT_INDEX 0

int main(int argc, char **argv) {
  int arrSize = 10;
  int arr[arrSize];
  arr[DEFAULT_INDEX] = 1;
  printf("%d\n", arr[DEFAULT_INDEX]);
  return 0;
}
```

86. （Page：209）**灵活（柔性）数组类型**：结构体中的最后一个元素允许是未知大小的数组，而 `sizeof` 返回这种结构体的大小时不包括柔性数组占用的内存（C99）。对于 C++ 来说，某些编译器会以“扩展”的方式支持该特性。

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define ARR_SIZE 10

typedef struct int_array {
  size_t size;
  int array[];  // FAM (Flexible Array Member);
} t_int_array;
int main(int argc, char **argv) {
  t_int_array* arr = malloc(sizeof(t_int_array) + sizeof(int) * ARR_SIZE);
  arr->size = ARR_SIZE;
  memset(arr->array, 0, ARR_SIZE * sizeof(int));
  for (int i = 0; i < ARR_SIZE; ++i) {
    printf("%d\n", arr->array[i]);
  }
  return 0;
}
```

87. （Page：212）对于**较短**的字符串，编译器通常会将其**直接 inline 到指令中作为立即数**。对于**较长**的字符串，通常会被事先存放到 **.rodata 段**中，然后在使用到时再通过指令**拷贝到栈**上。
88. （Page：213）不同平台体系上的数据模型：

![](5.png)

89. （Page：214）使用“**平台无关类型**”（uint8_t \ int64_t \ int16_t 等）：

```c
#include <stdio.h>
#include <inttypes.h>
int main(int argc, char **argv) {
  int64_t i64 = -10;
  uint64_t u64 = 100;
  printf("%" PRIi64 "\n", i64);  // 'PRIi64' 为格式化输出字符串对应的宏；
  printf("%" PRIu64 "\n", u64);
  return 0;
}
```

### Chapter 12：语法、语义和语用学

（略）

### Chapter 13：良好的编码习惯

90. （Page：247）可以使用 **Doxygen** 来为 C/C++ 源码创建 HTML 或 LATEX 格式的文档。
