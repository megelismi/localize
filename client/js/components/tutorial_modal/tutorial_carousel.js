import React from 'react'; 
import { Carousel } from 'react-bootstrap';

const TutorialCarousel = (props) => {

	return (
	  <Carousel interval={false}>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/maps-view.png"/>
	      <Carousel.Caption>
	        <h3>First slide label</h3>
	        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/locals-view.png"/>
	      <Carousel.Caption>
	        <h3>Second slide label</h3>
	        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/local-view.png"/>
	      <Carousel.Caption>
	        <h3>Third slide label</h3>
	        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/tag-view.png"/>
	      <Carousel.Caption>
	        <h3>Third slide label</h3>
	        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	    <Carousel.Item>
	      <img width={900} height={500} alt="900x500" src="assets/images/create-map.png"/>
	      <Carousel.Caption>
	        <h3>Third slide label</h3>
	        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
	      </Carousel.Caption>
	    </Carousel.Item>
	  </Carousel>
	)

}

export default TutorialCarousel; 