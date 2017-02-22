import React from 'react';
import * as putActionCreators from '../../../actions/put_request.js';
import * as actionCreators from '../../../actions/sync.js';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import ImageUpload from '../../image/image_upload';
import request from 'superagent';
import Dropzone from 'react-dropzone';
import resizeImage from '../../image/resize_image';

class UpdateProfilePicture extends React.Component {
  constructor (props) {
    super(props)
    this.state = { uploadedFileCloudinaryUrl: '', uploading: false }
  }

  saveAndSendDetails() {
    if (this.state.uploadedFileCloudinaryUrl !== '') {
      let token = this.props.currentUser.token;
      let detail = { image: this.state.uploadedFileCloudinaryUrl }
      let userId = this.props.currentUser.id;
      this.props.dispatch(putActionCreators.updateUserDetails(token, detail, userId));
    }
    this.props.dispatch(actionCreators.updateProfilePictureModal());
  }

  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    this.setState({ uploading: true });

    let upload = request.post('https://api.cloudinary.com/v1_1/megelismi/upload')
    .field('upload_preset', 'lbvileyb')
    .field('file', file)

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: resizeImage(response.body.secure_url),
          uploading: false
        })
      } else {
        console.log(err)
      }
    });
  }

  render () {
    const { updateProfilePictureModalOpen, currentUser } = this.props;
    const { uploadedFileCloudinaryUrl, uploading } = this.state;

    return (
      <Modal
        show={updateProfilePictureModalOpen}
        onHide={() => {this.props.dispatch(actionCreators.updateProfilePictureModal())}}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            uploadedFileCloudinaryUrl === '' ?
            (uploading ? <h4>Loading...</h4> : <img className="user-profile-picture-modal" src={currentUser.image} />) :
            <img className="user-profile-picture-modal" src={uploadedFileCloudinaryUrl} />
          }
          <ImageUpload onDrop={this.onImageDrop.bind(this)} />
        </Modal.Body>
        <Modal.Footer>
          {
            uploading ?
              <button
                className="accent-button save-user-details-button"
                onClick={this.saveAndSendDetails.bind(this)} disabled>Save</button> :
              <button
                className="accent-button save-user-details-button"
                onClick={this.saveAndSendDetails.bind(this)}>Save</button>
          }
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
