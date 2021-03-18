---
title: React 知识点整理（V16.8.6）
intro: 整理下 React 的一些知识点。基于版本 V16.8.6 (March 27, 2019)。
comments: true
date: 2019-04-26 00:13:01
tags:
- React
---

整理下 React 的一些知识点。基于版本 V16.8.6 (March 27, 2019)。

#### Context API

Context API 主要用来解决通过 props 传递数据时需要经过多层中间组件才能到达子组件的情况。首先考虑场景是否可以通过组件的“**组合**”来解决，通过 “IOC” 模式将子组件的组装渲染过程提升到父组件中完成，这样中间组件便不再需要关心具体的数据流动情况，只需要传递组件本身到子组件特定的 slot 处即可。

\- ***几个不足之处***：

* 不受 `shouldComponentUpdate` 的控制，Provider 数据更新时，其内部的所有消费组件都会强制重新绘制。该生命周期函数只会影响 `componentDidUpdate` 的执行，但不影响组件被重新渲染；
* 类组件下的 static 模式只能订阅距离最近的一个 Context Provider，如需订阅多个 Provider，则需要使用 `<Context.Consumer />`；
* 考虑只将 Context 作为 Redux 之类的状态管理容器的一种轻量级补充。

\- ***示例***：

```javascript
// React v16.8.6;

// create context object;
const CompanyContext = React.createContext();

class CompanyContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      companyName: 'Mega Corp',
      employees: 1234567890,
      name: 'J.C. Hiatt',
      teamName: 'Knights of the Night',
      teams: 50000,
      title: 'Founder @ DevLifts'
    }
  }
  
  change = () => {
     this.setState({
       companyName: 'Alibaba, inc'
     })
  }

  render() {
    const { companyName, employees, name, teamName, teams, title } = this.state;
    
    return (
      // create a Provider from the Context, pass in state values;
      <CompanyContext.Provider
        value={{
          companyName,
          employees,
          name,
          teamName,
          teams,
          title,
        }} >
        <button onClick={this.change}>Change</button>
        <Company/>
      </CompanyContext.Provider>
    )
  }
}

class Company extends React.Component {
  componentDidUpdate() {
    console.log('[Company] component updated!')
  }

  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    return (
      <CompanyContext.Consumer>
        {({ companyName, employees, teams }) => (
          <React.Fragment>
            <h1>Company name: <span>{companyName}</span></h1>
            <p>Teams: <span>{teams}</span></p>
            <Team />
            <p>Employees: <span>{employees}</span></p>
            <Employee />
          </React.Fragment>
        )}
      </CompanyContext.Consumer>
    )
  }
}

class Team extends React.Component {
  // append to the context with "contextType";
  static contextType = CompanyContext;

  componentDidUpdate() {
    console.log('[Team] component updated!')
  }

  render() {
    return (
      <p>I'm on the <span>{this.context.teamName}</span> team.</p>
    )
  }
}


class Employee extends React.Component {
  componentDidUpdate() {
    console.log('[Employee] component updated!')
  }

  render() {
    return (
      <CompanyContext.Consumer>
        {({ name, title }) => (
          <p>I'm an employee. My name is <span>{name}</span>, and my title is <span>{title}</span>.</p>
        )}
      </CompanyContext.Consumer>
    )
  }
}

ReactDOM.render(<CompanyContainer />, document.getElementById("root"));
```

#### Error Boundaries

用于捕捉**子组件树（class 组件）在生命周期中发生的错误，然后给予特定的 fallback**，以防止导致整个应用崩溃。但无法捕捉下列情况的异常：

1. 事件处理器；
2. 异步代码；
3. SSR；
4. Error Boundaries 类本身抛出的错误。

\- ***示例***：

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // update state so the next render will show the fallback UI;
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // you can also log the error to an error reporting service;
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // you can render any custom fallback UI;
      return <h1>Something went wrong.</h1>;
    }
    // render the children;
    return this.props.children; 
  }
}
```

```javascript
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

#### Forwarding Refs

**让父组件可以引用到子组件内部 DOM 节点的 ref**。

\- ***示例***：

```javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

class FancyInputInner extends React.PureComponent {
  render() {
    return (
      <input type="text" ref={this.props.innerRef} className="FancyInput"></input>
    )
  }
}

// like HOC;
const FancyInput = React.forwardRef((props, ref) => <FancyInputInner {...props} innerRef={ref} />);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.inputRef = React.createRef();
  }
  
  componentDidMount() {
    // print the references;
    console.log(this.buttonRef)
    console.log(this.inputRef)
  }
  
  render() {
    return (
      <>
        <FancyButton ref={this.buttonRef}>Click Here</FancyButton>
        <FancyInput ref={this.inputRef}></FancyInput>
      </>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));
```

#### HOC (Higher-Order Components)

一个 HOC 其实就是一个方法（函数）。该方法接受一个组件对象，经过处理后返回一个新的组件对象。注意：**HOC 不要修改传入组件本身的结构**（如各类生命周期函数）。

\- ***几个惯例***：

* 与 HOC 本身处理流程无关的 props 应直接传递给子组件；
* 常见的 HOC 签名类型：*Component => Component*，可以用类似 “compose” 的方法来组合执行多个 HOC；
* 为导出的包装组件增加 “displayName / name” 属性，以便于浏览器调试。

\- ***几个注意事项***：

* 不要在 `render` 方法里使用 HOC。因为每次会生成一个新的组件实例（类似 `data={...}` 或者 `handler={() => {...}`），导致渲染性能下降，并且丢失状态。相应的，可以在生命周期函数或者组件构造函数中使用；
* 使用 “hoist-non-react-statics” 库来“复制”包装组件上的静态方法到新组件上；
* ref 的传递需要基于 `React.forwardRef`。

#### JSX In Depth

JSX 只是一种 `React.createElement(component, props, ...children)` 函数的语法糖：

```javascript
<MyButton color="blue" shadowSize={2}>Click Me</MyButton>
```

```javascript
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
);
```

运行时组件类型确定：

```javascript
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // correct! JSX type can be a capitalized variable;
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

函数作为 props.children，被渲染成合法的组件结构：


```javascript
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

#### Performance

* `shouldComponentUpdate` 函数决定了是否进行 Node Diffing 的过程，但是否真正需要 Update 还是取决于前者的计算和比较结果。
* 对于 PureComponent 浅比较无法处理的场景（比如同一个数组/对象引用），我们一般可以用如下的方式来处理，以产生新的状态对象结构：

```javascript
function updateColorMap(colormap) {
  // Array.concat / Object.assign;
  return Object.assign({}, colormap, { right: 'blue' });
  // return {...colormap, right: 'blue'};
}
```

#### Portals

提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。使用 `ReactDOM.createPortal(child, container)` 将一个组件渲染到不同的 DOM 节点上，一般适用于 Modal 组件这种有自己独立挂载点的场景。

\- ***示例***：

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      document.getElementById('modal-root')
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

React 事件的冒泡和捕获不基于真实的 DOM 结构，而基于 JSX 结构。

```javascript
class Modal extends React.Component {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      document.getElementById('modal-root'),
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // event bubbling according to the JSX structure;
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, document.getElementById('app'));
```

#### Profiler

可用于测量渲染一个 React 应用多久渲染一次，以及渲染一次的“代价”。其目的是识别出应用中渲染较慢的部分。Profiler 的 `onRender` 函数会在其所包含组件树中任何组件“提交”一个更新时被调用。它的参数描述了渲染了什么和花费了多久。

\- ***示例***：

```javascript
const onRenderCallback = (
  id, // 发生提交的 Profiler 树的 “id”；
  phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一；
  actualDuration, // 本次更新 committed 花费的渲染时间；
  baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间；
  startTime, // 本次更新中 React 开始渲染的时间；
  commitTime, // 本次更新中 React committed 的时间；
  interactions // 属于本次更新的 interactions 的集合；
) => {}
render(
  <App>
    <Profiler id="Navigation" onRender={onRenderCallback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```


#### Refs and the DOM

Refs 用来引用 DOM 或者类组件实例。不能用在**函数组件上**，因为其没有对应的实例。

\- ***示例***：

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render() {
    return <div ref={this.ref} />;
  }
}
```

Callback Refs:

```javascript
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  // "this.inputElement" hold the DOM instance;
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

#### Render Props

通过 props 来传递需要在父组件中渲染的子组件，本质是一个用于告知子组件需要渲染什么内容的函数 prop。一般用于**将一个组件封装的状态或行为共享给其他需要相同状态的组件**。

\- ***示例***：

```javascript
class Mouse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }
  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }
  render() {
    return (
      <>
        <div className="screen" onMouseMove={this.handleMouseMove}>
          {this.props.children(this.state)}
        </div>
      </> 
    );
  }
}

class App extends React.Component {
  renderTheComponent = ({x, y}) => {
    return <><span>{x}</span>, <span>{y}</span></>
  }
  render() {
    // will only be rendered once.
    return (
      // <Mouse render={this.renderTheComponent}>
      <Mouse>
        {
          this.renderTheComponent
        }
      </Mouse>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

#### Strict Mode

仅会在开发者模式下运行，可以用来检查一些问题：

* 检测不安全的生命周期函数；
* 检测 legacy API 的使用；
* 检测已废弃的 `findDOMNode` 函数的使用；
* 检测非预料的副作用（譬如非幂等的初始化）；
* 检测过时的 Context API。

\- ***示例***：

```javascript
import React from 'react';

function App() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <MyComponent />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

#### PropTypes

用于规定 props 的字段、对应类型以及默认值（类型检测）。

\- ***示例***：

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  static defaultProps = {
    name: 'YHSPY'
  }

  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

#### Uncontrolled Components

表单控件的值由 DOM 元素自己来保存，而非组件的状态。**在需要时通过 ref 取出**。与可控组件不同的是，不可控组件无法做到及时与 UI 同步，因此不适用于表单即时反馈较强（如即时的输入检查）的场景。

\- ***示例***：

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            defaultValue="Bob"
            type="text"
            ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### Hooks

解决了类组件或者之前 React 组件在大型项目中遇到的一系列问题：

* 难以在组件之间重用具有状态性的逻辑；
* 组件的数据处理逻辑被分散在各个生命周期函数中，流程难以被理解；
* 多个类组件之间的逻辑关系混乱复杂。

```javascript
import React, { useState } from 'react';

function Example(props) {
  // declare a new state variable, which we'll call "count";
  const [count, setCount] = useState(0);
  // const [fruit, setFruit] = useState('banana');

  // we can use "useEffect" for multiple times;
  useEffect(() => {
    // component mount / update;
    document.title = `You clicked ${count} times`;
    return function () {
      // used for cleanup (every time re-rendering or unmount);
    };
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

\- ***Hooks 如何解决问题***：

* 将组件逻辑抽象在 Hooks 中以便重用；
* 通过注入多个 `useEffect` 将相关的操作操作放在同一个地方进行。
