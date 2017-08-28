import { fork, call, take, put, cancel } from "redux-saga/effects";
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, AUTH_FAILURE, SIGN_OUT  } from './../../reducers/auth/auth-actions'
import Api from "./../../service/Api";

export function* authorize(email, password) {
  // try to make the post auth request
  try {
    // get the token from response object, if auth is success
    const token = yield call(Api.signIn, email, password);

    // put effect dispatch the SIGN_IN_SUCCESS action
    yield put({ type: SIGN_IN_SUCCESS });

    // Write token to the browser localStorage
    yield call(Api.setItem, 'token', token);

    // redirect the user to the home blocked page
    yield call(Api.redirectTo, '/users');
  } catch (error) {
    yield put({ type: AUTH_FAILURE, payload: error })
  }
}

export function* loginFlow() {
  while (true) {
    // middleware waiting for the SIGN_IN_REQUEST and we destruct email and password from payload
    const { payload: { email, password }} =  yield take(SIGN_IN_REQUEST);
    
    // fork effect, starts the task in the background and the caller can continue it's flow without waiting the task
    // to terminate
    // for return a Task object, we assign it to the local constant
    const task = yield fork(authorize, email, password);

    // watch for SIGN_OUT and AUTH_FAILURE actions, if one of them happens the loop will start over again
    // and will wait for new SIGN_IN_REQUEST
    // if the SIGN_IN_SUCCESS happens our flow will only waits for SIGN_OUT because AUTH_FAILURE will never happen
    const action = yield take([SIGN_OUT, AUTH_FAILURE]);
    // if the sign-out happens in the middle of the authorize process, we should cancel the authorize task
    // using the cancel(Task) effect, and the Task will be aborted
    // if the task is already completed, then cancel results to no-op
    if (action.type === SIGN_OUT) {
      yield cancel(task)
    }

    // 1. Remove the token from browser
    yield call(Api.removeItem, 'token');
  }
}