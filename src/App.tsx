import React from 'react';
// route
import { ConnectedRouter } from 'connected-react-router';
import Route from './Route/Route';
// history
import { history } from './redux/configureStore';
// components
import Header from './components/Header';
import Navigation from './components/Navigation';

const App = (): React.ReactElement => {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <Route />
      <Navigation />
    </ConnectedRouter>
  );
};

export default App;
