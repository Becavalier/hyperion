-- React Hooks composition patterns: Context + useReducer for light state mgmt, plus common combos.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'React Hooks 组合 · Context + useReducer · 状态管理 / 自定义 Hook',
$content$
## useContext + useMemo + useReducer · 轻量级全局状态管理

适合**静态或低频更新**的数据、组件层级深但**状态简单**、中小型应用。

### 局限（什么时候 Context 就不够用了）

1. **没有原生 selector，粒度粗** —— 任何字段变化，所有订阅组件都 re-render
2. 需要手动 `useMemo` + **拆分 context** 才能优化，心智负担高
3. state 逻辑**分散在各个 Provider** 里，难以维护
4. **不支持中间件**（日志 / 持久化 / 异步 thunk 都要自己写）

### 完整示例（拆双 Context + 自定义 Hook）

```jsx
import { createContext, useContext, useReducer, useMemo, useState } from 'react';

// --- Context 定义 ---
const StoreContext = createContext(null);
const ThemeContext = createContext(null);

// --- Reducer ---
function reducer(state, action) {
  switch (action.type) {
    case 'INC':      return { ...state, count: state.count + 1 };
    case 'SET_USER': return { ...state, user: action.payload };
    default:         return state;
  }
}
const initialState = { count: 0, user: null };

// --- Provider ---
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState('light');

  const storeValue = useMemo(() => ({ state, dispatch }), [state]);
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <StoreContext.Provider value={storeValue}>
        {children}
      </StoreContext.Provider>
    </ThemeContext.Provider>
  );
}

// --- 自定义 Hook（封装 useContext + 守卫）---
function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within AppProvider');
  return ctx;
}

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within AppProvider');
  return ctx;
}

// --- 消费组件 ---
function Counter() {
  const { state, dispatch } = useStore();
  return (
    <button onClick={() => dispatch({ type: 'INC' })}>
      count: {state.count}
    </button>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      current: {theme}
    </button>
  );
}

function UserInfo() {
  const { state, dispatch } = useStore();
  return (
    <div>
      <p>user: {state.user ?? 'not logged in'}</p>
      <button onClick={() => dispatch({ type: 'SET_USER', payload: 'Alice' })}>
        login
      </button>
    </div>
  );
}

// --- App ---
export default function App() {
  return (
    <AppProvider>
      <Counter />
      <ThemeToggle />
      <UserInfo />
    </AppProvider>
  );
}
```

---

## Context 性能优化模式

### 1. State / Dispatch 拆分

把 **state（频繁变化）** 和 **dispatch（永不变化）** 放到**两个独立 Context**：

```jsx
const StateCtx = createContext(null);
const DispatchCtx = createContext(null);

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, init);
  return (
    <DispatchCtx.Provider value={dispatch}>   {/* 永远不变，所有消费者免 re-render */}
      <StateCtx.Provider value={state}>
        {children}
      </StateCtx.Provider>
    </DispatchCtx.Provider>
  );
}

function useDispatch() { return useContext(DispatchCtx); }
function useState_() { return useContext(StateCtx); }
```

→ **只用 `useDispatch()` 的组件永远不会因为 state 变化重新渲染**。

### 2. 按字段拆分 Context

```jsx
const UserCtx = createContext(null);
const CartCtx = createContext(null);
const ThemeCtx = createContext(null);
```

→ 改 user 不会让订阅 cart 的组件重新渲染。代价：Provider 层数变多。

### 3. Selector 模式

原生 Context 没有 selector。第三方库 [`use-context-selector`](https://github.com/dai-shi/use-context-selector) 给 Context 加 selector 能力：

```jsx
import { createContext, useContextSelector } from 'use-context-selector';

const Ctx = createContext(null);

function Counter() {
  // 只在 state.count 变化时重新渲染
  const count = useContextSelector(Ctx, v => v.state.count);
  return <div>{count}</div>;
}
```

但通常到这一步，**直接换 Zustand / Jotai 更划算** —— 它们原生就有 selector。

---

## 什么时候该升级到状态管理库

| 信号 | 现状 | 升级方向 |
|---|---|---|
| 全局状态 < 5 个字段、低频更新 | Context + useState 够了 | — |
| 复杂业务逻辑 + 状态 transition | useReducer + Context | — |
| 出现性能问题（不相关组件被卷入 re-render） | 拆 Context / Selector | **Zustand** 或 **Jotai** |
| 需要中间件（日志 / 持久化 / 异步） | — | **Zustand** / **Redux Toolkit** |
| 团队需要严格规范、devtools 强 | — | **Redux Toolkit** |
| 大量原子级派生数据 | — | **Jotai** (atoms 模式) |
| 想 mutate 而不是 immutable | — | **Valtio**（Proxy） / Zustand + immer |

### 库对比

| 库 | 心智 | bundle | Selector | 异步 | 适合 |
|---|---|---|---|---|---|
| **Context + useReducer** | 原生、零依赖 | 0 | 手动拆 | 自己写 | 简单全局状态 |
| **Zustand** | 一个 store, hook 选取 | ~1KB | 内置 | 自然 | 中小型 SPA 首选 |
| **Jotai** | 原子化（每个 state 一个 atom） | ~3KB | 自动 | derive atoms | 派生关系复杂 |
| **Redux Toolkit** | action / reducer / slice | ~12KB | reselect | RTK Query | 大型 / 团队规模 |
| **Valtio** | Proxy mutable | ~2KB | 自动追踪 | 自然 | 喜欢 Vue 式心智 |
| **MobX** | observable + reaction | ~16KB | 自动追踪 | 自然 | 老牌、面向对象 |

---

## 其他常用 Hook 组合

### A. 自定义数据获取 Hook（封装 useEffect）

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(r => r.json()).then(setData)
      .catch(e => { if (e.name !== 'AbortError') setError(e); })
      .finally(() => setLoading(false));
    return () => controller.abort();    // 切换 url / 卸载时取消
  }, [url]);

  return { data, error, loading };
}
```

**关键点**：`AbortController` 防止旧请求覆盖新结果 + 卸载时清理。

> 生产用 **TanStack Query / SWR** 而非手撸 —— 它们已经处理好 dedup / cache / refetch / 重试 / window focus 等场景。

### B. usePrevious — 拿上一次的值

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; }, [value]);
  return ref.current;
}
```

经典 useRef + useEffect 组合。

### C. useDebounce / useThrottle

```jsx
function useDebouncedValue(value, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}
```

### D. useEventListener — 类型安全的事件订阅

```jsx
function useEventListener(target, type, handler) {
  const ref = useRef(handler);
  useEffect(() => { ref.current = handler; });   // 总是拿最新 handler
  useEffect(() => {
    const el = target?.current ?? target ?? window;
    const fn = (e) => ref.current(e);
    el.addEventListener(type, fn);
    return () => el.removeEventListener(type, fn);
  }, [target, type]);
}
```

**关键技巧**：用 `useRef` 持有最新 handler，避免 stale closure，**也避免 effect 重新订阅**。

### E. 复合组件 + Context（Compound Component Pattern）

```jsx
const TabsCtx = createContext(null);

function Tabs({ defaultValue, children }) {
  const [value, setValue] = useState(defaultValue);
  return <TabsCtx.Provider value={{ value, setValue }}>{children}</TabsCtx.Provider>;
}
Tabs.List = ({ children }) => <div role="tablist">{children}</div>;
Tabs.Trigger = ({ v, children }) => {
  const { value, setValue } = useContext(TabsCtx);
  return <button aria-selected={value === v} onClick={() => setValue(v)}>{children}</button>;
};
Tabs.Content = ({ v, children }) => {
  const { value } = useContext(TabsCtx);
  return value === v ? <div>{children}</div> : null;
};

// 使用
<Tabs defaultValue="a">
  <Tabs.List>
    <Tabs.Trigger v="a">A</Tabs.Trigger>
    <Tabs.Trigger v="b">B</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content v="a">Page A</Tabs.Content>
  <Tabs.Content v="b">Page B</Tabs.Content>
</Tabs>
```

→ shadcn / Radix UI 大量用这种模式。

### F. useReducer 实现状态机

```jsx
function reducer(state, action) {
  switch (state.status) {
    case 'idle':
      if (action.type === 'FETCH') return { status: 'loading' };
      return state;
    case 'loading':
      if (action.type === 'SUCCESS') return { status: 'success', data: action.payload };
      if (action.type === 'ERROR') return { status: 'error', error: action.payload };
      return state;
    case 'error':
      if (action.type === 'RETRY') return { status: 'loading' };
      return state;
    default:
      return state;
  }
}
```

→ 比一堆 `useState` 更清晰；非法 transition 自动被忽略。复杂场景再上 **XState**。

### G. useSyncExternalStore — 接入外部 store

React 18+ 提供，**让组件可以订阅 React 外部的状态源**（Redux、Zustand、`window`、原生事件、自定义 EventEmitter）：

```jsx
const onlineStatus = useSyncExternalStore(
  (callback) => {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
      window.removeEventListener('online', callback);
      window.removeEventListener('offline', callback);
    };
  },
  () => navigator.onLine,            // getSnapshot (client)
  () => true                         // getServerSnapshot (SSR)
);
```

→ Zustand / Redux 内部就是基于这个 hook 实现的。**自己写库时用它，业务代码很少用到**。

### H. useTransition / useDeferredValue — 渲染优先级

```jsx
const [isPending, startTransition] = useTransition();

function onSearch(e) {
  setInput(e.target.value);                       // 高优先：输入框立即更新
  startTransition(() => {
    setFilteredList(filter(allItems, e.target.value));   // 低优先：过滤可以延后
  });
}
```

→ Concurrent React 的核心 API。React Compiler 不会替你做这个判断（涉及"哪些更新可以被打断"的语义）。

### I. useId — SSR 友好的唯一 ID

```jsx
function Field({ label }) {
  const id = useId();
  return <><label htmlFor={id}>{label}</label><input id={id} /></>;
}
```

服务端 / 客户端**生成同一个 ID**，避免 hydration mismatch。表单 a11y 必用。

### J. useImperativeHandle + forwardRef — 暴露命令式接口

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
  }), []);
  return <input ref={inputRef} {...props} />;
});
```

→ React 19 改成 ref 直接作为 prop，写法更简洁，但用法不变。

---

## 写自定义 Hook 的原则

1. **`use` 前缀** —— React 才能识别 hook 规则（顺序、依赖追踪）
2. **保持纯净** —— 接收明确参数，返回明确值；不要在 hook 里偷偷读 / 写全局变量
3. **依赖完整** —— `useEffect` deps 不要漏，否则 stale closure；用 ESLint `react-hooks/exhaustive-deps` 强制
4. **返回结构稳定** —— `return { data, error }` 比 `return [data, error]` 调用者更不容易写错
5. **能 compose** —— 一个 hook 可以调用别的 hook，但**永远不能在条件 / 循环里调用**

---

## 一句话总结

> Hook 组合是 React 的核心抽象：
> - **`useReducer` + Context** 是原生的"小型 Redux"；
> - **`useRef` + `useEffect`** 是数据 mutation / 订阅 / 上一次值的万能组合；
> - **`useSyncExternalStore`** 让 React 接入任何外部状态源；
> - **`useTransition` / `useDeferredValue`** 是 Concurrent 时代的优先级控制。
>
> 出现 **不相关组件被 re-render 卷入** 时，就是该上 Zustand / Jotai 的信号。
$content$,
  'quiz', 'medium',
  ARRAY['frontend','react','hooks','state-management','context','patterns'],
  NULL
);
