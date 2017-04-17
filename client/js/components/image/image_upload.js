import React from 'react';
import Dropzone from 'react-dropzone';

const ImageUpload = (props) => {
	return (
	<Dropzone
		className="image-upload-container"
		multiple={false}
		accept="image/*"
		onDrop={props.onDrop}
	>
    <p>Drop an image or click to select a file to upload.</p>
  </Dropzone>
	);
};

export default ImageUpload; 
