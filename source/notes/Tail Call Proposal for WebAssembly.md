---
title: Phase3 Proposal - Tail Call Extension
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/tail-call
date: 2021-06
---

\- ***提案内容***：

新增了用于支持 TCE 的指令：

* `return_call`：对应 *call* 指令的尾递归优化版本； 
* `return_call_indirect`：对应 *call_indirect* 指令的尾递归优化版本。

```wast
;; An example as below.
(func $fac (param $x i64) (result i64)
  (return_call $fac-aux (get_local $x) (i64.const 1))
)

(func $fac-aux (param $x i64) (param $r i64) (result i64)
  (if (i64.eqz (get_local $x))
    (then (return (get_local $r)))
    (else
      (return_call $fac-aux
        (i64.sub (get_local $x) (i64.const 1))
        (i64.mul (get_local $x) (get_local $r))
      )
    )
  )
)
```

\- ***提案动机***：

* 支持需要 TCE 的语言其正确和有效实现；
* 基于 TCE 实现的控制结构的编译（例如：coroutines、continuations）；
* 相关编译和优化技术（例如：动态重编译、跟踪、CPS）；
* 其他被表示为 Wasm 函数的计算，例如 FSM。

\- ***提案细节***：

* *call* 变 *jmp*，不产生栈帧。
