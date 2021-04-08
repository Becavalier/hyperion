---
title: 《The Rust Programming Language》读书笔记（第 11-1 章）
intro: 书接上回，第 11-10 章的笔记。
comments: true
date: 2021-04-01 18:07:48
tags:
- Rust
---

书接上回，第 11-10 章的笔记。

### Chapter 11 - Writing Automated Tests

30. （Page：223）如何编写**测试脚本**：

* 一个测试函数通常执行**三个动作**：
  * 设置需要的状态或数据；
  * 运行需要测试的代码；
  * 对得到的结果进行断言测试，以确定其符合预期。
* 当使用 `cargo new --lib` 创建新的库项目时，**Rust 会默认生成一个测试 mod**，可以用来存放测试相关代码；
* `cargo test` 会运行所有被标记为 `#[test]` 的函数；
* 默认情况下，**所有的测试函数会通过线程并行执行**。

```rust
mod lib {
    use std::fmt;
    #[derive(Debug)]
    pub struct Rectangle {
        width: u32,
        height: u32,
    }
    impl Rectangle {
        pub fn can_hold(&self, other: &Rectangle) -> bool {
            self.width > other.width && self.height > other.height
        }
        pub fn new(width: u32, height: u32) -> Rectangle {
            Rectangle { width, height }
        }
    }
    impl fmt::Display for Rectangle {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            write!(f, "({}, {})", self.width, self.height)
        }
    }
}

// export to external env.
pub use lib::Rectangle; 

#[cfg(test)]
mod tests {
    use super::*;
    #[test]  // indicate the next function is for test.
    fn it_works() {
        assert_eq!(2 + 2, 4);
        assert_ne!(2 + 3, 4);
    }
    #[should_panic(expected = "it panics!")]  // makes a test pass if the code inside the function panics.
    #[test]
    fn it_panics() {
        panic!("it panics!");
    }
    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle::new(8, 7);
        let smaller = Rectangle::new(5, 1);
        // with custom failure messages.
        assert!(larger.can_hold(&smaller), "{}-{}", larger, smaller);
    }
    #[test]
    fn with_result() -> Result<(), String> {  // we can use error-propagation way(?) here.
        if 2 + 2 == 4 {
            Ok(())  // test passed.
        } else {
            Err(String::from("two plus two does not equal four!"))  // test failed.
        }
    }
}
```

31. （Page：241）**控制测试的运行**：

* 设置可以使用的**测试线程数量**：`cargo test -- --test-threads=<num>`；
* 默认情况下，**在成功的测试 case 中输出的内容（*printed-value*）不会显示在控制台中**，可以使用命令 `cargo test -- --show-output` 让 Rust 将该内容打印；
* 执行**单个**测试函数：`cargo test <full_function_name>`；
* 执行**多个**测试函数（模糊匹配）：`cargo test <partial_function_name/partial_mod_name>`；
* 默认忽略执行某些测试函数：使用 `#[ignore]` 属性。若想同时执行所有这些被默认忽略的测试函数，可以通过 `cargo test -- --ignored`（可以添加函数名来分别执行）。

```rust
#[test]
#[ignore]
fn expensive_test() {}
```

32. （Page：248）测试体系：

\- ***单元测试***：

* 小且专注；
* 每次单独测试一个模块，并且**可以测试私有接口**。
* 一般**在每个源代码文件内部直接编写**，测试函数放置于 `mode test {}` 模块内部。该模块带有属性 `#[cfg(test)]` 用来告知 Rust 编译器仅在执行测试时运行该模块中的代码，并且在编译生成二进制文件时，忽略测试代码。***cfg* 表示 “configuration”**。

\- ***集成测试***：

* 只有 Library Crates 可以使用；
* 独立于库代码；
* 使用库暴露出的公有接口；
* 测试时可能跨越多个模块；
* 测试脚本需要放置于与 src 同级的 “tests” 文件夹内，**每个脚本文件会被编译成独立的 crate**；
* 仅执行集成测试：`cargo test --test integration_test <partial_function_name>`；

```rust
// a case of integration test file.
use my_test_lib::*;

#[test]
fn larger_can_hold_smaller() {
    let larger = Rectangle::new(8, 7);
    let smaller = Rectangle::new(5, 1);
    // with custom failure messages.
    assert!(larger.can_hold(&smaller), "{}-{}", larger, smaller);
}
```

* 集成测试需要的**公共代码需要放到特定的 *tests/common/mod.rs* 文件中**，使用时通过 `mod` 将该模块内容引入所在测试脚本文件。

```rust
mod common;
// ...
```

### Chapter 12 - An I/O Project: Building a Command Line Program

33. （Page：268）基本代码（Monolithic）：

\- ***src/main.rs***：

```rust
// src/main.rs
use std::env;
use std::process;
use minigrep::Config;

fn main() {
    // "unwrap_or_else" allows us to define some non-panic error handling.
    // "env::args()" returns an iterator.
    let config = Config::new(env::args()).unwrap_or_else(|err| {
        // closure (anonymous function).
        eprintln!("Problem parsing arguments: {}", err);
        process::exit(1);
    });
    if let Err(e) = minigrep::run(config) {
        // prints to the standard error stream.
        eprintln!("Application error: {}", e);
        process::exit(1);
    }
}
```

\- ***src/lib.rs***：

```rust
// src/lib.rs
use std::error::Error;
use std::fs;
use std::env;

// the function will return a type that implements the "Error" trait,
// but we don’t have to specify what particular type the return value will be.
pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
  // propagate errors.
  let contents = fs::read_to_string(config.filename)?;
  let results = if config.case_sensitive {
    search(&config.query, &contents)
  } else {
    search_case_insensitive(&config.query, &contents)
  };
  for line in results {
    println!("{}", line);
  }
  // we’re calling "run" for its side effects only.
  Ok(())
}

pub struct Config {
  pub query: String,
  pub filename: String,
  pub case_sensitive: bool,
}

impl Config {
  pub fn new(mut args: env::Args) -> Result<Config, &'static str> {
      args.next();  // skip the filename.
      let query = match args.next() {
          Some(arg) => arg,
          None => return Err("Didn't get a query string"),
      };
      let filename = match args.next() {
          Some(arg) => arg,
          None => return Err("Didn't get a file name"),
      };
      let case_sensitive = env::var("CASE_INSENSITIVE").is_err();
      Ok(Config {
        query, filename, case_sensitive,
      })
  }
}

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents.lines().filter(|line| line.contains(query)).collect()
}

pub fn search_case_insensitive<'a>(
  query: &str, 
  contents: &'a str,
) -> Vec<&'a str> {
  // will return a String, rather than string slice.
  let query = query.to_lowercase();
  let mut results = Vec::new();
  // "lines()" returns an iterator.
  for line in contents.lines() {
    if line.to_lowercase().contains(&query) {
      results.push(line);
    }
  }
  results
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn one_result() {
    let query = "duct";
    let contents = "\
Rust:
safe, fast, productive.
Pick three.
Duct tape.";
    assert_eq!(vec!["safe, fast, productive."], search(query, contents));
  }

  #[test]
  fn case_insensitive() {
    let query = "rUsT";
    let contents = "\
Rust:
safe, fast, productive.
Pick three.
Trust me.";
    assert_eq!(
      vec!["Rust:", "Trust me."], 
      search_case_insensitive(query, contents)
    );
  }
}
```

34. （Page：）**TDD**（Test-Driven Development）的基本实施步骤：

* 编写一个会导致失败的测试，并确定其失败原因符合预期；
* 添加或修改实现代码使得该测试可以通过；
* 重构上一步中新添加的代码或修改的代码，同时保证测试持续通过；
* 重复第一步。

### Chapter 13 - Functional Language Features: Iterators and Closures

35. （Page：288）**闭包**（Closure）：

* 即“**匿名函数**”（与 C++ 中的 Lambda 类似），可以赋值给变量、作为参数或返回值；
* 普通函数通常需要被作为公共接口，从而提供给外部用户使用，因此需要类型注解；而闭包通常仅用于非暴露的内部代码，且作为匿名函数使用。不仅如此，闭包实现通常较短且仅与其定义上下文的一小块逻辑相关联，因此**编译器可以可靠地自动推断闭包函数的输入参数与返回值的类型**；

```rust
fn add_one_v1 (x:u32) -> u32 { x + 1 }  // function definition.
let add_one_v2 = |x: u32| -> u32 { x + 1 };  // the rests are closure definition.
let add_one_v3 = |x| { x + 1 }; 
let add_one_v4 = |x| x + 1 ;
```

* 可以**捕获**其定义所在作用域内的其他变量值。在捕获时，闭包会使用**额外的内存**来存放捕获的变量值。闭包可以使用三种方式来捕获外界的变量：
  * `FnOnce`：将捕获变量的**所有权转移到闭包中**，比如使用 `move` 标记的闭包（所有闭包默认均实现，一般仅能被执行一次）；
  * `FnMut`：以“**可变引用**”的方式捕获外界变量；
  * `Fn`：以“**不可变引用**”的方式捕获外界变量。

```rust
fn main() {
    let x = vec![1, 2, 3];
    let equal_to_x = move |z| z == x;  // the value of "x" has been moved into the closure.
    let y = vec![1, 2, 3];
    assert!(equal_to_x(y));
}
```

* 每个闭包实例都有自己独一无二的的匿名类型，即使两个闭包有同样的签名，它们的类型也并不相同。为了定义可以容纳闭包的集合，可以使用 `Fn` \ `FnMut` \ `FnOnce` traits，

```rust
// memoization.
struct Cacher<T>
where T: Fn(u32) -> u32, {
  calculation: T,
  value: Option<u32>,
}

impl<T> Cacher<T> 
where T: Fn(u32) -> u32, {
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            calculation,
            value: None,
        }
    }
    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(v) => v,
            None => {
                let v = (self.calculation)(arg);
                self.value = Some(v);
                v
            }
        }
    }
}
```

36. （Page：303）**迭代器**（Iterator）：

* 允许**按顺序**对一个序列中的元素依次进行处理；
* Rust 中的迭代器是 “**lazy**” 的，即在每一次调用 `next()` 时（显式/隐式）才会返回集合中的元素。***for-in* 语句会转移迭代器对象的所有权**；

```rust
fn main() {
    let v1 = vec![1, 2, 3];
    let v1_iter = v1.iter();  // return an iterator for v1.
    for val in v1_iter {
        println!("{}", val);
    }
}
```

* 所有迭代器都实现了标准库中定义的 *Iterator* trait，以及对应的 `next()` 方法。集合的三种迭代器类型：
  * `iter()`：返回**不可变引用**；
  * `iter_mut()`：返回**可变引用**；
  * `into_iter()`：返回**集合元素的所有权**。
* 当迭代器被“**用尽**（*consuming out*）”后，无法再被重复使用。

```rust
fn main() {
    let mut x = vec![1, 2, 3];
    let v1_iter = x.iter();
    for &val in v1_iter {
        // got immutable references to the values inside "x".
        println!("{}", val);
    }
    let mut v2_iter = x.iter_mut();
    if let Some(v) = v2_iter.next() {  // pattern matching.
        // got mutable references.   
        *v = 100;  // dereference and assign.
    }
    let v3_iter = x.into_iter();
    for val in v3_iter {
        // take the ownership of the values.
        println!("{}", val);
    }
    // println!("{:#?}", x);  // panic!.
}
```

* 可以通过 *iterator adaptor* 将一个迭代器转换为另一种迭代器。通过这种方式，可以“串联”起多个适配器以对集合中的数据进行不同的转换：

```rust
fn main() {
    let v1: Vec<i32> = vec![1, 2, 3];
    // the iterator adaptor is lazy.
    let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();
    println!("{:#?}", v2);
}
```

* 结合使用迭代器与闭包：

```rust
#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_my_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    // capture the surrounding parameter.
    shoes.into_iter().filter(|s| s.size == shoe_size).collect()
}
```

* **自定义迭代器**：为自定义类型实现 `Iterator` trait；

```rust
struct Counter {
    count: u32,
}
impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}
impl Iterator for Counter {
    type Item = u32;  // the iterator will return u32.
    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}
fn main() {
    let counter = Counter::new();
    let c = counter.iter();
    let counter_v: Vec<_> = counter.map(|x| x + 1).collect();
    println!("{:#?}", counter_v);
}
```

* 迭代器是 Rust 众多“**零开销抽象**（*zero-cost abstractions*）”特性之一，因此相较于使用手写的循环实现，**使用迭代器不会产生额外的性能开销**（C++ 实现类似）；

### Chapter 14 - More About Cargo and Crates.io

37. （Page：）
38. （Page：）
39. （Page：）
40. （Page：）
41. （Page：）
42. （Page：）
43. （Page：）
