---
title: Hexo 开启字数统计及阅读时长
categories:
  - Hexo
tags:
  - 美化
abbrlink: 21f27722
date: 2020-01-28 20:27:30
---

项目地址：https://github.com/theme-next/hexo-symbols-count-time

## 安装插件

在博客根目录执行以下命令：

```shell
npm i hexo-symbols-count-time
```

<!-- more -->	

## 	配置插件

打开网站根目录下的`_config.yml`，加入以下配置(一般放在最后)：

```yaml
symbols_count_time:
  symbols: true # 文章字数
  time: true # 阅读时长
  total_symbols: true # 所有文章总字数
  total_time: true # 所有文章阅读中时长
```

打开`themes\next\_config.yml`主题配置文件，搜索`symbols_count_time:`进行合理配置：

```yaml
symbols_count_time:
  separated_meta: true  # 是否换行显示 字数统计 及 阅读时长
  item_text_post: true  # 文章 字数统计 阅读时长 使用图标 还是 文本表示
  item_text_total: false # 博客底部统计 字数统计 阅读时长 使用图标 还是 文本表示
  awl: 4
  wpm: 275
```



- 其中`awl`（Average Word Length）的数值是设定多少字符统计为一个字（word），中文博客需要设置为 2
- `wpm`（Words Per Minute）是你的阅读速度，多少字（word）统计为阅读时长一分钟。以下是官方文档里的一些阅读速度参考数据：
  - 慢速：200
  - 中速：275（默认）
  - 快速：350
- 中文用户的贴心提示：因为在中文中一个词语的平均长度在 1.5 字左右，所以一般建议设置为`awl=2`，`wpm=300`。

合理配置后在博客根目录执行`hexo clean && hexo s --debug`命令，回到浏览器访问即可看到效果。