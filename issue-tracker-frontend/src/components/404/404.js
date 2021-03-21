import React from "react"
import PageNotFound from "../../assets/images/pagenotfound"
import "./404.scss"
import Button from "@material-ui/core/Button"
import { useSelector } from "react-redux"

export default function My404(props) {
  const primaryColorHash = useSelector((state) => state.app.primaryColorHash)

  return (
    <div className="my404">
      <PageNotFound color={primaryColorHash}/>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation()

          console.log(props)
          props.history.push("/issues")
        }}
      >
        Home
      </Button>
    </div>
  )
}
