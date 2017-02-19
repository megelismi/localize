import React from 'react'; 
import Header from '../partials/header';
import Footer from '../partials/footer';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'; 
import * as actionCreators from '../../actions/sync.js';
import EditUserDetails from '../modals/edit_user_details'; 

export class UserAccountPage extends React.Component {

	constructor (props) {
		super (props)
		this.state = {
			contentEditable: false,
			editFirstName: false,
			borderFirstName: null, 
			editLastName: false, 
			borderLastName: null
		}
	}

	routeToHomePage () {
		hashHistory.push('/');
	}

	editUserDetails () {
		this.setState ({
			contentEditable: true, 
			activelyEditing: 'actively-editing', 
		})
	}

	editFirstName () {
		console.log(this.first_name.innerText)
		this.setState ({
			editFirstName: true, 
			borderFirstName: 'actively-editing-first' 
		})
	}

	editLastName () {
		console.log(this.last_name.innerText)
		this.setState ({
			editLastName: true, 
			borderLastName: 'actively-editing-last' 
		})
	}

	saveAndSendDetails () {
		console.log('saving and sending');
	}

	open () {
		this.props.dispatch(actionCreators.editUserDetailsModal())
	}

	render () {
		let { currentUserArray, editUserDetailsModalOpen } = this.props; 
		let editDetails; 
		if (!currentUserArray[0]) {
			this.routeToHomePage(); 
		}

		if (editUserDetailsModalOpen) {
			editDetails = <EditUserDetails />
		}

		let firstNameButton, lastNameButton;
		 
		if (this.state.editFirstName) {
			firstNameButton = (
				<button className="edit-account-details-button" onClick={this.saveAndSendDetails.bind(this)}>Save</button>
			)
		} else {
			firstNameButton = (
				<button className="edit-account-details-button" onClick={this.editFirstName.bind(this)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
			)
		}
		return (
			<div>
				<Header />
				{editDetails}
				<button className="edit-user-content" onClick={this.open.bind(this)}>Edit</button>
	 			<div className="account-details-container">
					<div className="user-label first-name-label">First name:</div>
					<div className="user-edit edit-first-name" contentEditable={this.state.editFirstName} id={this.state.borderFirstName} suppressContentEditableWarning={true} ref={element => this.first_name = element}>First name</div>
					{firstNameButton}
				</div>
				<div className="account-details-container">
					<div className="user-label last-name-label">Last name:</div>
					<div className="user-edit edit-last-name" contentEditable={this.state.editLastName} id={this.state.borderLastName}suppressContentEditableWarning={true} ref={element => this.last_name = element}>Last name</div>
					<button className="edit-account-details-button" onClick={this.editLastName.bind(this)}> <i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
				<div className="account-details-container">
					<div className="user-label username-label">Username:</div>
					<div className="user-edit edit-username" id={this.state.activelyEditing} contentEditable={this.state.contentEditable} suppressContentEditableWarning={true} ref={element => this.username = element}>Username</div>
					<button className="edit-account-details-button" onClick={this.editUserDetails.bind(this)}> <i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
				<div className="account-details-container">
					<div className="user-label email-label">Email:</div>
					<div className="user-edit edit-email" id={this.state.activelyEditing} contentEditable={this.state.contentEditable} suppressContentEditableWarning={true} ref={element => this.email = element}>Email</div>
					<button className="edit-account-details-button" onClick={this.editUserDetails.bind(this)} ><i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
				<div className="account-details-container">
					<div className="user-label password-label">Password:</div>
					<div className="user-edit edit-password" id={this.state.activelyEditing} type="password" contentEditable={this.state.contentEditable} suppressContentEditableWarning={true} ref={element => this.password = element}>Password</div>
					<button className="edit-account-details-button" onClick={this.editUserDetails.bind(this)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
				<div className="account-details-container">
					<div className="user-label bio-label">Bio:</div>
					<div className="user-edit edit-bio" id={this.state.activelyEditing} contentEditable={this.state.contentEditable} suppressContentEditableWarning={true} ref={element => this.bio = element}>Bio</div>
					<button className="edit-account-details-button" onClick={this.editUserDetails.bind(this)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
			<Footer />
		</div>
		)
	}
}


const mapStateToProps = state => ({
	currentUserArray: [state.currentUser],
	editUserDetailsModalOpen: state.editUserDetailsModalOpen
})

export default connect(mapStateToProps)(UserAccountPage);
	