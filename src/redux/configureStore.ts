import { createStore, compose, applyMiddleware } from 'redux';
// middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// redux router
import { createBrowserHistory } from 'history';
// reducer
import rootReducer from './modules';

export const history = createBrowserHistory();

// history 넣기, 로거사용
const middleware = [thunk.withExtraArgument({ history }), logger];

// Chrome Extension
// window 타입 선언
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
// Redux devTools 설정
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

// 미들웨어와 리듀서 묶어서 store생성
const store = createStore(rootReducer, enhancer);

export default store;