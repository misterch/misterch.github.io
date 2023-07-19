---
title: 深度拷贝
date: 2023-07-19
categories:
 - 工具函数
tags:
 - utils
 - 深度拷贝
---
[参考链接](https://chen-cong.blog.csdn.net/article/details/114918262?spm=1001.2014.3001.5502)

## 完美的深拷贝，实现了以下拷贝

1.  基本类型数据拷贝
2.  键和值都是基本类型的普通对象拷贝
3.  Symbol作为对象的key拷贝
4.  Date和RegExp对象类型拷贝
5.  Map和Set对象类型拷贝
6.  Function对象类型拷贝（函数我们一般不用深拷贝）
7.  对象的原型拷贝
8.  不可枚举属性拷贝
9.  循环引用拷贝

## 数据类型

| 数据类型         |                                                    |                                                                             |
| :----------- | :------------------------------------------------- | :-------------------------------------------------------------------------- |
| 基础数据类型       | String、Number、Boolean、Null、undefined、Symbol、BigInt | 拷贝的是值，相互独立，互不影响                                                             |
| 引用数据类型（对象类型） | Array、RegExp、Date、Math、Function                    | 拷贝的是对象的引用，即对象所在的内存地址，指向对象的指针；多个变量指向同一个对象，只要其中一个变量对这个对象进行修改，其他变量所指向的对象也会跟着修改 |

测试对象，含有所有数据类型

```javascript
// 测试的obj对象
const obj = {
    // =========== 1.基础数据类型 ===========
    num: 0, // number
    str: '', // string
    bool: true, // boolean
    unf: undefined, // undefined
    nul: null, // null
    sym: Symbol('sym'), // symbol
    bign: BigInt(1n), // bigint

    // =========== 2.Object类型 ===========
    // 普通对象
    obj: {
        name: '我是一个对象',
        id: 1
    },
    // 数组
    arr: [0, 1, 2],
    // 函数
    func: function () {
        console.log('我是一个函数')
    },
    // 日期
    date: new Date(0),
    // 正则
    reg: new RegExp('/我是一个正则/ig'),
    // Map
    map: new Map().set('mapKey', 1),
    // Set
    set: new Set().add('set'),
    // =========== 3.其他 ===========
    [Symbol('1')]: 1  // Symbol作为key
};

// 4.添加不可枚举属性
Object.defineProperty(obj, 'innumerable', {
    enumerable: false,
    value: '不可枚举属性'
});

// 5.设置原型对象
Object.setPrototypeOf(obj, {
    proto: 'proto'
})

// 6.设置loop成循环引用的属性
obj.loop = obj
```

## 浅拷贝

创建一个新对象，来接收要重新复制或引用的对象值。对于对象属性是基本数据类型的，复制的就是基本数据类型的值给新对象；对于对象属性是引用数据类型的，复制的就是内存中的地址；如果一个对象改变了内存中的地址所指向的对象，也会影响另一个对象

### 实现浅拷贝的方法

| 方法                           | 使用方式                                                                 | 注意事项                                          |
| :--------------------------- | :------------------------------------------------------------------- | :-------------------------------------------- |
| Object.assign()              | Object.assign(target,...source)将所有**可枚举**属性的值从一个或多个原对象分配到目标对象，返回目标对象 | 1、不拷贝对象的继承属性；2、不拷贝对象的不可枚举的属性；3、可拷贝Symbol类型的属性 |
| 展开语法{...obj}                 | let objClone = {...obj}                                              | 和Object.assign()差不多；如果属性都是基本数据类型的值，使用这个会方便很多  |
| Array.prototype.concat()拷贝数组 | const newArr = arr.concat(arr1\[,arr2])                              | 浅拷贝，基本数据类型值的数组                                |
| Array.prototype.slice()拷贝数组  | arr.slice(\[begin\[,end]])                                           | 浅拷贝，基本数据类型值的数组                                |

### 浅拷贝的实现

```javascript
function shallowClone(target) {
    if (typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = target[prop];
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}


// 测试
const shallowCloneObj = shallowClone(obj)

shallowCloneObj === obj  // false，返回的是一个新对象
shallowCloneObj.arr === obj.arr  // true，对于对象类型只拷贝了引用
```

使用**for...in**循环遍历对象属性赋值给目标对象的属性，**除Symbol以外**的可枚举属性，**包含原型上的属性**

## 深拷贝

创建一个新对象，将一个对象从内存中完整拷贝出来一份给新对象，并从对内存中开辟一个全新的空间存放新对象，新对象的修改不会改变原对象

### JSON.stringify()

```javascript
function deepClone(target) {
    if (typeof target === 'object' && target !== null) {
        return JSON.parse(JSON.stringify(target));
    } else {
        return target;
    }
}

// 开头的测试obj存在BigInt类型、循环引用，JSON.stringfy()执行会报错，所以除去这两个条件进行测试
const clonedObj = deepClone(obj)

// 测试
clonedObj === obj  // false，返回的是一个新对象
clonedObj.arr === obj.arr  // false，说明拷贝的不是引用
```

#### 存在的问题

1.  执行会报错：存在`BigInt`类型、循环引用。
2.  拷贝`Date`引用类型会变成字符串。
3.  键值会消失：对象的值中为`Function`、`Undefined`、`Symbol` 这几种类型，。
4.  键值变成空对象：对象的值中为`Map`、`Set`、`RegExp`这几种类型。
5.  无法拷贝：不可枚举属性、对象的原型链。
6.  补充：其他更详细的内容请查看官方文档：[JSON.stringify()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

#### 适用范围

拷贝一些普通的对象

### 递归

1.  对于基础类型，我们只需要简单地赋值即可（使用`=`）。
2.  对于引用类型，我们需要创建新的对象，并通过遍历键来赋值对应的值，这个过程中如果遇到 Object 类型还需要再次进行遍历。

```javascript
function deepClone(target) {
    if (typeof target === 'object' && target) {
        let cloneObj = {}
        for (const key in target) { // 遍历
            const val = target[key]
            if (typeof val === 'object' && val) {
                cloneObj[key] = deepClone(val) // 是对象就再次调用该函数递归
            } else {
                cloneObj[key] = val // 基本类型的话直接复制值
            }
        }
        return cloneObj
    } else {
        return target;
    }
}

// 开头的测试obj存在循环引用，除去这个条件进行测试
const clonedObj = deepClone(obj)

// 测试
clonedObj === obj  // false，返回的是一个新对象
clonedObj.arr === obj.arr  // false，说明拷贝的不是引用
```

#### 存在的问题
1.  不能处理循环引用。
2.  只考虑了`Object`对象，而`Array`对象、`Date`对象、`RegExp`对象、`Map`对象、`Set`对象都变成了`Object`对象，且值也不正确。
3.  丢失了属性名为`Symbol`类型的属性。
4.  丢失了不可枚举的属性。
5.  原型上的属性也被添加到拷贝的对象中了。

**如果存在循环引用的话，以下代码会导致无限递归，从而使得堆栈溢出**

```javascript
const a = {}
const b = {}
a.b = b
b.a = a
deepClone(a)
```

避免循环引用，使用WeakMap对象，键是弱引用，且必须是对象

## 完美的深拷贝

改进以上深拷贝的问题

| 存在的问题                   | 改进方案                                                                                                            |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------- |
| 不能处理循环引用                | 使用WeakMap                                                                                                       |
| 只考虑了Object对象            | 当参数为Date、RegExp、Math、Function、Map、Set，直接生成新的实例返回                                                                |
| 属性名为Symbol的属性，丢失不可枚举的属性 | 对于Symbol和不可枚举的属性，使用Reflect.ownKeys()，相当于\[...Object.getPropertyNames(obj),...Object.getOwnPropertySymbols(obj)] |
| 原型上的属性                  | Obejct.getOwnPropertyDescribtors()设置属性描述对象；Object.create()方式继承原型链                                               |

```javascript
function deepClone(target) {
    // WeakMap作为记录对象Hash表（用于防止循环引用）
    const map = new WeakMap()

    // 判断是否为object类型的辅助函数，减少重复代码
    function isObject(target) {
        return (typeof target === 'object' && target ) || typeof target === 'function'
    }

    function clone(data) {

        // 基础类型直接返回值
        if (!isObject(data)) {
            return data
        }

        // 日期或者正则对象则直接构造一个新的对象返回
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data)
        }

        // 处理函数对象
        if (typeof data === 'function') {
            return new Function('return ' + data.toString())()
        }

        // 如果该对象已存在，则直接返回该对象
        const exist = map.get(data)
        if (exist) {
            return exist
        }

        // 处理Map对象
        if (data instanceof Map) {
            const result = new Map()
            map.set(data, result)
            data.forEach((val, key) => {
                // 注意：map中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.set(key, clone(val))
                } else {
                    result.set(key, val)
                }
            })
            return result
        }

        // 处理Set对象
        if (data instanceof Set) {
            const result = new Set()
            map.set(data, result)
            data.forEach(val => {
                // 注意：set中的值为object的话也得深拷贝
                if (isObject(val)) {
                    result.add(clone(val))
                } else {
                    result.add(val)
                }
            })
            return result
        }

        // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
        const keys = Reflect.ownKeys(data)
        // 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性以及对应的属性描述
        const allDesc = Object.getOwnPropertyDescriptors(data)
        // 结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链， 这里得到的result是对data的浅拷贝
        const result = Object.create(Object.getPrototypeOf(data), allDesc)

        // 新对象加入到map中，进行记录
        map.set(data, result)

        // Object.create()是浅拷贝，所以要判断并递归执行深拷贝
        keys.forEach(key => {
            const val = data[key]
            if (isObject(val)) {
                // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
                result[key] = clone(val)
            } else {
                result[key] = val
            }
        })
        return result
    }

    return clone(target)
}



// 测试
const clonedObj = deepClone(obj)
clonedObj === obj  // false，返回的是一个新对象
clonedObj.arr === obj.arr  // false，说明拷贝的不是引用
clonedObj.func === obj.func  // false，说明function也复制了一份
clonedObj.proto  // proto，可以取到原型的属性
```

### 说明

在遍历 `Object` 类型数据时，我们需要把 `Symbol` 类型的键名也考虑进来，所以不能通过 `Object.keys` 获取键名或 `for...in` 方式遍历，而是通过`Reflect.ownKeys()`获取所有自身的键名（`getOwnPropertyNames` 和 `getOwnPropertySymbols` 函数将键名组合成数组也行：`[...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]`），然后再遍历递归，最终实现拷贝。
