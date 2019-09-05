import dotenv from 'dotenv';
import React from 'react';
import './config/ReactotronConfig';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import Routes from './routes';

import 'font-awesome/css/font-awesome.css';
import './styles.css';

dotenv.config();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <>
        <Routes />
        <ToastContainer autoClose={5000} />
      </>
    </PersistGate>
  </Provider>
);

export default App;
