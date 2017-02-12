import React from 'react';

const Header = () => {

  return (
    <div className="header">
    <div className="app-name">Localize</div>
      <nav>
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
