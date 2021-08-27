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
// user info
import { getUserInfo } from './shared/userInfo';
import { signInStatus } from './globalState/signInStatus';
// global state
import ChatStatus from './globalState/chatStatus';

const App = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { isLogIn } = React.useContext(signInStatus);

  React.useEffect(() => {
    if (isLogIn) {
      const { userPk } = getUserInfo('userInfo');

      dispatch(MyPageCreators.fetchGetMyInfo(userPk));
      dispatch(MyPageCreators.fetchGetMyPromise());
      dispatch(MyPageCreators.fetchGetBlockList());
    }
  }, [isLogIn]);

  return (
    <ConnectedRouter history={history}>
      <ChatStatus>
        <Header />

        <Route />
        <Navigation />

        <Alert />
      </ChatStatus>
    </ConnectedRouter>
  );
};

export default App;
