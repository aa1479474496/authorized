import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'dva/router';
import { connect } from 'dva';
import { getRoutes } from '../../utils/utils';
@connect()
export default class User extends Component {
  render() {
    const { match, routerData, location } = this.props;
    let fromPath = location.state && location.state.fromPath || '';
    if (fromPath) {
      fromPath = encodeURIComponent(fromPath)
    }
    const routes = getRoutes(match.path, routerData);
    return (
      <div>
        <h1>User 中心</h1>
        <hr />
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}

          <Redirect exact from="/user" to={{ pathname: '/user/login', search:`?redirect=${fromPath}`}} />
        </Switch>
      </div>
    )
  }
}
