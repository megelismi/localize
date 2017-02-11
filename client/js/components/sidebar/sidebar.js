import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import ModalDisplay from './modal_display';
import DefaultSidebar from './default_sidebar';
import TagCloud from './tag_cloud';
import DisplayTags from './display_tags';
import filteredUsers from '../logic/filtered_users';

class Sidebar extends React.Component {
  constructor() {
    super();
    // this.state = { displayTagCloud: false }
    // this.displayTags = this.displayTags.bind(this);
    // this.changeTagsOnDisplay = this.changeTagsOnDisplay.bind(this);
    // this.defaultDisplay = this.defaultDisplay.bind(this);
  }

  componentDidMount() {
    this.props.getActionCreators.getUsers();
    this.props.getActionCreators.getTags();
    // this.setState({ displayTagCloud: true });
  }

  // displayTags(e) {
  //   this.props.getActionCreators.getTags();
  //   this.props.syncActionCreators.clearAllSelectedTags();
  //   this.setState({ displayTagCloud: true });
  // }

  // changeTagsOnDisplay(e) {
  //   this.props.syncActionCreators.toggleTagFilter();
  //   this.setState({ displayTagCloud: false });
  //   if (this.props.filterBoolean) {
  //     this.props.syncActionCreators.clearAllSelectedTags();
  //   }
  // }
  //
  // defaultDisplay(e) {
  //   this.props.syncActionCreators.setTagFilter();
  //   this.setState({ displayTagCloud: false });
  //   this.props.syncActionCreators.clearAllSelectedTags();
  // }

  render () {
    const { locations, mergedLocations, selectedLocation, selectedTags, filterBoolean, allTags, users } = this.props;
    let sidebarHead, sidebarBody, sidebarModal, displayTags;

    if (!this.props.users || !this.props.allTags) {
      return <div></div>
    } else {
      console.log('all tags -- sidebar', this.props.allTags);
      return (
        <div className="sidebar">
          <TagCloud boolean={true} tags={allTags} changeTagsOnDisplay={this.changeTagsOnDisplay} defaultDisplay={this.defaultDisplay} buttonText={'Filter'} />
          <DefaultSidebar locations={mergedLocations} users={users} city={'Portland'} />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  locations: state.locationState.locations,
  selectedLocation: state.locationState.selectedLocation,
  mergedLocations: state.locationState.mergedLocationInfo,
  filterBoolean: state.locationState.filterBoolean,

  allTags: state.locationState.tags,
  selectedTags: state.locationState.selectedTags,

  users: state.userState.users
});

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
