---
title: 《The Rustonomicon》读书笔记
intro: “The Dark Arts of Unsafe Rust”。
comments: true
date: 2021-04-13 00:56:32
tags:
- Rust
---

“The Dark Arts of Unsafe Rust”。

### Chapter 1 - Meet Safe and Unsafe

1. （Page：3）可以使用编译器标记 `#![forbid(unsafe_code)]` 来表明仅允许使用安全（非 `unsafe`）的 Rust 语言特性。
2. （Page：4）**为何可以在 Rust 中引用临时值**（即 C++ 中的“右值”）？

* 表达式的**临时作用域**是用于临时变量的一个范围，该临时变量在环境上下文中使用时将保留该表达式的结果，除非将其进行常量传播（当可以在不更改运行时行为的情况下将表达式以常量写入，借用并在原始写入表达式的位置解引用该借用时，将值表达式提升为 “`'static`” 插槽）。除了 *lifetime* 扩展外，表达式的临时作用域是包含该表达式的最小作用域；
* 由于 “*temporary lifetime extension*” 机制的存在，**`let` 语句中表达式的临时作用域有时会扩展到包含 `let` 语句的块的范围**。当基于某些句法规则，导致通常的临时作用域太小时，便会执行此操作。

```rust
let x = &mut 0;
// Usually a temporary would be dropped by now, but the temporary for `0` lives to the end of the block.
*x = 1;
println!("{}", x);  // 1.
```

3. （Page：4）Rust 中一些**常见的 unsafe 函数或 trait**：

* `slice::get_unchecked`：在不进行边界检查的情况下，**返回对一个元素或子序列的引用**。当索引的位置超出集合大小时，其行为是未定义的，因此对于传入的索引值要提前确认其是否有效。

```rust
fn main() {
    let x = [1, 2, 4];
    unsafe {
        assert_eq!(x.get_unchecked(1), &2);
    }
}
```

* `mem::transmute`：重新按照给定类型来解释值（按位）；其行为与 C 中的 `memcpy` 类似。该方法在某些情况下不具备可移植性，比如**某些机器上的函数指针与数据指针其大小可能不同**。一个例子：将指针转换为函数指针：

```rust
fn main() {
    fn foo() -> i32 {
        0
    }
    // "*const ()" is similar to "const void*" in C/C++.
    let pointer = foo as *const ();
    let function = unsafe {
        std::mem::transmute::<*const (), fn() -> i32>(pointer)
    };
    assert_eq!(function(), 0);
}
```

* 每一个指向“可变类型”的原始指针都有一个 `offset` 方法，可以通过该方法来移动指针（同 C/C++ 对指针的增减类似）。当访问位置超出有效内存时，其行为是未定义的。

```rust
fn main() {
    let s: &str = "123";
    let ptr: *const u8 = s.as_ptr();

    unsafe {
        println!("{}", *ptr.offset(1) as char);
        println!("{}", *ptr.offset(2) as char);
    }
}
```

* FFI 方法；
* *marker trait* `Send`：保证实现该 trait 的实体可以被安全地转移（move）到其他线程；
* *marker trait* `Sync`：保证实现该 trait 的实体可以通过引用，被安全地在多个线程间共享；
* *trait* `GlobalAlloc`：可用于自定义内存分配器。

4. （Page：6）unsafe 的能力：

* 解引用原始指针；
* 调用 unsafe 方法（包括 C 方法，编译器 intrinsics，以及原始分配器）；
* 实现 unsafe traits；
* 改变 static 静态全局变量的值；
* 访问 union 中的字段。

5. （Page：9）unsafe 操作的合理性必然取决于通过其他 “safe” 操作建立的状态。

### Chapter 2 - Data Representation in Rust

6. （Page：10）**对齐**：

* 所有类型都有以“字节”为单位的对齐要求。最小的对齐要求为 1 字节，其他大小均须为 2 的整数次幂个字节；**Primitives 类型（整数、浮点数、布尔值，以及字符值）通常对齐到它们类型本身的大小**（当然也受到具体平台的限制）。类型的大小必须始终是其对齐字节的倍数（如 *struct*），这样可以确保对于该类型的数组，可以始终通过偏移其大小的整数倍字节来索引数字中该类型的元素；
* 对于动态大小类型，其大小与对齐方式可能无法在静态编译时得知；
* 默认情况下，**复合类型的整体大小需要是其内部字段最大对齐大小的整数倍**；并且，**内部的每一个字段的起始偏移也需要为该字段对齐字节大小的整数倍**（同 C/C++ 一致）。Rust 会自动插入“对齐字节”以满足上述要求。

```rust 
struct A {
  a: u8,
  b: u32,
  c: u16,
}
// after alignment (the fields ordering may be changed):
// struct A {
//   a: u8,
//   _pad1: [u8; 3],
//   b: u32,
//   c: u16,
//   _pad2: [u8; 2],
// }
```

* 对于两个拥有同样顺序字段的 *struct*，Rust 会保证同一类型的不同实例其内存布局是完全相同的；但目前并不保证不同类型的实例之间其内存布局（字段序）的相似性，编译器可能会对字段进行排序以优化内存布局；
* Enum 类型的实际内存布局：

```rust
enum Foo {
    A(u32),
    B(u64),
    C(u8), 
}
// layout in memory:
// struct FooRepr {
//     data: u64, // this is either a u64, u32, or u8 based on `tag`. 
//     tag: u8, // 0 = A, 1 = B, 2 = C.
// }
```

* Rust 中的“**空指针优化**”：*The "null pointer optimization" basically means that if you have an enum with **two variants**, where **one variant has no associated data**, and **the other variant has associated data where the bit pattern of all zeros isn't a valid value**, then the **enum** itself will take exactly the same amount of space as that associated value, using the all zeroes bit pattern to indicate that it's the other variant.*；因此只要某个类型的值（`Box<T>` \ `Vec<T>` \ `String` \ `&T` \ `&mut T`）包含 *non-nullable pointer*，就可以被直接放到诸如 `Option<T>` 中，而不会产生任何额外的性能损耗。即 *enum* 在实现时可以将 *tag* 与 *data* 两者位模式合并起来表示两个不同值。

```rust
assert_eq!(core::mem::size_of::<Option<&T>>(), core::mem::size_of::<&T>());
```

7. （Page：13）特殊大小类型：

\- ***动态大小类型（DSTs）***：

* 所有指向 DST 类型的指针都会变为一个 *wide pointer*，这个指针包含一个原对象指针，和对应的辅助指针/数据；
* 两种 DSTs：
  * **trait object**：`dyn MyTrait`；
    * 对象的原始类型信息将被删除，以利于运行时反射。对应的 vtable 则包含了使用该类型所需的所有信息。辅助 trait object 指针的信息是 **vtable 指针**。应用可以从 vtable 中动态得到被指向对象的运行时大小。
  * **切片**：`[T]` \ `str` 等。
    * 一个“切片”是对应某段内存（*Vec* 或数组）的一个“视图”，辅助切片指针的是**该指针所指向的元素数量（`usize`）**。被指向切片对象的运行时大小即元素的静态类型大小乘以元素的数量。
* Rust 中也支持类似 C 中的“**柔性数组**（*flexible array*）”，即 `struct` 中的最后一个元素允许是大小未知的数组类型。

```rust
// custom DST (limited usage).
// making the type generic and performing an "unsizing coercion".
struct MySuperSliceable<T: ?Sized> {
    info: u32,
    data: T,
}
fn main() {
    let sized = MySuperSliceable {
        info: 17,
        data: [0; 8],
    };
    let dynamic = &sized;
    // prints: "17 [0, 0, 0, 0, 0, 0, 0, 0]".
    println!("{} {:?}", dynamic.info, &dynamic.data);
}
```

\- ***零大小类型（ZSTs）***：

```rust
struct Noting;  // no fields = no size.

// all fields have no size = no size.
struct LotsOfNothing {
    foo: Nothing,
    qux: (),      // empty tuple has no size.
    baz: [u8; 0], // empty array has no size.
}
```

* Rust 可以将任何产生或存储 ZST 的操作都简化为“无操作（no-op）”；
* ZSTs 的引用必须是 non-null 且适当对齐的；解引用一个 null 或未对齐的 ZST 的指针是未定义行为。

\- ***空类型***：

* 该类型无法被实例化；
* Rust 中的 `*const ()` 与 C/C++ 中的 `void*` 类似；
* 可用于**类型级别的“不可达”**。

```rust
enum Void {}

let res: Result<u32, Void> = Ok(0);

// Err doesn't exist anymore, so Ok is actually irrefutable.
let Ok(num) = res;
```

8. （Page：17）可选的数据布局形式（repr）：

\- ***repr(C)***：

```rust
#[repr(C)]
pub struct Rect { x: f32, y: f32, width: f32, height: f32 }
```

* 最重要的一种布局形式，参考于 C/C++ 规范（字段顺序、大小、对齐方式等）；
* 一般用于 FFI 边界和布局控制；
  * ZSTs 大小仍然为零；
  * DST 指针和 *tuple* 不是 C 中的概念，因此非 FFI-safe；
  * 带有字段的枚举类型不是 C/C++ 中的概念，但可通过 bridging 的方式来实现；
  * 如果 T 是 FFI-safe 的非空指针，则 `Option<T>` 的布局和 ABI 与 T 相同，因此是 FFI-safe 的；
  * *tuple struct* 与 C 中的 `struct` 类似，只是没有命名字段；
  * 对于“空枚举”，该表示形式等同于某个具体的 *repr(u?)* 之一。所选择的大小是目标平台的 C 应用程序二进制接口（ABI）的默认枚举大小。**C 语言中的枚举表示形式是由实现定义的**，因此，这实际上只是“最佳猜测”。特别是，当使用某些特殊标记编译感兴趣的 C 代码时，这可能是不正确的；
  * 即使在 C/C++ 中允许这样做，带有 *repr(C)* 或 *repr(u?)* 的空枚举也可能不会设置为没有相应变体的整数值。构造不与其任何变体相匹配的枚举实例是未定义的行为。

\- ***repr(transparent)***：

* 只能用于**具有单个非零大小字段**（可能存在其他零大小字段）的 `struct`。而整个 `struct` 的布局和 ABI 则与该非零字段相同；目的是使在单个字段和 `struct` 之间转换成为可能。一个例子是 `UnsafeCell`，可以将其转换为它所包装的类型；同样，通过 FFI 来传递这样的 `struct` 可以确保在另一侧能够得到所期望的 `struct` 内部的字段类型。特别是，对于 `struct Foo(f32)`，其始终具有与 `f32` 相同的 ABI 是必要的。

\- ***repr(u?)*** 与 ***repr(i?)***：

* 这种模式**指定了空枚举类型的大小**。如果判别式溢出必须容纳的整数，则将产生编译时错误。可以通过将溢出元素显式设置为 0 来手动要求 Rust 允许这样做。但是 Rust 不允许创建两个变量具有相同判别式的枚举。没有 *repr(C)* 或 *repr(u?)* 的空枚举仍然是 Rust 原生类型，并且不会具有稳定的 ABI 表示。添加 repr 会导致将其视为与用于 ABI 的指定整数大小完全相同；
* **如果枚举具有字段，则其效果类似于 *repr(C)***，因为存在类型的已定义布局。这样就可以将枚举传递给 C 代码，或访问类型的原始表示并直接操纵其标记和字段。向枚举添加显式 repr 会抑制空指针优化。这些 reprs 对 `struct` 没有影响。

\- ***repr(packed)***：

* 该模式会强制 Rust 剥离所有填充字节，并且仅将类型与“字节”对齐。这可能会改善内存占用，但可能会产生其他负面影响。特别是，大多数体系结构都强烈希望将值对齐。这可能意味着未对齐的负载会受到惩罚（x86），甚至是故障（某些 ARM 芯片）。对于简单的情况，例如直接加载或存储打包的字段，编译器可能能够解决移位和掩码的对齐问题。但是，如果引用打包字段，则编译器不太可能避免未对齐的负载。这是 *repr(C)* 或 *repr(u?)* 的**修饰符**。

\- ***repr(align(n))***：

* 其中 n 是 2 的幂。将强制类型具有至少 n 的对齐方式。这可以实现多种技巧，例如**确保数组的相邻元素永远不会彼此共享同一个缓存行**（可能会加快某些种类的并发代码的速度）。这是 *repr(C)* 或 *repr(u?)* 的**修饰符**，它与 *repr(packed)* 不兼容。

### Chapter 3 - Ownership and Lifetimes

9. （Page：21）**当变量或指针在同一时间指向了同一块发生重叠的内存区域时**，即可称它们发生了 *alias*。由于 Rust 的所有权机制可以避免这种情况的发生，因此编译器也可以进行相应的优化：

* 对于某些值，当其没有被指针引用时，可以被存放到寄存器中；
* 通过证明在上一次读操作后，内存没有被改变，来减少一些无用的内存读操作（多次读合并为一次）；
* 通过证明某块内存在下一次写入之前永远不会被读取，来消除重复无用的内存写操作（多次写合并为一次）；
* 对内存的读写操作进行重排序，前提是它们彼此并不相互依赖。

\- ***优化前***：

```rust
// before optimization.
fn compute(input: &u32, output: &mut u32) {
    if *input > 10 {
        *output = 1; 
    }
    if *input > 5 { 
        *output *= 2;
    } 
}
```

\- ***优化后***（前提：引用 input 与 output 没有发生 *aliasing*）：

```rust
// after optimization.
fn compute(input: &u32, output: &mut u32) {
    let cached_input = *input; // keep the value of *input in a register. 
    if cached_input > 10 {
        *output = 2; // x > 10 implies x > 5, so double and exit immediately.
    } else if cached_input > 5 {
        *output *= 2; 
    }
}
```

10. （Page：23）*Lifetimes* 基本：

* 每一个 `let` 表达式都会隐式地引入一个 *lifetime* 作用域。而 borrow-checker 会尽量使得每一个 scope 都仅采用必须的最小范围。如下例所示。

\- ***Rust 代码***：

```rust
let x = 0; 
let z;
let y = &x; 
z = y;
```

\- ***对应 desugar 后的情况***（形式化语法）：

```rust
'a: {
    let x: i32 = 0;
    'b: {
        let z: &'b i32;
        'c: {
            // Must use 'b here because this reference is being passed to that scope.
            let y: &'b i32 = &'b x;
            z = y;
        }   
    }
}
```

11. （Page：27）一个 aliasing 导致 *lifetime* 出错的例子：

\- ***Rust 代码***：

```rust
fn main() {
    let mut data = vec![1, 2, 3]; 
    let x = &data[0]; 
    data.push(4);  // &mut self -> introduces a lifetime scope.
    println!("{}", x);
}
```

\- ***对应 desugar 后的情况***：

* 我们需要在作用域 “b” 中使用 *data* 的不可变引用；
* `data.push(4);` 会产生一个临时 *lifetime* 作用域（包含可变引用 `&mut T`）；
* 而作用域 “b” 会包含作用域 “c”；
* Rust 编译器发现我们需要在作用域 “c” 中使用一个 *data* 的可变引用，而作用域 “c” 却是包含在作用域 “b” 中的，这违背了 lifetime 的规则；
* 主要原因是：可变引用可能导致后面需要使用的不可变引用失效。

```rust
'a: {
    let mut data: Vec<i32> = vec![1, 2, 3]; 
    'b: {
        // 'b is as big as we need this borrow to be, just need to get to `println!`.
        let x: &'b i32 = Index::index::<'b>(&'b data, 0); 
        'c: {
            // temporary scope because we don't need the &mut to last any longer.
            Vec::push(&'c mut data, 4);
        }
        println!("{}", x);
    }
}
```

12. （Page：28）*lifetime* 作用域：

* *lifetime* 作用域一般为从其创建到最后一次被使用中间的一段范围；
* 对于含有析构函数（***Drop*** trait）的值，其所保有的引用的 *lifetime* 将会从该值的定义持续到当前 scope 结束的整个部分。

```rust
#[derive(Debug)]
struct X<'a>(&'a i32);  // a reference to outter value.
impl Drop for X<'_> {
    fn drop(&mut self) {}
}
let mut data = vec![1, 2, 3]; 
let x = X(&data[0]); 
println!("{:?}", x); 
data.push(4);
// here, the destructor is run and therefore this'll fail to compile.
```

* *lifetime* 可以被“**暂停**”：

```rust
let mut data = vec![1, 2, 3];
// This mut allows us to change where the reference points to.
let mut x = &data[0];
println!("{}", x);  // Last use of this borrow.
data.push(4);
x = &data[3];  // We start a new borrow here.
println!("{}", x);
```

13. （Page：29）lifetime 的**局限性**：下述代码从引用的语义上来看，没有产生 aliasing 的问题，但实际 borrow-checker 在进行类似 desugar 之后的检查分析时，仍会检测到 aliasing，进而阻止编译通过。这是由于：**Rust 编译器并不理解“可变借用（*&mut self*）”已不再需要，而是选择保守地将其可用范围扩展到整个当前的 lifetime 作用域**。

\- ***Rust 代码***：

```rust
#[derive(Debug)]
struct Foo;
impl Foo {
    fn mutate_and_share(&mut self) -> &Self { &*self } 
    fn share(&self) {}
}
fn main() {
    let mut foo = Foo;
    let loan = foo.mutate_and_share(); 
    foo.share();
    println!("{:?}", loan);
}
```

\- ***对应 desugar 后的情况***：

```rust
struct Foo;
impl Foo {
    fn mutate_and_share<'a>(&'a mut self) -> &'a Self { &'a *self } 
    fn share<'a>(&'a self) {}
}
fn main() {
    'b: {
        let mut foo: Foo = Foo; 
        'c: {
            // compiler will assumes "&'c mut foo" will be alive within the whole 'c.
            let loan: &'c Foo = Foo::mutate_and_share::<'c>(&'c mut foo); 
            'd: {  // aliasing occurs.
                Foo::share::<'d>(&'d foo);
            }
            println!("{:?}", loan);
        }
    } 
}
```

14. （Page：32）**Unbounded Lifetimes**：

* 可能产生的场景：
  * 没有与 input 参数绑定的 output 参数上的 lifetime；
  * 解引用一个原始指针。

```rust
// unbound lifetime, will be lifted to 'static by default.
fn get_str<'a>() -> &'a str {
    return &"123";
}
```

15. （Page：33）**HRTB**s（Higher-Rank Trait Bounds）：

* 用于标记 `Fn` trait 中参数和返回值的 lifetime。

```rust
struct Closure<F> {
    data: (u8, u16),
    func: F, 
}
impl<F> Closure<F>
    // HRTB -> for all choices of 'a.
    where for<'a> F: Fn(&'a (u8, u16)) -> &'a u8, {
    fn call<'a>(&'a self) -> &'a u8 {
        (self.func)(&self.data) 
    }
}
fn do_it<'b>(data: &'b (u8, u16)) -> &'b u8 { &data.0 }

fn main() {
    let clo = Closure { data: (0, 1), func: do_it };
    println!("{}", clo.call()); 
}
```

16. （Page：42）**Variance**：

![](1.png)

* *Variance* 是类型构造函数（Rust 中即任意泛型类型、引用、指针）对于它们的参数所具有的一种属性。其描述了对于不同泛型/引用/指针，**其泛型参数与对应该参数的子类型，以及 lifetime 与相应子 lifetime（作用域更大者）之间的“可传递”关系**；
* 两个 lifetime，**如果 'a 包含 'b（即 'a 存活长于 'b），则称 'a 便为 'b 的“子类型”**（subtype）。而 'static 则是所有 lifetime 的子类型；
* 对于复合类型 *struct MyType\<A\>*：
  * 如果所有使用 A 的地方均为 covariant，则 MyType 为基于 A 的 covariant；
  * 如果所有使用 A 的地方均为 contravariant，则 MyType 为基于 A 的 covariant；
  * 否则，MyType 为基于 A 的 invariant。

![](2.png)

17. （Page：43）**Drop Checker**：

* 变量被释放的顺序与它们的定义顺序相反；
* `struct` 与 `tuple` 中字段的释放顺序与它们的定义顺序相同，但实际 borrow-checker 并不会严格进行区分；
* **为了使泛型类型正确实现 Drop，其泛型参数（T）的存活时间必须严格超过该泛型类型**；
* 当类型字段的 drop 顺序变得重要时，可以使用 `ManuallyDrop` 来手动控制类型各个字段的 drop 顺序。

18. （Page：49）**PhantomData**：

* 是一个 *marker type*，不会占用任何空间，可用于为**支持静态分析**而模拟给定类型的字段。
* 可用于绑定未使用的 lifetime、泛型参数到复合类型：

```rust
use std::marker;
struct Iter<'a, T: 'a> {
    ptr: *const T,
    end: *const T,
    _marker: marker::PhantomData<&'a T>,
}
```

* 向 drop-checker 明确所有权关系：

```rust
use std::marker;

struct Vec<T> {
    data: *const T, // *const for covariance!
    len: usize,
    cap: usize,
    _marker: marker::PhantomData<T>,  // !!! Vec owned T !!!
}
```

![](3.png)

### Chapter 4 - Type Conversions

19. （Page：57）**Casts**：

* <i>*T as *U</i>，<i>T, U: Sized</i>；
* <i>*T as integer</i>；
* <i>integer as *T</i>；
* <i>number as number</i>；
* <i>field-less enum as integer</i>；
* <i>bool as integer</i>；
* <i>char as integer</i>；
* <i>u8 as char</i>；
* <i>&[T; n] as *const T</i>；
* <i>fn as *T</i>，<i>T: Sized</i>；
* <i>fn as integer</i>。

20. （Page：60）**Transmutes**：

* `mem::transmute<T, U>`：需要保证 T 与 U 具有同样的大小； 
* `mem::transmute_copy<T, U>(src: &T) -> U`：会从 <i>&T</i> 拷贝 <i>size_of\<U\></i> 字节数据，并将这些数据解释为 U 的类型。当类型 U 比 T 大时，会导致 UB； 
* 可能导致 UB 的情况：
  * 强制转换 `&` 到 `&mut` 是 UB；
  * 强制数字值到 `bool` 是 UB；
  * 强制转换到一个引用但是没有显式标注 lifetime 是 UB；
  * 不同复合类型之间的转换需要保证两者的内存布局是相同的（<i>repr(C)</i> 或 <i>repr(transparent)</i>）。

### Chapter 5 - Working With Uninitialized Memory

21. （Page：62）**未初始化内存**：

* Rust 中的所有栈变量（函数局部变量）定义，在其遇到显式的赋值行为之前，都是处于“**未初始化**”状态的；

```rust
fn main() {
    let x: i32;
    // println!("{}", x);  // error occurs!
}
```

* Rust 的变量初始化静态分析仅根据变量的使用位置和变量初始化过程的静态作用域位置关系进行分析，**而不会考虑基于常量值的选择性分析**；

```rust
fn main() {
    let x: i32;
    if true { 
        x = 1;
    }
    // println!("{}", x);  // error occurs!
}
```

* Rust 对变量初始化的复杂分析（依赖关系与控制流）：
  * **情况一**：`loop` 无法 `break`，最后一句 unreachable；
  * **情况二**：找到可能的 `break` 语句，这里的作用域内对 x 进行了初始化，最后一句可以正常打印。

```rust
let x: i32;
loop {
    // Rust doesn't understand that this branch will be taken unconditionally, -
    // because it relies on actual values.
    if true {
        // but it does understand that it will only be taken once because -
        // we unconditionally break out of it. Therefore `x` doesn't -
        // need to be marked as mutable.
        x = 0;
        break; 
    }
}
// it also knows that it's impossible to get here without reaching the break. 
// And therefore that `x` must be initialized here!
println!("{}", x);
```

* 当一个变量的值被移出后，该变量将默认变为逻辑上的“未初始化”状态，当且仅当该变量的值类型没有实现 Copy trait。

22. （Page：66）未初始化实例：

* 可以使用 `MaybeUninit<T>` 构建对应类型 T 的未初始化实例：
  * 当用 `=` 进行赋值操作时，Rust 会默认先将左侧变量所持有的内容 drop 掉。而 drop 一个 `MaybeUninit<T>` 不会发生任何事；
  * 在内存中，`MaybeUninit<T>` 的布局与 T 保持一致。

```rust
use std::mem::{self, MaybeUninit};

fn main() { 
    const SIZE: usize = 10;
    let x = {
        // create an uninitialized array of `MaybeUninit`. The `assume_init` is 
        // safe because the type we are claiming to have initialized here is a 
        // bunch of `MaybeUninit`s, which do not require initialization.
        let mut x: [MaybeUninit<Box<u32>>; SIZE] = unsafe {
            MaybeUninit::uninit().assume_init() 
        };
        // dropping a `MaybeUninit` does nothing. Thus using raw pointer
        // assignment instead of `ptr::write` does not cause the old
        // uninitialized value to be dropped.
        // exception safety is not a concern because Box can't panic. 
        for i in 0..SIZE {
            x[i] = MaybeUninit::new(Box::new(i as u32)); 
        }
        // everything is initialized. Transmute the array to the initialized type.
        unsafe { mem::transmute::<_, [Box<u32>; SIZE]>(x) }
    };
    dbg!(x);
}
```

* 三种不会 drop 原有值的赋值方法：
  * `ptr::write(ptr, val)`：将给定值写到 *ptr* 所指位置；
  * `ptr::copy(src, dest, count)`：从 <i>src</i> 拷贝 <i>count</i> 个字节，并复制到 <i>dest</i>；
  * `ptr::copy_nonoverlapping(src, dest, count)`：同上。但需要假设 <i>src</i> 与 <i>dest</i> 两个内存地址没有相交。

（不定期更新）
