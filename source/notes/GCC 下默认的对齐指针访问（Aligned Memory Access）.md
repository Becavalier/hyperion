---
title: GCC 下默认的对齐指针访问（Aligned Memory Access）
page: notes
cateogry: C/C++
link: https://trust-in-soft.com/blog/2020/04/06/gcc-always-assumes-aligned-pointer-accesses/
date: 2021-05
---

* 默认情况下，某些现代 C/C++ 编译器会认为它们正在编译的源代码满足内存对齐的约束，即使目标架构没有施加这种限制；
* 在 [C11](https://port70.net/~nsz/c/c11/n1570.html#6.3.2.3p7) 中，对于未对齐的内存地址访问，其行为是 UB；

> if the resulting pointer is not correctly aligned for the referenced type, the behavior is undefined.

* “**C 是可移植的汇编**”这一断言最初来自于 K&R 中；
* 曾经的 Alpha 与 SPARC 等 ISA 不允许未对齐的内存地址访问，而 X86-64 则没有这一限制；
* 一个访问未对齐地址导致问题的例子（该问题仅出现在 GCC 中）：
  * 编译器在推导函数 `h` 的定义时，会默认参数 *p* 与 *q* 访问的是对齐到 32/64 位的地址；
  * 而在上述条件成立时，函数 `h` 可以直接返回常量 1.

```cpp
#include <cstdlib>
#include <cassert>
#include <iostream>

/*
    h(int*, int*):
      mov DWORD PTR [rdi], 1
      mov DWORD PTR [rsi], 1
      mov eax, 1
      ret
*/
int h(int *p, int *q){
  *p = 1;
  *q = 1;
  return *p;
}
void f(void) {
  auto t = static_cast<char*>(std::malloc(1 + sizeof(int)));
  if (!t) std::abort();
  auto fp = reinterpret_cast<int*>(t);
  auto fq = reinterpret_cast<int*>(t + 1);  // misaligned access, UB.
  int r = h(fp, fq);
  assert(r == *fp);  // assertion failed.
}
int main() {
  f();
}
```
* ***如需访问未对齐内存，可使用 `std::memcpy` 作为代替以防止上述优化***（*always do this if you need to access misaligned address*）：
  * 对该函数的调用可能被编译器优化为单一指令（若当前平台支持 *misaligned access*）；
  * 或调用实际的 *std::memcpy* 标准库函数（否则）。

```cpp
int h(int *p, int *q){
  *p = 1;
  int one = 1;
  memcpy(q, &one, sizeof *q);
  return *p;
}
```

* C 中的 ***strict-aliasing*** 规则可被理解为：指针只能从以其类型大小作为边界的内存位置开始引用，多个指针的引用位置之间不能有交叉。
