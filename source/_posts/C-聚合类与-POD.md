---
title: C++ 聚合类与 POD
intro: POD 在 C++ 中一直是一个没有很直观代码体现的概念，但其存在却涉及到了 C++ 中诸如字节赋值、内存布局、静态初始化安全甚至是有关 EBO 优化等相关的内容，而本文我们将对 POD 的概念进行总结，并同时对比其与“聚合类”之间的关系。
comments: true
date: 2020-05-06 17:54:58
tags:
- C++
---

POD 在 C++ 中一直是一个没有很直观代码体现的概念，但其存在却涉及到了 C++ 中诸如字节赋值、内存布局、静态初始化安全甚至是有关 EBO 优化等相关的内容，而本文我们将对 POD 的概念进行总结，并同时对比其与“聚合类”之间的关系。

POD 的全称为 “**Plain Old Data**”，从其名字上来看，我们可以猜测到 POD 的存在是为了满足特定对象在 C 和 C++ 底层内存布局上的兼容。判断一个对象是否是一个 POD 对象需要满足两个条件，即：**平凡的**（trivial）和**标准布局**（standard layout）。

**平凡的**：
* 拥有平凡的**默认**（编译器自动生成的或在类内被标记为 =default 的）构造函数（可以同时有其他类型构造函数）和析构函数；
* 拥有平凡的（编译器自动生成的）拷贝构造函数和移动构造函数；
* 拥有平凡的（编译器自动生成的）拷贝赋值运算符与移动赋值运算符；
* 不包含虚函数及虚基类；
* 不能有类内成员初始值；

**标准布局**：
1. 所有非静态成员有相同的访问权限；
2. 在有类继承时满足以下情况之一：
  2.1. 派生类中有非静态成员，且只有一个仅包含静态成员的基类；
  2.2. 基类有非静态成员，而派生类没有非静态成员；
3. 类中第一个非静态成员类型与其基类不同；
4. 没有虚函数和虚基类；
5. 所有非静态成员均符合标准布局，其基类也符合标准布局；

如下代码所示，我们可以使用模板类来辅助检测一个对象是否符合上述两点要求：

```cpp
class A { int v; A() = default; A(int v) : v(v) {} };
class B : public A { using A::A; };
int main(int argc, char** argv) {
  // 检测是否是平凡的；
  std::cout << std::is_trivial<int>::value << std::endl;  // 1;
  std::cout << std::is_trivial<A>::value << std::endl;  // 1;
  // 检测是否是标准布局；
  std::cout << std::is_standard_layout<int>::value << std::endl;  // 1;
  std::cout << std::is_standard_layout<A>::value << std::endl;  // 1;
  std::cout << std::is_standard_layout<B>::value << std::endl;  // 1;
  // 检测是否为 POD；
  std::cout << std::is_pod<int>::value << std::endl;  // 1;
  std::cout << std::is_pod<A>::value << std::endl;  // 1;
  std::cout << std::is_pod<B>::value << std::endl;  // 1;
  return 0;
}
```

对于任何一个符合 POD 要求的对象，由于其保证对应对象在内存中是连续存储的，因此我们可以使用 std::memcpy 函数直接从内存中对该对象进行复制而不破坏该对象。比如：

```cpp
struct A { A() = default; int v; };
struct B : public A { using A::A; };
int main(int argc, char** argv) {
  std::cout << std::is_pod<B>::value << std::endl;  // 1;
  B x, y;
  x.v = 100;
  std::memcpy(&y, &x, sizeof(x));
  std::cout << y.v << std::endl;  // 100;
  return 0;
}
```

对于“标准布局”部分的第二条，我们可以直接理解为**基类和派生类不能同时拥有非静态成员变量**；而对于第三条，若派生类中的第一个非静态成员类型与其基类相同，则在内存中，派生类的布局并不会与基类地址直接对齐，而是相差了一个字节（为了区分类对象地址和第一个相同类型成员的地址）。因此，类定义中第一个非静态的成员类型是否与其基类相同便决定着不同的内存布局。

我们再来看看聚合类和 POD 的关系。C++11 对聚合类的定义是：所有成员均为 public、没有显式定义的构造函数（包括拷贝构造）、没有基类、没有虚函数。如下代码所示，可以看到一般来说，符合聚合类要求的对象通常也具有标准布局，但却并不一定平凡。**若聚合类没有自定义的拷贝构造函数、析构函数以及成员类内初始值，则其为 POD**。

还有一点需要注意的是，聚合类可以使用“**聚合初始化**”来初始化一个聚合类对象，而 C++14 之后则可以对有类内初始值的聚合类进行列表初始化，即**自 C++14 起，有无类内初始化器不再成为聚合体的要求（--std=c++14）**。

```cpp
struct B {
  int v = 10;
  ~B() {}
  B& operator=(const B&) { return *this; }
};
int main(int argc, char** argv) {
  std::cout << std::is_aggregate<B>::value << std::endl;  // 1;
  std::cout << std::is_trivial<B>::value << std::endl;  // 0;
  std::cout << std::is_standard_layout<B>::value << std::endl;  // 1;

  B bv1{100};
  B bv2 = {100};  // 复制列表初始化会产生临时对象，其性能可能稍弱于直接初始化；
  return 0;
}
```

总的来说，POD 具有以下几点特征：
1. **字节赋值**：对于 POD 类型，可以安全地使用 std::memset、std::memcpy 对其进行初始化和拷贝；
2. **提供对 C 内存的布局兼容**：使得 C++ 程序可以与 C 函数进行相互操作；
3. **保证了静态初始化的安全有效**：由于 POD 类型往往比较简单，因此编译器通常会通过优化来提供性能；

\* 注：编译上述测试代码时请使用 C++17 标准。
