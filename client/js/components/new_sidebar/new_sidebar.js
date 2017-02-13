import React from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../actions/sync.js';
import LocalDetailsDisplay from './local_details_display';
import LocationDetailsDisplay from './location_details_display';
import LocalsDisplay from './locals_display';
import TagsDisplay from './tags_display';

class NewSidebar extends React.Component {
  constructor() {
    super();
    this.state = { displayLocals: true, displayTags: false, displayOneUser: false }
    this.showLocalsView = this.showLocalsView.bind(this);
  }

  showLocalsView() { this.setState({ displayLocals: true, displayTags: false, displayOneUser: false }) }
  showTagsView() { this.setState({ displayLocals: false, displayTags: true, displayOneUser: false }) }

  showAllUsers() {
    this.showLocalsView();
    this.props.selectUser(null);
  }

  selectLocalUser(user) {
    this.setState({ displayLocals: false, displayTags: false, displayOneUser: true })
    this.props.selectUserAndUpdateTags(user);
  }

  render() {
    console.log('new SIDEBAR PROPS', this.props)
    let display;
    const { selectedLocation, selectById, users, selectUser, filteredTags, selectedTags, clearAllAppliedTags, filterByTag, selectedUser } = this.props;
    if (selectedLocation) {
      display = <LocationDetailsDisplay
        name={selectedLocation.name}
        info={selectedLocation.long_description}
        selectById={selectById} />
    } else if (this.state.displayLocals) {
      display = <LocalsDisplay
        city={'Portland'}
        users={users}
        selectLocalUser={this.selectLocalUser.bind(this)} />
    } else if (this.state.displayTags) {
      display = <TagsDisplay
        tags={filteredTags}
        selected={selectedTags}
        clearAllAppliedTags={clearAllAppliedTags}
        filterByTag={filterByTag} />
    } else if (this.state.displayOneUser) {
      display = <LocalDetailsDisplay
        userInfo={selectedUser} />
    }

    return (
      <div>
        <div>
          <button onClick={this.showAllUsers.bind(this)}>The locals</button>
          <button onClick={this.showTagsView.bind(this)}>{"What are you looking for?"}</button>
        </div>
        <br /><br />
        <div>{display}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  selectedTags: state.selectedTags,
  filteredTags: state.filteredTags,
  selectedLocation: state.selectedLocation,
  selectedUser: state.selectedUser
});

export default connect(mapStateToProps, syncActionCreators)(NewSidebar);
