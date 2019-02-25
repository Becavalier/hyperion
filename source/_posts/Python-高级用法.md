---
title: Python 高级用法
intro: 之前的一篇博客记录了一些 Python 相关的基本语法和知识点，这篇文章会记录一些 Python 相对高级的用法。内容主要包括函数式、面向对象等一些高级特性。
comments: true
date: 2017-07-20 14:32:44
tags:
- Python
---

之前的一篇博客记录了一些 Python 相关的基本语法和知识点，这篇文章会记录一些 Python 相对高级的用法。内容主要包括函数式、面向对象等一些高级特性。

#### 1、xrange 和 range：

在 Python 2.x 中，`xrange` 的性能要好于 `range`，因为 range 本质是基于 List 构建的，range(30) 会在内存中生成一个大小为30个元素的 List，而 xrange 是则会生成一个序列对象（迭代器），该对象会在程序运行时再进行求值（懒求值）。而在 Python 3.x 中，xrange 已经被更名为 range。

#### 2、super().\_\_init\_\_()：

避免了显式的调用父类构造函数。

```python
class ChildA(Base):
    def __init__(self):
        Base.__init__(self)

class ChildB(Base):
    def __init__(self):
        super().__init__()
```

#### 3、read / readline / readlines：


```python
# 可能产生内存溢出；
with open('./file.txt') as file:
    print(file.read())

# 性能最优，返回一个包含所有行的 List；
with open('./file.txt') as file:
    for line in file.readlines():
        print(line.strip())

# 一次读取一行；
with open('./file.txt') as file:
    while True:
        line = file.readline()
        if line:
            print(line)
        else:
            break
```

#### 4、is：

`is` 是比较两个变量所在的内存地址，`==` 是对比两个变量的值。

#### 5、GC：

Python 的垃圾回收机制主要包括引用计数、标记清除和分代技术。

