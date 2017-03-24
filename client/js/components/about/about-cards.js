import React from 'react'; 

const AboutCards = () => {
	return (
		<div className="about-cards-container">
			<div className="about-card">
				<img className="about-icon" src="assets/images/review.png" />
				<h3>Explore the Reviews</h3>
				<hr className="short-line cards-line" />
				<p>Ever been on a trip and found yourself wishing you could pick a local's brain — 
				find out her favorite eatery or music venue? Localize
				brings you reviews by the people who know a city best - its locals.</p>
			</div>
			<div className="about-card">
				<img className="about-icon" src="assets/images/filter.png" />
				<h3>Filter your Search</h3>
				<hr className="short-line cards-line" />
				<p>Sometimes we know exactly what we want. The filtering feature allows you to narrow your search to locations
				that have been tagged by locals with those keywords. </p>
			</div>
			<div className="about-card">
				<img className="about-icon" src="assets/images/local.png" />
				<h3>Learn About the Locals</h3>
				<hr className="short-line cards-line" />
				<p>Do you have something in common with one of the locals and want to learn more? 
				Clicking on their name gives you an extended bio and a filtered view of their locations and tags. </p>
			</div>
		</div>
	)
}

export default AboutCards; 