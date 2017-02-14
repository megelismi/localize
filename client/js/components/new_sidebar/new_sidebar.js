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
  }

  showTagsView() { this.setState({ displayLocals: false, displayTags: true, displayOneUser: false }) }

  showLocalsView() {
    this.setState({ displayLocals: true, displayTags: false, displayOneUser: false })
    this.props.selectUserAndUpdateTags(null);
  }

  selectLocalUser(user) {
    this.setState({ displayLocals: false, displayTags: false, displayOneUser: true })
    this.props.selectUserAndUpdateTags(user);
  }

  render() {
    let display;
    let filterId; 
    const { selectedLocation, selectById, users, selectUser, filteredTags, selectedTags, clearAllAppliedTags, filterByTag, selectedUser } = this.props;
    if (selectedLocation) {
      display = <LocationDetailsDisplay
        locationInfo={selectedLocation}
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
    
    selectedTags.length > 0 ? filterId = "filters-on" : filterId =  null; 

    return (
      <div className="sidebar">
        <div className="sidebar-nav">
          <ul>
            <li> 
              <button className="sidebar-nav-button" onClick={this.showTagsView.bind(this)}>
                <span className="filter-hover"><i className="fa fa-filter fa-2x" id={filterId} aria-hidden="true"></i></span>
                  <div className="hover-text">Filter</div>
              </button>
            </li>
            <li> 
              <button className="sidebar-nav-button" onClick={this.showLocalsView.bind(this)}>
                <span className="users-hover"><i className="fa fa-users fa-2x" aria-hidden="true"></i></span>
                  <div className="hover-text">All users</div>
              </button>

              <button className="sidebar-nav-button">
                <span className="user-hover"><i className="fa fa-user fa-2x" aria-hidden="true"></i></span>
                  <div className="hover-text">User</div>
              </button>
            </li>
          </ul>
        </div>
        {display}
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


   //<div>
          //<button onClick={this.showAllUsers.bind(this)}>The locals</button>
          //<button onClick={this.showTagsView.bind(this)}>{"What are you looking for?"}</button>
        //</div>


//<div className="sidebar-inner-container">{display}</div>
