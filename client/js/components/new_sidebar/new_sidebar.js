import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/get_request.js';

class NewSidebar extends React.Component {

  render() {

      console.log('new sidebar', this.props.users, this.props.locationTags);
      return (
        <div>
          Yup
        </div>
      )
    
  }
}

const mapStateToProps = (state) => ({
  users: state.userState.users,
  locationTags: state.tagState.locationTags
})

export default connect(mapStateToProps, actionCreators)(NewSidebar);
