import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as syncActionCreators from '../../actions/sync.js';
import TutorialCarousel from './tutorial_carousel';

export class Tutorial extends React.Component {

  render() {
    const { tutorialModalOpen } = this.props;

    return (
      <Modal show={tutorialModalOpen} onHide={() => { this.props.syncActionCreators.tutorialModal(); }}>
        <Modal.Header className="tutorial-modal-header" closeButton>
          <Modal.Title>Getting Started</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TutorialCarousel />
        </Modal.Body>
        <Modal.Footer className="tutorial-footer" />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  tutorialModalOpen: state.tutorialModalOpen
});

const mapDispatchToProps = (dispatch) => {
  return {
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
