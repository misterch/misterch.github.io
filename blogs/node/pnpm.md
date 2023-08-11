---
title: nvm管理nodejs版本和设置pnpm为全局包管理器
date: 2023-08-11
catogories:
 - node
tags: 
 - npm
 - pnpm
---
## nvm

使用nvm来管理nodejs版本，可以根据需要切换nodejs的版本，每个版本的nodejs也有对应的npm包管理器。

使用npm安装全局的包会安装到指定版本nodejs所在目录。

npm安装的包默认安装在c盘，可以使用npm config set修改全局依赖包的安装位置

## 修改全局依赖位置

全局依赖的默认安装路径在C盘，为了不占用C盘空间，一般会修改安装位置

使用`npm config list --global`查看全局配置

修改步骤：

1. 在需要存放全局依赖的位置新建文件夹（node_global和node_cache）
2. 使用npm修改全局依赖位置

   ```bash
   npm config set prefix "e:\nodejs\node_global"
   npm config set cache "e:\nodejs\node_cache"
   ```
3. 修改环境变量

   ⚠️注意：如果不设置的话，当执行命令时会出现**不是内部命令**的错误

   在系统变量中新增 `NODE_PATH`，指向 `e:\nodejs\node_global`
4. 这样就完成了全局依赖安装的位置，可以安装全局依赖测试

   ```bash
   npm install pnpm -g
   ```

   查看发现pnpm已经安装在了 `e:\nodejs\node_global\node_modules`，并在node_global下创建了命令脚本

## 设置pnpm

刚刚使用npm安装了全局的pnpm包，所有在切换不同版本的node时，不会出现找不到pnpm而报不是内部命令的错误，但pnpm对node版本有一定要求，需要注意

global-bin-dir：允许设置全局安装包的 **bin 文件**的目标目录。

global-dir：指定储存全局依赖的目录，即pnpm全局node_modules所在位置

store-dir：所有包被保存在磁盘上的位置

state-dir：pnpm 创建的当前仅由更新检查器使用的 `pnpm-state.json` 文件的目录。

cache-dir：包元数据缓存的位置。

```
pnpm config set global-bin-dir "e:\nodejs\node_global"

pnpm config set global-dir "e:\nodejs\pnpm\pnpm-global"

pnpm config set cache-dir "e:\nodejs\pnpm\cache"

pnpm config set store-dir "e:\nodejs\pnpm\pnpm-store"

pnpm config set state-dir "e:\nodejs\pnpm"
```

设置后使用pnpm安装的全局依赖包将保存在 `e:\nodejs\pnpm\pnpm-global`中
