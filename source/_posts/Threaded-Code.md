---
title: 【译】Threaded Code
intro: 本文用于记录有关 Threaded Code 的一些内容。此文原文较老（2003），仅供参考。
comments: false
date: 2020-08-21 07:01:46
tags:
- 虚拟机
---

本文用于记录有关 Threaded Code 的一些内容，翻译自“[这里](http://www.complang.tuwien.ac.at/forth/threaded-code.html)”。**此文原文较老（2003），仅供参考。**

### Threaded Code 有什么好处？

Threaded Code 是一种用于实现虚拟机解释器（interpreter）的技术。事实上，有很多种方法可以用来实现解释器，其中比较常用的一些方法有：

* 直接**按字符串解释执行**；
* 将源代码编译成类似 **AST 的树形结构**，然后解释执行整棵树；
* 将源代码编译成某种虚拟机的**字节码**格式，然后解释执行字节码；

如果你看重性能，则可以采用第三种“虚拟机字节码”的方式（因为获取和解码更简单，因此也更快）。如果你暂时对性能不感兴趣，也同样可以考虑使用虚拟机字节码的方式，因为它通常与其他方法一样简单。

“Threaded Code” 如同其本意一样，是实现虚拟机解释器的技术之一。如今，至少 Forth 社区已经将 “threading” 一词用于指代任何实现 Forth 虚拟机所使用的技术。

### 什么是 Threaded Code？

让我们看一段由虚拟机指令 A、B 和 C 组成的线性代码。假设我们编写汇编例程（routine）Ar、Br 和 Cr，以执行虚拟机指令对应的动作。然后，我们可以编写以下汇编代码来执行这些虚拟机指令：

```text
call Ar
call Br
call Cr
```

尽管它不是原本意义上的 Threaded Code，但它通常也被称为 *subroutine-threaded code*。实际上，基于例程的 threading 甚至都不是一种“解释性”的技术。

现在，让我们消除例程的调用过程（call）：

```text
Ar
Br
Cr
```

比如，将一系列的代码地址当做虚拟机指令。

结果就是，我们无法通过跳转到它的开头部分来执行这段代码。我们还必须在单独的寄存器中跟踪指向当前指令的指针（而不是使用 CPU 的 PC 寄存器以及相关存有调用返回地址的堆栈/寄存器）。

那我们如何执行下一条指令呢？假设指令指针寄存器（ip）始终指向代码序列中紧接当前指令字的字（地址）。然后我们只需要加载这个指令字，跳转到它所指向的例程，然后递增指令指针。例如，使用 MIPS 汇编语言：

```nasm
lw   $2,0($4) # 获取下一条指令到 $2，$4=指令所在地址（指针）；
addu $4,$4,4  # 递增 ip 寄存器 4 个字节；
j    $2       # 跳转到对应地址执行指令；
nop           # 填补分支延迟间隙（Branch Delayed Slot，MIPS / SPARC 专有）；
```

该例程是一个解释器（在 Forth 社区中也称为“内部解释器”）。它也被称为 “NEXT” 例程。 在每个虚拟机指令例程的末尾都会有一个 NEXT 的副本，或者它们共享同一个 NEXT 副本，并跳转到该副本。对于现代处理器，使用共享的 NEXT 例程不仅会消耗一个 “jump” 指令，而且还会极大地提高具有 BTB（Branch Target Predictor）和类似间接分支预测器的 CPU，在预测间接跳转时的错误预测率。因此，**建议不要使用共享的 NEXT 例程**。

上述方法一般被称为 *direct-threaded code*。一个基于 C 语言的实现如下所示：

```c
#define NEXT goto **ip++
#define guard(n) asm("#" #n)

main() {
  /* this has 50% mispredictions (50-60% is typical in large benchmarks) */
  static void* prog[] = {&&next1, &&next2, &&next1, &&next3, &&next1, &&next4, &&next1, &&next5, &&next1, &&loop};
  void** ip = prog;
  int count = 10000000;
  NEXT;
 next1:
  guard(1);
  NEXT;
 next2:
  guard(2);
  NEXT;
 next3:
  guard(3);
  NEXT;
 next4:
  guard(4);
  NEXT;
 next5:
  guard(5);
  NEXT;
 loop:
  if (count > 0) {
    count--;
    ip = prog;
    NEXT;
  }
  exit(0);
}
```

请注意，与流行的说法相反，*subroutine-threaded code* 通常比 *direct-threaded code* 慢。

![](1.png)


### Threading 技术

将介绍基于上述 *direct-threaded code* 的几种变体：

#### Indirect Threaded Code

让我们考虑常量：它们可以由虚拟机指令 lit（用于字面量）表示，后跟常量的值。如果该常量频繁出现，则为该常量提供虚拟机指令则会在一定程度上节省空间。如果我们有几个常量，则对于它们的虚拟机指令代码将看起来非常相似。因此，我们更希望共享代码，但同时拥有独立的数据。

为此，我们可以在 NEXT 中添加一个“间接级别”（*indirect-threaded code*）。每个指令字（虚拟机指令的一般化）都有一个代码字段和一个参数字段，例如，下面这个关于常量的例子：

```text
code-field:      docon # 共享的，用于定义常量的代码对应的代码段地址；
parameter-field: value # 常量的值；
```

现在，虚拟机代码由一系列“代码段地址”而不是代码地址表示。简单的虚拟机指令（原语）通常表示如下：

```text
code-field2:      parameter-field2
parameter-field2: code # 原语对应的机器代码；
```

基于 *indirect-threaded code* 的 NEXT 可由如下 MIPS 汇编语言表示：

```nasm
lw   $2,0($4) # 获取下一条指令字的代码段地址, $4=指令字代码段所在地址（指针）；
nop
lw   $3,0($2) # 获取指令字的实际指令地址；
addu $4,$4,4  # 递增 ip 寄存器 4 个字节；
j    $3       # 跳转到对应地址执行指令；
nop
```

传统上，Forth 是使用 *indirect-threaded code* 实现的。因此，*direct-threaded code* 与 *indirect-threaded code* 两者在实现上有很多共同点：非原语（Non-primitive）具有一个代码段（code-field），但是现在它包含一个跳转到实际代码的 “jump”，而不是其地址信息。在大多数处理器上，此跳转比 *indirect-threaded code* 的额外负载花费更多的时间，因此 *direct-threaded code* 在执行原语（primitive）时会具有性能优势。在 486 上，相对的提速是 2％-8％。（原语和非原语的区别？）

一个基于 C 语言的简单实现如下所示：

```c
#define NEXT goto ***ip++
#define guard(n) asm("#" #n)

main() {
  /* this has 50% mispredictions (50-60% is typical in large benchmarks) */
  static void* cf[] = {&&next1, &&next2, &&next3, &&next4, &&next5, &&loop};
  static void** prog[] = {cf, (cf + 1), cf, (cf + 2), cf, (cf + 3), cf, (cf + 4), cf, (cf + 5)};
  void*** ip = prog;
  int count = 10000000;
  NEXT;
 next1:
  guard(1);
  NEXT;
 next2:
  guard(2);
  NEXT;
 next3:
  guard(3);
  NEXT;
 next4:
  guard(4);
  NEXT;
 next5:
  guard(5);
  NEXT;
 loop:
  if (count > 0) {
    count--;
    ip = prog;
    NEXT;
  }
  exit(0);
}
```


#### Token Threaded Code

*direct-threaded code* 不能简单地从一台计算机移植到到另一台计算机，因为它包含有平台独立的“代码地址”信息。*token-threaded code* 使用固定的虚拟机指令编码，从而以在每个 NEXT 中进行表查找（将指令编码映射到其实际代码地址）为代价，来实现代码的可移植性。*indirect-threading* 和 *token-threading* 是正交的，因此可以将它们组合为 *indirect-token-threading*（但相对来说会有更慢的 NEXT 分发过程）。

#### 其他类型

* ***switch-threaded code***：

一种使用类似 C 语言实现虚拟机解释器的方法。

*switch-threaded code* 使用 C 的 switch-case 语句（或其他语言的类似语句）。其结果具有与 *token-threaded code* 相同的优势；与其相比的缺点是，由于大多数 C 编译器为 switch-case 语句生成了范围检查，因此指令分发速度较慢。

现代 CPU 上的 *switch-threading* 的主要性能缺点是它使用一个共享的间接跳转分支。而这会导致许多现代 CPU 上的 BTB 中的错误分支预测率接近 100％。而具有单独 NEXT 的线程代码仅存在约 50％ 的错误预测。

```c
#define NEXT break
#define guard(n) asm("#" #n)

main() {
  static int prog[] = {0, 1, 0, 2, 0, 3, 0, 4, 0, 5};
  int* ip = prog;
  int count = 10000000;

  for (;;) {
    switch (*ip++) {
    case 0:
      guard(0);
      NEXT;
    case 1:
      guard(1);
      NEXT;
    case 2:
      guard(2);
      NEXT;
    case 3:
      guard(3);
      NEXT;
    case 4:
      guard(4);
      NEXT;
    case 5:
      if (count > 0) {
        count--;
        ip = prog;
        NEXT;
        /* the rest is to get gcc to make a realistic switch statement */
      }
      else
	exit(0);
    case 12:
    case 8:
      count = 25;
      NEXT;
    case 10:
      count--;
      NEXT;
    }
  }
}
```

* ***segment-threaded code***：

一种用于 8086 架构的技术。该代码由一个**段序列**而不是一个**代码地址序列**组成。这允许将 8086 的整个地址空间用于带有 16 位“指针”的线程代码，但所有字都需要 16 字节对齐。

* ***call-threaded code***：

*call-threaded code* 使用函数间接调用（大多数编程语言都具有）而不是间接跳转。对于每个函数调用，还必须有一个相应的返回（尾递归优化除外）。因此，此方法的成本是使用 “call-return” 序列而不是简单的跳转。

此外，每个虚拟机指令由一个函数（过程）表示。这看起来很优雅，并且允许单独编译，但是这意味着必须将全局变量用于作为虚拟机寄存器（例如，指令指针 ip），大多数编译器会将其分配到内存（读取过程相对较慢）中；相反，使用 *switch-threaded code*，我们可以使用局部变量，这些局部变量将有可能会被分配到寄存器中。

```c
typedef void (*Inst)();
#define guard(n) asm("#" #n)

Inst* ip;
extern Inst prog[];

#define NEXT ((*ip++)())

void next1() {
  guard(1);
}

void next2() {
  guard(2);
}

void next3() {
  guard(3);
}

void next4() {
  guard(4);
}

void next5() {
  guard(5);
}

void loop() {
  static int count = 10000000;

  if (count <= 0)
    exit(0);
  count--;
  ip = prog;
}

Inst prog[] = {next1, next2, next1, next3, next1, next4, next1, next5, next1, loop};

main() {
  ip = prog;
  for (;;)
    NEXT;
}
```
