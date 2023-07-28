---
title: BEM架构规范（全局的sass文件）
date: 2023-07-28
categories:
 - css
 - sass
tags:
 - sass
 - bem
---

> B:block
>
> E:element
>
> M:modify

```css
//BEM.scss
$namespace:'ben'!default;
//块使用-连接
$block-sel:'-'!default;
//块里面的元素使用__连接
$ele-sel:'__'!default;
//块中的修饰使用--
$mod-sel:'--'!default;


// ben-link
@mixin b($block){
  .#{$namespace+$block_sel+$block}{
    @content;
  }
}

// ben-link__main
// ben-link__inner
@mixin e($el){
  $selector: &;
  //@at-root,将其包裹的css脱离父级，这样减少多编译一个父级类名
  // 不用@at-root包裹：.ben-para .ben-para__main{}
  // 使用@at-root包裹：.ben-para__main{}
  @at-root{
    #{$selector+$elem-sel+$el}{
      @content;
    }
  }
}

// ben-link--success
@mixin m($mod){
  $selector:&;
  #{$selector+$mod-sel+$mod}{
    @content;
  }
}
```

将这个scss文件变为全局的文件，配置vite.config文件

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css:{
    preprocessorOptions:{
      scss:{
		//在scss模块中插入以下的值，用来导入bem文件
        additionalData:`@import "./src/style/bem.scss";`
      }
    }
  }
})
```

在vue文件中使用bem规范来定义样式

```css
//ben-para
@include b(para){
  color: #333;
  //ben-para__main
  @include e(main){
    background: #99999944;
  }
  //ben-para__footer
  @include e(footer){
    display: flex;
    justify-content: space-between;
    background: #c09d9d;
  }
  //ben-para--success
  @include m(success){
    color: green;
  }
  //ben-para--fail
  @include m(fail){
    color: red;
  }
}
```

