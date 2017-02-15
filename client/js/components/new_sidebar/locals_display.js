import React from 'react';

const LocalsDisplay = (props) => {

  const selectLocalAndClearTags = (user) => {
    props.selectLocalUser(user);
    props.clearAllAppliedTags();
  }

  if (props.users) {
    return (
      <div className="sidebar-inner-container">
        <div className="user-info">
          {props.users.map((user) => {
            return (
                <ul className ="user-image-and-description-container" key={user.id}>
                  <img className="user-image" src={user.image} />
                  <li className="user-name">{user.first_name}</li>
                  <li className="user-bio">{user.bio}</li>
                  <li><button className="see-user-city" onClick={() => {selectLocalAndClearTags(user)}}>{user.first_name}{'\'s '}{props.city}</button></li>
                </ul>
              )
          })}
        </div>
    </div>
    )
  } else {
    return <div></div>
  }
}

export default LocalsDisplay;
