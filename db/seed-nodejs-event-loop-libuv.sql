-- 2 quizzes: Node.js Event Loop + Libuv.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Event Loop
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Node.js Event Loop · 6 阶段 / 微任务 / nextTick',
$content$
## Node.js Event Loop 全景图

```
             ┌───────────────────────────┐
(phase)   ┌─>│           timers          │ <───  setTimeout                       [Callback Queue]
          │  └─────────────┬─────────────┘       setInterval
          │  ┌─────────────┴─────────────┐
          │  │     pending callbacks     │ <───  某些系统操作的错误回调            [Callback Queue]
          │  └─────────────┬─────────────┘       (TCP 连接错误等)
          │  ┌─────────────┴─────────────┐
          │  │       idle, prepare       │ <───  libuv 内部工作                    [Callback Queue]
          │  └─────────────┬─────────────┘      ┌─────────────────────────┐
          │  ┌─────────────┴─────────────┐      │ File IO (fs.readFile)    │
          │  │           poll            │ <─── │ 网络请求回调              │      [Callback Queue]
          │  └─────────────┬─────────────┘      │ 数据库 IO                │
          │  ┌─────────────┴─────────────┐      └─────────────────────────┘
          │  │           check           │ <───  setImmediate                     [Callback Queue]
          │  └─────────────┬─────────────┘
          │  ┌─────────────┴─────────────┐
          └──┤      close callbacks      │ <───  socket.on('close')               [Callback Queue]
             └───────────────────────────┘       stream.on('close')
```

---

## 基本流程

```
1. 执行主线程中的同步代码

2. 开始事件循环：
   ├─ 执行所有 process.nextTick 回调
   ├─ 执行所有微任务 (Promise.then / queueMicrotask)
   ├─ 依次进入六个宏任务阶段：
   │   timers → pending callbacks → idle/prepare → poll → check → close
   │   每个阶段：
   │     1) 执行该阶段的回调队列
   │     2) 清空 process.nextTick 队列
   │     3) 清空所有微任务
   │     4) 进入下一阶段
   └─ 全部阶段结束 → 决定是否还要再循环（活跃 handle 数为 0 就退出进程）
```

**关键点**：`process.nextTick` 和微任务**不是阶段**，而是**每个阶段之间都会被清空**的"插入点"。

---

## 6 个阶段详解

### 1. timers

执行 `setTimeout` / `setInterval` 到期的回调。

⚠️ **回调执行时间不精确**：到期时间不等于执行时间。如果 poll 阶段在跑别的回调，timer 要等到下一轮 timers 才被处理。

### 2. pending callbacks

某些**系统操作的错误回调** —— 例如 TCP 连接被 reset (`ECONNREFUSED`)、UDP 错误等。日常很少感知。

### 3. idle, prepare

libuv **内部使用**，业务代码碰不到。

### 4. poll（事件循环的"心脏"）

- **拿取 I/O 事件**（socket 可读、文件读完、DNS 返回……）并执行对应回调
- 如果 poll 队列为空且没有定时器到期 → **阻塞等待 I/O**（这是 Node 不空转的关键）
- 如果有 `setImmediate` 注册 → 立刻切到 check（不阻塞）

→ 大多数业务回调（HTTP 请求、fs.readFile）在这阶段跑。

### 5. check

执行 `setImmediate` 回调。

### 6. close callbacks

执行 `'close'` 事件的回调，比如 `socket.on('close', ...)` / `stream.on('close', ...)`。

---

## process.nextTick vs 微任务 vs setImmediate

```js
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));
console.log('sync');

// 输出：
// sync
// nextTick      ← 同步代码后立即清，比 Promise 还高优先级
// promise       ← 微任务
// timeout       ← 下一个 timers 阶段
// immediate     ← 下一个 check 阶段
// (timeout / immediate 顺序在某些条件下不确定)
```

### 优先级顺序

```
process.nextTick > microtasks (Promise) > 阶段内的回调
```

**`process.nextTick` 风险**：
- 比 Promise **还早**执行 → 同样有"饿死"宏任务的风险
- 递归 `process.nextTick(self)` 会让事件循环**完全无法推进**
- **`queueMicrotask`** 是更标准的现代替代

---

## setTimeout(fn, 0) vs setImmediate 顺序

```js
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
```

- **独立调用**（顶层代码）：顺序**不确定**，取决于 event loop 进入 timers 阶段时计时是否已"到期"（系统调度细节）。
- **在 I/O 回调里调用**：**setImmediate 必先于 setTimeout**。
  ```js
  fs.readFile('x', () => {
    setTimeout(() => console.log('timeout'), 0);
    setImmediate(() => console.log('immediate'));
    // 输出：immediate, timeout    （稳定）
  });
  ```
  原因：I/O 回调在 poll 阶段执行，**poll 后立即是 check**，setImmediate 抢占 check；timers 要等下一轮。

---

## 微任务饿死阶段

宏任务阶段之间会清空微任务队列。如果你在微任务里**继续产生微任务**，event loop 就推进不了：

```js
setInterval(() => console.log('tick'), 100);   // 永远不会打印
function evil() { Promise.resolve().then(evil); }
evil();
```

实际业务陷阱：**大 `async/await` 循环连续 await 同步可结果的 promise**，导致 timer / I/O 回调饿死。

对策：定期 `await new Promise(r => setImmediate(r))` 主动跳一个阶段。

---

## "事件循环"和"线程"的关系

- JS 在**主线程**上跑（包括所有用户 JS 代码 + Event Loop 调度逻辑）
- 阻塞操作（`fs.readFileSync` / 复杂正则 / 大循环）会**让整个 event loop 卡住**
- 真正"异步"的活（DNS / 文件 I/O / 加密）由 **libuv 线程池**在后台跑，做完通过 poll 队列回到主线程

→ 这就是 Node 单线程 JS + 多线程 I/O 的核心架构（详见 Libuv quiz）。

---

## 调试 Event Loop

### 看 event loop 滞后

```js
let last = Date.now();
setInterval(() => {
  const now = Date.now();
  const lag = now - last - 1000;     // 期望 1000ms 间隔
  if (lag > 50) console.warn(`Event loop lag: ${lag}ms`);
  last = now;
}, 1000);
```

`lag > 50ms` 通常意味着主线程被某个长任务卡住。

### 查活跃的 handle / request

```js
process._getActiveHandles();    // 仍在运行的句柄（server / socket / timer）
process._getActiveRequests();   // 进行中的请求
```

进程不退出？通常是这两个里有忘清的东西（timer / server.close()）。

### Node 22+ 的 perf hooks

```js
import { performance, PerformanceObserver } from 'node:perf_hooks';

const obs = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) console.warn(`Long task: ${entry.duration}ms`);
  }
});
obs.observe({ entryTypes: ['function'] });
```

---

## 一句话总结

> **Node.js Event Loop = 6 个固定阶段的循环 + 每阶段后清 nextTick 和微任务的插入点。**
>
> 关键心法：
> - **I/O 回调在 poll** —— 主线程跑业务
> - **setImmediate 在 check** —— 比 setTimeout 更可预测
> - **nextTick / 微任务比阶段优先级高，但能饿死阶段**
> - **真正异步靠 libuv 线程池**，主线程负责调度
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','event-loop','async','javascript'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Libuv
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Libuv · Node.js 异步 IO 引擎 · 线程池 / epoll / kqueue / IOCP',
$content$
## Libuv 是什么

**Libuv** 是一个**用 C 语言编写的跨平台异步 IO 库**，最初为 Node.js 开发，现在也被 Julia、Luvit、pyuv 等使用。

核心职责：**抹平不同操作系统的异步 IO 差异**：

| OS | 内核异步原语 |
|---|---|
| Linux | **`epoll`** |
| macOS / BSD | **`kqueue`** |
| Windows | **`IOCP`** (I/O Completion Ports) |
| Solaris | event ports |
| AIX | pollset |

→ libuv 把它们统一封装成"一个 API"暴露给 Node.js。**写一份 Node 代码，背后跑在任何平台**。

---

## Libuv 在 Node.js 架构里的位置

```
┌──────────────────────────────────────┐
│      JS App (your code)              │
├──────────────────────────────────────┤
│      Node.js Bindings (C++)          │
│      └─ fs / net / http / crypto     │
├──────────────────────────────────────┤
│      V8 (JS 引擎)         libuv      │
│                          ├─ Event Loop
│                          ├─ Thread Pool
│                          ├─ epoll / kqueue / IOCP
│                          └─ async I/O 抽象
├──────────────────────────────────────┤
│      OS Kernel (epoll/kqueue/IOCP)   │
└──────────────────────────────────────┘
```

V8 跑 JS、libuv 提供异步 I/O —— 两个独立组件，Node 把它们粘在一起。

---

## Libuv 的两种异步实现

不同类型的 I/O 用不同方式实现异步：

### 1. 基于内核 epoll/kqueue/IOCP（真正的异步 I/O）

| 系统 | 类型 | 适用 |
|---|---|---|
| **Linux `epoll`** | 通知就绪后用户主动读 | 网络 I/O / pipe / TTY |
| **macOS/BSD `kqueue`** | 同 epoll，更通用 | 网络 / 文件 / 信号 / 进程退出 |
| **Windows `IOCP`** | 真正的"完成通知"模型 | 网络 + 文件 |

→ **网络 I/O（TCP/UDP/DNS lookup）** 走这条路径，**零线程消耗**。

### 2. Libuv 线程池（伪异步）

文件 I/O 在 Linux 上**没有完美的内核异步**（io_uring 是新方案，仍在试验），所以 libuv 用**线程池**模拟异步：

- 主线程发 fs.readFile 请求 →
- 任务进入 libuv 线程池队列 →
- 线程池里某个 worker 用**同步阻塞** API（`pread`）干活 →
- 完成后**通知** event loop →
- 主线程在 poll 阶段拿到回调

→ **从 JS 视角看是异步，但底层是另一个线程同步在跑**。

#### 线程池跑什么

| 走线程池 | 不走（走 kernel async） |
|---|---|
| `fs.*` 文件 I/O（除特殊情况） | `net.*` 网络 I/O |
| `dns.lookup`（**`getaddrinfo` 同步**） | `dns.resolveXxx`（走 socket，**走 kernel**） |
| `crypto.pbkdf2` / `crypto.scrypt` | event 调度本身 |
| `zlib` 压缩 | 定时器 |
| 用户自定义 `uv_queue_work`（C++ addon） | |

⚠️ **`dns.lookup` 和 `dns.resolve` 的区别**很重要：前者走线程池，4 个线程并发就是上限；后者直接通过 UDP 走 kernel async，几乎无限并发。**HTTP 客户端默认用 `lookup`**，高并发场景这是经典坑。

#### 默认线程数 = 4

```bash
UV_THREADPOOL_SIZE=16 node app.js     # 调大
```

- **范围**：1 – 1024
- **生效时机**：进程启动时读一次，运行时改无效
- **何时调大**：高并发文件 I/O / 大量 crypto / pdf 处理 / 高并发 `dns.lookup` 的 HTTP 客户端

#### 何时不该调大

- 网络 I/O 不走线程池，调了没用
- 线程池超过 CPU 核数太多 → 上下文切换浪费
- 调到 128 不一定比 32 快，要 benchmark

---

## 真正的 Linux 异步：io_uring

`epoll` 在 Linux 上对**文件 I/O 不真异步**（只对 socket 真异步）。Linux 5.1+ 引入 **io_uring**：

- 真·**统一的内核异步**（network + file + 一切 fd）
- 用户态和内核共享 ring buffer 提交 + 收割请求，**避免每次系统调用开销**
- 性能比 epoll + 线程池**快几倍**（高并发文件场景）

Node 22+ 的 libuv 已经开始**实验性支持 io_uring**，未来文件 I/O 可能不再依赖线程池。

---

## Handle vs Request

libuv 的两个核心抽象：

| | **Handle** | **Request** |
|---|---|---|
| 含义 | **长寿命资源** | **一次性操作** |
| 例子 | `uv_tcp_t` (TCP server) / `uv_timer_t` (定时器) | `uv_fs_t` (一次文件读) / `uv_getaddrinfo_t` |
| 生命周期 | 用户主动 close | 操作完成自动释放 |

Node 进程退出条件：**所有 active handle 数 = 0**。一个被 `keepAlive` 的 socket / 没 unref 的 timer 都会让进程不退。

`handle.unref()` —— 让 handle 不计入"活跃数"。常用于**不阻塞退出**的后台 timer。

---

## libuv 在 Node 启动时干了什么

```c
int main() {
  uv_loop_t* loop = uv_default_loop();   // 主 event loop
  // V8 启动、加载 main 模块、运行你的 JS ...
  uv_run(loop, UV_RUN_DEFAULT);          // 进入 event loop，直到 active handles = 0
  uv_loop_close(loop);
  return 0;
}
```

`uv_run` 内部就是 6 个阶段的循环（详见 Event Loop quiz）。

---

## 调优 / 排查

### 看 libuv 线程池压力

```bash
NODE_DEBUG_NATIVE=worker_pool node app.js
```

会打印线程池任务调度细节。

### perf_hooks 看 event loop utilization

```js
import { performance } from 'node:perf_hooks';
const u = performance.eventLoopUtilization();
// { idle, active, utilization }
// utilization 0~1，越接近 1 说明 event loop 越忙
```

`utilization > 0.8` 持续 → CPU 卷了（要么是 JS 重计算，要么是线程池满 + I/O 排队）。

### 看 DNS 是否成为瓶颈

如果一个进程发起几百个 HTTP 请求 + 默认 `dns.lookup` + 默认 4 线程，**DNS 查询会被排队**。换 `lookup` 实现：

```js
import { lookup } from 'node:dns/promises';
// 或用 HTTP agent 的 lookup 选项指向自定义函数（如基于 dns.resolve4 的版本）
```

或干脆增大 `UV_THREADPOOL_SIZE=64`。

---

## 一句话总结

> Libuv 是 Node.js 真正的"异步引擎"：
> - **网络 I/O 走内核**（epoll/kqueue/IOCP），零线程消耗
> - **文件 I/O / DNS lookup / crypto / zlib 走 libuv 线程池**（默认 4 线程）
> - 整个 event loop（6 阶段）就在 libuv 里
>
> 高并发性能调优的两个旋钮：
> - **`UV_THREADPOOL_SIZE`** —— 文件/crypto 重的场景调大
> - **避开 `dns.lookup`** —— 高并发 HTTP 客户端的隐藏坑
>
> Linux 上的下一代是 **io_uring**，会逐步替代线程池路径。
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','libuv','io','event-loop','performance'],
  NULL
);
