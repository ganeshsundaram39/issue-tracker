import React, { Suspense } from "react"
import ErrorBoundary from "../hocs/ErrorBoundary/ErrorBoundary"
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./app.routes"
import "./app.scss"
import Loader from "../components/common/loader/loader"

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Router>
          <Suspense fallback={<Loader />}>
            <AppRoutes />
          </Suspense>
        </Router>
      </div>
    </ErrorBoundary>
  )
}

export default App
