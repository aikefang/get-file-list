# 遍历文件路径
## 安装
```javascript
npm install get-file-list --save
```
## 使用方法
```javascript
let fileList = require('get-file-list')
let test = async () => {
  await fileList.config({
    path: './test', // 绝对路径
    type: '.css|.js', // 允许遍历的文件类型（详情请查看下文文档）
  })
  let list = await fileList.run()
  console.log(list)
}
```


## 版本 v1.0.* 参数详解
#### `path {String} `
```
必填
文件夹绝对路径
```

#### `type {String} `
```
非必填
允许遍历的文件类型（多种类型用'|'分割）
默认：.js
有type则覆盖默认值
{
    type: '.css|.js',
}
```

## 示例
```
let pluginFile = path.resolve('plugins')
// 遍历组件文件目录
let eachPlugin = async (pluginFile) => {
  await getFileList.config({
    path: pluginFile
  })
  let list = await getFileList.run()
  console.log(list)
}
eachPlugin(pluginFile)
```