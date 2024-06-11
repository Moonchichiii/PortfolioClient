import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/Store';
import { CurrentUserProvider } from './context/CurrentUserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </Provider>
  </React.StrictMode>,
);
store.subscribe(() => {
});



