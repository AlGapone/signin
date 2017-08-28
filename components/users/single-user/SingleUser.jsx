import classes from './SingleUser.scss'

const SingleUser = ({ user }) => {
  return(
    <div className={classes.userCard}>
      <div className="card card-block">
        <h4 className="card-title">{user.name}</h4>
        <p className="card-text">{user.company.name}</p>
        <a className="btn btn-primary" href={`http://${user.website}`}>Website</a>
      </div>
    </div>
  )
};

SingleUser.propTypes = {
  user: React.PropTypes.shape({
    name: React.PropTypes.string,
    company: React.PropTypes.object
  })
};

export default SingleUser