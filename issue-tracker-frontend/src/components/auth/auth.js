import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import "./auth.scss"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Login from "./login/login"
import Signup from "./signup/signup"
import { Route, Redirect, Switch,useHistory ,useParams} from "react-router-dom"
import {useDispatch } from 'react-redux'

import { resetAuth } from "../../state/actions/auth.action"


const AuthTabs =({selectedTab,handleChange}) => {
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
  )
}

const Auth = () => {
  let history = useHistory();
  let {page} = useParams();
  const dispatch = useDispatch()


  const tabNameToIndex = {
    0: "login",
    1: "signup"
  }
  const indexToTabName ={
    login: 0,
    signup: 1
  }

  const [selectedTab, setSelectedTab] = useState(indexToTabName?.[page]?indexToTabName?.[page]:0);

  const handleChange= (event, newValue) => {
    history.push(`/auth/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
    dispatch(resetAuth())
  }


  return (
    <div className="auth">
      <div className="login-section">
        <h1 className="center">
          <div className="logo">
            <span className="logo-title">IssueTracker</span>
            <span className="logo-underline"></span>
          </div>
        </h1>
        <Card className="card-style">
        <AuthTabs selectedTab={selectedTab} handleChange={handleChange}/>
        </Card>
      </div>
    </div>
  )
}
export default Auth
