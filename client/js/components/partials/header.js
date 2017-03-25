import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';
import * as actionCreators from '../../actions/sync.js';
import * as post_actions from '../../actions/post_request.js';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { Sticky } from 'react-sticky';

class Header extends React.Component  {
  constructor (props) {
    super(props);
  }

  openSignUp () {
    this.props.dispatch(actionCreators.signUpModal());
  }

  openSignIn () {
    this.props.dispatch(actionCreators.signInModal());
  }

  render () {
    return (
      <Sticky>
        <Navbar className="main-header" collapseOnSelect>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            <NavItem className="right-link" onClick={this.openSignIn.bind(this)}>Sign In</NavItem>
            <NavItem className="right-link" onClick={this.openSignUp.bind(this)}>Sign Up</NavItem>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Sticky>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Header);
