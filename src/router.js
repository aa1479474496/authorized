import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';

const { AuthorizedRoute } = Authorized;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  // console.log(routerData);
  const IndexPage = routerData['/'].component;
  const BasicLayout = routerData['/auth'].component;
  const List = routerData['/list'].component;
  const NotFound = routerData['/exception/404'].component;
  const NotAuth = routerData['/exception/403'].component;
  const User = routerData['/user'].component;

  return (
    <Router history={history}>
      <Switch>    
        <Route path="/user" component={User} />       
        <AuthorizedRoute
          path="/auth"
          render={props => <BasicLayout {...props} />}
          authority={['admin', 'user']}
          redirectPath="/user"
        />
        <Route path="/list" exact component={List} />  
        <Route path="/exception/403" exact component={NotAuth} />  
        <Route path="/" exact component={IndexPage} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

