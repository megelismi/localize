import React from 'react';
import * as post_actions from '../../actions/post_request.js'; 
import * as actionCreators from '../../actions/sync.js';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';


export class FollowUpModal extends React.Component {

	constructor (props) {
		super(props); 
	}

	sendSignUpInfo (event) {
		// event.preventDefault(); 
		// let user = {
		// 	first_name: this.first_name.value, 
		// 	last_name: this.last_name.value, 
		// 	email: this.email.value,
		// 	username: this.username.value, 
		// 	password: this.password.value, 
		// 	confirmed_password: this.confirmed_password.value
		// }

		console.log('something happened')
		// this.props.dispatch(post_actions.createNewUser(user)); 
	}

	// open () {
	// 	this.props.dispatch(actionCreators.followUpModalOpen());
	// }

	close () {
		this.props.dispatch(actionCreators.signUpFollowUpModal());
	}

	render () {

		const { followUpModalOpen } = this.props;  

		return (
		<Modal show={followUpModalOpen} onHide={this.close.bind(this)}>
    	<Modal.Header closeButton>
      	<Modal.Title>Sign Up</Modal.Title>
    	</Modal.Header>
   		<Modal.Body>
   			<p>I'm the follow up!</p>
   		</Modal.Body>
   		<Modal.Footer>
    	</Modal.Footer>
  	</Modal>
		)
	}

}

const mapStateToProps = state => ({
	followUpModalOpen: state.followUpModalOpen
})

export default connect(mapStateToProps)(FollowUpModal);


