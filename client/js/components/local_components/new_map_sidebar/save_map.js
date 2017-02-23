import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as postActionCreators from '../../../actions/post_request.js';

class SaveMap extends React.Component {
  constructor() {
    super();
    this.state = {
      infoText: `Search for locations to pin them to your map, then click the edit icon to add personalized descriptions.`
    }
  }

  saveUserLocationsToMap() {
    this.props.localsMapLocations.forEach((location) => {
      this.props.saveMap(location);
    });
    this.setState({ infoText: "Yay! Your map locations have been published!" })
  }

  setInfoText() {
    this.setState({ infoText: "Whoops — looks like you haven't added descriptions to all of your pinned locations."})
  }

  render() {
    return (
      <div>
        <h5 className="save-map-text"><span className="save-map-span">
          {this.state.infoText}
        </span></h5>
        {
          (this.props.localsMapLocations.length === 0 || this.props.localsMapLocations.length > this.props.saveable.length) ?
            <button
              onClick={this.setInfoText.bind(this)}
              className="no-click save-map-button">Save map</button> :
            <button onClick={this.saveUserLocationsToMap.bind(this)} className="save-map-button">Save map</button>
        }
      </div>
    )
  }

}

export default connect(null, postActionCreators)(SaveMap);
