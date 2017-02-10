import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/get_request.js';

class UserDisplay extends React.Component {

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>Hello user</div>
    )
  }
}

const mapStateToProps = (state) => ({
  locationState: state.locationState,
  userState: state.userState
})

export default connect(mapStateToProps, actionCreators)(UserDisplay);
