import {
    ON_NEW_BOARD_RESPONSE,
    ON_NEW_BOARD,
    RESET_BOARD,
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




  export const resetBoard = () => (dispatch) => {
    dispatch({ type: RESET_BOARD })
  }
