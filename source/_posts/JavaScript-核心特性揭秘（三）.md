---
title: JavaScript 核心特性揭秘（三）
intro: 本文是《JavaScript 核心特性揭秘》系列的第三篇，我们将继续沿着 JavaScript 的核心特性向下探索。JS 天生并不具备诸如“类”，“继承”等一系列专用于面向对象开发（OOP）的特性，那么该如何在 JS 中尽量“完美”地进行面向对象开发呢？如何封装对象？本文将给出答案。
comments: false
date: 2016-04-03 18:41:27
tags:
- JavaScript
---

本文是《JavaScript 核心特性揭秘》系列的第三篇，我们将继续沿着 JavaScript 的核心特性向下探索。JS 天生并不具备诸如“**类**”，“**继承**”等一系列专用于面向对象开发（OOP）的特性，那么该如何在 JS 中尽量“完美”地进行面向对象开发呢？如何封装对象？本文将给出答案。

JavaScript 本身并不支持**类**这种面向对象开发专有的数据结构，但是却存在**对象**这种数据类型。我们可以通过如下所示的两种方式代码来生成一个对象，并为对象添加相应的属性和方法：（第一种方式为使用 `new` 操作符和 `Object()` 构造函数来直接生成对象，第二种方式为使用对象字面量表示法来直接生成对象，两种方式没有任何区别）但更加推荐使用第二种方式。

```javascript
var person = new Object();  // 通过 new 操作符生成一个 Object 对象实例，并将引用 person 指向此对象；
person.name = "JASON";  // 为 person 指向的对象添加属性；
person.age = 23;
person.job = "Engineer";
person.sayName = function() {  // 为 person 指向的对象添加方法；
  console.log(this.name);
}

// 调用对象上的方法；
person.sayName();
```

使用字面量的方式生成对象：

```javascript
var person = {
  name: "Jason",
  age: 23,
  job: "Engineer",
  sayName: function() {
    console.log(this.name);        
  }
}

// 调用对象上的方法；
person.sayName();
```

虽然 JS 本身提供了**对象**这种数据类型，但直接使用 `Object` 并不符合面向对象程序设计的基本准则即**继承**，**封装**和**多态**。从某种意义上来看，直接使用 `Object()` 构造函数生成对象仅仅符合了面向对象中“封装”的特性。不仅如此，这种方式在处理不同对象间的相同方法或逻辑时，需要写下两遍相同的逻辑代码，并没有符合“**复用**”的特性，只是仅仅从名字上符合了“对象”这一称号。这里顺便提一下，在 ECMAScpit5 中定义了可以设置对象中属性相关特性的方法 `Object.defineProperties`，使用方法如下：

```javascript
var person = {};  // 声明一个空对象；
Object.defineProperty(person, "name", {   // 为对象添加属性，第一个参数为对象名；第二个参数为添加的属性名；第三个参数为一个属性描述对象；
  writable: false,   // 设置该参数是否可以被改变；
  value: "Anny",    // 设置该参数的值；
  enumerable: false,    // 设置该参数是否可以通过 for-in 遍历出来；
  configurable: true    // 设置该参数是否可以通过 delete 操作符删除；
});
```

为了符合“**复用**”的特性，我们可以使用“工厂模式”将上述构造对象的流程进行封装，每次返回一个封装好的对象进行使用，但这并没有从根本上解决问题 - 我们怎样才能够区分不同的对象？怎样知道他们的类型？上述所有的对象都是从直接使用 `Object()` 构造函数生成的，并且生成的对象之间不能够互相继承，两个对象之间也没有任何关系。为此，我们又提出了另一种封装模式：“**构造函数模式**”。我们将上述例子用“构造函数模式”重写如下：

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);        
  }
}

// 生成对象，并调用对象上的方法；
var person1 = new Person("Anny", 15, "student");
var person2 = new Person("Alice", 29, "teacher");

person1.sayName();
person2.sayName();
```

我们此处用 `function` 关键字创建了自定义的构造函数和该构造函数所持有的方法和属性，不再直接使用 `Object()` 构造函数生成对象。（请注意在 JS 中构造函即函数，两者没有本质的区别，只是调用的方式不同而已）接下来通过 `new` 操作符创建该构造函数所引用的对象实例，并且调用对象所持有的方法。“**构造函数模式**”与文章开篇我们讲解的直接使用 `Object()` 创建对象的方法相比较有一个优点，即对于使用“**构造函数模式**”生成的每一个对象，我们都可以使用对象实例的 `instanceof` 方法或者 `constructor` 属性来判断该对象所对应的类型，如下代码所示：

```javascript
// 自定义构造函数；
function Person(){}
function Animal(){}

// 生成对象；
var person = new Person();
var animal = new Animal();

// 获得对象类型（constructor 属性会返回该实例所对应的构造函数本身）；
console.log(person.constructor === Person);  // 输出 true；
console.log(animal.constructor === Animal);  // 输出 true；

// 获得对象类型（instanceof 方法判断该实例是否是从指定的构造函数生成的）；
console.log(person instanceof Person);  // 输出 true；
console.log(animal instanceof Animal);  // 输出 true；
```

事情到这里并没有结束，“**构造函数模式**” 也存在着自身的缺点与不足，比如从同一个构造函数生成的两个对象间并不能共享方法。也就是说，虽然两个对象是从同一个构造函数生成的，但是这两个对象内部的方法并不是只有一份拷贝，而是有两份拷贝（即两个函数对象）。同理，如果生成三个对象，则这三个对象内部的函数各有自己的一份拷贝。这样在生成大量对象实例时就会造成内存浪费的问题。（对象内部的方法逻辑都是同样的，但是却有多个拷贝）并且，这些不同对象实例上的同名同逻辑的函数也并不相等。为此，我们又提出了“**原型模式**”，代码如下所示：

```javascript
// 自定义构造函数；
function Person() {}
Person.prototype.name = "Jason";
Person.prototype.age = 23;
Person.prototype.job = "Engineer";
Person.prototype.sayName = function() {
  console.log(this.name);        
}

// 生成对象；
var person1 = new Person();
var person2 = new Person();
console.log(person1.sayName === person2.sayName);  // 输出 true；
```

“**原型模式**”是利用了每一个函数所持有的 `prototype` 属性来达到共享属性和方法的目的的。`prototype` 属性是一个指向函数原型对象的指针，在函数的原型对象里包含着所有实例共享的属性和方法（所谓共享，即不会随着对象的实例化产生多个共享属性或方法的副本，而是多个对象共享同一个方法或属性实例）。在原型对象中不仅包含了所有共享的属性和方法，其中还有一个 `constructor` 属性指向了该原型对象所在函数。“**原型模式**”也可以采用如下写法，但需注意该写法会将原型对象中的 `constructor` 属性重置，因此需要手动将其修正，如下所示：

```javascript
// 自定义构造函数；
function Person() {}
Person.prototype = {
  constructor: Person,  // 修正 constructor 指向的值；
  name: "Jason",
  age: 23,
  job: "Engineer",
  sayName: function() {
    console.log(this.name);        
  }
}

// 生成对象；
var person1 = new Person();
```

“**原型模式**”可以解决多个对象实例之间共享属性和方法的问题，即多个对象间共享属性和方法时只产生一份属性和方法的实例。但一般我们并不单独使用“**原型模式**”，因为对于一般的对象实例来说，实例所持有的方法是共享的（所有实例的方法签名和逻辑都是相同的），但是属性却是可以进行自定义的。但是单独使用“**原型模式**”并不能实行对象属性的“本地化”。因此我们将“构造函数模式”和“原型模式”进行组合，产生了“混合模式”，即将对象的函数共享，属性本地化。示例代码如下：

```javascript
// 自定义构造函数，添加本地化属性，每个对象有自己的属性，并不共享；
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

// 在原型对象中添加共享的方法，方法的签名和逻辑在所有对象中保持一致；
Person.prototype = {
  constructor: Person,  // 修正 constructor 指向的值；
  sayName: function() {
    console.log(this.name);        
  }
}

// 生成对象，并调用对象方法；
var person1 = new Person("Anny", 15, "student");
var person2 = new Person("Alice", 29, "teacher");

console.log(person1.name === person2.name);  //输出 false；
console.log(person1.sayName === person2.sayName);  // 输出 true；
```

这种“**混合模式**”是一种比较常用的构造对象的模式，它汲取了“构造函数模式”和“原型模式”各自的优点。下面给出完整的在Js中构建以及封装对象的实例代码，在代码中我们加入了定义静态变量及静态方法的部分。在 JS 中定义静态变量或静态属性可以理解为直接给函数本身添加属性或方法，即添加的属性或方法与函数的 `prototype` 属性处于同一层次，这与通过函数产生的对象没有任何关系。

```javascript
// 自定义构造函数，添加本地化属性，每个对象有自己的属性，并不共享；
function Person(name, age, job) {
  // 定义公有变量；
  if (typeof(name) != "undefined")
    this.name = name;
  if (typeof(age) != "undefined")
    this.age = age;
  if (typeof(job) != "undefined")
    this.job = job;
}

// 定义静态变量；
Person.staticVar = "This is a static variable";
// 定义静态方法；
Person.staticFunc = function() {
  console.log("This is a static function");   
}

// 在原型对象中添加共享的（公有）方法和默认的属性值，方法的签名和逻辑在所有对象中保持一致；
Person.prototype = {
  name: "defaultName",
  age: "defaultAge",
  job: "defaultJob",
  constructor: Person,  // 修正 constructor 指向的值；
  sayName: function() {
    console.log(this.name);        
  },
  getFlag: function() {
    console.log(this.flag);        
  }
};

// 生成对象，传递参数；
var person1 = new Person("Anny", 15, "student");
// 生成对象，不传递参数，使用默认值；
var person2 = new Person();

console.log(person1.name === person2.name);  //输出 false；
console.log(person1.sayName === person2.sayName);  // 输出 true；

// 调用静态方法；
Person.staticFunc();
```

