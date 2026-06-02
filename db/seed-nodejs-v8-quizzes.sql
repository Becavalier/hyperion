-- 10 quiz cards: Node.js / V8 internals, split per h3.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

-- ─────────────────────────────────────────────────────────────────────────────
-- 1
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Node.js · 为什么不适合 CPU 密集型任务 · Worker Threads / Child Process',
$content$
## 为什么 Node.js 不适合 CPU 密集型任务？

Node.js 是**单线程**（指 JS 执行单线程，I/O 实际是 libuv 线程池）。如果执行 CPU 密集型任务，会**阻塞 Event Loop**，导致其他请求无法处理，从而影响整体性能。

> 一个 250ms 的 CPU 计算 = 这 250ms 里**整个进程**接不动任何新请求、响应不了任何回调、清不了任何定时器。

### 怎么判断"CPU 密集"

- 大 JSON 解析 / `JSON.parse`（同步且不能分块）
- 复杂正则（catastrophic backtracking）
- 加密 / 哈希 / 压缩
- 图像 / 视频处理
- ML 模型推理
- 大数组排序、聚合

### 解决方案

| 方案 | 原理 | 优点 | 代价 |
|---|---|---|---|
| **Worker Threads** | Node 内置 `worker_threads`，同进程多线程 | 利用**多核真正并行**；通信便宜（postMessage / SharedArrayBuffer） | 共享内存复杂、线程通信 overhead |
| **Child Process** | `child_process.fork()` 起独立 Node 进程 | 进程间**完全隔离**；崩了不影响主进程 | 开销大、内存占用高、IPC 通信成本高 |
| **拆到其他服务** | Go / Rust / C++ 微服务承接计算 | 编译语言性能 + 真正多核 | 多语言运维成本、网络延迟 |
| **`piscina` 等池化库** | Worker Threads 上的线程池 | 复用 worker，省创建开销 | 一层抽象 |

### Worker Threads 最小示例

```js
// main.js
import { Worker } from 'node:worker_threads';

function runWorker(data) {
  return new Promise((res, rej) => {
    const w = new Worker('./worker.js', { workerData: data });
    w.on('message', res);
    w.on('error', rej);
  });
}

// worker.js
import { parentPort, workerData } from 'node:worker_threads';
const result = heavyCompute(workerData);
parentPort.postMessage(result);
```

### 选型建议

- **能拆就拆**：把重计算分到独立 worker / 进程，主线程只跑 I/O
- 用 `piscina` 等池化库管理 worker 池，**别每次 new Worker**（创建是几十 ms 量级）
- 千万级 CPU 任务还是上 Go/Rust 起独立服务，Node 不是合适工具

> 一句话：**Node 是 I/O 怪兽，CPU 是它的短板。这是单线程模型的设计后果，不是 Bug。**
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','javascript','performance','concurrency'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 2
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Node.js · require vs import · CJS vs ESM',
$content$
## require 和 import 的底层区别

| | **`require` (CJS)** | **`import` (ESM)** |
|---|---|---|
| **形式** | 运行时**函数调用** | 静态**声明** |
| **加载时机** | 运行到这一行才加载 | 编译时解析依赖（顶层 import） |
| **位置** | 任意（if 里、函数里都行） | 必须**顶层**（动态用 `import()`） |
| **动态路径** | ✅ | ❌（静态 import 不允许，动态 import 可以） |
| **加载方式** | **同步**，阻塞执行 | 静态预解析，**动态 import 异步**（Promise） |
| **绑定语义** | **值拷贝** —— 原始值拷，对象拷引用 | **Live binding** —— 变量引用，导出方改了消费方也能看到 |
| **缓存** | `require.cache`（**可清**） | Module Record（**不可清**） |
| **顶层 this** | `module.exports` | `undefined` |
| **Tree shaking** | ❌ 不支持静态分析 | ✅ 支持 |
| **循环依赖** | 可能拿到**未执行完**的模块（部分导出） | 基于 live binding，**更完善**，变量逐步初始化 |

### Live Binding 演示

```js
// counter.mjs
export let count = 0;
export function inc() { count++; }
```

```js
// app.mjs
import { count, inc } from './counter.mjs';
console.log(count);   // 0
inc();
console.log(count);   // 1 ← 看到了变化！
```

CJS 等价代码里 `count` 是**导入那一刻的值拷贝**，inc 改不到。这是 ESM 的关键升级。

### `require.cache` 可清，ESM 不可

```js
// CJS：可以热重载
delete require.cache[require.resolve('./mod')];
const mod = require('./mod');   // 重新执行

// ESM：模块一旦加载就锁定，无法重新求值
// 想做开发热重载只能起子进程 / nodemon
```

### 互相 import 的兼容

| 谁 import 谁 | 行为 |
|---|---|
| **ESM import CJS** | ✅ 默认导出整个 `module.exports`；命名导出在 Node 22+ 部分支持（要看 CJS 是否被静态分析推断出） |
| **CJS require ESM** | 旧版不能（异步问题）；Node 22+ 支持 `require()` 同步 ESM，前提是没有 top-level await |

### 现状（2026）

- **Node 22+** 默认开启 ESM-CJS 互操作；`require()` ESM 也能用
- 新项目用 ESM（`"type": "module"`）+ TypeScript + Vite/tsx；老项目逐步迁移
- 类型生态（npm 包）正在快速 ESM 化，剩下的 CJS-only 包大多是历史包袱
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','javascript','modules','esm','cjs'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 3
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Node.js · Stream · 流式数据处理',
$content$
## 什么是 Stream？为什么性能更好？

**Stream** 是一种按**块（chunk）**处理数据的方式，相对一次性全部加载，它**更节省内存、提高性能**，适合处理大文件或网络流。

### 一次性 vs 流式

```js
// ❌ 一次性读：10GB 文件 → 10GB 内存
const data = fs.readFileSync('/tmp/big.log');

// ✅ 流式读：每次只持有一个 chunk（默认 64KB），常驻内存几乎为 0
const stream = fs.createReadStream('/tmp/big.log');
stream.on('data', chunk => process(chunk));
```

### 4 种 Stream

| 类型 | 例子 | 接口 |
|---|---|---|
| **Readable** | `fs.createReadStream` / HTTP request | `data` / `end` / `error` 事件，`read()` |
| **Writable** | `fs.createWriteStream` / HTTP response | `write()` / `end()` / `drain` 事件 |
| **Duplex** | TCP socket | 读 + 写 |
| **Transform** | `zlib.createGzip` / `crypto.createCipheriv` | Duplex 的子集，输入 → 转换 → 输出 |

### 现代写法：Async Iterator

```js
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

async function* readLines(path) {
  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity,
  });
  try {
    for await (const line of rl) yield line;
  } finally {
    rl.close();
  }
}

for await (const line of readLines('huge.log')) {
  if (line.includes('ERROR')) console.log(line);
}
```

`for await...of` 语法天然支持 stream，代码读起来像同步。

### `pipeline` 替代 `pipe`

```js
import { pipeline } from 'node:stream/promises';

await pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('output.txt.gz'),
);
```

比手写 `.pipe()` 链好：
- **错误传播**：任一环出错都能 catch 到
- **资源清理**：失败时自动 destroy 所有 stream，不漏 fd
- **Promise 化**：await 等结束

> 老代码常见 bug：`a.pipe(b).pipe(c)` 中 a 出错没监听 → 不抛错也不退出。**生产代码一律 `pipeline`**。

### 性能优势

- **常驻内存 ≈ highWaterMark** （默认 64KB）—— 处理任意大文件不会 OOM
- **流水线并行** —— 读、压缩、写同时进行
- **首字节响应快** —— HTTP 不用等所有数据准备好就开始 flush
- **支持背压**（见下一卡）

### Web Streams API

现代标准还有 **Web Streams**（`ReadableStream` / `WritableStream` / `TransformStream`），跨浏览器 + Node 通用。Node 18+ 原生支持，与 Fetch API 集成更好：

```js
const res = await fetch('https://...');
for await (const chunk of res.body) { /* ... */ }   // Web Stream 也支持 async iter
```

新代码越来越推荐 Web Streams（同一份知识浏览器和 Node 都能用）。
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','javascript','streams','performance'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 4
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Node.js · Buffer · 二进制数据 / 和 Stream 的关系',
$content$
## Buffer 是什么

**Buffer** 是 Node 里用来处理**二进制数据**的对象，**直接操作内存**（V8 堆外）—— 不经过 V8 GC，主要用于表示非字符串的二进制数据。

```js
const buf = Buffer.alloc(8);                 // 8 字节 0x00
const buf2 = Buffer.from('hello', 'utf-8');  // 从字符串
const buf3 = Buffer.from([0xde, 0xad]);      // 从字节数组

buf2.toString('hex');                        // '68656c6c6f'
buf2.length;                                 // 5
buf2[0];                                     // 104
```

### 为什么不进 V8 堆

- V8 堆受**新生代/老生代**管理，分配大对象 → 频繁触发 GC，性能差
- 二进制 buffer 通常**大且短命**，不适合 GC 的代际假设
- 直接走 C++ 内存（malloc / mmap）—— 分配快、操作快、避免 GC 暂停

### Buffer 和 Stream 的关系

> **Stream 是传输数据的管道；Buffer 是其中临时存放数据的容器。**

- 从 file / socket 读数据 → 内核给一段二进制 → Node 包装成 Buffer chunk → 通过 stream `data` 事件给到你
- 写出去也是反向：你的数据 → Buffer → stream write → 内核 → file / socket

### Stream 的两种模式

```js
// flowing 模式 - 数据自动推送
stream.on('data', chunk => { /* chunk 是 Buffer */ });

// paused 模式 - 手动拉取
stream.on('readable', () => {
  let chunk;
  while ((chunk = stream.read()) !== null) { /* ... */ }
});
```

**`encoding`** 不设时拿到的是 **Buffer**；`stream.setEncoding('utf8')` 后拿到的是字符串（Node 自动 `buf.toString()`）。

### 常见操作

```js
Buffer.concat([buf1, buf2]);          // 合并
buf.slice(2, 5);                       // 切片（旧 API，返回**共享内存的视图**）
buf.subarray(2, 5);                    // 新 API，行为同 slice
buf.write('世界', 'utf-8');             // 写入
buf.readUInt32BE(0);                   // 大端 32 位无符号整数
buf.writeFloatLE(3.14, 4);             // 小端单精度浮点
```

### Buffer 和 Uint8Array

```js
buf instanceof Uint8Array;   // true
```

Node 的 `Buffer` 是 `Uint8Array` 的子类。可以无缝把 Buffer 传给任何接受 `Uint8Array` / `ArrayBufferView` 的 Web API（`crypto.subtle.digest`、`TextDecoder` 等）。

### 安全坑：`Buffer.allocUnsafe`

```js
Buffer.alloc(1024);          // ✅ 全 0，安全
Buffer.allocUnsafe(1024);    // ⚠️ 不初始化，可能含上一个进程的内存残留
```

`allocUnsafe` 更快但内容随机。**生产代码用 `Buffer.alloc`** —— 安全。性能临界点（数百万次）才考虑 `allocUnsafe` 配合显式 fill。
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','javascript','buffer','memory'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 5
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Node.js · 背压 Backpressure',
$content$
## 背压（Backpressure）

**生产者产出数据的速度快于消费者处理数据的速度**，数据堆积在内存缓冲区中，导致**内存暴涨 / OOM**。

**背压**是一种**反馈机制**，让消费者告诉生产者"慢一点"。

### 内部缓冲区 + highWaterMark

每个 Writable stream 有一个**内部缓冲区**，大小由 `highWaterMark` 控制（默认 **16KB** 文件流 / **16 个对象** 对象模式）。

### `write()` 的返回值

```js
const ok = writable.write(chunk);
// ok = true   → 缓冲区未满，继续写
// ok = false  → 缓冲区满了，应该暂停
```

### 手动背压协议

```js
readable.on('data', chunk => {
  const ok = writable.write(chunk);
  if (!ok) readable.pause();          // 缓冲区满，暂停读取
});

writable.on('drain', () => {
  readable.resume();                  // 缓冲区排空，恢复读取
});
```

**`drain` 事件**：写入缓冲区**重新有空位**时触发。

### `pipe` / `pipeline` 自动处理背压

```js
readable.pipe(writable);                       // pipe 自动做了上述协议
await pipeline(readable, transform, writable); // 推荐
```

写业务代码**几乎不需要手写背压协议** —— 全部 stream 链都用 `pipeline`。

### Async Iterator 也自动处理背压

```js
for await (const chunk of readable) {
  await writable.write(chunk);    // await 让出主线程
  // 这里 await 自然产生背压 —— 上游产生新 chunk 也得等你处理完
}
```

`for await` + `await write` 比手写背压协议更易读，新代码推荐。

### 何时背压会消失（业务陷阱）

- 写入端是**纯 JS 处理**（计算 + 不调用 write）→ Node 不知道你"慢"，不会暂停上游
- **手动 push 进数组**（不走 stream）→ 数组无限增长直到 OOM

```js
// ❌ 背压完全失效
const buffer = [];
readable.on('data', chunk => {
  buffer.push(chunk);                  // 不限速、不反馈
});

// ✅ 用一个有限大小的队列模拟背压
import { Transform } from 'node:stream';
const limiter = new Transform({
  highWaterMark: 16,
  transform(chunk, _, cb) { /* 处理 */ cb(); }
});
await pipeline(readable, limiter, writable);
```

### 排查背压问题

- 内存持续上涨 → 用 `--inspect` + Chrome DevTools 看堆快照
- 看 `writable.writableLength` —— 缓冲区当前积压量；持续接近 `highWaterMark` 就是消费跟不上
- HTTP 服务的下游响应慢 → `socket.bufferSize` 也是常见现场

> 一句话：**`pipeline` 帮你处理 95% 的背压；剩下 5% 是你自己在 stream 链外又开了个队列**。
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','javascript','streams','backpressure','performance'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 6
-- ─────────────────────────────────────────────────────────────────────────────
(
  'Node.js · 内存泄漏的 5 种典型原因 + 排查',
$content$
## 内存泄漏的 5 种典型原因

1. **全局变量** —— 挂在 `globalThis` 上的引用永远不释放
2. **闭包引用** —— 闭包持有外层作用域，意外延长对象寿命
3. **事件监听未移除** —— `emitter.on('x', fn)` 后没 `off`，emitter 永久持有 fn
4. **定时器未清除** —— `setInterval` 没 `clearInterval`，回调里的引用永远存活
5. **Map / Set 持有对象引用** —— 强引用，不会触发对象 GC

### 典型代码

```js
// ① 全局变量
let cache = {};                                  // 模块顶层，进程级长寿
function add(k, v) { cache[k] = v; }             // 只加不清

// ② 闭包
function makeHandler() {
  const big = new Array(1e7).fill(0);
  return () => big.length;                       // big 永不释放
}

// ③ 监听未移除
function subscribe(socket, user) {
  socket.on('data', d => process(user, d));      // 闭包持 user
  // 缺一句：socket.off('data', handler) 或 socket.removeAllListeners()
}

// ④ 定时器未清
const timer = setInterval(() => { /* ... */ }, 1000);
// 缺：clearInterval(timer) on shutdown / unmount

// ⑤ Map 持有引用
const userCache = new Map();
userCache.set(user, fetchProfile(user));         // user 永远在 cache 里，gc 不掉
```

### 弱引用版本（防泄漏）

- **`WeakMap` / `WeakSet`** —— key 是对象，引用弱；object 没别处引用时 GC 能回收
- **`WeakRef`** —— 弱引用单个对象，配合 `FinalizationRegistry` 知道何时被回收

```js
const cache = new WeakMap();
cache.set(user, profile);    // user 在别处没引用了 → 整条 entry 自动消失
```

### 排查工具

| 工具 | 用法 |
|---|---|
| **`--inspect` + Chrome DevTools** | Memory 面板 → Heap snapshot → 对比两次 snapshot 找 retained objects |
| **`node --heap-prof`** | 采样堆分配 profile（CPU profile 风格的内存版本） |
| **`heapdump` npm 包** | 程序运行中 dump `.heapsnapshot` 文件 |
| **`process.memoryUsage()`** | 实时看 `heapUsed` / `external` / `arrayBuffers` |
| **`v8.getHeapStatistics()`** | 细粒度 V8 堆状态 |
| **`clinic.js doctor / heapprofiler`** | NearForm 的诊断套件，自动定位常见泄漏模式 |

### 排查方法论：双快照比对

1. 启动应用，达到稳态后**第一次 snapshot**
2. 让业务跑一段时间（多次相同动作 N 次）
3. **第二次 snapshot**
4. DevTools "Comparison" 视图，按 #Delta 排序
5. 看哪个 constructor 不正常增长 → 点开 retained tree → 找到根 retainer

### 高频实战 case

- **Express 路由处理器里 require 一个大模块** → 每个 request 都重新 require？不，require 有缓存。但**handler 里 new 一个 30MB 对象**就会
- **EventEmitter 警告 "MaxListenersExceededWarning"** → 几乎肯定是 .on 没配对 .off
- **第三方库挂全局** → 看 `globalThis` 的 key 变化
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','javascript','memory','debugging'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 7
-- ─────────────────────────────────────────────────────────────────────────────
(
  'V8 内存结构 · 新生代 / 老生代 / 栈 / 代码区',
$content$
## V8 内存结构

```
V8 内存
  ├── 堆（Heap）
  │   ├── 新生代（New Space）     → 短命对象，小（1-8MB）
  │   └── 老生代（Old Space）     → 长命对象，大（默认 1.4GB / 64-bit）
  ├── 栈（Stack）                  → 函数调用、原始值
  ├── 代码区（Code Space）         → JIT 编译后的代码
  └── 大对象区（Large Object）     → 超过阈值的对象，不参与 GC
```

### 堆（Heap）

JS 对象 / 闭包 / 字符串等**所有引用类型**的实际存储。GC 管的就是这里。

**新生代 vs 老生代** 的设计基于"**代际假设**"：

> **大部分对象很短命** —— 多数对象在分配后很快就死。少数活过头一波的对象会活很久。

→ 用便宜的算法（Scavenge）频繁清理新生代；用复杂算法（Mark-Sweep / Compact）少量但彻底地清理老生代。

#### 新生代（New Space）

- 大小：**1 ~ 8MB** per isolate（可通过 `--max-semi-space-size` 调）
- 算法：**Scavenge**（详见下一张 quiz）
- 一切 `new` / 对象字面量、`function () {}`、临时字符串都先进这里

#### 老生代（Old Space）

- 大小：**默认 ~1.4GB**（64-bit 主进程），可用 `--max-old-space-size=4096` 调到 4GB
- 算法：**Mark-Sweep + Mark-Compact**（见下一张 quiz）
- 经历过若干次 Scavenge 仍存活的对象会被"晋升"到这里

### 栈（Stack）

- 函数调用帧、原始值（number / boolean）、对象指针
- 默认 **每线程 ~984KB**（V8 8.x 起），可用 `--stack-size` 调
- 栈溢出 → `RangeError: Maximum call stack size exceeded`（典型递归无 base case）

### 代码区（Code Space）

- 存储 **JIT 编译后的机器码**（V8 的 Ignition bytecode + TurboFan / Maglev 优化代码）
- 普通业务很少关注；性能极致时 (`--no-opt`) 才能让人感受到

### 大对象区（Large Object Space）

- 单个对象超过约 **512KB** 时直接进这里
- 不复制、不移动，避免大对象在新生代之间倒腾的开销
- 但仍参与老生代的 mark-sweep（**会**被 GC，只是不被移动）

### 关键 Node 启动参数

```bash
node \
  --max-old-space-size=4096 \    # 老生代上限 4GB
  --max-semi-space-size=128 \    # 新生代单半区 128MB
  --expose-gc \                  # 暴露 global.gc() 供手动触发
  app.js
```

实战：**容器化部署时一定要设 `--max-old-space-size`** —— 默认 1.4GB 在 4GB pod 里浪费内存，在 8GB pod 里更浪费；不显式设 V8 不知道 pod 真实上限。

### 用代码查看

```js
import v8 from 'node:v8';
console.log(v8.getHeapStatistics());
console.log(v8.getHeapSpaceStatistics());   // 每个 space 单独的数据

console.log(process.memoryUsage());
// {
//   rss: 50_000_000,         // Resident Set Size，进程总驻留内存
//   heapTotal: 8_000_000,    // V8 堆已分配
//   heapUsed: 5_000_000,     // V8 堆使用中
//   external: 1_000_000,     // C++ 对象（Buffer 等）绑定的内存
//   arrayBuffers: 500_000    // ArrayBuffer 部分
// }
```

> 看 OOM 时主要看 `heapUsed` 是否撞了 `max-old-space-size`；看 native 内存（如 Buffer 滥用）主要看 `external` 和 `rss - heapTotal`。
$content$,
  'quiz', 'medium',
  ARRAY['backend','javascript','v8','memory','nodejs'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 8
-- ─────────────────────────────────────────────────────────────────────────────
(
  'V8 垃圾回收 · Scavenge / Mark-Sweep / Mark-Compact / 增量标记',
$content$
## 垃圾回收算法

### 新生代：Scavenge（半空间复制）

适合**短命对象**，速度极快：

```
分两半（from / to）
   ↓
存活对象从 from 复制到 to
   ↓
from / to 互换
```

复杂度 O(存活对象数)，因为**死对象根本不被遍历**（不像 mark-sweep 要扫描所有对象）。

**缺点**：永远只有半个新生代能用 → 利用率 50%（但因为新生代小所以不心疼）。

### 晋升到老生代

两条规则：

1. **经历过一次 Scavenge 仍然存活** → 后续直接放入老生代
2. **`to` 空间使用超过 25%** → 后续存活对象直接放入老生代（避免新生代太满影响后续 Scavenge 性能）

### 老生代：Mark-Sweep + Mark-Compact

- **Mark-Sweep（标记-清除）**：
    1. 标记从 GC root 可达的所有对象（mark）
    2. 清除未标记的（sweep）
    3. **缺点**：产生**内存碎片**
- **Mark-Compact（标记-整理）**：
    1. 同上 mark
    2. 把存活对象**整理到一端**，剩下连续空闲
    3. **代价**：移动对象，慢

V8 实际**混用**：大多数 GC 周期跑 Mark-Sweep（快）；偶尔（碎片严重时）跑一次 Mark-Compact（彻底整理）。

### Stop-The-World 问题

GC 期间整个 JS 主线程暂停 → 大堆全量 Mark-Sweep 可能造成 **几十到几百毫秒**的 GC pause。

### 优化技术

#### Incremental Marking（增量标记）

把 mark 阶段切成多个小片段，**和 JS 执行交替进行**：

```
JS run → mark slice → JS run → mark slice → ... → sweep
```

每个 slice ~5-10ms，对用户几乎不可感知。

#### Lazy Sweeping（惰性清除）

mark 完后**不立即** sweep 所有页面，**新分配请求驱动**对应页面才清。

#### Concurrent Marking（V8 6.1+）

把 marking 跑在**辅助线程**上，几乎不阻塞主线程。

#### Parallel Compaction

compact 阶段也用多线程加速。

### GC 的 root 是什么

GC 从 "root" 出发追可达对象：

- **全局对象**（`globalThis`）
- **当前调用栈**上的所有变量、闭包
- **CPU 寄存器**里的值
- **JS Handle**（C++ 持有的 JS 对象引用，Buffer / Native Addon 用）

所有 root 通过引用链能到达的对象 = 存活。其他 = 垃圾。

### 手动触发 GC

```bash
node --expose-gc app.js
```

```js
if (global.gc) global.gc();   // 同步全量 GC，主要用于测试 / debug
```

**生产代码不要手动 GC** —— V8 比你聪明，强制 GC 反而打乱节奏。

### 看 GC 时机

```bash
node --trace-gc app.js
# 每次 GC 都打印一行：类型 / 老堆使用 / 耗时 / 触发原因
```

```
[12345:0x...] 1234 ms: Scavenge 8.0 (16.0) -> 5.5 (16.0) MB, 1.5 / 0.0 ms
```

### 常见 GC 优化

- **避免大对象频繁分配**（特别是新生代被填满会强制晋升）
- **池化复用**（buffer pool / object pool）减少 GC 次数
- **批量操作** 优于多次细小分配
- **不要在循环里建临时对象**

### 阅读 v8 GC 日志的 4 个关键指标

1. **Scavenge / Mark-Sweep / Mark-Compact 占比** —— 都是 MS 多 = 老生代压力大
2. **GC 总耗时占比** —— 超过 5% 就该优化
3. **晋升速率** —— 大批新对象晋升说明对象寿命被错估
4. **External memory** 增长 —— Buffer / ArrayBuffer 滥用
$content$,
  'quiz', 'medium',
  ARRAY['backend','javascript','v8','memory','gc','performance'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 9
-- ─────────────────────────────────────────────────────────────────────────────
(
  'V8 隐藏类 (Hidden Class) · 对象结构优化',
$content$
## 隐藏类（Hidden Class）

JS 是动态类型，对象可以随时增减属性。但 V8 在内部为对象创建**隐藏类（Hidden Class / Map）**来优化属性访问 ——

> **同样结构的对象共享同一个隐藏类**，访问属性时 V8 可以直接走 offset 而不是 hash 查找，**速度接近 C 的 struct**。

### 隐藏类怎么生成

```js
const p = {};       // 隐藏类 C0 (空)
p.x = 1;            // 隐藏类 C1 (有 x)
p.y = 2;            // 隐藏类 C2 (有 x, y)
```

每次新加属性，对象切换到**新的隐藏类**，并记录**transition**（从 C1 加 y → C2）。

**关键**：另一个对象走相同的 transition 链，会**共享同一个隐藏类**：

```js
function Point(x, y) { this.x = x; this.y = y; }
const a = new Point(1, 2);   // a 走 C0 → Cx → Cxy
const b = new Point(3, 4);   // b 也走 C0 → Cx → Cxy   共享！
```

→ 数组里 1000 个 Point 对象**全部共享同一个 hidden class** → V8 可以为这个类做极致内联优化。

### 优化原则

#### ✅ 属性顺序一致

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
// 所有 Point 实例共享同一个 hidden class
```

#### ❌ 动态添加属性

```js
const obj = {};
obj.x = 1;       // 一个隐藏类
obj.y = 2;       // 又一个隐藏类
// 同样的 (x, y) 对象，因为不在 constructor 里赋值，每个对象都是独立 transition 链
```

#### ❌ 属性顺序不一致

```js
const a = {};
a.x = 1;
a.y = 2;        // a 走 C0 → Cx → Cxy

const b = {};
b.y = 2;
b.x = 1;        // b 走 C0 → Cy → Cyx   ← 不同的 hidden class！
```

→ a 和 b 看起来一样，**实际上不共享 hidden class**。后续访问效率差异巨大。

#### ❌ delete 属性

```js
delete obj.x;    // 触发 hidden class 切换 + 进入 "dictionary mode"（hash 模式）
```

一旦进入 dictionary mode，所有属性访问退化为 hash 查找，**慢一个数量级**。

#### ❌ 给数组添加非数字 key

```js
const arr = [1, 2, 3];
arr.name = 'foo';   // 数组变成对象模式，失去 fast elements 优化
```

### 怎么检查对象是否走了 fast path

V8 提供调试 intrinsics（启动加 `--allow-natives-syntax`）：

```bash
node --allow-natives-syntax test.js
```

```js
const obj = { x: 1 };
%HaveSameMap(obj, { x: 2 });    // true → 共享 hidden class
%DebugPrint(obj);                // 打印对象的 map 地址
```

### 最佳实践

1. **构造函数里一次性初始化所有属性**（顺序固定）
2. **不要 delete** —— 改用 `obj.x = undefined` 或 `Map`
3. **数据数组别加属性** —— 用对象包装
4. **保持对象结构稳定** —— 不要在某些分支才赋某些属性

### 对比："多态" vs "单态"

- **Monomorphic（单态）** —— 一个函数总是被同一个 hidden class 的对象调用 → 极致优化
- **Polymorphic（多态）** —— 2-4 种 hidden class —— 仍有内联缓存，但要分支
- **Megamorphic（多态过载）** —— 5+ 种 → V8 放弃内联，退化到 generic lookup

热点函数处理对象的**类型一致性**比代码风格重要得多。
$content$,
  'quiz', 'medium',
  ARRAY['backend','javascript','v8','performance','optimization'],
  NULL
),

-- ─────────────────────────────────────────────────────────────────────────────
-- 10
-- ─────────────────────────────────────────────────────────────────────────────
(
  'V8 内联缓存 (Inline Cache, IC) · 属性访问优化',
$content$
## 内联缓存（Inline Cache, IC）

V8 在**每个属性访问位置**记录"上次见到的对象 hidden class + 该属性的 offset"。**下次再访问**，如果对象是同一个 hidden class，直接走 offset 拿值 —— **跳过查找**。

```js
function getX(obj) { return obj.x; }
//                              ↑
//                              这个 ".x" 是一个 IC 站点

getX({ x: 1, y: 2 });   // IC 记下：hidden class A → x 在 offset 0
getX({ x: 3, y: 4 });   // 同 hidden class → IC 命中 → 直接读 offset 0  ⚡
```

### IC 的 4 种状态

| 状态 | 含义 | 性能 |
|---|---|---|
| **Uninitialized** | 还没运行过 | 走 generic lookup |
| **Monomorphic** | 见过 **1 种** hidden class | **最快** —— offset 直读 |
| **Polymorphic** | 见过 **2-4 种** hidden class | 中等 —— 分支判断 |
| **Megamorphic** | **5+ 种** hidden class | 慢 —— 退化到 hash lookup |

### 反优化（IC failure）案例

```js
function getX(obj) { return obj.x; }

getX({ x: 1, y: 2 });        // hidden class A
getX({ x: 1, z: 2 });        // hidden class B → polymorphic
getX({ x: 1, w: 2 });        // hidden class C
getX({ x: 1, q: 2 });        // hidden class D
getX({ x: 1, k: 2 });        // hidden class E → megamorphic，IC 死了

// getX 后续所有调用都走慢路径
```

### 实战观察

```bash
node --allow-natives-syntax --trace-ic app.js
```

会打印每个 IC 站点的状态变化：
```
[ICCallSite at x.js:5:18] mono → poly
[ICCallSite at x.js:5:18] poly → mega   ← 警惕！
```

也可以用 `%CollectGarbage()` + heap snapshot 看 IC 状态。

### 写出 IC-friendly 代码

#### ✅ 同一函数处理同一种"形状"的对象

```js
function getX(point) { return point.x; }
points.forEach(getX);          // 全是 Point 实例 → monomorphic ⚡
```

#### ❌ 同一函数处理多种形状

```js
function getX(thing) { return thing.x; }
getX(new Point(1, 2));          // hidden class A
getX(new Vector3(1, 2, 3));     // hidden class B
getX({ x: 'str' });             // hidden class C
// → megamorphic
```

→ 如果业务确实要处理多种类型，**拆成多个函数**或者**统一类型**。

### 数组同样适用

V8 给数组维护了内部 "elements kind"：

| Kind | 含义 |
|---|---|
| `PACKED_SMI_ELEMENTS` | 连续 + 全 SMI 整数 (-2^30 ~ 2^30) | 最快 |
| `PACKED_DOUBLE_ELEMENTS` | 连续 + 全 double |
| `PACKED_ELEMENTS` | 连续 + 任意类型 |
| `HOLEY_*` | 有 hole（如 `arr[1000] = x`）|
| `DICTIONARY_ELEMENTS` | 哈希模式 | 最慢 |

**降级规则**：高阶 → 低阶**单向**（永远不会升级回去）。一旦数组 hole'd / 混合类型，IC 优化失效。

```js
const a = [1, 2, 3];          // PACKED_SMI
a.push(1.5);                  // → PACKED_DOUBLE
a.push('x');                  // → PACKED_ELEMENTS
a[100] = 1;                   // → HOLEY_ELEMENTS
```

### 实战收益

V8 优化让 monomorphic 属性访问比 megamorphic **快 10-50 倍**。**热路径**（被调几百万次的函数）值得为此**特意保持类型一致**。冷路径不用管。

### 关联：Hidden Class + IC = V8 性能秘密

| 概念 | 解决什么 |
|---|---|
| **Hidden Class** | 对象内存布局优化 —— 同类对象共享结构 |
| **Inline Cache** | 属性访问优化 —— 缓存上次的 hidden class + offset |
| **TurboFan** | JIT 优化编译器，**信任 IC 信息**生成机器码 |
| **Deoptimization** | IC 失效时回退到 Ignition 解释执行 |

→ 这一套支撑了 V8 在 JS 这种动态语言上接近 native 的性能。**写出"形状稳定的 hot path"是 JS 性能优化的核心心法。**
$content$,
  'quiz', 'medium',
  ARRAY['backend','javascript','v8','performance','optimization','jit'],
  NULL
);
