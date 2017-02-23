import React from 'react';
import * as postActionCreators from '../../actions/post_request.js';
import * as actionCreators from '../../actions/sync.js';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

export class SignUpForm extends React.Component {

  sendSignUpInfo (event) {
    event.preventDefault();
    this.props.dispatch(postActionCreators.createNewUser({
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value,
      username: this.username.value,
      password: this.password.value,
      confirmed_password: this.confirmed_password.value
    }));
  }

  render () {
    const { signUpUserError, signUpModalOpen } = this.props;

    return (
      <Modal show={signUpModalOpen} onHide={() => {this.props.dispatch(actionCreators.signUpModal())}}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className ="signup-form" onSubmit={this.sendSignUpInfo.bind(this)}>
            <input
              className="sign-in-up-modal-input"
              type="text"
              name="firstname"
              placeholder="First name"
              ref={element =>  this.first_name = element}/>
            <input
              className="sign-in-up-modal-input"
              type="text"
              name="lastname"
              placeholder="Last name"
              ref={element => this.last_name = element}/>
            <input
              className="sign-in-up-modal-input"
              type="text"
              name="email"
              placeholder="Email"
              ref={element => this.email = element}/>
            <input
              className="sign-in-up-modal-input"
              type="text"
              name="username"
              placeholder="Username"
              ref={element => this.username = element}/>
            <input
              className="sign-in-up-modal-input"
              type="password"
              name="password"
              placeholder="Password"
              ref={element => this.password = element}/>
            <input
              className="sign-in-up-modal-input"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              ref={element => this.confirmed_password = element}/>
            <input className= "accent-button" type="submit" value="Sign Up" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="sign-up-pw-req">Passwords must contain 6 characters, including 1 number and 1 symbol.</div>
          {signUpUserError ? <div className="sign-up-error">{signUpUserError}</div> : <div></div>}
        </Modal.Footer>
      </Modal>
    )
  }
}

  const mapStateToProps = state => ({
    signUpUserError: state.signUpUserError,
    signUpModalOpen: state.signUpModalOpen
  })

  export default connect(mapStateToProps)(SignUpForm);
