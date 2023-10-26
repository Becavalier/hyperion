---
title: CentOS 7.2 之 MySQL 到 MariaDB 的迁移
intro: CentOS 自从 7.0 以后，其操作系统默认的数据库系统从之前的 MySQL 变成了 MariaDB。MariaDB 数据库管理系统是 MySQL 的一个分支，主要由开源社区在维护，采用 GPL 授权许可 MariaDB 的目的是完全兼容 MySQL，包括 API 和命令行，使之能轻松成为 MySQL 的代替品。
comments: true
date: 2017-01-29 22:57:05
tags:
- Linux
- MySQL
---
CentOS 自从 7.0 以后，其操作系统默认的数据库系统从之前的 MySQL 变成了 MariaDB。MariaDB 数据库管理系统是 MySQL 的一个分支，主要由开源社区在维护，采用 GPL 授权许可 MariaDB 其目的是完全兼容 MySQL，包括 API 和命令行，使之能够轻松成为 MySQL 的替代品。

MariaDB 由 MySQL 的创始人 Michael Widenius 主导研发，他早前曾以10亿美元的价格，将自己创建的公司 MySQL AB 卖给了 SUN，此后，随着SUN 被甲骨文收购，MySQL 的所有权也落入 Oracle 的手中。开发这个分支的原因之一是：甲骨文公司在收购 MySQL 后，有将 MySQL 闭源的潜在风险，因此社区采用另起分支的方式来避开这个风险。 在过去一年中，大型互联网用户以及 Linux 发行商（这里比如 CentOS）纷纷抛弃 MySQL，转投到 MariaDB 的阵营。MariaDB 是目前最受关注的 MySQL 数据库衍生版，也被视为开源数据库 MySQL 的替代品。

MariaDB 默认的存储引擎是 Maria，不是 MyISAM。Maria 可以支持事务，但是默认情况下没有打开事务支持，因为事务支持对数据库的性能会有着一定的影响。

MariaDB 的安装与配置流程：

#### 1. 检测当前 CentOS 的系统版本

```bash
lsb_release -a LSB Version
```

#### 2. 安装 MariaDB

```bash
yum install mariadb*
```

#### 3. 启动 MariaDB

```bash
systemctl enable mariadb
systemctl start mariadb
```

#### 4. 配置管理员用户权限
 
```bash
mysqladmin -u root password <your@password>
```

#### 5. 设置远程连接的数据库账户

```bash
mysql -u root -p <your@password>
> use mysql;
> insert into user(Host, User, Password) values ('localhost', 'remote', password(<your@password>));
> flush privileges;
> create database dbname;
> grant all privileges on dbname.* to 'remote'@'%' identified by <your@password>;
> flush privileges;
```

接下来便可以通过 SQLyog 等数据库远程连接工具以 “remote” 用户登陆 MariaDB。我们仍然可以使用 `service` 命令来查看当前数据库的状态或者停止启动数据库，在使用 `service` 执行对应的命令时，该命令会被自动跳转到对应的 `systemctl` 命令进行执行。

```bash
service mariadb status
service mariadb stop
service mariadb start 
service mariadb restart
```

对应于实际执行的命令：

```bash
systemctl status mariadb.service
systemctl stop mariadb.service
systemctl start mariadb.service
systemctl restart mariadb.service
```

附：如何更改 Mariadb 数据存放位置？

```bash
# 停止 Mariadb；
service mariadb stop
# 复制原数据库数据文件到新位置；
cp -r /var/lib/mysql/* /data/mysql
# 修改配置文件中的 socket 和 datadir 两个选项的值指向到新的数据存放位置；
vi /etc/my.cnf
# 同时增加另外两组设置，socket 同样指向新的数据存放位置；
[client]
default-character-set=utf8
socket=/data/mysql/mysql.sock
[mysql]
default-character-set=utf8
socket=/data/mysql/mysql.sock
# 设置新位置目录的用户组和权限；
chown -R mysql:mysql /data/mysql
chmod -R 777 /data/mysql
# 重启 Mariadb；
service mariadb start
```