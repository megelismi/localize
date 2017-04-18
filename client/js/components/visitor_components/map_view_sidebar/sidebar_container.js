import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActionCreators from '../../../actions/post_request.js';
import * as syncActionCreators from '../../../actions/sync.js';
import SidebarPresentation from './sidebar_presentation';
import LocalDetailsDisplay from './local_details_display';
import LocationDetailsDisplay from './location_details_display';
import LocalsDisplay from './locals_display';
import TagsDisplay from './tags_display';

class NewSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayLocals: props.locals, displayTags: false, displayOneUser: props.oneLocal };
  }

  componentWillMount() {
    this.props.syncActionCreators.deselectUser();
  }

  showTagsView() { 
    this.setState({ displayLocals: false, displayTags: true, displayOneUser: false });
    this.props.postActionCreators.getRelevantTags(this.props.filteredLocations); 
  }

  showAllLocalsOrSingleLocal() {
    this.props.selectedUser ?
      this.setState({ displayLocals: false, displayTags: false, displayOneUser: true }) :
      this.setState({ displayLocals: true, displayTags: false, displayOneUser: false });
  }

  clearSelectedUser() {
    this.setState({ displayLocals: true, displayTags: false, displayOneUser: false });
    this.props.syncActionCreators.deselectUser();
  }

  selectLocalUser(user) {
    this.setState({ displayLocals: false, displayTags: false, displayOneUser: true });
    this.props.syncActionCreators.filterLocationsByUser(user.locations, this.props.allLocations);
    this.props.syncActionCreators.selectUser(user); 
  }

  clearAllAppliedTags() {
    this.props.syncActionCreators.clearAllAppliedTags(); 
    if (this.props.selectedUser) {
      this.props.syncActionCreators.filterLocationsByUser(this.props.selectedUser.locations, this.props.allLocations); 
    } else {
      this.props.syncActionCreators.resetLocations(); 
    }
  }

  filterByTags(tagId) {
    if (this.props.selectedTags.indexOf(tagId) === -1) {
      this.props.syncActionCreators.addSelectedTag(tagId);
      this.props.postActionCreators.getLocationsForTags(); 
    } else {
      this.props.syncActionCreators.removeSelectedTag(tagId);
    }
  }

  selectLocationById(locationId) {
    this.props.syncActionCreators.selectLocationById(locationId); 
  }

  render() {
    let display;
    const { selectedLocation, relevantUsers, selectedTags, selectedUser, tags, selectedLocationReviews, selectedLocationName } = this.props;
    if (selectedLocation) {
      display = (<LocationDetailsDisplay
        reviewInfo={selectedLocationReviews}
        locationName={selectedLocationName}
        selectLocalUser={this.selectLocalUser.bind(this)}
        selectLocationById={this.selectLocationById.bind(this)}
      />);
    } else if (this.state.displayLocals) {
      display = (<LocalsDisplay
        city={'Portland'}
        users={relevantUsers}
        clearAllAppliedTags={this.clearAllAppliedTags.bind(this)}
        selectLocalUser={this.selectLocalUser.bind(this)}
      />);
    } else if (this.state.displayTags) {
      display = (<TagsDisplay
        tags={tags}
        selected={selectedTags}
        clearAllAppliedTags={this.clearAllAppliedTags.bind(this)}
        filterByTag={this.filterByTags.bind(this)}
      />);
    } else if (this.state.displayOneUser) {
      display = (<LocalDetailsDisplay
        clearSelectedUser={this.clearSelectedUser.bind(this)}
        userInfo={selectedUser}
      />);
    }

    return (
      <SidebarPresentation
        display={display}
        selectedTags={selectedTags}
        selectedUser={selectedUser}
        showTags={this.showTagsView.bind(this)}
        showAllOrSingle={this.showAllLocalsOrSingleLocal.bind(this)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  allLocations: state.locations,
  relevantUsers: state.relevantUsers,
  selectedTags: state.selectedTags,
  tags: state.tags,
  selectedLocation: state.selectedLocation,
  selectedLocationReviews: state.selectedLocationReviews,
  selectedLocationName: state.selectedLocationName,
  selectedUser: state.selectedUser,
  tagsFilteredByUser: state.tagsFilteredByUser, 
  filteredLocations: state.filteredLocations
});

const mapDispatchToProps = dispatch => {
  return {
    postActionCreators: bindActionCreators(postActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSidebar);
