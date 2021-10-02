import {
  ON_NEW_BOARD,
  ON_NEW_BOARD_RESPONSE,
  ON_EDIT_BOARD,
  ON_EDIT_BOARD_RESPONSE,
  RESET_BOARD,
  ON_GET_ALL_BOARD,
  ON_GET_ALL_BOARD_RESPONSE,
  ON_GET_BOARD_BY_ID,
  GET_BOARD_BY_ID_RESPONSE,
  ON_BOARD_SEARCH,
  ON_BOARD_SEARCH_RESPONSE,
  SET_BOARD_HEADER_TITLE,
  ON_DELETE_BOARD,
  ON_DELETE_BOARD_RESPONSE
} from "../types/board.types"
import axios from "./axios"

const baseUrl = process.env.REACT_APP_API_VERSION + "boards"

export const createNewBoard = ({ formData }) => (dispatch) => {
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
    formData = { ...formData, userId: userData?.userDetails?.userId }
  }
  dispatch({ type: ON_NEW_BOARD })
  axios
    .post(baseUrl + "/create", {
      ...formData,
    })
    .then(function (response) {
      dispatch({ type: ON_NEW_BOARD_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      dispatch({ type: ON_NEW_BOARD_RESPONSE, payload: error?.data })
    })
}

export const editBoard = ({ formData }) => (dispatch) => {
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
    formData = { ...formData, userId: userData?.userDetails?.userId }
  }
  dispatch({ type: ON_EDIT_BOARD })
  axios
    .post(baseUrl + "/edit", {
      ...formData,
    })
    .then(function (response) {
      dispatch({ type: ON_EDIT_BOARD_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      dispatch({ type: ON_EDIT_BOARD_RESPONSE, payload: error?.data })
    })
}

export const onSearchBoardLoader = () => (dispatch) => {
  dispatch({ type: ON_BOARD_SEARCH })
}
export const getAllBoards = ({ search = "" } = {}) => (dispatch) => {
  if (!search) {
    dispatch({ type: ON_GET_ALL_BOARD })
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
            type: ON_BOARD_SEARCH_RESPONSE,
            payload: response?.data?.data,
          })
        } else {
          dispatch({
            type: ON_GET_ALL_BOARD_RESPONSE,
            payload: response?.data?.data,
          })
        }
      }
    })
    .catch(function (error) {
      if (search) {
        dispatch({
          type: ON_BOARD_SEARCH_RESPONSE,
          payload: error?.data,
        })
      } else {
        dispatch({ type: ON_GET_ALL_BOARD_RESPONSE, payload: error?.data })
      }
    })
}

export const getBoardById = (boardId) => (dispatch) => {
  dispatch({ type: ON_GET_BOARD_BY_ID })
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }
  axios
    .get(baseUrl, {
      params: {
        userId: userData?.userDetails?.userId,
        boardId,
      },
    })
    .then(function (response) {
      if (!response?.data?.error) {
        dispatch({
          type: GET_BOARD_BY_ID_RESPONSE,
          payload: response?.data?.data?.[0] ?? {},
        })
      }
    })
    .catch(function (error) {
      dispatch({ type: GET_BOARD_BY_ID_RESPONSE, payload: error?.data })
    })
}

export const updateLanes = ({ boardId, lanes }) => (dispatch) => {
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }
  axios
    .post(`${baseUrl}/update-board-lanes`, {
      userId: userData?.userDetails?.userId,
      boardId,
      lanes,
    })
    .then(function (response) {
      if (!response?.data?.error) {

      }
    })
    .catch(function (error) {
      console.log({error})
    })
}

export const resetBoard = () => (dispatch) => {
  dispatch({ type: RESET_BOARD })
}

export const setBoardHeaderTitle = (title) => (dispatch) => {
  dispatch({ type: SET_BOARD_HEADER_TITLE, payload: title })
}

export const deleteBoard = ({ boardId }) => (dispatch) => {
  dispatch({ type: ON_DELETE_BOARD })
  let userData = localStorage.getItem("userData")

  if (userData) {
    userData = JSON.parse(userData)
  }
  axios
    .post(`${baseUrl}/delete/board`, {
      boardId,
      userId: userData?.userDetails?.userId,
    })
    .then(function (response) {
      dispatch({ type: ON_DELETE_BOARD_RESPONSE, payload: response?.data })
    })
    .catch(function (error) {
      dispatch({ type: ON_DELETE_BOARD_RESPONSE, payload: error?.data })
    })
}
