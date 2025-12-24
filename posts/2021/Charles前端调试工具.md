---
title: Charles前端调试工具
date: 2021-04-08
tags: web
---


# 概览
大部分PC端的页面调试，我们可以通过console.log 的形式，在浏览器端直接看到，但是当我们开发手机端h5，或者小程序的时候，你很难看到请求的真是数据，所以需要一个抓包工具帮助我们去查看网络请求
# 环境搭建
### Charles安装

1. 官网下载 [https://www.charlesproxy.com/latest-release/download.do](https://www.charlesproxy.com/latest-release/download.do)
2. 将应用激活，否则每次会有30s的开启等待时间

UI介绍
安装完成打开后，可以看到下面的UI
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658804928950-0cdfbac3-f807-4d0e-a8cb-fad70935d750.png#clientId=u6f57d465-f3bb-4&from=paste&height=423&id=ube99a17c&name=image.png&originHeight=1532&originWidth=1800&originalType=binary&ratio=1&rotation=0&showTitle=false&size=445189&status=done&style=none&taskId=ud2c13830-9bb7-4a16-b465-7f04188a5ba&title=&width=497)
上面中间按钮功能依次是

1. 清理当前记录
2. 记录开启关闭按钮
3. SSL抓包开关
4. trottling
5. 开启关闭调试节点

在没有其他配置的情况下，https默认都是无法解析的
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805128267-15f00982-cf67-4460-abc4-e94e28f213d9.png#clientId=u6f57d465-f3bb-4&from=paste&height=449&id=uf89ef842&name=image.png&originHeight=1532&originWidth=1800&originalType=binary&ratio=1&rotation=0&showTitle=false&size=294949&status=done&style=none&taskId=u319ae3ba-0278-4d46-9467-cd2ea2065f0&title=&width=528)
### PC端调试配置
pc端的配置主要有3个
#### 1. 证书安装
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805189281-52dd8100-3077-4496-bf0e-7c24ed60e01a.png#clientId=u6f57d465-f3bb-4&from=paste&height=197&id=u3616a33d&name=image.png&originHeight=888&originWidth=2688&originalType=binary&ratio=1&rotation=0&showTitle=false&size=972340&status=done&style=none&taskId=u4df5766b-fc78-4ed7-9230-20ff399384e&title=&width=597)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805206903-f01f5df3-313c-4900-a7b0-362b36cf2dba.png#clientId=u6f57d465-f3bb-4&from=paste&height=232&id=u7b0520dc&name=image.png&originHeight=618&originWidth=1070&originalType=binary&ratio=1&rotation=0&showTitle=false&size=98106&status=done&style=none&taskId=u371c2fd2-d436-47e3-8aab-07fa3dbc830&title=&width=401)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805235221-4f7d9237-bcf0-42dd-af4d-e4393e07479e.png#clientId=u6f57d465-f3bb-4&from=paste&height=233&id=uf0e8e8a8&name=image.png&originHeight=618&originWidth=1070&originalType=binary&ratio=1&rotation=0&showTitle=false&size=201809&status=done&style=none&taskId=ua9994f81-6ea1-4e73-9b2f-15f3a068643&title=&width=403)
这里需要选择登录或者系统
选中对应钥匙串，查看刚刚添加的证书，并双击信任
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805327315-0a664af7-d7ef-4b3b-9789-27e9b51f08bf.png#clientId=u6f57d465-f3bb-4&from=paste&height=386&id=u35d683ab&name=image.png&originHeight=1066&originWidth=1754&originalType=binary&ratio=1&rotation=0&showTitle=false&size=324659&status=done&style=none&taskId=ucfece73a-58c4-47d8-b34f-4a7554cde0c&title=&width=635)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805373912-0a50651b-b73a-41d1-9f1d-a70638943b21.png#clientId=u6f57d465-f3bb-4&from=paste&height=421&id=u6f344597&name=image.png&originHeight=1162&originWidth=1760&originalType=binary&ratio=1&rotation=0&showTitle=false&size=891509&status=done&style=none&taskId=u54e2fdb9-61a7-4328-ab22-47b5760f287&title=&width=638)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805395877-730017aa-461f-4bf1-858e-53b57b33537d.png#clientId=u6f57d465-f3bb-4&from=paste&height=334&id=u37604d46&name=image.png&originHeight=876&originWidth=1026&originalType=binary&ratio=1&rotation=0&showTitle=false&size=406409&status=done&style=none&taskId=u3640cb05-6d54-4474-b345-ea879463e23&title=&width=391)
查看最终的结果
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805414837-7bddafa9-ca0f-48f8-93ea-fe252f7da60d.png#clientId=u6f57d465-f3bb-4&from=paste&height=383&id=u70e12467&name=image.png&originHeight=1066&originWidth=1754&originalType=binary&ratio=1&rotation=0&showTitle=false&size=324298&status=done&style=none&taskId=u1ba360a0-30eb-4b2b-a0c2-43c1a72bd88&title=&width=630)
#### 2. SSL代理配置
选中ssl配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805582040-ac6e765d-e93c-46c7-b575-64bdfee2268e.png#clientId=u6f57d465-f3bb-4&from=paste&height=479&id=u1face775&name=image.png&originHeight=1206&originWidth=1588&originalType=binary&ratio=1&rotation=0&showTitle=false&size=576695&status=done&style=none&taskId=u71a4881b-2d59-490d-a2c6-f168f62e2e4&title=&width=631)
选中add，添加如下配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805632181-4d2be678-fe19-4aad-9281-2a8c4b72ebd9.png#clientId=u6f57d465-f3bb-4&from=paste&height=564&id=u556ea333&name=image.png&originHeight=1284&originWidth=1436&originalType=binary&ratio=1&rotation=0&showTitle=false&size=538197&status=done&style=none&taskId=u1dddf977-82c7-41c0-894d-5ab866d2fcd&title=&width=631)
保存完成后，既可以看到所有的页面请求都已经被解析
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805781078-04fee8bf-4a56-4fdd-86a1-b2bffb45d316.png#clientId=u6f57d465-f3bb-4&from=paste&height=570&id=u085dc018&name=image.png&originHeight=1620&originWidth=1800&originalType=binary&ratio=1&rotation=0&showTitle=false&size=871512&status=done&style=none&taskId=u27003a9a-ab6a-44d5-99fe-2dfb60ad32b&title=&width=633)
### 手机端调试配置
手机端配置会麻烦一点，主要流程

1. 手机和电脑连接至同一个局域网
2. 手机代理配置，将请求全部代理到电脑上
3. 访问charles地址，安装charles的证书，
4. 手机证书信任
5. 测试请求

下面具体介绍下步骤
#### 1. 手机和电脑连接至同一个局域网
查看电脑的ip，后面需要配置到手上
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658805983008-3079a3bc-9f20-478d-a41a-f5badecd4c7d.png#clientId=u6f57d465-f3bb-4&from=paste&height=367&id=u297c686a&name=image.png&originHeight=1264&originWidth=1336&originalType=binary&ratio=1&rotation=0&showTitle=false&size=490836&status=done&style=none&taskId=u330389da-80d9-4f16-800e-1c3e5a55da7&title=&width=388)
#### 2. 手机代理配置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658806215074-d555bd78-0bc9-4c69-b5e3-7fec206e934d.png#clientId=u6f57d465-f3bb-4&from=paste&height=676&id=u78cbff44&name=image.png&originHeight=1966&originWidth=904&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1109523&status=done&style=none&taskId=ud161988d-9f33-4e50-9575-368e92a7aec&title=&width=311)![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658806246876-2789beb7-7b0a-4ce0-9502-7940958438f6.png#clientId=u6f57d465-f3bb-4&from=paste&height=677&id=u52f03d82&name=image.png&originHeight=1938&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=534163&status=done&style=none&taskId=u3df0268e-5808-432a-8889-e9ee6976af6&title=&width=318)
将之前电脑的ip填入，端口默认8888，并存储
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658807196827-ca6b1016-db3a-4302-96b8-b134d5814ce8.png#clientId=u6f57d465-f3bb-4&from=paste&height=349&id=ua323e57d&name=image.png&originHeight=1020&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=218225&status=done&style=none&taskId=u12978307-5d21-4d06-a14c-7867adb50ac&title=&width=311)
这个时候手机访问网络，在电脑的charles上会弹出是否允许连接，点击白色的允许
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658806064315-d4e11599-f837-4186-845c-b0f2797d6ddd.png#clientId=u6f57d465-f3bb-4&from=paste&height=120&id=ub49add0c&name=image.png&originHeight=334&originWidth=1558&originalType=binary&ratio=1&rotation=0&showTitle=false&size=178199&status=done&style=none&taskId=u1844690e-6150-4ae9-b290-8477b6e0ef0&title=&width=558)
这个时候手机上的请求已经被抓取到了，只是还未被解析
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658806339062-d9e7f80c-67f5-465f-8472-80e57b6df506.png#clientId=u6f57d465-f3bb-4&from=paste&height=464&id=u386a1a1d&name=image.png&originHeight=1620&originWidth=1800&originalType=binary&ratio=1&rotation=0&showTitle=false&size=305713&status=done&style=none&taskId=u961f3ac9-be7b-4fd7-8188-42863434ade&title=&width=516)
#### 3. 访问charles地址，安装charles的证书
现在pc端charles开启证书服务
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658806445569-baad86d6-c92a-40d0-885e-6a76673393dd.png#clientId=u6f57d465-f3bb-4&from=paste&height=230&id=u36ceb4f6&name=image.png&originHeight=942&originWidth=2704&originalType=binary&ratio=1&rotation=0&showTitle=false&size=752255&status=done&style=none&taskId=u02731b11-a8ec-4a0f-81bc-6bbdb70aad3&title=&width=661)
出现该框后，不要点击ok，直接在手机上操作之后的步骤
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658806488364-d06a9147-f127-4fc0-8289-d18216aadc67.png#clientId=u6f57d465-f3bb-4&from=paste&height=155&id=ua79d5bd8&name=image.png&originHeight=362&originWidth=1558&originalType=binary&ratio=1&rotation=0&showTitle=false&size=163750&status=done&style=none&taskId=u37e349b2-f48f-4b00-b472-23c4f6487ed&title=&width=665)
手机端通过浏览器打开地址 chls.pro/ssl 
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658806911953-dfb19e31-f14e-4de0-81b7-774a6d9c6c16.png#clientId=u6f57d465-f3bb-4&from=paste&height=627&id=u229e070b&name=image.png&originHeight=1988&originWidth=900&originalType=binary&ratio=1&rotation=0&showTitle=false&size=457622&status=done&style=none&taskId=uc7646beb-d740-4685-94f8-58a2845a42f&title=&width=284)
出现安全问题，点击继续访问
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658806999786-1cd847ca-f663-434f-8b2e-3cddf0916b44.png#clientId=u6f57d465-f3bb-4&from=paste&height=509&id=uf99c50e9&name=image.png&originHeight=1632&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1420714&status=done&style=none&taskId=uc3b32fa0-182f-4659-b8e2-a18ee076bbc&title=&width=284)
进入网址后，会出现安装提醒，点击安装
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658807042572-e5c21d7d-955d-4047-8c4f-baa6da58fef2.png#clientId=u6f57d465-f3bb-4&from=paste&height=395&id=u7256459c&name=image.png&originHeight=1254&originWidth=902&originalType=binary&ratio=1&rotation=0&showTitle=false&size=323849&status=done&style=none&taskId=ua730e800-a44c-4a71-8da0-a9cdd2a01ff&title=&width=284)
点击设置->通用->VPN与设备管理，点击刚刚安装的charles描述文件，选中安装
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658807494768-69a5fbbb-57fc-49ff-98b6-1d497342ed43.png#clientId=u6f57d465-f3bb-4&from=paste&height=258&id=ua4053b17&name=image.png&originHeight=820&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=204187&status=done&style=none&taskId=u3cc18b75-dfff-453d-8503-fbc585bc967&title=&width=286)
安装完后后如下所示
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658807127167-40eb8a1d-a73c-4312-b620-d6c626b5be24.png#clientId=u6f57d465-f3bb-4&from=paste&height=321&id=u9261b164&name=image.png&originHeight=1006&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=256766&status=done&style=none&taskId=u6ed65fda-bd95-4766-9bc9-1f582cd856d&title=&width=290)
#### 4. 手机证书信任
再次设置-通用-关于本机-证书信任设置，将charles的证书信任，至此，手机端的证书安装完成
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658807149150-0b3ad5d6-2eb4-4b94-980c-e347511ee142.png#clientId=u6f57d465-f3bb-4&from=paste&height=296&id=FVg00&name=image.png&originHeight=936&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=251666&status=done&style=none&taskId=ud21fd748-d6c7-4b9c-bd7d-db117ddbf3f&title=&width=288)
#### 5. 测试请求
手机端访问网址，电脑端抓到请求
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658807394628-cc4de349-95eb-433b-ba32-867982a9c05b.png#clientId=u6f57d465-f3bb-4&from=paste&height=260&id=ub5f4f341&name=image.png&originHeight=794&originWidth=1800&originalType=binary&ratio=1&rotation=0&showTitle=false&size=213503&status=done&style=none&taskId=u6869507a-4275-47ca-901a-f67c7644e00&title=&width=590)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658807566287-96938c73-b8a5-4603-8a41-655bd0040cf9.png#clientId=u6f57d465-f3bb-4&from=paste&height=574&id=ub08838ce&name=image.png&originHeight=1746&originWidth=910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1095988&status=done&style=none&taskId=u327cbe79-8773-4cee-89a0-dadce6c3135&title=&width=299)
## CaseByCase

1. 请求重新发起，并发测试
2. 响应重置
3. PC端请求重置
4. 小程序端请求抓取
# 问题反馈

1. charles开启后对电脑和网络性能影响较大，不用的时候记得关闭
