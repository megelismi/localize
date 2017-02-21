import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import Dropzone from 'react-dropzone';
import { Modal } from 'react-bootstrap';

class UploadLocationPhotoModal extends Component {

  onImageDrop(files) {
    console.log('drop that image! weeoo!', files[0]);
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showUploadModal} onHide={() => {this.props.showUploadModalFunction(false)}}>
          <Modal.Header closeButton>
          	<Modal.Title>Upload image</Modal.Title>
        	</Modal.Header>
       		<Modal.Body>
            <div className="FileUpload">
              <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <p>Drop an image or click to select a file to upload.</p>
              </Dropzone>
            </div>
       		</Modal.Body>
          <Modal.Footer></Modal.Footer>
    		</Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  showUploadModal: state.showUploadModal
});

export default connect(mapStateToProps, syncActionCreators)(UploadLocationPhotoModal);
