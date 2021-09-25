import React from "react"
import SearchAppBar from "../appbar/appbar"
import Drawer from "../drawer/drawer"
import "./wrapper.scss"

import { useSelector } from "react-redux"
import { images } from "./images"

const Wrapper = ({ children, pageName }) => {
  const backgroundImg = useSelector((state) => state.app.backgroundImg)
  const isIssue = pageName?.toLowerCase()?.includes('issue')
  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${images[backgroundImg]})` }}
    >
      <SearchAppBar pageName={pageName} isIssue={isIssue} />
      <Drawer />
      {children}
    </div>
  )
}

export default Wrapper
