---
title: 常用 Threading Models 的伪代码示例
intro: RT。
comments: true
date: 2020-08-24 19:45:11
tags:
- 虚拟机
---

RT。

### 常用模型

#### Direct threading

在该 threading 模型中的地址是指机器语言的地址。这种形式很简单，但是可能会产生额外的开销，因为 thread 仅由机器地址组成，因此所有**其他参数都必须从内存中间接加载**。一些 Forth 系统会生成 *direct-threaded code*。在许多计算机上，*direct-threaded code* 会比 *subroutine-threaded code* 要快（请参见下面的参考）。

假设一个堆栈机可能执行序列 “push A; push B; add;”。可以将其转换为如下伪代码。其中 ip 初始化为了标记 “thread” 的地址（存储着 pushA 所在的地址）。（这里，next 例程被内联了）

```nasm
start:
  ip = &thread  // ip points to &pushA (which points to the first instruction of pushA).
  jump *ip++  // send control to first instruction of pushA and advance ip to &pushB.
thread:
  &pushA
  &pushB
  &add
  ...
pushA:
  *sp++ = A
  jump *ip++ // send control where ip says to (i.e. to pushB) and advance ip.
pushB:
  *sp++ = B
  jump *ip++
add:
  addend = *--sp
  *sp++ = *--sp + addend
  jump *ip++
```

或者，操作数也可以包含在代码中。这可以删除上面需要的一些间接调用，但是会使代码量变大：

```nasm
start:
  ip = &thread
  jump *ip++
thread:
  &push
  &A  // address where A is stored, not literal A.
  &push
  &B
  &add
  ...
push:
  *sp++ = *ip++  // must move ip past operand address, since it is not a subroutine address.
  jump *ip++
add:
  addend = *--sp
  *sp++ = *--sp + addend
  jump *ip++
```

#### Indirect threading

*indirect-threading* 使用依次指向机器代码位置的指针。间接指针后面可以跟随操作数，这些操作数存储在间接“块”中，而不是将其重复存储在 thread 中。因此，*indirect-threaded code* 通常比 *direct-threaded code* 更紧凑。尽管间接跳转通常会使它变慢，但通常仍比字节码解释器快。如果处理程序操作数包含值和类型，则与 *direct-threaded code* 相比，可以节省更大的空间。较旧的Forth 系统通常会生成 *indirect-threaded code*。

例如，如果目标是执行 “push A; push B; add;”，则可以使用以下方式。在这里，`ip` 被初始化为地址 `＆thread`，借助 `ip` 和一个“间接块”，通过两次间接跳转，可以找到每个代码片段（`push`，`add`）。片段的任何操作数都可以在片段地址后的间接块中找到。这要求将当前子例程保留在 `ip` 中，而这与之前的所有示例都包含要调用的下一个子例程不同。（**抽象**+**封装**）

```nasm
start:
  ip = &thread  // points to '&i_pushA'.
  jump *(*ip)  // follow pointers to 1st instruction of 'push', DO NOT advance ip yet.
thread:
  &i_pushA
  &i_pushB
  &i_add
  ...
i_pushA:
  &push
  &A
i_pushB:
  &push
  &B
i_add:
  &add
push:
  *sp++ = *(*ip + 1)  // look 1 past start of indirect block for operand address.
  jump *(*++ip)  // advance ip in thread, jump through next indirect block to next subroutine.
add:
  addend = *--sp
  *sp++ = *--sp + addend
  jump *(*++ip)
```

#### Subroutine threading

所谓的 “*subroutine-threaded code*”（也称为 “*call-threaded code*”）是由一系列机器语言的“调用”指令（或将被“调用”的函数地址）组成，与 *direct-threaded code* 所使用 “jump” 正相反。用于 ALGOL、Fortran、Cobol 和某些 Forth 系统的早期编译器通常会生成 *subroutine-threaded code*。在许多这样的系统中，代码都是在后进先出（LIFO）操作数堆栈上操作的，为此，编译器理论得到了很好的发展。大多数现代处理器都对子例程的 “call” 和 “return” 指令具有特殊的硬件支持，因此每次分派额外一条机器指令的开销有所减少。

Gforth 编译器的共同创建者 Anton Ertl 曾说：“与流行的神话相反，*subroutine-threading* 通常比 *direct-threading* 慢”。然而，Ertl 的最新测试显示，在 25 个测试用例中，有 15 个使用了 *subroutine-threading* 的用例比 *direct-threading* 更快。更具体地说，他发现 *direct-threading* 是 Xeon，Opteron 和 Athlon 处理器上最快的 threading 模型，*indirect-threading* 在 Pentium M 处理器上最快，而 *subroutine-threading* 在 Pentium 4，Pentium III 和 PPC 处理器上最快。

作为 “push A; push B; add;” 的 *call-threading* 的示例：

```nasm
thread:
  call pushA
  call pushB
  call add
  ret
pushA:
  *sp++ = A
  ret
pushB:
  *sp++ = B
  ret
add:
  addend = *--sp
  *sp++ = *--sp + addend
  ret
```

#### Token threading

*token-threaded code* 使用指向指针表的 8 或 12 位索引的列表。它非常紧凑，通常是其他 threading 大小的一半到四分之三，它们本身是非线程代码的四分之一到八分之一。该表的指针可以是间接的也可以是直接的。一些 Forth 编译器会生成 *token-threaded code*。

从历史上看，一种常见的方法是字节码，它使用 8 位操作码，并且通常使用基于堆栈的虚拟机。典型的解释器称为“**解码和调度解释器**”，格式如下：

```nasm
start:
  vpc = &thread
top:
  i = decode(vpc++)  /* may be implemented simply as:  return *vpc */
  addr = table[i]
  jump *addr
thread:  /* Contains bytecode, not machine addresses.  Hence it is more compact. */
  1 /*pushA*/
  2 /*pushB*/
  0 /*add*/
table:
  &add    /* table[0] = address of machine code that implements bytecode 0 */
  &pushA  /* table[1] ... */
  &pushB  /* table[2] ... */
pushA:
  *sp++ = A
  jump top
pushB:
  *sp++ = B
  jump top
add:
  addend = *--sp
  *sp++ = *--sp + addend
  jump top
```

如果虚拟机仅使用字节大小（1 Byte）的指令，则 `decode()` 可以直接从 `thread` 中获取，但是通常有一些会使用，常用的 1 字节指令外加一些不太常见的多字节指令，在这种情况下 `decode()` 的执行便会比较复杂。**单字节操作码的解码可以通过，将操作码（OpCode）直接作为索引**来非常简单有效地进行处理。

对于单个操作十分简单的指令（例如 “push” 和 “add”），决定执行什么（分支预测）所涉及的开销大于实际执行它的成本，因此此类解释器通常比机器代码慢得多。但是，对于更复杂的（“复合”）指令，开销会相对地降低。

违反直觉的是，*token-threaded code* 有时可以比等效的机器代码运行得更快。当机器代码太大而无法被容纳在高速缓存中时，threading 代码（尤其是 *token-threaded code*）相对较高的代码密度，使得其更可能被完全存放在高速缓存中。

#### Huffman threading

*Huffman-threaded code* 由存储为 Huffman 代码的令牌（token）列表组成。 Huffman 码是一个可变长的比特串，用于标识唯一的令牌。*Huffman-threading* 解释器使用可以通过 Huffman 代码进行导航的索引表或指针树来定位子例程。*Huffman-threaded code* 是计算机程序中最紧凑的表示形式之一。通过测量对代码中每个子例程的调用频率来选择索引和代码。频繁呼叫的代码最短。频率近似相等的操作被赋予具有几乎相等的位长的代码。大多数 *Huffman-threading* 系统已实现为 *direct-threading* 模型的 Forth 系统，并用于将大量运行缓慢的代码打包到小型廉价的微控制器中。

### 较少使用的模型

*string-threading* 就是一个例子，其中的操作由字符串标识，通常由哈希表查找。这在 Charles H. Moore 最早的 Forth 实现中，以及在伊利诺伊大学的实验性硬件解释计算机语言中都使用过。它也被用在 Bashforth 中。

### 双堆栈原理

在机器中**将数据和返回堆栈分开可以消除大量的堆栈管理代码**，从而大大减少 threaded-code 的大小。“双堆栈原理”是独立于三个方面产生的：对于 Burroughs 大型系统，Forth 和 PostScript。它在某些 Java 虚拟机中使用。

虚拟机中通常存在以下三个寄存器。以及另外一个用于在子例程（“words”）之间传递数据的寄存器。它们分别是：

* **ip**/**i**：指令指针寄存器；
* **w**：工作指针；
* **rp**/**r**：用于返回栈指针；
* **sp**/**s**：参数栈指针，用于在子例程之间传递参数；

通常，threaded 虚拟机（例如 Forth 的实现）其**核心是一个简单的虚拟机**，该虚拟机由三个原语组成。分别是：

1. nest / docol；
2. nnest / semi_s；
3. next；

在一个 *indirect-threaded code* 的虚拟机中，此处对应的操作是：

```nasm
next:
  *ip++ -> w
  jump **w++
nest:
  ip -> *rp++
  w -> ip
  next
unnest:
  *--rp -> ip
  next
```
