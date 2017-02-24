import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';
import * as actionCreators from '../../actions/sync.js';
import * as post_actions from '../../actions/post_request.js'; 
import { hashHistory } from 'react-router'; 

import { connect } from 'react-redux';

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

  logOut () {
    this.props.dispatch(post_actions.logOut(this.props.currentUser.token)); 
  }

  openTutorial () {
    this.props.dispatch(actionCreators.tutorialModal());
  }

  render () {
    const { currentUser } = this.props; 
    let rightNavLinks;
    if (currentUser) {
      rightNavLinks = (
      <Nav pullRight>
        <NavItem className="right-link" onClick={()=> {hashHistory.push('/account')}}>{currentUser.first_name}'s Profile</NavItem>
        <NavItem className="right-link" onClick={()=> {hashHistory.push(`/newmap/${currentUser.id}`)}}>Create Map</NavItem>
        <NavItem className="right-link" onClick={this.logOut.bind(this)}>Log Out</NavItem>
        <NavItem className="right-link" onClick={this.openTutorial.bind(this)} href="#">Help</NavItem>
      </Nav>
      )
    } else {
      rightNavLinks = (
      <Nav pullRight>
        <NavItem className="right-link" onClick={this.openSignIn.bind(this)}>Sign In</NavItem>
        <NavItem className="right-link" onClick={this.openSignUp.bind(this)}>Sign Up</NavItem>
        <NavItem className="right-link" onClick={this.openTutorial.bind(this)} href="#">Help</NavItem>
      </Nav>
      )
    }

    let logo = (<img className="logo" src="/assets/images/logo-map-pin.png" />)

    return (
      <Navbar className="nav" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="app-name" onClick={() => {hashHistory.push('/map/portland')}}>Localize <span>{logo}</span></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {rightNavLinks}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})
export default connect(mapStateToProps)(Header);

