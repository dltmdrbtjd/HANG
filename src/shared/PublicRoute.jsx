import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './cookie';

const PublicRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (isLogin() ? <Redirect to="/" /> : <Component />)}
    />
  );
};

export default PublicRoute;
