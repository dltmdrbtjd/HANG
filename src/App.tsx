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
// global state
import ToastMessage from './components/ToastMessage';
import SignInStatus from './globalState/signInContext';

const App = (): React.ReactElement => {
  return (
    <ConnectedRouter history={history}>
      <SignInStatus>
        <Header />

        <Route />
        <Navigation />

        <Alert />
        <ToastMessage />
      </SignInStatus>
    </ConnectedRouter>
  );
};

export default App;
