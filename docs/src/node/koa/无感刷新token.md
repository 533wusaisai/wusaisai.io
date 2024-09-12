### 无感刷新token 

在React和Koa应用程序中实现无感知刷新Token的机制通常涉及到使用访问令牌（Access Token）和刷新令牌（Refresh Token）的组合。访问令牌具有较短的有效期，而刷新令牌具有较长的有效期。当访问令牌过期时，可以使用刷新令牌来获取新的访问令牌，而用户无需重新登录。

以下是实现无感知刷新Token机制的一般步骤：

后端（Koa）

登录接口：当用户登录时，后端生成访问令牌和刷新令牌，并将它们发送给前端。

刷新接口：创建一个专门的接口，用于使用刷新令牌来获取新的访问令牌。

中间件：编写一个中间件来验证访问令牌的有效性。如果访问令牌无效或过期，并且有刷新令牌，中间件应该自动调用刷新接口来获取新的访问令牌。

错误处理：如果刷新令牌也无效或过期，返回一个错误，提示用户需要重新登录。

前端（React）

请求拦截：使用axios或其他HTTP客户端库的请求拦截器来检查访问令牌是否即将过期。如果是，自动发送请求到刷新接口以获取新的访问令牌。

响应拦截：使用响应拦截器来处理访问令牌过期的情况。如果后端返回访问令牌过期的错误，自动发送请求到刷新接口。

状态管理：管理访问令牌和刷新令牌的状态，确保在刷新令牌后更新存储的令牌。

自动刷新：在React组件中，可以使用useEffect钩子来检测访问令牌的有效性，并在需要时自动刷新。

这里是一个简化的前端响应拦截器示例：

```js
// 添加响应拦截器
http.interceptors.response.use(
  response => {
    // 请求成功，直接返回响应数据
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // 检查错误类型，如果是401并且是因为令牌过期
    if (error.response.status === 401 && error.response.data.message === 'Token expired') {
      try {
        // 发送刷新令牌请求
        const response = await http.post('/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });
        // 保存新的访问令牌
        localStorage.setItem('accessToken', response.data.accessToken);
        // 更新原始请求的头部
        originalRequest.headers['Authorization'] = 'Bearer ' + response.data.accessToken;
        // 重新发送原始请求
        return http(originalRequest);
      } catch (refreshError) {
        // 刷新令牌也过期了，需要重新登录
        console.error('Unable to refresh token:', refreshError);
        // 处理重新登录逻辑
      }
    }
    // 返回任何非由刷新令牌逻辑处理的错误
    return Promise.reject(error);
  }
);
```

请注意，这只是一个基本的实现示例，实际应用中可能需要更复杂的错误处理和状态管理逻辑。此外，安全性也是一个重要考虑因素，确保刷新令牌的存储和传输是安全的。