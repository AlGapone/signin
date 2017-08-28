import { Link } from 'react-router'
import classes from './Header.scss'

const Header = ({ authenticated }) => {
  return(
    <nav className="navbar navbar-light">
      <ul className={classes.navbar}>
        <li className={classes.navItem}>
          <Link to="users">Users</Link>
        </li>
        <li className={classes.navItem}>
          <Link className="btn btn-primary" to={authenticated ? '/signout' : '/signin'}>{authenticated ? 'Sign out' : 'Sign in'}</Link>
        </li>
      </ul>
    </nav>
  )
};

Header.propTypes = {
  authenticated: React.PropTypes.bool
};

export default Header