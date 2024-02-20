# 「react进阶」 react-hooks API 使用及理解

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 疑问？
  - 在无状态组件每一次函数上下文执行的时候，react用什么方式记录了hooks的状态?
  - 多个react-hooks用什么来记录每一个hooks的顺序的 ？ 为什么不能条件语句中，声明hooks? hooks声明为什么在组件的最顶部？
  - function函数组件中的useState，和 class类组件 setState有什么区别
  - react 是怎么捕获到hooks的执行上下文，是在函数组件内部的？
  - useEffect,useMemo 中，为什么useRef不需要依赖注入，就能访问到最新的改变值？
  - useMemo是怎么对值做缓存的？如何应用它优化性能？
  - 为什么两次传入useState的值相同，函数组件不更新?


  ## Function组件和Class组件本质的区别?

  >  函数组件和类组件到底有什么区别???

  ```js
    // 函数式组件
    class Index extends React.Component<any,any>{
      constructor(props){
          super(props)
          this.state={
              number:0
          }
      }
      handerClick=()=>{
        for(let i = 0 ;i<5;i++){
            setTimeout(()=>{
                this.setState({ number:this.state.number+1 })
                console.log(this.state.number)
            },1000)
        }
      }

      render(){
          return <div>
              <button onClick={ this.handerClick } >num++</button>
          </div>
      }
  }
  // 结果：1 2 3 4 5
  ```

  ```js
    // 函数式组件
    function Index(){
      const [ num ,setNumber ] = React.useState(0)
      const handerClick=()=>{
          for(let i=0; i<5;i++ ){
            setTimeout(() => {
                  setNumber(num+1)
                  console.log(num)
            }, 1000)
          }
      }
      return <button onClick={ handerClick } >{ num }</button>
    }
  // 结果：0 0 0 0 0
  ```
  ### WHY?
  - 结果1：1 2 3 4 5
  - 结果2: 0 0 0 0 0
  ### 类组件
  > 由于执行上setState没有在react正常的函数执行上下文上执行，而是setTimeout中执行的，批量更新条件被破坏。所以可以直接获取到变化后的state。
  ### 函数式组件
  > 在class状态中，通过一个实例化的class，去维护组件中的各种状态；但是在function组件中，没有一个状态去保存这些信息，每一次函数上下文执行，所有变量，常量都重新声明，执行完毕，再被垃圾机制回收。

  ::: tip 总结
  对于**class组件**，我们只需要实例化一次，实例中保存了组件的state等状态。对于每一次更新只需要调用render方法就可以。但是在**function组件**中，每一次更新都是一次新的函数执行,为了保存一些状态,执行一些副作用钩子,react-hooks应运而生，去帮助记录组件的状态，处理一些额外的副作用
  :::


  ## API Hooks
  ### 1. useState()
  ### 2. useEffect()
  ### 3. useLayoutEffect()
  ### 4. useMemo()
  ### 5. useReducer()
  ### 6. useRef()
  ### 7. useState()
  ### 8. useCallback()

