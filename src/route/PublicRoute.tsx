import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { signInStatus } from 'src/globalState/signInStatus';

interface Public {
  component: React.ElementType;
  path?: string;
  restricted?: boolean;
  exact?: boolean | undefined;
}

const PublicRoute = ({ component: Component, restricted, ...rest }: Public) => {
  const { isLogIn } = React.useContext(signInStatus);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogIn && restricted ? <Redirect to="/" /> : <Component {...props} />
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
