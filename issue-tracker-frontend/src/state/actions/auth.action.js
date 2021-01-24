import {
  ON_LOGIN,
  ON_LOGIN_RESPONSE,
  ON_REGISTER,
  ON_REGISTER_RESPONSE,
  RESET_AUTH,
} from "../types/types"

const axios = require("axios")

const baseUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION +"users"

export const onLogin = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_LOGIN })
  axios
    .post(baseUrl + "/login", {
      ...formData,
    })
    .then(function (response) {
      console.log({response:response?.data})
      dispatch({ type: ON_LOGIN_RESPONSE ,payload:response?.data })
    })
    .catch(function (error) {
      console.log({error:error?.response?.data})

      dispatch({ type: ON_LOGIN_RESPONSE ,payload:error?.response?.data})
    })
}

export const onRegister = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_REGISTER })
  axios
    .post(baseUrl + "/signup", {
      ...formData,
    })
    .then(function (response) {
      console.log({response:response?.data})
      dispatch({ type: ON_REGISTER_RESPONSE ,payload:response?.data})
    })
    .catch(function (error) {
      console.log({error:error?.response?.data})
      dispatch({ type: ON_REGISTER_RESPONSE ,payload:error?.response?.data })
    })
}

export const resetAuth = () => (dispatch) => {
  dispatch({ type: RESET_AUTH })
}
