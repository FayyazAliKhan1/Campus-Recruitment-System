import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfileS from "./components/profile-forms/CreateProfileS";
import CreateProfileC from "./components/profile-forms/CreateProfileC";
import EditProfile from "./components/profile-forms/EditProfile";
import EditProfileC from "./components/profile-forms/EditProfileC";
import AddExperience from "./components/profile-forms/AddExperience";
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Registers from "./components/auth/Registers";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import AddEducation from "./components/profile-forms/AddEducation";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/registers" component={Registers} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                Route
                exact
                path="/dashboard"
                component={Dashboard}
              />
              <PrivateRoute
                Route
                exact
                path="/create-profiles"
                component={CreateProfileS}
              />
              <PrivateRoute
                Route
                exact
                path="/create-profilec"
                component={CreateProfileC}
              />
              <PrivateRoute
                Route
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                Route
                exact
                path="/edit-profilec"
                component={EditProfileC}
              />
              <PrivateRoute
                Route
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                Route
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
