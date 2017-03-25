import React from 'react';
import LandingHeader from '../landing_page_components/landing_header';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin';
import Tutorial from '../tutorial_modal/tutorial';
import Header from '../partials/header'; 
import * as actionCreators from '../../actions/sync.js';
import * as post_actions from '../../actions/post_request.js';
import * as sync_actions from '../../actions/sync.js';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

class LandingPage extends React.Component {

	openSignUp () {
    this.props.dispatch(actionCreators.signUpModal());
  }

  openSignIn () {
    this.props.dispatch(actionCreators.signInModal());
  }

  logOut () {
    this.props.dispatch(post_actions.logOut(this.props.currentUser.token));
  }

  openTutorial () {
  	this.props.dispatch(sync_actions.tutorialModal());
  }

	render () {
		const { currentUser } = this.props;


		return (
			<div className="landingpage-container">
				<Header />
				{this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
				{this.props.tutorialModalOpen ? <Tutorial /> : null}
				<div className="landingpage-details-container">
					<h1 className="welcome-header">Localize</h1>
					<h2>discover a new city, guided by locals</h2>
				</div>
				<div className="homepage-scroll-container">
					<img className="homepage-scroll-arrow" src="assets/images/scroll-arrow.png" />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    signUpModalOpen: state.signUpModalOpen,
    signInModalOpen: state.signInModalOpen,
    tutorialModalOpen: state.tutorialModalOpen,
    currentUser: state.currentUser
  }
};

export default connect(mapStateToProps)(LandingPage);

//
