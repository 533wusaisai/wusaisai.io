# 数组Array

## 遍历方法

1. forEach()
>  方法用于调用数组的每个元素，并将元素传递给回调函数。数组中的每个值都会调用回调函数.
```js
  /**
   * @param {currentValue} 必需。当前元素
   * @param {index} 可选。当前元素的索引值
   * @param {arr} 可选。当前元素所属的数组对象
   */
 
  array.forEach((currentValue, index, arr)=>{
    console.log(currentValue) // 数组的每个值
  })
```
::: info 注意
  - forEach 方法【不会改变原数组】，也没有返回值；
  - forEach 无法使用 break，continue 跳出循环，使用 return 时，效果和在 for 循环中使用 continue 一致；
  - forEach 方法无法遍历对象，仅适用于数组的遍历。
:::
2. map()
> 创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数后的返回值。
```js 
  /**
   * @param {currentValue} 必需。当前元素
   * @param {index} 可选。当前元素的索引值
   * @param {arr} 可选。当前元素所属的数组对象
   */
  const array = [1, 2, 3, 4, 5];
  array.map((currentValue, index, arr)=>{
    console.log(currentValue) // 数组的每个值
  })
```
:::info 注意
  - map 方法不会对空数组进行检测；
  - map 方法遍历数组时会返回一个新数组，【不会改变原始数组】；
  - map 方法有返回值，可以return出来，map的回调函数中支持return返回值；
  - map 方法无法遍历对象，仅适用于数组的遍历
:::
3. for of()
> for...of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议
```js 
  /**
   * @param {variable} 每个迭代的属性值被分配给该变量
   * @param {iterable} 一个具有可枚举属性并且可以迭代的对象。
   */
  for (variable of iterable) {
    item  // 数组的每一项
  }
```
:::info 注意
  - for of 方法只会遍历当前对象的属性，不会遍历其原型链上的属性；
  - for of 方法适用遍历【数组/ 类数组/字符串/map/set】 等拥有迭代器对象的集合；
  - for of 方法不支持遍历普通对象，因为其没有迭代器对象。如果想要遍历一个对象的属性，可以用 for in 方法；
  - 可以使用break、continue、return来中断循环遍历；
:::
4. filter()
> 创建一个新数组，包含通过所提供函数实现的测试的所有元素
```js 
```
:::info 注意
  - filter 方法会返回一个新的数组，不会改变原数组；
  - filter 方法不会对空数组进行检测；
  - filter 方法仅适用于检测数组
:::
6. some()
> 测试数组中是不是至少有一个元素通过了被提供的函数测试。
```js 
/**
   * @param {currentValue} 必需。当前元素
   * @param {index} 可选。当前元素的索引值
   * @param {arr} 可选。当前元素所属的数组对象
   */
array.some((currentValue,index,arr)=>{})
```
:::info 注意
:::
7. every()
> 测试一个数组内的所有元素是否都能通过某个指定函数的测试。
```js
  /**
   * @param {currentValue} 必需。当前元素
   * @param {index} 可选。当前元素的索引值
   * @param {arr} 可选。当前元素所属的数组对象
   */
array.every((currentValue,index,arr)=>{})

```
8. reduce()
> 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
```js 
  /**
   * @param {total} 上一次调用回调返回的值，或者是提供的初始值（initialValue）；
   * @param {currentValue} 当前被处理的元素；
   * @param {currentIndex} 可当前元素的索引；
   * @param {arr} 当前元素所属的数组对象。
   */
array.reduce((total, currentValue, currentIndex, arr)=>{})

```
:::info 注意
  - 两个方法都不会改变原数组；
  - 两个方法如果添加初始值，就会改变原数组，会将这个初始值放在数组的最后一位；
  - 两个方法对于空数组是不会执行回调函数的。
:::
9. find()
> 返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined。
```js 
```
:::info 注意
:::
10. findIndex()
> 返回数组中满足提供的测试函数的第一个元素的索引，否则返回 -1。
```js 
```
:::info 注意
:::
11. keys()
```js 
```
:::info 注意
:::
12. values()
```js 
```
:::info 注意
:::
13. entries()
```js 
```
:::info 注意
:::
14. reduceRight()
> 与 reduce() 相同，但从数组的末尾向前工作。

## 添加/删除元素
1. push()
2. pop()
3. shift()
4. unshift()
5. splice()
6. concat()
## 搜索和排序
1. indexOf()
2. lastIndexOf()
3. includes()
4. sort()
5. reverse()

## 转换方法
1. join()
2. toString()
3. toLocaleString()
## 其他方法
1. slice()
2. flat()
3. flatMap()
4. fill()
5. copyWithin()