import React from 'react';
import * as syncActionCreators from '../../actions/sync.js';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import TutorialCarousel from './tutorial_carousel';

export class Tutorial extends React.Component {

  render () {
    const { tutorialModalOpen } = this.props;

    return (
      <Modal show={tutorialModalOpen} onHide={() => {this.props.syncActionCreators.tutorialModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TutorialCarousel />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  tutorialModalOpen: state.tutorialModalOpen
})

const mapDispatchToProps = (dispatch) => {
  return {
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);