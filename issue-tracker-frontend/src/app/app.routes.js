import React, { lazy } from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import PrivateRoute from "../hocs/privateroute/privateroute"

const Auth = lazy(() => import("../components/auth/auth"))
const Issues = lazy(() => import("../components/issues/issues"))
const Boards = lazy(() => import("../components/boards/boards"))

const Profile = lazy(() => import("../components/profile/profile"))
const My404 = lazy(() => import("../components/404/404"))

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/auth/:page" component={Auth} />

      <PrivateRoute path="/issues" component={Issues} />
      <PrivateRoute path="/boards" component={Boards} />


      <PrivateRoute exact path="/profile" component={Profile} />

      <Redirect from="/" exact to="/issues" />
      <Route path="*" component={My404} />
    </Switch>
  )
}
