import React from 'react';

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// redux
import { history } from './redux/configureStore';
// pages
import Home from './pages/Home/index';
// components
import { Section } from './elements/index';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Section>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Section>
    </ConnectedRouter>
  );
}

export default App;
