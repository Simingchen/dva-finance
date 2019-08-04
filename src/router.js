// 动态添加路由
import React from 'react';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  // 路由监听
  history.listen(location => {
    const uid = sessionStorage.getItem('uid') || localStorage.getItem("uid")
    console.log(location.pathname)
    if (location.pathname === '/' || location.pathname === '/login') {
      if (uid) {
        app._store.dispatch(routerRedux.replace('/backstage'))
      }
    } else {
      if (!uid) {
        app._store.dispatch(routerRedux.push('/'))
      }
    }
  })
//   const error = dynamic({
//     app,
//     component: () => import('./views/error.jsx'),
//   });
   
    
  // >>>>>>>>>>>>>>>路由数组 START <<<<<<<<<<<<<<<
  let routes = [
      {
          path: '/login',
          models: () => [import('./models/login.js')],
          component: () => import('./views/login.jsx'),
      }
  ];
  // >>>>>>>>>>>>>>>路由数组 END <<<<<<<<<<<<<<<

  // 将数据源转换为 <Router > 标签的形式........
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/dashboard" />)} />
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