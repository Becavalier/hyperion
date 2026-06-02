-- Node.js concurrency: process vs thread, cluster, IPC.

INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES
(
  'Node.js · 进程 vs 线程 · child_process / worker_threads / cluster / IPC',
$content$
## 全局并发模型对比

| 模型 | 实现 | 隔离 | 通信成本 | 利用多核 | 适用 |
|---|---|---|---|---|---|
| **单进程单线程** | Event Loop | — | — | ❌ | I/O 密集型 web 服务 |
| **多进程（cluster）** | `cluster` / `pm2` 拉起多个 Node 进程 | 完全隔离 | IPC 序列化（贵） | ✅ | Web 服务横向扩 |
| **多线程（worker_threads）** | Node 内置 | 同进程，独立 V8 | postMessage / SharedArrayBuffer（便宜） | ✅ | CPU 密集 |
| **子进程（child_process）** | 拉起任意外部程序 | 完全隔离 | stdio / IPC pipe | ✅ | 跑外部脚本、不同语言程序 |

→ **Node 不是单线程**：libuv 有 I/O 线程池（默认 4 个）；可以再开 worker threads；可以 fork cluster。"单线程"只是说 **JS 执行是单线程**。

---

## `child_process` 的 4 个 API

```js
import { spawn, exec, execFile, fork } from 'node:child_process';
```

| API | 用途 | 关键差异 |
|---|---|---|
| **`spawn(cmd, args)`** | 启动外部命令 | 流式 stdio，**无 buffer 上限**，适合大输出 |
| **`exec(cmd)`** | 在 shell 里跑命令 | 一次性 buffer（默认 200KB 上限），**有 shell 注入风险** |
| **`execFile(file, args)`** | 直接执行可执行文件 | 不走 shell，更安全 |
| **`fork(jsFile)`** | 起**另一个 Node 进程**跑 JS | 自动建立 IPC 通道，能 `child.send()` |

> **永远不要把用户输入直接拼到 `exec`** —— shell 注入。需要执行可执行文件时用 `execFile` + 数组参数，永远不上 shell。

---

## `child_process` vs `worker_threads`

| | **child_process** | **worker_threads** |
|---|---|---|
| **隔离级别** | 独立进程，独立内存 | 同一进程，**独立 V8 实例** |
| **内存** | 不共享 | 可通过 **`SharedArrayBuffer`** 共享 |
| **通信** | IPC 序列化（JSON.stringify 风格） | **`MessagePort`**（可转移零拷贝） |
| **启动开销** | 大（fork + 加载 Node + 加载代码 ~50-200ms） | 小（~5-30ms） |
| **崩溃影响** | 子进程崩溃**不影响**主进程 | 线程崩溃可能 **影响整个进程** |
| **生命周期** | 独立，可以独立 OOM | 主进程退出 → 所有 worker 也退 |
| **调试** | 各自 inspector 端口 | 主进程一个 inspector |
| **适用** | 运行独立脚本 / 不同语言程序 | CPU 密集计算（加密、压缩、图像处理） |

### 示例对比

```js
// child_process.fork
import { fork } from 'node:child_process';
const child = fork('./worker.js');
child.on('message', msg => console.log(msg));
child.send({ type: 'task', data: 100 });        // 消息进入 IPC 管道

// worker_threads
import { Worker } from 'node:worker_threads';
const worker = new Worker('./worker.js');
worker.on('message', msg => console.log(msg));
worker.postMessage({ type: 'task', data: 100 }); // 通过 MessagePort 传递
```

---

## `cluster` 模块利用多核

`cluster` 本质上是基于 `child_process.fork` + **共享 listen socket** 的封装。

```js
import cluster from 'node:cluster';
import http from 'node:http';
import os from 'node:os';

if (cluster.isPrimary) {
  // 主进程：按 CPU 核数 fork
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; ++i) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();                              // 自动重启
  });
} else {
  // 工作进程：共享同一端口
  http.createServer((req, res) => {
    res.end('hello');
  }).listen(3000);
}
```

### Round-Robin 负载分配

- **Linux / macOS**：主进程接收连接后 round-robin 分发给 worker（默认）
- **Windows**：内核轮询（性能更高但分配不均）

可改：`cluster.schedulingPolicy = cluster.SCHED_NONE | SCHED_RR`。

### cluster vs PM2

| | **原生 cluster** | **PM2** / **node-pm** |
|---|---|---|
| 多核 | ✅ | ✅（封装了 cluster） |
| 进程监控 | 手写 | 内置 dashboard / logs / metrics |
| Graceful reload | 手写 | `pm2 reload`（零停机） |
| 自动重启 | 手写 | 配置 |
| 集群管理 | 单机 | 单机 + 跨机（Plus） |

→ 自己写 cluster 学习 ok，**生产用 PM2 / Kubernetes** 而不是手撸。

---

## IPC（进程间通信）

### 进程 IPC（fork / cluster）

```js
// parent.js
const child = fork('./worker.js');
child.send({ type: 'add', a: 1, b: 2 });     // 序列化 → 管道
child.on('message', (msg) => console.log(msg));

// worker.js
process.on('message', (msg) => {
  if (msg.type === 'add') {
    process.send({ result: msg.a + msg.b });
  }
});
```

**特点 & 限制**：

- 消息是 **JSON 序列化**（默认 `serialization: 'json'`），不支持 Function / Symbol / 循环引用
- Node 推荐用 `serialization: 'advanced'`（v8 结构化克隆），支持 Map / Set / Date / BigInt / Buffer 零拷贝
- 大对象拷贝**贵**（每次都序列化 + 复制），所以 child_process 不适合传 100MB 数据
- **可传递文件描述符**（socket / file handle） —— cluster 共享 listen socket 的基础

### 线程 IPC（worker_threads）

```js
// main.js
import { Worker } from 'node:worker_threads';
const w = new Worker('./worker.js');
w.postMessage({ type: 'task', data: 100 });
w.on('message', (msg) => console.log(msg));

// worker.js
import { parentPort } from 'node:worker_threads';
parentPort.on('message', (msg) => {
  parentPort.postMessage({ result: heavy(msg.data) });
});
```

`postMessage` 用**结构化克隆**（v8 内部协议），比 JSON 快、支持更多类型。

### 共享内存：`SharedArrayBuffer` + `Atomics`

要真正**零拷贝共享数据**：

```js
// main.js
import { Worker } from 'node:worker_threads';
const shared = new SharedArrayBuffer(1024);
const worker = new Worker('./worker.js', { workerData: shared });

// worker.js
import { workerData } from 'node:worker_threads';
const arr = new Int32Array(workerData);
Atomics.add(arr, 0, 1);                       // 原子加 1
Atomics.notify(arr, 0);                       // 唤醒等待该地址的线程
```

`Atomics` 提供：
- **原子操作**：`add` / `sub` / `compareExchange` / `load` / `store`
- **同步原语**：`wait` / `notify` —— 实现 mutex / 信号量
- **保证**：跨线程的**内存可见性**和**原子性**（普通赋值不保证）

### Transferable：转移所有权零拷贝

```js
const buf = new ArrayBuffer(1024 * 1024 * 10);   // 10MB
worker.postMessage(buf, [buf]);                   // 第 2 个参数 = transfer list
// 此后 buf 在主线程不可用了，所有权转给 worker
```

适合 **大 Buffer / TypedArray / MessagePort 本身** 的高效传递。

---

## Worker Threads 池化（生产推荐）

每次 `new Worker` 开销 ~5-30ms。**高并发场景必须池化**：

```js
import { Piscina } from 'piscina';
const pool = new Piscina({
  filename: new URL('./worker.js', import.meta.url).href,
  maxThreads: 4,
});

const result = await pool.run({ data: 100 });
```

特点：
- 自动维护 worker 数量
- 排队 + 调度
- 完成后 worker 复用（不退出）
- 配合 `AbortSignal` 取消任务

> `piscina` 是 nodejs 官方 collaborator 团队维护的，**生产首选**。手撸线程池容易 bug。

---

## 何时选哪个？

| 需求 | 推荐 |
|---|---|
| **CPU 密集小任务**（一次几十 ms） | **Worker Threads + Piscina** |
| **CPU 密集大任务**（小时级） | **Child Process**（崩了不连累主进程） |
| **跑外部命令**（git / ffmpeg） | **`execFile` / `spawn`** |
| **多核 web 服务** | **Cluster** 或 **PM2** |
| **跨机器扩展** | **K8s + 多 pod**（而不是 cluster） |
| **跨语言计算**（Python ML） | **child_process + stdio** 或 **HTTP 微服务** |
| **共享大对象**（GB 级） | **Worker Threads + SharedArrayBuffer** |
| **不同进程隔离**（安全） | **child_process / VM** |

---

## 生产实践 / Gotchas

1. **Graceful shutdown** —— SIGTERM 时主进程不立即退，等所有 worker 结束 in-flight 请求再关
   ```js
   process.on('SIGTERM', async () => {
     server.close();
     await Promise.all(workers.map(w => w.terminate()));
     process.exit(0);
   });
   ```

2. **不要在主线程里跑重计算** —— event loop 一卡，所有 worker IPC 消息都积压

3. **Worker 里别用 process.exit()** —— 用 `parentPort.close()` / `parentPort.postMessage('done')`

4. **共享 `node_modules`**：所有 worker / fork 都加载同一份代码，**启动慢**。考虑 esbuild 打成单 bundle，加速冷启动

5. **监控**：每个 worker 单独的 inspector / heap 监控。PM2 / clinic.js 比手撸 metrics 香

6. **不要混用 cluster + worker_threads** 给同一种工作 —— 调度复杂；**cluster 做横向扩，worker_threads 在每个 worker 里做 CPU 卸载**，分层

7. **macOS / Linux 默认 fork 是 copy-on-write** —— 主进程加载完所有数据再 fork，子进程共享只读页面（直到写入触发分页复制）。这是 cluster 高效的硬件原因

---

## 一句话总结

> Node.js 的并发不是"单线程没办法"，而是"**给你 4 把武器，看你怎么用**"：
> - I/O 密集 → 一个进程的 event loop 就够
> - CPU 密集 → **worker_threads + Piscina**
> - 利用多核 → **cluster / PM2 / K8s**
> - 跑外部程序 → **child_process spawn/execFile**
>
> 关键判断：**计算重 → 线程；隔离重 → 进程；横向扩 → 集群**。
$content$,
  'quiz', 'medium',
  ARRAY['backend','nodejs','concurrency','process','thread','cluster','ipc'],
  NULL
);
