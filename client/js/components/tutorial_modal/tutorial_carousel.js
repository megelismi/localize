import React from 'react'; 
import { Carousel } from 'react-bootstrap';

const TutorialCarousel = () => {
	return (
		<Carousel interval={false}>
			<Carousel.Item>
				<img width={900} height={500} alt="900x500" src="assets/images/maps-view.png" />
				<Carousel.Caption>
					<h3>Explore the Map</h3>
					<p>Localize is about bringing you recommendations from those who know a city best, 
					its locals! Click on the map's pins to see pictures and read what city natives have 
					to say.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img width={900} height={500} alt="900x500" src="assets/images/locals-view.png" />
			<Carousel.Caption>
				<h3>Meet the Locals</h3>
				<p>Scroll past the locals in the sidebar to see a picture and read a short tagline. 
				If you'd like to know more, simply click on their name. </p>
			</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img width={900} height={500} alt="900x500" src="assets/images/local-view.png" />
				<Carousel.Caption>
					<h3>Find Out More</h3>
					<p>In the individual view, you will see the map and filters change to be specific 
					to the locations the selected user has pinned.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img width={900} height={500} alt="900x500" src="assets/images/tag-view.png" />
				<Carousel.Caption>
					<h3>Narrow Your Search</h3>
					<p>Looking for something specific? Click on the filter at the top of 
					the sidebar to narrow your search using tags. The filter will remain green 
					until you click clear all.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img width={900} height={500} alt="900x500" src="assets/images/create-map.png" />
				<Carousel.Caption>
					<h3>Share the Love</h3>
					<p>Are you passionate about places in your town and want visitors to know? 
					Sign up to create a map of your favorite spots.</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default TutorialCarousel; 
