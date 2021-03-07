import React, { lazy } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import CloseAccount from "../components/close-account/close-account"
import PrivateRoute from "../hocs/privateroute/privateroute"

const Auth = lazy(() => import("../components/auth/auth"))
const Issues = lazy(() => import("../components/issues/issues"))
const Profile = lazy(() => import("../components/profile/profile"))
const My404 = lazy(() => import("../components/404/404"))

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/auth/:page" component={Auth} />

      <PrivateRoute  path="/issues" component={Issues} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute  exact path="/close-account" component={CloseAccount} />


      <Redirect from="/" exact to="/issues" />
      <Route path="*" component={My404} />
    </Switch>
  )
}
