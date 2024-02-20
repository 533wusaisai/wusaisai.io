# node高阶


## 1. 核心API







## 2. 多进程方案
Node.js 是单线程的，但它可以通过创建子进程来利用多核系统的能力。Node.js 提供了几种不同的方式来实现多进程：

### 1. child_process
child_process 模块是 Node.js 的一个核心模块，它允许你创建子进程来执行操作系统命令或其他 Node.js 脚本。这个模块提供了几种不同的方法来创建子进程，每种方法都有其特定的用途。

以下是如何使用 child_process 模块中的几个主要方法的示例：

1. 使用 exec

exec 方法用于执行一个命令，并缓冲任何产生的输出。它适用于预期输出量不大的情况。

```js
const { exec } = require('child_process');

exec('ls -lh', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行的错误: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
```
2. 使用 execFile

execFile 方法类似于 exec，但它直接执行一个文件而不是通过一个 shell，这使得它比 exec 稍微更高效一些。

```js
const { execFile } = require('child_process');

execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error(`执行的错误: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Node.js 版本: ${stdout}`);
});
```
3. 使用 spawn

spawn 方法用于创建一个新的进程来运行给定的命令。它适用于输出量较大的情况，因为数据是以流的形式返回的。

```js
const { spawn } = require('child_process');

const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});
```
4. 使用 fork

fork 方法是 spawn 的一个特殊情况，专门用于在新的 Node.js 进程中运行模块。它提供了一个内置的通信通道，允许父进程和子进程之间相互发送消息。

```js
const { fork } = require('child_process');

const child = fork('path/to/child/script.js');

child.on('message', (message) => {
  console.log('来自子进程的消息:', message);
});

child.send({ hello: 'world' });

```
在 path/to/child/script.js 中，你可以监听来自父进程的消息：

```js
process.on('message', (message) => {
  console.log('来自父进程的消息:', message);
  process.send({ foo: 'bar' });
});
```

这些是 child_process 模块的基本使用方法。在实际应用中，你可能需要根据具体的需求选择合适的方法，并且处理好进程间的通信和错误处理。

### 2. cluster

Node.js 的 cluster 模块允许你创建一组可以共享服务器端口的子进程。这是利用多核CPU系统的一种方式，可以提高网络应用的性能和吞吐量。以下是一些典型的 cluster 模块使用场景：

1. 提高网络服务的并发处理能力

当你运行一个网络服务（如HTTP服务器）时，Node.js 默认是单线程运行的。这意味着无论服务器有多少核心，它默认只会使用一个核心。使用 cluster 模块，你可以创建多个工作进程（通常与CPU核心数相同），这样就可以在多个核心上并行处理客户端请求。

2. 利用多核CPU资源

在多核CPU服务器上，你可能希望每个核心都参与到工作中来，以便最大化资源利用率。cluster 模块可以帮助你启动与CPU核心数量相同的工作进程数，从而使得每个核心都能处理任务。

3. 提高应用的可靠性

即使Node.js是单线程的，但是通过cluster模块，如果一个工作进程崩溃，它不会影响到其他工作进程。主进程可以监控工作进程的状态，并在工作进程异常退出时重启新的工作进程，这样可以提高应用的可靠性。

4. 零停机重启/部署

在生产环境中，你可能需要部署新版本的代码而不中断服务。cluster模块可以帮助你逐个重启工作进程，新的工作进程可以启动新版本的代码，而旧的工作进程仍然处理当前的客户端请求，直到完成。

5. 分离关注点

在某些情况下，你可能希望将不同的任务分配给不同的工作进程。例如，一个进程处理HTTP请求，另一个处理后台任务。这样可以帮助你更好地组织代码和资源，以及优化性能。

示例代码

以下是一个简单的 cluster 模块使用示例，它展示了如何创建一个简单的HTTP服务器，并在多个工作进程之间共享端口：

```js
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程可以共享任何TCP连接。
  // 在本例子中，它是一个HTTP服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
}
```

在这个例子中，如果你的服务器有4个CPU核心，那么它将启动4个工作进程，每个进程都监听相同的端口（8000）。这意味着你的服务器可以同时处理更多的并发请求。

### 3. Worker Threads

worker_threads 模块是 Node.js 中用于多线程支持的模块。这个模块允许你创建工作线程（worker threads）来执行 CPU 密集型任务，而不会阻塞事件循环。每个工作线程都有自己的 V8 实例，这意味着它们可以并行执行 JavaScript 代码。

使用 worker_threads 的场景

CPU 密集型任务:

对于需要大量计算的任务，如图像或视频处理、大数据分析或机器学习计算，使用工作线程可以避免阻塞事件循环。

利用多核处理器:

如果你的服务器有多个 CPU 核心，你可以创建多个工作线程，每个线程在不同的核心上运行，以此来提高应用程序的性能。

后台处理:

对于一些长时间运行的后台任务，如日志处理或批量更新数据库，可以在工作线程中执行，以避免影响主线程的响应能力。

复杂计算:

当你的应用程序需要执行复杂的数学计算或算法时，工作线程可以帮助你在后台执行这些任务，而不会影响到用户的交互体验。
如何使用 worker_threads

以下是一个简单的示例，展示了如何创建一个工作线程并与之通信：

```js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // 这段代码在主线程中执行
  const worker = new Worker(__filename);
  worker.on('message', message => console.log('来自工作线程的消息:', message));
  worker.postMessage('Hello, worker!');
} else {
  // 这段代码在工作线程中执行
  parentPort.on('message', (message) => {
    console.log('来自主线程的消息:', message);
    parentPort.postMessage('Hello, main thread!');
  });
}
```

在这个例子中，我们检查 isMainThread 来确定代码是在主线程中运行还是在工作线程中运行。如果是在主线程中，我们创建一个新的 Worker 并发送一条消息。如果代码在工作线程中运行，它会监听来自主线程的消息，并发送一个响应。

::: tip 注意事项
工作线程之间的数据传递是通过序列化和反序列化进行的，这可能会有一定的性能开销。对于大量数据的传递，可以考虑使用 SharedArrayBuffer 来实现工作线程之间的共享内存。
创建工作线程会有一定的开销，因此对于小任务来说，可能不值得创建新的线程。
工作线程是独立的执行环境，它们有自己的全局对象和内存空间，不能直接访问主线程中的对象或作用域。
:::
使用 worker_threads 模块可以显著提高 Node.js 应用程序处理 CPU 密集型任务的能力，但它也增加了应用程序的复杂性。因此，在决定使用工作线程之前，应该仔细评估任务的性质和应用程序的需求。

### 4. pm2

