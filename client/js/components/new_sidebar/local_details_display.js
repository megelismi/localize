import React from 'react';

const LocalDetailsDisplay = (props) => {

    return (
      <div className="sidebar-inner-container">
        <button className="filter-button" onClick={props.clearSelectedUser}>Show all users</button>
        <ul>
          <li className="locals-details-name">{props.userInfo.first_name}</li>
          <img className="locals-details-image" src={props.userInfo.image} />
          <li className="locals-details-bio">{props.userInfo.bio}</li>
        </ul>
      </div>
    )
}

export default LocalDetailsDisplay;
