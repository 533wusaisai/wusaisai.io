



# 阿里云服务器配置（ubuntu）

`sudo apt update`

sudo apt install -y nodejs npm

### 安装node

1. **安装 curl**

   ```
   sudo apt install curl
   ```

2. **添加nodesource仓库**

   ```
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   ```

3. **安装nodejs**

   ```
   sudo apt install -y nodejs
   ```

4. **验证安装**

   ```
   node -v
   npm -v
   ```



### 安装nvm

````
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
````

```js
// 安装完成后 验证是否成功
nvm -v 

- not found

// 执行： 
source ~/.bashrc

// 再执行 出现版本号即安装成功
nvm -v 

```





### 安装git

```
sudo apt install git
```



### 安装mongodb

​	https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu



### 安装nginx

```
sudo apt install nginx
```