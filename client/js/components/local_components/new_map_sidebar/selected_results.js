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
    this.props.showModalFunction(true);
  }

  render() {
    return (
      <div>
          {this.props.results.map((location, idx) => {
            return (
              <ul className="location-listing" key={idx}>
                <li className="location-text">
                  <h5 className=" location-text-element">{location.feature.properties.name}</h5>
                  <i onClick={() => {this.editLocationInfo(location)}} className="fa fa-pencil location-text-element" aria-hidden="true"></i>
                  <i onClick={() => {this.props.deleteLocationFromLocalsMap(location)}} className="fa fa-trash location-text-element" aria-hidden="true"></i>
                </li>
              </ul>
            )
          })}
          <EditLocationInfoModal
            location={this.state.selected}
            updateLocationInLocalsMap={this.props.updateLocationInLocalsMap}
            showModalFunction={this.props.showModalFunction} />
      </div>
    )
  }
}

export default connect(null, syncActionCreators)(SelectedResults);
