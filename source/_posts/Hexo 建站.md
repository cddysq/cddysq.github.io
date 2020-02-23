---
title: Hexo 建站
categories:
  - Hexo
tags:
  - 建站
  - 美化
top: true
date: 2017-01-24 00:00:00
---


## 安装前提

安装 Hexo 相当简单，只需要先安装下列应用程序即可：

- [Node.js](http://nodejs.org/) (Node.js 版本需不低于 8.10，建议使用 Node.js 10.0 及以上版本)
- [Git](http://git-scm.com/)

## 搭建 Hexo

在命令行中通过 npm 来安装 Hexo：

```shell
npm install -g hexo-cli
```

`-g` 表示全局安装，会将 Hexo 命令加入环境变量中，以使其在 cmd 下有效。

新建博客目录，然后在该路径下执行初始化命令：

```shell
hexo init
```

执行完毕后，将会生成以下文件结构：

```
├── node_modules       //依赖安装目录
├── scaffolds          //模板文件夹，新建的文章将会从此目录下的文件中继承格式
|   ├── draft.md         //草稿模板
|   ├── page.md          //页面模板
|   └── post.md          //文章模板
├── source             //资源文件夹，用于放置图片、数据、文章等资源
|   └── _posts           //文章目录
├── themes             //主题文件夹
|   └── landscape        //默认主题
├── .gitignore         //指定不纳入git版本控制的文件
├── _config.yml        //站点配置文件          
├── package.json
└── package-lock.json
```

在根目录下执行如下命令启动 hexo 的内置 Web 服务器

```shell
hexo g # 生成
hexo s # 启动服务
```

打开浏览器访问 `http://localhost:4000` 即可看到内容。

## 安装 Next 主题

> 此教程博客根目录皆为blog，站点配置文件皆为blog/_config.yml

在博客根目录下执行以下命令下载主题文件：

```shell
git clone https://github.com/theme-next/hexo-theme-next.git themes/next
```

打开站点配置文件，搜索 `theme` 字段的值修改为 `next`。

```yml _config.yml
theme: next
```

清除缓存并重启服务，刷新浏览器查看默认效果如下图：

```shell
hexo clean & hexo s --debug
```

![Next 默认效果](https://s2.ax1x.com/2020/02/22/3Q45Wj.png)

- 参考此文章[主题版本管理](https://wylu.github.io/posts/6f2f62d0/)

## 数据文件

自从 NexT-7.3.0 开始，官方推荐采用数据文件将配置与主题分离，这样我们可以在不修改主题源码的同时完成选项配置、自定义布局、自定义样式，便于后续 NexT 版本更新。

### 外挂主题配置

> 默认主题配置文件皆为blog/themes/next/_config.yml

我们可以将所有主题配置放在一个位置（`blog/source/_data/next.yml`）。这样就无需编辑默认主题配置文件。

具体步骤：

1. 在 `blog/source/_data` 目录中创建 `next.yml`（如果`_data` 不存在，则创建目录）。
2. 将**所有 NexT 主题选项**从主题配置文件复制到 `blog/source/_data/next.yml` 中。
3. 在 `next.yml` 搜索 `override` 选项设置为 true。
   - 我们只需和编辑主题配置一样，配置 `next.yml` ，会自动覆盖默认主题配置。

### 外挂语言配置

我们原来是通过配置主题下的 `languages` 目录中的 `zh-CN.yml` 文件来对菜单等进行中文翻译的，现在我们可以通过在 `hexo/source/_data/` 下新建数据文件 `languages.yml`，修改翻译配置如下：

```yml languages.yml
zh-CN:
    menu:
      home: 首页
      archives: 归档
      categories: 分类
      tags: 标签
      about: 关于
      links: 友链
      search: 搜索
      schedule: 日程表
      sitemap: 站点地图
      commonweal: 公益 404
```

### 外挂样式配置

我们只需要把原来的 `blog/next/source/css/_custom/_custom.styl` 中的全部自定义样式放到 `blog/source/_data/styles.styl` 即可。

然后在主题配置文件中搜索 `custom_file_path` 选项，取消 `styles.styl` 的注释：

```yml next.yml
custom_file_path:
  #head: source/_data/head.swig
  ......
  style: source/_data/styles.styl # 开启自定义样式文件加载
```



## 配置主题

> 下文修改主题配置，皆为修改 `next.yml` 中的选项

### 主题风格修改

Next 默认主题风格为 Muse，用户可以在主题配置文件中修改 `scheme` 字段以选择自己喜欢的主题风格：

```yml source/_data/next.yml
# Schemes
#scheme: Muse
#scheme: Mist
scheme: Pisces
#scheme: Gemini
```

### 修改网站 Favicon

Favicon 即浏览器标签左侧的图标。下载自己喜欢的图标置于 `blog\source\icon\` 目录下，命名方式参考主题配置文件中的 `favicon` 字段。

```yml next.yml
favicon:
  small: /icon/favicon-16x16.png # 小图标
  medium: /icon/favicon-32x32.png # 大图标
  apple_touch_icon: /icon/apple-touch-icon-next.png # 苹果图标
  safari_pinned_tab: /icon/favicon-48x48.png # safari浏览器标签页图标
  #android_manifest: /images/manifest.json
  #ms_browserconfig: /images/browserconfig.xml
```

### 设置头像

将头像放在 `blog/source/images` 路径下。打开主题配置文件，搜索 `avatar` 字段进行修改：

```yml next.yml
# Sidebar Avatar
avatar:
  url: images/avatar.png # 头像路径
  rounded: true # 使用圆形头像
  rotated: true # 开启头像旋转
```

### 设置菜单

菜单配置项的格式为 `key: /link/ || icon`，包含三个部分，第一是菜单项的名称，第二是菜单项的链接，第三是菜单项对应的图标。

- key

  key 为菜单项显示的名称（如`home`，`archives`等），Hexo 首先会根据 key 在 languages 文件夹找对应语言的翻译，如果找到则会加载该翻译，如果找不到，将使用 key 本身的值。其中 key 的值大小写敏感。

- link

  link 是你网站内相对网址的目标链接。

- icon

  FontAwesome 图标的名称。NexT 使用的是 [Font Awesome](https://fontawesome.com/) 提供的图标， Font Awesome 提供了 600+ 的图标，可以满足绝大的多数的场景。

打开主题配置文件，搜索 `menu` 选项，进行相应配置：

```yml next.yml
menu:
  home: / || home
  categories: /categories/ || th
  archives: /archives/ || archive
  tags: /tags/ || tags
  links: /links/ || link
  about: /about/ || user
  #schedule: /schedule/ || calendar

menu_settings:
  icons: true # 显示菜单图标
  badges: true  # 显示数量统计
```

- 开启对应菜单后，需在 `blog/source` 下新建对应分类文件夹，并添加 `index.md`

### 添加社交链接

打开主题配置文件，搜索 `social` 选项，进行对应更改：

```yml next.yml
social:
  简书: https://www.jianshu.com/u/ec346a4e0d4e || heartbeat
  GitHub: https://github.com/CodeHaotian || github
  Telegram: https://t.me/yileaf || telegram
  E-Mail: mailto:2056423011@qq.com || envelope
```

### 开启代码块复制功能

在主题配置文件中，搜索 `codeblock` 进行如下修改：

```yml next.yml
# Add copy button on codeblock
  copy_button:
    enable: true # 开启复制
    show_result: true # 显示复制结果
    style: flat # 风格
```



### 回到顶部按钮显示百分比

在主题配置文件中，搜索 `back2top` 选项，进行如下更改：

```yml next.yml
back2top:
  enable: true # 显示回到顶部按钮
  sidebar: false # true，按钮显示在侧边栏；false，按钮显示在右下角
  scrollpercent: true # 按钮上显示百分比
```

### 添加版权协议

在主题配置文件中，搜索 `creative_commons` 选项，进行如下修改：

```yml next.yml
creative_commons:
  license: by-nc-sa # 协议名
  sidebar: false
  post: true # 开启版权声明
  language: deed.zh # 协议语言
```

默认版权侧边栏是红色的，我这里在样式文件中，修改侧边栏样式：

```yml styles.styl
//版权声明侧边栏颜色
.post-copyright {
    margin: 2em 0 0;
    padding: 0.5em 1em;
    border-left: 3px solid #81a6ed;
    background-color: #f9f9f9;
    list-style: none;
}
```

### 底部标签修改

底部标签默认使用 `#` 当前缀，打开主题配置文件搜索`tag_icon`：

```yml next.yml
tag_icon: true # 改用图标前缀
```

### 底部页脚修改

打开主题配置文件搜索`footer`：

```yml next.yml
footer:  # 底部信息区
  since: 2017 # 建站时间
  icon:
    name: fas fa-heartbeat # 图标名称,Icon name in Font Awesome
    animated: true # 开启动画
    color: "#ff0000" # 图标颜色
    
  copyright:
  
  powered:
    enable: false  # 隐藏由 Hexo 强力驱动
    version: false # 隐藏 Hexo 版本号

  theme:
    enable: false # 隐藏所用的主题名称
    version: false # 隐藏主题版本号
```



## 配置站点

在站点配置文件中完善网站基本信息：

```yml _config.yml
# Site 站点信息
title: 且听风吟 # 站点名称
subtitle: 🕊️ gu~gu~gu # 站点副标题
description: 一瞥便是惊鸿 芳华乱了浮生 # 站点描述
keywords: Java,Web # 关键字
author: Rainbow Cat # 作者名称
language: zh-CN # 网站语言
timezone: '' # 时区
```