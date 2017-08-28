import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth/auth-reducer'
import usersReducer from './users/users-reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  users: usersReducer
});

export default rootReducer