import React from 'react'; 
import LandingPage from './landing_page'; 
import MapsPage from './map_display'; 
import About from '../about/about-display';

const HomePage = props => {
	return (
		<div className= "homepage-container">
			<LandingPage />
			<About />
			<MapsPage />
		</div>
	)
}

export default HomePage; 

