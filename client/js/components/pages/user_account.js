import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actionCreators from '../../actions/sync.js';
import * as put_actions from '../../actions/put_request.js';
import UpdateUserDetails from '../user_account_components/modals/update_user_details';
import UpdateProfilePicture from '../user_account_components/modals/update_profile_picture';
import UserDetailsTable from '../user_account_components/user_details_table';
import UserMaps from '../user_account_components/user_maps';
import ProfilePicture from '../user_account_components/profile_picture';
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

	routeToCreateMap () {
		hashHistory.push('/')
	}

	openUpdateUserDetailsModal () {
		this.props.dispatch(actionCreators.updateUserDetailsModal())
	}

	openUpdateProfilePictureModal () {
		this.props.dispatch(actionCreators.updateProfilePictureModal())
	}

	onImageDrop () {
		console.log('image dropped')
	}

	render () {
		let { currentUser, updateUserDetailsModalOpen, updateProfilePictureModalOpen } = this.props;
		let editDetails, updatePicture;

		if (!currentUser) {
			this.routeToHomePage();
		}

		if (updateUserDetailsModalOpen) {
			editDetails = <UpdateUserDetails />
		}

		if (updateProfilePictureModalOpen) {
			updatePicture = <UpdateProfilePicture />
		}

		return (
			<div>
				<Header />
				{editDetails}
				{updatePicture}
				<ProfilePicture image={currentUser.image} updateProfilePicture={this.openUpdateProfilePictureModal.bind(this)} onImageDrop={this.onImageDrop.bind(this)}/>
				<UserDetailsTable name={currentUser.first_name + " " + currentUser.last_name} username ={currentUser.username} email={currentUser.email} bio={currentUser.bio} openUpdateUserDetailsModal={this.openUpdateUserDetailsModal.bind(this)} />
				<UserMaps currentUser={currentUser}/>
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentUser: state.currentUser,
	updateUserDetailsModalOpen: state.updateUserDetailsModalOpen,
	updateProfilePictureModalOpen: state.updateProfilePictureModalOpen
})

export default connect(mapStateToProps)(UserAccountPage);
