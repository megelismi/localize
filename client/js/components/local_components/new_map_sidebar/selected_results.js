import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import EditLocationInfoModal from '../modals/edit_location_info_modal';
import UploadLocationPhotoModal from '../modals/upload_location_photo_modal';

class SelectedResults extends Component {
  constructor() {
    super();
    this.state = { selected: null };
  }

  editLocationInfo(location) {
    this.setState({ selected: location });
    this.props.editLocationDetailModalFunction(true);
  }

  render() {
    if (this.props.results === undefined) {
      return (
        <div />
      );
    }
    return (
      <div className="bordered">
          {this.props.results.map((location, idx) => {
            const { short_description, long_description } = location;
            let progressMarker; 
            let complete;
            if (location.saved) {
              progressMarker = <i className="fa fa-check location-text-element fa-lg" aria-hidden="true" />;
              complete = 'location-text saved-location';
            } else if (short_description && long_description) {
              progressMarker = <i className="fa fa-check location-text-element fa-lg" aria-hidden="true" />;
              complete = 'location-text complete';
            } else {
              progressMarker = null;
              complete = 'location-text';
            }

            return (
              <ul className="location-listing" key={idx}>
                <li className={complete}>
                  {progressMarker}
                  <h5 className="location-text-element">{location.locationInfo.name}</h5>
                  <i
                    onClick={() => { this.editLocationInfo(location); }}
                    className="fa fa-pencil location-text-icon fa-lg"
                    aria-hidden="true"
                  />
                </li>
              </ul>
            );
          })}
          <EditLocationInfoModal
            currentUser={this.props.currentUser}
            location={this.state.selected}
            updateLocationInLocalsMap={this.props.updateLocationInLocalsMap}
            editLocationDetailModal={this.props.editLocationDetailModalFunction}
          />
          <UploadLocationPhotoModal
            location={this.state.selected}
            updateLocationInLocalsMap={this.props.updateLocationInLocalsMap}
            showUploadModalFunction={this.props.showUploadModalFunction}
          />
      </div>
    );
  }
}

export default connect(null, syncActionCreators)(SelectedResults);
