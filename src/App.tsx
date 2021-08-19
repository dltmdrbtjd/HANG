import React from 'react';
// route
import { ConnectedRouter } from 'connected-react-router';
import Route from './route/Route';
// history
import { history } from './redux/configureStore';
// components
import Header from './components/Header';

const App = (): React.ReactElement => {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <Route />
    </ConnectedRouter>
  );
};

export default App;
