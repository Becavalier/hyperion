> 如果你来到了这里，以下内容仅供参考。会不定期更新，总结于个人经验和看过的书。


## 基本原则

* **全职**：
  * *面试重点*：
    * 扎实的技术能力，及足够的技术深度（算法、框架、计算机基础等）；
    * 顺畅和谐的沟通（主要关注是否能快速理解问题、语气、耐心和态度如何）；
    * 以往的工程经验和设计能力；
    * 以往的团队管理与协作能力；
    * 未来中短期的职业生涯规划；
    * 熟练的英语语言能力（视面试职级和团队而定）。
  * *能力需求*：侧重技术的广度和深度能力，及过往项目经验，具备一定的沟通和协作能力，甚至发展潜力；
  * *角色职责*：企业核心人员。可持续培养，**负责长期技术规划和业务推进**。
* **外包**：
  * *面试重点*：
    * 短期过往项目经验（查看技术栈是否匹配）；
    * 基本的沟通能力（主要关注是否可以正确理解需求，具备一定的独立性）；
  * *能力需求*：可以正确使用相关工程技能，可以正确理解需求和问题；
  * *角色职责*：快速实施人员。**负责短期项目的低成本快速推进**。
* **实习**：
  * *面试重点*：
    * 基本的技术能力（算法、计算机基础等）；
    * 顺畅和谐的沟通（主要关注是否能快速理解问题、语气、耐心和态度如何）；
    * 感兴趣的工程方向和领域？
  * *能力需求*：具有不错的计算机基础知识储备，和不错的学习、沟通能力；
  * *角色职责*：公司人才引进（RCG）。**负责短期项目的方案调研（包括项目优化方案、POC 等）或随业务推进**。

## 技术问题

### 前端基础

* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#93">答</a>）HTML \<script\> 标签上使用 async 和 defer 属性的区别？
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#126">答</a>）`var` 和 `let` 的区别？
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#171">答</a>）Symbol 是什么？用途是什么？内置符号都有哪些？
* 为什么 *typeof NaN === ‘number’* 会返回 `true`？IEEE-754。
* IIFE 是什么？有哪些应用场景？
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#440">答</a>）Map 和 WeakMap 区别？WeakMap 的使用场景？Map 和 Set 是有序的吗？
* 修复下述代码输出，使其输出 1..5：

```javascript
for (var i = 1; i <= 5; ++i) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#482">答</a>）什么是迭代器？
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#499">答</a>）什么是生成器？应用场景？（自定义可迭代对象、实现输入输出、实现递归算法等）什么是迭代器？
* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#540">答</a>）`Object.is` 的相等性判断与 “===” 全等有何不同？
* `new` 的基本流程？
* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#661">答</a>）Reflect 的基本场景（Proxy）？
* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#707">答</a>）箭头函数与普通函数的区别？
* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#707">答</a>）什么是闭包？
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

* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#840">答</a>）什么是 `async` 和 `await`？`await` 的执行流程？
* （<a target="_blank" href="https://yhspy.com/2020/12/18/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-12-17-%E7%AB%A0%EF%BC%89/#1176">答</a>）事件冒泡与捕获的区别？什么是事件委托？
* JSONP 是什么？
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#278">答</a>）什么是 TDZ 暂时性死区？
* （<a target="_blank" href="https://yhspy.com/2020/12/24/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-18-28-%E7%AB%A0%EF%BC%89/#1317">答</a>）使用 `window.requestAnimationFrame()` 和 `setInterval()` 创建动画的区别？
* （<a target="_blank" href="https://yhspy.com/2021/02/05/%E3%80%8A%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%20JavaScript%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E4%B8%8A%EF%BC%89/#14">答</a>）什么是词法作用域？什么是动态作用域？
* 常见的网站和网页性能优化方式？
* 一个简单 MVVM 框架的实现思路？
* （<a target="_blank" href="https://yhspy.com/2020/12/24/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-18-28-%E7%AB%A0%EF%BC%89/#1452">答</a>）什么是 Atomics API？应用场景是什么？
* （<a target="_blank" href="https://yhspy.com/2017/04/24/BigPipe-%E5%8E%9F%E7%90%86%E5%AE%9E%E7%8E%B0%E4%B8%8E%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E5%88%86%E6%9E%90/">答</a>）BigPipe 的基本原理？


### React

* （<a target="_blank" href="https://yhspy.com/2019/04/26/React-%E7%9F%A5%E8%AF%86%E7%82%B9%E6%95%B4%E7%90%86/">答</a>）什么是 HOC 高阶组件？和 Render Props 的区别？
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

* （<a target="_blank" href="https://yhspy.com/2017/03/09/HTTP-%E5%9F%BA%E7%A1%80%E6%95%B4%E7%90%86/">答</a>）TCP 连接三次握手的流程？为什么断开连接需要四次握手？流程是什么？
* （<a target="_blank" href="https://yhspy.com/2021/02/19/%E3%80%8AHTTP-%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-6-%E7%AB%A0%EF%BC%89/#51">答</a>）PUT 和 POST 方法在语义上的差别？
* 你觉得 GET 方法可以携带 body 吗？
* （<a target="_blank" href="https://yhspy.com/2021/02/19/%E3%80%8AHTTP-%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-6-%E7%AB%A0%EF%BC%89/#81">答</a>）什么是 TCP 的“延迟确认”算法？
* （<a target="_blank" href="https://yhspy.com/2021/02/19/%E3%80%8AHTTP-%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-6-%E7%AB%A0%EF%BC%89/#81">答</a>）什么是 TCP 的慢启动？
* （<a target="_blank" href="https://yhspy.com/2021/02/19/%E3%80%8AHTTP-%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-6-%E7%AB%A0%EF%BC%89/#93">答</a>）HTTP/1.0 与 HTTP/1.1 支持“持久连接”的方式分别是什么？
* （<a target="_blank" href="http://localhost/2021/02/22/%E3%80%8AHTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-15%E3%80%8120%20%E7%AB%A0%EF%BC%89/#185">答</a>）缓存 - 服务器指定资源有效期使用的首部有哪些？
* （<a target="_blank" href="http://localhost/2021/02/22/%E3%80%8AHTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-15%E3%80%8120%20%E7%AB%A0%EF%BC%89/#186">答</a>）缓存 - 客户端进行缓存“再验证”时使用的首部有哪些？
* （<a target="_blank" href="http://localhost/2021/02/22/%E3%80%8AHTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-15%E3%80%8120%20%E7%AB%A0%EF%BC%89/#186">答</a>）缓存 - 客户端进行缓存覆盖和强制重载机制时使用的首部有哪些？
* （<a target="_blank" href="http://localhost/2021/02/22/%E3%80%8AHTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-15%E3%80%8120%20%E7%AB%A0%EF%BC%89/#217">答</a>）Web 隧道是什么？建立过程？SSL 隧道与 HTTP/HTTPS 网关的区别？
* CORS 对于简单请求和复杂请求的基本流程？
* （<a target="_blank" href="http://localhost/2021/02/22/%E3%80%8AHTTP%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-15%E3%80%8120%20%E7%AB%A0%EF%BC%89/#341">答</a>）HTTPS 中 SSL 握手的基本流程？
* HTTPS 能够防止中间人攻击吗？
* 相比 HTTP1.1，HTTP2 有哪些优化？

### 网站架构

* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#99">答</a>）常见的 LB 模式？LB 算法？
* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#78">答</a>）CAP 原理是什么？一般会怎样取舍？
* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#106">答</a>）分布式缓存的一致性 Hash 算法？优化？虚拟节点。
* 网站访问资源的二八定律？
* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#39">答</a>）性能测试、负载测试、压力测试的侧重点？
* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#71">答</a>）集群的 Session 管理一般有哪几种方式？

### CSS

* 什么是 CSS 盒模型？
* 单位 em 与 rem 区别？
* *position: relative* 属性的定位原点是？
* 如何使用 CSS 将下面 HTML 元素中位于奇数位置（163 与 167 行）的 *a* 标签内的文字变为红色？（*p > a:nth-of-type(odd) { color: red; }*）

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

* 为什么使用 “*text-indent: 2em;*” 可以将中文段落的首行缩进正好两个字符？


### Git

* *git rebase* 和 *git merge* 的区别？
* （<a target="_blank" href="https://yhspy.com/2020/10/19/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%201-6%20%E7%AB%A0%EF%BC%89/#44">答</a>）*git fetch* 和 *git pull* 的区别？
* （<a target="_blank" href="https://yhspy.com/2020/10/19/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%201-6%20%E7%AB%A0%EF%BC%89/#14">答</a>）Git 的三种状态？
* （<a target="_blank" href="https://yhspy.com/2020/10/19/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%201-6%20%E7%AB%A0%EF%BC%89/#63">答</a>）什么时候会采用 “Fast-forward” 合并模式？
* （<a target="_blank" href="https://yhspy.com/2020/11/02/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-10%20%E7%AB%A0%EF%BC%89/#275">答</a>）调试查出坏 commit 时采用的命令？*git bisect* 和 *git blame*。
* 拣选提交使用的命令？*git cherry-pick*。
* （<a target="_blank" href="https://yhspy.com/2020/11/02/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-10%20%E7%AB%A0%EF%BC%89/#415">答</a>）Git 分支、引用的本质？

### 其他

* 平日的学习方式？
* 对已有项目的讨论。

### 口语

1. How do you improve your personal skills in your spare time?
2. How is your life in the last year? What did you do?
3. In your opinion, what are some important characteristics of a good leader? Could you please show me a specific example to explain why these qualities are important?
