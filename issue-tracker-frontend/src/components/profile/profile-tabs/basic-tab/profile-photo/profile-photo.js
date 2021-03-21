import React, { useState } from "react"
import EditSharpIcon from "@material-ui/icons/EditSharp"

import CloseSharpIcon from "@material-ui/icons/CloseSharp"

import Tooltip from "@material-ui/core/Tooltip"

import ImageUploader from "react-images-upload"
import "./profile-photo.scss"
import AlertDialog from "../../../../common/alert"
import { useSnackbar } from "notistack"
import { updateProfilePhoto } from "../../../../../state/actions/auth.action"
import { useDispatch } from "react-redux"
import LoopSharpIcon from "@material-ui/icons/LoopSharp"

const ProfilePhoto = ({ url, onUploadProfilePhoto }) => {
  const [pictureFile, setPictureFile] = useState([])
  const [pictureSrc, setPictureSrc] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const imageErrorSrc =
    "https://res.cloudinary.com/gscode/image/upload/c_scale,w_300/v1615090896/profile-photo-default.jpg"

  const onDrop = (pictureFiles, pictureDataURLs) => {
    console.log({ pictureFiles, pictureDataURLs })

    if (
      pictureFiles &&
      pictureFiles.length &&
      pictureDataURLs &&
      pictureDataURLs.length
    ) {
      setPictureFile(pictureFiles)
      setPictureSrc(pictureDataURLs)
    } else {
      removeImage()
    }
  }
  const uploadImage = () => {
    if (pictureFile && pictureFile.length) {
      dispatch(updateProfilePhoto({ file: pictureFile[0] }))
      removeImage()
    } else {
      enqueueSnackbar("No image to upload!", { variant: "error" })
    }
  }
  const removeImage = () => {
    setPictureFile([])
    setPictureSrc([])
  }
  const profilePhotoError = (e) => {
    e.target.onerror = null
    e.target.src = imageErrorSrc
  }
  return (
    <div className="profile-photo-wrapper">
      <img
        src={url?url:imageErrorSrc}
        className="photo"
        onError={profilePhotoError}
        alt="Profile-Picha"
      />
      <AlertDialog
        message={
          <div className="image-uploader">
            <ImageUploader
              withIcon={true}
              buttonText="Choose image"
              onChange={onDrop}
              imgExtension={[".jpg", ".png", ".jpeg"]}
              maxFileSize={5242880}
              singleImage={true}
              label={"Max file size: 5mb | Accepted: jpg, png"}
            />
            {pictureSrc && pictureSrc.length ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="confirm-new-photo">
                  <img
                    className="photo"
                    alt={"New-Profile-Picha"}
                    src={pictureSrc[0]}
                  ></img>
                  <div
                    className="change-photo"
                    onClick={!onUploadProfilePhoto ? removeImage : () => {}}
                  >
                    <Tooltip
                      title={
                        !onUploadProfilePhoto
                          ? "Remove Image"
                          : "Uploading Photo"
                      }
                      placement="right"
                      arrow
                    >
                      {onUploadProfilePhoto ? (
                        <LoopSharpIcon className="spin" />
                      ) : (
                        <CloseSharpIcon />
                      )}
                    </Tooltip>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        }
        title="Change Profile Photo"
        handleYes={uploadImage}
        handleNo={() => {
          removeImage()
        }}
        yesText={"Upload"}
        noText={"Cancel"}
      >
        {({ handleClickOpen }) => (
          <div
            className="change-photo"
            onClick={!onUploadProfilePhoto ? handleClickOpen : () => {}}
          >
            <Tooltip
              title={
                !onUploadProfilePhoto
                  ? "Change Profile Photo"
                  : "Uploading Photo"
              }
              placement="right"
              arrow
            >
              {onUploadProfilePhoto ? (
                <LoopSharpIcon className="spin" />
              ) : (
                <EditSharpIcon />
              )}
            </Tooltip>
          </div>
        )}
      </AlertDialog>
    </div>
  )
}

export default ProfilePhoto
