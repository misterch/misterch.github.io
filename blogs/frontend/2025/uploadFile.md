---
title: 裁剪上传原理
date: 2025-02-26
tags:
 - 上传
 - canvas
 - FileReader
 - 原理
---

> 1. 如何实现本地预览
> 2. 如何实现图像的部分上传

## 图片本地预览

`FileReader`：读取文件数据，使用`readAsDataURL()`就能读取数据生成一个`dataUrl`

```javascript
const inpFile = document.querySelector('input[type="file"]')
const img = document.querySelector('.preview')
const btn = document.querySelector('button')
inpFile.onchange = e=>{
  const file = e.target.files[0]
  const reader = new FileReader()
  //文件读取完毕，执行onload
  reader.onload = e => {
    img.src = e.target.result
    // 实现裁剪
  }
  // 异步读取文件
  reader.readAsDataURL(file)
}
```

## 裁剪图片

使用`canvas`的`drawImage`实现图片的裁剪，使用`toBlob`实现将canvas转换为**文件数据**

1. 原图中裁剪的位置，裁剪的起始位置（X、Y坐标）
2. 原图中的裁剪宽高，从X、Y位置开始裁剪，得到（X2 = X + Width）（Y2 = Y + Height）
3. 裁剪结果缩放后的尺寸

```javascript
btn.onclick = () => {
  const cutInfo = {
    x: 500,
    y: 500,
    cutW: 300,
    cutH: 300,
    w: 100,
    h: 100
  }
  const canvas = document.createElement('canvas')
  canvas.width = cutInfo.w
  canvas.height = cutInfo.h
  const ctx = canvas.getContext('2d')
  //使用drawImage把图片的部分裁剪出来画到canvas中，从canvas的0,0处开始画，画的宽高就是canvas画布的宽高
  ctx.drawImage(img,cutInfo.x,cutInfo.y,cutInfo.cutW,cutInfo.cutH,0,0,cutInfo.w,cutInfo.h)
  // 转换生成blob对象
  canvas.toBlob(blob=>{
    //将blob转换为file对象
    const file = new File([blob],'avatar.jpg',{
      type: 'image/jpeg'
    })
    // 得到一个file对象，就可以上传文件了
  },'image/jpeg')
  // 测试，把canvas显示到页面
  // document.body.appendChild(canvas)
}
```

## 总结

1. 使用`FileReader`的`readAsDataURL()`把图片文件转换成`dataUrl`实现本地预览
2. 使用`canvas`的`drawImage()`实现图片的裁剪，从图片的起始坐标开始，裁剪多少宽高，将裁剪后的图片从画布的起始坐标开始画多少的宽高
3. 将`canvas画布`使用`canvas.toBlob()`生成blob文件数据，再使用`File`API生成一个文件对象