import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Login from "./login/login";
import Signup from "./signup/signup";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";

 const AuthTabs = ({ selectedTab, handleChange }) => {
  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
        aria-label="Issue Tracker Login/Signup"
      >
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/signup" component={Signup} />
        <Redirect from="*" to="/auth/login" />
      </Switch>
    </>
  );
};
export default AuthTabs