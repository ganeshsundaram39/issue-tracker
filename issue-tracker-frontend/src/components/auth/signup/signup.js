import React, { useState, useEffect } from "react"
import "./signup.scss"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useForm } from "react-hook-form"
import { InputAdornment } from "@material-ui/core"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { RemoveRedEye } from "@material-ui/icons"
import { onRegister } from "../../../state/actions/auth.action"
import { useSelector, useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import {
  useHistory,
} from "react-router-dom"
import { resetAuth } from "../../../state/actions/auth.action"

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email("Invalid Email Id"),
  password: yup.string().required("Password is required"),
})

const Signup = (props) => {
  const [passwordIsMasked, togglePasswordMask] = useState(true)
  const loading = useSelector((state) => state.auth.onRegister)
  const registerResponse = useSelector((state) => state.auth.registerResponse)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  let history = useHistory()

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = (formData) => {
    dispatch(onRegister({ formData }))
  }

  useEffect(() => {
    document.title = "IssueTracker | Signup"
  }, [])

  useEffect(() => {
    if (!loading && registerResponse) {
      if (registerResponse?.error && registerResponse?.message) {
        enqueueSnackbar(registerResponse?.message, { variant: "error" })
        dispatch(resetAuth())

      } else {
        enqueueSnackbar("Registration Successfull!", { variant: "success" })
        dispatch(resetAuth())

        history.push('/auth/login')
      }
    }
  }, [loading, registerResponse, enqueueSnackbar,dispatch,history])
  return (
    <form className={"tab-wrapper"} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Username"
        name="username"
        type="text"
        error={!!errors.username}
        helperText={errors?.username?.message ? errors?.username?.message : " "}
        inputRef={register}
        fullWidth
        variant="filled"
      />
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
          Signup
        </Button>
      </div>
    </form>
  )
}

export default Signup
