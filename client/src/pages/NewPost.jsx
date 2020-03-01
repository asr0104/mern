import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  Submit = e => {
    e.preventDefault();
    var newPost = {
      content: this.state.content,
      email: this.props.auth.email,
      time: Date.now()
    };
    newPost = qs.stringify(newPost);
    axios.post("/posts", newPost).then(res => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <div className="input-field col s12">
              <textarea
                id="content"
                cols="60"
                className="materialize-textarea"
                value={this.state.content}
                onChange={this.onChange}
              ></textarea>
              <label htmlFor="textarea1">Textarea</label>
            </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.Submit}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

NewPost.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(NewPost);
