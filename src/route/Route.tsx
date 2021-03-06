import React from 'react';
// route
import { history } from 'src/redux/configureStore';
import { Switch } from 'react-router-dom';
import Tutorial from 'src/pages/Tutorial';
import Minitutorial from 'src/pages/Tutorial/MiniTutorial/indx';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
// components
import Section from '../elements/Section';
// pages
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Onboarding from '../pages/Onboarding';
import ForgotPassword from '../pages/SignUp/ForgotPassword';
import Search from '../pages/Search';
import Detail from '../pages/Detail';
import GuideRequest from '../pages/Detail/GuideRequest';
import Favorite from '../pages/Favorite';
import MyInfo from '../pages/MyPage/MyInfo';
import MyPromise from '../pages/MyPage/Promise';
import Block from '../pages/MyPage/BlockUser';
import MyPageModify from '../pages/MyPage/ModifyMyInfo';
import CreateTrip from '../pages/MyPage/CreateTrip';
import Noti from '../pages/Noti';
import Chat from '../pages/Chat';
import ChatRoom from '../pages/Chat/Room';
import NotFound from '../pages/NotFound';
// pathname
import { pathURI } from './Path';

const Route = () => {
  React.useEffect(() => {
    const sawOnboarding = localStorage.getItem('onboarding');

    if (!sawOnboarding) history.replace('/onboarding');
  }, []);

  return (
    <>
      <Section>
        <Switch>
          <PublicRoute path={pathURI.onboarding} component={Onboarding} exact />
          <PublicRoute
            path={pathURI.signIn}
            restricted
            component={SignIn}
            exact
          />
          <PublicRoute
            path={pathURI.signUp}
            restricted
            component={SignUp}
            exact
          />

          <PublicRoute
            path={pathURI.forgotPwd}
            restricted
            component={ForgotPassword}
            exact
          />
          <PrivateRoute path={pathURI.home} component={Home} exact />
          <PrivateRoute path={pathURI.favorite} component={Favorite} exact />
          <PrivateRoute path={pathURI.search} component={Search} exact />
          <PrivateRoute path={pathURI.detail} component={Detail} exact />
          <PrivateRoute path={pathURI.request} component={GuideRequest} exact />
          <PrivateRoute path={pathURI.mypage} component={MyInfo} exact />
          <PrivateRoute path={pathURI.promise} component={MyPromise} exact />
          <PrivateRoute
            path={pathURI.createTrip}
            component={CreateTrip}
            exact
          />
          <PrivateRoute path={pathURI.chat} component={Chat} exact />
          <PrivateRoute path={pathURI.chatRoom} component={ChatRoom} exact />
          <PrivateRoute path={pathURI.block} component={Block} exact />
          <PrivateRoute
            path={pathURI.modifyMyInfo}
            component={MyPageModify}
            exact
          />
          <PrivateRoute path={pathURI.noti} component={Noti} exact />
          <PrivateRoute
            path={pathURI.minitutorial}
            component={Minitutorial}
            exact
          />
          <PrivateRoute path={pathURI.tutorial} component={Tutorial} exact />
          <PublicRoute component={NotFound} />
        </Switch>
      </Section>
    </>
  );
};

export default Route;
