import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActionCreators from '../../../actions/post_request.js'
import * as syncActionCreators from '../../../actions/sync.js';
import SidebarPresentation from './sidebar_presentation';
import LocalDetailsDisplay from './local_details_display';
import LocationDetailsDisplay from './location_details_display';
import LocalsDisplay from './locals_display';
import TagsDisplay from './tags_display';

class NewSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayLocals: props.locals, displayTags: false, displayOneUser: props.oneLocal }
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
      this.setState({ displayLocals: true, displayTags: false, displayOneUser: false })
  }

  clearSelectedUser() {
    this.setState({ displayLocals: true, displayTags: false, displayOneUser: false });
    this.props.syncActionCreators.deselectUser();
  }

  selectLocalUser(user) {
    this.setState({ displayLocals: false, displayTags: false, displayOneUser: true });
    this.props.syncActionCreators.filterLocations(user.locations, 'FILTER_LOCATIONS_BY_USER'); 
    this.props.syncActionCreators.selectUser(user); 
  }

  filterByTags(tagId, locationId) {
    if (this.props.selectedTags.indexOf(tagId) === -1) {
      this.props.syncActionCreators.addSelectedTag(tagId);

      let locationAlreadyBeingFiltered = false;
      let i = 0; 
      let filteredLocations = this.props.filteredLocations; 
      while (!locationAlreadyBeingFiltered && i < filteredLocations.length) {
        if (locationId.indexOf(filteredLocations[i].id) !== -1 && this.props.selectedTags.length > 0) {
          locationAlreadyBeingFiltered = true; 
        }
        i++; 
      }
      
      if (!locationAlreadyBeingFiltered) {
        this.props.syncActionCreators.filterLocations(locationId, 'FILTER_LOCATIONS_BY_TAGS'); 
      }
    } 
    else {
      this.props.syncActionCreators.removeSelectedTagAndLocationFromMap(tagId, locationId);
    }

  }

  render() {
    let display, navLocalsText, filterId, userIcon;
    const { selectedLocation, selectLocationById, relevantUsers, selectedTags, clearAllAppliedTags, selectedUser, tagsFilteredByUser, tags } = this.props;
    if (selectedLocation) {
      display = <LocationDetailsDisplay
        locationInfo={selectedLocation}
        selectLocationById={selectLocationById} />
    } else if (this.state.displayLocals) {
      display = <LocalsDisplay
        city={'Portland'}
        users={relevantUsers}
        clearAllAppliedTags={clearAllAppliedTags}
        selectLocalUser={this.selectLocalUser.bind(this)} />
    } else if (this.state.displayTags) {
      display = <TagsDisplay
        tags={tags}
        selected={selectedTags}
        clearAllAppliedTags={clearAllAppliedTags}
        filterByTag={this.filterByTags.bind(this)} />
    } else if (this.state.displayOneUser) {
      display = <LocalDetailsDisplay
        clearSelectedUser={this.clearSelectedUser.bind(this)}
        userInfo={selectedUser} />
    }

    return (
      <SidebarPresentation
        display={display}
        selectedTags={selectedTags}
        selectedUser={selectedUser}
        showTags={this.showTagsView.bind(this)}
        showAllOrSingle={this.showAllLocalsOrSingleLocal.bind(this)} />
    )
  }
}

        // filterByTag={() => {this.props.syncActionCreators.filterByTag()}} />

const mapStateToProps = (state) => ({
  relevantUsers: state.relevantUsers,
  selectedTags: state.selectedTags,
  tags: state.tags,
  selectedLocation: state.selectedLocation,
  selectedUser: state.selectedUser,
  tagsFilteredByUser: state.tagsFilteredByUser, 
  filteredLocations: state.filteredLocations
});

const mapDispatchToProps = dispatch => {
  return {
    postActionCreators: bindActionCreators(postActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSidebar);
