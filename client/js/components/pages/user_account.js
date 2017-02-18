import React from 'react'; 
import Header from '../partials/header';
import Footer from '../partials/footer';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'; 

export class UserAccountPage extends React.Component {

	constructor (props) {
		super (props)
	}

	routeToHomePage () {
		hashHistory.push('/');
	}

	render () {
		let { currentUser } = this.props; 
		
		if (!currentUser) {
			this.routeToHomePage(); 
		}

		return (
			<div>
				<Header />
					<div className="account-details-container first-name-container">
						<div className="user-label first-name-label">First name:</div>
						<div className="user-edit edit-first-name" contentEditable="true" suppressContentEditableWarning={true} ref={element => this.firstName = element}>First name</div>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</div>
					<div className="account-details-container last-name-container">
						<div className="user-label last-name-label">Last name:</div>
						<div className="user-edit edit-last-name" contentEditable="true" suppressContentEditableWarning={true} ref={element => this.lastName = element}>Last name</div>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</div>
					<div className="account-details-container username-container">
						<div className="user-label username-label">Username:</div>
						<div className="user-edit edit-username-name" contentEditable="true" suppressContentEditableWarning={true} ref={element => this.username = element}>Username</div>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</div>
					<div className="account-details-container email-container">
						<div className="user-label email-label">Email:</div>
						<div className="user-edit edit-email-name" contentEditable="true" suppressContentEditableWarning={true} ref={element => this.email = element}>Email</div>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</div>
					<div className="account-details-container password-container">
						<div className="user-label password-label">Password:</div>
						<div className="user-edit edit-password" type="password" contentEditable="true" suppressContentEditableWarning={true} ref={element => this.password = element}>Password</div>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</div>
					<div className="account-details-container bio-container">
						<div className="user-label bio-label">Bio:</div>
						<div className="user-edit edit-bio" contentEditable="true" suppressContentEditableWarning={true} ref={element => this.bio = element}>Bio</div>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</div>
				<Footer />
			</div>
		)
	}
}


const mapStateToProps = state => ({
	currentUser: state.currentUser 
})

export default connect(mapStateToProps)(UserAccountPage);
