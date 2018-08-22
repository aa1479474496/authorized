import React from 'react';
import { Route, Redirect } from 'dva/router';
import Authorized from './Authorized';
class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, render, authority, redirectPath, ...rest } = this.props;   
    console.log('aUTH:', this.props);
    return (
      <Authorized
        authority={authority}
        noMatch={<Route {...rest} render={(rest) => <Redirect to={{ pathname: redirectPath ,state: {authority: authority}}} />} />}
      >
        <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
        123
      </Authorized>
    );
  }
}

export default AuthorizedRoute;