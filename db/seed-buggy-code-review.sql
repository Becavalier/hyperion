-- 8 buggy code review questions (JavaScript).
-- User writes their bug analysis in the editor; AI reviews against answer_hint.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- 1
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Code Review · forEach + await 误用',
$content$
## Task

下面这段代码声称"并行抓取所有 url 的数据并返回结果数组"。在编辑器里列出所有 bug、说明**为什么是 bug**、并给出**修复方案**。

```js
async function fetchAll(urls) {
  const results = [];
  urls.forEach(async (url) => {
    const data = await fetch(url).then(r => r.json());
    results.push(data);
  });
  return results;
}
```

## How to answer

在编辑器里用注释或 markdown 列出：
- **Bug 1**: ... — 为什么 — 怎么修
- **Bug 2**: ...
- ...

完成后点 SUBMIT，AI 会根据 bug 清单对比你的分析。
$content$,
  'frontend', 'easy',
  ARRAY['code-review','buggy-code','javascript','async-await','promise'],
$hint$
**Bug 1 — `forEach` 不等待 async 回调**
`forEach` 同步遍历，回调返回的 Promise 被丢弃。函数立刻返回**空数组** `[]`，再 push 进去的 results 是异步副作用，调用方拿不到。

**Bug 2 — push 顺序不保证**
即使等到所有 fetch 完成，并发场景下哪个先 push 完全看网络快慢，**结果顺序和 input urls 顺序对不上**。

**Bug 3 — 错误吞掉**
每个 async 回调里抛出的 error 不会被 await 接住，变成 unhandled promise rejection。

**Fix**：
```js
async function fetchAll(urls) {
  return Promise.all(urls.map(url => fetch(url).then(r => r.json())));
}
```

或者要保留顺序但**串行**：
```js
for (const url of urls) {
  results.push(await fetch(url).then(r => r.json()));
}
```

部分失败仍想拿成功结果用 `Promise.allSettled`。
$hint$
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 2
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Code Review · var 循环闭包陷阱',
$content$
## Task

下面代码意图是"点击第 i 个按钮时打印 i"。指出所有 bug 并给出修复。

```js
function attachListeners(buttons) {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      console.log('clicked', i);
    });
  }
}
```

## How to answer

在编辑器里列出每个 bug + 为什么 + 修复方案。
$content$,
  'frontend', 'easy',
  ARRAY['code-review','buggy-code','javascript','closure','scope'],
$hint$
**Bug 1 — `var` 函数作用域 → 所有 listener 共享同一个 `i`**
循环结束后 `i === buttons.length`。每次点击都打印 `buttons.length`（数组长度），不是预期的索引。

**Bug 2 — 没有 cleanup**
函数没返回 unbind 接口；之后想 detach 是 listener 是不可能的（匿名函数不能 removeEventListener）。

**Bug 3 — 没考虑空数组 / null**
`buttons.length` 如果 buttons 是 NodeList / null 边界没处理。

**Fix**：
```js
function attachListeners(buttons) {
  const cleanups = [];
  for (let i = 0; i < buttons.length; i++) {      // let 块级作用域
    const handler = () => console.log('clicked', i);
    buttons[i].addEventListener('click', handler);
    cleanups.push(() => buttons[i].removeEventListener('click', handler));
  }
  return () => cleanups.forEach(fn => fn());      // 返回 unbind
}
```

或者更现代：
```js
buttons.forEach((btn, i) => btn.addEventListener('click', () => console.log('clicked', i)));
```
$hint$
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 3
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Code Review · React 直接 mutate state',
$content$
## Task

React TodoList 组件，点击 todo 应该切换 done 状态并重新渲染。指出 bug 并修复。

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'hi', done: false },
    { id: 2, text: 'world', done: false },
  ]);

  function toggle(id) {
    const target = todos.find(t => t.id === id);
    target.done = !target.done;
    setTodos(todos);
  }

  return todos.map(t => (
    <li key={t.id} onClick={() => toggle(t.id)}>{t.text}</li>
  ));
}
```

## How to answer

列出所有 bug + 原因 + 修复方案。
$content$,
  'frontend', 'medium',
  ARRAY['code-review','buggy-code','javascript','react','state-management'],
$hint$
**Bug 1 — 直接 mutate state 对象**
`target.done = !target.done` 修改了原对象。React 的 `setState` 用 **`Object.is` 浅比较**判断是否变化。

**Bug 2 — `setTodos(todos)` 传同一个引用**
浅比较结果"没变" → React **跳过本次重渲染**。即使 mutation 已经发生，UI 不更新。

**Bug 3 — 没渲染 `done` 状态**
即便重渲染了，模板里也没体现 done（无视觉变化、无 checkbox / style）。

**Bug 4 — `<li onClick>` 可访问性差**
应该用 `<button>` 或 `<input type="checkbox">`，否则键盘 / 屏幕阅读器无法操作。

**Bug 5 — 缺少 ref scope（潜在）**
如果父组件 re-render 导致 `useState` 的初始值变化用户预期，这里没用 lazy init。

**Fix**：
```jsx
function toggle(id) {
  setTodos(prev => prev.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  ));
}

return todos.map(t => (
  <li key={t.id}>
    <button onClick={() => toggle(t.id)}>
      {t.done ? '✓ ' : ''}{t.text}
    </button>
  </li>
));
```

不可变更新 + 函数式 setState + 渲染 done + button 元素。
$hint$
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 4
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Code Review · 事件监听内存泄漏',
$content$
## Task

下面是个 Modal 类，外面会 `new Modal()` 然后调 `destroy()` 销毁。找出所有 bug。

```js
class Modal {
  constructor(dialog) {
    this.dialog = dialog;
    this.handler = (e) => {
      if (e.key === 'Escape') this.close();
    };
    document.addEventListener('keydown', this.handler);
  }

  open()    { this.dialog.show(); }
  close()   { this.dialog.close(); }
  destroy() { this.dialog.remove(); }
}
```

## How to answer

列出 bug + 为什么 + 修复方案。
$content$,
  'frontend', 'medium',
  ARRAY['code-review','buggy-code','javascript','memory-leak','event-listener'],
$hint$
**Bug 1 — `destroy()` 没有 removeEventListener**
Modal 实例被丢弃后，DOM 上的 `keydown` 监听器仍然存在，且 handler 闭包**持有 `this`**，整个 Modal（包括 dialog 引用）**永远无法 GC** → 内存泄漏。

**Bug 2 — 全局监听 keydown，多个 Modal 互相干扰**
新建 N 个 Modal → N 个全局 keydown 监听器。任意按 Esc 会**同时关闭所有 Modal**。

**Bug 3 — 监听器在 constructor 里立刻挂上**
即使 Modal 还没 open，按 Esc 也会触发 close → close 一个未开的 dialog 可能报错。

**Bug 4 — 没区分目标**
keydown 监听 document 即使焦点在其他元素也响应；可能和其他应用的 Esc 行为冲突。

**Fix**：
```js
class Modal {
  constructor(dialog) {
    this.dialog = dialog;
    this.handler = (e) => { if (e.key === 'Escape') this.close(); };
  }
  open() {
    this.dialog.show();
    document.addEventListener('keydown', this.handler);   // 打开时才挂
  }
  close() {
    this.dialog.close();
    document.removeEventListener('keydown', this.handler); // 关闭时摘掉
  }
  destroy() {
    this.close();
    this.dialog.remove();
  }
}
```

更现代的方案：用 `AbortController`：
```js
this.ac = new AbortController();
document.addEventListener('keydown', this.handler, { signal: this.ac.signal });
destroy() { this.ac.abort(); }   // 自动移除所有监听
```
$hint$
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 5
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Code Review · reduce + async 串行陷阱',
$content$
## Task

下面代码"看起来"是用 reduce 串联处理 items，且声称并行。指出所有问题。

```js
async function processInOrder(items) {
  return items.reduce(async (accPromise, item) => {
    const acc = await accPromise;
    const result = await heavyAsyncWork(item);
    acc.push(result);
    return acc;
  }, Promise.resolve([]));
}
```

## How to answer

列出所有问题 + 解释。
$content$,
  'frontend', 'hard',
  ARRAY['code-review','buggy-code','javascript','async-await','promise','concurrency'],
$hint$
**Bug 1 — 完全串行，无并行价值**
每次 `await accPromise` 强制等上一次完成。reduce + async 看起来 fancy，但实际等价于普通 for-loop + await。如果 items 有 100 个、每个 heavyAsyncWork 1s，总耗时是 **100s 而不是 ~1s**。

**Bug 2 — 不易读**
用 reduce 表达本质是 for-loop 的串行 → 故意把简单事情复杂化。同事很难一眼看出意图。

**Bug 3 — 任意失败丢失部分结果**
任何一个 item 抛错，整个 reduce 链 reject，**之前累积的 result 全部丢失**。

**Bug 4 — acc 数组的副作用**
对累积器 mutate（`acc.push`）虽然这里串行没事，但 reduce 的语义本应是"返回新值"。混合 mutation + reduce 容易出 bug。

**Fix**：
- **真正需要并行**（不关心顺序，或天然按完成顺序）：
  ```js
  return Promise.all(items.map(heavyAsyncWork));
  ```
- **要按 input 顺序保留结果 + 并行**：
  ```js
  return Promise.all(items.map(heavyAsyncWork));  // Promise.all 保留 input 顺序
  ```
- **必须串行**（前一个的结果影响下一个）：
  ```js
  const results = [];
  for (const item of items) results.push(await heavyAsyncWork(item));
  return results;
  ```
- **部分失败仍想拿成功结果**：
  ```js
  return Promise.allSettled(items.map(heavyAsyncWork));
  ```

选哪种取决于业务语义 —— 但**永远不该是 reduce + async**。
$hint$
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 6
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Code Review · this 在 setInterval 里丢失',
$content$
## Task

```js
class Counter {
  count = 0;

  increment() { this.count++; }

  start() {
    setInterval(this.increment, 1000);
  }
}

new Counter().start();
```

预期是每秒 count + 1。指出所有 bug 并修复。

## How to answer

列出 bug + 原因 + 修复方案。
$content$,
  'frontend', 'medium',
  ARRAY['code-review','buggy-code','javascript','this-binding','class'],
$hint$
**Bug 1 — `this` 丢失**
`setInterval(this.increment, ...)` 把 `increment` 方法**剥离**了 class，调用时没有 receiver。strict mode 下 `this === undefined` → `this.count++` 抛 `TypeError`；非 strict 下 `this === globalThis` → 在 global 上意外创建了 `count`。

**Bug 2 — 没有 cleanup**
`setInterval` 返回的 timer id 没保存 → 永远停不下来。Counter 实例被丢弃后 interval 还在跑，回调持有 increment，**内存泄漏 + 持续 CPU 消耗**。

**Bug 3 — 没考虑 tab 不可见 / 节流**
浏览器后台 tab 的 setInterval 会被节流到 1Hz+。若需要精确计时，应该用 `Date.now()` 计算实际 elapsed。

**Fix**：
```js
class Counter {
  count = 0;

  // 方案 A：箭头函数 class field —— this 自动绑定到实例
  increment = () => { this.count++; };

  start() {
    this.timer = setInterval(this.increment, 1000);
  }
  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}
```

或者：
```js
start() {
  this.timer = setInterval(() => this.increment(), 1000);   // 箭头函数捕获外层 this
}
```

或者最老套的 `.bind`：
```js
start() {
  this.timer = setInterval(this.increment.bind(this), 1000);
}
```

→ 三种都能解 this。但**永远要给一个 stop 接口**。
$hint$
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 7
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Code Review · Date 解析时区漂移',
$content$
## Task

```js
function isToday(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return d.getFullYear() === now.getFullYear()
      && d.getMonth() === now.getMonth()
      && d.getDate() === now.getDate();
}

// 在北京（UTC+8）调用：
isToday('2026-06-01');   // 6 月 1 日早上 8 点之前都返回 false ?!
```

找出 bug 并给出修复方案。

## How to answer

列出所有问题 + 解释根因 + 修复。
$content$,
  'frontend', 'medium',
  ARRAY['code-review','buggy-code','javascript','date','timezone'],
$hint$
**Bug 1 — ISO date-only 按 UTC 解析**
`new Date('2026-06-01')` 严格按 ECMAScript 规范当成 **UTC 0 点**（即 `'2026-06-01T00:00:00Z'`）。在 UTC+8 看就是 **6 月 1 日 早上 8 点（北京）**。

**Bug 2 — getFullYear/Month/Date 走本地时区**
这些方法返回**本地时区**的年月日。所以 d 是 UTC 6-01 00:00 = 北京 6-01 08:00 → `d.getDate()` 在北京 6-01 08:00 之前可能是 5-31（如果你在 UTC-5 调用），之后才是 6-01。结合 Bug 1 → 一天的漂移。

**Bug 3 — 跨浏览器 / 实现不一致**
对**非 ISO 字符串**（如 `'06/01/2026'` / `'June 1, 2026'`）各 JS 引擎解析行为不同，更不可控。

**Bug 4 — 缺少边界处理**
传入 `null` / `undefined` / 非法字符串 → `new Date(...)` 返回 `Invalid Date`，比较结果是 NaN === NaN = false（看似没 bug，但调用方无法区分"今天"和"无效日期"）。

**Fix**：

**方案 A**：显式声明时区
```js
new Date('2026-06-01T00:00:00')      // 本地时区 0 点
new Date('2026-06-01T00:00:00Z')     // UTC 0 点
```

**方案 B**：拆解字符串避免 Date 介入
```js
function isToday(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const now = new Date();
  return y === now.getFullYear() && m === now.getMonth() + 1 && d === now.getDate();
}
```

**方案 C**：用现代 API
```js
// Temporal (Stage 3, 2026 部分浏览器原生支持)
Temporal.PlainDate.from(dateStr).equals(Temporal.Now.plainDateISO());

// 或 dayjs / date-fns
dayjs(dateStr).isSame(dayjs(), 'day');
```
$hint$
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 8
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Code Review · JSON.parse(JSON.stringify) 万能深拷贝？',
$content$
## Task

```js
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const original = {
  name: 'A',
  created: new Date(),
  greet: () => 'hi',
  meta: undefined,
  count: 42n,           // BigInt
  tags: new Set(['x']),
  ref: null,
};
original.self = original;       // 循环引用

const copy = deepClone(original);
```

列出所有这里 `deepClone` 会出问题的情况，给出修复方案。

## How to answer

逐项指出**哪种值类型**会被破坏 + 为什么 + 怎么修。
$content$,
  'frontend', 'medium',
  ARRAY['code-review','buggy-code','javascript','clone','json'],
$hint$
**Bug 1 — Date 变字符串**
`new Date()` → JSON.stringify 调用 `.toISOString()` 变成 ISO 字符串；parse 回来是字符串而非 Date。`copy.created.getTime()` 会 throw。

**Bug 2 — 函数被丢弃**
`greet` 是 function，JSON.stringify **直接 skip**。`copy.greet` 是 undefined。

**Bug 3 — undefined 被丢弃**
对象里 `meta: undefined` 在序列化时整个 key 被删除。`'meta' in copy === false`。

**Bug 4 — BigInt 抛错**
`JSON.stringify(42n)` 直接 throw `TypeError: Do not know how to serialize a BigInt`。整个 deepClone 失败。

**Bug 5 — 循环引用直接 throw**
`original.self = original` → `JSON.stringify` throw `TypeError: Converting circular structure to JSON`。

**Bug 6 — Map / Set / RegExp / TypedArray 变 plain object**
`new Set(['x'])` → `{}` 空对象。所有 Set 的内容丢失。

**Bug 7 — Symbol key 被丢弃**
对象里用 Symbol 作为 key 的属性，JSON.stringify 完全忽略。

**Bug 8 — 原型链丢失**
`new SomeClass()` 实例 → 拷贝后变成 plain object，不再 instanceof SomeClass。

**Bug 9 — 性能差**
完整 stringify + parse，比 native 深拷贝慢 5-10x。

**Fix**：
```js
const copy = structuredClone(original);
```

**`structuredClone`**（原生 / Node 17+ / 现代浏览器全支持）：
- ✅ 处理 Date / Map / Set / TypedArray / RegExp / 循环引用
- ✅ BigInt
- ❌ 仍不能拷 function / DOM 节点 / class 原型链

需要拷 function / 复杂原型链 → 上 `lodash.cloneDeep` 或手撸 + Object.getPrototypeOf。
$hint$
);
