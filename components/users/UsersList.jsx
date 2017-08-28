import classes from './UsersList.scss'
import SingleUser from './single-user/SingleUser'
import RequireAuth from './../require-auth/RequireAuth'

class UsersList extends React.Component{
  static propTypes = {
    usersList: React.PropTypes.object
  };

  componentWillMount () {
    if (!this.props.usersList.loaded) {
      this.props.fetchUsers();
    }
  }

  render () {
    const { usersList } = this.props;

    if(!usersList.loaded){
      return <h1>Loading...</h1>
    }

    return(
      <div className={classes.usersListClass}>
        {this.props.message}
        {usersList.data.map((user, i) => {
          return(
            <SingleUser key={i} user={user} />
          )
        })}
      </div>
    )
  }
}

export default RequireAuth(UsersList)