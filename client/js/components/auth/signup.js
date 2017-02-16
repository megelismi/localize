import React from 'react'; 

class SignUpForm extends React.Component {

	constructor (props) {
		super(props); 
	}

	render () {
		return (
			<div className="signup-form">
				<form>
		  			First Name:<br/>
		  		<input type="text" name="firstname" placeholder="" />
		  			<br/>
		  			Last Name:<br />
		  		<input type="text" name="lastname" placeholder="" />
		  			<br/>
		  			Email:<br />
		  		<input type="text" name="email" placeholder="" />
		  			<br/>
		  			Password:<br />
		  		<input type="text" name="password" placeholder="" />
		  			<br/>
		  			Confirm Password:<br />
		  		<input type="text" name="confirm_password" placeholder="" />
		  			<br /><br />
		  		<input type="submit" value="Sign Up" />
				</form> 
			</div>
		)
	}

}

export default SignUpForm; 



	