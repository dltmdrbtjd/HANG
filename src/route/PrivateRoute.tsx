import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { signInStatus } from 'src/context/signInContext';

interface Private {
  component: React.ElementType;
  path: string;
  exact?: boolean | undefined;
}

const PrivateRoute = ({ component: Component, ...rest }: Private) => {
  const { isLogIn } = React.useContext(signInStatus);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

PrivateRoute.defaultProps = {
  exact: false,
};

export default PrivateRoute;
