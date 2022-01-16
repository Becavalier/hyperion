---
title: Phase2 Proposal - Wat Numeric Values
page: notes
cateogry: WebAssembly
link: https://github.com/WebAssembly/wat-numeric-values
date: 2021-06
---

\- ***提案内容***：

简化了 *data segment* 中数字字面量值的书写入方式。

```wast
(data (offset (i32.const 0))
  (f32 0.2 0.3 0.4) ;; cdcc 4c3e 9a99 993e cdcc cc3e
)
```

```wast
(memory $1
  (data 
    (i8 1 2) ;; 0102
    (i16 3 4) ;; 0300 0400
  )
)
```

\- ***提案动机***：

目前在 Wat 格式下向 *data segment* 中书写数字字面量值的过程十分繁琐（需要先编码、添加转义斜杠，再以引号字符串的形式写入）。

