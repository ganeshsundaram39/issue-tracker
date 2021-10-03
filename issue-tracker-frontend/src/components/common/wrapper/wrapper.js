import React from "react"
import SearchAppBar from "../appbar/appbar"
import Drawer from "../drawer/drawer"
import "./wrapper.scss"

import { useSelector } from "react-redux"
import { images } from "./images"

const Wrapper = ({ children, pageName ,isIssue=false,isBoard=false}) => {
  const backgroundImg = useSelector((state) => state.app.backgroundImg)

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${images[backgroundImg]})` }}
    >
      <SearchAppBar pageName={pageName} isIssue={isIssue} isBoard={isBoard} />
      <Drawer />
      {children}
    </div>
  )
}

export default Wrapper
