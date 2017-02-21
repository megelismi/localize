import React from 'react'; 
import * as post_actions from '../../../actions/post_request.js'; 
import * as put_actions from '../../../actions/put_request.js'; 
import * as actionCreators from '../../../actions/sync.js';
import {connect} from 'react-redux';
import { Modal } from 'react-bootstrap';
import ImageUpload from '../../local_components/pictures/image_upload';
import request from 'superagent';
import Dropzone from 'react-dropzone';

const CLOUDINARY_UPLOAD_PRESET = 'lbvileyb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/megelismi/upload';

class UpdateProfilePicture extends React.Component {
	
	constructor (props) {
		super(props)
		this.state = {
			uploadedFileCloudinaryUrl: ''
		}
	}

	closeModal () {
		this.props.dispatch(actionCreators.updateProfilePictureModal())
	}

	saveAndSendDetails () {
		console.log('saving and sending');
		this.props.dispatch(actionCreators.updateProfilePictureModal());
	}

	 onImageDrop(files) {
	 	console.log('got to onImageDrop')
	  this.setState({
	    uploadedFile: files[0]
	  });

	  console.log(files[0]);
	  this.handleImageUpload(files[0]);
	}

	handleImageUpload(file) {
		console.log('got to handleImageUpload');
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
												.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
												.field('file', file)

		upload.end((err, response) => {
			if (err) {
				console.log(err); 
			}

			if (response.body.secure_url !== '') {
				this.setState({
					uploadedFileCloudinaryUrl: response.body.secure_url
				})
				// this.props.dispatch(actions.postImage(response.body.secure_url))
				// .then(() => { this.props.dispatch(actions.getImages()) })
				// .then(() => {console.log(this.props.images)})
			}
		});
	}

	render () {
		console.log('state', this.state)
		const { updateProfilePictureModalOpen, currentUser } = this.props; 

		return (
			<Modal show={updateProfilePictureModalOpen} onHide={this.closeModal.bind(this)}>
	    	<Modal.Header closeButton>
	      	<Modal.Title>Update Profile Picture</Modal.Title>
	    	</Modal.Header>
	   		<Modal.Body>
	   			<img className="user-profile-picture-modal" src={currentUser.image} />
   			 	<ImageUpload onDrop={this.onImageDrop.bind(this)} />
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



