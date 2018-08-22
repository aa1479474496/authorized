import { routerRedux } from 'dva/router';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

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
      yield put ({
        type: 'saveLogin',
        payload
      });
      reloadAuthorized();
      yield put(routerRedux.push('/'));
    }
  },

  reducers: {
    saveLogin(state, { payload }) {
      setAuthority(payload.auth);
      return {
        ...state,
        ...payload
      }
    }
  }
}