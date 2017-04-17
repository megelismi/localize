import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import request from 'superagent';
import * as putActionCreators from '../../../actions/put_request.js';
import * as syncActionCreators from '../../../actions/sync.js';
import ImageUpload from '../../image/image_upload';
import resizeImage from '../../image/resize_image';

class UpdateProfilePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploadedFileCloudinaryUrl: '', uploading: false };
  }

  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  }

  saveAndSendDetails() {
    if (this.state.uploadedFileCloudinaryUrl !== '') {
      const token = this.props.currentUser.token;
      const detail = { image: this.state.uploadedFileCloudinaryUrl };
      const userId = this.props.currentUser.id;
      this.props.dispatch(putActionCreators.updateUserDetails(token, detail, userId));
    }
    this.props.dispatch(syncActionCreators.updateProfilePictureModal());
  }

  handleImageUpload(file) {
    this.setState({ uploading: true });

    const upload = request.post('https://api.cloudinary.com/v1_1/megelismi/upload')
    .field('upload_preset', 'lbvileyb')
    .field('file', file);

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: resizeImage(response.body.secure_url),
          uploading: false
        });
      } else {
        console.log(err);
      }
    });
  }

  render() {
    const { updateProfilePictureModalOpen, currentUser } = this.props;
    const { uploadedFileCloudinaryUrl, uploading } = this.state;
    return (
      <Modal
        show={updateProfilePictureModalOpen}
        onHide={() => { this.props.dispatch(syncActionCreators.updateProfilePictureModal()); }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="updating-picture-container">
          { uploadedFileCloudinaryUrl === '' ?
              (uploading ? 
                <img className="loading-icon" role="presentation" src="http://res.cloudinary.com/megelismi/image/upload/v1487879746/ring_kttcio.gif" /> 
                : <img className="user-profile-picture-modal" role="presentation" src={currentUser.image} />) 
              : <img className="user-profile-picture-modal" role="presentation" src={uploadedFileCloudinaryUrl} /> }
          </div>
          <ImageUpload onDrop={this.onImageDrop.bind(this)} />
        </Modal.Body>
          {
            uploading ?
              <button
                className="accent-button save-user-details-button"
                onClick={this.saveAndSendDetails.bind(this)} disabled
              >Save</button> :
              <button
                className="accent-button save-user-details-button"
                onClick={this.saveAndSendDetails.bind(this)}
              >Save</button>
          }
        <Modal.Footer />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  updateProfilePictureModalOpen: state.updateProfilePictureModalOpen,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(UpdateProfilePicture);
