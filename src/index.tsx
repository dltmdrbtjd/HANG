import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// theme
import GlobalThemeProvider from './styles/GlobalThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalThemeProvider>
        <App />
      </GlobalThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
reportWebVitals();
