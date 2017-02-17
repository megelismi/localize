import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';
 
class Header extends React.Component  {
  constructor (props) {
    super(props); 
    this.state = {
      showModal: false
    }
  }

  open () {
    this.setState({
      showModal: true
    })
  }

  close () {
    this.setState({
      showModal: false
    })
  }

  render () {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );

    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
     <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Text in a modal</h4>
      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

      <h4>Popover in a modal</h4>
      <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

      <h4>Tooltips in a modal</h4>
      <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

      <hr />

      <h4>Overflowing text to show scroll behavior</h4>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={this.close.bind(this)}>Close</Button>
    </Modal.Footer>
  </Modal>

      <Navbar className="nav" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="app-name" href="#">Localize</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem className="right-link" eventKey={1} href="#" onClick={this.open.bind(this)}>Sign Up</NavItem>
            <NavItem className="right-link" eventKey={2} href="#" onClick={this.open.bind(this)}>Log In</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    )
  }
}

export default Header;

