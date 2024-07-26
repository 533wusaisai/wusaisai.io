
# MongoDB安装 使用
MongoDB 是一个流行的 NoSQL 数据库，它以其高性能、高可用性和易扩展性而闻名。以下是 MongoDB 在不同操作系统上的安装和使用的基本步骤。

## 在 Linux 上安装 MongoDB

### 以 Ubuntu 为例，你可以使用以下命令安装 MongoDB：

1. 导入 MongoDB 公钥：

```js
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```
2. 创建列表文件：
```js
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
```

3. 更新本地包数据库：
```js
sudo apt-get update
```
4. 安装 MongoDB：
```js
sudo apt-get install -y mongodb-org
```
5. 启动 MongoDB 服务：
```js
sudo systemctl start mongod
```
6. 验证 MongoDB 是否已成功启动：
```js
sudo systemctl status mongod
```
7. 设置 MongoDB 服务在启动时自动启动：
```js
sudo systemctl enable mongod
```
8. 停止 MongoDB 服务：
```js
sudo systemctl stop mongod
```

### CentOS安装

  创建MongoDB仓库文件:

  1. 首先，你需要创建一个包含MongoDB仓库的.repo文件。使用你喜欢的文本编辑器（如vi或nano）创建一个新的仓库文件：

  `sudo vi /etc/yum.repos.d/mongodb-org.repo`

  2. 然后，将以下内容粘贴到文件中：
  ````md
  [mongodb-org-7.0]
  name=MongoDB Repository
  baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/7.0/x86_64/
  gpgcheck=1
  enabled=1
  gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
  ````
  ::: tip 注意
  这里使用的是MongoDB 7.0的仓库。如果你需要安装不同的版本，请相应地更改仓库URL和名称。
  :::

  3. 安装MongoDB：
  - 通过运行以下命令来安装MongoDB：

  `sudo yum install -y mongodb-org`

  - 启动MongoDB服务：使用以下命令启动MongoDB服务：

  `sudo systemctl start mongod`

  - 如果你想让MongoDB在系统启动时自动启动，运行：

  `sudo systemctl enable mongod`

  - 检查MongoDB服务的状态：

  `sudo systemctl status mongod`

   - 停止MongoDB服务：

  `sudo systemctl stop mongod`

  ::: info 调整防火墙设置（如果需要）：
  如果你的服务器运行了防火墙，并且你需要从外部访问MongoDB，你需要打开27017端口（MongoDB的默认端口）
  :::

  ```js
  sudo firewall-cmd --zone=public --add-port=27017/tcp --permanent
  sudo firewall-cmd --reload
  ```





## 在 macOS 上安装 MongoDB

在 macOS 上，你可以使用 Homebrew 来安装 MongoDB：

1. 更新 Homebrew：

```js
brew update
```
2. 安装 MongoDB：

```js
brew tap mongodb/brew

brew install mongodb-community@7.0
```
3. 启动 MongoDB 服务：

```js
brew services start mongodb/brew/mongodb-community
```

## 在 Windows 上安装 MongoDB

在 Windows 上，你可以从 MongoDB 官方网站下载安装程序并按照向导进行安装。

::: info 官方下载
访问 MongoDB 官方下载页面：MongoDB Download Center
选择适合你的 Windows 版本的安装程序。
下载并运行安装程序，按照向导指示完成安装。
:::

1. 使用 MongoDB

安装完成后，你可以使用 MongoDB Shell 连接到数据库并开始使用。

2. 启动 MongoDB Shell：
```js
mongo
```

## mongodb 使用
[Node项目安装及使用](/guide/node/koa/数据库连接.md)

在 MongoDB Shell 中，你可以执行各种命令，例如：

- 显示所有数据库：

`show dbs`

- 使用特定数据库：

`use myDatabase`

- 插入数据到集合：

`db.myCollection.insert({ name: "John Doe", age: 30 })`

- 查询数据：

`db.myCollection.find()`

- 更新数据：

`db.myCollection.update({ name: "John Doe" }, { $set: { age: 31 } })`

- 删除数据：

`db.myCollection.remove({ name: "John Doe" })`


::: info 注意
这些命令只是 MongoDB 功能的一个非常基本的介绍。MongoDB 是一个功能丰富的数据库，提供了许多高级功能，如聚合、索引、复制和分片等。
:::



## 创建用户 

::: info 注意
 数据库增加访问限制，以免在云服务器上受到攻击，设定特定账号访问并添加对应权限
:::
  0. 切换到admin添加角色
  ```js
  <!-- 进入mongodb服务 -->
  mongosh
  
  use admin
  //
  db.getUsers()
  // 登录
  db.auth('existingAdminUser', 'existingAdminPassword')
  ```
  1. 创建用户名密码

  ```js
  // 如果没有角色 创建
  db.createUser({
    user: "adminUser",   // 用户名
    pwd: "adminPassword", // 密码
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }]  // 库 角色
  });
  // 更新
  db.updateUser("admin",{
    $set:{
      roles:[
        {role:"",db:"admin"}
      ]
    }
  })
  // 撤销
  db.revokeRolesFromUser("admin",[{role:"",db:"admin"}])
  /**
   * @param {'readAnyDatabase', 'dbAdminAnyDatabase', 'userAdminAnyDatabase'}  角色
   */

   // 给admin 添加角色权限
  db.grantRolesToUser('yourUsername', [{ role: 'readAnyDatabase', db: 'admin' }])  // 为 { yourUsername: 用户名 } 数据库增加 角色

  ```
  ::: info
  - db.createUser(...): 这是MongoDB的命令，用于创建一个新的数据库用户。
  - user: 新用户的用户名，在这个例子中是"adminUser"。
  - pwd: 新用户的密码，在这个例子中是"adminPassword"。出于安全考虑，您应该使用一个强密码。
  - roles: 用户的角色列表，定义了用户的权限。在这个例子中，用户被赋予了"userAdminAnyDatabase"角色，这意味着用户可以管理服务器上的任何数据库。
  - role: 角色名称，在这个例子中是"userAdminAnyDatabase"。
  - db: 角色所在的数据库，在这个例子中是"admin"
  :::

  2. 服务器在 mongodb.conf 添加

  ```js
  security:
    authorization: "enabled"
  ```
  3. 重启 mongodb

  ```js
  sudo systemctl restart mongod
  ```
## 查询
  - Model.find(): 查找多个文档。
    ```js
      // 查找年龄大于18的所有用户
      MyModel.find({ age: { $gt: 18 } });

      // 查找年龄在18到30之间的所有用户
      MyModel.find({ age: { $gt: 18, $lt: 30 } });

      // 查找名字不是"John"的所有用户
      MyModel.find({ name: { $ne: "John" } });

      // 查找名字在指定列表中的所有用户
      MyModel.find({ name: { $in: ["Alice", "Bob", "Charlie"] } });

      // 查找有"email"字段的所有用户
      MyModel.find({ email: { $exists: true } });

      // 查找名字以字母"A"开头的所有用户
      MyModel.find({ name: { $regex: /^A/ } });

      // 查找名字以"A"开头或年龄大于30的所有用户
      MyModel.find({
        $or: [
          { name: { $regex: /^A/ } },
          { age: { $gt: 30 } }
        ]
      });

      // 查找名字不以"A"开头且年龄小于30的所有用户
      MyModel.find({
        $and: [
          { name: { $not: { $regex: /^A/ } } },
          { age: { $lt: 30 } }
        ]
      });
      // 查找年龄大于18且名字为"John"的所有用户
      MyModel.find({
        $and: [
          { age: { $gt: 18 } },
          { name: "John" }
        ]
      });
      // 查找年龄大于18或名字为"John"的所有用户
      MyModel.find({
        $or: [
          { age: { $gt: 18 } },
          { name: "John" }
        ]
      });

      // 查找年龄不小于18的所有用户（即查找年龄大于或等于18的用户）
      MyModel.find({
        age: { $not: { $lt: 18 } }
      });
      // 查找年龄不大于18且名字不为"John"的所有用户
      MyModel.find({
        $nor: [
          { age: { $gt: 18 } },
          { name: "John" }
        ]
      });
      select(): 指定要返回的字段。
      sort(): 对结果进行排序。
      limit(): 限制返回的文档数量。
      skip(): 跳过指定数量的文档。
      where(): 提供更直观的方式来指定查询条件。
      equals(): 在 where() 后使用，用于指定等于某个值的条件。
      gt(), gte(): 选择大于或大于等于指定值的文档字段。
      lt(), lte(): 选择小于或小于等于指定值的文档字段。
      in(): 选择字段值在指定数组中的文档。
      nin(): 选择字段值不在指定数组中的文档。
      or(): 提供多个条件，只要满足其中一个即可。
      and(): 提供多个条件，必须全部满足。
      nor(): 提供多个条件，不能满足任何一个。
      exists(): 选择存在指定字段的文档。
      regex(): 使用正则表达式来匹配字段值。
      populate(): 填充关联文档的字段。
      lean(): 返回纯粹的 JavaScript 对象，而不是 Mongoose 文档对象。
      batchSize(): 设置 MongoDB 游标的批量大小。
      comment(): 添加注释到查询，以便在 MongoDB 的日志中识别。
      hint(): 提供索引的提示给查询优化器。
      collation(): 指定用于查询的排序规则，用于支持区域设置的字符串比较。
      maxTimeMS(): 设置查询的最大执行时间。
      read(): 指定查询的读取偏好。
      readConcern(): 
      Model.find({ age: { $gte: 18 } }) // 查找年龄大于等于18的文档
      .select('name age') // 只返回 name 和 age 字段
      .sort({ age: -1 }) // 按年龄降序排序
      .limit(10) // 限制返回的结果数量为10
      .lean() // 返回纯粹的 JavaScript 对象
      .exec((err, docs) => { // 执行查询并处理结果
        if (err) {
          console.error(err);
        } else {
          console.log(docs);
        }
      });
    ```

  - Model.findOne(): 查找单个文档。
    ```js
      - api 同上
      - 链式方法
        select() - 指定要包含或排除的字段（投影）。
        sort() - 根据指定字段对结果进行排序。
        skip() - 跳过指定数量的文档，常用于分页。
        limit() - 限制查询结果的最大文档数。
        where() - 更直观的方式来添加查询条件。
        or() - 添加一个 $or 条件。
        and() - 添加一个 $and 条件。
        nor() - 添加一个 $nor 条件。
        ne() - 添加一个 $ne（不等于）条件。
        in() - 添加一个 $in 条件，用于匹配数组中的任何值。
        nin() - 添加一个 $nin 条件，用于排除数组中的值。
        gt(), gte(), lt(), lte() - 添加大于、大于等于、小于、小于等于条件。
        regex() - 添加一个正则表达式条件。
        maxDistance() - 用于地理空间查询，指定最大距离。
        mod() - 添加一个模运算条件。
        exists() - 检查字段是否存在。
        populate() - 自动替换指定路径中的文档。
        lean() - 返回纯粹的JavaScript对象，而不是Mongoose文档对象。
        hint() - 指定要使用的索引。
        collation() - 指定排序时使用的语言环境比较规则。
        slice() - 选择一个数组字段的子集。
        elemMatch() - 指定数组字段内部的查询条件。
        exec() - 执行查询并返回一个Promise。

      - eq
        User.findOne() // 开始一个查询
        .where('age').gt(18) // 年龄大于18
        .where('name').equals('John') // 名字等于John
        .select('name age') // 只选择name和age字段
        .sort('-age') // 根据年龄降序排序
        .limit(1) // 限制结果为1个文档
        .exec((err, user) => { // 执行查询
          if (err) throw err;
          console.log(user);
        });
    ```

  - Model.findById(): 通过其 ID 查找单个文档。
    - 基本同上
    ```js
      select() - 指定要包含或排除的字段（投影）。
      sort() - 根据指定字段对结果进行排序（虽然对于单个文档来说这不常用）。
      populate() - 自动替换指定路径中的文档。
      lean() - 返回纯粹的JavaScript对象，而不是Mongoose文档对象。
      exec() - 执行查询并返回一个Promise。

      - eq
      User.findById(userId)
      .select('username email') // 选择返回的字段
      .populate('friends') // 假设用户文档中有一个引用其他用户的 'friends' 字段
      .lean() // 返回一个纯粹的JavaScript对象
      .exec((err, user) => {
        if (err) {
          console.error(err);
        } else if (user) {
          console.log(user); // 找到的用户文档
        } else {
          console.log('No user found with that _id.');
        }
      });
    ```
  - Model.count(): 计算文档的数量。(mongoose 5.2 mongodb 4.0.3版本后【弃用】)  
  - Model.countDocuments(): 计算符合条件的文档数量。
    在这个链式调用的例子中，我们首先调用 countDocuments()，然后使用 where() 和 gt() 方法来指定查询条件，最后执行查询并处理结果。
    ```js
      - 以下是可以与 countDocuments() 链式调用的一些方法：

        where() - 添加查询条件。
        or() - 添加一个 $or 条件。
        and() - 添加一个 $and 条件。
        nor() - 添加一个 $nor 条件。
        gt(), gte(), lt(), lte() - 添加大于、大于等于、小于、小于等于条件。
        in() - 添加一个 $in 条件，用于匹配数组中的任何值。
        nin() - 添加一个 $nin 条件，用于排除数组中的值。
        ne() - 添加一个 $ne（不等于）条件。
        regex() - 添加一个正则表达式条件。
        exists() - 检查字段是否存在。
        elemMatch() - 指定数组字段内部的查询条件。
        exec() - 执行查询并返回一个Promise。
        请注意，与检索文档的查询方法（如 find()、findOne() 等）不同，countDocuments() 不支持 select()、sort()、skip()、limit() 等影响返回文档的方法，因为它们对计数操作没有意义。
      - eq
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;

        // 定义模型的 schema
        const userSchema = new Schema({
          username: String,
          email: String,
          age: Number,
          // 其他字段...
        });

        // 创建模型
        const User = mongoose.model('User', userSchema);

        // 使用 countDocuments() 根据条件计算文档数量
        User.countDocuments({ age: { $gt: 18 } }, (err, count) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`There are ${count} users older than 18.`);
          }
        });
    ```
  - Model.estimatedDocumentCount(): 估算集合中的文档数量。
    ```js
      async function estimateUserCount() {
        try {
          const count = await User.estimatedDocumentCount();
          console.log(`There are approximately ${count} users in the database.`);
        } catch (err) {
          console.error(err);
        }
      }

      estimateUserCount();
    ```
  - Model.findOneAndUpdate(): 查找单个文档并更新它。  【下方 创建更新中 有】
  - Model.findByIdAndUpdate(): 通过 ID 查找单个文档并更新它。
    ```js
      // 更新文档
      User.findByIdAndUpdate(userId, { $set: { age: 30 } }, { new: true }, (err, user) => {
        if (err) {
          console.error(err);
        } else {
          console.log(user); // 返回更新后的文档，如果设置了 { new: true }
        }
      });
      upsert: 如果设置为 true，并且没有找到匹配的文档，Mongoose 会插入一个新文档。
      runValidators: 如果设置为 true，Mongoose 会在更新操作前运行验证规则。
      setDefaultsOnInsert: 如果 upsert 选项为 true，并且创建新文档，则应用 schema 中的默认值。
      select: 指定返回的字段。
      sort: 如果有多个文档匹配，这个选项可以指定排序，以决定哪个文档应该被更新。
      maxTimeMS: 指定操作的最大执行时间。
    ```

  - Model.findOneAndDelete(): 查找单个文档并删除它。

    ```js
      async function deleteUserByUsername(username) {
        try {
          const deletedUser = await User.findOneAndDelete({ username: username },
          {
            projection: 'username email',
            sort: { age: -1 },
            maxTimeMS: 1000,
          });
          console.log(deletedUser); // 返回被删除的文档
        } catch (err) {
          console.error(err);
        }
      }

      deleteUserByUsername('johndoe');

      sort: 如果有多个文档匹配查询条件，这个选项可以指定排序，以决定哪个文档应该被删除。
      projection: 指定返回的字段。
      maxTimeMS: 指定操作的最大执行时间。
      collation: 指定用于操作的排序规则。这对于支持区域设置的字符串比较很有用。
      session: 传递 MongoDB 事务会话给操作。
    ```
  - Model.findByIdAndDelete(): 通过 ID 查找单个文档并删除它。
    ```js
      async function deleteUserById(userId) {
        try {
          const deletedUser = await User.findByIdAndDelete(userId, { projection: 'username email' });
          console.log(deletedUser); // 返回被删除的文档，只包含 username 和 email 字段
        } catch (err) {
          console.error(err);
        }
      }

      deleteUserById(someUserId)

      session: 传递 MongoDB 事务会话给操作。
      collation: 指定用于操作的排序规则。这对于支持区域设置的字符串比较很有用。
      projection: 指定返回的字段。你可以传递一个对象或字符串来指定应该返回哪些字段。

    ```
  - Model.aggregate(): 执行聚合操作。
    ```js
      // 创建一个聚合管道
      const pipeline = [
        { $match: { status: 'delivered' } }, // 只选择状态为 'delivered' 的订单
        { $group: { _id: '$customerId', totalAmount: { $sum: '$amount' } } }, // 按 customerId 分组，并计算每个客户的订单总金额
        { $sort: { totalAmount: -1 } } // 按 totalAmount 降序排序
      ];

      // 执行聚合管道
      Order.aggregate(pipeline).then(results => {
        console.log(results); // 输出聚合结果
      }).catch(err => {
        console.error(err);
      })

      $match: 过滤数据，只输出符合条件的文档。
      $group: 将集合中的文档分组，可用于计算总和、平均值、最小值、最大值等。
      $sort: 对文档进行排序。
      $project: 投影操作，用于选择、排除或添加字段。
      $limit: 限制聚合管道返回的文档数量。
      $skip: 跳过指定数量的文档。
      $unwind: 展开数组字段，将每个数组值转换为一个独立的文档。
      $lookup: 从另一个集合中拉取文档并将其合并到当前的聚合管道中，类似于 SQL 中的 JOIN 操作。
      $addFields / $set: 向文档添加新的字段或修改现有的字段。
      $unset: 从文档中移除指定的字段。
      $replaceRoot / $replaceWith: 替换当前的文档为指定的文档。
      $count: 计算文档的数量。
      $sum: 计算字段的总和。
      $avg: 计算字段的平均值。
      $min: 获取字段的最小值。
      $max: 获取字段的最大值。
      $push: 在 $group 阶段中使用，将值插入到结果数组中。
      $addToSet: 在 $group 阶段中使用，将值插入到结果数组中，但不包括重复项。
      $first: 在 $group 阶段中使用，获取分组的第一个文档。
      $last: 在 $group 阶段中使用，获取分组的最后一个文档。
      $merge: 将聚合管道的结果合并到指定的集合中。
      $out: 将聚合管道的结果输出到指定的集合中，如果集合存在，则替换它。

    ```

## 创建 更新
  - Model.create(): 创建一个或多个文档。
  - Model.updateOne(): 更新单个文档。
    ```javascript
      Model.updateOne(query, update, options, callback);

      query: 查询条件对象，用于选择要更新的文档。
        这是一个对象，用于指定筛选数据库中文档的条件。例如 { name: 'John Doe' }。

      update: 更新操作或要应用于文档的更改。
        这是一个对象，描述了如何更新文档。它可以包含 MongoDB 的更新操作符，如 $set, $inc, 等。例如 { $set: { age: 30 } }。
        $set:
        $unset:
        $push:
        $pull:

      options: （可选）额外的选项对象。

        upsert: 如果为 true，如果没有找到匹配的文档，则根据提供的查询条件和更新操作创建一个新的文档。默认为 false。
        runValidators: 如果为 true，在更新操作时执行 Schema 中定义的验证规则。默认为 false。
        setDefaultsOnInsert: 如果 upsert 选项为 true，在创建新文档时应用 Schema 的默认值。默认为 false。
        strict: 设置为 true 以应用 Schema 的严格模式，设置为 false 可以插入不在 Schema 中定义的字段。
        collation: 指定用于查询的排序规则，用于支持区域设置的字符串比较。
        multi: 在 Mongoose 中，updateOne() 默认只更新一个文档，而 update() 方法可以通过设置 multi: true 来更新多个文档。updateOne() 不需要这个选项，因为它总是只更新一个文档。
        writeConcern: 指定写入操作的安全级别。
        timestamps: 如果为 true，则会自动更新 createdAt 和 updatedAt 时间戳字段。默认行为取决于 Schema 的设置。
        session: 传递 MongoDB 事务会话给操作。

      callback: （可选）执行操作后的回调函数。
        callback: （可选）一个回调函数，形式为 function(err, res) {}。如果提供了回调，方法会立即执行，并在完成时调用回调。err 参数包含错误信息（如果有），res 参数包含操作的结果。

    - eq: 添加/删除/更新 / 数组中删除

        Model.updateOne({ name: 'John Doe' }, { $set: { newField: 'Value' } })
        Model.updateOne({ name: 'John Doe' }, { $unset: { fieldToRemove: '' } })
        Model.updateOne({ name: 'John Doe' }, { $push: { arrayField: 'newValue' } })
        Model.updateOne({ name: 'John Doe' }, { $pull: { arrayField: 'valueToRemove' } })
        async function updateDocument(id) {
          try {
            const result = await Model.updateOne(
              { _id: id },
              { $set: { name: 'New Name' } },
              { upsert: true, runValidators: true }
            );
            console.log(result);
          } catch (err) {
            console.error(err);
          }
        }

        updateDocument(someId)
    ```
  - Model.updateMany(): 更新多个文档。
    ```js
      Model.updateMany(filter, update, options, callback);
        filter: 查询条件对象，用于选择要更新的文档。
        update: 更新操作或要应用于文档的更改。
        options: （可选）额外的选项对象。
        callback: （可选）执行操作后的回调函数。
      - 详解：
        filter: 这是一个对象，用于指定筛选数据库中文档的条件。例如 { status: 'pending' }。
        update: 这是一个对象，描述了如何更新文档。它可以包含 MongoDB 的更新操作符，如 $set, $inc, 等。例如 { $set: { status: 'completed' } }。
        options: （可选）一个对象，包含一些额外的配置选项。常见的选项包括：
          upsert: 如果为 true，如果没有找到匹配的文档，则根据提供的查询条件和更新操作创建一个新的文档。默认为 false。
          runValidators: 如果为 true，在更新操作时执行 Schema 中定义的验证规则。默认为 false。
          setDefaultsOnInsert: 如果 upsert 选项为 true，在创建新文档时应用 Schema 的默认值。默认为 false。
          strict: 设置为 true 以应用 Schema 的严格模式，设置为 false 可以插入不在 Schema 中定义的字段。
          collation: 指定用于查询的排序规则，用于支持区域设置的字符串比较。
          writeConcern: 指定写入操作的安全级别。
          timestamps: 如果为 true，则会自动更新 createdAt 和 updatedAt 时间戳字段。默认行为取决于 Schema 的设置。
          session: 传递 MongoDB 事务会话给操作。

        callback: （可选）一个回调函数，形式为 function(err, result) {}。如果提供了回调，方法会立即执行，并在完成时调用回调。err 参数包含错误信息（如果有），result 参数包含操作的结果，如匹配和更新的文档数量。

      - eq:
        Model.updateMany({ status: 'pending' }, { $set: { status: 'completed' } })
        async function updateDocuments() {
          try {
            const result = await Model.updateMany(
              { age: { $lt: 18 } },
              { $set: { status: 'minor' } },
              { runValidators: true }
            );
            console.log(result);
          } catch (err) {
            console.error(err);
          }
        }

        updateDocuments();

    ```
  - Model.findOneAndUpdate()
    ```javascript
      Model.findOneAndUpdate(query, update, options, callback);
        - 参数详解：
          query: 查询条件对象，用于选择要更新的文档。
          update: 更新操作或要应用于文档的更改。
          options: （可选）额外的选项对象。
          callback: （可选）执行操作后的回调函数。

            query: 这是一个对象，用于指定筛选数据库中文档的条件。例如 { name: 'John Doe' }。
            update: 这是一个对象，描述了如何更新文档。它可以包含 MongoDB 的更新操作符，如 $set, $inc, 等。例如 { $set: { age: 30 } }。
            options: （可选）一个对象，包含一些额外的配置选项。常见的选项包括：

            new: 如果为 true，返回修改后的文档而不是原始文档。默认为 false。
            upsert: 如果为 true，如果没有找到匹配的文档，则创建一个新的文档。默认为 false。
            fields: 指定返回的字段（类似于 SQL 的 SELECT 语句）。
            runValidators: 如果为 true，运行更新操作时应用 Schema 中定义的验证规则。默认为 false。
            setDefaultsOnInsert: 如果 upsert 选项为 true，在创建新文档时应用 Schema 的默认值。默认为 false。
            sort: 如果多个文档匹配查询条件，通过 sort 选项指定排序方式来决定更新哪个文档。
            rawResult: 如果为 true，返回 MongoDB 原始结果对象。默认为 false。
            strict: 设置为 true 以应用 Schema 的严格模式，设置为 false 可以插入不在 Schema 中定义的字段。
            useFindAndModify: 设置为 false 以禁用 findAndModify()，并使用 findOneAndUpdate() 的原生方法。在新版本的 Mongoose 中，默认为 false。
            maxTimeMS: 设置查询的最大执行时间。
            collation: 指定用于查询的排序规则，用于支持区域设置的字符串比较。
            session: 传递 MongoDB 事务会话给操作。

            callback: （可选）一个回调函数，形式为 function(err, doc) {}。如果提供了回调，方法会立即执行，并在完成时调用回调。err 参数包含错误信息（如果有），doc 参数包含更新后的文档（如果设置了 new: true）。

        - eq:
            Model.findOneAndUpdate({ name: 'John Doe' }, { $set: { age: 30 } }, { new: true })
            async function updateDocument(id) {
              try {
                const updatedDoc = await Model.findOneAndUpdate(
                  { _id: id },
                  { $set: { name: 'New Name' } },
                  { new: true, runValidators: true }
                );
                console.log(updatedDoc);
              } catch (err) {
                console.error(err);
              }
            }

            updateDocument(someId);

    ```
  - Model.replaceOne(): 替换单个文档。
    ```js
      Model.replaceOne(filter, replacement, options, callback)
        - 参数详解:
          filter: 查询条件对象，用于选择要替换的文档。
          replacement: 替换操作的新文档数据。
          options: （可选）额外的选项对象。
          callback: （可选）执行操作后的回调函数。

          filter: 这是一个对象，用于指定筛选数据库中文档的条件。例如 { name: 'John Doe' }。
          replacement: 这是一个新的对象，它将完全替换匹配的文档。请注意，这个对象不应该包含 _id 字段，除非你打算使用相同的 _id。
          options: （可选）一个对象，包含一些额外的配置选项。常见的选项包括：
            upsert: 如果为 true，如果没有找到匹配的文档，则根据提供的新文档创建一个新的文档。默认为 false。
            strict: 设置为 true 以应用 Schema 的严格模式，设置为 false 可以插入不在 Schema 中定义的字段。
            writeConcern: 指定写入操作的安全级别。
            collation: 指定用于查询的排序规则，用于支持区域设置的字符串比较。
            session: 传递 MongoDB 事务会话给操作。


          callback: （可选）一个回调函数，形式为 function(err, result) {}。如果提供了回调，方法会立即执行，并在完成时调用回调。err 参数包含错误信息（如果有），result 参数包含操作的结果，如是否成功替换文档。

        - eq:
          Model.replaceOne({ name: 'John Doe' }, { name: 'Jane Doe', age: 30 })
          async function replaceDocument(id) {
            try {
              const result = await Model.replaceOne(
                { _id: id },
                { name: 'New Name', age: 30 },
                { upsert: true }
              );
              console.log(result);
            } catch (err) {
              console.error(err);
            }
          }

          replaceDocument(someId);

    ```
  - document.save(): 保存一个文档实例
    - 执行insert

## 删除
  - Model.deleteOne(): 删除单个文档。
    ```js
      Model.deleteOne({ conditions }, [options], [callback]);
      - 参数详解
        conditions: 查询条件对象，用于选择要删除的文档。
        options: （可选）额外的选项对象。
        callback: （可选）执行操作后的回调函数。

        conditions: 这是一个对象，用于指定筛选数据库中文档的条件。例如 { name: 'John Doe' }。
        options: （可选）一个对象，包含一些额外的配置选项。这些选项通常不常用，但是可以用于特定的操作，比如设置超时时间。
          strict: 设置为 true 以应用 Schema 的严格模式，设置为 false 可以删除不在 Schema 中定义的字段。
          collation: 指定用于查询的排序规则，用于支持区域设置的字符串比较。
          writeConcern: 指定写入操作的安全级别。
          session: 传递 MongoDB 事务会话给操作。
        callback: （可选）一个回调函数，形式为 function(err, result) {}。如果提供了回调，方法会立即执行，并在完成时调用回调。err 参数包含错误信息（如果有），result 参数包含操作的结果，如删除的文档数量。
     
      - eq:
        Model.deleteOne({ name: 'John Doe' })
    ```
  - Model.deleteMany(): 删除多个文档。
    - 同上

## 中间件
  - schema.pre(): 定义在某个操作之前运行的中间件。
    预处理中间件是在某些操作执行之前自动运行的函数，常用于验证、修改数据或记录日志等任务。这些中间件可以是同步的，也可以是异步的。

    ```js
      save: 在文档保存之前执行。
      validate: 在文档验证之前执行。
      remove: 在文档删除之前执行。
      updateOne: 在执行 updateOne 操作之前执行。
      deleteOne: 在执行 deleteOne 操作之前执行。
      等等，包括 find, findOne, insertMany 等。

    - eq:
      schema.pre('hook', [options], async function(next) {
        // 在操作执行前的逻辑
        next();
      });
      hook: 要挂钩的操作名称，如 save, remove 等。
      options: （可选）一个对象，用于设置中间件的选项，如 { query: true, document: true } 用于查询中间件。
      function(next): 中间件函数，它执行实际的预处理工作。对于异步操作，你可以调用 next() 来传递控制权，或者在异步函数中返回一个 Promise。
      async function(): 如果你使用的是异步函数，你不需要调用 next()，只需确保函数执行完毕即可
      
      // 它在保存文档之前自动加密用户密码：
      const bcrypt = require('bcrypt');
      const userSchema = new mongoose.Schema({
        username: String,
        password: String
      });

      // 在保存前加密密码
      userSchema.pre('save', async function(next) {
        // 只有在密码被修改时才运行
        if (!this.isModified('password')) return next();

        // 生成盐
        const salt = await bcrypt.genSalt();

        // 加密密码
        this.password = await bcrypt.hash(this.password, salt);

        next();
      });

      const User = mongoose.model('User', userSchema);
      > 在这个例子中，每当一个 User 文档被保存时，如果密码字段被修改了，它就会被自动加密。这是通过在 save 钩子上定义一个异步的预处理中间件来实现的。

      - 注意事项
        使用 next() 时要小心，确保不要在异步操作完成之前调用它，否则可能会导致未定义的行为。
        如果在中间件中发生错误，你应该将错误对象传递给 next()，这样 Mongoose 就能捕获并处理错误。
        在预处理中间件中修改文档时，应该使用 this 关键字来引用当前的文档实例。
    ```

  - schema.post(): 定义在某个操作之后运行的中间件。
    后置中间件是在某些操作执行之后自动运行的函数，常用于日志记录、执行一些清理任务或者触发某些业务逻辑。
    ```js
      - 方法可以用于以下几种操作:

        init: 在文档被初始化后执行。
        validate: 在文档验证之后执行。
        save: 在文档保存之后执行。
        remove: 在文档删除之后执行。
        find: 在查询执行之后执行。
        findOne: 在查询单个文档执行之后执行。
        updateOne: 在执行 updateOne 操作之后执行。
        deleteOne: 在执行 deleteOne 操作之后执行。
        等等，包括 updateMany, deleteMany, findOneAndUpdate 等。
      
      - 语法
        schema.post('hook', function(doc, next) {
          // 在操作执行后的逻辑
          next();
        });

      - 参数详解：
        hook: 要挂钩的操作名称，如 save, remove 等。
        function(doc, next): 后置中间件函数，它执行实际的后处理工作。对于异步操作，你可以调用 next() 来传递控制权。
        async function(doc): 如果你使用的是异步函数，你不需要调用 next()，只需确保函数执行完毕即可。
        doc: 操作完成后传递给中间件的文档或查询结果。

      - eq: 
        const userSchema = new mongoose.Schema({
          username: String,
          password: String
        });

        // 在保存后记录日志
        userSchema.post('save', function(doc, next) {
          console.log('%s has been saved', doc._id);
          next();
        });

        const User = mongoose.model('User', userSchema);
        
     
    ```
    > 在这个例子中，每当一个 User 文档被保存后，控制台就会输出一个消息，指出文档已经被保存。

    ::: info 注意事项：
        后置中间件不接收 next 参数，因为它们是在操作完成后执行的。但是，如果你使用的是传统的回调方式，你仍然可以调用 next() 来传递错误。
        在后置中间件中，你不能再修改文档并保存它，因为操作已经完成了。
        如果你在后置中间件中使用异步函数，确保处理了所有的异常，否则可能会导致未捕获的 Promise 异常。
        后置中间件的行为可能会根据它们挂钩的操作而有所不同，例如，find 类型的操作传递给中间件的是查询结果数组，而不是单个文档。
    :::

## 实用工具
  - Model.populate(): 填充文档中的引用字段。
    填充可以在查询时作为一个选项进行，也可以在查询之后对查询结果进行。Model.populate() 方法允许你在查询之后对已有的文档或文档数组进行填充。

    ```js
      Model.populate(docs, options, [callback])
        docs: 要填充的文档或文档数组。
        options: 填充选项，可以是一个字符串、对象或者它们的数组。如果是字符串，它是要填充的路径名。如果是对象，它可以包含路径名、选择、模型等选项。
        callback: （可选）一个回调函数，形式为 function(err, populatedDocs)。

        - eq: 
          // 假设我们有一个 User 模型，它引用了 Post 模型中的文档：
          const userSchema = new mongoose.Schema({
            name: String,
            posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
          });
          const User = mongoose.model('User', userSchema);

          // 现在，我们想要填充一个用户的 posts 字段：
          User.findById(userId).exec((err, user) => {
            if (err) throw err;
            User.populate(user, { path: 'posts' }, (err, populatedUser) => {
              if (err) throw err;
              console.log(populatedUser); // `posts` 现在被填充了
            });
          });
        或者
          User.findById(userId)
            .then(user => User.populate(user, { path: 'posts' }))
            .then(populatedUser => {
              console.log(populatedUser); // `posts` 现在被填充了
            })
            .catch(err => {
              console.error(err);
            });

          async function getPopulatedUser(userId) {
            try {
              let user = await User.findById(userId);
              user = await User.populate(user, { path: 'posts' });
              console.log(user); // `posts` 现在被填充了
            } catch (err) {
              console.error(err);
            }
          }

          getPopulatedUser(userId);

        - 注意事项：
          填充不会改变数据库中的数据，它只是在查询结果中临时替换引用。
          填充操作可能会对性能有影响，因为它需要额外的查询来获取被引用的文档。
          你可以填充嵌套路径，如果引用链很长，可以连续填充。
          填充的路径必须在模型的 schema 中定义了引用（ref），否则 Mongoose 不知道要填充哪个模型的文档。
    ```
  - Model.lean(): 返回纯 JavaScript 对象而不是 Mongoose 文档对象。
    使用 lean 可以提高性能，因为它避免了构建完整的 Mongoose 文档实例的开销。这在你只需要读取数据而不需要进行任何文档级别的操作时非常有用。
    ```js
      Model.find().lean().exec((err, docs) => {
        // `docs` 是普通的 JavaScript 对象数组，而不是 Mongoose 文档数组
      });

      - eq:
        async function findLeanDocuments() {
          try {
            const docs = await Model.find().lean();
            // `docs` 是普通的 JavaScript 对象数组
          } catch (err) {
            console.error(err);
          }
        }

        User.find({ active: true }).lean().exec((err, users) => {
          if (err) {
            console.error(err);
          } else {
            // `users` 是普通的 JavaScript 对象数组
            // 你可以直接访问它们的属性，但是不能调用例如 `save` 这样的 Mongoose 方法
            console.log(users[0].name); // 输出第一个用户的名字
          }
        });
        > 在这个例子中，users 是一个包含普通 JavaScript 对象的数组，这些对象代表数据库中的用户。由于使用了 lean，这些对象不具备 Mongoose 文档的方法和虚拟属性。

        - 注意事项
          使用 lean 方法时，返回的对象不包含 Mongoose 文档的方法，如 .save(), .remove(), .populate() 等。
          你也不能使用虚拟属性或应用于 Mongoose 文档的任何中间件（如 pre 和 post 钩子）。
          如果你需要对查询结果进行修改并保存到数据库，你需要先将其转换回 Mongoose 文档，或者使用其他方法更新数据库。
    ```

  - Model.validate(): 验证一个文档。
    每个 Mongoose 文档都有一个 validate() 方法，它可以用来异步验证文档。这个方法执行定义在模型 schema 中的所有验证规则，并在验证完成后调用回调函数。
    ```js
      const doc = new Model({ /* ... properties ... */ });

      doc.validate(function(err) {
        if (err) {
          // 验证失败，`err` 包含了错误信息
        } else {
          // 验证成功
        }
      });

      - eq:
        const doc = new Model({ /* ... properties ... */ });

        try {
          await doc.validate();
          // 验证成功
        } catch (err) {
          // 验证失败，`err` 包含了错误信息
        }
      
        const userSchema = new mongoose.Schema({
          email: { type: String, required: true },
          name: String
        });

        const User = mongoose.model('User', userSchema);

        const user = new User({ name: 'John Doe' }); // 没有提供 email

        user.validate(err => {
          if (err) {
            console.error(err); // 这里会打印出一个错误，因为 `email` 是必需的
          } else {
            // 用户信息通过验证
          }
        });
        > 在这个例子中，由于没有提供 email 字段，validate() 方法将会失败，并在回调函数中提供一个错误对象。
        - 注意事项
          validate() 方法不会保存文档到数据库。它只是执行验证。如果你想要保存文档并执行验证，你应该使用 save() 方法，因为 save() 在保存之前会自动调用 validate()。
          如果你的验证逻辑非常复杂或者需要执行异步操作，你可以在 schema 定义中使用自定义验证器。
          验证错误对象 err 是一个 ValidationError 实例，它包含了一个 errors 属性，该属性是一个对象，键是导致验证失败的路径，值是具体的验证错误。
    ```


## 虚拟属性和实例方法
  - schema.virtual(): 定义虚拟属性。
    方法用于定义一个虚拟属性。虚拟属性是文档的属性，它们不会被持久化到MongoDB。虚拟属性的值是通过一些业务逻辑计算得出的，这些逻辑定义在 getter 和 setter 函数中。
    虚拟属性在你需要对文档的某些字段进行格式化或组合时非常有用，但又不希望将这些格式化或组合的结果保存到数据库中。


    ```js
      // 定义 schema
      const personSchema = new mongoose.Schema({
        firstName: String,
        lastName: String
      });

      // 定义一个虚拟属性 `fullName`
      personSchema.virtual('fullName').get(function() {
        return `${this.firstName} ${this.lastName}`;
      }).set(function(name) {
        const split = name.split(' ');
        this.firstName = split[0];
        this.lastName = split[1];
      });

      // 创建模型
      const Person = mongoose.model('Person', personSchema);

      // 使用虚拟属性
      const person = new Person({
        firstName: 'John',
        lastName: 'Doe'
      });

      console.log(person.fullName); // 输出 'John Doe'

      person.fullName = 'Jane Smith';
      console.log(person.firstName); // 输出 'Jane'
      console.log(person.lastName); // 输出 'Smith'
   

    ```
       > 在这个例子中，fullName 是一个虚拟属性，它不会被保存到数据库中。当你读取 fullName 时，它会返回 firstName 和 lastName 的组合。当你设置 fullName 时，它会将传入的字符串拆分，并分别设置 firstName 和 lastName。

      ::: info 注意事项
        虚拟属性默认不包含在 toJSON 和 toObject 方法的输出中。如果你想在这些方法的输出中包含虚拟属性，你需要在 schema 选项中设置 { toJSON: { virtuals: true }, toObject: { virtuals: true } }。
        虚拟属性不会被 Mongoose 的 save 方法保存到 MongoDB，因为它们不是 schema 的一部分。
        虚拟属性通常用于计算值或者定义反向关系，例如，使用 ref 选项定义一个虚拟属性来引用其他集合中的文档。
        当你使用虚拟属性的 setter 函数时，你应该注意不要在 setter 内部直接或间接地调用它自己，否则会导致无限循环。
      :::

  - schema.method(): 定义实例方法。
    方法用于向模型的实例添加方法。这些方法被称为实例方法，它们会被添加到模型的每个实例上，因此可以在任何实例上调用。这允许你为文档添加自定义行为或封装业务逻辑。


    ```js
      // 定义 schema
      const schema = new mongoose.Schema({
        // ... 定义字段 ...
      });

      // 添加一个实例方法
      schema.method('methodName', function() {
        // 'this' 指向模型的实例
        // ... 在这里实现方法的逻辑 ...
      });

      // 创建模型
      const Model = mongoose.model('Model', schema);

      // 创建文档实例
      const instance = new Model();

      // 调用实例方法
      instance.methodName();

      > // 假设我们有一个用户模型，我们想要添加一个实例方法来验证用户的密码：
      const bcrypt = require('bcrypt');

      const userSchema = new mongoose.Schema({
        username: String,
        passwordHash: String
      });

      // 添加一个实例方法来验证密码
      userSchema.method('verifyPassword', function(password, callback) {
        bcrypt.compare(password, this.passwordHash, callback);
      });

      const User = mongoose.model('User', userSchema);

      // 创建一个用户实例
      const user = new User({
        username: 'johndoe',
        passwordHash: bcrypt.hashSync('myPassword', 10)
      });

      // 使用实例方法
      user.verifyPassword('myPassword', (err, isMatch) => {
        if (err) {
          console.error(err);
        } else if (isMatch) {
          console.log('Password is correct!');
        } else {
          console.log('Password is incorrect.');
        }
      });
    ```
    > 在这个例子中，verifyPassword 方法被添加到 userSchema 的每个实例上。这个方法接受一个密码和一个回调函数，使用 bcrypt 来比较提供的密码和存储的密码哈希。

    ::: info 注意事项
      实例方法中的 this 关键字指向调用该方法的文档实例。
      实例方法对于封装与文档相关的行为非常有用，例如验证、转换或计算。
      实例方法应该在调用 mongoose.model() 创建模型之前添加到 schema 上。
      实例方法不会直接影响数据库中的数据，除非你在方法内部执行了数据库操作（例如，调用了 save() 方法）。
    :::
## 静态方法
  - schema.statics(): 定义模型的静态方法。
    静态方法是直接附加在模型构造函数上的方法，而不是在模型实例上。这意味着你可以在不创建模型实例的情况下调用这些方法。静态方法通常用于执行与整个模型相关的操作，而不是与单个文档实例相关的操作。

    ```js
      // 定义 schema
      const schema = new mongoose.Schema({
        // ... 定义字段 ...
      });

      // 添加一个静态方法
      schema.statics.staticMethodName = function() {
        // 'this' 指向模型
        // ... 在这里实现方法的逻辑 ...
      };

      // 或者使用函数表达式
      schema.statics.staticMethodName = function staticMethodName() {
        // 'this' 指向模型
        // ... 在这里实现方法的逻辑 ...
      };

      // 创建模型
      const Model = mongoose.model('Model', schema);

      // 调用静态方法
      Model.staticMethodName();

      // 假设我们有一个用户模型，我们想要添加一个静态方法来查找所有活跃的用户：
      const userSchema = new mongoose.Schema({
        username: String,
        isActive: Boolean
      });

      // 添加一个静态方法来查找所有活跃的用户
      userSchema.statics.findActive = function(callback) {
        return this.find({ isActive: true }, callback);
      };

      const User = mongoose.model('User', userSchema);

      // 使用静态方法
      User.findActive((err, activeUsers) => {
        if (err) {
          console.error(err);
        } else {
          console.log(activeUsers); // 输出所有活跃的用户
        }
      });
    
    ```
    > 在这个例子中，findActive 是一个静态方法，它在 User 模型上调用 find 方法来获取所有 isActive 为 true 的用户。

    ::: info 注意事项
      静态方法中的 this 关键字指向模型本身，而不是模型的实例。
      静态方法可以用来创建查询辅助函数或封装复杂的逻辑。
      静态方法应该在调用 mongoose.model() 创建模型之前添加到 schema 上。
      静态方法可以和查询构建器链式调用，返回值通常是 Query 对象，除非方法内部有返回其他值的逻辑。
    :::

## 插件
  - schema.plugin(): 向模式添加插件。
    插件是一个函数，它为 schema 提供了预先打包的重用机制，可以用来扩展 schema 的功能，添加自定义行为，或者预定义 schema 的选项。插件可以是添加自定义方法、静态方法、虚拟属性、中间件（pre/post 钩子）等。

    ```js
      // 定义一个插件函数
      function myPlugin(schema, options) {
        // 使用 schema 添加方法、静态方法、中间件等
        schema.methods.someMethod = function() {
          // 实现方法逻辑
        };

        // 你也可以根据传入的 options 来配置插件
      }

      // 定义 schema
      const mySchema = new mongoose.Schema({
        // ... 定义字段 ...
      });

      // 应用插件到 schema，可以传递选项
      mySchema.plugin(myPlugin, { someOption: true });

      // 创建模型
      const MyModel = mongoose.model('MyModel', mySchema);

      // 现在模型的实例将具有插件添加的方法
      const instance = new MyModel();
      instance.someMethod();
      // 假设我们有一个简单的插件，它为每个文档添加了一个 createdAt 字段，并在保存文档之前设置当前时间：
      function timestampPlugin(schema) {
        // 添加一个新的字段
        schema.add({ createdAt: Date });

        // 添加一个 pre 保存中间件
        schema.pre('save', function(next) {
          if (!this.createdAt) {
            this.createdAt = new Date();
          }
          next();
        });
      }

      // 定义 schema
      const mySchema = new mongoose.Schema({
        name: String
      });

      // 应用插件
      mySchema.plugin(timestampPlugin);

      // 创建模型
      const MyModel = mongoose.model('MyModel', mySchema);

      // 创建一个新的文档实例
      const instance = new MyModel({ name: 'John Doe' });

      // 当保存实例时，`createdAt` 字段将被设置为当前时间
      instance.save(err => {
        if (err) console.error(err);
        else console.log(instance.createdAt); // 输出创建时间
      });
     
    ```
     > 在这个例子中，timestampPlugin 插件为 schema 添加了一个 createdAt 字段，并且在每个文档第一次保存到数据库之前，自动设置这个字段的值为当前时间。
    ::: info 注意事项
    
      插件应该在创建模型之前应用到 schema 上。
      一些常见的插件提供了如全文搜索、分页、软删除等功能。
      插件可以接受选项，这允许你在应用插件时配置它的行为。
      你可以使用第三方插件，也可以创建自己的插件来复用常见的 schema 设置或行为。
    :::

  