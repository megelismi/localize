import React from 'react';

const SidebarPresentation = (props) => {
  const { selectedTags, selectedUser, showAllOrSingle, showTags, display } = props;
  let filterId, 
  userIcon, 
  iconText;

  selectedTags.length > 0 ? filterId = 'filters-on' : filterId = null;

  if (selectedUser) {
    userIcon = <i className="fa fa-user fa-2x" aria-hidden="true" />;
    iconText = selectedUser.first_name;
  } else {
    userIcon = <i className="fa fa-users fa-2x" aria-hidden="true" />;
    iconText = 'All users';
  }

  return (
    <div className="sidebar main-maps-sidebar">
      <div className="sidebar-nav">
        <ul>
          <li>
            <button className="sidebar-nav-button" onClick={showTags}>
              <span className="filter-hover">
                <i className="fa fa-filter fa-2x" id={filterId} aria-hidden="true" />
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
       <div className="sidebar-inner-container">
        {display}
      </div>
    </div>
  );
};

export default SidebarPresentation;
