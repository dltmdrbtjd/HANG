import { createStore, combineReducers, applyMiddleware } from 'redux';

// middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// redux router
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

// reducer
// import image from './modules/image';
// import home from './modules/home';
// import search from './modules/search';
// import user from './modules/user';
// import favorite from './modules/favorite';
// import mypage from './modules/mypage';
// import detail from './modules/detail';
// import alarm from './modules/alarm';
// import toastMessage from './modules/toastMessage';
// import chat from './modules/chat';

const history = createBrowserHistory();
const rootReducer = combineReducers({
  // toastMessage,
  // detail,
  // user,
  // favorite,
  // image,
  // home,
  // search,
  // mypage,
  // alarm,
  // chat,
  router: connectRouter(history),
});

// history 넣기, 로거사용
const middleware = [thunk.withExtraArgument({ history }), logger];

// 미들웨어와 리듀서 묶어서 store생성
const store = createStore(rootReducer, applyMiddleware(...middleware));
export { history };

export default store;