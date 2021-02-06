import {
  ON_LOGIN,
  ON_LOGIN_RESPONSE,
  ON_REGISTER,
  ON_REGISTER_RESPONSE,
  RESET_AUTH,
  RESET_APP,
} from "../types/types"

import { popupCenter } from "./popupCenter"

const axios = require("axios")

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
      console.log({ error: error?.response?.data })

      dispatch({ type: ON_LOGIN_RESPONSE, payload: error?.response?.data })
    })
}

export const onGoogleLogin = () => (dispatch) => {
  dispatch({ type: ON_LOGIN })

  popupCenter({ url: baseUrl + "/login/google", title: "Google Login" })

  window.addEventListener("message", (message) => {
    console.log({ message })
    if (message?.data?.apiResponse) {
      if (!message?.data?.apiResponse?.error) {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      } else {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      }
    } else {
      // dispatch({ type: ON_LOGIN_RESPONSE, payload: error?.response?.data })
    }
  })
}
export const onGithubLogin = () => (dispatch) => {
  dispatch({ type: ON_LOGIN })

  popupCenter({ url: baseUrl + "/login/github", title: "Github Login" })

  window.addEventListener("message", (message) => {
    console.log({ message })
    if (message?.data?.apiResponse) {
      if (!message?.data?.apiResponse?.error) {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      } else {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      }
    } else {
      // dispatch({ type: ON_LOGIN_RESPONSE, payload: error?.response?.data })
    }
  })
}

export const onTwitterLogin = () => (dispatch) => {
  dispatch({ type: ON_LOGIN })

  popupCenter({ url: baseUrl + "/login/twitter", title: "Twitter Login" })

  window.addEventListener("message", (message) => {
    console.log({ message })
    if (message?.data?.apiResponse) {
      if (!message?.data?.apiResponse?.error) {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      } else {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      }
    } else {
      // dispatch({ type: ON_LOGIN_RESPONSE, payload: error?.response?.data })
    }
  })
}

export const onFacebookLogin = () => (dispatch) => {
  dispatch({ type: ON_LOGIN })

  popupCenter({ url: baseUrl + "/login/facebook", title: "Facebook Login" })

  window.addEventListener("message", (message) => {
    console.log({ message })
    if (message?.data?.apiResponse) {
      if (!message?.data?.apiResponse?.error) {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      } else {
        dispatch({
          type: ON_LOGIN_RESPONSE,
          payload: message?.data?.apiResponse,
        })
      }
    } else {
      // dispatch({ type: ON_LOGIN_RESPONSE, payload: error?.response?.data })
    }
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
      console.log({ error: error?.response?.data })
      dispatch({ type: ON_REGISTER_RESPONSE, payload: error?.response?.data })
    })
}

export const resetAuth = () => (dispatch) => {
  dispatch({ type: RESET_AUTH })
}
export const logoutUser = () => (dispatch) => {
  dispatch({ type: RESET_AUTH })
  dispatch({ type: RESET_APP })
}
