import React from 'react';
import { Table } from 'react-bootstrap';  

 const UserDetailsTable = (props) => {

 	return (
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
	)
}

export default UserDetailsTable; 