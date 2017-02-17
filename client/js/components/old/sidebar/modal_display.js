import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import * as actionCreators from '../../actions/sync.js';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
=======
>>>>>>> Click locals view to see all users' pins.


<Modal isOpen={this.state.isOpen} onRequestHide={this.close}>
  <ModalHeader>
    <ModalClose onClick={this.hideModal}/>
    <ModalTitle>Modal title</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <p>Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
      explicabo hic incidunt placeat quasi repellendus soluta,
      vero. Autem delectus est laborum minus modi molestias
      natus provident, quidem rerum sint, voluptas!</p>
  </ModalBody>
  <ModalFooter>
    <button className='btn btn-default' onClick={props.selectById(null)}>
      Close
    </button>
    <button className='btn btn-primary'>
      Save changes
    </button>
  </ModalFooter>
</Modal>
Styles
Default:

backdropStyles = {
  base: {
    background: 'rgba(0, 0, 0, .7)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.4s',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  open: {
    opacity: 1,
    visibility: 'visible'
  }
};
 
dialogStyles = {
  base: {
    top: -600,
    transition: 'top 0.4s'
  },
  open: {
    top: 0
  }
}

const ModalDisplay = (props) => { 
	console.log('props', props)
  return (
    <div className="sidebar">
      <button className="close-button" onClick={() => {props.selectById(null)}}>X</button>
      <img src={props.image} />
      <div className="modal-location-title">{props.title}</div>
      <div className="modal-location-info">{props.info}</div>
      <button>Add to favorites</button>
    </div>
  )
}

export default connect(null, actionCreators)(ModalDisplay);
