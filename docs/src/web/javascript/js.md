
# Javascript 开发技巧

## 一行代码的优化

  1. 获取文件后缀名
  ```js
  /**
   * 获取文件后缀名
  * @param {String} filename
  */
  export function getExt(filename) {
      if (typeof filename == 'string') {
          // 如果文件没有后缀名，返回null
          if(!filename.includes('.')){return null}
          return filename
              .split('.')
              .pop()
              .toLowerCase()
      } else {
          throw new Error('filename must be a string type')
      }
  }
  <!-- 使用方式 -->
  getExt("1.mp4") //->mp4
  ```

  2. 复制内容到剪切板
  ```js
    export function copyToBoard(value) {
      const element = document.createElement('textarea')
      document.body.appendChild(element)
      element.value = value
      element.select()
      if (document.execCommand('copy')) {
          document.execCommand('copy')
          document.body.removeChild(element)
          return true
      }
      document.body.removeChild(element)
      return false
  }
  <!-- 使用方式 -->
  copyToBoard('lalallala')
  ```

  3. 生成随机字符串
  ```js
  /**
  * 生成随机id
  * @param {*} length
  * @param {*} chars
  */
  export function uuid(length=8, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
      let result = ''
      for (let i = length; i > 0; --i)
          result += chars[Math.floor(Math.random() * chars.length)]
      return result
  }
  <!-- 使用方式 -->
  uuid()  
  ```

  4. 保留到小数点以后「n」位
  ```js
  // 保留小数点以后几位，默认2位
  export function cutNumber(number, no = 2) {
      if (typeof number != 'number') {
          number = Number(number)
      }
      return Number(number.toFixed(no))
  }
  
  ```

  5. 下载excel文档
  ```js
  //下载一个链接 
  function download(link, name) {
      if(!name){
              name=link.slice(link.lastIndexOf('/') + 1)
      }
      let eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.style.display = 'none'
      eleLink.href = link
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
  }
  //下载excel
  download('http://111.229.14.189/file/1.xlsx')
  ```
  6. 防抖
  ```js
  /**
   *
  * @param {*} func 要进行debouce的函数
  * @param {*} wait 等待时间,默认500ms
  * @param {*} immediate 是否立即执行
  */
  export function debounce(func, wait=500, immediate=false) {
      var timeout
      return function() {
          var context = this
          var args = arguments

          if (timeout) clearTimeout(timeout)
          if (immediate) {
              // 如果已经执行过，不再执行
              var callNow = !timeout
              timeout = setTimeout(function() {
                  timeout = null
              }, wait)
              if (callNow) func.apply(context, args)
          } else {
              timeout = setTimeout(function() {
                  func.apply(context, args)
              }, wait)
          }
      }
  }
  <!-- 使用方式 -->
  <script>
    function onInput() {
      console.log('1111')
    }
    const debounceOnInput = debounce(onInput)
    document
      .getElementById('input')
      .addEventListener('input', debounceOnInput) //在Input中输入，多次调用只会在调用结束之后，等待500ms触发一次   
  </script>
  ```
  7. 节流
  ```js
  /**
   * 节流，多次触发，间隔时间段执行
  * @param {Function} func
  * @param {Int} wait
  * @param {Object} options
  */
  export function throttle(func, wait=500, options) {
      //container.onmousemove = throttle(getUserAction, 1000);
      var timeout, context, args
      var previous = 0
      if (!options) options = {leading:false,trailing:true}

      var later = function() {
          previous = options.leading === false ? 0 : new Date().getTime()
          timeout = null
          func.apply(context, args)
          if (!timeout) context = args = null
      }

      var throttled = function() {
          var now = new Date().getTime()
          if (!previous && options.leading === false) previous = now
          var remaining = wait - (now - previous)
          context = this
          args = arguments
          if (remaining <= 0 || remaining > wait) {
              if (timeout) {
                  clearTimeout(timeout)
                  timeout = null
              }
              previous = now
              func.apply(context, args)
              if (!timeout) context = args = null
          } else if (!timeout && options.trailing !== false) {
              timeout = setTimeout(later, remaining)
          }
      }
      return throttled
  }
  <!-- 使用方式 -->
  <script>
    function onInput() {
      console.log('1111')
    }
    const throttleOnInput = throttle(onInput)
    document
      .getElementById('input')
      .addEventListener('input', throttleOnInput) //在Input中输入，每隔500ms执行一次代码
    </script> 。
  ```
  8. cleanObject 去除 对象中 value: ""
  ```js
  let res=cleanObject({
    name:'',
    pageSize:10,
    page:1
  })
  console.log("res", res) //输入{page:1,pageSize:10}   name为空字符串，属性删掉
  ```

[https://juejin.cn/post/7010928535053271077]
[https://juejin.cn/post/7025771605422768159]
[https://juejin.cn/post/6844903838449664013]
[https://juejin.cn/post/6844904194919366669]
[https://juejin.cn/post/6844904181761835016]