import React, { Component } from 'react';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import NotFound from '../routes/Exception/404';

const { AuthorizedRoute } = Authorized;

export default class BasicLayout extends Component {
  render() {
    const { match, routerData } = this.props;
    const layout = (
      <Switch>
        {getRoutes(match.path, routerData).map(item => (
          <AuthorizedRoute 
            key={item.key}
            path={item.path}
            component={item.component}
            exact={item.exact}
            authority={item.authority}
            redirectPath="/exception/403"
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    );
    return (
      <div>
        <h1>页面入口</h1>
        <div>{layout}</div>
      </div>
    )
  }
}