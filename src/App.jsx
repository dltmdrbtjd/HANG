import React from 'react';
// Router
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PublicRoute from './shared/PublicRoute';
import PrivateRoute from './shared/PrivateRoute';
// history
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
import Welcome from './pages/SignUp/Welcome';
import Search from './pages/Search';
import Detail from './pages/Detail';
import GuideRequest from './pages/Detail/GuideRequest';
import Favorite from './pages/Favorite';
import MyInfo from './pages/MyPage/MyInfo';
import MyPromise from './pages/MyPage/Promise';
import MyPromiseDetail from './pages/MyPage/Promise/MyPromise';
import MyPageModify from './pages/MyPage/Modify';
import CreateTrip from './pages/MyPage/CreateTrip';
import Noti from './pages/Noti';
import Chat from './pages/Chat';
import ChatRoom from './pages/Chat/Room';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <Header />

      <PublicRoute path="/onboarding" component={Onboarding} exact />

      <Section>
        <Switch>
          <PublicRoute path="/login" restricted component={Login} exact />
          <PublicRoute path="/signup" restricted component={SignUp} exact />
          <PublicRoute
            path="/signup/welcome"
            restricted
            component={Welcome}
            exact
          />
          <PrivateRoute path="/" component={Home} exact />
          <PrivateRoute path="/search" component={Search} exact />
          <PrivateRoute path="/detail" component={Detail} exact />
          <PrivateRoute path="/detail/request" component={GuideRequest} exact />
          <PrivateRoute path="/favorite" component={Favorite} exact />
          <PrivateRoute path="/mypage" component={MyInfo} exact />
          <PrivateRoute path="/mypage/promise" component={MyPromise} exact />
          <PrivateRoute
            path="/mypage/promise/:page"
            component={MyPromiseDetail}
            exact
          />
          <PrivateRoute path="/mypage/modify" component={MyPageModify} exact />
          <PrivateRoute
            path="/mypage/create_trip"
            component={CreateTrip}
            exact
          />
          <PrivateRoute path="/noti" component={Noti} exact />
          <PrivateRoute path="/chat" component={Chat} exact />
          <PrivateRoute path="/chat/room" component={ChatRoom} exact />
          <PublicRoute component={NotFound} exact />
        </Switch>
      </Section>

      <Navigation />
    </ConnectedRouter>
  );
};

export default App;
