# 手动搭建vue项目


## 1. webpack-template

### 1. 项目创建
```js
mkdir project-name
cd project-name
```
### 2. 初始化 npm 项目
```js
npm init -y

```
### 3. 安装vue依赖

```js
pnpm add vue vue-loader vue-template-compiler 
```

### 4. 安装webpack依赖

```js
pnpm add webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```

### 5. 配置Typescript (可选)

```js
pnpm add typescript ts-loader
```

### 6. 配置解析css

```js
pnpm add css-loader -D
```


### 7. 目录结构

````md
project-name/
|-- src/              # 项目主文件夹
|   |-- components/   # 通用组件
|   |-- App.vue       # 主文件
|   |-- main.ts       # 项目入口文件
|-- public/         
|   |-- index.html    # 页面文件
|-- webpack.config.js # 项目启动编译打包文件
|-- tsconfig.json     # ts配置文件
````
### 8. 项目文件

```js
// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```
```js
// src/App.vue
<template>
  <div id="app">
    <h1>Hello Vue!</h1>
  </div>
</template>
```
**webpack.config.js**

::: details webpack.config.js
```js

const { Configuration } = require('webpack')
const {VueLoaderPlugin} = require('vue-loader');
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: "development",
    // 入口文件
    entry: './src/main.ts',
    // 出口文件
    output: {
        filename: "[hash].js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            // 指定 html 模板位置
            template: "./public/index.html"
        }),
        new VueLoaderPlugin()
  ],
  module: {
    rules: [
        {
            test: /\.ts$/, // 解析 ts
            loader: "ts-loader",
            exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
       // 如果你的项目中使用了 CSS，你也需要相应的 loader
       {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },

    ]
  }
}
module.exports = config

```
:::

::: danger ERROR
ERROR in /Users/admin/Desktop/my-vue-project/src/main.ts
./src/main.ts 2:16-27
[tsl] ERROR in /Users/admin/Desktop/my-vue-project/src/main.ts(2,17)
TS2307: Cannot find module './App.vue' or its corresponding type declarations.
ts-loader-default_e3b0c44298fc1c14
::: 

::: tip 注意 
配置可能会在加载.vue文件是 出现以上错误说明编译器无法找到.vue模块声明 
:::
**以下是解决方案**

 - `npm install --save-dev @vue/runtime-dom`
 - 创建.d.ts 文件（例： vue-shims.d.ts）
 ```js
 declare module "*.vue" {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
 }
 ```
 - tsconfig.json

 ::: details tsconfig.json
 ```js
 {
  "compilerOptions": {
    // ...其他配置...
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    // 确保 TypeScript 包含 .d.ts 文件
    "types": [
      "webpack-env",
      "@vue/runtime-dom" // 对于 Vue 3.x
      // "@types/vue" // 对于 Vue 2.x
    ],
    // 如果你有自定义的类型声明文件，确保它们被包含在内
    "include": [
      "src/**/*.ts",
      "src/**/*.d.ts",
      "src/**/*.vue"
    ]
  }
 }
 ```
 :::




## 2. vite-template

### 1: 初始化项目

首先，创建一个新的目录并初始化一个新的 npm 项目：

```JS
mkdir my-vue-app
cd my-vue-app
npm init -y
```
### 2: 安装 Vite 和 Vue
```js
npm install vite vue
```
### 3: 创建项目文件

创建一个 index.html 文件作为入口点，并在其中添加一个 <div id="app"></div> 作为 Vue 应用的挂载点：

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vite + Vue</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```
### 4: 设置 Vite 配置

在项目根目录下创建一个 vite.config.js 文件，这是 Vite 的配置文件：

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
```

并安装 Vue 插件：

```js
npm install @vitejs/plugin-vue
```
### 5: 创建 Vue 组件

在 src 目录下创建一个 App.vue 文件，这是你的根 Vue 组件：

```html
<!-- src/App.vue -->
<template>
  <h1>Hello Vite + Vue!</h1>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 你的样式 */
</style>
```
### 6: 创建主入口文件

在 src 目录下创建一个 main.js 文件，这是你的 JavaScript 入口文件：

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```
### 7: 添加脚本到 package.json

在 package.json 文件中添加以下脚本来运行开发服务器和构建项目：

```json
{
  // ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  // ...
}
```
### 8: 运行开发服务器

现在，你可以运行开发服务器来查看你的应用：

```js
npm run dev
```
### 9: 构建项目

当你准备好构建你的项目以便部署时，运行：

```js
npm run build
```

## 3. 路由配置

