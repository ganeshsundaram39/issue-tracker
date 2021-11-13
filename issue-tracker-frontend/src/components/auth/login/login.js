import React, { useState, useEffect, useCallback } from "react"
import "./login.scss"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useForm } from "react-hook-form"
import { InputAdornment } from "@material-ui/core"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { RemoveRedEye } from "@material-ui/icons"
import {
  onLogin,
  onGoogleLogin,
  onGithubLogin,
  onTwitterLogin,
  onFacebookLogin,
} from "../../../state/actions/auth.action"
import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import Google from "../../../assets/images/google.svg"
import Facebook from "../../../assets/images/facebook.svg"
import Twitter from "../../../assets/images/twitter.svg"
import Github from "../../../assets/images/github.svg"

import { useHistory } from "react-router-dom"
import { resetAuth } from "../../../state/actions/auth.action"
import { setPrimaryColor } from "../../../state/actions/app.action"
// import useCountRenders from "../useCountRenders"

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid Email Id"),
  password: yup.string().required("Password is required"),
})

const Login = () => {
  const [passwordIsMasked, togglePasswordMask] = useState(true)
  let history = useHistory()
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.onLogin)
  const loginResponse = useSelector((state) => state.auth.loginResponse)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (formData) => {
    if (!loading) {
      dispatch(onLogin({ formData }))
    }
  }
  useEffect(() => {
    document.title = "IssueTracker | Login"
  }, [])

  const onGoogleSignIn = useCallback(() => {
    dispatch(onGoogleLogin())
  }, [dispatch])
  const onGithubSignIn = useCallback(() => {
    dispatch(onGithubLogin())
  }, [dispatch])
  const onTwitterSignIn = useCallback(() => {
    dispatch(onTwitterLogin())
  }, [dispatch])

  const onFacebookSignIn = useCallback(() => {
    dispatch(onFacebookLogin())
  }, [dispatch])

  const showPasswordText = useCallback(
    (e) => {
      e.stopPropagation()
      togglePasswordMask((prev) => !prev)
    },
    [togglePasswordMask]
  )

  useEffect(() => {
    if (!loading && loginResponse) {
      if (loginResponse?.error && loginResponse?.message) {
        enqueueSnackbar(loginResponse?.message, { variant: "error" })
        dispatch(resetAuth())
      } else if (loginResponse?.data) {
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...loginResponse?.data })
        )
        dispatch(
          setPrimaryColor({
            colorHash:
              loginResponse?.data?.userDetails?.theme?.primaryColorHash,
            colorName:
              loginResponse?.data?.userDetails?.theme?.primaryColorName,
          })
        )
        dispatch(resetAuth())
        enqueueSnackbar("Login Successful!", { variant: "success" })
        history.push("/issues")
      }
    }
  }, [loading, loginResponse, enqueueSnackbar, dispatch, history])

  // useCountRenders('Login Component')

  return (
    <form className={"tab-wrapper"} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        name="email"
        type="email"
        error={!!errors.email}
        helperText={errors?.email?.message ? errors?.email?.message : " "}
        inputRef={register}
        fullWidth
        variant="filled"
      />
      <TextField
        name="password"
        error={!!errors.password}
        label="Password"
        autoComplete="on"
        inputRef={register}
        helperText={errors?.password?.message ? errors?.password?.message : " "}
        type={passwordIsMasked ? "password" : "text"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <RemoveRedEye
                style={{ cursor: "pointer" }}
                onClick={showPasswordText}
              />
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="filled"
      />
      <div className="buttons top-margin">
        <Button variant="contained" type="submit" color="primary" fullWidth>
          Login
        </Button>
      </div>
      <div className="buttons top-margin social-login">
        <img src={Google} alt="Google Login" onClick={onGoogleSignIn} />
        <img src={Github} alt="Github Login" onClick={onGithubSignIn} />
        <img src={Twitter} alt="Twitter Login" onClick={onTwitterSignIn} />
        <img src={Facebook} alt="Facebook Login" onClick={onFacebookSignIn} />
      </div>
    </form>
  )
}

export default Login
