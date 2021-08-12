import React from 'react';
// Router
import { ConnectedRouter } from 'connected-react-router';
import PublicRoute from './Route/PublicRoute';
import Route from './Route/Route';
// history
import { history } from './redux/configureStore';
// components
import Section from './components/Section';
import Header from './components/Header';
import Navigation from './components/Navigation';
// page
import Onboarding from './pages/Onboarding';
// pathname
import { pathURI } from './Route/Path';

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <PublicRoute path={pathURI.onboarding} component={Onboarding} exact />

      <Section>
        <Route />
      </Section>

      <Navigation />
    </ConnectedRouter>
  );
};

export default App;
