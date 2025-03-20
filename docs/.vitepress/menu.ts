

// import { hierarchicalRoutes } from "./theme/glodname"

const pkg = require('../../package.json')

export const sidebar = () => {
  return [
    {
      text: 'Markdown文件添加',
      collapsed: false,
      link: "/src/markdown/README.md",
    },
    {
      text: '架构插件列表',
      collapsed: true,
      items: [
        { text: '前端插件列表', link: '/src/plugins/list.md' },
        { text: '前端常用命令', link: '/guide/2' },
        { text: '前端常用工具', link: '/guide/3' },
        { text: '前端常用网站', link: '/guide/4' },
        { text: '前端常用资源', link: '/guide/5' },
        { text: '前端常用插件', link: '/guide/6' },
        { text: '前端常用库', link: '/guide/7' },
        { text: '前端常用框架', link: '/guide/8' },
      ]
    },
    {
      text: 'Javascript基础',
      collapsed: true,
      items: []
    },
  //  {
  //     text: '前端框架',
  //     collapsed: true,
  //     items: framework
  //   },
  //   {
  //     text: "前端组件库",
  //     collapsed: true,
  //     items: ui
  //   },
  //   {
  //     text: '打包构建',
  //     collapsed: true,
  //     items: build
  //   },
  //   {
  //     text: '性能优化',
  //     collapsed: true,
  //     items: [
  //       { text: '1', link: '/guide/optimize/1' },
  //     ]
  //   },
  //   {
  //     text: 'Node',
  //     collapsed: true,
  //     items: node
  //   },
    
  //   {
  //     text: '数据库',
  //     collapsed: true,
  //     items: db
  //   },
  //   {
  //     text: '云服务器',
  //     collapsed: true,
  //     items: [
  //       // { text: 'CentOS', link: '/guide/server/centos' },
  //       { text: 'uBuntu', link: '/guide/server/ubuntu' },
  //     ]
  //   },
  //   {
  //     text: 'cli 脚手架搭建',
  //     // collapsed: true,
  //     items: [
  //       { text: 'wuss-cli', link: '/guide/cli/wuss' },
  //     ]
  //   },
  //   {
  //     text: 'Bugs', link: '/bug/bugs'
  //   },
  //   {
  //     text: "面试",
  //     collapsed: true,
  //     link: "/offer/1.md"
  //   },
  ]
}

