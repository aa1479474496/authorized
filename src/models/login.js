import { routerRedux } from 'dva/router';
// import Login from '../routes/User/Register';

export default {
  namespace: 'login',
  
  state: {
    status: 11
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      // console.log(111);
    },
  },
  effects: {
    *login({ payload }, { put }) {
      console.log(222);
      yield put ({
        type: 'saveLogin',
        payload
      });
    }
  },

  reducers: {
    saveLogin(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }



}