---
title: PureRenderMixin & immutable.js 提高 VDOM 渲染效率
intro: 最近用了一段时间的 Reactjs，其实大部分前端框架的核心原理都很相似，包括响应式、足够轻量级、基于 Virtual-DOM 等特性。从整体上来看，Vuejs 是基于模版进行应用构建的，在中小型应用中有一定的优势。而 Reactjs 则需要我们在 JavaScript 中使用 JSX 手动的来创建 DOM。
comments: true
date: 2017-05-18 16:04:49
tags:
- React
---


最近用了一段时间的 Reactjs，其实大部分前端框架的核心原理都很相似，包括响应式、足够轻量级、基于 Virtual-DOM 等特性。从整体上来看，Vuejs 是基于模版进行应用构建的，在中小型应用中有一定的优势。而 Reactjs 则需要我们在 JavaScript 中使用 JSX 手动的来创建 DOM。

开始一个新的 Reactjs 项目，我们通过自动化的脚手架创建工具 [create-react-app](https://github.com/facebookincubator/create-react-app) 来创建一个初始化的全新 Reactjs 工程。

Reactjs 本身通过计算 Virtual DOM 之间的差异（Diff）来更新 UI 组件。每当 `props` 或者 `state` 改变时，Reactjs 会重新计算生成一个 Virtual DOM 对象，并且通过比较两个 VD 对象之间的差异来找出数据改变引起对应在 UI 上的差异，最后采用最小的成本来更新 UI。在纯函数组件（同样的数据对应同样的 UI）下，对于相同的 `props` 和 `state`，其对应的 UI 显示应该是相同的。因此，当传递给组件的 `props` 或者 `state` 的改变与之前相同时，Reactjs 可以完全省略掉此时对组件 VD 的 Diff 计算，这在某种程度上可以提高 Reactjs 组件的渲染性能。为此，Reactjs 为我们提供了扩展的插件（Addon）“PureRenderMixin” 来解决这个问题。


```javascript
import PureRenderMixin from 'react-addons-pure-render-mixin';
class FooComponent extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <div className={this.props.className}>foo</div>;
  }
}
```

“PureRenderMixin” 的原理就是它实现了 `shouldComponentUpdate`。在 `shouldComponentUpdate` 内部，它比较当前的 `props` 和 `state` 和接下来的 `props` 以及 `state`，当两者相等的时候返回 `false`，这样组件就不会进行 Virtual DOM 上的 Diff 计算了。但 “PureRenderMixin” 仅进行简单的浅比较，对简单数据类型有效，如果需要对复杂数据类型进行比较来决定是否需要更新 UI，则需要从另一方面来考虑比较两个复杂数据结构所花费的成本和构建 VD 计算 Diff 所花费的成本哪个更大了。如果一定需要对复杂结构的数据来进行差异比较，也可以使用 immutable.js 来帮助我们提高性能。

总的来说，immutable.js 可以帮助我们提高深拷贝的性能，也即在深度比较两个复杂数据类型时会有更高的性能。immutable.js 提供了7种数据结构，并且这些数据结构均是“不可变数据”，即操作改变这些元素的值时会返回一个新的元素，而原先元素的值不受影响。不仅如此，immutable.js 基于“哈希映射树”和“向量映射树”，在克隆一个数据结构时只会克隆改变的节点以及该节点的所有子节点，因此对于其上层的父节点可以得到完全的复用，这样也可以大大提高“深拷贝”的效率。

![](1.gif)


```javascript
shouldComponentUpdate: function(nextProps, nextState) {
  return deepCompare(this, nextProps, nextState);
},

...

function deepCompare(instance, nextProps, nextState) {
  return !Immutable.is(instance.props, nextProps) || !Immutable.is(instance.state, nextState);
}
```

但使用 immutable.js 也有相对应以下几点的缺点与不足：

1. 导致最后打包编译的源码体积增大；
2. immutable.js 的数据类型在与服务器进行交互时需要转换成基础的 JavaScript 数据类型
