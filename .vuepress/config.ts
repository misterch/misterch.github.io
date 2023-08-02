import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
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
          children:["1.md","2.md","3.md","4.md","5.md","6.md"]
        }
      ],
      "/docs/git/":[
        {
          text: "基础",
          children: ["basic","branch","merge","updatepublish","undo"]
        },
        {
          text: "指令详情",
          children:["clone","checkout","restore","stash","log","reflog"]
        }
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
            link: "/docs/node/1.md"
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
      // { text: "Categories", link: "/categories/reco/1/" },
      // { text: "Tags", link: "/tags/tag1/1/" },
      // {
      //   text: "Docs",
      //   children: [
      //     { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
      //     { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
      //   ],
      // },
    ],
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
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
  // debug: true,
});
