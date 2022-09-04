---
title: 常用 Shell 知识点和技巧
intro: 学过的东西不经常用就会忘，往往再次捡起来又会花费不少时间。趁此机会整理下编写 Shell 脚本相关的知识点语法。这里基于的是 Bash Shell，其他 Shell 也大致一样。行文没有什么入门顺序，想到哪儿写到哪儿。请注意，本文不是入门教程，只是单纯记录。
comments: false
date: 2017-05-16 09:32:35
tags:
- Shell
---


学过的东西不经常用就会忘，往往再次捡起来又会花费不少时间。趁此机会整理下编写 Shell 脚本相关的知识点语法。这里基于的是 Bash Shell，其他 Shell 也大致一样。行文没有什么入门顺序，想到哪儿写到哪儿。请注意，本文不是入门教程，只是单纯记录。


```bash
# 基本重定向；
ls -al > standardOutput.txt 
ls -al 1> standardOutput.txt 
ls -al 2> errorOutput.txt 
ls -al > /dev/null
ls -al 1> standardOutput.txt  2> errorOutput.txt 
ls -al 1> standardOutput.txt 2>&1

# 追加重定向；
ls -al >> standardOutput.txt 

# 管道；
ls -al | grep "fileName"
find / -type f -name "fileName" | xargs grep "fileContent" > list.txt
ps -aux | grep "pid"
ps | sort | more

# 标准自启动注释；
#!/bin/sh

# 常用环境变量；
$HOME # 当前登录用户的家目录；
$PATH # 搜索命令的目录列表；
$PS1  # 命令提示符（默认是$）；
$PS2  # 二级提示符（默认是>）；
$IFS  # 输入域分隔符（默认是空格）；
$0    # Shell 脚本的名字；
$#    # 传递给脚本的参数个数；
$$    # Shell 脚本的进程号；
$*    # 列出所有参数，用 IFS 的第一个字符分隔；
$@    # $* 的一种变体，不受 IFS 影响；

# 变量；
echo "$HOMT" # 双引号可以解析变量，比较运算最好加上；
echo $HOME
echo /$HOME  # 反斜杠不解析变量，单引号同理；
echo '$HOME'

# 条件命令和语句（test 或 [）；
if test -f fred.c
then
  echo 0
else 
  echo 1
fi

if [ -f fred.c ]
then
  echo 0
elif [ -g fred.c ]
then 
  echo 1
fi

# 循环语句（只列了常用的两种）；
for item in foo bar
do 
  echo $item
done

for file in $(ls -al *.sh)
do 
  echo $file
done

read str
while [ "$str" != "go" ]
do
  echo "retry, please"
done


# 选择语句；
read choice
case "$choice" in
  apple) echo "Apple";;
  banana) echo "Banana";;
esac

case "$choice" in
  apple | banana) echo "Fruit";;
  beef | pork) echo "Meat";;
esac

# 命令列表；
[] && []  # 形式码；
[] || []  # 形式码；

# 函数；
my_function() {
  local answer='three'
  echo -n "Please enter a number:"
  read input
  if [ "$answer" = "$input" ]
  then
    echo "Good Job!"
  fi
}

# 其他命令；
break     # 退出循环；
continue  # 退出本次循环；
:         # 空命令（一般用在死循环中）；

while :
do 
  echo "Eternal"
done

x=$(($x+1))        # 算数扩展；

${x}               # 参数扩展（保护变量）；
${param:-default}  # 带有默认值的参数扩展；
${#param}          # 给出参数长度；
${param%word}      # 尾部删除与特定值匹配的最小部分，返回剩下；
${param%%word}     # 尾部删除与特定值匹配的最大部分，返回剩下；
${param#word}      # 头部删除与特定值匹配的最小部分，返回剩下；
${param##word}     # 头部删除与特定值匹配的最大部分，返回剩下；


```

下面记录一些常用命令：


```bash
lsof -i:8080                      # 列出使用8080端口的进程；
df -h                             # 查看系统磁盘使用情况；
du -h --max-depth=1               # 列出第一层目录记文件的使用大小；
ssh [ip] -l [username] -p [port]  # SSH 远程登录；
npm view [module] versions        # 查看某一 NPM 模块的所有可用版本  ； 
npm install [modules]@[version]   # 安装某一版本的 NPM 模块；
npm outdated -g                   # 列出全局 NPM 包的过期版本情况；
npm outdated                      # 列出当前项目的 NPM 包过期版本情况；

clang -x c -v -E /dev/null        # Clang／Gcc 默认的头文件加载搜索路径；

# 查看 Linux 版本信息；
cat /etc/issue
sudo lsb_release -a
```
