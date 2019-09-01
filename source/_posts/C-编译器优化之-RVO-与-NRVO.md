---
title: C++ 编译器优化之 RVO 与 NRVO
intro: RVO 即 “Return Value Optimization”，是一种编译器优化技术，通过该技术编译器可以减少函数返回时生成临时值值（对象）的个数，从某种程度上可以提高程序的运行效率，对需要分配大量内存的类对象其值复制过程十分友好。NRVO 全称为 “Named Return Value Optimization”，该优化的大致流程与 RVO 类似。
comments: true
date: 2019-09-01 17:32:04
tags:
- C++
---

RVO 即 “Return Value Optimization”，是一种编译器优化技术，通过该技术编译器可以减少函数返回时生成临时值值（对象）的个数，从某种程度上可以提高程序的运行效率，对需要分配大量内存的类对象其值复制过程十分友好。NRVO 全称为 “Named Return Value Optimization”，该优化的大致流程与 RVO 类似。

首先我们来编写一个基本的 C++ 类。在这个类中，我们定义了该类的构造函数、拷贝构造函数、移动构造函数以及析构函数，以此来观察开启/关闭编译器 RVO 优化时对程序运行结果的影响。

```cpp
// rvo_nrvo.cc
#include <iostream>

class A {
  public:
	A() {
	  std::cout << "[C] constructor fired." << std::endl;
	}

	A(const A &a) {
	  std::cout << "[C] copying constructor fired." << std::endl;
	}

	A(A &&a) {
	  std::cout << "[C] moving copying constructor fired." << std::endl;
	}

	~A() {
	  std::cout << "[C] destructor fired." << std::endl;
	}
};

A getTempA() {
  return A();
}
 
int main(int argc, char **argv) {
  auto x = getTempA();

  return 0;
}
```

首先我们使用下述命令来编译并执行这段 C++ 代码。

```shell
clang++ rvo_nrvo.cc -o rvo_nrvo --std=c++11 && ./rvo_nrvo
```

输出如下所示。

```text
# [C] constructor fired.
# [C] destructor fired.
```

可以看到这里一共只执行了一次构造函数和一次析构函数，对于临时对象的拷贝构造过程并没有被进行。在正常情况下，编译器一般会默认启用 RVO 优化，接下来使用下面命令重新编译并执行上述代码，这里我们关闭了 RVO 优化，对应使用的编译器参数是 **“-fno-elide-constructors”**。

```shell
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

可以看到这里一共执行了两次拷贝构造的过程，分别发生于函数 “getTempA” 的返回值拷贝构造给临时值对象；以及临时值对象拷贝构造给变量 “x” 这两个时刻。实际上，RVO 以及 NRVO 两种优化技术又被称为 “**copy_elision（复制消除）**” 优化。在 C++11 标准中我们可以看到关于该优化标准的更多信息。标准中规定，在以下两种环境下，**要求编译器省略类对象的复制和移动构造**，即使复制/移动构造函数和析构函数拥有可观察副作用。直接将对象构造到它们本来要复制/移动到的存储中。只要语言确保不发生复制/移动操作，复制/移动构造函数就不必存在或可访问，即使在概念上。这两种环境分别是：

* 在 “return” 语句中，当操作数为与函数返回类型为同一类类型的纯右值时；
* 在变量的初始化中，当初始化器表达式为与变量类型为同一类类型的纯右值时：

其中第一种环境可以参考我们前面给出的代码示例，第二种环境的示例代码如下所示。

```cpp
...
int main(int argc, char **argv) {
  auto x = A(A(A(getTempA())));

  return 0;
}
...
```

这里我们只需要修改主函数中变量 “x” 的初始化表达式即可满足第二种优化条件。当编译器开启 RVO 优化时，程序同样只调用了一次构造函数和一次析构函数。而关闭 RVO 优化时的输出则如下所示。

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

而 NRVO 与 RVO 的不同之处在于函数返回的临时值是否是具名的。“当操作数是拥有自动存储期的非 `volatile` 对象的名字，其并非函数形参或 catch 子句形参，且其具有与函数返回类型相同的类类型时。这种复制消除的变体被称为 NRVO”。
