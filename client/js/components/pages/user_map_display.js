import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import Map from '../visitor_components/map_view/map';
import SidebarContainer from '../visitor_components/map_view_sidebar/sidebar_container';
import Header from '../partials/header';
import Footer from '../partials/footer';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin';
import Tutorial from '../tutorial_modal/tutorial';

class UserMapDisplay extends React.Component {

  componentWillMount() {
    this.props.dispatch(getActionCreators.getSelectedUsers())
    .then(() => {
       this.props.dispatch(getActionCreators.getLocationsAndDescriptions())})
    .then(() => {
      this.props.syncActionCreators.selectUserAndUpdateTags(this.props.currentUser);
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    if (this.props.selectedUser) {
      return (
        <div>
          <Header />
          {this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
          {this.props.tutorialModalOpen ? <Tutorial /> : null}
          <Map />
          <SidebarContainer locals={false} oneLocal={true}/>
          <Footer />
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

const mapStateToProps = (state) => ({
  selectedUser: state.selectedUser,
  signUpModalOpen: state.signUpModalOpen,
  signInModalOpen: state.signInModalOpen,
  tutorialModalOpen: state.tutorialModalOpen,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMapDisplay);
