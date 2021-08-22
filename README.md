# React17-ReactHook-TS4-Jira

React17+React Hook+TS4 模仿 Jira 项目，学习React相关知识。

# 解决方案

## antd

create-react-app 的默认配置进行自定义，这里我们使用 craco （一个对 create-react-app 进行自定义配置的社区解决方案）。

```md
yarn add @craco/craco
```

```json
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "__tests__": "react-scripts __tests__",
+   "start": "craco start",
+   "build": "craco build",
+   "__tests__": "craco __tests__",
}
```

## css in js

css in js 解决方案：https://emotion.sh/docs/introduction

## 错误边界

https://github.com/bvaughn/react-error-boundary

## React Hook 与 闭包的坑

## 路由

```md
1. react-router React Router 核心
2. react-router-dom 用于 DOM 绑定的 React Router
```

## 页面渲染

1. 看看具体引起了页面渲染 @welldone-software/why-did-you-render
2. useState 改变了 就会造成页面渲染
3. useEffect使用的时候注意

```js
import React, { useEffect, useState } from "react";
import "./styles.css";
// 基本类型，可以放到依赖里；组件状态，可以放到依赖里（useState创建的）；非组件状态的   对象（对象，数组，函数等） ，绝不可以放到依赖里，会造成死循环渲染
export default function App() {
  // 当obj是基本类型的时候，就不会无限循环
  // 当 obj是对象的时候，就会无限循环
  // 当 obj 是对象的state时，不会无限循环
  const [ obj, setObj ] = useState( { name: "Jack" } );
  // const obj = 1;
  // const obj = {name: 'Jack'}
  const [ num, setNum ] = useState( 0 );

  useEffect( () => {
    console.log( "effect" );
    setNum( num + 1 );
  }, [ obj ] );

  return (
    <div className="App">
      { num }
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
```

## useMemo和useCallback

默认情况下, 父组件的状态(state)发生变化,不仅会重新渲染自己,还会重新渲染其子组件。 在写自定义hook的时候要返回函数的时候（useCallback），
当我们使用了非基本类型的依赖，我们使用useMemo和useCallback来限制住
