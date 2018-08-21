import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';

const { AuthorizedRoute } = Authorized;
// import IndexPage from './routes/IndexPage';

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  // console.log(routerData);
  const IndexPage = routerData['/'].component;
  const BasicProfile = routerData['/profile/basic'].component;
  const AdvancedProfile = routerData['/profile/advanced'].component;
  const User = routerData['/user'].component;

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/user" component={User} />
        <AuthorizedRoute
            path="/profile"
            render={props => <BasicProfile {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user"
          />
        {
          /**
           * 
           * <Route path="/profile/basic" exact component={BasicProfile} />
            <Route path="/profile/advanced" exact component={AdvancedProfile} />
           */
        }
        
      </Switch>
    </Router>
  );

  // return (
  //   <Router history={history}>
  //     <Switch>
  //       <Route path="/user" component={User} />
  //       <Route path="/" exact component={IndexPage} />
  //       <Route path="/profile/basic" exact component={BasicProfile} />
  //       <Route path="/profile/advanced" exact component={AdvancedProfile} />
  //     </Switch>
  //   </Router>
  // );
}

export default RouterConfig;
