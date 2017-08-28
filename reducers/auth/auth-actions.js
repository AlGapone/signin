export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_OUT = 'SIGN_OUT';

export const AUTH_FAILURE = 'AUTH_FAILURE';
export function authError (error) {
  return{
    type: AUTH_FAILURE,
    payload: error
  }
}

export function signIn({ email, password }) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signOut () {
  return {
    type: SIGN_OUT,
    payload: null
  }
}
