import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "./../../reducers/users/user-actions"
import Api from "./../../service/Api";

// Our fetch user saga will perform an async user fetch request
export function *fetchUsersSaga (action) {
  try {
    const data = yield call(Api.fetch, action.payload);
    yield put({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: FETCH_USERS_FAILURE, payload: error });
  }
}

// Watcher Saga: spawns a new fetchUsers task on every FETCH_USERS action
export function *watchFetchUsers() {
  yield takeEvery(FETCH_USERS, fetchUsersSaga)
}









