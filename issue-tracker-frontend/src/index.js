import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./app/app"
import { Provider } from "react-redux"
import { store } from "./state/store/store"
import { SnackbarProvider } from "notistack"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

