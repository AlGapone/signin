import App from './../components/App';
import SigninContainer from "./../containers/SinginContainer"
import SignoutContainer from "./../containers/SignoutContainer"
import UserContainer from "./../containers/UserContainer"
import { Route, IndexRoute } from 'react-router'

const routes = (
  <Route path="/" component={App}>
    <Route path="/signin" component={SigninContainer} />
    <Route path="/signout" component={SignoutContainer} />
    <Route path="/users"  component={UserContainer} />
  </Route>
);
export default routes