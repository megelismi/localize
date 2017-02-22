import React from 'react'; 
import LandingHeader from '../landing_page_components/landing_header';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin';
import * as actionCreators from '../../actions/sync.js';

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

	render () {
	
		return (
			<div className="landingpage-container">
				<LandingHeader signUp={this.openSignUp.bind(this)} signIn={this.openSignIn.bind(this)} />
				{this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
				<div className="landingpage-details-container">
					<h1 className="welcome-header">Localize</h1>
					<h4 className="app-description-landing">explore a city with local recommendations</h4>
					<button className="enter-app-button" onClick={() => {hashHistory.push('/map/portland')}}>get started with Portland, Maine</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    signUpModalOpen: state.signUpModalOpen,
    signInModalOpen: state.signInModalOpen, 
  }
};

export default connect(mapStateToProps)(LandingPage);
