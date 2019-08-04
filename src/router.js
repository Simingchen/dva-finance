// 动态添加路由
import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from './utils/auth' // 验权
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  // 路由监听
  NProgress.start()
  history.listen(location => {
    NProgress.start()
    const token = getToken()
    if (token) {
      if (location.pathname === '/login') {
        app._store.dispatch(routerRedux.push('/'))
        NProgress.done()
      }
    } else {
      app._store.dispatch(routerRedux.push('/login'))
    }
    NProgress.done()
  })
//   const error = dynamic({
//     app,
//     component: () => import('./views/error.jsx'),
//   });
   
    
  // >>>>>>>>>>>>>>>路由数组 START <<<<<<<<<<<<<<<
  let routes = [
    {
      path: '/',
      models: () => [import('./models/user.js')],
      component: () => import('./views/IndexPage.jsx'),
      'children': [
        {
          'path': 'customerDetails',
          'component': 'customerManagement/customerDetails',
          'name': 'CustomerDetails',
          'hidden': true,
          'meta': { 'title': '客户详情', 'noCache': false }
        }
      ]
    },
    {
      path: '/login',
      models: () => [import('./models/login.js')],
      component: () => import('./views/login.jsx'),
      'children': [
        {
          'path': 'customerDetails',
          'component': 'customerManagement/customerDetails',
          'name': 'CustomerDetails',
          'hidden': true,
          'meta': { 'title': '客户详情', 'noCache': false }
        }
      ]
    },
    // { // 订单管理
    //   'path': '/orderManagement',
    //   'component': 'Layout',
    //   'redirect': 'noredirect',
    //   'hidden': false,
    //   'alwaysShow': true,
    //   'name': 'Orderanagement',
    //   'meta': { 'title': '订单管理', 'icon': 'dingdan' },
    //   'children': [
    //     {
    //       'path': 'orderList',
    //       'component': 'orderManagement/orderList',
    //       'name': 'OrderList',
    //       'meta': { 'title': '订单列表', 'noCache': false }
    //     }
    //   ]
    // }
    
  ];
  // >>>>>>>>>>>>>>>路由数组 END <<<<<<<<<<<<<<<

  // 将数据源转换为 <Router > 标签的形式........
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {/* <Route path="/" exact render={() => (<Redirect to="/dashboard" />)} /> */}
        {
          routes.map(({ path, name, ...dynamics }, index) => {
            return (
              <Route path={path} key={index} exact component={dynamic({ app, ...dynamics })} />
            )
          })
        }
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;