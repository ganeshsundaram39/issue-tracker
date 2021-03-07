import React, { useEffect } from "react"
import Wrapper from "../common/wrapper/wrapper"

const CloseAccount = (props) => {
  useEffect(() => {
    document.title = "IssueTracker | Close Account"
  }, [])
  return <Wrapper pageName={"Close Account"}>Close Account</Wrapper>
}

export default CloseAccount
