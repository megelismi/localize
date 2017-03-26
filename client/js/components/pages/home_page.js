import React from 'react'; 
import LandingPage from './landing_page'; 
import MapsPage from './map_display'; 
import About from '../about/about-display';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin'; 
import Scroll from 'react-scroll';
import { StickyContainer } from 'react-sticky';
import { connect } from 'react-redux';
const Events = Scroll.Events;
const scrollSpy  = Scroll.scrollSpy;

class HomePage extends React.Component {

	componentDidMount () {

		console.log('component mounted');
    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();
	}

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

