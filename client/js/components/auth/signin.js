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
		// if(this.props.error) {
		// 	//render a div to the screen that displays the error
		// }

		return (
			<div className="signin-form-container">
				<h3>Sign In</h3>
				<form className="signin-form" onSubmit={this.sendSignInInfo.bind(this)}>
		  			Email or Username:<br/>
		  		<input type="text" name="emailOrUsername" placeholder="" ref={element =>  this.emailOrUsername = element}/>
		  			<br/>
		  			Password:<br />
		  		<input type="password" name="lastname" placeholder="" ref={element => this.password = element}/>
		  			<br/>
		  			<br />
		  		<input type="submit" value="Sign In" />
				</form> 
			</div>
		)
	}

}

const mapStateToProps = (state) => ({
	signInUserError: state.signInUserError
})

export default connect(mapStateToProps)(SignInForm);



	