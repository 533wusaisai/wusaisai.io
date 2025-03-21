# Redis 安装使用

Redis 是一个开源的内存中数据结构存储系统，它可以用作数据库、缓存和消息代理。以下是在不同操作系统上安装和使用 Redis 的基本步骤。

## 在 Linux 上安装 Redis

### 以 Ubuntu 为例，你可以使用以下命令安装 Redis：

1. 更新包索引：
```js
sudo apt update
```
2. 安装 Redis：
```js
sudo apt install redis-server
```
3. 启动 Redis 服务：
```js
sudo systemctl start redis-server
```
4. 验证 Redis 是否正在运行：
```js
sudo systemctl status redis-server
```
5. （可选）使 Redis 服务在启动时自动启动：
```js
sudo systemctl enable redis-server
```
## 在 macOS 上安装 Redis

在 macOS 上，你可以使用 Homebrew 来安装 Redis：

1. 更新 Homebrew：
```js
brew update
```
2. 安装 Redis：
```js
brew install redis
```
3. 启动 Redis 服务：
```js
brew services start redis
```
## 在 Windows 上安装 Redis

Windows 官方不直接支持 Redis，但你可以使用 Microsoft 的一个分支版本或者使用 Windows 的子系统。以下是使用 Microsoft 分支版本的安装步骤：

1. 下载 Redis for Windows 的安装文件。你可以从 GitHub 上找到它。

 - 运行下载的安装文件并按照提示进行安装。
 - 一旦安装完成，你可以使用 Redis 服务器和 Redis 命令行界面。
 - 使用 Redis

 - 安装完成后，你可以使用 Redis 命令行界面与 Redis 交互：


## 启动 Redis CLI：

```js
redis-cli
```

在 Redis CLI 中，你可以执行各种命令，例如：

1. 设置键值对：
```js
set mykey somevalue
```
2. 获取键的值：
```js
get mykey
```
3. 删除键：
```js
del mykey
```
4. 列出所有键：

```js
keys *
```

> 请注意，这些命令只是 Redis 功能的一个非常基本的介绍。Redis 提供了丰富的数据类型和操作，包括列表、集合、有序集合、哈希等。

在安装和使用 Redis 时，请确保遵循最佳实践，特别是在生产环境中，包括配置适当的安全设置、定期备份数据等。
## 相关配置
````md
- port: 6379,          // Redis服务器使用的端口。默认是 6379。
- host: 'localhost',   // Redis服务器的主机名。默认是 'localhost'。
- family: 4,           // 4 (IPv4) 或 6 (IPv6)，默认是 4。
- password: 'auth',    // 如果设置了密码，则需要提供。
- db: 0,               // 要使用的数据库索引。默认是 0。
- connectTimeout: 10000, // 连接到Redis服务器的超时时间（以毫秒为单位）。默认是 10000。
- retryStrategy: function (times) {
    // 返回重新连接之前的延迟时间（以毫秒为单位）。
    // 这里是一个简单的例子，你可以根据需要进行更复杂的重试策略。
    return Math.min(times * 50, 2000);
  },
- maxRetriesPerRequest: null, // 每个命令最大的重试次数。如果设置为 null，则不限制。
- autoResubscribe: true,      // 如果值为 true，在连接断开并成功重连后，ioredis将自动重新订阅。
- autoResendUnfulfilledCommands: true, // 如果值为 true，在连接断开并成功重连后，未完成的命令将被自动重新发送。
- lazyConnect: false,         // 如果值为 true，则在第一次使用时才创建连接。
- tls: {},                    // 如果你的Redis服务器运行在TLS之上，这里可以提供TLS相关的选项。
- sentinelRetryStrategy: function (times) {
    // 对于使用哨兵模式的情况，这里定义重试策略。
    return Math.min(times * 10, 3000);
  },
- sentinels: [
    { host: 'sentinel1', port: 26379 },
    { host: 'sentinel2', port: 26379 },
    { host: 'sentinel3', port: 26379 }
  ],
- name: 'mymaster', // 哨兵监控的主服务器名称

  // 集群相关配置
- clusterRetryStrategy: function (times) {
    return Math.min(times * 100, 3000);
  },
- enableReadyCheck: true, // 在发送命令前检查节点是否已准备好

  // 性能相关配置
- scaleReads: 'slave', // 读操作的负载均衡策略，可以是 "master"、"slave" 或 "all"
- maxLoadingRetryTime: 10000, // 在初始加载时最大的重试时间（毫秒）

  // 连接相关配置
- reconnectOnError: function (err) {
    const targetError = 'READONLY';
    if (err.message.includes(targetError)) {
      // 当Redis返回一个错误包含"READONLY"时，尝试重新连接
      return true; // 如果返回true，则客户端会尝试重新连接
    }
  },
- readOnly: true, // 如果设置为true，将使用READONLY命令自动将连接设置为只读模式

  // Lua脚本相关配置
- luaScripts: {
    // 定义Lua脚本，可以通过redis.scriptName调用
    myScript: {
      numberOfKeys: 1,
      lua: 'return redis.call("set", KEYS[1], ARGV[1])'
    }
  },

  // 其他选项
- keyPrefix: 'myapp:', // 为所有键自动添加前缀
- dropBufferSupport: false, // 如果设置为true，则不会将命令参数转换为字符串
- enableOfflineQueue: true, // 如果设置为true，当Redis服务器不可用时，命令将被排队
- enableAutoPipelining: false, // 如果设置为true，命令将自动使用管道发送
- autoPipeliningIgnoredCommands: ['info', 'multi', 'exec', 'slaveof', 'config', 'shutdown'], // 在自动管道中忽略的命令
- connectWithReadOnly: false, // 如果设置为true，将使用READONLY命令连接到Redis服务器
- natMap: {
    // 如果你在使用NAT或Docker等环境，可以映射地址
    'redis-12345': { host: '10.0.0.1', port: 12345 }
  }
````

## 企业开发中相关配置
在企业项目开发中，使用ioredis时可能会涉及到的配置选项及其作用如下：

- 基础连接配置:

port: Redis服务器监听的端口号。
host: Redis服务器的主机名或IP地址。
family: IP版本，通常是4或6。
password: 连接到Redis服务器所需的密码。
db: 要选择的特定Redis数据库的索引。

- 性能和重试策略:

connectTimeout: 连接到Redis服务器的最大超时时间（毫秒）。
retryStrategy: 一个函数，定义了在连接丢失时重连的策略。
maxRetriesPerRequest: 每个命令在被标记为失败之前的最大重试次数。
autoResubscribe: 是否在重新连接后自动重新订阅。
autoResendUnfulfilledCommands: 是否在重新连接后自动重新发送未完成的命令。

- 高可用性和故障转移:

sentinels: 一个哨兵地址数组，用于配置哨兵连接。
name: 哨兵监控的主服务器名称。
sentinelRetryStrategy: 一个函数，定义了在与哨兵连接丢失时重连的策略。

- 集群支持:

clusterRetryStrategy: 在使用Redis集群时，如果没有节点可用，这个函数将被调用以决定重试的时间间隔。
scaleReads: 读操作的负载均衡策略，可以是"master"、"slave"或"all"。

- 安全性和TLS:

tls: 一个对象，包含用于TLS连接的选项。

- 脚本和管道:

enableAutoPipelining: 是否自动使用管道发送命令。
autoPipeliningIgnoredCommands: 在自动管道中忽略的命令列表。
luaScripts: 允许定义Lua脚本，并通过redis.scriptName调用。

- 其他高级配置:

keyPrefix: 为所有键自动添加前缀。
readOnly: 如果设置为true，客户端将使用READONLY命令自动将连接设置为只读模式。
reconnectOnError: 一个函数，用于决定在遇到特定错误时是否应该重新连接。
enableOfflineQueue: 当Redis服务器不可用时，是否允许命令排队。
natMap: 用于NAT环境的地址映射。

- 资源管理:

maxLoadingRetryTime: 在初始加载时最大的重试时间（毫秒），用于集群启动时的节点加载。
dropBufferSupport: 如果设置为true，则不会将命令参数转换为字符串。

- 连接行为:

lazyConnect: 是否在第一次使用时才创建连接。
reconnectOnError: 在遇到特定错误时是否尝试重新连接。

::: tip 开发中
在企业项目中，选择正确的配置选项对于确保Redis客户端的稳定性、性能和安全性至关重要。你可能需要根据项目的具体需求和部署环境来调整这些配置。例如，如果你的应用程序部署在云环境中，你可能需要配置tls和natMap。如果你的应用程序需要高可用性，你可能需要配置sentinels和相关的重试策略。
:::

在配置这些选项时，务必参考ioredis的官方文档，以确保每个选项都被正确理解和使用。此外，企业项目可能还需要考虑监控、日志记录和错误处理策略，以便在生产环境中有效地管理和调试Redis连接。

## 在服务端项目使用(node)

### 1. 安装
ioredis是一个流行的Redis客户端，它提供了丰富的功能和良好的性能。要在你的Koa项目中使用它，请运行以下命令来安装
```js
npm install ioredis

```
### 2. 连接
```js
// redis.js
const Redis = require('ioredis');
const redis = new Redis({
  port: 6379,          // Redis服务器的端口号
  host: '127.0.0.1',   // Redis服务器的主机名
  // 更多配置选项...
});

module.exports = redis;

```
### 3. 使用
```js
// app.js
const Koa = require('koa');
const redis = require('./redis');

const app = new Koa();

// 使用Redis存储会话数据的示例中间件
app.use(async (ctx, next) => {
  const { userId } = ctx.session;
  const cacheKey = `user:${userId}`;

  let userData = await redis.get(cacheKey);
  if (!userData) {
    userData = await fetchUserData(userId); // 假设这是一个获取用户数据的函数
    await redis.set(cacheKey, JSON.stringify(userData), 'EX', 10 * 60); // 缓存10分钟
  } else {
    userData = JSON.parse(userData);
  }

  ctx.state.user = userData;
  await next();
});

// 其他中间件和路由...

app.listen(3000, () => {
  console.log('Koa server listening on port 3000');
});
```
### 4. 测试
```js
node app.js
```