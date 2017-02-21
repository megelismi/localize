import React from 'react'; 
import { Link, hashHistory } from 'react-router'
 

const UserMaps = (props) => {
	
	return (
		<div className="maps-list-container">
			<div className="my-maps-header-container">
				<h4 className="user-maps-header">My Saved Maps</h4>
			</div>
			<ul>
				<li><Link to="/">Portland</Link></li>
			</ul>
		</div>
	)
}

export default UserMaps; 

	// <div className="maps-list-container">
	// 			<h4 className="user-maps-header">My Maps</h4>
	// 			<ul>
	// 				<li><Link to="/">Portland</Link></li>
	// 			</ul>
	// 		</div>

				//<div className="maps-list-container">
					//<div className="my-maps-header-container"><h4 className="user-maps-header">My Saved Maps</h4></div>
					//<ul>
						//<li><Link to="/">Portland</Link></li>
					//</ul>
				//</div>
