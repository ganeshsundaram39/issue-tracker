import React from "react"
import PropTypes from "prop-types"

import CircularProgress from "@material-ui/core/CircularProgress"

import "./loader.scss"

function Loader(props) {
  return (
    <div
      className="loader"
      style={{
        backgroundColor: props.color === "black" ? "white" : "var(--bgColor)",
      }}
    >
      <CircularProgress
        size={props.size}
        thickness={props.thickness}
        style={{ color: props.color }}
      />
    </div>
  )
}

Loader.propTypes = {
  size: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

Loader.defaultProps = {
  size: 55,
  thickness: 4,
  color: "white",
}

export default Loader
