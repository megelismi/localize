import React from 'react'; 
import {Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';


const LandingHeader = (props) => {
	return (
	  <Navbar collapseOnSelect className="landing-header">
    <Navbar.Header>
      <Navbar.Toggle className="landing-page-header-toggle"/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem className="landing-header-links" onClick={props.signUp} eventKey={1} href="#">Sign Up</NavItem>
        <NavItem className="landing-header-links" onClick={props.signIn} eventKey={2} href="#">Sign In</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
	)
}

export default LandingHeader; 
