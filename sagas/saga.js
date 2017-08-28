import "regenerator-runtime/runtime";
import { loginFlow } from "./auth-saga/auth-saga";
import { watchFetchUsers } from "./users-saga/users-saga";
import { all, fork } from 'redux-saga/effects'

export default function *rootSaga() {
  yield all ([
    fork(loginFlow),
    fork(watchFetchUsers)
  ])
}