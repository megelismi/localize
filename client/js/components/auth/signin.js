import React from 'react';
import * as post_actions from '../../actions/post_request.js'; 
import {connect} from 'react-redux';

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

	render () {
		let errorDisplay; 
		const { signInUserError } = this.props;  
		if (signInUserError) {
			errorDisplay = <div className="sign-up-error">{signInUserError}</div>
		}

		return (
			<div className="signin-form-container">
				<h3 className="signin-title">Sign In</h3>
				<form className="signin-form" onSubmit={this.sendSignInInfo.bind(this)}>
		  		<input type="text" name="emailOrUsername" placeholder="Email or Username" ref={element =>  this.emailOrUsername = element}/>
		  			<br/><br />
		  		<input type="password" name="lastname" placeholder="Password" ref={element => this.password = element}/>
		  			<br/><br/>
		  		<input className="sign-in-button" type="submit" value="Sign In" />
				</form> 
				{errorDisplay}
			</div>
		)
	}

}

const mapStateToProps = (state) => ({
	signInUserError: state.signInUserError
})

export default connect(mapStateToProps)(SignInForm);



	