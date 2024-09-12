import { text } from "stream/consumers"

const pkg = require('../../package.json')

const { js, framework, ui, build, db, node }  = require ("./params")

export const nav = () => { 
  return [
    { text: '首页', link: '/' },
    {
      text: pkg.version,
      items: [
        {
          text: '更新日志',
          link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
        }
      ]
    }
  ]
}
export const sidebar = () => { 
  return [
    {
      text: 'Javascript基础',
      collapsed: true,
      items: js
    },
   {
      text: '前端框架',
      collapsed: true,
      items: framework
    },
    {
      text: "前端组件库",
      collapsed: true,
      items: ui
    },
    {
      text: '打包构建',
      collapsed: true,
      items: build
    },
    {
      text: '性能优化',
      collapsed: true,
      items: [
        { text: '1', link: '/guide/optimize/1' },
      ]
    },
    {
      text: 'Node',
      collapsed: true,
      items: node
    },
    
    {
      text: '数据库',
      collapsed: true,
      items: db
    },
    {
      text: '云服务器',
      collapsed: true,
      items: [
        // { text: 'CentOS', link: '/guide/server/centos' },
        { text: 'uBuntu', link: '/guide/server/ubuntu' },
      ]
    },
    {
      text: 'cli 脚手架搭建',
      // collapsed: true,
      items: [
        { text: 'wuss-cli', link: '/guide/cli/wuss' },
      ]
    },
    {
      text: 'Bugs', link: '/bug/bugs'
    },
    {
      text: "面试",
      collapsed: true,
      link: "/offer/1.md"
    },
  ]
}

