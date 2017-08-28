import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router'
import reducers from './reducers/index';
import routes from './routes/routes'
import { SIGN_IN_SUCCESS } from './reducers/auth/auth-actions'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/saga.js"

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const token = localStorage.getItem('token');

// if the user have a token , consider the user to be sign in
if (token) {
  // we need to update state before any render occurs
  store.dispatch({ type: SIGN_IN_SUCCESS });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container')
);

