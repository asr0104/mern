import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    let l;
    if (this.props.auth.isAuthenticated) {
      l = (
        <ul id="nav" className="right">
          <li onClick={this.onLogoutClick}>
            <a href="#">Logout</a>
          </li>
        </ul>
      );
    } else {
      l = (
        <ul id="nav" className="right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Signup</Link>
          </li>
        </ul>
      );
    }
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo left">
              Forum
            </a>
            {l}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
