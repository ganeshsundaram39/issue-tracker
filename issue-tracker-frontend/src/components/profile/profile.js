import React,{useEffect} from "react"
import Wrapper from "../common/wrapper/wrapper"
// https://api.hello-avatar.com/adorables/ganesh
const Profile = (props) => {


  useEffect(() => {
    document.title = "IssueTracker | Profile"
  }, [])
  return <Wrapper pageName={"Profile"}>Profile page</Wrapper>
}

export default Profile
