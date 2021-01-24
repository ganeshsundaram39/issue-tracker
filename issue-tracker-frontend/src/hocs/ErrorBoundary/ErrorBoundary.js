import React from "react"
import { withRouter } from "react-router-dom"
import Button from "@material-ui/core/Button"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      info: null,
    }
  }
  componentDidCatch(error, info) {
    console.log({
      hasError: true,
      error: error,
      info: info,
    })
    this.setState({
      hasError: true,
      error: error,
      info: info,
    })
  }
  handleClick = () => {
    if (process.env.REACT_APP_ENV === "production") {
      this.props.history.push("/")
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            "justify-content": "center",
            "align-content": "center",
          }}
        >
          <h1 style={{ color: "red" }}>Oops, something went wrong :(</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            Reload
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}

export default withRouter(ErrorBoundary)