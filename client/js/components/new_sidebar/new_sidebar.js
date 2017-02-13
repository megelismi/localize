import React from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../actions/sync.js';
import LocationDetailsDisplay from './location_details_display';
import LocalsDisplay from './locals_display';
import TagsDisplay from './tags_display';

class NewSidebar extends React.Component {
  constructor() {
    super();
    this.state = { displayLocals: true, displayTags: false }
    this.showLocalsView = this.showLocalsView.bind(this);
  }

  showLocalsView() { this.setState({ displayLocals: true, displayTags: false }) }
  showTagsView() { this.setState({ displayLocals: false, displayTags: true }) }

  showAllUsers() {
    console.log('show all users')
    this.showLocalsView();
    this.props.selectUser(null);
  }

  render() {
    let display;
    const { selectedLocation, selectById, users, selectUser, filteredTags, selectedTags, clearAllAppliedTags, filterByTag } = this.props;
    if (selectedLocation) {
      display = <LocationDetailsDisplay
        name={selectedLocation.name}
        info={selectedLocation.long_description}
        selectById={selectById} />
    } else if (this.state.displayLocals) {
      display = <LocalsDisplay
        city={'Portland'}
        users={users}
        selectUser={selectUser} />
    } else if (this.state.displayTags) {
      display = <TagsDisplay
        tags={filteredTags}
        selected={selectedTags}
        clearAllAppliedTags={clearAllAppliedTags}
        filterByTag={filterByTag} />
    }

    return (
      <div className="sidebar">
        <div className="sidebar-nav">
          <ul>
            <li> <button className="sidebar-nav-button" onClick={this.showTagsView.bind(this)}>{"Filter"}</button></li>
            <li> <button className="sidebar-nav-button" onClick={this.showAllUsers.bind(this)}>{"Users"}</button></li>
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
  filteredTags: state.filteredTags,
  selectedLocation: state.selectedLocation
});

export default connect(mapStateToProps, syncActionCreators)(NewSidebar);


   //<div>
          //<button onClick={this.showAllUsers.bind(this)}>The locals</button>
          //<button onClick={this.showTagsView.bind(this)}>{"What are you looking for?"}</button>
        //</div>
