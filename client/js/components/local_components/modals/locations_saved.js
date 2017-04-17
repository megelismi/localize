import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import { hashHistory } from 'react-router';
import * as syncActionCreators from '../../../actions/sync.js';

class LocationsSaved extends Component {

  locationsSaved() {
    this.props.syncActionCreators.locationsSavedModal();
    hashHistory.push('/map/portland');  
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.locationsSavedModalOpen}
          onHide={() => { this.props.syncActionCreators.locationsSavedModal(); }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Success!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="locations-saved-body">
            <p>Your changes have been saved.</p>
            <button className="saved-locations-confirm accent-button" onClick={this.locationsSaved.bind(this)}>Okay.</button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locationsSavedModalOpen: state.locationsSavedModalOpen
});

const mapDispatchToProps = (dispatch) => {
  return {
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSaved);
