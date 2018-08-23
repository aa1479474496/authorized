import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ login }) => ({
  login
}))
export default class Login extends Component {
  login = (auth) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: {
        login: true,
        auth
      }
    })
  }
  render() {
    console.log('login:', this.props);
    const {
      login: { auth },
      location
    } = this.props;

    const fromPath = location.state && location.state.fromPath || '';
    console.log(window.location.href, ":", fromPath);
    if (fromPath) {
      try {
        const urlParams = new URL(window.location.href);
        urlParams.searchParams.set('redirect', fromPath);
        window.history.replaceState(null, 'login', urlParams.href);
      }
      finally {
      }
    }

    const authTitle = () => {
      if (!auth) {
        return (
          <span>暂未登录</span>
        )
      }
      return (
        <span>现在是以{auth}权限登录</span>
      )
    }

    return (
      <div>
        <h3>login----{authTitle()}</h3>
        <button onClick={() => this.login('admin')}>以admin身份登录</button>
        <button onClick={() => this.login('user')} style={{ marginLeft: '20px' }}>以user身份登录</button>
      </div>
    )
  }
}