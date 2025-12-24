---
title: VSCode调试CLI
date: 2019-12-14
tags: web
---

# 背景

1. 开发studio的material cli命令，类似umi，链路非常长，涉及较多依赖库。且需要在真实的项目中执行脚本![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1628563718685-f22bf19f-e92c-4ae7-918e-8a0a6f8ed24c.png#clientId=ub44f52b4-9227-4&from=paste&height=211&id=ub396d3a7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=422&originWidth=1708&originalType=binary&ratio=1&size=355575&status=done&style=none&taskId=ua5854b5f-6928-49b5-9d5c-d10c1b3b975&width=854#id=g88v7&originHeight=422&originWidth=1708&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
2. cli对应的代码是ts，通过tsc编译生成lib库，也就是说，实际执行的代码为lib内
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1628563829669-502bbcc9-2619-4a8e-83c9-dda1b6edac45.png#clientId=ub44f52b4-9227-4&from=paste&height=423&id=u87e68bf0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=846&originWidth=648&originalType=binary&ratio=1&size=164075&status=done&style=none&taskId=u07bf6c2c-612b-4ffb-96b1-1c33905fab4&width=324#id=RhyHv&originHeight=846&originWidth=648&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
3. 代码结构
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1630488281517-2c850fdc-bc4e-4eb3-9cf0-54cea98ed236.png#clientId=u710e3832-8bf2-4&from=paste&id=u1f3e4275&margin=%5Bobject%20Object%5D&name=image.png&originHeight=632&originWidth=561&originalType=binary&ratio=1&size=162824&status=done&style=none&taskId=u5713593f-5cf0-4bb6-9416-09ba5c02873#id=wdq3j&originHeight=632&originWidth=561&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
# 方案

1. 在根目录下添加.vscode/launch.json文件

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",                               // nodejs的调试类型固定为node，<必填>
      "request": "launch",                          // 固定为launch，<必填>——launch|attach二选一
      "name": "调试 start",                          // 将会显示到vscode的debug栏的下拉菜单的名称，<必填>
      "cwd": "${workspaceFolder}/test/demo-web1",   // 命令的工作目录,[可选]
      "console": "integratedTerminal",              // console类型
      "runtimeExecutable": "npm",                   // 将要执行的命令
      "runtimeArgs": [                              // 命令参数列表
        "run",
        "start"
      ],
      "skipFiles": [
        "<node_internals>/**",                      // 忽略node内部代码
        "${workspaceFolder}/node_modules/**/*.js"   // 忽略node_modules代码
      ],                    
      "stopOnEntry": true,  // 在程序文件的入口处断点,[可选]——建议指定为true，免去了先找到对应文件再打开的苦恼
      "port": 5858          // 监听的调试端口号，与`script`中的设置保持一致
    }
  ]
}
```

2. cli代码中的tsconfig需包含sourcemap导出，保证能直接调试到源码

```
{
  "compilerOptions": {
    "outDir": "./lib",
    "experimentalDecorators": true,
    "allowJs": true,
    "target": "es5",
    "lib": [
      "es2015",
      "es6",
      "dom"
    ],
    "jsx": "react",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "sourceMap": true,
  },
  "include": [
    "src"
  ]
}
```

3. 在源码中添加断点
4. 在调试面板执行调试
![image.png](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/323891/1628564096986-a3ef44e0-0a61-45e7-ab48-ce2470ad0012.png#clientId=ub44f52b4-9227-4&from=paste&height=330&id=u678ce6d5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=660&originWidth=736&originalType=binary&ratio=1&size=76136&status=done&style=none&taskId=ua25cf302-05b0-4759-b600-2f8342c8deb&width=368#id=qFlRm&originHeight=660&originWidth=736&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
5. 快捷键F5启动调试
