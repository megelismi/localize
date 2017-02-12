import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/get_request.js';
import Map from '../map/map';
import NewSidebar from '../new_sidebar/new_sidebar';
import Header from '../partials/header';
import Footer from '../partials/footer';

class MapDisplay extends React.Component {

  componentDidMount() {
    this.props.getTags();
    this.props.getLocationTags();
    this.props.getUsers();
    this.props.getLocationsAndDescriptions();
  }

  render() {
    return (
      <div>
      	<Header />
        <Map />
        <NewSidebar />
        <Footer />
      </div>
    )
  }
}

export default connect(null, actionCreators)(MapDisplay);
