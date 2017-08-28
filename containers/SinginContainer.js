import { connect } from 'react-redux'
import Signin from './../components/signin/Singin'
import * as actions from './../reducers/auth/auth-actions'

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error
});

const mapDispatchToProps = (dispatch) => ({
  signIn: ({ email, password }) => dispatch(actions.signIn({ email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin)