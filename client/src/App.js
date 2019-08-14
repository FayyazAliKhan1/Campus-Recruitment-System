import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Registers from "./components/auth/Registers";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUsers, loadUsera, loadUserc } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    //work as a component did mount when using [] as a second param
    store.dispatch(loadUsera);
    store.dispatch(loadUserc);
    store.dispatch(loadUsers);
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
