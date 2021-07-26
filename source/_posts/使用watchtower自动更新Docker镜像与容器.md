---
title: 自动更新 Docker 镜像与容器
categories:
  - Docker
tags:
  - 搬运
abbrlink: 166bdcf1
date: 2020-02-12 18:47:49
---

## 前言

在服务器上部署 Docker 容器有一种在手机上装 App 的感觉，但 Docker 容器并不会像手机 App 那样会自动更新，而如果我们需要更新容器一般需要以下四个步骤：

- 停止容器：`docker stop <CONTAINER>`
- 删除容器：`docker rm <CONTAINER>`
- 更新镜像：`docker pull <IMAGE>`
- 启动容器：`docker run <ARG> ... <IMAGE>`

停止容器这个步骤可以在删除容器时使用 `-f` 参数来代替，即使这样还是需要三个步骤。如果部署了大量的容器需要更新使用这种传统的方式工作量是巨大的。

[Watchtower](https://github.com/containrrr/watchtower) 是一个可以实现自动化更新 Docker 基础镜像与容器的实用工具。它监视正在运行的容器以及相关的镜像，当检测到 `reg­istry` 中的镜像与本地的镜像有差异时，它会拉取最新镜像并使用最初部署时相同的参数重新启动相应的容器，一切好像什么都没发生过，就像更新手机上的 App 一样。

<!-- more-->

## 快速开始

Watch­tower 本身被打包为 Docker 镜像，因此可以像运行任何其他容器一样运行它：
```bash
docker run -d \
    --name watchtower \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower
```
然后所有容器都会自动更新，也包括 Watch­tower 本身。

## 自动清除旧镜像

官方给出的默认启动命令在长期使用后会堆积非常多的标签为 `none` 的旧镜像，如果放任不管会占用大量的磁盘空间。要避免这种情况可以加入 `--cleanup` 选项，这样每次更新都会把旧的镜像清理掉。
```bash
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup
```

## 选择性自动更新

某些容器可能需要稳定的运行，经常更新或重启可能会造成一些问题，这时我们可以使用一些参数来选择与控制容器的更新。

假设我们需要更新 `nginx`、`redis` 这两个容器，我们可以把容器名称追加到启动命令的最后面，就像下面这个例子:
```bash
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    nginx redis
```
如果您需要排除某些容器，可以将 `com.centurylinklabs.watchtower.enable` 这个 `la­bel` 设置为 `false`。即在 `docker run` 命令中加入 `--label=com.centurylinklabs.watchtower.enable=false` 参数。在下面这个例子中，除了 `nginx`、`redis` 以外的容器都会自动更新：
```bash
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --label=com.centurylinklabs.watchtower.enable=false \
    containrrr/watchtower \
    --cleanup \
    nginx redis
```

## 设置自动更新频率

默认情况下 Watch­tower 每 5 分钟会轮询一次，如果你觉得这个频率太高了可以使用如下选项来控制更新的频率：

* `--interval`, `-i` - 设置间隔更新时间。默认 300 秒（ 5 分钟）

* `--schedule`, `-s` - 设置定时更新时间。格式为 [Cron 表达式](https://github.com/containrrr/watchtower/issues/87)  ，比如`--schedule "0 0 4 * * *"`，参数对照表如下：

    | Field name   | Mandatory? | Allowed values  | Allowed special characters|
    |----------   | ---------- | --------------  | --------------------------|
    |Seconds      | Yes        | 0-59            | * / , -|
    |Minutes      | Yes        | 0-59            | * / , -|
    |Hours        | Yes        | 0-23            | * / , -|
    |Day of month | Yes        | 1-31            | * / , - ?|
    |Month        | Yes        | 1-12 or JAN-DEC | * / , -|
    |Day of week  | Yes        | 0-6 or SUN-SAT  | * / , - ?|

比如每小时检查一次更新：
```bash
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    -i 3600
```

## 手动更新

前面的使用方式都是让 Watch­tower 以 `detached`（后台）模式在运行并自动更新容器，而 Watch­tower 也支持以 `foreground`（前台）模式来使用，即运行一次退出并删掉容器，来实现手动更新容器。这对于偶尔更新一次那些在自动更新中被排除的容器非常有用。

对于 `foreground` 模式，需要加上 `--run-once` 这个专用的选项。下面的例子 Docker 会运行一次 Watch­tower 并检查 `redis` 容器的基础镜像更新，最后删掉本次运行创建的 Watch­tower 容器。
```bash
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    --run-once \
    redis
```
同样的手动更新你也可以排除某些容器，更新其它的容器：
```bash
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --label=com.centurylinklabs.watchtower.enable=false \
    containrrr/watchtower \
    --cleanup \
    --run-once \
    redis
```

## 案例演示

每周凌晨1点自动检测`nondanee/unblockneteasemusic`镜像启动的`unmusic`容器，并自动更新

```bash
docker run -d \
    --name watchtower \
    --restart unless-stopped \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    -s "0 0 1 * * 0" \
    unmusic
```

更新前：

![更新前](https://s2.ax1x.com/2020/02/12/1buBes.png)

更新后：

![更新后](https://s2.ax1x.com/2020/02/12/1bKZ0s.png)

## 后记

- 启动命令 `-v` 参数绑定的目录不能修改，watchtower 需要与 docker 进行通信。关于 `/var/run/docker.sock` 的作用可[点击此处进行查看](https://medium.com/better-programming/about-var-run-docker-sock-3bfd276e12fd)。
- 设定的更新名为 `NAMES` 列容器名，非镜像名。
- 更多功能，如电子邮件通知、监视私人注册表的镜像、更新远程主机上的容器等，请访问 [Watchtower 官方文档](https://containrrr.github.io/watchtower/) 进行查阅。

## 参考

- 原文作者：P3TERX
- 原文链接 → https://p3terx.com/archives/docker-watchtower.html
