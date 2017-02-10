import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import ModalDisplay from './modal_display';
import DefaultSidebar from './default_sidebar';
import TagCloud from './tag_cloud';
import filteredUsers from '../logic/filtered_users';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = { displayTagCloud: false }
    this.displayTags = this.displayTags.bind(this);
    this.changeTagsOnDisplay = this.changeTagsOnDisplay.bind(this);
    this.defaultDisplay = this.defaultDisplay.bind(this);
  }

  componentDidMount() {
    this.props.getActionCreators.getUsers();
  }

  displayTags(e) {
    this.props.getActionCreators.getTags()
    this.props.syncActionCreators.clearAllSelectedTags();
    this.setState({ displayTagCloud: true });
  }

  changeTagsOnDisplay(e) {
    this.props.syncActionCreators.toggleTagFilter();
    this.setState({ displayTagCloud: false });
    if (this.props.filter) {
      this.props.syncActionCreators.clearAllSelectedTags();
    }
  }

  defaultDisplay(e) {
    this.props.syncActionCreators.setTagFilter();
    this.setState({ displayTagCloud: false });
    this.props.syncActionCreators.clearAllSelectedTags();
  }

  render () {
    const selectedUser = null;
    const { locations, mergedLocations, selectedLocation, selectedTags, filter, showAllTags, allTags, users } = this.props;
    if (!this.props.users) {
      return <div></div>
    } else {
      let selectedUsers = filteredUsers(mergedLocations, users);
      if ((selectedLocation) && locations) {
        const selected = mergedLocations.filter((location) => location.id === selectedLocation );
        return <ModalDisplay title={selected[0].name} info={selected[0].long_description} />
      }
      if (selectedUser) {
        return <ModalDisplay title={selected[0].name} info={selected[0].long_description} />
      }
      if (filter) {
        return <TagCloud tags={selectedTags} changeTagsOnDisplay={this.changeTagsOnDisplay} defaultDisplay={this.defaultDisplay} buttonText={'Clear filters'} />
      }
      if (showAllTags && this.state.displayTagCloud) {
        return <TagCloud tags={allTags} changeTagsOnDisplay={this.changeTagsOnDisplay} defaultDisplay={this.defaultDisplay} buttonText={'Filter'} />
      }
      return <DefaultSidebar displayTags={this.displayTags} locations={mergedLocations} users={selectedUsers} city={'Portland'} />
    }
  }
}

const mapStateToProps = (state) => ({
  locations: state.locationState.locations,
  selectedLocation: state.locationState.selectedLocation,
  allTags: state.locationState.tags,
  selectedTags: state.locationState.selectedTags,
  filter: state.locationState.filter,
  showAllTags: state.locationState.showAllTags,
  mergedLocations: state.locationState.mergedLocationInfo,
  users: state.userState.users
});

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
