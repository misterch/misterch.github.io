---
title: 策略模式
date: 2023-11-10
categories:
 - 设计模式
---

## 定义

策略模式是指对一系列的算法定义，并将每一个算法封装起来，而且使他们还可以相互替换。策略模式让算法独立于使用他的客户而独立变化

通俗说法：使用一个对象管理一系列算法，算法可以根据用户的具体使用灵活变化

### 优点

策略模式提供了管理相关的算法族的办法，策略模式提供了可以替换继承关系的办法，使用策略模式可以避免使用多重条件转义语句

### 特点

- 策略模式支持在运行时选择算法，把它们一个个封装起来没并且使它们可以相互替换
- 决定用一个类对象实例来管理规则的校验
- 该对象可以相应地主动添加对规则的响应处理办法
- 校验数据的时候可以相应的返回相关信息

### 使用场景

当业务复杂度达到一定程度时，我们才选用设计模式去解决复杂问题。

扩展性，复用性，冗余度小的情况下没必要使用

- 表单验证

## 实现

通过策略模式实现通用表单验证的验证器

```js
function Validator(){
		this.cache = []
  	//保存错误提示的DOM，用来验证的时候重置
  	this.warnDom = []
}

Validator.prototype.strategies = {
  isNonEmpty: function(value,errorMsg){
    if(value==''){
      return errorMsg
    }
    return true
  },
  maxLength: function(value,length,errorMsg){
    if(value!=='' && value.length>length){
      return errorMsg
    }
    return true
  },
  minLength: function(value,length,errorMsg){
    if(value!=='' && value.length<length){
      return errorMsg
    }
    return true
  }
}

/*
* @param {element} validateDom 校验的元素
* @param {element} errorDom 错误消息显示的元素
* @param {Array} validate 校验规则[{strategy: '校验名称',errorMsg:'错误提示'}]
*/
Validator.prototype.add = function(validateDom,errorDom,validateArr){
  this.warnDom.push(errorDom)
  validateArr.forEach(rule=>{
    this.cache.push(()=>{
      //['isNonEmpty'] ['maxLength',4]
      const ruleInfo = rule.strategy.split(':')
      //[] [4]
      const ruleName = ruleInfo.shift()
      //[value] [value,4]
      ruleInfo.unshift(validateDom.value)
      //[value,errMsg] [value,4,errMsg]
      ruleInfo.push(rule.errorMsg)
      const msg = this.strategies[ruleName].apply(this,ruleInfo)
      if(msg!==true){
        errorDom.innerText = msg
      }
      return msg
    })
  })
}

// 验证所有add到数组中的表单数据，根据相对应的校验规则进行验证
// 所有通过了才返回true，否则为false
Validator.prototype.start = function(){
  let flag = true
  //将所有warnDom重置
  this.warnDom.forEach(dom=>{
    dom.innerText = ''
  })
  this.cache.forEach(validate=>{
    if(validate()!==true){
      flag = false
    }
  })
  return flag
}
//扩展Validator的校验方法
Validator.prototype.extend = function(config){
  for(let prop in config){
    this.strategies[prop] = config[prop]
  }
}

const validator = new Validator()
validator.extend({
  isEmail:function(value,errorMsg){
    if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(value)){
      return true
    }
    return errorMsg
  },
  isPhone:function(value,errorMsg){
    if(/^1\d{10}/.test(value)){
      return true
    }
    return errorMsg
  }
})
function submit(){
  validator.add(userDom,userErrDom,[{strategy:'isNonEmpty',errorMsg:'用户名不能为空'},{strategy:'maxLength:4',errorMsg:'用户名不能超过4位'}])
  validator.add(pswDom,pswErrDom,[{strategy:'isNonEmpty',errorMsg:'密码不能为空'},{strategy:'minLength:6',errorMsg:'密码不能少于6位'}])
  validator.add(emailDom,emailErrDom,[{strategy:'isNonEmpty',errorMsg:'邮箱不能为空'},{strategy:'isEmail',errorMsg:'邮箱格式错误'}])
  if(validator.start()){
    console.log('通过验证')
  }
}
```

