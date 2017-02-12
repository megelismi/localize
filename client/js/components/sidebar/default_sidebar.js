import React from 'react';
import { hashHistory } from 'react-router';

const DefaultSidebar = (props) => {

  return (
    <div className="sidebar">
      <button onClick={() => {props.displayTags()}}>{"What are you looking for?"}</button>
      <div>
        {props.users.map((user) => {
          return (
            <ul className="user-info" key={user.id}>
              <img className="user-image" src={user.image} />
              <li className="user-name">{user.first_name}</li>
              <li className="user-bio">{user.bio}</li>
              <li><button className="see-user-city">See {user.first_name}{'\'s '}{props.city}</button></li>
              <li><button className="see-user-profile">See {user.first_name}{'\'s profile'}</button></li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default DefaultSidebar;
