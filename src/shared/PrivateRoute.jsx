import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './cookie';

const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={() => (isLogin() ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
