import React from 'react';

const LocalDetailsDisplay = (props) => {

    return (
      <div>
        <ul>
          <li>{props.userInfo.first_name}</li>
          <img src={props.userInfo.image} />
          <li>{props.userInfo.bio}</li>
        </ul>
      </div>
    )
}

export default LocalDetailsDisplay;
