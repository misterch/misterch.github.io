---
title: mysql单表查询
date: 2023-10-31
categories:
 - mysql
---

```mysql
select ...
from ...
where ...
order by ...
limit
```

## select

### *

查询users表中**所有字段**的所有数据

```mysql
select * from empoloyee;
```

### 别名

查询users表中**指定字段**的所有数据

```mysql
select `name`,age from empoloyee;
```

给查询的字段起别名

可以使用as也可以不用

```mysql
select `name` as 名字,age 年龄 from empoloyee;
```

### case子句

形式：`case 字段 when 条件 then 新的查询值 else 新的查询值 end 别名`

或者：`case when 字段+条件 then 新的查询值 else 新的查询值 end 别名`

根据某个字段中的**值**查询出新的一列

例如 gender中，1表示男，0表示女

```mysql
select `name`,
case gender
when 1 then '男'
else '女'
end genderText
from empoloyee
```

把薪水按照高中低输出

```mysql
select `name`,
case
when salary >= 10000 then '高'
when salary >= 5000 then '中'
else '低'
end `level`
from empoloyee
```

### distinct

去重

distinct要写在最前面

查询所有员工的所在位置

```mysql
select distinct location from employee;
```

## where

### 比较运算

#### \>、<、\>=、<=、=

### 逻辑运算

#### between...and... 

在一个范围之间，包含10000和12000，[10000,12000]

```mysql
select * from employee
where salary between 10000 and 12000;
```

#### and

在一个范围之间(10000,12000)

```mysql
select * from employee
where salary>10000 and salary<12000;
```

#### or

```mysql
select * from employee
where age>18 or salary>10000
```

#### not

```mysql
select * from employee
where not age>18 or salary>10000
```

### 范围查询

#### in（选定的值）

查询20和30岁的员工

```mysql
select `name`,age from empoloyee
where age in(20,30);
```

#### not in()

### 空判断

通常用来比较null，null不能用`=`来做比较

#### is

查询没有地址信息的员工

```mysql
select * from employee
where location is null;
```

#### is not

```mysql
select * from employee
where location is not null;
```

### 模糊查询

语法：`where 字段 like 查询的字符串`

#### %替换任意个

#### _替换一个

```mysql
-- 查询以陈开头的名字
select `name` from employee
where `name` like "陈%"

-- 查询名字含有志的名字
select `name` from employee
where `name` like "%志%"

-- 查询姓陈，且只有两个字的名字
select `name` from employee
where `name` like "陈_"
```

## order by

语法：`order by 字段 desc`

### 从小到大

```mysql
select `name`,age from employee
order by age asc
```

### 从大到小

```mysql
select `name`,age from employee
order by age desc
```

### 根据多个字段排序

当一个字段相等，则根据下一个字段比较排序

多个字段排序以`,`隔开

```mysql
select `name`,age,height from employee
order by age desc,height desc;
```

## limit

分页查询

语法：`limit start,count`

start：从第几条开始，包括start

count：取出多少条记录

分页公式：每页的数量*(显示第几页-1)

```mysql
-- 第一页
select * from employee
limit 0,5;
-- 第二页
select * from employee
limit 5,5;
-- 第三页
select * from employee
limit 10,5;
```



## 执行顺序

**from > where > select>order by>limit**