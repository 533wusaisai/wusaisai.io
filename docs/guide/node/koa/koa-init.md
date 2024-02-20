# KOA 项目搭建


搭建一个基本的 Koa.js 项目涉及到几个步骤，包括设置项目结构、安装依赖、编写应用代码以及运行和测试应用。下面是详细的步骤：

## 步骤 1：初始化项目

首先，创建一个新的目录作为项目的根目录，并在该目录下初始化 npm 项目：

```js
mkdir my-koa-app
cd my-koa-app
npm init -y
```

这将创建一个新的 package.json 文件。

## 步骤 2：安装 Koa

通过 npm 安装 Koa：

::: code-group
```sh [npm]
npm install koa
```
:::
## 步骤 3：创建应用入口文件

在项目根目录下创建一个名为 app.js 的文件，这将是你的 Koa 应用的入口点：

```js
// app.js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```
## 步骤 4：添加路由处理

Koa 本身不包含路由功能，你需要安装额外的中间件，如 koa-router：

```js
npm install koa-router
```

然后在你的应用中使用它：

```js
// app.js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello Koa';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```
## 步骤 5：添加其他中间件

根据你的需求，你可能还需要安装和配置其他中间件，例如 koa-bodyparser 用于解析请求体，koa-static 用于提供静态文件服务等。

```js
npm install koa-bodyparser koa-static
```

在 app.js 中使用它们：

```js
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(serve('./public'));

// ...其他路由和中间件

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```
## 步骤 6：组织项目结构

随着项目的增长，你可能需要更好地组织你的代码。一个常见的结构是：

```js
my-koa-app
├── node_modules
├── public
├── routes
│   └── index.js
├── views
├── controllers
├── services
├── middlewares
├── app.js
└── package.json
```
## 步骤 7：运行应用

在 package.json 文件中添加启动脚本：

```js
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

然后，你可以使用以下命令在本地开发环境启动你的应用：

```js
npm run dev
```

如果你还没有安装 nodemon，它是一个实用的工具，可以在你的文件更改时自动重启服务器：

```js
npm install -g nodemon
```

或者作为开发依赖安装在项目中：

```js
npm install --save-dev nodemon
```
## 步骤 8：编写测试

你可以使用 mocha, jest, ava 等测试框架来编写测试。例如，使用 mocha 和 supertest 进行 HTTP 断言：

```js
npm install --save-dev mocha supertest
```

然后添加测试脚本到 package.json：

```js
{
  "scripts": {
    "test": "mocha"
  }
}
```
## 步骤 9：部署

你可以使用 PM2、Docker 或其他云服务提供商来部署你的 Koa 应用。



::: tip
这些步骤为你提供了一个基本的 Koa.js 项目搭建流程。Koa.js 的文档非常全面，你可以通过阅读 Koa.js 官方文档 来了解更多高级特性和最佳实践。
:::

koa 项目Demo [https://gitee.com/wusaisai533](https://gitee.com/wusaisai533/www-tjhb/tree/koa2/)