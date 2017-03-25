import React from 'react'; 

const AboutCards = () => {
	return (
		<div className="about-cards-container">
			<div className="about-card">
				<img className="about-icon" src="assets/images/review.png" />
				<h3>Explore the Reviews</h3>
				<hr className="short-line cards-line" />
				<p>Ever been on a trip and found yourself wishing you could pick a local's brain?
				 Localize brings you reviews by the people who know a city best - its locals.</p>
			</div>
			<div className="about-card">
				<img className="about-icon" src="assets/images/filter.png" />
				<h3>Filter Your Search</h3>
				<hr className="short-line cards-line" />
				<p>Sometimes we know exactly what we want. The filter feature allows you to search for 
				locations using keywords.</p>
			</div>
			<div className="about-card">
				<img className="about-icon" src="assets/images/local.png" />
				<h3>Learn About the Locals</h3>
				<hr className="short-line cards-line" />
				<p>Have something in common with one of the users? 
				Click on her name to see an extended bio and a filtered view of all her locations and tags. </p>
			</div>
		</div>
	)
}

export default AboutCards; 