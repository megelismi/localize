import React from 'react';
import { connect } from 'react-redux';
import * as postActionCreators from '../../../actions/post_request.js';

const SaveMap = (props) => {

  const saveUserLocationsToMap = () => {
    props.localsMapLocations.forEach((location) => {
      console.log(location);
      props.saveMap(location);
    })
  }

  let saveButton = (props.localsMapLocations.length === 0 || props.localsMapLocations.length > props.saveable.length) ?
    <button className="disabled save-map-button" disabled>Save map</button> :
    <button onClick={saveUserLocationsToMap} className="save-map-button">Save map</button>

  return (
    <div>
      {saveButton}
    </div>
  )
}

export default connect(null, postActionCreators)(SaveMap);
