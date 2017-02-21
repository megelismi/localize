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

class UserMapDisplay extends React.Component {

  componentWillMount() {
    this.props.syncActionCreators.selectUserAndUpdateTags(this.props.currentUser);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
        <Map />
        <SidebarContainer locals={false} oneLocal={true}/>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  signUpModalOpen: state.signUpModalOpen,
  signInModalOpen: state.signInModalOpen,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMapDisplay);
