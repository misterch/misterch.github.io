---
title: 在前端项目中配置ESLint和Prettier规范代码
date: 2023-07-27
tags:
 - eslint
 - prettier
 - vscode
 - 插件
---
## ESLint
### ESLint作用
`ESLint`用来检查代码质量和风格的工具，检查代码中不符合规则的地方，部分问题支持自动修复
- 代码检查  
检查代码中存在的错误，如**未声明变量**、**声明但未使用变量**、**修改const变量**
- 代码格式化  
统一代码风格，如不加分号、字符串使用单引号、使用tab或者空格等

### 在vscode中开启ESLint检测和修复问题代码
1. vscode安装`eslint`插件
2. 在用户级别或者项目级别的`setting.json`中开启`eslint`
```js
{
  "eslint.enable": true
}
```
3. 在项目中安装`eslint`并初始化
```bash
# 安装eslint到开发依赖
npm i -D eslint
# 初始化eslint，在项目根目录创建.eslintrc文件
npx eslint --init
```
***目前只是开启了检查代码，没有自动修复有问题的代码***  
4. 开启vscode保存时修复问题代码
```js
{
  "editor.codeActionOnSave": {
    // 使用eslint来fix和格式化代码
    "source.fixAll.eslint": true,
    // 使用所有提供的格式化工具进行格式化
    //"source.fixAll": true
  }
}
```
## Prettier
### Prettier作用
Prettier可以对代码进行格式化，不会对代码进行潜在问题检查  
Prettier可对多种语言进行格式化，如`vue`,`react`,`html`,`css`,`scss`,`json`,`jsx`等

### 在vscode中启用Prettier
> 无需在项目中安装prettier，只需在vscode中安装并设置为默认格式化器或者在指定语言中设置默认格式化器

1. 在vscode中安装`prettier`插件
2. 在用户级别或者项目级别的`setting.json`中设置编辑器的默认格式化器
```js
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
指定语言设置默认格式化器
```js
{
  "[javascript]" {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
此时虽然启用了`prettier`，但保存文件时没有对文件进行格式化，仍需要一下操作
```js
{
  // 开启保存文件自动格式化代码
  "editor.formatOnSave": true,
  // 默认的代码格式化工具
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 开启后，要求根目录下的有.prettierrc或者.editorconfig文件，覆盖prettier扩展中的默认配置
  // 如果根目录下没有改配置文件，不会自动格式化
  "prettier.requireConfig": true // 需要Prettier的配置文件

  // 没有开启，则不要求，若根目录下有配置文件则以配置文件为准
  //"prettier.requireConfig": false
}
```
## ESLint和Prettier的冲突
### 原因
ESLint和Prettier都可以对代码进行格式化
- 两者重叠的格式化规则不一致
- vscode同时开启了两者的格式化
```JS
{
  // 保存时格式化代码
  "editor.formatOnSave": true,
  // 使用prettier格式化代码
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.requireConfig": true,
  "eslint.enable": true, // eslint开启
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true // 代码保存使用eslint格式化代码
    }
}
```
### 以和为贵，eslint和prettier和谐相处
`eslint`检测代码质量  
`prettier`对多种语言进行格式化

- 对于两者重叠的格式化规则，要保持规则一致
- 或者使用共同作用的语言中一种进行格式化

#### 对于两者重叠的格式化规则
>使用ESLint作为代码格式化工具，关闭可能与Prettier有冲突的格式化规则，把Prettier当做一个linter规则  
需要在项目中安装这些依赖包
- `eslint-config-prettier`  
此包包含了eslint规则，用于关闭eslint有关代码格式化的配置
- `eslint-plugin-prettier`  
将Prettier配置成一个eslint插件，让其当做一个linter规则来运行  
>eslint-plugin-prettier需要在项目中安装prettier依赖

在项目的`.eslintrc`配置文件中设置prettier插件
```js
{
  "extends":["plugin:prettier/recommended"]
}
```
`plugin:prettier/recommended`做了以下事情
```js
{
  "extends": ["prettier"], // 使用eslinst-config-prettier中的配置项
  "plugins": ["prettier"], // 注册该prettier插件
  "rules": {
    "prettier/prettier": "error", // 在eslint中运行prettier，并启用该插件提供的规则
    "arrow-body-style": "off", // 关闭规则
    "prefer-arrow-callback": "off" // 关闭规则
  }
}
```
这样配置好后，两者就能协同格式化代码，eslint进行格式化时会忽略跟prettier重叠的格式化规则，交由prettier来格式化

#### 使用共同作用的语言中一种进行格式化
1. 项目中开启保存时使用默认prettier格式化器格式化所有代码  
```js
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```
2. 针对部分语言代码（如js，ts，jsx）**关闭**使用prettier格式化来格式化
```js
{
  "[javascript]": { 
    "editor.formatOnSave": false 
  }
}
```
3. 开启eslint来格式化js,ts,jsx代码
```js
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true 
  }
}
```
因为在.eslintrc配置文件中已经配置使用prettier的格式化规则来linting代码，所以其实仍然使用的prettier来格式化代码，但也使用eslint来检查代码质量

## 完整的vscode配置

```js
{
  // 保存时对项目所有语言（除针对的语言外）的代码使用prettier格式化
  "editor.formatOnSave": true, 
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  //针对共用的语言如JS、TS和JSX关闭文件保存自动格式化功能，通过eslint来做这件事 
  "[javascript]": { 
    "editor.formatOnSave": false 
  }, 
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.formatOnSave": false
  },
  //使用eslint对代码进行检查和格式化
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true 
  }
}
```