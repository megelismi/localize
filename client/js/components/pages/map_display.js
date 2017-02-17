import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import Map from '../map/map';
import SidebarContainer from '../new_sidebar/sidebar_container';
import Header from '../partials/header';
import Footer from '../partials/footer';
import SignUpForm from '../auth/signup'; 
import SignInForm from '../auth/signin';

class MapDisplay extends React.Component {

  componentDidMount() {
    this.props.getActionCreators.getLocationTags();
    this.props.getActionCreators.getUsers();
    this.props.getActionCreators.getLocationsAndDescriptions();
  }

  render() {
    let signUpModal, signInModal; 
    const { signUpModalOpen, signInModalOpen } = this.props; 

    console.log('props', this.props)
    
    if (signUpModalOpen) {
      console.log('got into signUpModalOpen in main page')
      signUpModal = <SignUpForm />
    } 

    if (signInModalOpen) {
      signInModal = <SignInForm />
    }

    return (
      <div>
        <Header />
        {signUpModal}
        {signInModal}
        <Map />
        <SidebarContainer />
        <Footer />
      </div>
    )
  }
}


const mapStateToProps = (state) => { 
  console.log('state', state)
  return {
    signUpModalOpen: state.signUpModalOpen,
    signInModalOpen: state.signInModalOpen 
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay);

