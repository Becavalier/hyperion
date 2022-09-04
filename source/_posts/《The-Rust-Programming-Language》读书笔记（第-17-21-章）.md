---
title: 《The Rust Programming Language》读书笔记（第 17-21 章）
intro: 书接上回，第 17-21 章的笔记。
comments: false
date: 2021-04-08 23:48:43
tags:
- Rust
---

书接上回，第 17-21 章的笔记。

### Chapter 17 - Object Oriented Programming Features of Rust

58. [Page: 408] Rust 中的 OOP：

* 封装：`struct` / `impl` 结构的封装，与 `pub` 提供的成员可见性控制；
* 继承：**不支持**。对于代码重用，可以使用 trait 的默认实现；
* 多态：**不支持**。Rust 支持 *bounded parametric polymorphism*，即通过泛型（抽象不同类型）与 trait（对类型的限制）实现的与传统多态类似的效果。
* **Rust 不支持传统 OOP 模式的一部分原因**：继承在许多编程语言中已不再是一种编程设计解决方案，因为它经常面临**共享不必要代码的风险**。子类不应该总是共享其父类的所有特征，但是继承会导致该问题，而这会使程序的设计不那么灵活。同时，它还引入了对子类进行调用没有意义，或会导致错误的方法的可能性，因为这些方法不适用于子类。此外，某些语言仅允许子类从一个类继承，从而进一步限制了程序设计的灵活性。由于这些原因，Rust 采用了一种不同的方法，即使用“特征对象”而不是继承。

59. [Page: 412] **Trait Object**：

* 一个 *trait object* 既指向（***object* 需要通过指针引用**）了实现了该 trait 的类型实例，也指向用于在运行时查找该类型上实现的 trait 方法的表；*trait object* 可用于取代泛型或具体类型；
* 相较于单态化（*monomorphized*）的 “*generic struct* + *trait bounds*” 模式，多态化的 “*struct* + *concrete trait objects*” 可以支持在运行时为 *trait objects* 填充多种具体类型；
* 由于会发生**运行时**的 *dynamic dispatch*，因此**会禁用一些诸如 “inline” 等优化，牺牲一定性能**。

```rust
pub trait Draw {
    fn draw(&self);
}

// version 1: generic struct + trait bounds.
// pub struct Screen<T: Draw> {
//     pub components: Vec<T>,
// }
// impl<T> Screen<T> 
//     where T: Draw, {
//         pub fn run(&self) {
//             for component in self.components.iter() {
//                 component.draw(); 
//             }
//         }
//     }

// version 2: struct + trait object.
pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,  // trait object.
}
impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() { 
            component.draw();
        } 
    }
}
```

* ***object-safe*** traits：为了保证一个 *trait object* 是安全的，对于其 *trait* 上定义的所有方法：
  * 返回值类型不能是 *Self*（别名，**指代正在实现该 trait 的类型**）；
  * 不能使用泛型参数。

60. [Page: 419] 实现“面向对象”设计模式：

* **状态模式**（*state pattern*）：一个值的实际行为基于其内部状态对象进行变化，而无法直接从外部进行干预。
  * 含有冗余代码；
  * 状态转换之间有一定耦合。

```rust
pub struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}
impl Post {
    pub fn new() -> Post {
        Post {
            state: Some(Box::new(Draft {})),
            content: String::new(),
        }
    }
    pub fn content(&self) -> &str {
        // get a reference to the value inside the "Option".
        self.state.as_ref().unwrap().content(self)
    }
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }
    pub fn request_review(&mut self) {
        // take the ownership and setup a new one.
        if let Some(s) = self.state.take() {
            self.state = Some(s.request_review());
        }
    }
    pub fn approve(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.approve()) 
        }
    }
}

trait State {
    // the method is only valid when called on a "Box" holding the type.
    fn request_review(self: Box<Self>) -> Box<dyn State>;
    fn approve(self: Box<Self>) -> Box<dyn State>;
    fn content<'a>(&self, post: &'a Post) -> &'a str { "" }
}

struct Draft {}
impl State for Draft {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        Box::new(PendingReview {})
    }
    fn approve(self: Box<Self>) -> Box<dyn State> { 
        self
    }
}

struct PendingReview {}
impl State for PendingReview {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }
    fn approve(self: Box<Self>) -> Box<dyn State> { 
        Box::new(Published {})
    }
}

struct Published {}
impl State for Published {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }
    fn approve(self: Box<Self>) -> Box<dyn State> { 
        self
    } 
    fn content<'a>(&self, post: &'a Post) -> &'a str { 
        &post.content
    }
}
```

* 基于 Rust 的类型系统进行优化：
  * 不再遵循 OOP；
  * 可以直接在编译时减少逻辑上的错误（不同类型有不同的操作）。

```rust
pub struct Post {
    content: String,
}
pub struct DraftPost {
    content: String,
}
impl Post {
    pub fn new() -> DraftPost {
        DraftPost {
            content: String::new(),
        } 
    }
    pub fn content(&self) -> &str { 
        &self.content
    } 
}
impl DraftPost {
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text); 
    }
    pub fn request_review(self) -> PendingReviewPost {
        PendingReviewPost {
            content: self.content, 
        }
    }
}
pub struct PendingReviewPost {
    content: String,
}
impl PendingReviewPost {
    pub fn approve(self) -> Post {
        Post {
            content: self.content,
        } 
    }
}
fn main() {
    let mut post = Post::new();
    post.add_text("I ate a salad for lunch today");
    let post = post.request_review();
    let post = post.approve();
    assert_eq!("I ate a salad for lunch today", post.content()); 
}
```

### Chapter 18 - Patterns and Matching

61. [Page: 433] 一个“模式”包含对下面这些元素的组合：

* 字面量值；
* 数组、枚举、struct 或元组的解构；
* 变量；
* 通配符；
* 占位符。

62. [Page: 436] Rust 中的几种模式匹配场景：

*while...let*：**条件循环**；

```rust
fn main() {
    let mut stack = Vec::new();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    while let Some(top) = stack.pop() {
        println!("{}", top);
    }
}
```

* *for...in*：

```rust
fn main() {
    let v = vec!['a', 'b', 'c'];
    // the pattern is "(index, value)".
    for (index, value) in v.iter().enumerate() { 
      println!("{} is at index {}", value, index);
    }
}
```
* *let* 表达式：本质上为 `let PATTERN = EXPRESSION;`。
* 函数（或闭包）参数：

```rust
fn print_coordinates(&(x, y): &(i32, i32)) { 
    println!("Current location: ({}, {})", x, y);
}
fn main() {
    let point = (3, 5); 
    print_coordinates(&point);
}
```

63. [Page: 439] **Refutability**：

* *refutable*：对某些可能的值，模式匹配可能会失败。

```rust
if let Some(x) = a_value {}
```

* *irrefutable*：可以匹配任何传入的可能值。以下场景需使用该类型模式匹配：
  * 函数参数；
  * `let` 语句；
  * `for` 循环语句。

```rust
let x = 5;
```

64. [Page: 442] **模式匹配语法**：

* 匹配字面量值：

```rust
let x = 1;
match x {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```

* 匹配命名变量：

```rust
let x = Some(5); 
let y = 10;
match x {
    Some(50) => println!("Got 50"),
    // this newly introduced variable "y" will shadow the outer one.
    Some(y) => println!("Matched, y = {:?}", y), 
    _ => println!("Default case, x = {:?}", x),
}
println!("at the end: x = {:?}, y = {:?}", x, y);
```

* 多模式匹配：

```rust
let x = 1;
match x {
    // match 1 or 2.
    1 | 2 => println!("one or two"), 
    3 => println!("three"),
    _ => println!("anything"),
}
```

* 匹配范围：`..=`
  * 仅支持数字值或字符值。

```rust
let x = 5;
match x {
    // match value within [1, 5].
    1..=5 => println!("one through five"), 
    _ => println!("something else"),
} 
let y = 'c';
match y {
    'a'..='j' => println!("early ASCII letter"), 
    'k'..='z' => println!("late ASCII letter"), 
    _ => println!("something else"),
}
```

* 解构 struct：

```rust
struct Point {
    x: i32,
    y: i32,
}
fn main() {
    let p = Point { x: 0, y: 7 };
    // shorthand.
    let Point { x, y } = p;
    assert_eq!(0, x); 
    assert_eq!(7, y);

    // destructure with literal values as part of the struct pattern.
    match p {
        Point { x, y: 0 } => println!("On the x axis at {}", x),
        Point { x: 0, y } => println!("On the y axis at {}", y),
        Point { x, y } => println!("On neither axis: ({}, {})", x, y),
    }
}
```

* 解构 enum：

```rust
enum Color {
    Rgb(i32, i32, i32),
    Hsv(i32, i32, i32),
}
struct Upgrade {
    id: i32, time: i32
}
enum Message {
    Quit,
    Move { x: i32, y: i32, },
    Write(String),
    ChangeColor(Color),
    Upgrade(Upgrade)
}
fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));
    match msg {
        Message::Quit => {}
        Message::Move { x, y } => {}
        Message::Write(str) => {}
        Message::ChangeColor(Color::Hsv(h, s, v)) => {}
        Message::ChangeColor(Color::Rgb(r, g, b)) => {}
        Message::Upgrade(Upgrade { id, time }) => {}
    }
}
```

65. [Page: 449] **忽略模式中的部分值**：

* 忽略函数定义的某个参数：

```rust
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {}", y);
}
fn main() {
    foo(3, 4);
}
```

* 忽略复合语句中的某个值：

```rust
let mut setting_value = Some(5); 
let new_setting_value = Some(10);
match (setting_value, new_setting_value) { 
    (Some(_), Some(_)) => {
        println!("Can't overwrite an existing customized value");
    }
    _ => {
        setting_value = new_setting_value;
    } 
}
println!("setting is {:?}", setting_value);
```

* 忽略集合中的多余值：`..`。

```rust
struct Point {
    x: i32,
    y: i32,
    z: i32, 
}
let origin = Point { x: 0, y: 0, z: 0 };
match origin {
    Point { x, .., z } => println!("x is {}, z is {}", x, z),
}
```

66. [Page: 453] **Match Grard**：在 match-arm 中可以额外使用的 *if* 关键字；在进行匹配时，该 *if* 所表达的条件也需要被匹配。

```rust
let num = Some(4);
match num {
    Some(x) if x < 5 => println!("less than five: {}", x), 
    Some(x) => println!("{}", x),
    None => (),
}
```

67. [Page: 455] `@` 绑定：

```rust
enum Message {
    Hello { id: i32 },
}
let msg = Message::Hello { id: 5 };
match msg {
    Message::Hello {
        id: id @ 3..=7,  // create a variable "id" that holds a value of the tested value.
    } => println!("Found an id in range: {}", id), 
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    }
    Message::Hello { id } => println!("Found some other id: {}", id), 
}
```

### Chapter 19 - Advanced Features

68. [Page: 457] 不安全的 Rust：

* unsafe 不会禁用 Rust 固有的诸如 borrow-checker 等安全检查；使用 unsafe 关键字只能使我们访问五个特殊的 cases，编译器将不会检查这五个 cases 下的内存安全性。

\- ***解引用一个原始指针***：

* 原始指针：`*const T` 与 `*mut T`；
  * 忽略“借用规则”，允许在一个位置同时拥有可变与不可变指针，或拥有多个可变指针；
  * 不保证会指向有效的内存；
  * 值可以为 *null*（由标准库的包装类 *std::ptr::null()* 提供）；
  * 不会实现任何自动清理（比如 `Box<T>`）。

```rust
fn main() { 
    let mut num = 5;
    // let r1: *const i32 = &num;
    // let r2: *mut i32 = &mut num;
    let r1 = &num as *const i32;  // immutable raw pointer.
    let r2 = &mut num as *mut i32;  // mutable raw pointer.
    let r3 = &mut num;
    unsafe {
        println!("{}", *r1);
        println!("{}", *r2);
        println!("{}", r3);
    }
}
```

\- ***调用不安全的函数或方法***：

```rust
fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) { 
    let len = slice.len();
    let ptr = slice.as_mut_ptr();
    assert!(mid <= len);
    unsafe { 
        (
            std::slice::from_raw_parts_mut(ptr, mid),
            // move raw pointer forward.
            std::slice::from_raw_parts_mut(ptr.add(mid), len - mid), 
        )
    } 
}
```

* FFI（Foreign Function Interface）：

```rust
// a Rust function can be called from C, used by compiling to a shared library and linked from C.
#[no_mangle]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
extern "C" {
    fn abs(input: i32) -> i32;
}
fn main() { 
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

\- ***访问或修改可变的静态变量***：

* 即“全局变量”，在 Rust 中被称为“静态变量”；
* 访问和修改可变静态变量是不安全的，因为其在多线程情况下可能导致数据竞争。

```rust
static mut COUNTER: u32 = 0;
fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}
fn main() { 
    add_to_count(3);
    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}
```

\- ***实现不安全的 trait***：

```rust
unsafe trait Foo {}
unsafe impl Foo for i32 {}
```

\- ***访问 Union 中的字段***：同 C/C++ 中的 *union* 类似。

```rust
union MyUnion {
    f1: u32,
    f2: f32,
}
fn main() { 
    let u = MyUnion { f1: 1 };
    let f = unsafe {
        println!("{}", u.f1);
    };
}
```

69. [Page: 467] **高级 Traits**：

\- ***使用 Associated Types 为 trait 指定“占位”类型***：

* Associated Types 将类型占位符与 trait 连接在一起，以便 *trait method* 的定义可以在其签名中使用这些占位符类型。**trait 的实现者将指定用于特定实现的该类型场景中要使用的具体类型**。这样，我们可以定义使用某些类型的 trait，而无需确切了解这些类型是什么，直到实现该 trait；
* ***为什么不使用泛型 trait 来实现？***主要由于：
  * 从写法上，使用泛型 trait 在调用 trait 方法时需要显式指定类型；
  * 将类型强绑定到 trait，会导致可以为 struct 实现不同泛型的 trait，这样 trait 的具体类型与 struct 的类型会由两部分来共同指定（违背 “*the truth of source*” 原则）。因此两个类型统一由 struct 的实现来指定则更加方便（写法上）和统一。

```rust
// trait "Iterator" from std.
pub trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>; 
}
```

\- ***默认泛型类型参数与运算符重载***：

* 位于 `std::ops` 下的 trait 的默认行为可以被覆写，这些 trait 有关于一些基本运算符在不同类型上的行为。**默认情况下，运算符的 “Rhs” 操作数与实现对应 trait 的类型相同**；
* 使用“默认泛型类型参数”的目的：
  * 可以减少一些模板代码的编写；
  * 用于对已有的 trait 进行扩展（如：已有 trait 仅针对固定类型，而扩展想要为其增加更多类型的支持），而不破坏已经实现的功能。

```rust
use std::ops::Add;

// the "Rhs" of the Add operation is the the type we’re implementing Add on.
// trait Add<Rhs=Self> {  
//     type Output;
//     fn add(self, rhs: Rhs) -> Self::Output; 
// }

#[derive(Debug, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}
// impl Add<Point> for Point { ...
impl Add for Point {  // the default "Rhs" would be the "Point".
    type Output = Point;  // determines the type returned from the add method.
    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}
fn main() { 
    assert_eq!(
        Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
        Point { x: 3, y: 3 }
    )
}
```

\- ***用于消除歧义的语法：调用具有相同名称的方法***。

* 对于 *method*：

```rust
trait Pilot {
    fn fly(&self);
}
trait Wizard {
    fn fly(&self);
}
struct Human;
impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}
impl Wizard for Human {
    fn fly(&self) {
        println!("Up.");
    }
}
impl Human {
    fn fly(&self) {
        Wizard::fly(self);
        println!("*waving arms furiously*");
    }
}
fn main() { 
    let person = Human; 
    Pilot::fly(&person);
    Wizard::fly(&person);
    Human::fly(&person);
    person.fly();
}
```

* 对于 *associated function*：

```rust
trait Animal {
    fn baby_name() -> String;
}
struct Dog;
impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}
impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}
fn main() { 
    // use "fully qualified syntax" to point out which one we want to call.
    println!("A baby dog is called a {}", <Dog as Animal>::baby_name());
}
```

\- ***一个 trait 的实现依赖于另一个 trait 提供的功能***：

* 一个 trait 实现所依赖的另一个 trait 被称为 “*supertrait*”。

```rust
use std::fmt;
// the "OutlinePrint" trait requires "fmt::Display" trait.
trait OutlinePrint: fmt::Display { 
    fn outline_print(&self) {
        let output = self.to_string();  // call the method defined on the "fmt::Display" trait.
        let len = output.len(); 
        println!("{}", "*".repeat(len + 4)); 
        println!("*{}*", " ".repeat(len + 2)); 
        println!("* {} *", output); 
        println!("*{}*", " ".repeat(len + 2)); 
        println!("{}", "*".repeat(len + 4));
    } 
}
struct Point {
    x: i32,
    y: i32, 
}
impl OutlinePrint for Point {}
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y) 
    }
}
fn main() { 
    Point { x: 1, y: 1 }.outline_print();
}
```

\- ***在外部类型上“实现”外部 trait***：

* 可以借助 *newtype pattern* 来“打破” trait 定义的“孤儿法则（triat 的定义或者类型的定义，二者之一必须在本地，才可以为某个类型实现某个 *triat*）”；
* 此处的 *newtype pattern* 只是一个 workaround，意味着<b>其添加的行为只会影响 *newtype*，而无法实际影响外部的类型</b>。

```rust
use std::fmt;
use std::ops::Deref;
struct Wrapper(Vec<String>);
impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", ")) 
    }
}
impl Deref for Wrapper {
    type Target = Vec<String>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]); 
    println!("w = {}", w);
    println!("{}", w.join(" | "));  // call the methods on the warpped value (by implementing "Defer").
}
```

70. [Page: 479] **高级类型**：

\- ***使用“类型别名”创建同义类型***：

* 用于为复杂类型起“别名”，以使代码编写更加清晰；

```rust
// an example from the std::io module.
// type Result<T> = std::result::Result<T, std::io::Error>;
type Kilometers = i32;  // a type alias for i32.
let x: i32 = 5;
let y: Kilometers = 5;
println!("x + y = {}", x + y);
```

\- ***Never 类型***：`!`。

* 在“类型论”中，`!` 类型被称为“空类型（*empty type*）”，不产生任何值；
* 可用于表示一个函数，**在调用后永不返回**（*diverging functions*）；
* `!` 类型**可以被强制转换为其他任何类型**；
* 常见的 `loop {}` \ `panic!` \ `continue` 等表达式的返回值都为 `!` 类型。

\- ***动态大小类型（DSTs）与 `Sized` trait***：

* 这些类型的内存占用大小只能在运行时得知，比如 *str* 类型；
* 动态大小类型使用的黄金法则：**必须始终将动态大小类型的值放在某种类型的指针后面**，如：*&*、*Box\<T\>*、*Rc\<T\>* 等；
* 默认情况下，所有泛型默认情况下都实现了 *Sized* trait，意味着需要编译时知道该类型的具体大小。某些情况下，可以通过特殊的 `?Sized` 语法**放宽**这个要求。

```rust
fn generic<T>(t: T) {}
fn generic<T: Sized>(t: T) {}  // by default, the size of T should be known at compile time.
// "T may or may not be Sized" (this syntax only works for the Sized trait).
fn generic<T: ?Sized>(t: &T) {}  
```

71. [Page: 486] **高级函数与闭包**：

\- ***函数指针***：

* 用关键字 `fn` 标识；
* 默认实现了所有 *Fn*，*FnMut*，*FnOnce* 三个闭包 trait，因此**函数指针可以传递给接受闭包作为参数的函数**。

```rust
fn add_one(x: i32) -> i32 {
    x + 1
}
// accept a function pointer.
fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}
fn main() {
    let answer = do_twice(add_one, 5);
    println!("The answer is: {}", answer);
}
```

* 鉴于 *tuple struct* 的初始化方式与函数调用相似，因此某些场景下也可以直接使用其来替代函数或闭包的行为。

```rust
enum Status {
    Value(u32),
    Stop, 
}
let list_of_statuses: Vec<Status> = (0u32..20).map(Status::Value).collect();
```

\- ***返回闭包（函数）***：

```rust
// we can return a function pointer directly.
fn returns_function() -> fn(i32) -> i32 { 
    |x| x + 1
}
// closures are represented by traits, so we can’t return closures directly.
fn returns_closure() -> Box<dyn Fn(i32) -> i32> { 
    Box::new(|x| x + 1)
}
```

72. [Page: 489] **宏**：

* 使用 `macro_rules!` 的声明式宏（***未来将不推荐使用***）；
* 使用 `#[derive]` 的自定义宏，可以使用在 *strcut* 与 *enum* 上；
* “类属性宏”，用于在任意条目上定义自定义属性；
* “类函数宏”，使用方式类似函数，操作于传入的“符号”上。

73. [Page: 490] **声明式宏**：

```rust
#[macro_export]
macro_rules! vec {
    // similar to the "match" expression.
    // captures values that match the pattern within the parentheses.
    // "$x:expr" matches any Rust expression and gives the expression the name $x.
    ( $( $x:expr ), * ) => {
        // $x pattern matches three times with 1, 2 and 3.
        {
            let mut temp_vec = Vec::new();
            // generated for each part that matches $() in the pattern zero or more times.
            $(
                temp_vec.push($x);
            )*
            // temp_vec.push(1); 
            // temp_vec.push(2); 
            // temp_vec.push(3);
            temp_vec
        }
    };
}
fn main() {
    let v: Vec<u32> = vec![1,2, 3];
    println!("{:#?}", v);
}
```

74. [Page: 492] **用于从属性生成代码的“过程式宏”**：

* 目前，**过程式宏仅能实现在其自己的独立 crate 中**。


```rust
// the definition of the trait.
pub trait HelloMacro {
    fn hello_macro();
}
```

```rust
// the definition of the macro for the trait.
extern crate proc_macro;
// the compiler’s API that allows us to read and manipulate Rust code.
use proc_macro::TokenStream; 
// turns "syn" data structures back into Rust code.
use quote::quote;
// parses Rust code from a string into a data structure.
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // construct a representation of Rust code as a syntax tree 
    // that we can manipulate
    let ast = syn::parse(input).unwrap();
    // Build the trait implementation
    impl_hello_macro(&ast) 
}
fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    // the name of the struct implementing this trait.
    let name = &ast.ident;
    // define the Rust code that we want to return.
    let gen = quote! {
        impl HelloMacro for #name { 
            fn hello_macro() {
                // converting "#name" to a string literal at compile time.
                println!("Hello, Macro! My name is {}!", stringify!(#name));
            }
        } 
    };
    gen.into()
}
```

```rust
// the usage of the macro.
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;

#[derive(HelloMacro)]
struct Pancakes;
fn main() { 
    Pancakes::hello_macro();
}
```

75. [Page: 498] **类属性宏**：

* 允许创建除 *derive* 以外新的属性，更加灵活。

```rust
// the usage of the attribute-like macro.
#[route(GET, "/")]
fn index() {}
```

```rust
// the definition of the macro.
// the first parameter is for the contents of the attribute: the [GET, "/"] part.
// the second is the body of the item the attribute is attached to, namely [fn index() {}].
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {}
```

76. [Page: 499] **类函数宏**：

* 使用方式同函数调用类似。比 `macro_rules!`（仅支持类 *match* 模式）的宏方式更加灵活。

```rust
// the usage of the function-like macro.
let sql = sql!(SELECT * FROM posts WHERE id=1);
```

```rust
// the definition of the macro.
// receive the tokens that are inside the parentheses and return the code we wanted to generate.
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {}
```

### Chapter 20 - Final Project: Building a Multithreaded Web Server

（略）

### Chapter 21 - Appendix

77. [Page: 544] **Raw Identifier**：

* 一种特殊语法，可以使我们**使用语言关键字作为标识符**；
* 一般仅用于代码库的“前向兼容”。

```rust
fn r#match() {
    println!("the function name is called {}", "match");
}
fn main() {
    r#match();
}
```

78. [Page: 551] **可继承的 traits**：

* `Debug`：可以在格式化字符串中使用调试格式 “*{:?}*”，以检查值的具体结构；
* `PartialEq`：可以使类型实例进行相等性比较（`==`、`!=`）；
* `Eq`：没有实现。其目的是用于表明每个被标记类型的值都等于其自身，既满足 “*equivalence relations*（自反性、对称性、传递性）”。而如“浮点数（如 NaN）”则不满足该关系，因此浮点数需要实现 PartialEq 而非 Eq；
* `PartialOrd`（依赖 PartialEq）：可以使类型实例之间进行比较，以便于进行排序（`<`、`>=`）；比较的结果不一定存在（可能为 *None*）。
* `Ord`（依赖 PartialOrd 与 Eq）：用于告知对于被标记类型的任何两个值，一定存在有效的**全序**（*total order*，即任何一对元素都是可相互比较的）。即对于集合 X 中的所有元素 a、b 和 c，存在：
  * **反对称性**：若 a <= b 且 b <= a，则 a = b；
  * **传递性**：若 a <= b 且 b <= c，则 a <= c；
  * **完全性**（蕴含“自反性”，如 “a <= a”）：a <= b 或 b <= a。
* `Clone`：允许显式创建值的深层副本，并且复制过程可能涉及运行任意代码和复制堆数据；
* `Copy`：允许仅复制存储在堆栈中的位来复制值（如指针）；
* `Hash`：允许获取任意大小类型的实例，并使用哈希函数将该实例映射到固定大小的值；
* `Default`：允许为类型创建默认值。

79. [Page: 555] **相关工具**：

* *rustfmt*：代码格式化。运行 `cargo fmt` 以格式化整个项目中的代码；
* *rustfix*：自动修复编译器警告。运行 `cargo fix` 以进行自动修复；
* *clippy*：包含一系列 Linter，可以分析代码，以便捕获常见错误并改进 Rust 代码。运行 `cargo clippy` 以进行自动优化。
