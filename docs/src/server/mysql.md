# MySQL 安装使用

MySQL 是一个流行的开源关系型数据库管理系统。以下是在不同操作系统上安装和使用 MySQL 的基本步骤。

## 在 Linux 上安装 MySQL

### 以 Ubuntu 为例，你可以使用以下命令安装 MySQL：

1. 更新包索引：
```js
sudo apt update
```
2. 安装 MySQL 服务器：
```js
sudo apt install mysql-server
```
3. 安全安装，设置密码，移除匿名用户，禁止远程 root 登录等：
```js
sudo mysql_secure_installation
```
4. 启动 MySQL 服务：
```js
sudo systemctl start mysql
```
5. 验证 MySQL 是否正在运行：
```js
sudo systemctl status mysql
```
6. （可选）使 MySQL 服务在启动时自动启动：
```js
sudo systemctl enable mysql
```
## 在 macOS 上安装 MySQL

> 在 macOS 上，你可以使用 Homebrew 来安装 MySQL：

1. 更新 Homebrew：
```js
brew update
```
2. 安装 MySQL：
```js
brew install mysql
```
3. 启动 MySQL 服务：
```js
brew services start mysql
```
4. 运行安全安装脚本：
```js
mysql_secure_installation
```
## 在 Windows 上安装 MySQL

在 Windows 上，你可以从 MySQL 官方网站下载安装程序并按照向导进行安装。

- 访问 MySQL 官方下载页面：MySQL Downloads
- 选择适合你的 Windows 版本的安装程序。
- 下载并运行安装程序，按照向导指示完成安装。

## 使用 MySQL
<!-- [Node项目安装及使用](/guide/node/koa/数据库连接.md) -->

> 安装完成后，你可以使用 MySQL 命令行客户端连接到数据库并开始使用。

- 启动 MySQL 命令行客户端：
```js
mysql -u root -p
```

> 这里 -u 表示用户名，root 是默认的管理员账户，-p 会提示你输入密码。
::: tip mysql 管理登录

在 MySQL 中设置账号密码通常涉及几个步骤，包括创建新用户、分配权限以及设置或更改密码。以下是一些基本的 SQL 命令来执行这些操作。
:::

- 创建新用户并设置密码

要创建一个新用户并立即设置密码，可以使用以下命令：

``` js
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
```

>将 `username` 替换为你想要创建的用户名，`password` 替换为你想要为该用户设置的密码。`localhost` 表示用户只能从本地机器连接到 MySQL 服务器。如果你想允许用户从任何主机连接，可以使用 `%` 替代 `localhost`。

- 更改现有用户的密码

如果用户已经存在，你可以更改其密码：

```JS
ALTER USER 'username'@'localhost' IDENTIFIED BY 'newpassword';
```

同样，将 `username` 和 `newpassword` 替换为相应的用户名和新密码。

- 删除用户

如果你需要删除一个用户，可以使用：

```JS
DROP USER 'username'@'localhost';
```
- 授予权限

创建用户后，你可能需要给用户授予对特定数据库的权限。例如，授予所有权限：

```JS
GRANT ALL PRIVILEGES ON databasename.* TO 'username'@'localhost';
```

这里 `databasename.*` 表示对名为 `databasename` 的数据库的所有表授予所有权限。你可以根据需要调整权限级别和数据库名称。

- 刷新权限

在授予权限后，执行以下命令来使权限立即生效：

```JS
FLUSH PRIVILEGES;
```
::: tip 注意事项
- 在执行这些操作之前，确保你已经以具有足够权限的用户身份登录到 MySQL 服务器。
- 从 MySQL 5.7 和 MariaDB 10.2 开始，IDENTIFIED BY 'password' 语法已经被认为是不安全的，推荐使用 CREATE USER 和 ALTER USER 来创建和修改用户密码。
- 在生产环境中，应该使用强密码，并且仅授予必要的最小权限。
- MySQL 8.0 之后的版本中，密码策略可能更加严格，需要设置复杂度更高的密码。
:::

> 请根据你的 MySQL 服务器版本和具体需求调整上述命令。

在 MySQL 命令行中，你可以执行各种 SQL 命令，例如：

- 显示所有数据库：

`SHOW DATABASES;`

- 创建新数据库：

`CREATE DATABASE mydatabase;`

- 使用特定数据库：

`USE mydatabase;`

- 创建数据表：
```js
CREATE TABLE mytable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT
);
```
- 插入数据：

`INSERT INTO mytable (name, age) VALUES ('John Doe', 30);`

- 查询数据：

`SELECT * FROM mytable;`

- 更新数据：

`UPDATE mytable SET age = 31 WHERE name = 'John Doe';`

- 删除数据：

`DELETE FROM mytable WHERE name = 'John Doe';`

在安装和使用 MySQL 时，请确保遵循最佳实践，特别是在生产环境中，包括配置适当的安全设置、定期备份数据等。

