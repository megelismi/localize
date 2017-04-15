import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Sticky } from 'react-sticky';
import * as syncActionCreators from '../../actions/sync.js';

class NavbarHomePage extends React.Component {

  render() {
    return (
      <Sticky>
        <Navbar className="navbar-homepage" collapseOnSelect>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            <NavItem className="right-link" onClick={() => { this.props.dispatch(syncActionCreators.signInModal()); }}>Sign In</NavItem>
            <NavItem className="right-link" onClick={() => { this.props.dispatch(syncActionCreators.signUpModal()); }}>Sign Up</NavItem>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Sticky>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(NavbarHomePage);
