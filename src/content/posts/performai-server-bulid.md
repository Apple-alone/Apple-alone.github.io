---
title : '如何建立Sega游戏服务器'

published: 2025-08-23
tags: [教程, 服务器]
author: Applesaber
---

# 前言
很多地方都没有这个搭建教程，搭建服务器要有一定的技术

目前开源的服务器有 [ARTEMIS](https://gitea.tendokyu.moe/Hay1tsme/artemis/) 和 [AquaDX](https://github.com/MewoLab/AquaDX/) 

*在这里我分享的文件均不能外传！*

在使用请遵循每个服务器的开源协议

# 准备环境
ARTEMiS 服务端支持比较老的游戏版本，AquaDX支持比较新的游戏版本

具体支持版本请看每个仓库的自述文件 [ARTEMIS](https://gitea.tendokyu.moe/Hay1tsme/artemis/#supported-games) [AquaDX](https://github.com/MewoLab/AquaDX/?tab=readme-ov-file#supported-games)

然后来准备环境

|            |AquaDX     | ARTEMIS
|-           | -         | - 
|编译环境    |Java       |Python     
|其他环境    |Docker     |Docker

自行准备环境

选择好服务端后开始准备文件

# AquaDX 配置和部署
部署的方式有两种
1. Docker 直接部署
2. 编译成 Jar 后部署
使用Docker更快更自动化，并且更好管理，这里我以Docker作为演示
>主要是Java编译麻烦还容易出问题(x

[Docker官方镜像](https://hub.docker.com/r/hykilpikonna/aquadx)

不过官方镜像默认是反代`aquadx.net`，建议用这个[镜像](https://www.123684.com/s/PXaTTd-DWrR)，提取码为 `aqua`，解压密码为 `AquaDX`
>这是我的一位朋友的镜像，他在我第一次部署服务器时给予了我很多帮助，在这里我感谢他

下载解压好镜像后就配置一下服务器

首先编辑 `compose.yml` 文件

找到
```yml
services:
  http:
    image: caddy
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
    ports:
      - 8080:8080
```
修改ports为自己的端口，避免 8080 这个端口冲突

然后打开 `application.properties` 文件

找到并修改 `allnet.server.host` `allnet.server.redirect` 和 `aqua-net.email.webHost` 项为自己的局域网IP

```properties
# IP统一不能为127.0.0.1
allnet.server.host=192.168.0.102
allnet.server.port=80      # 这里是ALL.NET服务器端口
...

allnet.server.redirect=http://192.168.0.102:8080    # 这里是真实的服务器IP,建议修改为compose.yml设置的端口

...

server.port=80 #这里是web端口

...

aqua-net.email.webHost=192.168.0.102
```

> aqua-net.email.webHost 是email服务器地址，不过我们一般不用这个服务，你可以把里面的ip删掉留空

如果不配置文件出错或者不生效可以去 `/AquaDX/config/application.properties` 按照上面的方法继续设置

接着在服务器根目录打开终端输入

```bash 
docker compose up
```

然后可以喝杯咖啡☕等待部署完毕

看到出现了 `⭐️ ALL PERFECT ⭐️` 表示你的服务器成功正常运行了
![](https://cdn.jsdelivr.net/gh/Apple-alone/PicGo@main/img/image.png)

然后在浏览器打开 你的局域网IP:ALL.NET端口

例如：

我显示的是 `ALL.Net : Port 80` web的地址就为 `192.168.0.102:80`

或者输入 `allnet.server.redirect` 打开 `192.168.0.102.8080`

>80这个端口是Http端口，可以直接输入ip不带端口进入web

最后进入web注册帐号，随便输入一个邮箱和用户名，点击注册

然后登录你刚刚输入的邮箱和密码即可进入web

>注意：你不用去验证邮箱，可以直接登录，除非你开启了email验证，配置文件默认是关闭的

和你获取dns和狗号的操作去配置segatools.ini

享受你的本地服！

# ARTEMIS 配置和部署
ARTEMIS 对于较老的游戏版本来说很友好
## 编译环境
首先请准备好Python环境，官方的建议Python版本至少为3.7，但是我建议用使用Python3.10，因为它更加稳定

请自行去下载 [Python](https://mirrors.aliyun.com/python-release/)

当你配置好 Python 环境后，接下来要继续准备 [`MariaDB数据库`](https://ftp.osuosl.org/pub/mariadb//mariadb-10.11.6/winx64-packages/mariadb-10.11.6-winx64.msi)

网络上有一堆教程，可以自己搜索配置
>MySQL真的太烂了

接下来下载或者克隆仓库获取 ARTEMIS 源代码

可以通过git来获取
```bash
git clone https://gitea.tendokyu.moe/Hay1tsme/artemis.git
```
你也可以去存储库里下载 [源代码](https://gitea.tendokyu.moe/Hay1tsme/artemis)

然后进入 ARTEMIS 根目录

## 配置环境

打开终端，进入 `MariaDB` 命令行

新建一个 MariaDB 账户，`username`是你的账户，并将 `<password>` 换成这个账户的密码
```MariaDB
CREATE USER 'username'@'localhost' IDENTIFIED BY '<password>';
CREATE DATABASE username;
GRANT Alter,Create,Delete,Drop,Index,Insert,References,Select,Update ON username.* TO 'username'@'localhost';
```

创建一个venv虚拟环境使Python更好管理和处理模块
```bash
python -m pip venv venv
# 或
pip venv venv
```
当您需要与 ARTEMiS 交互时，激活 venv 运行 `venv\Scripts\activate.bat`

安装 pip 模块
```bash
pip install -r requirements.txt
```

## 配置服务器
* 创建一个 `config` 文件夹并将 `example_config` 复制其中

* 编辑 `core.yaml`
  * 将您刚刚创建的 MariaDB 账户和密码填入 `database` 部分
  * 将您的 `hostname` 设置为游戏可以访问您的服务器的任何主机名或 IP 地址（不要输入127.0.0.1）
* 编辑其他游戏配置文件
  * 添加keys、设置主机名、端口等。具体设置取决于游戏

更详细的可以看 [Windows部署官方文档](https://gitea.tendokyu.moe/Hay1tsme/artemis/src/branch/master/docs/INSTALL_WINDOWS.md) 或者 [Linux部署官方文档](https://gitea.tendokyu.moe/Hay1tsme/artemis/src/branch/master/docs/INSTALL_LINUX.md)

创建一下数据库表格
```bash
python dbutils.py create
```
启动 ARTEMIS 服务端
```bash
python index.py
```

## Docker环境

根据上面来设置，设置完成后在根目录打开终端
```bash
docker compose up -d
```

# 结尾
部署本地副总体来说比较简单，想要关闭服务器在终端输入
```bash
docker compose down
```
ARTEMIS的官方教程更全面，不过玩Perfotmai三音游直接这样像我这样配置就行了

之后有服务器开源我都会出教程的

但是请你不要拿着本地服去逃避在线服的封号，没有意义

也不要想着做这个收费技术支持，没什么技术含量的东西出去卖不嫌丢人

# 相关文档
1. [ARTEMIS教程](https://gitea.tendokyu.moe/Hay1tsme/artemis/src/branch/master/docs/INSTALL_WINDOWS.md)
2. [AquaDX自托管教程](https://github.com/MewoLab/AquaDX/blob/v1-dev/docs/self-hosting.md)
3. [Docker官方安装教程](https://docs.docker.com/engine/install/)
4. [MariaDB官方安装教程](https://mariadb.com/docs/server/mariadb-quickstart-guides/installing-mariadb-server-guide)