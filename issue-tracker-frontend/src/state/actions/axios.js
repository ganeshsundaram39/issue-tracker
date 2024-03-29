const axios = require("axios")

export const DEBUG = process.env.NODE_ENV === "development"

axios.interceptors.request.use(
  (request) => {
    /** In dev, intercepts request and logs it into console for dev */
    if (DEBUG) {
      console.info("✉️ ", request)
    }

    if (request.url.includes("issues") || request.url.includes("profile")
    || request.url.includes("boards")
    ) {
      let user = localStorage.getItem("userData")
      if (user) {
        user = JSON.parse(user)
        request.headers["authorization"] = user?.authToken
      }
    }
    return request
  },
  (error) => {
    if (DEBUG) {
      console.error("✉️ ", error)
    }
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    if (response.config.parse) {
      //perform the manipulation here and change the response object
    }
    return response
  },
  (error) => {
    if (error?.response?.data?.data?.message === "jwt expired") {
      localStorage.clear()
      window.location.href = "/auth/login"
    }
    return Promise.reject(error?.response)
  }
)

export default axios
