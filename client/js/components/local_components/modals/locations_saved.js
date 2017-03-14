import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import { hashHistory } from 'react-router';

class LocationsSaved extends Component {
  constructor (props) {
    super(props)
  }

  locationsSaved () {
    this.props.syncActionCreators.locationsSavedModal();
    hashHistory.push('/map/portland');  
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.locationsSavedModalOpen}
          onHide={() => {this.props.syncActionCreators.locationsSavedModal()}}>
          <Modal.Header closeButton>
          	<Modal.Title>Success!</Modal.Title>
        	</Modal.Header>
       		<Modal.Body>
            <p>Your mapped locations have been saved.</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="saved-locations-confirm accent-button" onClick={this.locationsSaved.bind(this)}>Got it.</button>
          </Modal.Footer>
    		</Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locationsSavedModalOpen: state.locationsSavedModalOpen
});

const mapDispatchToProps = (dispatch) => {
  return {
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsSaved);
