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
    },
  },
  effects: {
    *login({ payload }, { put }) {
      yield put({
        type: 'saveLogin',
        payload
      });
      reloadAuthorized();
      let urlParams;
      let redirect;
      try {
        urlParams = window.location.href;
        redirect = decodeURIComponent(urlParams.split('redirect=')[1]);
      }
      finally {
      }
      if (redirect) {
        yield put(routerRedux.replace(redirect));
      }
      else {
        yield put(routerRedux.push('/'));
      }
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