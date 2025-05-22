import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux'; 
import { PersistGate } from 'redux-persist/integration/react';

// En desarrollo, no usamos PersistGate para evitar problemas con el estado persistido que se pone en null
// En producción, usamos PersistGate para mantener el estado guardado entre recargas

const isProd = false

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {isProd ? (
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    ) : (
      <App />
    )}
  </Provider>
);
