import React from 'react'; 

const ProfilePicture = (props) => {
	return (
		<div className="profile-picture-container">
			<img className="user-profile-picture" src={props.image} />
			<button className="change-profile-picture-button accent-button" onClick={props.updateProfilePicture}>Update Picture</button>
		</div>
	)
}

export default ProfilePicture; 

//<button className="change-profile-picture-button accent-button" onClick={props.updateProfilePicture}>Update Picture</button>