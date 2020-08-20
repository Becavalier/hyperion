---
title: CRTP 与常见用例
intro: CRTP 的全称为 “Curiously Recurring Template Pattern”，是一种 C++ 模板编程中的常用模式。其形式是将派生类作为基类的模板参数。从“类型理论”上来讲，这是一类 “F-bounded polymorphism”。
comments: true
date: 2020-08-06 17:02:38
tags:
- C++
---

CRTP 的全称为 “Curiously Recurring Template Pattern”，是一种 C++ 模板编程中的常用模式。其形式是**将派生类作为基类的模板参数**。从“类型理论”上来讲，这是一类 “***F-bounded polymorphism***”。

CRTP 的一般形式如下所示：

```cpp
template <class T>
struct Base {
  void interface() {
    static_cast<T*>(this)->implementation();
  }
  void implementation() {
    std::cout << "Base implementation" << std::endl;
  }
  static void staticFunc() {
    // access member functions;
    T::staticSubFunc();
  }
};
struct DerivedA : Base<DerivedA> {
  void implementation() {
    std::cout << "DerivedA implementation" << std::endl;
  };
  static void staticSubFunc() {
    std::cout << "staticSubFunc" << std::endl;
  };
};
struct DerivedB : Base<DerivedB> {};  
int main(int argc, char **argv) {
  DerivedA da;
  da.interface();
  da.staticFunc();  // T::staticSubFunc();
  DerivedB db;
  db.interface();  // this will call the default implementation.
  return 0;
}
```

CRTP 的实现基于一个事实：**即类成员方法的方法体在该方法被实际调用前是不会进行实例化的**。因此，从可见性上来看，对于上述代码中的 `Base<Derived>::interface()` 来说，传入的 T 在方法被实际调用时，是可见的。基于 CRTP 可以实现“**静态多态**”，如上述代码所示。

一些应用场景：

* **对象计数器**：

统计一个类的实例对象创建与析构的数据。

```cpp
template <typename T>
struct counter {
  static int objects_created;
  static int objects_alive;
  counter() {
    ++objects_created;
    ++objects_alive;
  }
  counter(const counter&) {
    ++objects_created;
    ++objects_alive;
  }
protected:
  ~counter() {
    --objects_alive;
  }
};
template <typename T> int counter<T>::objects_created(0);
template <typename T> int counter<T>::objects_alive(0);

struct X : counter<X> {};
struct Y : counter<Y> {};
int main(int argc, char **argv) {
  X xA, xB;
  Y yA;
  {
    X xC;
    std::cout << X::objects_created << std::endl;
  }
  std::cout << Y::objects_created << std::endl;
  std::cout << X::objects_alive << std::endl;
  std::cout << Y::objects_alive << std::endl;
  return 0;
}
```

* **多态复制构造**：

当使用多态时，常需要基于基类指针创建对象的一份拷贝。常见办法是增加 clone 虚函数在每一个派生类中。使用 CRTP，可以避免在派生类中增加这样的虚函数。

```cpp
class Shape {
public:
  virtual ~Shape() {}
  virtual Shape *clone() const = 0;
};
// This CRTP class implements clone() for Derived
template <typename Derived>
class Shape_CRTP : public Shape {
public:
  virtual Shape *clone() const {
    return new Derived(static_cast<Derived const&>(*this));
  }
};

// Nice macro which ensures correct CRTP usage
#define Derive_Shape_CRTP(Type) class Type: public Shape_CRTP<Type>

// Every derived class inherits from Shape_CRTP instead of Shape
Derive_Shape_CRTP(Square) {};
Derive_Shape_CRTP(Circle) {};
int main(int argc, char **argv) {
  Square sA;
  auto sB  = sA.clone();
  return 0;
}
```

* **std::enable_shared_from_this**；

一种 std::enable_shared_from_this 的常见实现方式是：**保留对 this 的弱引用（例如通过 std::weak_ptr）**。当 std::shared_ptr 的构造函数检测到 std::enable_shared_from_this 这个基类的存在时，会将新创建的 std::shared_ptr 分配给内部存储的弱引用。**\***为已经由另一个 std::shared_ptr 管理的对象构造另一个 std::shared_ptr 不会检查内部存储的弱引用，因此会导致未定义的行为。

```cpp
#include <memory>
#include <iostream>
 
struct Good : std::enable_shared_from_this<Good> {  // CRTP.
  std::shared_ptr<Good> getptr() {
    return shared_from_this();
  }
};
 
struct Bad {
  std::shared_ptr<Bad> getptr() {
    return std::shared_ptr<Bad>(this);
  }
  ~Bad() { std::cout << "Bad::~Bad() called\n"; }
};
 
int main(int argc, char** argv) {
    // Good: the two shared_ptr's share the same object.
    std::shared_ptr<Good> gp1(new Good);
    std::shared_ptr<Good> gp2 = gp1->getptr();
    std::cout << "gp2.use_count() = " << gp2.use_count() << '\n';
 
    // Bad, each shared_ptr thinks it's the only owner of the object.
    std::shared_ptr<Bad> bp1(new Bad);
    std::shared_ptr<Bad> bp2 = bp1->getptr();
    std::cout << "bp2.use_count() = " << bp2.use_count() << '\n';
    return 0;
} // UB: double-delete of Bad.
```
