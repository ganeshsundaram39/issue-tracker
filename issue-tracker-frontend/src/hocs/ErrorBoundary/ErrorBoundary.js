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
    this.setState({
      hasError: true,
      error: error,
      info: info,
    })
  }
  handleClick = (event) => {
    event.stopPropagation()

    window.location.reload()
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "var(--bgColor)",
          }}
        >
          <h1 style={{ color: "white", marginBottom: "30px" }}>
            Oops, something went wrong :(
          </h1>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            Please Reload
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
