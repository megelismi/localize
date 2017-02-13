import React from 'react';

const LocalsDisplay = (props) => {

  if (props.users) {
    return (
      <div>
        {props.users.map((user) => {
          return (
            <ul key={user.id}>
              <li>{user.first_name}</li>
              <li>{user.bio}</li>
              <li><button onClick={() => {props.selectUser(user)}}>{user.first_name}{'\'s '}{props.city}</button></li>
              <li><button>{user.first_name}{'\'s profile'}</button></li>
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
