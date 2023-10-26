---
title: Git 你需要具备的基础知识
intro: Git 是一款免费、开源的分布式版本控制系统，相比于之前的 CVS、SVN 等版本控制系统，Git 的优势大大凸显。Git 是分布式的版本控制系统，相比之前的集中式系统，分布式版本控制系统的安全性要高很多。因为每个人电脑里都有完整的版本库副本，使得整个版本库不会轻易的丢失。
comments: true
date: 2015-03-24 22:25:27
tags:
- Git
---

Git 是一款免费、开源的分布式版本控制系统，相比于之前的 CVS、SVN 等版本控制系统，Git 的优势大大凸显。Git 是分布式的版本控制系统，相比之前的集中式系统，分布式版本控制系统的安全性要高很多。因为每个人电脑里都有完整的版本库副本，使得整个版本库不会轻易的丢失。

本文不会介绍 Git 的发展历史及其入门的使用方法，而主要介绍在日常开发中需要具备的 Git 基本操作，即相关概念和对应的指令方法。

1. 在 Linux 上安装 Git：
```bash
sudo apt-get install git
```

2. 在 Windows 上安装 Git 直接使用 Git Bash，并设置 Name 和 Email，`global` 代表本地所有 Git 仓库均使用此设置：
```bash
git config --global user.name "Name"
git config --global user.email "Email"
git config --global core.editor vim;
git config --list  # 查看所有配置项；
git config --global alias.<short> <command>  # 设置命令别名；
```

3. 创建版本库：
```bash
git init
```

4. 添加改动到暂存区：
```bash
git add <filepath>
```

5. 提交文件到仓库：
```bash
git commit -m "msg"
git commit -a -m "msg"  # 跳过将改动加入到暂存区的过程；
git commit --amend  # 修改上一次提交的描述信息（会合并当前暂存区的改动）；
```

6. 查看仓库状态：
```bash
git status
```

7. 查看仓库修改的内容：
```bash
git diff  # 默认只查看当前分支和未暂存改动间的区别；
git diff --cached/--staged  # 查看暂存区和待提交分支的区别；
git difftool  # 使用 GUI 界面工具查看区别；
```

8. 查看仓库提交日志：
```bash
git log --pretty=oneline
git log --pretty=format:"<format>"
git log -p -<n>  # 查看最近 n 次提交的差异；
git log --stat  # 查看最近提交的简略总结信息；
git log --since/--until=<time>  # 筛选特定日期的提交；
git log -p -S<functionName>   # 查看跟特定关键字相关的提交细节；
git log --oneline --decorate  # 查看各分支对应的提交情况；
git log --oneline --decorate --graph --all  # 显示详细的分支和提交情况；
git show <commitHash>  # 查看某一个提交的详情；
git show HEAD^^  # 查看当前分支的祖父提交；
git show HEAD~2  # 查看当前分支的祖父提交；
git show HEAD~~  # 查看当前分支的祖父提交；
git show HEAD^2  # 查看当前分支的第二父提交（被合并分支）；
``` 

9. 版本回退：
```bash
git reset --hard HEAD^
git reset --hard HEAD~100
git reset --hard HEAD <commitid>
```

10. 查看分支引用变动历史：
```bash
git reflog
git show HEAD@{n}  # 查看变动历史对应提交的详情；
```

11. 丢弃工作区修改：
```bash
git checkout -- <filepath>
```

12. 丢弃暂存区修改：
```bash
git reset HEAD <filepath>
```

13. 删除仓库文件：
```bash
git rm <filepath>
git rm <filepath> --cached  # 从 Git 索引中移除，但不删除文件实体；
git commit -m "msg"
```

14. 代码暂存与恢复（到当前分支）：
```bash
git stash
git stash pop
git stash drop <stashId>
git stash apply <stashId>  # 应用某个暂存到当前分支；
```

15. “变基”的基本用法：
```bash
git rebase <baseBranch> <topicBranch>  # 将 topicBranch 分支变基到 baseBranch 分支；
```

16. 移动文件：
```bash
git mv <org> <des>  # 常用于更换文件名；
```

17. 管理远程仓库：
```bash
git remote -v
git remote add <shortname> <url>  # 添加上游仓库；
git remote show <remote>
```

18. 拉取资源：
```bash
git fetch  # 只拉取，不合并；
```

19. 标签：
```bash
git tag <tagName>  # 轻量标签；
git tag -a <tagName> <commitId> -m <message>  # 附注标签；
```

20. 分支操作：
```bash
git checkout -b <branchName> [<tagName>/<remote/branchName>]
git checkout -- .  # 丢弃本地当前所有改动；
git branch -v  # 查看每一个分支的最后一次提交；
git branch --merged/--no-merged  # 查看已经合并/未合并到当前分支的分支；
git checkout --track <remote/branchName>
git branch -u <remote/branchName>  # 为本地已有分支指定上游跟踪分支；
git branch -vv  # 查看本地分支的远程跟踪情况；
git push <remote> :<branchName>  # 删除远程分支(1)
git push <remote> --delete <branchName>  # 删除远程分支(2)
```
