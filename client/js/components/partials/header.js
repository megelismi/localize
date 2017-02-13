import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

const Header = () => {

  return (
     <Navbar className="nav" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="app-name" href="#">Localize</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem className="right-link" eventKey={1} href="#">Sign Up</NavItem>
        <NavItem className="right-link" eventKey={2} href="#">Log In</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Header;

// <div className="header">
//     <div className="app-name">Localize</div>
//       <nav>
//         <ul>
//           <li><a href="#">Home</a></li>
//           <li><a href="#">My Profile</a></li>
//           <li><a href="#">Sign Out</a></li>
//         </ul>
//       </nav>
//     </div>

  // <NavItem eventKey={1} href="#">Link</NavItem>
  //       <NavItem eventKey={2} href="#">Link</NavItem>


  // <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
  //         <MenuItem eventKey={3.1}>Action</MenuItem>
  //         <MenuItem eventKey={3.2}>Another action</MenuItem>
  //         <MenuItem eventKey={3.3}>Something else here</MenuItem>
  //         <MenuItem divider />
  //         <MenuItem eventKey={3.3}>Separated link</MenuItem>
  //       </NavDropdown>