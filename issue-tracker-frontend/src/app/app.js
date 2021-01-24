import React, { Suspense } from "react"
import ErrorBoundary from "../hocs/ErrorBoundary/ErrorBoundary"
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./app.routes"
import "./app.scss"
import Loader from "../components/common/loader/loader"

function App() {
  return (
    <div className="app">
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <AppRoutes />
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  )
}

export default App
