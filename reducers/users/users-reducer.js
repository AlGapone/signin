import * as actions from './user-actions'

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  data: null
};

export default function userReducer (state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case actions.FETCH_USERS:
      return { ...state, loading: true };
    case actions.FETCH_USERS_SUCCESS:
      return { ...initialState, loaded: true, data: action.payload };
    case actions.FETCH_USERS_FAILURE:
      return { ...initialState, error: action.payload };
  }
  return state
}