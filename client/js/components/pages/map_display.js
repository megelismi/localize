import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import Map from '../map/map';
import NewSidebar from '../new_sidebar/new_sidebar';
import Header from '../partials/header';
import Footer from '../partials/footer';

class MapDisplay extends React.Component {

  componentDidMount() {
    this.props.getActionCreators.getTags();
    this.props.getActionCreators.getLocationTags();
    this.props.getActionCreators.getUsers();
    this.props.getActionCreators.getLocationsAndDescriptions();
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


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(MapDisplay);
