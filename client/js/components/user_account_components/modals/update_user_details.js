import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as putActionCreators from '../../../actions/put_request.js';
import * as actionCreators from '../../../actions/sync.js';

class UpdateUserDetails extends React.Component {

  saveAndSendDetails() {
    const updatedUserDetails = {
      first_name: this.first_name.innerText,
      last_name: this.last_name.innerText,
      username: this.username.innerText,
      email: this.email.innerText,
      bio: this.bio.innerText
    };

    const token = this.props.currentUser.token;
    const id = this.props.currentUser.id;

    this.props.dispatch(putActionCreators.updateUserDetails(token, updatedUserDetails, id));
    this.props.dispatch(actionCreators.updateUserDetailsModal());
  }

  render() {
    const { updateUserDetailsModalOpen, currentUser, dispatch } = this.props;

    return (
      <Modal
        show={updateUserDetailsModalOpen}
        onHide={() => { dispatch(actionCreators.updateUserDetailsModal()); }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-user-details-modal-body">
          <div className="account-details-container">
            <div className="user-label">First Name</div>
            <div
              className="user-edit"
              contentEditable
              suppressContentEditableWarning
              ref={element => {
                this.first_name = element; 
                return this.first_name; 
              }}
            >{currentUser.first_name}</div>
          </div>
          <div className="account-details-container">
            <div className="user-label">Last Name</div>
            <div
              className="user-edit"
              contentEditable
              suppressContentEditableWarning
              ref={element => {
                this.last_name = element; 
                return this.last_name; 
              }}
            >{currentUser.last_name}</div>
          </div>
          <div className="account-details-container">
            <div className="user-label">Username</div>
            <div
              className="user-edit"
              contentEditable
              suppressContentEditableWarning
              ref={element => {
                this.username = element; 
                return this.username; 
              }}
            >{currentUser.username}</div>
          </div>
          <div className="account-details-container">
            <div className="user-label">Email</div>
            <div
              className="user-edit"
              contentEditable
              suppressContentEditableWarning
              ref={element => {
                this.email = element; 
                return this.email; 
              }}
            >{currentUser.email}</div>
          </div>
          <div className="account-details-container">
            <div className="user-label">Bio</div>
            <div
              className="user-edit edit-bio"
              contentEditable
              suppressContentEditableWarning
              ref={element => {
                this.bio = element; 
                return this.bio;
              }}
            >{currentUser.bio}</div>
          </div>
        </Modal.Body>
         <button className="accent-button save-user-details-button" onClick={this.saveAndSendDetails.bind(this)}>Save</button>
        <Modal.Footer />
      </Modal>
    );
  }

}

const mapStateToProps = state => ({
  updateUserDetailsModalOpen: state.updateUserDetailsModalOpen,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(UpdateUserDetails);
