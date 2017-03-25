import React from 'react';
import NewMap from '../local_components/new_map/new_map';
import NewMapSidebar from '../local_components/new_map_sidebar/new_map_sidebar';
import NavbarUser from '../navbars/navbar_user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import Tutorial from '../tutorial_modal/tutorial';
import LocationsSaved from '../local_components/modals/locations_saved';

class NewMapDisplay extends React.Component {

  componentWillMount() {
    return this.props.dispatch(getActionCreators.getSelectedUsers())
    .then(() => {
      return this.props.dispatch(getActionCreators.getLocationsAndDescriptions())})
    .then(() => {
      return this.props.syncActionCreators.selectUserAndUpdateTags(this.props.currentUser);
    }).catch((err) => {
      console.log(err);
    });
  }



  render () {
    return (
      <div>
        <NavbarUser />
        {this.props.tutorialModalOpen ? <Tutorial /> : null}
        {this.props.locationsSavedModalOpen ? <LocationsSaved /> : null}
        <NewMap />
        <NewMapSidebar />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tutorialModalOpen: state.tutorialModalOpen,
  currentUser: state.currentUser, 
  locationsSavedModalOpen: state.locationsSavedModalOpen 
});

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMapDisplay);
