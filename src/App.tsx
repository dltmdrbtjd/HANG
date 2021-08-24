import React from 'react';
// route
import { ConnectedRouter } from 'connected-react-router';
import Route from './route/Route';
// history
import { history } from './redux/configureStore';
// components
import Header from './components/Header';
import Navigation from './components/Navigation';
import Alert from './components/Alert';

const App = (): React.ReactElement => {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <Route />
      <Navigation />

      <Alert />
    </ConnectedRouter>
  );
};

export default App;
