import React from 'react'; 
import LandingPage from './landing_page'; 
import MapsPage from './map_display'; 
import About from '../about/about-display';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin'; 
import { StickyContainer } from 'react-sticky';
import { connect } from 'react-redux';

class HomePage extends React.Component {
	render () {
		return (
			<StickyContainer> 
				{this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
				<LandingPage />
				<About />
				<MapsPage />
			</StickyContainer>
		)
	}
}

const mapStateToProps = state => {
  return {
    signUpModalOpen: state.signUpModalOpen,
    signInModalOpen: state.signInModalOpen
  }
};

export default connect(mapStateToProps)(HomePage);

