import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as syncActionCreators from '../../../actions/sync.js';
import * as postActionCreators from '../../../actions/post_request.js';
import * as getActionCreators from '../../../actions/get_request.js';

class SaveMap extends React.Component {
  constructor() {
    super();
    this.state = {
      infoText: 'Search for locations to pin them to your map, then click the edit icon to add personalized descriptions.',
      textClass: 'save-map-text'
    };
  }

  setInfoText() {
    this.setState({ infoText: "Whoops — looks like you haven't added descriptions to all of your pinned locations." });
  }
  
  saveUserLocationsToMap() {
    this.setState({ infoText: 'Yay! Your map locations have been updated!', textClass: 'save-map-text purple' });
    this.props.currentUserLocationsAndReviews.forEach((location) => {
      this.props.postActionCreators.saveMap(location);
    });
    this.props.syncActionCreators.locationsSavedModal();
  }

  render() {
    const newLocations = this.props.currentUserLocationsAndReviews.filter(location => !location.saved);
    return (
      <div>
        <h5 className={this.state.textClass}><span className="save-map-span">
          {this.state.infoText}
        </span></h5>
        {
          (newLocations.length === 0 || this.props.currentUserLocationsAndReviews.length > this.props.saveable.length) ?
            <button
              onClick={this.setInfoText.bind(this)}
              className="no-click save-map-button"
            >Publish</button> :
            <button onClick={this.saveUserLocationsToMap.bind(this)} className="save-map-button">Publish</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allLocationsAndDescriptions: state.allLocationsAndDescriptions, 
  currentUserLocationsAndReviews: state.currentUserLocationsAndReviews
});

const mapDispatchToProps = (dispatch) => {
  return {
    postActionCreators: bindActionCreators(postActionCreators, dispatch),
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveMap);
