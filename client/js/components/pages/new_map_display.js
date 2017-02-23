import React from 'react';
import NewMap from '../local_components/new_map/new_map';
import NewMapSidebar from '../local_components/new_map_sidebar/new_map_sidebar';
import Header from '../partials/header';
import Footer from '../partials/footer';
import { connect } from 'react-redux';
import Tutorial from '../tutorial_modal/tutorial';

class NewMapDisplay extends React.Component {
	
	constructor(props) {
		super(props); 
	}

	render () {
	  return (
	    <div>
	      <Header />
				{this.props.tutorialModalOpen ? <Tutorial /> : null}
	      <NewMap />
	      <NewMapSidebar />
	      <Footer />
	    </div>
	  )
	}
}


const mapStateToProps = (state) => ({
  tutorialModalOpen: state.tutorialModalOpen
});

export default connect(mapStateToProps)(NewMapDisplay);
