import React from 'react';
import ReactDOM from 'react-dom';
// redux store
import { Provider } from 'react-redux';
import store from './redux/configureStore';
// service worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// theme
import GlobalThemeProvider from './styles/GlobalThemeProvider';
// app
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GlobalThemeProvider>
        <App />
      </GlobalThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
reportWebVitals();
