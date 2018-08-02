import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router';

// import IndexPage from './routes/IndexPage';

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const IndexPage = routerData['/'].component;
  console.log(routerData);


  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
