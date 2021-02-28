import { TOGGLE_DRAWER_STATE } from "../types/app.types"

export const toggleDrawer = () => (dispatch) => {
  dispatch({ type: TOGGLE_DRAWER_STATE })
}
