import React from "react"
import PropTypes from "prop-types"

import CircularProgress from "@material-ui/core/CircularProgress"

import "./loader.scss"

function Loader(props) {
  return (
    <div className="loader">
      <CircularProgress
        size={props.size}
        thickness={props.thickness}
        style={{ color: "white" }}
      />
    </div>
  )
}

Loader.propTypes = {
  size: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
}

Loader.defaultProps = {
  size: 55,
  thickness: 4,
}

export default Loader
