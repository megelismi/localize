import React from 'react'; 
import { Carousel } from 'react-bootstrap';

const TutorialCarousel = (props) => {

	return (
	  <Carousel interval={false}>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/maps-view.png"/>
	      <Carousel.Caption>
	        <h3>Explore the Map</h3>
	        <p>Localize is about bringing you recommendations from those who know a city best, its locals! Click on the map's pins to see pictures and read what city natives have to say about it.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/locals-view.png"/>
	      <Carousel.Caption>
	        <h3>Meet the Locals</h3>
	        <p>Scroll past the locals in the sidebar to see a picture and short tagline. If you'd like to know more about them, simply click on their name. </p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/local-view.png"/>
	      <Carousel.Caption>
	        <h3>Find Out More</h3>
	        <p>In the locals view, you will see the map change to only show the locations they have pinned and only tags associated with them will show up in the filters.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/tag-view.png"/>
	      <Carousel.Caption>
	        <h3>Narrow Your Search</h3>
	        <p>Looking for something specific? Click on the filter at the top of the sidebar to use the locals tags to narrow your search. The filter will remian green to remind you that its on.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/create-map.png"/>
	      <Carousel.Caption>
	        <h3>Share the Love</h3>
	        <p>Are you passionate places in your town and want visitors to know? Sign up for an account to create a map of your favorite local spots.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	  </Carousel>
	)

}

export default TutorialCarousel; 