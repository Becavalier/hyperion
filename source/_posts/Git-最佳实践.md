---
title: Git 最佳实践
intro: Git 是一款免费、开源的分布式版本控制系统，相比于之前的 CVS、SVN 等版本控制系统，Git 的优势大大凸显。Git 是分布式的版本控制系统，相比之前的集中式系统，分布式版本控制系统的安全性要高很多。因为每个人电脑里都有完整的版本库，使得整个版本库不会轻易的丢失。 
comments: true
date: 2018-11-29 11:55:05
tags:
- Git
---

Git 是一款免费、开源的分布式版本控制系统，相比于之前的 CVS、SVN 等版本控制系统，Git 的优势大大凸显。Git 是分布式的版本控制系统，相比之前的集中式系统，分布式版本控制系统的安全性要高很多。因为每个人电脑里都有完整的版本库，使得整个版本库不会轻易的丢失。 


#### 1. 选择修订版本： 
```bash
git log <notin>..<in>  # 列出在 in 分支而不在 notin 分支的提交；
git log <in1> <in2> --not <notin>  # 列出在 in1/in2 分支而不在 notin 分支的提交；
git log --left-right <branch1>...<branch2>  # 并集提交，并显示所属；
```

#### 2. 交互式暂存： 
```bash
git add -i
git stash -u  # 暂存 untracked 状态的文件；
git stahs -a  # 暂存所有改动；
git stash --patch  # 交互式暂存；
git stash branch <branchName>  # 从上一次暂存恢复，并创建新分支；
git clean -d(n)f  # 移除(仅查看)所有 untracked 文件；
```

#### 3. 搜索： 
```bash
git grep --heading --break -n (-p) -e <key> -C <lineCount>  # 搜索关键字，是否显示所在函数定义；
git log -S<keyword> --oneline  # 查看特定关键字发生变动（新增/删除）时对应的提交；
git log -L :<functionName>:<sourceFile>  # 查看某文件内某个函数的变动历史；
```

#### 4. 重写历史： 
```bash
git commit --amend  # 重写最后一次提交（会自动合并缓存区中的修改）；
git rebase -i HEAD^<n>  # 修改最后的n次提交（修改、压缩、合并、拆分）；
git filter-branch --tree-filter '<cmd>' HEAD --all  # 同时改写每一个分支的所有提交；
```
