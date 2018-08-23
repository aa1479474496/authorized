import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import { getRoutes } from '../../utils/utils';
// import Login from './Login';
// import Register from './Register';
// <Redirect exact from="/user" to="/user/login" />
@connect()
export default class User extends Component {
  render() {
    const { match, routerData, location } = this.props;

    console.log('user props:', this.props);

    const fromPath = location.state && location.state.fromPath || '';
    // if (fromPath) {



    //   try {
    //     const urlParams = new URL(window.location.href);
    //     urlParams.searchParams.set('redirect', fromPath);
    //     window.history.replaceState(null, 'login', urlParams.href);
    //   }
    //   finally {

    //   }
    // }



    console.log('fromPath:',fromPath);
    const routes = getRoutes(match.path, routerData);
    return (
      <div>
        <h1>User 中心</h1>
        <hr />
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}

          <Redirect exact from="/user" to={{ pathname: "/user/login", state: { fromPath } }} />
        </Switch>
      </div>
    )
  }
}
