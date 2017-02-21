import React from 'react'; 
import { Link, hashHistory } from 'react-router'
 

const UserMaps = (props) => {
	
	return (
		<div className="user-maps-container">
			<div className="create-map-container">
				<button className="accent-button create-map-button" onClick={() => {hashHistory.push('/newmap')}}>Create Map</button>
			</div>
		</div>
	)
}

export default UserMaps; 

	//<div className="maps-list-container">
				//<h4 className="user-maps-header">My Maps</h4>
				//<ul>
					//<li><Link to="/">Portland</Link></li>
				//</ul>
			//</div>
