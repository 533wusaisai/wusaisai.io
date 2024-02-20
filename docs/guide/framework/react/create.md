# 项目搭建

## 技术栈
  - React 18
  - React-router-dom v6
  - react-dom 18 
  - typescript
  - webpack 5 
  - axios
  - react-redux
  - redux

## 环境搭建
  - nodejs >=18.0.0
  - pnpm >= 8.0.0

## 1. 搭建基础架构 `package.json README.md index.html`

**package.json**

  ```js
  pnpm init -y # 项目初始生成
  ```

**项目基础结构**

````md
|— build  
|   |— webpack.common.js  
|   |— webpack.dev.js  
|   |— webpack.prod.js  
|— public 
|   |— index.html 
|   |— 
|— src 
|   |— index.ts
|   |— App.ts
|   |— sryle.css
|— .babelrc.js  
|— .gitignore  
|— .prettierrc  
|— tsconfig.json  

````

**index.html**

```html
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>webpack5-react-ts</title>
    </head>
    <body>
      <!-- 容器节点 -->
      <div id="root"></div>
    </body>
  </html>

```
**README.md**

````md


````

## 2. 安装配置 `react`

  ### 1. 安装依赖

  ```js
  pnpm add react react-dom
  # 声明依赖
  pnpm add @types/react @types/react-dom -D
  ```
  ### 2. **配置入口文件 `src/index.tsx`**

  ```ts
  // index.tsx 项目入口文件
  import React from 'react';
  import { createRoot } from 'react-dom/client';
  import App from './App';
  const root = document.querySelector('#root')
  if(root) {
    createRoot(root).render(<App />)
  }
  ```

  ### 3. 创建样式文件 `src/style.css`

  ```ts
  // style.css
  h1 {
    color: red;
  }
  ```

  ### 4. 创建主文件 `src/App.tsx`

  ```ts
  // App.tsx 项目主入口文件
  import React from 'react'
  import './style.css'
  function App() {
    return <h1>Hello World</h1>
  }
  export default App
  ```
## 3. 配置 `Typescript`
  ### 1. 安装依赖
  ```js
  pnpm add typescript -D
  pnpm add babel-loader ts-node @babel/core @babel/preset-react @babel/preset-typescript @babel/preset-env core-js -D

  ```
  ### 2.生成 `tsconfig.json` 文件
  > 配置项目支持typescript语法
  ```js
  # 通过下面命令 创建 tsconfig.json
  tsc --init
  ```
  ```js
  // tsconfig.json 
  {
    "compilerOptions": {
      "target": "es2016", // 编译后的js代码遵循何种规范，可以是es3/es5/es6等等
      "esModuleInterop": true,
      "module": "commonjs", // 指定设置编译后的js代码，使用何种模块规范。
      "forceConsistentCasingInFileNames": true,
      "strict": true,
      "skipLibCheck": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      },
      "typeRoots": ["./typings/*.d.ts", "node_modules/@types"],
      "jsx": "react-jsx" // react18这里改成react-jsx，就不需要在tsx文件中手动引入React了
    },
    "include": ["./src", "./typings/*.d.ts"],
    "exclude": ["node_modules", "dist"]
  }
  ```
## 4. 安装配置 `webpack`
  ### 1. 安装依赖

  ```js
  pnpm add webpack webpack-merge webpack-dev-server html-webpack-plugin webpack-cli -D
  ```
 **另外因为我们在App.tsx中引入了css文件，所以还需要安装相关的loader**

  ```js
  pnpm add style-loader css-loader -D
  ```

  ### 2. **配置 build/webpack.common.js**
  > 因后续功能问题，将文件进行拆分以便优化

  ```js
  import { Configuration } from "webpack";
  import HtmlWebpackPlugin from "html-webpack-plugin";

  const path = require("path");

  const baseConfig: Configuration = {
    entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
    // 打包出口文件
    output: {
      filename: "static/js/[name].js", // 每个输出js的名称
      path: path.join(__dirname, "../dist"), // 打包结果输出路径
      clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
      publicPath: "/", // 打包后文件的公共前缀路径
    },
    // loader 配置
    module: {
      rules: [
        {
          test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
          use: {
            loader: "babel-loader",

            // 如果配置了babelrc.js 此option 无需再配置

            // options: {
            //   // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            //   presets: [
            //       [
            //         "@babel/preset-env",
            //         {
            //           // 设置兼容目标浏览器版本,也可以在根目录配置.browserslistrc文件,babel-loader会自动寻找上面配置好的文件.browserslistrc
            //           targets: { browsers: ["> 1%", "last 2 versions", "not ie <= 8"] },
            //           useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
            //           corejs: 3, // 配置使用core-js使用的版本
            //           loose: true,
            //         },
            //       ],
            //       // 如果您使用的是 Babel 和 React 17，您可能需要将 "runtime": "automatic" 添加到配置中。
            //       // 否则可能会出现错误：Uncaught ReferenceError: React is not defined
            //       ["@babel/preset-react", { runtime: "automatic" }],
            //       "@babel/preset-typescript",
            //     ],
            // },
          },
        },
        // 如果配置 less 或scss 添加loader 在后面添加即可
        {
          test: /.css$/, //匹配 css 文件
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    // plugins
    plugins: [
      new HtmlWebpackPlugin({
        // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
        template: path.join(__dirname, "../public/index.html"),
        // 压缩html资源
        minify: {
          collapseWhitespace: true, //去空格
          removeComments: true, // 去注释
        },
      }),
    ],
  };

  export default baseConfig

  ```
  **配置build/webpack.dev.ts**
  ```js
  import path from "path";
  import { merge } from "webpack-merge";
  import { Configuration as WebpackConfiguration } from "webpack";
  import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
  import baseConfig from "./webpack.base";

  interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
  }

  const host = "127.0.0.1";
  const port = "8082";

  // 合并公共配置,并添加开发环境配置
  const devConfig: Configuration = merge(baseConfig, {
    mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
    devtool: "eval-cheap-module-source-map",
    devServer: {
      host,
      port,
      open: true, // 是否自动打开
      compress: false, // gzip压缩,开发环境不开启，提升热更新速度
      hot: true, // 开启热更新
      historyApiFallback: true, // 解决history路由404问题
      setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
      static: {
        directory: path.join(__dirname, "../public"), // 托管静态资源public文件夹
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  });

  export default devConfig;

  ```
  ### 3. **package.json 中添加启动脚本**：

  ```js 
  "scripts": {
    "dev": "webpack serve -c build/webpack.dev.ts"
  },
  ```
  ### 4. **配置build/webpack.prod.ts**
  >生成环境
  ```js
  import { Configuration } from "webpack";
  import { merge } from "webpack-merge";
  import baseConfig from "./webpack.base";

  const prodConfig: Configuration = merge(baseConfig, {
    mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  });

  export default prodConfig;

```

## 5. 创建 `.babelrc.js`
  js编译 ES6语法转义ES5

  ```js
  module.exports = {
    // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
    presets: [
      [
        "@babel/preset-env",
        {
          // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
          // "targets": {
          //  "chrome": 35,
          //  "ie": 9
          // },
          targets: { browsers: ["> 1%", "last 2 versions", "not ie <= 8"] },
          useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
          corejs: 3, // 配置使用core-js使用的版本
          loose: true,
        },
      ],
      // 如果您使用的是 Babel 和 React 17，您可能需要将 "runtime": "automatic" 添加到配置中。
      // 否则可能会出现错误：Uncaught ReferenceError: React is not defined
      ["@babel/preset-react", { runtime: "automatic" }],
      "@babel/preset-typescript",
    ],
  };
  ```
## 6. 配置多环境
  > 正式项目可分为 开发环境（dev）测试环境（test）预发环境（pre）生产环境（prod） 可根据不同环境请求不同地址获取不统数据。
  ### 1. 安装依赖
  ```js
  pnpm add cross-env -D
  ```
  ### 2. 配置环境变量
  ```js
  "scripts": {
    "dev:dev": "cross-env NODE_ENV=development BASE_ENV=development webpack serve -c build/webpack.dev.ts",
    "dev:test": "cross-env NODE_ENV=development BASE_ENV=test webpack serve -c build/webpack.dev.ts",
    "dev:pre": "cross-env NODE_ENV=development BASE_ENV=pre webpack serve -c build/webpack.dev.ts",
    "dev:prod": "cross-env NODE_ENV=development BASE_ENV=production webpack serve -c build/webpack.dev.ts",
    "build:dev": "cross-env NODE_ENV=production BASE_ENV=development webpack -c build/webpack.prod.ts",
    "build:test": "cross-env NODE_ENV=production BASE_ENV=test webpack -c build/webpack.prod.ts",
    "build:pre": "cross-env NODE_ENV=production BASE_ENV=pre webpack -c build/webpack.prod.ts",
    "build:prod": "cross-env NODE_ENV=production BASE_ENV=production webpack -c build/webpack.prod.ts"
  }
  ```
  ### 3. 获取变量
  > 在webpack.base.ts中打印一下设置的环境变量
  ```js
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('BASE_ENV', process.env.BASE_ENV)
  ```

  >当前是打包模式，业务环境是开发环境，这里需要把process.env.BASE_ENV注入到业务代码里面，就可以通过该环境变量设置对应环境的接口地址和其他数据，要借助 `webpack.DefinePlugin` 插件。

  ### 4. 将环境变量注入到项目中使用
  ```js
  const webpack = require('webpack')
  module.export = {
    // ...
    plugins: [
      // ...
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      })
    ]
  }

  ```
  在根目录下新建typings/global.d.ts文件
  ```js
  declare module 'process' {
    global {
      namespace NodeJS {
        export interface ProcessEnv {
          BASE_ENV: 'development' | 'test' | 'pre' | 'production'
          NODE_ENV: 'development' | 'production'
        }
      }
    }
  }
  ```
  > 需要注意的是，业务环境要能访问process，需要安装：pnpm add @types/node -D

  ### 5. 配置多环境运行
  **在根目录下新建一个多文件配置文件夹 env**
  ````md
  |—— env
  |   |—— .env.development # 开发环境
  |   |—— .env.test        # 测试环境
  |   |—— .env.pre         # 预发环境
  |   |—— .env.production  # 生产环境
  ````
  ###
## 7. 项目开发规范

  ### 1. 安装依赖
  ```js
  pnpm add eslint husky lint-staged -D

  ```

  ### 2. 代码commit相关配置

  **Eslint配置** 生成 `.eslintrc.js` 
  ```js
  npx eslint --init 
  ```
  > eslint 检测配置在rules 中进行详细配置

  **Prettier配置** 创建 `.prettierrc.js`
  
  > 代码格式化简单配置
  ```js
  module.exports = {
    semi: true,//强制在语句末尾使用分号。
    trailingComma: 'none',//不允许在多行结构的最后一个元素或属性后添加逗号。
    singleQuote: true,//使用单引号而不是双引号来定义字符串。
    printWidth: 120,//指定每行代码的最大字符宽度，超过这个宽度的代码将被换行
    tabWidth: 4,//指定一个制表符（Tab）等于多少个空格。
    "endOfLine": "lf",
    "bracketSpacing": true,
    "arrowParens": "always"
  };
  ```

  **Husky配置** 初始化`.husky`

  ```js
  // package.json 
  "scripts":{
    "prepare": "husky install",
    "lint": "lint-staged"
  }
  ```
  执行 `pnpm prepare` 初始创建 `.husky` 文件夹

  配置代码检测 脚本

  ```js
  npx husky add .husky/pre-commit "pnpm lint"
  ```

  **配置lint-staged**

  在 `package.json` 文件中添加以下配置：

  ```js
  // package.json
  {
    "lint-staged": {
      // src/**/*.{js,jsx,ts,tsx} 校验暂存区、指定目录下的文件类型
      // 校验命令，执行 eslint 、prettier 
      "src/**/*.{js,jsx,ts,tsx}": [
        "prettier --write",
        "eslint --fix"
      ]
    }
  }

  ```
  > 可根据具体项目配置

  ### 3. 代码push相关配置

  **安装依赖**
  ```js
  pnpm add @commitlint/{cli,config-conventional} -D
  ```
  **生成配置文件**
  ```js
  echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
  ```
  **调整commitlint.config.js内容**
  ```js
  module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [
        2,
        "always",
        [
          "ci",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "build",
          "chore",
          "revert",
          "style",
          "test",
        ],
      ],
      "subject-full-stop": [0, "never"],
      "subject-case": [0, "never"],
    },
  };
  //提交格式为 <type>(scope?): <subject>
  /*
  * @Description: commit-msg提交信息格式规范
  *
  * commit-msg格式: <type>(scope?): <subject>
  *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
  *     - build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
  *     - chore: 其他修改, 比如改变构建流程、或者增加依赖库、工具等
  *     - ci: 持续集成修改
  *     - docs: 文档修改
  *     - feat: 新特性、新功能
  *     - fix: 修改bug
  *     - perf: 优化相关，比如提升性能、体验
  *     - refactor: 代码重构
  *     - revert: 回滚到上一个版本
  *     - style: 代码格式修改, 注意不是 css 修改
  *     - test: 测试用例修改
  *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
  *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
  */
  ```

  **配置自动提交检测**
  ```js
  pnpm husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
  ```




