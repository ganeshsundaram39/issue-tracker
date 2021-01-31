import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import "./auth.scss"
import {
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom"
import { useDispatch } from "react-redux"

import { resetAuth } from "../../state/actions/auth.action"

import AuthenticationImage from "../../assets/images/authentication2.svg"
import  AuthTabs  from "./auth-tabs"
// import  useCountRenders from "./useCountRenders"
// https://github.com/ReactTraining/react-router/issues/7539
const Auth = () => {
  let history = useHistory()
  let { page } = useParams()
  const dispatch = useDispatch()
  let userdata = localStorage.getItem("userdata")
  if (userdata) userdata = JSON.parse(userdata)
  const tabNameToIndex = {
    0: "login",
    1: "signup",
  }
  const indexToTabName = {
    login: 0,
    signup: 1,
  }

  const [selectedTab, setSelectedTab] = useState(
    indexToTabName?.[page] ? indexToTabName?.[page] : 0
  )

  const handleChange = (event, newValue) => {
    history.push(`/auth/${tabNameToIndex[newValue]}`)
    setSelectedTab(newValue)
    dispatch(resetAuth())
  }

  // useCountRenders('Auth Component')

  return (
    <>
      {userdata?.authToken ? <Redirect to="/issues" /> : null}
      <div className="auth">
        <img src={AuthenticationImage} alt={"Authentication"} />
        <div className="login-section">
          <h1 className="center">
            <div className="logo">
              <span className="logo-title">IssueTracker</span>
              <span className="logo-underline"></span>
            </div>
          </h1>
          <Card className="card-style">
            <AuthTabs selectedTab={selectedTab} handleChange={handleChange} />
          </Card>
        </div>
      </div>
    </>
  )
}
export default Auth

