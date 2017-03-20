import React from 'react'; 
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

const LandingHeader = (props) => {

	return (
	  <Navbar collapseOnSelect className="landing-header">
      <Navbar.Header>
        <Navbar.Toggle className="landing-page-header-toggle"/>
      </Navbar.Header>
      <Navbar.Collapse>
        {props.rightNavLinks}
      </Navbar.Collapse>
  </Navbar>
	)
  
}

export default LandingHeader; 
