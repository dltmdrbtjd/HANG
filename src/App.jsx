import React from 'react';

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// redux
import { history } from './redux/configureStore';
// components
import { Section } from './elements/index';
import Header from './components/Header/index';
// pages
import Home from './pages/Home/index';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <Section>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Section>
    </ConnectedRouter>
  );
}

export default App;
