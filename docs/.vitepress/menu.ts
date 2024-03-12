
const pkg = require('../../package.json')


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
const base = "/guide/web"
const framework = "/guide/framework"
const build = "/guide/build"
const node = "/guide/node"
const db = "/guide/db"
const componentUI = "/guide/ui"
const bugs = "/guide/bugs"

export const sidebar = () => { 
  return [
    {
      text: '基础',
      collapsed: false,
      items: [
        {
          text: 'javascript',
          collapsed: true,
          items: [
            { text: '设计模式', link: `${base}/javascript/设计模式` },
            { text: '深浅克隆', link: `${base}/javascript/clone` },
            { text: '数组（Array）', link: `${base}/javascript/array` },
            { text: '对象（Object）', link: `${base}/javascript/object` },
            { text: '实用技巧', link: `${base}/javascript/js` },
          ],
        },
        { text: 'git', link:`${base}/git` },
        // { text: '浏览器相关', link: `${base}/browser/` },
        { text: 'axios', link: `${base}/axios` },
        { text: 'H5', link: `${base}/h5` },
        { text: '页面访问统计', link: `${base}/pagecount` },
        { text: '文件上传（切片）', link: `${base}/upload` },
      ]
    },
    {
      text: '前端框架',
      collapsed: true,
      items: [
        {
          text: 'React',
          collapsed: false,
          items: [
            {
              text: '项目搭建', link:  `${framework}/react/create`,
            },
            {
              text: 'API', link: `${framework}/react/hooks`,
            },
            {
              text: '持久化存储方案', link: `${framework}/react/storage`,
            },
            {
              text: "主题切换", link:`${framework}/react/themes`,
            },
            {
              text: '优化', link: `${framework}/react/性能优化`,
            },
          ]
        },
        {
          text: 'Vue',
          collapsed: false,
          items: [
            {
              text: '项目搭建', link:  `${framework}/vue/create`,
            },
            {
              text: 'API', link:  `${framework}/vue/api`,
            },
          ]
        },
      ]
    },
    {
      text: "前端组件库",
      collapsed: true,
      items: [
        {
          text: "React组件库搭建",
          link: `${componentUI}/dumi`
        },
        {
          text: "Antd",
          link: `${componentUI}/antd`
        },
        {
          text: "Element",
          link: `${componentUI}/element`
        },
      ]
    },
    {
      text: '打包构建',
      collapsed: true,
      items: [
        { text: 'Webpack', link: `${build}/webpack` },
        { text: 'Rollup', link: `${build}/rollup`},
        { text: 'Vite', link: `${build}/vite` },
      ]
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
      items: [
        {
          text: 'Node.js',
          link: '/guide/node/api',
        },

        {
          text: 'Koa.js',
          collapsed: true,
          items: [
            { text: '项目搭建', link: `${node}/koa/koa-init` },
            { text: '数据库连接', link: `${node}/koa/数据库连接`},
            { text: '文件上传', link: `${node}/koa/文件上传` },
            { text: '多进程', link: `${node}e/koa/多进程` },
            // { text: '无感刷新Token', link: '/node/koa/无感刷新Token' },
            { text: '打包', link: `${node}/koa/服务端打包`},
          ]
        },
        {
          text: 'Egg.js', link: `${node}/egg/egg-init`,
        },
        {
          text: 'Express.js', link: `${node}/express/express-init`,
        },
        {
          text: 'Nest.js', link: `${node}/nest/nest-init`,
        }
      ]
    },
    
    {
      text: '数据库',
      collapsed: true,
      items: [
        { text: 'MongoDB', link: `${db}/mongodb` },
        { text: 'MySQL', link: `${db}/mysql` },
        { text: 'Redis', link: `${db}/redis` },
      ]
    },
    {
      text: '云服务器',
      collapsed: false,
      items: [
        { text: '相关配置', link: '/guide/server/setting' },
      ]
    },
    {
      text: 'Bugs', link: '/bug/'
    },
  ]
}

