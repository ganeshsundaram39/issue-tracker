import {
  ON_NEW_ISSUE_RESPONSE,
  ON_NEW_ISSUE,
  RESET_ISSUE,
  ON_GET_ALL_ISSUE_RESPONSE,
  ON_GET_ALL_ISSUE,
  ON_GET_ISSUE_BY_ID,
  GET_ISSUE_BY_ID_RESPONSE
} from "../types/issue.types"
import axios from "./axios"

const baseUrl = process.env.REACT_APP_API_VERSION + "issues"


export const onNewIssue = ({ formData }) => (dispatch) => {
  let userdata = localStorage.getItem("userdata")

  if (userdata) {
    userdata = JSON.parse(userdata)
    formData = { ...formData, userId: userdata?.userDetails?.userId }
  }
  dispatch({ type: ON_NEW_ISSUE })
  axios
    .post(baseUrl + "/create", {
      ...formData,
    })
    .then(function (response) {
      console.log({ response: response?.data })
      dispatch({ type: ON_NEW_ISSUE_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      console.log({ error: error?.response?.data })
      dispatch({ type: ON_NEW_ISSUE_RESPONSE, payload: error?.response?.data })
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

export const getAllIssues = () => (dispatch) => {
  dispatch({ type: ON_GET_ALL_ISSUE })
  let userdata = localStorage.getItem("userdata")

  if (userdata) {
    userdata = JSON.parse(userdata)
  }
  axios
    .get(baseUrl, {
      params: {
        userId: userdata?.userDetails?.userId,
      },
    })
    .then(function (response) {
      if (!response?.data?.error) {
        console.log({ response: response?.data?.data })
        dispatch({
          type: ON_GET_ALL_ISSUE_RESPONSE,
          payload: response?.data?.data,
        })
      }
    })
    .catch(function (error) {
      console.log({ error: error?.data })
      dispatch({ type: ON_GET_ALL_ISSUE_RESPONSE, payload: error?.data })
    })
}


export const getIssueById = (issueId) => (dispatch) => {
  dispatch({ type: ON_GET_ISSUE_BY_ID })
  let userdata = localStorage.getItem("userdata")

  if (userdata) {
    userdata = JSON.parse(userdata)
  }
  axios
    .get(baseUrl, {
      params: {
        userId: userdata?.userDetails?.userId,
        issueId
      },
    })
    .then(function (response) {
      if (!response?.data?.error) {
        console.log({ response: response?.data?.data })
        dispatch({
          type: GET_ISSUE_BY_ID_RESPONSE,
          payload: response?.data?.data?.[0]
        })
      }
    })
    .catch(function (error) {
      console.log({ error: error?.data })
      dispatch({ type: GET_ISSUE_BY_ID_RESPONSE, payload: error?.data })
    })
}

export const resetIssue = () => (dispatch) => {
  dispatch({ type: RESET_ISSUE })
}
