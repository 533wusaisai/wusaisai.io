# Express 项目搭建

搭建一个基本的 Express.js 项目涉及到几个步骤，包括设置项目结构、安装依赖、编写应用代码以及运行和测试应用。下面是详细的步骤：

## 步骤 1：初始化项目

首先，创建一个新的目录作为项目的根目录，并在该目录下初始化 npm 项目：

```js
mkdir my-express-app
cd my-express-app
npm init -y
```

这将创建一个新的 package.json 文件。

## 步骤 2：安装 Express

通过 npm 安装 Express：

```js
npm install express
```
## 步骤 3：创建应用入口文件

在项目根目录下创建一个名为 app.js 的文件，这将是你的 Express 应用的入口点：

```js
// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
## 步骤 4：添加路由处理

在 Express 中，路由处理通常是通过定义路由和对应的处理函数来完成的。你可以在 app.js 中直接定义，或者使用 Express 的 Router 对象在单独的文件中定义。

例如，创建一个 routes 目录，并在其中创建一个 index.js 文件：

```js
// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Express');
});

module.exports = router;
```

然后在 app.js 中使用这个路由：

```js
// app.js
const express = require('express');
const indexRouter = require('./routes/index');

const app = express();

app.use('/', indexRouter);

// ...其他设置和路由

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
## 步骤 5：添加其他中间件

根据你的需求，你可能还需要安装和配置其他中间件，例如 body-parser 用于解析请求体，morgan 用于日志记录等。

```js
npm install body-parser morgan
```

在 app.js 中使用它们：

```js
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ...其他路由和中间件

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
## 步骤 6：组织项目结构

随着项目的增长，你可能需要更好地组织你的代码。一个常见的结构是：

```js
my-express-app
├── node_modules
├── routes
│   └── index.js
├── public
├── views
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

你可以使用 mocha, chai, supertest 等测试框架来编写测试。例如，使用 mocha 和 supertest 进行 HTTP 断言：

```js
npm install --save-dev mocha chai supertest

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

你可以使用 PM2、Docker 或其他云服务提供商来部署你的 Express 应用。

::: tip
这些步骤为你提供了一个基本的 Express.js 项目搭建流程。Express.js 的文档非常全面，你可以通过阅读 Express.js 官方文档 来了解更多高级特性和最佳实践。
:::


Express 项目Demo [https://gitee.com/wusaisai533](https://gitee.com/wusaisai533/www-tjhb/tree/express/)
