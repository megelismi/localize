import React from 'react';

const LocalsDisplay = (props) => {
  const selectLocalAndClearTags = (user) => {
    props.selectLocalUser(user);
  };

  const reduceBio = (bio) => {
    const fullBio = bio.split(' ');
    return fullBio.length > 20 ? `${fullBio.splice(0, 20).join(' ')}...` : bio; 
  };

  if (props.users) {
    return (
      <div className="user-info">
        {props.users.map((user) => {
          return (
              <ul className="user-image-and-description-container" key={user.id}>
                <img className="user-image" role="presentation" src={user.image} />
                <li className="user-name"><button className="see-user-city" onClick={() => { selectLocalAndClearTags(user); }}>{user.first_name}</button></li>
                <li className="user-bio">{reduceBio(user.bio)}</li>
              </ul>
            );
        })}
      </div>
    );
  } 
    return <div />;
};

export default LocalsDisplay;
