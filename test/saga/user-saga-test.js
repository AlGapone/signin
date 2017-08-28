import "regenerator-runtime/runtime";
import { expect } from "./../test_helper";
import { call, put } from "redux-saga/effects";
import { fetchUsersSaga } from './../../sagas/users-saga/users-saga';
import { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "./../../reducers/users/user-actions"
import Api from "./../../service/Api";

describe("usersFetch Saga test", () => {
  const mockActions = {type: FETCH_USERS,
    payload: "some"};

  it("should make API fetchUsers request, and call FETCH_USERS_SUCCESS action with data", () => {
    const response = [1, 3, 4 ]; // dummy response
    const gen = fetchUsersSaga(mockActions); // create generator iterator. it doesn't run any of the function content

    let next = gen.next(); // user next() to iterate over the generator iterator. it return the object of type {done: bool, value: any}
    expect(next.value).to.deep.eql(call(Api.fetch, mockActions.payload));

    next = gen.next(response);
    expect(next.value).to.deep.eql(put({ type: FETCH_USERS_SUCCESS, payload: response }));

    expect(gen.next()).to.deep.eql({done: true, value: undefined });
  });

  it("should make an API fetchUsers request and call the FETCH_USERS_FAILURE action if the request fails", () => {
    const gen = fetchUsersSaga(mockActions);

    let next = gen.next();
    expect(next.value).to.deep.equal(call(Api.fetch, mockActions.payload));

    const error = new Error("Failed request");
    next = gen.throw(error); // throws an error into the generator, at the exact point where is generator currently paused

    expect(next.value).to.deep.eql(put({ type: FETCH_USERS_FAILURE, payload: error}));
  });
});