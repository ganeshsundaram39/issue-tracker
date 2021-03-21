import {
  ON_NEW_ISSUE_RESPONSE,
  ON_NEW_ISSUE,
  RESET_ISSUE,
  ON_GET_ALL_ISSUE_RESPONSE,
  ON_GET_ALL_ISSUE,
  ON_GET_ISSUE_BY_ID,
  GET_ISSUE_BY_ID_RESPONSE,
  ON_ISSUE_SEARCH,
  ON_ISSUE_SEARCH_RESPONSE,
} from "../types/issue.types"
import axios from "./axios"

const baseUrl = process.env.REACT_APP_API_VERSION + "issues"

export const createNewUser = ({ formData }) => (dispatch) => {
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
    formData = { ...formData, userId: userData?.userDetails?.userId }
  }
  dispatch({ type: ON_NEW_ISSUE })
  axios
    .post(baseUrl + "/create", {
      ...formData,
    })
    .then(function (response) {

      dispatch({ type: ON_NEW_ISSUE_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      dispatch({ type: ON_NEW_ISSUE_RESPONSE, payload: error?.data })
    })
}

export const getImageUrl = async (data) => {
  var formData = new FormData()

  const file = new File([data], "image.jpg", { type: "image/jpeg" })

  formData.append("image", file)

  const res = await axios.post(baseUrl + "/create/image-upload", formData)

  return res
}

export const destroyImages = (images) => {
  axios.post(baseUrl + "/create/image-destroy", {
    images,
  })
}
export const onSearchIssueLoader = () => (dispatch) => {
  dispatch({ type: ON_ISSUE_SEARCH })
}
export const getAllIssues = ({ search = "" } = {}) => (dispatch) => {
  if (!search) {
    dispatch({ type: ON_GET_ALL_ISSUE })
  }
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }
  axios
    .get(baseUrl, {
      params: {
        userId: userData?.userDetails?.userId,
        ...(search ? { search } : {}),
      },
    })
    .then(function (response) {
      if (!response?.data?.error) {

        if (search) {
          dispatch({
            type: ON_ISSUE_SEARCH_RESPONSE,
            payload: response?.data?.data,
          })
        } else {
          dispatch({
            type: ON_GET_ALL_ISSUE_RESPONSE,
            payload: response?.data?.data,
          })
        }
      }
    })
    .catch(function (error) {

      if (search) {
        dispatch({
          type: ON_ISSUE_SEARCH_RESPONSE,
          payload: error?.data,
        })
      } else {
        dispatch({ type: ON_GET_ALL_ISSUE_RESPONSE, payload: error?.data })
      }
    })
}

export const getIssueById = (issueId) => (dispatch) => {
  dispatch({ type: ON_GET_ISSUE_BY_ID })
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }
  axios
    .get(baseUrl, {
      params: {
        userId: userData?.userDetails?.userId,
        issueId,
      },
    })
    .then(function (response) {
      if (!response?.data?.error) {

        dispatch({
          type: GET_ISSUE_BY_ID_RESPONSE,
          payload: response?.data?.data?.[0],
        })
      }
    })
    .catch(function (error) {
      dispatch({ type: GET_ISSUE_BY_ID_RESPONSE, payload: error?.data })
    })
}

export const updateComments = ({ issueId, comment }) => (dispatch) => {
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }
  axios
    .post(`${baseUrl}/comments`, {
      userId: userData?.userDetails?.userId,
      issueId,
      comment,
    })
    .then(function (response) {
      if (!response?.data?.error) {

        dispatch({
          type: GET_ISSUE_BY_ID_RESPONSE,
          payload: response?.data?.data?.[0],
        })
      }
    })
    .catch(function (error) {
      dispatch({ type: GET_ISSUE_BY_ID_RESPONSE, payload: error?.data })
    })
}

export const updateStatus = ({ issueId, status }) => (dispatch) => {
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }
  axios
    .post(`${baseUrl}/update-status`, {
      userId: userData?.userDetails?.userId,
      issueId,
      status,
    })
    .then(function (response) {
      if (!response?.data?.error) {

        dispatch({
          type: GET_ISSUE_BY_ID_RESPONSE,
          payload: response?.data?.data?.[0],
        })
      }
    })
    .catch(function (error) {
      dispatch({ type: GET_ISSUE_BY_ID_RESPONSE, payload: error?.data })
    })
}

export const resetIssue = () => (dispatch) => {
  dispatch({ type: RESET_ISSUE })
}
