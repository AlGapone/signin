export default class Signout extends React.Component{
  componentWillMount () {
    this.props.signOut();
  }

  render () {
    return(
      <div>Sorry to see you go!</div>
    )
  }
}