import React from 'react';

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// redux
import { history } from './redux/configureStore';
// components
import Section from './components/Section';
import Header from './components/Header/index';
import Navigation from './components/Navigation/index';
// pages
import Onboarding from './pages/Onboarding';
import Home from './pages/Home/index';
import Login from './pages/Login/index';
import SignUp from './pages/SignUp/index';
import Search from './pages/Search/index';
import Detail from './pages/Detail';
import GuideRequest from './pages/Detail/GuideRequest';
import Favorite from './pages/Favorite';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <Section>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/onboarding/:page" exact component={Onboarding} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup/:page" exact component={SignUp} />
          <Route path="/search" exact component={Search} />
          <Route path="/detail" exact component={Detail} />
          <Route path="/detail/request" exact component={GuideRequest} />
          <Route path="/favorite" exact component={Favorite} />
        </Switch>
      </Section>

      <Navigation />
    </ConnectedRouter>
  );
}

export default App;
