import React from 'react'; 

const ProfilePicture = (props) => {
	return (
		<div>
			<img className="user-profile-picture" src={props.image} />
		</div>
	)
}

export default ProfilePicture; 