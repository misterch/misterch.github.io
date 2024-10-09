---
title: 更完善的BEM架构
date: 2024-08-25
tags:
 - BEM
categories:
 - css
 - sass
---

## config.scss

```scss
$namespace: 'tn' !default;
$common-separator: '-' !default;
$element-separator: '__' !default;
$modifier-separator: '--' !default;
$state-prefix: 'is-' !default;

```

## functions.scss

```scss
@use 'config'; //导入config文件内定义的变量

// BEM support Func
// 块（Block）：代表一个独立的组件或页面中的一个大型部分。块可以看作是一个命名空间，用于包含相关元素和修饰符。例如，一个导航栏可以被视为一个块。
// 元素（Element）：代表块的一部分，但不能独立存在。元素总是属于一个块，并且与该块紧密相关。元素由块名称和元素名称组成，中间由双下划线（__）连接。例如，一个导航栏可以包含多个链接，链接可以被视为导航栏块的元素。
// 修饰符（Modifier）：代表块或元素的变体或状态。修饰符用于修改块或元素的外观或行为。修饰符由块名称或元素名称，连字符（-）和修饰符名称组成。例如，一个导航栏可以具有活动状态或浅色主题，这些状态可以通过添加修饰符类进行实现。

@function selectorToString($selector) {
  $selector: inspect($selector);
  $selector: str-slice($selector, 2, -2);
  @return $selector;
}

@function containsModifier($selector) {
  $selector: selectorToString($selector);

  @if str_index($selector, config.$modifier-separator) {
    @return true;
  } @else {
    @return false;
  }
}

@function containWhenFlag($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, '.' + config.$state-prefix) {
    @return true;
  } @else {
    @return false;
  }
}

@function containPseudoClass($selector) {
  $selector: selectorToString($selector);

  @if str-index($selector, ':') {
    @return true;
  } @else {
    @return false;
  }
}

@function hitAllSpecialNestRule($selector) {
  @return containsModifier($selector) or containWhenFlag($selector) or
    containPseudoClass($selector);
}

// join var name
// joinVarName(('button', 'text-color')) => '--tn-button-text-color'
@function joinVarName($list) {
  $name: '--' + config.$namespace;
  @each $item in $list {
    @if $item != '' {
      $name: $name + '-' + $item;
    }
  }
  @return $name;
}

// getCssVarName('button', 'text-color') => '--tn-button-text-color'
@function getCssVarName($args...) {
  @return joinVarName($args);
}

// getCssVar('button', 'text-color') => var(--tn-button-text-color)
@function getCssVar($args...) {
  @return var(#{joinVarName($args)});
}

// getCssVarWithDefault('button', 'text-color', 'red') => var(--tn-button-text-color, red)
@function getCssVarWithDefault($args, $default) {
  @return var(#{joinVarName($args)}, #{$default});
}

// bem('block', 'element', ''modifier) => 'tn-block__element--modifier'
@function bem($block, $element: '', $modifier: '') {
  $name: config.$namespace + config.$common-separator + $block;

  @if $element != '' {
    $name: $name + config.$element-separator + $element;
  }

  @if $modifier != '' {
    $name: $name + config.$modifier-separator + $modifier;
  }

  @return $name;
}

// 字符串替换
@function str-replace($string, $search, $replace) {
  $index: str-index($string, $search);

  @if $index {
    @return str-slice($string, 1, $index - 1) + $replace +
      str-replace(
        str-slice($string, $index + str-length($search)),
        $search,
        $replace
      );
  }

  @return $string;
}

```

## mixins.scss

```scss
@use 'function' as *;
// forward mixins
@forward 'config';
@forward 'function';

@use 'config' as *;

// BEM
@mixin b($block) {
  $B: $namespace + '-' + $block !global;

  .#{$B} {
    @content;
  }
}

@mixin e($element) {
  $E: $element !global;
  $selector: &;
  $currentSelector: '';
  @each $unit in $element {
    $currentSelector: #{$currentSelector +
      '.' +
      $B +
      $element-separator +
      $unit +
      ','};
  }

  @if hitAllSpecialNestRule($selector) {
    @at-root {
      #{$selector} {
        #{$currentSelector} {
          @content;
        }
      }
    }
  } @else {
    @at-root {
      #{$currentSelector} {
        @content;
      }
    }
  }
}

@mixin m($modifier) {
  $selector: &;
  $currentSelector: '';
  @each $unit in $modifier {
    $currentSelector: #{$currentSelector +
      $selector +
      $modifier-separator +
      $unit +
      ','};
  }

  @at-root {
    #{$currentSelector} {
      @content;
    }
  }
}

@mixin configurable-m($modifier, $E-flag: false) {
  $selector: &;
  $interpolation: '';

  @if $E-flag {
    $interpolation: $element-separator + $E-flag;
  }

  @at-root {
    #{$selector} {
      .#{$B + $interpolation + $modifier-separator + $modifier} {
        @content;
      }
    }
  }
}

@mixin spec-selector(
  $specSelector: '',
  $element: $E,
  $modifier: false,
  $block: $B
) {
  $modifierCombo: '';
  $elementCombo: '';

  @if $modifier {
    $modifierCombo: $modifier-separator + $modifier;
  }
  @if $element {
    $elementCombo: $element-separator + $element;
  }

  @at-root {
    #{&}#{$specSelector}.#{$block + $elementCombo + $modifierCombo} {
      @content;
    }
  }
}

@mixin meb($modifier: false, $element: $E, $block: $B) {
  $selector: &;
  $modifierCombo: '';

  @if $modifier {
    $modifierCombo: $modifier-separator + $modifier;
  }

  @at-root {
    #{$selector} {
      .#{$block + $element-separator + $element + $modifierCombo} {
        @content;
      }
    }
  }
}

@mixin when($state) {
  @at-root {
    &.#{$state-prefix + $state} {
      @content;
    }
  }
}

@mixin pseudo($pseudo) {
  @at-root #{&}#{':#{$pseudo}'} {
    @content;
  }
}

```

