import React from 'react';
import { connect } from 'react-redux';
import SelectedResults from './selected_results';
import SaveMap from './save_map';

const NewMapSidebar = (props) => {

  let saveable = props.localsMapLocations.filter((location) => {
    return (
      location.short_description &&
      location.long_description &&
      location.tag_array
    )
  });

  return (
    <div className="sidebar">
      <SelectedResults results={props.localsMapLocations} currentUser={props.currentUser} />
      <SaveMap localsMapLocations={props.localsMapLocations} saveable={saveable} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  localsMapLocations: state.localsMapLocations,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(NewMapSidebar);
