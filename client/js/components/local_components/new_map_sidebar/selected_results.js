import React from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';

const SelectedResults = (props) => {

  const addLocationToMap = (location) => {
    console.log('location', location);
    props.addLocationToLocalsMap(location.feature, location.lat_long);

  }

  return (
    <div>
      <h4>Selected locations</h4>
      <div>
        {props.results.map((location, idx) => {
          return (
            <ul key={idx}>
              <li>{location.feature.properties.name}</li>
              <li><button onClick={() => {addLocationToMap(location)}}>Add to map</button></li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default connect(null, syncActionCreators)(SelectedResults);
