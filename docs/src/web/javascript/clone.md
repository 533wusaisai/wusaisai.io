# 深浅克隆
深克隆（Deep Clone）和浅克隆（Shallow Clone）是编程中复制对象时使用的两种不同方法，它们主要在处理对象内部的引用类型时表现出差异。

## 1. 浅克隆 
> 浅克隆创建一个新的对象，基本数据类型，复制字段值。引用类型复制引用不会复制引用对象本身。新对象的引用字段值仍然执行原始对象的相同对象或数组。
  - `{ Object.assign() }`
  - `{ ...obj }`

## 2. 深克隆
> 不仅可以复制对象本身，及复制对象中的引用类型。完全创建所有的原始对象的嵌套对象的副本，深克隆后，原始对象和新对象在内存中没有任何共享部分。
  ### 1. `{ JSON.parse(JSON.stringify(obj)) }`
  ::: tip 局限性
   - 无法复制函数。
   - 无法正确处理Date对象（会被转成字符串）。
   - 无法复制RegExp对象。
   - 无法复制undefind、Symbol和函数（这些值会在转换过程中被忽略或改变）。
   - 如果对象中存在循环引用，这种方法会抛出错误。
  :::

  ```js
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  ```

  ### 2. `Lodash 的 { _.cloneDeep() }`
  ### 3. 手动实现
  > 这个函数考虑了数组、日期、正则表达式和循环引用的情况。

  ::: tip 注意 
  这个函数并不完美，它不处理函数、Symbol 或其他复杂的对象类型（如Map、Set等）
  :::

  ```js
  function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return null;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== 'object') return obj;
    if (hash.has(obj)) return hash.get(obj); // 循环引用处理

    let clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone);

    Object.keys(obj).forEach(
      key => (clone[key] = deepClone(obj[key], hash))
    );

    return clone;
  }
  ```
  ### 4. `{ structuredClone() }`
  > 从JavaScript的2021规范开始，structuredClone() 函数被引入为Web平台的一部分。这个函数可以创建一个深度克隆的对象，而且它支持更多的数据类型，包括Map、Set、ArrayBuffer、DataView等，并且能够处理循环引用。
  ```js
  let clonedObj = structuredClone(originalObj);
  ```
  ### 5. `{  MessageChannel }`
  > 这是一个不太常见但有趣的方法，它利用了MessageChannel API来进行深度克隆。这种方法可以处理循环引用和一些内置类型，但它是异步的。
  ```js
  function deepCloneUsingMessageChannel(obj, callback) {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = ev => callback(ev.data);
    port1.postMessage(obj);
  }
  ```
  > 这个函数通过发送消息的方式来克隆对象，当消息被接收时，你会得到一个深度克隆的对象。
  
## 如何选择？

在选择深度克隆的方法时，你需要根据你的具体需求和环境来决定使用哪种方法。例如，如果你需要克隆复杂的对象或处理特殊的数据结构，`_.cloneDeep() `或 `structuredClone()` 可能是更好的选择。如果你的对象结构相对简单，`JSON.parse(JSON.stringify(obj))` 可能就足够了。如果你需要一个没有外部依赖的解决方案，那么**手动实现深度克隆**函数可能是必要的。