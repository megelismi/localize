import React from 'react';

const LocalDetailsDisplay = (props) => {
    return (
    <div>
       <button className="locals-details-button" onClick={props.clearSelectedUser}>Show all users</button>
        <ul>
          <li className="locals-details-name">{props.userInfo.first_name}</li>
          <img className="locals-details-image" role="presentation" src={props.userInfo.image} />
          <li className="locals-details-bio">{props.userInfo.bio}</li>
        </ul>
      </div>
    );
};

export default LocalDetailsDisplay;
