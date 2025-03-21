# 主题切换

前端开发中，主题切换逐渐成为一种常见需求。用户可能希望根据自己的喜好、习惯或者场景需求进行主题切换，例如切换日间与夜间模式。本文主要介绍如何在前端实现主题切换，以及一些应用实例。

- link 动态引入 （不推荐）
  > 提前准备好各个主题的 CSS 文件，在切换的时候加载，比如：
  ::: tip 优缺点
    1. 优点
    - 实现简单，只需要关注维护 css 即可
    - 可以实现主题样式按需加载
    2. 缺点
    - 如果 css 文件过大, 可能会导致页面样式闪烁
    - 各个主题文件相互独立，修改样式比较麻烦
    - 服务端渲染时，没办法直接操作客户端 DOM 元素，会影响加载性能
    - 不够灵活，不能满足现代前端开发的需求  
  :::
- 提前加载样式，类名切换（不推荐）
  > 先引入各个主题的 css，通过切换类名实现主题切换。 
  原理是切换主题时，引入不同的主题算法（css 文件）
  ```js
    return (
      <ConfigProvider
        theme={{
          algorithm: themeLight ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    );
  ```
  相同元素，类名不同使用不同的css主题文件

  还可以配置 前缀
  ```js
  export const PREFIX = 'tech-theme';
  ...

  <ConfigProvider
    prefixCls={prefixCls}
  >
    {children}
  </ConfigProvider>
  ```
  ::: tip 优缺点
    1. 优点
      - 样式切换会更加顺畅
      - 便于组件封装与状态管理
      - 可配置性比较强，支持动态自定义样式
    2. 缺点
      - 首屏加载会慢一些
      - 除了样式切换不会闪烁，其余缺点与动态 link 方案缺点一样
  :::
- css 变量（推荐）
  > 这个方案是目前主流推荐的方案。在介绍之前，先讲一下浏览器的几个新特性。

  下面有实现方式
  ::: tip 优缺点
    1. 优点
      - 原生支持，是现在主流方案
      - 轻量级，部署方便，可定制化程度高
      - 不存在优先级冲突问题
      - 可实现热替换和更改
    2. 缺点
      - 老的浏览器存在兼容性问题
  :::
- css 预处理器（可以考虑）
  > 将所有的样式文件使用 Sass 预先定义好,然后写一个 js 脚本在打包前编译为 css，然后将这个文件动态插入到 head 里
  ::: tip 优缺点
    1. 优点
      - 样式切换流畅，不会卡顿
      - 语法更多样，开发成本低
      - 与 css 变量一样，新增或修改样式，只需要改动 Scss/Less 变量即可
    2. 缺点
      - 需要在编译时手动编译，运行时没办法热替换
      - 学习成本高一些
  :::
- css-in-js （可以考虑）
  > 与 Antd 的实现理念一致，也是维护一个 ThemeProvider 来完成可配置的主题设置
  ::: tip 优缺点
    1. 优点
      - 不会存在 css 加载部署的问题，适合微前端这种需要隔离样式的场景
      - ...[Antd 方案优点]
      
    2. 缺点
      - 学习曲线比较高
      - 增加了运行时的开销和打包体积
      - 源码可读性可能会变差
  :::
- css 框架(Tailwindcss) 

  > 使用 css 框架，原则上不算是一个新技术分类，他还是上面所讲的方案中的一种或几种，是对这些方案的企业级封装

  ::: tip 优缺点
    1. 优点
      - 大势所趋，前景广阔
      - 易于管理和维护，使得定制主题变得随心所欲
      - 代码冗余小
      - 更好的性能与可扩展性
    2. 缺点
      - 框架本身可能会与已有项目架构冲突
      - 框架约束了可定制的灵活性
      - 学习成本较高
      - 需要有额外的维护版本升级工作
  :::
## 主题切换设计原则
  ### 1. 应遵循用户使用流畅原则，不应添加额外的使用负担
  > 比如 页面中由用户定制化的内容，主题切换后导致色差而无法看清；或者切换按钮藏得太深，用户找不到等
  ### 2. 不应过度影响页面加载速度
  > 比如，样式 css 太大，网页的白屏速度大大增加，反而影响了使用体验
  ### 3. 应根据业务场景和用户群体决定
  > 比如，客户群体是 To B 的商务人士，年轻人很少，这种花里胡哨的切换反而不适应，对于商旅人士，移动端适配做得好可能更重要。


## 方案1. css变量切换主题
CSS变量是一种实现主题切换的便捷方法。通过在CSS中定义变量，可以方便地修改主题颜色，例如：
```js
:root {
  --primary-color: #42b983;
  --secondary-color: #35495e;
}

.button {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

```

在JavaScript中，可以通过修改CSS变量的值实现主题切换：

```js
function switchTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.style.setProperty('--primary-color', '#1c2022');
    document.documentElement.style.setProperty('--secondary-color', '#ffffff');
  } else {
    document.documentElement.style.setProperty('--primary-color', '#42b983');
    document.documentElement.style.setProperty('--secondary-color', '#35495e');
  }
}
```


## 方案2. CSS类名切换

另一种实现主题切换的方法是使用不同的CSS类名。首先，需要在CSS中定义各个主题的样式：

```js
.light-theme {
  --primary-color: #42b983;
  --secondary-color: #35495e;
}

.dark-theme {
  --primary-color: #1c2022;
  --secondary-color: #ffffff;
}

.button {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}
```

接下来，在JavaScript中通过切换元素的类名来实现主题切换：

```js
function switchTheme(theme) {
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
  } else {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  }
}
```

## 方案3. CSS预处理器
CSS预处理器（如Sass、Less等）提供了更多灵活性，可以通过变量、混合（mixin）等特性实现主题切换。例如，使用Sass定义主题样式：

```js
$light-primary-color: #42b983;
$light-secondary-color: #35495e;

$dark-primary-color: #1c2022;
$dark-secondary-color: #ffffff;

@mixin theme($primary-color, $secondary-color) {
  .button {
    background-color: $primary-color;
    color: $secondary-color;
  }
}

.light-theme {
  @include theme($light-primary-color, $light-secondary-color);
}

.dark-theme {
  @include theme($dark-primary-color, $dark-secondary-color);
}

```
与CSS类名切换方法相似，在JavaScript中切换元素的类名即可实现主题切换。

## 4. 本地存储 （样式加载优化）
在实际应用中，用户可能希望浏览器记住他们的主题选择。这时，我们可以将用户的主题选择保存在localStorage中。在页面加载时，检查localStorage中是否有用户的主题选择，如果有，则应用相应的主题。以下是一个简单的示例

```js
function saveThemeToLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

function getThemeFromLocalStorage() {
  return localStorage.getItem('theme');
}

function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark-theme');
    root.classList.remove('light-theme');
  } else {
    root.classList.add('light-theme');
    root.classList.remove('dark-theme');
  }
}

// 页面加载时，应用主题
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getThemeFromLocalStorage();
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // 如果没有保存的主题，可以应用默认主题
    applyTheme('light');
  }
});

// 主题切换按钮
document.getElementById('switch-theme').addEventListener('click', () => {
  const currentTheme = getThemeFromLocalStorage();

  if (currentTheme === 'dark') {
    applyTheme('light');
    saveThemeToLocalStorage('light');
  } else {
    applyTheme('dark');
    saveThemeToLocalStorage('dark');
  }
});

```
## 5. 自定义主题

除了提供预定义的主题外，还可以允许用户自定义主题。例如，通过输入框获取用户自定义颜色，并实时应用主题。以下是一个简单的示例：
```js
<label for="primary-color">Primary color:</label>
<input type="color" id="primary-color" value="#42b983">

<label for="secondary-color">Secondary color:</label>
<input type="color" id="secondary-color" value="#35495e">

<button id="apply-custom-theme">Apply custom theme</button>
```
```js
function applyCustomTheme(primaryColor, secondaryColor) {
  document.documentElement.style.setProperty('--primary-color', primaryColor);
  document.documentElement.style.setProperty('--secondary-color', secondaryColor);
}

document.getElementById('apply-custom-theme').addEventListener('click', () => {
  const primaryColor = document.getElementById('primary-color').value;
  const secondaryColor = document.getElementById('secondary-color').value;

  applyCustomTheme(primaryColor, secondaryColor);
});

```

::: tip 如何选择

在实践中，可以根据项目的具体需求选择合适的主题切换方案。例如，如果项目中已经使用了CSS预处理器，那么可以考虑使用相应的预处理器特性来实现主题切换。如果项目对浏览器兼容性要求较高，可以选择CSS类名切换方案。而如果希望实现更简洁的代码和更好的性能，CSS变量是一个不错的选择
:::


## React中主题切换
在React中实现主题切换通常涉及到定义一组主题变量，并在用户选择不同主题时切换这些变量。这可以通过使用React的上下文（Context）API和钩子（Hooks）API来实现。以下是一个基本的示例，展示了如何在React应用程序中实现主题切换。

首先，你需要定义你的主题变量。这通常是一组CSS变量或者JavaScript对象，包含了颜色、字体大小等样式属性。

```js
// themes.js 主题颜色
export const lightTheme = {
  body: '#FFF',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#363537',
};

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
};
```

接下来，创建一个上下文来保存当前主题和一个切换主题的函数。

```js
// ThemeContext.js
import React, { createContext, useState } from 'react';
import { lightTheme, darkTheme } from './themes';

export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

现在，你可以在你的应用程序中使用ThemeProvider来包裹你的组件，并使用ThemeContext来访问当前主题和切换主题的函数。

```js
// App.js 使用
import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>Toggle Theme</button>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {/* 其他组件 */}
    </ThemeProvider>
  );
};

export default App;
```

最后，你需要确保你的组件使用上下文中的主题变量来设置样式。这可以通过内联样式、CSS-in-JS库，或者传统的CSS样式表与CSS变量结合使用来实现。

```js
// 使用内联样式
const ThemedComponent = () => {
  const { theme } = useContext(ThemeContext);
  const style={{ backgroundColor: theme.body, color: theme.text }} 
  return ( <div style >
      {/* 组件内容 */}
    </div>
  );
};
```

或者，如果你使用的是styled-components，你可以这样做：

```js
// 使用styled-components
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const StyledComponent = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const ThemedComponent = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledComponent theme={theme}>
      {/* 组件内容 */}
    </StyledComponent>
  );
};

```
这个基本的示例展示了如何在React中实现主题切换。你可以根据需要扩展这个示例，添加更多的主题属性，或者实现更复杂的主题切换逻辑。