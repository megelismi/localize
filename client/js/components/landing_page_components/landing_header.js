import React from 'react'; 
import {Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';


const LandingHeader = () => {
	return (
	  <Navbar collapseOnSelect className="landing-header">
    <Navbar.Header>
      <Navbar.Toggle className="landing-page-header-toggle"/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem className="landing-header-links" eventKey={1} href="#">About</NavItem>
        <NavItem className="landing-header-links" eventKey={2} href="#">Sign Up</NavItem>
        <NavItem className="landing-header-links" eventKey={3} href="#">Sign In</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
	)
}

export default LandingHeader; 

	//<Navbar collapseOnSelect className="landing-header">
		 //<Navbar.Toggle />
	    //<Navbar.Collapse>
	      //<Nav pullRight>
	        //<NavItem className="landing-header-links" eventKey={1} href="#">About</NavItem>
	        //<NavItem className="landing-header-links" eventKey={2} href="#">Sign In</NavItem>
	       // <NavItem className="landing-header-links" eventKey={3} href="#">Sign Up</NavItem>
	      //</Nav>
	    //</Navbar.Collapse>
	  //</Navbar>

 // <Nav>
 //        <NavItem eventKey={1} href="#">Link</NavItem>
 //        <NavItem eventKey={2} href="#">Link</NavItem>
 //        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
 //          <MenuItem eventKey={3.1}>Action</MenuItem>
 //          <MenuItem eventKey={3.2}>Another action</MenuItem>
 //          <MenuItem eventKey={3.3}>Something else here</MenuItem>
 //          <MenuItem divider />
 //          <MenuItem eventKey={3.3}>Separated link</MenuItem>
 //        </NavDropdown>
 //      </Nav>