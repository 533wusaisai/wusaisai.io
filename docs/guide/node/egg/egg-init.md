# Egg项目手动搭建

Egg.js 是一个基于 Koa 的框架，它提供了一套更加严格的约定，帮助团队构建更加可维护的 Node.js 应用。以下是搭建一个基本的 Egg.js 项目的步骤：

## 步骤 1：初始化项目

首先，你需要创建一个新的目录作为项目的根目录，并初始化 npm 项目：

```js
mkdir my-egg-app
cd my-egg-app
npm init -y
```

## 步骤 2：安装 Egg.js

通过 npm 安装 Egg.js：

::: code-group

``` sh [npm]
npm install egg --save
```
:::

## 步骤 3：创建基本目录结构

Egg.js 遵循特定的目录结构，以下是最基本的结构：

```js
my-egg-app
├── app
│   ├── controller
│   ├── service
│   ├── middleware
│   ├── model
│   ├── router.js
│   └── ...
├── config
│   ├── config.default.js
│   └── ...
├── test
├── app.js (可选)
└── package.json
```

你可以手动创建这些目录，或者使用 Egg.js 提供的脚手架工具 egg-init 来生成：

```js
npm install egg-init -g
egg-init --type=simple
```
## 步骤 4：编写 Controller 和 Router

在 app/controller 目录下创建一个控制器文件，例如 home.js：

```js
// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello World';
  }
}

module.exports = HomeController;

```
然后在 app/router.js 文件中定义路由：

```js
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
```
## 步骤 5：配置文件

在 config 目录下，你可以定义不同环境的配置文件。最基本的配置文件是 config.default.js：

```js
// config/config.default.js
exports.keys = 'some_secret_key'; // 你应该为你的应用设置一个密钥

// 添加其他配置...
```
## 步骤 6：启动应用

在 package.json 文件中添加启动脚本：

```js
{
  "scripts": {
    "start": "egg-scripts start --daemon",
    "stop": "egg-scripts stop",
    "dev": "egg-bin dev",
    "debug": "egg-bin debug",
    "test": "egg-bin test"
  }
}
```

然后，你可以使用以下命令在本地开发环境启动你的应用：

```js
npm run dev
```

应用默认会在 7001 端口启动，你可以通过访问 `http://localhost:7001` 来查看你的应用。

## 步骤 7：编写其他应用逻辑

根据你的应用需求，你可以继续添加服务（Service）、中间件（Middleware）、模型（Model）等。

## 步骤 8：编写测试

Egg.js 支持使用 mocha 进行单元测试，你可以在 test 目录下编写测试用例。

## 步骤 9：部署

使用 npm start 来启动你的应用，或者使用 PM2、Docker 等工具进行部署。

::: tip 

这些步骤为你提供了一个基本的 Egg.js 项目搭建流程。Egg.js 的文档非常全面，你可以通过阅读 Egg.js 官方文档 来了解更多高级特性和最佳实践。
:::

Egg 项目Demo [https://gitee.com/wusaisai533](https://gitee.com/wusaisai533/www-tjhb/tree/egg/)