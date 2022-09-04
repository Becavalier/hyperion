---
title: Python 小记
intro: 最近在工作中一直在从事 Python 相关的工作，因为以前 Python 用的比较少，特地趁此机会好好学习和复习一下，将一些基础性的知识点整理在这里。同时也方便以后的回顾和查找。关于 Python 的编码规范，有两种常用规范可以选择。一个是 PEP8，另一个是 Google Python 规范。
comments: false
date: 2017-07-13 23:54:21
tags:
- Python
---

最近在工作中一直在从事 Python 相关的工作，因为以前 Python 用的比较少，特地趁此机会好好学习和复习一下，将一些基础性的知识点整理在这里。同时也方便以后的回顾和查找。关于 Python 的编码规范，有两种常用规范可以选择。一个是 PEP8，另一个是 Google Python 规范。


```python
# 控制台输入；
s = input("Please input:")

# 类型转换（Python 不允许类型的隐式转换）；
s = int(s)
s = str(s)

# 可迭代对象；
from collections import Iterable
isinstance([], Iterable) # True

# Python 的 for 循环本质上是通过不断调用 next() 函数实现的;
for x in [1, 2, 3, 4, 5]:
    pass

# 首先获得 Iterator 对象；
it = iter([1, 2, 3, 4, 5])
# 循环；
while True:
    try:
        # 获得下一个值:
        x = next(it)
    except StopIteration:
        # 遇到 StopIteration 就退出循环；
        break


# 多行模式，续行模式；
print('''line1
line2 
line2''');

# 编码转换；
ord('A') # 65
chr(66) # 'B'

# 字符串模版；
'Hi, %s, you have $%d.' % ('Michael', 1000000);
# 'Hi, Michael, you have $1000000.'

# 判断某一个键值对是否在一个 dict 中；
'Name' in {'Name': 'Jason', 'Age': 18}

# Set 相关；
s = set([1, 1, 3, 4])
s.add(4)
s.remove(1)

# 交集；
s &amp; set([1, 3])

# 偏函数；
import functools
def log(level, message, stack):
    print(level + ": " + message)
    print(stack)
    
log_unknown_error = functools.partial(functools.partial(log, "Error"), "Unknown")

# 使用不变类型做默认参数；
def add_end(L = None):
    if L is None:
        L = []
    L.append('END')
    return L

# 可变参数和关键字参数；
def f1(a, b, c = 0, *args, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)

args = (1, 2, 3, 4);
kw = {'d': 99, 'x': '#'}
f1(args, kw);
# a = 1 b = 2 c = 3 args = (4,) kw = {'d': 99, 'x': '#'}

# 列表生成式；
[x * x for x in range(1, 11) if x % 2 == 0]

d = {'x': 'A', 'y': 'B', 'z': 'C' }
[k + '=' + v for k, v in d.items()]

L = ['Hello', 'World', 'IBM', 'Apple']
[s.lower() for s in L]

# 切片；
l = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack'];
l[:3]
l[-2:]
l[:]
l[::2]
'ABCDEFG'[:3]
'ABCDEFG'[::2]

# 生成器（从列表生成式演化过来）；
g = (x * x for x in range(10));
next(g);

for n in g:
	print(n);

# 断言（不成立会抛出 Assertion Error）；
assert 1 == 1

# 无参数装饰器；
import functools

def log(func):
    @functools.wraps(func) # 修正函数的 __name__ 属性；
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper
# 带参数装饰器；
import functools

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator

# 匿名函数；
func = lambda:1 + 1     # 无参；
func = lambda x:x + 1   # 有参；

# 字符串格式化：
print('{},{}'.format('Hongten','Welcome to my space!'))
print('Hi,{name},{message}'.format(name = 'Tom',message = 'How old are you?'))

table = {'Sjoerd': 4127, 'Jack': 4098, 'Dcab': 7678}
    for name, phone in table.items():
        print('{0:10} ==> {1:10d}'.format(name, phone))

# 字符串格式化，填充与宽度限制（^居中、<左对齐、>右对齐）；
'{:>8}'.format('189')
'{:0>8}'.format('189')
'{:a>8}'.format('189')

# 字符串格式化，精度限制；
'{:.2f}'.format(321.33345)

# 字符串格式化，进制限制（d/b/o/x）；
'{:d}'.format(17)

# 字符串格式化，千分位分隔符；
'{:,}'.format(1234567890)
```

**闭包和 LEGB 法则：**

* **Local**：可能是在一个函数或者类方法内部；
* **Enclosed**：可能是嵌套函数内，比如说一个函数包裹在另一个函数内部；
* **Global**：代表的是执行脚本自身的最高层次；
* **Built-in**：Python 为自身保留的特殊名称；

闭包最重要的使用价值在于封存函数执行的上下文环境；闭包在其捕捉的执行环境（`def` 语句块所在上下文）中，遵循 LEGB 规则逐层查找，直至找到符合要求的变量，或者抛出异常。可以看如下的 Python 闭包和 Javscript 闭包的示例代码。会产生闭包的根本原因是因为语言的灵活性，可以将函数作为参数或者返回值，这样某层函数的作用域环境会在特定情况下被“保存”下来。


```python
# Python Version；
def func1():
    i = 0
    def func2():
        nonlocal i
        print(++i)
    return func2

ref = func1() # 保存最外层函数的环境和引用；
ref() # 1
ref() # 2
ref() # 3
```


```javascript
// Javascript；
function func1() {
  var i = 0;
  function func2() {
    console.log(++i);
  }
  return func2;
}
var ref = func1();
ref();
ref();
ref();
```

### 其他：

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