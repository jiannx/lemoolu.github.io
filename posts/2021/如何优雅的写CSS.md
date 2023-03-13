---
title: 如何优雅的写CSS
date: 2021-03-23
tags: web
---

## 引言

本文主要介绍前端写css的几种方式，针对各种场景的实现方式

## 方案

### 方案1：namespace

通过约定的名称来隔离css

```css
.component-a .title{
}
.component-b .title{
}
```

可以通过less或者saas更加简洁的实现

```css
.component-a {
	.title {}
}
.component-b {
	.title {}
}
```

但是当A,B组件嵌套时，a组件的title会在b上面生效

```html
<div class="component-a">
	<div class="component-b">
		<div class="title"><div> <!--a和b的样式都会生效-->
	<div>
<div>
```

解决方案，可以采用下面形式

```less
.component-a {
  &-title {
  	color: red;
  }
}
.component-b {
  &-title {
  	color: red;
  }
}
// 转化后的css
.component-a-title {
  color: red;
}
.component-b-title {
  color: red;
}
```

缺点：

- 需要人为约束命名，可能出现预测外的冲突
- css类名可能会很长，需要自行注意

优点：

- 实现方案简单
- 类名打包后没有被修改

适用场景

- 编写ui组件库，代码可控的场景下，样式又可以被使用方二次覆盖

### 方案2：CSS Modules

通过 webpack 等构建工具使 class 作用域为局部。

CSS 依然是还是 CSS，例如 webpack，配置 css-loader 的 options modules: true。

```
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, loader: 'css-loader', options: { modules: true, }, },],
  },
};
```

modules 更具体的配置项参考：[https://www.npmjs.com/package/css-loader](https://www.npmjs.com/package/css-loader)

loader 会用唯一的标识符 (identifier) 来替换局部选择器。所选择的唯一标识符以模块形式暴露出去。

示例： webpack css-loader options

```
options: {
  ...,
  modules: {
    mode: 'local',
    // 样式名规则配置
    localIdentName: '[name]__[local]--[hash:base64:5]',
  },
},
...
```

App.js

```
import styles from"./App.css";

<div>
  <header className={styles["header__wrapper"]}>
    <h1 className={styles["title"]}>标题</h1>
    <div className={styles["sub-title"]}>描述</div>
  </header>
</div>
```

App.css

```
.header__wrapper {
  text-align: center;
}

.title {
  color: gray;
  font-size: 34px;
  font-weight: bold;
}

.sub-title {
  color: green;
  font-size: 16px;
}
```

编译后端的 CSS，classname 增加了 hash 值。

```
.App__header__wrapper--TW7BP {
  text-align: center;
}

.App__title--2qYnk {
  color: gray;
  font-size: 34px;
  font-weight: bold;
}

.App__sub-title--3k88A {
  color: green;
  font-size: 16px;
}
```

### 方案3：CSS in js

使用 JS 语言写 CSS，也是 React 官方有推荐的一种方式。

从 React 文档进入 [https://github.com/MicheleBertoli/css-in-js](https://github.com/MicheleBertoli/css-in-js) ，可以发现目前的 CSS in JS 的第三方库有 60 余种。

看两个比较大众的库：

- reactCSS
- styled-components

#### reactCSS

支持 React、Redux、React Native、autoprefixed、Hover、伪元素和媒体查询（http://reactcss.com/）

看下官网文档 ：

```
const styles = reactCSS({
  'default': {
    card: {
      background: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,.15)',
    },
  },
  'zIndex-2': {
    card: {
      boxShadow: '0 4px 8px rgba(0,0,0,.15)',
    },
  },
}, {
  'zIndex-2': props.zIndex === 2,
})
```

复制代码

```
class Component extends React.Component {
  render() {
    const styles = reactCSS({
      'default': {
        card: {
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,.15)',
        },
        title: {
          fontSize: '2.8rem',
          color: this.props.color,
        },
      },
    })
    return (
      <div style={ styles.card }>
        <div style={ styles.title }>
          { this.props.title }
        </div>
        { this.props.children }
      </div>
    )
  }
}
```

复制代码

可以看出，CSS 都转化成了 JS 的写法，虽然没有学习成本，但是这种转变还是有一丝不适。

#### styled-components

styled-components，目前社区里最受欢迎的一款 CSS in JS 方案（https://www.styled-components.com/）

```
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${props => props.primary && css`
    background: white;
    color: palevioletred;
  `}
`
render(
  <div>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>
    <Button as={Link} href="/docs" prefetch>
      Documentation
    </Button>
  </div>
)
```

### 方案4：utility class

通过将样式拆分成非常细类，在使用的时候通过组合实现，类似如下

```
<div class="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
  </div>
  <div class="ml-6 pt-1">
    <h4 class="text-xl text-gray-900 leading-tight">ChitChat</h4>
    <p class="text-base text-gray-600 leading-normal">
      You have a new message!
    </p>
  </div>
</div>
```

[https://tailwindcss.com/](https://tailwindcss.com/)

## 参考
css代码规范：[https://github.com/fex-team/styleguide/blob/master/css.md](https://github.com/fex-team/styleguide/blob/master/css.md)
less：[https://less.bootcss.com/](https://less.bootcss.com/)
[https://www.infoq.cn/article/FtLPPDeFO27PRgqHLO5a](https://www.infoq.cn/article/FtLPPDeFO27PRgqHLO5a)