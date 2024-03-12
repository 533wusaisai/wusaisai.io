import{_ as s,c as i,o as a,X as n}from"./chunks/framework.4ft2TBN7.js";const u=JSON.parse('{"title":"阿里云服务器","description":"","frontmatter":{},"headers":[],"relativePath":"guide/server/setting.md","filePath":"guide/server/setting.md","lastUpdated":1710243407000}'),e={name:"guide/server/setting.md"},l=n(`<h1 id="阿里云服务器" tabindex="-1">阿里云服务器 <a class="header-anchor" href="#阿里云服务器" aria-label="Permalink to &quot;阿里云服务器&quot;">​</a></h1><p>系统本人选择的 centos7</p><h2 id="nginx-安装配置" tabindex="-1">Nginx 安装配置 <a class="header-anchor" href="#nginx-安装配置" aria-label="Permalink to &quot;Nginx 安装配置&quot;">​</a></h2><h3 id="nginx安装" tabindex="-1">Nginx安装 <a class="header-anchor" href="#nginx安装" aria-label="Permalink to &quot;Nginx安装&quot;">​</a></h3><p>CentOS系统安装Nginx可以通过多种方式进行，包括使用官方的包管理器yum或者dnf（CentOS 8及以上版本），编译安装，或者使用第三方仓库如EPEL。以下是使用yum和EPEL仓库安装Nginx的步骤：</p><ol><li>添加EPEL仓库：</li></ol><blockquote><p>如果你的系统中还没有EPEL仓库，你需要先添加它。EPEL（Extra Packages for Enterprise Linux）提供了许多在标准CentOS仓库中不可用的额外软件包。</p></blockquote><p><code>sudo yum install epel-release</code></p><ol start="2"><li>安装Nginx：</li></ol><blockquote><p>一旦EPEL仓库被添加，你可以使用yum来安装Nginx。</p></blockquote><p><code>sudo yum install nginx</code></p><ol start="3"><li>启动Nginx服务：</li></ol><blockquote><p>安装完成后，你需要启动Nginx服务。</p></blockquote><p><code>sudo systemctl start nginx</code></p><p><code>sudo systemctl restart nginx</code> or <code>sudo systemctl reload nginx</code></p><ol start="4"><li>设置开机启动：</li></ol><blockquote><p>如果你希望Nginx在系统启动时自动运行，可以使用以下命令来设置。</p></blockquote><p><code>sudo systemctl enable nginx</code></p><ol start="5"><li>调整防火墙设置：</li></ol><blockquote><p>如果你的系统运行着防火墙，你需要允许HTTP和HTTPS流量。</p></blockquote><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sudo firewall</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cmd </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">permanent </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">zone</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">public </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">add</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">service</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">http</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sudo firewall</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cmd </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">permanent </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">zone</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">public </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">add</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">service</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">https</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sudo firewall</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cmd </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">reload</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="6"><li>验证安装：</li></ol><blockquote><p>你可以通过访问你的服务器的公共IP地址或域名来验证Nginx是否成功安装。在Web浏览器中输入以下内容：</p></blockquote><p><code>http://your_server_ip_or_domain/</code></p><p>如果安装成功，你应该能看到Nginx的默认欢迎页面。</p><p>请注意，以上步骤适用于CentOS 7。如果你使用的是CentOS 8或更高版本，可能需要使用dnf代替yum，但是步骤基本相同。</p><p>如果你需要更高级的配置或者特定版本的Nginx，你可能需要考虑编译安装或者使用Nginx官方的仓库。编译安装会更复杂，但是它允许你自定义安装选项和模块。</p><h3 id="nginx-配置" tabindex="-1">Nginx 配置 <a class="header-anchor" href="#nginx-配置" aria-label="Permalink to &quot;Nginx 配置&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; # 监听 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 端口</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        server_name example.com; # 你的域名</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        location </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_pass </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//localhost:3000; # Web 服务端地址和端口</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_http_version </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_set_header Connection </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;upgrade&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_set_header Host $host;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_cache_bypass $http_upgrade;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_set_header </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">X</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Real</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_set_header </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">X</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Forwarded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            proxy_set_header </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">X</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Forwarded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Proto $scheme;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>在这个配置中：</p><ul><li>listen 80; 指定 Nginx 监听 80 端口，这是 HTTP 的默认端口。</li><li>server_name 指定了域名，你应该将其替换为你自己的域名或者 IP 地址。</li><li>location / 定义了一个位置块，用于匹配所有进入的请求。</li><li>proxy_pass 指令将请求转发到指定的地址和端口，这里应该替换为你的 Web 服务端的实际地址和端口。</li><li>其他 proxy_set_header 指令用于设置一些 HTTP 头信息，以确保请求在转发时保持正确的信息。</li></ul><blockquote><p>请注意，如果你的 Web 应用使用 WebSocket，proxy_set_header 指令中的 Upgrade 和 Connection 设置是必要的，以确保 WebSocket 连接能够正确建立。</p></blockquote><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">server {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    listen </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    server_name jenkins.example.com; # 替换为你的 Jenkins 域名</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    location </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_set_header        Host </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$host</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:$server_port;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_set_header        </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">X</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Real</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $remote_addr;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_set_header        </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">X</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Forwarded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_set_header        </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">X</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Forwarded</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Proto $scheme;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_redirect          </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// https://;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_pass              </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//localhost:8080; # 假设 Jenkins 运行在同一台机器的 8080 端口</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        # Required for </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> HTTP</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">based </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CLI</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_http_version      </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_request_buffering off;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        # workaround for Jenkins bug </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">with</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> HTTPS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        proxy_buffering         off;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="nginx-命令" tabindex="-1">Nginx 命令 <a class="header-anchor" href="#nginx-命令" aria-label="Permalink to &quot;Nginx 命令&quot;">​</a></h3><h2 id="mongodb-安装配置" tabindex="-1">Mongodb 安装配置 <a class="header-anchor" href="#mongodb-安装配置" aria-label="Permalink to &quot;Mongodb 安装配置&quot;">​</a></h2><h2 id="docker-安装配置" tabindex="-1">Docker 安装配置 <a class="header-anchor" href="#docker-安装配置" aria-label="Permalink to &quot;Docker 安装配置&quot;">​</a></h2><h2 id="node-安装配置" tabindex="-1">Node 安装配置 <a class="header-anchor" href="#node-安装配置" aria-label="Permalink to &quot;Node 安装配置&quot;">​</a></h2><h3 id="nodejs-安装" tabindex="-1">Nodejs 安装 <a class="header-anchor" href="#nodejs-安装" aria-label="Permalink to &quot;Nodejs 安装&quot;">​</a></h3><p>在CentOS上安装Node.js，你可以使用NodeSource仓库，这是一个提供最新版本Node.js二进制分发的仓库，或者使用官方的包管理器yum或dnf（CentOS 8及以上版本）来安装通过EPEL提供的版本。以下是使用NodeSource仓库安装Node.js的步骤：</p><ol><li>导入NodeSource仓库：</li></ol><blockquote><p>首先，你需要导入NodeSource仓库。NodeSource提供了一个安装脚本，可以自动添加仓库并导入GPG密钥。以下命令将为你安装Node.js 16.x版本，你可以根据需要安装其他版本，只需将setup_16.x中的数字更改为你想要安装的版本号。</p></blockquote><p><code>curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -</code></p><ol start="2"><li>安装Node.js： - 使用yum或dnf安装Node.js。</li></ol><pre><code>\`sudo yum install -y nodejs\`
- 或者在CentOS 8及以上版本中，你可以使用dnf：
</code></pre><p><code>sudo dnf install -y nodejs</code></p><ol start="3"><li>验证安装：</li></ol><pre><code>&gt; 安装完成后，你可以通过检查Node.js和npm的版本来验证安装是否成功。

\`node --version\`

\`npm --version\`
&gt; 如果你想要使用EPEL仓库中的Node.js版本，你可以按照以下步骤操作：

- 添加EPEL仓库（如果尚未添加）：

\`sudo yum install epel-release\`
</code></pre><ol start="4"><li>安装Node.js：</li></ol><pre><code>\`sudo yum install nodejs\`
</code></pre><p>请注意，EPEL仓库中的Node.js版本可能不是最新的。如果你需要最新版本的Node.js或特定版本，建议使用NodeSource仓库。</p><h3 id="nvm-安装" tabindex="-1">NVM 安装 <a class="header-anchor" href="#nvm-安装" aria-label="Permalink to &quot;NVM 安装&quot;">​</a></h3><p>在CentOS上安装NVM（Node Version Manager）是一个相对直接的过程。NVM允许你在同一台机器上安装和使用多个版本的Node.js。以下是安装NVM的步骤：</p><ol><li><p>下载NVM安装脚本：</p><ul><li>你可以使用curl或wget来下载NVM的安装脚本。如果你的系统中没有这些工具，你可以使用yum来安装它们。以下是使用curl的命令：</li></ul></li></ol><p><code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash</code></p><p>或者使用wget：</p><p><code>wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash</code></p><ol start="2"><li>运行安装脚本：</li></ol><blockquote><p>执行上面的命令将下载并运行NVM的安装脚本。该脚本会克隆NVM的仓库到<code>~/.nvm</code>，并添加必要的环境变量到你的shell配置文件中，比如 <code>~/.bash_profile、~/.zshrc、~/.profile或~/.bashrc</code>。</p></blockquote><ol start="3"><li>更新你的当前会话： <ul><li>安装完成后，你需要关闭并重新打开你的终端，或者运行以下命令来更新当前会话的环境变量：</li></ul></li></ol><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> NVM_DIR</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$([ -z &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">XDG_CONFIG_HOME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; ] &amp;&amp; printf %s &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">HOME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; || printf %s &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">XDG_CONFIG_HOME</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nvm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">s </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$NVM_DIR/nvm.sh&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \\. </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$NVM_DIR/nvm.sh&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // This loads nvm</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="4"><li><p>验证NVM安装：</p><ul><li>为了确认NVM已经正确安装，你可以运行：</li></ul><p><code>command -v nvm</code></p><ul><li>如果安装成功，这个命令应该输出nvm。</li></ul></li><li><p>使用NVM安装Node.js：</p><ul><li>一旦NVM安装完成，你可以安装Node.js的特定版本。例如，要安装Node.js的最新版本，你可以使用：</li></ul><p><code>nvm install node</code></p><p>或者，如果你想安装特定版本的Node.js，你可以指定版本号：</p><p><code>nvm install 14.17.0</code></p></li><li><p>切换Node.js版本：</p><ul><li>你可以随时切换到不同版本的Node.js。例如，要切换到已安装的14.17.0版本，你可以使用：</li></ul><p><code>nvm use 14.17.0</code></p></li><li><p>查看已安装的Node.js版本：</p><ul><li>要查看所有已安装的Node.js版本，你可以运行：</li></ul><p><code>nvm ls</code></p></li><li><p>设置默认Node.js版本：</p><ul><li>你可以设置一个默认的Node.js版本，这样每次打开一个新的终端时都会自动使用这个版本。例如：</li></ul><p><code>nvm alias default 14.17.0</code></p></li></ol><p>这些步骤应该能够帮助你在CentOS上安装和使用NVM来管理Node.js版本。记得每次打开一个新的终端窗口时，都要运行nvm use命令来选择一个特定版本的Node.js，或者设置一个默认版本以避免这个步骤。</p><h3 id="git安装" tabindex="-1">Git安装 <a class="header-anchor" href="#git安装" aria-label="Permalink to &quot;Git安装&quot;">​</a></h3><p>在CentOS上安装Git，你可以使用yum或dnf（CentOS 8及以上版本）包管理器。以下是使用yum在CentOS上安装Git的步骤：</p><ol><li><p>打开终端：</p><ul><li>打开你的CentOS系统的终端。</li></ul></li><li><p>安装Git：</p><ul><li>输入以下命令来安装Git：</li></ul></li></ol><p><code>sudo yum install git</code></p><ol start="3"><li>验证安装： <ul><li>安装完成后，你可以通过检查Git的版本来验证安装是否成功：</li></ul></li></ol><p><code>git --version</code></p><blockquote><p>如果你使用的是CentOS 8或更高版本，你可以使用dnf来安装Git：</p></blockquote><ol><li><p>打开终端：</p><ul><li>打开你的CentOS系统的终端。</li></ul></li><li><p>安装Git：</p><ul><li>输入以下命令来安装Git：</li></ul></li></ol><p><code>sudo dnf install git</code></p><ol start="3"><li>验证安装： <ul><li>安装完成后，你可以通过检查Git的版本来验证安装是否成功：</li></ul></li></ol><p><code>git --version</code></p><p>这些命令会从CentOS的默认仓库中安装Git。如果你需要安装最新版本的Git，你可能需要添加一个第三方仓库，如IUS（Inline with Upstream Stable），来获取最新版本的Git。但是，对于大多数用户来说，使用默认仓库中的Git版本应该就足够了。</p><h2 id="git-安装配置" tabindex="-1">Git 安装配置 <a class="header-anchor" href="#git-安装配置" aria-label="Permalink to &quot;Git 安装配置&quot;">​</a></h2><h2 id="pm2-安装" tabindex="-1">PM2 安装 <a class="header-anchor" href="#pm2-安装" aria-label="Permalink to &quot;PM2 安装&quot;">​</a></h2><h2 id="jenkins-自动化部署安装" tabindex="-1">Jenkins 自动化部署安装 <a class="header-anchor" href="#jenkins-自动化部署安装" aria-label="Permalink to &quot;Jenkins 自动化部署安装&quot;">​</a></h2><ul><li>拉取镜像 最新版本 <code>docker pull jenkins/jenkins:lts</code></li><li>运行容器 将jenkins 运行在 8080 端口 将jenkins 数据存储在主机的jenkins目录下 <code>docker run -d -p 8080:8080 -p 50000:50000 -v /jenkins:/var/jenkins_home --name jenkins jenkins/jenkins:lts</code> or <code>docker run -p 8080:8088 -p 50000:50000 jenkins/jenkins</code></li><li>获取初始管理员密码 <code>docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword</code></li></ul><p>启动 <code>docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts</code></p><h3 id="docker-安装" tabindex="-1">Docker 安装 <a class="header-anchor" href="#docker-安装" aria-label="Permalink to &quot;Docker 安装&quot;">​</a></h3><p>在CentOS上安装Docker，你可以遵循以下步骤。请注意，从CentOS 8开始，Docker已经被其上游企业版的Red Hat Enterprise Linux官方替换为Podman和Buildah。但是，你仍然可以在CentOS 7和CentOS 8上安装Docker CE（社区版）。</p><h4 id="_1-centos-7" tabindex="-1">1. CentOS 7 <a class="header-anchor" href="#_1-centos-7" aria-label="Permalink to &quot;1. CentOS 7&quot;">​</a></h4><ul><li>卸载旧版本的Docker（如果有的话）：</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sudo yum remove docker \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">client \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">client</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">latest \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">common \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">latest \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">latest</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">logrotate \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">logrotate \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">engine</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul><li><p>安装所需的包： <code>sudo yum install -y yum-utils</code></p></li><li><p>设置Docker仓库： <code>sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo</code></p></li><li><p>安装Docker CE： <code>sudo yum install docker-ce docker-ce-cli containerd.io</code></p></li><li><p>启动Docker守护进程： <code>sudo systemctl start docker</code></p></li><li><p>验证Docker是否正确安装： <code>sudo docker run hello-world</code></p></li></ul><p>-设置Docker开机自启： <code>sudo systemctl enable docker</code></p><h4 id="_2-centos-8" tabindex="-1">2. CentOS 8 <a class="header-anchor" href="#_2-centos-8" aria-label="Permalink to &quot;2. CentOS 8&quot;">​</a></h4><blockquote><p>对于CentOS 8，Docker官方不再提供支持，但你可以使用以下方法来安装Docker CE：</p></blockquote><ul><li>卸载旧版本的Docker（如果有的话）：</li></ul><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sudo dnf remove docker \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">client \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">client</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">latest \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">common \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">latest \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">latest</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">logrotate \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">logrotate \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              docker</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">engine</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>-设置Docker仓库： <code>sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo</code></p><ul><li><p>安装Docker CE： <code>sudo dnf install docker-ce docker-ce-cli containerd.io</code></p></li><li><p>启动Docker守护进程： <code>sudo systemctl start docker</code></p></li><li><p>验证Docker是否正确安装： <code>sudo docker run hello-world</code></p></li><li><p>设置Docker开机自启： <code>sudo systemctl enable docker</code></p></li><li><p>用户组</p></li></ul><blockquote><p>为了避免每次调用Docker命令时都需要使用sudo，你可以将你的用户添加到docker组中： <code>sudo usermod -aG docker your-user</code> 替换your-user为你的用户名。之后，你需要注销并重新登录，或者重启系统以使这些更改生效。</p></blockquote><blockquote><p>注意事项 在CentOS 8上，可能会有一些与cgroup驱动的兼容性问题，因为CentOS 8默认使用cgroup v2，而Docker默认期望使用cgroup v1。如果遇到这个问题，你可能需要调整Docker的配置或系统的cgroup设置。 如果你在安装过程中遇到任何问题，确保你的系统是最新的，并且已经安装了所有必要的依赖项。可以通过运行sudo yum update（CentOS 7）或sudo dnf update（CentOS 8）来更新系统。</p></blockquote><h3 id="jenkins-镜像安装" tabindex="-1">Jenkins 镜像安装 <a class="header-anchor" href="#jenkins-镜像安装" aria-label="Permalink to &quot;Jenkins 镜像安装&quot;">​</a></h3><p>在 CentOS 系统上使用 Docker 安装 Jenkins 的步骤如下：</p><ol><li><p>拉取 Jenkins Docker 镜像：</p><p>从 Docker Hub 上拉取最新的 Jenkins 镜像：</p></li></ol><p><code>sudo docker pull jenkins/jenkins:lts</code></p><p>这里使用的是 Jenkins 的长期支持版本（LTS）。</p><ol start="2"><li>运行 Jenkins 容器：</li></ol><p>使用以下命令运行 Jenkins 容器：</p><p><code>sudo docker run -d -p 8080:8080 -p 50000:50000 --name jenkins -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts</code></p><blockquote><p>这个命令会创建一个名为 jenkins 的容器，并将容器的 8080 端口映射到主机的 8080 端口，这样你就可以通过浏览器访问 Jenkins。同时，将容器的 50000 端口映射到主机的 50000 端口，用于 Jenkins 代理的通信。-v jenkins_home:/var/jenkins_home 选项将 Jenkins 数据持久化到 Docker 卷 jenkins_home。</p></blockquote><ol start="3"><li>获取初始管理员密码：</li></ol><p>Jenkins 首次启动时会生成一个初始的管理员密码，你需要这个密码来完成安装过程。使用以下命令获取密码：</p><p><code>sudo docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword</code></p><blockquote><p>复制显示的密码，你将在浏览器中设置 Jenkins 时使用它。</p></blockquote><ol start="4"><li><p>访问 Jenkins：</p><p>打开你的浏览器，访问 http://&lt;你的服务器IP&gt;:8080。你应该会看到 Jenkins 的安装向导。在要求输入初始管理员密码的地方，粘贴你之前复制的密码。</p></li><li><p>完成安装：</p><p>按照安装向导的指示完成安装。你可以选择安装推荐的插件集，或者自定义选择插件。之后，创建一个管理员用户，并配置 Jenkins 的实例。</p></li><li><p>配置 Jenkins： 安装完成后，你可以开始配置 Jenkins，包括创建新的构建作业、安装额外的插件等。</p></li></ol><blockquote><p>请确保你的服务器防火墙设置允许访问 8080 和 50000 端口。如果你在使用云服务，你可能还需要在云服务的安全组设置中允许这些端口的流量。</p></blockquote>`,109),p=[l];function t(h,k,r,o,d,E){return a(),i("div",null,p)}const g=s(e,[["render",t]]);export{u as __pageData,g as default};
