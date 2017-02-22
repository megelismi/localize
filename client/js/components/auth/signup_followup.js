import React from 'react';
import * as actionCreators from '../../actions/sync.js';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';


export class FollowUpModal extends React.Component {

  render () {
    const { followUpModalOpen, signUpFollowUpModal } = this.props;

    return (
      <Modal show={followUpModalOpen} onHide={() => {signUpFollowUpModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>I'm the follow up!</p>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }

}

const mapStateToProps = state => ({
  followUpModalOpen: state.followUpModalOpen
})

export default connect(mapStateToProps, actionCreators)(FollowUpModal);
