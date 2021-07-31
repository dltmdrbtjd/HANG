import React from 'react';

// Router
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// redux
import { history } from './redux/configureStore';
// components
import Section from './components/Section';
import Header from './components/Header';
import Navigation from './components/Navigation';
// pages
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Detail from './pages/Detail';
import GuideRequest from './pages/Detail/GuideRequest';
import Favorite from './pages/Favorite';
import MyPage from './pages/MyPage';
import Noti from './pages/Noti';

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
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/noti" exact component={Noti} />
        </Switch>
      </Section>

      <Navigation />
    </ConnectedRouter>
  );
}

export default App;
