import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import mdKatex from 'markdown-it-katex'

export default defineUserConfig({
  title: "Ben's Blog",
  description: "我的前端笔记",
  head: [
    // 静态资源默认在.vuepress/public
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
    ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }]
  ],
  theme: recoTheme({
    password: '1b01dedededa32616ed25865c4adb837',
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "Ben Chan",
    authorAvatar: "/avatar.jpg",
    docsRepo: 'https://github.com/misterch/misterch.github.io',
    docsBranch: 'main',
    // docsDir: 'docs',
    editLinkText:"编辑此页",
    editLinkPattern: ':repo/blob/:branch/:path',
    lastUpdatedText: "最近更新时间",
    // series 为原 sidebar
    series: {
      "/docs/javascript/": [
        {
          text: "基础原理",
          children: ["home", "theme"],
        }
      ],
      "/docs/vue3/": [
        {
          text: "组件",
          children: ["props","slot","event"],
        }
      ],
      "/docs/node/":[
        {
          text: "基础理论",
          children:["/docs/node/essentials/1.md","/docs/node/essentials/2.md","/docs/node/essentials/3.md","/docs/node/essentials/4.md","/docs/node/essentials/5.md","/docs/node/essentials/6.md"]
        },
        {
          text:'实践',
          children:['/docs/node/practice/globalVar.md','/docs/node/practice/innerModule.md','/docs/node/practice/modules.md']
        }
      ],
      "/docs/git/":[
        {
          text: "基础",
          children: ["basic","branch","merge","updatepublish","undo"]
        },
        {
          text:"场景",
          children: ["pullbranch","mergeTemplate"]
        },
        {
          text: "指令详情",
          children:["clone","checkout","restore","stash","log","reflog"]
        },
      ],
      "/docs/interview/javascript/":[
        {
          text:"javascript面试题",
          children:["1","2"]
        }
      ],
      "/docs/interview/":[
        {
          text:"typescript",
          children:["面试题1"]
        },
        {
          text:"vue",
          children:["面试题1"]
        },
        {
          text:"vite",
          children:["面试题1"]
        },
        {
          text:"webpack",
          children:["面试题1"]
        },
        {
          text:"node",
          children:["面试题1"]
        }
      ]
    },
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "分类",
        link:"/categories/javascript/1/"
      },
      {
        text: "标签",
        link:"/tags/zishiyingbuju/1/"
      },
      {
        text: "文档",
        children:[
          {
            text: "Node",
            link: "/docs/node/essentials/1.md"
          },
          {
            text: "Git",
            link: "/docs/git/basic"
          },
          {
            text:"面试",
            children:[
              {
                text:"javascript",
                link:"/docs/interview/javascript/1"
              },
              {
                text:"typescript",
                link:"/docs/interview/typescript/1"
              }
            ]
          }
        ]
      },
      {
        text:"博客",
        link: "/posts",
      },
      {
        text: "归档",
        link:"/timeline/"
      },
      {
        text: "Links",
        link: "/blogs/other/somelink.md"
      }
    ],
    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  extendsMarkdown(md){
    md.set({html:true})
    md.use(mdKatex)
  }
});
