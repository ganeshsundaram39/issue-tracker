import React from "react"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let userData = localStorage.getItem("userData")
      if (userData) userData = JSON.parse(userData)

      return userData?.authToken ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth/login" />
      )
    }}
  />
)
export default PrivateRoute
