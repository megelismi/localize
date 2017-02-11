import React from 'react';

const Header = () => {

  return (
    <div className="header">
      <nav>
        <div className="app-name">Local City</div>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">My Profile</a></li>
          <li><a href="#">Sign Out</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;
