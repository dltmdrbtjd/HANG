import React, { useEffect } from 'react';
// redux
import { useDispatch } from 'react-redux';
// Router
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PublicRoute from './shared/PublicRoute';
import PrivateRoute from './shared/PrivateRoute';
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
import Welcome from './pages/SignUp/Welcome';
import Search from './pages/Search';
import Detail from './pages/Detail';
import GuideRequest from './pages/Detail/GuideRequest';
import Favorite from './pages/Favorite';
import MyPage from './pages/MyPage';
import MyPromiseDetail from './pages/MyPage/Promise/MyPromise';
import MyPageModify from './pages/MyPage/Modify';
import CreateTrip from './pages/MyPage/CreateTrip';
import Noti from './pages/Noti';
import Chat from './pages/Chat';
import ChatRoom from './pages/Chat/Room';
// reducer
import { UserCreators } from './redux/modules/user';
// cookie
import { getCookie } from './shared/cookie';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie()) dispatch(UserCreators.getUserInfoDB());
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Header />

      <Section>
        <Switch>
          <PublicRoute path="/login" component={Login} exact />
          <PublicRoute path="/signup" component={SignUp} exact />
          <PublicRoute path="/signup/welcome" component={Welcome} exact />
          <PublicRoute path="/onboarding" component={Onboarding} exact />
          <PrivateRoute path="/" component={Home} exact />
          <PrivateRoute path="/search" component={Search} exact />
          <PrivateRoute path="/detail" component={Detail} exact />
          <PrivateRoute path="/detail/request" component={GuideRequest} exact />
          <PrivateRoute path="/favorite" component={Favorite} exact />
          <PrivateRoute path="/mypage" component={MyPage} exact />
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
        </Switch>
      </Section>

      <Navigation />
    </ConnectedRouter>
  );
};

export default App;
