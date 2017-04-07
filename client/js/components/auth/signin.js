import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as postActionCreators from '../../actions/post_request.js';
import * as actionCreators from '../../actions/sync.js';

class SignInForm extends React.Component {

  sendSignInInfo(event) {
    event.preventDefault();
    this.props.dispatch(postActionCreators.signInUser({
      emailOrUsername: this.emailOrUsername.value,
      password: this.password.value
    }));
  }

  render() {
    const { signInUserError, signInModalOpen, dispatch } = this.props;

    return (
      <Modal
        show={signInModalOpen}
        onHide={() => { dispatch(actionCreators.signInModal()); }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="signin-form" onSubmit={this.sendSignInInfo.bind(this)}>
            <input
              className="sign-in-up-modal-input"
              type="text"
              name="emailOrUsername"
              placeholder="Email or Username"
              ref={element => {
                this.emailOrUsername = element; 
                return this.emailOrUsername; 
              }}
            />
            <input
              className="sign-in-up-modal-input"
              type="password"
              name="lastname"
              placeholder="Password"
              ref={element => {
                this.password = element;
                return this.password;
              }}
            />
            <input
              className="accent-button"
              type="submit"
              value="Sign In"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          {signInUserError ? <div className="sign-up-error">{signInUserError}</div> : <div />}
        </Modal.Footer>
      </Modal>
    );
  }

}

const mapStateToProps = (state) => ({
  signInUserError: state.signInUserError,
  signInModalOpen: state.signInModalOpen
});

export default connect(mapStateToProps)(SignInForm);
