import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

class EditLocationInfoModal extends Component {

  updateLocationInfo(e) {
    e.preventDefault();
    this.props.updateLocationInLocalsMap(
      this.props.location.feature,
      this.props.location.lat_long,
      this.shortDescription.value,
      this.longDescription.value
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
                <input
                  type="text"
                  name="shortDescription"
                  placeholder="Brunch spot with amazing eggs benedict!"
                  ref={input => this.shortDescription = input} />
                <textarea
                  type="text"
                  name="longDescription"
                  placeholder="I've been going to this whole-in-the wall for Sunday brunch for years now — it never gets old. In the summer it's the best place in town for brunch, hands down, thanks to the fantastic patio out back. But their eggs benedict and Bloody Marys are fire no matter the season. Be forewared, it's a little pricey (think $20 entrees), but if you have the cash, it's worth it."
                  ref={input => this.longDescription = input} />
                <button type="submit">Save</button>
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

export default connect(mapStateToProps)(EditLocationInfoModal);
