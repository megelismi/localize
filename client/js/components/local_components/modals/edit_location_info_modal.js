import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import { Modal } from 'react-bootstrap';

class EditLocationInfoModal extends Component {

  updateLocationInfo(e) {
    let tagArray = this.tagField.value.split(', ');
    e.preventDefault();
    this.props.showModalFunction(false);
    this.props.updateLocationInLocalsMap(
      3,
      this.props.location.feature,
      this.props.location.lat_long,
      this.shortDescription.value,
      this.longDescription.value,
      tagArray
    );
  }

  render() {
    const { showModal, showModalFunction, location } = this.props;
    if (location) {
      return (
        <div>
          <Modal show={showModal} onHide={() => {showModalFunction(false)}}>
            <Modal.Header closeButton>
            	<Modal.Title>{location.feature.properties.name}</Modal.Title>
          	</Modal.Header>
         		<Modal.Body>
              <form onSubmit={this.updateLocationInfo.bind(this)}>
                <h4 className="info-text">{'Describe this location in a few words.'}</h4>
                <input
                  className="short-description"
                  type="text"
                  name="shortDescription"
                  placeholder="e.g. Brunch spot with amazing eggs benedict!"
                  defaultValue={location.short_description || ''}
                  ref={input => this.shortDescription = input} />
                <h4 className="info-text">{'Now, tell us more — what draws you to this place? When is the best time to go? What should someone see, try, or do at this place?'}</h4>
                <textarea
                  className="long-description"
                  type="text"
                  name="longDescription"
                  placeholder="e.g. I've been going to this whole-in-the wall for Sunday brunch for years now — the eggs benedict and Bloody Marys are just too good to pass up. In the summer, ask to be seated in the fantastic patio out back. Be forewared, it's a little pricey (think $20 entrees), but if you have the cash, it's worth it."
                  defaultValue={location.long_description || ''}
                  ref={input => this.longDescription = input} />
                <button
                  type="button"
                  className="upload-image"
                  onClick={() => {this.props.showUploadModalFunction(true)}}>
                  Upload photo
                </button>
                <h4 className="info-text">{'Enter tags, separated by commas.'}</h4>
                <input
                  className="tag-field"
                  type="text"
                  name="tagField"
                  placeholder="e.g. restaurant, independantly owned, brunch"
                  defaultValue={location.tag_array ? location.tag_array.join(', ') : ''}
                  ref={input => this.tagField = input} />
                <button type="submit">{
                    location.short_description || location.long_description || location.tag_array ? 'Update' : 'Save'
                  }</button>
              </form>
         		</Modal.Body>
            <Modal.Footer></Modal.Footer>
      		</Modal>
        </div>
      )
    } else {
      return <div></div>
    }
  }
}

const mapStateToProps = (state) => ({
  showModal: state.showModal
});

export default connect(mapStateToProps, syncActionCreators)(EditLocationInfoModal);
