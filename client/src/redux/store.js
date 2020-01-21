import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddlewrare  from 'redux-saga';
// import thunk  from 'redux-thunk';
//import { fetchCollectionsStart} from './shop/shop.sagas';

import rootReducer from './root-reducer';
import rootSaga    from './root-saga';

const sagaMiddleware = createSagaMiddlewrare();
//const middlewares    = [thunk];
const middlewares    = [sagaMiddleware];
// if we are in dev mode we show the logger
if (process.env.NODE_ENV ==='development')
{
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistStore };
