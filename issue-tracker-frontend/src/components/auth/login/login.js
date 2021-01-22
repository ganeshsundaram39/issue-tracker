import React, { useState, useEffect } from "react"
import "./login.scss"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useForm } from "react-hook-form"
import { InputAdornment, withStyles } from "@material-ui/core"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { RemoveRedEye } from "@material-ui/icons"
import Box from "@material-ui/core/Box"

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid Email Id"),
  password: yup.string().required("Password is required"),
})

const styles = (theme) => ({
  eye: {
    cursor: "pointer",
  },
})

const Login = (props) => {
  const { classes } = props
  const [passwordIsMasked, togglePasswordMask] = useState(true)
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log({ data })
  }

  useEffect(() => {
    document.title = "IssueTracker | Login"
  }, [])
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
      <Box mt={'2%'}>
        <TextField
          name="password"
          error={!!errors.password}
          label="Password"
          inputRef={register}
          helperText={
            errors?.password?.message ? errors?.password?.message : " "
          }
          type={passwordIsMasked ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <RemoveRedEye
                  className={classes.eye}
                  onClick={() => togglePasswordMask((prev) => !prev)}
                />
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="filled"
        />
      </Box>
      <div className="buttons top-margin">
        <Button variant="contained" type="submit" color="primary" fullWidth>
          Login
        </Button>
      </div>
    </form>
  )
}

export default withStyles(styles)(Login)
