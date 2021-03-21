import { RESET_APP } from "../types/app.types"
import {
  ON_LOGIN,
  ON_LOGIN_RESPONSE,
  ON_REGISTER,
  ON_REGISTER_RESPONSE,
  RESET_AUTH,
  ON_GET_USER_INFO,
  ON_GET_USER_INFO_RESPONSE,
  ON_UPLOAD_PROFILE_PHOTO,
  ON_UPLOAD_PROFILE_PHOTO_RESPONSE,
  ON_UPDATE_PROFILE_BASIC,
  ON_UPDATE_PROFILE_BASIC_RESPONSE,
  RESET_UPDATE_PROFILE_DATA,
  ON_UPDATE_PROFILE_PASSWORD,
  ON_UPDATE_PROFILE_PASSWORD_RESPONSE,
  ON_CLOSE_ACCOUNT,
  ON_CLOSE_ACCOUNT_RESPONSE
} from "../types/auth.types"
import axios from "./axios"

import { popupCenter } from "./popupCenter"
import { popupListener } from "./popupListener"

const baseUrl = process.env.REACT_APP_API_VERSION + "user"
const baseUrlProfile = process.env.REACT_APP_API_VERSION + "profile"

export const onLogin = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_LOGIN })
  axios
    .post(baseUrl + "/login", {
      ...formData,
    })
    .then(function (response) {
      dispatch({ type: ON_LOGIN_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
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

      dispatch({ type: ON_REGISTER_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
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

export const getUserInfo = () => (dispatch) => {
  dispatch({ type: ON_GET_USER_INFO })

  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }
  axios
    .get(baseUrlProfile, {
      params: {
        userId: userData?.userDetails?.userId,
      },
    })
    .then(function (response) {
      if (!response?.data?.error) {

        dispatch({
          type: ON_GET_USER_INFO_RESPONSE,
          payload: response?.data?.data,
        })
      }
    })
    .catch(function (error) {

      dispatch({ type: ON_GET_USER_INFO_RESPONSE, payload: error?.data })
    })
}

export const updateProfilePhoto = ({ file }) => (dispatch) => {
  dispatch({ type: ON_UPLOAD_PROFILE_PHOTO })

  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }

  const formData = new FormData()

  formData.append("image", file)
  formData.append("userId", userData?.userDetails?.userId)

  axios
    .post(baseUrlProfile + "/image-upload", formData)
    .then((response) => {
      if (!response?.data?.error) {
        dispatch({
          type: ON_UPLOAD_PROFILE_PHOTO_RESPONSE,
          payload: response?.data,
        })
      }
    })
    .catch((error) => {

      dispatch({ type: ON_UPLOAD_PROFILE_PHOTO_RESPONSE, payload: error?.data })
    })
}

export const updateProfileBasic = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_UPDATE_PROFILE_BASIC })
  axios
    .post(baseUrlProfile + "/update/basic", {
      ...formData,
    })
    .then(function (response) {

      dispatch({ type: ON_UPDATE_PROFILE_BASIC_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      dispatch({ type: ON_UPDATE_PROFILE_BASIC_RESPONSE, payload: error?.data })
    })
}

export const resetUpdateProfileData =()=>(dispatch)=>{
  dispatch({ type: RESET_UPDATE_PROFILE_DATA })
}

export const updateProfilePassword = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_UPDATE_PROFILE_PASSWORD })
  axios
    .post(baseUrlProfile + "/update/password", {
      ...formData,
    })
    .then(function (response) {

      dispatch({ type: ON_UPDATE_PROFILE_PASSWORD_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      dispatch({ type: ON_UPDATE_PROFILE_PASSWORD_RESPONSE, payload: error?.data })
    })
}
export const closeAccount = ({ userId }) => (dispatch) => {
  dispatch({ type: ON_CLOSE_ACCOUNT })

  axios
    .post(baseUrlProfile + "/close-account", {
      userId,
    })
    .then(function (response) {
      dispatch({ type: ON_CLOSE_ACCOUNT_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      dispatch({ type: ON_CLOSE_ACCOUNT_RESPONSE, payload: error?.data })
    })
}
