import React from 'react';
import { hashHistory } from 'react-router';
import AboutHeader from './about-header'; 
import AboutCards from './about-cards';

const About = () => {
	console.log('workign');
	return (
		<div className="about-page">
			<AboutHeader />
			<AboutCards />
			<a className="enter-app-link" onClick={() => { hashHistory.push('/map/portland'); }}>Get started with Portland, Maine</a>
		</div>
	);
};

export default About; 
