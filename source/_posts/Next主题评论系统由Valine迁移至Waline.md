---
title: Next主题评论系统由Valine迁移至Waline
categories:
  - Hexo
tags:
  - 美化
  - Waline
  - website
abbrlink: 3368d4d6
date: 2021-07-26 16:29:57
---

由于之前使用的Valine评论系统，在看到网上大量关于Valine垃圾评论的消息后，决定迁移到Waline评论系统。

## 初始化Waline

- 初始化Waline教程请参阅官方教程：[点击访问Waline初始化教程](https://waline.js.org/guide/get-started.html)，关于leancloud的相关操作可参考我的这篇 [Hexo 集成 Valine 评论系统](https://blog.yileaf.com/posts/74e90fd6/)。

- 按照官方文档部署成功后可参照下图所示配置自定义域名。

<!-- more -->
  <img src="https://cdn.jsdelivr.net/gh/moyuhs/images/20210729140734.png" alt="" style="zoom:60%;" />

- 上图Domains下的域名即为你的Waline服务地址，请访问 `Waline服务地址/ui/register` 进行注册。首个注册的人会被设定成管理员。

## Next 主题安装 Waline 

- 在博客根目录下执行[Waline插件](https://github.com/rqh656418510/hexo-waline-next)安装命令：

  ```bash
  npm i hexo-waline-next --save
  ```

- 打开主题配置文件填写Waline相关配置。

  ```yaml
  # Waline
  # For more information: https://waline.js.org, https://github.com/lizheming/waline
  waline:
    enable: true #启用Waline
    serverURL:  # Waline服务地址
    avatar: wavatar # 默认头像
    avatarCDN: https://sdn.geekzu.org/avatar/ # 头像cdn加速地址
    meta: [nick, mail, link]  # Custom comment header
    requiredMeta: [nick, mail] # Set required fields: [nick] | [nick, mail]
    pageSize: 10   # Pagination size
    lang: zh-cn  # Language, available values: en, zh-cn
    visitor: true # 文章阅读统计
    comment_count: true # If false, comment count will only be displayed in post page, not in home page
    libUrl: https://cdn.jsdelivr.net/npm/@waline/client/dist/Waline.min.js # waline client cdn
    # 自定义加载emoji,支持内容参见 https://cdn.jsdelivr.net/gh/walinejs/emojis/
    emoji:  [
      'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
      'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/bilibili',
      'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tw-emoji',
      'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/qq',
    ]
    locale:
      placeholder: ヾﾉ≧∀≦)o来啊，快活啊!   # 默认输入框显示内容older
      admin: 博主
      nick: 昵称
      mail: 邮箱
      link: 网址
    copyright: true # 是否显示页脚版权信息    
    dark: auto # Dark mode css selector, for more information: https://waline.js.org/client/basic.html#dark 
  ```

## 配置评论通知

参考至[官方文档](https://waline.js.org/guide/server/notification.html#%E9%82%AE%E4%BB%B6%E9%80%9A%E7%9F%A5)，由于回复评论者仅支持邮件通知，本站采用该方式进行配置演示。

1. 根据 [这里](https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json) 查看所有支持的运营商，本次选择QQ邮箱。

2. 开通QQ邮箱SMTP服务，并获取授权码, 具体操作请Google。

3. 将以下邮件通知环境变量依次加入vercel中部署的waline服务，示例如下：

   ```yaml
   # ------ 必填 ------
   SMTP_SERVICE:QQ #SMTP 邮件发送服务提供商
   SMTP_USER: ****.qq.com #QQ邮箱账号
   SMTP_PASS: #第二步生成的授权码
   SITE_NAME: #网站名称
   SITE_URL: https://.....com #网站地址
   # ------ 推荐填写 ------
   AUTHOR_EMAIL: #博主邮箱,该邮箱评论不会通知你
   # ------ 选择性填写 ------ 参考源码:https://github.com/walinejs/waline/blob/master/packages/server/src/service/notify.js
   MAIL_SUBJECT_ADMIN: 您的博客『{{site.name}}』收到了新评论 🕊  #发送给博主的新邮件通知标题
   MAIL_SUBJECT: {{parent.nick}}，您在博客『{{site.name}}』上的评论收到了回复 📨 #发送给评论者的邮件标题 
   MAIL_TEMPLATE: #发送给评论者的邮件正文，我的模板如下
   ```

   ```html
   <div style="border-top:2px solid #12ADDB;box-shadow:0 1px 3px #AAAAAA;line-height:180%;padding:0 15px 12px;margin:50px auto;font-size:12px;">
       <h2 style="border-bottom:1px solid #DDD;font-size:14px;font-weight:normal;padding:13px 0 10px 8px;">
           您在博客<a style="text-decoration:none;color: #12ADDB;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的评论有了新的回复💖
       </h2>
       {{parent.nick}}，您曾发表评论：
       <div style="padding:0 12px 0 12px;margin-top:18px">
           <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{parent.comment | safe}}</div>
           <p><strong>{{self.nick}}</strong>回复说：</p>
           <div style="background-color: #f5f5f5;padding: 10px 15px;margin:18px 0;word-wrap:break-word;">{{self.comment | safe}}</div>
           <p>您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank">查看回复的完整內容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb" href="{{site.url}}" target="_blank">{{site.name}}</a>。</p>
           <br/>
       </div>
       <div style="border-top:1px solid #DDD; padding:13px 0 0 8px;">
           <p style="text-align: right;">该邮件为系统自动发送的邮件，请勿直接回复❌</p>
       </div>
       <br/>
   </div>
   ```

   ![环境变量添加示例](https://cdn.jsdelivr.net/gh/moyuhs/images/20210730112843.png)

4. 重新部署waline服务。
5. 邮箱收发效果图如下：
   - 博主方
   
     <img src="https://cdn.jsdelivr.net/gh/moyuhs/images/20210730145048.png" alt="" style="zoom: 33%;" />
   
   - 评论方
   
      <img src="https://cdn.jsdelivr.net/gh/moyuhs/images/20210730150250.png" alt="" style="zoom: 33%;" />
   
   - 网页端
   
       <img src="https://cdn.jsdelivr.net/gh/moyuhs/images/20210730150516.png" alt="" style="zoom: 80%;" />

