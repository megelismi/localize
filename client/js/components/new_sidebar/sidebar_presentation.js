import React from 'react';

const SidebarPresentation = (props) => {

  const { selectedTags, selectedUser, showAllOrSingle, showTags, display } = props;
  let filterId, userIcon;

  selectedTags.length > 0 ? filterId = "filters-on" : filterId = null;

  if (selectedUser) {
    userIcon = <button className="sidebar-nav-button" onClick={showAllOrSingle}>
        <span className="user-hover"><i className="fa fa-user fa-2x" aria-hidden="true"></i></span>
        <div className="hover-text">{selectedUser.first_name}</div>
      </button>
  } else {
    userIcon = <button className="sidebar-nav-button" onClick={showAllOrSingle}>
      <span className="users-hover"><i className="fa fa-users fa-2x" aria-hidden="true"></i></span>
      <div className="hover-text">All users</div>
    </button>
  }

  return (
    <div className="sidebar">
      <div className="sidebar-nav">
        <ul>
          <li>
            <button className="sidebar-nav-button" onClick={showTags}>
              <span className="filter-hover"><i className="fa fa-filter fa-2x" id={filterId} aria-hidden="true"></i></span>
                <div className="hover-text">Filter</div>
            </button>
          </li>
          <li>
            {userIcon}
          </li>
        </ul>
      </div>
      {display}
    </div>
  )
}

export default SidebarPresentation;
