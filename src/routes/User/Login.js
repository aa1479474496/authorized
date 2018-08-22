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
    return (
      <div>
        <h3>login</h3>
        <button onClick={() => this.login('admin')}>以admin身份登录</button>
        <button onClick={() => this.login('user')} style={{marginLeft: '20px'}}>以user身份登录</button>
      </div>
    )
  }
}