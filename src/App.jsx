import React from 'react';
// route
import { ConnectedRouter } from 'connected-react-router';
import Route from './route/Route';
// history
import { history } from './redux/configureStore';
// components
import Section from './components/Section';
import Header from './components/Header';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <Route />

      <Navigation />
    </ConnectedRouter>
  );
};

export default App;
