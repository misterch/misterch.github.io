---
title: base64-blob-file互转
date: 2023-07-19
categories: 
 - 工具函数
tags:
 - base64
---
## 图片转换为Base64
```javascript
function getImgToBase64(url,callback){
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
```

```javascript
/**
* 获取指定文件的base64编码
* @param object File Blob 或 File 对象 这里是file对象
* @param Function callback 返回数据的回调函数
* @return string 返回base64编码
*/
function getBase64(File,callback){
    var reader = new FileReader(); //IE10+
    var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
    var File = File||$("#file").get(0).files[0]; //获取上传的文件对象
    /*
    FileList {0: File, 1: File, length: 2} 多个文件
    File:{name: "fan.jpg", lastModified: 1559019043288, lastModifiedDate: Tue May 28 2019 12:50:43 GMT+0800 (中国标准时间), webkitRelativePath: "", size: 3346145, type: "image/jpeg"}
    FileList {0: File, 1: File, length: 2} 单个文件
    */
    if (File) {
        //读取指定的 Blob 或 File 对象 触发loadend 事件 并将图片的base64编码赋值给result
        reader.readAsDataURL(File);
        //reader.readAsText(File)
        //异步通信 回调函数返回
        reader.onload = function (e) {
            //var ImgFileSize = reader.result.substring(reader.result.indexOf(",") + 1).length;//截取base64码部分（可选可不选，需要与后台沟通）
            if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
                alert( '上传失败，请上传不大于2M的图片！');
                return;
            }else{
                var base64Data=reader.result;
                //返回base64编码
                callback(base64Data);
            }
        }
    }
}
```
## base64转file
```javascript
function Base64toFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
```
## base64转blob
```javascript
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), 
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/*2:转bob*/
/**
* 将以base64的图片url数据转换为Blob
* @param base64 用url方式表示的base64图片数据
* @return blob 返回blob对象
*/
function convertBase64UrlToBlob(base64){
    var type =base64.split(",")[0].match(/:(.*?);/)[1];//提取base64头的type如 'image/png'
    var bytes=window.atob(base64.split(',')[1]);//去掉url的头，并转换为byte (atob:编码 btoa:解码)
    
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);//通用的、固定长度(bytes.length)的原始二进制数据缓冲区对象
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type :type});
}
```

## Blob转base64
```javascript
function blobToBase64(blob, callback) {
    let a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}
```