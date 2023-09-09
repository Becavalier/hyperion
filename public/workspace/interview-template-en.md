> 以下内容仅供参考，总结于个人经验和看过的书。


## Basic Principles

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

* LeetCode - <a target="_blank" href="https://hangyu.site/2016/04/12/LeetCode-%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98-283-Move-Zeroes/">283. Move Zeros</a>.
* LeetCode - <a target="_blank" href="https://hangyu.site/2016/04/19/LeetCode-%E6%AF%8F%E6%97%A5%E4%B8%80%E9%A2%98-189-Rotate-Array/">189. Rotate Array</a>.

### Frontend

* What's the difference between using `async` and `defer` attributes on HTML\<script\> tags?
* What's the difference between `var` and `let`?
* What's Symbol in JavaScript (ECMAScript)? What's its usage? Do you know any language pre-defined Symbol?
* Why does the JavaScript expression *typeof NaN === ‘number’* return true? IEEE-754。
* What is IIFE? Could you show me an example where we can use this technique?
* What's the difference between `Map` and `WeakMap`? Could you show me an example where we can use `WeakMap`? Are the elements inside `Map` and `Set` ordered?
* Could you please fix the below snippet of code to make it print numbers 1 to 5?

```javascript
for (var i = 1; i <= 5; ++i) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

* What's Iterator?
* What's Generator? Scenarios?(Custom Iterable Objects, etc）
* The function `Object.is` and Strict Equality Operator are all can be used to compare two values, but what's the difference?
* What's the difference between arrow function and normal function in JavaScript?
* What's Closure in JavaScript?
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

* What are `async` and `await`?
* What's the difference between event bubbling and capturing? What's event delegation?
* What's JSONP?
* What's TDZ (Temporal Dead Zone)?
* Let's say I wanna make a Frame-by-frame animation with JavaScript, so in the case, Which function should I use for better performance? `window.requestAnimationFrame()` or `setInterval()`?
* What is lexical scope? What is dynamic scope?
*  Can you tell me some practical ways to improve website performance?
* Can you briefly conclude about the important steps to make a MVVM framework like Vuejs or React?
* What's Atomics API? Scenarios?
* What's the mechanism of the technique so-called BigPipe?


### React

* What's HOC? The difference from Render Props?
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

* What are the steps of three handshakes for a TCP connection? Why does it take four handshakes to disconnect? What are the processes?
* What is the semantic difference between PUT and POST methods?
* Do you think the GET method can carry a body?
* What is TCP's "delayed acknowledgement" algorithm?
* What is the slow start of TCP?
* What is CORS?
* What are the optimizations of HTTP2 compared to HTTP1.1?

### Website Architecture

* What are the commonly used LB patterns? And LB algorithms?
* What is CAP principle? Usually, how do we make the choice?
* Can you show me some hash algorithms for distributed caching?
* How do you understand the Pareto principle of the website access?
* What are the general ways to manage Sessions in a cluster?

### CSS

* What's the CSS box model?
* What's the difference between unit "em" and "rem"?

### Git

* What's the difference between *git rebase* and *git merge*?
* What's the difference between *git fetch* and *git pull*?
* What are the three status of Git?
* When does Git use “Fast-forward” mode to merge two branches?
* How can you find the broken commit with Git?
* What are the essences of Git branch and reference?

### Others

* How do you learn new knowledge in your spare time?
