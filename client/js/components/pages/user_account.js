import React from 'react'; 
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'; 
import * as actionCreators from '../../actions/sync.js';
import * as put_actions from '../../actions/put_request.js'; 
import EditUserDetails from '../user_account_components/modals/edit_user_details'; 
import UserDetailsTable from '../user_account_components/user_details_table';
import Header from '../partials/header';
import Footer from '../partials/footer';

export class UserAccountPage extends React.Component {

	constructor (props) {
		super (props)
		this.state = {}
	}

	routeToHomePage () {
		hashHistory.push('/');
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

		return (
			<div>
				<Header />
				{editDetails}
				<h4 className="account-settings-header">General Account Settings</h4>
				<UserDetailsTable name={currentUser.first_name + " " + currentUser.last_name} username ={currentUser.username} email={currentUser.email} bio={currentUser.bio} />
				<button className="edit-user-details accent-button" onClick={this.open.bind(this)}>Edit Account</button>
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
	//  			<div className="account-details-container">
	// 				<div className="user-label first-name-label">First name:</div>
	// 				<div className={this.state.first_nameClass} contentEditable={this.state.editfirst_name} suppressContentEditableWarning={true} ref={element => this.first_name = element}>{currentUser.first_name}</div>
	// 				{firstNameButton}
	// 			</div>
	// 			<div className="account-details-container">
	// 				<div className="user-label last-name-label">Last name:</div>
	// 				<div className={this.state.LastNameClass} contentEditable={this.state.editLastName} suppressContentEditableWarning={true} ref={element => this.last_name = element}>{currentUser.last_name}</div>
	// 				<button className="edit-account-details-button" onClick={() => this.editFieldName('LastName')}> <i className="fa fa-pencil" aria-hidden="true"></i></button>
	// 			</div>
	// 			<div className="account-details-container">
	// 				<div className="user-label username-label">Username:</div>
	// 				<div className={this.state.UsernameClass} contentEditable={this.state.editUsername} suppressContentEditableWarning={true} ref={element => this.username = element}>{currentUser.username}</div>
	// 				<button className="edit-account-details-button" onClick={() => this.editFieldName('Username')}> <i className="fa fa-pencil" aria-hidden="true"></i></button>
	// 			</div>
	// 			<div className="account-details-container">
	// 				<div className="user-label email-label">Email:</div>
	// 				<div className={this.state.EmailClass} contentEditable={this.state.editEmail} suppressContentEditableWarning={true} ref={element => this.email = element}>{currentUser.email}</div>
	// 				<button className="edit-account-details-button" onClick={() => this.editFieldName('Email')} ><i className="fa fa-pencil" aria-hidden="true"></i></button>
	// 			</div>
	// 			<div className="account-details-container">
	// 				<div className="user-label bio-label">Bio:</div>
	// 				<div className={this.state.BioClass} contentEditable={this.state.editBio} suppressContentEditableWarning={true} ref={element => this.bio = element}>{currentUser.bio}</div>
	// 				<button className="edit-account-details-button" onClick={() => this.editFieldName('Bio')}><i className="fa fa-pencil" aria-hidden="true"></i></button>
	// 			</div>
	// 