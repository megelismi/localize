import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as syncActionCreators from '../../actions/sync.js';
import * as postActionCreators from '../../actions/post_request.js';

class NavbarUser extends React.Component {

  render() {
    const { currentUser } = this.props;
    let rightNavLinks; 
    if (currentUser) {
      rightNavLinks = (
        <Nav pullRight>
          <NavItem className="navbar-app-link" onClick={() => { hashHistory.push('/account'); }}>My Profile</NavItem>
          <NavItem className="navbar-app-link" href="#" onClick={() => { hashHistory.push(`/newmap/${currentUser.id}`); }}>My Map</NavItem>
          <NavItem className="navbar-app-link" href="#" onClick={() => { this.props.dispatch(postActionCreators.logOut(this.props.currentUser.token)); }}>Log Out</NavItem>
          <NavItem className="navbar-app-link" onClick={() => { this.props.dispatch(syncActionCreators.tutorialModal()); }}>Help</NavItem>
        </Nav>
      );
    } else {
      rightNavLinks = (
        <Nav pullRight>
          <NavItem className="navbar-app-link" onClick={() => { this.props.dispatch(syncActionCreators.signInModal()); }}>Sign In</NavItem>
          <NavItem className="navbar-app-link" onClick={() => { this.props.dispatch(syncActionCreators.signUpModal()); }}>Sign Up</NavItem>
        </Nav>
      );
    }
    const logo = (<img className="logo" role="presentation" src="/assets/images/logo-map-pin.png" />);
    return (
      <Navbar className="navbar-app" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Brand>
            <a className="app-name" onClick={() => { hashHistory.push('/map/portland'); }}>Localize <span className="logo-container">{logo}</span></a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          {rightNavLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(NavbarUser);
