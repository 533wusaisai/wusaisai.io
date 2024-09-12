# Git
Git 是一个复杂的分布式版本控制系统，它有很多命令和选项。下面是一些最常用的 Git 操作和命令的概览：

  ## 0. 设置和配置
  ```js
    git config：配置 Git 环境（用户名、邮箱、编辑器等）。
    git config --global user.name "Your Name"：设置全局用户名。
    git config --global user.email "your_email@example.com"：设置全局邮箱。
  ```

  ## 1. 拉取远程仓库代码
  ```js
   // 创建和克隆仓库
  git init：在当前目录初始化一个新的 Git 仓库。
  git clone <url>：克隆一个远程仓库到本地。

  ```

  ## 2. 基本快照制作
  ``` js
    git status：查看当前工作目录的状态。
    git add <file>：将文件添加到暂存区。
    git commit -m "commit message"：将暂存区的内容提交到仓库。
    git rm <file>：删除文件并将这个删除操作添加到暂存区。
    git mv <old-name> <new-name>：移动或重命名一个文件、目录。
  ```

  ## 3. 分支 查询/合并/删除/切换 
  ```js
    git branch：列出、创建或删除分支。
    git branch <branch-name>：创建新分支。
    git branch -d/--delete <branch-name>：删除本地分支。
    git branch -D <branch-name> 分支未合并 强制删除 --delete --force 简写。
    git push origin --delete <branch-name> 删除远程分支。
    git checkout <branch-name>：切换到指定分支。
    git checkout -b <branch-name>：创建并切换到新分支。
    git merge <branch>：将指定分支的历史合并到当前分支。
  ```

  ## 4. 查看提交历史
  ```js
    git log：显示提交历史。
    git log --oneline：简洁的提交历史。
    git log --graph：以图表形式查看分支合并历史。
  ```

  ## 5. 撤销操作
  ```js
    git revert <commit>：创建一个新提交，它撤销指定提交的所有更改。
    git reset：重置当前 HEAD 到指定状态。
    git reset --hard <commit>：重置工作目录和暂存区到指定提交，丢弃所有更改。
    git reset --soft <commit>：仅重置 HEAD 到指定提交，保留更改为暂存状态。
    git clean：删除未跟踪的文件。

  ```
  ## 6. 远程操作
  ```js
    git fetch <remote>： // 从远程仓库下载新分支和数据。
    git pull <remote> <branch>： // 从远程仓库提取数据并尝试合并到当前分支。
    git push <remote> <branch>： // 将本地分支的更新推送到远程仓库。
    git push --force <remote> <branch>： //强制推送到远程仓库，慎用！

  ```

  ## 7. 标签
  ```js
    git tag：列出、创建、删除或验证一个 GPG 签名的标签。
    git tag <tagname>：创建一个标签。
    git tag -d <tagname>：删除一个标签。
  ```

  ## 8. 高级合并
  ```js
    git rebase：将一个分支的修改重新应用到另一个分支上。
    git cherry-pick <commit>：选择一个提交，将其作为一个新的提交引入到当前分支。
  ```

  ## 9. 暂存修改
  ```javascript
    git stash：暂时存储修改，清理工作目录。
    git stash apply：应用存储的修改
  ```

  ## 10. 查看更改
  ```javascript
  git diff：显示工作目录和暂存区的差异。
  git diff --staged：显示暂存区和最后一次提交的差异。
  ```


