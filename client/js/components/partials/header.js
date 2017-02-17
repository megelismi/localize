import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';
import * as actionCreators from '../../actions/sync.js';
import { connect } from 'react-redux';


class Header extends React.Component  {
  constructor (props) {
    super(props); 
  }

  openSignUp () {
    this.props.dispatch(actionCreators.signUpModal());
  }
  render () {
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
            <NavItem className="right-link" eventKey={1} href="#" onClick={this.openSignUp.bind(this)}>Sign Up</NavItem>
            <NavItem className="right-link" eventKey={2} href="#">Log In</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}


export default connect()(Header);

