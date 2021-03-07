import React from "react"
import SearchAppBar from "../appbar/appbar"
import Drawer from "../drawer/drawer"
import "./wrapper.scss"
import MountainBg from "../../../assets/images/moutain-bg.jpeg"
const Wrapper = ({ children, pageName }) => {
  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${MountainBg})` }}
    >
      <SearchAppBar pageName={pageName} />
      <Drawer />
      {children}
    </div>
  )
}

export default Wrapper
