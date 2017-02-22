import React from 'react'; 
import * as post_actions from '../../../actions/post_request.js'; 
import * as put_actions from '../../../actions/put_request.js'; 
import * as actionCreators from '../../../actions/sync.js';
import {connect} from 'react-redux';
import { Modal } from 'react-bootstrap';
import ImageUpload from '../../local_components/pictures/image_upload';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import resizeImage from '../image_manipulation/resize_image';

class Loading extends React.Component {
	render() {
		return <div>Loading...</div>
	}
}

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
		if (this.state.uploadedFileCloudinaryUrl !== '') {
			let token = this.props.currentUser.token; 
			let detail = {
				image: this.state.uploadedFileCloudinaryUrl
			}
			let userId = this.props.currentUser.id; 
			this.props.dispatch(put_actions.updateUserDetails(token, detail, userId));
		}

		this.props.dispatch(actionCreators.updateProfilePictureModal());
	}

	 onImageDrop(files) {
	  this.setState({
	    uploadedFile: files[0]
	  });

	  this.handleImageUpload(files[0]);
	}

	handleImageUpload(file) {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
												.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
												.field('file', file)

		this.setState({uploading: true});

		upload.end((err, response) => {
			if (err) {
				console.log(err); 
			}

			if (response.body.secure_url !== '') {
				let resizedImage = resizeImage(response.body.secure_url)
				this.setState({
					uploadedFileCloudinaryUrl: resizedImage, 
					uploading: false
				})
			}
		});
	}

	render () {
		console.log('state', this.state)
		if (this.state.uploading === true) {
			return <Loading />;
		}
		let image; 
		const { updateProfilePictureModalOpen, currentUser } = this.props; 

		this.state.uploadedFileCloudinaryUrl === '' ? image = currentUser.image : image = this.state.uploadedFileCloudinaryUrl;

		return (
			<Modal show={updateProfilePictureModalOpen} onHide={this.closeModal.bind(this)}>
	    	<Modal.Header closeButton>
	      	<Modal.Title>Update Profile Picture</Modal.Title>
	    	</Modal.Header>
	   		<Modal.Body>
	   			<img className="user-profile-picture-modal" src={image} />
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



