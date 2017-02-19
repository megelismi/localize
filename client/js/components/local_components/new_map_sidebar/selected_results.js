import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import EditLocationInfoModal from '../modals/edit_location_info_modal';

class SelectedResults extends Component {
  constructor() {
    super();
    this.state = { selected: null }
  }

  editLocationInfo(location) {
    this.setState({ selected: location });
    this.props.showModal(true);
  }

  render() {
    return (
      <div>
        <h4>Selected locations</h4>
          {this.props.results.map((location, idx) => {
            return (
              <ul key={idx}>
                <li>
                  {location.feature.properties.name}
                  <i onClick={() => {this.editLocationInfo(location)}} className="fa fa-pencil" aria-hidden="true"></i>
                  <i onClick={console.log('Delete from map')}className="fa fa-trash" aria-hidden="true"></i>
                </li>
              </ul>
            )
          })}
          <EditLocationInfoModal location={this.state.selected} />
      </div>
    )
  }
}

export default connect(null, syncActionCreators)(SelectedResults);


// addLocationToMap(location) {
//   this.props.addLocationToLocalsMap(
//     location.feature,
//     location.lat_long,
//     this.shortDescription.value,
//     this.longDescription.value
//   );
//   this.shortDescription.value = '';
//   this.longDescription.value = '';
// }
