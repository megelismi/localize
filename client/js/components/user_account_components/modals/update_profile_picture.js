import React from 'react'; 
import * as post_actions from '../../../actions/post_request.js'; 
import * as put_actions from '../../../actions/put_request.js'; 
import * as actionCreators from '../../../actions/sync.js';
import {connect} from 'react-redux';
import { Modal } from 'react-bootstrap';

class UpdateProfilePicture extends React.Component {
	
	constructor (props) {
		super(props)
	}

	closeModal () {
		this.props.dispatch(actionCreators.updateProfilePictureModal())
	}

	saveAndSendDetails () {
		console.log('saving and sending');
		this.props.dispatch(actionCreators.updateProfilePictureModal());
	}


	render () {

		const { updateProfilePictureModalOpen, currentUser } = this.props; 
		console.log('from modal component', updateProfilePictureModalOpen);

		return (
			<Modal show={updateProfilePictureModalOpen} onHide={this.closeModal.bind(this)}>
	    	<Modal.Header closeButton>
	      	<Modal.Title>Update Profile Picture</Modal.Title>
	    	</Modal.Header>
	   		<Modal.Body className="edit-user-details-modal-body">
					<p>Update picture</p>
				</Modal.Body>
	    	<Modal.Footer>
				<button className="accent-button save-user-details-button" onClick={this.saveAndSendDetails.bind(this)}>Save</button>
				</Modal.Footer>
  		</Modal>
  	)
	}
}

const mapStateToProps = state => ({
	updateProfilePictureModalOpen: state.updateProfilePictureModalOpen, 
	currentUser: state.currentUser
})

export default connect(mapStateToProps)(UpdateProfilePicture);


