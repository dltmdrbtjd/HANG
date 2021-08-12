import React from 'react';
// route
import { Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
// components
import Section from '../components/Section';
// pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Onboarding from '../pages/Onboarding';
import Welcome from '../pages/SignUp/Welcome';
import Search from '../pages/Search';
import Detail from '../pages/Detail';
import GuideRequest from '../pages/Detail/GuideRequest';
import Favorite from '../pages/Favorite';
import MyInfo from '../pages/MyPage/MyInfo';
import MyPromise from '../pages/MyPage/Promise';
import MyPromiseDetail from '../pages/MyPage/Promise/MyPromise';
import MyPageModify from '../pages/MyPage/Modify';
import CreateTrip from '../pages/MyPage/CreateTrip';
import Noti from '../pages/Noti';
import Chat from '../pages/Chat';
import ChatRoom from '../pages/Chat/Room';
import NotFound from '../pages/NotFound';
// pathname
import { pathURI } from './Path';

const Route = () => {
  return (
    <>
      <PublicRoute path={pathURI.onboarding} component={Onboarding} exact />

      <Section>
        <Switch>
          <PublicRoute
            path={pathURI.logIn}
            restricted
            component={Login}
            exact
          />
          <PublicRoute
            path={pathURI.signUp}
            restricted
            component={SignUp}
            exact
          />
          <PublicRoute
            path={pathURI.welcome}
            restricted
            component={Welcome}
            exact
          />
          <PrivateRoute path={pathURI.home} component={Home} exact />
          <PrivateRoute path={pathURI.search} component={Search} exact />
          <PrivateRoute path={pathURI.detail} component={Detail} exact />
          <PrivateRoute path={pathURI.request} component={GuideRequest} exact />
          <PrivateRoute path={pathURI.favorite} component={Favorite} exact />
          <PrivateRoute path={pathURI.mypage} component={MyInfo} exact />
          <PrivateRoute path={pathURI.promise} component={MyPromise} exact />
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
          <PrivateRoute path={pathURI.noti} component={Noti} exact />
          <PrivateRoute path={pathURI.chat} component={Chat} exact />
          <PrivateRoute path={pathURI.chatRoom} component={ChatRoom} exact />
          <PublicRoute component={NotFound} exact />
        </Switch>
      </Section>
    </>
  );
};

export default Route;
