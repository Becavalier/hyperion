---
title: C++ 字符串拷贝优化策略：Eager-Copy、SSO 与 COW
intro: 在 C++ 中，对于一个类型为 std::string 的字符串对象来说，可以有多种方式来拷贝它所对应的资源。而在这些方法中，最常见的三种为：Eager-Copy、SSO 以及 COW。其中最为广泛使用的是 “SSO”，而其他方式则已大都不再被编译器所使用。
comments: true
date: 2020-05-24 09:31:12
tags:
- C++
---

在 C++ 中，对于一个类型为 std::string 的字符串对象来说，可以有多种方式来拷贝它所对应的资源。而在这些方法中，最常见的三种为：Eager-Copy、SSO 以及 COW。其中最为广泛使用的是 “SSO”，而其他方式则已大都不再被编译器所使用。

首先我们先自定义一个 String 类，用来模拟 std::string 的具体实现（这里仅提供了大致功能，并没有考虑诸如“异常安全”等细节处理）：

```cpp
class String {
  friend std::ostream& operator<<(std::ostream&, String& s);
  char* start = nullptr;
  char* end = nullptr;
  char* end_of_capacity = nullptr;
 public:
  size_t size() const { return end - start; }
  size_t capacity() const { return end_of_capacity - start; }
  const char* data() { return start; }
  String() = default;
  String(const char* str) {
    const size_t size = std::strlen(str);
    start = static_cast<char*>(std::malloc(size));
    std::memcpy(start, str, size);
    end = start + size;
    end_of_capacity = end;
  }
  ~String() {
    std::free(start);
    end = nullptr;
    end_of_capacity = nullptr;
  }
};
std::ostream& operator<<(std::ostream& os, String& s) {
  for (auto i = s.start; i != s.end; ++i) { os << *i; }
  return os;
}
int main(int argc, char **argv) {
  String str("Hello, world!");
  std::cout << str << std::endl;
  std::cout << str.size() << std::endl;
  return 0;
}
```

其中最重要的是该类的私有成员变量 start、end 以及 end_of_capacity，这三个成员分别代表了当前字符串对象的**起始位置**、**结束位置**，以及当前**已分配的可用 capacity 的临界位置**。而 data() 函数则负责返回该 String 对象对应的原始 char* 指针。

### Eager-Copy

第一种字符串对象拷贝方式为 “eage-copy”，这种方式采用了最为“暴力”的拷贝方法，即：**深拷贝**。在每次拷贝时将原对象对应的内存以及所持有的动态资源完整地复制一份。这种拷贝方式的**缺点是浪费空间**，但其相对**优点是保证了每个对象的相互独立**。基于该方式对应的 String 实现这里不再赘述。

### COW（Copy On Write）

第二种字符串对象拷贝方式为 “COW”，即“**写时复制**”。这种拷贝方式使用**引用计数**，当一个对象被拷贝多份时，往往在内存空间中只有一个对象实体，对象中有一个引用计数记录有多少对象指针指向这个实体，当引用计数归零时便自动析构该对象。不仅如此，只有在某个对象指针要对该共享对象进行修改时，编译器才会真正执行对象的拷贝。所以该方式便被称为“写时拷贝”。让我们来修改上述代码来模拟字符串的 COW 拷贝方式。

```cpp
class String {
  friend std::ostream& operator<<(std::ostream&, String& s);
  struct Resource {  // 将动态资源使用单独的类对象进行管理；
    char* start;
    char* end;
    char* end_of_capacity;
    Resource(const char* str) {
      const size_t size = std::strlen(str);
      start = static_cast<char*>(std::malloc(size));
      std::memcpy(start, str, size);
      end = start + size;
      end_of_capacity = end;
    }
    ~Resource() {
      std::free(start);
      end = nullptr;
      end_of_capacity = nullptr;
    }
  };
  std::shared_ptr<Resource> res;
 public:
  void print(std::ostream& os) {  // 打印接口（类似 swap 的方式，由类提供实现）；
    for (auto i = res->start; i != res->end; ++i) { os << *i; }
  }
  size_t size() const { return res->end - res->start; }
  size_t capacity() const { return res->end_of_capacity - res->start; }
  const char* data() { return res->start; }
  bool isSharingWith(String& rhs) { return res == rhs.res; }  // 比较两个 String 对象是否共享一个 Resource 对象；
  String(const char* str) : res(std::make_shared<Resource>(str)) {}
  String(const String& rhs) { res = rhs.res; }
  String& operator=(const String& rhs) {  // 赋值操作（会改变数据，需要拷贝新对象）；
    if (this != &rhs) { res = rhs.res; }
    return *this;
  }
};
std::ostream& operator<<(std::ostream& os, String& s) { s.print(os); return os; }
int main(int argc, char **argv) {
  String strA("Hello, world!"), strB(strA);
  std::cout << std::boolalpha 
    << strA.isSharingWith(strB) << std::endl; // true；
  strB = "YHSPY";
  std::cout 
    << strA.isSharingWith(strB) << std::endl; // false；
  return 0;
}
```

可以看到，这里我们为 String 类添加了拷贝相关的成员函数，以及一个用来检测“两个 String 对象是否共享同一个 Resource 资源对象”的成员函数 isSharingWith()。在每一次 String 对象被重新赋值（“=”）时，都会将其内部的 res 指针重定向到新创建的 std::shared_ptr 对象，而该智能指针对象便维护着 String 类内具体使用的、分配在动态内存上的 Resource 字符串资源对象的生命周期。

COW 的大致实现思路在 C++11 中可以参考上述代码，但实际上由于这种方式在其内部存在着共享资源，因此在多线程情况下便**有可能会导致线程安全问题**。不仅如此，由于 COW 需要在字符串进行诸如 []、=、+=、+ 等操作时重新分配内存，而这也违背了 C++11 标准（21.4.1, p6）中对迭代器失效情况的规定。该规定表示**字符串容器在使用 operator[] 操作符时，迭代器（指针）不应该失效**。

### SSO（Small String Optimization）

最后一种字符串对象可以使用的拷贝优化方式为 SSO，翻译过来即“小字符串优化”。该策略使用的方式是：当字符串长度较小时，将其存放在字符串对象内的**栈内存**中；而当字符串长度大于某个临界值时，则转为使用 “Eager-Copy” 的方式。一个模拟的实现方式如下所示：

```cpp
class String {
  friend std::ostream& operator<<(std::ostream& os, String& str);
  const static size_t kLocalSize = 2 * sizeof(nullptr);  // 默认使用 2 * sizeof(nullptr) 大小的栈缓存；
  char buffer[kLocalSize];
  size_t size;
  // ... 其他相关的成员变量（这里仅为举例所以省略了）；
 public:
  String() = default;
  String(const char* str) : size(std::strlen(str)) {
    if (size <= kLocalSize) { std::memcpy(buffer, str, size); }
  }
  void print(std::ostream& os) { os << buffer; }
};
std::ostream& operator<<(std::ostream& os, String& str) { str.print(os); return os; }
int main(int argc, char **argv) {
  String strA("Hello, world!"), strB(strA);
  std::cout << strB << std::endl;
  std::cout << sizeof(strB) << std::endl;  // 24；
  std::cout << std::boolalpha << std::is_pod<String>::value << std::endl;  // POD；
  return 0;
}
```

这里可以看到，我们将这个 String 对象保持为一个 POD 类型，并且将其尺寸固定为本机数据总线（64位 -> 8Byte）的长度。这样整个 String 类便可以被编译器优化，可以使用最少的 CPU 指令来完成对象的拷贝过程。当然，除此之外我们还可以通过其他很多的优化，来提升 String 可以在的对象栈缓存中容纳的字符串最大长度（例如：可以把成员 size 没有用到的 bit 作为 buffer 的一部分来存储字符数据）。

BTW. Facebook 自研的 ***[FBString](https://github.com/facebook/folly/blob/master/folly/docs/FBString.md)*** 便使用了上述我们介绍的全部三种字符串拷贝优化方式来分别处理不同长度的字符串，并且还同时保证了字符串在进行 COW 时的线程安全：

* Small strings (<= 23 chars) are stored in-situ without memory allocation.
* Medium strings (24 - 255 chars) are stored in malloc-allocated memory and copied eagerly.
* Large strings (> 255 chars) are stored in malloc-allocated memory and copied lazily.

写了一个基本的实现，可以参考***[这里](https://github.com/Becavalier/YHString)***。
