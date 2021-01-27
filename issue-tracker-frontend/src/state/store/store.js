import { createStore, compose, applyMiddleware } from "redux"
import rootReducer from "../reducers/root.reducer"
import thunk from "redux-thunk"

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__ ?
      window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }):f=>f
  )
)
