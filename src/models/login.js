// 简单理解 call 是调用执行一个函数而 put 则是相当于 dispatch 执行一个 action，而 select 则可以用来访问其它 model
// 列表查询
// export function apiCommodityList (par) {
//   return req({
//     url: 'admin/appManager/appPagedResult.do',
//     method: 'POST',
//     data: Object.assign({}, par)
//   })
// }
// 处理异步请求
import { apiLogin} from '../services/login.js';

export default {
  namespace: 'login',
  state: {
    list: [],
    total: null,
    loading: true, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },
  effects: {
    *query({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(apiLogin);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.dataList,
            total: data.data.summary.totalRecord,
            current: 1
          }
        });
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
