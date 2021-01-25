import { combineReducers } from "redux"

import authReducer from "./auth.reducer"
import appReducer from "./app.reducer"

export default combineReducers({
  auth: authReducer,
  app: appReducer,
})
