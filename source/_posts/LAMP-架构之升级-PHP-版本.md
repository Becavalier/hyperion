---
title: LAMP 架构之升级 PHP 版本
intro: 当你看到这篇文章的时候 YHSPY.COM 服务器上的 PHP 版本已经从 5.4.27 升级到了 7.0.4，这是一个重大的飞跃。一路升级遇到了很多问题。官方声称 PHP7 最大的升级就是在语言性能上的提升，最大到达了30%。同时也去掉了很多老版本中被标记为 Deprecated 的函数方法，语言整体变得更加稳定。
comments: false
date: 2016-03-16 09:12:07
tags:
- PHP
---

当你看到这篇文章的时候 YHSPY.COM 服务器上的 PHP 版本已经从 5.4.27 升级到了 7.0.4，这是一个重大的飞跃。一路升级遇到了很多问题。官方声称 PHP7 最大的升级就是在语言性能上的提升，最大到达了30%。同时也去掉了很多老版本中被标记为 Deprecated 的函数方法，语言整体变得更加稳定。

首先声明，此文不适用于使用 `yum` 方式安装的 PHP 环境进行的升级，**只适用于通过 PHP 源代码编译安装的 PHP 版本**。升级之前首先需要判断服务器上的 Apache 版本，根据不同的 Apache 版本来参考不同的官方编译文档。用以下命令来查看当前已安装 Apache 的版本：

```bash
[root@iZ23ki8vt8tZ /]# httpd -v
Server version: Apache/2.2.27 (Unix)
Server built:   Jun 12 2014 21:19:24
```

由上述命令返回的结果可知，当前 Apache 服务器为“2.X”版本，所以此处应该参考官方给出的 PHP 在 Apache 版本2.X上的编译参考文档：[Apache2.X 版本 PHP 编译文档](http://php.net/manual/en/install.unix.apache2.php)。对于其他版本的 Aapche 或者 Nginx 服务器，可以参考此处：[针对其他版本服务器的 PHP 编译文档](http://php.net/manual/en/install.php)。

接下来我们从 PHP 官方给出的镜像地址来获取 PHP 源代码，这些源代码将会最后被编译并安装在我们的服务器上。这里按照官方文档的说明，我们使用 `wget` 命令来获取源代码的压缩包，并逐层解压，直到生成最后的源代码文件夹。

```bash
wget http://bg2.php.net/get/php-7.0.4.tar.gz/from/this/mirror  #从镜像获取 PHP 源代码；
gzip -d php-7.0.4.tar.gz  #解压缩；
tar -xf php-7.0.4.tar
```

由于我们这里为 PHP 的版本进行升级操作，所以需要保持新版本 PHP 源代码的预编译参数和旧版本 PHP 源码的预编译参数一致。进入到旧版本（当前版本）PHP 源码文件夹内，使用 `vi/vim` 命令打开文件夹内的 Makefile 文件，复制其中的 “CONFIGURE_COMMAND” 参数部分并整理（去掉单引号等）成如下格式：

```bash
CONFIGURE_COMMAND = ./configure --prefix=/alidata/server/php --with-config-file-path=/alidata/server/php/etc --with-apxs2=/alidata/server/httpd/bin/apxs --with-mysql=mysqlnd --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --enable-static --enable-maintainer-zts --enable-zend-multibyte --enable-inline-optimization --enable-sockets --enable-wddx --enable-zip --enable-calendar --enable-bcmath --enable-soap --with-zlib --with-iconv-dir=/usr/local/libiconv --with-gd --with-xmlrpc --enable-mbstring --without-sqlite --with-curl --enable-ftp --with-mcrypt --with-freetype-dir=/usr/local/freetype.2.1.10 --with-jpeg-dir=/usr/local/jpeg.6 --with-png-dir=/usr/local/libpng.1.2.50 --disable-ipv6 --disable-fileinfo --with-openssl --with-pcntl
```


这里 CONFIGURE_COMMAND 参数的值就是对应于我们上一次 PHP 源码预编译过程的全部编译命令（和子参数），这里顺便说一下其中几个子参数的作用。 `--prefix` 参数用来指定 PHP 安装的主要目录位置，`--with-config-file-path` 参数主要用来指定 “php.ini” 文件的生成路径，对于其他子参数的具体用法和说明，可以在 PHP 源代码文件夹内使用 `./configure --help` 命令来进行查看。

接下来便通过已经整理好的预编译参数来对源码进行预编译（即编译前的配置操作）操作，命令如下：


```bash
./configure --prefix=/alidata/server/php --with-config-file-path=/alidata/server/php/etc --with-apxs2=/alidata/server/httpd/bin/apxs --with-mysql=mysqlnd --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --enable-static --enable-maintainer-zts --enable-zend-multibyte --enable-inline-optimization --enable-sockets --enable-wddx --enable-zip --enable-calendar --enable-bcmath --enable-soap --with-zlib --with-iconv-dir=/usr/local/libiconv --with-gd --with-xmlrpc --enable-mbstring --without-sqlite --with-curl --enable-ftp --with-mcrypt --with-freetype-dir=/usr/local/freetype.2.1.10 --with-jpeg-dir=/usr/local/jpeg.6 --with-png-dir=/usr/local/libpng.1.2.50 --disable-ipv6 --disable-fileinfo --with-openssl --with-pcntl
```

在这里为了防止出现错误，我们需要分开执行 `make` 编译和 `make install` 安装两个操作命令，首先执行 `make` 命令来编译源代码。

```bash
make
```

如果在执行过程中遇到 “undefined reference to "libiconv"”错误，请尝试为 `make` 命令加入 “ZEND_EXTRA_LIBS” 参数，如下所示：

```bash
make ZEND_EXTRA_LIBS='-liconv'
```


最后再执行 `make install` 命令来安装 PHP 环境：

```bash
make install
```

当源代码全部编译完成并安装后，便可以用以下命令来重新启动 Apache 服务器：

```bash
service httpd restart
```

至此，PHP7 的升级就全部结束了，你可以通过 `phpinfo()` 函数来查看新版本 PHP 的相关配置，包括扩展配置和错误日志等常用设置是否配置正确。从 PHP5.X 升级至 PHP7.X 后，一些 PHP 在早期版本不推荐使用的函数比如 `split()` 等都已经从 PHP7 中被移除了，所以在升级时务必请参考官方的升级文档。并且，PHP7 也移除了 `mysql` 相关的函数，因此只能够使用 PDO 或其他方式来连接数据库。

写在最后，其实所谓的预编译步骤是对源代码编译之前进行一些环境配置，比如指定编译是否携带某一模块，编译生成的文件夹等。同时在执行 `./configure` 时也会同时生成 Makefile 文件。
