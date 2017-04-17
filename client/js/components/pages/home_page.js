import React from 'react'; 
import { StickyContainer } from 'react-sticky';
import { connect } from 'react-redux';
import LandingPage from './landing_page'; 
import About from '../about/about-display';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin'; 

class HomePage extends React.Component {
	render() {
		return (
			<StickyContainer> 
				{this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
				<LandingPage />
				<About />
			</StickyContainer>
		);
	}
}

const mapStateToProps = state => {
  return {
    signUpModalOpen: state.signUpModalOpen,
    signInModalOpen: state.signInModalOpen
  };
};

export default connect(mapStateToProps)(HomePage);



