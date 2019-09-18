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
import Profiles from "./components/Profiles/Profiles";
import ProfilesC from "./components/Profiles/ProfilesC";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/routing/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Registers from "./components/auth/Registers";
import Companies from "./components/user/Companies";
import Students from "./components/user/Students";
import Applieds from "./components/user/AppliedStudent";
import Jobs from "./components/job/Jobs";
import PostJob from "./components/job/PostJob";
import GetPJobs from "./components/job/GetPJobs";
import Apply from "./components/job/Apply";
import AppliedStudent from "./components/user/AppliedStudent";
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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profilesc" component={ProfilesC} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/companies" component={Companies} />
              <Route exact path="/students" component={Students} />
              <Route exact path="/jobs" component={Jobs} />
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
              <PrivateRoute Route exact path="/post-job" component={PostJob} />
              <PrivateRoute Route exact path="/get-jobs" component={GetPJobs} />
              <PrivateRoute Route exact path="/applieds" component={Applieds} />
              <PrivateRoute
                Route
                exact
                path="/applied-std"
                component={AppliedStudent}
              />
              <PrivateRoute Route exact path="/jobs/:id" component={Apply} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
