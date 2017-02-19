import React from 'react';
import * as post_actions from '../../actions/post_request.js'; 
import * as actionCreators from '../../actions/sync.js';
import {connect} from 'react-redux';
import { Modal } from 'react-bootstrap';

class EditUserDetails extends React.Component {

	constructor (props) {
		super(props); 
	}

	sendUpdatedInfo (event) {
		event.preventDefault(); 
		console.log('sending'); 
	}

	close () {
		console.log('closed');
		this.props.dispatch(actionCreators.editUserDetailsModal())
	}

	render () {

		const { editUserDetailsModalOpen } = this.props; 
	
		return (
			<Modal show={editUserDetailsModalOpen} onHide={this.close.bind(this)}>
    	<Modal.Header closeButton>
      	<Modal.Title>Edit Account</Modal.Title>
    	</Modal.Header>
   		<Modal.Body>
				<div className="account-details-container">
					<div className="user-label first-name-label">First name:</div>
					<div className="user-edit edit-first-name" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.firstName = element}>First name</div>
				</div>
				<div className="account-details-container">
					<div className="user-label last-name-label">Last name:</div>
					<div className="user-edit edit-last-name" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.lastName = element}>Last name</div>
				</div>
				<div className="account-details-container">
					<div className="user-label username-label">Username:</div>
					<div className="user-edit edit-username" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.username = element}>Username</div>
				</div>
				<div className="account-details-container">
					<div className="user-label email-label">Email:</div>
					<div className="user-edit edit-email" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.email = element}>Email</div>
				</div>
				<div className="account-details-container">
					<div className="user-label password-label">Password:</div>
					<div className="user-edit edit-password" type="password" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.password = element}>Password</div>
				</div>
				<div className="account-details-container">
					<div className="user-label bio-label">Bio:</div>
					<div className="user-edit edit-bio" contentEditable={true} suppressContentEditableWarning={true} ref={element => this.bio = element}>Bio</div>
				</div>
			</Modal.Body>
    	<Modal.Footer>
			<button>Save</button>
			</Modal.Footer>
  		</Modal>
		)
	}

}

const mapStateToProps = (state) => ({
	editUserDetailsModalOpen: state.editUserDetailsModalOpen
})

export default connect(mapStateToProps)(EditUserDetails);
