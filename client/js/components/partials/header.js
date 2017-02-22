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

  render () {
    const { currentUser } = this.props; 
    let rightNavLinks;
    if (currentUser) {
      rightNavLinks = (
      <Nav pullRight>
        <Navbar.Text>Signed in as: </Navbar.Text> <NavItem className="right-link" href="#" onClick={()=> {hashHistory.push('/account')}}>{currentUser.first_name}</NavItem>
        <NavItem className="right-link" href="#" onClick={()=> {hashHistory.push(`/newmap/${currentUser.id}`)}}>Create Map</NavItem>
        <NavItem className="right-link" href="#" onClick={this.logOut.bind(this)}>Log Out</NavItem>
      </Nav>
      )
    } else {
      rightNavLinks = (
      <Nav pullRight>
        <NavItem className="right-link" href="#" onClick={this.openSignIn.bind(this)}>Sign In</NavItem>
        <NavItem className="right-link" href="#" onClick={this.openSignUp.bind(this)}>Sign Up</NavItem>
      </Nav>
      )
    }

    return (
      <Navbar className="nav" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="app-name" href="#">Localize</a>
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

        //<Navbar.Text className="right-link">Signed in as: <Navbar.Link className="right-link" href="#" onClick={this.routeToUserAccount.bind(this)}>{currentUser.first_name}</Navbar.Link></Navbar.Text>

