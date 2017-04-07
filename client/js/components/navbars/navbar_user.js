import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as syncActionCreators from '../../actions/sync.js';
import * as postActionCreators from '../../actions/post_request.js';

class NavbarUser extends React.Component {
  render() {
    const { currentUser } = this.props;
    const logo = (<img className="logo" role="presentation" src="/assets/images/logo-map-pin.png" />);
    return (
      <Navbar className="user-navbar" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Brand>
            <a className="app-name" onClick={() => { hashHistory.push('/map/portland'); }}>Localize <span className="logo-container">{logo}</span></a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav pullRight>
          <NavItem className="user-navbar-link" onClick={() => { hashHistory.push('/account'); }}>Your Profile</NavItem>
          <NavItem className="user-navbar-link" href="#" onClick={() => { hashHistory.push(`/newmap/${currentUser.id}`); }}>Create Map</NavItem>
          <NavItem className="user-navbar-link" href="#" onClick={() => { this.props.dispatch(postActionCreators.logOut(this.props.currentUser.token)); }}>Log Out</NavItem>
          <NavItem className="user-navbar-link" onClick={() => { this.props.dispatch(syncActionCreators.tutorialModal()); }}>Help</NavItem>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(NavbarUser);
