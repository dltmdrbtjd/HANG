import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../shared/cookie';

interface Public {
  component: React.ElementType;
  path: string;
  restricted: boolean | undefined;
  exact?: boolean | undefined;
}

const PublicRoute = ({ component: Component, restricted, ...rest }: Public) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

PublicRoute.defaultProps = {
  exact: false,
};

export default PublicRoute;
