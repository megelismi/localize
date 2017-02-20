import React from 'react';
import { connect } from 'react-redux';
import * as postActionCreators from '../../../actions/post_request.js';

const SaveMap = (props) => {

  console.log('props.localsMapLocations.length', props.localsMapLocations.length);
  console.log('props.localsMapLocations.length > props.saveable.length', props.localsMapLocations.length > props.saveable.length);
  console.log('saveable', props.saveable)

  if (props.localsMapLocations.length === 0 || props.localsMapLocations.length > props.saveable.length) {
    return (
      <div>
        <button
          onClick={() => {props.saveMap(props.localsMapLocations)}}
          className="disabled save-map-button" disabled>Save map</button>
      </div>
    )
  } else {
    return (
      <div>
        <button
          onClick={() => {props.saveMap(props.localsMapLocations)}}
          className="disabled save-map-button">Save map</button>
      </div>
    )
  }
}

export default connect(null, postActionCreators)(SaveMap);
