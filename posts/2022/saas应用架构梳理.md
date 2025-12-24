---
title: saas应用架构梳理
date: 2022-01-10
tags: web
---

# 一、概要

梳理现有SaaS前后端项目整体架构，文章内容主要以耘田Saas架构介绍（商照架构设计参照基本上是参照耘田）

# 二、整体框架

### 系统分层

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1650425008623-645f9828-88b0-4dbf-a9e2-1399c7e3429c.png#clientId=u97670abb-a0ec-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=530&id=u2964c594&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1060&originWidth=1822&originalType=binary&ratio=1&rotation=0&showTitle=false&size=321714&status=done&style=none&taskId=u394d1493-cbc0-4b04-ad1c-949d3faf997&title=&width=911#id=u6iCe&originHeight=1060&originWidth=1822&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
整体分为5层

1. 展现层，主要是暴露到用户侧的页面，底层全部为web，框架：ts+react
2. portal层，负责页面和接口露出，流量分发，登录权限管控等
3. 业务层，主要负责应用功能实现
4. 服务层，主要包含云产品服务及能力依赖
5. 数据层，包含应用数据，数仓数据，文件资源

### 用户链路

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1650960717861-4f4d67bc-9ced-4df6-82d6-2513b7266348.png#clientId=ud8c386b1-78a1-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=614&id=u875136fd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=614&originWidth=1812&originalType=binary&ratio=1&rotation=0&showTitle=false&size=244695&status=done&style=none&taskId=u0701d8ef-9dfc-4ee6-8174-48fbbb632ff&title=&width=1812#id=Kegdg&originHeight=614&originWidth=1812&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
注意：

1. 小程序端放弃RAX，目前全部是H5的模式
2. 每次新增应用的小二管理，都需要改动小二后端服务代码

# 三、架构细分

### 1. 账号与登录

> 基于钉钉组织账号
使用uc进行数据同步及登录验证
同时支持扫码登录、手机号登录


#### 账号隔离

引用OneID 领域架构图 [https://yuque.alibaba-inc.com/uo5zv0/manual/lpe08b#abAgD](https://yuque.alibaba-inc.com/uo5zv0/manual/lpe08b#abAgD)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1650434913170-dd6b2da3-906e-48b5-8f40-fb6794fd5d22.png#clientId=ucd53e42a-b301-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=850&id=Hfp1P&margin=%5Bobject%20Object%5D&name=image.png&originHeight=850&originWidth=1718&originalType=binary&ratio=1&rotation=0&showTitle=false&size=491165&status=done&style=none&taskId=uc5028d8c-96b2-4c52-a72f-78f6ea09c49&title=&width=1718#id=D1uSb&originHeight=850&originWidth=1718&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

1. 云账号、租户：1对1
2. 钉钉组织、公司：1对1
3. 公司在UC全局唯一

注意点

1. 一个钉钉组织对应一个公司，已经开通过耘田saas的组织无法再开通商照

#### 登录流程时序图

人员组织以钉钉为主，登录时需将钉钉登录态转换为iot登录态
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1650438700366-07531308-ff2d-496e-b72f-9122b0cc0a26.png#clientId=ucd53e42a-b301-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=527&id=u5ab0d831&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1054&originWidth=962&originalType=binary&ratio=1&rotation=0&showTitle=false&size=148212&status=done&style=none&taskId=u5ded86fd-b614-4f19-be81-0d81cf94127&title=&width=481#id=d3iMi&originHeight=1054&originWidth=962&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 钉钉组织账号数据同步

目前钉钉回调接入分三种

1. http推送：使用HTTP的方式注册钉钉的回调事件，用于接收钉钉推送的消息。
概述：[https://open.dingtalk.com/document/orgapp-server/callback-overview](https://open.dingtalk.com/document/orgapp-server/callback-overview)
2. rds推送：钉钉云数据库同步
3. SyncHttp推送：直接推送业务数据的最终状态，如人员变更信息等

注意点：

- 耘田及商照都是用http推送，但是该形式钉钉已不推荐

http推送链路图
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1649325444273-03d60f97-314c-4944-9b72-daf54aad5b6a.png#clientId=uab32f6f0-df9f-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=671&id=FixmX&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1342&originWidth=1238&originalType=binary&ratio=1&rotation=0&showTitle=false&size=385674&status=done&style=none&taskId=u7faf2b21-e5f6-403b-a92a-9b043cadb48&title=&width=619#id=X5mfc&originHeight=1342&originWidth=1238&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 相关配置信息

主要是将项目信息及小程序信息等注册到UC中
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1649325460907-622882a1-ccb6-4b80-b400-3230735e82cb.png#clientId=uab32f6f0-df9f-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=324&id=lsCiw&margin=%5Bobject%20Object%5D&name=image.png&originHeight=648&originWidth=1536&originalType=binary&ratio=1&rotation=0&showTitle=false&size=234499&status=done&style=none&taskId=ubf49d9d6-0d54-42c8-a4da-a34aa8555b1&title=&width=768#id=BTUrt&originHeight=648&originWidth=1536&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 2. 设备数据上报与下发

1. 自有设备数据上报、下发通过LP实现
2. 授权设备需通过LP同学配置白名单（配置授权账号ID）后才可以获取
3. 设备数据统计分两种 
   1. 在DataWorks中从LP原始数据中筛选数据进行处理
   2. 通过LP的数据流转到flink中进行处理
4. 页面设备状态变更通过轮询实现

### 3. 数据统计

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1650439432482-36d42358-4512-4f67-8b28-f0dc6a1b4bb9.png#clientId=ucd53e42a-b301-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=343&id=x7YMx&margin=%5Bobject%20Object%5D&name=image.png&originHeight=686&originWidth=1636&originalType=binary&ratio=1&rotation=0&showTitle=false&size=201033&status=done&style=none&taskId=u991e3bda-7d43-4524-a4aa-cbd73b5c032&title=&width=818#id=tupde&originHeight=686&originWidth=1636&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
流程

1. 离线数据T+1 
   1. 将需要在统计中使用的业务数据通过flink任务同步到holo中
   2. 在由holo导入到MaxCompute中
   3. MaxCompute基于设备ods及导入数据多次处理后导出到holo中
2. 实时数据 
   1. LP添加云产品流转把设备实时数据传到kafka中，再由flink任务处理后导出到holo中
3. saas层从holo中获取离线和实时数据，组合使用

### 4. 三方应用中心

负责内部应用及外部应用接入到耘田saas中

1. omp接口调用，数据获取权限
2. 子应用免登
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1650781536731-3730ecbe-09a9-4b1c-bd13-be54e70b9e6f.png#clientId=u390ae3e4-a55a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=360&id=u8843715e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1062&originWidth=1166&originalType=binary&ratio=1&rotation=0&showTitle=false&size=263307&status=done&style=none&taskId=uc7196fc8-5714-4ee2-b598-62964453a91&title=&width=395#id=Wgfvl&originHeight=1062&originWidth=1166&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
3. 主子应用数据通信 [https://yuque.alibaba-inc.com/vcasht/ul525i/ykoxa5#LBoNp](https://yuque.alibaba-inc.com/vcasht/ul525i/ykoxa5#LBoNp)

```javascript
// 发送消息
// 退出登录
window.parent.postMessage({ type:'logout' }, '*');
// 登录失效，重新获取授权码
window.parent.postMessage({ type:'auth' }, '*');

// 子应用接收消息
window.addEventListener('message', (event)=> { 
  console.log(event.data); // { type: 'auth', data: { authCode: 'xxxxxxx' } }
});
```

注意点

1. 外部应用体验无法可控（外部发布不感知）
2. 外部域名需添加到我们网站白名单中

### 5. 前端架构

框架统一：React+TS
脚手架统一：umi
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2022/png/323891/1650781956100-e6d1daf7-4372-4922-9d1b-7b3059cd375f.png#clientId=u390ae3e4-a55a-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=412&id=uf81da232&margin=%5Bobject%20Object%5D&name=image.png&originHeight=824&originWidth=1796&originalType=binary&ratio=1&rotation=0&showTitle=false&size=193478&status=done&style=none&taskId=u7a87e435-34c1-44e0-b6e2-5612939df5c&title=&width=898#id=V4cQU&originHeight=824&originWidth=1796&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

# 四、后续规划点

#### saas个性化支持

背景：
对于SaaS提供商而言，如果不能以标准化、规模化的方式提供服务，SaaS在经济上的优势是无法体现出来的；但企业管理往往是个性化的，这跟提供标准化产品服务的SaaS模式相互矛盾

个性化分类：

1. 数据个性化
2. 界面个性化
3. 功能个性化

耘田saas的核心：生产种植+设备 结合

解决方案：

1. 产品标准化，通过流程化方案解决一类需求（受限具体需求，受限产品能力）
2. 集成外部三方应用，将非核心功能通过集成的形式接入
3. 二次开发，基于项目定制化开发交付
4. 项目配置，提供多种能力，提供开关能力 
   1. 低代码 交付前管理功能搭建
   2. UI配置
   3. 功能配置
5. paas

个性化反馈问题，统计，百分比

技术点：

1. 耘田外部能力：完善三方应用接入（基于paas开发，可接入耘田）
2. 耘田内部能力：配置能力 
   1. 系统设置
   2. UI搭建：用于大屏，设备场景等页面展示
   3. 插件配置：采收功能，果蔬种植，蔬菜种植等（影响种植主流程）

#### 通用能力抽象

- 账户相关 
   - 用户，组织，权限、数据同步等
- saas通用功能 
   - 操作日志
   - 数据统计链路
- 交互层通用能力 
   - 登录，人员角色管理
   - 小二管理
