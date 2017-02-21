import React from 'react';
import * as post_actions from '../../actions/post_request.js';
import * as actionCreators from '../../actions/sync.js';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

class SignInForm extends React.Component {

	constructor (props) {
		super(props);
	}

	sendSignInInfo (event) {
		event.preventDefault();
		let user = {
			emailOrUsername: this.emailOrUsername.value,
			password: this.password.value
		}
		this.props.dispatch(post_actions.signInUser(user));
	}

	close () {
		this.props.dispatch(actionCreators.signInModal())
	}

	render () {
		let errorDisplay;
		const { signInUserError, signInModalOpen } = this.props;
		if (signInUserError) {
			errorDisplay = <div className="sign-up-error">{signInUserError}</div>
		}

		return (
			<Modal show={signInModalOpen} onHide={this.close.bind(this)}>
    	<Modal.Header closeButton>
      	<Modal.Title>Sign In</Modal.Title>
    	</Modal.Header>
   		<Modal.Body>
				<form className="signin-form" onSubmit={this.sendSignInInfo.bind(this)}>
		  		<input type="text" name="emailOrUsername" placeholder="Email or Username" ref={element =>  this.emailOrUsername = element}/>
		  		<br/><br />
		  		<input type="password" name="lastname" placeholder="Password" ref={element => this.password = element}/>
		  		<br/><br/>
		  		<input className="accent-button" type="submit" value="Sign In" />
				</form>
				</Modal.Body>
    		<Modal.Footer>
				{errorDisplay}
				</Modal.Footer>
  		</Modal>
		)
	}

}

const mapStateToProps = (state) => ({
	signInUserError: state.signInUserError,
	signInModalOpen: state.signInModalOpen
})

export default connect(mapStateToProps)(SignInForm);
