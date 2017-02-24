import React from 'react';
import { Link, hashHistory } from 'react-router'


const UserMaps = (props) => {

  const userHasMap = props.relevantUsers.filter((user) => {
    return user.id === props.id;
  });
  console.log('props', props)

  return (
    <div className="maps-list-container">
      <div className="my-maps-header-container">
        <h4 className="user-maps-header">My Saved Pins</h4>
      </div>
      <ul>
        {
          userHasMap.length === 0 ?
            <p>No maps yet!</p> :
            <button className="view-my-map" onClick={() => {hashHistory.push(`/usermap/${props.id}`)}}>My Portland</button>
        }
      </ul>
    </div>
  )
}

export default UserMaps;
