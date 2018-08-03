import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';

import Login from './Login';
import Register from './Register';

export default class User extends Component {
  render() {
  // console.log(this.props);

    return (
      <div>
        <h1>User 中心</h1>
        <hr/>
        <Switch>
          <Route path="/user/login" exact component={Login} />
          <Route path="/user/register" exact component={Register} />
          <Redirect exact from="/user" to="/user/login" />
        </Switch>

      </div>
    )
  }
}
