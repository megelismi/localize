import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActionCreators from '../../actions/get_request.js';
import * as postActionCreators from '../../actions/post_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import Map from '../visitor_components/map_view/map';
import SidebarContainer from '../visitor_components/map_view_sidebar/sidebar_container';
import NavbarApp from '../navbars/navbar_app';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin';
import Tutorial from '../tutorial_modal/tutorial';

class MapDisplay extends React.Component {

  componentWillMount() {
    this.props.getActionCreators.getUsersWithReviews();
    this.props.getActionCreators.getAllLocationsForCity();
  }

  render() {
    return (
      <div>
        <NavbarApp />
        {this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
        {this.props.tutorialModalOpen ? <Tutorial /> : null}
        <Map />
        <SidebarContainer locals oneLocal={false} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    signUpModalOpen: state.signUpModalOpen,
    signInModalOpen: state.signInModalOpen,
    tutorialModalOpen: state.tutorialModalOpen,
    followUpModalOpen: state.followUpModalOpen, 
    filteredLocations: state.filteredLocations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    postActionCreators: bindActionCreators(postActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay);
