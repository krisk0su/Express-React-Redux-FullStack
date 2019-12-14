import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import Logout from "./Logout";

class AppNavar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.username}` : null}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="sm mb-5">
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Nav>
              <NavItem>
                <NavLink tag={Link} to="/api/posts">
                  Posts
                </NavLink>
              </NavItem>
              <NavLink tag={Link} to="/api/items">
                Items
              </NavLink>
              <NavLink tag={Link} to="/api/youtube">
                Youtube
              </NavLink>
            </Nav>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto">
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  auth: state.auth
});
export default connect(mapsStateToProps, null)(AppNavar);
