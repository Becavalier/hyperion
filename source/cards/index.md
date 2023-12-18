---
title: cards
label: 快记 | Cards
date: 2023-10-29 18:01:00
page: cards
---

### 代码整洁之道：程序员的职业素养

在我看来，与问题本身的难度相比，解决问题的方式、步骤以及反思的程度，才能体现出一个人的职业素养。

---

在某些需要说“不”的场景中，可能的最好结果，是你和你的经理共同追求的目标。最关键的是要找到那个共同目标，而这往往有赖于协商。双方需要坐下来讨论预期冲突的产生原因以及潜在应对方案，前者用来重新梳理流程，后者用来面对客户。

---

**有时候，提供太多细节，只会招致更多的微观管理。**

---

**没有“试试看”这回事**。如果你此前并未有所保留，如果你没有新方案，如果你不会改变你的行为，如果你对自己原先的估计有充分的自信，那么，从本质上讲，承诺“尝试”就是一种不诚实的表现。你在说谎。你这么做的原因，可能是为了护住面子和避免冲突。

---

我发现，要精熟掌握每项技艺，关键都是要具备“信心”和“出错感知”能力。

---

代码必须能够帮你解决客户提出的问题。很多时候，客户提出的需求其实并没能真正解决他们自己的问题。这有赖于你去发现这些问题并与客户交流，以确保代码能够满足客户的真实需求。

---

程序员大多自负、固执、内向。我们不是因为喜欢和人打交道才做这一行的。大多数人之所以选择以编程为业，是因为喜欢沉浸于弄清各种细枝末节和摆弄各种各样的概念，以证明自己拥有这个星球上最发达的大脑，而厌恶陷入与他人交流的错综复杂的混乱之中。



### 面试框架

今天发呆的时候思考了一下目前使用的面试框架，发现实际上还是存在无效面试的问题。面试的主要目的在于区分候选人，所以实际上包含多个不同衡量指标，比如：技术能力、沟通能力、理解力、个人发展意愿与团队匹配性等等。

可以看到，单独某一个指标很难体现候选人的“可用性”，或者说仅专注于某一指标的面试流程并不能很好地体现候选人的综合能力。毕竟 “team work” 不是单纯的一问一答，而“八股文面试”便存在这个问题。在一个复杂环境中解决问题实际上需要多种能力的结合，这在候选人与公司的双向选择过程中需要尤其注意。有一些措施可以用来改进面试流程：

* 阅览候选人的博客、GitHub 等来了解他的代码习惯、学习能力；
* 基于候选人的既往项目经历来评估其综合能力（若有开源项目，可以让其尝试讲解某段代码）；
* 可以使用白板算法面试，但不局限于可运行代码，更多理解思路；
* 其他硬指标（工作年限、英语要求、技能匹配程度）可依情况变动。


### 前端 - D3

#### SVG 相关

* ***viewPort***：相当于显示器屏幕；
* ***viewBox***：相当于在屏幕上截取一小块，放大到整个屏幕窗口；
* ***preserveAspectRatio***：指定 viewBox 与 viewPort 的对齐方式和缩放方式。
  * <b><i>\<align\></b></i>：
    * none：不进行强制统一缩放；
    * x(Min|Mid|Max)Y(Min|Mid|Max)：参考实例 <b>[Demo](https://codepen.io/giodif/details/VYpaeo)</b>。
  * <b><i>\<meetOrSlice\></b></i>：
    * meet：保留宽高比、viewBox 在 viewPort 范围内可见、尽可能放大 viewbox；
    * slice：保留宽高比、viewPort 覆盖 viewBox、尽可能缩小 viewbox。

#### D3 API 架构（<b><i>[playground](https://becavalier.github.io/d3-playground/)</i></b>）

![](d3-arch.png)


### 前端 - TypeScript

#### 基础语法

```typescript 
/**
 * Primitive types.
 */
const name: string = 'Jason Yu'
const age: number = 30
const hasMarried: boolean = true
const colors : string[] = ['red', 'blue']
/**
 * Using `any` disables all further type checking, and it is assumed you know the environmen better than TypeScript.
 * Avoid this by "noImplicitAny".
 */
const obj: any = { x: 0 }  
const foo = () : number => 1
const bar = async () : Promise<string> => "string"

/**
 * Object types.
 */
const printCoord = (pt: { x : number, y: number }) => { console.log(pt.x, pt.y) }
const printName = (obj : { first: string, last?: string }) => { console.log(obj.first, obj.last) }  // Checking for optional arg is needed.
const printId = (id: number | string) => { console.log(id) }  // Union type, need a runtime check with "typeof".

/**
 * Type Aliases - reusable types, cannot be changed after being created.
 */
type Point = {
  x: number;
  y: number;
}
type ID = number | string;

/**
 * Interfaces - extendable way to name object types.
 */
interface Point {
  x: number;
  y: number;
}
interface Point {  // Add more fields to the existing type.
  z: number;
}
const pt : Point = { x: 1, y: 2, z: 3 }

/**
 * Type Assertions - similar to value (down/up) cast.
 */
// EventTarget <- Node <- Element <- HTMLElement <- HTMLCanvasElement.
const canvasEle = document.getElementById("canvas") as HTMLCanvasElement;
// Double assertion.
const resizeObserver = (window as unknown as Record<string, unknown>)['ResizeObserver'] 

/**
 * Literal Types.
 */
const printText = (s: string, alignment: "left" | "right" | "center") => {}  // Combining literals into unions.
const compare = (a: string, b: string) : -1 | 0 | 1 => a === b ? 0 : a > b ? 1 : -1
declare function handleRequest(url: string, method: "GET" | "POST"): void
const reqA = { url: "https://hangyu.site", method: "GET" as "GET" }  // Type assertion to always literal type.
const reqB = { url: "https://hangyu.site", method: "GET" } as const  // Convert the entire object to be type literals.
handleRequest(reqA.url, reqA.method)
const liveDangerously = (x?: number | null) => { console.log(x!.toFixed()) }  // Remove "null" and "undefined" from a specific type.
```

#### Type Narrowing

```typescript
// "typeof" narrowing.
const padLeft = (padding: number | string, input: string) => {
  if (typeof padding === "number") return " ".repeat(padding) + input
  return padding + input
}
// Truthiness narrowing.
const printAll = (strs: string | string[] | null) => {
  if (strs && typeof strs === "object") {  // string[].
    for (const s of strs) { console.log(s) }
  } else if (typeof strs === "string") {  // string.
    console.log(strs)
  }
}
// Type predicates - user-defined type guard.
const isFish = (pet: Fish | Bird): pet is Fish => {  // The return type is a type predicate.
  return (pet as Fish).swim !== undefined;  // Narrowing the given argument to a specific type.
}
// Assertion functions.
interface Circle {
  kind: 'circle';  // Literal type.
  radius: number;
}
interface Square {
  kind: 'square';
  sideLength: number;
}
type Shape = Circle | Square;  // A discriminated union, tags are recognized by their literal types.
const getArea = (shape: Shape) => {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.sideLength ** 2
    default:
      const _exhaustiveCheck: never = shape  // "shape" is the type of "never" here.
      return _exhaustiveCheck
  }
}
```

#### More on Functions

```typescript
type GreetFunction = (msg: string) => void  // Function type.
const greeter: GreetFunction = (msg: string) => { console.log(msg) }  // The parameter name in the type is required.

// Call signature in an object type.
type DescribableFn = {
  description: string;  // Other properties.
  (arg: number): boolean;
}
const myFn: DescribableFn = (arg: number) => arg > 3
myFn.description = "fn description."

// Construct signature (for function call).
interface Obj {  // The shape of Obj.
  value: string;
  id?: string;
}
class Name implements Obj {  // One of the specific implementation.
  value: string
  constructor(s: string) { this.value = s }
}
type CallConstruct = {
  new (s: string): Obj;  // The return type should stick to the shape.
}
((Ctor: CallConstruct) => new Ctor("Jason"))(Name)

// Generic functions.

```