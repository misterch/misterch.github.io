---
title: mysql的函数和分组
date: 2023-10-31
categories:
 - mysql
---

## 内置函数

### 数学

ABS(x)返回x的绝对值

CEILING(x)返回大于x的最小整数值

FLOOR(x)返回小于x的最大整数值

MOD(x,y)返回x/y的模（余数）

PI()返回pi的值

RAND()返回0到1内的随机值

ROUND(x,y)返回x的四舍五入的有y位小数的值

TRUNCATE(x,y)返回数字x截断为y位小数的值

### 聚合

AVG(col)返回指定列的平均值

COUNT(col)返回指定列中非NULL值的个数

MIN(col)返回指定列的最小值

MAX(col)返回指定列的最大值

SUM(col)返回指定列的值的和

### 字符

CONCAT(s1,s2...sn)将s1,s2...sn连接成字符串

CONCAT_WS(sep,s1,s2...sn)将s1,s2...sn连接成字符串，并用sep字符间隔

TRIM(str)去除字符串首部和尾部的所有空格

LTRIM(str)从字符串str中切掉开头的空格

RTRIM(str)从字符串str中切掉尾部的空格

### 日期

CURDATE()或CURRENT_DATE()返回当前的日期

CURTIME或CURRENT_TIME()返回当前的时间

TIMESTAMPDIFF(part,date1,date2)返回date1到date2之间间隔part值，part是用于指定的相隔的年月日

part：`MICROSECEND` `SECEND` `MINUTE` `HOUR` `DAY` `WEEK` `MONTH` `QUARTER` `YEAR`

## 分组

### group by

语法：`group by 分组字段`

以什么字段分组就以什么字段作为第一列

查询员工分布的居住地，和每个居住地的人数

```mysql
select location,count(id) as 员工数量
from employee
group by location;
```

### having

对分组后的数据进行筛选

:::tip

`having`与`group by`连用，`having`后通常也要跟聚合函数

分组条件使用`having`

**聚合函数不能和where配合使用，可以和having配合来分组查询**

:::

查询员工数量大于等于40人的居住地及员工数量

```mysql
select location,count(id) as empnum
from employee
group by location
having empnum>=40;
```

### 分组的运行顺序

`from>join...on...>where>group by>select>having>order by>limit`