import React, { useEffect, useState } from "react"
import Wrapper from "../common/wrapper/wrapper"
import "./profile.scss"
import Card from "@material-ui/core/Card"
import { useSelector, useDispatch } from "react-redux"
import { getUserInfo } from "../../state/actions/auth.action"
import { useSnackbar } from "notistack"
import { ProfileTabs } from "./profile-tabs/profile-tabs"

const Profile = () => {
  const [url, setUrl] = useState("")
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onGetUser = useSelector((state) => state.auth.onGetUser)
  const onGetUserResponse = useSelector((state) => state.auth.onGetUserResponse)
  const onUploadProfilePhoto = useSelector(
    (state) => state.auth.onUploadProfilePhoto
  )
  const onUploadProfilePhotoResponse = useSelector(
    (state) => state.auth.onUploadProfilePhotoResponse
  )

  useEffect(() => {
    if (!onGetUser && onGetUserResponse) {
      if (onGetUserResponse && onGetUserResponse.length) {
        const userData = onGetUserResponse[0]
        if (userData?.googleLogin && userData?.picture?.includes?.("=")) {
          const cleanPicture = userData.picture.split("=")[0]
          setUrl(cleanPicture)
        } else {
          setUrl(userData?.picture)
        }
        setUser(userData)
      } else if (onGetUserResponse && onGetUserResponse?.error) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
      }
    }
  }, [onGetUser, onGetUserResponse, enqueueSnackbar])

  useEffect(() => {
    if (!onUploadProfilePhoto && onUploadProfilePhotoResponse) {
      if (onUploadProfilePhotoResponse && onUploadProfilePhotoResponse.url) {
        setUrl(onUploadProfilePhotoResponse?.url)
        enqueueSnackbar("Profile photo updated!", { variant: "success" })
      } else if (
        onUploadProfilePhotoResponse &&
        onUploadProfilePhotoResponse?.error
      ) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
      }
    }
  }, [onUploadProfilePhoto, onUploadProfilePhotoResponse, enqueueSnackbar])

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  useEffect(() => {
    document.title = "IssueTracker | Profile"
  }, [])

  return (
    <Wrapper pageName={"Profile"}>
      <div className="profile-wrapper">
        <Card className="card-style">
          {onGetUserResponse && !onGetUserResponse?.error ? (
            <ProfileTabs
              url={url}
              onUploadProfilePhoto={onUploadProfilePhoto}
              user={user}
            />
          ) : null}
          {onGetUserResponse && onGetUserResponse?.error ? (
            <h1>No Profile Found</h1>
          ) : null}
        </Card>
      </div>
    </Wrapper>
  )
}

export default Profile
