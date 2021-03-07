import { RESET_APP } from "../types/app.types"
import {
  ON_LOGIN,
  ON_LOGIN_RESPONSE,
  ON_REGISTER,
  ON_REGISTER_RESPONSE,
  RESET_AUTH,
} from "../types/auth.types"
import axios from "./axios"

import { popupCenter } from "./popupCenter"
import { popupListener } from "./popupListener"


const baseUrl = process.env.REACT_APP_API_VERSION + "users"

export const onLogin = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_LOGIN })
  axios
    .post(baseUrl + "/login", {
      ...formData,
    })
    .then(function (response) {
      console.log({ response: response?.data })
      dispatch({ type: ON_LOGIN_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      console.log({ error: error?.data })

      dispatch({ type: ON_LOGIN_RESPONSE, payload: error?.data })
    })
}

export const onRegister = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_REGISTER })
  axios
    .post(baseUrl + "/signup", {
      ...formData,
    })
    .then(function (response) {
      console.log({ response: response?.data })
      dispatch({ type: ON_REGISTER_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      console.log({ error: error?.data })
      dispatch({ type: ON_REGISTER_RESPONSE, payload: error?.data })
    })
}

export const resetAuth = () => (dispatch) => {
  dispatch({ type: RESET_AUTH })
}
export const logoutUser = () => (dispatch) => {
  dispatch({ type: RESET_AUTH })
  dispatch({ type: RESET_APP })
}

export const onGoogleLogin = () => (dispatch) => {
  dispatch({ type: ON_LOGIN })

  popupCenter({ url: baseUrl + "/login/google", title: "Google Login" })

  popupListener(dispatch)

}
export const onGithubLogin = () => (dispatch) => {
  dispatch({ type: ON_LOGIN })

  popupCenter({ url: baseUrl + "/login/github", title: "Github Login" })

  popupListener(dispatch)

}

export const onTwitterLogin = () => (dispatch) => {
  dispatch({ type: ON_LOGIN })

  popupCenter({ url: baseUrl + "/login/twitter", title: "Twitter Login" })

  popupListener(dispatch)

}

export const onFacebookLogin = () => (dispatch) => {
  dispatch({ type: ON_LOGIN })

  popupCenter({ url: baseUrl + "/login/facebook", title: "Facebook Login" })

  popupListener(dispatch)
}

