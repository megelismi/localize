import React from 'react';

const LocalsDisplay = (props) => {

  if (props.users) {
    return (
      <div>
        {props.users.map((user) => {
          return (
            <ul className ="user-info-list" key={user.id}>
              <img className="user-image" src={user.image} />
              <li className="user-image">{user.first_name}</li>
              <li className="user-bio">{user.bio}</li>
              <li><button className="see-user-city" onClick={() => {props.selectUser(user)}}>{user.first_name}{'\'s '}{props.city}</button></li>
            </ul>
          )
        })}
      </div>
    )
  } else {
    return <div></div>
  }
}

export default LocalsDisplay;
