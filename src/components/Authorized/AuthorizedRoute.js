import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';
// noMatch={<Route {...rest} render={(props) => <Redirect to={{ pathname: redirectPath,state: {authority:123 }}} />} />}

class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, render, authority, redirectPath, ...rest } = this.props;  
    const fromPath = rest.location.pathname; 
    console.log('fromPath:', fromPath);
    return (
      <Authorized
        authority={authority}
        noMatch={<Route {...rest}  render={() => <Redirect to={{ pathname: redirectPath ,state: {fromPath}}} />}/>}
      >
        <Route {...rest} render={props => (Component ? <Component {...props} /> : render(props))} />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;