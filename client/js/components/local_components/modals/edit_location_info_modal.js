import React from 'react';
import { connect } from 'react-redux';

const EditLocationInfoModal = (props) => {

  console.log('EditLocationInfoModal', props.showModal, props.location);
  return (
    <div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  showModal: state.showModal
});

export default connect(mapStateToProps)(EditLocationInfoModal);
