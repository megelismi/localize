import React from 'react'; 
import Header from '../partials/header';
import Footer from '../partials/footer';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'; 
import * as actionCreators from '../../actions/sync.js';
import * as put_actions from '../../actions/put_request.js'; 
import EditUserDetails from '../modals/edit_user_details'; 

export class UserAccountPage extends React.Component {

	constructor (props) {
		super (props)
		this.state = {
			editfirst_name: false, 
			editLastName: false, 
			editUsername: false,
			editEmail: false, 
			editPassword: false,
			editBio: false,
			first_nameClass: "user-edit",
			LastNameClass: "user-edit", 
			UsernameClass: "user-edit", 
			EmailClass: "user-edit", 
			PasswordClass: "user-edit",
			BioClass: "user-edit"
		}
	}

	routeToHomePage () {
		hashHistory.push('/');
	}

	editFieldName(fieldName) {
		let config = {}; 
		config['edit'+ fieldName] = true;
		config[fieldName + 'Class'] = 'user-edit-active';
		this.setState (
			config
		)
	}

	saveAndSendDetails (fieldName) {
		let config = {}; 
		config['edit' + fieldName] = false;
		config[fieldName + 'Class'] = 'user-edit'; 
		this.setState (
			config
		) 
		let ref = this[fieldName];
		let newDetail = ref.innerText; 

		let updatedUserDetail = {}; 
		updatedUserDetail[fieldName] = newDetail; 
		let token = this.props.currentUser.token; 
		let id = this.props.currentUser.id; 

		console.log('detail object', updatedUserDetail);
		console.log('token', this.props.currentUser.token);
		console.log('id', this.props.currentUser.id); 

		this.props.dispatch(put_actions.updateUserDetail(token, updatedUserDetail, id));
	}

	open () {
		this.props.dispatch(actionCreators.editUserDetailsModal())
	}

	render () {
		console.log('state', this.state)
		let { currentUser, editUserDetailsModalOpen } = this.props; 
		let editDetails; 

		if (!currentUser) {
			this.routeToHomePage(); 
		}

		if (editUserDetailsModalOpen) {
			editDetails = <EditUserDetails />
		}

		let firstNameButton, lastNameButton;
		 
		if (this.state.editfirst_name) {
			firstNameButton = (
				<button className="edit-account-details-button" onClick={() => this.saveAndSendDetails('first_name')}>Save</button>
			)
		} else {
			firstNameButton = (
				<button className="edit-account-details-button" onClick={() => this.editFieldName('first_name')}><i className="fa fa-pencil" aria-hidden="true"></i></button>
			)
		}
		return (
			<div>
				<Header />
				{editDetails}
				<button className="edit-user-content" onClick={this.open.bind(this)}>Edit</button>
	 			<div className="account-details-container">
					<div className="user-label first-name-label">First name:</div>
					<div className={this.state.first_nameClass} contentEditable={this.state.editfirst_name} suppressContentEditableWarning={true} ref={element => this.first_name = element}>{currentUser.first_name}</div>
					{firstNameButton}
				</div>
				<div className="account-details-container">
					<div className="user-label last-name-label">Last name:</div>
					<div className={this.state.LastNameClass} contentEditable={this.state.editLastName} suppressContentEditableWarning={true} ref={element => this.last_name = element}>{currentUser.last_name}</div>
					<button className="edit-account-details-button" onClick={() => this.editFieldName('LastName')}> <i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
				<div className="account-details-container">
					<div className="user-label username-label">Username:</div>
					<div className={this.state.UsernameClass} contentEditable={this.state.editUsername} suppressContentEditableWarning={true} ref={element => this.username = element}>{currentUser.username}</div>
					<button className="edit-account-details-button" onClick={() => this.editFieldName('Username')}> <i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
				<div className="account-details-container">
					<div className="user-label email-label">Email:</div>
					<div className={this.state.EmailClass} contentEditable={this.state.editEmail} suppressContentEditableWarning={true} ref={element => this.email = element}>{currentUser.email}</div>
					<button className="edit-account-details-button" onClick={() => this.editFieldName('Email')} ><i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
				<div className="account-details-container">
					<div className="user-label bio-label">Bio:</div>
					<div className={this.state.BioClass} contentEditable={this.state.editBio} suppressContentEditableWarning={true} ref={element => this.bio = element}>{currentUser.bio}</div>
					<button className="edit-account-details-button" onClick={() => this.editFieldName('Bio')}><i className="fa fa-pencil" aria-hidden="true"></i></button>
				</div>
			<Footer />
		</div>
		)
	}
}


const mapStateToProps = state => ({
	currentUser: state.currentUser,
	editUserDetailsModalOpen: state.editUserDetailsModalOpen
})

export default connect(mapStateToProps)(UserAccountPage);

		//<div className="account-details-container">
			//<div className="user-label password-label">Password:</div>
			 //<div className={this.state.PasswordClass} type="password" contentEditable={this.state.editPassword} suppressContentEditableWarning={true} ref={element => this.password = element}>{currentUser.password}</div>
				//<button className="edit-account-details-button" onClick={() => this.editFieldName('Password')}><i className="fa fa-pencil" aria-hidden="true"></i></button>
			//</div>
	