# React持久化存储方案

在React应用程序中实现持久化存储，通常意味着将应用状态保存在客户端，以便在页面刷新或重新打开应用时保持状态不变。以下是几种常见的React持久化存储

## 1. 使用 `localStorage` 或 `sessionStorage`

> 最简单的持久化方案之一。你可以直接使用`Web Storage API`来存储数据。
```js
// 保存数据
localStorage.setItem('myData', JSON.stringify(data));
// 读取数据
const savedData = JSON.parse(localStorage.getItem('myData'));
```

> `localStorage` 保存的数据没有过期时间，而 `sessionStorage` 保存的数据在页面会话结束时（例如关闭页面）会被清除。


## 2. 使用 redux-persist

> 如果你的应用使用Redux进行状态管理，redux-persist是一个流行的库，可以很容易地将Redux状态持久化到localStorage或其他存储中。

```js
// 配置redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
```

然后在React组件中使用PersistGate：

```js
import { PersistGate } from 'redux-persist/integration/react';

// 在根组件中
<PersistGate loading={<LoadingView />} persistor={persistor}>
  <App />
</PersistGate>
```

## 3. 使用 IndexedDB

> 对于更大型的数据或者需要更复杂查询的情况，你可以使用 IndexedDB。这是一个运行在浏览器中的低级API，用于客户端存储大量结构化数据。你可以使用原生API，但是由于其复杂性，通常建议使用库如 localForage、Dexie.js 或 PouchDB。

```js
import localForage from 'localforage';

// 保存数据
localForage.setItem('key', 'value');

// 读取数据
localForage.getItem('key').then(function(value) {
  // 当值被读取后执行
});
```
## 4. 使用 cookies

Cookies可以用于存储少量数据。虽然它们通常用于服务器和客户端之间的会话保持，但也可以用于在客户端存储数据。

```js
// 设置cookie
document.cookie = "username=John Doe";

// 获取cookie
let username = document.cookie;
```

## 5. 使用第三方服务

> 对于需要跨设备同步或者需要备份的数据，你可以使用如Firebase、AWS Amplify等第三方云服务来持久化数据。

::: info 注意事项
 - 安全性：敏感数据不应该存储在客户端，或者至少应该加密存储。
 - 大小限制：localStorage 和 sessionStorage 通常有大小限制（大约5MB）。
 - 异步操作：IndexedDB 和第三方服务通常是异步的，需要考虑到异步操作的处理。
 - 用户隐私：使用cookies时需要遵守相关的用户隐私法规。
:::

选择哪种持久化方案取决于你的具体需求，包括你需要存储的数据量、数据的敏感性、是否需要跨会话持久化以及你的应用架构。


[https://github.com/tangly1024/NotionNext/blob/main/package.json]

- @giscus/react: 一个React组件库，用于在React应用中集成Giscus评论系统。

- @headlessui/react: 一个完全无障碍的UI组件库，用于快速构建无样式的、完全可定制的UI组件。

- @vercel/analytics: Vercel提供的分析工具，用于收集和分析部署在Vercel平台上的网站性能和访问数据。

- algoliasearch: Algolia搜索API的客户端，用于在网站上实现快速、可定制的搜索体验。

- animejs: 一个轻量级的JavaScript动画库，用于创建复杂的动画效果。

- aos: AOS（Animate On Scroll）库用于在滚动时添加滚动动画。

- copy-to-clipboard: 一个简单的库，用于将文本复制到剪贴板。

- feed: 用于创建RSS、Atom和JSON feed的库。

- memory-cache: 一个简单的内存缓存库，适用于Node.js。

- notion-client: 一个用于与Notion API交互的客户端库。

- preact: 一个轻量级的React替代品，具有相同的现代API和功能。

- prism-themes: Prism是一个轻量级、可扩展的语法高亮器，这个库提供了额外的主题。

- react-facebook: 用于集成Facebook SDK的React组件，例如用于添加Facebook登录或分享功能。

- react-tweet-embed: 一个React组件，用于在应用中嵌入Twitter推文。

- react-share: 一组React组件，用于添加社交分享按钮。

- typed.js: 一个打字动画库，模拟打字机效果。

- @waline/client: 一个简单、快速、开源的评论系统。

- autoprefixer: 一个CSS后处理工具，用于自动添加浏览器前缀。

- next-sitemap: 用于生成Next.js应用的sitemap.xml文件的库。