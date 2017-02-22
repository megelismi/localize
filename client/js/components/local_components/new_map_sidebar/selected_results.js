import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import EditLocationInfoModal from '../modals/edit_location_info_modal';
import UploadLocationPhotoModal from '../modals/upload_location_photo_modal';

class SelectedResults extends Component {
  constructor() {
    super();
    this.state = { selected: null }
  }

  editLocationInfo(location) {
    this.setState({ selected: location });
    this.props.showModalFunction(true);
  }

  render() {
    return (
      <div>
          {this.props.results.map((location, idx) => {
            let { short_description, long_description, tag_array, image } = location;
            let progressMarker = short_description && long_description && tag_array ?
              <i className="fa fa-check location-text-element" aria-hidden="true"></i> :
              null
            return (
              <ul className="location-listing" key={idx}>
                <li className="location-text">
                  {progressMarker}
                  <h5 className="location-text-element">{location.feature.properties.name}</h5>
                  <i onClick={() => {this.editLocationInfo(location)}} className="fa fa-pencil location-text-element" aria-hidden="true"></i>
                  <i onClick={() => {this.props.deleteLocationFromLocalsMap(location)}} className="fa fa-trash location-text-element" aria-hidden="true"></i>
                </li>
              </ul>
            )
          })}
          <EditLocationInfoModal
            currentUser={this.props.currentUser}
            location={this.state.selected}
            updateLocationInLocalsMap={this.props.updateLocationInLocalsMap}
            showModalFunction={this.props.showModalFunction} />
          <UploadLocationPhotoModal
            location={this.state.selected}
            updateLocationInLocalsMap={this.props.updateLocationInLocalsMap}
            showUploadModalFunction={this.props.showUploadModalFunction} />
      </div>
    )
  }
}

export default connect(null, syncActionCreators)(SelectedResults);
