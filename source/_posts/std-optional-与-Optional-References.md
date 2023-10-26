---
title: std::optional 与 Optional References
intro: std::optional 是 C++17 中新添加的一个类模板，用来表示**一个值可能存在一种“不可用”的状态**。这类的场景需求很多，比如“搜索一个字符串中的所有字符，并返回其中出现的第一个数字值”。针对这个需求，我们可能获得多个不同的结果，但其中一个相对特殊的结果是“字符串中没有可返回的数字值”。那么这个时候，std::optional 就可以派上用场了。
comments: true
date: 2020-07-11 11:30:44
tags:
- Cpp
---

**std::optional** 是 C++17 中新添加的一个类模板，用来表示**一个值可能存在一种“不可用”的状态**。这类的场景需求很多，比如“搜索一个字符串中的所有字符，并返回其中出现的第一个数字值”。针对这个需求，我们可能获得多个不同的结果，但其中一个相对特殊的结果是“**字符串中没有可返回的数字值**”。那么这个时候，std::optional 就可以派上用场了。

通常，我们可能会用多种不同的方式来处理这样的场景。比如：

1. 返回数字 **-1** 或特殊的**空字符串**来表示没有找到符合要求的值；
2. 用函数返回的**布尔值**来判断是否存在有效的结果值，然后结果值本身通过参数（指针/引用）进行传递；
3. 通过**抛出异常**来表示没有可返回的有效值等；

但无论以上哪种方式都有着其自身的弊端。那让我们来看看如何使用 std::optional 来解决这个问题。

#### 基本用法

对于一个给定的类型 T，std::optional<T> 可以生成一个对象，该对象可以表示一个**具有有效值的类型 T**，或者是一个**空值**。使用方式如下：

```cpp
#include <iostream>
#include <optional>
#include <vector>

std::optional<std::string> create(bool isEmpty) {
  if (isEmpty) {
    return std::nullopt;  // same as return "std::make_optional<std::string>()";
  }
  return std::make_optional<std::string>("Hello, world!");  
}
int main(int argc, char **argv) {
  auto str = create(false);
  std::cout << *str << std::endl;  // same as "str.value()";
  auto v = std::optional<std::vector<int>>(std::in_place, {1, 2, 3});  // construct in-place;
  for (const auto i : *v) {
    std::cout << i << std::endl;
  }
  // test the validity of optional;
  auto emptyInt = std::optional<int>();
  std::cout << std::boolalpha << emptyInt.has_value() << std::endl;  // false;
  if (emptyInt) {  // another convenient way;
    std::cout << *emptyInt << std::endl;
  }
  // value_or();
  std::cout << emptyInt.value_or(100) << std::endl;
  // comparison;
  std::cout << "Comparison Result: " << (emptyInt > 100) << std::endl;

  return 0;
}
```

#### 性能考虑

在使用 std::optional 来包装其他类型时，我们需要为此包装类付出额外的内存开销代价：

```cpp
class A {  // Non-POD
  int v;
  std::string str;
};
class B {  // POD;
  int v;
  double d;
  long l;
};
int main(int argc, char **argv) {  
  std::cout << sizeof(bool) << std::endl;  // 1;
  std::cout << sizeof(std::optional<bool>) << std::endl;  // 2;
  std::cout << sizeof(int) << std::endl;  // 4;
  std::cout << sizeof(std::optional<int>) << std::endl;  // 8;
  std::cout << sizeof(long long) << std::endl;  // 8;
  std::cout << sizeof(std::optional<long long>) << std::endl;  // 16;
  // complex types;
  std::cout << sizeof(std::string) << std::endl;  // 24;
  std::cout << sizeof(std::optional<std::string>) << std::endl;  // 32;
  std::cout << sizeof(A) << std::endl;  // 32;
  std::cout << sizeof(std::optional<A>) << std::endl;  // 40;
  std::cout << sizeof(B) << std::endl;  // 24;
  std::cout << sizeof(std::optional<B>) << std::endl;  // 32;
  return 0;
}
```

在一般的实现中，std::optional 对象在其内部需要保存一个 bool 类型的字段（1 Byte）来标记当前被包装的值是否已经进行初始化（initialized）。然后由于**对齐**（类成员的起始偏移位置应该为其本身大小的整数倍，并且整个类对象大小也必须为其最大成员大小的整数倍）的原因，导致实际包装之后的对象要比原对象大。比如 `alignof(int)` 的结果为 4，加上 1 个字节经过对齐便变成了 8 字节，其他情况类似。从规律上来看，原对象是否为 POD 并不会影响包装之后的对象大小。

#### 注意事项

如下代码所示，std::optional 在和原始指针类型一起使用时，可能会出现“指针可用性状态判断不一致”的问题。因此**不建议用 std::optional 来包装原始指针类型**。无效指针可以直接用 nullptr 来表示。

```cpp
int main(int argc, char **argv) {
  int v = 10;
  auto pv = &v;
  std::optional<int*> opv(pv);
  delete *opv;
  // opv.reset();
  if (opv) {
    std::cout << **opv << std::endl;  // undefined behavior;
  }
  return 0;
}
```

#### Optional References

std::optional 虽然可以用来包装其他类型，**但却不可以将其用在引用类型上**（如 int&），因此至少在目前的 C++17 中，并没有所谓的 Optional References 的说法。而 WG21 争议的焦点便是“**Optional References 是否/怎样支持对底层引用类型的 Rebinding？**”。假设现阶段我们支持 std::optional 对引用类型进行包装，那么对于下面这段代码，我们该以怎样的方式进行解读呢？

```cpp
int x = 42;
int y = 43;
std::optional<int&> orx = x;
orx = y;
```

这里最后一句的 `orx = y;` 是指：
* 将 Optional References 底层的引用对象更换为 y？
* 还是指把 x 的值变更为 y 的值？

如果是第一种情况，则 std::optional<T> 与 std::optional<T&> 针对 operator= 的**行为并不一致**。而如果是第二种情况，则当引用类型没有所指向的原对象时，operator= 变得**没有意义**，而此时能做的只有对该引用类型进行 Rebinding。

**\*** 目前 Boost 中实现的 boost::optional 采用了 Rebinding 的方式。
