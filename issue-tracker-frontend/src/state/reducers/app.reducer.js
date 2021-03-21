import {
  TOGGLE_DRAWER_STATE,
  SET_PRIMARY_COLOR,
  RESET_APP,
  ON_SAVE_PRIMARY_COLOR,
  ON_SAVE_PRIMARY_COLOR_RESPONSE,
  RESET_SAVE_PRIMARY_COLOR,
} from "../types/app.types"

let userTheme
if (localStorage.getItem("userData")) {
  const userData = JSON.parse(localStorage.getItem("userData"))
  if (
    userData?.userDetails?.theme?.primaryColorHash &&
    userData?.userDetails?.theme?.primaryColorName
  ) {
    userTheme = userData?.userDetails?.theme
  }
}
const initialState = {
  drawerIsOpen: false,
  primaryColorName: userTheme ? userTheme?.primaryColorName : "indigo",
  primaryColorHash: userTheme ? userTheme?.primaryColorHash : "#3f51b5",
  onSavePrimaryColor: false,
  onSavePrimaryColorResponse: null,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER_STATE:
      return {
        ...state,
        drawerIsOpen: !state.drawerIsOpen,
      }
    case SET_PRIMARY_COLOR:
      return {
        ...state,
        primaryColorName: action.payload.colorName,
        primaryColorHash: action.payload.colorHash,
      }

    case ON_SAVE_PRIMARY_COLOR:
      return {
        ...state,
        onSavePrimaryColor: true,
        onSavePrimaryColorResponse: null,
      }
    case ON_SAVE_PRIMARY_COLOR_RESPONSE:
      return {
        ...state,
        onSavePrimaryColor: false,
        onSavePrimaryColorResponse: action.payload,
      }
    case RESET_SAVE_PRIMARY_COLOR:
      return {
        ...state,
        onSavePrimaryColor: false,
        onSavePrimaryColorResponse: null,
      }
    case RESET_APP:
      return {
        ...initialState,
        primaryColorName: "indigo",
        primaryColorHash:"#3f51b5"
      }
    default:
      return state
  }
}

export default appReducer
