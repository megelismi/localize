import React from 'react';
import * as post_actions from '../../actions/post_request.js'; 
import {connect} from 'react-redux';

let first_name, last_name, email, username, password, confirmed_password; 

class SignUpForm extends React.Component {

	constructor (props) {
		super(props); 
	}

	sendSignUpInfo (event) {
		event.preventDefault(); 
		let user = {
			first_name: first_name.value, 
			last_name: last_name.value, 
			email: email.value,
			username: username.value, 
			password: password.value
		}
		console.log(this.props)
		this.props.dispatch(post_actions.createNewUser(user)); 
	}

	render () {

		return (
			<div className="signup-form">
				<form onSubmit={this.sendSignUpInfo.bind(this)}>
		  			First Name:<br/>
		  		<input type="text" name="firstname" placeholder="" ref={element =>  first_name = element}/>
		  			<br/>
		  			Last Name:<br />
		  		<input type="text" name="lastname" placeholder="" ref={element => last_name = element}/>
		  			<br/>
		  			Email:<br />
		  		<input type="text" name="email" placeholder="" ref={element => email = element}/>
		  			<br/>
		  			Username:<br />
		  		<input type="text" name="username" placeholder="" ref={element => username = element}/>
		  			<br/>
		  			Password:<br />
		  		<input type="text" name="password" placeholder="" ref={element => password = element}/>
		  			<br/>
		  			Confirm Password:<br />
		  		<input type="text" name="confirm_password" placeholder="" ref={element => confirmed_password = element}/>
		  			<br /><br />
		  		<input type="submit" value="Sign Up" />
				</form> 
			</div>
		)
	}

}

export default connect()(SignUpForm);



	