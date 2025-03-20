# 阿里云服务器

系统本人选择的 centos7

## Nginx 安装配置
### Nginx安装
CentOS系统安装Nginx可以通过多种方式进行，包括使用官方的包管理器yum或者dnf（CentOS 8及以上版本），编译安装，或者使用第三方仓库如EPEL。以下是使用yum和EPEL仓库安装Nginx的步骤：

1. 添加EPEL仓库：
  > 如果你的系统中还没有EPEL仓库，你需要先添加它。EPEL（Extra Packages for Enterprise Linux）提供了许多在标准CentOS仓库中不可用的额外软件包。

  `sudo yum install epel-release`

2. 安装Nginx：
  >一旦EPEL仓库被添加，你可以使用yum来安装Nginx。

  `sudo yum install nginx`

3. 启动Nginx服务：
  > 安装完成后，你需要启动Nginx服务。

  `sudo systemctl start nginx`

  `sudo systemctl restart nginx` 
  or
  `sudo systemctl reload nginx`


4. 设置开机启动：
  > 如果你希望Nginx在系统启动时自动运行，可以使用以下命令来设置。

  `sudo systemctl enable nginx`


5. 调整防火墙设置：
> 如果你的系统运行着防火墙，你需要允许HTTP和HTTPS流量。

```js
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
```

6. 验证安装：
  >你可以通过访问你的服务器的公共IP地址或域名来验证Nginx是否成功安装。在Web浏览器中输入以下内容：

  `http://your_server_ip_or_domain/`


如果安装成功，你应该能看到Nginx的默认欢迎页面。

请注意，以上步骤适用于CentOS 7。如果你使用的是CentOS 8或更高版本，可能需要使用dnf代替yum，但是步骤基本相同。

如果你需要更高级的配置或者特定版本的Nginx，你可能需要考虑编译安装或者使用Nginx官方的仓库。编译安装会更复杂，但是它允许你自定义安装选项和模块。

### Nginx 配置
```js
server {
        listen 80; # 监听 80 端口

        server_name example.com; # 你的域名

        location / {
            proxy_pass http://localhost:3000; # Web 服务端地址和端口
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
```
在这个配置中：

- listen 80; 指定 Nginx 监听 80 端口，这是 HTTP 的默认端口。
- server_name 指定了域名，你应该将其替换为你自己的域名或者 IP 地址。
- location / 定义了一个位置块，用于匹配所有进入的请求。
- proxy_pass 指令将请求转发到指定的地址和端口，这里应该替换为你的 Web 服务端的实际地址和端口。
- 其他 proxy_set_header 指令用于设置一些 HTTP 头信息，以确保请求在转发时保持正确的信息。
> 请注意，如果你的 Web 应用使用 WebSocket，proxy_set_header 指令中的 Upgrade 和 Connection 设置是必要的，以确保 WebSocket 连接能够正确建立。

```js
server {
    listen 80;
    server_name jenkins.example.com; # 替换为你的 Jenkins 域名

    location / {
        proxy_set_header        Host $host:$server_port;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        X-Forwarded-Proto $scheme;
        proxy_redirect          http:// https://;
        proxy_pass              http://localhost:8080; # 假设 Jenkins 运行在同一台机器的 8080 端口
        # Required for new HTTP-based CLI
        proxy_http_version      1.1;
        proxy_request_buffering off;
        # workaround for Jenkins bug with HTTPS
        proxy_buffering         off;
    }
}
```

### Nginx 命令
## Mongodb 安装配置
## Docker 安装配置
## Node 安装配置
### Nodejs 安装 
在CentOS上安装Node.js，你可以使用NodeSource仓库，这是一个提供最新版本Node.js二进制分发的仓库，或者使用官方的包管理器yum或dnf（CentOS 8及以上版本）来安装通过EPEL提供的版本。以下是使用NodeSource仓库安装Node.js的步骤：

  1. 导入NodeSource仓库：
  > 首先，你需要导入NodeSource仓库。NodeSource提供了一个安装脚本，可以自动添加仓库并导入GPG密钥。以下命令将为你安装Node.js 16.x版本，你可以根据需要安装其他版本，只需将setup_16.x中的数字更改为你想要安装的版本号。

  `curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -`


  2. 安装Node.js：
    - 使用yum或dnf安装Node.js。

    `sudo yum install -y nodejs`
    - 或者在CentOS 8及以上版本中，你可以使用dnf：

  `sudo dnf install -y nodejs`

  3.  验证安装：
    > 安装完成后，你可以通过检查Node.js和npm的版本来验证安装是否成功。

    `node --version`

    `npm --version`
    > 如果你想要使用EPEL仓库中的Node.js版本，你可以按照以下步骤操作：

    - 添加EPEL仓库（如果尚未添加）：

    `sudo yum install epel-release`

  4. 安装Node.js：

    `sudo yum install nodejs`

请注意，EPEL仓库中的Node.js版本可能不是最新的。如果你需要最新版本的Node.js或特定版本，建议使用NodeSource仓库。

### NVM 安装 
在CentOS上安装NVM（Node Version Manager）是一个相对直接的过程。NVM允许你在同一台机器上安装和使用多个版本的Node.js。以下是安装NVM的步骤：

1. 下载NVM安装脚本：

    - 你可以使用curl或wget来下载NVM的安装脚本。如果你的系统中没有这些工具，你可以使用yum来安装它们。以下是使用curl的命令：

  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`

  或者使用wget：
    
  `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`


2. 运行安装脚本：

 > 执行上面的命令将下载并运行NVM的安装脚本。该脚本会克隆NVM的仓库到`~/.nvm`，并添加必要的环境变量到你的shell配置文件中，比如 `~/.bash_profile、~/.zshrc、~/.profile或~/.bashrc`。

3. 更新你的当前会话：
    - 安装完成后，你需要关闭并重新打开你的终端，或者运行以下命令来更新当前会话的环境变量：

```js
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" // This loads nvm
```

4. 验证NVM安装：
    - 为了确认NVM已经正确安装，你可以运行：

    `command -v nvm`

   - 如果安装成功，这个命令应该输出nvm。

5. 使用NVM安装Node.js：
    - 一旦NVM安装完成，你可以安装Node.js的特定版本。例如，要安装Node.js的最新版本，你可以使用：

    `nvm install node`

    或者，如果你想安装特定版本的Node.js，你可以指定版本号：

    `nvm install 14.17.0`


6. 切换Node.js版本：
    - 你可以随时切换到不同版本的Node.js。例如，要切换到已安装的14.17.0版本，你可以使用：

    `nvm use 14.17.0`


7. 查看已安装的Node.js版本：
    - 要查看所有已安装的Node.js版本，你可以运行：

    `nvm ls`

8. 设置默认Node.js版本：
    - 你可以设置一个默认的Node.js版本，这样每次打开一个新的终端时都会自动使用这个版本。例如：

    `nvm alias default 14.17.0`

这些步骤应该能够帮助你在CentOS上安装和使用NVM来管理Node.js版本。记得每次打开一个新的终端窗口时，都要运行nvm use命令来选择一个特定版本的Node.js，或者设置一个默认版本以避免这个步骤。


### Git安装

在CentOS上安装Git，你可以使用yum或dnf（CentOS 8及以上版本）包管理器。以下是使用yum在CentOS上安装Git的步骤：

1. 打开终端：
    - 打开你的CentOS系统的终端。

2. 安装Git：
    - 输入以下命令来安装Git：

  `sudo yum install git`

3. 验证安装：
    - 安装完成后，你可以通过检查Git的版本来验证安装是否成功：

  `git --version`

> 如果你使用的是CentOS 8或更高版本，你可以使用dnf来安装Git：

1. 打开终端：
    - 打开你的CentOS系统的终端。

2. 安装Git：
    - 输入以下命令来安装Git：

  `sudo dnf install git`

3. 验证安装：
    - 安装完成后，你可以通过检查Git的版本来验证安装是否成功：

  `git --version`

这些命令会从CentOS的默认仓库中安装Git。如果你需要安装最新版本的Git，你可能需要添加一个第三方仓库，如IUS（Inline with Upstream Stable），来获取最新版本的Git。但是，对于大多数用户来说，使用默认仓库中的Git版本应该就足够了。
## Git 安装配置
## PM2 安装
## Jenkins 自动化部署安装
  - 拉取镜像 最新版本
    `docker pull jenkins/jenkins:lts`
  - 运行容器  将jenkins 运行在 8080 端口 将jenkins 数据存储在主机的jenkins目录下
    `docker run -d -p 8080:8080 -p 50000:50000 -v /jenkins:/var/jenkins_home --name jenkins jenkins/jenkins:lts`
    or
    `docker run -p 8080:8088 -p 50000:50000 jenkins/jenkins`
  - 获取初始管理员密码
    `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`
    
启动 `docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts`


### Docker 安装
  在CentOS上安装Docker，你可以遵循以下步骤。请注意，从CentOS 8开始，Docker已经被其上游企业版的Red Hat Enterprise Linux官方替换为Podman和Buildah。但是，你仍然可以在CentOS 7和CentOS 8上安装Docker CE（社区版）。

  #### 1. CentOS 7
  - 卸载旧版本的Docker（如果有的话）：
  ```js
  sudo yum remove docker \
               docker-client \
               docker-client-latest \
               docker-common \
               docker-latest \
               docker-latest-logrotate \
               docker-logrotate \
               docker-engine
  ```


  - 安装所需的包：
  `sudo yum install -y yum-utils`

  - 设置Docker仓库：
  `sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo`

  - 安装Docker CE：
  `sudo yum install docker-ce docker-ce-cli containerd.io`

  - 启动Docker守护进程：
  `sudo systemctl start docker`

  - 验证Docker是否正确安装：
  `sudo docker run hello-world`

  -设置Docker开机自启：
  `sudo systemctl enable docker`

  #### 2. CentOS 8
  > 对于CentOS 8，Docker官方不再提供支持，但你可以使用以下方法来安装Docker CE：
  - 卸载旧版本的Docker（如果有的话）：

  ```js
  sudo dnf remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
  ```

  -设置Docker仓库：
  `sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo`

  - 安装Docker CE：
  `sudo dnf install docker-ce docker-ce-cli containerd.io`

  - 启动Docker守护进程：
  `sudo systemctl start docker`

  - 验证Docker是否正确安装：
  `sudo docker run hello-world`

  - 设置Docker开机自启：
  `sudo systemctl enable docker`

  - 用户组
  >为了避免每次调用Docker命令时都需要使用sudo，你可以将你的用户添加到docker组中：
  `sudo usermod -aG docker your-user`
  > 替换your-user为你的用户名。之后，你需要注销并重新登录，或者重启系统以使这些更改生效。

  >注意事项
  >在CentOS 8上，可能会有一些与cgroup驱动的兼容性问题，因为CentOS 8默认使用cgroup v2，而Docker默认期望使用cgroup v1。如果遇到这个问题，你可能需要调整Docker的配置或系统的cgroup设置。
  >如果你在安装过程中遇到任何问题，确保你的系统是最新的，并且已经安装了所有必要的依赖项。可以通过运行sudo yum update（CentOS 7）或sudo dnf update（CentOS 8）来更新系统。





### Jenkins 镜像安装

在 CentOS 系统上使用 Docker 安装 Jenkins 的步骤如下：

1. 拉取 Jenkins Docker 镜像：

    从 Docker Hub 上拉取最新的 Jenkins 镜像：

  `sudo docker pull jenkins/jenkins:lts`

  这里使用的是 Jenkins 的长期支持版本（LTS）。

2. 运行 Jenkins 容器：

  使用以下命令运行 Jenkins 容器：

  `sudo docker run -d -p 8080:8080 -p 50000:50000 --name jenkins -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts`


>这个命令会创建一个名为 jenkins 的容器，并将容器的 8080 端口映射到主机的 8080 端口，这样你就可以通过浏览器访问 Jenkins。同时，将容器的 50000 端口映射到主机的 50000 端口，用于 Jenkins 代理的通信。-v jenkins_home:/var/jenkins_home 选项将 Jenkins 数据持久化到 Docker 卷 jenkins_home。

3. 获取初始管理员密码：

  Jenkins 首次启动时会生成一个初始的管理员密码，你需要这个密码来完成安装过程。使用以下命令获取密码：

  `sudo docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword`


  > 复制显示的密码，你将在浏览器中设置 Jenkins 时使用它。

4. 访问 Jenkins：

    打开你的浏览器，访问 http://<你的服务器IP>:8080。你应该会看到 Jenkins 的安装向导。在要求输入初始管理员密码的地方，粘贴你之前复制的密码。

5. 完成安装：

    按照安装向导的指示完成安装。你可以选择安装推荐的插件集，或者自定义选择插件。之后，创建一个管理员用户，并配置 Jenkins 的实例。

6. 配置 Jenkins：
    安装完成后，你可以开始配置 Jenkins，包括创建新的构建作业、安装额外的插件等。

> 请确保你的服务器防火墙设置允许访问 8080 和 50000 端口。如果你在使用云服务，你可能还需要在云服务的安全组设置中允许这些端口的流量。



