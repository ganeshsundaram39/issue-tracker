import { ON_LOGIN, ON_LOGIN_SUCCESSFULL, ON_LOGIN_FAILED,ON_REGISTER, ON_REGISTER_SUCCESSFULL, ON_REGISTER_FAILED, } from "../types/types"

const initialState = {
  onLogin: false,
  onRegister: false,
  loginResponse: {},
  registerResponse: {},

}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      return {
        ...state,
        onLogin: true,
      }
    case ON_LOGIN_SUCCESSFULL:
      return {
        ...state,
        onLogin: false,
        loginResponse: action.payload,
      }
    case ON_LOGIN_FAILED:
      return {
        ...state,
        onLogin: false,
        loginResponse: action.payload,
      }
    case ON_REGISTER:
      return {
        ...state,
        onRegister: true,
      }
    case ON_REGISTER_SUCCESSFULL:
      return {
        ...state,
        onRegister: false,
        registerResponse: action.payload,
      }
    case ON_REGISTER_FAILED:
      return {
        ...state,
        onRegister: false,
        registerResponse: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
