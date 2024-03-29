> 以下内容仅供参考，总结于个人经验和看过的书。


## 基本原则

* **全职（FTE）**：
  * *面试重点*：
    * 扎实的基础技术能力，及足够的技术深度（算法、框架、计算机基础等）；
    * 顺畅和谐的沟通（主要关注是否能快速理解问题、语气、耐心和态度如何）；
    * 以往的工程经验和设计能力；
    * 以往的团队管理与协作能力；
    * 未来中短期的职业生涯规划；
    * 熟练的英语语言能力（视职级和团队而定）。
  * *能力需求*：侧重技术的广度和深度能力，及过往项目经验，具备一定的沟通和协作能力，甚至发展潜力；
  * *角色职责*：企业核心人员。可持续培养，**负责长期技术规划和业务推进**。
* **外包（AWF）**：
  * *面试重点*：
    * 短期过往项目经验（查看技术栈是否匹配）；
    * 基本的沟通能力（主要关注是否可以正确理解需求，具备一定的独立性）；
  * *能力需求*：可以正确使用相关工程技能，可以正确理解需求和问题；
  * *角色职责*：快速实施人员。**负责短期项目的低成本快速推进**。
* **实习（Intern）**：
  * *面试重点*：
    * 基本的技术能力（算法、计算机基础等）；
    * 顺畅和谐的沟通（主要关注是否能快速理解问题、语气、耐心和态度如何）；
    * 感兴趣的工程方向和领域？
  * *能力需求*：具有不错的计算机基础知识储备，和不错的学习、沟通能力；
  * *角色职责*：公司人才引进（RCG）。**负责短期项目的方案调研（包括项目优化方案、POC 等）或随业务推进**。

## 技术问题

### 前端基础

* HTML \<script\> 标签上使用 async 和 defer 属性的区别？
* `var` 和 `let` 的区别？
* Symbol 是什么？用途是什么？内置符号都有哪些？
* 为什么 *typeof NaN === ‘number’* 会返回 `true`？IEEE-754。
* IIFE 是什么？有哪些应用场景？
* Map 和 WeakMap 区别？WeakMap 的使用场景？Map 和 Set 是有序的吗？
* 修复下述代码输出，使其输出 1..5：

```javascript
for (var i = 1; i <= 5; ++i) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

* 什么是迭代器？
* 什么是生成器？应用场景？（自定义可迭代对象、实现输入输出、实现递归算法等）什么是迭代器？
* `Object.is` 的相等性判断与 “===” 全等有何不同？
* `new` 的基本流程？
* Reflect 的基本场景（Proxy）？
* 箭头函数与普通函数的区别？
* 什么是闭包？
* 下面代码的输出顺序？

```javascript
console.log(1)
setTimeout(() => {
    queueMicrotask(() => {
      console.log(2)
    });
  console.log(3)
});
Promise.resolve().then(() => console.log(4))
queueMicrotask(() => {
    console.log(5)
    queueMicrotask(() => {
        console.log(6)
    });
});
console.log(7)
```

* 什么是 `async` 和 `await`？`await` 的执行流程？
* 事件冒泡与捕获的区别？什么是事件委托？
* JSONP 是什么？
* 什么是 TDZ 暂时性死区？
* 使用 `window.requestAnimationFrame()` 和 `setInterval()` 创建动画的区别？
* 什么是词法作用域？什么是动态作用域？
* 常见的网站和网页性能优化方式？
* 一个简单 MVVM 框架的实现思路？
* 什么是 Atomics API？应用场景是什么？
* BigPipe 的基本原理？


### React

* 什么是 HOC 高阶组件？和 Render Props 的区别？
* React Fiber 的基本原理？
* JSX 的本质是什么？相较于基于模板的 UI 框架有什么优劣？
* `setState` 的批量更新是什么？下述代码的输出结果？怎样修复使结果按升序输出？

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

* Context API 与 Redux/Mbox 之间的协作方式？
* Class-based React 生命周期有哪些？
* VNode 的 diffing 算法基本流程？React 是怎样“优化”的？即做了哪些假设。
* JSX 回调函数中的 this 绑定问题如何修复（*即 class 的方法默认不会绑定 this*）？
* 使用数字索引值作为列表组件的 key 值可能有什么问题？
* Render Props 的应用场景？
* 受控组件 & 非受控组件的区别？
* React 为什么会有 Hook 机制？相比 class 解决了哪些问题？
* `createRef` 与 `useRef` 的区别？
* Hook 的使用有什么需要遵循的规则？
* `useEffect` 的执行时机？`useEffect` 模拟的 `componentDidMount` 生命周期方法可能有什么问题？
* `useReducer` 适用于哪些场景？
* `useCallback` 如何使用？
* [Redux] 如何理解 “The Single Truth of Source”？
* [Redux] 基本实现原理？发布-订阅。
* [Redux] 何为“纯函数”？为什么 reducer 要使用纯函数？

### HTTP

* TCP 连接三次握手的流程？为什么断开连接需要四次握手？流程是什么？
* PUT 和 POST 方法在语义上的差别？
* 你觉得 GET 方法可以携带 body 吗？
* 什么是 TCP 的“延迟确认”算法？
* 什么是 TCP 的慢启动？
* HTTP/1.0 与 HTTP/1.1 支持“持久连接”的方式分别是什么？
* 缓存 - 服务器指定资源有效期使用的首部有哪些？
* 缓存 - 客户端进行缓存“再验证”时使用的首部有哪些？
* 缓存 - 客户端进行缓存覆盖和强制重载机制时使用的首部有哪些？
* Web 隧道是什么？建立过程？SSL 隧道与 HTTP/HTTPS 网关的区别？
* CORS 对于简单请求和复杂请求的基本流程？
* HTTPS 中 SSL 握手的基本流程？
* HTTPS 能够防止中间人攻击吗？
* 相比 HTTP1.1，HTTP2 有哪些优化？

### 网站架构

* 常见的 LB 模式？LB 算法？
* CAP 原理是什么？一般会怎样取舍？
* 分布式缓存的一致性 Hash 算法？优化？虚拟节点。
* 网站访问资源的二八定律？
* 性能测试、负载测试、压力测试的侧重点？
* 集群的 Session 管理一般有哪几种方式？

### CSS

* 什么是置换元素（Replaced Element）与非置换元素（Non-replaced Element）？
* 在 HTML 中，块级元素能出现在行内元素中吗？
* HTML 文档关联 CSS 样式的几种方式？（内联、HTTP 首部、\<link\> 标签等）
* 使用 CSS 精准匹配下列带有 “apple-” 类名的 \<span\> 元素，并设置其字体颜色为红色：

```html
<div>
  <span class="apple-1">1</span>
  <span class="apple-2">2</span>
  <span class="banana-3">3</span>
  <span class="banana-4">4</span>
</div>
```

* 什么是 LVFHA 顺序？为什么要遵守？
* 特指度（Specificity）是什么？它的计算规则是怎样的？继承的属性是否有特指度？
* 单位 em 与 rem 区别？字体的 em 方框（没有行距的情况下两条基线之间的距离）通常为多大？
* 单位 vw 和 vh 是怎样进行度量的？
* 什么是 CSS 插入属性值（attr() 方法）？
* HSLa 色系是怎样组成的？相比 RGBa 在 3D 颜色空间中有什么区别？
* 如何在 CSS 中创建变量？
* 为什么将 *text-indent* 属性设置为 “2em” 可以将中文段落的首行缩进正好两个字符？
* *line-height* 指的是什么距离？默认情况下通常为多大？
* *vertical-align* 可用于哪些元素？“middle” 属性值的位置是怎样计算的？
* 什么是 CSS 盒模型？
* 边距折叠是指什么？
* 带有 *position: relative* 属性元素的定位原点是哪里？
* 带有 *position: absolute* 属性元素的容纳块是什么？
* 绝对定位的元素如何做到上下左右居中？
* Flexbox 布局中 *justify-content* 与 *align-content* 属性有何区别？
* Grid 布局中 fit-content() 函数的计算逻辑是什么？
* 请大致画出下列 Grid 布局的情况：

```css
#grid {
  display: grid;
  grid-template-areas:
    "header header header header"
    "left left ... right"
    "footer footer footer footer";
  grid-template-rows: 40px 10em 20px;
  grid-template-columns: 1fr 20em 20em 1fr;
}
span:nth-child(1) { grid-area: header; }
span:nth-child(2) { grid-area: right; }		
span:nth-child(3) {
  grid-row-start: left;
  grid-column-start: 2;
}	
```

* 在表格布局中，默认布局与 “fixed” 布局有何区别？
* 为什么针对 *transform* 和 （ 属性的动态变化最好可以放在 CSS 动画中进行？
* 如何使用 CSS 将下面 HTML 元素中位于奇数位置（163 与 167 行）的 \<a\> 标签内的文字变为红色？（<i>p > a:nth-of-type(odd) { color: red; }</i>）

```html
<p>
  <span>I'd like to drink</span>
  <a>Pepsi</a>
  <span>and</span>
  <a>Starbuck</a>
  <span>and</span>
  <a>Fresh Water</a>
</p>
```


### Git

* *git rebase* 和 *git merge* 的区别？
* *git fetch* 和 *git pull* 的区别？
* Git 的三种状态？
* 什么时候会采用 “Fast-forward” 合并模式？
* 调试查出坏 commit 时采用的命令？*git bisect* 和 *git blame*。
* 拣选提交使用的命令？*git cherry-pick*。
* Git 分支、引用的本质？

### 其他

* 平日的学习方式？
* 对已有项目的讨论。

### 口语

1. How do you improve your personal skills in your spare time?
2. How is your life in the last year? What did you do?
3. In your opinion, what are some important characteristics of a good leader? Could you please show me a specific example to explain why these qualities are important?
