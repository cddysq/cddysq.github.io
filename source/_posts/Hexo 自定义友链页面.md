---
title: Hexo-NexT 自定义友链页面
categories:
  - Hexo
tags:
  - 美化
abbrlink: c34c6e60
date: 2020-01-29 14:25:10
---

NexT 主题自带的友链模块放在侧边栏下面，视觉上比较臃肿。这里我选择自定义一个友链页面。

我的友链页面效果：[点击此处查看](https://www.yileaf.com/links/)

<!--- more --->

## 新建links目录

在博客根目录下输入以下命令：

```shell
hexo new page links
```

- 这样会在博客根目录下的 `source`文件夹中，创建 `links`目录与默认页面`index.md`，此目录用与存放友链页面与样式文件等。

## 编写友链页面

以下为我的模板，请合理更改。复制以下代码，替换刚才生成的`links\index.md`文件中全部内容

```markdown
---
title: 友情链接
date: 2020-01-29 10:04:12
type: "links"
---

<link rel="stylesheet" href="link.css">

<div>
    <div class="links-content">
        <div class="link-navigation"></div>
    </div>
</div>

------

<div style="text-align:center;">
	<span class="with-love" id="animate1"><i class="fa fa-heart"></i></span>
	留言互换友链鸭o((>ω< ))o
	<span class="with-love" id="animate2"><i class="fa fa-heart"></i></span>
</div>

------

{% note success %}

## 友链格式

- 昵称：Rainbow Cat
- 网站地址：[https://www.yileaf.com/](https://www.yileaf.com/)
- 网站Logo/头像：[https://www.yileaf.com//images/avatar.png](https://www.yileaf.com//images/avatar.png)

{% endnote %}

<script src="link.js" type="text/javascript"></script>
```

> 我这里提前引入了下文讲到的`link.css`与`link.js`。

- 编写完页面模板后，打开主题配置文件`_config.yml` → 搜索`menu:` → 加载`links`目录，如下图：

  ![加载links](https://s2.ax1x.com/2020/01/29/1QiPy9.png)
  
- 如果网站使用的语言为`zh-CN`，默认没有对`links`进行翻译，在`themes\next\languages\zh-CN.yml`文件中`menu:`栏 → 添加`links: 友链`，如下图：

  ![添加翻译翻译](https://s2.ax1x.com/2020/01/29/1QirT0.png)

## 编写页面样式

在`links`目录下新建`link.css`用于存放友链页面css。我的样式代码如下：

```css
.links-content {
    margin-top: 1rem;
}

.link-navigation::after {
    content: " ";
    display: block;
    clear: both
}

.card {
    width: 130px;
    font-size: 1rem;
    padding: 0;
    border-radius: 4px;
    transition-duration: .15s;
    margin-bottom: 1rem;
    display: block;
    float: left;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12);
    background: #f5f5f5;
}

.card {
    margin-left: 16px
}

@media (max-width: 567px) {
    .card {
        margin-left: 16px;
        width: calc((100% - 16px) / 2)
    }

    .card:nth-child(2n+1) {
        margin-left: 0
    }

    .card:not(:nth-child(2n+1)) {
        margin-left: 16px
    }
}

@media (min-width: 567px) {
    .card {
        margin-left: 16px;
        width: calc((100% - 32px) / 3)
    }

    .card:nth-child(3n+1) {
        margin-left: 0
    }

    .card:not(:nth-child(3n+1)) {
        margin-left: 16px
    }
}

@media (min-width: 768px) {
    .card {
        margin-left: 16px;
        width: calc((100% - 48px) / 4)
    }

    .card:nth-child(4n+1) {
        margin-left: 0
    }

    .card:not(:nth-child(4n+1)) {
        margin-left: 16px
    }
}

@media (min-width: 1200px) {
    .card {
        margin-left: 16px;
        width: calc((100% - 64px) / 5)
    }

    .card:nth-child(5n+1) {
        margin-left: 0
    }

    .card:not(:nth-child(5n+1)) {
        margin-left: 16px
    }
}

.card:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04)
}

.card .thumb {
    width: 100%;
    height: 0;
    border-radius: 50%;
    padding-bottom: 100%;
    background-size: 100% 100% !important
}

.posts-expand .post-body img {
    margin: 0;
    padding: 0;
    border: 0
}

.card .card-header {
    display: block;
    text-align: center;
    padding: 1rem .25rem;
    font-weight: 500;
    color: #333;
    white-space: normal
}

.card .card-header a {
    font-style: normal;
    color: #2bbc8a;
    font-weight: 700;
    text-decoration: none;
    border: 0
}

.card .card-header a:hover {
    color: #d480aa;
    text-decoration: none;
    border: 0
}
```

## 编写存放友链的json

在`links`目录下新建`linklist.json`，内容格式如下：

```json
[
	{
		"nickname": "昵称",
		"avatar": "头像地址值",
		"site": "网站地址"
	},
    {
        "nickname": "Rainbow cat", 
		"avatar": "https://www.yileaf.com//images/avatar.png",
		"site": "https://www.yileaf.com/"
    }
]
```

> 以后添加新友链，直接在此文件中新增一段<font color='red'>json({})</font>即可

## 编写JS文件加载友链

在`links`目录下新建`link.js`用于读取`linklist.json`中的友链数据，并组装到友链页面中的`<div class="link-navigation"></div>`中，实现友链功能，代码如下：

```js
link = {
    init: function () {
        const that = this;
        /*加载 linklist.json 文件路径*/
        $.getJSON("linklist.json",
            function (data) {
                that.render(data);
            });
    },
    render: function (data) {
        let html, nickname, avatar, site, li = "";
        for (let i = 0; i < data.length; i++) {
            nickname = data[i].nickname;
            avatar = data[i].avatar;
            site = data[i].site;
            // 将数据拼接成html
            li += '<div class="card">' + '<a href="' + site + '" target="_blank">' + '<div class="thumb" style="background: url( ' + avatar + ');">' + '</div>' + '</a>' + '<div class="card-header">' + '<div><a href="' + site + '" target="_blank">' + nickname + '</a></div>' + '</div>' + '</div>';

        }
        $(".link-navigation").append(li);
    }
};
link.init();
```

## 参考

- [Hexo-NexT 新增友链](https://tding.top/archives/73ce4e7.html)