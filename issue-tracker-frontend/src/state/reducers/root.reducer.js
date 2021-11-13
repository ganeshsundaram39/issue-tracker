import { combineReducers } from "redux"

import authReducer from "./auth.reducer"
import appReducer from "./app.reducer"
import issueReducer from "./issue.reducer"
import boardReducer from "./board.reducer"


export default combineReducers({
  auth: authReducer,
  app: appReducer,
  issue: issueReducer,
  board: boardReducer,
})
