---
title: C++ 小记录
intro: 已经不写 C++ 好多年，主要是由于自己只用 C++ 来练习算法，而且其在业务和日常开发的应用场景又过于狭窄，所以慢慢的很少去写了。不过由于最近几个月一直在开发 Eufa 相关的功能，C++ 又被我捡回来了。这里记录一些遇到的 C++ 相关知识点。
comments: true
date: 2017-09-02 23:06:57
tags:
- C++
---

已经不写 C++ 好多年，主要是由于自己只用 C++ 来练习算法，而且其在业务和日常开发的应用场景又过于狭窄，所以慢慢的很少去写了。不过由于最近几个月一直在开发 Eufa 相关的功能，C++ 又被我捡回来了。这里记录一些遇到的 C++ 相关知识点。

1. ANSI C(C99) 变量名的有效长度为 63 位；
2. 类似 “__LONG_LONG_MAX__” (climits) 等由一个或两个下划线加大写字母组成等变量名一般用于留给编译器使用，作为保留的全局标示符号；
3. 新的赋值语句：

```c
int x(10);
int x = {10};
int x{10};
```

4. 切换 cout 的数字显示格式： `std::cout << std::hex;` \ `std::cout 2202LL << 2202UL << std::endl;`；
5. 数字常量存储规则：
* 十进制：int／long／long long；
* 八／十六进制：int／unsigned (int) long／long long／unsigned long long；

6. char 在默认情况下既不是有符号的也不是没有符号的，因此默写情况需要详细指定其类型；
7. 宽字符集，占用2个字节：

```c
wchar_t bob = L'P';
std::wcout << L"tall" << std::endl;

char16_t ch1 = u'q';
char32_t ch2 = U'U0000222B';
```

8. float 类型一般只有6-7位精度，double 一般有15位左右的精度；
9. “std::cout” 定点输出：

```c
std::cout.setf(ios_base::fixed, ios_base::floatfield);
```

10. `auto` 关键字，自动类型推导：

```c
std::vector<double> scores = {};
auto pv = scores.begin();
```

11. 数组初始化：

```c
double earnings[2] {1.2e4, 1.6e4};
unsigned int counts[10] = {};
```
