import React from 'react'; 
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

				<button onClick={() => {hashHistory.push('/map/portland')}}>get started with Portland, Maine</button>
			</div>
		)
	}
}

export default LandingPage;
