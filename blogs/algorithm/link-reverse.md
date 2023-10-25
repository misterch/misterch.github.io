---
title: 链表的逆置
date: 2023-10-25
categories:
 - 算法
 - LeetCode
tags:
 - 链表
---

## 递归将链表逆置

```js:{18,22,24,28,31,32,34}
function Node(val){
  this.value = val
  this.next = null
}

const n1 = new Node(1)
const n2 = new Node(2)
const n3 = new Node(3)
const n4 = new Node(4)
const n5 = new Node(5)

n1.next = n2
n2.next = n3
n3.next = n4
n4.next = n5

function reverse(root){
  if(root.next.next==null){
    console.log('结束')
    // 如上面的链表，n4.next.next == n5.next == null
    // 这样就能知道n4和n5，就可以将n5的next指向n4，达到逆置
    root.next.next = root
    //root是n4，root.next是n5
    return root.next
  }
  console.log('进来',root)
  //达到结束条件，返回最后一个值给r
  const r = reverse(root.next)
  //修改指向，例如n3.next.next == n4.next =n3
  console.log(`修改指向，将n${root.value}.next.next===n${root.value+1}.next=n${root.value}`)
  root.next.next = root
  root.next = null
  // 逐级修改指向并返回最终的r值
  return r
}

// 进来 n1
// 进来 n2
// 进来 n3
// 结束  返回逆置后的终点的值
// 修改指向，将n3.next.next===n4.next=n3
// 修改指向，将n2.next.next===n3.next=n2
// 修改指向，将n1.next.next===n2.next=n1
// 最后返回 n5
```

