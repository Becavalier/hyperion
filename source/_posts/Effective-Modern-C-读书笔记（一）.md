---
title: “Effective Modern C++” 读书笔记（一）
intro: 《Effective Modern C++》这本书主要介绍了 C++11 与 C++14 中的一些新的语言特性及编码建议。由于这段时间忙于它事，看书的速度会放缓，因此关于这本书的内容就一边读一边整理记录了。同《Effective C++ 3th》一样，这本书的行文也是按照“建议条目”的方式通过几个大的主题分门别类进行介绍的，其中部分之前博客文章中已经提到过得内容将不再赘述。
comments: true
date: 2020-05-14 10:32:16
tags:
- C++
---

《Effective Modern C++》这本书主要介绍了 C++11 与 C++14 中的一些新的语言特性及编码建议。由于这段时间忙于它事，看书的速度会放缓，因此关于这本书的内容就一边读一边整理记录了。同《Effective C++ 3th》一样，这本书的行文也是按照“建议条目”的方式通过几个大的主题分门别类进行介绍的，其中部分之前博客文章中已经提到过得内容将不再赘述。


### 类型推导

1. （Page：29）接受左值引用（T&）的模板参数类型推导步骤：
* 如果传入表达式是指针或者引用，则指针或引用类型将被忽略；
* 根据模式对比来直接推导 T 的类型；

```cpp
template<typename T>
void foo(T& arg) {}  // ParamType;
int main(int argc, char** argv) {
  int x = 10;
  const int cx = x;
  const int& rx = x;
  foo(x);  // T = int, ParamType = int&;
  foo(cx);  // T = const int, ParamType = const int&;
  foo(rx);  // T = const int, ParamType = const int&;
  return 0;
}
```

2. （Page：32）接受右值引用（T&&）的模板参数类型推导步骤：
* 如果传入表达式是左值，则 T 和 ParamType 将被推导为左值引用；
* 否则，如果传入表达式是右值，则按照之前的推导方式进行；

```cpp
template<typename T>
void foo(T&& arg) {}  // ParamType;
int main(int argc, char** argv) {
  int x = 10;
  const int cx = x;
  const int& rx = x;
  foo(x);  // T = int&, ParamType = int&;
  foo(cx);  // T = const int&, ParamType = const int&;
  foo(rx);  // T = const int&, ParamType = const int&;
  foo(10);  // T = int, ParamType = int&&;
  return 0;
}
```

3. （Page：33）接受纯值类型（T）的模板参数类型推导步骤：
* 如果传入表达式是引用，则忽略引用部分；
* 同时，忽略顶层的 CV 限定符；

```cpp
template<typename T>
void foo(T arg) {}  // ParamType;
int main(int argc, char** argv) {
  int x = 10;
  const int cx = x;
  const int& rx = x;
  const int* const px = &x;
  foo(x);  // T = int, ParamType = int;
  foo(cx);  // T = int, ParamType = int;
  foo(rx);  // T = int, ParamType = int;
  foo(10);  // T = int, ParamType = int;
  foo(px);  // T = const int*, ParamType = const int*;
  return 0;
}
```

4. （Page：34）数组与模板参数推导，传值情况下数组将 decay 为指针，而引用传递下可以保持类型：

```cpp
template<typename T>
void foo(T arg) {}  // ParamType;
template<typename T>
void bar(T& arg) {}  // ParamType;
int main(int argc, char** argv) {
  int arr[10] = {};
  foo(arr);  // T = int*;
  bar(arr);  // T = int[10], ParamType = int(&)[10]; 
  return 0;
}
```

5. （Page：34）模板数组大小推导（基于引用传递），可以用于复用由列表初始化构造的数组的大小：

```cpp
template<size_t N>
constexpr  size_t arrSize(int(&)[N]) { return N; }
int main(int argc, char** argv) {
  int arr[] = {1, 2, 3, 4};
  std::cout << arrSize(arr) << std::endl; 
  return 0;
}
```

6. （Page：35）当模板参数实参为函数名时，同数组一样，在传值（T）的情况下会 decay 为函数指针，否则需要以引用（T&）的方式来传递。
7. （Page：38）auto 类型推导规则实际上与 template 模板参数推导规则类似：可以把 auto 比作模板参数 T，连带其他对 auto 的所有修饰符共同组成 ParamType，右侧赋值类比为传递给模板参数的实参。
8. （Page：40）默认情况下，当使用 auto 来推导通过 “{}” 进行初始化的值时，类型将被推导为 `std::initializer_list<>`，且列表中的元素必须可以被推导为同一类型。相反，**模板参数则不支持对 “{}” 初始化列表的推导**。
9. （Page：41）C++14 中对 auto 的新用法（以下两处 auto 使用的是模板推导规则，因此不支持对 “{}” 的推导）：

```cpp
auto dbl(int x) { return 2 * x; }  // 返回值类型推导；
int main(int argc, char** argv) {
  auto t = dbl(10);
  auto mul = [](const auto x, const auto y){ return x * y; };  // lambda 参数类型推导；
  std::cout << mul(t, 10) << std::endl;
  return 0;
}
```

10. （Page：11）`decltype(auto)` 的用法（可以理解为让 auto 以 decltype 的方式进行类型推导，并同时保留顶层 CV 标识符）：

```cpp
template<typename T, typename I>
decltype(auto) accessCon(T& c, I i) { return c[i]; }  // 返回 int&；
int main(int argc, char** argv) {
  std::vector<int> v = {0};
  accessCon(v, 0) = 10000;
  std::cout << v.at(0) << std::endl;  // 10000;
  return 0;
}
```

```cpp
int main(int argc, char** argv) {
  const volatile int x = 100;
  decltype(auto) y = x;  // y 为 “const volatile int” 类型；
  return 0;
}
```

11. （Page：47）`decltype(auto)` 的错误用法（返回了临时值的引用）：

```cpp
decltype(auto) foo(int x) { return (x); }  // 返回临时值的引用；
int main(int argc, char** argv) {
  auto& v = foo(10);
  return 0;
}
```

12. （Page：49）可以借助编译器的报错来查看实际传递给模板参数的值类型：

```cpp
template<typename T>
class A;  // 通过未定义的模板实例化引起错误；
int main(int argc, char** argv) {
  const int x = 10;
  decltype(auto) y = x; 
  // error: implicit instantiation of undefined template 'A<const int>';
  // A<decltype(y)> z;
  return 0;
}
```

13. （Page：50）可以用 GNU 的 `c++filt` 命令行工具来对 mangling 的符号进行 demangling：

```bash
c++filt PKi // int const*;
```

14. （Page：51）对于 typeid 的类型推导将遵循类似：以值传递的方式向一个模板参数 T 传值的过程，因此会影响到推导过程中的引用类型以及顶层 CV 特性的传递。

```cpp
template<typename T>
class A;
int main(int argc, char** argv) {
  int x = 10;
  const int* const px = &x;
  const int& rx = x;
  std::cout << typeid(px).name() << std::endl;  // PKi -> int const*;
  std::cout << typeid(rx).name() << std::endl;  // i -> int;
  return 0;
}
```

### auto

15. （Page：60）auto 变量必须被初始化，通常不受类型不匹配的影响，这些类型不匹配则有可能导致可移植性或效率问题。使用 auto 可以简化代码重构的过程，并且与被明确指定类型的变量相比，通常只需要较少的改动。
16. （Page：62）由于标准库使用 bit 来保存布尔值，因此我们**无法使用对该值的引用**（引用无法指向这个 bit）。因此只能从 `std::vector<bool>::reference` 类型向 bool 类型进行隐式转换。

```cpp
std::vector<int> v = {true};
int main(int argc, char** argv) {
  auto x = v.at(0);  // std::__1::vector<bool>::reference;
  bool y = v.at(0);  // bool;
  // bool& z = v.at(0);  // 错误；
  return 0;
}
```

17. （Page：66）“不可见”的代理类型可能导致 auto 推断出初始化表达式的“错误”类型。比如：`std::vector<bool>::reference` 这类代理类型。通过显式表明所需类型可以使 auto 推断出想要的类型：

```cpp
auto index = static_cast<int>(d * c.size());
```
