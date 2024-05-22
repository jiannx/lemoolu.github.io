---
title: 浏览器中的ESM
date: 2020-11-02
tags: web
---

# 一、前言

早期的web应用非常简单，可以直接加载js的形式去实现。随着需求的越来越多，应用越做越大，需要模块化去管理项目中的js、css、图片等资源。这里有很多大家熟悉的模块化标准， CJS、AMD、CMD、UMD 等等。模块化提供了我们更好的方式来组织和维护函数以及变量。而在 npm 生态开发的背景下，CJS 模块是开发过程中接触最多也是无法避免的。但由于浏览器并不能直接执行基于 CJS 打包的模块，因此类似 webpack 等打包工具便应运而生。随着webpack 大有一统构建工具的趋势下，JavaScript 官方的标准化模块系统ESM完成了。本文主要介绍下模块化标准间差异、基本加载原理。

# 二、模块化发展

### 1. 为何要模块化

仔细想想，用 JavaScript 编码就是管理变量。 这一切都是关于为变量赋值，或为变量添加数字，或将两个变量组合在一起并将它们放入另一个变量中。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1617691111517-6c03d831-bea9-4e39-91aa-1a5611003340.png#height=130&id=L2Jqf&margin=%5Bobject%20Object%5D&name=image.png&originHeight=260&originWidth=732&originalType=binary&ratio=1&size=37635&status=done&style=none&width=366#id=k3LRO&originHeight=260&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
如果代码中仅有少量的变量，那么组织起来其实是很简单的。一旦有很多的变量，我们会通过函数作用域去组织变量。因为函数作用域的缘故，一个函数无法访问另一个函数中定义的变量。
如果只维护少量变量非常简单。但是如果有很多的变量，我们就需要用一种方法来帮助做到这一点，叫做作用域。由于作用域在 JavaScript 中的工作方式，函数不能访问在其他函数中定义的变量。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1617691140538-4b1f8f44-d856-4ad6-86c4-d2bc64e7fd6d.png#height=214&id=qivH7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=427&originWidth=732&originalType=binary&ratio=1&size=52992&status=done&style=none&width=366#id=UvCA2&originHeight=427&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
这种方式是很有效的。在写一个函数的时候，只需要考虑当前函数，而不必担心其它函数可能会改变当前函数的变量。如果想要函数之间共享变量要怎么办呢？一种通用的做法是全局作用域。
在 jQuery 时代这种提升做法相当普遍。在我们加载任何 jQuery 插件之前，我们必须确保 jQuery 已经存在于全局作用域。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1617691155326-6f087663-13b8-4303-89fb-185a1a806e16.png#height=329&id=seNpw&margin=%5Bobject%20Object%5D&name=image.png&originHeight=658&originWidth=732&originalType=binary&ratio=1&size=110082&status=done&style=none&width=366#id=nZGxU&originHeight=658&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
所有的 `<script>` 必须以正确的顺序排列，必须保证被依赖的变量先加载。如果排列错了，那么在运行过程中，应用将会抛出错误，并且停止继续运行。
代码之间的依赖是不透明的。这使得代码维护变得困难。代码变得充满不确定性。任何函数都可能依赖全局作用域中的任何变量。
其次，由于变量存在于全局作用域，所以任何代码都可以改变它。

### 2. 模块化的作用

模块化为你提供了一种更好的方式来组织变量和函数。可以把相关的变量和函数放在一起组成一个模块。这种实现形式可以把函数和变量放在模块作用域中。模块作用域还提供一种暴露变量给其他模块使用的方式。模块可以明确地指定哪些变量、类或函数对外暴露。
对外暴露的过程称为导出。一旦导出，其他模块就可以明确地声称它们依赖这些导出的变量、类或者函数。
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1617691236617-ab1c7a4d-7c01-4501-bb2c-d215703be657.png#height=329&id=agOip&margin=%5Bobject%20Object%5D&name=image.png&originHeight=658&originWidth=732&originalType=binary&ratio=1&size=116371&status=done&style=none&width=366#id=xw7em&originHeight=658&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
因为这是一种明确的关系，所以你可以很简单地辨别哪些代码能移除，哪些不能移除。
拥有了在模块之间导出和导入变量的能力之后，你就可以把代码分割成更小的、可以独立运行地代码块了。基于这些代码块，你就可以像搭乐高积木一样，创建所有不同类型的应用。比较流程的规范有CommonJS，AMD，CMD，ES，UMD等

### 3. 现有模块标准

`CJS` 是 `CommonJS` 的缩写。只适用于node端：

```javascript
const _ = require('lodash'); 

module.exports = function doSomething(n) { }
```

`AMD` 代表异步模块定义。在浏览器端有效：

```javascript
define(['dep1', 'dep2'], function (dep1, dep2) {
    return function () {};
});
```

`UMD` 代表通用模块定义（`Universal Module Definition`）：

```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```

# 三、什么ESM

### 1. 简介

ESM是ES6提出的标准模块系统，ECMAScript modules。**JS自己的模块体系**

```html
<script type="module">
  import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
  class App extends Component {
    state = {
      count: 0
    }
    add = () => {
      this.setState({ count: this.state.count + 1 });
    }
    render() {
      return html`
        <div class="app">
          <div>count: ${this.state.count}</div>
          <button onClick=${this.add}>Add Todo</button>
        </div>
      `;
    }
  }
  render(html`<${App} page="All" />`, document.body);
</script>
```

思考：上述代码和在webpack中开发有啥区别？

### 2. 浏览器端技术实现

回顾下Webpack执行流程

1. **本地模块化解析**（通过webpack或者babel，将import解析成cjs）
2. 将各个库打包成一个js boundle
3. 开启服务，托管资源
4. 浏览器获取资源
5. 执行代码

浏览器端ESM执行流程

1. 开启服务，托管资源（ES源码）
2. 加载入口文件，**浏览器模块化解析**
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618402575604-fbd03909-2304-4ea6-b4c1-898d6473cfb3.png#height=138&id=SGpO2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=275&originWidth=732&originalType=binary&ratio=1&size=31076&status=done&style=none&width=366#id=A39qd&originHeight=275&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
3. 构建 
   1. 遍历依赖树，先解析文件，然后找出依赖，最后又定位并加载这些依赖，如此往复。（下载所有的js）![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618402703342-3fc7c920-2e2b-4c4b-8419-3bbf184f2d62.png#height=332&id=rnegV&margin=%5Bobject%20Object%5D&name=image.png&originHeight=442&originWidth=732&originalType=binary&ratio=1&size=79543&status=done&style=none&width=549#id=qsdzG&originHeight=442&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
   2. 模块映射
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618403217085-c0591a7f-79ee-4d4a-9bab-faee5dfd4cb8.png#height=263&id=bL3wB&margin=%5Bobject%20Object%5D&name=image.png&originHeight=350&originWidth=732&originalType=binary&ratio=1&size=73525&status=done&style=none&width=549#id=uynUc&originHeight=350&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
当加载器要从一个 URL 加载文件时，它会把 URL 记录到模块映射中，并把它标记为正在下载的文件。然后它会发出这个文件请求并继续开始获取下一个文件。
   3. 解析模块
所有的模块都按照严格模式来解析的。不同文件类型按照不同的解析方式称。在浏览器中，通过 `type="module"` 属性告诉浏览器这个文件需要被解析为一个模块。不过在 Node 中，我们并不使用 HTML 标签，所以也没办法通过 `type` 属性来辨别。社区提出一种解决办法是使用 `.mjs` 拓展名。
4. 运行
采用深度优先的后序遍历方式，顺着关系图到达最底端没有任何依赖的模块，然后设置它们的导出。模块映射会以 URL 为索引来缓存模块，以确保每个模块只有一个模块记录。这保证了每个模块只会运行一次。

### 3. 为什么火起来

- ES语法基本确定
- http2普及
- 新浏览器普及
- 开发与发布代码一致
- 启动快
- 全新加载模式

#### 目前浏览器支持：

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618227209645-ca67c89d-c06d-4ef6-b299-c59c8b29e4c2.png#height=369&id=BOLF5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=738&originWidth=1356&originalType=binary&ratio=1&size=539524&status=done&style=none&width=678#id=WwMmp&originHeight=738&originWidth=1356&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618226827492-c5dba372-4ddd-46e7-901b-b30891ea71b5.png#height=229&id=wM3st&margin=%5Bobject%20Object%5D&name=image.png&originHeight=457&originWidth=1365&originalType=binary&ratio=1&size=382629&status=done&style=none&width=682.5#id=x0MEM&originHeight=457&originWidth=1365&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618227073122-a39a26d8-edee-413e-924f-a9e5225bf315.png#height=218&id=FE6Um&margin=%5Bobject%20Object%5D&name=image.png&originHeight=435&originWidth=1349&originalType=binary&ratio=1&size=375861&status=done&style=none&width=674.5#id=gGQfd&originHeight=435&originWidth=1349&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618227049004-7ecbcffa-74f5-473f-96fc-1e3b6f7b29b2.png#height=183&id=wrTBA&margin=%5Bobject%20Object%5D&name=image.png&originHeight=365&originWidth=1353&originalType=binary&ratio=1&size=314409&status=done&style=none&width=676.5#id=htnpU&originHeight=365&originWidth=1353&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618226815005-4e04d405-7cac-4e6e-b7c2-842a00cd194e.png#height=217&id=Illfh&margin=%5Bobject%20Object%5D&name=image.png&originHeight=433&originWidth=1360&originalType=binary&ratio=1&size=345912&status=done&style=none&width=680#id=OlU9x&originHeight=433&originWidth=1360&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618226850102-27a9543e-642f-4378-bc4b-06ee6f816796.png#height=216&id=hVK0i&margin=%5Bobject%20Object%5D&name=image.png&originHeight=432&originWidth=1360&originalType=binary&ratio=1&size=374004&status=done&style=none&width=680#id=r4uEt&originHeight=432&originWidth=1360&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
目前只有5%的浏览器不兼容es相关规范。

### 4. 为什么还没火起来

- 部分浏览器的兼容性
- 历史包袱悠久
- 生态不完善

# 四、实战

当我们在项目中使用需要考虑以下几个问题点

#### 1. 代码开发需要基于es开发

```html
let a = 1;
new Promise()
() => {}
...
```

#### 2. 依赖库加载

- node_modules代码服务化
- 兼容cjs 
   1. 加载包内部es目录
   2. [cjstoesm](https://github.com/wessberg/cjstoesm)

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618466762246-8bd6f4dc-13ad-4a20-9377-7606bf3ad859.png#height=472&id=InSF2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=944&originWidth=580&originalType=binary&ratio=1&size=187253&status=done&style=none&width=290#id=icjzm&originHeight=944&originWidth=580&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- CDN（network for npm） 
   1. [https://unpkg.com/](https://unpkg.com/)
   2. [https://www.skypack.dev/](https://www.skypack.dev/)

#### 3. 兼容不支持的浏览器

- `type="module"`实现 
   - 如果浏览器不支持，他只识别`type="text/javascript"` 不识别 `type="module"` ，故不下载js；如果支持，则会下载js
   - 如果浏览器不支持，则会忽略nomodule，下载js；如果支持，则不会下载js

```html
<script type="module" src="app.js"></script>
<script nomodule src="app-bundle.js"></script>
```

- systemjs实现[https://github.com/systemjs/systemjs](https://github.com/systemjs/systemjs)

```html
<script src="system.js"></script>
<script type="systemjs-importmap">
{
  "imports": {
    "lodash": "https://unpkg.com/lodash@4.17.10/lodash.js"
  }
}
</script>
<script type="systemjs-module" src="/js/main.js"></script>
```

#### 4. jsx支持

- 通过其他开源库

```html
<script type="module">
    import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
    class App extends Component {
      render() {
        return html`
          <div class="app">
          </div>
        `;
      }
    }
    render(html`<${App} page="All" />`, document.body);
</script>
```

- 本地语法糖解析

```html
<APP {...Props}/>
=>
React.createElement(App, {...props})
```

### 现有脚手架

#### 1. snowpack

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618457722406-11bde033-4f95-4205-ac10-bb279611a69c.png#height=514&id=H2AIw&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1028&originWidth=1812&originalType=binary&ratio=1&size=860949&status=done&style=none&width=906#id=LZvB9&originHeight=1028&originWidth=1812&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- 托管node_modules
- 支持图片、css等资源
- JSX 和 Typescript 编译
- HMR
- ...

#### 2. vite

[https://cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/)
目前snowpack的作者后续可能不再维护了，所以推荐大家使用vite

# 五、ESM未来

![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1618231073130-e040f1d0-e0f4-47a8-9a55-0432abdea9fd.png#height=596&id=FAG2O&margin=%5Bobject%20Object%5D&name=image.png&originHeight=794&originWidth=593&originalType=binary&ratio=1&size=224978&status=done&style=none&width=445#id=QYu4T&originHeight=794&originWidth=593&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
2018 年 5 月 Firefox 60 发布后，所有的主流浏览器就都默认支持 ESM 了。Node 也正在添加 ESM 支持，为此还成立了[工作小组](https://github.com/nodejs/modules)来专门研究 CJS 和 ESM 之间的兼容性问题。所以，在未来你可以直接在 `<script>` 标签中使用 `type="module"`，并且在代码中使用 `import` 和 `export` 。同时，更多的模块功能也正在研究中。比如[动态导入提案](https://github.com/tc39/proposal-dynamic-import)已经处于 Stage 3 状态；`import.meta`也被提出以便 Node.js 对 ESM 的支持；[模块定位提案](https://github.com/domenic/package-name-maps) 也致力于解决浏览器和 Node.js 之间的差异。
相信在不久的未来，跟模块一起玩耍将会变成一件更加愉快的事！

node v10以上版本全部支持ESM [https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-node-js](https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-node-js)

# 六、链接：

ECMAScript modules in browsers [https://jakearchibald.com/2017/es-modules-in-browsers/](https://jakearchibald.com/2017/es-modules-in-browsers/)
JavaScript 模块现状 [https://zhuanlan.zhihu.com/p/26567790](https://zhuanlan.zhihu.com/p/26567790)
基于esm、html、unpkg的前端开发模式：[https://github.com/developit/htm](https://github.com/developit/htm)
How I Build JavaScript Apps In 2021：[https://timdaub.github.io/2021/01/16/web-principles/](https://timdaub.github.io/2021/01/16/web-principles/)
Find out how much turning on modern JS could save. [https://estimator.dev/](https://estimator.dev/)
什么是amd、commonjs、umd、esm? [https://zhuanlan.zhihu.com/p/96718777](https://zhuanlan.zhihu.com/p/96718777)
ES modules: A cartoon deep-dive：[https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
import.map：[https://github.com/WICG/import-maps](https://github.com/WICG/import-maps)
面对 ESM 的开发模式，webpack 还有还手之力吗? [https://topic.atatech.org/articles/202736](https://topic.atatech.org/articles/202736)
