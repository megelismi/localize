import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import request from 'superagent';
import * as syncActionCreators from '../../../actions/sync.js';
import ImageUpload from '../../image/image_upload';
import resizeImage from '../../image/resize_image'; 

class UploadLocationPhotoModal extends Component {
  constructor(props) {
    super(props);
    this.state = { uploadedFileCloudinaryUrl: '', uploading: false };
  }

  onImageDrop(files) {
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
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
    return (
      <div>
        <Modal
          show={this.props.showUploadModal}
          onHide={() => { this.props.showUploadModalFunction(false); }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="FileUpload">
              <ImageUpload onDrop={this.onImageDrop.bind(this)} />
            </div>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showUploadModal: state.showUploadModal
});

export default connect(mapStateToProps, syncActionCreators)(UploadLocationPhotoModal);
