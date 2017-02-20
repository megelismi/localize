import React from 'react'; 
import { Link } from 'react-router'

const UserMaps = (props) => {

	return (
		<div>
			<h4 className="user-maps-header">My Maps</h4>
			<ul>
				<li><Link to="/">Portland</Link></li>
			</ul>
		</div>
	)
}

export default UserMaps; 