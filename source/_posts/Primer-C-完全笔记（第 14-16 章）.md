---
title: 《Primer C++ 5th》完全笔记（第 14-16 章）
intro: 文接上回，本文将记录全书第14-16章中出现的知识点，这几章主要介绍了 C++ 中有关面操作重载和类型转换、向对象程序设计（OOP）与模板与泛型编程等相关内容。注意这些知识点的记录完全遵循我个人的想法，因此也仅适配我个人的情况和需求，未记录的其他知识点并非不重要。
comments: false
date: 2020-04-14 22:24:37
tags:
- Cpp
---

文接上回，本文将记录全书第14-16章中出现的知识点，这几章主要介绍了 C++ 中有关面操作重载和类型转换、向对象程序设计（OOP）与模板与泛型编程等相关内容。注意这些知识点的记录完全遵循我个人的想法，因此也仅适配我个人的情况和需求，未记录的其他知识点并非不重要。

180. [Page: 490] 如果一个运算符重载函数是成员函数，则它的第一个（左侧）运算对象绑定到隐式的 this 指针上，因此相比显式参数要少一个。运算符重载函数可以以**成员函数形式（左侧参数绑定到 this）**存在或独立的函数（类类型参数）以**友元**的形式绑定到类上。
181. [Page: 492] 建议：尽可能使运算符重载与内置类型的规则及使用场景保持一致。
182. [Page: 493] 赋值（=）、下标（[]）、调用（()）和成员访问箭头（->）运算符**必须是成员函数**；**具有对称性的运算符（算数、相等性、关系和位运算）通常是非成员函数**，运算符两端的类对象至少有一个定义了重载的运算符。因为必须确保运算符两侧的值可以互换并且能够转换成对应类对象，而成员函数隐式认为左侧 this 值指向的是正确的类对象。

```cpp
struct A;
struct B { 
  int sum = 0;
  B(int x) : sum(x) {};
  // 分别对应不同的运算数位置；
  friend int operator+(A& a, B& b);
  friend int operator+(B& b, A& a);
};
struct A { 
  int sum = 0;
  A(int x) : sum(x) {};
};
int operator+(A& a, B& b) { return a.sum + b.sum; }
int operator+(B& b, A& a) { return operator+(a, b); }
int main(int argc, char **argv) {
  B b(10);
  A a(20);
  std::cout << a + b;
  return 0;
}
```

183. [Page: 494] 输入输出运算符“<<”必须是非成员函数（否则左侧运算对象将是我们类的一个对象）。
184. [Page: 495] 当 std::istream 操作发生错误时，输入运算符应该负责从错误中恢复对象的状态，至少被赋予默认的状态。
185. [Page: 500] 重载可使用列表初始化（initializer_list）的赋值运算符：

```cpp
struct B { 
  int sum = 0;
  B() = default;
  B(initializer_list<int> li) : sum(accumulate(li.begin(), li.end(), 0)) {}
  B& operator=(initializer_list<int> li) {
    sum = accumulate(li.begin(), li.end(), 0);
    return *this;
  }
};
int main(int argc, char **argv) {
  B b = {1, 2};  // 构造函数；
  b = {1, 2, 3, 4};  // 赋值构造；
  std::cout << b.sum << std::endl;
  return 0;
}
```

186. [Page: 501] 下标运算符通常以所访问元素的**引用作为返回值**，这样是其可以被放置在赋值运算符的任一端。并且通常需要同时定义 const 和非常量两个版本。
187. [Page: 503] 区分前置和后置运算符的重载，后置运算符多一个不会被使用的 int 形参：

```cpp
struct B { 
  int sum = 0;
  B() = default;
  int operator++(int) {  // 后置；
    int temp = sum;
    sum += 1;
    return temp;
  };
  int operator++() { sum += 1; return sum; }  // 前置；
};
int main(int argc, char **argv) {
  B b;
  b++;
  std::cout << ++b << std::endl;
  return 0;
}
```

188. [Page: 505] 重载成员访问运算符：“*”可以做任何事，但“->”运算符永远不能丢掉用于成员访问这个最基本的含义，因此该运算符重载只能返回获取成员目标对象的指针。

```cpp
struct B { 
  int sum = 0;
  B() = default;
  int& operator*() { return sum;};
  const B* operator->() {  // 只能用于获取成员，返回目标对象的指针；
    return this;
  }
};
int main(int argc, char **argv) {
  auto b = new B;
  **b = 100;
  std::cout << (**b) << std::endl;
  std::cout << ((*b)->sum) << std::endl;
  return 0;
}
```

189. [Page: 510] 函数对象类：可以进行调用的类对象。

```cpp
struct B { 
  int num = 100;
  int operator()() { return num; }
};
int main(int argc, char **argv) {
  B b;
  std::cout << b() << std::endl;
  return 0;
}
```

190. [Page: 511] 可调用对象：函数、函数指针、lambda、bind 创建的对象、重载了函数调用运算符的类对象。
191. [Page: 512] 通过 std::function 我们可以将所有的可调用对象（甚至包括不可调用对象，如：类成员函数指针）统一到同一种类型。
192. [Page: 513] 重载函数的函数名不能被直接存入 std::function 类型的对象中，而需要经过显式的带有函数签名的函数指针来“重新确定”，然后才能将新的函数指针存入其中。
193. [Page: 515] 类型转换运算符（类对象->其他类型）：

```cpp
struct B { 
  int num = 100;
  explicit operator int() { return num; }  // 返回值类型由重载运算符指定；
};
int main(int argc, char **argv) {
  B b;
  std::cout << static_cast<int>(b) << std::endl;
  return 0;
}
```

194. [Page: 517] 通常情况下，不要为类定义相同的类型转换（构造函数、类型重载），也不要在类中定义两个及以上转换源或转换目标是算数类型的转换。除了显式地向 bool 类型的转换之外，应该尽量避免定义类型转换函数并尽可能限制那些“显然正确”的非显式构造函数。
195. [Page: 522] 重载运算符与内置运算符的二义性问题：

```cpp
struct B { 
  int num = 10;
  B() = default;
  B(int x) : num(x) {}  // int -> B;
  friend int operator+(B& x, B& y);
  operator int() { return num; }  // B -> int;
};
int operator+(const B& x, const B& y) { return x.num + y.num; }
int main(int argc, char **argv) {
  B b1, b2;
  int sum = b1 + 10;  // error, ambiguous!
  std::cout << sum << std::endl;
  return 0;
}
```

196. [Page: 527] 当使用基类的**引用或指针**调用一个虚函数时将发生动态绑定（动态类型）。非虚函数的解析过程将发生在编译时而非运行时。
197. [Page: 528] 基类通常都应该定义一个虚析构函数（动态绑定销毁成员对象），即使该函数不执行任何实际操作。任何**构造函数之外**的非静态函数都可以是虚函数。virtual 只能用于**类内函数声明**。
198. [Page: 533] 被标记为 final 的类不能被任何其他类继承。

```cpp
struct B final { };
struct A : public B {};  // error!
```

199. [Page: 536] 当我们用一个派生类对象为一个基类对象初始化或赋值时，只有该派生类对象中的基类部分会被拷贝、移动或赋值，它的派生类部分将被忽略掉。

```cpp
struct B {
  int val = 0;
  B(int x) : val(x) {}
};
struct A : public B { A(int x) : B(x) {} };
int main(int argc, char **argv) {
  A a(10);
  B b(20);
  b = a;
  std::cout << b.val << std::endl;  // 10；
  return 0;
}
```

200. [Page: 537] 所有的虚函数都必须有定义。通过**普通对象**调用虚函数时，调用版本在编译时就会被确定下来，调用函数与对象的静态类型保持一致。
201. [Page: 538] 使用 override 关键字显式告诉编译器我们将要覆盖的基类中的虚函数，若当前覆盖失败（比如形参不同）则报错。同时也可以使用 final 关键字来防止后续子类再覆盖该虚函数（final 阻止类被继承，制止虚函数被后续覆盖）。

```cpp
struct B {
  int val = 0;
  B(int x) : val(x) {}
  virtual void print() { std::cout << val << std::endl; }
};
struct A : public B {
  A(int x) : B(x) {}
  void print() override final { std::cout << B::val * 100 << std::endl; }
};
int main(int argc, char **argv) {
  A a(10);
  B b(20), *bp = &a;
  bp->print();  // 1000；
  bp->B::print();  // 10；强制执行基类的虚函数，无视动态绑定；
  bp = &b;
  bp->print();  // 20；
  return 0;
}
```

202. [Page: 541] 抽象基类：**含有纯虚函数（=0）的类**或子类。派生类必须“实现”抽象基类中的纯虚函数。
203. [Page: 543] 成员对派生类的可访问性控制：
* **public**：允许基类派生类以及类对象访问；
* **private**：只允许基类访问；
* **protected**：只允许基类和派生类访问；

204. [Page: 543] 派生类的成员和友元（友元只能访问所标记类对象内的**受保护成员**，成员函数只能访问所在类对象内的受保护成员，哪怕是**基类部分**的）只能访问派生类对象中的基类部分的受保护成员，对于基类对象中的受保护成员不具有特殊的访问权限。
205. [Page: 544] 派生访问说明符用于**控制派生类用户（派生类的对象、派生类的派生类）对于基类成员的访问权限**：

```text
struct A : public B {};  // 遵循基类的访问说明符；
struct A : private B {};  // 对于 A 的派生类而言，A 的所有成员私有，仅 A 内部可以访问；
struct A : protected B {};  // B 的所有公有成员在 A 中是受保护的，其对象无法访问；
``` 

206. [Page: 544] 派生类向基类转换的可访问性（***对于代码中某个给定的位置来说，如果其基类的公有成员是可访问的，则派生类向基类的转换也是可访问的；反之则不行**）。
* 只有当 public 继承时，用户代码（类对象）才能将派生类对象转换成基类对象；
* 无论什么方式继承，在派生类的成员函数及友元中都可以进行派生类到基类的转换；
* 只有当 public 和 protected 继承时，派生类的派生类的成员和友元才能够将派生类转换成基类成员（private 继承会导致基类的可见性在派生类的派生类中丢失）；

207. [Page: 545] 友元类只对做出声明的类起作用（访问 private 及 protected 成员），友元类的派生类不具有特殊的访问能力。
208. [Page: 546] 默认的继承保护级别：

```text
class B {};
struct A1 : B {};  // 默认 public 继承；
class A2 : B {};  // 默认 private 继承；
```

208. [Page: 546] 通过 using 改变个别派生类成员的可访问性（并不会向派生类添加新成员变量）：

```cpp
struct B {
  B() = default;
  B(int x) : val(x) {}
  int val = 0;
};
struct A : private B {
  A() : B() {};
  A(int x) : B(x) {}
 public:
  using B::val;  // 改变 B::val 的可见性为 public；
};
struct C : public A {
  C() : A() {};
  void foo() {
    std::cout << A::val << std::endl;
  }
};
```

209. [Page: 549] 定义派生类中的函数不会重载（**一组重载函数必须定义在同一个 scope 中**）其基类中的的成员，但基类中的同名函数会被隐藏。
210. [Page: 555] 定义派生类的拷贝或移动构造函数：

```cpp
struct B {
  int val = 0;
  B() = default;
  B(int x) : val(x) {}
  B(const B& b) {}
  B(B&& b) {}
};
struct A : private B {
  A() : B() {};
  A(int x) : B(x) {}
  A(const A& a) : B(a) {}  // 基类引用指向派生类对象；
  A(A&& a) : B(a) {}
};
```

211. [Page: 556] 派生类赋值运算符与析构函数：

```cpp
struct B {
  B(int x) : val(x) {}
  B& operator=(B& rhs) {
    if (this != &rhs) {
      val = rhs.val;
    }
    return *this;
  }
  int val = 0;
};
struct A : public B {
  A() : B() {};
  A(int x) : B(x) {}
  A& operator=(A& rhs) {
    B::operator=(rhs);  // 显式调用基类的赋值运算符；
    return *this;
  }
};
int main(int argc, char **argv) {
  A x(10), y(20);
  y = x;
  std::cout << y.val << std::endl;
  return 0;
}
```

212. [Page: 556] 派生类在析构时会按照与对象构造相反的顺序进行，先析构派生类对象，然后析构基类对象；使用 using 继承的构造函数的访问权限不受在派生类中声明位置的影响（与基类保持一致），且该 using 语句会由编译器生成代码（其他 using 只影响了类成员的可见性）。

```cpp
struct B {
  virtual ~B() { std::cout << "B destruct." << std::endl; }
};
struct A : public B {
  A(int x) = default;
  using B::B;  // 继承 B 的构造函数，可见性依在派生类中的位置而定；
  ~A() { std::cout << "A destruct" << std::endl; }
};
int main(int argc, char **argv) {
  A a(10);
  return 0;
}
```

213. [Page: 558] 继承的构造函数不会受派生类的访问权限控制，这些函数将仍然遵循在基类中的访问权限。
214. [Page: 559] 当派生类对象被赋值给基类对象时，其中的派生类部分将被“切掉”。
215. [Page: 559] 对于 virtual 虚函数来说，实际调用的函数版本取决于指针/引用所指向对象的运行时实际类型，而非静态类型；
216. [Page: 561] 模拟虚拷贝：根据运行时状态自动调用并返回当前对象的一份动态分配的拷贝。

```cpp
struct B {
  B() = default;
  virtual ~B() {}
  virtual B* clone() const & { return new B(*this); }
  virtual B* clone() && { return new B(std::move(*this)); }
};
struct A : public B {
  using B::B;
  ~A() {}
  A* clone() const & { return new A(*this); }
  A* clone() && { return new A(std::move(*this)); }
};
```

217. [Page: 580] 类型参数前必须使用关键字 class 或 typename，两者没有区别。
218. [Page: 580] 非类型模板参数（可用于表示可被编译器推断出的常量值，比如数组大小的占位）的模板实参必须是常量表达式。

```cpp
template<int N, int M>
int totalSize(int (&x)[M], int (&y)[N]) {
  return N + M;
}
int main(int argc, char **argv) {
  int x[10], y[20];
  std::cout << totalSize(x, y) << std::endl;
  return 0;
}
```

219. [Page: 582] 函数模板和类模板成员函数的定义通常放在头文件中。
220. [Page: 583] 若编译器不能为类模板推导模板参数类型，则需要进行显式初始化。
221. [Page: 587] 默认情况下，**一个类模板的成员函数只有当程序用到它时才进行实例化**。
222. [Page: 588] 在一个类模板的作用域内，我们可以直接使用模板名而不必指定模板实参。

```cpp
template<typename T>
struct B {
  T v;
  B(T v) : v(v) {}
  // B<T>& clone() const & { return new B<T>(*this); }
  B& clone() const & { return new B(*this); }  // 可以直接使用 B，而不需要指定模板实参；
};
int main(int argc, char **argv) {
  B b(100);  // 隐式类型推导；
  B<double> d(1.0);
  return 0;
}
```

223. [Page: 589] 若将模板类作为友元类，则该模板类的所有实例（不同模板参数）都会成为友元。
224. [Page: 590] 令类模板自己的类型参数成为友元：

```cpp
template<typename T>
struct B {
  B() = default;
  friend T;
 private:
  int v = 100;
};
struct A { // A 只能做 B 的友元类；
  void foo(B<A>& b) { std::cout << b.v << std::endl; }
};
int main(int argc, char **argv) {
  B<A> b;
  A a;
  a.foo(b);  // 100；
  return 0;
}
```

225. [Page: 590] 为类模板定义类型别名（类型模板）：

```cpp
template<typename T>
using Type = T;
int main(int argc, char **argv) {
  Type<int> x = 10;
  return 0;
}
```

226. [Page: 593] 在模板类中使用模板参数的类型成员（默认情况下 C++ 假定通过作用域运算符访问的名字不是类型）：

```cpp
struct A {
  int v;
  A(int v) : v(v) {}
  using Type = int;  // 类中的自定义类型；
};
template<typename T>
void foo(T&& t) {
  typename T::Type v = t.v;  // 使用 T 中的自定义类型；
  std::std::cout << v << std::endl;
}
int main(int argc, char **argv) {
  foo<A>(A(10));
  return 0;
}
```

227. [Page: 594] 模板默认实参：

```cpp
template<typename T>
struct Foo {
  T operator()() { return T(); }
};
template<typename T, typename F = Foo<T>>  // 默认模板实参；
void proxy() {
  std::std::cout << F()() << std::endl;  // 先生成类对象，再调用；
}
int main(int argc, char **argv) {
  proxy<int>();
  return 0;
}
```

228. [Page: 596] 对于类模板的成员模板，在进行类外定义时需要同时标记类和成员的 “template”。
229. [Page: 598] 使用 extern 控制模板的实例化（可用于减小编译阶段产生的 **.o** 文件大小）：

```cpp
// template.h
template<typename T>
struct Foo {
  T operator()() { return T(); }
};
template<typename T, typename F = Foo<T>>
void proxy() {
  std::cout << F()() << std::endl;
}
// A.cc
#include "./template.h"
extern template void proxy<int>();  // 会使用在 B.o 中实例化的模板实例；
int main(int argc, char **argv) {
  proxy<int>();
  return 0;
}
// B.cc
#include "./template.h"
template void proxy<int>();  // 实例化；
```

230. [Page: 600] 通过在编译时绑定删除器，unique_ptr 避免了间接调用删除器时产生的运行时开销。通过在运行时绑定删除器（间接跳转），shared_ptr 使用户重新绑定删除器更为方便。
231. [Page: 601] 将实参传递给带模板类型的函数形参时，能够自动应用的类型转换只有 **const 转换（顶层 const 被忽略）**及**数组或函数到指针的转换**。
232. （Page:604）模板返回值类型自动推导：

```cpp
template <typename T1, typename T2, typename T3> 
T1 sum(T2 x, T3 y) { return x + y; };
int main(int argc, char **argv) {
  auto val = sum<int, int>(1, 2);  // 根据参数类型自动推导返回值类型；
  std::cout << typeid(val).name() << std::endl;
  return 0;
}
```

232. [Page: 606] 使用 remove_reference 将引用类型转换为对应的值类型：

```cpp
template<typename It>
auto fcn(It beg, It end) -> typename remove_reference<decltype(*beg)>::type {
  return *beg;  // 返回值拷贝；
}
```

233. [Page: 607] 函数模板通过函数指针的实参推断：

```cpp
template<typename T> int add(const T& x, const T& y) { return x + y; };
int main(int argc, char **argv) {
  int (*pf)(const int&, const int&) = add;  // 函数模板的参数自动根据函数指针进行推断；
  return 0;
}
```

234. [Page: 609] 引用折叠：如果一个函数参数是指向模板参数类型的右值引用，则可以传递给它任意类型的实参，并且保留实参的“**左值性**”。如果将一个左值（注意：右值引用类型的变量也是一个左值）传递给这样的参数，则函数参数被实例化为一个普通的左值引用。需要注意：只要需要保留实参左值性以及底层 const 的特性时，才需要将模板参数改为右值引用的方式。

244. [Page: 611] std::move 的一个简单实现：

```cpp
template<typename T>
typename remove_reference<T>::type&& move(T&& t) {  // 返回右值（无法取地址）；
  return static_cast<typename remove_reference<T>::type&&>(t);
}
```

245. [Page: 613] **如果一个函数参数是指向模板类型参数的右值引用（&&），它对应的实参的 const 属性和左值/右值属性将得到保持（基于“引用折叠”实现）**。
246. [Page: 614] 由于函数参数都是“左值表达式”，因此**传递给右值引用模板参数的右值在函数内部便会变为左值**（左值引用或值类型），其原类型将丢失。
247. [Page: 614] 当用一个指向模板参数类型的右值引用（T&&）作为函数参数时，std::forward 会保持实参类型的所有细节。相较于 std::move，std::forward 是条件类型转换，它仅在最外层参数为右值时，在转发函数内部将左值类型的右值引用参数转换为右值，做“完美转发”之用。而 std::move 常用于资源移动，即配合移动构造函数使用，对移后元素的值不做假设。两者在技术实现上是可以互换使用的，但并不建议（跟直接用 static_cast 没区别）。**两者均是编译时操作，即 static_cast 是编译时操作，因此可用在 constexpr 的场景中**。

```cpp
template<class T>
void bar(T&& t) {}

template<class T>
void foo(T&& t) {
  // t 是一个左值；
  // &&(10) -> lvalue(t) -> &&(std::forward); T = type;
  // rvalue(type/type&) -> lvalue&(type&) -> &(std::forward); T = type&;
  bar(std::forward<T>(t))；
}
```

248. [Page: 619] 可变参数模板：

```cpp
template<typename... Args>  // 多个模板类型参数；
void foo(Args... args) {  // 多个实参；
  std::cout << sizeof...(Args) << std::endl;  // 获得类型参数个数；
  std::cout << sizeof...(args) << std::endl;  // 获得实参个数；
}
int main(int argc, char **argv) {
  foo<int, char>(1, 2);
  return 0;
}
```

249. [Page: 621] 可变参数模板函数在进行“包扩展”时需要设置**终止函数**，以防止无限递归：

```cpp
template<typename T>
T increase(T t) { return ++t; }
template<typename T>
std::ostream& print(std::ostream& os, const T& t) { return os << t; }  // 终止函数，最后一次递归时已无 Args 参数；
template<typename T, typename... Args>
std::ostream& print(std::ostream& os, const T& t, const Args&... rest) {  // 主递归包扩展函数；
  os << t << ' ';
  return print(os, increase<T>(rest)...);  // 每次对所有剩余实参进行 increase 处理；
}
int main(int argc, char **argv) {
  print<int, int>(cout, 1, 2, 3, 4, 5, 6, 7, 8);  // 1 3 5 7 9 11 13 15；
  return 0;
}
```

250. [Page: 623] 转发参数包：emplace_back 是一个可变参数成员模板，它用其实参在容器管理的内存空间中直接构造元素。

```text
template<class... Args>
inline void StrVec::emplace_back(Args&&... args) {
  ...
  alloc.construct(first_free++, std::forward<Args>(args)...);  // 使用 std::forward 做转发；
}
```

251. [Page: 626] 函数模板特例化：当我们不能（或不希望）将模板定义用于某些特定类型时，特例化非常有用。**当一个非模板函数提供与模板函数同样的匹配时，编译器会优先选择非模板版本**。

```cpp
template<class T>
T add(T x, T y) { return x + y; }
// 函数模板特例化；
template<> int add(int x, int y) { return x + y + 10; };
int main(int argc, char **argv) {
  std::cout << add(1,2);
  return 0;
}
```

252. [Page: 626] 模板及其特例化版本应该声明在同一个头文件中。所有同名模板的声明应该放在前面，然后是这些模板的特例化版本。
253. [Page: 628] 类模板的部分特例化：不同于函数，由于类是一种类型，因此可以进行部分特例化：

```cpp
template<typename T>
class B {};
template<typename T>
class B<T&&>{};  // 特例化右值专用版本；
int main(int argc, char **argv) {
  B<int&&> b;
  return 0;
}
```

254. [Page: 629] 类模板成员函数的部分特例化：

```cpp
template<typename T>
struct B {
  T add(T x, T y) { return x + y; }
};
template<> int B<int>::add(int x, int y) { return x + y + 10; }
int main(int argc, char **argv) {
  B<int> b;
  std::cout << b.add(1, 2);  // 13；
  return 0;
}
```

255. [Page: 630] 类成员模板不能是虚函数。
