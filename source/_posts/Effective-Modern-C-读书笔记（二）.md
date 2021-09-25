---
title: 《Effective Modern C++》读书笔记（二）
intro: 文接上回，本文为上一文的第二篇。
comments: true
date: 2020-05-23 17:19:08
tags:
- Cpp
---

文接上回，本文为上一文的第二篇。

### 右值引用、移动语义与“完美转发”

65. （Page：159）从函数返回的右值引用和直接返回右值的行为是一样的。

```cpp
struct A { int i = 10;};
A&& foo(A& p) { return std::move(p); }
int main(int argc, char** argv) {
  A a;
  auto&& x = foo(a);
  std::cout << x.i << std::endl;
  return 0;    
}
```

66. （Page：161）被标记为顶层 const 的对象无法被移动（所以移动函数没有 const），哪怕通过 std::move 变成右值也是如此。
67. （Page：163）std::move 与 std::forward **均为编译时行为**。
68. （Page：165）“Universal References” 又被称为 “Forwarding-References”，主要有以下两种形式：

```cpp
// 基于模板；
template<typename T>
void foo(T&& param) {}
int main(int argc, char **argv) {
  const int v = 100;
  auto&& x = v;  // 基于 auto，x 为 const int &x（CV 自动推导）；
  foo(v);
  return 0;
}
```

69. （Page：166）**CV 限定符会破坏 Universal Reference 的可推导性**：

```cpp
int main(int argc, char** argv) {
  int x = 10;
  // const auto&& r = x;  // r 为常量右值引用，因此左值变量 x 不能赋给 r；
  return 0;    
} 
```

70. （Page：167）std::vector<T,Allocator>::push_back(T&& value) 由于其函数参数直接与 T 相关（vector 在实例化时 T 已经确定），因此无法进行类型推导，只能按照左值右值调用不同的重载版本；而对应的 **emplace_back(Args&&... args) 则由于其参数与 T 无关，因此可以进行引用折叠和类型推导**，因为该函数为 in-place 构造，所以需要把参数通过 std::forward 直接传递给容器元素的构造函数（参见本文后面几条规则）。
71. （Page：171）相较于分别为左值和右值单独重载对应的函数，**使用 “Universal Reference” 的好处在于可以直接进行构造/赋值，省去了临时值的创建、移动和销毁的过程**。
72. （Page：175）**不要试图在函数中通过 std::move 返回一个本地临时对象（包括实参生成的）**。因为相较于这样产生的移动操作，借由编译器的 RVO/NRVO 优化（当返回一个本地对象且对象类型与返回值类型完全相同时）可以直接在返回地址处构造对象，进而省去了移动的过程。注意：**仅将 std::move 用在右值引用上；将 std::forward 用在 “Universal Reference” 上**。
73. （Page：176）对于一个直接返回临时值对象，且该对象类型与函数返回值类型（传值）相同的函数来说，编译器可以保证在 RVO/NRVO 优化无法进行时，至少**以隐式 std::move 的方式将对象返回**。
74. （Page：183）对于一个类，当模板方法和成员方法具有相同的调用优先级时（实际参数完全匹配），编译器更倾向于使用成员函数版本。否则则使用 “Universal Reference” 的模板函数版本。
75. （Page：183）**不建议使用基于 “Universal Reference” 的模板构造（拷贝、移动）函数，而且也不建议基于该模板函数进行任何同名函数重载匹配**。
76. （Page：187）“Tag Dispatch” 方法（让所有参数都走 “Universal Reference” 版本，然后在其内部再通过新加的 “Tag” 参数来区分需要重载的具体实现）：

```cpp
struct A {
  template<typename T>
  void foo(T&& t) {  // 入口函数；
    fooImpl(std::forward<T>(t), 
      // 第二个参数作为 Tag；
      std::integral_constant<
        bool, 
        std::is_integral<std::remove_reference_t<T>
      >::value>());
  }
 private:
  template<typename T>
  void fooImpl(T&&, std::false_type) { std::cout << "non-int called." << std::endl; }
  template<typename T>
  void fooImpl(T&&, std::true_type) { std::cout << "int called." << std::endl; }
};
int main(int argc, char **argv) {
  A a;
  a.foo(10);
  a.foo(1.3);
  return 0;
}
```

77. （Page：194）使用 std::enable_if 控制模板函数的有效性，以防止由另一个对象创建新对象的过程调用到模板实例化的拷贝构造函数：

```cpp
std::vector<std::string> nameFromIdx = { "YHSPY" };
class Person {
 public:
  // 使用 “Universal Reference” 构造函数的好处在于可以保持初始化参数的左右值状态，在适当情况下调用对应的移动构造函数进行初始化；
  template<
    typename T,
    // std::enable_if_t 基于 SFINAE 条件编译其 ::type；
    typename = std::enable_if_t<
      !std::is_base_of<Person, std::decay_t<T>>::value &&
      !std::is_integral<std::remove_reference_t<T>>::value
    >
  >
  explicit Person(T&& n) : name(std::forward<T>(n)) {
    // 编译时检查；
    static_assert(std::is_constructible<std::string, T>::value, 
      "Parameter n can't be used to construct a std::string");
  };
  explicit Person(int idx) : name(nameFromIdx[idx]) {}
 private:
  std::string name;
};
int main(int argc, char** argv) {
  Person p1{1.3};
  Person p2(p1);
  return 0;    
}
```

78. （Page：199）引用折叠：当两个引用有一个为左值引用时，结果为左值引用；否则为右值引用。
79. （Page：202）会发生“引用折叠”的几个地方：模板初始化、auto 推导、using / typedef、decltype。

```cpp
typedef T&& RvalueRefToT;
using RvalueRefToT = T&&;
```

80. （Page：209）以 “{}” 构造的初始化表达式不能直接传给模板函数进行推导或者完美转发。可以选择用 auto 作为中转作为一种解决方案。

```cpp
void foo(std::vector<int> v) {
  for (const auto& i : v) { std::cout << i << std::endl; }
}
template<typename ...Arg>
void forwardFunc(Arg&& ...args) { foo(std::forward<Arg...>(args...)); }
int main(int argc, char** argv) {
  auto p = {1, 2, 3};
  forwardFunc(p);
  return 0;    
}  
```

81. （Page：209）使用 nullptr 代替 NULL 或者 0 来作为完美转发的实际参数，以防止模板推断将其参数推导为整数类型。
82. （Page：210）**没有被取地址使用的、无定义的类静态常量成员，通常会被编译器通过常量传播直接替换到被使用的地方**。否则若没有定义，则在链接时会报出找不到符号的错误。**所以对于类静态成员，最好均在类外进行定义**。

```cpp
template<typename T>
void foo(T&& arg) { std::cout << &arg << std::endl; }
struct A { static const std::size_t minVal = 28; };
const std::size_t A::minVal;  // 定义；
int main(int argc, char** argv) {
  foo(A::minVal);
  return 0;    
}
```

83. （Page：213）当传递重载的函数指针或者模板函数给 “Universal Reference” 时，需要指定该函数或模板函数的具体类型。
84. （Page：214）只有常量引用才可以指向位域中的成员。

### Lambda 表达式

85. （Page：221）lambda 表达式在类对象中以值捕获 “=” 时，**会捕获当前类对象的 this 指针**。

```cpp
struct A {
  void foo() {
    // [this]() { std::cout << v << std::endl; }();
    [=]() { std::cout << v << std::endl; }();
  }
  private:
    int v = 10;
};
int main(int argc, char** argv) {
  A a;
  a.foo();
  return 0;    
} 
```

86. （Page：223）静态生存期：一个对象的生存期和程序的运行的生存期一样长，比如被标记为 static 的变量。而 **lambda 表达式无法捕获具有静态生存期的变量**。
87. （Page：225）**C++14 Init Capture**，可以方便地移动资源到闭包中：

```cpp
int main(int argc, char** argv) {
  int x = 10;
  auto up = std::make_unique(10);
  [x = x]() { std::cout << x << std::endl; }();
  [x = std::string("Hello, world!")]() { std::cout << x << std::endl; }();
  [x = std::move(up)]() { std::cout << *x << std::endl; }();
  return 0;    
}
```

88. （Page：227）在 C++11 中模拟 C++14 的 Init Capture：

```cpp
int main(int argc, char** argv) {
  std::vector vA = {0}, vB = {0};
  // C++14 Init Capture；
  auto fA = [v = std::move(vA)]() { 
    for (const auto& e : v) { std::cout << e << std::endl; }
  };
  // C++11 将被移动的资源存储在 std::bind 对象中；
  auto fB = std::bind([](const std::vector v) {
    for (const auto& e : v) { std::cout << e << std::endl; }
  }, std::move(vB));
  return 0;    
}
```

89. （Page：232）可以进行完美转发的 lambda 表达式：

```cpp
// std::forward 的简单实现；
template<typename T>                         
T&& forward(std::remove_reference_t<T>& param) {  
  return static_cast<T&&>(param);
}
```

```text
(param = int& / T = int&) -> decltype(param) = int&
(param = int&& / T = int) -> decltype(param) = int&&
```

```cpp
int main(int argc, char** argv) {
  auto fA = [](auto&& param) {
    return std::forward<decltype(param)>(param);
  };
  return 0;    
}
```

90. （Page：233）C++14 定义的一些时间字面常量类型：

```cpp
std::literals::chrono_literals:*
```

91. （Page：237）std::bind 默认是传值，通过 std::ref() 可以传递引用。当**需要延迟 std::bind 参数的求值过程时，可以用 std::bind 将需要延迟求值的表达式进行包装**：

```cpp
int main(int argc, char** argv) {
  auto f = std::bind(
    [](int v) { std::cout << v << std::endl; }, 
    std::bind(
      std::plus<>(), 
      10, 
      std::placeholders::_1));
  f(10);
  return 0;    
}
```
92. （Page：239）std::bind 常用的两个用途：
* 在 C++11 中模拟 C++14 的 Move Capture；
* 构造多态的函数对象（在 C++14 中可以直接使用 auto&& 的 lambda 来实现）；

93. （Page：240）在 C++14 下，几乎没有场景需要使用 std::bind，如果有用到，则需要思考使用方式是否正确。

### 并发 API

（暂时用不上，先跳过了）

### 杂项

94. （Page：292）对于可拷贝，并且易于移动的对象。以传值的方式可以获得近似传递引用的效率，并且可以减少目标文件的体积，且易于实现。对于诸如 std::string 以及 std::vector 类型，拷贝构造的花销可能会大于拷贝赋值的花销（前者需要一次动态内存的生成与释放，后者可以复用已经初始化好的内存段）。
95. （Page：294）push_back 直接接收一个对象，然后通过移动 / 拷贝构造在容器内构造对象；emplace_back 接收需要构造的参数，然后直接在容器内部 in-place 构造对象，进而省去了临时值的构造以及被移动后的析构过程。
96. （Page：296）何时优先使用 emplace：
* 当新值可以被构造到容器，而非赋值时；
* 传递给容器的参数类型与容器的元素类型不同（需要构造的）；
* 容器不需要对新增元素进行比较（比如需要构造临时对象用于比较是否重复）；

97. （Page：298）不应该将类似 ”new A“ 的表达式作为参数传递给 emplace 函数或者 push_back，甚至是其他函数。
98. （Page：300）emplace_back 内部进行的是直接构造初始化；push_back 则是拷贝 / 移动构造初始化；两者区别在于：**对 explicit 构造函数一个是直接调用，另一个则没有调用（拷贝或移动）**。
