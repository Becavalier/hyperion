> 如果你来到了这里，以下内容仅供参考。会不定期更新，总结于个人经验和看过的书。


## Basic Principles

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

## Technical Questions

### Algorithm & Data Structure

* Please write a JavaScript function to transform the data of `input` to the expected output format.

```javascript
const input = { A: { A_1: { A_1_1: {} }, A_2: {}, }, B: { B_1: {}, B_3: {}, }, }
/**
 * Expected Output:
 * 
 * [{
 *   title: 'A',
 *   value: 'A',
 *   children: [{
 *     {
 *       title: 'A_1',
 *       value: 'A-A_1',
 *       children: [{
 *         title: 'A_1_1',
 *         value: 'A-A_1-A_1_1',
 *       }]
 *     }, {
 *       title: 'A_2',
 *       value: 'A-A_2',
 *     }
 *   }]
 * }, {
 *   ... 
 * }]
 */
```

* LeetCode - <a target="_blank" href="https://yhspy.com/2016/04/12/LeetCode-%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98-283-Move-Zeroes/">283. Move Zeros</a>.
* LeetCode - <a target="_blank" href="https://yhspy.com/2016/04/19/LeetCode-%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98-189-Rotate-Array/">189. Rotate Array</a>.

### Frontend

* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#93">A</a>）What's the difference between using `async` and `defer` attributes on HTML\<script\> tags?
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#126">A</a>）What's the difference between `var` and `let`?
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#171">A</a>）What's Symbol in JavaScript (ECMAScript)? What's its usage? Do you know any language pre-defined Symbol?
* Why does the JavaScript expression *typeof NaN === ‘number’* return true? IEEE-754。
* What is IIFE? Could you show me an example where we can use this technique?
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#440">A</a>）What's the difference between `Map` and `WeakMap`? Could you show me an example where we can use `WeakMap`? Are the elements inside `Map` and `Set` ordered?
* Could you please fix the below snippet of code to make it print numbers 1 to 5?

```javascript
for (var i = 1; i <= 5; ++i) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#482">A</a>）What's Iterator?
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#499">A</a>）What's Generator? Scenarios?(Custom Iterable Objects, etc）
* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#540">A</a>）The function `Object.is` and Strict Equality Operator are all can be used to compare two values, but what's the difference?
* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#707">A</a>）What's the difference between arrow function and normal function in JavaScript?
* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#707">A</a>）What's Closure in JavaScript?
* What's the order of the printed numbers of the below code?

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

* （<a target="_blank" href="https://yhspy.com/2020/12/14/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-8-11-%E7%AB%A0%EF%BC%89/#840">A</a>）What are `async` and `await`?
* （<a target="_blank" href="https://yhspy.com/2020/12/18/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-12-17-%E7%AB%A0%EF%BC%89/#1176">A</a>）What's the difference between event bubbling and capturing? What's event delegation?
* What's JSONP?
* （<a target="_blank" href="https://yhspy.com/2020/12/08/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-7-%E7%AB%A0%EF%BC%89/#278">A</a>）What's TDZ (Temporal Dead Zone)?
* （<a target="_blank" href="https://yhspy.com/2020/12/24/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-18-28-%E7%AB%A0%EF%BC%89/#1317">A</a>）Let's say I wanna make a Frame-by-frame animation with JavaScript, so in the case, Which function should I use for better performance? `window.requestAnimationFrame()` or `setInterval()`?
* （<a target="_blank" href="https://yhspy.com/2021/02/05/%E3%80%8A%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%20JavaScript%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E4%B8%8A%EF%BC%89/#14">A</a>）What is lexical scope? What is dynamic scope?
*  Can you tell me some practical ways to improve website performance?
* Can you briefly conclude about the important steps to make a MVVM framework like Vuejs or React?
* （<a target="_blank" href="https://yhspy.com/2020/12/24/%E3%80%8AJavaScript-%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-18-28-%E7%AB%A0%EF%BC%89/#1452">A</a>）What's Atomics API? Scenarios?
* （<a target="_blank" href="https://yhspy.com/2017/04/24/BigPipe-%E5%8E%9F%E7%90%86%E5%AE%9E%E7%8E%B0%E4%B8%8E%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF%E5%88%86%E6%9E%90/">A</a>）What's the mechanism of the technique so-called BigPipe?


### React

* （<a target="_blank" href="https://yhspy.com/2019/04/26/React-%E7%9F%A5%E8%AF%86%E7%82%B9%E6%95%B4%E7%90%86/">A</a>）What's HOC? The difference from Render Props?
* What's React Fiber?
* What's JSX? How do think JSX based framework and template based framework?
* What's the batch update of `setState`? What's the output result of the below code? How to fix it to make it print the number in ascending order?

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

* How to use Context API combined with Redux/Mbox?
* What are the life cycle functions of the Class-based React?
* How does the diffing algorithm work? How does React optimize it?
* What are the potential problems if I use array indices as the keys of the list items when I implement this with React?
* What are controlled components and uncontrolled components?
* Why does React provide Hooks? What problems does it solve when compared to the class component?
* What's the difference between`createRef` and `useRef`?
* What rules you need to obey when using Hooks?
* How does `useEffect` work? Difference from `componentDidMount`?
* What's `useReducer`?
* When should we use `useCallback`?
* [Redux] How do you understand "The Single Truth of Source" in Redux?
* [Redux] What's Redux, how does it implemented?
* [Redux] What is "Pure Function"? Why do we need to use "Pure Funciton" as Reducers in Redux?

### HTTP

* （<a target="_blank" href="https://yhspy.com/2017/03/09/HTTP-%E5%9F%BA%E7%A1%80%E6%95%B4%E7%90%86/">A</a>）What are the steps of three handshakes for a TCP connection? Why does it take four handshakes to disconnect? What are the processes?
* （<a target="_blank" href="https://yhspy.com/2021/02/19/%E3%80%8AHTTP-%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-6-%E7%AB%A0%EF%BC%89/#51">A</a>）What is the semantic difference between PUT and POST methods?
* Do you think the GET method can carry a body?
* （<a target="_blank" href="https://yhspy.com/2021/02/19/%E3%80%8AHTTP-%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-6-%E7%AB%A0%EF%BC%89/#81">A</a>）What is TCP's "delayed acknowledgement" algorithm?
* （<a target="_blank" href="https://yhspy.com/2021/02/19/%E3%80%8AHTTP-%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC-1-6-%E7%AB%A0%EF%BC%89/#81">A</a>）What is the slow start of TCP?
* What is CORS?
* What are the optimizations of HTTP2 compared to HTTP1.1?

### Website Architecture

* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#99">A</a>）What are the commonly used LB patterns? And LB algorithms?
* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#78">A</a>）What is CAP principle? Usually, how do we make the choice?
* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#106">A</a>）Can you show me some hash algorithms for distributed caching?
* How do you understand the Pareto principle of the website access?
* （<a target="_blank" href="https://yhspy.com/2017/04/29/%E3%80%8A%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%AB%99%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%20-%20%E6%A0%B8%E5%BF%83%E5%8E%9F%E7%90%86%E4%B8%8E%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0/#71">A</a>）What are the general ways to manage Sessions in a cluster?

### CSS

* What's the CSS box model?
* What's the difference between unit "em" and "rem"?

### Git

* What's the difference between *git rebase* and *git merge*?
* （<a target="_blank" href="https://yhspy.com/2020/10/19/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%201-6%20%E7%AB%A0%EF%BC%89/#44">A</a>）What's the difference between *git fetch* and *git pull*?
* （<a target="_blank" href="https://yhspy.com/2020/10/19/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%201-6%20%E7%AB%A0%EF%BC%89/#14">A</a>）What are the three status of Git?
* （<a target="_blank" href="https://yhspy.com/2020/10/19/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%201-6%20%E7%AB%A0%EF%BC%89/#63">A</a>）When does Git use “Fast-forward” mode to merge two branches?
* （<a target="_blank" href="https://yhspy.com/2020/11/02/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-10%20%E7%AB%A0%EF%BC%89/#275">A</a>）How can you find the broken commit with Git?
* （<a target="_blank" href="https://yhspy.com/2020/11/02/%E3%80%8APro-Git-2nd-Edition%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%EF%BC%88%E7%AC%AC%207-10%20%E7%AB%A0%EF%BC%89/#415">A</a>）What are the essences of Git branch and reference?

### Others

* How do you learn new knowledge in your spare time?
