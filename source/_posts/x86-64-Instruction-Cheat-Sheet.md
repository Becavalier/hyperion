---
title: x86-64 Instruction Cheat Sheet
intro: 自用 x86-64 指令速记手册。
comments: false
date: 2023-03-23 13:21:26
tags:
- 汇编
- x86
- x64
---

自用 x86-64 指令速查手册。

|  指令（NASM） | 用法 | 示例 | 说明 |
|  ----  | ----  | ---- | ---- |
| ***mov dest, src*** | 移动。 | *mov rax, 0x1* | |
| ***in dest, src*** | 从给定端口读。 | *in eax, dx* | 目的操作数必须是 eax、ax、al，源操作数是 dx 或端口号。 |
| ***out dest, src*** | 往给定端口写。 | *out dx, eax* | 目的操作数必须是 dx 或端口号，源操作数是 eax、ax、al。 |
| ***loop label*** | 条件循环。 | *loop start* | cx / ecx / rcx 为计数寄存器，每次循环后值递减，为 0 时循环结束。 |
| ***test x, y*** | 测试，将两个操作数按位与。 | *test rax, rbx* | |
| ***cmp x, y*** | 比较。 | *cmp dx, bx* | 根据表达式 “x - y” 的结果来设置 flags 寄存器。 |
| ***add dest, src*** | 加法。 | *add rax, 0x1* | 不区分符号。 |
| ***adc dest, src*** | 加法，累加 CF。 | *adc rax, 0x1* | 不区分符号。 |
| ***sub dest, src*** | 减法。 | *sub rax, 0x1* | 不区分符号。 |
| ***sbb dest, src*** | 减法，减去 CF。 | *sbb rax, 0x1* | 不区分符号。 |
| ***div divisor*** | 无符号除法。 | *div word [0x0230]* | <ol><li><i>div r/m8</i>：Unsigned divide AX by r/m8, with result stored in AL := Quotient, AH := Remainder.</li><li><i>div r/m16</i>：Unsigned divide DX:AX by r/m16, with result stored in AX := Quotient, DX := Remainder.</li><li><i>div r/m32</i>：Unsigned divide EDX:EAX by r/m32, with result stored in EAX := Quotient, EDX := Remainder.</li><li><i>div r/m64</i>：Unsigned divide RDX:RAX by r/m64, with result stored in RAX := Quotient, RDX := Remainder.</li></ol> |
| ***mul [r/m]*** | 无符号乘法。 | *mov rax, 0x8<br>mul rax* | 结果分别存放到 rdx 与 rax。 |
| ***imul [r/m]*** | 有符号乘法。 | *mov rax, 0x8<br>imul rax* | 结果分别存放到 rdx 与 rax。 |
| ***neg src*** | 取负。 | *neg rax* | 结果值为“取反加一”，等同于 “0 - src”，CF 变为 1。 |
| ***lds / les / lfs / lgs / lss dest, src*** | 从 src 加载一个 “far pointer”（segment + offset），结果存放在对应的段寄存器和目的寄存器中。**x86-64 下基本不再使用**。 | *les ax, [far_pointer]* | “far pointer” 是 32（16:16）位，48（16:32）位，以及 80（16:64）位的形式。cs 寄存器只能通过 call / jmp / int / ret / iret 等指令更改。 |
| ***movsx / movsxd dest, src*** | 带符号扩展的移动。 | *movsx rax, al* | |
| ***cbw / cwde / cdqe*** | 符号扩展 al~eax 寄存器，直接更新值。 | *cbw* | |
| ***cwd / cdq / cqo*** | 符号扩展 ax\~rax 寄存器，将扩展得到的高位结果存放到 dx\~rdx 寄存器。 | *cwd* | |
| ***movzx dest, src*** | 带零扩展的传送。 | *movzx rax, al* | |
| ***cmov[cc] dest, src*** | 条件传送。 | *cmova rax, rbx* | cc 的可用条件，signed 数运算结果：<br> <table><tr><td>G / NLE</td><td>大于 / 不小于等于</td><td>ZF=0 and SF=OF</td></tr><tr><td>L / NGE</td><td>小于 / 不大于等于</td><td>SF≠OF</td></tr><tr><td>GE / NL</td><td>大于等于 / 不小于</td><td>SF=OF</td></tr><tr><td>LE / NG</td><td>小于等于 / 不大于</td><td>ZF=1 or SF≠OF</td></tr></table> <br>unsigned 数运算结果：<br><table><tr><td>A / NBE</td><td>高于 / 不低于等于</td><td>CF=0 and ZF=0</td></tr><tr><td>B / NAE</td><td>低于 / 不高于等于</td><td>CF=1</td></tr><tr><td>AE / NB</td><td>高于等于 / 不低于</td><td>CF=0</td></tr><tr><td>BE / NA</td><td>低于等于 / 不高于</td><td>CF=1 or ZF=1</td></tr></table><br>标志位条件码：<br><table><tr><td>O / NO</td><td>溢出标志</td><td>OF=1 / OF=0</td></tr><tr><td>Z / NZ</td><td>零标志</td><td>ZF=1 / ZF=0</td></tr><tr><td>S / NS</td><td>符号标志</td><td>SF=1 / SF=0</td></tr><tr><td>P / NP</td><td>奇偶标志</td><td>PF=1 / PF=0</td></tr></table>|
| ***and / or / xor / not dest, src*** | 与、或、异或、非。 | *xor rax, rax* | |
| ***bt [r/m], [r/imm]*** | 从指定位置拷贝某位值到 CF 中。 | *bt eax, 0* | |
| ***bts / btr / btc*** | 执行 bt 的同时，将对应位置位、清位、取反。 | *bts eax, 0* | |
| ***bsf / bsr dest, src*** | 从 LSB -> MSB（forward）/ MSB -> LSB（reverse）查找 src 中第一个被置位的位置，值存放在 dest 中。 | *bsf ecx, eax* | |
| ***shl / sal*** | 逻辑左移。 | *shl eax, 2* | 移动时 LSB 补零。 |
| ***shr*** | 逻辑右移。 | *shr eax, 2* | 移动时 MSB 补零。 |
| ***sar*** | 符号位扩展右移。 | *sar eax, 2* | 移动时 MSB 不变。 |
| ***rol / ror*** | 循环左移（右移）。 | *rol eax, 2* |  |
| ***rcl / rcr*** | 带进位循环左移（右移）。 | *rcl eax, 2* | 移动时 CF 会分别补到 LSB 与 MSB |
| ***shld / shrd dest, src, count*** | double 左移（右移）。 | *shld edx, eax, 16* | 将第一个操作数向左（向右）移动指定的位数，第二个操作数提供要从右侧（左侧）移入的位。 |
| ***j[cc]*** | 条件跳转。 | *jne [start]* | cc 条件同上。 |
| ***jcxz*** | 寄存器 cx 内容为 0 时跳转。 | *jcxz show* | |
| ***cpuid*** | 查询 CPU 识别信息。 | *mov eax, 0<br>cpuid* | eax 存放 leaf，ecx 存放 sub-leaf。 |
| ***pushf / pushfd / pushfq*** | 将 flags / eflags / rflags 寄存器的值压入栈。 | *pushf* |  |
| ***popf / popfd / popfq*** | 将栈上的值压入 flags / eflags / rflags 寄存器。 | *pushf* |  |
| ***movs / movsb / movsw / movsd / movsq*** | 移动一段连续线性内存数据。 | *rep movsb* | <ol><li>Legacy 模式：*DS:(E)SI -> ES:(E)DI*；</li><li>64 位模式：*(R|E)SI -> (R|E)DI*。</li></ol> DF 标志位决定拷贝方向（低地址 - 1 \ 高地址 - 0），(R|E)SI / (R|E)DI 的值根据方向自动增加或减少。|
| ***rep*** | 重复执行某个机器指令。 | *rep movsw* | 重复次数由 (E)CX 控制。 |
| ***aaa*** | 将寄存器 al 中的值转换为非压缩 BCD 码。 | *aaa* | 指令根据 AF 标志位（表示进位/借位情况）进行调整。 |
| ***sti / cli*** | 置位和复位 IF 标志位。 | *sti* | 当 CPL <= IOPL 时可以操作。 |
| ***std / cld*** | 置位和复位 DF 标志位。 | *std* |  |
| ***stc / clc / cmc*** | 置位、复位、取反 CF 标志位。 | *stc* |  |
| ***iret / iretd / iretq*** | 从一个中断处理程序返回。 | *iret* |  |
| ***invd*** | 使处理器的内部高速缓存无效，数据不会写回内存。 | *invd* | CPL=0 时可用。 |
| ***wbinvd*** | 使处理器的内部高速缓存无效，数据写回内存。 | *wbinvd* | CPL=0 时可用。 |
| ***clflush*** | 将包含给定地址的缓存行内容回写。 | *clflush [rax]* | CPL=0 时可用。 |
| ***rdtsc / rdtscp*** | 加载 CPU 上时间戳计数器的值。 | *rdtsc* |  |
| ***rdpmc*** | 加载指定性能监控计数器（PMC）的值。 | *rdpmc* |  |
| ***wrmsr*** | 向 MSR 寄存器写入。 | *wrmsr* | 由 ecx 指定 MSR 的地址值。 |
| ***rdmsr*** | 从 MSR 寄存器读。 | *rdmsr* | （同上） |


常用 LLDB 命令：

|  命令 | 说明 |
|  ----  | ----  | 
| ***br l*** | 列出所有断点 | 
| ***br del [n]*** | 删除第 [n] 个断点 |
| ***br s -a [addr]*** | 在地址 [addr] 设置断点  |
| ***di -n _start*** | disassemble 函数 _start |
| ***register read [reg]*** | 查看寄存器 [reg] 的内容 |
| ***register read --format binary [reg]*** | 查看寄存器 [reg] 的内容（二进制格式） |


