import { connect } from 'react-redux'
import Header from './../components/header/Header'

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(Header)