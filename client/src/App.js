import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Posts';
import Navbar from './components/Nav';
import PrivateRoute from "./components/PrivateRoute";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar></Navbar>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/createpost" component={NewPost} />
            <PrivateRoute path="/dashboard/:id" component={Post} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}


class Home extends Component {
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (localStorage.getItem("jwtToken")) {
      this.props.history.push("/dashboard");
    }
  }
  
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <p className="flow-text grey-text text-darken-1">
              This is forum built in MERN stack.
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
