---
title: React 特性小结（v17.0.1）
intro: 记录一些之前理解了然后又忘了的知识点。
comments: false
date: 2021-02-17 14:27:54
tags:
- React
---

记录一些之前理解了然后又忘了的知识点。

1. 所有 React 组件都必须像纯函数一样确保**它们的 props 不被更改**；
2. 出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。在需要依赖值以更新下一个状态时，可以使用该方法的另一个形式：

```javascript
this.setState((state, props) => ({
  // 此处为上一个 state；
  counter: state.counter + props.increment
}));
```

3. JSX 回调函数中的 this 绑定问题：*即 class 的方法默认不会绑定 this*。

* 构造函数中使用 `bind` 绑定解决：

```javascript
class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(`this is: ${this}`);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

* ***public class fields*** 语法解决：

```javascript
class Comp extends React.Component {
  handleClick = () => {
    console.log(`this is: ${this}`);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

* ***箭头函数***解决（此语法问题在于每次渲染 Comp 时都会创建不同的回调函数。如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染）：

```javascript
class Comp extends React.Component {
  handleClick() {
    console.log(`this is: ${this}`);
  }
  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

4. 向事件处理程序传递参数：

* 第二种方式在事件处理函数已经被绑定的情况下（比如在构造函数中），第一个参数可以传递 null；
* `bind` 在调用时会产生原函数的包装函数，因此**即使多次绑定 this，原函数在执行时也以第一次绑定时的 this 为准**。后续多次绑定均绑定在了返回的包装函数，而非原函数上。

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

5. 让 render 方法返回 *null*，可以让 React 不进行任何渲染。
6. 使用“索引”作为列表组件的 key 值，会导致性能变差，还可能引起组件状态问题。**key 需要在兄弟节点之间保持唯一**，生成多个不同的节点数组时，分散于不同数组中的节点可以使用重复的 key。
7. **受控组件** & **非受控组件**：前者输入的值始终由 React 的 state 驱动；后者表单控件的值由 DOM 元素自己来保存，而非组件的状态。
8. 使用 `props.children` 可以**将嵌套的子组件渲染到结果中**：

```javascript
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

9. 可以使用 `React.lazy` 及 `Suspense` 来实现**组件的动态按需引入**（基于路由的代码分割）。`React.lazy` 目前仅支持默认导出。
10. 启发式 “diffing” 算法的两个假设：

* 两个不同类型的元素会产生出不同的树（算法不会尝试匹配不同组件类型的子树，即：**只要组件类型不同，就会直接重新渲染**，而不会比较实际的组件子树）；
* 开发者可以通过设置 key 属性，来告知渲染哪些子元素在不同的渲染下可以保存不变。

11. 生命周期方法：

![](1.png)

* `getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更
改之前从 DOM 中捕获一些信息（例如：滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()；
* `getDerivedStateFromProps()` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它返回一个对象来更新 state，如果返回 null 则不更新任何内容。

12. React 为何会添加 Hook 特性？

* **在组件之间复用状态逻辑很难**：
  * render props 和 HOC 的复用会使得代码难以理解，且容易形成“嵌套地狱”。
* **复杂组件变得难以理解**：
  * 相关逻辑被拆分在不同的生命周期函数中；
  * 不相关的逻辑被组织在同一个声明周期函数中。
* **难以理解的 class**：
  * 需要考虑 this 工作方式；
  * 需要区分函数组件与 class 组件；
  * 不便于 component-folding 等优化；
  * 无法很好地进行代码压缩；
  * 热重载时会出现不稳定的情况。

13. Hook 使用规则：

* **只能在函数最外层调用 Hook**。不要在循环、条件判断或者子函数中调用；
  * React 依靠 **Hook 的调用顺序**来保证 state 与 useState 的正确对应关系。Hook 的调用顺序在每次渲染中都是相同的。
* **只能在 React 的函数组件中调用 Hook**。不要在其他 JavaScript 函数中调用。

14. `useEffect` 中的“清理阶段”会**在每次新的 effect 被执行前触发**（对应 componentDidUpdate()），而非仅在组件 unmount 时触发。
15. 自定义 Hook 是一个函数，**其名称以 “use” 开头**，函数内部可以调用其他的 Hook。
16. Hook APIs：

\- ***useState***：

* **函数式更新**：如下 `setState` 可以接收一个函数，该函数将接收先前的 state，并返回一个更新后的值。

```javascript
const [state, setState] = useState(initialState);
setState(prevState => prevState + 1);
// 合并更新对象；
setState(prevState => {
  // 也可以使用 Object.assign；
  return {...prevState, ...updatedValues};
});
```

* **惰性初始 state**：如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用。

```javascript
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

\- ***useEffect***：

* **effect 执行时机**：在浏览器完成布局与绘制之后，传给 useEffect 的函数会**延迟调用**，相比 class 模式下的 componentDidMount 与 componentDidUpdate 效率更高，不会阻塞浏览器的绘制。对于清除：上一次的 effect 会在新 UI 重新渲染后被清除。

\- ***useReducer***：

`useState` 的替代方案，**适用于 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state** 等情况（将 state 的变化逻辑内聚到了 reducer 中）。

```javascript
const initialState = { count: 0 };

// reducer 可以被放到组件中去，并可以使用 props（可能会使一些优化失效）；
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
function Counter(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'increment' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

\- ***useCallback***：

返回一个 memoized 的回调函数。`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。**通常和 `React.memo` 一起配合使用**。

```javascript
function List({ items, onItemClick }) {
  return <div>{items.map(item => <div onClick={ onItemClick }>{item}</div>)}</div>;
}
const MemoList = React.memo(List)

function App() {
  const [val, setVal] = useState(0);
  const [items, setItems] = useState(['Item 1', 'Item 2']);
  // 为了保证每次 App 组件重新渲染时，传递给子组件的函数是“相等的”；
  const onItemClick = useCallback(event => {
    console.log('You clicked ', event.currentTarget);
  }, []);
  return (
    <>
      <button onClick={() => { setVal(v => v + 1) }}>Click {val} times!</button>
    <MemoList
      items={items}
      onItemClick={onItemClick}
    />
    </>
  );
}
```

\- ***useMemo***：

返回一个 memoized 值。把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

```javascript
function App() {
  const [staticVal, setStaticVal] = useState(10)
  const [val, setVal] = useState(0)
  
  const dealWithStaticVal = (v) => {
    let result = 0;
    for (let i = 0; i < v; ++i) { result += i * i; }
    return result;
  }
  // memorized value;
  const memorizedStaticVal = useMemo(() => dealWithStaticVal(staticVal), [staticVal])
  const handleClick = () => {
    setVal(v => v + 1);
  } 
  return (
    <>
      <button onClick={handleClick}>Click Me!</button>
      <div>Static: {memorizedStaticVal}</div>
      <div>Dynamic: {val}</div>
    </>
  )
}
```

\- ***useRef***：

useRef 是一种“选择退出”渲染一致性的方法，它会返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。**返回的 ref 对象在组件的整个生命周期内保持不变**（即每次返回的都是同一个值引用，**多次执行只会创建一次**。相对的，在函数组件中使用 `createRef` 时会，在每次渲染时创建包含初始值的新引用）。它可以很方便地**保存任何可变值**。需要注意：**\*变更 .current 属性不会引发组件重新渲染**。

```javascript
function usePrevious(value) {
  const ref = useRef(0);
  useEffect(() => {
    ref.current = value;  // useEffect 会在 render 之后才会执行；
  });
  return ref.current;
}
function App() {
  const [val, setVal] = useState(0);
  const beforeVal = usePrevious(val);
  const handleClick = () => {
    setVal(v => v + 1);
  }
  
  return (
    <>
      <button onClick={handleClick}>Click Me!</button>
      <div>Latest: {val}</div>
      <div>Before: {beforeVal}</div>
    </>);
}
```

\- ***useLayoutEffect***：

其函数签名与 useEffect 相同，但**它会在所有的 DOM 变更之后同步调用 effect**。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

17. **通常最好在 effect 内部去声明它所需要的函数**。这样就能容易的看出那个 effect 依赖了组件作用域中的哪些值，以便将它们添加到依赖列表中。
18. `React.memo()` 可以理解为函数组件下的 PureComponent。
19. Effects 的“**自给自足**”（基于 useEffect 的回调函数模式）：

\- ***依赖模式***：

```javascript
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);  // 依赖于外部状态；
  }, 1000);
  return () => clearInterval(id);
}, [count]);
```

\- ***自给模式***：

```javascript
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);  // 不再依赖外部状态，以“发送指令”的方式告知 React 具体的操作；
  }, 1000);
  return () => clearInterval(id);
}, []);
```

20. 在组件内定义的函数每一次渲染都在变，因此将其作为 useEffect 的依赖会导致每次渲染都会触发 effect（本次渲染的函数与上一次的并不相同）。解决方案：

* 如果一个函数没有使用组件内的任何值，**可以把它提到组件外面去定义**（脱离组件上下文），然后就可以自由地在 effects 中使用；
* **将函数包装成 “useCallback”**，然后作为 useEffect 的依赖，即只有当函数的依赖发生改变时，effect 才会被重新执行。

21. 防止竞态问题，保证已过期的 render-screen 不会影响当前正在生效的渲染：**利用布尔值进行跟踪**。

```javascript
function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let didCancel = false;  // 跟踪当前渲染的有效性；
    async function fetchData() {
      const article = await API.fetchArticle(id);
      if (!didCancel) {   // 若当前渲染已取消则不渲染内容；
        setArticle(article);
      }
    }
    fetchData();
    return () => {
      didCancel = true;  // 新渲染完成时将旧渲染标记为“取消”；
    };
  }, [id]);
  // ...
}
```

22. 如何用 useEffect 模拟 componentDidMount 生命周期？

和 componentDidMount 不一样，useEffect 会捕获 props 和 state。所以即便在回调函数里，拿到的还是初始的 props 和 state。如果想得到“最新”的值，可以使用 ref。不过，通常会有更简单的实现方式。effects 的心智模型和 componentDidMount 以及其他生命周期是不同的，试图找到它们之间完全一致的表达反而更容易使你混淆。想要更有效，你需要 “think in effects”，**它的心智模型更接近于实现状态同步，而不是响应生命周期事件**。

23. React 作为 UI 运行时的一些概念：

* **宿主树**：React 程序通常会输出一棵会随时间变化的树。树必须是稳定（大多数情况的更新并不会从根本上改变其整体结构）且通用（宿主树可以被拆分为外观和行为一致的 UI 模式而不是随机的形状）的；
* **宿主实例**：宿主树上的“节点”。如在 DOM 环境中，宿主实例就是我们通常所说的 DOM 节点。且通常会有原生的 API 用于操控这些宿主实例；
* **渲染器**：渲染器教会 React 如何与特定的宿主环境通信以及如何管理它的宿主实例，比如“**协调器**”的实现细节便存于其中。渲染器的具体实现是平台相关的，如：react-dom \ react-native \ react-art 等；
* **React 元素**：是一个普通的 JavaScript 对象。它用来描述一个宿主实例。JSX 是用来描述这些对象的语法糖。**React 元素具有不可变性**，你不能改变 React 元素中的子元素或者属性，如果想要在稍后渲染一些不同的东西，**需要从头创建新的 React 元素树来描述它**；
* **入口**：一个特定的 API 可以告诉 React ，将特定的 React 元素树渲染到真正的宿主实例中。比如 `ReactDOM.render`；
* **协调**：确定该对宿主实例做什么来响应新的信息；
* **条件**：render 函数中的“模板”保持了 DOM 树的基础结构，这样即使存在条件渲染，也不会发生无法合理重用已有 DOM 结构的问题；

![](2.png)

* **列表**：key 给予 React 判断子元素是否真正相同的能力，即使在渲染前后它在父元素中的位置不是相同的。在渲染前后当 key 仍然相同时，React 会重用先前的宿主实例，然后重新排序其兄弟元素；
* **组件**：会返回 React 元素的函数，组件接受一个参数 — 对象哈希；
* **纯净**：React 组件中对于 props 应该是纯净的。只要调用组件多次是安全的，并且不会影响其他组件的渲染，React 并不关心你的代码是否像严格的函数式编程一样百分百纯净。在 React 中，幂等性比纯净性更加重要；
* **递归**：组件的渲染会从顶至底递归进行。同样，协调也是递归式的；
* **控制反转（IoC）**：让 React 调用我们的组件，而不是我们主动调用组件形成元素树；
  * **组件不仅仅是函数**：React 能够用在树中与组件本身紧密相连的局部状态等特性来增强组件功能；
  * **组件类型参与协调**：通过 React 来调用你的组件，能让它了解更多关于元素树的结构；
  * **React 能够推迟协调**：如果让 React 控制调用你的组件，它可以让浏览器在组件调用之间做一些工作，这样重渲染大体量的组件树时就不会阻塞主线程。
  * **更好的可调试性**：若组件是库中所重视的一等公民，就可以构建丰富的开发者工具，用于开发中的自省。
* **状态**：组件仍然是函数但是 React 用对构建 UI 有好处的许多特性增强了它。在树中每个组件所绑定的局部状态就是这些特性之一（比如 Hooks）；
* **一致性**：需要在同步的循环中对真实的宿主实例进行操作，以保证用户不会看见半更新状态的 UI ，浏览器也不会对中间状态进行不必要的布局和样式计算。因此，React 将所有的工作分成了“渲染阶段”和“提交阶段”。**渲染阶段**是当 React 调用组件然后进行协调的时段；**提交阶段**就是 React 操作宿主树的时候，而这个阶段永远是同步的；
* **缓存**：当父组件通过 setState 准备更新时，React 默认会协调整个子树。当树的深度和广度达到一定程度时，可以让 React 缓存子树（`React.memo`）并重用先前的渲染结果仅当 prop 在浅比较之后是相同时；
* **原始模型**：React 并没有使用“反应式”的系统来支持细粒度的更新。**任何在顶层的更新只会触发协调而不是局部更新那些受影响的组件**；
* **批量更新**：**组件内调用 setState 并不会立即执行重渲染**（为了减少不必要的渲染）。相反，React 会先触发所有的事件处理器，然后再触发一次重渲染以进行所谓的“批量更新”；

```javascript
const [count, setCounter] = useState(0);
function increment() {
  // setCounter(c => c + 1);  // this works!
  setCounter(count + 1);
}
function handleClick() {
  // 由于“批量更新”，三个 setCount 并不会独立执行，因此获取到的 count 均为 0；
  increment();  // setCount(0 + 1).
  increment();  // setCount(0 + 1).
  increment();  // setCount(0 + 1).
}
```

* **调用树**：React 会为每一个调用的组件维护一个“调用树”，这些“调用树”帧会随它们的局部状态和宿主实例一起被摧毁，这些帧本质上就是 Fibers。Fibers 是局部状态真正存在的地方。当状态被更新后，React 将其下面的 Fibers 标记为需要进行协调，之后便会调用这些组件；
* **上下文**：React 使用 Context 从顶层传递数据到每个子组件，当值变化时还能够进行重新渲染；
* **副作用**：放置在 useEffect 中进行；
* **自定义钩子**：自定义 Hooks 让不同的组件共享可重用的状态逻辑。注意**状态本身是不共享的**。每次调用 Hook 都只声明了其自身的独立状态；
* **静态使用顺序**：**Hooks 的内部实现其实是“链表”**。当调用 useState 的时候，指针会移到下一项。当退出组件的“调用树”帧时，会缓存该结果的列表直到下次渲染开始。

24. `this.setState()` 定义在 React 包中，它读取并使用由 React DOM 设置在每个已创建类上的 `this.updater` 字段，让 React DOM 安排并处理更新。类似的，Hooks 使用了一个 “dispatcher” 对象，代替了 updater 字段。当调用 `React.useState()`、`React.useEffect()` 或者其他内置的 Hook 时，这些调用被转发给了当前的 dispatcher。而各个渲染器会在渲染组件之前设置 dispatcher。
25. **React Fiber**：<u>[Youtube](https://www.fullstackacademy.com/tech-talks/a-brief-overview-of-react-fiber)</u>。
