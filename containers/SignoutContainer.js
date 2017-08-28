import { connect } from 'react-redux'
import { signOut } from './../reducers/auth/auth-actions'
import Signout from './../components/signout/Signout'

export default connect(null, { signOut })(Signout)