import './style.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './app/App';
import { store, persistor } from './app/store';
import { toggleDebug } from './app/debugState';

// Add global debug mode toggle function if in dev environment
if (import.meta.env.DEV) {
  window.toggleDebugMode = () => {
    store.dispatch(toggleDebug());
  };
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('game-container'),
);
