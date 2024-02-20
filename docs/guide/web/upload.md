# 大文件上传
  要创建一个文件上传系统 需要考虑多个方面，包括文件分片处理、错误处理、状态管理、用户体验和服务端处理几个方面。
  - **前端实现**
    + 文件分片：将大文件分割成多个小块（chunks），并逐个上传

    + 并发上传：同时上传多个分片以提高效率。

    + 上传队列：管理一个上传队列，允许并发上传一定数量的分片，而其他分片等待。

    + 进度反馈：显示每个分片以及整个文件的上传进度。

    + 错误处理：对于上传失败的分片，实现重试逻辑。

    + 暂停继续：允许用户暂停上传，并在之后继续。

    + 取消上传： 允许用户取消正在进行的上传。

    + 网络问题：在网络连接不稳定时自动重试，并调整重试间隔。

    + 安全问题：确保所有上传都通过 HTTPS 进行，并在可能的情况下实施其他安全措施。

    + 用户体验：提供清晰的用户界面，让用户可以看到上传状态，以及在出现问题时提供帮助信息。
  - **后端实现**
    + 接收分片：能够接收和处理上传的文件分片。

    + 分片验证：验证每个分片的完整性，例如通过检查分片大小或使用校验和。

    + 分片存储：将分片暂时存储在服务器上，直到所有分片都上传完成。

    + 文件重组：当所有分片都上传完成后，将它们合并成原始文件。

    + 错误处理：处理上传过程中可能发生的错误，并提供反馈给前端。

    + 清理任务：定期清理未完成的上传和临时文件，以防止资源浪费。

    + 认证和授权：确保只有有权限的用户可以上传文件。

    + 资源限制：设置合理的资源限制，例如单个用户的并发上传数量和上传文件大小的限制。

    + 监控和日志：监控上传过程并记录日志，以便在出现问题时进行调试。


## 1. react文件上传
实现一个完整的大文件上传系统是一个复杂的任务，涉及到前端和后端的多个部分。在这里，我将提供一个简化的示例，以展示如何在 React 应用中实现分片上传的基本概念。请注意，这个示例不包括所有的错误处理、状态管理和用户界面元素，这些在实际应用中都是必需的。

### 前端实现
```js

import React, { useState} from 'react';
import axios from 'axios';

const FileUpload = ({ url }:any) => {
  const [file, setFile] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedChunks, setUploadedChunks] = useState<any>([]);

  const onFileChange = (event: any) => {
    setFile(event.target.files[0]);
    setProgress(0);
    setUploadedChunks([]);
  };
  const uploadChunk = async (chunk:any, chunkIndex:any, totalChunks:any) => {
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('filename', file.name);
    formData.append('chunkIndex', chunkIndex);
    formData.append('totalChunks', totalChunks);

    return axios.post(fileurl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent:any) => {
        const chunkProgress = (progressEvent.loaded / progressEvent.total) * (1 / totalChunks);
        setProgress((prevProgress) => prevProgress + chunkProgress);
      },
    });
  };


  const onUpload = async () => {
    if (!file) return

    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks:any = Math.ceil(file.size / chunkSize);    
    const savedChunks = JSON.parse(localStorage.getItem('uploadedChunks') || '[]');

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      if (savedChunks.includes(chunkIndex)) {
        continue;
      }
      const begin = chunkIndex * chunkSize;
      const end = Math.min(file.size, begin + chunkSize);
      const chunk = file.slice(begin, end);
      try {
        const response = await uploadChunk(chunk, chunkIndex, totalChunks);
        
        console.log(response);
        savedChunks.push(chunkIndex);

        localStorage.setItem('uploadedChunks', JSON.stringify(savedChunks));
        setUploadedChunks(savedChunks);

      } catch (error) {
        console.error('Upload failed for chunk ' + chunkIndex, error);
        // Handle error, possibly retry upload of this chunk
        break;
      }
    }

    // Check if all chunks have been uploaded
    if (savedChunks.length === totalChunks) {
      // Notify server to merge chunks or do it here if possible
      console.log('All chunks uploaded successfully. Notify server to merge chunks.');
      // Reset local storage
      localStorage.removeItem('uploadedChunks');
    }

  };

  return (
    <React.Fragment>
      <div>
        <input type="file" onChange={onFileChange} />
      </div>
    
      <div>
        <button onClick={onUpload}>upload</button>
      </div>
      <div>上传进度{progress.toFixed(2)}%</div>
      <div>Uploaded Chunks: {uploadedChunks.join(', ')}</div>
    </React.Fragment>
  );
};


export default FileUpload;
```
### 后端实现
```js
const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

// 用于存储文件上传进度的对象
const fileUploadStatus = {};

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
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
  const chunkPath = path.join(chunksDir, chunkIndex);
  fs.renameSync(file.path, chunkPath);

  // 更新文件上传状态
  if (!fileUploadStatus[filename]) {
    fileUploadStatus[filename] = new Array(parseInt(totalChunks)).fill(false);
  }
  fileUploadStatus[filename][chunkIndex] = true;

  ctx.body = { message: 'Chunk uploaded successfully' };
});

// 处理文件合并的路由
router.post('/merge', async (ctx) => {
  const filename = ctx.request.body.filename; // 原始文件名
  const chunksDir = path.join(__dirname, 'uploads/chunks', filename);
  const filePath = path.join(__dirname, 'uploads', filename);

  // 合并文件
  const chunks = fs.readdirSync(chunksDir).sort((a, b) => a - b);
  chunks.forEach(chunkIndex => {
    const chunkPath = path.join(chunksDir, chunkIndex);
    fs.appendFileSync(filePath, fs.readFileSync(chunkPath));
    fs.unlinkSync(chunkPath); // 删除已合并的分片
  });

  // 删除存储分片的文件夹
  fs.rmdirSync(chunksDir);

  // 清除文件上传状态
  delete fileUploadStatus[filename];

  ctx.body = { message: 'File merged successfully' };
});

// 获取文件上传状态的路由
router.get('/status/:filename', async (ctx) => {
  const filename = ctx.params.filename;
  const status = fileUploadStatus[filename];
  const uploadedChunks = status ? status.map((uploaded, index) => uploaded ? index : null).filter(index => index !== null) : [];
  ctx.body = { uploadedChunks };
});

app.use(router.routes()).use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

```
## 2. vue 文件上传
## 3. h5 文件上传