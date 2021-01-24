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
const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid Email Id"),
  password: yup.string().required("Password is required"),
})

const Login = (props) => {
  const [passwordIsMasked, togglePasswordMask] = useState(true)
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

    // if (response.error) {
    //   this.globalService.openSnackBar(response.message, "Error")
    // } else {
    //   if (response.message === "Login Successful" && response.data) {
    //     localStorage.setItem(
    //       "userdata",
    //       JSON.stringify({ ...response.data })
    //     )
    //     this.router.navigate(["/issues"])
    //   }
    // }

    // if (error && error.error && error.error.message) {
    //   this.globalService.openSnackBar(error.error.message, "Error")
    // } else {
    //   this.globalService.openSnackBar("Something went wrong..!!", "Error")
    // }
  }

  useEffect(() => {
    document.title = "IssueTracker | Login"
  }, [])

  useEffect(() => {
    if (!loading && loginResponse) {
      console.log({ loginResponse })

      if (loginResponse?.error && loginResponse?.message) {
        enqueueSnackbar(loginResponse?.message, { variant: "error" })
      } else {
        enqueueSnackbar("Login Successful!", { variant: "success" })
      }
    }
  }, [loading, loginResponse, enqueueSnackbar])

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
