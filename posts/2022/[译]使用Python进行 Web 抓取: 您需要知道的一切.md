---
date: 2022-07-03
tags: web
---

本文主要是针对 [Web Scraping with Python: Everything you need to know (2022)](https://www.scrapingbee.com/blog/web-scraping-101-with-python/) 的翻译，适合入门网页爬取和页面调试，如有任何不正确请求指正
> **任何爬虫行为都可能存在法律风险，请谨慎对待，且与本文无关**

## 简介:
在本文中将介绍几乎所有与Python 相关的网页抓取工具。从基础到高级，涵盖每个的优点和缺点。当然，我们不能涵盖到每个工具的方方面面，但是这篇文章会告诉你关于每个工具做什么，以及什么时候使用它们
> 注意: 以下所有的python皆为python3（pip对应pip3）

## 0. 网络基础
互联网是复杂的：在浏览器中访问一个简单的网页时，涉及到许多底层技术和概念。本文的目标不是深入讨论这里的每个细节，而是为您提供使用 Python 从 Web 提取数据这块最重要部分。
### 超文本传输协议
超文本传输协议(HTTP)使用客户端/服务器模型。客户端打开连接并向 HTTP 服务器发送消息(“ I want to see that page:/product”)，然后服务器响应(如 HTML 代码)并关闭连接。
> HTTP 之所以被称为无状态协议，是因为每个请求(请求/响应)都是独立的。FTP 是有状态的，因为它保持连接。

当你在浏览器中输入一个网站地址时，HTTP 请求看起来是这样的:
```
GET /product/ HTTP/1.1
Host: example.com
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate, sdch, br
Connection: keep-alive
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 12_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36
```
在此请求的第一行中，您可以看到以下内容:

- Method：http的请求方法，在此例子中时GET, 表示我们希望获取数据。还有很多其他 HTTP 方法可用(例如用于上传数据) ，并且有一个完整的[列表here](https://www.w3schools.com/tags/ref_httpmethods.asp) 给你.
- 文件、目录或对象的路径：在此实例中是根目标下 product对应的文件夹
- HTTP协议版本：在本教程中，我们使用 HTTP1
- 其他更多请求头字段：Connection，User-Agent...，这里有一个详尽的名单[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

下面是最重要的标题字段:

- Host：这个消息头表示您发送请求的主机名。这个消息头对于基于名称的虚拟主机尤为重要，目前是互联网世界的标准
- User-Agent：其中包含有关发起请求的客户端(包括操作系统)的信息。在这种情况下，它是我在 macOS 上的浏览器(Chrome)。这个头很重要，因为它要么用于统计(有多少用户访问我的网站在移动对桌面)或防止违反机器人。因为这些头是由客户端发送的，所以可以修改它们(“Header Spoofing” “头部欺骗”)。这里是需要我们设置的，**让抓取请求看起来像一个普通的网络浏览器请求**
- Accept: 这是一份 [MIME types](https://en.wikipedia.org/wiki/Media_type)类型,  有很多不同的内容类型和子类型:text/plain, text/html, image/jpeg, application/json 文本/纯文本，文本/html，图像/jpeg，应用程序/json ...
- Cookie：此头字段包含名称-值对列表(name1 = value1; name2 = value2)。Cookies 是网站在你的机器上存储数据的一种方式。这可以是一个特定的过期日期(标准 Cookie) ，也可以是在关闭浏览器(会话 Cookie)之前的暂时过期。Cookie 被用于许多不同的目的，从身份验证信息，到用户偏好等，比如使用个性化的、唯一的用户标识符进行用户跟踪。而且，对于鉴权认证，这是浏览器非常重要的功能。当您提交登录时，服务器将验证您的凭据，如果您提供了有效的登录，则会返回会话 cookie，它将清楚地标识您的特定用户帐户的用户会话。当服务器收到cookie，会在在后续请求带上此cookie
- Referer: 这个字段包含请求URL的实际来源。这个头很重要，因为网站使用这个头来改变他们的行为基于用户来自哪里。例如，很多新闻网站都有付费订阅，只允许你浏览10% 的文章，但是如果用户来自像 Reddit 这样的新闻聚合网站，他们就允许你浏览完整的内容。他们使用引用来检查这个。有时候，我们将不得不欺骗这个标题，以获得我们想要提取的内容

服务器的响应如下:
```javascript
HTTP/1.1 200 OK
Server: nginx/1.4.6 (Ubuntu)
Content-Type: text/html; charset=utf-8
Content-Length: 3352

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" /> ...[HTML CODE]
```
在第一行，我们拿到信息，HTTP 响应码200 OK。代码为200表示请求得到了正确处理。你可以在维基百科上找到所有可用代码的完整列表。在状态行之后是响应标头，它们的用途与我们刚才讨论的请求标头相同。在响应标头之后，您将看到一个空行，后面跟随该响应发送的实际数据。
一旦你的浏览器收到响应，它将解析 HTML 代码，获取所有嵌入资产(JavaScript 和 CSS 文件，图片，视频) ，并将结果呈现到主窗口。
我们将通过不同的方式使用 Python 执行 HTTP 请求，并从响应中提取所需的数据。
## 1. 使用Socket发送 HTTP 请求
### Socket
在 Python 中执行 HTTP 请求的最基本方法是打开一个 TCP socket并手动发送 HTTP 请求。
```javascript
import socket

HOST = 'www.google.com'  # Server hostname or IP address
PORT = 80                # The standard port for HTTP is 80, for HTTPS it is 443

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = (HOST, PORT)
client_socket.connect(server_address)

request_header = b'GET / HTTP/1.0\r\nHost: www.google.com\r\n\r\n'
client_socket.sendall(request_header)

response = ''
while True:
    recv = client_socket.recv(1024)
    if not recv:
        break
    response += str(recv)

print(response)
client_socket.close()  
```
现在我们已经有了 HTTP 响应，最基本方法是使用正则表达式从中提取数据
### 正则表达式
正则表达式是一个用于处理、解析和验证任意文本的非常通用的工具。正则表达式本质上是一个字符串，它使用标准语法定义搜索模式。例如，您可以快速识别网页中的所有电话号码。
经典搜索和替换相结合，正则表达式允许您以相对简单的方式对动态字符串执行字符串替换。在 web 抓取上下文中，最简单的例子可能是用正确的小写字母替换格式不佳的 HTML 文档中的大写标记。
在理想的语义世界中，数据很容易被机器读取，并且信息被嵌入到相关的 HTML 元素中，包含有意义的属性。但现实世界很混乱。您经常会在 <p> 元素中发现大量的文本。例如，如果希望在大型文本(价格、日期、名称...)中提取特定数据，则必须使用正则表达式。
> 注意: 这里有一个很棒的网站来测试你的 regex: https://regex101.com/。这篇文章只涉及一小部分你可以用正则表达式做什么。

```javascript
<p>Price : 19.99$</p>
```
我们可以用 XPath 表达式选择这个文本节点，然后使用 regex 提取价格:
```javascript
^Price\s*:\s*(\d+\.\d{2})\$
```
如果您只有 HTML，那么它会稍微复杂一些，但不会复杂太多。您可以简单地在表达式中指定标记，然后捕获文本组。
```javascript
import re

html_content = '<p>Price : 19.99$</p>'

m = re.match('<p>(.+)<\/p>', html_content)
if m:
	print(m.group(1))
```
如上，可以使用套接字手动发送 HTTP 请求，并使用正则表达式解析响应，但是这很复杂，但是有更高级的 API 可以使任务更加容易。
## 2. urllib3 & LXML
声明: 在 Python 中 urllib 比较混乱。标准库包含 urllib 和 urllib2(有时是 urllib3)。在 Python 3中，urllib2被分割成多个模块，而 urllib3不会很快成为标准库的一部分。这种令人困惑的情况将成为另一篇博客文章的主题。在本节中，我决定只讨论 urllib3，因为它在 Python 世界中被广泛使用，包括 Pip 和 Request。
Urllib3是一个高级包，它允许您对 HTTP 请求做几乎任何您想做的事情。使用 urllib3，我们可以用更少的代码行来完成上一节中所做的工作。
```javascript
import urllib3
http = urllib3.PoolManager()
r = http.request('GET', 'http://www.google.com')
print(r.data)
```
如上，这比socket简洁很多。不仅如此，API 也很简单。此外，您还可以轻松地做许多其他事情，如添加 HTTP 头、使用代理、 POST 表单..。
例如，如果我们决定设置一些头文件并使用代理，我们只需要执行以下操作(你可以在 bestproxyreviews.com 了解更多关于代理服务器的信息) :
```javascript
import urllib3
user_agent_header = urllib3.make_headers(user_agent="<USER AGENT>")
pool = urllib3.ProxyManager(f'<PROXY IP>', headers=user_agent_header)
r = pool.request('GET', 'https://www.google.com/')
```
看到没？行数完全一样。然而，有些事情 urllib3并不容易处理。例如，如果我们想要添加一个 cookie，我们必须手动创建相应的头文件并将其添加到请求中。
还有一些事情 urllib3可以做到，而 Request 不能: 例如，创建和管理一个池和代理池，以及管理重试策略。
简单地说，urllib3在抽象方面介于请求和 Socket 之间，尽管它比 Socket 更接近于请求。
接下来，我们将使用 LXML 包和 XPath 解析响应
### XPath
XPath 是一种使用路径表达式在 XML 文档(或 HTML 文档)中选择节点或节点集的技术。如果您熟悉 CSS 选择器，那么您可以将其想象为相对类似的东西。
与文档对象模型一样，XPath 自1999年以来一直是 W3C 标准。尽管 XPath 本身不是一种编程语言，但它允许您编写能够直接访问特定节点或特定节点集的表达式，而无需遍历整个 HTML 树(或 XML 树)。
要使用 XPath 从 HTML 文档中提取数据，我们需要三样东西:

- HTML 文件
- 一些 XPath 表达式
- 将运行这些表达式的 XPath 引擎

首先，我们将使用从 urllib3获得的 HTML。现在我们要从 Google 主页中提取所有的链接。因此，我们将使用一个简单的 XPath 表达式`//a`，并使用 LXML 来运行它。LXML 是一种快速、易于使用的支持 XPath 的 XML 和 HTML 处理库。
安装:
```javascript
pip install lxml
```
代码:
```python
from lxml import html

# We reuse the response from urllib3
data_string = r.data.decode('utf-8', errors='ignore')

# We instantiate a tree object from the HTML
tree = html.fromstring(data_string)

# We run the XPath against this HTML
# This returns an array of element
links = tree.xpath('//a')

for link in links:
    # For each element we can easily get back the URL
    print(link.get('href'))
```
输出应该是这样的:
```
https://books.google.fr/bkshp?hl=fr&tab=wp
https://www.google.fr/shopping?hl=fr&source=og&tab=wf
https://www.blogger.com/?tab=wj
https://photos.google.com/?tab=wq&pageId=none
http://video.google.fr/?hl=fr&tab=wv
https://docs.google.com/document/?usp=docs_alc
...
https://www.google.fr/intl/fr/about/products?tab=wh
```
与正则表达式一样，XPath 表达式功能强大，是从 HTML 中提取信息的最快方法之一。与正则表达式一样，XPath 可能很快变得混乱、难以阅读和难以维护。
如果您想了解更多关于 XPath 的信息，请不要犹豫阅读我关于 XPath 应用于 web 抓取的专门博客文章。
## 3. Requests & BeautifulSoup
### requests
requests是 Python 包之王。它的下载量超过11,000,000次，是 Python 中使用最广泛的软件包。
Installation:
```
pip install requests
```
请求很简单:
```python
import requests

r = requests.get('https://www.scrapingninja.co')
print(r.text)
```
使用 requests，可以很容易地执行 POST 请求、处理 cookie、查询参数... ... 您还可以使用 Request 下载图像。
在下面的页面中，您将学习如何将请求与代理一起使用。这几乎是强制性的刮在规模的网络。

**Authentication to Hacker News**
假设我们想创建一个工具来自动将我们的博客文章提交到 Hacker 新闻或任何其他论坛，比如 Buffer。在发布我们的链接之前，我们需要在这些网站上进行认证。我们将使用 Requests 和 BeautifulSoup 进行实现
下面是 Hacker News 的登录表单和相关的 DOM:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658499855217-0f9bc066-23f4-4e22-bf42-69399b194a90.png#clientId=u32c1eb4e-c8f9-4&from=paste&height=489&id=u56dc1eae&name=image.png&originHeight=977&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=171446&status=done&style=none&taskId=uddbf825a-a4ab-4e2e-930f-ffe39c6c074&title=&width=600)
在这个表单上有三个带有 name 属性的 < input > 标记(不发送其他输入元素)。第一个类型隐藏了一个名为“ goto”的类型，另外两个是用户名和密码。
如果你在 Chrome 浏览器中提交表单，你会发现有很多事情正在发生: 一个重定向和一个 cookie 正在被设置。此 Cookie 将由 Chrome 在每次后续请求中发送，以便服务器知道您已通过身份验证。
使用请求执行此操作很容易。它将为我们自动处理重定向，而且可以使用 Session 对象处理 cookie。

### BeautifulSoup
接下来我们需要的是 BeautifulSoup，它是一个 Python 库，可以帮助我们解析服务器返回的 HTML，以查明我们是否登录了。
安装:
```
pip install beautifulsoup4
```
因此，我们所要做的就是将这三个输入和我们的凭证发布到/login 端点，并检查是否存在一个只在登录时显示的元素:
```python
import requests
from bs4 import BeautifulSoup

BASE_URL = 'https://news.ycombinator.com'
USERNAME = ""
PASSWORD = ""

s = requests.Session()

data = {"goto": "news", "acct": USERNAME, "pw": PASSWORD}
r = s.post(f'{BASE_URL}/login', data=data)

soup = BeautifulSoup(r.text, 'html.parser')
if soup.find(id='logout') is not None:
    print('Successfully logged in')
else:
	print('Authentication Error')
```
太棒了，只需要几行 Python 代码，我们就可以登录到一个站点，并检查登录是否成功。现在，进入下一个挑战: 获得主页上的所有链接。
> 顺便说一下，Hacker News 提供了一个强大的 API，我们把它作为一个例子来做，但是你应该使用这个 API 而不是去抓取它！

我们需要做的第一件事是查看 Hacker News 的主页，以了解其结构和不同的 CSS 类，我们将不得不选择:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658499966193-2bb27b71-6098-4d54-8b00-d8235aded8d3.png#clientId=u32c1eb4e-c8f9-4&from=paste&height=244&id=u580f1645&name=image.png&originHeight=488&originWidth=825&originalType=binary&ratio=1&rotation=0&showTitle=false&size=240970&status=done&style=none&taskId=u0404401a-b095-44f5-9d8b-0341f78da31&title=&width=412.5)
从截图中可以明显看出，所有发布都是带有 class athing 的 < tr > 标记的一部分。所以，让我们简单地找到所有这些标签。再一次，我们可以用一行代码来完成这个任务。
```python
links = soup.findAll('tr', class_='athing')
```
然后，对于每个链接，我们将提取它的 ID、标题、 URL 和排名:
```python
import requests
from bs4 import BeautifulSoup

r = requests.get('https://news.ycombinator.com')
soup = BeautifulSoup(r.text, 'html.parser')
links = soup.findAll('tr', class_='athing')

formatted_links = []

for link in links:
    data = {
        'id': link['id'],
        'title': link.find_all('td')[2].a.text,
        "url": link.find_all('td')[2].a['href'],
        "rank": int(link.find_all('td')[0].span.text.replace('.', ''))
    }
    formatted_links.append(data)
    
print(formatted_links)
```
很好，只需要几行 Python 代码，我们就可以加载 Hacker News 的站点并获得所有发布内容的详细信息。但是在我们通向大数据的旅程中，我们不仅想打印数据，我们实际上还想持久化它。我们现在试试。
### 在 PostgreSQL 中存储数据
我们在这里选择了一个很好的关系数据库作为示例-PostgreSQL！
首先，我们需要一个正常运行的数据库实例。查看 www.postgresql.org/download ，选择适合您的操作系统的软件包，并遵循其安装说明。一旦安装了 PostgreSQL，您将需要设置一个数据库(让我们将其命名为 scrape  demo) ，并使用以下schema为我们的 Hacker News links添加一个表。
```
CREATE TABLE "hn_links" (
  "id" INTEGER NOT NULL,
  "title" VARCHAR NOT NULL,
  "url" VARCHAR NOT NULL,
  "rank" INTEGER NOT NULL
);
```
> 为了管理数据库，您可以使用 PostgreSQL 自己的命令行客户端，也可以使用其中一个可用的 UI 接口。

好了，数据库应该准备好了，我们可以再次启动代码了。
首先，我们需要一个能让我们与 PostgreSQL 连接的程序，而 Psycopg 是一个真正的很棒的库。像往常一样，您可以用 pip 快速安装它。
```
pip install psycopg2
```
剩下的就相对简单明了了，我们只需要把它们对接
```
con = psycopg2.connect(host="127.0.0.1", port="5432", user="postgres", password="", database="scrape_demo")
```
该连接将允许我们获取数据库光标
```
cur = con.cursor()
```
一旦我们有了光标，我们就可以使用方法 execute 来实际运行 SQL 命令。
```
cur.execute("INSERT INTO table [HERE-GOES-OUR-DATA]")
```
太好了，我们已经把所有东西都存储在数据库里了！
请等一下。不要忘记提交您的(隐式)数据库事务。再来一次 con. commit()(和几次关闭) 
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658500206749-3d756478-3d60-467f-a37d-789a2883a869.png#clientId=u32c1eb4e-c8f9-4&from=paste&height=314&id=u922a3dd9&name=image.png&originHeight=628&originWidth=745&originalType=binary&ratio=1&rotation=0&showTitle=false&size=100571&status=done&style=none&taskId=uf9f4748e-c2f2-4b4c-858b-6ba02d048fe&title=&width=372.5)
最后，这里是完整的代码和之前的抓取逻辑，这次将所有内容存储在数据库中。
```python
import psycopg2
import requests
from bs4 import BeautifulSoup

# Establish database connection
con = psycopg2.connect(host="127.0.0.1",
                       port="5432",
                       user="postgres",
                       password="",
                       database="scrape_demo")

# Get a database cursor
cur = con.cursor()

r = requests.get('https://news.ycombinator.com')
soup = BeautifulSoup(r.text, 'html.parser')
links = soup.findAll('tr', class_='athing')

for link in links:
    cur.execute("""
    INSERT INTO hn_links (id, title, url, rank)
    VALUES (%s, %s, %s, %s)
    """,
                (
                    link['id'],
                    link.find_all('td')[2].a.text,
                    link.find_all('td')[2].a['href'],
                    int(link.find_all('td')[0].span.text.replace('.', ''))
                )
               )
    
    # Commit the data
    con.commit();
    
    # Close our database connections
    cur.close()
    con.close()

```
### Summary
正如您所看到的，Request 和 BeautifulSoup 是提取数据和自动执行不同操作的优秀库。如果你想运行大规模的 web 抓取项目，你仍然可以使用Requests，但是你需要自己处理很多部分。
> 💡 你知道 ScrapingBee 的数据提取工具吗。它们不仅为您的项目提供了一个完整的无代码环境，而且还可以轻松地扩展和处理所有高级特性，比如 JavaScript 和代理循环，开箱即用。看看吧，1000个请求需要我们实现。

如果您想了解更多关于 Python、 BeautifulSoup、 POST 请求，尤其是 CSS 选择器的信息，我强烈推荐以下文章

- [BeautifulSoup tutorial: Scraping web pages with PythonBeautifulSoup 教程: 用 Python 抓取网页](https://www.scrapingbee.com/blog/python-web-scraping-beautiful-soup/)
- [How to send a POST with Python Requests?如何使用 Python 请求发送 POST？](https://www.scrapingbee.com/blog/how-to-send-post-python-requests/)

与往常一样，当然也有很多点可以改进:

- 找到使代码并行执行的方法，使其更快
- 处理错误
- 过滤结果
- 控制您的请求，这样您就不会让服务器过载

幸运的是，现有的工具可以为我们处理这些问题。
### GRequests
虽然Requests包易于使用，但是如果有数百个页面要抓起，您可能会发现它有点慢。它只允许您发送同步请求，这意味着如果您有25个 URL 要抓取，您将不得不一个一个地做。
因此，如果一个页面需要10秒钟才能获取，那么获取这25个页面将需要4分钟以上的时间。
```python
import requests

# An array with 25 urls
urls = [...] 

for url in urls:
    result = requests.get(url)
```
加速这个过程的最简单方法是同时进行多个调用。这意味着，不需要按顺序发送每个请求，而是可以批量发送5个请求。
在这种情况下，每个批处理将同时处理5个 URL，这意味着您将在10秒内获取5个 URL，而不是50秒，或者在50秒内获取整个25个 URL，而不是250秒。
通常，这是使用基于线程的并行实现的。不过，线程处理可能很棘手，特别是对于初学者。幸运的是，有一个版本的 Request 包为我们完成了所有的艰苦工作，即 GRequest。它基于请求，但也包含了 gevent，一个广泛用于 Web 应用程序的异步 Python API。这个库允许我们以一种简单而优雅的方式同时发送多个请求。
首先，让我们安装 GRequest。
```
pip install grequests
```
现在，以下是如何分批发送我们的25个初始 URL，每批5个:
```python
import grequests

BATCH_LENGTH = 5

# An array with 25 urls
urls = [...] 
# Our empty results array
results = []

while urls:
    # get our first batch of 5 URLs
    batch = urls[:BATCH_LENGTH]
    # create a set of unsent Requests
    rs = (grequests.get(url) for url in batch)
    # send them all at the same time
    batch_results = grequests.map(rs)
    # appending results to our main results array
    results += batch_results
    # removing fetched URLs from urls
    urls = urls[BATCH_LENGTH:]
    
    print(results)
# [<Response [200]>, <Response [200]>, ..., <Response [200]>, <Response [200]>]
```
就是这样。GRequest 对于小型脚本来说是完美的，但是对于生产代码或者大规模的 web 抓取来说就不那么理想了。为此，我们有 Scrapy。
## 4. Web 爬行框架
### Scrapy
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658500455774-01e88ee9-d661-43ab-81fd-93075cd2ac61.png#clientId=u32c1eb4e-c8f9-4&from=paste&height=175&id=u277ba278&name=image.png&originHeight=350&originWidth=600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39369&status=done&style=none&taskId=u5958d007-5b23-4193-ba61-489c2da412d&title=&width=300)
Scrapy 是一个强大的 Python 网页抓取和网页爬行框架。它提供了许多特性，可以异步下载网页，并以各种方式处理和持久化网页内容。它提供了对多线程、爬行(从一个链接到另一个链接以查找网站中的每个 URL 的过程)、站点地图等的支持。
Scrapy 还有一个叫 ScrapyShell 的交互模式。使用 Scrapy Shell，您可以快速测试您的抓取代码，并确保您的所有 XPath 表达式或 CSS 选择器都能正常工作。Scrapy 的缺点是学习曲线陡峭。还有很多东西要学。
为了继续我们关于黑客新闻的例子，我们将编写一个 Scrapy Spider，它将爬起前15页的结果，并将所有内容保存在一个 CSV 文件中。
你可以很容易地用 pip 安装 Scrapy:
```
pip install Scrapy
```
然后您可以使用 Scrapy CLI 为我们的项目生成样板代码:
```
scrapy startproject hacker_news_scraper
```
在 hacker _ news _ scraper/Spider 内部，我们将使用 Spider 的代码创建一个新的 Python 文件:
```python
from bs4 import BeautifulSoup
import scrapy


class HnSpider(scrapy.Spider):
    name = "hacker-news"
    allowed_domains = ["news.ycombinator.com"]
    start_urls = [f'https://news.ycombinator.com/news?p={i}' for i in range(1,16)]
    
    def parse(self, response):
        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.findAll('tr', class_='athing')
        
        for link in links:
            yield {
                'id': link['id'],
                'title': link.find_all('td')[2].a.text,
                "url": link.find_all('td')[2].a['href'],
                "rank": int(link.td.span.text.replace('.', ''))
        	}
```
在 Scrapy 有很多约定。我们首先在 start _ URLs 中提供所需的所有 URL。Scrapy 将获取每个 URL 并为其调用 parse，在这里我们将使用自定义代码来解析响应。
然后，我们需要配置下 Scrapy，以便我们的爬起行为与目标网站匹配。
你应该一直打开这个。根据响应时间，这个特性会自动调整请求速率和并发线程的数量，并确保爬行器不会向网站发送大量请求。
您可以使用 Scrapy CLI 和不同的输出格式(CSV、 JSON、 XML...)运行这段代码:
```
scrapy crawl hacker-news -o links.json
```
就是这样! 现在，所有的链接都在一个格式很好的 JSON 文件中。
关于这个 Scrapy 还有很多要说的。所以，如果你想了解更多，请不要犹豫，检查我们的专门博客文章关于网络抓取 Scrapy。

### PySpider
PySpider 是 Scrapy 的替代品，虽然有点过时。最近一次发布是在2018年。但是它仍然是相关的，因为它做了很多 Scrapy 不能处理的事情。
首先，PySpider 可以很好地处理 JavaScript 页面(SPA 和 Ajax 调用) ，因为它附带了 PhantomJS，一个无头浏览库。在 Scrapy，这需要安装中间件。最重要的是，PySpider 提供了一个很好的 UI，可以很容易地监视所有的爬取任务。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658500602732-f6c4de0b-b9bc-4b25-9ffe-25839a902b4e.png#clientId=u32c1eb4e-c8f9-4&from=paste&height=124&id=u1faa45cc&name=image.png&originHeight=248&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=73390&status=done&style=none&taskId=u296a123f-9e44-4c50-922f-cf2654fa038&title=&width=600)
然而，你可能还是更喜欢使用 Scrapy，原因有以下几点:

-  更易于理解的指南和文档
- 内置的 HTTP 缓存系统，可以加速您的爬取
- 自动 HTTP 身份验证
- 支持3XX 重定向，以及 HTML 元刷新标记
## 5. Headless browsing 无头浏览
### Selenium & Chrome
Scrapy 非常适合大规模的 web 抓取任务。然而，很难用它来处理大量使用 JavaScript 的站点，例如 SPA (单页应用程序)。Scrapy 本身不能处理 JavaScript，它只能提供静态 HTML 代码。
一般来说，抓取 SPA 是很有挑战性的，因为通常涉及大量的 AJAX 调用和 WebSocket 连接。如果性能是一个问题，那么总是要检查 JavaScript 代码到底在做什么。这意味着使用浏览器检查器手动检查所有网络调用，并复制包含感兴趣数据的 AJAX 调用。
但是，通常会涉及太多的 HTTP 调用来获取所需的数据，在无头浏览器中呈现页面会更容易。另一个很好的用例是截屏，这就是我们将要对 Hacker News 主页做的事情(我们喜欢 Hacker News，不是吗?)还有Selenium的帮助。
> 什么时候我应该使用Selenium？
> 以下是三种最常见的情况:
> - 你正在寻找一个信息，出现在几秒钟后，网页加载到浏览器上
> - 你想要搜索的网站使用了大量的 JavaScript
> - 你试图抓取的网站有一些 JavaScript 检查来阻止“经典”HTTP 客户端

您可以使用 pip 安装 Selenium 包:
```
pip install selenium
```
你也需要 ChromeDriver，在 mac 操作系统上你可以使用 brew。
```
brew install chromedriver
```
然后，我们只需要从 Selenium 包中导入 WebDriver，将 Chrome 配置为 headless = True，设置一个窗口大小(否则它真的很小) ，启动 Chrome，加载页面，最后得到漂亮的屏幕截图:
```
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

driver = webdriver.Chrome(options=options, executable_path=r'/usr/local/bin/chromedriver')
driver.get("https://news.ycombinator.com/")
driver.save_screenshot('hn_homepage.png')
driver.quit()
```
没错，作为一个优秀的网民，我们当然也退出了 WebDriver 实例。现在，你应该得到一个不错的主页截图:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658500737055-6974a149-e7a6-446d-b309-a0534b09d873.png#clientId=u32c1eb4e-c8f9-4&from=paste&height=375&id=ue1f6686c&name=image.png&originHeight=750&originWidth=1200&originalType=binary&ratio=1&rotation=0&showTitle=false&size=274840&status=done&style=none&taskId=u77e001e2-33ab-42bc-b6a9-b0944264c81&title=&width=600)
当然，使用 SeleniumAPI 和 Chrome 还可以做更多的事情。毕竟，这是一个成熟的浏览器实例。

- 运行 JavaScript
- 填表格
- 单击元素
- 使用 CSS 选择器/XPath 表达式提取元素

在无头模式下，Selenium 和 Chrome 是抓取任何你想要的东西的终极组合。你可以使用普通的 Chrome 浏览器自动化所有你能做的事情。
最大的缺点是 Chrome 需要大量的内存/CPU 能量。通过一些微调，您可以将每个 Chrome 实例的内存占用减少到300-400mb，但是每个实例仍然需要1个 CPU 核。
请不要犹豫，查看我们关于 Selenium 和 Python 的深入文章。
如果需要同时运行多个实例，则需要一台具有足够硬件设置和足够内存的计算机来为所有浏览器实例提供服务。如果您想要一个更轻量级、更无忧无虑的解决方案，请查看 ScrapingBee 的站点爬虫 SaaS 平台，它为您完成了许多繁重的工作。
### RoboBrowser
RoboBrowser 是一个 Python 库，它将 Request 和 BeautifulSoup 封装到一个简单易用的包中，并允许您编译自己的自定义脚本来控制 RoboBrowser 的浏览工作流。它是一个轻量级库，但它不是一个无头浏览器，并且仍然具有我们前面讨论过的 Request 和 BeautifulSoup 的相同限制。
例如，如果你想登录到 Hacker-News，你可以编写一个脚本来填充表单，然后点击登录按钮，而不是手工制作一个请求:
```
# pip install RoboBrowser
from robobrowser import RoboBrowser

browser = RoboBrowser()
browser.open('https://news.ycombinator.com/login')

# Get the signup form
signin_form = browser.get_form(action='login')

# Fill it out
signin_form['acct'].value = 'account'
signin_form['password'].value = 'secret'

# Submit the form
browser.submit_form(signin_form)
```
正如您所看到的，代码的编写就好像您是在一个真正的浏览器中手动完成任务一样，即使它不是一个真正的无头浏览库。
RoboBrowser 很酷，因为它的轻量级方法允许您轻松地在计算机上并行处理它。但是，因为它不使用真正的浏览器，所以不能处理像 AJAX 调用或单页应用程序这样的 JavaScript。
不幸的是，它的文档也是轻量级的，我不建议新手或者还没有使用 BeautilfulSoup 或者 RequestsAPI 的人使用它。
## 6. Scraping Reddit data
有时甚至不需要使用 HTTP 客户端或无头浏览器来获取数据。您可以直接使用目标网站公开的 API。这就是我们现在要在 Reddit API 中尝试的。
要访问这个 API，我们将使用 Praw，这是一个包装 Reddit API 的很棒的 Python 包。
安装:
```
pip install praw
```
然后，你需要获得一个 API 密钥。转到 [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)。
滚动到底部创建应用程序:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/237249/1658500862222-1042625e-a2d7-43cf-a79a-7a730e5aa061.png#clientId=u32c1eb4e-c8f9-4&from=paste&height=200&id=uc49fe0d5&name=image.png&originHeight=399&originWidth=509&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47162&status=done&style=none&taskId=udc0c1f90-df90-49ee-8566-41b7dc826a2&title=&width=254.5)
正如 Praw 的文档中所概述的那样，确保提供“重定向 URL”的 [http://localhost:8080](http://localhost:8080)。
单击 create app 后，将加载包含 API 详细信息和凭据的屏幕。在我们的示例中，需要客户端 ID、 secret 和用户代理。
现在我们将获得/r/Entrepreneur1,000个帖子，并将其导出到 CSV 文件中。
```python
import praw
import csv
reddit = praw.Reddit(client_id='you_client_id', client_secret='this_is_a_secret', user_agent='top-1000-posts')

top_posts = reddit.subreddit('Entrepreneur').top(limit=1000)

with open('top_1000.csv', 'w', newline='') as csvfile:
    fieldnames = ['title','score','num_comments','author']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for post in top_posts:
        writer.writerow({
            'title': post.title,
            'score': post.score,
            'num_comments': post.num_comments,
            'author': post.author
            })
```
如您所见，实际的提取部分只有一行 Python 代码。在 subreddit 上运行 top 并将文章存储在 top _ post 中。
Praw 还有许多其他用例。你可以做各种疯狂的事情，比如用情绪分析库实时分析次级 Reddit，预测下一个 $GME..。

## 总结
下面是我们在这篇博文中讨论的所有技术的一个快速回顾表。请不要犹豫，让我们知道，如果你知道一些资源，你觉得属于这里。

| Name  | socket  | urllib3 | requests | scrapy | selenium |
| --- | --- | --- | --- | --- | --- |
| 易于使用 | - - - | + + | + + + | + + | + |
| 灵活性 | + + + | + + + | + + | + + + | + + + |
|  执行速度 | + + + | + + | + + | + + + | + |
| 常用案例 | * 编写低级编程接口 | * 需要对 HTTP (pip、 aws 客户端、请求、流)进行精细控制的高级应用程序 | * 调用 API *
* 简单应用程序(根据 HTTP 需求) | * 搜索重要的网站列表
* 过滤、提取和载入抓取的数据 | * JS 渲染
* 抓取单页应用
 * 自动化测试
* 程序化截图 |
| 了解更多 | * [Official documentation官方文件](https://docs.python.org/3/library/socket.html)
* [Great tutorial很棒的教程](https://realpython.com/python-sockets/) | * [Official documentation](https://urllib3.readthedocs.io/en/latest/)
* [PIP usage of urllib3Urllib3的 PIP 使用情况](https://github.com/pypa/pip/search?q=urllib3&unscoped_q=urllib3) | * [Official documentation](https://github.com/psf/requests)
* [Requests usage of urllib3Urllib3的请求使用](https://github.com/psf/requests/search?q=urllib3&unscoped_q=urllib3) | * [Official documentation](https://scrapy.org/)* [Scrapy overviewScrapy 综述](https://www.datacamp.com/community/tutorials/making-web-crawlers-scrapy-python) | * [Official documentation](https://www.seleniumhq.org/)
* [Scraping SPA刮水疗](https://www.scrapingbee.com/blog/scraping-single-page-applications/) |

我希望你喜欢这篇博文！这是对最常用的用于 web 抓取的 Python 工具的简短介绍。在接下来的文章中，我们将更深入地讨论所有的工具或主题，比如 XPath 和 CSS 选择器。
如果您想了解更多有关 Python 中 HTTP 客户端的信息，我们刚刚发布了有关最佳 Python HTTP 客户端的指南。
Happy Scraping!
