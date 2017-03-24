import React from 'react'; 
import LandingPage from './landing_page'; 
import MapsPage from './map_display'; 
import About from '../about/about-display';
import { StickyContainer } from 'react-sticky'; 

const HomePage = props => {
	return (
		<StickyContainer> 
			<div className= "homepage-container">
				<LandingPage />
				<About />
				<MapsPage />
			</div>
		</StickyContainer>
	)
}

export default HomePage; 

