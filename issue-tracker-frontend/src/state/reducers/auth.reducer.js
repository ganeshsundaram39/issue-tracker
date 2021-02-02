import {
  ON_LOGIN,
  ON_LOGIN_RESPONSE,
  ON_REGISTER,
  ON_REGISTER_RESPONSE,
  RESET_AUTH,
} from "../types/types"

const initialState = {
  onLogin: false,
  loginResponse: null,
  onRegister: false,
  registerResponse: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      return {
        ...state,
        onLogin: true,
        loginResponse: null,
      }
    case ON_LOGIN_RESPONSE:
      return {
        ...state,
        onLogin: false,
        loginResponse: action.payload,
      }

    case ON_REGISTER:
      return {
        ...state,
        onRegister: true,
        registerResponse: null,
      }
    case ON_REGISTER_RESPONSE:
      return {
        ...state,
        onRegister: false,
        registerResponse: action.payload,
      }

    case RESET_AUTH:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default authReducer
