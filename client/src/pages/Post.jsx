import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";
import qs from "qs";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: [],
      comment: "",
      comments: []
    };
  }
  componentDidMount() {
    this.fetchPost();
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  fetchPost() {
    axios.get("/posts/" + this.props.match.params.id).then(res => {
      this.setState({
        post: res.data.data,
        comments: res.data.data.comments
      });
      console.log(res.data.data)
    });
  }
  AddComment = e => {
    e.preventDefault();
    let data = qs.stringify({
      content: this.state.comment,
      post_id: this.props.match.params.id
    });
    axios
      .post("/posts/" + this.props.match.params.id + "/comment", data)
      .then(res => {
        this.state.comments.push({ content: this.state.comment });
        this.setState({
          comment: ""
        });
      });
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container ">
        <div className="row">
          <div className="col s12">
            <div className="card blue-grey darken-1">
              <div className="card-title">
                <ul className="collection">
                  <li className="collection-item avatar">
                    <img
                      src="https://www.rickmanx.com/Images/BlankUserLogo.jpg"
                      alt=""
                      className="circle"
                    />
                    <span className="title">User ID- {this.state.post.email}</span><br/>
                    <span className="title">{Date(this.state.post.posted_on)}</span>
                  </li>
                </ul>
              </div>
              <div className="card-content white-text">
                {this.state.post.content}
              </div>
            </div>
            <div className="input-field col s12">
              <input
                id="comment"
                type="text"
                className="validate"
                value={this.state.comment}
                onChange={this.onChange}
              />
              <label htmlFor="comment">Comment</label>
              <i className="material-icons prefix" onClick={this.AddComment}>
                add_comment
              </i>
            </div>
          </div>
        </div>
        <ul className="collection">
          {this.state.comments.map(comment => (
            <li key={comment._id} className="collection-item avatar">
              <img
                src="https://www.rickmanx.com/Images/BlankUserLogo.jpg"
                alt=""
                className="circle"
              />
              <span className="title">UserID-{comment.postedBy}</span>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
Post.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Post);
