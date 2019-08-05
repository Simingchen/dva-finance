## 问题
1. 跨域请求失败<br>
在请求head上添加 mode: 'no-cors',当然前提是后台设置了 access-orgin 为 '*',允许跨域
2. 设置端口 8000<br>
在package.json的 scripts 命令行更改 "start": "set port=8000 && roadhog server",
3. 添加地址代理
在.webpackrc文件添加proxy代理地址
4. 路由跳转
this.props.history.push("/")
5，动态添加路由
router.js 独立路由列表，权限路由表由后台配置
6，解决全局监听路由判断用户
建立首页订阅用户数据，如果用户数据为空，返回登录
