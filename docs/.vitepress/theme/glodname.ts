


const modules = import.meta.glob('../../src/**/*.md', { eager: true, query: 'raw' })


const normalizePath = (rawPath: string) => {
  return rawPath
    .replace(/^.*src\//, '/')  // 保留 src 后的路径结构
    .replace(/(\\|\/index\.md$)/g, '/') // 统一路径格式
    .replace(/\.md$/, '')
}
// console.log(modules);

const getTitleFromContent = (content: string) => {
  // 增强型正则表达式，支持以下情况：
  // 1. 忽略前置空白
  // 2. 处理YAML frontmatter
  // 3. 兼容不同换行符
  const match = content.match(/^(---\s*\n[\s\S]*?\n---)?\s*#\s+(?<title>.+?)\s*$/m)
  return match?.groups?.title 
}

export const hierarchicalRoutes = Object.entries(modules).map(([filePath, module]:any) => {
  return {
    path: normalizePath(filePath),
    title: getTitleFromContent(module.default),
    meta: {
      category: filePath.split('/').slice(2, -1).join('/') // 提取目录层级
    },
    component: module.default
  }
})



export const buildCategoryTree = (routes:any) => {
  const tree = []
  routes.forEach(route => {
    const categories = route.meta.category.split('/')
    let currentLevel:any = tree
    categories.forEach((cat, index) => {
      const existing:any = currentLevel?.find((item:any) => item.label === cat)
      if (existing) {
        currentLevel = existing.items
      } else {
        const newCategory:any = {
          label: cat,
          value: categories.slice(0, index + 1).join('/'),
          items: [],
          text: route.title,
          link: route.path  
        }        
        currentLevel.push(newCategory)
        currentLevel = newCategory.items
      }
    })
  })

  return tree
}
// console.log(buildCategoryTree(hierarchicalRoutes));
