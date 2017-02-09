import React from 'react';
import { connect } from 'react-redux';
import { selectById } from '../../actions/sync.js';

const ModalDisplay = (props) => {
  return (
    <div className="sidebar">
      <button className="close-button" onClick={() => {props.selectById(null)}}>X</button>
      <div className="modal-location-title">{props.title}</div>
      <div className="modal-location-info">{props.info}</div>
      <button>Add to favorites</button>
    </div>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => {
  return { selectById: (id) => { dispatch(selectById(id)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDisplay);
