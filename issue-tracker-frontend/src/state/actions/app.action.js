import {
  TOGGLE_DRAWER_STATE,
  SET_PRIMARY_COLOR,

  ON_SAVE_PRIMARY_COLOR,
  ON_SAVE_PRIMARY_COLOR_RESPONSE,
  RESET_SAVE_PRIMARY_COLOR
} from "../types/app.types"
import axios from "./axios"

const baseUrlProfile = process.env.REACT_APP_API_VERSION + "profile"

export const toggleDrawer = () => (dispatch) => {
  dispatch({ type: TOGGLE_DRAWER_STATE })
}

export const setPrimaryColor = ({ colorHash, colorName }) => (dispatch) => {
  dispatch({ type: SET_PRIMARY_COLOR, payload: { colorHash, colorName } })
}


export const savePrimaryColor = ({ colorHash, colorName,userId }) => (dispatch) => {
  dispatch({ type: ON_SAVE_PRIMARY_COLOR })

  axios
    .post(baseUrlProfile + "/update/theme", {
      colorHash,
      colorName,
      userId,
    })
    .then(function (response) {
      if(!response?.error){
        if (localStorage.getItem("userData")) {
          const userData = JSON.parse(localStorage.getItem("userData"))
          userData.userDetails = {
            ...userData?.userDetails,
            theme: response?.data?.data?.theme,
          }
          localStorage.setItem("userData", JSON.stringify(userData))
        }
      dispatch({
        type: ON_SAVE_PRIMARY_COLOR_RESPONSE,
        payload: response?.data,
      })}
    })
    .catch(function (error) {
      dispatch({ type: ON_SAVE_PRIMARY_COLOR_RESPONSE, payload: error?.data })
    })
}

export const resetSavePrimaryColor = () => (dispatch) => {
  dispatch({ type: RESET_SAVE_PRIMARY_COLOR })
}