// 简单理解 call 是调用执行一个函数而 put 则是相当于 dispatch 执行一个 action，而 select 则可以用来访问其它 model

import md5 from 'js-md5'
import { routerRedux } from 'dva/router';
import { apiLogin, genUUID } from '../services/login.js'
import { setToken } from '../utils/auth'

export default {
  namespace: 'login',
  state: {
    token: null,  // 登录token
  },
  effects: {
    *query({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(genUUID);

      const uuids = data.data.uuid
      const password = md5(payload.password)
      const par = {
        uuid: uuids,
        encryptPwd: md5(password + uuids),
        loginName: payload.username,
      }
      const user  = yield call(apiLogin, par.uuid, par.encryptPwd, par.loginName);

      if (user.data.code === '0') {
        setToken(user.data.data.token)
        yield put({
          type: 'querySuccess',
          payload: { ...user.data.data }
        });

        yield put(routerRedux.replace('/login'))
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
    showLoading(state, action){
      return { ...state, loading: true };
    }, // 控制加载状态的 reducer
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    // 使用服务器数据返回
    querySuccess(state, action){
      console.log(action)
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
