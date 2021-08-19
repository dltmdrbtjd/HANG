import React from 'react';
// route
import { ConnectedRouter } from 'connected-react-router';
import Route from './route/Route';
// history
import { history } from './redux/configureStore';

const App = (): React.ReactElement => {
  return (
    <ConnectedRouter history={history}>
      <Route />
    </ConnectedRouter>
  );
};

export default App;
