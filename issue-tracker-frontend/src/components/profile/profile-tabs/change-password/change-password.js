import React, { useState, useEffect } from "react"

import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import "./change-password.scss"
import {
  updateProfilePassword,
  resetUpdateProfileData,
} from "../../../../state/actions/auth.action"
import InputAdornment from "@material-ui/core/InputAdornment"
import { RemoveRedEye } from "@material-ui/icons"
import * as Yup from "yup"
import {
  passwordRegex,
  passwordRegexMessage,
} from "../../../common/passwordRegex"
import PasswordSVG from "../../../../assets/images/password-svg"

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .matches(passwordRegex, passwordRegexMessage),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
})

const ChangePassword = ({ userId }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })
  const { enqueueSnackbar } = useSnackbar()

  const dispatch = useDispatch()

  const primaryColorHash = useSelector((state) => state.app.primaryColorHash)

  const onUpdateProfilePassword = useSelector(
    (state) => state.auth.onUpdateProfilePassword
  )
  const onUpdateProfilePasswordResponse = useSelector(
    (state) => state.auth.onUpdateProfilePasswordResponse
  )

  const [passwordIsMasked, togglePasswordMask] = useState(true)
  const [confirmPasswordIsMasked, toggleConfirmPasswordMask] = useState(true)

  const onSubmit = (formData) => {
    formData = { ...formData, userId }
    dispatch(updateProfilePassword({ formData }))
  }
  useEffect(() => {
    if (!onUpdateProfilePassword && onUpdateProfilePasswordResponse) {
      if (
        onUpdateProfilePasswordResponse?.error &&
        onUpdateProfilePasswordResponse?.message
      ) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
      } else if (onUpdateProfilePasswordResponse?.data) {
        enqueueSnackbar("Password Changed!", { variant: "success" })
      }
      dispatch(resetUpdateProfileData())
    }
  }, [
    onUpdateProfilePassword,
    onUpdateProfilePasswordResponse,
    enqueueSnackbar,
    dispatch,
  ])

  const showNewPasswordText = (e) => {
    e.stopPropagation()
    togglePasswordMask((prev) => !prev)
  }

  const showConfirmPasswordText = (e) => {
    e.stopPropagation()
    toggleConfirmPasswordMask((prev) => !prev)
  }

  return (
    <form className={"change-password-form"} onSubmit={handleSubmit(onSubmit)}>
      <div className="side-image">
        <PasswordSVG color={primaryColorHash} />
      </div>
      <div className="password-inputs">
        <TextField
          name="newPassword"
          error={!!errors.newPassword}
          label="New Password"
          autoComplete="off"
          inputRef={register}
          helperText={
            errors?.newPassword?.message ? errors?.newPassword?.message : " "
          }
          type={passwordIsMasked ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <RemoveRedEye
                  style={{ cursor: "pointer" }}
                  onClick={showNewPasswordText}
                />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="filled"
        />
        <TextField
          name="confirmPassword"
          error={!!errors.confirmPassword}
          label="Confirm Password"
          inputRef={register}
          autoComplete="off"
          helperText={
            errors?.confirmPassword?.message
              ? errors?.confirmPassword?.message
              : " "
          }
          type={confirmPasswordIsMasked ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <RemoveRedEye
                  style={{ cursor: "pointer" }}
                  onClick={showConfirmPasswordText}
                />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="filled"
        />

        <div className="buttons  bottom-margin">
          <Button variant="contained" type="submit" color="primary">
            Change
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ChangePassword
