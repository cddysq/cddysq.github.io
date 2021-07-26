---
title: Java 杂谈
categories:
  - Java
tags:
  - 杂谈
sticky: 2
abbrlink: 3f8cfd13
date: 2020-02-17 14:07:53
---

# 注意事项

- 除文章内容特殊说明外，版本皆推荐使用官方发行最新稳定版
- 文章内容仅供参考，不做任何保证
- ~~xxx~~ : 此标记为可跳过
- 如对本文有任何建议或提问皆可留言或联系本人
- 本文初始版本 1.0 → 目前 1.3

<!-- more -->

# Java学习路线

## 基础知识

- 基本网络知识：TCP/IP HTTP/HTTPS

- 基本算法

- 基础API认知：Java SE API → {% label success@JDK11%}

  | 概括               | 部分细节                     |
  | ------------------ | ---------------------------- |
  | Java生态体系       |                              |
  | Java程序的基本结构 | 对象、类、包、方法、引用.... |
  | Java的数据类型     | 类型转换、精度丢失....       |
  | Java的运算系统     | 各种运算符....               |
  | 面向对象           | 封装、继承、多态....         |
| Java的异常体系     | 合理处理异常                 |
  | Java的IO体系       | BIO、NIO、AIO、Stream...     |
  | 多线程             | 线程同步、死锁、安全....     |
  | 反射               | 动态代理....                 |
  | Lambda             | 理解函数式编程               |
  | 注解               | 理解注解的原理               |

- 基本的设计模式

- <font color="red">单元测试必会</font>。好的项目测试代码少不了，如果你留意过Github上的顶级开源项目，那么你会发现它的测试代码和业务代码接近 1:1 。

----

## Java Web 基础

{% label info@请先选择一款喜欢的开发工具，并熟练使用 Debug  %}

- ~~HTML5、CSS3、JavaScript~~

- Java EE 规范

- Servlet

  | 知识点   |
  | -------- |
  | Request  |
  | Response |
  | Cookie   |
  | Session  |
| Filter   |
  | Listener |

- Tomcat

- 浏览器调试网页。F12查看请求路径或者状态码等快速定位异常。

---

## 工具方面

- 操作系统：Linux （CentOS\Ubuntu\...）
- 代码管理：~~SVN~~ / <font color="red">Git</font> → 必须熟练
- 持续集成 （CI/CD）：Jenkins
- Java项目管理工具：Maven / Gradle
- 压力测试：Apache JMeter

---

## 框架方面

###  数据库

- SQL：MySQL / Oracle / Postgre SQL
- NoSQL：Redis / MongoDB / Memcached / Elasticsearch

> 到此即可寻找开源项目配合框架分析学习，推荐练习题库 → https://github.com/hcsp

### 应用层框架

- ~~SSH: Spring + Struts + Hibernate~~

- SSM: Spring + Spring mvc + MyBatis

- Spring Boot

  | 知识点   | 描述                                                         |
  | -------- | ------------------------------------------------------------ |
  | WebFlux  | 基于[Reactive Streams](https://translate.googleusercontent.com/translate_c?depth=1&hl=zh-CN&prev=search&rurl=translate.google.com&sl=en&sp=nmt4&u=https://www.reactive-streams.org/&usg=ALkJrhhHaqtXjNiAExlmWTzAxsuYRGV6Pw) API构建的[反应流](https://translate.googleusercontent.com/translate_c?depth=1&hl=zh-CN&prev=search&rurl=translate.google.com&sl=en&sp=nmt4&u=https://www.reactive-streams.org/&usg=ALkJrhhHaqtXjNiAExlmWTzAxsuYRGV6Pw) Web应用程序的支持 |
  | Security | 安全处理                                                     |
  | Jpa      | 数据操作                                                     |

### 各种中间件

- MQ 消息队列：RabbitMQ ....

- 通信框架：

  - Dubbo 

  - Spring Cloud

    | 知识点  | 描述           |
    | ------- | -------------- |
    | Eureka | 服务注册中心          |
    | Feign   | 微服务之间调用 |
    | Gateway | 网关           |
    | Hystrix | 断路器 |
    | Ribbon | 负载均衡 |

- 分布式事务：[Seata](https://github.com/seata/seata)

- [ZooKeeper](https://github.com/apache/zookeeper) 服务注册中心

- [Elasticsearch](https://www.elastic.co/cn)  数据库 搜索引擎

- [xxl-job](https://github.com/xuxueli/xxl-job)：分布式可视化任务调度中心 

---

## 虚拟化/容器化技术

- Docker：容器化
- K8s：kubernetes
- Web 容器：Tomcat、Jetty、Undertow、Netty

# 个人开发环境

- IntelliJ IDEA  

  | 插件名                                                       | 概述                             |
  | ------------------------------------------------------------ | -------------------------------- |
  | Translation                                                  | 翻译用                           |
  | TabNine                                                      | 代码提示                         |
  | RestfulTool  (~~RestfulToolkit~~)                                       | 看接口                           |
  | [MyBatisCodeHelper-Pro](https://github.com/gejun123456/MyBatisCodeHelper-Pro) | MyBatis 辅助插件，用过的人都知道 |
  | MyBatis Log Plugin                                           | 看 MyBatis 运行产生的 Sql        |
  | JRebel                                                       | 热加载                           |
  | SonarLint                                                    | 代码质量检查                     |
  | Alibaba Java Coding Guidelines                               | 检查编码规范                     |
  | .ignore                                                      | Git 文件忽略                     |
  | Maven Helper                                                 | 排查 Maven 依赖冲突              |
  | Lombok                                                       | 此处请自行Google                 |
  | Background Image Plus                                        | 背景图片更换                     |

  推荐教程 → [IntelliJ IDEA 简体中文专题教程](https://github.com/judasn/IntelliJ-IDEA-Tutorial)

- Navicat Premium 15 ：数据库可视化操作客户端

- [Another.Redis.Desktop.Manager](https://github.com/qishibo/AnotherRedisDesktopManager)：Redis 可视化操作客户端

- Xshell + Xftp：官网自称业界最强大的SSH客户机

- Postman：接口测试

- 常用第三方库：Hutool 、[fastjson](https://github.com/alibaba/fastjson)、[Guava](https://github.com/google/guava)、MyBatis-Plus

## 碎碎念念

- <font color="red">一定要注意编码规范，命名合理</font>，能一行代码搞定的事就不要写两行代码。接口必须写文档，注明需要什么参数返回什么参数。如果你使用的IDEA做到IDEA没有奇怪的颜色提示。
- 搜索引擎是个好东西，请善用。
- 遇到错误，首先看对应开发工具的日志，定位到具体异常发生处，使用Debug调试，一般而言都能解决，引用某个大佬说过的话：~~瞎子不配学编程~~。
- 试着阅读源码，也许并没有你想的那么难。
