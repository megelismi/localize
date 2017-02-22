import React from 'react';
import { Table } from 'react-bootstrap';  

 const UserDetailsTable = (props) => {

 	return (
	 	<div className="user-account-details">
	 		<div className="general-user-account-container"><h4>General Account Settings</h4></div>
			<div className="profile-picture-container">
				<img className="user-profile-picture" src={props.image} />
				<button className="change-profile-picture-button" onClick={props.updateProfilePicture}>Update Picture</button>
			</div>
			<div className="user-details-table">
			 	<Table>
			    <tbody>
			      <tr>
			        <td className="user-table-label">Name</td>
			        <td>{props.name}</td>
			      </tr>
			      <tr>
			        <td className="user-table-label">Username</td>
			        <td>{props.username}</td>
			      </tr>
			      <tr>
			        <td className="user-table-label">Email</td>
			        <td>{props.email}</td>
			      </tr>
			      <tr>
			        <td className="user-table-label">Bio</td>
			        <td>{props.bio}</td>
			      </tr>
			    </tbody>
			  </Table>
			 	<button className="edit-user-details-button" onClick={props.openUpdateUserDetailsModal}>Edit Account Details</button>
			 </div>
		</div>
	)
}

export default UserDetailsTable; 