import React from 'react'; 
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'; 
import * as actionCreators from '../../actions/sync.js';
import * as put_actions from '../../actions/put_request.js'; 
import EditUserDetails from '../user_account_components/modals/edit_user_details'; 
import UserDetailsTable from '../user_account_components/user_details_table';
import UserMaps from '../user_account_components/user_maps';
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
				<div className="user-account-details">
					<h4 className="account-settings-header">General Account Settings</h4>
					<UserDetailsTable name={currentUser.first_name + " " + currentUser.last_name} username ={currentUser.username} email={currentUser.email} bio={currentUser.bio} />
					<button className="edit-user-details accent-button" onClick={this.open.bind(this)}>Edit Account</button>
				</div>
				<UserMaps />
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
