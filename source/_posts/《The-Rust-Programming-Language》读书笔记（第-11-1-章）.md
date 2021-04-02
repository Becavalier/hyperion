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
    // "env::args()" returns an iterator.
    let args: Vec<String> = env::args().collect();
    // "unwrap_or_else" allows us to define some non-panic error handling.
    let config = Config::new(&args).unwrap_or_else(|err| {
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
  // can accept any of Collection types.
  pub fn new(args: &[String]) -> Result<Config, &str> {
      if args.len() < 3 {
          return Err("not enough arguments!");
      }
      let query = args[1].clone();
      let filename = args[2].clone();
      let case_sensitive = env::var("CASE_INSENSITIVE").is_err();
      Ok(Config { query, filename, case_sensitive, })
  }
}

pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
  let mut results = Vec::new();
  // "lines()" returns an iterator.
  for line in contents.lines() {
    if line.contains(query) {
      results.push(line);
    }
  }
  results
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

### Chapter 12 - Functional Language Features: Iterators and Closures

35. （Page：）
36. （Page：）
37. （Page：）
38. （Page：）
39. （Page：）
40. （Page：）
41. （Page：）
42. （Page：）
43. （Page：）
