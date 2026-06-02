-- 4 frontend quiz cards split from one block.
-- Each ## section becomes its own quiz, with material additions.

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Webpack
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'Webpack · 构建流程 / Loader vs Plugin / Tree Shaking',
$content$
## Webpack 构建流程

1. **读取配置** —— 合并 CLI 参数 + `webpack.config.js` + 默认值。
2. **构建依赖图** —— 从 `entry` 入口文件出发，递归分析模块依赖关系，构建一个模块依赖图：
    1. 解析每个模块（包括 `import`、`require`、动态导入）；
    2. 通过 **AST（抽象语法树）** 分析依赖；
    3. 递归分析子依赖模块；
    4. 形成一张**模块图**（有向图），节点是模块，边是依赖关系。
3. **模块转换** —— 通过相应的 **Loader** 把非 JS 资源转换成 JS 能识别的模块。
4. **模块打包**：
    1. **动态导入（`import()`）** 会被打包为分离的 chunk，形成**代码分割（code splitting）**；
    2. 最终输出静态资源文件（**Bundle**）。
5. **插件机制** —— 插件钩子机制，支持在生命周期的不同阶段插入自定义逻辑。
6. **输出** —— 将构建好的文件输出到 `output.path` 指定目录，完成打包过程。

---

## Loader vs Plugin（高频面试题）

| 维度 | Loader | Plugin |
|---|---|---|
| **作用对象** | **单个文件**的转换 | **整个构建生命周期**的事件 |
| **执行时机** | 模块解析时（per-file） | 构建过程的各个 hook |
| **核心 API** | 一个函数 `(source) => transformed` | `apply(compiler)`，订阅 Compiler / Compilation 的 hook |
| **典型例子** | `babel-loader` / `ts-loader` / `css-loader` / `file-loader` | `HtmlWebpackPlugin` / `MiniCssExtractPlugin` / `DefinePlugin` / `TerserPlugin` |
| **执行顺序** | **从右到左**（管道）：`['style-loader', 'css-loader']` 先 css 后 style | 按 hook 注册顺序 |

> 一句话：**Loader 是"翻译"，Plugin 是"指挥"**。Loader 处理单个文件，Plugin 控制全局流程。

---

## 关键能力

### Tree Shaking（摇树优化）

基于 **ESM 静态分析**剔除未使用的导出（dead code elimination）。

- 必须用 ESM（`import` / `export`），CommonJS 的 `require` 是动态的，分析不了。
- `package.json` 加 **`"sideEffects": false`** 告诉 webpack "这个包没有副作用，没用到的导出都可以删"。
- 有些 utility 库（`lodash-es`）支持 tree shaking，老 `lodash` 不支持 —— 要么换 `lodash-es`，要么用 `lodash/debounce` 这种深路径 import。

### Code Splitting

切代码包的三种方式：

1. **多入口（multiple entry）** —— `entry: { app: ..., admin: ... }`
2. **`splitChunks`** —— 自动把多个入口共享的依赖抽成 `vendor`、`common` 等 chunk
3. **动态 `import()`** —— 运行时按需加载，路由懒加载的基础

### HMR（Hot Module Replacement）

dev 模式实时更新，**不刷新整个页面**：
- webpack-dev-server 起 **WebSocket** 推送变更通知
- 浏览器端 runtime 接收通知 → 拉新模块 → 用 `module.hot.accept` 注册的 handler 局部替换
- React Fast Refresh / Vue HMR 把这个机制和组件状态保留绑定

### Source Map

打包后调试用的"还原地图"：
- `eval-source-map` —— dev 最快，质量中等
- `cheap-module-source-map` —— 行级映射，体积小
- `source-map` —— 生产标配，独立 `.map` 文件，配合 Sentry 等错误监控

### Mode（自动配置开关）

- `development` —— 不压缩 + 完整 source map + HMR
- `production` —— Terser 压缩 + Tree shaking + Scope Hoisting
- `none` —— 不开任何默认优化

---

## 现代竞争者（webpack 还是首选吗？）

| 工具 | 实现语言 | 杀手锏 | 适用 |
|---|---|---|---|
| **Webpack** | JS | 生态最丰富，最灵活 | 老项目、复杂构建 |
| **Vite** | JS（dev 用 esbuild） | dev server 极快（原生 ESM），生产用 Rollup | 新项目首选 |
| **Rspack** | Rust | Webpack API 兼容 + Rust 性能（5–10×） | 想换 webpack 但不想改配置 |
| **Turbopack** | Rust（Vercel） | Next.js 默认 bundler | Next.js |
| **esbuild** | Go | 极速但功能少 | 单包打包、库构建 |
| **Bun** | Zig | 内置 bundler + runtime + 包管理 | 小项目一把梭 |
| **Rollup** | JS | tree shaking 最干净 | 库（npm 包）打包 |
| **Parcel** | JS / Rust | 零配置 | 原型 / 小项目 |

> 2025-2026 趋势：**Rust bundler 全面胜出**。Next 用 Turbopack、字节 / 飞书内部全面切 Rspack、Vite 在评估 Rolldown（Rollup 的 Rust 重写）。Webpack 还会用很久，但新项目几乎不会再选。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','webpack','bundler','build-tool'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. useEffect vs useLayoutEffect
-- ─────────────────────────────────────────────────────────────────────────────
(
  'React · useEffect vs useLayoutEffect · 执行时机 / 浏览器绘制',
$content$
## useEffect vs useLayoutEffect

| | `useEffect` | `useLayoutEffect` |
|---|---|---|
| **执行时机** | DOM 绘制后**异步**执行 | DOM 更新后、绘制前**同步**执行 |
| **阻塞渲染** | 不阻塞 | 阻塞 |
| **适用场景** | 数据请求、事件监听、定时器、日志等 | 读取/修改 DOM 布局、防止视觉闪烁 |

### 执行顺序

```
render 函数
  ↓
DOM 更新
  ↓
useLayoutEffect（同步，阻塞）
  ↓
浏览器绘制 (paint)
  ↓
useEffect（异步，不阻塞）
```

---

### React 怎么把 useEffect 推迟到绘制之后

React 用 **MessageChannel** 把 `useEffect` 的执行推迟到绘制之后：

- `setTimeout` 最小延迟 **4ms**（HTML5 spec）
- `MessageChannel` **没有这个限制**，延迟更短更精确

```jsx
requestAnimationFrame(() => {
  // 准备开始渲染下一帧；port1/port2 是一对管道的两端
  channel.port2.postMessage(null);   // 推一个宏任务
});
// port1.onmessage → useEffect 执行，此时上一帧渲染已完成
```

> 早期 React 用过 `setTimeout(fn, 0)`，但 4ms 误差在低端机上累积严重；MessageChannel 是更精确的"绘制后回调"。

---

### useLayoutEffect 的典型场景

```jsx
// 测量 DOM 元素尺寸后同步调整位置，避免视觉闪烁。
function Tooltip({ anchorRef, children }) {
  const tooltipRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // 在绘制前读取锚点位置并设置 tooltip 位置；
    // 如果用 useEffect，用户会先看到 tooltip 在 (0,0)，然后跳到正确位置。
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom, left: rect.left });
  }, [anchorRef]);

  return <div ref={tooltipRef} style={{ position: 'absolute', ...pos }}>{children}</div>;
}
```

→ **典型触发**：tooltip 定位、自适应高度的 textarea、滚动恢复、动画起始位置测量。

---

### 经验法则

> **默认用 `useEffect`，只有遇到视觉闪烁时才换 `useLayoutEffect`。**

`useLayoutEffect` **阻塞绘制**，滥用会卡顿；只在需要"读 DOM → 同步改 state → 改 DOM"的闭环里用。

---

### SSR 注意

`useLayoutEffect` 在服务端**完全不执行**（服务端没有 DOM），React 会发出警告：
```
Warning: useLayoutEffect does nothing on the server, because its effect
cannot be encoded into the server renderer's output format.
```

对策：
- 把这部分逻辑挪到 `useEffect`（接受首帧闪烁）
- 或者用 `useIsomorphicLayoutEffect` —— 服务端 fallback 到 `useEffect`：
  ```jsx
  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  ```

---

### 还有一个 useInsertionEffect

React 18 新增的、**比 `useLayoutEffect` 还早**的 effect：

```
DOM 更新 → useInsertionEffect → useLayoutEffect → 浏览器绘制 → useEffect
```

为 **CSS-in-JS 库**（styled-components / emotion）服务 —— 它们需要在 DOM 操作前往 `<head>` 里注入 `<style>` 标签，否则可能读到陈旧 layout。**业务代码几乎不会用到。**

---

### 三者总览

| Hook | 时机 | 用途 |
|---|---|---|
| `useInsertionEffect` | DOM 改动**之前** | CSS-in-JS 库注入样式 |
| `useLayoutEffect` | DOM 改动**之后**、绘制**之前** | 读 / 改 layout，避免闪烁 |
| `useEffect` | 绘制**之后** | 副作用：请求、订阅、定时器、日志 |

---

### React 19 / Compiler 的影响

React 19 的 **React Compiler** 会自动 memoize，但**不会**自动选择 `useEffect` 还是 `useLayoutEffect` —— 时机选择仍是开发者的责任，因为它涉及"是否阻塞绘制"这种行为语义。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','react','hooks','useeffect'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. React.memo / useMemo / useCallback
-- ─────────────────────────────────────────────────────────────────────────────
(
  'React · 性能优化 · memo / useMemo / useCallback',
$content$
## React.memo / useMemo / useCallback

| | 作用对象 | 缓存内容 | 解决的问题 |
|---|---|---|---|
| `React.memo` | **组件** | 组件的渲染结果 | 父组件渲染时**跳过 props 未变的子组件** |
| `useMemo` | **值** | 计算结果 | 避免每次渲染**重复执行昂贵计算** |
| `useCallback` | **函数** | 函数引用 | **保持函数引用稳定**，配合 `memo` 子组件使用 |

### 典型组合示例

```jsx
// React.memo：浅比较 props，props 没变就跳过渲染
const ExpensiveList = memo(function ExpensiveList({ items, onSelect }) {
  return items.map(item => (
    <div key={item.id} onClick={() => onSelect(item.id)}>{item.name}</div>
  ));
});

function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  // useMemo: query 没变就不重算 filterItems
  const items = useMemo(() => filterItems(allItems, query), [query]);

  // 如果不用 useCallback，每次 App 渲染都会创建新函数引用
  // → ExpensiveList 的 onSelect prop 引用变化 → memo 失效
  const onSelect = useCallback((id) => {
    setSelected(id);
  }, []);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ExpensiveList items={items} onSelect={onSelect} />
    </>
  );
}
```

---

### 核心原则

- **不要默认加** —— 只在有性能问题时才用。memoization 本身有成本（比较 + 缓存空间）。
- **三者配合使用** —— 单独 `useCallback` 而子组件没有 `memo` 包裹，**毫无意义**（函数引用稳定了但子组件该 re-render 还是 re-render）。
- **传给原生 HTML 元素的回调不需要 useCallback** —— `<button onClick={fn}>` 这种，原生元素不做浅比较。

---

### 常见坑

#### 1. 依赖数组写错

```jsx
const expensive = useMemo(() => calc(a, b), [a]);  // 漏了 b → stale closure
```

**ESLint 装 `eslint-plugin-react-hooks`，开 `exhaustive-deps` 规则**，强制对齐依赖。

#### 2. 引用类型放进 dep 数组导致永远 miss

```jsx
function Parent({ config }) {  // config: { sort: 'asc' }，每次 render 是新对象
  const result = useMemo(() => process(config), [config]);  // 永远重算
}
```

**对策**：把 config 拆成原始值（`config.sort`），或者父级用 `useMemo` 稳定 config 自身。

#### 3. 在 useMemo 里做副作用

```jsx
const result = useMemo(() => {
  fetch('/api/x');   // ❌ 副作用应该在 useEffect
  return compute();
}, [deps]);
```

`useMemo` 只该是**纯计算**。

#### 4. 用 `useCallback` 包了但子组件没 `memo`

```jsx
const onClick = useCallback(...);   // 稳定了，但 ...
<Child onClick={onClick} />          // Child 没 memo，每次都 re-render
```

要么 Child 套 `memo`，要么干脆删掉 `useCallback`（白做工）。

#### 5. 高频更新场景反而拖累

`useMemo` 比较 deps + 缓存对象，如果计算成本小于比较成本（比如就是几个加法），加 `useMemo` 反而更慢。

---

### React Compiler 来了之后还要不要写？

**React 19** 引入的 **React Compiler**（前 React Forget）会**自动 memoize**：

- 自动识别哪些值依赖哪些 state / props
- 自动插入等价于 `useMemo` / `useCallback` / `React.memo` 的优化
- 程序员**不需要手写**这三件

启用后大部分手动 memoization **是负优化**（compiler 已经做了，你又做一遍）。React 团队的建议是：

> 启用 React Compiler 后：**逐步删除手动的 `useMemo` / `useCallback` / `React.memo`**，让 compiler 接管；保留你写它们的部分**只在编译器对这段代码失败时**（compiler 会标记 "bailout"）。

---

### 反向类比

- **Vue** 的 `computed` —— 类似 `useMemo`，但**依赖自动追踪**，不用写 deps 数组
- **Svelte** 的 `$:` reactive / Svelte 5 `$derived` —— 编译时分析依赖，**零运行时 overhead**
- **SolidJS** 的 `createMemo` —— 基于细粒度信号 (signal)，依赖也是自动追踪

→ React 的"手动 deps" 是函数式纯度 + 编译器尚未介入的妥协。React Compiler 之后会向其他框架的体验对齐。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','react','performance','optimization','hooks'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. Svelte
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Svelte · 编译时框架 · 响应式 / Runes / 与 React 对比',
$content$
## Svelte

**编译时框架**，没有运行时 Virtual DOM，组件会被编译成**直接操作 DOM 的原生 JS**。

性能优势来自**编译时把响应式关系算清楚**，运行时直接操作对应 DOM 节点，没有 diff 开销。但编写的代码需要遵守相应的赋值约定，否则静态分析的盲区会漏掉变量修改逻辑 —— **一定程度损害可读性**。

---

### Mini Svelte（编译输出长啥样）

```js
// ============================================================
// Part 1: Runtime（调度器 + 工具函数）
// ============================================================

const updateQueue = new Set();
let flushing = false;

function scheduleUpdate(fn) {
  updateQueue.add(fn);
  if (!flushing) {
    flushing = true;
    // 批量合并同一帧的多次 state 变更
    queueMicrotask(() => {
      updateQueue.forEach(f => f());
      updateQueue.clear();
      flushing = false;
    });
  }
}

// ============================================================
// Part 2: 编译器输出（模拟 Svelte 把 .svelte 文件编译后的产物）
// ============================================================

// 源码（.svelte 文件）：
// <script>
//   let count = 0
//   $: doubled = count * 2       ← 响应式声明
//   function inc() { count++ }
// </script>
// <p>{count}</p>
// <p>{doubled}</p>
// <button on:click={inc}>+1</button>

// ↓ 编译器输出 ↓

function Counter(target) {
  // --- 1. 状态 ---
  let count = 0;
  let doubled;  // $: 响应式，初始值由 updateReactives 计算

  // --- 2. DOM 节点 ---
  let p1, t1, p2, t2, btn;

  // --- 3. 脏标记 (bitmask) ---
  // 每个 bit 对应一个变量，精确知道哪些变量变了，只更新对应 DOM
  // count → bit 0，doubled → bit 1
  let dirty = 0b11;  // 初始全脏，mount 时全量渲染

  // --- 4. $$invalidate ---
  // 编译器把 `count++` 变成 `count++; $$invalidate('count', count)`
  // 每次赋值都通过这里标记脏 + 调度更新
  function $$invalidate(key, val) {
    if (key === 'count')   { count = val;   dirty |= 0b01; }
    if (key === 'doubled') { doubled = val; dirty |= 0b10; }
    scheduleUpdate(update);
  }

  // --- 5. 响应式声明 $: doubled = count * 2 ---
  // 编译器识别依赖，count 变了就重算 doubled
  function updateReactives() {
    if (dirty & 0b01) {
      $$invalidate('doubled', count * 2);
    }
  }

  // --- 6. 用户函数 ---
  function inc() {
    $$invalidate('count', count + 1);
  }

  // --- 7. 创建 DOM ---
  function create() {
    p1 = document.createElement('p');
    t1 = document.createTextNode('');
    p1.appendChild(t1);

    p2 = document.createElement('p');
    t2 = document.createTextNode('');
    p2.appendChild(t2);

    btn = document.createElement('button');
    btn.textContent = '+1';
    btn.addEventListener('click', inc);
  }

  // --- 8. 挂载 ---
  function mount() {
    target.appendChild(p1);
    target.appendChild(p2);
    target.appendChild(btn);
    update();  // 初始渲染
  }

  // --- 9. 更新（只更新脏的部分） ---
  function update() {
    updateReactives();                    // 先算 $: 响应式
    if (dirty & 0b01) t1.data = count;    // 只更新变了的
    if (dirty & 0b10) t2.data = doubled;
    dirty = 0;                            // 清除标记
  }

  // --- 10. 销毁 ---
  function destroy() {
    btn.removeEventListener('click', inc);
    p1.remove(); p2.remove(); btn.remove();
  }

  create();
  mount();
  return { destroy };
}

// 使用
const app = Counter(document.getElementById('app'));
```

---

### Svelte 4 vs Svelte 5（Runes）

Svelte 5 引入 **Runes** 重新设计了响应式 API：

| | Svelte 3 / 4 | Svelte 5 (Runes) |
|---|---|---|
| 状态声明 | `let count = 0` | `let count = $state(0)` |
| 派生值 | `$: doubled = count * 2` | `let doubled = $derived(count * 2)` |
| 副作用 | `$:` 语句块 | `$effect(() => { ... })` |
| Props | `export let value` | `let { value } = $props()` |
| 显式 vs 隐式 | 隐式（"裸赋值就是响应式"） | **显式**（必须 `$state()` 标记） |

**为什么改？** Svelte 3/4 的"裸赋值即响应"虽然写着爽，但有几个老问题：

- **可读性**：`let x = 1` 谁知道是不是响应式？要看后面有没有被改、有没有在模板里用。
- **可分析性**：编译器要做大量静态分析，复杂场景容易"分析不到"（你提到的盲区）。
- **作用域限制**：响应式只能在 `.svelte` 文件顶层，不能像 hook 一样跨文件复用。
- **TS 友好度**：编译时魔法对 TS 推断不够友好。

Svelte 5 的 Runes 牺牲一点简洁换来：可分析、可跨文件复用、TS 推断好、心智模型清楚。

---

### 和其他响应式框架的对比

| 框架 | 响应式实现 | 单位 | 是否需要 VDOM | 心智 |
|---|---|---|---|---|
| **React** | 重渲染 + memoization | 组件 | 是 | "数据变了就重跑整个组件" |
| **Vue 3** | Proxy + 依赖追踪 | 模板表达式 | 是（但优化得很细） | "你读了我，我变了就通知你" |
| **SolidJS** | Signal + 细粒度订阅 | 表达式 | 否 | 和 Svelte 很像，但**运行时**追踪 |
| **Svelte 4** | 编译时静态分析 | 表达式 | 否 | "裸赋值就是响应" |
| **Svelte 5** | 编译时 + Runes 显式标记 | 表达式 | 否 | "用 `$state()` 包一下表示响应" |

---

### Svelte 生态

- **SvelteKit** —— 官方 meta framework（类似 Next.js / Nuxt），SSR / 文件路由 / 端点
- **Skeleton / shadcn-svelte** —— UI 组件库
- **TanStack Query / Form** —— 通用库的 Svelte 适配

---

### 选 Svelte 的权衡

**优点**：

- **bundle 极小**（无运行时 VDOM）
- 学习曲线短
- 状态管理内置（`store` / runes），不需要 Redux/Zustand
- CSS 默认局部 scope

**缺点**：

- **生态比 React/Vue 小很多**（招聘、社区、UI 库）
- 编译魔法**调试反直觉**（你写的代码 ≠ 跑的代码）
- 大型应用经验积累远不如 React

> 趋势：Svelte 5 (Runes) 推出后，社区评价两极 —— 写法和 React 更接近了，差异化变小；但工程化能力变强，企业接受度反而可能上来。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','svelte','reactivity','compiler','runes'],
  NULL
);
