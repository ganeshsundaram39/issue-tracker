import { TOGGLE_DRAWER_STATE } from "../types/types"

export const toggleDrawer = () => (dispatch) => {
  dispatch({ type: TOGGLE_DRAWER_STATE })
}
