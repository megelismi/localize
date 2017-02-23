import React from 'react'; 
import { Carousel } from 'react-bootstrap';

const TutorialCarousel = (props) => {

	return (
	  <Carousel>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-15.jpg"/>
	      <Carousel.Caption>
	        <h3>First slide label</h3>
	        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="http://www.awesomelycute.com/gallery/2015/05/cute-puppies-13.jpg"/>
	      <Carousel.Caption>
	        <h3>Second slide label</h3>
	        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="https://i.ytimg.com/vi/a6KGPBflhiM/hqdefault.jpg"/>
	      <Carousel.Caption>
	        <h3>Third slide label</h3>
	        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	  </Carousel>
	)

}

export default TutorialCarousel; 