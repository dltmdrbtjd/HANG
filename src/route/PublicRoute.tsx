import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from 'src/shared/token';

interface Public {
  component: React.ElementType;
  path?: string;
  restricted?: boolean;
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
  restricted: false,
  path: '',
};

export default PublicRoute;
