import React from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../actions/sync.js';
// import SidebarNav from './sidebar_nav';
import LocalDetailsDisplay from './local_details_display';
import LocationDetailsDisplay from './location_details_display';
import LocalsDisplay from './locals_display';
import TagsDisplay from './tags_display';

class NewSidebar extends React.Component {
  constructor() {
    super();
    this.state = { displayLocals: true, displayTags: false, displayOneUser: false }
  }

  showTagsView() { this.setState({ displayLocals: false, displayTags: true, displayOneUser: false }) }

  showLocalsView() {
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
    if (user) {
      this.props.selectUserAndUpdateTags(user);
    }
  }

  render() {
    let display;
    const { selectedLocation, selectLocationById, users, selectUser, allTags, selectedTags, clearAllAppliedTags, filterByTag, selectedUser, tagsFilteredByUser } = this.props;
    let navLocalsText;
    if (selectedLocation) {
      navLocalsText = selectedUser ? selectedUser.first_name : 'All users'
      display = <LocationDetailsDisplay
        locationInfo={selectedLocation}
        selectLocationById={selectLocationById} />
    } else if (this.state.displayLocals) {
      navLocalsText = 'All users'
      display = <LocalsDisplay
        city={'Portland'}
        users={users}
        selectLocalUser={this.selectLocalUser.bind(this)} />
    } else if (this.state.displayTags) {
      navLocalsText = selectedUser ? selectedUser.first_name : 'All users'
      let tags = tagsFilteredByUser ? tagsFilteredByUser : allTags
      display = <TagsDisplay
        boolean={selectedUser ? true : false}
        tags={tags}
        selected={selectedTags}
        clearAllAppliedTags={clearAllAppliedTags}
        filterByTag={filterByTag} />
    } else if (this.state.displayOneUser) {
      navLocalsText = selectedUser.first_name
      display = <LocalDetailsDisplay
        clearSelectedUser={this.clearSelectedUser.bind(this)}
        userInfo={selectedUser} />
    }

    return (
      <div className="sidebar">
        <div className="sidebar-nav">
          <ul>
            <li> <button className="sidebar-nav-button" onClick={this.showTagsView.bind(this)}>Filter</button></li>
            <li> <button className="sidebar-nav-button" onClick={this.showLocalsView.bind(this)}>{navLocalsText}</button></li>
          </ul>
        </div>
        <div className="sidebar-inner-container">{display}</div>
      </div>
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
