import React from "react"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let userdata = localStorage.getItem("userdata")
      if (userdata) userdata = JSON.parse(userdata)

      return userdata?.authToken ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth/login" />
      )
    }}
  />
)
export default PrivateRoute
