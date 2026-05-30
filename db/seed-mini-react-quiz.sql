INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'Mini React — Fiber / 调度 / Diff 深度 Quiz',
  $content$
### Fiber 架构

真实 React 的 fiber 节点还多了很多字段：

```js
{
    lanes,          // 优先级
    pendingProps,   // 待处理的新 props
    memoizedState,  // hooks 链表（我们用数组模拟）
    updateQueue,    // 更新队列
    flags,          // 副作用标记（替代 effectTag 字符串）
}
```

hooks 链表的好处是插入删除 O(1)，不需要预分配空间。但两者都依赖调用顺序，因此 **hooks 不能放在条件语句里**。

### 调度算法

真实 React 不用 `requestIdleCallback`，原因：
- 兼容性差
- 触发频率低（一般 20ms 一次，空闲时可能 50ms+）
- 没有优先级概念

现实 React 调度器的核心是 **MessageChannel + 小顶堆**：

```js
const taskQueue = []
function scheduleCallback(priority, callback) {
    const expirationTime = currentTime + timeout(priority)
    // ImmediatePriority  → ~0ms
    // UserBlockingPriority → 250ms
    // NormalPriority     → 5000ms
    // LowPriority        → 10000ms
    // IdlePriority       → maxInt
    push(taskQueue, { callback, expirationTime })
    requestHostCallback()  // 通过 MessageChannel 触发
}
function workLoop(currentTime) {
    let task = peek(taskQueue)  // 取堆顶（最快过期的）
    while (task) {
        if (task.expirationTime > currentTime && shouldYield()) break
        task.callback()
        pop(taskQueue)
        task = peek(taskQueue)
    }
}
```

#### 饥饿问题
当 `expirationTime` 过期，该任务直接被当做最高优先级任务立即执行。NormalPriority 任务最多等 **5 秒**就会被强制执行。

#### 小顶堆
任务按过期时间排序，取最紧急的任务是 O(1)，插入是 O(log n)。比数组遍历找最小值高效。

### 优先级系统（Lane 模型）

Lane 是二进制位，用位运算判断合并：

```js
const SyncLane            = 0b0000_0000_0000_0000_0000_0000_0000_0010
const InputContinuousLane = 0b0000_0000_0000_0000_0000_0000_0000_1000
const DefaultLane         = 0b0000_0000_0000_0000_0000_0000_0100_0000
const IdleLane            = 0b0100_0000_0000_0000_0000_0000_0000_0000
```

- `onClick` / `onInput` → SyncLane（最高，同步执行）
- `onScroll` / `onMouseMove` → InputContinuousLane
- `setState` 普通调用 → DefaultLane
- `startTransition` → TransitionLane（可中断）

**批处理**：同一优先级的多个更新会合并成一次渲染。

### Diff 算法

三大策略（提前假设）：
- 跨层级移动极少 → 只比较同层节点，不跨层 diff
- 不同类型的组件产生不同树 → 类型不同直接替换整棵子树
- 同层节点用 `key` 区分 → key 相同认为是同一个节点

**单节点 diff**：与 mini React 的实现类似。

**多节点 diff（两轮遍历）**：
- 第一轮：从左到右逐个比较，key 和 type 都相同就复用，遇到不同则停止。
- 第二轮：把剩余旧节点存入 `Map<key, fiber>`，遍历新节点去 Map 里找可复用的。
$content$,
  'quiz',
  'hard',
  ARRAY['react','fiber','scheduler','diff','reconciliation','lane','heap'],
  $hint$
// Mini React 实现要点（见 code 部分）
//
// Step 1  createElement / createTextElement
// Step 2  fiber 结构 { type, props, dom, parent, child, sibling, alternate, effectTag, hooks }
// Step 3  render() 初始化 wipRoot，触发调度
// Step 4  workLoop (requestIdleCallback) → render 阶段可中断 / commit 阶段同步
// Step 5  performUnitOfWork 深度优先遍历：child → sibling → parent.sibling
// Step 6  reconcileChildren diff：sameType=UPDATE / new=PLACEMENT / oldOnly=DELETION
// Step 7  updateFunctionComponent 执行函数、重置 hookIndex
// Step 8  useState：从 alternate.hooks 取旧 hook，重放 queue，返回 [state, setState]
// Step 9  useEffect：比较 deps，标记 hook.effect，commit 后统一执行
// Step 10 commitRoot：处理 deletions → commitWork(DFS) → commitEffects → 双缓存切换
$hint$
);
