import { defineConfig } from 'vitepress'
// import { createRequire } from 'module'
import { nav, sidebar} from './menu'

// https://vitepress.dev/reference/site-config
// const require = createRequire(import.meta.url)

export default defineConfig({
  title: "前端公开课",
  description: "爱折腾 | 全栈开发者 | 热爱开发",
  base: "/",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }],
  ],

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel:"搜索文档"
              },
              modal: {
                noResultsText: "无法搜索到结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText:"切换"
                }
              }
            }
          }
        }
      }
    },
    logo: { src: '/vitepress-logo-mini.svg', width: 24, height: 24 },
  
    // 页面广告
    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },
    nav: nav(),
    sidebar: sidebar(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/533wusaisai/wss' }
    ],

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2024-present <a href="https://github.com/533wusaisai/wss">wusaisai</a>'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    outline: {
      label: '页面导航'
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
  }
})
