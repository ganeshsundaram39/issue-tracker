import React from "react"
import pagenotfound from "../../assets/images/pagenotfound.svg"
import "./404.scss"
import Button from "@material-ui/core/Button"

export default function My404(props) {
  return (
    <div className="my404">
      <img src={pagenotfound} alt="" />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          console.log(props)
          props.history.push("/issues")
        }}
      >
        Home
      </Button>
    </div>
  )
}
