import React from 'react';
import Header from '../navbars/header-no-user'; 

const LandingPage = () => {
	return (
		<div className="landingpage-container">
			<Header />
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

export default LandingPage; 
