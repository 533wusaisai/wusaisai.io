为了实现暂停、继续和取消上传的功能，你需要在 React 组件中添加相应的逻辑。下面是一个完整的 React 组件示例，它展示了如何使用 Axios 和取消令牌来控制文件上传的流程。
```js
Copy
import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUploader = ({ uploadUrl }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedChunks, setUploadedChunks] = useState([]);
  const cancelTokenSource = useRef(axios.CancelToken.source());

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setProgress(0);
    setUploadedChunks([]);
    setIsPaused(false);
    setIsUploading(false);
    // 如果用户选择了新文件，我们需要创建一个新的取消令牌
    cancelTokenSource.current = axios.CancelToken.source();
  };

  const uploadChunk = async (chunk, chunkIndex, totalChunks) => {
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('filename', file.name);
    formData.append('chunkIndex', chunkIndex);
    formData.append('totalChunks', totalChunks);

    return axios.post(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const chunkProgress = (progressEvent.loaded / progressEvent.total) * (1 / totalChunks);
        setProgress((prevProgress) => prevProgress + chunkProgress);
      },
      cancelToken: cancelTokenSource.current.token,
    });
  };

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);
    const chunkSize = 1 * 1024 * 1024; // 1MB chunk size
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      if (isPaused) {
        break;
      }

      if (uploadedChunks.includes(chunkIndex)) {
        // Skip already uploaded chunks
        continue;
      }

      const begin = chunkIndex * chunkSize;
      const end = Math.min(file.size, begin + chunkSize);
      const chunk = file.slice(begin, end);

      try {
        await uploadChunk(chunk, chunkIndex, totalChunks);
        setUploadedChunks((prev) => [...prev, chunkIndex]);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Upload cancelled: ', error.message);
          break;
        }
        console.error('Upload failed for chunk ' + chunkIndex, error);
        // Handle error, possibly retry upload of this chunk
        break;
      }
    }

    setIsUploading(false);
    if (!isPaused && uploadedChunks.length === totalChunks) {
      // All chunks have been uploaded, notify server to merge
      console.log('All chunks uploaded successfully. Notify server to merge chunks.');
      // Reset local storage or any other state
    }
  };

  const pauseUpload = () => {
    setIsPaused(true);
  };

  const resumeUpload = () => {
    setIsPaused(false);
    uploadFile(); // Resume upload
  };

  const cancelUpload = () => {
    cancelTokenSource.current.cancel('Upload cancelled by the user.');
    setIsUploading(false);
    setProgress(0);
    setUploadedChunks([]);
    // Reset local storage or any other state
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} disabled={isUploading} />
      <button onClick={uploadFile} disabled={isUploading || isPaused}>Upload</button>
      <button onClick={pauseUpload} disabled={!isUploading || isPaused}>Pause</button>
      <button onClick={resumeUpload} disabled={!isUploading || !isPaused}>Resume</button>
      <button onClick={cancelUpload} disabled={!isUploading}>Cancel</button>
      <div>Upload Progress: {Math.round(progress * 100)}%</div>
      <div>Uploaded Chunks: {uploadedChunks.join(', ')}</div>
    </div>
  );
};

export default FileUploader;


在这个组件中，我们使用了 axios.CancelToken 来创建一个取消令牌，它可以用来取消 Axios 请求。我们还添加了 pauseUpload、resumeUpload 和 cancelUpload 函数来控制上传的暂停、继续和取消。

请注意，这个示例是一个基础的实现，你可能需要根据你的具体需求和后端 API 的设计来调整代码。例如，你可能需要添加更多的错误处理、安全性检查、验证文件完整性等。此外，确保在生产环境中使用更安全的方法来存储和检索上传状态，而不是使用内存中的对象。在生产环境中，你可能需要将上传状态存储在数据库中，并处理并发上传、清理未完成的上传等问题。



---

const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制
    uploadDir: path.join(__dirname, 'uploads/tmp'), // 临时文件目录
    keepExtensions: true,
  }
}));

// 处理分片上传的路由
router.post('/upload', async (ctx) => {
  const file = ctx.request.files.file; // 获取上传的文件
  const chunkIndex = ctx.request.body.chunkIndex; // 当前分片索引
  const totalChunks = ctx.request.body.totalChunks; // 总分片数
  const filename = ctx.request.body.filename; // 原始文件名

  // 根据文件名创建唯一的文件夹来存储所有分片
  const chunksDir = path.join(__dirname, 'uploads/chunks', filename);
  if (!fs.existsSync(chunksDir)) {
    fs.mkdirSync(chunksDir, { recursive: true });
  }

  // 移动分片到指定文件夹
  const chunkPath = path.join(chunksDir, `${chunkIndex}`);
  fs.renameSync(file.path, chunkPath);

  ctx.body = { message: 'Chunk uploaded successfully' };
});

// 处理文件合并的路由
router.post('/merge', async (ctx) => {
  const filename = ctx.request.body.filename; // 原始文件名
  const chunksDir = path.join(__dirname, 'uploads/chunks', filename);
  const filePath = path.join(__dirname, 'uploads', filename);

  // 合并文件
  const chunks = fs.readdirSync(chunksDir).sort((a, b) => parseInt(a) - parseInt(b));
  fs.writeFileSync(filePath, ''); // 确保文件是空的
  chunks.forEach(chunkIndex => {
    const chunkPath = path.join(chunksDir, chunkIndex);
    fs.appendFileSync(filePath, fs.readFileSync(chunkPath));
    fs.unlinkSync(chunkPath); // 删除已合并的分片
  });

  // 删除存储分片的文件夹
  fs.rmdirSync(chunksDir, { recursive: true });

  ctx.body = { message: 'File merged successfully' };
});

// 处理取消上传的路由
router.post('/cancel-upload', async (ctx) => {
  const filename = ctx.request.body.filename; // 原始文件名
  const chunksDir = path.join(__dirname, 'uploads/chunks', filename);

  // 删除文件夹及其内容
  if (fs.existsSync(chunksDir)) {
    fs.rmdirSync(chunksDir, { recursive: true });
  }

  ctx.body = { message: 'Upload cancelled and temporary files have been deleted' };
});

app.use(router.routes()).use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
```



```js
http {
    # 全局日志格式定义
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    # ...

    server {
        listen 80;
        server_name example.com;

        # 为 example.com 设置访问日志和错误日志
        access_log /var/log/nginx/example.com_access.log main;
        error_log /var/log/nginx/example.com_error.log;

        # ...
    }

    server {
        listen 80;
        server_name example.org;

        # 为 example.org 设置访问日志和错误日志
        access_log /var/log/nginx/example.org_access.log main;
        error_log /var/log/nginx/example.org_error.log;

        # ...
    }

    # ...
}
````





