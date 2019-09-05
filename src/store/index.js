import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import sagas from './sagas';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const middlewares = [];
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
middlewares.push(sagaMiddleware);

const composer =
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...middlewares),
        console.tron.createEnhancer()
      )
    : applyMiddleware(...middlewares);

const saveSubsetFilterUsersData = createFilter('users', ['data']);

const usersPersistConfig = {
  key: 'users',
  storage,
  whitelist: ['users'],
  transforms: [saveSubsetFilterUsersData],
};

const persistedReducer = persistReducer(usersPersistConfig, reducers);

const store = createStore(persistedReducer, composer);

const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
