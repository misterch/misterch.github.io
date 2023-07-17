import {defineUserConfig} from 'vuepress'
export default defineUserConfig({
  title:'我的博客',
  lang:'zh-CN',
  base:"/",
  head: [
    // 静态资源默认在.vuepress/public
    ['link', { rel: 'icon', href: '/images/favicon.png' }],
    
  ],
})