import React from 'react';
import LandingHeader from '../landing_page_components/landing_header';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin';
import Tutorial from '../tutorial_modal/tutorial';
import * as actionCreators from '../../actions/sync.js';
import * as post_actions from '../../actions/post_request.js';
import * as sync_actions from '../../actions/sync.js';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

class LandingPage extends React.Component {

	componentWillMount() {
		document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(assets/images/city.jpg)";
	}

	componentWillUnmount () {
		document.body.style.backgroundImage = null;
	}

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
		let rightNavLinks;

		if (!currentUser) {
			rightNavLinks = (
				<Nav pullRight>
					<NavItem className="landing-header-links" onClick={this.openSignIn.bind(this)} href="#">Sign In</NavItem>
	        <NavItem className="landing-header-links" onClick={this.openSignUp.bind(this)} href="#">Sign Up</NavItem>
	        <NavItem className="landing-header-links" onClick={this.openTutorial.bind(this)} href="#">Help</NavItem>
	      </Nav>
			)
		} else {
			rightNavLinks = (
				<Nav pullRight>
	      	<NavItem className="right-link-header" onClick={()=> {hashHistory.push('/account')}}>Your Profile</NavItem>
	        <NavItem className="right-link-header" href="#" onClick={()=> {hashHistory.push(`/newmap/${currentUser.id}`)}}>Create Map</NavItem>
	        <NavItem className="right-link-header" href="#" onClick={this.logOut.bind(this)}>Log Out</NavItem>
	        <NavItem className="landing-header-links" onClick={this.openTutorial.bind(this)} href="#">Help</NavItem>
	      </Nav>
	     )
		}

		return (
			<div className="landingpage-container">
				<LandingHeader rightNavLinks={rightNavLinks}/>
				{this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
				{this.props.tutorialModalOpen ? <Tutorial /> : null}
				<div className="landingpage-details-container">
					<h1 className="welcome-header">Localize</h1>
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
