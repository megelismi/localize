import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/sync.js';

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
