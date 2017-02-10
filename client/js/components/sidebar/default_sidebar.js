import React from 'react';
import { hashHistory } from 'react-router';

const DefaultSidebar = (props) => {

  return (
    <div className="sidebar">
      <button onClick={() => {props.displayTags()}}>{"What are you looking for?"}</button>
      <div>
        {props.users.map((user) => {
          return (
            <ul key={user.id}>
              <li>{user.first_name}</li>
              <li>{user.bio}</li>
              <li><button onClick={() => {hashHistory.push('/' + user.id)}}>{user.first_name}{'\'s '}{props.city}</button></li>
              <li><button>{user.first_name}{'\'s profile'}</button></li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default DefaultSidebar;
