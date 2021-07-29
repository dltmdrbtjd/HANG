import React from 'react';

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// redux
import { history } from './redux/configureStore';
// components
import { Section } from './elements/index';
import Header from './components/Header/index';
import Navigation from './components/Navigation/index';
// pages
import Home from './pages/Home/index';
import Login from './pages/Login/index';
import SignUp from './pages/SignUp/index';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <Section>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </Section>
      <Navigation />
    </ConnectedRouter>
  );
}

export default App;
