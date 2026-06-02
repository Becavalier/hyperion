-- JS Event Loop quiz card (browser + Node + modern APIs).

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'JS Event Loop · 微任务 / 宏任务 / rAF / 渲染时序',
$content$
## JS 单线程执行模型的问题

JS 主线程一次只能执行一个任务。**所有任务排队过同一个线程** —— 一个长任务会卡住后续所有任务，包括 UI 更新、用户输入响应。

这就是为啥：

- 同步循环跑几秒 → 页面整段冻结（点不动、滚不动）
- `alert()` 期间所有 JS / 渲染全停
- 大 JSON 解析、复杂正则、大数组排序都可能卡 UI

**单线程不是 JS 的缺点，是它的设计选择** —— 简化心智模型，避免 race condition。代价是 CPU 密集任务必须想办法**让出主线程**（Web Worker / 切片 / yield to main thread）。

---

## 事件循环（browser）

每一轮（"tick"）大致流程：

```
1. 拿一个宏任务（macro task）执行到完
   ├─ 脚本同步代码
2. 清空整个微任务队列（micro tasks）
   ├─ Promise.then / queueMicrotask / MutationObserver
   ├─ 微任务执行中又产生新微任务 → 也在本轮内执行完（⚠️ 饿死风险）
3. 检查是否需要渲染（距离上次绘制 ≈ 16.67ms？显示器 vsync？）
   ├─ rAF 回调（准备渲染下一帧）
   ├─ Resize Observer / Intersection Observer 回调
   ├─ 渲染阶段：Style / Layout / Paint / Composite
   ├─ 当前帧还有剩余时间？→ 执行 requestIdleCallback
4. 回到 1，拿下一个宏任务
```

要点：

- **一个宏任务执行完才会清微任务** —— 而不是"宏任务之间穿插微任务"
- **微任务队列要被完全清空**才会进入渲染检查 → 这就是"微任务饿死"的根源
- **渲染不是每轮都跑** —— 浏览器按显示器刷新率决定（典型 60Hz = 16.67ms / 帧）

---

## 宏任务 vs 微任务

| | 宏任务 (macro task) | 微任务 (micro task) |
|---|---|---|
| **典型来源** | `setTimeout` / `setInterval` / I/O / UI 事件 / `MessageChannel` / `requestIdleCallback` | `Promise.then` / `queueMicrotask` / `MutationObserver` / `process.nextTick` (Node) |
| **执行时机** | 每轮**拿一个** | 微任务队列**完全清空** |
| **新任务何时跑** | 下一轮 | **本轮内继续执行**直到清空 |
| **能否阻塞渲染** | 单个长任务会阻塞下一帧 | 队列长会完全阻塞渲染（饿死 UI） |

### 经典面试题

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 输出顺序：1, 4, 3, 2
```

解释：
1. 同步：`1` → `4`
2. 同步代码跑完 → 清微任务 → Promise.then 跑 → `3`
3. 微任务清空 → 下一轮宏任务 → setTimeout → `2`

---

## 微任务饿死（starvation）

```js
function evil() {
  queueMicrotask(evil);  // 微任务里继续 queue 微任务
}
evil();  // 浏览器永远不会进入渲染阶段
```

**症状**：页面完全无响应，CPU 占满，但没有报错。

**典型业务陷阱**：

```js
// async/await 链超长，每个 await 是个微任务
async function processAll(items) {
  for (const item of items) {
    await process(item);   // 1000 个 item → 1000 个微任务连续跑
  }
}
```

如果 `items` 巨大、`process` 很快但同步密集，**整个循环对外表现为"卡死直到所有 item 处理完"** —— 因为微任务队列一直不空，浏览器进不了渲染。

**对策**：插入宏任务让出主线程（见后文 "yield to main thread"）。

---

## requestAnimationFrame (rAF)

### 为什么 rAF 比 setInterval / setTimeout 做动画性能更好？

| | rAF | setInterval(fn, 16) |
|---|---|---|
| 调度时机 | **跟显示器刷新率对齐**（60Hz 屏自然 60fps，120Hz 屏自然 120fps） | 固定间隔（不感知刷新率） |
| 在事件循环中 | **嵌在渲染流程里**（位置确定） | 作为宏任务排队（位置不定） |
| 页面隐藏时 | **自动暂停**（tab 切走、屏幕关闭） | 继续跑（浪费 CPU + 电） |
| 同一帧多个回调 | 浏览器批量合并 | 各跑各的 |
| 帧率稳定性 | 高 | 低（受其他宏任务影响） |

### rAF 的回调参数

rAF 回调接收一个 **`DOMHighResTimeStamp`**（高精度时间戳，毫秒，但有亚毫秒精度；单调递增；和 `performance.now()` 同源）。表示**当前帧的时间戳**。

利用这个参数可以：**展示/控制动画进度**、**进行性能监控**：

```js
const performanceMonitor = {
  frames: [],
  monitor(timestamp) {
    this.frames.push(timestamp);
    if (this.frames.length > 60) this.frames.shift();

    // 计算平均帧时间
    if (this.frames.length > 1) {
      const totalTime = this.frames[this.frames.length - 1] - this.frames[0];
      const avgFrameTime = totalTime / (this.frames.length - 1);
      const avgFPS = 1000 / avgFrameTime;
      console.log(`Average FPS: ${avgFPS.toFixed(2)}`);
    }
    requestAnimationFrame((t) => this.monitor(t));
  }
};
performanceMonitor.monitor(performance.now());
```

### 动画基于时间戳，不基于帧数

```js
let start;
function animate(timestamp) {
  if (!start) start = timestamp;
  const elapsed = timestamp - start;
  el.style.transform = `translateX(${Math.min(elapsed / 10, 200)}px)`;
  if (elapsed < 2000) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

→ 即使设备掉帧（30fps），**距离 = 时间 × 速度**，动画仍按真实时间推进；如果按 `frame++` 计数则会"快机器更快、慢机器更慢"。

---

## requestIdleCallback (rIC)

在浏览器**当前帧渲染完后还有空闲时间**的尾巴里跑回调。回调接收一个 `IdleDeadline`：

```js
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0 && tasks.length) {
    const task = tasks.shift();
    task();
  }
  if (tasks.length) requestIdleCallback(/* loop */);
});
```

特点：

- **永远不阻塞渲染** —— 帧没空闲时间，rIC 就不跑
- 但**可能很久不被调度**（如果页面持续繁忙），可以设 `timeout` 兜底
- **Safari 长期不支持** —— 用 React Scheduler 之类的 polyfill（基于 MessageChannel）
- React Scheduler 不直接用 rIC 就是因为兼容性 + Safari 缺失

适合：埋点上报、预加载、低优先级数据准备。**不适合**：用户感知的操作。

---

## yield to main thread / 切片

把大任务拆成小块，**主动让出主线程让浏览器去渲染 + 响应输入**：

```js
// 朴素切片：每跑一片 setTimeout 一下让宏任务循环跑一轮
async function processInChunks(items, chunkSize = 100) {
  for (let i = 0; i < items.length; i += chunkSize) {
    items.slice(i, i + chunkSize).forEach(process);
    await new Promise(r => setTimeout(r));   // 让出
  }
}
```

### 新 API：`scheduler.yield()` / `scheduler.postTask()`

Chrome 推的 [Scheduler API](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler)，比 `setTimeout(0)` 更精准的"让一下"：

```js
async function processInChunks(items) {
  for (const item of items) {
    process(item);
    if (navigator.scheduling?.isInputPending()) {
      await scheduler.yield();   // 有用户输入正在等？立刻让出
    }
  }
}
```

`scheduler.postTask(fn, { priority: 'user-blocking' | 'user-visible' | 'background' })` —— 比 setTimeout 多了优先级语义。React 19 的 Scheduler 在能用的环境会切到这套 API。

---

## Long Task 定义

Performance API 把**主线程上单次执行 > 50ms** 的任务定义为 **Long Task**：

```js
new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.warn(`Long task: ${entry.duration}ms`, entry.name);
  });
}).observe({ entryTypes: ['longtask'] });
```

**为什么是 50ms？** 浏览器希望每帧 16.67ms 完成。单任务超过 50ms 意味着至少漏 2-3 帧；用户能明显感知到"卡了一下"。Web Vitals 的 **INP**（Interaction to Next Paint）就紧盯这个。

---

## Web Worker —— 真正的多线程

事件循环的把戏（切片 / scheduler.yield）只是"让出"，CPU 密集任务**最终还是在主线程**。要真正并行 → **Web Worker**。

```js
// main.js
const w = new Worker('worker.js');
w.postMessage({ items });
w.onmessage = (e) => console.log('done', e.data);

// worker.js
onmessage = (e) => {
  const result = heavyCompute(e.data.items);
  postMessage(result);
};
```

特点：

- **独立线程，独立 event loop**，主线程完全不受影响
- 不能直接操作 DOM
- 通过 `postMessage` 通信，参数会被结构化克隆（或用 `Transferable` 转移所有权零拷贝）
- **SharedArrayBuffer + Atomics** 可以实现共享内存 + 同步原语（COOP/COEP header 限制）

适合：大数据处理、加密、图像处理、WebAssembly 跑模型推理。

衍生：**Service Worker**（离线缓存 / push）、**Shared Worker**（多 tab 共享）、**AudioWorklet**（音频处理）。

---

## Node.js Event Loop（和浏览器的差异）

Node 基于 **libuv** 的事件循环，分为**6 个 phase**，每个 phase 有自己的回调队列：

```
┌───────────────────────────┐
│ timers (setTimeout)       │
├───────────────────────────┤
│ pending callbacks         │
├───────────────────────────┤
│ idle, prepare (internal)  │
├───────────────────────────┤
│ poll (I/O 回调)          │  ← 主要时间花在这
├───────────────────────────┤
│ check (setImmediate)     │
├───────────────────────────┤
│ close callbacks          │
└───────────────────────────┘
```

- 每个 phase 之间都会**清空微任务队列**（同浏览器）
- Node **多了 `process.nextTick()`** —— 比 Promise.then **更高优先级**的微任务（自成一队，先于 Promise）
- `setImmediate(fn)` vs `setTimeout(fn, 0)` —— I/O 回调后 `setImmediate` 先跑（在 check phase）；单独跑顺序不确定
- **没有渲染阶段**（Node 没有 UI）

---

## 一句话总结

> 浏览器 event loop = **拿宏 → 清微 → 看要不要画 → 画 → idle 顺手做点轻活 → 下一轮**。
> 写"卡顿优化"的工程师，根本上就是在这个时序图里**和渲染抢时间** —— 别让微任务饿死渲染，别让单个宏任务超 50ms。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','javascript','event-loop','async','performance','animation'],
  NULL
);
