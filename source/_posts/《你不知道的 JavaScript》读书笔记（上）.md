---
title: 《你不知道的 JavaScript》读书笔记（上）
intro: 旧书清理系列。
comments: true
date: 2021-02-05 18:12:23
tags:
- JavaScript
---

旧书清理系列。

### 第 1 部分 - 作用域和闭包

1. （Page：7）变量的赋值操作会执行两个动作：

* （编译时）首先编译器会**在当前作用域中声明一个变量**（如果之前没有声明）；
* （运行时）引擎会在作用域中查找该变量，若可以找到就对它赋值**。

2. （Page：12）**严格模式下禁止自动或隐式创建全局变量**。在 RHS 查询（引用变量的值）下，若在作用域链中找不到变量，则会抛出 ReferenceError 异常。而在 LHS 查询（变量出现在赋值操作左侧）下，**若在作用域链中找不到变量，非严格模式下引擎会自动在顶层作用域创建一个全局变量**，严格模式下同样抛出 ReferenceError 异常。
3. （Page：14）作用域：

\- ***词法作用域***：

* 最为普通的，被大多数编程语言所采用；
* 定义在“词法阶段”的作用域，**即由开发者在写代码时将变量和块作用域写在哪里（词法关系）来决定的**；
* 关注函数在何处**声明**。

\- ***动态作用域***：

* 被如 Bash、Perl 等编程语言采用。
* **动态作用域是基于调用栈在运行时确定的，而不是代码中的词法作用域嵌套**。比如在进行 RHS 查询时，会根据调用栈向上查找变量，而不是代码的词法相对位置；
* 关注函数在何处**调用**。

4. （Page：17）两种**词法欺骗方式**：

* 动态改变词法作用域会导致 JavaScript 引擎无法在编译时对作用域查找进行优化，因此大多数情况下会禁用优化，进而影响性能。

\- ***eval***：

* **严格模式下有自己的词法作用域**，无法修改所在位置的作用域。

```javascript
function foo(str, a) {
  eval(str);  // 对已有词法进行了修改；
  console.log(a, b);
}
var b = 2;
foo("var b = 3;", 1);  // 1 3.
```

\- ***with***：

* 可以将一个对象处理为一个完全隔离的词法作用域，**这个对象的属性也会被处理为定义在该作用域内的词法标识符**；
* 在 *with {}* 内部声明的标识符属于 *with* 所在的作用域，而非扩展出的作用域；
* **严格模式下无法使用**。

```javascript
function foo(obj) {
  with (obj) { y = 2; }
}
var o = { x: 3 };  // 对 y 的无效引用会导致在顶层全局作用域内自动创建该变量；
foo(o);
console.log(window.y);  // 2.
```

5. （Page：24）**最小特权原则**：在软件设计中，应该最小限度地暴露必要的内容，而将其他内容都“隐藏”起来。
6. （Page：27）利用 IIFE 实现**函数作用域**：

* 通常建议使用“**具名函数表达式**”：
  * 利于调试；
  * 利于自身递归调用；
  * 利于代码可读性。
* 函数声明与函数表达式：前者的名称标识会被绑定在函数定义所在的作用域；后者的**名称标识会被绑定在表达式内部的 “{}” 中，外界无法引用**。

```javascript
var x = 2;
;(function foo() {  // 具名函数表达式；
  var x = 3;
  console.log(x);  // 3.
})();
console.log(x);  // 2.
```

7. （Page：30）**块作用域**：

* `var` 只能将声明的变量绑定在最近一个“函数作用域”内；
* `let` / `const` 可以将声明的变量绑定在最近一个“**块级作用域**”内。通常为 “{ ... }” 内部；
* *try...catch* 结构中的 *catch* 分句会创建一个块作用域。
 
8. （Page：38）包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理（提升），即“**先有声明，后有赋值**”。赋值给变量的函数表达式并不会被提升，且**函数会首先被提升，然后才是变量**。

```javascript
foo();  // 1.
var foo;  // 被忽略；
function foo() {
  console.log(1);
}
foo = function() {
  console.log(2);
}
```

9. （Page：44）**闭包**：当函数可以记住并访问所在词法作用域时，就产生了闭包，即使函数时在当前词法作用域之外执行。

* 一个函数**能够持续持有对父作用域变量的引用**，且这些变量不会被 GC 回收，即形成了“闭包”；
* 回调函数的使用一般会形成闭包。

```javascript
function foo() {
  var x = 2;
  function bar() {
    console.log(x);
  }
  return bar;
}
var baz = foo();
baz();  // 2.
```

* IIFE 构建的闭包（<u>[关于 Event Loop](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)</u>）：

```javascript
for (var i = 1; i <= 5; ++i) {
  (function(j) {  // 相当于 “var j = i”；
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

![](1.png)

10. （Page：54）简单的模块机制：

```javascript
// 单例模式；
var MyModules = (function Manager() {
  var modules = {};
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; ++i) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);  // 存储模块定义；
  }
  function get(name) {
    return modules[name];
  }
  return {
    define: define,
    get: get,
  }
})();
```

11. （Page：65）箭头函数中的**词法 this**：

```javascript
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(() => {
        this.count++;  // 箭头函数直接使用词法作用域中的 this，而非运行时调用者的 this；
        console.log('awesome!');
      }, 100);
    }
  }
};
obj.cool();
```

### 第 2 部分 - this 和对象原型

12. （Page：79）在任何情况下，**this 都不指向函数的词法作用域**。
13. （Page：84）**当被调用函数体处于严格模式下时，其内部的 this 无法绑定到全局对象**。
14. （Page：90）`new` 操作符的具体流程：

```javascript
function Person(name) {
  this.name = name;
}
// new Person('YHSPY');
var person = {};
person.__proto__ = Person.prototype;
Person.call(person, 'YHSPY');
```

15. （Page：99）箭头函数的 this 会**由外层作用域来决定**（词法作用域），当外层函数被绑定到固定的 this 后，内存箭头函数在调用时的 this 便无法再被更改。
16. （Page：101）判断 this 的绑定对象：

* 由 `new` 调用？ - 绑定到新创建的对象；
* 由 `call` / `apply` / `bind` 调用？ - 绑定到指定对象；
* 由上下文对象调用？ - 绑定到该上下文对象；
* 默认：严格模式下绑定到 undefined，否则为全局对象。

17. （Page：106）**在对象中，属性名永远都是字符串**。当使用 string 类型之外的其他值作为属性名时，该值会被引擎自动转换为一个字符串，包括数字。
18. （Page：109）当为数组添加字符串数字值时，该值会被转化为一个数字索引：

```javascript
var arr = [];
arr['1'] = 1;
console.log(arr);  // (2) [empty, 1].
```

19. （Page：114）对象（浅）不变性：

* **只影响目标对象和直接属性**；
* 当需要用到“深不变性”时，需要考虑程序设计是否有问题。

\- ***对象常量属性***：不可修改、重定义或删除。

```javascript
var myObject = {};
Object.defineProperty(myObject, 'key', {
  value: 4,
  writable: false,
  configurable: false,
});
```

\- ***禁止扩展***：禁止添加新属性且保留已有属性。

```javascript
var myObject = { existingKey: 2 };
Object.preventExtensions(myObject);
```

\- ***密封***：不能添加新属性，也不能重新配置或删除现有属性（可以修改值）。

```javascript
var myObject = { existingKey: 2 };
Object.seal(myObject);
```

\- ***冻结***：不能添加新属性，不能重新配置或删除现有属性，也无法修改属性值。

```javascript
var myObject = { existingKey: 2 };
Object.freeze(myObject);
```

20. （Page：118）访问描述符 getter 与 setter：

```javascript
var myObject = {
  get v() {
    return this.__v__;
  },
  set v(val) {
    this.__v__ = val;
  }
};
myObject.v = 1;
console.log(myObject.v);
```

21. （Page：121）`in` 与 `for..in` 均会查找对象的原型链。
22. （Page：145）对象“属性屏蔽”的复杂性：如果 foo 不直接存在于 myObject 中而是存在于原型链上层时 `myObject.foo = "bar"` 会出现的三种情况：

* 如果在原型链上层存在名为 foo 的普通数据访问属性，并且没有被标记为只读，那就会直接在 myObject 中添加一个名为 foo 的新属性，它是屏蔽属性；
* 如果在原型链上层存在 foo，但是它被标记为只读，那么 无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，会抛出错误。否则，这条赋值语句会被忽略；
* 如果在原型链上层存在 foo 并且它是一个 setter，那就一定会调用这个 setter。foo 不会被添加到 myObject，也不会重新定义 foo 这个 setter。

