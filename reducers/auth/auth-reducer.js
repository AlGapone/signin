import * as actions from './auth-actions'

export default function (state = {}, action) {
  switch (action.type) {
    case actions.SIGN_IN_SUCCESS:
      return { ...state, authenticated: true, error: null };
    case actions.SIGN_OUT:
      return { ...state, authenticated: false };
    case actions.AUTH_FAILURE:
      return { ...state, error: action.payload };
  }
  return state
}
