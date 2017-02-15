import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import Map from '../visitor_components/map_view/map';
import SidebarContainer from '../visitor_components/map_view_sidebar/sidebar_container';
import Header from '../partials/header';
import Footer from '../partials/footer';
import { StickyContainer, Sticky } from 'react-sticky';

class MapDisplay extends React.Component {

  componentDidMount() {
    this.props.getActionCreators.getLocationTags();
    this.props.getActionCreators.getUsers();
    this.props.getActionCreators.getLocationsAndDescriptions();
  }

  render() {
    return (
      <div>
        <Header />
        <Map />
        <SidebarContainer />
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(MapDisplay);
