import React from 'react';
import * as post_actions from '../../actions/post_request.js'; 
import * as actionCreators from '../../actions/sync.js';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';


export class SignUpForm extends React.Component {

	constructor (props) {
		super(props); 
	}

	sendSignUpInfo (event) {
		event.preventDefault(); 
		let user = {
			first_name: this.first_name.value, 
			last_name: this.last_name.value, 
			email: this.email.value,
			username: this.username.value, 
			password: this.password.value, 
			confirmed_password: this.confirmed_password.value
		}
		this.props.dispatch(post_actions.createNewUser(user)); 
	}

	open () {
		this.props.dispatch(actionCreators.signUpModal());
	}

	close () {
		console.log('signupModalOpen', actionCreators.signUpModal);
		this.props.dispatch(actionCreators.signUpModal());
	}

	render () {
		let errorDisplay; 
		const { signUpUserError, signUpModalOpen } = this.props;  
		if (signUpUserError) {
			errorDisplay = <div className="sign-up-error">{signUpUserError}</div>
		}
		return (
		<Modal show={signUpModalOpen} onHide={this.close.bind(this)}>
    	<Modal.Header closeButton>
      	<Modal.Title>Sign Up</Modal.Title>
    	</Modal.Header>
   		<Modal.Body>
 				<form onSubmit={this.sendSignUpInfo.bind(this)}>
	  			<input type="text" name="firstname" placeholder="First name" ref={element =>  this.first_name = element}/>
	  			<br/><br />
	  			<input type="text" name="lastname" placeholder="Last name" ref={element => this.last_name = element}/>
	  			<br/><br />
	  			<input type="text" name="email" placeholder="Email" ref={element => this.email = element}/>
	  			<br/><br />
	  			<input type="text" name="username" placeholder="Username" ref={element => this.username = element}/>
	  			<br/><br />
	  			<input type="password" name="password" placeholder="Password" ref={element => this.password = element}/>
					<br /><br />
	  			<input type="password" name="confirm_password" placeholder="Confirm Password" ref={element => this.confirmed_password = element}/>
	  			<br /><br />
	  			<input type="submit" value="Sign Up" />
				</form> 
      </Modal.Body>
    	<Modal.Footer>
    		<div className="sign-up-pw-req">Passwords must contain 6 characters, including 1 number and 1 symbol.</div>
				{errorDisplay}
    	</Modal.Footer>
  	</Modal>
		)
	}

}

const mapStateToProps = state => ({
	signUpUserError: state.signUpUserError,
	signUpModalOpen: state.signUpModalOpen,
})

export default connect(mapStateToProps)(SignUpForm);


	