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
      yield put({
        type: 'saveLogin',
        payload
      });
      reloadAuthorized();
      let urlParams;
      let redirect; 
      try {
        urlParams = new URL(window.location.href);
        redirect = urlParams.searchParams.get('redirect');
      }
      finally {

      }
      if(redirect) {
        urlParams.searchParams.delete('redirect');
        window.history.replaceState(null, 'redirect', urlParams.href);
        yield put(routerRedux.push(redirect));
      }
      else {
        yield put(routerRedux.push('/'));
      }

      console.log('loginModel:', redirect);
      
      
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