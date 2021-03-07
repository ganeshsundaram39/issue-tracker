import { combineReducers } from "redux"

import authReducer from "./auth.reducer"
import appReducer from "./app.reducer"
import issueReducer from "./issue.reducer"

export default combineReducers({
  auth: authReducer,
  app: appReducer,
  issue: issueReducer,
})
