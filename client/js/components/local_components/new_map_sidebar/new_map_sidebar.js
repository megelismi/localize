import React from 'react';
import { connect } from 'react-redux';
import SelectedResults from './selected_results';
import SaveMap from './save_map';

const NewMapSidebar = (props) => {
  const saveable = props.currentUserLocationsAndReviews.filter(review => {
    return (
      review.short_description && 
      review.long_description && 
      review.locationInfo.tags &&
      !review.saved
    );
  }); 
  return (
    <div className="sidebar">
      <SaveMap currentUserLocationsAndReviews={props.currentUserLocationsAndReviews} saveable={saveable} />
      <SelectedResults results={props.currentUserLocationsAndReviews} currentUser={props.currentUser} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  currentUserLocationsAndReviews: state.currentUserLocationsAndReviews,
  saveMapSuccess: state.saveMapSuccess,
});

export default connect(mapStateToProps)(NewMapSidebar);
