---
title: C++ Dependent Names、non-ADL 以及 ADL 查找
intro: 记录下 C++ 中对于 Dependent Names 在 non-ADL 以及 ADL 这两种情况下的名字查找规则。
comments: false
date: 2020-08-18 18:13:58
tags:
- Cpp
---

记录下 C++ 中对于 Dependent Names 在 non-ADL 以及 ADL 这两种情况下的名字查找规则。

### Dependent Names

Dependent-name 主要出现在模板定义中。主要指对于一些结构体的实际定义，将取决于真正实例化时的模板参数。特别地，类型和表达式的真正定义取决于**模板实例化时的参数类型**，以及**非类型的模板参数值**。

```cpp
template<typename T>
struct X : B<T> { // "B<T>" is dependent on T.
  typename T::A* pa; // "T::A" is dependent on T.

  void f(B<T>* pb) {
    static int i = B<T>::i; // "B<T>::i" is dependent on T.
    pb->j++; // "pb->j" is dependent on T.
  }
};
```

因此，对于 Dependent 的名字查找和绑定规则会有所不同。

### 绑定规则

Non-dependent 的名字会在模板**定义时**查找并进行绑定。**即使在模板实例化时存在着更好的匹配，此绑定也会保持不变**。对于此类名字的绑定过程，候选函数将以在模板定义之前出现的函数为主，若未找到可以绑定的函数，则终止编译。

```cpp
#include <iostream>
void g(double) { std::cout << "g(double)\n"; }
 
template<class T>
struct S {
  void f() const {
    g(1); // "g" is a non-dependent name, bound now.
  }
};
 
void g(int) { std::cout << "g(int)\n"; }
 
int main() {
  g(1); // calls g(int).

  S<int> s;
  s.f(); // calls g(double).
}
```

如果 non-dependent 名字的含义**在模板定义上下文和模板实例化之间更改**，则程序是 **ill-formed** 的。比如：“在模板定义时，在一个 non-dependent 名字的定义中使用了不完全类型，而模板实例化时却成为了完全类型”等（示例如下）。

```cpp
extern const int b;

template<int, int>
void f(int) { std::cout << "int"; };

template<int, const int&>
void f(long) { std::cout << "long"; };

template<class T>  // make g() as a dependent-name (correct);
void g() {
  f<0, T{}>(0); // T() will be treated as a function type, so use T{} instead.
}

template<class>  // dependent or not?
void h() {
  f<0, b>(0);
}

extern const int b = 0;

int main() {
  g<int>(); // "int";
  h<int>(); // Clang - "long", GCC - "int" (ill-formed);
}
```

对于 dependent 名字的绑定过程则会被推迟到“查找”阶段进行。

### 查找规则

* 对于具有外部链接（External Linkage）的函数定义，Non-ADL 查找**仅会查找模板的定义上下文**；
* 对于具有外部链接的函数定义，ADL 查找会查找**模板的定义上下文**，以及**模板的实例化上下文**；

这两个规则用于保证模板的实例化不会违背其 **ODR（One Definition Rule）**原则。

```cpp
// an external library.
namespace E {
  template<typename T>
  void writeObject(const T& t) {
    std::cout << "Value = " << t << '\n';
  }
}
 
// translation unit 1:
// Programmer 1 wants to allow E::writeObject to work with vector<int>.
namespace P1 {
  std::ostream& operator<<(std::ostream& os, const std::vector<int>& v) {
    for(int n: v) os << n << ' '; return os;
  }
  void doSomething() {
    std::vector<int> v;
    E::writeObject(v); // error: will not find P1::operator<<.
  }
}
 
// translation unit 2:
// Programmer 2 wants to allow E::writeObject to work with vector<int>.
namespace P2 {
  std::ostream& operator<<(std::ostream& os, const std::vector<int>& v) {
    for(int n: v) os << n <<':'; return os << "[]";
  }
  void doSomethingElse() {
    std::vector<int> v;
    E::writeObject(v); // error: will not find P2::operator<<.
  }
}
```

在上面的示例中，如果对于 operator<< 的 non-ADL 查找允许在模板的实例化上下文中进行，则对于 `E::writeObject<vector<int>>` 的实例化这导致该模板具有两个不同的定义。一个使用了 “P1::operator<<”，另一个使用了 “P2::operator<<”。链接器可能无法识别类似的 ODR 违规，导致在两个实例化中可能都会使用其中的某一个定义。

为了能够使 ADL 查找来检查用户定义的命名空间，应**将 std::vector 替换为用户定义的类，或者将其元素类型替换为用户自定义的类**：

```cpp
namespace P1 {
  // if C is a class defined in the P1 namespace.
  std::ostream& operator<<(std::ostream& os, const std::vector<C>& v) {
    for(C n: v) os << n; return os;
  }
  void doSomething() {
  std::vector<C> v;
  E::writeObject(v); // OK: instantiates writeObject(std::vector<P1::C>)
                     //     which finds P1::operator<< via ADL.
  }
}
```

注意：此规则使得无法对标准库类型进行运算符重载（因为按照 ADL 规则，需要将重载运算符定义在 std 命名空间内。如下代码所示）；

```cpp
#include <iostream>
#include <vector>
#include <iterator>
#include <utility>
 
// Bad idea: operator in global namespace, but its arguments are in std::.
std::ostream& operator<<(std::ostream& os, std::pair<int, double> p) {
  return os << p.first << ',' << p.second;
}
 
int main() {
  typedef std::pair<int, double> elem_t;
  std::vector<elem_t> v(10);
  std::cout << v[0] << '\n'; // OK, ordinary lookup finds ::operator<<
  std::copy(v.begin(), v.end(), std::ostream_iterator<elem_t>(std::cout, " ")); 
  // Error: both ordinary - 
  // lookup from the point of definition of std::ostream_iterator and ADL will -
  // only consider the std namespace, and will find many overloads of -
  // std::operator<<, so the lookup will be done. Overload resolution will then -
  // fail to find operator<< for elem_t in the set found by the lookup.
}
```

### ADL

* 对于以 Primitive Type 作为参数的函数调用，只能遵循 non-ADL 查找规则；

```cpp
#include <iostream>
int main() {
  std::cout << "Test\n"; // There is no operator<< in global namespace, but ADL -
                          // examines std namespace because the left argument is in -
                          // std and finds std::operator<<(std::ostream&, const char*).
  operator<<(std::cout, "Test\n"); // same, using function call notation, -

  // however,
  std::cout << endl; // Error: 'endl' is not declared in this namespace.
                      // This is not a function call to endl(), so ADL does not apply.

  endl(std::cout); // OK: this is a function call: ADL examines std namespace
                    // because the argument of endl is in std, and finds std::endl.

  (endl)(std::cout); // Error: 'endl' is not declared in this namespace.
                       // The sub-expression (endl) is not a function call expression.
}
```

**一些例子**：

* **using-directive 会在当前 scope 引入名字**。在当前 scope 内查找时，如果找到名字，则不会在往外层 scope 继续查找；因此 `foo(N1::S{});` 只会调用 `N2::foo`，而非 `::foo`。

```cpp
namespace N1 {
  struct S {};
}
namespace N2 {  // as a fallback to unqualified name which has no user-defined overload.
  template<typename T>
  void foo(T) {
    std::cout << "called N2::foo, generic one." << '\n';
  }
}
void foo(N1::S s) {
  std::cout << "called foo." << '\n';
}
int main() {
  using N2::foo;  // N2::foo is introduced into the main function, lookup stops here.
  foo(N1::S{});  // use generic version.
  foo(10);  // use generic version.
}
```

* 查找时同时找到 ADL 引入的 `N1::foo`，以及由 using-directive 引入的 `N2::foo`。但前者优先级更高。

```cpp
namespace N1 {
  struct S {};
  void foo(S s) {
    std::cout << "called N1::foo, specific one." << '\n';
  }
}
namespace N2 {  // as a fallback to unqualified name which has no user-defined overload.
  template<typename T>
  void foo(T) {
    std::cout << "called N2::foo, generic one." << '\n';
  }
}
void foo(N1::S s) {
  std::cout << "called foo." << '\n';
}
int main() {
  using N2::foo;  // N2::foo is introduced into the main function, lookup stops here.
  foo(N1::S{});  // use specific version.
  foo(10);  // use generic version.
}
```

* `foo(N1::S{});` 调用了由 using-directive 引入的特化版本 `template<> N2::foo`。

```cpp
namespace N1 {
  struct S {};
}
namespace N2 {  // as a fallback to unqualified name which has no user-defined overload.
  template<typename T>
  void foo(T) {
    std::cout << "called N2::foo, generic one." << '\n';
  }
  template<>
  void foo(N1::S s) {
    std::cout << "called N2::foo, specialization one." << '\n';
  }
}
void foo(N1::S s) {
  std::cout << "called foo." << '\n';
}
int main() {
  using N2::foo;  // N2::foo is introduced into the main function, lookup stops here.
  foo(N1::S{});  // use specific version.
  foo(10);  // use generic version.
}
```

### 总结

* External Linkage Lookup 只能走 ADL 的方式；
* 不建议为标准库中的类型（如 `std::vector<int>` 等）进行自定义的运算符重载（一般不建议污染 std 命名空间）。**最好写在自定义类型中，然后走 ADL；using-directive 引入的泛型版本作为 backup**。
