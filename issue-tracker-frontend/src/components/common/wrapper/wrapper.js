import React from "react"
import SearchAppBar from "../appbar/appbar"
import Drawer from "../drawer/drawer"

const Wrapper = ({ children, pageName }) => {
  return (
    <div>
      <SearchAppBar pageName={pageName} />
      <Drawer />
      {children}
    </div>
  )
}

export default Wrapper
