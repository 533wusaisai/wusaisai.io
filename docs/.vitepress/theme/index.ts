
import DefaultTheme from 'vitepress/theme'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { buildCategoryTree, hierarchicalRoutes } from "./glodname"

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Antd)
    app.provide('routes', buildCategoryTree(hierarchicalRoutes))
    app.config.globalProperties.$routes = buildCategoryTree(hierarchicalRoutes)

    // 注册图标组件
    // app.component('UserOutlined', import('@ant-design/icons-vue').UserOutlined)
  }
}