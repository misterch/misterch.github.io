---
title: 联表查询
date: 2023-10-31
categories:
 - mysql
---

## 笛卡尔积

比赛赛程

```mysql
select t1.name 主场,t2.name 客场
from team as t1,team as t2
where t1.id!=t2.id
```

皇马 曼联、 巴萨 曼联、 阿森纳 曼联、 尤文图斯 曼联

曼联 皇马、 巴萨 皇马 、阿森纳 皇马、 尤文图斯 皇马

皇马 巴萨、曼联 巴萨、阿森纳 巴萨、尤文图斯 巴萨

...

## 左连接

`表1 left join 表二 on`

以左表为基准匹配逐个匹配右表的记录

当左表（表1）有没有匹配上右表（表二）任一个记录，也会至少有一行

查询员工表和部门表，查询每个员工所属的部门

```mysql
select * from
department as d left join employee as e
on d.id=e.deptId;
```



## 右连接

`表1 right join 表2 on`

同左连接

## 内连接

`表1 inner join 表2 on`

必须满足条件才能出现在结果中

```mysql
select * from
department as d inner join employee as e
on d.id=e.deptId;
```

查询每个员工所属部门和所属公司

```mysql
select * from employee as e
inner join department as d on d.id=e.deptId
inner join company as c on c.id=d.company
```

