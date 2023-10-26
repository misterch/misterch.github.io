---
title: 找出目录下所有文件
date: 2023-10-26
categories:
 - node
tags:
 - 递归
 - 文件IO
---
需求：要求不论是文件还是目录，都要是File对象，该对象有以下属性和方法；通过File对象可以方便地获取文件的相关信息
属性：
 - filename 目录或文件的完整路径
 - name 目录或者文件名称
 - ext 文件后缀名
 - size 文件大小
 - isFile 是否是文件
 - createTime 创建时间
 - updateTime 最后更改时间
 
方法：
 - getFile 【静态方法】给出一个路径，创建File对象
 - getContent 获取文件的内容
 - getChildren 获取目录下所有的文件和目录
 - getAllFiles 获取指定目录下所有文件（包括子目录）
## 创建一个File对象
```js
class File {
  constructor(filename,name,ext,size,isFile,createTime,updateTime){
    this.filename = filename
    this.name = name
    this.ext = ext
    this.size = size
    this.isFile = isFile
    this.createTime = createTime
    this.updateTime = updateTime
  }
}
```

## 创建File对象（File的静态方法）
该方法是File的静态方法，通过给出的路径，创建并返回File对象
```js
class File {
  //...
  static async getFile(filepath){
    const fullpath = path.resolve(__dirname, filepath)
    const stat = await fs.promises.stat(fullpath)
    const name = path.basename(filepath)
    const ext = path.extname(filepath)
    const isFile = stat.isFile()
    return new File(fullpath,name,ext,stat.size,isFile,stat.birthtime,stat.mtime)
  }
}
```

## 获取文件内容
```js
class File {
  async getContent(isBuffer = false) {
    if(this.isFile){
      if(isBuffer){
        return await fs.promises.readFile(this.filename)
      }else{
        return await fs.promises.readFile(this.filename, 'utf8')
      }
    }
    return null
  }
}
```

## 获取目录下所有的文件和目录
```js
class File {
  async getChildren(){
    if(!this.isFile){
      let child = await fs.promises.readdir(this.filename)
      child = child.map(i=>File.getFile(path.resolve(this.filename, i)))
      return Promise.all(child)
    }
    return []
  }
}
```

## 获取指定目录下所有文件（包括子目录）
```js
class File {
  async getAllFiles() {
    return await findAllChild(this.filename)
    async function findAllChild(absolutePath){
      const files = await fs.promises.readdir(absolutePath)
      let dirList = []
      for(let file of files){
        const childPath = path.resolve(absolutePath,file)
        const stat = await fs.promises.stat(childPath)
        const name = path.basename(childPath)
        if(stat.isDirectory()){
          const childDirList = await findAllChild(childPath)
          dirList.push({
            folderName: name,
            list: childDirList
          })
        }else{
          const file = await File.getFile(childPath)
          dirList.push(file)
        }
      }
      return dirList
    }
  }
}
```

## 完整
```js
const fs = require("fs");
const path = require("path");
class File {
  constructor(filename,name,ext,size,isFile,createTime,updateTime){
    this.filename = filename
    this.name = name
    this.ext = ext
    this.size = size
    this.isFile = isFile
    this.createTime = createTime
    this.updateTime = updateTime
  }
  static async getFile(filepath){
    const fullpath = path.resolve(__dirname, filepath)
    const stat = await fs.promises.stat(fullpath)
    const name = path.basename(filepath)
    const ext = path.extname(filepath)
    const isFile = stat.isFile()
    return new File(fullpath,name,ext,stat.size,isFile,stat.birthtime,stat.mtime)
  }

  async getContent(isBuffer = false) {
    if(this.isFile){
      if(isBuffer){
        return await fs.promises.readFile(this.filename)
      }else{
        return await fs.promises.readFile(this.filename, 'utf8')
      }
    }
    return null
  }

  async getChildren(){
    if(!this.isFile){
      let child = await fs.promises.readdir(this.filename)
      child = child.map(i=>File.getFile(path.resolve(this.filename, i)))
      return Promise.all(child)
    }
    return []
  }

  async getAllFiles() {
    return await findAllChild(this.filename)
    async function findAllChild(absolutePath){
      const files = await fs.promises.readdir(absolutePath)
      let dirList = []
      for(let file of files){
        const childPath = path.resolve(absolutePath,file)
        const stat = await fs.promises.stat(childPath)
        const name = path.basename(childPath)
        if(stat.isDirectory()){
          const childDirList = await findAllChild(childPath)
          dirList.push({
            folderName: name,
            list: childDirList
          })
        }else{
          const file = await File.getFile(childPath)
          dirList.push(file)
        }
      }
      return dirList
    }
  }
}
async function test(){
  console.time('log')
  const f = await File.getFile('./blogs')
  const r = await f.getAllFiles()
  await fs.promises.writeFile('./directory.json',JSON.stringify(r),{
    encoding: 'utf8',
  })
  console.timeEnd('log')
}
test()
```