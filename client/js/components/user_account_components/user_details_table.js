import React from 'react';
import { Table } from 'react-bootstrap';  

 const UserDetailsTable = (props) => {

 	return (
	 	<div className="user-account-details">
		<h4 className="account-settings-header">General Account Settings</h4>
		 	<Table responsive>
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
		 	<button className="edit-user-details accent-button" onClick={props.openUpdateUserDetailsModal}>Edit Account</button>
		</div>
	)
}

export default UserDetailsTable; 