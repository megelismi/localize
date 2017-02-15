import React from 'react';

const SidebarPresentation = (props) => {

        // navLocalsText = selectedUser ? selectedUser.first_name : 'All users'

  const { selectedTags, selectedUser, showAllOrSingle, showTags, display } = props;
  let filterId, userIcon, iconText;

  selectedTags.length > 0 ? filterId = "filters-on" : filterId = null;

  if (selectedUser) {
    userIcon = <i className="fa fa-user fa-2x" aria-hidden="true"></i>
    iconText = selectedUser.first_name
  } else {
    userIcon = <i className="fa fa-users fa-2x" aria-hidden="true"></i>
    iconText = "All users"
  }

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <ul>
          <li>
            <button className="sidebar-nav-button" onClick={showTags}>
              <span className="filter-hover">
                <i className="fa fa-filter fa-2x" id={filterId} aria-hidden="true"></i>
              </span>
              <div className="hover-text">Filter</div>
            </button>
          </li>
          <li>
            <button className="sidebar-nav-button" onClick={showAllOrSingle}>
              <span className="user-hover">{userIcon}</span>
              <div className="hover-text">{iconText}</div>
            </button>
          </li>
        </ul>
      </div>
      {display}
    </div>
  )
}

export default SidebarPresentation;
