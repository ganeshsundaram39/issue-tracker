import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import "./basic.scss"
import {
  updateProfileBasic,
  resetUpdateProfileData,
} from "../../../../../state/actions/auth.action"
import GitHubIcon from "@material-ui/icons/GitHub"
import InputAdornment from "@material-ui/core/InputAdornment"
import FacebookIcon from "@material-ui/icons/Facebook"
import TwitterIcon from "@material-ui/icons/Twitter"
import RedditIcon from "@material-ui/icons/Reddit"

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().required("Email is required").email("Invalid Email Id"),
  twitterProfile: yup.string().url("Enter correct url!"),
  facebookProfile: yup.string().url("Enter correct url!"),
  githubProfile: yup.string().url("Enter correct url!"),
  redditProfile: yup.string().url("Enter correct url!"),
  bio: yup.string(),
})

const Basic = ({
  fullName,
  email,
  githubProfile,
  twitterProfile,
  facebookProfile,
  redditProfile,
  bio,
  userId,
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName,
      email,
      githubProfile,
      twitterProfile,
      facebookProfile,
      redditProfile,
      bio,
    },
    resolver: yupResolver(schema),
  })
  const { enqueueSnackbar } = useSnackbar()

  const dispatch = useDispatch()
  const onUpdateProfileBasic = useSelector(
    (state) => state.auth.onUpdateProfileBasic
  )
  const onUpdateProfileBasicResponse = useSelector(
    (state) => state.auth.onUpdateProfileBasicResponse
  )

  const onSubmit = (formData) => {
    formData = { ...formData, userId }
    dispatch(updateProfileBasic({ formData }))
  }
  useEffect(() => {
    if (!onUpdateProfileBasic && onUpdateProfileBasicResponse) {
      if (
        onUpdateProfileBasicResponse?.error &&
        onUpdateProfileBasicResponse?.message
      ) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
      } else if (onUpdateProfileBasicResponse?.data) {
        enqueueSnackbar("Profile Updated!", { variant: "success" })
      }
      dispatch(resetUpdateProfileData())
    }
  }, [
    onUpdateProfileBasic,
    onUpdateProfileBasicResponse,
    enqueueSnackbar,
    dispatch,
  ])
  return (
    <form className={"basic-form"} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Full Name"
        name="fullName"
        type="text"
        error={!!errors.fullName}
        helperText={errors?.fullName?.message ? errors?.fullName?.message : " "}
        inputRef={register}
        variant="filled"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        error={!!errors.email}
        helperText={errors?.email?.message ? errors?.email?.message : " "}
        inputRef={register}
        variant="filled"
      />
      <TextField
        label="Github Profile"
        name="githubProfile"
        type="url"
        error={!!errors.githubProfile}
        helperText={
          errors?.githubProfile?.message ? errors?.githubProfile?.message : " "
        }
        inputRef={register}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GitHubIcon className="icon github" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Twitter Profile"
        name="twitterProfile"
        type="url"
        error={!!errors.twitterProfile}
        helperText={
          errors?.twitterProfile?.message
            ? errors?.twitterProfile?.message
            : " "
        }
        inputRef={register}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TwitterIcon className="icon twitter" />
            </InputAdornment>
          ),
        }}
      />{" "}
      <TextField
        label="Facebook Profile"
        name="facebookProfile"
        type="url"
        error={!!errors.facebookProfile}
        helperText={
          errors?.facebookProfile?.message
            ? errors?.facebookProfile?.message
            : " "
        }
        inputRef={register}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FacebookIcon className="icon facebook" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Reddit Profile"
        name="redditProfile"
        type="url"
        error={!!errors.redditProfile}
        helperText={
          errors?.redditProfile?.message ? errors?.redditProfile?.message : " "
        }
        inputRef={register}
        variant="filled"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RedditIcon className="icon reddit" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Bio"
        name="bio"
        multiline
        className="bio"
        rows={4}
        inputRef={register}
        variant="filled"
        error={!!errors.bio}
        helperText={errors?.bio?.message ? errors?.bio?.message : " "}
      />
      <div className="buttons bottom-margin">
        <Button variant="contained" type="submit" color="primary">
          Save
        </Button>
      </div>
    </form>
  )
}

export default Basic
