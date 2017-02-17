import React from 'react';
import * as post_actions from '../../actions/post_request.js'; 
import {connect} from 'react-redux';


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
			password: this.password.value
		}
		this.props.dispatch(post_actions.createNewUser(user)); 
	}

	render () {
		const { signUpUserError } = this.props;  
		if (signUpUserError) {
			console.log(signUpUserError)
		}

		return (
			<div className="signup-form">
				<h2>Sign Up</h2>
				<form onSubmit={this.sendSignUpInfo.bind(this)}>
		  			First Name:<br/>
		  		<input type="text" name="firstname" placeholder="" ref={element =>  this.first_name = element}/>
		  			<br/>
		  			Last Name:<br />
		  		<input type="text" name="lastname" placeholder="" ref={element => this.last_name = element}/>
		  			<br/>
		  			Email:<br />
		  		<input type="text" name="email" placeholder="" ref={element => this.email = element}/>
		  			<br/>
		  			Username:<br />
		  		<input type="text" name="username" placeholder="" ref={element => this.username = element}/>
		  			<br/>
		  			Password:<br />
		  		<input type="password" name="password" placeholder="" ref={element => this.password = element}/>
		  			<br/>
		  			Confirm Password:<br />
		  		<input type="password" name="confirm_password" placeholder="" ref={element => this.confirmed_password = element}/>
		  			<br /><br />
		  		<input type="submit" value="Sign Up" />
				</form> 
			</div>
		)
	}

}

const mapStateToProps = state => ({
	error: state.signUpUserError
})

export default connect(mapStateToProps)(SignUpForm);


	