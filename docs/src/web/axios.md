  # Axios 封装使用
  
  ## React
  ### 1. 安装 axios
  ::: code-group
  ```sh [npm]
  npm install axios --save
  ```
  :::
  ### 2. 创建 request.js

  ```javascript
    import axios from 'axios';
    import { createBrowserHistory } from 'history';
    const history = createBrowserHistory();

    const axiosInstance = axios.create({
      baseURL: 'your_api_base_url', // 替换为你的 API 基础 URL
      // 其他配置...
    });
    // 请求拦截器
    axiosInstance.interceptors.request.use(
      config => {
        // 在这里添加你的访问 Token
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截器
    axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            // 尝试使用刷新 Token 获取新的访问 Token
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axiosInstance.post('/refresh_token', { refreshToken });
            localStorage.setItem('accessToken', response.data.accessToken);
            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            // 刷新 Token 也失效了，跳转到登录页面
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            history.push('/login');
            window.location.reload(); // 由于我们不在组件内部，可能需要强制刷新页面来应用路由变化
            return Promise.reject(refreshError);
          }
        } else if (error.response) {
          // 处理其他错误代码的情况
          alert(`Error: ${error.response.status} - ${error.response.data.message}`);
        }
        return Promise.reject(error);
      }
    );
    export default request;
  ```
### 3. 封装请求方法 创建

  ```javascript
  import React from 'react';
  import request from './request';
  function App() {
      // 示例 GET 请求
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get('/some-endpoint');
          console.log(response.data);
        } catch (error) {
          console.error('An error occurred:', error);
        }
          };

      // 示例 POST 请求
      const postData = async () => {
        try {
          const response = await axiosInstance.post('/some-endpoint', { key: 'value' });
          console.log(response.data);
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

      // 示例 PUT 请求
      const putData = async () => {
        try {
          const response = await axiosInstance.put('/some-endpoint', { key: 'new value' });
          console.log(response.data);
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

      // 示例 DELETE 请求
      const deleteData = async () => {
        try {
          const response = await axiosInstance.delete('/some-endpoint');
          console.log(response.data);
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

      // 应用的其他部分...
    }
  ```

  ## vue
  