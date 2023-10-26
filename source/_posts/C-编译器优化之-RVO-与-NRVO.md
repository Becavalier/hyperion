---
title: C++ 编译器优化 - RVO / NRVO
intro: RVO 即 “Return Value Optimization”，是一种编译器优化技术，编译器可以通过该技术减少函数返回时生成临时值（对象）的个数，在某种程度上提高程序的运行效率，对需要分配大量内存的类对象值复制过程十分友好。NRVO 全称为 “Named Return Value Optimization”，该优化的大致流程与 RVO 类似。
comments: true
date: 2019-09-01 17:32:04
tags:
- Cpp
- RVO
- NRVO
---

RVO 即 “Return Value Optimization”，是一种编译器优化技术，编译器可以通过该技术减少函数返回时生成临时值（对象）的个数，在某种程度上提高程序的运行效率，对需要分配大量内存的类对象值复制过程十分友好。NRVO 全称为 “Named Return Value Optimization”，该优化的大致流程与 RVO 类似。

在如下所示的一个 C++ 类中，我们定义了它的构造函数、拷贝构造函数、移动构造函数以及析构函数。通过开启/关闭编译器的 RVO/NRVO 优化，我们可以观察到程序在执行细节上的差异。

```cpp
// rvo_nrvo.cc
#include <iostream>

class A {
  public:
	A() { std::cout << "[C] constructor fired." << std::endl; }
	A(const A &a) { std::cout << "[C] copying constructor fired." << std::endl; }
	A(A &&a) { std::cout << "[C] moving copying constructor fired." << std::endl; }
	~A() { std::cout << "[C] destructor fired." << std::endl; }
};
A getTempA() {
  return A();
}
int main(int argc, char **argv) {
  auto x = getTempA();
  return 0;
}
```

使用下述命令编译并执行这段 C++ 代码。

```bash
clang++ rvo_nrvo.cc -o rvo_nrvo --std=c++11 && ./rvo_nrvo
```

输出如下所示。

```text
# [C] constructor fired.
# [C] destructor fired.
```

可以看到这里执行了一次构造函数和一次析构函数，对于临时对象的拷贝构造过程并没有被执行。在正常情况下，编译器一般会默认启用 RVO 优化，接下来使用下面命令重新编译并执行上述代码，这里我们关闭了 RVO 优化，对应的 Clang 选项是 **“-fno-elide-constructors”**（自 C++17 后，RVO 被编译器强制默认开启，不再是一个可选优化）。

```bash
clang++ rvo_nrvo.cc -o rvo_nrvo --std=c++11 -fno-elide-constructors && ./rvo_nrvo
```

输出如下所示。

```text
[C] constructor fired.
[C] moving copying constructor fired.
[C] destructor fired.
[C] moving copying constructor fired.
[C] destructor fired.
[C] destructor fired.
```

可以看到这里一共执行了两次移动构造的过程，分别发生于函数 “getTempA” 的返回值移动构造给临时值对象；以及临时值对象移动构造给变量 “x” 这两个时刻。实际上，RVO 以及 NRVO 两种优化技术又被称为 “**Copy Elision**” 优化。在 C++11 标准中我们可以看到关于该优化标准的更多信息。标准中规定，在以下两种环境下，**要求编译器省略类对象的复制和移动构造，即使复制/移动构造函数和析构函数拥有可观察副作用**。直接将对象构造到它们本来要复制/移动到的存储中。只要语言确保不发生复制/移动操作，复制/移动构造函数就不必存在或可访问，即使在概念上。这两种环境分别是：

* 在 `return` 语句中，当操作数为与函数返回类型为同一类型的纯右值时（prvalue）；
* 在变量的初始化中，当初始化器表达式为与变量类型为同一类型的纯右值时（prvalue）。

需要注意这两种情况都需要保证为值为类型的纯右值，而非将亡值（xvalue）。后者一般由 “std::move” 产生，这是常见的编码错误。

第一种环境可以参考前面给出的代码，第二种环境的示例代码如下。

```cpp
...
int main(int argc, char **argv) {
  auto x = A(A(A(getTempA())));
  return 0;
}
...
```

这里只需要修改主函数中变量 “x” 的初始化表达式即可满足第二种优化条件。当编译器开启 RVO 优化时，程序同样只调用了一次构造函数和一次析构函数。而关闭 RVO 优化时的输出则如下所示。

```text
[C] constructor fired.
[C] moving copying constructor fired.
[C] destructor fired.
[C] moving copying constructor fired.
[C] moving copying constructor fired.
[C] moving copying constructor fired.
[C] moving copying constructor fired.
[C] destructor fired.
[C] destructor fired.
[C] destructor fired.
[C] destructor fired.
[C] destructor fired.
```

这时产生的五次拷贝构造过程分别是：

1. 函数 “getTempA” 返回值拷贝构造给临时值对象；
2. 临时值对象作为引用参数被类 A 的拷贝构造函数调用，生成一个 A 的临时值对象；
3. 临时值对象作为引用参数被类 A 的拷贝构造函数调用，生成一个 A 的临时值对象；
4. 临时值对象作为引用参数被类 A 的拷贝构造函数调用，生成一个 A 的临时值对象；
5. 临时值对象最后拷贝构造给变量 “x”。

而 NRVO 与 RVO 的不同之处在于函数返回的临时值是否是具名的（放在一个 lvalue 中）。“当操作数是拥有自动存储期的非 `volatile` 对象的名字，其并非函数形参或 catch 子句形参，且具有与函数返回类型相同的类类型时，这种复制消除的变体被称为 NRVO”。
