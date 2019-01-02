import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  offlineMiddleware,
  suspendSaga,
  consumeActionMiddleware
} from "redux-offline-queue";
import { persistStore, persistReducer, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootSaga from "../sagas";

/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  tweet: require("../features/tweet/TweetRedux").reducer,
  // redux-offline-queue reducer
  offline: require("redux-offline-queue").reducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ------------- Redux Configuration ------------- */

const middleware = [];

middleware.push(
  offlineMiddleware({
    additionalTriggers: REHYDRATE
  })
);

/* ------------- Saga Middleware ------------- */

const sagaMiddleware = createSagaMiddleware();
const suspendSagaMiddleware = suspendSaga(sagaMiddleware);
middleware.push(suspendSagaMiddleware);

/* ------------- Assemble Middleware ------------- */

/** The consume middleware should be placed last.
 * We allow the previous middlewares (especially the saga middleware) to react to the action
 * before it is eventually consumed.
 */
middleware.push(consumeActionMiddleware());

const store = createStore(persistedReducer, applyMiddleware(...middleware));

// kick off root saga
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
