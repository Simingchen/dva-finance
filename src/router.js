// 动态添加路由
import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken, removeToken } from './utils/auth' // 验权
import Layout from './views/layout/Layout.jsx'
import page from './views/IndexPage.jsx'
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
      removeToken()
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
      'Layout': Layout,
      models: () => [import('./models/user.js')],
      component: () => import('./views/IndexPage.jsx'),
      'children': [
        {
          'path': '/',
          'component': page,
          'name': 'index',
          'hidden': true,
          'meta': { 'title': '客户详情', 'noCache': false }
        }
      ]
    },
    {
      path: '/login',
      models: () => [import('./models/login.js')],
      component: () => import('./views/login.jsx'),
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
          routes.map(({ path, name, children, ...dynamics }, index) => {
            console.log(children)
            if (children) {
              return (
                // <Layout>
                <Route path={path} key={index} exact component={dynamic({ app, ...dynamics })} />
                  // {
                  //   children.map((route, key) => {
                  //     console.log(key)
                  //     return (
                  //       <Route key={key} exact path={route.path} component={route.component} />
                  //     )
                  //   })
                  // }
                /* </Layout> */
              )
            } else {
              return (
                <Route path={path} key={index} exact component={dynamic({ app, ...dynamics })} />
              )
            }
          })
        }
      </Switch>
    </ConnectedRouter>
  );
}

export default RouterConfig;
