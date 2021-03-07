import React, { useEffect, useState } from "react"
import Wrapper from "../common/wrapper/wrapper"
import "./profile.scss"
import Card from "@material-ui/core/Card"
import ProfilePhoto from "./profilephoto/profilephoto"

const Profile = (props) => {
  const [url,setUrl]=useState('')

  useEffect(() => {
    document.title = "IssueTracker | Profile";

  }, [])

  return (
    <Wrapper pageName={"Profile"}>
      <div className="profile-wrapper">
        <Card className="card-style">
          <div className="profile-photo">
           <ProfilePhoto previousUrl={"https://api.hello-avatar.com/adorables/"+'asdf'}/>
          </div>
          <div className="user-data"></div>
        </Card>
      </div>
    </Wrapper>
  )
}

export default Profile
