import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router';

// import IndexPage from './routes/IndexPage';

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const IndexPage = routerData['/'].component;
  const BasicProfile = routerData['/profile/basic'].component;
  const AdvancedProfile = routerData['/profile/advanced'].component;
  console.log(routerData);


  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/profile/basic" exact component={BasicProfile} />
        <Route path="/profile/advanced" exact component={AdvancedProfile} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
