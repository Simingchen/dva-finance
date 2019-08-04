// 简单理解 call 是调用执行一个函数而 put 则是相当于 dispatch 执行一个 action，而 select 则可以用来访问其它 model
// 处理异步请求
import { routerRedux } from 'dva/router';
import { apiUserDetail } from '../services/login.js';
import { getToken } from '../utils/auth' // 验权

export default {
  namespace: 'user',
  state: {
    entityInfo: {},
    roles: [],
    umGroup: {},
    umUser: {},
  },
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
    *query({ payload }, { select, call, put }) {  // 获取用户信息
      yield put({ type: 'showLoading' });
      const token = getToken()
      const { data } = yield call(apiUserDetail, token);
      console.log(data)
      if (data.code === '0') {
        yield put({
          type: 'querySuccess',
          payload: { ...data.data}
        });
      } else {
        yield put( routerRedux.push('/login') ); // 路由跳转
      }
    },
    *create(){},
    *'delete'(){},
    *update(){},
    // 示例
    // *fetch({payload}, {call, put, select, take}) {  // eslint-disable-line
    //     yield take('auth/getMemberInfo/@@end');
    //     const {info} = yield select(state => state.auth);
    //     const {data, err} = yield call(service.get, info.id);
    //     if(err){
    //     } else {
    //         yield put({type: 'save', payload: {...data}});
    //     }
    // }
  },
  reducers: {
    showLoading (state, action) {
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
    // 示例
    save(state, action) {
        return {...state, ...action.payload};
    },
  }
}
