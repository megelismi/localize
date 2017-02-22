import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actionCreators from '../../actions/sync.js';
import * as put_actions from '../../actions/put_request.js';
import * as getActionCreators from '../../actions/get_request.js';
import UpdateUserDetails from '../user_account_components/modals/update_user_details';
import UpdateProfilePicture from '../user_account_components/modals/update_profile_picture';
import UserDetailsTable from '../user_account_components/user_details_table';
import UserMaps from '../user_account_components/user_maps';
import Header from '../partials/header';
import Footer from '../partials/footer';

export class UserAccountPage extends React.Component {

	constructor (props) {
		super (props)
		this.state = {}
	}

  componentDidMount() {
    this.props.dispatch(getActionCreators.getLocationTags());
    this.props.dispatch(getActionCreators.getUsers());
    this.props.dispatch(getActionCreators.getLocationsAndDescriptions());
  }

	openUpdateUserDetailsModal () {
		this.props.dispatch(actionCreators.updateUserDetailsModal())
	}

	openUpdateProfilePictureModal () {
		this.props.dispatch(actionCreators.updateProfilePictureModal())
	}

	render () {
		let { currentUser, updateUserDetailsModalOpen, updateProfilePictureModalOpen } = this.props;
		let editDetails, updatePicture;

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
				<button className="accent-button create-map-button" onClick={() => {hashHistory.push(`/newmap/${currentUser.id}`)}}>Create Map</button>
				<div className="user-central-info">
					<UserMaps />
					<UserDetailsTable 
						updateProfilePicture={this.openUpdateProfilePictureModal.bind(this)} 
						image={currentUser.image} 
						name={currentUser.first_name + " " + currentUser.last_name} 
						username ={currentUser.username} 
						email={currentUser.email} 
						bio={currentUser.bio} 
						openUpdateUserDetailsModal={this.openUpdateUserDetailsModal.bind(this)} />
				</div>
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


//<ProfilePicture image={currentUser.image} updateProfilePicture={this.openUpdateProfilePictureModal.bind(this)} onImageDrop={this.onImageDrop.bind(this)}/>
