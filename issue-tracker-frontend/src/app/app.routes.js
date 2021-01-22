import React, { lazy } from "react"
import { Route, Redirect, Switch } from "react-router-dom"

const Auth = lazy(() => import("../components/auth/auth"))
const Issues = lazy(() => import("../components/issues/issues"))
const Profile = lazy(() => import("../components/profile/profile"))
const My404 = lazy(() => import("../components/404/404"))

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/auth/:page" component={Auth} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/issues" component={Issues} />
      <Redirect from="/" exact to="/auth/login" />
      <Route path="*" component={My404} />
    </Switch>
  )
}
