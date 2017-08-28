import { connect } from 'react-redux'

export default function (ComposedComponent) {
  class Authentication extends React.Component{
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount () {
      if (!this.props.authenticated) {
        this.context.router.push('/')
      }
    }

    componentWillReceiveProps (nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render () {
      return(
        <ComposedComponent {...this.props} />
      )
    }
  }

  const mapStatToProps = (state) => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStatToProps)(Authentication)
}