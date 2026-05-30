INSERT INTO questions (title, content, category, difficulty, tags, answer_hint) VALUES

(
  'Implement curry() — finite arguments',
  'Convert a multi-argument function into a chain of partial-application functions. The curried function should execute when all required arguments (func.length) have been accumulated, and must correctly preserve `this` binding throughout the chain.',
  'frontend', 'medium',
  ARRAY['curry', 'closure', 'higher-order-function', 'this-binding'],
  $$function curry(func) {
    const argLen = func.length
    return function fn(...args) {
        if (args.length >= argLen) return func.apply(this, args)
        return (...newArgs) => {
            return fn.call(this, ...args, ...newArgs)
        }
    }
}$$
),

(
  'Implement curry() — infinite arguments (Symbol.toPrimitive)',
  'Implement a curry() that supports infinite argument accumulation across unlimited calls. The returned value must behave as both a callable function and a primitive (for arithmetic / coercion), using Symbol.toPrimitive to trigger final evaluation.',
  'frontend', 'hard',
  ARRAY['curry', 'Symbol.toPrimitive', 'closure', 'higher-order-function'],
  $$function curry(func) {
  return function fn (...args) {
    return Object.assign((...newArgs) => {
      return fn.apply(this, [...args, ...newArgs])
    }, {
      [Symbol.toPrimitive]: () => {
        return func.apply(this, args)
      }
    })
  }
}$$
),

(
  'Implement debounce()',
  'Implement debounce(func, wait) that delays invoking func until wait ms have elapsed since the last invocation. Also implement a Promise-returning variant where each call returns a promise: pending calls are rejected with an "debounced" error when superseded.',
  'frontend', 'medium',
  ARRAY['debounce', 'closure', 'setTimeout', 'promise'],
  $$// Basic version
function debounce(func, wait) {
  let handler = null
  return function(...args) {
    clearTimeout(handler)
    handler = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

// Promise-returning version
function debounce(func, wait) {
  let handler = null
  let lastReject = null
  return function(...args) {
    lastReject?.(new Error('debounced'))
    clearTimeout(handler)
    return new Promise((resolve, reject) => {
      lastReject = reject
      handler = setTimeout(() => {
        try {
          return resolve(func.apply(this, args))
        } catch(e) {
          return reject(e)
        }
      }, wait)
    })
  }
}$$
),

(
  'Implement throttle()',
  'Implement throttle(func, wait) ensuring func is invoked at most once per wait ms. The trailing call should still fire after the interval. Also implement a Promise-returning variant that rejects superseded calls.',
  'frontend', 'medium',
  ARRAY['throttle', 'closure', 'setTimeout', 'promise'],
  $$// Basic version
function throttle(func, wait) {
  let handler = null
  let lastRun = 0
  return function(...args) {
    clearTimeout(handler)
    const now = Date.now()
    if (now - lastRun >= wait) {
      lastRun = now
      func.apply(this, args)
    } else {
      handler = setTimeout(() => {
        lastRun = Date.now()
        func.apply(this, args)
      }, wait - (now - lastRun))
    }
  }
}

// Promise-returning version
function throttle(func, wait) {
  let timer = null
  let lastRun = 0
  let lastReject = null
  return function(...args) {
    clearTimeout(timer)
    lastReject?.(new Error('throttled'))
    const now = Date.now()
    return new Promise((resolve, reject) => {
      lastReject = reject
      if (now - lastRun >= wait) {
        lastRun = now
        try {
          return resolve(func.apply(this, args))
        } catch(e) {
          return reject(e)
        }
      } else {
        timer = setTimeout(() => {
          lastRun = Date.now()
          try {
            return resolve(func.apply(this, args))
          } catch(e) {
            return reject(e)
          }
        }, wait - (now - lastRun))
      }
    })
  }
}$$
),

(
  'Implement MyPromise from scratch',
  'Build a Promise/A+ compliant MyPromise class from scratch. Key milestones: (1) state machine, (2) synchronous then, (3) callback queue for async, (4) then returns a new Promise for chaining, (5) thenable flattening + queueMicrotask, (6) catch and error propagation.',
  'frontend', 'hard',
  ARRAY['promise', 'microtask', 'state-machine', 'async', 'chaining'],
  $$class MyPromise {
  constructor(executor) {
    this.state = "pending"
    this.value = undefined
    this.callbacks = []

    const resolve = (val) => {
      if (this.state !== "pending") return
      this.state = "fulfilled"
      this.value = val
      this.callbacks.forEach((cb) => cb.onFulfilled(val))
    }
    const reject = (reason) => {
      if (this.state !== "pending") return
      this.state = "rejected"
      this.value = reason
      this.callbacks.forEach((cb) => cb.onRejected(reason))
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v
    onRejected = typeof onRejected === "function" ? onRejected : (e) => { throw e }

    return new MyPromise((resolve, reject) => {
      const handle = (fn, val) => {
        queueMicrotask(() => {
          try {
            const r = fn(val)
            if (r instanceof MyPromise) r.then(resolve, reject)
            else resolve(r)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.state === "fulfilled") handle(onFulfilled, this.value)
      else if (this.state === "rejected") handle(onRejected, this.value)
      else this.callbacks.push({
        onFulfilled: (v) => handle(onFulfilled, v),
        onRejected: (e) => handle(onRejected, e),
      })
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static resolve(v) {
    if (v instanceof MyPromise) return v
    return new MyPromise((resolve) => resolve(v))
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }
}$$
),

(
  'Implement promisePool() — concurrency-limited task runner',
  'Implement promisePool(items, worker, concurrency) that processes an array of items using a worker function, ensuring at most `concurrency` workers run simultaneously. Return an array of results in the original order. Key: capture the index before incrementing to avoid race conditions.',
  'frontend', 'hard',
  ARRAY['promise', 'concurrency', 'async-await', 'race-condition'],
  $$async function promisePool(items, worker, concurrency) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function runWorker() {
    while (nextIndex < items.length) {
      const curr = nextIndex++  // capture before increment to avoid race condition
      results[curr] = await worker(items[curr])
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => runWorker()
  )

  await Promise.all(workers)
  return results
}$$
),

(
  'Implement Promise.all()',
  'Implement Promise.myAll(iterable): resolves with an array of all fulfilled values (in order) when every promise resolves; rejects immediately with the first rejection reason. Handle empty iterables.',
  'frontend', 'medium',
  ARRAY['promise', 'Promise.all', 'async'],
  $$Promise.myAll = function (iterable) {
  const tasks = Array.from(iterable)
  const results = new Array(tasks.length)
  let count = 0

  return new Promise((resolve, reject) => {
    if (tasks.length === 0) return resolve([])

    tasks.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val
        if (++count === tasks.length) return resolve(results)
      }).catch(reject)
    })
  })
}$$
),

(
  'Implement Promise.race()',
  'Implement Promise.myRace(iterable): resolves or rejects as soon as the first promise in the iterable settles. Works with any iterable, including generators.',
  'frontend', 'easy',
  ARRAY['promise', 'Promise.race', 'async'],
  $$Promise.myRace = function (iterable) {
  return new Promise((resolve, reject) => {
    for (const p of iterable) {
      Promise.resolve(p).then(resolve, reject)
    }
  })
}$$
),

(
  'Implement Promise.any()',
  'Implement Promise.myAny(iterable): resolves with the first fulfilled value; only rejects with AggregateError if every promise rejects. Handle empty iterables (reject immediately).',
  'frontend', 'medium',
  ARRAY['promise', 'Promise.any', 'AggregateError', 'async'],
  $$Promise.myAny = function (iterable) {
  const tasks = Array.from(iterable)
  const errors = []
  let count = 0

  return new Promise((resolve, reject) => {
    if (tasks.length === 0)
      return reject(new AggregateError([], 'All promises were rejected'))

    tasks.forEach((p, i) => {
      Promise.resolve(p).then(resolve).catch(err => {
        errors[i] = err
        if (++count === tasks.length) {
          return reject(new AggregateError(errors, 'All promises were rejected'))
        }
      })
    })
  })
}$$
),

(
  'Implement Promise.allSettled()',
  'Implement Promise.myAllSettled(iterable): always resolves with an array of objects describing each promise outcome — { status: "fulfilled", value } or { status: "rejected", reason }. Never rejects.',
  'frontend', 'medium',
  ARRAY['promise', 'Promise.allSettled', 'async'],
  $$Promise.myAllSettled = function (iterable) {
  const tasks = Array.from(iterable)
  const results = new Array(tasks.length)
  let count = 0

  return new Promise(resolve => {
    if (tasks.length === 0) return resolve([])

    tasks.forEach((p, i) => {
      Promise.resolve(p)
        .then(val => { results[i] = { status: 'fulfilled', value: val } })
        .catch(err => { results[i] = { status: 'rejected', reason: err } })
        .finally(() => {
          if (++count === tasks.length) return resolve(results)
        })
    })
  })
}$$
),

(
  'Array flatten — iterative (no depth limit)',
  'Flatten a deeply nested array without recursion using a stack. Traverse from back to front, push array elements back onto the stack; push non-array values into the result. Reverse at the end.',
  'algorithm', 'easy',
  ARRAY['array', 'flatten', 'iteration', 'stack'],
  $$function flatten(value) {
  const res = []
  const cpy = [...value]
  while (cpy.length > 0) {
    const last = cpy.pop()
    if (Array.isArray(last)) cpy.push(...last)
    else res.push(last)
  }
  return res.reverse()
}$$
),

(
  'Array flatten — recursive with depth control',
  'Flatten a nested array up to a specified depth using DFS recursion. Default depth is 1. For each element: if it is an array and remaining depth > 0, recurse; otherwise push directly.',
  'algorithm', 'medium',
  ARRAY['array', 'flatten', 'recursion', 'dfs', 'depth'],
  $$function flatten(value, depth = 1) {
  const res = []
  const internal = (v, d) => {
    for (let e of v) {
      if (Array.isArray(e) && d > 0) internal(e, d - 1)
      else res.push(e)
    }
  }
  internal(value, depth)
  return res
}$$
),

(
  'Implement memoize() with composite key (Map + WeakMap trie)',
  'Implement memoize(func) that caches results for any combination of arguments, including objects. Use a trie structure where each node holds a WeakMap (for object/function args) and a Map (for primitive args). Avoid memory leaks by weakly referencing objects.',
  'frontend', 'hard',
  ARRAY['memoize', 'WeakMap', 'Map', 'trie', 'cache', 'closure'],
  $$function memoize(func) {
  const root = { map: new Map(), weak: new WeakMap() }
  const RESULT_KEY = Symbol("__VALUE")
  const isObj = (o) => (o !== null && typeof o === 'object') || typeof o === 'function'

  return function (...args) {
    let node = root
    for (const arg of args) {
      const cache = isObj(arg) ? node.weak : node.map
      if (!cache.has(arg)) cache.set(arg, { map: new Map(), weak: new WeakMap() })
      node = cache.get(arg)
    }
    if (node.map.has(RESULT_KEY)) return node.map.get(RESULT_KEY)
    const result = func.apply(this, args)
    node.map.set(RESULT_KEY, result)
    return result
  }
}$$
),

(
  'Implement Function.prototype.myCall()',
  'Implement Function.prototype.myCall(thisArg, ...args). Attach the function as a property on the context object using a Symbol key, invoke it, then delete the property. Handle null/undefined thisArg (use globalThis in non-strict, null in strict).',
  'frontend', 'medium',
  ARRAY['call', 'this-binding', 'prototype', 'Symbol'],
  $$Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof this !== 'function') throw new TypeError('only function can be called')
  const ctx = thisArg == null ? globalThis : Object(thisArg)
  const fn = Symbol.for('fn')
  ctx[fn] = this
  try {
    return ctx[fn](...args)
  } finally {
    delete ctx[fn]
  }
}$$
),

(
  'Implement Function.prototype.myApply()',
  'Implement Function.prototype.myApply(thisArg, argsArray). Same as myCall but accepts arguments as an array/array-like. Spread the args array when invoking. Handle null/undefined args gracefully.',
  'frontend', 'medium',
  ARRAY['apply', 'this-binding', 'prototype', 'Symbol'],
  $$Function.prototype.myApply = function (thisArg, args) {
  if (typeof this !== 'function') throw new TypeError('only function can be called')
  const ctx = thisArg == null ? globalThis : Object(thisArg)
  const fn = Symbol.for('fn')
  ctx[fn] = this
  try {
    return ctx[fn](...(args ?? []))
  } finally {
    delete ctx[fn]
  }
}$$
),

(
  'Implement Function.prototype.myBind()',
  'Implement Function.prototype.myBind(thisArg, ...args). The returned bound function should: (1) merge pre-bound and new args, (2) ignore thisArg when invoked with new (detect via instanceof), (3) inherit the original function prototype so new BoundFn() works correctly.',
  'frontend', 'hard',
  ARRAY['bind', 'this-binding', 'new', 'prototype', 'closure'],
  $$Function.prototype.myBind = function (thisArg, ...args) {
  if (typeof this !== 'function') throw new TypeError()
  const fn = this

  function bound(...newArgs) {
    const isNew = this instanceof bound
    return fn.apply(
      isNew ? this : thisArg,
      [...args, ...newArgs]
    )
  }

  if (fn.prototype) {
    bound.prototype = Object.create(fn.prototype)
    bound.prototype.constructor = bound
  }
  return bound
}$$
),

(
  'Implement deepClone() — handle circular references',
  'Implement a deepClone(value, seen) that recursively clones plain objects and arrays. Use a WeakMap to track already-cloned references and return the cached clone for circular dependencies. Non-plain objects (Date, RegExp, etc.) are returned as-is.',
  'frontend', 'hard',
  ARRAY['deep-clone', 'WeakMap', 'recursion', 'circular-reference', 'plain-object'],
  $$const isPlainObj = (obj) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return false
  const proto = Object.getPrototypeOf(obj)
  return proto === null || proto === Object.prototype
}

function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value
  if (seen.has(value)) return seen.get(value)

  if (Array.isArray(value)) {
    const cpy = new Array(value.length)
    seen.set(value, cpy)
    for (let i = 0; i < value.length; ++i) {
      cpy[i] = deepClone(value[i], seen)
    }
    return cpy
  }

  if (isPlainObj(value)) {
    const cpy = {}
    seen.set(value, cpy)
    for (const k in value) {
      if (Object.prototype.hasOwnProperty.call(value, k)) {
        cpy[k] = deepClone(value[k], seen)
      }
    }
    return cpy
  }

  return value
}$$
),

(
  'Implement deepEqual()',
  'Implement deepEqual(a, b) that recursively compares two values for structural equality. Handle primitives, arrays (check length + each index), and plain objects (check own keys + each value). Return false early on any mismatch.',
  'frontend', 'medium',
  ARRAY['deep-equal', 'recursion', 'plain-object', 'structural-equality'],
  $$const isPlainObj = (obj) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return false
  const proto = Object.getPrototypeOf(obj)
  return proto === null || proto === Object.prototype
}

function deepEqual(valueA, valueB) {
  if ((typeof valueA !== 'object' || valueA === null) &&
      (typeof valueB !== 'object' || valueB === null))
    return valueA === valueB

  if (Array.isArray(valueA) && Array.isArray(valueB)) {
    if (valueA.length !== valueB.length) return false
    for (let i = 0; i < valueA.length; ++i) {
      if (!deepEqual(valueA[i], valueB[i])) return false
    }
    return true
  }

  if (isPlainObj(valueA) && isPlainObj(valueB)) {
    if (Object.keys(valueA).length !== Object.keys(valueB).length) return false
    for (const k in valueA) {
      if (Object.prototype.hasOwnProperty.call(valueA, k)) {
        if (!Object.prototype.hasOwnProperty.call(valueB, k)) return false
        if (!deepEqual(valueA[k], valueB[k])) return false
      }
    }
    return true
  }

  return false
}$$
),

(
  'Implement deepMerge() — handle circular references',
  'Implement deepMerge(a, b) that recursively merges two values. Arrays are concatenated. Plain objects are merged key-by-key with recursion. Use a WeakMap to detect circular references in objects and return the cached partial result. For non-object/array types, b wins.',
  'frontend', 'hard',
  ARRAY['deep-merge', 'WeakMap', 'recursion', 'circular-reference', 'plain-object'],
  $$const isPlainObj = (obj) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return false
  const proto = Object.getPrototypeOf(obj)
  return proto === null || proto === Object.prototype
}

function deepMerge(valA, valB, seen = new WeakMap()) {
  if (Array.isArray(valA) && Array.isArray(valB)) {
    return [...valA, ...valB]
  }
  if (isPlainObj(valA) && isPlainObj(valB)) {
    if (seen.has(valA)) return seen.get(valA)
    if (seen.has(valB)) return seen.get(valB)
    const cpy = {...valA}
    seen.set(valA, cpy)
    seen.set(valB, cpy)
    for (const k in valB) {
      if (Object.prototype.hasOwnProperty.call(valB, k)) {
        if (!Object.prototype.hasOwnProperty.call(valA, k)) {
          cpy[k] = valB[k]
        } else {
          cpy[k] = deepMerge(valA[k], valB[k], seen)
        }
      }
    }
    return cpy
  }
  return valB
}$$
),

(
  'Implement Object.create()',
  'Implement createObj(proto, properties) that creates a new object with proto as its prototype. Use Object.setPrototypeOf(). If properties is provided, apply them via Object.defineProperties().',
  'frontend', 'easy',
  ARRAY['Object.create', 'prototype', 'prototype-chain'],
  $$function createObj(proto, properties) {
  const obj = {}
  Object.setPrototypeOf(obj, proto)
  if (properties) Object.defineProperties(obj, properties)
  return obj
}$$
),

(
  'Implement the new operator',
  'Implement myNew(Fn, ...args) that mimics the new operator: create an object whose prototype is Fn.prototype, invoke Fn as a constructor, then return the constructor result if it is an object/function, otherwise return the newly created object.',
  'frontend', 'medium',
  ARRAY['new', 'prototype', 'constructor', 'Object.create'],
  $$function myNew(Fn, ...args) {
  const obj = Object.create(Fn.prototype)
  const r = Fn.apply(obj, args)
  return (r !== null && typeof r === 'object') || typeof r === 'function' ? r : obj
}$$
),

(
  'Implement instanceof operator',
  'Implement isInstanceOf(obj, Fn) by walking the prototype chain of obj and checking if any node equals Fn.prototype. Return false for null/non-object obj or non-function Fn.',
  'frontend', 'easy',
  ARRAY['instanceof', 'prototype-chain', 'Object.getPrototypeOf'],
  $$function isInstanceOf(obj, Fn) {
  if (obj == null || Fn == null) return false
  if (typeof obj !== 'object' && typeof obj !== 'function') return false
  if (typeof Fn !== 'function') return false
  let root = Object.getPrototypeOf(Object(obj))
  while (root !== null) {
    if (Fn.prototype === root) return true
    root = Object.getPrototypeOf(root)
  }
  return false
}$$
),

(
  'Generator: Fibonacci sequence',
  'Implement a generator function fib(n) that yields the first n Fibonacci numbers. Use two local variables swapped each iteration via destructuring assignment.',
  'algorithm', 'easy',
  ARRAY['generator', 'fibonacci', 'iterator', 'yield'],
  $$function* fib(n = 10) {
  let a = 0, b = 1
  while (n-- > 0) {
    yield a
    ;[a, b] = [b, a + b]
  }
}

const f = fib()
console.log(f.next().value) // 0
console.log(f.next().value) // 1
console.log(f.next().value) // 1
console.log(f.next().value) // 2$$
),

(
  'Simulate async/await using generator + Promise',
  'Implement a run(genFn) executor that drives a generator to completion by feeding each resolved promise value back as the result of yield. Propagate rejections via generator.throw(). This demonstrates what the async/await transpiler does internally.',
  'frontend', 'hard',
  ARRAY['generator', 'async-await', 'promise', 'coroutine', 'iterator'],
  $$function run(gen) {
  const g = gen()
  return new Promise((resolve, reject) => {
    function step(method, v) {
      try {
        const r = g[method](v)
        if (r.done) return resolve(r.value)
        Promise.resolve(r.value)
          .then(val => step('next', val))
          .catch(err => step('throw', err))
      } catch(e) {
        return reject(e)
      }
    }
    step('next')
  })
}

// Usage
const request = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))

function foo() {
  return run(function* () {
    try {
      const res = yield request()
      console.log(res)
      return res
    } catch(err) {
      return yield 10
    }
  })
}$$
),

(
  'Async generator pipeline (source → filter → map)',
  'Compose a data pipeline using async generators: source() yields values from async requests; filter(iterable) yields only even values; map(iterable) multiplies each value by 10. Consume with for-await-of. Demonstrates how async iterators enable lazy, composable pipelines.',
  'frontend', 'hard',
  ARRAY['async-generator', 'pipeline', 'for-await-of', 'iterator', 'lazy-evaluation'],
  $$async function request(i) {
  return new Promise(resolve => setTimeout(() => resolve(i), 200))
}

async function* source() {
  for (let i = 1; i <= 5; i++) {
    yield await request(i)
  }
}

async function* filter(iterable) {
  for await (const x of iterable) {
    if (x % 2 === 0) yield x
  }
}

async function* map(iterable) {
  for await (const x of iterable) {
    yield x * 10
  }
}

async function run() {
  const pipeline = map(filter(source()))
  for await (const x of pipeline) {
    console.log(x)  // 20, 40
  }
}
run()$$
),

(
  'Implement EventEmitter (on / once / off / emit)',
  'Implement a pub/sub EventEmitter class with: on(event, fn) for persistent listeners, once(event, fn) for single-fire listeners (auto-removed after first emit), off(event, fn) that handles both direct and once-wrapped functions via _original, and emit(event, ...args).',
  'frontend', 'medium',
  ARRAY['EventEmitter', 'pub-sub', 'observer', 'closure', 'once'],
  $$class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  on(event, fn) {
    if (!this.events.has(event)) this.events.set(event, [])
    this.events.get(event).push(fn)
    return this
  }

  once(event, fn) {
    const wrapper = (...args) => {
      fn.apply(this, args)
      this.off(event, wrapper)
    }
    wrapper._original = fn
    this.on(event, wrapper)
    return this
  }

  off(event, fn) {
    if (!this.events.has(event)) return this
    const listeners = this.events.get(event).filter(f => f !== fn && f._original !== fn)
    if (listeners.length === 0) this.events.delete(event)
    else this.events.set(event, listeners)
    return this
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false
    ;[...this.events.get(event)].forEach(fn => fn.apply(this, args))
    return true
  }
}$$
),

(
  'Implement Redux: createStore + combineReducers + applyMiddleware',
  'Implement a simplified Redux from scratch: (1) createStore(reducer, enhancer) with getState/subscribe/dispatch and isDispatching guard; (2) combineReducers merging multiple slice reducers; (3) applyMiddleware using compose to chain middlewares in the store enhancer pattern; (4) a thunk middleware example.',
  'frontend', 'hard',
  ARRAY['redux', 'state-management', 'middleware', 'compose', 'reducer', 'pub-sub'],
  $$function combineReducers(reducers) {
  return function (state = {}, action) {
    let hasChanged = false
    const next = {}
    for (const key in reducers) {
      const prevSlice = state[key]
      const nextSlice = reducers[key](state[key], action)
      next[key] = nextSlice
      if (!Object.is(prevSlice, nextSlice)) hasChanged = true
    }
    return hasChanged ? next : state
  }
}

function compose(...fns) {
  if (fns.length === 0) return arg => arg
  return fns.reduce((o, i) => (...args) => o(i(...args)))
}

function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer)
    const chain = middlewares.map(m => m(store))
    const dispatch = compose(...chain)(store.dispatch)
    return { ...store, dispatch }
  }
}

function createStore(reducer, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer)
  }
  const listeners = new Set()
  let state = reducer(undefined, {})

  function getState() { return state }
  function subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  let isDispatching = false
  function dispatch(action) {
    if (isDispatching) throw new Error('reducers may not dispatch actions')
    isDispatching = true
    try {
      state = reducer(state, action)
    } finally {
      isDispatching = false
    }
    ;[...listeners].forEach(l => l())
  }

  return { getState, subscribe, dispatch }
}

// Thunk middleware
const thunk = store => next => action => {
  if (typeof action === 'function') return action(next, store.getState)
  return next(action)
}$$
),

(
  'Implement Koa-style middleware compose()',
  'Implement compose(...fns) that chains Koa-style middleware functions. Each middleware receives (ctx, next) where next() calls the following middleware. Execution is onion-shaped: all "before next()" code runs outer-to-inner, all "after next()" code runs inner-to-outer. Uses recursive Promise chaining.',
  'frontend', 'medium',
  ARRAY['koa', 'middleware', 'compose', 'onion-model', 'promise', 'async'],
  $$// fns = [mw0, mw1, mw2]
// mw0 before -> mw1 before -> mw2 before -> resolve -> mw2 after -> mw1 after -> mw0 after

function compose(...fns) {
  return ctx => {
    function dispatch(i) {
      if (i >= fns.length) return Promise.resolve()
      return Promise.resolve(fns[i](ctx, () => dispatch(i + 1)))
    }
    return dispatch(0)
  }
}$$
),

(
  'Implement a simplified Zustand store',
  'Implement createStore(initializer) in the Zustand style: the initializer receives (setState, getState) and returns the initial state object. setState accepts a partial object or an updater function. subscribe(listener, selector?) supports optional selector-based subscriptions with shallow comparison to avoid unnecessary re-renders.',
  'frontend', 'hard',
  ARRAY['zustand', 'state-management', 'pub-sub', 'selector', 'shallow-equal'],
  $$function shallowEqual(a, b) {
  if (Object.is(a, b)) return true
  if (typeof a !== 'object' || typeof b !== 'object') return false
  const keysA = Object.keys(a)
  if (keysA.length !== Object.keys(b).length) return false
  return keysA.every(k => Object.is(a[k], b[k]))
}

function createStore(initializer) {
  if (typeof initializer !== 'function') throw new TypeError()
  let state
  const listeners = new Set()

  function getState() { return state }

  function setState(partial) {
    const next = typeof partial === 'function' ? partial(state) : partial
    if (!Object.is(next, state)) {
      state = { ...state, ...next }
      ;[...listeners].forEach(l => l(state))
    }
  }

  function subscribe(listener, selector) {
    if (!selector) {
      const wrapper = (state) => listener(state)
      listeners.add(wrapper)
      return () => listeners.delete(wrapper)
    }
    let prevSlice = selector(state)
    const wrapper = (state) => {
      const nextSlice = selector(state)
      if (!shallowEqual(prevSlice, nextSlice)) {
        prevSlice = nextSlice
        listener(nextSlice)
      }
    }
    listeners.add(wrapper)
    return () => listeners.delete(wrapper)
  }

  state = initializer(setState, getState)
  return { getState, setState, subscribe }
}$$
),

(
  'Implement Vue 3-style reactive() with effect tracking',
  'Implement a reactive system with: reactive(target) using Proxy to intercept get (collect dependencies) and set (trigger effects); effect(fn) that auto-tracks which reactive keys fn reads and re-runs when they change; cleanup of stale dependencies before each re-run to handle conditional branches; nested effect support via an effect stack.',
  'frontend', 'hard',
  ARRAY['reactive', 'proxy', 'effect', 'dependency-tracking', 'vue3', 'WeakMap'],
  $$const effectStack = []
let activeEffect = null

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    effectFn.children.forEach(child => stop(child))
    effectFn.children.length = 0
    effectStack.push(effectFn)
    activeEffect = effectFn
    try {
      fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1] ?? null
    }
  }
  effectFn.deps = []
  effectFn.children = []
  if (activeEffect) activeEffect.children.push(effectFn)
  effectFn()
}

function stop(effectFn) {
  cleanup(effectFn)
  effectFn.children.forEach(child => stop(child))
  effectFn.children.length = 0
}

function cleanup(effectFn) {
  for (const dep of effectFn.deps) dep.delete(effectFn)
  effectFn.deps.length = 0
}

let targetMap = new WeakMap()

function collect(obj, key) {
  if (!activeEffect) return
  if (!targetMap.has(obj)) targetMap.set(obj, new Map())
  const m = targetMap.get(obj)
  if (!m.has(key)) m.set(key, new Set())
  const s = m.get(key)
  if (!s.has(activeEffect)) {
    s.add(activeEffect)
    activeEffect.deps.push(s)
  }
}

function trigger(obj, key) {
  if (targetMap.has(obj)) {
    const m = targetMap.get(obj)
    if (m.has(key)) {
      const deps = m.get(key)
      for (const e of [...deps]) if (e !== activeEffect) e()
    }
  }
}

function reactive(target) {
  return new Proxy(target, {
    get(obj, key) {
      collect(obj, key)
      return obj[key]
    },
    set(obj, key, val) {
      if (!Object.is(obj[key], val)) {
        obj[key] = val
        trigger(obj, key)
      }
      return true
    }
  })
}$$
);
