import "regenerator-runtime/runtime";
import { expect } from "./../test_helper";
import { call, put, take, fork } from "redux-saga/effects";
import { createMockTask, cloneableGenerator } from 'redux-saga/utils';
import { loginFlow, authorize } from "./../../sagas/auth-saga/auth-saga";
import * as actions from "./../../reducers/auth/auth-actions"
import Api from "./../../service/Api";

describe("loginFlow Saga test", () => {
  const data = {};
  data.gen = cloneableGenerator(loginFlow)();
  var next = data.gen.next();

  it("should take SIGN_IN_REQUEST", () => {
    expect(next.value).to.deep.eql(take(actions.SIGN_IN_REQUEST));
  });

  it("should fork authorize generator when SIGN_IN_REQUEST action occurs", () => {
    const credentials = { payload: { email : "test@mail.com", password: 1234  }};
    next = data.gen.next(credentials);
    expect(next.value).to.deep.eql(fork(authorize, credentials.payload.email, credentials.payload.password));
  });

  it("should continue the flow and wait for SIGN_OUT and AUTH_FAILURE actions", () => {

    const mockTask = createMockTask();
    next = data.gen.next(mockTask);
    expect(next.value).to.deep.eql(take([actions.SIGN_OUT, actions.AUTH_FAILURE]));
  });

  it("should remove the token from the storage for the next SIGN_IN_REQUEST on SIGN_OUT action", () => {
    data.clone = data.gen.clone();
    next = data.gen.next(actions.SIGN_OUT);
    expect(next.value).to.deep.eql(call(Api.removeItem, 'token'));
  });

  it("should remove the token from the storage for the next SIGN_IN_REQUEST on AUTH_FAILURE action", () => {
    next = data.clone.next(actions.AUTH_FAILURE);
    expect(next.value).to.deep.eql(call(Api.removeItem, 'token'));
  });

  it("should start the loop again and wait for new SIGN_IN_REQUEST action", () => {
    next = data.gen.next();
    expect(next.value).to.deep.eql(take(actions.SIGN_IN_REQUEST));
  });
});


describe("authorize Saga test", () => {
  const credentials = { email : "test@mail.com", password: 1234  };
  const gen = authorize(credentials.email, credentials.password);

  let next = gen.next();
  it("should make Api.signIn call with given credentials", () => {
    expect(next.value).to.deep.eql(call(Api.signIn, credentials.email, credentials.password));
  });

  const token = 'token'; // fake token

  it("should call the SIGN_IN_SUCCESS action and return a token if the call is success", () => {
    next = gen.next(token);
    expect(next.value).to.deep.eql(put({type: actions.SIGN_IN_SUCCESS }));
  });

  it("should write the token to the storage and push the browser history", () => {
    next = gen.next();
    expect(next.value).to.deep.eql(call(Api.setItem, 'token', token));

    next = gen.next();
    expect(next.value).to.deep.eql(call(Api.redirectTo, '/users'));
  });

  it("should dispatch the AUTH_FAILURE actions, if the signIn request fails", () => {
    const error = new Error("Failed request");
    next = gen.throw(error);
    expect(next.value).to.deep.eql(put(actions.authError(error)));
  });

});