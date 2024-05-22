---
date: 2021-04-08
tags: web
description: 从0到1开始配置Charles，快速调试移动端应用
---

# 概览
大部分PC端的页面调试，我们可以通过console.log 的形式，在浏览器端直接看到，但是当我们开发手机端h5，或者小程序的时候，你很难看到请求的真是数据，所以需要一个抓包工具帮助我们去查看网络请求

# 环境搭建
### Charles安装
1. 官网下载 [https://www.charlesproxy.com/latest-release/download.do](https://www.charlesproxy.com/latest-release/download.do)
2. 将应用激活，否则每次会有30s的开启等待时间

**UI介绍**
安装完成打开后，可以看到下面的UI
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221503811.png)
上面中间按钮功能依次是
1. 清理当前记录
2. 记录开启关闭按钮
3. SSL抓包开关
4. throttling
5. 开启关闭调试节点

在没有其他配置的情况下，https默认都是无法解析的
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221504617.png)

### PC端调试配置
pc端的配置主要有两步
#### 1. 证书安装
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221504586.png)

![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221504578.png)
这里需要选择登录或者系统
选中对应钥匙串，查看刚刚添加的证书，并双击信任
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221506969.png)
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221506958.png)
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221506716.png)

查看最终的结果
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221507527.png)

#### 2. SSL代理配置
选中ssl配置
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221507838.png)
选中add，添加如下配置
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221507964.png)
保存完成后，既可以看到所有的页面请求都已经被解析
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221507093.png)

### 手机端调试配置
手机端配置会麻烦一点，主要流程：
1. 手机和电脑连接至同一个局域网
2. 手机代理配置，将请求全部代理到电脑上
3. 访问charles地址，安装charles的证书，
4. 手机证书信任
5. 测试请求

下面具体介绍下步骤
1. 手机和电脑连接至同一个局域网，查看电脑的ip，后面需要配置到手上
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221508120.png)

2. 手机代理配置
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221508974.png)
将之前电脑的ip填入，端口默认8888，并存储
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221508096.png)

这个时候手机访问网络，在电脑的charles上会弹出是否允许连接，点击白色的允许
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221509717.png)

这个时候手机上的请求已经被抓取到了，只是还未被解析
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221509924.png)

1. 访问charles地址，安装charles的证书
现在pc端charles开启证书服务
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221509524.png)

出现该框后，不要点击ok，直接在手机上操作之后的步骤
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221509727.png)

手机端通过浏览器打开地址 chls.pro/ssl 
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221510099.png)

出现安全问题，点击继续访问
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221510940.png)

进入网址后，会出现安装提醒，点击安装
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221510761.png)

点击设置->通用->VPN与设备管理，点击刚刚安装的charles描述文件，选中安装
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221510733.png)

安装完后后如下所示
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221510996.png)

1. 手机证书信任
再次设置-通用-关于本机-证书信任设置，将charles的证书信任，至此，手机端的证书安装完成
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221511604.png)

2. 测试请求
手机端访问网址，电脑端抓到请求
![image.png](https://raw.githubusercontent.com/lemoolu/oss/main/files/202405221511908.png)

## CaseByCase
1. 请求重新发起，并发测试
2. 响应重置
3. PC端请求重置
4. 小程序端请求抓取

# 问题反馈
1. charles开启后对电脑和网络性能影响较大，不用的时候记得关闭
