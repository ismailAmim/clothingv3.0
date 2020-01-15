import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk  from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [thunk];

// if we are in dev mode we show the logger
if (process.env.NODE_ENV ==='development')
{
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistStore };
