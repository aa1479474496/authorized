import React, { Component } from 'react';
import { connect } from 'dva';


export default class Login extends Component {
  render() {
    return (
      <div>
        <h3>login</h3>
        <button>以admin身份登录</button>
        <button style={{marginLeft: '20px'}}>以user身份登录</button>
      </div>
    )
  }
}