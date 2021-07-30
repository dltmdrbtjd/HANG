import { createStore, combineReducers, applyMiddleware } from 'redux';

// middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// redux router
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

// reducer
import image from './modules/image';

const history = createBrowserHistory();
const rootReducer = combineReducers({
  image,
  router: connectRouter(history),
});

// history 넣기, 로거사용
const middleware = [thunk.withExtraArgument({ history }), logger];

// 미들웨어와 리듀서 묶어서 store생성
const store = createStore(rootReducer, applyMiddleware(...middleware));
export { history };

export default store;
