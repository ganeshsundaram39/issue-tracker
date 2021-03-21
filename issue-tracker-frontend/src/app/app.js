import React, { Suspense } from "react"
import ErrorBoundary from "../hocs/ErrorBoundary/ErrorBoundary"
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./app.routes"
import "./app.scss"
import Loader from "../components/common/loader/loader"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import getPrimaryColor from "../components/common/theme/getPrimaryColor"
import { useSelector } from "react-redux"

function App() {
  const primaryColorName = useSelector((state) => state.app.primaryColorName)

  const theme = createMuiTheme({
    palette: {
      primary: getPrimaryColor({ colorName: primaryColorName }),
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Router>
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
          </ErrorBoundary>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
