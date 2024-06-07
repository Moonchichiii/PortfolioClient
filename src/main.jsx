import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/Store';
import { CurrentUserProvider } from './context/CurrentUserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

console.log('Starting rendering...');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </Provider>
  </React.StrictMode>,
);
console.log('Rendering completed.');

console.log('Initial store state:', store.getState()); // Log initial store state

store.subscribe(() => {
  console.log('Store updated:', store.getState()); // Log updated store state
});
