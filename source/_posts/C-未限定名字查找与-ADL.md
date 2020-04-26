---
title: C++ 未限定名称查找与 ADL
intro: 简单总结下 ADL（aka. Koenig Lookup）算法与 C++ 中对于“未限定名称”查找之间的关系。毕竟日常对于 using、命名空间内（或标准库全特化）的自定义 swap 函数等的用法都涉及到这部分内容，记录下免得踩坑。
comments: true
date: 2020-04-26 21:10:29
tags:
- C++
---

简单总结下 ADL（aka. Koenig Lookup）算法与 C++ 中对于“未限定名称”查找之间的关系。毕竟日常对于 using、命名空间内（或标准库全特化）的自定义 swap 函数等的用法都涉及到这部分内容，记录下免得踩坑。

首先，所谓的“**未限定名称**”指的是一个没有明确限定作用域的名称，比如单纯的 “foo”，而不是 “std::foo”。而 ADL（**Argument Dependent Lookup**）或所谓的 “Koenig Lookup” 算法便是 C++ 编译器所使用的、用来查找未限定名称的算法。这个算法描述了 C++ 编译器应该如何查找这些未限定名称。

在 C++11 标准的第 §3.4.2/1 条中有这样的规定：

> When the postfix-expression in a function call (5.2.2) is an unqualified-id, other namespaces not considered during the usual unqualified lookup (3.4.1) may be searched, and in those namespaces, namespace-scope friend function declarations (11.3) not otherwise visible may be found. These modifications to the search depend on the types of the arguments (and for template template arguments, the namespace of the template argument).

直接翻译过来即：当函数调用中使用的后缀表达式是非限定名字时，在通常的非限定查找中未考虑的其他命名空间可能将会被查找，并且在这些命名空间中，命名空间范围内的友元函数声明可能无法被找到。对于查找的这些修改取决于自变量的类型（对于模板的模板参数，以及模板参数的命名空间）。

简单来说即：**如果一个或多个实参类型被定义在了函数所在的命名空间，则不必为该（未限定名称）函数指定所属的命名空间**。

一个简单的代码示例如下：

```cpp
namespace NS {
  class A {};
  void foo(A a) {}
}
int main(int argc, char** argv) {
  NS::A a;
  foo(a);
  return 0;	
}
```

在上面的示例中，编译器通过借助 ADL 算法，便可以在“既没有使用 using 声明（`using namespace NS;`），也没有使用 using 指示（`using NS::foo;`）的情况下，仅通过未限定名称 foo 便可以找到实际定义在命名空间 NS 中的 NS::foo 方法。该算法是如何工作的呢？

ADL 算法告诉编译器不仅要查看本地作用域，还要**查看实参类型所在的命名空间**。因此，在上述代码中，编译器发现对象 A（它是函数 foo 的参数）属于命名空间 NS。因此，它将查看该命名空间以找到 foo 的实际定义。

#### 公认的优点

ADL 算法为程序员提供了便利和易用性。如果没有该算法，那么我们将不得不承担为所有方法重复指定“完全限定名称”的责任，或者选择使用大量的 using 声明，但这却会带来额外的代码结构和可读性上的问题。

#### 可能的缺点

当然，过度依赖 ADL 查找也同样可能会导致语义问题。考虑我们常用的 swap 函数。通常我们在使用 swap 函数交换两个元素的值时会通过如下方式让编译器自动选择合适的版本（本地自定义版或标准库全特化版）：

```text
using std::swap;
swap(x, y);
```

相较于直接使用 `std::swap`，这两种方式可能会产生不同的结果。在上述代码中，当实参 x 和 y 所在的命名空间中存在方法 swap 时，该方法将会被调用，而标准库版本将被忽略。而直接使用 std::swap 则会调用保准库的全特化版本（如果存在）。C++11 下的未限定名称搜索顺序：**当前 scope 内的同名函数** -> **ADL** -> **using 指示的可见函数**。
