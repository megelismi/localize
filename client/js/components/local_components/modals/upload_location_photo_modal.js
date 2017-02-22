import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import request from 'superagent';
import ImageUpload from '../../image/image_upload';
import Dropzone from 'react-dropzone';
import { Modal } from 'react-bootstrap';
import resizeImage from '../../image_manipulation/resize_image';

class UploadLocationPhotoModal extends Component {
  constructor (props) {
    super(props)
    this.state = { uploadedFileCloudinaryUrl: '', uploading: false }
  }

  // saveAndSendDetails() {
  //   if (this.state.uploadedFileCloudinaryUrl !== '') {
  //     let token = this.props.currentUser.token;
  //     let detail = { image: this.state.uploadedFileCloudinaryUrl }
  //     let userId = this.props.currentUser.id;
  //     this.props.dispatch(putActionCreators.updateUserDetails(token, detail, userId));
  //   }
  //   this.props.dispatch(actionCreators.updateProfilePictureModal());
  // }

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

  render() {
    return (
      <div>
        <Modal
          show={this.props.showUploadModal}
          onHide={() => {this.props.showUploadModalFunction(false)}}>
          <Modal.Header closeButton>
          	<Modal.Title>Upload image</Modal.Title>
        	</Modal.Header>
       		<Modal.Body>
            // {
            //   uploadedFileCloudinaryUrl === '' ?
            //   (uploading ? <h4>Loading...</h4> : <img className="user-profile-picture-modal" src={currentUser.image} />) :
            //   <img className="user-profile-picture-modal" src={uploadedFileCloudinaryUrl} />
            // }
            <div className="FileUpload">
              <ImageUpload onDrop={this.onImageDrop.bind(this)} />
            </div>
       		</Modal.Body>
          <Modal.Footer>
            <button className="accent-button save-user-details-button" onClick={this.saveAndSendDetails.bind(this)}>Save</button>
          </Modal.Footer>
    		</Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  showUploadModal: state.showUploadModal
});

export default connect(mapStateToProps, syncActionCreators)(UploadLocationPhotoModal);
