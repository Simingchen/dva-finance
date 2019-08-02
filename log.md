## 问题
1. 跨域请求失败<br>
在请求head上添加 mode: 'no-cors',当然前提是后台设置了 access-orgin 为 '*',允许跨域
2. 设置端口 8000<br>
在package.json的 scripts 命令行更改 "start": "set port=8000 && roadhog server",

