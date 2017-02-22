import React from 'react';
import { Link, hashHistory } from 'react-router'


const UserMaps = (props) => {

	return (
    
		<div className="maps-list-container">
			<div className="my-maps-header-container">
				<h4 className="user-maps-header">My Saved Maps</h4>
			</div>
			<ul>
				<button onClick={() => {hashHistory.push(`/usermap/${props.currentUser.id}`)}}>My Portland</button>
			</ul>
		</div>
	)
}

export default UserMaps;
 

