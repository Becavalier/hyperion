---
title: Primer C++ 5th 完全笔记（第17-19章）
intro: 文接上回，本文将记录全书第17-19章中出现的知识点，这几章主要介绍了 C++ 中有关标准库特殊设施、用于大型程序的工具以及特殊工具与技术等相关内容。注意这些知识点的记录完全遵循我个人的想法，因此也仅适配我个人的情况和需求，未记录的其他知识点并非不重要。
comments: true
date: 2020-04-16 20:43:00
tags:
- C++
---

文接上回，本文将记录全书第17-19章中出现的知识点，这几章主要介绍了 C++ 中有关标准库特殊设施、用于大型程序的工具以及特殊工具与技术等相关内容。注意这些知识点的记录完全遵循我个人的想法，因此也仅适配我个人的情况和需求，未记录的其他知识点并非不重要。

256. （Page：638）元祖 tuple：一种可以容纳多种数据的快速集合（某些情况下可以代替聚合类）。

```cpp
int main(int argc, char **argv) {
  std::tuple<int, std::string, char> tp1{10, "Hi", 'c'};  // 列表初始化；
  auto tp2 = std::make_tuple("0-999-X", 3, 20.00);  // 使用 std::make_tuple 构造；
  std::std::cout << get<2>(tp1) << std::endl;  // 返回指定成员的引用（第2个）；
  std::std::cout << get<1>(tp2) << std::endl;
  return 0;
}
```

257. （Page：644）使用 BITSET 类型处理二进制数据：

```cpp
int main(int argc, char **argv) {
  std::bitset<32> bitvec(1U);   // 低位为 1，剩余位为 0；
  std::cin >> bitvec;  // 从输入的字符串匹配；01010100；
  bitvec.set(0, 0);  // 最低位置 0；
  bitvec.flip(0);  // 最低位翻转为 1；
  std::std::cout << bitvec.to_string() << std::endl;  //0000000000000000000000001010101；
  std::std::cout << bitvec.to_ullong() << std::endl;  // 85；
  return 0;
}
```

258. （Page：646）在 C++ 中，std::regex 默认使用 ECMAScript 的正则表达式语言。

```cpp
#define DEFAULT_INDEX 0
int main(int argc, char **argv) {
  std::regex r("[[:alpha:]]*([^c]ei)[[:alpha:]]*");
  const std::string str = "receipt friend theif receive";
  // 只能找到第一个匹配；
  if (std::smatch result; std::regex_search(str, result, r)) {  // 'if' initialization statements (C++17)；
    std::std::cout << result.str() << std::endl;  // 整个匹配；
    std::std::cout << result[DEFAULT_INDEX + 1].str() << std::endl;  // 第一个子匹配；
  }
  return 0;
}
```

259. （Page：648）std::regex 正则表达式是在**运行时（比如每次初始化或被赋值）被编译**的，因此该“编译”过程是十分缓慢的，因此尽量不要在循环里初始化 std::regex 对象。
260. （Page：649）std::cmatch 与 std::smatch 为 std::match_results 的特化，子匹配的相关类也类似：

```text
std::cmatch -> std::match_results<const char*>
std::smatch -> std::match_results<std::string::const_iterator>

std::csub_match -> std::sub_match<const char*>
std::wcsub_match -> std::sub_match<const wchar_t*>
```

261. （Page：650）输入序列类型需要与使用的正则表达式类相匹配，可以使用宽字符型和普通字符串型的正则表达式处理类：

```text
string：regex \ smatch \ ssub_match \ sregex_iterator；
const char*：regex \ cmatch \ csub_match \ cregex_iterator；
wstring：wregex \ wsmatch \ wssub_match \ wsregex_iterator；
const wchar_t*：wregex \ wcmatch \ wcsub_match \ wcregex_iterator;
```

262. （Page：651）使用 std::regex_iterator 来遍历多个匹配：

```cpp
#define DEFAULT_INDEX 0
int main(int argc, char **argv) {
  std::regex r("[[:alpha:]]*([^c]ei)([[:alpha:]]*)");
  std::string str = "receipt friend theif receive heif teif";
  for (std::sregex_iterator it(str.begin(), str.end(), r), end; it != end; ++it) {
    // 返回 std::match_results 对象；
    std::std::cout << it->str() << std::endl;
    std::std::cout << it->str(DEFAULT_INDEX + 1) << std::endl;  // 打印第一个子匹配；
  }
  return 0;
}
```

263. （Page：654）正则表达式类相关调用方法：

```text
std::regex
std::sregex_iterator (regex_search())  // 迭代器隐式调用 regex_search()；
-> std::smatch [
  prefix() -> std::ssub_match, 
  suffix() -> std::ssub_match,
  str()  // 返回子表达式的 std::string，0 为整体匹配，后续为各个子匹配；
  m[n] -> ssub_match [
    matched,
    first,
    second, 
    length(),
    str()
  ], 
]
```

264. （Page：658）使用 std::regex_replace 进行正则替换：

```cpp
#define DEFAULT_INDEX 0
int main(int argc, char **argv) {
  std::regex r("[[:alpha:]]*([^c]ei)[[:alpha:]]*");
  std::string str = "theif";
  std::std::cout << std::regex_replace(str, r, "$1apple") << std::endl;  // heiapple；“$1” 为替换的占位符；
  return 0;
}
```

265. （Page：660）随机数引擎和随机数分布类：**引擎**负责生成随机的 unsigned 整数序列；**分布类**负责使用引擎返回服从特定分布概率分布的随机数。
266. （Page：661）生成特定范围内均匀分布的随机数：

```cpp
#define DEFAULT_INDEX 0
int main(int argc, char **argv) {
  std::uniform_int_distribution<unsigned> u(0, 100);  //（分布类）均匀分布；
  std::default_random_engine e;  // （引擎）生成从 0 - 100 的随机数；
  for (size_t i = 0; i < 10; ++i) {
    std::std::cout << u(e) << std::endl;  
  }
  return 0;
}
```

267. （Page：662）随机数引擎对象在**每次重新调用时都会产生相同的序列**，因此需要将其定义为 static 以避免该问题：

```cpp
void randomSeq() {
  static std::uniform_int_distribution<unsigned> u(0, 100);  // 使用 static 保持分布对象状态；
  static std::default_random_engine e;  // 使用 static 保持引擎的状态；
  for (size_t i = 0; i < 10; ++i) {
    std::std::cout << u(e) << std::endl;
  }
}
#define DEFAULT_INDEX 0
int main(int argc, char **argv) {
  randomSeq();
  randomSeq();
  return 0;
}
```

268. （Page：663）为随机数引擎设置种子，相同的种子会生成相同的序列：

```cpp
std::default_random_engine e(21345343);
std::default_random_engine e(time(0));  // time(0) 返回特定秒数；
```

269. （Page：664）生成实数分布：

```cpp
std::uniform_real_distribution<double> u(0, 100);
```

270. （Page：665）生成非均匀分布的随机数：

```cpp
std::normal_distribution<> n(4, 1.5);  // 生成符合高斯分布的浮点数（均值4，标准差1.5）；
```

271. （Page：666）使用伯努利分布（ture/false）：

```cpp
std::bernoulli_distribution b(.55);  // true 的概率为 0.55；
```

272. （Page：671）改变 IO 流的格式：

```text
std::cout << boolalpha << true 
     << noboolalpha << std::endl;
std::cout << showbase  // 显示进制前缀；
     << oct << 10 
     << hex << 10
     << dec << 10 << noshowbase << std::endl;
std::cout << uppsercase << "apple" 
     << nouppercase << std::endl;
std::cout << cout.precision() << setprecision(3)
     << scientific << sqrt(2.0)
     << fixed << sqrt(2.0)
     << hexfloat << sqrt(2.0)
     << defaultfloat << << sqrt(2.0) << std::endl;
std::cout << showpoint << 10.0 << noshowpoint << std::endl;  // 是否显示小数点；
```

273. （Page：671）IO 流对齐格式化输出（左右对齐依赖于 setw 指定的最小空间，在大于内容时才会有明显效果）：setw() \ left \ right \ internal \ setfill()；
274. （Page：673）控制输入流格式：

```cpp
int main(int argc, char **argv) {
  char ch;
  std::cin >> noskipws;  // 设置 cin 读取空白符；
  while (std::cin >> ch) { std::std::cout << ch; }
  std::cin >> skipws;  // 重置设置；
  return 0;
}
```

275. （Page：674）未格式化 IO（单字节/多字节）：

```cpp
int main(int argc, char **argv) {
  int ch;  // 便于存储返回的负值 EOF (MacOS: Ctrl+D)；
  while((ch = cin.peek()) != EOF) {
    if (ch != 'q') {
      std::cin.get();  // 从流中读取字节（扔掉）；
      std::cout.put(ch);
    } else {
      return -1;
    }
  }
  return 0;
}
```

276. （Page：676）std::fstream 与 std::sstream 的流随机访问，tellg() 获得输入流的当前位置、seekg() 重置输入流位置。同样还有另外一组方法用于输出流（p）：

```cpp
int main(int argc, char **argv) {
  std::istringstream iss("Hello, world!");
  std::cout << iss.tellg() << std::endl;  // 0；
  std::cout << static_cast<char>(iss.get()) << std::endl;  // 'H'；
  std::cout << iss.tellg() << std::endl;  // 1；
  iss.seekg(0);
  std::cout << static_cast<char>(iss.get()) << std::endl;  // 'H'；
  iss.seekg(-5, ios_base::seekdir::end);
  std::cout << static_cast<char>(iss.get()) << std::endl;  // 'o'；
  return 0;
}
```

277. （Page：686）在 stack unwinding 过程中，将运行类类型局部对象的析构函数。因为这些函数是自动执行的，所以它们不应该抛出异常。一旦在栈展开过程中析构函数抛出异常，**并且没有在其内部被捕获处理**，则程序将调用 std::terminate() 终止运行。
278. （Page：687）通常情况下，如果 catch 接受的异常与某个继承体系有关，则最好将该 catch 的参数定义成引用类型。
279. （Page：688）重新抛出：

```cpp
try {
  throw std::runtime_error("ERROR");
} catch(...) {  // 捕获所有异常；
  throw;  // 继续向上层抛出；
}
```

280. （Page：688）throw 会对其参数进行拷贝，因此只能抛出可拷贝对象（**拷贝或移动构造函数不是 delete 的类对象**）。
281. （Page：690）函数 try 语句块：

```cpp
struct B {
  int x = 0;
  B (int x) try : x(x) {  // 也可用于普通函数，可以捕获初始化列表中的异常；
    throw 1;
  } catch(int e) {
    std::cout << "Error Occured!" << std::endl;
  }
};
```

282. （Page：691）noexcept 可用在两种情况下：
* 确认函数不会抛出异常；
* 根本不知道该如何处理异常；

283. （Page：690）noexcept 的几种应用方式：

```cpp
using fp = int(*)(int, int) noexcept;  // 函数指针（需要与具体函数保持一致）；
struct B { void foo() const & noexcept {} };  // 类成员函数；
auto foo() noexcept -> void {}  // 尾置类型函数；
void bar() noexcept {};  // 普通函数； 
```

284. （Page：692）noexcept 运算符：

```cpp
auto foo() noexcept -> int {}
void bar() noexcept(noexcept(foo()));  // bar 与 foo 的异常说明符保持一致；
```

285. （Page：697）若将 `#include` 放置于命名空间内则意味着将头文件内所有名字定义成该命名空间的成员。
286. （Page：700）内联的命名空间（可以被外层命名空间直接使用）：通常 A/B 两个头文件内可以为**相同类型代码的不同版本**，需要启用的版本放置在内联命名空间中，这样外层的命名空间 App 便可以直接进行访问。

```text
namespace App { 
  #include "A.h"  //  使用 inline 命名空间（inline namespace A {}）；
  #include "B.h"  //  使用非内联命名空间（namespace B {}）；
}
```

287. （Page：700）未命名的命名空间（**仅在特定文件内部有效，作用范围不横跨多个不同文件**）：其中定义的变量拥有**静态生命周期（类似 static 变量）**，第一次使用前创建，程序结束时销毁。

```cpp
namespace {
  int i;  // 常用作当前文件内的全局变量；
}
```

288. （Page：702）命名空间的别名：

```cpp
namespace s = std;  // 为 std 设置一个别名 “s”；
int main(int argc, char **argv) {
  s::cout << 11 << s::endl;
  return 0;
}
```

289. （Page：704）using 声明的名字作用域**与 using 声明语句本身的作用域一致**；而 using 指示一般使其成员出现在**最近的外层作用域**中。

```cpp
namespace A {
  int j = 10;
}
int main(int argc, char **argv) {
  using namespace A;  // using 指示，将 A 的名字注入到全局作用域中；
  std::cout << j << std::endl;
  return 0;
}
```

290. （Page：704）头文件最多只能在它的函数或命名空间内使用 using 指示或 using 声明，以免将名字注入到所有包含了该头文件的文件中。
291. （Page：706）当我们给函数传递一个类类型的对象时，除了在常规的作用域查找外还会查找实参类所属的命名空间。比如当调用 operator>>(std::cin, s) 时，会查找其形参 cin 的 std 作用域以寻对应实现。因此，**形如 “A + B” 的表达式，编译器会优先在类 A 中查找 operator+ 的实现（友元函数），然后再在 B 中查找**。
292. （Page：711）多重继承中基类的构造顺序**与派生列表中基类的出现顺序保持一致**，而与派生类构造函数初始值列表中基类的顺序无关。
293. （Page：712）如果一个类从它的多个基类中继承了相同的构造函数，则这个类必须为该构造函数定义它自己的版本。
294. （Page：714）对象、指针和引用的静态类型决定了我们能够使用哪些成员。而指针和引用的动态类型决定了 virtual 函数的实际调用版本。
295. （Page：717）虚继承：不论虚基类在继承体系中出现了多少次，在派生类中都只包含唯一一个共享的虚基类子对象。如：std::istream 与 std::ostream 均虚继承自 std::base_ios。
296. （Page：720）虚基类应该**使用最低层的派生类直接初始化**（在构造函数的初始化列表中初始化），**虚基类总是优先于非虚基类构造**，且与它们在继承体系中的次序和位置无关。若最低层派生类没有初始化虚基类并且虚基类没有默认构造函数，则报错。
297. （Page：721）当一个类有多个虚基类时，这些虚的子对象将按照它们在派生列表中出现的顺序依次从左到右构造。然后再从基类到最低层派生类依次按顺序构造。合成拷贝构造和移动构造及赋值运算符与上述顺序相同。析构函数的调用顺序与上述顺序相反。
298. （Page：726）new 运算符的执行分为三步：
* new 表达式调用一个名为 operator new / operator new[] 的标准库函数，该函数用于**分配**原始内存空间；
* 编译器运行**构造**函数并进行对象初始化；
* 对象被分配空间并构造完成，**返回指针**；

299. （Page：726）delete 运算符的执行分为两步：
* 对 sp 指向对象或数组中元素执行**析构**数；
* 调用名为 operator delete / operator delete[] 的标准库函数**释放**内存；

300. （Page：727）new 和 delete 的运算符重载：当重载函数作为类成员时，是**隐式静态**的（分别用在对象实例的构造前后），且不能操作类的任何数据成员。
301. （Page：727）对于一个类的对象实例化过程，编译器会优先在类和其基类的成员函数中查找 new 和 delete 的运算符重载，如果没有找到则向上层全局环境中继续查找。

```cpp
struct B {
  void* operator new(size_t s) {
    return ::operator new(s);
  };
  void operator delete(void* p) noexcept {
    ::operator delete(p);
  };
};
int main(int argc, char **argv) {
  auto b = new B();
  delete b;
  return 0;
}
```

302. （Page：727）new 和 delete 运算符在标准库中的 8 个重载版本：

```cpp
// 可能抛出异常版本；
void* operator new(size_t);
void* operator new[](size_t);
void operator delete(void*) noexcept;
void operator delete[](void*) noexcept;
// 不会抛出异常版本（通过将 std::nothrow 作为 placement-new 参数传入来调用）；
void* operator new(size_t, const nothrow_t&) noexcept;
void* operator new[](size_t, const nothrow_t&) noexcept;
void operator delete(void*, const nothrow_t&) noexcept;
void operator delete[](void*, const nothrow_t&) noexcept;
```

303. （Page：728）为 new 和 delete 指定不同的内存分配器：

```cpp
struct B {
  void* operator new(size_t s) {
    if (void* mem = std::malloc(s)) {  // 使用 std::malloc() 内存分配器；
      return mem;
    } else {
      throw bad_alloc();
    }
  };
  void operator delete(void* p) noexcept { std::free(p); };
};
int main(int argc, char **argv) {
  auto b = new B();
  delete b;
  return 0;
}
```

304. （Page：729）placement-new 的几种使用形式：

```text
new (place_address) type;
new (place_address) type (initializers);
new (place_address) type [size];
new (place_address) type [size] { braced initializer list };
```

305. （Page：729）placement-new 不需要指向动态内存（与 std::allocator 的区别在于，std::allocator 的 construct 需要一个由 std::allocator 分配的内存空间）。placement-new **不负责内存空间的申请，只负责在指定位置构造对象**。

```cpp
struct B {
  int v = 0;
  B(int v) : v(v) {}
  void* operator new(size_t size) {
    return ::operator new(size);
  };
  void* operator new(size_t size, const nothrow_t&, void* p) noexcept {
    // 调用原生的 operator new(size_t, void*) 构造对象;
    return ::operator new(size, p);
  };
};
int main(int argc, char **argv) {
  std::allocator<B> alloc;  // 内存分配器；
  auto y = new(nothrow, alloc.allocate(1)) B(10);  // 使用 placement-new 在指定位置构造对象；
  std::cout << y->v << std::endl;  // 10；
  delete y;
  return 0;
}
```

306. （Page：730）new 对象显式地析构函数调用，不释放内存，只析构对象：

```cpp
int main(int argc, char **argv) {
  auto v = new std::string("Hello, world!");
  v->~string();  // 析构对象；
  delete v;   // 释放内存；
  return 0;
}
```

307. （Page：730）RTTI（dynamic_cast() 和 typeid()）特别适用于以下场景：**我们想使用基类对象的指针或引用执行某个派生类操作并且该操作不是虚函数**。
308. （Page：731）dynamic_cast 在执行时需要确保**指针实际所指向的对象能够进行转换**。

```cpp
class A {
 public:
  A() = default;
  virtual ~A() = default;
  virtual int add(int x, int y) { return x + y; }
  int getX() { return 100; }
};
class B : public A {
  int x;
 public:
  B(int x = 10) : A(), x(x) {}
  virtual int add(int x, int y) override { return x + y + 10; }
  int getX() { return x; }
};
int main(int argc, char **argv) {
  A* ap = new B(10);  // 确保实际指向的是派生类对象；
  if (auto bp = dynamic_cast<B*>(ap)) {  // 转换到派生类指针；
    std::cout << bp->getX() << std::endl;  // 10；
  }
  delete ap;
  return 0;
}
```

309. （Page：733）typeid 运算符返回 std::type_info 类对象，对于含有虚函数的类对象（**通过指针或引用**）来说会返回**动态类型**；作用于指针及其他类型时则返回静态编译时类型（运行时求值和编译时求值）。
310. （Page：735）RTTI（结合使用 std::dynamic_cast 和 typeid）可用来做有虚函数对象的相等性判断。

```cpp
class A {
  friend bool operator==(const A& x, const B& y);
 public:
  virtual bool equal(const A& a) const {};  // 依次比较基类成员；
};
class B : public A {
 public:
  bool equal(const A& a) const override {
    if (A::equal(a)) {  // 先比较基类成员；
      auto r = dynamic_cast<const B&>(a);  // 再比较派生类成员；
    } else {
      return false;
    }
  };
};
bool operator==(const A& x, const B& y) {
  return (typeid(x) == typeid(y)) && x.equal(y);  // 先判断引用所指向的动态类型是否相同；
}
```

311. （Page：737）限定作用域的枚举类（推荐优先使用，其值不会隐式转换为数字类型，并且不会被“释放”到外层作用域）：

```cpp
int main(int argc, char **argv) {
  enum class EnumClass : unsigned char { A = 1, B = 3 };
  EnumClass x = EnumClass::A;  // x 不能作为数值被打印；只能通过 Enum 类型前缀来使用枚举值；
  // 非限定作用域的枚举类；
  enum Enum { A = 1, B = 3 };
  std::cout << A << std::endl;  // 1；枚举值被暴露在外层作用域；
  int y = A;  // 可作为数值使用；
  return 0;
}
```

312. （Page：738）默认情况下，enum class 使用 **int** 类型；enum 不存在默认类型，**默认可容纳枚举值**。因此，为枚举类指定类型可以确保不同编译环境下枚举类产生相同的代码。
313. （Page：740）类成员指针：数据成员指针在未绑定对象时取地址后的值为 1，且无法直接解引用，因此只能配合 “.*” 与 “->*” 运算符使用。

```cpp
struct B {
  int x = 10;
  void foo(int v) const { std::cout << v << std::endl; }
  static int B::*rpx() {
    return &B::x;  // 返回一个类成员变量指针；
  }
  static auto rpfoo () -> void (B::*)(int) const {
    return &B::foo;  // 返回一个类成员函数指针；
  }
};
int main(int argc, char **argv) {
  int B::*x = &B::x;
  void (B::*foo)(int) const = &B::foo;  // 不存在自动转换，必须取地址；
	B b;
	std::cout << b.*x << std::endl;  // 10；
	(b.*foo)(100);  // 100；
	// 通过类静态方法返回成员指针，并绑定到实际的类对象上；
	std::cout << b.*B::rpx() << std::endl;  // 10；
	(b.*B::rpfoo())(100);  // 100；
  return 0;
}
```

314. （Page：743）对于普通函数指针和指向成员函数的指针来说，一个常见的用法是**将其存入一个函数表中，根据偏移位置来进行调用**。
315. （Page：745）使用 std::function 可以将成员函数用作可调用对象，其中第一个参数隐式为调用对象：

```cpp
struct B {
  void foo(int v) const { std::cout << v << std::endl; }
};
int main(int argc, char **argv) {
  std::function<void(const B&, int)> foo = &B::foo;  // 第一个参数必须为调用对象；
  foo(B(), 10);
  return 0;
}
```

316. （Page：746）使用 std::mem_fn 生成可调用对象（可自动推断类型，无需用户自定义）：

```cpp
struct B {
  void foo(int v) const { std::cout << v << std::endl; }
};
int main(int argc, char **argv) {
  auto foo = std::mem_fn(&B::foo);
  foo(B(), 10);
  return 0;
}
```

317. （Page：746）使用 bind 生成可执行对象：

```cpp
struct B {
  void foo(int v) const { std::cout << v << std::endl; }
};
int main(int argc, char **argv) {
  auto foo = std::bind(&B::foo, std::placeholders::_1, std::placeholders::_2);
  foo(B(), 10);
  return 0;
}
```

318. （Page：749）外层类对象和嵌套类对象没有任何关系，嵌套类对象只是包含嵌套类定义的成员。同样，外层类对象也只包含外层类成员。嵌套类可以使用外层类的可用成员（因为嵌套类对象存在时，外层类对象一定存在）。
319. （Page：753）union 的管理控制类：

```cpp
class Token {
 public:
  Token() : tok(INT), ival{0} {}
  Token(const Token &t): tok(t.tok) { copyUnion(t); }
  Token &operator=(const Token&);
  // 手动销毁，析构函数不清楚 union 存储什么类型，因此类对象成员需要通过判别式手动释放；
  ~Token() { if (tok == STR) sval.~string(); }
  // 若当前为 std::string，也需先手动释放；
  Token &operator=(const std::string&);
  Token &operator=(char);
  Token &operator=(int);
  Token &operator=(double);
 private:
  enum { INT, CHAR, DBL, STR } tok;
  union {  // 匿名 union；
    char cval;
    int ival;
    double dval;
    std::string sval;
  };
  void copyUnion(const Token&);
};
Token& Token::operator=(const std::string &s) {
  if (tok == STR) sval = s;
  else new(&sval) std::string(s);  // 需要先构造 string；
  tok = STR;
  return *this;
} 
```

320. （Page：755）局部类：类定义在某个函数内部；需要完整的类内定义，且不能声明静态成员；可以使用函数作用域内的静态变量。
321. （Page：758）C++ 固有的不可移植特性：

```text
1、算数类型大小（在各个机器上可能不同）；

2、位域：读写位域需要使用位运算符，其在内存中的布局是机器相关的；

  struct S {
    // will usually occupy 4 bytes:
    // 5 bits: value of b1
    // 11 bits: unused
    // 6 bits: value of b2
    // 2 bits: value of b3
    // 8 bits: unused
    unsigned int b1 : 5, : 11, b2 : 6, b3 : 2;
  };
  printf("%zu\n",sizeof(struct S)); // usually prints 4；

3、volatile 限定符：确切意思与机器有关，一般表示对象的值可能在程序的控制或检测之外被更改（语法用法同 const）；

  volatile int display_register;

4、extern "C" {} 语句；

  extern "C" typedef void FC(int);  // FC 是一个指向 C 函数的指针；
  void f2(FC*);  // f2 是一个 C++ 函数，参数为 C 函数指针；
```

322. （Page：760）可以用于判断编译类型（C/C++）的宏： 

```cpp
#ifdef __cplusplus
// 此时源码被编译为 C++；
#endif
```
