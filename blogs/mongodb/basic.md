---
title: MongoDB基本操作
date: 2023-12-11
categories:
 - mongodb
---

## 常用命令

### 查看所有数据库

```js
show dbs;
```



### 显示当前使用的数据库

```js
db;
```



### 查看当前数据库状态

```js
db.stats()
```



### 查看数据库中所有的集合

```js
show collections;
```



### 切换数据库

```js
use <数据库名>
```

> 如果数据库不存在，仍然可以切换到该不存在的数据库，一旦向数据库中添加数据，就会自动生成改数据库

### 向集合中添加文档

```js
//添加一个文档数据
db.<collection>.insertOne({})

//添加多个文档数据
db.<collection>.insertMany([多个文档])
```

> 新的文档如果没有指定字段`_id`，则会自动添加一个字段`_id`作为主键
>
> 自动的主键是一个ObjectId对象，该对象是通过调用函数`ObjectId()`创建的
>
> 它的原理是根据`时间戳+机器码+进程ID+自增量`生成的一个十六进制的唯一字符串
>
> 使用`ObjectId()`	还可以把字符串还原成一个ObjectId对象

### 查询文档

```js
db.集合名.find(查询对象)
//查找item等于paper的文档
db.inventory.find({item:"paper"})
```

### 修改文档

```js
db.<collection>.updateOne(<filter>,<update>)
db.<collection>.updateMany(<filter>,<update>)
db.<collection>.replaceOne(<filter>,<update>)

db.inventory.updateOne(
  //筛选item等于paper的文档
	{item:'paper'},
  {
    //修改size对象的uom属性，修改status属性
    $set:{"size.uom":"cm", status:"p"},
    //最后修改时间
    $currentDate:{lastModified:true}
  }
)
```

### 删除文档

```js
db.<collection>.deleteMany(查询对象)
db.<collection>.deleteOne(查询对象)
```

