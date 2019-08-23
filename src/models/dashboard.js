// 简单理解 call 是调用执行一个函数而 put 则是相当于 dispatch 执行一个 action，而 select 则可以用来访问其它 model
// 列表查询
// model 包含了五个属性，各个属性的含义如下：

// namespace：命名空间，同时也是他在全局 state 上的属性名。
// state：初始 state。
// subscriptions：订阅数据源，然后根据需要 dispatch 相应的 action。
// effects：用于处理异步操作和业务逻辑，不直接修改 state。可以指定 type，写法参考上文 takeLatest
// reducers：同 redux 中的 redur 一样，用于处理同步操作，唯一可以修改 state 的地方。
// 处理异步请求

import { routerRedux } from 'dva/router'
import { apiUserDetail, userPermission } from '../services/login.js'
import { getToken, removeToken } from '../utils/auth.js'

export default {
  namespace: 'user',
  state: {
    entityInfo: {},
    umGroup: {},
    roles: [],
    umUser: {},
  },
  // Quick Start 已经介绍过 subscriptions 的概念，这里不在多说
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'query',
            payload: {}
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const token = getToken()
      const { data } = yield call(apiUserDetail, token);
      if (data.code === '0') {
        const userInfo = data.data
        yield put({
          type: 'querySuccess',
          payload: {...userInfo}
        });

        // 获取用户权限菜单
        const par = {
          user_id: userInfo.umUser.user_id,
          entity_type: userInfo.umGroup.entity_type,
          user_type: userInfo.umUser.user_type
        }
        const { routerList } = yield call(userPermission, par);
        console.log(routerList)
        window.sessionStorage.odata = JSON.stringify(routerList)

      } else {
        removeToken()
        yield put(routerRedux.push('/login'))
      }
    },
    *create(){},
    *'delete'(){},
    *update(){},
  },
  reducers: {
    showLoading(state, action){
      return { ...state, loading: true };
    }, // 控制加载状态的 reducer
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    // 使用服务器数据返回
    querySuccess(state, action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}
