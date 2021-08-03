import React, { useEffect } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// Router
import { Route, Switch, useLocation } from 'react-router-dom';
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
import MyPromise from './pages/MyPage/Promise';
import MyPageModify from './pages/MyPage/Modify';
import CreateTrip from './pages/MyPage/CreateTrip';
import Noti from './pages/Noti';
import Chat from './pages/Chat';
import ChatRoom from './pages/Chat/Room';
// reducer
import { UserCreators } from './redux/modules/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserCreators.userAuthDB());
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Header />

      <Section>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/onboarding/:page" exact component={Onboarding} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/search" exact component={Search} />
          <Route path="/detail" exact component={Detail} />
          <Route path="/detail/request" exact component={GuideRequest} />
          <Route path="/favorite" exact component={Favorite} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/mypage/promise" exact component={MyPromise} />
          <Route path="/mypage/modify" exact component={MyPageModify} />
          <Route path="/mypage/create_trip" exact component={CreateTrip} />
          <Route path="/noti" exact component={Noti} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/chat/room" exact component={ChatRoom} />
        </Switch>
      </Section>

      <Navigation />
    </ConnectedRouter>
  );
}

export default App;
