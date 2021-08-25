import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { MyPageCreators } from 'src/redux/modules/MyPageModule/mypage';
// route
import { ConnectedRouter } from 'connected-react-router';
import Route from './route/Route';
// history
import { history } from './redux/configureStore';
// components
import Header from './components/Header';
import Navigation from './components/Navigation';
import Alert from './components/Alert';
// login status
import { isLogin } from './shared/token';
import { getUserInfo } from './shared/userInfo';

const App = (): React.ReactElement => {
  const dispatch = useDispatch();
  const userInfo = getUserInfo('userInfo');

  React.useEffect(() => {
    if (isLogin()) {
      const { userPk } = userInfo;

      dispatch(MyPageCreators.fetchGetMyInfo(userPk));
      dispatch(MyPageCreators.fetchGetMyPromise());
    }
  }, [userInfo]);

  return (
    <ConnectedRouter history={history}>
      <Header />

      <Route />
      <Navigation />

      <Alert />
    </ConnectedRouter>
  );
};

export default App;
