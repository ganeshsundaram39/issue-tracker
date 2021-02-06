import { TOGGLE_DRAWER_STATE, RESET_APP } from "../types/types"

const initialState = {
  drawerIsOpen: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER_STATE:
      return {
        ...state,
        drawerIsOpen: !state.drawerIsOpen,
      }
    case RESET_APP:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default appReducer
