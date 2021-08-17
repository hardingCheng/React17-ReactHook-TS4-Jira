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
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
```
