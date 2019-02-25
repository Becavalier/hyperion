---
title: WebAssembly 尝试研究报告 - 本地存储与转移
intro: 为了提升 WebAssembly 应用的初期模块加载效率和整体使用体验，我们可以将已经编译好的 WebAssembly 模块存储在本地的 IndexedDB 数据库当中，当下一次用到该模块时可以直接从本地读取并实例化，减少了再次从网络传输和编译的时间。同样我们也可以将 WebAssembly 部分的代码逻辑放到 Worker 线程中运行，这样可以使 WebAssembly 模块的密集运算不影响到主线程的正常工作，本次我们来讨论上述这些事情。
comments: true
date: 2017-06-16 09:57:50
tags:
- WebAssembly
---

为了提升 WebAssembly 应用的初期模块加载效率和整体使用体验，我们可以将已经编译好的 WebAssembly 模块存储在本地的 IndexedDB 数据库当中，当下一次用到该模块时可以直接从本地读取并实例化，减少了再次从网络传输和编译的时间。同样我们也可以将 WebAssembly 部分的代码逻辑放到 Worker 线程中运行，这样可以使 WebAssembly 模块的密集运算不影响到主线程的正常工作，本次我们来讨论上述这些事情。


#### 1、本地缓存：
IndexedDB 是一个运行在浏览器上的事务型数据库系统，我们可以在 IndexedDB 中读取本地的结构化数据，当然这也包括我们之前使用到的 WebAssembly.Module 对象。整体思路是：我们通过远程获取 WebAssembly 模块的 URL 作为模块在本地数据库的索引，如果 URL 改变（比如版本更新）则重新从远程获取 WebAssembly 模块，并更新本地数据库中存储的静态模块内容。否则，直接从本地读取已经编译好的模块对象。

上述功能的完整代码如下：

 
```javascript
// 1. +++ fetchAndInstantiate() +++ //
// 从指定 URL 获取一个 Wasm 模块并返回一个实例；
function fetchAndInstantiate(url, importObject) {
  return fetch(url).then(response =>
    response.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes, importObject)
  ).then(results =>
    results.instance
  );
}

// 2. +++ instantiateCachedURL() +++ //
function instantiateCachedURL(dbVersion, url, importObject) {
  // 指定 IndexedDB 的数据库名和表名；
  const dbName = 'wasm-cache';
  const storeName = 'wasm-cache';

  function openDatabase() {
    return new Promise((resolve, reject) => {
      var request = indexedDB.open(dbName, dbVersion);
      request.onerror = reject.bind(null, 'Error opening wasm cache database');
      request.onsuccess = () => { resolve(request.result) };
      request.onupgradeneeded = event => {
        var db = request.result;
        // 如果已经存在对应的表则删除并更新；
        if (db.objectStoreNames.contains(storeName)) {
            console.log(`Clearing out version ${event.oldVersion} wasm cache`);
            db.deleteObjectStore(storeName);
        }
        console.log(`Creating version ${event.newVersion} wasm cache`);
        db.createObjectStore(storeName)
      };
    });
  }
  
  // 通过 URL 来查询指定的 Wasm 模块；
  function lookupInDatabase(db) {
    return new Promise((resolve, reject) => {
      var store = db.transaction([storeName]).objectStore(storeName);
      var request = store.get(url);
      request.onerror = reject.bind(null, `Error getting wasm module ${url}`);
      request.onsuccess = event => {
        if (request.result)
          resolve(request.result);
        else
          reject(`Module ${url} was not found in wasm cache`);
      }
    });
  }

  // 以 URL 为 key 将编译好的模块存储到本地数据库中；
  function storeInDatabase(db, module) {
    var store = db.transaction([storeName], 'readwrite').objectStore(storeName);
    var request = store.put(module, url);
    request.onerror = err => { console.log(`Failed to store in wasm cache: ${err}`) };
    request.onsuccess = err => { console.log(`Successfully stored ${url} in wasm cache`) };
  }

  function fetchAndInstantiate() {
    return fetch(url).then(response =>
      response.arrayBuffer()
    ).then(buffer =>
      WebAssembly.instantiate(buffer, importObject)
    )
  }

  // 主要业务逻辑；
  return openDatabase().then(db => {
    // 查找模块；
    return lookupInDatabase(db).then(module => {
      console.log(`Found ${url} in wasm cache`);
      // 查到直接返回实例化后的模块；
      return WebAssembly.instantiate(module, importObject);
    }, errMsg => {
      console.log(errMsg);
      // 没有查到则直接从远程重新拉取；
      return fetchAndInstantiate().then(results => {
        // 拉取后更新本地缓存；
        storeInDatabase(db, results.module);
        return results.instance;
      });
    })
  },
  errMsg => {
    console.log(errMsg);
    // 如果本地数据不可用，直接从远程拉取；
    return fetchAndInstantiate().then(results =>
      results.instance
    );
  });
}
```

#### 2、Worker 线程：

将 WebAssembly 模块运行在非主线程的工作线程中可以减少密集计算带来的对主线程的压力。

首先是主线程部分代码：
 
```javascript
var worker = new Worker('js/wasm-worker.js');
worker.postMessage({
  data: WemAssembly.Module(wasmCode);
});
```


接下来是工作线程的代码：
 
```javascript
var importObject = {
  imports: {
    imported_func: function(arg) {
      console.log(arg);
    }
  }
};

onmessage = function(e) {
  console.log('module received from main thread');
  var mod = e.data;

  WebAssembly.instantiate(mod, importObject).then(function(instance) {
    instance.exports.exported_func();
  });

  var exports = WebAssembly.Module.exports(mod);
  console.log(exports[0]);
};
```
