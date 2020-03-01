import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    this.fetchPosts();
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  fetchPosts() {
    axios.get("/posts").then(res => {
      this.setState({
        posts: res.data.data
      });
    });
  }
  render() {
    return (
      <div style={{ height: "75vh" }} className="container ">
        <div className="row">
          <div className="col s12 center-align">
            <Link
              to="/createpost"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              New Post
            </Link>
          </div>
          {this.state.posts.map(post => (
            <div key={post.id} className="row">
              <div className="col s12">
                <div className="card blue-grey darken-1">
                  <div className="card-title">
                    <Link to={"/dashboard/" + post.id}>
                      <ul className="collection">
                        <li className="collection-item avatar">
                          <img
                            src="https://www.rickmanx.com/Images/BlankUserLogo.jpg"
                            alt="dp"
                            className="circle"
                          />
                          <span className="title">UserID- {post.postedBy}</span>
                          <br />
                          <span className="title">{Date(post.posted_on)}</span>
                        </li>
                      </ul>
                    </Link>
                  </div>
                  <div className="card-content white-text">{post.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
