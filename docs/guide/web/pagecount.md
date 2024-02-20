# 页面访问统计

在 Next.js 应用中实现页面访问统计并将数据存储到 MongoDB 的过程涉及几个步骤。以下是一个基本的指南，展示了如何捕获页面访问数据并将其存储到 MongoDB 数据库中。

## 1. 数据库访问统计
### 步骤 1: 设置 MongoDB

首先，你需要有一个 MongoDB 数据库。你可以在本地安装 MongoDB，或者使用 MongoDB Atlas 创建一个云数据库实例。

### 步骤 2: 创建 MongoDB 模型

在你的 Next.js 项目中，你需要定义一个模型来表示页面访问数据。使用 Mongoose（一个 MongoDB 对象建模工具）可以简化这个过程。

1. 安装 Mongoose:

`npm install mongoose`


2. 定义模型 (models/PageVisit.js):

```js
const mongoose = require('mongoose');

const PageVisitSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  visitCount: {
    type: Number,
    required: true,
    default: 0,
  },
  lastVisit: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.PageVisit || mongoose.model('PageVisit', PageVisitSchema);
```
### 步骤 3: 连接到 MongoDB

在你的 Next.js 应用中，创建一个数据库连接辅助函数 (lib/dbConnect.js):

```js
const mongoose = require('mongoose');`

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

module.exports = dbConnect;
```

确保你在 .env.local 文件中设置了 MONGODB_URI 环境变量。

### 步骤 4: 创建 API 路由以处理页面访问

在 pages/api 目录下创建一个新的 API 路由 (pages/api/track.js):

```js
const dbConnect = require('../../lib/dbConnect');
const PageVisit = require('../../models/PageVisit');

export default async function handler(req, res) {
  const { path } = req.body;

  if (!path) {
    return res.status(400).json({ message: 'Path is required' });
  }

  await dbConnect();

  try {
    // 查找页面访问记录或创建一个新的记录
    const pageVisit = await PageVisit.findOneAndUpdate(
      { path },
      { $inc: { visitCount: 1 }, lastVisit: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json(pageVisit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
```
### 步骤 5: 在页面中捕获和发送访问数据

在你的页面组件中，你可以使用 useEffect 钩子来发送页面访问数据到你的 API 路由。

```js
import { useEffect } from 'react';

const trackPageVisit = async (path) => {
  try {
    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path }),
    });

    const data = await response.json();
    console.log('Page visit tracked:', data);
  } catch (error) {
    console.error('Error tracking page visit:', error);
  }
};

const MyPage = () => {
  useEffect(() => {
    trackPageVisit(window.location.pathname);
  }, []);

  return (
    <div>
      {/* 页面内容 */}
    </div>
  );
};

export default MyPage;
```

确保在页面加载时调用 trackPageVisit 函数，并传递当前页面的路径。

### 步骤 6: 环境变量和部署

在部署你的 Next.js 应用之前，确保你的环境变量（如 MONGODB_URI）已经在部署环境中设置好。

以上步骤提供了一个基本的框架，用于在 Next.js 应用中跟踪页面访问并将数据存储到 MongoDB。你可以根据需要扩展这个基本的功能，例如添加用户代理分析、地理位置跟踪或其他指标。


## 2. 统计页面访问时长
要跟踪用户在页面上的访问时长，你需要记录用户进入页面的时间和离开页面的时间。然后，你可以计算这两个时间点之间的差异，得到用户在页面上的停留时长。以下是一个简单的实现方法：

### 步骤 1: 在页面组件中设置时间记录

在你的页面组件中，使用 useEffect 钩子来记录用户进入和离开页面的时间。

```js
import { useEffect, useRef } from 'react';

const MyPage = () => {
  // 使用 useRef 来存储进入页面的时间戳，因为它在组件的生命周期内是持久的
  const enterTimeRef = useRef(Date.now());

  useEffect(() => {
    // 当组件加载时，记录进入时间
    enterTimeRef.current = Date.now();

    // 当组件卸载时，计算停留时长并发送到服务器
    return () => {
      const leaveTime = Date.now();
      const duration = leaveTime - enterTimeRef.current;

      // 发送停留时长到服务器的逻辑
      trackPageDuration(window.location.pathname, duration);
    };
  }, []);

  // ...页面其他内容

  return (
    <div>
      {/* 页面内容 */}
    </div>
  );
};

export default MyPage;
```
### 步骤 2: 创建发送访问时长的函数

创建一个函数来处理发送访问时长到你的 API。

```js
const trackPageDuration = async (path, duration) => {
  try {
    const response = await fetch('/api/track-duration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path, duration }),
    });

    const data = await response.json();
    console.log('Page duration tracked:', data);
  } catch (error) {
    console.error('Error tracking page duration:', error);
  }
};
```
### 步骤 3: 创建 API 路由以处理访问时长

在 pages/api 目录下创建一个新的 API 路由 (pages/api/track-duration.js) 来处理接收到的访问时长数据。

```js
const dbConnect = require('../../lib/dbConnect');
const PageVisit = require('../../models/PageVisit');

export default async function handler(req, res) {
  const { path, duration } = req.body;

  if (!path || duration === undefined) {
    return res.status(400).json({ message: 'Path and duration are required' });
  }

  await dbConnect();

  try {
    // 更新页面访问记录，增加总访问时长和访问次数
    const pageVisit = await PageVisit.findOneAndUpdate(
      { path },
      { $inc: { totalDuration: duration, visitCount: 1 }, lastVisit: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json(pageVisit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
```

确保你的 PageVisit 模型包含了 totalDuration 字段来存储累计的访问时长。

### 步骤 4: 环境变量和部署

和之前一样，确保你的环境变量已经在部署环境中设置好。

这个基本的实现可以根据你的需求进行扩展。例如，你可能想要考虑用户最小化浏览器或切换标签页的情况。在这种情况下，你可以使用
` document.visibilityState` 或 `Visibility API` 来检测页面是否可见，并相应地暂停和恢复时间计算。