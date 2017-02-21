import React from 'react';
import { connect } from 'react-redux';
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

  showTagsView() { this.setState({ displayLocals: false, displayTags: true, displayOneUser: false }) }

  showAllLocalsOrSingleLocal() {
    this.props.selectedUser ?
      this.setState({ displayLocals: false, displayTags: false, displayOneUser: true }) :
      this.setState({ displayLocals: true, displayTags: false, displayOneUser: false })
  }

  clearSelectedUser() {
    this.setState({ displayLocals: true, displayTags: false, displayOneUser: false });
    this.props.deselectUser();
  }

  selectLocalUser(user) {
    this.setState({ displayLocals: false, displayTags: false, displayOneUser: true });
    this.props.selectUserAndUpdateTags(user);
  }

  render() {
    let display, navLocalsText, filterId, userIcon;
    const { selectedLocation, selectLocationById, users, allTags, selectedTags, clearAllAppliedTags, filterByTag, selectedUser, tagsFilteredByUser } = this.props;
    if (selectedLocation) {
      display = <LocationDetailsDisplay
        locationInfo={selectedLocation}
        selectLocationById={selectLocationById} />
    } else if (this.state.displayLocals) {
      display = <LocalsDisplay
        city={'Portland'}
        users={users}
        clearAllAppliedTags={clearAllAppliedTags}
        selectLocalUser={this.selectLocalUser.bind(this)} />
    } else if (this.state.displayTags) {
      display = <TagsDisplay
        tags={tagsFilteredByUser ? tagsFilteredByUser : allTags}
        selected={selectedTags}
        clearAllAppliedTags={clearAllAppliedTags}
        filterByTag={filterByTag} />
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

const mapStateToProps = (state) => ({
  users: state.users,
  selectedTags: state.selectedTags,
  allTags: state.allTags,
  selectedLocation: state.selectedLocation,
  selectedUser: state.selectedUser,
  tagsFilteredByUser: state.tagsFilteredByUser
});

export default connect(mapStateToProps, syncActionCreators)(NewSidebar);
