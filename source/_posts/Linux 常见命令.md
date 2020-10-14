---
title: Linux 常见命令
categories:
  - Linux
tags:
  - Linux
abbrlink: fa29a82
date: 2020-10-13 17:15:29
---

# 基础命令

- `ls -l `：显示不隐藏的文件与文件夹的详细信息
- `tar -zxf [文件名]` ：解压文件到当前文件夹
- `pwd `：显示当前所在路径
- `cd ~` ： 回到用户主目录（/root）
- `cp [文件名]  [指路径]`： 将文件拷贝到指定目录下

<!-- more -->

# 查询相关

## ps 命令

- 解释：`ps`是Linux下最常用的也是非常强大的进程查看命令。
- 语法：`ps [options]`

| options | 解释                                     |
| ------- | ---------------------------------------- |
| -e      | 显示所有进程，环境变量                   |
| -f      | 全格式                                   |
| -h      | 不显示标题                               |
| -l      | 长格式                                   |
| -w      | 宽输出                                   |
| -a      | 显示终端上地所有进程，包括其他用户地进程 |
| -r      | 只显示正在运行地进程                     |
| -x      | 显示没有控制终端地进程                   |

## grep 命令

- 解释：`grep` 命令从文本文件或管道数据流中筛选匹配的行及数据。
- 语法：`grep [OPTION]... PATTERN [FILE]...`

| options | 解释                       |
| ------- | -------------------------- |
| -v      | 显示不包含匹配文本的所有行 |

## find 命令

- 解释： `find` 命令用来在指定目录下查找文件。
- 语法：`find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|opt|exec] [path...] [expression]`

| expression                | 解释                                         |
| ------------------------- | -------------------------------------------- |
| -name name, -iname name : | 文件名称符合 name 的文件。iname 会忽略大小写 |
| -cmin n                   | 在过去 n 分钟内被修改过                      |

## dmidecode 命令

- 解释：在 Linux 系统下获取有关硬件方面的信息。
- 语法：`dmidecode [OPTIONS]`

| options    | 解释                      |
| ---------- | ------------------------- |
| -t（type） | 只显示指定条目的信息      |
| -s         | 只显示指定DMI字符串的信息 |

## 案例：

1. 查看指定进程：`ps -ef | grep 服务名`

    ```sh
    # ps -ef | grep redis
    UID       PID   PPID    C     STIME    TTY       TIME       CMD
    root      2650     1    0     Jun12     ?        00:01:25   ./redis-server *:6379
    root      3564  3498    0     16:55    pts/0     00:00:00   grep --color=auto redis
    UID   ：该程序被该 UID 所拥有
    PID   ：这个程序的 ID 
    PPID  ：其上级父程序的ID
    C     ：CPU使用的资源百分比
    STIME ：系统启动时间
    TTY   ：登入者的终端机位置
    TIME  ：使用掉的CPU时间
    CMD   ：所下达的指令
    注:中间的 | 是管道命令 是指ps命令与grep同时执行
    ```
    
2. 查找文件路径：`find / -name 文件名`

    ```sh
    find / -name test.txt # 查询根目录下名为test.txt的文件
    ```
    
3. 查看内存相关的硬件信息：`dmidecode -t memory`

   ```sh
   # 查看机器内存信息，只显示大小并过滤掉未安装模块
   dmidecode -t memory | grep Size: | grep -v "No Module Installed" 
   # 主要参数
   Maximum Memory Module Size: 32768 MB # 单条支持32G
   Maximum Total Memory Size: 491520 MB # 最大支持480G
   Installed Size: 8192 MB (Single-bank Connection) # 卡槽安装8G单通道
   Enabled Size: 8192 MB (Single-bank Connection) # 启用8G单通道
   Installed Size: 2048 MB (Double-bank Connection) # 卡槽安装2G双通道
   Enabled Size: 2048 MB (Double-bank Connection) # 启用2G单通道
   Installed Size: Not Installed # 卡槽未安装
   Enabled Size: Not Installed # 未启用
   # 机器总内存 = 10G
   ```

# 编辑相关

## vim 命令

- 解释：`vim` 强大的编辑器 

## 案例：

```sh
1.编辑文件：vim + 文件名 （当前目录下存在该文件则打开，不存在进行新建） 

/关键字 # 文件内容中的关键字搜索

2.按 i 正式进入编辑模式
3.按 esc 退出编辑
:q!  不保存文件，强制退出vim命令
:wq  保存文件，退出vim命令
:w   保存文件，不退出vim命令
```

# 删除相关

## rm 命令

- 解释：Linux系统的删除命令
- 语法：`rm [options] [参数]`   (参数为目录或文件)

| options | 解释     |
| ------- | -------- |
| -r      | 递归删除 |
| -f      | 强行删除 |

## 案例：

1. 删除整个系统：`rm -rf /*` 
   -  `/`为系统根目录，`/*`为系统根目录下所有文件的意思。