---
title: 老生常谈之：switch-case VS if-else
intro: “在同等条件下，使用 switch-case 与 if-else 哪一个可以在 C++ 中生成质量更好、性能更高的目标代码呢？”这似乎是一个老生常谈的问题，今天我们就来深入研究一下。
comments: false
date: 2020-07-18 21:36:02
tags:
- Cpp
---

“**在同等条件下，使用 switch-case 与 if-else 哪一个可以在 C/C++ 中生成质量更好、性能更高的目标代码呢？**”这似乎是一个老生常谈的问题，今天我们就来深入研究一下。

仅从 C/C++ 代码层面来看，if-else 在进行条件选择时，需要从上到下依次判断每一个条件分支是否成立；而 switch-case 由于 case 表达式只能够使用编译时常量，且类型必须为 integral 或 enum。因此从某种意义上来讲可以使用类似“索引表”的结构来进行优化。我们用如下一段代码作为测试用例：

```c
#include <stdio.h>

int foo(int v) {
  if (v == 10 || v == 20) {
    return 1;
  } else if (v == 30 || v == 40) {
    return 2;
  } else if (v == 50 || v == 60) {
    return 3;
  } else if (v == 70 || v == 80) {
    return 4;
  } else {
    return 5;
  }
}
int bar(int v) {
  switch (v) {
    case 10:
    case 20: { return 1; break; }
    case 30:
    case 40: { return 2; break; }
    case 50:
    case 60: { return 3; break; }
    case 70:
    case 80: { return 4; break; }
    default: return 5;
  }
}
int main(int argc, char** argv) {
  printf("%d %d\n", foo(10), bar(40));
  return 0;
}
```

#### 默认零优化情况

然后我们使用 Clang 的**默认优化等级**来编译上述这段代码。接着使用 GDB 调试：

```bash
(gdb) file main
...
(gdb) set disassembly-flavor intel
(gdb) disas /m foo
```

对函数 foo 的反汇编结果如下：

```text
Dump of assembler code for function foo:
   0x0000000000401130 <+0>:	push   rbp  ; Prologue;
   0x0000000000401131 <+1>:	mov    rbp,rsp
   0x0000000000401134 <+4>:	mov    DWORD PTR [rbp-0x8],edi

   ; 存放在栈上的局部变量 v："x /w $rbp-0x8" -> 0xa;
   ; "} else if (v == 30 || v == 40) {"
   0x0000000000401137 <+7>:	cmp    DWORD PTR [rbp-0x8],0xa
   0x000000000040113b <+11>:	je     0x40114b <foo+27>
   0x0000000000401141 <+17>:	cmp    DWORD PTR [rbp-0x8],0x14
   0x0000000000401145 <+21>:	jne    0x401157 <foo+39>
   0x000000000040114b <+27>:	mov    DWORD PTR [rbp-0x4],0x1
   0x0000000000401152 <+34>:	jmp    0x4011be <foo+142>

   ; "} else if (v == 30 || v == 40) {"
   0x0000000000401157 <+39>:	cmp    DWORD PTR [rbp-0x8],0x1e
   0x000000000040115b <+43>:	je     0x40116b <foo+59>
   0x0000000000401161 <+49>:	cmp    DWORD PTR [rbp-0x8],0x28
   0x0000000000401165 <+53>:	jne    0x401177 <foo+71>
   0x000000000040116b <+59>:	mov    DWORD PTR [rbp-0x4],0x2
   0x0000000000401172 <+66>:	jmp    0x4011be <foo+142>
   
   ; "} else if (v == 50 || v == 60) {"
   0x0000000000401177 <+71>:	cmp    DWORD PTR [rbp-0x8],0x32
   0x000000000040117b <+75>:	je     0x40118b <foo+91>
   0x0000000000401181 <+81>:	cmp    DWORD PTR [rbp-0x8],0x3c
   0x0000000000401185 <+85>:	jne    0x401197 <foo+103>
   0x000000000040118b <+91>:	mov    DWORD PTR [rbp-0x4],0x3
   0x0000000000401192 <+98>:	jmp    0x4011be <foo+142>
   
   ; "} else if (v == 70 || v == 80) {"
   0x0000000000401197 <+103>:	cmp    DWORD PTR [rbp-0x8],0x46
   0x000000000040119b <+107>:	je     0x4011ab <foo+123>
   0x00000000004011a1 <+113>:	cmp    DWORD PTR [rbp-0x8],0x50
   0x00000000004011a5 <+117>:	jne    0x4011b7 <foo+135>
   0x00000000004011ab <+123>:	mov    DWORD PTR [rbp-0x4],0x4
   0x00000000004011b2 <+130>:	jmp    0x4011be <foo+142>
  
   ; "} else {"
   0x00000000004011b7 <+135>:	mov    DWORD PTR [rbp-0x4],0x5
   0x00000000004011be <+142>:	mov    eax,DWORD PTR [rbp-0x4]

   0x00000000004011c1 <+145>:	pop    rbp  ; Epilogue;
   0x00000000004011c2 <+146>:	ret    
End of assembler dump.
```

然后我们再以同样的方式来反汇编使用 switch-case 结构的函数 bar 对应的汇编代码：

```text
Dump of assembler code for function bar:
   0x00000000004011d0 <+0>:	push   rbp  ; Prologue;
   0x00000000004011d1 <+1>:	mov    rbp,rsp
   0x00000000004011d4 <+4>:	mov    DWORD PTR [rbp-0x8],edi
  
   0x00000000004011d7 <+7>:	mov    eax,DWORD PTR [rbp-0x8]
   0x00000000004011da <+10>:	add    eax,0xfffffff6
   0x00000000004011dd <+13>:	mov    ecx,eax
   0x00000000004011df <+15>:	sub    eax,0x46
   0x00000000004011e2 <+18>:	mov    QWORD PTR [rbp-0x10],rcx
   0x00000000004011e6 <+22>:	ja     0x40122a <bar+90>
   0x00000000004011ec <+28>:	mov    rax,QWORD PTR [rbp-0x10]
   0x00000000004011f0 <+32>:	mov    rcx,QWORD PTR [rax*8+0x402008]  ; 从“跳表”中找到对应 case 的入口地址；
   0x00000000004011f8 <+40>:	jmp    rcx

   ; "{ return 1; break; }" 
   0x00000000004011fa <+42>:	mov    DWORD PTR [rbp-0x4],0x1
   0x0000000000401201 <+49>:	jmp    0x401231 <bar+97>
   
   ; "{ return 2; break; }" 
   0x0000000000401206 <+54>:	mov    DWORD PTR [rbp-0x4],0x2
   0x000000000040120d <+61>:	jmp    0x401231 <bar+97>
   
   ; "{ return 3; break; }" 
   0x0000000000401212 <+66>:	mov    DWORD PTR [rbp-0x4],0x3
   0x0000000000401219 <+73>:	jmp    0x401231 <bar+97>
   
   ; "{ return 4; break; }" 
   0x000000000040121e <+78>:	mov    DWORD PTR [rbp-0x4],0x4
   0x0000000000401225 <+85>:	jmp    0x401231 <bar+97>
   
   ; "{ return 5; break; }" 
   0x000000000040122a <+90>:	mov    DWORD PTR [rbp-0x4],0x5
   0x0000000000401231 <+97>:	mov    eax,DWORD PTR [rbp-0x4]

   0x0000000000401234 <+100>:	pop    rbp  ; Epilogue;
   0x0000000000401235 <+101>:	ret    
End of assembler dump.
```

众所周知，默认情况下编译器会为 switch-case 生成对应的“**跳表**”结构来以“**空间换时间**”的方式加快该结构对应 case 子句的查询速度。接下来我们在位置 “0x4011f0” 设置断点，并查看 “[rax*8+0x402008]” 的值以检验实际的跳转地址是否正确（对应函数参数 40 的子句入口应该为 “0x401206”）。

```bash
(gdb) break *0x00000000004011f0
Breakpoint 1 at 0x4011f0
(gdb) run
Starting program: /home/osboxes/Repo/linux/main 

Breakpoint 1, 0x00000000004011f0 in bar ()
(gdb) x /g $rax*8+0x402008
0x4020f8:	0x0000000000401206
```

可以看到，结果是正确的。接下来，我们再以 “0x401206” 为入口，来推算一下 “0x401212” 这个分支入口地址在跳表的位置。因为我们的输入为 “40”，距离这个分支入口还有 “10” 的距离。因此该入口地址应该存放于偏移 “0x4020f8” 位置 0x50（0xa * 0x8）的地方，即位置 “0x402148”。我们可以来检验一下：

```bash
(gdb) x /11xg 0x4020f8
0x4020f8:	0x0000000000401206	0x000000000040122a
0x402108:	0x000000000040122a	0x000000000040122a
0x402118:	0x000000000040122a	0x000000000040122a
0x402128:	0x000000000040122a	0x000000000040122a
0x402138:	0x000000000040122a	0x000000000040122a
0x402148:	0x0000000000401212
```

需要注意的是，在位置 “0x4020f8” 与 “0x402148” 之间接连存放的是 switch-case 中 default 语句的入口地址。在《C++ Footprint and Performance Optimization》一书中，作者曾在一定条件下做过测试，得出了以下结论：“**在 5 个分支（包括 default）的情况下，switch-case 与 if-else 的性能基本相同，而低于 5 个分支时，if-else 较快，反之 switch-case 较快**”。由于该书出版较为久远，再加上编译器的优化在这些年里也有了较大的提升，因此该结论仅供参考。

#### -O3 优化情况

我们尝试重新编译上述 C/C++ 代码，并添加优化等级 “-O3”。得出结果发现编译器通过**编译时求值**直接计算出了 printf 中 foo 与 bar 函数的调用结果。不仅如此，对应的 **foo 中的 if-else 结构也被优化为了同 switch-case 一模一样的“跳表”结构**。

```text
(gdb) disas /m foo
Dump of assembler code for function foo:
   0x0000000000401130 <+0>:	add    edi,0xfffffff6
   0x0000000000401133 <+3>:	cmp    edi,0x46
   0x0000000000401136 <+6>:	ja     0x401156 <foo+38>
   0x0000000000401138 <+8>:	mov    eax,0x1
   0x000000000040113d <+13>:	jmp    QWORD PTR [rdi*8+0x402008]
   0x0000000000401144 <+20>:	mov    eax,0x2
   0x0000000000401149 <+25>:	ret    
   0x000000000040114a <+26>:	mov    eax,0x3
   0x000000000040114f <+31>:	ret    
   0x0000000000401150 <+32>:	mov    eax,0x4
   0x0000000000401155 <+37>:	ret    
   0x0000000000401156 <+38>:	mov    eax,0x5
   0x000000000040115b <+43>:	ret    
End of assembler dump.
```

#### switch-case “大跨度”情况

为了验证编译器在 switch-case 中遇到 case 条件的值在跨度较大时的处理情况，我们将上述 C/C++ 代码做出如下更改：

```c
#include <stdio.h>

int foo(int v) {
  if (v == 10000 || v == 20000) {
    return 1;
  } else if (v == 30000 || v == 40000) {
    return 2;
  } else if (v == 50000 || v == 60000) {
    return 3;
  } else if (v == 70000 || v == 80000) {
    return 4;
  } else {
    return 5;
  }
}
int bar(int v) {
  switch (v) {
    case 10000:
    case 20000: {
      return 1; break;
    }
    case 30000:
    case 40000: {
      return 2; break;
    }
    case 50000:
    case 60000: {
      return 3; break;
    }
    case 70000:
    case 80000: {
      return 4; break;
    }
    default: return 5;
  }
}
int main(int argc, char** argv) {
  printf("%d %d\n", foo(10000), bar(40000));
  return 0;
}
```

在默认优化等级下，对于使用了 if-else 结构的 foo 函数来说，**产生的目标代码结构是一样的**，这里不再做介绍。而对于使用了 switch-case 的 bar 函数则有所不同：

```text
Dump of assembler code for function bar:
   0x00000000004011e0 <+0>:	push   rbp
   0x00000000004011e1 <+1>:	mov    rbp,rsp
   0x00000000004011e4 <+4>:	mov    DWORD PTR [rbp-0x8],edi
   0x00000000004011e7 <+7>:	mov    eax,DWORD PTR [rbp-0x8]
   0x00000000004011ea <+10>:	mov    ecx,eax

   ; 存放在栈上的局部变量 v："x /dw $rbp-0xc" -> 40000；
   0x00000000004011ec <+12>:	sub    ecx,0x2710  ; 10000;
   0x00000000004011f2 <+18>:	mov    DWORD PTR [rbp-0xc],eax
   0x00000000004011f5 <+21>:	je     0x401285 <bar+165>
   0x00000000004011fb <+27>:	jmp    0x401200 <bar+32>
   0x0000000000401200 <+32>:	mov    eax,DWORD PTR [rbp-0xc]
   
   ; 比较 v 与 20000；
   0x0000000000401203 <+35>:	sub    eax,0x4e20
   0x0000000000401208 <+40>:	je     0x401285 <bar+165>
   0x000000000040120e <+46>:	jmp    0x401213 <bar+51>
   0x0000000000401213 <+51>:	mov    eax,DWORD PTR [rbp-0xc]
   
   ; 比较 v 与 30000；
   0x0000000000401216 <+54>:	sub    eax,0x7530
   0x000000000040121b <+59>:	je     0x401291 <bar+177>
   0x0000000000401221 <+65>:	jmp    0x401226 <bar+70>
   0x0000000000401226 <+70>:	mov    eax,DWORD PTR [rbp-0xc]
   
   ; 比较 v 与 40000；
   0x0000000000401229 <+73>:	sub    eax,0x9c40
   0x000000000040122e <+78>:	je     0x401291 <bar+177>
   0x0000000000401234 <+84>:	jmp    0x401239 <bar+89>
   0x0000000000401239 <+89>:	mov    eax,DWORD PTR [rbp-0xc]
   
   ; 比较 v 与 50000；
   0x000000000040123c <+92>:	sub    eax,0xc350
   0x0000000000401241 <+97>:	je     0x40129d <bar+189>
   0x0000000000401247 <+103>:	jmp    0x40124c <bar+108>
   0x000000000040124c <+108>:	mov    eax,DWORD PTR [rbp-0xc]
   
   ; 比较 v 与 60000；
   0x000000000040124f <+111>:	sub    eax,0xea60
   0x0000000000401254 <+116>:	je     0x40129d <bar+189>
   0x000000000040125a <+122>:	jmp    0x40125f <bar+127>
   0x000000000040125f <+127>:	mov    eax,DWORD PTR [rbp-0xc]
   
   ; 比较 v 与 70000；
   0x0000000000401262 <+130>:	sub    eax,0x11170
   0x0000000000401267 <+135>:	je     0x4012a9 <bar+201>
   0x000000000040126d <+141>:	jmp    0x401272 <bar+146>
   0x0000000000401272 <+146>:	mov    eax,DWORD PTR [rbp-0xc]
   
   ; 比较 v 与 80000；
   0x0000000000401275 <+149>:	sub    eax,0x13880
   0x000000000040127a <+154>:	je     0x4012a9 <bar+201>
   0x0000000000401280 <+160>:	jmp    0x4012b5 <bar+213>

   0x0000000000401285 <+165>:	mov    DWORD PTR [rbp-0x4],0x1
   0x000000000040128c <+172>:	jmp    0x4012bc <bar+220>
   0x0000000000401291 <+177>:	mov    DWORD PTR [rbp-0x4],0x2
   0x0000000000401298 <+184>:	jmp    0x4012bc <bar+220>
   0x000000000040129d <+189>:	mov    DWORD PTR [rbp-0x4],0x3
   0x00000000004012a4 <+196>:	jmp    0x4012bc <bar+220>
   0x00000000004012a9 <+201>:	mov    DWORD PTR [rbp-0x4],0x4
   0x00000000004012b0 <+208>:	jmp    0x4012bc <bar+220>
   0x00000000004012b5 <+213>:	mov    DWORD PTR [rbp-0x4],0x5
   0x00000000004012bc <+220>:	mov    eax,DWORD PTR [rbp-0x4]
   0x00000000004012bf <+223>:	pop    rbp
   0x00000000004012c0 <+224>:	ret    
End of assembler dump.
```

可以看到，此时的 switch-case 并没有采用“跳表”的方式，而是退化到了与 if-else 结构类似的顺序条件判断结构。因此，可以得到的一个优化方式是：**将命中率较高的 case 语句摆放在 switch-case 结构的最前面，可以减少需要判断的分支情况，加速目标分支的命中**。接下来，我们同样查看在使用了 -O3 参数优化之后生成的目标 switch-case 结构：

```text
Dump of assembler code for function bar:
   0x00000000004011b0 <+0>:	cmp    edi,0xc34f  ; 49999;
   0x00000000004011b6 <+6>:	jg     0x4011d6 <bar+38>
   0x00000000004011b8 <+8>:	cmp    edi,0x752f  ; 29999;
   0x00000000004011be <+14>:	jg     0x4011f4 <bar+68>
   0x00000000004011c0 <+16>:	mov    eax,0x1
   0x00000000004011c5 <+21>:	cmp    edi,0x2710  ; 10000;
   0x00000000004011cb <+27>:	je     0x4011d5 <bar+37>
   0x00000000004011cd <+29>:	cmp    edi,0x4e20  ; 20000;
   0x00000000004011d3 <+35>:	jne    0x401220 <bar+112>
   0x00000000004011d5 <+37>:	ret    

   0x00000000004011d6 <+38>:	cmp    edi,0x1116f  ; 69999;
   0x00000000004011dc <+44>:	jg     0x40120a <bar+90>
   0x00000000004011de <+46>:	cmp    edi,0xc350  ; 50000;
   0x00000000004011e4 <+52>:	je     0x4011ee <bar+62>
   0x00000000004011e6 <+54>:	cmp    edi,0xea60  ; 60000;
   0x00000000004011ec <+60>:	jne    0x401220 <bar+112>
   0x00000000004011ee <+62>:	mov    eax,0x3
   0x00000000004011f3 <+67>:	ret    

   0x00000000004011f4 <+68>:	cmp    edi,0x7530  ; 30000;
   0x00000000004011fa <+74>:	je     0x401204 <bar+84>
   0x00000000004011fc <+76>:	cmp    edi,0x9c40  ; 40000;
   0x0000000000401202 <+82>:	jne    0x401220 <bar+112>
   0x0000000000401204 <+84>:	mov    eax,0x2
   0x0000000000401209 <+89>:	ret   

   0x000000000040120a <+90>:	cmp    edi,0x11170  ; 70000;
   0x0000000000401210 <+96>:	je     0x40121a <bar+106>
   0x0000000000401212 <+98>:	cmp    edi,0x13880  ; 80000;
   0x0000000000401218 <+104>:	jne    0x401220 <bar+112>
   0x000000000040121a <+106>:	mov    eax,0x4
   0x000000000040121f <+111>:	ret   

   0x0000000000401220 <+112>:	mov    eax,0x5
   0x0000000000401225 <+117>:	ret    
End of assembler dump.
```

此时如果再查看 foo 函数内的 if-else 结构，会发现它同 switch-case 结构一样，被优化为了同一种形式，即：**使用 “Binary Decision Tree” 的方式来查找目标分支语句**。
