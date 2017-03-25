import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Sticky } from 'react-sticky';
import * as actionCreators from '../../actions/sync.js';

class NavbarNoUser extends React.Component  {

  render () {
    return (
      <Sticky>
        <Navbar className="no-user-navbar" collapseOnSelect>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            <NavItem className="right-link" onClick={() => {this.props.dispatch(actionCreators.signInModal())}}>Sign In</NavItem>
            <NavItem className="right-link" onClick={() => {this.props.dispatch(actionCreators.signUpModal())}}>Sign Up</NavItem>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Sticky>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(NavbarNoUser);
