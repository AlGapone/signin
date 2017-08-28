import { Field, reduxForm } from 'redux-form'
import classes from './Singin.scss'
import Input from './../controls/input/Input'

class Singin extends React.Component{
  static propTypes = {
    signIn: React.PropTypes.func.isRequired
  };

  handleSubmit ({ email, password }) {
    this.props.signIn({ email, password });
  }

  render () {
    const { handleSubmit, errorMessage } = this.props;

    return(
      <div>
        <h1>Sign in</h1>
        <form className={classes.signinForm} onSubmit={handleSubmit(::this.handleSubmit)}>
          <Field name="email" type="email" label="Email" component={Input} placeholder="Enter Your Email"/>
          <Field name="password" type="password" label="Password" component={Input} placeholder="Enter Your Password"/>
          <button type="submit" className="btn btn-primary">Sign in!</button>
          {errorMessage && <div className="alert alert-danger">Ooops! {errorMessage} </div>}
        </form>
      </div>
    )
  }
}

export default reduxForm({ form: 'signin' })(Singin)