---
title: WebAssembly - Threading
intro: 本篇来看的提案是 - “Threading”。该提案为 Wasm 提供了用于支持多线程处理的相关概念和指令，包括可以被多个模块实例共享的 “shared memory”；用于操作内存的原子指令；用于线程等待和唤醒的 `wait` 与 `notify` 指令；以及与内存序相关的 `fence` 指令等。Wasm 的多线程模型实现依赖于其所处的具体执行环境，比如在 Web 环境中，线程即对应 worker。
comments: true
date: 2023-11-09 15:39:00
tags:
- WebAssembly
---

本篇来看的提案是 - “Threading”，GitHub 链接在<b>[这里](https://github.com/WebAssembly/threads/blob/main/proposals/threads/Overview.md)</b>。该提案为 Wasm 提供了用于支持多线程处理的相关概念和指令，包括可以被多个模块实例共享的 “shared memory”；用于操作内存的原子指令；用于线程等待和唤醒的 `wait` 与 `notify` 指令；以及与内存序相关的 `fence` 指令等。Wasm 的多线程模型实现依赖于其所处的具体执行环境，比如在 Web 环境中，线程即对应 worker。

### 一个例子

我们来看提案中给出的例子：


```wat
(module
  (import "env" "memory" (memory 1 1 shared)) 
  (func $tryLockMutex (export "tryLockMutex") (param $mutexAddr i32) (result i32)
    (i32.atomic.rmw.cmpxchg
      (local.get $mutexAddr)
      (i32.const 0) 
      (i32.const 1)) 
    (i32.eqz)
  )

  ;; Lock a mutex at the given address, retrying until successful.
  (func (export "lockMutex") (param $mutexAddr i32)
    (block $done
      (loop $retry
        (call $tryLockMutex (local.get $mutexAddr))
        (br_if $done)

        ;; Wait for the other agent to finish with mutex.
        (memory.atomic.wait32
          (local.get $mutexAddr) ;; mutex address.
          (i32.const 1)          ;; expected value (1 => locked).
          (i64.const -1))        ;; infinite timeout.
        (drop)

        ;; Try to acquire the lock again.
        (br $retry)
      )
    )
  )

  ;; Unlock a mutex at the given address.
  (func (export "unlockMutex") (param $mutexAddr i32)
    ;; Unlock the mutex.
    (i32.atomic.store
      (local.get $mutexAddr) 
      (i32.const 0)) 

    ;; Notify one agent that is waiting on this lock.
    (drop
      (memory.atomic.notify
        (local.get $mutexAddr) 
        (i32.const 1)))   ;; Count of waiter.
  )
)
```

这个例子在 Wasm 中模拟了 mutex 同步原语，并借由相关指令实现了「条件变量」的部分功能。先来看 tryLockMutex 函数，该函数用于尝试为一个互斥量上锁，互斥量本身的值被直接存放在线性内存中，偏移位置由参数 $mutexAddr 指定。内存段通过添加标记 “shared” 被设置为可在多个 Wasm 实例间共享，这使得对内存段数据的任何修改都可以同时被多个 agent 观测到。为互斥量上锁的过程是通过 RMW（ Read-Modify-Write）指令 `cmpxchg`（Compare-and-Exchange）实现的，这是一种常见的 mutex lock 实现方式。`cmpxchg` 指令是原子性的，它接收一个内存偏移地址、期望值、以及替换值。这里，若内存中互斥量的值为 0（unlocked），则表示其没有上锁，该指令会将互斥量更改为 1（locked），并返回值更新前的原始值（0）；否则，指令直接返回读到的值（1）。函数最后的指令 `i32.eqz` 用于对 `cmpxchg` 指令返回的结果取反，以正确表示函数的执行状态（即返回 1 表示上锁成功，否则失败）。

函数 lockMutex 实现了完整的互斥量上锁过程。其内部的 loop 循环会重复调用 tryLockMutex 函数尝试上锁，若上锁失败（返回 0），则使用 wait 指令将当前线程阻塞直到被其他线程通过对应的 notify 指令唤醒，这是常见的条件变量使用方式。若上锁成功，则通过 `br` 指令跳出当前 block。指令 `wait32` 也接收三个参数，一个内存偏移地址、期望值、以及阻塞超时时间。这里的内存地址便为互斥量的存放地址，值为 “-1” 的超时时间意味着永不超时，即线程会一直阻塞直到被再次唤醒。

函数 unlockMutex 的内容比较简单，它原子性地修改互斥量所在的内存值，并通过调用 `notify` 指令唤醒指定数量的，等待为同一个互斥量加锁的线程。

上述 Wasm 函数在 JavaScript 宿主上的具体使用方式可以参考如下 Node.js 代码：

```javascript
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'url'
import { Worker, isMainThread, workerData } from 'node:worker_threads'

const wasmFilePath = '...'  // Path to the Wasm module file.
const wasmBinary = readFileSync(wasmFilePath)
const memory = new WebAssembly.Memory({ initial: 1, maximum: 1, shared: true, })
const mutexAddr = 0

const doSomeBusyStuff = (msg) => {
  return new Promise(resolve => {
    console.log(`${msg} is working ... (Got the lock)`)
    setTimeout(() => {
      console.log(`${msg} is done ...`)
      resolve()
    }, 2000)
  })
}

if (isMainThread) {  // Main thread.
  new Worker(fileURLToPath(import.meta.url), { workerData: memory, })
  const { instance } = await WebAssembly.instantiate(wasmBinary, { env: { memory, } })
  if (instance.exports.tryLockMutex(mutexAddr)) {  // Try to get the lock.
    await doSomeBusyStuff('Main thread')
    instance.exports.unlockMutex(mutexAddr)  // Release the lock, and wake other threads.
  }
} else {  // Worker thread.
  const { instance } = await WebAssembly.instantiate(wasmBinary, { env: { memory: workerData, } })
  instance.exports.lockMutex(mutexAddr)  // Blocking on the mutex, waiting to be woken.
  await doSomeBusyStuff('Worker thread')
  instance.exports.unlockMutex(mutexAddr)
}
```


### Shared Linear Memory

* 需要显式指定内存段的最大尺寸；
* 可以通过指令 `memory.grow` 扩展内存段的大小；
* 可以通过指令 `memory.size` 获得当前共享内存段的大小；
* 指令是“顺序一致（sequentially consistent）”的，即对于每个线程来说，指令的实际运行顺序与代码保持一致。


### Atomic Memory Accesses

* 指令可以应用在共享以及非共享线性内存段上；
* 非对齐（misaligned）地址上的原子内存访问会导致 trap，比如：

```wat
(module
  (memory 1 1)
  (func (export "foo")
    (i32.atomic.store (i32.const 1) (i32.const 1))
  )
)  
```

* 指令是“顺序一致”的。

### Wait and Notify operators

* 非对齐（misaligned）地址上的操作会导致 trap；
* 非共享内存段上的 wait 操作会导致 trap；
* Web 平台上可通过 `Atomics.wait` 与 `Atomics.notify` 阻塞或唤醒线程（worker）。

### Fence operator

Fence 指令 `atomic.fence` 主要用于防止编译器对 Wasm 指令进行重排序，一般应用在对非原子指令执行顺序有要求的场景，目前仅支持“顺序一致”。

