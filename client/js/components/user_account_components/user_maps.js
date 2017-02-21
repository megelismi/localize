import React from 'react';
import { Link, hashHistory } from 'react-router'


const UserMaps = (props) => {

	return (
		<div className="user-maps-container">
			<div className="maps-list-container">
				<h4 className="user-maps-header">
          <button onClick={() => {hashHistory.push(`/usermap/${props.currentUser.id}`)}}>My Portland</button>
        </h4>
			</div>
			<div className="create-map-container">
				<button className="accent-button create-map-button" onClick={() => {hashHistory.push(`/newmap/${props.currentUser.id}`)}}>Create Map</button>
			</div>
		</div>
	)
}

export default UserMaps;
