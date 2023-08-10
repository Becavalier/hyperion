---
title: 关于 C++ Stack Unwinding 的一些记录
intro: 这篇文章整理了一些关于 C++ Stack Unwinding 的内容。
comments: false
date: 2023-07-13 17:57:00
tags:
- Cpp
---

这篇文章整理了一些关于 C++ Stack Unwinding 的内容。

堆栈展开（Stack Unwinding）是在运行时从函数调用堆栈中删除函数条目（Function Entries）的过程。**本地对象按照与构造它们相反的顺序被销毁**。

堆栈展开通常与异常处理相关。在 C++ 中，当异常发生时，会线性地在函数调用栈中搜索异常处理程序，并将具有异常处理程序的函数之前的所有条目从函数调用栈中删除。因此，如果异常未在同一函数（抛出异常的地方）中处理，则异常处理涉及堆栈展开。基本上，堆栈展开是**为运行时构造的所有自动对象调用析构函数（每当抛出异常时）的过程**。


```cpp
#include <iostream>
using namespace std;

struct S {
  S() { cout << "\n S Created"; }
  ~S() { cout << "\n S Destructed"; }
};

// A sample function f1() that throws an int exception.
void f1() {
  cout << "\n f1() Start ";
  throw 100;
  cout << "\n f1() End ";
}

// Another sample function f2() that calls f1().
void f2() {
  S s;  // Automatic variable.
  cout << "\n f2() Start ";
  f1();
  cout << "\n f2() End ";
}

// Another sample function f3() that calls f2() and handles -
// exception thrown by f1().
void f3() {
  cout << "\n f3() Start ";
  try {
    f2();
  } catch (int i) {
    cout << "\n Caught Exception: " << i;
  }
  cout << "\n f3() End";
}

int main() {
	f3();
	return 0;
}
```

输出：

```text
f3() Start 
S Created
f2() Start 
f1() Start 
S Destructed
Caught Exception: 100
f3() End
```

* 堆栈展开流程：
  * 当 f1 抛出异常时，其条目将从函数调用堆栈中删除，因为 f1 不包含引发异常的异常处理程序，然后在调用堆栈中查找下一个条目以查找异常处理程序；
  * 下一个条目是 f2。由于 f2 也没有异常处理程序，因此它的条目也会从函数调用堆栈中删除。函数作用域内部的自动变量也将自动析构；
  * 函数调用堆栈中的下一个条目是 f3。 由于 f3 包含异常处理程序，因此执行 f3 内部的 catch 块，最后执行 catch 块之后的代码。
* Stack Unwinding 的过程包括函数栈帧和自动变量在栈上的“解构”，其中后者可能会调用对应的析构函数。实现上个人理解只需要计算移动量，然后通过 *[e/r]sp* 调整栈顶即可。
