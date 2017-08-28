import { connect } from 'react-redux'
import UsersList from './../components/users/UsersList'
import { fetchUsers } from './../reducers/users/user-actions'

const mapStateToProps = (state) => ({
  usersList: state.users
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)