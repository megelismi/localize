import React from 'react'; 
import LandingHeader from '../landing_page_components/landing_header';
import { hashHistory } from 'react-router';


class LandingPage extends React.Component {

	componentWillMount() {
		document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(assets/images/city.jpg)";

		// rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)
	}

	componentWillUnmount () {
		document.body.style.backgroundImage = null;
	}


	render () {
	
		return (
			<div className="landingpage-container">
				<LandingHeader />
				<h1 className="welcome-header">Localize</h1>
				<h4 className="app-description-landing">explore a city with local recommendations</h4>
				<button className="enter-app-button" onClick={() => {hashHistory.push('/map/portland')}}>get started with Portland, Maine</button>
			</div>
		)
	}
}

export default LandingPage;
