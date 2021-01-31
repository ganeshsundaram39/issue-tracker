import React, { useState, useEffect } from "react"
import "./login.scss"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useForm } from "react-hook-form"
import { InputAdornment } from "@material-ui/core"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { RemoveRedEye } from "@material-ui/icons"
import { onLogin } from "../../../state/actions/auth.action"
import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import {
  useHistory,
} from "react-router-dom"
import { resetAuth } from "../../../state/actions/auth.action"
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
    dispatch(onLogin({ formData }))
  }

  useEffect(() => {
    document.title = "IssueTracker | Login"
  }, [])

  useEffect(() => {
    if (!loading && loginResponse) {
      if (loginResponse?.error && loginResponse?.message) {
        enqueueSnackbar(loginResponse?.message, { variant: "error" })
        dispatch(resetAuth())

      } else {
        enqueueSnackbar("Login Successful!", { variant: "success" })
                localStorage.setItem(
          "userdata",
          JSON.stringify({ ...loginResponse?.data })
        )
        dispatch(resetAuth())
        history.push('/issues')
      }
    }
  }, [loading, loginResponse, enqueueSnackbar,dispatch,history])

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
        inputRef={register}
        helperText={errors?.password?.message ? errors?.password?.message : " "}
        type={passwordIsMasked ? "password" : "text"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <RemoveRedEye
                style={{ cursor: "pointer" }}
                onClick={() => togglePasswordMask((prev) => !prev)}
              />
            </InputAdornment>
          ),
        }}
        fullWidth
        variant="filled"
      />
      <div className="buttons top-margin">
        <Button
          variant="contained"
          disabled={loading}
          type="submit"
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </div>
    </form>
  )
}

export default Login
