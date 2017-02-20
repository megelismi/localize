import React from 'react';
import { connect } from 'react-redux';
import * as postActionCreators from '../../../actions/post_request.js';

const SaveMap = (props) => {

  return (
    <div>
      <button onClick={() => {props.saveMap(props.localsMapLocations)}}>Save map</button>
    </div>
  )
}

export default connect(null, postActionCreators)(SaveMap);
