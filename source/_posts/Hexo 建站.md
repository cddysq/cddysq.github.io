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

