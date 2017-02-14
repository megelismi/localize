import React from 'react';

const LocalDetailsDisplay = (props) => {

    return (
      <div className="sidebar-inner-container">
        <ul>
          <li className="locals-details-name">{props.userInfo.first_name}</li>
          <img className="locals-details-image" src={props.userInfo.image} />
          <li>{props.userInfo.bio}</li>
        </ul>
      </div>
    )
}

export default LocalDetailsDisplay;
