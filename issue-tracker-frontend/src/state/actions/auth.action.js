import {
  ON_LOGIN,
  ON_LOGIN_SUCCESSFULL,
  ON_LOGIN_FAILED,
  ON_REGISTER,
  ON_REGISTER_SUCCESSFULL,
  ON_REGISTER_FAILED,
} from "../types/types"

const axios = require("axios")

const baseUrl = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION +"users"

export const onLogin = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_LOGIN })
  axios
    .post(baseUrl + "/login", {
      ...formData,
    })
    .then(function (response) {
      console.log({response})
      dispatch({ type: ON_LOGIN_SUCCESSFULL ,payload:response })
    })
    .catch(function (error) {
      console.log({error})
      dispatch({ type: ON_LOGIN_FAILED ,payload:error})
    })
}

export const onRegister = ({ formData }) => (dispatch) => {
  dispatch({ type: ON_REGISTER })
  axios
    .post(baseUrl + "/signup", {
      ...formData,
    })
    .then(function (response) {
      console.log({response})
      dispatch({ type: ON_REGISTER_SUCCESSFULL ,payload:response})
    })
    .catch(function (error) {
      console.log({error})
      dispatch({ type: ON_REGISTER_FAILED ,payload:error })
    })
}

// onRegister() {
//   this.authService.signup(this.signupForm.value).subscribe(
//     (response: any) => {
//       console.log({ response })
//       if (response.error) {
//         this.globalService.openSnackBar(response.message, "Error")
//       } else {
//         this.globalService.openSnackBar("Registered..!!", "Success")
//         this.router.navigate(["/auth/login"])
//       }
//     },
//     (error) => {
//       console.log({ error })
//       if (error && error.error && error.error.message) {
//         this.globalService.openSnackBar(error.error.message, "Error")
//       } else {
//         this.globalService.openSnackBar("Something went wrong..!!", "Error")
//       }
//     }
//   )
// }

// onLogin() {
//   this.authService.login(this.loginForm.value).subscribe(
//     (response: any) => {
//       console.log({ response })
//       if (response.error) {
//         this.globalService.openSnackBar(response.message, "Error")
//       } else {
//         if (response.message === "Login Successful" && response.data) {
//           localStorage.setItem(
//             "userdata",
//             JSON.stringify({ ...response.data })
//           )
//           this.router.navigate(["/issues"])
//         }
//       }
//     },
//     (error) => {
//       console.log({ error })
//       if (error && error.error && error.error.message) {
//         this.globalService.openSnackBar(error.error.message, "Error")
//       } else {
//         this.globalService.openSnackBar("Something went wrong..!!", "Error")
//       }
//     }
//   )
// }

// signup(signupObject) {
//   return this.http.post(this.baseUrl + "/signup", signupObject)
// }
// login(loginObj) {
//   return this.http.post(this.baseUrl + "/login", loginObj)
// }

// private baseUrl = environment.url + environment.version + "users"
