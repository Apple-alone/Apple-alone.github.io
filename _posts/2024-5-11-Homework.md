---
layout: post
title: "如何搭建Github Pages"
date:   2024-5-11
tags: [作业？？？]
comments: true
author: Apple
---
# Github Pages食用教程

# 目录

- [1. 什么是Github Pages](#1-什么是github-pages)
- [2. 如何搭建](#2-如何搭建)
  - [2.1. 登录或注册GitHub账号](#21-登录或注册github账号)
  - [2.2. 创建Github存储库(Rope)](#22-创建github存储库rope)
  - [2.3. 搭建网页文件](#23-搭建网页文件)
  - [2.4. 修改文件](#24-修改文件)
    - [2.4.1 修改\_config.yml文件](#241-修改_configyml文件)
  - [2.4.2 修改about.md文件](#242-修改aboutmd文件)
  - [2.5. 写文章](#25-写文章)
- [3. 扩展](#3-扩展)
  - [3.1. 自定义域名](#31-自定义域名)
  - [3.2. 自定义404页面](#32-自定义404页面)
- [4. 结束](#4-结束)
   

# 1. 什么是Github Pages

GitHub Pages 是一个免费的静态网站托管服务，由 GitHub 提供。它允许用户直接从 GitHub 仓库中托管网站，不需要服务器设置或复杂的部署过程。

GitHub Pages 专门用于托管静态内容，如 HTML、CSS、JavaScript 文件和图片。（所以不支持动态网站）

它拥有HTTPS加密，非常safe,不过它对HTML小白来说还是很不友好的（比如我）

![](https://apple-alone.github.io/images/emmm.jpg)

算了，我不想写介绍了，自己去看[官方文档](https://docs.github.com/zh/pages/getting-started-with-github-pages/about-github-pages?ref=cyberhost)，自己好好看看

![](https://apple-alone.github.io/images/hu.jpg)

# 2. 如何搭建

这个很简单啊，这都不会（）

咳咳，发个颠而已，现在开始教程

## 2.1. 登录或注册GitHub账号

这都不会怎么做啊，别学了（FW）

## 2.2. 创建Github存储库(Rope)

借助 GitHub 平台搭建网站，首先就要有一个网站仓库

因为是搭建网站，所以rope name有格式

rope name是 username.github.io，不能改".gitHub.io"，username（用户名），这个改成自己GitHub的用户名

图片演示

![](https://apple-alone.github.io/images/1.png)

![](https://apple-alone.github.io/images/2.png)

好的，想必你看懂了吧

什么，你没看懂！那我可不管你，我要讲下一步了

## 2.3. 搭建网页文件

最头痛的了来了，Tonight会掉一大把头发

HTML语言，CSS语言,JS语言，YML语言。好好好，24小时套餐都救不了你

那就Fork别人仓库吧，又快又省时。

好的，我的仓库给你用

我的仓库是基础的Jekyll。来吧，Fork我的仓库吧

[仓库地址](https://github.com/Apple-alone/Fork-me)

图片演示如何下载ZIP

![](https://apple-alone.github.io/images/3.png)

下载后解压，接着下一步

## 2.4. 修改文件

### 2.4.1 修改_config.yml文件

_config.yml 文件是博客网站的核心配置文件，里面包含了你想要显示在网站上的各种构造信息。下面我会一步一步告诉你哪些信息需要改。

* 网站名称和网站描述

这个根据你自己的喜好来设置，不一定要仿造我的模式。比如你可以给你的网站取一个好听点的名字，网站描述也可以是简短的自我介绍或个性签名等任何你想表达的内容。

> name:"头像下面的标题"
>
> description:"副标题"

修改/添加avatar和favicon

> avatar:头像图片地址
>
>favicon:网页图标图片地址

示例

![](https://apple-alone.github.io/images/4.png)

![](https://apple-alone.github.io/images/5.png)

avatar代表头像，后面的链接是你想显示在页面的头像图片的url。favicon指网站图标，即显示在浏览器标签页和收藏夹里的Logo，通常以32*32像素大小的.ico 图片为宜，也可以不设置。注意不要直接用已经注册过的logo来当作自己的网站图标，否则有可能涉及到侵权问题。我的网站图标就是我自己设计的,花了很长时间。

个人网站里的所有图片不是上传到Github仓库里就可以显示到页面上了，需要用到图床。我用的是PicGo，只要与Github仓库绑定就可以实现上传，且可以一键复制为 Markdown形式，方便写文时插入图片。（感觉在打广告）

PicGo不会用就查教程吧，[bilibili教程](https://www.bilibili.com/video/BV1TE411w758/?spm_id_from=333.337.search-card.all.click&vd_source=704171dfa5eca7ac05324c188f062a04)

注：不是我的视频，我有空再做

* 脚注和网址

![](https://apple-alone.github.io/images/6.png)

这个很好改吧......

* 社交或联系方式

![](https://apple-alone.github.io/images/7.png)

这个有就填，没有不用填，你也可以都不填。

## 2.4.2 修改about.md文件

about.md里的内容是展示在“关于”页面上的。

写上自己的介绍或者其他

## 2.5. 写文章

在_post文件夹里新建一个md文件，文章文件的命名也是有讲究的，请按照下面的例子呈现的格式命名：

>2024-5-11-xxx_xxx_xxx.md

还有一点需要注意，每篇文章开头记得附上说明，格式如下：

>**---**

>layout: post

>title: "文章标题"

>date:   2024-5-11

>tags: [tag1, tag2]

>comments: true

>author:  作者名字

> --**-**

date 是写作日期，注意格式必须遵守 YYYY-MM-DD 才可以。

tags 是文章标签，可以有一个或多个。

comments不用管。本来打算用 Gitalk 做评论系统，但是一直连不上那边的服务器，不但无法使用评论，还拖慢网页加载速度，十分影响用户体验。我用注释的形式将它屏蔽了（ps：其实由 GitHub Pages 提供域名的个人网站并非完全由我们自己控制，而是借助了 Jekyll 静态网站生成器，它主要是提供一些部署上的支持，如果没有它，我们的网站就无法生成。所以我们要严格按照规定来，不能随便乱动仓库里的文件结构）

# 3. 扩展

## 3.1. 自定义域名

首先你要有一个域名，去腾讯云或阿里云买.com 75元一个月

![](https://apple-alone.github.io/images/8.png)

![](https://apple-alone.github.io/images/9.png)

这里是因为还没有进行域名解析的原因，所以我们可以回到腾讯域名管理那里，去进行域名的解析，从而通过域名正常访问对应的服务器。

Save报错是因为还没有进行域名解析的原因，所以回到腾讯域名管理那里，去进行域名的解析，从而通过域名正常访问对应的服务器。

如果还有问题看[这个](https://cloud.baidu.com/article/2760793)，因为我没域名不知道，我只知道如何绑定域名（之前试过一次，没有买域名，直接报Not Found了）

## 3.2. 自定义404页面

在仓库里创建一个404.html，在404.html写上自己的创意，请看[我的网站的404页面](apple-alone.github.io/404)

# 4. 结束

完成文章已经是第二天了（5.12），我要休息了

                                                                          By 梁家振
