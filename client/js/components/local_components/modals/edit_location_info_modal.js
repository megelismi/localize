import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as syncActionCreators from '../../../actions/sync.js';

class EditLocationInfoModal extends Component {
  constructor() {
    super();
    this.deleteAndClose = this.deleteAndClose.bind(this);
  }

  updateLocationInfo(e) {
    const tagArray = this.tagField.value.split(', ');
    e.preventDefault();
    this.props.editLocationDetailModalFunction(false);
    this.props.updateLocationInLocalsMap(
      this.props.currentUser.id,
      this.props.location.name,
      this.props.location.lat_long,
      this.shortDescription.value,
      this.longDescription.value,
      tagArray
    );
  }

  deleteAndClose(review) {
    console.log('deleting review'); 
    // this.props.deleteReview(review);
    this.props.editLocationDetailModalFunction(false);
  }

  render() {
    const { editLocationDetailModal, review } = this.props;
    if (review) {
      return (
        <div className="new-location-modal">
          <Modal show={editLocationDetailModal} onHide={() => { this.props.editLocationDetailModalFunction(false); }}>
            <div className="modal-container">
              <Modal.Header className="add-location-modal-header" closeButton>
                <Modal.Title>{review.name}</Modal.Title>
              </Modal.Header>
            </div>
            <Modal.Body>
              <form onSubmit={this.updateLocationInfo.bind(this)}>
                <h4 className="info-text">{'Describe this location in a few words.'}</h4>
                <input
                  className="short-description"
                  type="text"
                  name="shortDescription"
                  placeholder="e.g. Brunch spot with amazing eggs benedict!"
                  defaultValue={review.short_description || ''}
                  ref={input => {
                    this.shortDescription = input; 
                    return this.shortDescription; 
                  }}
                />
                <h4 className="info-text">{'Now, tell us more — what draws you to this place? When is the best time to go? What should someone see, try, or do at this place?'}</h4>
                <textarea
                  className="long-description"
                  type="text"
                  name="longDescription"
                  placeholder="e.g. I've been going to this whole-in-the wall for Sunday brunch for years now — the eggs benedict and Bloody Marys are just too good to pass up. In the summer, ask to be seated in the fantastic patio out back. Be forewared, it's a little pricey (think $20 entrees), but if you have the cash, it's worth it."
                  defaultValue={review.long_description || ''}
                  ref={input => {
                    this.longDescription = input; 
                    return this.longDescription; 
                  }}
                />
                <h4 className="info-text">{'Enter tags, separated by commas.'}</h4>
                <input
                  className="tag-field"
                  type="text"
                  name="tagField"
                  placeholder="e.g. restaurant, independantly owned, brunch"
                  defaultValue={review.locationInfo.tags ? review.locationInfo.tags.join(', ') : ''}
                  ref={input => {
                    this.tagField = input; 
                    return this.tagField; 
                  }}
                />
                <button className="accent-button new-location-details-save" type="submit">{
                    review.short_description || review.long_description || review.locationInfo.tags ? 'Update' : 'Save'
                  }</button>
                <i 
                  onClick={() => { this.deleteAndClose(review); }}
                  className="fa fa-trash location-text-icon fa-2x"
                  aria-hidden="true"
                />
              </form>
              </Modal.Body>
            <div className="modal-container">
              <Modal.Footer />
            </div>
          </Modal>
        </div>
      );
    } 
      return <div />;
  }
}

const mapStateToProps = (state) => ({
  editLocationDetailModal: state.editLocationDetailModal
});

export default connect(mapStateToProps, syncActionCreators)(EditLocationInfoModal);
