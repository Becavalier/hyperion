---
title: Common Lisp 全记录（一）
intro: 从今天开始进行为期两周的 Common Lisp 语言学习，在此记录第一部分的学习内容。Lisp 作为一种古老的编程语言，有着其独特的魅力，在灵活的同时又不失性能。
comments: true
date: 2017-06-29 23:27:55
tags:
- Lisp
---

从今天开始进行为期两周的 Common Lisp 语言学习，在此记录第一部分的学习内容。Lisp 作为一种古老的编程语言，有着其独特的魅力，在灵活的同时又不失性能。

Lisp 中所有的表达式都采用前序表达式的形式来组织语法。

 
```lisp
(+ 2 3 4 5)                     # 14
(/ (- 7 1) (- 4 2))             # 3

# quote 算子会原方不动的返回后面的实参内容；
(quote (+ 3 5))                 # (+ 3 5)
'(+ 3 5)                        # (+ 3 5)

# 符号，不对自身求值；
'Artichoke                      # ARTICHOKE

# 列表；
'(my 3 "Sons")                  # (MY 3 "Sons")
(list 'my (+ 2 1) "Sons")       # (MY 3 "Sons")
(list '(+ 2 1) (+ 2 1))         # ((+ 2 1) 3)

# 空列表；
()                              # NIL
nil                             # NIL

# 合并列表；
(cons 'a '(b c d))              # (A B C D)
(cons 'a (cons 'b '(c d)))      # (A B C D)

# 取出列表第一个元素；
(car (list 'a 'b 'c))           # A
# 取出第一个元素之后的所有元素；
(cdr (list 'a 'b 'c))           # B C
# 取出第三个元素；
(third (list 'a 'b 'c))         # C

# 验证实参是否是一个列表；
(listp 'a)                                  # NIL
(listp (list 'a 'b))                        # T

# 判断实参是否是一个空表；
(null nil)                                  # T

# 取反；
(not nil)                                   # T
# 逻辑与；
(and t (listp (list 'a 'b)))                # T
# 逻辑或；
(or t (listp (list 'a 'b)))                 # T
```

进一步的语法。

 
```lisp
# if 语句，接受三个参数(if-then-else)；
(if (listp (list 'a 'b)) (+ 1 1) (+ 1 2))   # 2
(if 27 1 2)                                 # 1

# 函数定义，接受三个参数；
(defun thirdParam (x) (third x))            # THIRDPARAM
(defun sum-greater (x y z) (> (+ x y) z))   # SUM-GREATER

# 调用函数；
(thirdParam '(1 2 3))                       # 3
(sum-greater 1 4 3)                         # T

# 递归；
(defun our-member (obj lst) 
 (if (null lst)
     nil
 (if (eql (car lst) obj)
     t
     (our-member obj (cdr 1st)))))

# 输出，~A 占位，~% 换行；
(format t "~A plus ~A equals ~A. ~%" 2 3 (+ 2 3))    # 2 plus 3 equals 5
# 输入；
(defun asken (string)
    (format t "~A" string)
    (read))

# 变量；
```
